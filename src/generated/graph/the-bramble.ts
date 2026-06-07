import { createHash } from 'node:crypto';

// ─── Branded Identifiers ──────────────────────────────────────────────────────

export type SpaceId = string & { readonly __brand: 'SpaceId' };
export type BrambleId = string & { readonly __brand: 'BrambleId' };
export type NodeId = string & { readonly __brand: 'NodeId' };

export function toSpaceId(raw: string): SpaceId {
  if (!raw.trim()) throw new TypeError('SpaceId must be a non-empty string.');
  return raw as SpaceId;
}

export function toNodeId(raw: string): NodeId {
  if (!raw.trim()) throw new TypeError('NodeId must be a non-empty string.');
  return raw as NodeId;
}

// ─── Core Types ───────────────────────────────────────────────────────────────

/**
 * A Bramble is a named marker over a space's DAG.
 *
 * The DAG has no single top node — any node may have multiple predecessors —
 * so the bramble carries no root field. The bramble is not a node, and is
 * never the subject of a view; callers navigate to nodes within the DAG.
 *
 * Source: f-one-graph.singleton-per-space, f-no-root.graph-has-no-root-field
 */
export type Bramble = {
  readonly id: BrambleId;
  readonly spaceId: SpaceId;
  readonly createdAt: number;
  // No `root` field — the DAG has no single top. (f-no-root.graph-has-no-root-field)
};

/**
 * Discriminated result of createBramble.
 * `created: true` only on first creation for a space; subsequent calls return
 * the existing bramble with `created: false`.
 * (f-one-graph.singleton-per-space, t-one-graph-create-action-idempotent)
 */
export type CreateBrambleResult =
  | { readonly created: true;  readonly bramble: Bramble }
  | { readonly created: false; readonly bramble: Bramble };

// ─── Errors ───────────────────────────────────────────────────────────────────

export class BrambleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BrambleError';
  }
}

/**
 * Thrown when a caller attempts to use a bramble id as a view subject.
 * The bramble is a graph marker, never a viewable entity.
 * Source: f-no-root.graph-not-directly-viewable
 * Eval:   t-no-root-graph-not-directly-viewable
 */
export class BrambleNotViewableError extends BrambleError {
  readonly brambleId: BrambleId;

  constructor(brambleId: BrambleId) {
    super(
      `Bramble '${brambleId}' is a graph marker and cannot be used as a view subject. ` +
      `Navigate to a node within the DAG instead.`,
    );
    this.name = 'BrambleNotViewableError';
    this.brambleId = brambleId;
  }
}

export class BrambleNotFoundError extends BrambleError {
  readonly spaceId: SpaceId;

  constructor(spaceId: SpaceId) {
    super(`No bramble found for space '${spaceId}'.`);
    this.name = 'BrambleNotFoundError';
    this.spaceId = spaceId;
  }
}

// ─── ID Derivation ────────────────────────────────────────────────────────────

/**
 * Derives a deterministic BrambleId from a SpaceId.
 * Determinism guarantees the same id survives restarts when the space id is
 * stable, and makes the singleton property auditable without a persistence layer.
 */
function deriveBrambleId(spaceId: SpaceId): BrambleId {
  return createHash('sha256')
    .update('phoenix-vcs:bramble:')
    .update(spaceId)
    .digest('hex') as BrambleId;
}

// ─── Registry ─────────────────────────────────────────────────────────────────

/**
 * BrambleRegistry is the authoritative enforcement point for both system
 * invariants:
 *
 *   1. Singleton-per-space — at most one bramble per space, enforced by the
 *      `_bySpace` map. Creation is idempotent.
 *   2. Non-viewability — `assertViewable` is called by view-subject resolution
 *      machinery to reject any attempt to navigate directly to a bramble.
 *
 * Tests that exercise this class:
 *   t-one-graph-create-action-idempotent
 *   t-no-root-graph-has-no-root-field
 *   t-no-root-graph-not-directly-viewable
 */
export class BrambleRegistry {
  private readonly _bySpace = new Map<SpaceId, Bramble>();
  private readonly _byId    = new Map<BrambleId, Bramble>();

