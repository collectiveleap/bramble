import { randomUUID } from 'node:crypto';

// ─── Primitive scalar types ───────────────────────────────────────────────────

export type NodeId = string;
export type EdgeId = string;
export type SnapshotId = string;
export type Timestamp = number;

// ─── Edge kinds ───────────────────────────────────────────────────────────────

/** All edge kinds the versioning system recognises. */
export type EdgeKind = 'reference' | 'embed' | 'mention' | 'cite' | 'tag';

/**
 * f-versioning.pinning-edge-kinds-set
 *
 * The canonical set of edge kinds that participate in pin / snapshot semantics.
 * Kinds absent from this set (e.g. 'tag') are always rendered live and
 * cannot be pinned.
 */
export const PINNING_EDGE_KINDS: ReadonlySet<EdgeKind> = new Set<EdgeKind>([
  'reference',
  'embed',
  'mention',
  'cite',
]);

// ─── Node data ────────────────────────────────────────────────────────────────

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | { [key: string]: JsonValue } | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

/** Arbitrary JSON-serialisable content stored on a node. */
export type NodeData = JsonObject;

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface NodeSnapshot {
  readonly snapshotId: SnapshotId;
  readonly nodeId: NodeId;
  readonly data: NodeData;
  readonly capturedAt: Timestamp;
}

export interface VCSNode {
  readonly nodeId: NodeId;
  readonly data: NodeData;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly tombstonedAt: Timestamp | null;
}

export type PinState =
  | { readonly pinned: false }
  | { readonly pinned: true; readonly snapshotId: SnapshotId; readonly pinnedAt: Timestamp };

export interface Edge {
  readonly edgeId: EdgeId;
  readonly sourceId: NodeId;
  readonly targetId: NodeId;
  readonly kind: EdgeKind;
  readonly createdAt: Timestamp;
  readonly pin: PinState;
}

export const REMOVED_MARKER = '[removed]' as const;
export type RemovedMarker = typeof REMOVED_MARKER;

export type RenderResult =
  | { readonly resolved: true; readonly data: NodeData; readonly live: boolean; readonly pinnedAt?: Timestamp }
  | { readonly resolved: false; readonly marker: RemovedMarker };

// ─── Errors ───────────────────────────────────────────────────────────────────

export class VersioningError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VersioningError';
  }
}

export class NodeNotFoundError extends VersioningError {
  constructor(public readonly nodeId: NodeId) {
    super(`Node not found: ${nodeId}`);
    this.name = 'NodeNotFoundError';
  }
}

export class EdgeNotFoundError extends VersioningError {
  constructor(public readonly edgeId: EdgeId) {
    super(`Edge not found: ${edgeId}`);
    this.name = 'EdgeNotFoundError';
  }
}

export class DuplicateIdError extends VersioningError {
  constructor(public readonly entityKind: string, public readonly id: string) {
    super(`${entityKind} already exists: ${id}`);
    this.name = 'DuplicateIdError';
  }
}

export class TombstonedNodeError extends VersioningError {
  constructor(public readonly nodeId: NodeId) {
    super(`Cannot modify tombstoned node: ${nodeId}`);
    this.name = 'TombstonedNodeError';
  }
}

export class UnpinnableEdgeKindError extends VersioningError {
  constructor(public readonly kind: EdgeKind) {
    super(`Edge kind '${kind}' is not in PINNING_EDGE_KINDS and cannot be pinned`);
    this.name = 'UnpinnableEdgeKindError';
  }
}

// ─── Internal mutable types ───────────────────────────────────────────────────

interface MutableNode {
  nodeId: NodeId;
  data: NodeData;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tombstonedAt: Timestamp | null;
}

interface MutableEdge {
  edgeId: EdgeId;
  sourceId: NodeId;
  targetId: NodeId;
  kind: EdgeKind;
  createdAt: Timestamp;
  pin: PinState;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function freezeNode(n: MutableNode): VCSNode {
  return {
    nodeId: n.nodeId,
    data: deepCopy(n.data),
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
    tombstonedAt: n.tombstonedAt,
  };
}

function freezeEdge(e: MutableEdge): Edge {
  return {
    edgeId: e.edgeId,
    sourceId: e.sourceId,
    targetId: e.targetId,
    kind: e.kind,
    createdAt: e.createdAt,
    pin: e.pin,
  };
}

function freezeSnapshot(s: NodeSnapshot): NodeSnapshot {
  return { ...s, data: deepCopy(s.data) };
}

// ─── VersioningStore ──────────────────────────────────────────────────────────

export class VersioningStore {
  private readonly nodes = new Map<NodeId, MutableNode>();
  private readonly snapshots = new Map<SnapshotId, NodeSnapshot>();
  private readonly nodeHistory = new Map<NodeId, SnapshotId[]>();
  private readonly edges = new Map<EdgeId, MutableEdge>();

