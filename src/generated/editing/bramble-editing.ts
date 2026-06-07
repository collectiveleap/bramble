import { randomUUID } from 'node:crypto';

// ── Branded primitives ─────────────────────────────────────────────────────

export type NodeId = string & { readonly __brand: 'NodeId' };
export type EdgeId = string & { readonly __brand: 'EdgeId' };
export type OccurrenceId = string & { readonly __brand: 'OccurrenceId' };

export function mkNodeId(raw: string): NodeId { return raw as NodeId; }
export function mkEdgeId(raw: string): EdgeId { return raw as EdgeId; }
export function mkOccurrenceId(raw: string): OccurrenceId { return raw as OccurrenceId; }

// ── Substrate types ────────────────────────────────────────────────────────

export interface BrambleNode {
  readonly id: NodeId;
  content: string;
  readonly createdAt: number;
  updatedAt: number;
}

/** Directed structural edge: parent → child, with stable zero-based ordering. */
export interface StructuralEdge {
  readonly id: EdgeId;
  readonly parentId: NodeId;
  readonly childId: NodeId;
  order: number;
}

/** An occurrence scopes a sub-DAG to a single root node. */
export interface Occurrence {
  readonly id: OccurrenceId;
  readonly rootId: NodeId;
}

/** The full mutable DAG of nodes and structural edges. */
export interface Substrate {
  nodes: Map<NodeId, BrambleNode>;
  edges: Map<EdgeId, StructuralEdge>;
}

// ── Edit operation union ───────────────────────────────────────────────────

export type EditOperation =
  | { kind: 'insert-node';         parentId: NodeId; afterSiblingId: NodeId | null; content: string }
  | { kind: 'delete-node';         nodeId: NodeId;   parentId: NodeId }
  | { kind: 'set-content';         nodeId: NodeId;   content: string }
  | { kind: 'indent-node';         nodeId: NodeId;   parentId: NodeId }
  | { kind: 'outdent-node';        nodeId: NodeId;   parentId: NodeId; grandParentId: NodeId }
  | { kind: 'move-node';           nodeId: NodeId;   fromParentId: NodeId; toParentId: NodeId; afterSiblingId: NodeId | null }
  | { kind: 'split-node';          nodeId: NodeId;   parentId: NodeId; offset: number }
  | { kind: 'merge-node-with-prev';nodeId: NodeId;   parentId: NodeId };

// ── Result type ────────────────────────────────────────────────────────────

export type EditSuccess<T> = { ok: true;  value: T };
export type EditFailure    = { ok: false; error: string };
export type EditResult<T>  = EditSuccess<T> | EditFailure;

function ok<T>(value: T): EditSuccess<T> { return { ok: true, value }; }
function fail(error: string): EditFailure { return { ok: false, error }; }

// ── Internal helpers ───────────────────────────────────────────────────────

function newNodeId(): NodeId { return randomUUID() as NodeId; }
function newEdgeId(): EdgeId { return randomUUID() as EdgeId; }

function now(): number { return Date.now(); }

function childrenOf(substrate: Substrate, parentId: NodeId): StructuralEdge[] {
  const out: StructuralEdge[] = [];
  for (const edge of substrate.edges.values()) {
    if (edge.parentId === parentId) out.push(edge);
  }
  return out.sort((a, b) => a.order - b.order);
}

function edgeFor(
  substrate: Substrate,
  parentId: NodeId,
  childId: NodeId,
): StructuralEdge | undefined {
  for (const edge of substrate.edges.values()) {
    if (edge.parentId === parentId && edge.childId === childId) return edge;
  }
  return undefined;
}

function reindex(edges: StructuralEdge[]): void {
  edges.forEach((e, i) => { e.order = i; });
}

function assertNode(substrate: Substrate, id: NodeId): EditResult<BrambleNode> {
  const node = substrate.nodes.get(id);
  return node ? ok(node) : fail(`Node not found: ${id}`);
}

