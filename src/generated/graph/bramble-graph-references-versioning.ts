import { randomBytes } from 'node:crypto';

// ─── Primitive ID types ───────────────────────────────────────────────────────

export type NodeId = string;
export type EdgeId = string;
export type VersionId = string;
export type BrambleId = string;

// ─── Core data structures ─────────────────────────────────────────────────────

export interface Bramble {
  readonly id: BrambleId;
  readonly name: string;
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface BrambleNode {
  readonly id: NodeId;
  readonly brambleId: BrambleId;
  readonly content: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly metadata: Readonly<Record<string, string | number | boolean>>;
}

/** Directed edge in the DAG: from → to. */
export interface DAGEdge {
  readonly id: EdgeId;
  readonly fromId: NodeId;
  readonly toId: NodeId;
  readonly label: string | null;
  readonly createdAt: number;
}

/**
 * Semantic reference from one node to another (wiki-link, mention, etc.).
 * Distinct from a DAG structural edge.
 */
export interface Reference {
  readonly sourceId: NodeId;
  readonly targetId: NodeId;
  readonly createdAt: number;
}

/** Immutable point-in-time snapshot of a node's content. */
export interface NodeVersion {
  readonly id: VersionId;
  readonly nodeId: NodeId;
  readonly content: string;
  readonly metadata: Readonly<Record<string, string | number | boolean>>;
  readonly parentVersionId: VersionId | null;
  readonly timestamp: number;
}

export interface MetadataChange {
  readonly key: string;
  readonly before: string | number | boolean | null;
  readonly after: string | number | boolean | null;
}

export interface VersionDiff {
  readonly nodeId: NodeId;
  readonly versionA: VersionId;
  readonly versionB: VersionId;
  readonly contentChanged: boolean;
  readonly contentBefore: string;
  readonly contentAfter: string;
  readonly metadataChanges: readonly MetadataChange[];
  readonly timestampDelta: number;
}

export interface ValidationReport {
  readonly valid: boolean;
  readonly violations: readonly string[];
}

// ─── Result monad ─────────────────────────────────────────────────────────────

export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string };

function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

function err<T>(error: string): Result<T> {
  return { ok: false, error };
}

// ─── ID generation ────────────────────────────────────────────────────────────

function newId(prefix: string): string {
  return `${prefix}_${randomBytes(8).toString('hex')}`;
}

// ─── Graph (DAG) ──────────────────────────────────────────────────────────────

/**
 * Directed Acyclic Graph over BrambleNodes.
 *
 * System invariant: the graph must remain acyclic at all times.
 * Any edge insertion that would create a cycle is rejected with an error.
 */
export class BrambleGraph {
  private readonly nodes: Map<NodeId, BrambleNode> = new Map();
  private readonly edges: Map<EdgeId, DAGEdge> = new Map();
  /** Adjacency list: fromId → Set<toId> */
  private readonly adj: Map<NodeId, Set<NodeId>> = new Map();
  /** Reverse adjacency: toId → Set<fromId> */
  private readonly radj: Map<NodeId, Set<NodeId>> = new Map();

  // ── Node operations ────────────────────────────────────────────────────────

  addNode(
    brambleId: BrambleId,
    content: string,
    metadata: Record<string, string | number | boolean> = {},
  ): BrambleNode {
    const now = Date.now();
    const node: BrambleNode = {
      id: newId('node'),
      brambleId,
      content,
      createdAt: now,
      updatedAt: now,
      metadata: { ...metadata },
    };
    this.nodes.set(node.id, node);
    return node;
  }

  updateNode(
    id: NodeId,
    patch: Partial<Pick<BrambleNode, 'content' | 'metadata'>>,
  ): Result<BrambleNode> {
    const existing = this.nodes.get(id);
    if (!existing) return err(`Node "${id}" not found`);
    const updated: BrambleNode = {
      ...existing,
      content: patch.content ?? existing.content,
      metadata: patch.metadata ? { ...patch.metadata } : existing.metadata,
      updatedAt: Date.now(),
    };
    this.nodes.set(id, updated);
    return ok(updated);
  }

