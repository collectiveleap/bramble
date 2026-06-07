/**
 * Bramble — Interaction Grammar
 *
 * Binds abstract user gestures to neutral graph/editing/node operations.
 * States focus rules. Declares view-rendering requirements.
 * Medium-agnostic: no DOM, no terminal, no rendering assumptions.
 */

// ─── Internal utilities ───────────────────────────────────────────────────────

function unreachable(_x: never, context: string): never {
  throw new Error(`[interaction-grammar] unreachable case in ${context}`);
}

// ─── Primitive aliases ────────────────────────────────────────────────────────

/** Calendar date as a YYYY-MM-DD string, branded for type safety. */
export type ISODateString = string & { readonly _brand: 'ISODate' };

export function toISODateString(raw: string): ISODateString {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    throw new Error(`toISODateString: expected YYYY-MM-DD, got "${raw}"`);
  }
  return raw as ISODateString;
}

/**
 * Returns true when date equals today.
 * Source: f-day-title.3
 */
export function isToday(date: ISODateString, today: ISODateString): boolean {
  return date === today;
}

// ─── Interaction-target types ─────────────────────────────────────────────────

/** Source: f-headline.1, f-headline.empty */
export interface HeadlineTarget {
  readonly area: 'headline';
  readonly nodeId: string;
}

/** Source: f-page-header.1, f-page-header.2, f-page-header.4 */
export interface PageHeaderTarget {
  readonly area: 'page-header';
  readonly nodeId: string;
}

/** Source: f-dag.phase3e.multi-parent-badge */
export interface MultiParentBadgeTarget {
  readonly area: 'multi-parent-badge';
  readonly nodeId: string;
}

/**
 * Source: f-dag.phase3e.{predecessor-nav-list, predecessor-nav-inline,
 *         predecessor-nav-dropdown, predecessor-nav-switch,
 *         predecessor-nav-open-pane}
 */
export interface PredecessorNavTarget {
  readonly area: 'predecessor-nav';
  /** Node whose predecessors are being navigated. */
  readonly nodeId: string;
  /** The specific predecessor the user activated. */
  readonly predecessorId: string;
  /** Which nav surface originated the gesture. */
  readonly variant: 'list' | 'inline' | 'dropdown-item';
}

/** Source: f-day-title.{1,2,3} */
export interface DayTitleTarget {
  readonly area: 'day-title';
  readonly date: ISODateString;
}

/** Source: f-pdf-upload.drop-target-per-row.* */
export interface PdfDropZoneTarget {
  readonly area: 'pdf-drop-zone';
  readonly rowId: string;
}

/** Source: f-supertag.types-shown.filter */
export interface SupertagTypeFilterTarget {
  readonly area: 'supertag-type-filter';
  readonly tagId: string;
}

/** Source: f-supertag.open-instance-control */
export interface SupertagOpenControlTarget {
  readonly area: 'supertag-open-control';
  readonly nodeId: string;
  readonly tagId: string;
}

/** Source: f-6.phase3b.promote, f-6.phase3b.promote.reuse */
export interface PromoteRowTarget {
  readonly area: 'promote-row';
  readonly rowId: string;
}

export type InteractionTarget =
  | HeadlineTarget
  | PageHeaderTarget
  | MultiParentBadgeTarget
  | PredecessorNavTarget
  | DayTitleTarget
  | PdfDropZoneTarget
  | SupertagTypeFilterTarget
  | SupertagOpenControlTarget
  | PromoteRowTarget;

// ─── Gestures ─────────────────────────────────────────────────────────────────

/** Pointer or keyboard modifier held during a gesture. */
export type Modifier = 'none' | 'shift' | 'meta' | 'alt';

/** Content carried in a drag-drop payload. */
export interface PdfDropPayload {
  readonly kind: 'pdf';
  readonly fileName: string;
  readonly bytes: Uint8Array;
}

export type DropPayload = PdfDropPayload;