function assertEdge(
  substrate: Substrate,
  parentId: NodeId,
  childId: NodeId,
): EditResult<StructuralEdge> {
  const edge = edgeFor(substrate, parentId, childId);
  return edge ? ok(edge) : fail(`Edge not found: ${parentId} → ${childId}`);
}

/** BFS collecting nodeId and all transitive descendants. */
function allDescendantIds(substrate: Substrate, nodeId: NodeId): Set<NodeId> {
  const result = new Set<NodeId>();
  const queue: NodeId[] = [nodeId];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) break;
    result.add(current);
    for (const edge of childrenOf(substrate, current)) {
      if (!result.has(edge.childId)) queue.push(edge.childId);
    }
  }
  return result;
}

function monotonicNow(previous: number): number {
  const ts = now();
  return ts > previous ? ts : previous + 1;
}

// ── Substrate factory ──────────────────────────────────────────────────────

/** Create an empty substrate ready to receive nodes and edges. */
export function createSubstrate(): Substrate {
  return { nodes: new Map(), edges: new Map() };
}

// ── Occurrence management ──────────────────────────────────────────────────

/**
 * Create a new occurrence backed by a fresh root node.
 * The root node is structural; its children are the visible top-level entries.
 */
export function createOccurrence(substrate: Substrate): Occurrence {
  const rootId = newNodeId();
  const root: BrambleNode = { id: rootId, content: '', createdAt: now(), updatedAt: now() };
  substrate.nodes.set(rootId, root);
  return { id: randomUUID() as OccurrenceId, rootId };
}

export interface OccurrenceEntry {
  node: BrambleNode;
  /** Zero-based depth relative to the occurrence root's children. */
  depth: number;
}

/**
 * Traverse an occurrence in depth-first pre-order.
 * The root node itself is excluded from the result; its children are at depth 0.
 */
export function traverseOccurrence(
  substrate: Substrate,
  occurrence: Occurrence,
): EditResult<OccurrenceEntry[]> {
  const rootResult = assertNode(substrate, occurrence.rootId);
  if (!rootResult.ok) return rootResult;

  const result: OccurrenceEntry[] = [];

  function dfs(nodeId: NodeId, depth: number): void {
    const node = substrate.nodes.get(nodeId);
    if (!node) return;
    if (nodeId !== occurrence.rootId) result.push({ node, depth });
    for (const edge of childrenOf(substrate, nodeId)) {
      dfs(edge.childId, depth + 1);
    }
  }

  dfs(occurrence.rootId, 0);
  return ok(result);
}

// ── Core editing operations ────────────────────────────────────────────────

/**
 * Insert a new node under `parentId`, positioned immediately after
 * `afterSiblingId` (or first if null).
 *
 * System invariant: every inserted node is reachable from the occurrence root
 * via at least one structural edge chain after the operation completes.
 */
export function insertNode(
  substrate: Substrate,
  parentId: NodeId,
  afterSiblingId: NodeId | null,
  content: string,
): EditResult<BrambleNode> {
  const parentCheck = assertNode(substrate, parentId);
  if (!parentCheck.ok) return parentCheck;

  const siblings = childrenOf(substrate, parentId);

  let insertAfterIndex = -1;
  if (afterSiblingId !== null) {
    insertAfterIndex = siblings.findIndex(e => e.childId === afterSiblingId);
    if (insertAfterIndex === -1) {
      return fail(`Sibling ${afterSiblingId} is not a child of ${parentId}`);
    }
  }

  const newOrder = insertAfterIndex + 1;

  // Shift subsequent siblings to make room
  for (const edge of siblings) {
    if (edge.order >= newOrder) edge.order += 1;
  }

  const nodeId = newNodeId();
  const node: BrambleNode = { id: nodeId, content, createdAt: now(), updatedAt: now() };
  substrate.nodes.set(nodeId, node);

  const edge: StructuralEdge = { id: newEdgeId(), parentId, childId: nodeId, order: newOrder };
  substrate.edges.set(edge.id, edge);

  return ok(node);
}

