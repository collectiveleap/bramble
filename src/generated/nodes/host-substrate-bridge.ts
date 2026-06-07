/**
 * Host-Substrate Bridge
 *
 * Bridges host objects (ECHO types, filesystem entries, etc.) into Bramble's
 * node graph, enforcing the system invariants:
 *   - A host instance is wrapped at most once (dedup by host id).
 *   - A wrapped node's title stays in sync with the host object's title,
 *     bidirectionally.
 *   - Each field-value node stays in sync with its bound host field,
 *     bidirectionally.
 *
 * Source: f-7.1.*
 */

export type HostId = string;
export type NodeId = string;

/**
 * Adapter interface that teaches the bridge how to interact with a specific
 * kind of host object.  The bridge itself is fully agnostic to the concrete
 * host type — behaviour is identical whether T is an ECHO object, a filesystem
 * entry, or any other host type.
 */
export interface HostAdapter<T> {
  /** Stable unique identifier for this host object. */
  getId(host: T): HostId;

  /**
   * Current title of the host object, or `undefined` when the host has no
   * title field.  When `undefined`, the wrapped node exposes plain editable
   * content and no title sync is performed.
   */
  getTitle(host: T): string | undefined;

  /**
   * Writes a new title to the host object.
   * Only called when `getTitle` returns a non-`undefined` value.
   */
  setTitle(host: T, title: string): void;

  /**
   * Returns the names of every field that should be exposed as a
   * `FieldValueNode`.  Called once at wrap time.
   */
  listFields(host: T): readonly string[];

  /** Returns the current value of the named field. */
  getField(host: T, field: string): unknown;

  /** Writes a new value to the named field. */
  setField(host: T, field: string, value: unknown): void;

  /**
   * Subscribes to title changes originating in the host system.
   * Returns an unsubscribe / cleanup function.
   */
  subscribeTitle(host: T, handler: (title: string | undefined) => void): () => void;

  /**
   * Subscribes to changes of the named field originating in the host system.
   * Returns an unsubscribe / cleanup function.
   */
  subscribeField(host: T, field: string, handler: (value: unknown) => void): () => void;
}

/**
 * A Bramble node bound bidirectionally to a single field on the host object.
 * `value` always reflects the latest state from either side.
 */
export interface FieldValueNode {
  /** Stable identifier for this field-value node. */
  readonly nodeId: NodeId;
  /** The host field name this node is bound to. */
  readonly fieldName: string;
  /**
   * Current value of the field.  Reflects the latest write — whether that
   * write came from Bramble (`onValueChange`) or from the host system
   * (subscription callback).
   */
  readonly value: unknown;
  /**
   * Called by Bramble when the user edits this field-value node.
   * Propagates the new value to the host object.
   */
  readonly onValueChange: (next: unknown) => void;
}

/**
 * A Bramble node wrapping a host object.
 *
 * - `title` mirrors the host object's title bidirectionally (when the host
 *   has a title field).
 * - When `title` is `undefined` the host has no title field; `content` is
 *   plain editable text with no host sync.
 * - `fieldNodes` holds one `FieldValueNode` per host field, each bound
 *   bidirectionally to its field.
 */
export interface WrappedNode {
  readonly nodeId: NodeId;
  readonly hostId: HostId;
  /** Type label of the originating host system, e.g. `'echo'` or `'filesystem'`. */
  readonly hostType: string;
  /**
   * Current title, kept in sync with the host object's title.
   * `undefined` when the host has no title field.
   */
  readonly title: string | undefined;
  /**
   * Plain editable content — only meaningful when `title` is `undefined`.
   * Not synced to any host field.
   */
  readonly content: string;
  /** Bidirectionally bound field-value nodes, keyed by field name. */
  readonly fieldNodes: ReadonlyMap<string, FieldValueNode>;
  /**
   * Called by Bramble when the user edits the node title.
   * No-op when `title` is `undefined` (host has no title field to write to).
   */
  readonly onTitleChange: (next: string) => void;
  /**
   * Called by Bramble when the user edits the node's plain-text content.
   * Only meaningful when `title` is `undefined`.
   */
  readonly onContentChange: (next: string) => void;
  /** Tears down all host subscriptions associated with this node. */
  readonly dispose: () => void;
}