/**
 * A medium-agnostic description of a user intent.
 *
 * Producing layers (DOM event handlers, terminal key maps, …) translate their
 * native events into Gesture values. The grammar resolves these to Operations.
 */
export type Gesture =
  | {
      readonly kind: 'activate';
      readonly target: InteractionTarget;
      readonly modifier: Modifier;
    }
  | {
      readonly kind: 'edit-begin';
      readonly target: HeadlineTarget | PageHeaderTarget;
    }
  | {
      readonly kind: 'edit-commit';
      readonly target: HeadlineTarget | PageHeaderTarget;
      readonly text: string;
    }
  | {
      readonly kind: 'edit-cancel';
      readonly target: HeadlineTarget | PageHeaderTarget;
    }
  | {
      readonly kind: 'drop-payload';
      readonly target: PdfDropZoneTarget;
      readonly payload: DropPayload;
    };

// ─── Operations ───────────────────────────────────────────────────────────────

/**
 * A neutral, medium-agnostic operation emitted by the grammar.
 *
 * Consuming layers apply these to the graph/editing/node models.
 * No rendering instruction is ever encoded here.
 */
export type Operation =
  | { readonly op: 'set-focus'; readonly nodeId: string; readonly area: FocusArea }
  | { readonly op: 'clear-focus' }
  | { readonly op: 'begin-headline-edit'; readonly nodeId: string }
  | { readonly op: 'commit-headline-edit'; readonly nodeId: string; readonly text: string }
  | { readonly op: 'cancel-headline-edit'; readonly nodeId: string }
  | { readonly op: 'switch-subject'; readonly nodeId: string }
  | { readonly op: 'open-in-pane'; readonly nodeId: string }
  | { readonly op: 'show-predecessor-dropdown'; readonly nodeId: string }
  | { readonly op: 'expand-parent'; readonly nodeId: string }
  | {
      readonly op: 'ingest-pdf';
      readonly rowId: string;
      readonly fileName: string;
      readonly bytes: Uint8Array;
    }
  | { readonly op: 'filter-supertag-type'; readonly tagId: string }
  | { readonly op: 'open-supertag-instance'; readonly nodeId: string; readonly tagId: string }
  | { readonly op: 'create-wrapper-under-today'; readonly rowId: string }
  | { readonly op: 'reuse-wrapper'; readonly rowId: string; readonly wrapperId: string }
  | { readonly op: 'no-op'; readonly reason: string };

/** Where keyboard/input focus resides within the Bramble UI. */
export type FocusArea =
  | 'headline'
  | 'page-header'
  | 'body'
  | 'predecessor-nav'
  | 'supertag-control';

// ─── Focus state ──────────────────────────────────────────────────────────────

export interface FocusState {
  readonly nodeId: string | null;
  readonly area: FocusArea | null;
  readonly editingHeadline: boolean;
}

export const INITIAL_FOCUS_STATE: FocusState = {
  nodeId: null,
  area: null,
  editingHeadline: false,
} as const;

/**
 * Reduces focus state by a single operation.
 * Apply all operations returned by resolveGesture in sequence.
 *
 * Source: f-headline.1, f-headline.empty, f-page-header.{1,2,4},
 *         f-dag.phase3e.predecessor-nav-switch
 */
export function applyOperationToFocus(
  state: FocusState,
  op: Operation,
): FocusState {
  switch (op.op) {
    case 'set-focus':
      return { nodeId: op.nodeId, area: op.area, editingHeadline: state.editingHeadline };
    case 'clear-focus':
      return INITIAL_FOCUS_STATE;
    case 'begin-headline-edit':
      // area was already set by the preceding set-focus; preserve it.
      return { nodeId: op.nodeId, area: state.area, editingHeadline: true };
    case 'commit-headline-edit':
    case 'cancel-headline-edit':
      return { nodeId: state.nodeId, area: state.area, editingHeadline: false };
    case 'switch-subject':
      return { nodeId: op.nodeId, area: 'body', editingHeadline: false };
    default:
      return state;
  }
}

