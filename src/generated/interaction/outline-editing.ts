import { randomUUID } from 'node:crypto';

// ── Types ─────────────────────────────────────────────────────────────────────

export type NodeId = string;

/**
 * An immutable snapshot of a single outline node.
 * Mutation is done through OutlineEditor methods, which return new snapshots
 * stored internally.
 */
export interface OutlineNode {
  readonly id: NodeId;
  readonly content: string;
  readonly parentId: NodeId | null;
  readonly childIds: ReadonlyArray<NodeId>;
}

/**
 * The transient slot that always trails the last child of a node.
 *
 * It is virtual — absent from the node map — until a typing gesture
 * materialises it as a real node (f-pending-child.type).
 *
 * Invariant: slotIndex === parent.childIds.length at the moment the slot is
 * read.  Callers must re-fetch if the tree has since mutated.
 *
 * f-pending-child.hover  f-pending-child.expand  f-pending-child.page-root
 * f-pending-child.sibling-slot
 */
export interface PendingNodeSlot {
  readonly parentId: NodeId;
  /** Always childIds.length — one past the last child. */
  readonly slotIndex: number;
}

/** Where the editor's caret should land after an operation. */
export interface FocusTarget {
  readonly nodeId: NodeId;
  /** UTF-16 offset into the node's content string. */
  readonly caretPos: number;
}

/** The structural result of any editing operation. */
export interface EditOutcome {
  /** Nodes permanently removed from the tree by this operation. */
  readonly retired: ReadonlyArray<NodeId>;
  /**
   * Where focus and caret should go after the operation.
   * null means "leave focus where it is".
   */
  readonly focusTarget: FocusTarget | null;
}

// ── OutlineEditor ─────────────────────────────────────────────────────────────

export class OutlineEditor {
  private readonly _nodes: Map<NodeId, OutlineNode>;
  private readonly _rootId: NodeId;
  private _focusedNodeId: NodeId | null;

  constructor(rootId: NodeId, initialNodes: Iterable<OutlineNode>) {
    this._rootId = rootId;
    this._nodes = new Map();
    this._focusedNodeId = null;

    for (const n of initialNodes) {
      this._nodes.set(n.id, { ...n, childIds: [...n.childIds] });
    }
    if (!this._nodes.has(rootId)) {
      throw new Error(`OutlineEditor: root node "${rootId}" not found in initialNodes.`);
    }
  }

  // ── Queries ──────────────────────────────────────────────────────────────────

  getNode(id: NodeId): OutlineNode | undefined {
    return this._nodes.get(id);
  }

  getRootId(): NodeId {
    return this._rootId;
  }

  getFocusedNodeId(): NodeId | null {
    return this._focusedNodeId;
  }

  /**
   * Returns the pending-node slot for the given node.
   *
   * The slot always sits after every existing child (slotIndex ===
   * childIds.length), so when the node has no children the pending node is the
   * only item in its body.  The slot is valid regardless of whether the node
   * is collapsed or expanded — collapse state is owned by the Collapse-Expand
   * module and does not affect slot existence here.
   *
   * Invariant · f-pending-child.sibling-slot · t-page-last-node-has-pending-child-below
   */
  getPendingSlot(nodeId: NodeId): PendingNodeSlot {
    const node = this._require(nodeId);
    return { parentId: nodeId, slotIndex: node.childIds.length };
  }

  // ── State setters ─────────────────────────────────────────────────────────────

  setFocus(nodeId: NodeId): void {
    this._require(nodeId);
    this._focusedNodeId = nodeId;
  }

  /**
   * Replaces a node's content without changing tree structure.
   * Callers use this for ordinary keystrokes that do not trigger structural
   * editing (not backspace-at-start, not materialise).
   */
  setContent(nodeId: NodeId, content: string): void {
    const node = this._require(nodeId);
    this._nodes.set(nodeId, { ...node, content });
  }

  // ── Structural editing ────────────────────────────────────────────────────────

  /**
   * Turns the virtual pending slot into a real node.
   *
   * The first character typed in the pending row triggers this.  The new node
   * receives the supplied initial content and focus; its caret lands at the
   * content's end.
   *
   * f-pending-child.type · f-pending-child.cursor-alignment
   * t-pending-row-mention-commit-attaches-at-slot
   */
  materializePendingSlot(slot: PendingNodeSlot, initialContent = ''): EditOutcome {
    const parent = this._require(slot.parentId);
    if (slot.slotIndex !== parent.childIds.length) {
      throw new Error(
        `OutlineEditor: stale pending slot (index ${slot.slotIndex}, ` +
          `parent "${slot.parentId}" now has ${parent.childIds.length} children). ` +
          `Re-fetch via getPendingSlot().`,
      );
    }
    const newId = randomUUID();
    const newNode: OutlineNode = {
      id: newId,
      content: initialContent,
      parentId: slot.parentId,
      childIds: [],
    };
    this._nodes.set(newId, newNode);
    this._nodes.set(slot.parentId, {
      ...parent,
      childIds: [...parent.childIds, newId],
    });
    this._focusedNodeId = newId;
    return {
      retired: [],
      focusTarget: { nodeId: newId, caretPos: initialContent.length },
    };
  }

