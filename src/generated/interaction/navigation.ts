/**
 * Navigation — Phoenix VCS / Bramble
 *
 * Covers sources: f-open-pane.regular-click, f-nav.up, f-nav.up.edge,
 * f-nav.down, f-nav.down.edge, f-nav.pending-child, f-caret.1–5, f-scroll.1–2.
 *
 * Invariant: activating a row's whitespace (padding or empty end-of-row space,
 * not a control) always focuses the editor at the nearest valid position —
 * never silently ignored.
 */

// ---------------------------------------------------------------------------
// Source & test identifier types
// ---------------------------------------------------------------------------

export type NavigationSourceId =
  | 'f-open-pane.regular-click'
  | 'f-nav.up'
  | 'f-nav.up.edge'
  | 'f-nav.down'
  | 'f-nav.down.edge'
  | 'f-nav.pending-child'
  | 'f-caret.1'
  | 'f-caret.2'
  | 'f-caret.3'
  | 'f-caret.4'
  | 'f-caret.5'
  | 'f-scroll.1'
  | 'f-scroll.2';

export type NavigationTestId =
  | 't-caret'
  | 't-caret-margin-click'
  | 't-caret-enter-pending-child'
  | `t-zoom-click-changes-subject.${string}`;

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

export interface OutlineNode {
  /** Unique stable identifier. */
  id: string;
  /** Parent node id; null for root-level nodes. */
  parentId: string | null;
  /** Nesting depth (0 = top level). */
  depth: number;
  /** Whether this node's children are hidden. */
  collapsed: boolean;
  /**
   * A pending node is a placeholder child not yet materialised in the document.
   * It is the sole target of f-nav.pending-child.
   */
  isPending: boolean;
  /** Current text content of the node. */
  text: string;
}

/** A caret position: which node and character offset within it. */
export interface CaretPosition {
  nodeId: string;
  /** 0-based character offset within the node's text. */
  offset: number;
}

/** A 2-D screen coordinate (pixels). */
export interface Point {
  x: number;
  y: number;
}

/**
 * Geometric description of a rendered row used to resolve click positions
 * (including whitespace) into caret offsets.
 */
export interface RowGeometry {
  nodeId: string;
  bounds: { top: number; left: number; right: number; bottom: number };
  /**
   * Pixel x at which text content begins (right edge of indent + controls).
   * Clicks to the left are in left-padding whitespace.
   */
  contentLeft: number;
  /**
   * Pixel x at which text content ends.
   * Clicks to the right are in trailing whitespace.
   */
  contentRight: number;
  /** Character length of the node's current text. */
  textLength: number;
}

/** Snapshot of navigation state. */
export interface NavigationState {
  /** Current editor caret. Null when the editor is not focused. */
  caret: CaretPosition | null;
  /** The node that currently holds editor focus. */
  focusedNodeId: string | null;
  /** The zoom subject — the node at the root of the current pane view. */
  subjectNodeId: string | null;
  /** Current scroll position in row units. */
  scrollOffset: number;
}

// ---------------------------------------------------------------------------
// Outcome discriminated union
// ---------------------------------------------------------------------------

export type NavigationOutcome =
  | { kind: 'focused'; position: CaretPosition; source: NavigationSourceId }
  | { kind: 'scrolled'; newOffset: number; source: NavigationSourceId }
  | { kind: 'subject-changed'; newSubjectId: string; source: NavigationSourceId }
  | { kind: 'no-op'; reason: string; source: NavigationSourceId };

// ---------------------------------------------------------------------------
// Pure helpers — visibility
// ---------------------------------------------------------------------------

/**
 * Returns the nodes visible in the current pane, in depth-first display order.
 * Descendants of collapsed nodes are excluded.
 * Pending placeholder nodes are included (they are leaves; never have children).
 */
export function visibleNodes(nodes: OutlineNode[]): OutlineNode[] {
  const nodeById = new Map<string, OutlineNode>(
    nodes.map((n): [string, OutlineNode] => [n.id, n]),
  );

  const childrenOf = new Map<string | null, string[]>();
  for (const node of nodes) {
    let arr = childrenOf.get(node.parentId);
    if (!arr) {
      arr = [];
      childrenOf.set(node.parentId, arr);
    }
    arr.push(node.id);
  }

  const result: OutlineNode[] = [];

  function visit(parentId: string | null): void {
    const children = childrenOf.get(parentId) ?? [];
    for (const childId of children) {
      const node = nodeById.get(childId);
      if (!node) continue;
      result.push(node);
      if (!node.collapsed && !node.isPending) {
        visit(node.id);
      }
    }
  }

  visit(null);
  return result;
}

// ---------------------------------------------------------------------------
// Pure helpers — click resolution (whitespace invariant)
// ---------------------------------------------------------------------------