/**
 * Delete a node and all its transitive descendants.
 * Removes all structural edges incident on any deleted node.
 *
 * System invariant: no dangling edges (edges whose endpoint no longer exists)
 * remain in the substrate after this operation.
 */
export function deleteNode(
  substrate: Substrate,
  nodeId: NodeId,
  parentId: NodeId,
): EditResult<void> {
  const nodeCheck = assertNode(substrate, nodeId);
  if (!nodeCheck.ok) return nodeCheck;

  const edgeCheck = assertEdge(substrate, parentId, nodeId);
  if (!edgeCheck.ok) return edgeCheck;

  const toDelete = allDescendantIds(substrate, nodeId);

  for (const [edgeId, edge] of substrate.edges) {
    if (toDelete.has(edge.parentId) || toDelete.has(edge.childId)) {
      substrate.edges.delete(edgeId);
    }
  }

  for (const id of toDelete) {
    substrate.nodes.delete(id);
  }

  reindex(childrenOf(substrate, parentId));
  return ok(undefined);
}

/**
 * Update the text content of a node.
 *
 * System invariant: `updatedAt` is strictly monotonically increasing;
 * it never regresses even when the wall clock does not advance.
 */
export function setContent(
  substrate: Substrate,
  nodeId: NodeId,
  content: string,
): EditResult<BrambleNode> {
  const result = assertNode(substrate, nodeId);
  if (!result.ok) return result;
  const node = result.value;
  node.content = content;
  node.updatedAt = monotonicNow(node.updatedAt);
  return ok(node);
}

/**
 * Indent a node: make it the last child of its immediately preceding sibling.
 * The node's own children travel with it.
 *
 * System invariant: the DAG remains acyclic after indentation.
 * A node with no preceding sibling cannot be indented.
 */
export function indentNode(
  substrate: Substrate,
  nodeId: NodeId,
  parentId: NodeId,
): EditResult<void> {
  const nodeCheck = assertNode(substrate, nodeId);
  if (!nodeCheck.ok) return nodeCheck;

  const siblings = childrenOf(substrate, parentId);
  const currentIndex = siblings.findIndex(e => e.childId === nodeId);

  if (currentIndex === -1) {
    return fail(`Node ${nodeId} is not a child of ${parentId}`);
  }
  if (currentIndex === 0) {
    return fail(`Node ${nodeId} has no preceding sibling — cannot indent`);
  }

  const precedingSibling = siblings[currentIndex - 1];
  const newParentId = precedingSibling.childId;

  // Acyclicity guard: the new parent must not be a descendant of the node
  if (allDescendantIds(substrate, nodeId).has(newParentId)) {
    return fail(`Indenting ${nodeId} under ${newParentId} would create a cycle`);
  }

  // Detach from current parent
  substrate.edges.delete(siblings[currentIndex].id);
  reindex(childrenOf(substrate, parentId));

  // Attach as last child of preceding sibling
  const newSiblings = childrenOf(substrate, newParentId);
  const newEdge: StructuralEdge = {
    id: newEdgeId(),
    parentId: newParentId,
    childId: nodeId,
    order: newSiblings.length,
  };
  substrate.edges.set(newEdge.id, newEdge);

  return ok(undefined);
}

/**
 * Outdent a node: lift it to be a sibling of its current parent,
 * inserted immediately after the parent in the grandparent's child list.
 * The node's own children travel with it.
 *
 * System invariant: a node whose parent is the occurrence root cannot be
 * outdented (the occurrence root has no parent within the occurrence).
 */