  /**
   * Inserts a new empty sibling immediately BELOW the given node.
   *
   * The new node lands at (idx + 1) in the parent's child list — between the
   * given node and its current next sibling.  Focus and caret go to the new
   * node at position 0.
   *
   * f-shift-enter.1 · t-sibling-below-lands-between · t-new-sibling-focus-and-caret
   */
  insertSiblingBelow(nodeId: NodeId): EditOutcome {
    return this._insertSibling(nodeId, 'below');
  }

  /**
   * Inserts a new empty sibling immediately ABOVE the given node.
   *
   * The new node lands at idx in the parent's child list — between the given
   * node's previous sibling and the given node itself.  Focus and caret go to
   * the new node at position 0.
   *
   * f-cmd-shift-enter.1 · t-sibling-above-lands-between · t-new-sibling-focus-and-caret
   */
  insertSiblingAbove(nodeId: NodeId): EditOutcome {
    return this._insertSibling(nodeId, 'above');
  }

  /**
   * Handles a Backspace keystroke when the caret is at position 0.
   *
   * **Empty node → retire** (f-3b.1, t-backspace-to-empty-retires-node)
   *   The node is removed.  Any children are promoted to the parent at the
   *   same index, preserving the visible tree shape.  Focus moves to the
   *   logical predecessor: the previous sibling when one exists, otherwise
   *   the parent.  Caret lands at that node's content end.
   *
   * **Non-empty node → join-with-predecessor** (backspace-as-join, net-new)
   *   The node's content is appended to the previous sibling's content; the
   *   node is then removed; the previous sibling adopts any children.  Caret
   *   lands at the join point (end of the predecessor's original content).
   *   When no previous sibling exists the operation is a no-op (first-child
   *   unindent is handled by a separate Indent/Outdent operation).
   *
   * Pressing Backspace at position 0 of the root node is always a no-op.
   */
  backspaceAtStart(nodeId: NodeId): EditOutcome {
    const node = this._require(nodeId);
    if (node.parentId === null) {
      return { retired: [], focusTarget: null };
    }
    const parent = this._require(node.parentId);
    const idx = parent.childIds.indexOf(nodeId);
    if (idx === -1) {
      throw new Error(
        `OutlineEditor: node "${nodeId}" not listed in ` +
          `parent "${node.parentId}" childIds.`,
      );
    }
    return node.content === ''
      ? this._retireNode(nodeId, node, parent, idx)
      : this._joinWithPreviousSibling(nodeId, node, parent, idx);
  }

  /**
   * Deletes the character immediately before caretPos in a node's content.
   *
   * Does not alter tree structure.  Returns the new caret position.
   * Callers must pass caretPos > 0; use backspaceAtStart for position 0.
   *
   * f-3b.2 · f-3b.3 · f-3b.4
   */
  backspaceInContent(nodeId: NodeId, caretPos: number): FocusTarget {
    if (caretPos <= 0) {
      throw new Error(
        `OutlineEditor: backspaceInContent requires caretPos > 0 ` +
          `(received ${caretPos}). Use backspaceAtStart() for position 0.`,
      );
    }
    const node = this._require(nodeId);
    const newContent =
      node.content.slice(0, caretPos - 1) + node.content.slice(caretPos);
    this._nodes.set(nodeId, { ...node, content: newContent });
    return { nodeId, caretPos: caretPos - 1 };
  }

  // ── Snapshot ──────────────────────────────────────────────────────────────────

  /** Returns a defensive copy of all nodes in the current tree. */
  snapshot(): ReadonlyArray<OutlineNode> {
    return Array.from(this._nodes.values()).map((n) => ({
      ...n,
      childIds: [...n.childIds],
    }));
  }

  // ── Private helpers ───────────────────────────────────────────────────────────

  private _require(id: NodeId): OutlineNode {
    const n = this._nodes.get(id);
    if (!n) throw new Error(`OutlineEditor: node "${id}" not found.`);
    return n;
  }

