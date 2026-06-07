import { randomUUID } from 'node:crypto';
import { EventEmitter } from 'node:events';

// ─── Primitive types ──────────────────────────────────────────────────────────

export type NodeId = string;
export type EdgeId = string;

// ─── Reference edge ───────────────────────────────────────────────────────────

export interface ReferenceEdge {
  /** Immutable unique identifier for this edge. */
  readonly id: EdgeId;
  /** The node that holds the reference. */
  readonly sourceId: NodeId;
  /** The node being referenced. */
  readonly targetId: NodeId;
  /**
   * Display label that always reflects the current name of the target node.
   * Mutated in-place by `renameNode` (invariant: "reference label tracks rename").
   */
  label: string;
  readonly createdAt: number;
}

// ─── Snapshot ─────────────────────────────────────────────────────────────────

export interface ReferenceRegistrySnapshot {
  readonly edges: readonly ReferenceEdge[];
  readonly nodeLabels: Readonly<Record<NodeId, string>>;
}

// ─── Errors ───────────────────────────────────────────────────────────────────

export class SelfReferenceError extends Error {
  readonly nodeId: NodeId;
  constructor(nodeId: NodeId) {
    super(`Node "${nodeId}" may not reference itself.`);
    this.name = 'SelfReferenceError';
    this.nodeId = nodeId;
  }
}

export class UnknownEdgeError extends Error {
  readonly edgeId: EdgeId;
  constructor(edgeId: EdgeId) {
    super(`Reference edge "${edgeId}" does not exist.`);
    this.name = 'UnknownEdgeError';
    this.edgeId = edgeId;
  }
}

// ─── Event payloads ───────────────────────────────────────────────────────────

export interface ReferenceAddedEvent {
  readonly type: 'reference:added';
  readonly edge: Readonly<ReferenceEdge>;
}

export interface ReferenceRemovedEvent {
  readonly type: 'reference:removed';
  /** Snapshot of the edge at the moment of removal. */
  readonly edge: Readonly<ReferenceEdge>;
}

export interface BacklinkChangedEvent {
  readonly type: 'backlink:changed';
  readonly targetId: NodeId;
  /** Current count of distinct source nodes referencing `targetId`. */
  readonly count: number;
}

export interface LabelUpdatedEvent {
  readonly type: 'label:updated';
  readonly edgeId: EdgeId;
  readonly targetId: NodeId;
  readonly newLabel: string;
}

export type ReferenceEvent =
  | ReferenceAddedEvent
  | ReferenceRemovedEvent
  | BacklinkChangedEvent
  | LabelUpdatedEvent;

// ─── Registry ─────────────────────────────────────────────────────────────────

/**
 * ReferenceRegistry manages reference edges between nodes and their inverse
 * backlink index.  All mutations emit typed events so subscribers stay live
 * without navigation or reload (system invariant: "backlink count … updates
 * promptly").
 */
export class ReferenceRegistry {
  /**
   * Underlying EventEmitter.  Prefer the typed `on*` subscription helpers
   * below; use this only when you need EventEmitter-level control.
   */
  readonly events: EventEmitter = new EventEmitter();

  private readonly _edges = new Map<EdgeId, ReferenceEdge>();
  /** Forward index: sourceId → Set<edgeId> */
  private readonly _bySource = new Map<NodeId, Set<EdgeId>>();
  /** Reverse index: targetId → Set<edgeId>  (the backlinks index) */
  private readonly _byTarget = new Map<NodeId, Set<EdgeId>>();
  /** Canonical display label per node — seeds and propagates reference labels. */
  private readonly _nodeLabels = new Map<NodeId, string>();

  // ── Node label management ─────────────────────────────────────────────────

  /**
   * Record (or update) a node's display label.  Call this when a node is
   * created so that `createReference` seeds the correct label, and whenever
   * the node is renamed — or use `renameNode` which does both in one step.
   */
  registerNode(nodeId: NodeId, label: string): void {
    this._nodeLabels.set(nodeId, label);
  }