/** Result returned by `HostSubstrateBridge.import`. */
export interface ImportResult {
  /** The wrapped node (newly created or pre-existing). */
  readonly node: WrappedNode;
  /**
   * `true` when a new wrapper was created.
   * `false` when the host was already wrapped and the existing node is reused.
   */
  readonly isNew: boolean;
}

/** Snapshot of bridge diagnostics. */
export interface BridgeStats {
  readonly hostType: string;
  readonly wrappedCount: number;
}

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Lightweight re-entrancy guard.  Tracks which named sync operations are
 * currently in-flight so that a change propagated from side A to side B does
 * not immediately reflect back to side A (A → B → A loop).
 */
function makeSyncGuard(): {
  isLocked(key: string): boolean;
  lock(key: string, fn: () => void): void;
} {
  const active = new Set<string>();
  return {
    isLocked(key: string): boolean {
      return active.has(key);
    },
    lock(key: string, fn: () => void): void {
      active.add(key);
      try {
        fn();
      } finally {
        active.delete(key);
      }
    },
  };
}

// ─── Bridge ──────────────────────────────────────────────────────────────────

/**
 * Manages the wrapping of host objects into Bramble nodes.
 *
 * Generic over `T` — the concrete host object type.  The bridge behaviour is
 * identical regardless of whether `T` is an ECHO object, a filesystem entry,
 * or any other host type.
 */
export class HostSubstrateBridge<T> {
  private readonly _registry = new Map<HostId, WrappedNode>();
  private readonly _adapter: HostAdapter<T>;
  private readonly _hostType: string;

  constructor(adapter: HostAdapter<T>, hostType: string) {
    this._adapter = adapter;
    this._hostType = hostType;
  }

  /**
   * Wraps `host` as a Bramble `WrappedNode`.
   *
   * System invariant: a host instance is wrapped at most once.  If `host` has
   * already been imported the existing node is returned with `isNew: false`
   * rather than creating a duplicate.
   */
  import(host: T): ImportResult {
    const hostId = this._adapter.getId(host);
    const existing = this._registry.get(hostId);
    if (existing !== undefined) {
      return { node: existing, isNew: false };
    }
    const node = this._wrap(host, hostId);
    this._registry.set(hostId, node);
    return { node, isNew: true };
  }

  /** Returns the wrapped node for `hostId`, or `undefined` if not imported. */
  getNode(hostId: HostId): WrappedNode | undefined {
    return this._registry.get(hostId);
  }

  /** `true` when `hostId` has been imported and not yet released. */
  has(hostId: HostId): boolean {
    return this._registry.has(hostId);
  }

  /**
   * Tears down the wrapped node for `hostId` and removes it from the registry.
   * Returns `true` when a node was found and released.
   */
  release(hostId: HostId): boolean {
    const node = this._registry.get(hostId);
    if (node === undefined) return false;
    node.dispose();
    this._registry.delete(hostId);
    return true;
  }

  /** Releases every wrapped node and clears the registry. */
  releaseAll(): void {
    for (const node of this._registry.values()) {
      node.dispose();
    }
    this._registry.clear();
  }

