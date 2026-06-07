import { randomBytes } from 'node:crypto';

export type NodeId = string & { readonly __nodeIdBrand: 'NodeId' };

function generateId(): NodeId {
  return randomBytes(8).toString('hex') as NodeId;
}

const ROOT = '__root__';

function toParentKey(parentId: NodeId | null): string {
  return parentId ?? ROOT;
}

export interface GraphNode {
  readonly id: NodeId;
  content: string;
}

export type OccurrenceKey = string;

function makeOccurrenceKey(parentId: NodeId | null, nodeId: NodeId): OccurrenceKey {
  return `${toParentKey(parentId)}:${nodeId}`;
}

export interface OccurrenceState {
  expanded: boolean;
}

export type InsertPosition = 'before' | 'after';

export type ActionResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: string };

function ok<T>(value: T): ActionResult<T> {
  return { ok: true, value };
}

function fail<T>(reason: string): ActionResult<T> {
  return { ok: false, reason };
}

export interface InsertSiblingValue {
  readonly newNodeId: NodeId;
}

export interface IndentValue {
  readonly movedNodeId: NodeId;
  readonly newParentId: NodeId;
  readonly autoExpandedParentId: NodeId | null;
}

export interface DedentValue {
  readonly movedNodeId: NodeId;
  readonly newParentId: NodeId | null;
}

export interface LinkValue {
  readonly alreadyLinked: boolean;
  readonly autoExpandedParentId: NodeId | null;
}

export interface AddExistingNodeValue {
  readonly nodeId: NodeId;
}

export interface BadgeInfo {
  readonly predecessorCount: number;
  readonly showBadge: boolean;
}

export type PredecessorNavMode = 'none' | 'inline' | 'dropdown';

export interface PredecessorNavEntry {
  readonly nodeId: NodeId;
  readonly displayLabel: string;
  readonly isEmpty: boolean;
}

export interface GraphDAGSnapshot {
  readonly nodes: ReadonlyArray<{ readonly id: string; readonly content: string }>;
  readonly edges: ReadonlyArray<{
    readonly parentKey: string;
    readonly children: ReadonlyArray<string>;
  }>;
  readonly occurrenceStates: ReadonlyArray<{
    readonly key: string;
    readonly expanded: boolean;
  }>;
}

export class GraphDAG {
  private readonly _nodes = new Map<NodeId, GraphNode>();
  private readonly _children = new Map<string, NodeId[]>();
  private readonly _predecessors = new Map<NodeId, Set<string>>();
  private readonly _states = new Map<OccurrenceKey, OccurrenceState>();

  // ── Internals ─────────────────────────────────────────────────────────────

  private childListOf(parentId: NodeId | null): NodeId[] {
    const key = toParentKey(parentId);
    let list = this._children.get(key);
    if (list === undefined) {
      list = [];
      this._children.set(key, list);
    }
    return list;
  }

  private predSetOf(nodeId: NodeId): Set<string> {
    let set = this._predecessors.get(nodeId);
    if (set === undefined) {
      set = new Set();
      this._predecessors.set(nodeId, set);
    }
    return set;
  }

  private addEdge(parentId: NodeId | null, childId: NodeId, atIndex?: number): void {
    const list = this.childListOf(parentId);
    const key = toParentKey(parentId);
    if (atIndex !== undefined && atIndex >= 0 && atIndex <= list.length) {
      list.splice(atIndex, 0, childId);
    } else {
      list.push(childId);
    }
    this.predSetOf(childId).add(key);
  }

  private removeEdge(parentId: NodeId | null, childId: NodeId): boolean {
    const key = toParentKey(parentId);
    const list = this._children.get(key);
    if (!list) return false;
    const idx = list.indexOf(childId);
    if (idx === -1) return false;
    list.splice(idx, 1);
    this._predecessors.get(childId)?.delete(key);
    return true;
  }

  private indexOfChild(parentId: NodeId | null, nodeId: NodeId): number {
    const list = this._children.get(toParentKey(parentId));
    return list ? list.indexOf(nodeId) : -1;
  }

  private hasEdge(parentId: NodeId | null, childId: NodeId): boolean {
    const list = this._children.get(toParentKey(parentId));
    return list ? list.includes(childId) : false;
  }