  removeNode(id: NodeId): Result<void> {
    if (!this.nodes.has(id)) return err(`Node "${id}" not found`);
    // Remove all incident edges first.
    const toRemove = Array.from(this.edges.keys()).filter(eid => {
      const e = this.edges.get(eid)!;
      return e.fromId === id || e.toId === id;
    });
    for (const eid of toRemove) this.removeEdgeInternal(eid);
    this.nodes.delete(id);
    this.adj.delete(id);
    this.radj.delete(id);
    return ok(undefined);
  }

  getNode(id: NodeId): BrambleNode | undefined {
    return this.nodes.get(id);
  }

  getNodes(): readonly BrambleNode[] {
    return Array.from(this.nodes.values());
  }

  getNodesByBramble(brambleId: BrambleId): readonly BrambleNode[] {
    return Array.from(this.nodes.values()).filter(n => n.brambleId === brambleId);
  }

  // ── Edge operations ────────────────────────────────────────────────────────

  /**
   * Add a directed edge from → to.
   *
   * System invariant: rejected when the edge would create a cycle in the DAG.
   */
  addEdge(fromId: NodeId, toId: NodeId, label: string | null = null): Result<DAGEdge> {
    if (!this.nodes.has(fromId)) return err(`Source node "${fromId}" not found`);
    if (!this.nodes.has(toId)) return err(`Target node "${toId}" not found`);
    if (fromId === toId) return err('Self-loops are not permitted in the DAG');

    // System invariant: cycle check.
    if (this.isReachable(toId, fromId)) {
      return err(
        `Adding edge ${fromId} → ${toId} would create a cycle (DAG acyclicity invariant violated)`,
      );
    }

    const edge: DAGEdge = {
      id: newId('edge'),
      fromId,
      toId,
      label,
      createdAt: Date.now(),
    };
    this.edges.set(edge.id, edge);
    this.ensureAdj(fromId).add(toId);
    this.ensureRadj(toId).add(fromId);
    return ok(edge);
  }

  removeEdge(id: EdgeId): Result<void> {
    if (!this.edges.has(id)) return err(`Edge "${id}" not found`);
    this.removeEdgeInternal(id);
    return ok(undefined);
  }

  getEdge(id: EdgeId): DAGEdge | undefined {
    return this.edges.get(id);
  }

  getEdges(): readonly DAGEdge[] {
    return Array.from(this.edges.values());
  }

  /** Edges originating at a node. */
  outEdges(nodeId: NodeId): readonly DAGEdge[] {
    return Array.from(this.edges.values()).filter(e => e.fromId === nodeId);
  }

  /** Edges terminating at a node. */
  inEdges(nodeId: NodeId): readonly DAGEdge[] {
    return Array.from(this.edges.values()).filter(e => e.toId === nodeId);
  }

  /** Direct successors (children) of a node. */
  children(nodeId: NodeId): readonly BrambleNode[] {
    return Array.from(this.adj.get(nodeId) ?? [])
      .map(id => this.nodes.get(id))
      .filter((n): n is BrambleNode => n !== undefined);
  }

  /** Direct predecessors (parents) of a node. */
  parents(nodeId: NodeId): readonly BrambleNode[] {
    return Array.from(this.radj.get(nodeId) ?? [])
      .map(id => this.nodes.get(id))
      .filter((n): n is BrambleNode => n !== undefined);
  }