  private _insertSibling(nodeId: NodeId, direction: 'above' | 'below'): EditOutcome {
    const node = this._require(nodeId);
    if (node.parentId === null) {
      throw new Error(
        `OutlineEditor: cannot insert a sibling of the root node "${nodeId}".`,
      );
    }
    const parent = this._require(node.parentId);
    const idx = parent.childIds.indexOf(nodeId);
    if (idx === -1) {
      throw new Error(
        `OutlineEditor: node "${nodeId}" not found in parent "${node.parentId}" childIds.`,
      );
    }
    const insertAt = direction === 'above' ? idx : idx + 1;
    const newId = randomUUID();
    const newNode: OutlineNode = {
      id: newId,
      content: '',
      parentId: node.parentId,
      childIds: [],
    };
    const newChildIds = [
      ...parent.childIds.slice(0, insertAt),
      newId,
      ...parent.childIds.slice(insertAt),
    ];
    this._nodes.set(newId, newNode);
    this._nodes.set(node.parentId, { ...parent, childIds: newChildIds });
    this._focusedNodeId = newId;
    return {
      retired: [],
      focusTarget: { nodeId: newId, caretPos: 0 },
    };
  }

  /**
   * Removes an empty node, promoting its children to its parent at the same
   * position, then returns focus to the logical predecessor.
   */
  private _retireNode(
    nodeId: NodeId,
    node: OutlineNode,
    parent: OutlineNode,
    idx: number,
  ): EditOutcome {
    const elevatedIds = node.childIds as string[];
    for (const childId of elevatedIds) {
      const child = this._require(childId);
      this._nodes.set(childId, { ...child, parentId: parent.id });
    }
    const newParentChildren = [
      ...parent.childIds.slice(0, idx),
      ...elevatedIds,
      ...parent.childIds.slice(idx + 1),
    ];
    this._nodes.set(parent.id, { ...parent, childIds: newParentChildren });
    this._nodes.delete(nodeId);

    const focusTarget = this._predecessorTarget(parent, idx);
    if (focusTarget) {
      this._focusedNodeId = focusTarget.nodeId;
    }
    return { retired: [nodeId], focusTarget };
  }

  /**
   * Appends the current node's content to the previous sibling, moves any
   * children across, then removes the current node.
   */
  private _joinWithPreviousSibling(
    nodeId: NodeId,
    node: OutlineNode,
    parent: OutlineNode,
    idx: number,
  ): EditOutcome {
    if (idx === 0) {
      return { retired: [], focusTarget: null };
    }
    const prevSiblingId = parent.childIds[idx - 1] as string;
    const prevSibling = this._require(prevSiblingId);
    const joinCaretPos = prevSibling.content.length;
    const mergedContent = prevSibling.content + node.content;

    let mergedChildIds = [...prevSibling.childIds];
    if (node.childIds.length > 0) {
      mergedChildIds = [...mergedChildIds, ...(node.childIds as string[])];
      for (const childId of node.childIds) {
        const child = this._require(childId);
        this._nodes.set(childId, { ...child, parentId: prevSiblingId });
      }
    }
    this._nodes.set(prevSiblingId, {
      ...prevSibling,
      content: mergedContent,
      childIds: mergedChildIds,
    });

    const newParentChildren = [
      ...parent.childIds.slice(0, idx),
      ...parent.childIds.slice(idx + 1),
    ];
    this._nodes.set(parent.id, { ...parent, childIds: newParentChildren });
    this._nodes.delete(nodeId);

    this._focusedNodeId = prevSiblingId;
    return {
      retired: [nodeId],
      focusTarget: { nodeId: prevSiblingId, caretPos: joinCaretPos },
    };
  }

  /**
   * Returns the FocusTarget for the node logically preceding
   * parent.childIds[idx].  Falls back to the parent itself when idx === 0.
   */
  private _predecessorTarget(parent: OutlineNode, idx: number): FocusTarget | null {
    if (idx > 0) {
      const prevId = parent.childIds[idx - 1] as string;
      const prev = this._require(prevId);
      return { nodeId: prevId, caretPos: prev.content.length };
    }
    return { nodeId: parent.id, caretPos: parent.content.length };
  }
}

// ── Factory helper ─────────────────────────────────────────────────────────────

/**
 * Builds a minimal single-root outline with no children.
 * Useful as a starting point in tests and page initialisation.
 *
 * t-page-last-node-has-pending-child-below: the root node starts with zero
 * children, so getPendingSlot(rootId).slotIndex === 0 — the pending node is
 * the only item in the body.
 */
export function createEmptyOutline(rootContent = ''): OutlineEditor {
  const rootId = randomUUID();
  const root: OutlineNode = {
    id: rootId,
    content: rootContent,
    parentId: null,
    childIds: [],
  };
  return new OutlineEditor(rootId, [root]);
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '283f3999bd2f2e346d1c0273dab28c7f95afe55377128bd7657cd40e0988727d',
  name: 'Outline-Editing',
  risk_tier: 'high',
  canon_ids: [2 as const],
} as const;