  // ── Node writes ────────────────────────────────────────────────────────────

  /**
   * Register a new node. Captures an initial snapshot of its content.
   */
  createNode(nodeId: NodeId, data: NodeData): VCSNode {
    if (this.nodes.has(nodeId)) throw new DuplicateIdError('Node', nodeId);
    const now = Date.now();
    const node: MutableNode = {
      nodeId,
      data: deepCopy(data),
      createdAt: now,
      updatedAt: now,
      tombstonedAt: null,
    };
    this.nodes.set(nodeId, node);
    this.nodeHistory.set(nodeId, []);
    this.recordSnapshot(node, now);
    return freezeNode(node);
  }

  /**
   * Replace the content of a live (non-tombstoned) node and record a new
   * snapshot in its mutation history.
   */
  updateNode(nodeId: NodeId, data: NodeData): VCSNode {
    const node = this.requireNode(nodeId);
    if (node.tombstonedAt !== null) throw new TombstonedNodeError(nodeId);
    const now = Date.now();
    node.data = deepCopy(data);
    node.updatedAt = now;
    this.recordSnapshot(node, now);
    return freezeNode(node);
  }

  /**
   * Mark a node as removed (tombstone).
   *
   * Unpinned edges targeting this node will render `[removed]`.
   * Pinned edges are unaffected — their snapshot remains intact.
   * (f-versioning.pin-survives-deletion)
   */
  tombstoneNode(nodeId: NodeId): VCSNode {
    const node = this.requireNode(nodeId);
    if (node.tombstonedAt !== null) throw new TombstonedNodeError(nodeId);
    const ts = Date.now();
    node.tombstonedAt = ts;
    node.updatedAt = ts;
    return freezeNode(node);
  }

  // ── Node reads ─────────────────────────────────────────────────────────────

  readNode(nodeId: NodeId): VCSNode {
    return freezeNode(this.requireNode(nodeId));
  }

  getSnapshot(snapshotId: SnapshotId): NodeSnapshot | null {
    const s = this.snapshots.get(snapshotId);
    return s ? freezeSnapshot(s) : null;
  }

  /**
   * Returns the mutation-driven snapshot history for a node, oldest first.
   * Pin snapshots are not included — they are accessible only via the edge's
   * `pin.snapshotId`.
   */
  getSnapshotHistory(nodeId: NodeId): NodeSnapshot[] {
    this.requireNode(nodeId);
    return (this.nodeHistory.get(nodeId) ?? []).map(id =>
      freezeSnapshot(this.snapshots.get(id)!),
    );
  }

  // ── Edge writes ────────────────────────────────────────────────────────────

  /**
   * Create a directed edge from `sourceId` to `targetId`.
   *
   * For every kind in `PINNING_EDGE_KINDS` the edge is automatically pinned
   * to a snapshot of the target's current state.
   * (f-versioning.auto-pin-on-create)
   */
  createEdge(
    edgeId: EdgeId,
    sourceId: NodeId,
    targetId: NodeId,
    kind: EdgeKind,
  ): Edge {
    if (this.edges.has(edgeId)) throw new DuplicateIdError('Edge', edgeId);
    this.requireNode(sourceId);
    this.requireNode(targetId);

    const now = Date.now();
    let pin: PinState = { pinned: false };

    if (PINNING_EDGE_KINDS.has(kind)) {
      const snap = this.capturePin(targetId, now);
      pin = { pinned: true, snapshotId: snap.snapshotId, pinnedAt: now };
    }

    const edge: MutableEdge = { edgeId, sourceId, targetId, kind, createdAt: now, pin };
    this.edges.set(edgeId, edge);
    return freezeEdge(edge);
  }

  /**
   * Explicitly pin an unpinned edge, capturing the target's current state.
   * No-op if the edge is already pinned.
   * Throws `UnpinnableEdgeKindError` if the kind is not in `PINNING_EDGE_KINDS`.
   */
  pinEdge(edgeId: EdgeId): Edge {
    const edge = this.requireEdge(edgeId);
    if (!PINNING_EDGE_KINDS.has(edge.kind)) throw new UnpinnableEdgeKindError(edge.kind);
    if (edge.pin.pinned) return freezeEdge(edge);
    const now = Date.now();
    const snap = this.capturePin(edge.targetId, now);
    edge.pin = { pinned: true, snapshotId: snap.snapshotId, pinnedAt: now };
    return freezeEdge(edge);
  }