/**
 * Resolves a horizontal click position to a character offset within a row.
 *
 * Whitespace invariant: clicks in left padding snap to 0; clicks in right /
 * trailing whitespace snap to textLength.  The result is always in
 * [0, textLength] — it is never silently dropped.
 */
export function resolveRowClick(clickX: number, geometry: RowGeometry): number {
  const { contentLeft, contentRight, textLength } = geometry;

  if (textLength === 0) return 0;

  if (clickX <= contentLeft) {
    // Left padding / indent area → start of text
    return 0;
  }

  if (clickX >= contentRight) {
    // Trailing whitespace → end of text
    return textLength;
  }

  // Within content bounds: linear interpolation
  const fraction = (clickX - contentLeft) / (contentRight - contentLeft);
  return Math.min(textLength, Math.max(0, Math.round(fraction * textLength)));
}

/**
 * Resolves a click Point on a row to a CaretPosition.
 * Enforces the whitespace invariant — always returns a valid position.
 */
export function resolveWhitespaceClick(
  point: Point,
  geometry: RowGeometry,
): CaretPosition {
  return { nodeId: geometry.nodeId, offset: resolveRowClick(point.x, geometry) };
}

// ---------------------------------------------------------------------------
// Pure helpers — caret arithmetic
// ---------------------------------------------------------------------------

function clampOffset(offset: number, textLength: number): number {
  return Math.min(textLength, Math.max(0, offset));
}

/** Move one character left; null if already at 0 (cross-node handled by caller). */
function stepLeft(pos: CaretPosition): CaretPosition | null {
  if (pos.offset <= 0) return null;
  return { ...pos, offset: pos.offset - 1 };
}

/** Move one character right; null if at end (cross-node handled by caller). */
function stepRight(pos: CaretPosition, textLength: number): CaretPosition | null {
  if (pos.offset >= textLength) return null;
  return { ...pos, offset: pos.offset + 1 };
}

function snapLineStart(pos: CaretPosition): CaretPosition {
  return { ...pos, offset: 0 };
}

function snapLineEnd(pos: CaretPosition, textLength: number): CaretPosition {
  return { ...pos, offset: textLength };
}

/**
 * Advance caret one word to the right.
 * Skips the current non-whitespace run, then skips trailing whitespace.
 */
function stepWordRight(pos: CaretPosition, text: string): CaretPosition {
  let i = pos.offset;
  const len = text.length;
  while (i < len && !/\s/.test(text.charAt(i))) i++;
  while (i < len && /\s/.test(text.charAt(i))) i++;
  return { ...pos, offset: i };
}

// ---------------------------------------------------------------------------
// Navigator
// ---------------------------------------------------------------------------

export type NavigationListener = (outcome: NavigationOutcome) => void;

export class Navigator {
  private _state: NavigationState;
  private readonly _listeners: Set<NavigationListener> = new Set();

  constructor(initial: Partial<NavigationState> = {}) {
    this._state = {
      caret: initial.caret ?? null,
      focusedNodeId: initial.focusedNodeId ?? null,
      subjectNodeId: initial.subjectNodeId ?? null,
      scrollOffset: initial.scrollOffset ?? 0,
    };
  }

  /** Read-only snapshot of current navigation state. */
  getState(): Readonly<NavigationState> {
    return { ...this._state };
  }

  /** Subscribe to navigation outcomes. Returns an unsubscribe callback. */
  subscribe(listener: NavigationListener): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _emit(outcome: NavigationOutcome): void {
    for (const listener of this._listeners) {
      listener(outcome);
    }
  }

  private _focus(position: CaretPosition, source: NavigationSourceId): NavigationOutcome {
    this._state = {
      ...this._state,
      caret: position,
      focusedNodeId: position.nodeId,
    };
    const outcome: NavigationOutcome = { kind: 'focused', position, source };
    this._emit(outcome);
    return outcome;
  }

  private _noOp(reason: string, source: NavigationSourceId): NavigationOutcome {
    return { kind: 'no-op', reason, source };
  }

  // ---- Row navigation -------------------------------------------------------

  /**
   * f-nav.up — Move focus to the previous visible row.
   * Preserves the caret's horizontal offset, clamped to the target's text length.
   * Delegates to navigateUpEdge when already on the first row.
   */
  navigateUp(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-nav.up';
    const visible = visibleNodes(nodes);

    const currentId = this._state.focusedNodeId;
    if (!currentId) {
      const last = visible[visible.length - 1];
      if (!last) return this._noOp('no visible nodes', source);
      return this._focus({ nodeId: last.id, offset: last.text.length }, source);
    }

    const idx = visible.findIndex(n => n.id === currentId);
    if (idx <= 0) return this.navigateUpEdge(nodes);

    const target = visible[idx - 1]!;
    const offset = clampOffset(this._state.caret?.offset ?? 0, target.text.length);
    return this._focus({ nodeId: target.id, offset }, source);
  }