  /**
   * DFS reachability: returns true if targetId is reachable from fromId
   * by following child edges (i.e. targetId is a descendant of fromId).
   */
  private isDescendant(fromId: NodeId, targetId: NodeId): boolean {
    if (fromId === targetId) return false;
    const visited = new Set<string>();
    const stack: NodeId[] = [fromId];
    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (curr === targetId) return true;
      if (visited.has(curr)) continue;
      visited.add(curr);
      const kids = this._children.get(curr);
      if (kids) {
        for (const k of kids) {
          if (!visited.has(k)) stack.push(k);
        }
      }
    }
    return false;
  }

  /**
   * Would adding the edge parentId → childId introduce a cycle?
   * True when parentId === childId, or when parentId is already a
   * descendant of childId (making childId an ancestor of parentId).
   */
  private wouldCycle(parentId: NodeId, childId: NodeId): boolean {
    if (parentId === childId) return true;
    return this.isDescendant(childId, parentId);
  }

  /**
   * If the occurrence (parentId, nodeId) is explicitly collapsed, expand it
   * and return nodeId. Otherwise return null.
   */
  private maybeAutoExpand(parentId: NodeId | null, nodeId: NodeId): NodeId | null {
    const key = makeOccurrenceKey(parentId, nodeId);
    const state = this._states.get(key);
    if (state !== undefined && !state.expanded) {
      this._states.set(key, { expanded: true });
      return nodeId;
    }
    return null;
  }

  // ── Public API ────────────────────────────────────────────────────────────

  /** Create a new node appended at the root level. */
  createNode(content: string): NodeId {
    const id = generateId();
    this._nodes.set(id, { id, content });
    this.addEdge(null, id);
    return id;
  }

  /** Create a new node as a direct child of parentId. */
  createNodeUnder(
    parentId: NodeId,
    content: string,
    atIndex?: number,
  ): ActionResult<InsertSiblingValue> {
    if (!this._nodes.has(parentId)) {
      return fail(`Parent node "${parentId}" does not exist.`);
    }
    const id = generateId();
    this._nodes.set(id, { id, content });
    this.addEdge(parentId, id, atIndex);
    return ok({ newNodeId: id });
  }

  /**
   * Add an EXISTING node as a nested bullet under parentId (e.g. via reference picker).
   * Creates a new structural edge; never duplicates the node.
   * Refused if it would create a cycle or if the direct edge already exists.
   */
  addExistingNodeUnder(
    parentId: NodeId,
    childId: NodeId,
    atIndex?: number,
  ): ActionResult<AddExistingNodeValue> {
    if (!this._nodes.has(parentId)) {
      return fail(`Parent node "${parentId}" does not exist.`);
    }
    if (!this._nodes.has(childId)) {
      return fail(`Node "${childId}" does not exist.`);
    }
    if (this.hasEdge(parentId, childId)) {
      return fail(`Node "${childId}" is already a direct child of "${parentId}".`);
    }
    if (this.wouldCycle(parentId, childId)) {
      return fail(
        `Adding "${childId}" under "${parentId}" would create a cycle — refused.`,
      );
    }
    this.addEdge(parentId, childId, atIndex);
    return ok({ nodeId: childId });
  }

  /**
   * Insert a new sibling node before or after currentNodeId under parentId.
   * The new node is nested under the same predecessor, in order.
   */
  insertSibling(
    parentId: NodeId | null,
    currentNodeId: NodeId,
    position: InsertPosition,
    content = '',
  ): ActionResult<InsertSiblingValue> {
    const idx = this.indexOfChild(parentId, currentNodeId);
    if (idx === -1) {
      return fail(
        `Node "${currentNodeId}" is not a child of "${toParentKey(parentId)}".`,
      );
    }
    const insertIdx = position === 'after' ? idx + 1 : idx;
    const id = generateId();
    this._nodes.set(id, { id, content });
    this.addEdge(parentId, id, insertIdx);
    return ok({ newNodeId: id });
  }

  /**
   * Indent (Tab): re-parent nodeId to nest under its preceding sibling under parentId.
   * Moves the structural edge; same node, new parent; other occurrences unaffected.
   * Auto-expands the preceding sibling occurrence (parentId, precedingSibling) if collapsed.
   * Refused when there is no preceding sibling, or when the move would create a cycle.
   */
  indent(parentId: NodeId | null, nodeId: NodeId): ActionResult<IndentValue> {
    const idx = this.indexOfChild(parentId, nodeId);
    if (idx === -1) {
      return fail(`Node "${nodeId}" not found under "${toParentKey(parentId)}".`);
    }
    if (idx === 0) {
      return fail(`Node "${nodeId}" has no preceding sibling to indent under.`);
    }
    const siblings = this._children.get(toParentKey(parentId))!;
    const precedingId = siblings[idx - 1];

    if (this.wouldCycle(precedingId, nodeId)) {
      return fail(
        `Indenting "${nodeId}" under "${precedingId}" would create a cycle — refused.`,
      );
    }

    // Expand before structural change so the sibling is open when the child arrives.
    const autoExpandedParentId = this.maybeAutoExpand(parentId, precedingId);

    this.removeEdge(parentId, nodeId);
    this.addEdge(precedingId, nodeId); // appended last under preceding sibling

    return ok({ movedNodeId: nodeId, newParentId: precedingId, autoExpandedParentId });
  }

  /**
   * Dedent (Shift+Tab): re-parent nodeId from under parentId to under grandParentId,
   * inserted just after parentId in the grandparent's children.
   * Moves the structural edge; same node, new parent; other occurrences unaffected.
   * Refused when either lookup fails, or when the move would create a cycle.
   */
  dedent(
    grandParentId: NodeId | null,
    parentId: NodeId,
    nodeId: NodeId,
  ): ActionResult<DedentValue> {
    if (this.indexOfChild(parentId, nodeId) === -1) {
      return fail(`Node "${nodeId}" is not a child of "${parentId}".`);
    }
    const parentIdx = this.indexOfChild(grandParentId, parentId);
    if (parentIdx === -1) {
      return fail(
        `Node "${parentId}" is not a child of "${toParentKey(grandParentId)}".`,
      );
    }
    if (grandParentId !== null && this.wouldCycle(grandParentId, nodeId)) {
      return fail(
        `Dedenting "${nodeId}" under "${grandParentId}" would create a cycle — refused.`,
      );
    }

    this.removeEdge(parentId, nodeId);
    this.addEdge(grandParentId, nodeId, parentIdx + 1);

    return ok({ movedNodeId: nodeId, newParentId: grandParentId });
  }

  /**
   * Link (Cmd+Tab): add nodeId as an ADDITIONAL child of its preceding sibling under
   * parentId, while keeping the existing edge intact. The node then appears in both places.
   * Idempotent — if the link already exists, returns { alreadyLinked: true }.
   * Auto-expands the preceding sibling occurrence (parentId, precedingSibling) if collapsed.
   * Refused when there is no preceding sibling, or when the link would create a cycle.
   */
  linkUnderPrecedingSibling(
    parentId: NodeId | null,
    nodeId: NodeId,
  ): ActionResult<LinkValue> {
    const idx = this.indexOfChild(parentId, nodeId);
    if (idx === -1) {
      return fail(`Node "${nodeId}" not found under "${toParentKey(parentId)}".`);
    }
    if (idx === 0) {
      return fail(`Node "${nodeId}" has no preceding sibling to link under.`);
    }
    const siblings = this._children.get(toParentKey(parentId))!;
    const precedingId = siblings[idx - 1];

    if (this.hasEdge(precedingId, nodeId)) {
      return ok({ alreadyLinked: true, autoExpandedParentId: null });
    }
    if (this.wouldCycle(precedingId, nodeId)) {
      return fail(
        `Linking "${nodeId}" under "${precedingId}" would create a cycle — refused.`,
      );
    }

    const autoExpandedParentId = this.maybeAutoExpand(parentId, precedingId);
    this.addEdge(precedingId, nodeId); // existing parentId → nodeId edge is preserved

    return ok({ alreadyLinked: false, autoExpandedParentId });
  }

  /**
   * Remove nodeId from under parentId. If the node has other predecessors it remains
   * in the graph; it is only removed from this specific occurrence.
   */
  removeNodeFromParent(parentId: NodeId | null, nodeId: NodeId): boolean {
    return this.removeEdge(parentId, nodeId);
  }

  // ── Per-occurrence collapse/expand ────────────────────────────────────────

  /**
   * Get the expanded/collapsed state for the occurrence (parentId, nodeId).
   * Defaults to { expanded: true } when no state has been explicitly set.
   */
  getOccurrenceState(parentId: NodeId | null, nodeId: NodeId): OccurrenceState {
    return (
      this._states.get(makeOccurrenceKey(parentId, nodeId)) ?? { expanded: true }
    );
  }

  /** Set the expanded/collapsed state for the occurrence (parentId, nodeId). */
  setOccurrenceState(
    parentId: NodeId | null,
    nodeId: NodeId,
    state: OccurrenceState,
  ): void {
    this._states.set(makeOccurrenceKey(parentId, nodeId), { ...state });
  }

  // ── Badge ─────────────────────────────────────────────────────────────────

  /**
   * Badge info for nodeId.
   * predecessorCount counts only named parent nodes (root-level occurrences excluded).
   * showBadge is true when predecessorCount > 1; suppressed at 0 or 1.
   */
  getBadgeInfo(nodeId: NodeId): BadgeInfo {
    const predSet = this._predecessors.get(nodeId);
    if (!predSet || predSet.size === 0) {
      return { predecessorCount: 0, showBadge: false };
    }
    let count = 0;
    for (const key of predSet) {
      if (key !== ROOT) count++;
    }
    return { predecessorCount: count, showBadge: count > 1 };
  }

  // ── Predecessor navigation ────────────────────────────────────────────────

  /**
   * Sorted predecessor nav entries for nodeId.
   * Named (non-empty) predecessors sorted case-insensitively; deterministic
   * tiebreaker by nodeId. Unnamed (empty-content) predecessors sorted last,
   * ordered by nodeId. Root-level occurrences are omitted — they have no
   * predecessor node to navigate to.
   */
  getPredecessorNavEntries(nodeId: NodeId): readonly PredecessorNavEntry[] {
    const predSet = this._predecessors.get(nodeId);
    if (!predSet || predSet.size === 0) return [];

    const entries: PredecessorNavEntry[] = [];
    for (const key of predSet) {
      if (key === ROOT) continue;
      const predId = key as NodeId;
      const predNode = this._nodes.get(predId);
      const content = predNode?.content ?? '';
      const isEmpty = content.trim().length === 0;
      entries.push({
        nodeId: predId,
        displayLabel: isEmpty ? '(unnamed)' : content,
        isEmpty,
      });
    }

    entries.sort((a, b) => {
      // Unnamed last
      if (a.isEmpty !== b.isEmpty) return a.isEmpty ? 1 : -1;
      // Case-insensitive content
      const cmp = a.displayLabel.localeCompare(b.displayLabel, undefined, {
        sensitivity: 'base',
        usage: 'sort',
      });
      if (cmp !== 0) return cmp;
      // Deterministic tiebreaker
      return a.nodeId < b.nodeId ? -1 : a.nodeId > b.nodeId ? 1 : 0;
    });

    return entries;
  }

  /**
   * Rendering mode for the predecessor navigation control.
   * 'none'     — 0 named predecessors
   * 'inline'   — 1–3 named predecessors, each rendered as an inline control side by side
   * 'dropdown' — 4+ named predecessors, single dropdown trigger opens the list
   */
  getPredecessorNavMode(nodeId: NodeId): PredecessorNavMode {
    const count = this.getPredecessorNavEntries(nodeId).length;
    if (count === 0) return 'none';
    if (count <= 3) return 'inline';
    return 'dropdown';
  }

  // ── Queries ───────────────────────────────────────────────────────────────

  getNode(nodeId: NodeId): GraphNode | undefined {
    return this._nodes.get(nodeId);
  }

  hasNode(nodeId: NodeId): boolean {
    return this._nodes.has(nodeId);
  }

  /** Ordered children of parentId, or root children when parentId is null. */
  getChildren(parentId: NodeId | null): readonly NodeId[] {
    return this._children.get(toParentKey(parentId)) ?? [];
  }

  getRoots(): readonly NodeId[] {
    return this._children.get(ROOT) ?? [];
  }

  /** All named predecessor node IDs for nodeId (excludes root-level occurrences). */
  getPredecessorIds(nodeId: NodeId): readonly NodeId[] {
    const predSet = this._predecessors.get(nodeId);
    if (!predSet) return [];
    const result: NodeId[] = [];
    for (const key of predSet) {
      if (key !== ROOT) result.push(key as NodeId);
    }
    return result;
  }

  getAllNodeIds(): readonly NodeId[] {
    return Array.from(this._nodes.keys());
  }

  /**
   * Update node content in place. All callers holding a reference to the same
   * GraphNode see the change immediately — satisfying the multi-occurrence
   * edit-sync invariant without any secondary propagation step.
   * Returns false when the node does not exist.
   */
  updateNodeContent(nodeId: NodeId, content: string): boolean {
    const node = this._nodes.get(nodeId);
    if (!node) return false;
    node.content = content;
    return true;
  }

  // ── Serialization ─────────────────────────────────────────────────────────

  snapshot(): GraphDAGSnapshot {
    return {
      nodes: Array.from(this._nodes.values()).map(n => ({
        id: n.id,
        content: n.content,
      })),
      edges: Array.from(this._children.entries()).map(([key, children]) => ({
        parentKey: key,
        children: [...children],
      })),
      occurrenceStates: Array.from(this._states.entries()).map(([key, state]) => ({
        key,
        expanded: state.expanded,
      })),
    };
  }

  static fromSnapshot(snap: GraphDAGSnapshot): GraphDAG {
    const dag = new GraphDAG();
    for (const n of snap.nodes) {
      const id = n.id as NodeId;
      dag._nodes.set(id, { id, content: n.content });
    }
    for (const e of snap.edges) {
      const children = Array.from(e.children).map(c => c as NodeId);
      dag._children.set(e.parentKey, children);
      for (const childId of children) {
        dag.predSetOf(childId).add(e.parentKey);
      }
    }
    for (const s of snap.occurrenceStates) {
      dag._states.set(s.key, { expanded: s.expanded });
    }
    return dag;
  }
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: 'cfb47f4ed58758dac21cc45ed8bc3bdcfe9baaa71f847de763b446dff80144dd',
  name: 'Graph-DAG',
  risk_tier: 'high',
  canon_ids: [13 as const],
} as const;