// ─── Focus rules ──────────────────────────────────────────────────────────────

/**
 * A focus rule states an invariant about legal focus transitions.
 * systemInvariant rules survive implementation rewrites.
 */
export interface FocusRule {
  readonly id: string;
  readonly description: string;
  readonly systemInvariant: boolean;
  readonly sources: readonly string[];
}

/** All declared focus rules, each traceable to source feature IDs. */
export const FOCUS_RULES: readonly FocusRule[] = [
  {
    id: 'focus.activate-headline-enters-edit',
    description:
      'Activating a headline or page-header that is not already in edit mode ' +
      'begins edit mode and directs focus to that node.',
    systemInvariant: true,
    sources: ['f-headline.1', 'f-page-header.1'],
  },
  {
    id: 'focus.empty-headline-auto-edit',
    description:
      'A node whose headline is empty enters edit mode automatically when it ' +
      'becomes the focused subject — no additional activate gesture is required.',
    systemInvariant: true,
    sources: ['f-headline.empty'],
  },
  {
    id: 'focus.page-header-edit-read-modes',
    description:
      'The page-header alternates between read mode (headline displayed) and ' +
      'edit mode (headline editable). Exactly one mode is active at any time.',
    systemInvariant: true,
    sources: ['f-page-header.2', 'f-page-header.4'],
  },
  {
    id: 'focus.predecessor-nav-retains-area',
    description:
      'After switching the view subject via predecessor navigation, the focus ' +
      'area remains "predecessor-nav" until the user performs a distinct activate gesture.',
    systemInvariant: false,
    sources: [
      'f-dag.phase3e.predecessor-nav-switch',
      'f-dag.phase3e.predecessor-nav-list',
    ],
  },
  {
    id: 'focus.supertag-open-control-no-focus-hijack',
    description:
      'Activating the supertag open-instance control does not shift keyboard ' +
      'focus away from the current body area.',
    systemInvariant: false,
    sources: ['f-supertag.open-instance-control'],
  },
];

// ─── Binding context ──────────────────────────────────────────────────────────

/**
 * Context the grammar consults to resolve ambiguous gestures.
 * The grammar is stateless; this is supplied per-call by the consumer.
 */
export interface BindingContext {
  /** Today's ISO date — used for day-title comparisons and wrapper placement. */
  readonly today: ISODateString;
  /** Current focus state. */
  readonly focus: FocusState;
  /**
   * Returns the ordered predecessor (parent) IDs for a node.
   * Source: f-dag.phase3e.*
   */
  predecessorsOf(nodeId: string): readonly string[];
  /**
   * Returns an existing wrapper node ID for the given row, or null if none.
   * Source: f-6.phase3b.promote.reuse
   */
  existingWrapperFor(rowId: string): string | null;
}

// ─── Core grammar resolver ────────────────────────────────────────────────────

/**
 * Maps one gesture to an ordered sequence of neutral operations.
 *
 * This is the single authoritative point where user intent is translated to
 * graph/editing/node operations. All medium-specific event sources must call
 * this function; no caller should implement its own gesture → operation mapping.
 *
 * Sources (exhaustive):
 *   f-headline.{1, empty}
 *   f-page-header.{1, 2, 4, 7, 8, 9, 10, 11, 12}
 *   f-dag.phase3e.{multi-parent-badge, predecessor-nav-list,
 *                  predecessor-nav-inline, predecessor-nav-dropdown,
 *                  predecessor-nav-switch, predecessor-nav-open-pane}
 *   f-indent.auto-expand-parent
 *   f-day-title.{1, 2, 3}
 *   f-pdf-upload.{chip-rendering, drop-target-per-row.*}
 *   f-supertag.{types-shown.filter, open-instance-control}
 *   f-6.phase3b.{promote, promote.reuse}
 *   f-v2.12
 */