  /**
   * DFS post-order topological sort over nodes reachable from rootId,
   * or all root nodes when rootId is omitted.
   * Parents are guaranteed to appear before their children.
   */
  topologicalSort(rootId?: NodeId): Result<readonly BrambleNode[]> {
    const visited = new Set<NodeId>();
    const inStack = new Set<NodeId>();
    const postOrder: NodeId[] = [];

    const visit = (id: NodeId): boolean => {
      if (inStack.has(id)) return false; // cycle — should be prevented by addEdge
      if (visited.has(id)) return true;
      inStack.add(id);
      for (const childId of this.adj.get(id) ?? []) {
        if (!visit(childId)) return false;
      }
      inStack.delete(id);
      visited.add(id);
      postOrder.push(id);
      return true;
    };

    const roots = rootId
      ? [rootId]
      : Array.from(this.nodes.keys()).filter(id => (this.radj.get(id)?.size ?? 0) === 0);

    for (const startId of roots) {
      if (!visit(startId)) {
        return err('Cycle detected during topological sort (DAG acyclicity invariant violated)');
      }
    }

    const sorted = postOrder
      .reverse()
      .map(id => this.nodes.get(id))
      .filter((n): n is BrambleNode => n !== undefined);

    return ok(sorted);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /** BFS reachability check following directed edges. */
  private isReachable(source: NodeId, target: NodeId): boolean {
    if (source === target) return true;
    const queue: NodeId[] = [source];
    const seen = new Set<NodeId>([source]);
    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const next of this.adj.get(current) ?? []) {
        if (next === target) return true;
        if (!seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    return false;
  }

  private ensureAdj(id: NodeId): Set<NodeId> {
    let s = this.adj.get(id);
    if (!s) { s = new Set(); this.adj.set(id, s); }
    return s;
  }

  private ensureRadj(id: NodeId): Set<NodeId> {
    let s = this.radj.get(id);
    if (!s) { s = new Set(); this.radj.set(id, s); }
    return s;
  }

  private removeEdgeInternal(id: EdgeId): void {
    const edge = this.edges.get(id);
    if (!edge) return;
    this.adj.get(edge.fromId)?.delete(edge.toId);
    this.radj.get(edge.toId)?.delete(edge.fromId);
    this.edges.delete(id);
  }
}

// ─── References & Backlinks ───────────────────────────────────────────────────

/**
 * Tracks semantic references between nodes and maintains the corresponding
 * backlink index.
 *
 * System invariant: the backlink set is always the exact inverse of the
 * forward-reference set. Any mutation through this class maintains that
 * symmetry automatically.
 */
export class ReferenceIndex {
  /** sourceId → Set<targetId> */
  private readonly forward: Map<NodeId, Set<NodeId>> = new Map();
  /** targetId → Set<sourceId> */
  private readonly backward: Map<NodeId, Set<NodeId>> = new Map();
  private readonly store: Map<string, Reference> = new Map();

  private key(sourceId: NodeId, targetId: NodeId): string {
    return `${sourceId}\0${targetId}`;
  }

  /**
   * Add a reference from source → target.
   * Idempotent: adding the same pair twice returns the existing reference.
   */
  addReference(sourceId: NodeId, targetId: NodeId): Reference {
    const k = this.key(sourceId, targetId);
    const existing = this.store.get(k);
    if (existing) return existing;

    const ref: Reference = { sourceId, targetId, createdAt: Date.now() };
    this.store.set(k, ref);

    let fwd = this.forward.get(sourceId);
    if (!fwd) { fwd = new Set(); this.forward.set(sourceId, fwd); }
    fwd.add(targetId);

    let bwd = this.backward.get(targetId);
    if (!bwd) { bwd = new Set(); this.backward.set(targetId, bwd); }
    bwd.add(sourceId);

    return ref;
  }

  removeReference(sourceId: NodeId, targetId: NodeId): Result<void> {
    const k = this.key(sourceId, targetId);
    if (!this.store.has(k)) return err(`Reference ${sourceId} → ${targetId} not found`);
    this.store.delete(k);
    this.forward.get(sourceId)?.delete(targetId);
    this.backward.get(targetId)?.delete(sourceId);
    return ok(undefined);
  }

  /** All references originating from this node. */
  outReferences(sourceId: NodeId): readonly Reference[] {
    return Array.from(this.forward.get(sourceId) ?? [])
      .map(targetId => this.store.get(this.key(sourceId, targetId)))
      .filter((r): r is Reference => r !== undefined);
  }

  /**
   * Backlinks: all references whose target is this node.
   *
   * System invariant: backlinks are always the exact inverse of forward refs.
   */
  backlinks(targetId: NodeId): readonly Reference[] {
    return Array.from(this.backward.get(targetId) ?? [])
      .map(sourceId => this.store.get(this.key(sourceId, targetId)))
      .filter((r): r is Reference => r !== undefined);
  }

  hasReference(sourceId: NodeId, targetId: NodeId): boolean {
    return this.store.has(this.key(sourceId, targetId));
  }

  /** Remove all references involving nodeId (called when a node is deleted). */
  purgeNode(nodeId: NodeId): void {
    for (const targetId of this.forward.get(nodeId) ?? []) {
      this.store.delete(this.key(nodeId, targetId));
      this.backward.get(targetId)?.delete(nodeId);
    }
    this.forward.delete(nodeId);

    for (const sourceId of this.backward.get(nodeId) ?? []) {
      this.store.delete(this.key(sourceId, nodeId));
      this.forward.get(sourceId)?.delete(nodeId);
    }
    this.backward.delete(nodeId);
  }

  allReferences(): readonly Reference[] {
    return Array.from(this.store.values());
  }
}

// ─── Versioning ───────────────────────────────────────────────────────────────

/**
 * Append-only version history for BrambleNodes.
 *
 * System invariant: versions are never mutated or deleted. History is
 * strictly append-only. The head of a node's chain is always its current
 * version.
 */
export class VersionStore {
  private readonly versions: Map<VersionId, NodeVersion> = new Map();
  /** nodeId → ordered version IDs, oldest first */
  private readonly chains: Map<NodeId, VersionId[]> = new Map();

  /** Record the first version of a node (parentVersionId = null). */
  createInitialVersion(
    nodeId: NodeId,
    content: string,
    metadata: Record<string, string | number | boolean> = {},
  ): NodeVersion {
    const version: NodeVersion = {
      id: newId('ver'),
      nodeId,
      content,
      metadata: { ...metadata },
      parentVersionId: null,
      timestamp: Date.now(),
    };
    this.versions.set(version.id, version);
    this.chains.set(nodeId, [version.id]);
    return version;
  }

  /**
   * Append a new version to an existing node's chain.
   *
   * System invariant: the parent version must exist and belong to the same node.
   */
  appendVersion(
    nodeId: NodeId,
    content: string,
    metadata: Record<string, string | number | boolean> = {},
  ): Result<NodeVersion> {
    const chain = this.chains.get(nodeId);
    if (!chain || chain.length === 0) {
      return err(`No version chain for node "${nodeId}". Call createInitialVersion first.`);
    }
    const parentVersionId = chain[chain.length - 1]!;
    const version: NodeVersion = {
      id: newId('ver'),
      nodeId,
      content,
      metadata: { ...metadata },
      parentVersionId,
      timestamp: Date.now(),
    };
    this.versions.set(version.id, version);
    chain.push(version.id);
    return ok(version);
  }

  /** The latest version of a node, or undefined if none exists. */
  headVersion(nodeId: NodeId): NodeVersion | undefined {
    const chain = this.chains.get(nodeId);
    if (!chain || chain.length === 0) return undefined;
    return this.versions.get(chain[chain.length - 1]!);
  }

  /** Full history for a node, oldest first. */
  history(nodeId: NodeId): readonly NodeVersion[] {
    return (this.chains.get(nodeId) ?? [])
      .map(id => this.versions.get(id))
      .filter((v): v is NodeVersion => v !== undefined);
  }

  getVersion(id: VersionId): NodeVersion | undefined {
    return this.versions.get(id);
  }

  /**
   * Compare two versions of the same node and return a structured delta.
   */
  diff(versionAId: VersionId, versionBId: VersionId): Result<VersionDiff> {
    const a = this.versions.get(versionAId);
    const b = this.versions.get(versionBId);
    if (!a) return err(`Version "${versionAId}" not found`);
    if (!b) return err(`Version "${versionBId}" not found`);
    if (a.nodeId !== b.nodeId) {
      return err(
        `Cannot diff versions from different nodes ("${a.nodeId}" vs "${b.nodeId}")`,
      );
    }

    const allKeys = new Set([...Object.keys(a.metadata), ...Object.keys(b.metadata)]);
    const metadataChanges: MetadataChange[] = [];
    for (const key of allKeys) {
      const before = a.metadata[key] ?? null;
      const after = b.metadata[key] ?? null;
      if (before !== after) metadataChanges.push({ key, before, after });
    }

    return ok({
      nodeId: a.nodeId,
      versionA: versionAId,
      versionB: versionBId,
      contentChanged: a.content !== b.content,
      contentBefore: a.content,
      contentAfter: b.content,
      metadataChanges,
      timestampDelta: b.timestamp - a.timestamp,
    });
  }
}

// ─── The Bramble ──────────────────────────────────────────────────────────────

/**
 * Top-level workspace that groups BrambleNodes and provides a unified
 * interface over the graph, reference, and versioning subsystems.
 *
 * System invariants enforced here:
 *   • Every node is bound to exactly one Bramble at creation; the binding
 *     is immutable thereafter.
 *   • References are only created between nodes that exist in the graph.
 *   • Node deletion cascades to reference cleanup; version history is preserved.
 */
export class BrambleWorkspace {
  private readonly brambles: Map<BrambleId, Bramble> = new Map();
  readonly graph: BrambleGraph;
  readonly references: ReferenceIndex;
  readonly versions: VersionStore;

  constructor(
    graph?: BrambleGraph,
    references?: ReferenceIndex,
    versions?: VersionStore,
  ) {
    this.graph = graph ?? new BrambleGraph();
    this.references = references ?? new ReferenceIndex();
    this.versions = versions ?? new VersionStore();
  }

  // ── Bramble lifecycle ──────────────────────────────────────────────────────

  createBramble(name: string): Bramble {
    const now = Date.now();
    const bramble: Bramble = {
      id: newId('bramble'),
      name,
      createdAt: now,
      updatedAt: now,
    };
    this.brambles.set(bramble.id, bramble);
    return bramble;
  }

  renameBramble(id: BrambleId, name: string): Result<Bramble> {
    const existing = this.brambles.get(id);
    if (!existing) return err(`Bramble "${id}" not found`);
    const updated: Bramble = { ...existing, name, updatedAt: Date.now() };
    this.brambles.set(id, updated);
    return ok(updated);
  }

  getBramble(id: BrambleId): Bramble | undefined {
    return this.brambles.get(id);
  }

  listBrambles(): readonly Bramble[] {
    return Array.from(this.brambles.values());
  }

  // ── Node lifecycle ─────────────────────────────────────────────────────────

  /**
   * Create a node in a Bramble, recording its initial version atomically.
   *
   * System invariant: the Bramble must exist; the node's brambleId is fixed
   * at creation and cannot be changed.
   */
  createNode(
    brambleId: BrambleId,
    content: string,
    metadata: Record<string, string | number | boolean> = {},
  ): Result<{ node: BrambleNode; version: NodeVersion }> {
    if (!this.brambles.has(brambleId)) {
      return err(`Bramble "${brambleId}" not found`);
    }
    const node = this.graph.addNode(brambleId, content, metadata);
    const version = this.versions.createInitialVersion(node.id, content, metadata);
    return ok({ node, version });
  }

  /**
   * Update a node's content and/or metadata, appending a new version.
   */
  updateNode(
    nodeId: NodeId,
    patch: Partial<Pick<BrambleNode, 'content' | 'metadata'>>,
  ): Result<{ node: BrambleNode; version: NodeVersion }> {
    const nodeResult = this.graph.updateNode(nodeId, patch);
    if (!nodeResult.ok) return err(nodeResult.error);

    const { content, metadata } = nodeResult.value;
    const versionResult = this.versions.appendVersion(
      nodeId,
      content,
      metadata as Record<string, string | number | boolean>,
    );
    if (!versionResult.ok) return err(versionResult.error);

    return ok({ node: nodeResult.value, version: versionResult.value });
  }

  /**
   * Delete a node, cascading to edge and reference cleanup.
   * Version history is preserved (append-only invariant).
   */
  deleteNode(nodeId: NodeId): Result<void> {
    const result = this.graph.removeNode(nodeId);
    if (!result.ok) return err(result.error);
    this.references.purgeNode(nodeId);
    return ok(undefined);
  }

  // ── Reference operations ───────────────────────────────────────────────────

  /**
   * Create a reference from source to target.
   *
   * System invariant: both endpoints must be present in the graph.
   */
  addReference(sourceId: NodeId, targetId: NodeId): Result<Reference> {
    if (!this.graph.getNode(sourceId)) {
      return err(
        `Source node "${sourceId}" not found (reference integrity invariant violated)`,
      );
    }
    if (!this.graph.getNode(targetId)) {
      return err(
        `Target node "${targetId}" not found (reference integrity invariant violated)`,
      );
    }
    return ok(this.references.addReference(sourceId, targetId));
  }

  removeReference(sourceId: NodeId, targetId: NodeId): Result<void> {
    return this.references.removeReference(sourceId, targetId);
  }

  backlinks(targetId: NodeId): readonly Reference[] {
    return this.references.backlinks(targetId);
  }

  // ── Structural edge operations ─────────────────────────────────────────────

  addEdge(fromId: NodeId, toId: NodeId, label: string | null = null): Result<DAGEdge> {
    return this.graph.addEdge(fromId, toId, label);
  }

  removeEdge(edgeId: EdgeId): Result<void> {
    return this.graph.removeEdge(edgeId);
  }

  // ── Version operations ─────────────────────────────────────────────────────

  nodeHistory(nodeId: NodeId): readonly NodeVersion[] {
    return this.versions.history(nodeId);
  }

  diffVersions(versionAId: VersionId, versionBId: VersionId): Result<VersionDiff> {
    return this.versions.diff(versionAId, versionBId);
  }

  /**
   * Restore a node to a prior version by appending a new version with the
   * historical content. Non-destructive: the full history is always preserved.
   */
  restoreVersion(versionId: VersionId): Result<{ node: BrambleNode; version: NodeVersion }> {
    const historical = this.versions.getVersion(versionId);
    if (!historical) return err(`Version "${versionId}" not found`);
    return this.updateNode(historical.nodeId, {
      content: historical.content,
      metadata: historical.metadata as Record<string, string | number | boolean>,
    });
  }
}

// ─── Invariant validation ─────────────────────────────────────────────────────

/**
 * Assert all system invariants against a BrambleWorkspace instance and
 * return a report. A valid workspace has an empty violations array.
 *
 * Invariants checked:
 *   1. DAG acyclicity — topological sort must succeed.
 *   2. Reference integrity — every reference endpoint must be a live node.
 *   3. Backlink symmetry — backlinks are the exact inverse of forward refs.
 *   4. Node-Bramble binding — every node's brambleId must resolve to a Bramble.
 */
export function validateWorkspace(workspace: BrambleWorkspace): ValidationReport {
  const violations: string[] = [];

  // 1. DAG acyclicity
  const sortResult = workspace.graph.topologicalSort();
  if (!sortResult.ok) {
    violations.push(`DAG acyclicity invariant violated: ${sortResult.error}`);
  }

  // 2. Reference integrity + 3. Backlink symmetry
  for (const ref of workspace.references.allReferences()) {
    if (!workspace.graph.getNode(ref.sourceId)) {
      violations.push(
        `Reference integrity: source node "${ref.sourceId}" referenced but absent from graph`,
      );
    }
    if (!workspace.graph.getNode(ref.targetId)) {
      violations.push(
        `Reference integrity: target node "${ref.targetId}" referenced but absent from graph`,
      );
    }
    const hasBacklink = workspace.references
      .backlinks(ref.targetId)
      .some(b => b.sourceId === ref.sourceId);
    if (!hasBacklink) {
      violations.push(
        `Backlink symmetry: forward ref ${ref.sourceId} → ${ref.targetId} has no corresponding backlink`,
      );
    }
  }

  // 4. Node-Bramble binding
  for (const node of workspace.graph.getNodes()) {
    if (!workspace.getBramble(node.brambleId)) {
      violations.push(
        `Node-Bramble binding: node "${node.id}" references unknown Bramble "${node.brambleId}"`,
      );
    }
  }

  return { valid: violations.length === 0, violations };
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '30cf62ac8e06b31954a841c48d7ad6c3c3728e567d45bec27a8df22620d0a0f3',
  name: 'Bramble — Graph, References & Versioning',
  risk_tier: 'high',
  canon_ids: [2 as const],
} as const;