export function outdentNode(
  substrate: Substrate,
  nodeId: NodeId,
  parentId: NodeId,
  grandParentId: NodeId,
): EditResult<void> {
  const nodeCheck = assertNode(substrate, nodeId);
  if (!nodeCheck.ok) return nodeCheck;

  const parentEdge = assertEdge(substrate, parentId, nodeId);
  if (!parentEdge.ok) return parentEdge;

  const grandParentEdge = assertEdge(substrate, grandParentId, parentId);
  if (!grandParentEdge.ok) return grandParentEdge;

  // Detach from current parent
  substrate.edges.delete(parentEdge.value.id);
  reindex(childrenOf(substrate, parentId));

  // Determine insertion position: immediately after parentId under grandParent
  const grandChildren = childrenOf(substrate, grandParentId);
  const parentIndexInGrand = grandChildren.findIndex(e => e.childId === parentId);
  if (parentIndexInGrand === -1) {
    return fail(`Parent ${parentId} not found under ${grandParentId} after re-read`);
  }

  const insertAfterOrder = grandChildren[parentIndexInGrand].order;

  // Shift grandchildren that follow the insertion point
  for (const edge of grandChildren) {
    if (edge.order > insertAfterOrder) edge.order += 1;
  }

  const newEdge: StructuralEdge = {
    id: newEdgeId(),
    parentId: grandParentId,
    childId: nodeId,
    order: insertAfterOrder + 1,
  };
  substrate.edges.set(newEdge.id, newEdge);

  return ok(undefined);
}

/**
 * Move a node from one parent to another, positioned after `afterSiblingId`
 * (or first if null). The node's own children travel with it.
 *
 * System invariant: the DAG remains acyclic after the move.
 */
export function moveNode(
  substrate: Substrate,
  nodeId: NodeId,
  fromParentId: NodeId,
  toParentId: NodeId,
  afterSiblingId: NodeId | null,
): EditResult<void> {
  const nodeCheck = assertNode(substrate, nodeId);
  if (!nodeCheck.ok) return nodeCheck;

  const fromEdge = assertEdge(substrate, fromParentId, nodeId);
  if (!fromEdge.ok) return fromEdge;

  const toParentCheck = assertNode(substrate, toParentId);
  if (!toParentCheck.ok) return toParentCheck;

  // Acyclicity guard
  if (allDescendantIds(substrate, nodeId).has(toParentId)) {
    return fail(`Moving ${nodeId} under ${toParentId} would create a cycle`);
  }

  // Detach from old parent
  substrate.edges.delete(fromEdge.value.id);
  reindex(childrenOf(substrate, fromParentId));

  // Compute insertion position under new parent
  const toSiblings = childrenOf(substrate, toParentId);

  let insertAfterIndex = -1;
  if (afterSiblingId !== null) {
    insertAfterIndex = toSiblings.findIndex(e => e.childId === afterSiblingId);
    if (insertAfterIndex === -1) {
      return fail(`Sibling ${afterSiblingId} is not a child of ${toParentId}`);
    }
  }

  const newOrder = insertAfterIndex + 1;
  for (const edge of toSiblings) {
    if (edge.order >= newOrder) edge.order += 1;
  }

  const newEdge: StructuralEdge = {
    id: newEdgeId(),
    parentId: toParentId,
    childId: nodeId,
    order: newOrder,
  };
  substrate.edges.set(newEdge.id, newEdge);

  return ok(undefined);
}

/**
 * Split a node at a character offset into two consecutive sibling nodes.
 * The original node retains `content[0, offset)`.
 * A new node inserted immediately after receives `content[offset, end)`.
 * All children of the original remain under the original node.
 *
 * Returns the newly created node.
 */
export function splitNode(
  substrate: Substrate,
  nodeId: NodeId,
  parentId: NodeId,
  offset: number,
): EditResult<BrambleNode> {
  const nodeResult = assertNode(substrate, nodeId);
  if (!nodeResult.ok) return nodeResult;

  const edgeCheck = assertEdge(substrate, parentId, nodeId);
  if (!edgeCheck.ok) return edgeCheck;

  const node = nodeResult.value;

  if (offset < 0 || offset > node.content.length) {
    return fail(
      `Offset ${offset} is out of range for node ${nodeId} (content length ${node.content.length})`,
    );
  }

  const tailContent = node.content.slice(offset);
  node.content = node.content.slice(0, offset);
  node.updatedAt = monotonicNow(node.updatedAt);

  return insertNode(substrate, parentId, nodeId, tailContent);
}