export function resolveGesture(
  gesture: Gesture,
  ctx: BindingContext,
): readonly Operation[] {
  switch (gesture.kind) {
    case 'activate':
      return resolveActivate(gesture.target, gesture.modifier, ctx);

    case 'edit-begin':
      // Source: f-headline.1, f-page-header.1
      return [
        { op: 'set-focus', nodeId: gesture.target.nodeId, area: gesture.target.area },
        { op: 'begin-headline-edit', nodeId: gesture.target.nodeId },
      ];

    case 'edit-commit':
      // Source: f-headline.1, f-page-header.2
      return [
        {
          op: 'commit-headline-edit',
          nodeId: gesture.target.nodeId,
          text: gesture.text,
        },
      ];

    case 'edit-cancel':
      // Source: f-page-header.4
      return [
        { op: 'cancel-headline-edit', nodeId: gesture.target.nodeId },
      ];

    case 'drop-payload':
      // Source: f-pdf-upload.drop-target-per-row.*, f-pdf-upload.chip-rendering
      return [
        {
          op: 'ingest-pdf',
          rowId: gesture.target.rowId,
          fileName: gesture.payload.fileName,
          bytes: gesture.payload.bytes,
        },
      ];
  }
}

function resolveActivate(
  target: InteractionTarget,
  modifier: Modifier,
  ctx: BindingContext,
): readonly Operation[] {
  switch (target.area) {
    // ── Headline ──────────────────────────────────────────────────────────────
    // Source: f-headline.1, f-headline.empty
    case 'headline':
      return [
        { op: 'set-focus', nodeId: target.nodeId, area: 'headline' },
        { op: 'begin-headline-edit', nodeId: target.nodeId },
      ];

    // ── Page-header ───────────────────────────────────────────────────────────
    // Source: f-page-header.1, f-page-header.2, f-page-header.4
    case 'page-header':
      return [
        { op: 'set-focus', nodeId: target.nodeId, area: 'page-header' },
        { op: 'begin-headline-edit', nodeId: target.nodeId },
      ];

    // ── Multi-parent badge ────────────────────────────────────────────────────
    // Source: f-dag.phase3e.multi-parent-badge
    case 'multi-parent-badge':
      return [
        { op: 'show-predecessor-dropdown', nodeId: target.nodeId },
        { op: 'set-focus', nodeId: target.nodeId, area: 'predecessor-nav' },
      ];

    // ── Predecessor navigation ────────────────────────────────────────────────
    // Source: f-dag.phase3e.{predecessor-nav-list, predecessor-nav-inline,
    //         predecessor-nav-dropdown, predecessor-nav-switch,
    //         predecessor-nav-open-pane}, f-indent.auto-expand-parent
    case 'predecessor-nav':
      if (modifier === 'shift') {
        // Shift-activate: open predecessor in a side pane, no subject switch.
        // Source: f-dag.phase3e.predecessor-nav-open-pane
        return [
          { op: 'open-in-pane', nodeId: target.predecessorId },
        ];
      }
      // Plain activate: switch subject to predecessor and auto-expand it.
      // Source: f-dag.phase3e.predecessor-nav-switch, f-indent.auto-expand-parent
      return [
        { op: 'switch-subject', nodeId: target.predecessorId },
        { op: 'expand-parent', nodeId: target.predecessorId },
      ];

    // ── Day title ─────────────────────────────────────────────────────────────
    // Source: f-day-title.{1,2,3}
    case 'day-title':
      return [
        { op: 'switch-subject', nodeId: target.date },
      ];

    // ── PDF drop zone ─────────────────────────────────────────────────────────
    // Activate alone carries no payload; actual drops arrive as 'drop-payload'.
    // Source: f-pdf-upload.drop-target-per-row.*
    case 'pdf-drop-zone':
      return [
        {
          op: 'no-op',
          reason: 'pdf-drop-zone activate without payload — drops arrive as drop-payload gesture',
        },
      ];

    // ── Supertag type filter ──────────────────────────────────────────────────
    // Source: f-supertag.types-shown.filter
    case 'supertag-type-filter':
      return [
        { op: 'filter-supertag-type', tagId: target.tagId },
      ];

    // ── Supertag open-instance control ────────────────────────────────────────
    // Source: f-supertag.open-instance-control
    case 'supertag-open-control':
      if (modifier === 'shift') {
        // Shift-activate: open the instance node in a side pane.
        return [
          { op: 'open-in-pane', nodeId: target.nodeId },
        ];
      }
      // Plain activate: navigate to the supertag instance inline.
      return [
        { op: 'open-supertag-instance', nodeId: target.nodeId, tagId: target.tagId },
      ];

    // ── Promote row ───────────────────────────────────────────────────────────
    // Source: f-6.phase3b.promote, f-6.phase3b.promote.reuse
    case 'promote-row': {
      const wrapperId = ctx.existingWrapperFor(target.rowId);
      if (wrapperId !== null) {
        // Reuse the existing wrapper node.
        return [{ op: 'reuse-wrapper', rowId: target.rowId, wrapperId }];
      }
      // Create a new wrapper node placed under today.
      return [{ op: 'create-wrapper-under-today', rowId: target.rowId }];
    }

    default:
      return unreachable(target, 'resolveActivate');
  }
}