  /**
   * f-nav.up.edge — Snap focus to offset 0 of the topmost visible node.
   * Returns no-op if already there.
   */
  navigateUpEdge(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-nav.up.edge';
    const visible = visibleNodes(nodes);
    const first = visible[0];
    if (!first) return this._noOp('no visible nodes', source);

    if (this._state.focusedNodeId === first.id && this._state.caret?.offset === 0) {
      return this._noOp('already at top edge', source);
    }
    return this._focus({ nodeId: first.id, offset: 0 }, source);
  }

  /**
   * f-nav.down — Move focus to the next visible row.
   * Preserves the caret's horizontal offset, clamped to the target's text length.
   * Delegates to navigateDownEdge when already on the last row.
   */
  navigateDown(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-nav.down';
    const visible = visibleNodes(nodes);

    const currentId = this._state.focusedNodeId;
    if (!currentId) {
      const first = visible[0];
      if (!first) return this._noOp('no visible nodes', source);
      return this._focus({ nodeId: first.id, offset: 0 }, source);
    }

    const idx = visible.findIndex(n => n.id === currentId);
    if (idx < 0 || idx >= visible.length - 1) return this.navigateDownEdge(nodes);

    const target = visible[idx + 1]!;
    const offset = clampOffset(this._state.caret?.offset ?? 0, target.text.length);
    return this._focus({ nodeId: target.id, offset }, source);
  }

  /**
   * f-nav.down.edge — Snap focus to the end of the bottommost visible node.
   * Returns no-op if already there.
   */
  navigateDownEdge(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-nav.down.edge';
    const visible = visibleNodes(nodes);
    const last = visible[visible.length - 1];
    if (!last) return this._noOp('no visible nodes', source);

    const alreadyThere =
      this._state.focusedNodeId === last.id &&
      this._state.caret?.offset === last.text.length;
    if (alreadyThere) return this._noOp('already at bottom edge', source);

    return this._focus({ nodeId: last.id, offset: last.text.length }, source);
  }

  /**
   * f-nav.pending-child — Navigate into the pending-child placeholder of the
   * currently focused node.  Caret lands at offset 0.
   * Satisfies t-caret-enter-pending-child.
   */
  navigateToPendingChild(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-nav.pending-child';
    const currentId = this._state.focusedNodeId;
    if (!currentId) return this._noOp('no focused node', source);

    const pending = nodes.find(n => n.parentId === currentId && n.isPending);
    if (!pending) return this._noOp('no pending child for focused node', source);

    return this._focus({ nodeId: pending.id, offset: 0 }, source);
  }

  // ---- Caret movement — satisfies t-caret ----------------------------------

  /**
   * f-caret.1 — Move caret one character to the left.
   * At offset 0, crosses to the end of the previous visible node.
   */
  caretLeft(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-caret.1';
    const caret = this._state.caret;
    if (!caret) return this._noOp('no active caret', source);

    const moved = stepLeft(caret);
    if (moved) return this._focus(moved, source);

    // Cross into end of previous node
    const visible = visibleNodes(nodes);
    const idx = visible.findIndex(n => n.id === caret.nodeId);
    if (idx <= 0) return this._noOp('at document start', source);

    const prev = visible[idx - 1]!;
    return this._focus({ nodeId: prev.id, offset: prev.text.length }, source);
  }

  /**
   * f-caret.2 — Move caret one character to the right.
   * At end of node, crosses to offset 0 of the next visible node.
   */
  caretRight(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-caret.2';
    const caret = this._state.caret;
    if (!caret) return this._noOp('no active caret', source);

    const nodeText = nodes.find(n => n.id === caret.nodeId)?.text ?? '';
    const moved = stepRight(caret, nodeText.length);
    if (moved) return this._focus(moved, source);

    // Cross into start of next node
    const visible = visibleNodes(nodes);
    const idx = visible.findIndex(n => n.id === caret.nodeId);
    if (idx < 0 || idx >= visible.length - 1) {
      return this._noOp('at document end', source);
    }

    const next = visible[idx + 1]!;
    return this._focus({ nodeId: next.id, offset: 0 }, source);
  }

  /**
   * f-caret.3 — Move caret to start of the current node's text (Home).
   * Returns no-op if already at offset 0.
   */
  caretHome(_nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-caret.3';
    const caret = this._state.caret;
    if (!caret) return this._noOp('no active caret', source);
    if (caret.offset === 0) return this._noOp('already at line start', source);
    return this._focus(snapLineStart(caret), source);
  }