  /**
   * Creates a bramble for the space if one does not yet exist; otherwise
   * returns the existing bramble unchanged. Idempotent.
   * (f-one-graph.singleton-per-space, t-one-graph-create-action-idempotent)
   */
  createBramble(spaceId: SpaceId): CreateBrambleResult {
    const existing = this._bySpace.get(spaceId);
    if (existing !== undefined) {
      return { created: false, bramble: existing };
    }

    const bramble: Bramble = {
      id: deriveBrambleId(spaceId),
      spaceId,
      createdAt: Date.now(),
    };

    this._bySpace.set(spaceId, bramble);
    this._byId.set(bramble.id, bramble);
    return { created: true, bramble };
  }

  /**
   * Returns the bramble for the space, or throws BrambleNotFoundError.
   */
  getBramble(spaceId: SpaceId): Bramble {
    const bramble = this._bySpace.get(spaceId);
    if (bramble === undefined) throw new BrambleNotFoundError(spaceId);
    return bramble;
  }

  /**
   * Returns true if the space has an active bramble.
   */
  hasBramble(spaceId: SpaceId): boolean {
    return this._bySpace.has(spaceId);
  }

  /**
   * Type guard: returns true when `id` identifies a bramble rather than a
   * DAG node. Used by view machinery prior to calling assertViewable.
   * (f-no-root.graph-not-directly-viewable)
   */
  isBrambleId(id: string): id is BrambleId {
    return this._byId.has(id as BrambleId);
  }

  /**
   * Asserts that `id` is NOT a bramble identifier.
   * Throws BrambleNotViewableError when the id belongs to a bramble.
   *
   * Call this at view-subject resolution time before navigating to any id.
   * (f-no-root.graph-not-directly-viewable, t-no-root-graph-not-directly-viewable)
   */
  assertViewable(id: string): void {
    const bramble = this._byId.get(id as BrambleId);
    if (bramble !== undefined) {
      throw new BrambleNotViewableError(bramble.id);
    }
  }

  /**
   * Removes the bramble for a space. Call when a space is permanently
   * destroyed. Returns true if a bramble was removed, false if none existed.
   */
  deleteBramble(spaceId: SpaceId): boolean {
    const bramble = this._bySpace.get(spaceId);
    if (bramble === undefined) return false;
    this._bySpace.delete(spaceId);
    this._byId.delete(bramble.id);
    return true;
  }

  /**
   * Returns an iterator over all active brambles. Intended for diagnostics
   * and administrative tooling only — not for view-subject resolution.
   */
  all(): IterableIterator<Bramble> {
    return this._bySpace.values();
  }
}

// ─── Module-level Default Registry ───────────────────────────────────────────

/**
 * The default singleton registry for production use.
 *
 * Tests and isolated contexts should instantiate BrambleRegistry directly
 * rather than relying on this shared instance, to prevent state leakage
 * between runs.
 */
export const defaultRegistry: BrambleRegistry = new BrambleRegistry();

// ─── Convenience API (delegates to defaultRegistry) ──────────────────────────

/** @see BrambleRegistry.createBramble */
export function createBramble(spaceId: SpaceId): CreateBrambleResult {
  return defaultRegistry.createBramble(spaceId);
}

/** @see BrambleRegistry.getBramble */
export function getBramble(spaceId: SpaceId): Bramble {
  return defaultRegistry.getBramble(spaceId);
}

/** @see BrambleRegistry.hasBramble */
export function hasBramble(spaceId: SpaceId): boolean {
  return defaultRegistry.hasBramble(spaceId);
}

/** @see BrambleRegistry.isBrambleId */
export function isBrambleId(id: string): id is BrambleId {
  return defaultRegistry.isBrambleId(id);
}

/**
 * Asserts that `id` is not a bramble identifier.
 * Throws BrambleNotViewableError if it is.
 * @see BrambleRegistry.assertViewable
 */
export function assertViewable(id: string): void {
  defaultRegistry.assertViewable(id);
}

/** @see BrambleRegistry.deleteBramble */
export function deleteBramble(spaceId: SpaceId): boolean {
  return defaultRegistry.deleteBramble(spaceId);
}

// ─── Phoenix VCS Metadata ─────────────────────────────────────────────────────

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '730e6c8c82665e5b08a400e6881c0d7e708028ade3725da2dabd493446ab42d4',
  name: 'The-Bramble',
  risk_tier: 'high',
  canon_ids: [4 as const],
} as const;