  stats(): BridgeStats {
    return { hostType: this._hostType, wrappedCount: this._registry.size };
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private _wrap(host: T, hostId: HostId): WrappedNode {
    const adapter = this._adapter;
    const nodeId: NodeId = `wrapped:${this._hostType}:${hostId}`;

    // Shared mutable state — node getters and sync callbacks both read/write
    // here, so observable values on the node are always current.
    const state: { title: string | undefined; content: string } = {
      title: adapter.getTitle(host),
      content: '',
    };

    // Separate guards for title and per-field sync to prevent A→B→A loops.
    const titleGuard = makeSyncGuard();
    const fieldGuard = makeSyncGuard();

    // ── Field-value nodes ────────────────────────────────────────────────────

    const fieldNodes = new Map<string, FieldValueNode>();
    const cleanups: Array<() => void> = [];

    for (const fieldName of adapter.listFields(host)) {
      // Each field gets an isolated value box.  The getter on the FieldValueNode
      // reads from this box so it always reflects the latest value.
      //
      // `fieldName` is a per-iteration const binding (for-of), so closure
      // capture is safe without an alias.
      const box: { value: unknown } = { value: adapter.getField(host, fieldName) };

      // Node → host: Bramble user edits this field-value node.
      const onValueChange = (next: unknown): void => {
        if (fieldGuard.isLocked(fieldName)) return;
        fieldGuard.lock(fieldName, () => {
          box.value = next;
          adapter.setField(host, fieldName, next);
        });
      };

      const fieldNode: FieldValueNode = {
        nodeId: `${nodeId}:field:${fieldName}`,
        fieldName,
        get value(): unknown { return box.value; },
        onValueChange,
      };

      fieldNodes.set(fieldName, fieldNode);

      // Host → node: host system changed this field.
      const unsub = adapter.subscribeField(host, fieldName, (next) => {
        if (fieldGuard.isLocked(fieldName)) return;
        fieldGuard.lock(fieldName, () => {
          box.value = next;
        });
      });
      cleanups.push(unsub);
    }

    // ── Title sync ───────────────────────────────────────────────────────────

    // Node → host: Bramble user edits the title.
    const onTitleChange = (next: string): void => {
      if (titleGuard.isLocked('title')) return;
      // If the host has no title field, there is nothing to write back.
      if (state.title === undefined) return;
      titleGuard.lock('title', () => {
        state.title = next;
        adapter.setTitle(host, next);
      });
    };

    // Plain content edit — used only when the host has no title field.
    // No host sync is performed.
    const onContentChange = (next: string): void => {
      state.content = next;
    };

    // Host → node: host system changed the title.
    const titleUnsub = adapter.subscribeTitle(host, (next) => {
      if (titleGuard.isLocked('title')) return;
      titleGuard.lock('title', () => {
        state.title = next;
      });
    });
    cleanups.push(titleUnsub);

    // ── Dispose ──────────────────────────────────────────────────────────────

    let disposed = false;
    const dispose = (): void => {
      if (disposed) return;
      disposed = true;
      for (const cleanup of cleanups) cleanup();
      cleanups.length = 0;
    };

    // ── Assemble wrapped node ────────────────────────────────────────────────
    //
    // Getters delegate to `state` so that every read returns the current value
    // whether the last write came from Bramble or the host system.

    return {
      nodeId,
      hostId,
      hostType: this._hostType,
      get title(): string | undefined { return state.title; },
      get content(): string { return state.content; },
      get fieldNodes(): ReadonlyMap<string, FieldValueNode> { return fieldNodes; },
      onTitleChange,
      onContentChange,
      dispose,
    };
  }
}

// ─── Factory ─────────────────────────────────────────────────────────────────

/**
 * Convenience factory.
 * Equivalent to `new HostSubstrateBridge(adapter, hostType)`.
 */
export function createBridge<T>(
  adapter: HostAdapter<T>,
  hostType: string,
): HostSubstrateBridge<T> {
  return new HostSubstrateBridge(adapter, hostType);
}

// ─── Metadata ────────────────────────────────────────────────────────────────

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '8c705900d78b66421ea5d286d6f1d6d84ce1ebfa6f9007e69ea5c5982f74dffa',
  name: 'Host-Substrate Bridge',
  risk_tier: 'high',
  canon_ids: [5 as const],
} as const;