  /**
   * f-caret.4 — Move caret to end of the current node's text (End).
   * Returns no-op if already at text length.
   */
  caretEnd(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-caret.4';
    const caret = this._state.caret;
    if (!caret) return this._noOp('no active caret', source);

    const nodeText = nodes.find(n => n.id === caret.nodeId)?.text ?? '';
    if (caret.offset === nodeText.length) {
      return this._noOp('already at line end', source);
    }
    return this._focus(snapLineEnd(caret, nodeText.length), source);
  }

  /**
   * f-caret.5 — Move caret one word to the right (⌥→ / Ctrl+Right).
   * Returns no-op if already at end of text.
   */
  caretWordRight(nodes: OutlineNode[]): NavigationOutcome {
    const source: NavigationSourceId = 'f-caret.5';
    const caret = this._state.caret;
    if (!caret) return this._noOp('no active caret', source);

    const nodeText = nodes.find(n => n.id === caret.nodeId)?.text ?? '';
    const moved = stepWordRight(caret, nodeText);
    if (moved.offset === caret.offset) {
      return this._noOp('already at word boundary / end', source);
    }
    return this._focus(moved, source);
  }

  // ---- Scroll ---------------------------------------------------------------

  /**
   * f-scroll.1 — Scroll the pane up by `rows` row units (default 3).
   * Clamps to 0; returns no-op if already at the top.
   */
  scrollUp(rows: number = 3): NavigationOutcome {
    const source: NavigationSourceId = 'f-scroll.1';
    if (this._state.scrollOffset <= 0) {
      return this._noOp('already at scroll top', source);
    }
    const newOffset = Math.max(0, this._state.scrollOffset - rows);
    this._state = { ...this._state, scrollOffset: newOffset };
    const outcome: NavigationOutcome = { kind: 'scrolled', newOffset, source };
    this._emit(outcome);
    return outcome;
  }

  /**
   * f-scroll.2 — Scroll the pane down by `rows` row units (default 3).
   * Clamps to maxOffset; returns no-op if already at the bottom.
   */
  scrollDown(rows: number = 3, maxOffset: number = Number.MAX_SAFE_INTEGER): NavigationOutcome {
    const source: NavigationSourceId = 'f-scroll.2';
    if (this._state.scrollOffset >= maxOffset) {
      return this._noOp('already at scroll bottom', source);
    }
    const newOffset = Math.min(maxOffset, this._state.scrollOffset + rows);
    this._state = { ...this._state, scrollOffset: newOffset };
    const outcome: NavigationOutcome = { kind: 'scrolled', newOffset, source };
    this._emit(outcome);
    return outcome;
  }

  // ---- Click-based navigation -----------------------------------------------

  /**
   * f-open-pane.regular-click — A regular (non-zoom, non-control) click on a row.
   *
   * Resolves the click point to the nearest caret position.  The whitespace
   * invariant is enforced unconditionally: padding and trailing-space clicks snap
   * to the nearest valid offset and are never silently dropped.
   *
   * Satisfies t-caret-margin-click when clickX falls left of contentLeft.
   */
  handleRegularClick(point: Point, geometry: RowGeometry): NavigationOutcome {
    const source: NavigationSourceId = 'f-open-pane.regular-click';
    // resolveWhitespaceClick always returns a valid position — invariant held.
    const position = resolveWhitespaceClick(point, geometry);
    return this._focus(position, source);
  }

  /**
   * Margin click (bullet icon / indent gutter).
   * Snaps the caret to offset 0 of the node — satisfies t-caret-margin-click.
   */
  handleMarginClick(nodeId: string): NavigationOutcome {
    const source: NavigationSourceId = 'f-open-pane.regular-click';
    return this._focus({ nodeId, offset: 0 }, source);
  }

  /**
   * Zoom-icon or breadcrumb click that changes the pane subject.
   * Satisfies t-zoom-click-changes-subject.*.
   */
  handleZoomClick(newSubjectId: string): NavigationOutcome {
    const source: NavigationSourceId = 'f-open-pane.regular-click';
    this._state = { ...this._state, subjectNodeId: newSubjectId };
    const outcome: NavigationOutcome = {
      kind: 'subject-changed',
      newSubjectId,
      source,
    };
    this._emit(outcome);
    return outcome;
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/** Convenience factory for creating a Navigator with optional initial state. */
export function createNavigator(initial: Partial<NavigationState> = {}): Navigator {
  return new Navigator(initial);
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '94d6402d3dc27822f49a19ffb8407884a0f74e8568ee8539fec2b5d535d65fa7',
  name: 'Navigation',
  risk_tier: 'high',
  canon_ids: [2 as const],
} as const;