/**
 * Merge a node with its immediately preceding sibling.
 * The preceding sibling's content gains the merging node's content appended.
 * All children of the merging node are re-parented to the preceding sibling,
 * appended after the sibling's existing children.
 * The merging node is removed from the substrate.
 *
 * Returns the updated preceding sibling node.
 *
 * System invariant: all descendants of the merging node remain reachable from
 * the occurrence root via the updated preceding sibling after the operation.
 */
export function mergeNodeWithPrev(
  substrate: Substrate,
  nodeId: NodeId,
  parentId: NodeId,
): EditResult<BrambleNode> {
  const nodeResult = assertNode(substrate, nodeId);
  if (!nodeResult.ok) return nodeResult;

  const edgeResult = assertEdge(substrate, parentId, nodeId);
  if (!edgeResult.ok) return edgeResult;

  const siblings = childrenOf(substrate, parentId);
  const currentIndex = siblings.findIndex(e => e.childId === nodeId);

  if (currentIndex === -1) {
    return fail(`Node ${nodeId} is not a child of ${parentId}`);
  }
  if (currentIndex === 0) {
    return fail(`Node ${nodeId} has no preceding sibling — cannot merge`);
  }

  const prevEdge = siblings[currentIndex - 1];
  const prevNodeResult = assertNode(substrate, prevEdge.childId);
  if (!prevNodeResult.ok) return prevNodeResult;

  const node = nodeResult.value;
  const prevNode = prevNodeResult.value;

  // Append content
  prevNode.content = prevNode.content + node.content;
  prevNode.updatedAt = monotonicNow(prevNode.updatedAt);

  // Re-parent children of merging node to prevNode, appended after prevNode's existing children
  const prevChildren = childrenOf(substrate, prevNode.id);
  const baseOrder = prevChildren.length;
  const nodeChildren = childrenOf(substrate, nodeId);

  for (let i = 0; i < nodeChildren.length; i++) {
    const childEdge = nodeChildren[i];
    substrate.edges.delete(childEdge.id);
    const relocated: StructuralEdge = {
      id: newEdgeId(),
      parentId: prevNode.id,
      childId: childEdge.childId,
      order: baseOrder + i,
    };
    substrate.edges.set(relocated.id, relocated);
  }

  // Remove the merging node's edge and node record
  substrate.edges.delete(edgeResult.value.id);
  substrate.nodes.delete(nodeId);

  reindex(childrenOf(substrate, parentId));

  return ok(prevNode);
}

// ── Unified dispatcher ─────────────────────────────────────────────────────

/**
 * Apply a single edit operation to the substrate.
 * On failure the substrate is left in its pre-call state for pure operations;
 * partial mutations on multi-step operations are documented per function.
 */
export function applyEdit(
  substrate: Substrate,
  op: EditOperation,
): EditResult<BrambleNode | void> {
  switch (op.kind) {
    case 'insert-node':
      return insertNode(substrate, op.parentId, op.afterSiblingId, op.content);
    case 'delete-node':
      return deleteNode(substrate, op.nodeId, op.parentId);
    case 'set-content':
      return setContent(substrate, op.nodeId, op.content);
    case 'indent-node':
      return indentNode(substrate, op.nodeId, op.parentId);
    case 'outdent-node':
      return outdentNode(substrate, op.nodeId, op.parentId, op.grandParentId);
    case 'move-node':
      return moveNode(substrate, op.nodeId, op.fromParentId, op.toParentId, op.afterSiblingId);
    case 'split-node':
      return splitNode(substrate, op.nodeId, op.parentId, op.offset);
    case 'merge-node-with-prev':
      return mergeNodeWithPrev(substrate, op.nodeId, op.parentId);
  }
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '09150bacccc739b7595815de0cb35587a9ae5b121c0a93adff4de82dc0746c55',
  name: 'Bramble — Editing',
  risk_tier: 'high',
  canon_ids: [5 as const],
} as const;