  getNodeLabel(nodeId: NodeId): string | undefined {
    return this._nodeLabels.get(nodeId);
  }

  /**
   * Rename a node and propagate the new label to every reference edge that
   * points at it.  Emits one `label:updated` event per affected edge and
   * updates `edge.label` in-place (invariant: "reference label tracks rename").
   */
  renameNode(nodeId: NodeId, newLabel: string): void {
    this._nodeLabels.set(nodeId, newLabel);
    const edgeIds = this._byTarget.get(nodeId);
    if (!edgeIds) return;
    for (const edgeId of edgeIds) {
      const edge = this._edges.get(edgeId);
      if (!edge) continue;
      edge.label = newLabel;
      this._fire('label:updated', {
        type: 'label:updated',
        edgeId,
        targetId: nodeId,
        newLabel,
      });
    }
  }

  // ── Reference mutations ───────────────────────────────────────────────────

  /**
   * Commit a reference from `sourceId` to `targetId`.
   *
   * @throws {SelfReferenceError} when `sourceId === targetId`.
   */
  createReference(sourceId: NodeId, targetId: NodeId): ReferenceEdge {
    if (sourceId === targetId) {
      throw new SelfReferenceError(sourceId);
    }
    const label = this._nodeLabels.get(targetId) ?? targetId;
    const edge: ReferenceEdge = {
      id: randomUUID(),
      sourceId,
      targetId,
      label,
      createdAt: Date.now(),
    };
    this._edges.set(edge.id, edge);
    this._addToIndex(this._bySource, sourceId, edge.id);
    this._addToIndex(this._byTarget, targetId, edge.id);
    this._fire('reference:added', { type: 'reference:added', edge });
    this._fire('backlink:changed', {
      type: 'backlink:changed',
      targetId,
      count: this.getBacklinkCount(targetId),
    });
    return edge;
  }

  /**
   * Remove a reference edge by its ID.
   *
   * @throws {UnknownEdgeError} when the edge does not exist.
   */
  removeReference(edgeId: EdgeId): void {
    const edge = this._edges.get(edgeId);
    if (!edge) throw new UnknownEdgeError(edgeId);

    this._edges.delete(edgeId);
    this._removeFromIndex(this._bySource, edge.sourceId, edgeId);
    this._removeFromIndex(this._byTarget, edge.targetId, edgeId);

    // Freeze a snapshot for the event so listeners see the removed state.
    const snapshot: ReferenceEdge = { ...edge };
    this._fire('reference:removed', { type: 'reference:removed', edge: snapshot });
    this._fire('backlink:changed', {
      type: 'backlink:changed',
      targetId: edge.targetId,
      count: this.getBacklinkCount(edge.targetId),
    });
  }

  // ── Queries ───────────────────────────────────────────────────────────────

  getEdge(edgeId: EdgeId): ReferenceEdge | undefined {
    return this._edges.get(edgeId);
  }

  /** All edges originating from `sourceId` (outgoing references). */
  getReferences(sourceId: NodeId): ReferenceEdge[] {
    return this._collectEdges(this._bySource, sourceId);
  }

  /** All edges pointing at `targetId` (backlinks). */
  getBacklinks(targetId: NodeId): ReferenceEdge[] {
    return this._collectEdges(this._byTarget, targetId);
  }

  /**
   * The number of *distinct* source nodes that currently reference `targetId`.
   * This is the live backlink count guaranteed by the system invariant: a
   * single node contributes 1 regardless of how many edges it has to the target.
   */
  getBacklinkCount(targetId: NodeId): number {
    const edgeIds = this._byTarget.get(targetId);
    if (!edgeIds || edgeIds.size === 0) return 0;
    const sources = new Set<NodeId>();
    for (const edgeId of edgeIds) {
      const edge = this._edges.get(edgeId);
      if (edge) sources.add(edge.sourceId);
    }
    return sources.size;
  }