  /**
   * Remove the pin from an edge, switching it to live rendering.
   * No-op if the edge is already unpinned.
   */
  unpinEdge(edgeId: EdgeId): Edge {
    const edge = this.requireEdge(edgeId);
    if (!edge.pin.pinned) return freezeEdge(edge);
    edge.pin = { pinned: false };
    return freezeEdge(edge);
  }

  // ── Edge reads ─────────────────────────────────────────────────────────────

  readEdge(edgeId: EdgeId): Edge {
    return freezeEdge(this.requireEdge(edgeId));
  }

  listEdgesFromSource(sourceId: NodeId): Edge[] {
    return [...this.edges.values()]
      .filter(e => e.sourceId === sourceId)
      .map(freezeEdge);
  }

  listEdgesToTarget(targetId: NodeId): Edge[] {
    return [...this.edges.values()]
      .filter(e => e.targetId === targetId)
      .map(freezeEdge);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  /**
   * Resolve the display content for an edge's target.
   *
   * **Unpinned edges** return the current live content of the target node.
   * If the target is tombstoned or absent, returns `[removed]`.
   * (f-versioning.unpinned-edges-render-live)
   *
   * **Pinned edges** return the content frozen at pin time, regardless of
   * any subsequent mutations or tombstoning of the target.
   * (f-versioning.pinned-edges-render-snapshot, f-versioning.pin-survives-deletion)
   *
   * If the pin's snapshot cannot be resolved (integrity failure), falls back
   * to `[removed]`.
   */
  renderEdgeTarget(edgeId: EdgeId): RenderResult {
    const edge = this.requireEdge(edgeId);

    if (!edge.pin.pinned) {
      // f-versioning.unpinned-edges-render-live
      const node = this.nodes.get(edge.targetId);
      if (!node || node.tombstonedAt !== null) {
        return { resolved: false, marker: REMOVED_MARKER };
      }
      return { resolved: true, data: deepCopy(node.data), live: true };
    }

    // f-versioning.pinned-edges-render-snapshot
    const { snapshotId, pinnedAt } = edge.pin;
    const snap = this.snapshots.get(snapshotId);
    if (!snap) {
      // Snapshot unresolvable — fall back to [removed] per system invariant
      return { resolved: false, marker: REMOVED_MARKER };
    }
    return { resolved: true, data: deepCopy(snap.data), live: false, pinnedAt };
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private requireNode(nodeId: NodeId): MutableNode {
    const node = this.nodes.get(nodeId);
    if (!node) throw new NodeNotFoundError(nodeId);
    return node;
  }

  private requireEdge(edgeId: EdgeId): MutableEdge {
    const edge = this.edges.get(edgeId);
    if (!edge) throw new EdgeNotFoundError(edgeId);
    return edge;
  }

  /**
   * Create a snapshot of `node`'s current data and append it to the node's
   * mutation history.
   */
  private recordSnapshot(node: MutableNode, at: Timestamp): NodeSnapshot {
    const snapshotId = randomUUID();
    const snap: NodeSnapshot = {
      snapshotId,
      nodeId: node.nodeId,
      data: deepCopy(node.data),
      capturedAt: at,
    };
    this.snapshots.set(snapshotId, snap);
    this.nodeHistory.get(node.nodeId)!.push(snapshotId);
    return snap;
  }

  /**
   * Capture the current state of `targetId` into a new immutable snapshot
   * for use as a pin anchor. The snapshot is stored globally (accessible via
   * `getSnapshot`) but is NOT added to the node's mutation history — it is
   * reachable only via the edge's `pin.snapshotId`.
   */
  private capturePin(targetId: NodeId, at: Timestamp): NodeSnapshot {
    const node = this.nodes.get(targetId);
    const snapshotId = randomUUID();
    const snap: NodeSnapshot = {
      snapshotId,
      nodeId: targetId,
      data: node ? deepCopy(node.data) : {},
      capturedAt: at,
    };
    this.snapshots.set(snapshotId, snap);
    return snap;
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/** Create a new, empty VersioningStore. */
export function createVersioningStore(): VersioningStore {
  return new VersioningStore();
}

// ─── Phoenix metadata ─────────────────────────────────────────────────────────

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: 'b9ed885842d286fc73d2e29e7ec20b7bc00345f3beac5a21b86e096fdc89a8c9',
  name: 'Versioning',
  risk_tier: 'high',
  canon_ids: [3 as const],
} as const;