// ─── View requirements ────────────────────────────────────────────────────────

/**
 * Declares what a rendering layer MUST convey to the user.
 * How it is conveyed (HTML elements, TUI boxes, audio, …) is never specified.
 *
 * systemInvariant entries survive rendering-layer rewrites.
 */
export interface ViewRequirement {
  readonly id: string;
  readonly description: string;
  readonly systemInvariant: boolean;
  readonly sources: readonly string[];
}

/** All view requirements, each traceable to source feature IDs. */
export const VIEW_REQUIREMENTS: readonly ViewRequirement[] = [
  // ── Headline / page-header ────────────────────────────────────────────────
  {
    id: 'view.headline-text',
    description:
      'The current headline text of the focused node must be conveyed.',
    systemInvariant: true,
    sources: ['f-headline.1', 'f-page-header.1'],
  },
  {
    id: 'view.headline-empty-affordance',
    description:
      'When the headline text is empty, an affordance signalling that text ' +
      'entry is available must be conveyed.',
    systemInvariant: true,
    sources: ['f-headline.empty'],
  },
  {
    id: 'view.page-header-edit-read-distinction',
    description:
      'The view must distinguish between the page-header being in edit mode ' +
      '(accepting text input) and read mode (displaying committed text).',
    systemInvariant: true,
    sources: ['f-page-header.2', 'f-page-header.4'],
  },
  {
    id: 'view.page-header-node-type',
    description:
      'The supertag type of the subject node must be conveyed in the page-header area.',
    systemInvariant: true,
    sources: ['f-page-header.7', 'f-page-header.8'],
  },
  {
    id: 'view.page-header-field-group-on-expand',
    description:
      'When the page-header is in its expanded state, the field group for ' +
      'the subject node must be conveyed.',
    systemInvariant: false,
    sources: ['f-page-header.9', 'f-v2.12'],
  },
  {
    id: 'view.page-header-predecessor-count',
    description:
      'When the subject node has more than one predecessor (parent), the ' +
      'predecessor count must be conveyed in the page-header.',
    systemInvariant: true,
    sources: ['f-page-header.10', 'f-page-header.11', 'f-dag.phase3e.multi-parent-badge'],
  },
  {
    id: 'view.page-header-predecessor-nav-controls',
    description:
      'When the subject node has predecessors, navigation controls affording ' +
      'movement to those predecessors must be conveyed.',
    systemInvariant: true,
    sources: ['f-page-header.12', 'f-dag.phase3e.predecessor-nav-list'],
  },
  // ── DAG / predecessor navigation ──────────────────────────────────────────
  {
    id: 'view.multi-parent-badge',
    description:
      'A node with more than one parent must display a badge or indicator ' +
      'conveying the multi-parent condition and parent count.',
    systemInvariant: true,
    sources: ['f-dag.phase3e.multi-parent-badge'],
  },
  {
    id: 'view.predecessor-nav-list-when-open',
    description:
      'When predecessor navigation is open, the ordered list of predecessor ' +
      'nodes must be conveyed, each affording an activate gesture.',
    systemInvariant: true,
    sources: [
      'f-dag.phase3e.predecessor-nav-list',
      'f-dag.phase3e.predecessor-nav-dropdown',
    ],
  },
  {
    id: 'view.predecessor-nav-inline',
    description:
      'An inline affordance for predecessor navigation must be conveyed at ' +
      'a node whenever that node has at least one predecessor.',
    systemInvariant: false,
    sources: ['f-dag.phase3e.predecessor-nav-inline'],
  },
  // ── Day title ─────────────────────────────────────────────────────────────
  {
    id: 'view.day-title-date',
    description:
      "The day node's title must convey the calendar date unambiguously.",
    systemInvariant: true,
    sources: ['f-day-title.1', 'f-day-title.2'],
  },
  {
    id: 'view.day-title-today-marker',
    description:
      'When the day node\'s date equals today, a distinct marker indicating ' +
      '"today" must be conveyed separately from the date text.',
    systemInvariant: true,
    sources: ['f-day-title.3'],
  },
  // ── PDF upload ────────────────────────────────────────────────────────────
  {
    id: 'view.pdf-drop-zone-affordance',
    description:
      'While a drag carrying a PDF payload is active, each row must convey ' +
      'that it is a valid drop target.',
    systemInvariant: false,
    sources: ['f-pdf-upload.drop-target-per-row.*'],
  },
  {
    id: 'view.pdf-chip-after-attach',
    description:
      'After a PDF is attached to a row, a chip or equivalent indicator ' +
      'conveying the attachment must be visible within that row.',
    systemInvariant: true,
    sources: ['f-pdf-upload.chip-rendering'],
  },
  // ── Supertag / promote ────────────────────────────────────────────────────
  {
    id: 'view.supertag-type-filter-active',
    description:
      'When a supertag type filter is active, only nodes whose type matches ' +
      'the filter must be conveyed in the list.',
    systemInvariant: false,
    sources: ['f-supertag.types-shown.filter'],
  },
  {
    id: 'view.supertag-open-control-present',
    description:
      'A control affording navigation to the supertag instance node must be ' +
      'conveyed alongside each typed node.',
    systemInvariant: true,
    sources: ['f-supertag.open-instance-control'],
  },
  {
    id: 'view.promote-row-affordance',
    description:
      'An affordance to promote an outline row to a named wrapper node must ' +
      'be conveyed per-row.',
    systemInvariant: false,
    sources: ['f-6.phase3b.promote'],
  },
];

// ─── Traceability helpers ─────────────────────────────────────────────────────

/**
 * Returns all view requirements that cite the given source feature ID.
 */
export function viewRequirementsBySource(
  sourceId: string,
): readonly ViewRequirement[] {
  return VIEW_REQUIREMENTS.filter((r) => r.sources.includes(sourceId));
}

/**
 * Returns all focus rules that cite the given source feature ID.
 */
export function focusRulesBySource(sourceId: string): readonly FocusRule[] {
  return FOCUS_RULES.filter((r) => r.sources.includes(sourceId));
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '320c46b717081d973b28837a9b39f8409df863fcd0cb26364896aaa230fef263',
  name: 'Bramble — Interaction Grammar',
  risk_tier: 'high',
  canon_ids: [8 as const],
} as const;