  getAllEdges(): ReferenceEdge[] {
    return Array.from(this._edges.values());
  }

  // ── Typed event subscriptions ─────────────────────────────────────────────

  /** Subscribe to new reference edges.  Returns an unsubscribe function. */
  onReferenceAdded(fn: (event: ReferenceAddedEvent) => void): () => void {
    const handler = (event: ReferenceAddedEvent) => fn(event);
    this.events.on('reference:added', handler);
    return () => this.events.off('reference:added', handler);
  }

  /** Subscribe to reference edge removals.  Returns an unsubscribe function. */
  onReferenceRemoved(fn: (event: ReferenceRemovedEvent) => void): () => void {
    const handler = (event: ReferenceRemovedEvent) => fn(event);
    this.events.on('reference:removed', handler);
    return () => this.events.off('reference:removed', handler);
  }

  /**
   * Subscribe to backlink count changes for any node.
   * Fires immediately after any `reference:added` or `reference:removed`.
   * Returns an unsubscribe function.
   */
  onBacklinkChanged(fn: (event: BacklinkChangedEvent) => void): () => void {
    const handler = (event: BacklinkChangedEvent) => fn(event);
    this.events.on('backlink:changed', handler);
    return () => this.events.off('backlink:changed', handler);
  }

  /**
   * Subscribe to in-place label mutations caused by node renames.
   * Returns an unsubscribe function.
   */
  onLabelUpdated(fn: (event: LabelUpdatedEvent) => void): () => void {
    const handler = (event: LabelUpdatedEvent) => fn(event);
    this.events.on('label:updated', handler);
    return () => this.events.off('label:updated', handler);
  }

  // ── Serialisation ─────────────────────────────────────────────────────────

  snapshot(): ReferenceRegistrySnapshot {
    const nodeLabels: Record<NodeId, string> = {};
    for (const [k, v] of this._nodeLabels) {
      nodeLabels[k] = v;
    }
    return {
      edges: this.getAllEdges().map((e) => ({ ...e })),
      nodeLabels,
    };
  }

  static fromSnapshot(snap: ReferenceRegistrySnapshot): ReferenceRegistry {
    const reg = new ReferenceRegistry();
    for (const [k, v] of Object.entries(snap.nodeLabels)) {
      reg._nodeLabels.set(k, v);
    }
    for (const e of snap.edges) {
      const edge: ReferenceEdge = { ...e };
      reg._edges.set(edge.id, edge);
      reg._addToIndex(reg._bySource, edge.sourceId, edge.id);
      reg._addToIndex(reg._byTarget, edge.targetId, edge.id);
    }
    return reg;
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private _addToIndex(index: Map<NodeId, Set<EdgeId>>, key: NodeId, edgeId: EdgeId): void {
    let bucket = index.get(key);
    if (!bucket) {
      bucket = new Set();
      index.set(key, bucket);
    }
    bucket.add(edgeId);
  }

  private _removeFromIndex(index: Map<NodeId, Set<EdgeId>>, key: NodeId, edgeId: EdgeId): void {
    const bucket = index.get(key);
    if (bucket) {
      bucket.delete(edgeId);
      if (bucket.size === 0) index.delete(key);
    }
  }

  private _collectEdges(index: Map<NodeId, Set<EdgeId>>, key: NodeId): ReferenceEdge[] {
    const bucket = index.get(key);
    if (!bucket) return [];
    const result: ReferenceEdge[] = [];
    for (const edgeId of bucket) {
      const edge = this._edges.get(edgeId);
      if (edge) result.push(edge);
    }
    return result;
  }

  private _fire(eventName: string, payload: ReferenceEvent): void {
    this.events.emit(eventName, payload);
  }
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '5669fa918fe608c162925113852a2c2268a2fcbd24d40776f73076fbbc8589f5',
  name: 'References-Backlinks',
  risk_tier: 'high',
  canon_ids: [5 as const],
} as const;