/**
 * Collapse-Expand module for Phoenix VCS / Bramble outline view.
 *
 * Implements gutter markers, vertical guides, and chevron reveal controls
 * per invariants f-v2.1 – f-v2.6c, f-v2.10, f-v2.11 (evals t-9.*).
 *
 * No DOM access — all rendering is string-template based. Callers are
 * responsible for injecting the generated stylesheet once and wiring
 * pointer/keyboard events via the exported delegation helpers.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type CollapseState = 'expanded' | 'collapsed' | 'leaf';

export interface OccurrenceNode {
  /** Stable unique identifier for this occurrence. */
  id: string;
  /** Zero-based nesting depth. */
  depth: number;
  /** True when this node has at least one child occurrence. */
  hasChildren: boolean;
  /** Ordered child node IDs. Empty for leaves and collapsed parents. */
  childIds: readonly string[];
}

export interface CollapseExpandConfig {
  /** CSS class prefix for all generated elements. Default: 'px-ce'. */
  classPrefix: string;
  /**
   * Total gutter width in pixels. Must be equal for all siblings so that
   * text columns stay aligned regardless of individual collapse state
   * (invariant f-v2.1).
   */
  gutterWidth: number;
  /**
   * Width in pixels of the chevron/spacer slot that is always reserved
   * before the marker (invariant f-v2.2 — slot reserved at all times so
   * layout never shifts).
   */
  controlSlotWidth: number;
  /** Human-readable shortcut hint shown in the control's tooltip (f-v2.6c). */
  shortcutHint: string;
  /** CSS transition duration for chevron opacity in milliseconds. */
  transitionDurationMs: number;
}

export interface GutterMetrics {
  /** Full gutter width shared by all siblings. */
  totalWidth: number;
  /** Pixel offset at which the marker starts (= controlSlotWidth). */
  markerOffset: number;
  /** Width of the reserved chevron/spacer slot. */
  controlSlotWidth: number;
}

export interface RenderOptions {
  /** True when the pointer is over this row. Controls chevron visibility. */
  hovered: boolean;
  /** True when the chevron control holds keyboard focus (keeps it visible). */
  focused: boolean;
}

export interface RenderedOccurrence {
  /** Complete HTML string for this occurrence's gutter cell. */
  gutterHtml: string;
  /**
   * When true the caller should render a vertical guide line descending from
   * this gutter through its children's gutter column (f-v2.3).
   */
  showGuide: boolean;
  /** Collapse state at the moment of rendering. */
  collapseState: CollapseState;
}

export interface CollapseToggleResult {
  nodeId: string;
  previousState: CollapseState;
  nextState: CollapseState;
}

export interface FlatNode {
  node: OccurrenceNode;
  renderOptions: RenderOptions;
}

export type ShortcutAction = 'toggle' | 'collapse' | 'expand' | 'none';

export interface CollapseKeyAction {
  type: ShortcutAction;
  nodeId: string;
}

export interface SyntheticKeyboardEvent {
  code: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const DATA_NODE_ID = 'data-node-id' as const;
export const DATA_ACTION = 'data-action' as const;
export const ACTION_TOGGLE_COLLAPSE = 'toggle-collapse' as const;

const DEFAULT_CONFIG: CollapseExpandConfig = {
  classPrefix: 'px-ce',
  gutterWidth: 24,
  controlSlotWidth: 16,
  shortcutHint: 'Toggle collapse — Space / Enter; ← collapse; → expand',
  transitionDurationMs: 120,
};

// ─────────────────────────────────────────────────────────────────────────────
// Configuration helper
// ─────────────────────────────────────────────────────────────────────────────

export function resolveConfig(
  partial: Partial<CollapseExpandConfig> = {},
): CollapseExpandConfig {
  return { ...DEFAULT_CONFIG, ...partial };
}

// ─────────────────────────────────────────────────────────────────────────────
// Gutter metrics
// ─────────────────────────────────────────────────────────────────────────────

export function computeGutterMetrics(config: CollapseExpandConfig): GutterMetrics {
  return {
    totalWidth: config.gutterWidth,
    markerOffset: config.controlSlotWidth,
    controlSlotWidth: config.controlSlotWidth,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Parent-map utility (used by visibility checks)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds a child→parent lookup from a flat node map.
 * O(total children) — call once per render cycle and cache.
 */
export function buildParentMap(
  nodes: ReadonlyMap<string, OccurrenceNode>,
): ReadonlyMap<string, string> {
  const map = new Map<string, string>();
  for (const [parentId, node] of nodes) {
    for (const childId of node.childIds) {
      map.set(childId, parentId);
    }
  }
  return map;
}

// ─────────────────────────────────────────────────────────────────────────────
// State manager
// ─────────────────────────────────────────────────────────────────────────────

export interface CollapseExpandState {
  /** Returns the current collapse state for the given node. */
  getCollapseState(nodeId: string): CollapseState;
  /** Toggles between 'expanded' and 'collapsed'. No-op on leaves. */
  toggle(nodeId: string): CollapseToggleResult;
  /** Collapses an expanded node. No-op on leaves and already-collapsed. */
  collapse(nodeId: string): CollapseToggleResult;
  /** Expands a collapsed node. No-op on leaves and already-expanded. */
  expand(nodeId: string): CollapseToggleResult;
  /**
   * Returns true when a node is visible — i.e. no ancestor in the provided
   * node map is in 'collapsed' state.
   */
  isVisible(nodeId: string, parentMap: ReadonlyMap<string, string>): boolean;
}

export function createCollapseExpandState(
  nodes: ReadonlyMap<string, OccurrenceNode>,
  initialCollapsed: ReadonlySet<string> = new Set(),
): CollapseExpandState {
  const overrides = new Map<string, 'expanded' | 'collapsed'>();

  function resolveState(nodeId: string): CollapseState {
    const node = nodes.get(nodeId);
    if (!node || !node.hasChildren) return 'leaf';
    const override = overrides.get(nodeId);
    if (override !== undefined) return override;
    return initialCollapsed.has(nodeId) ? 'collapsed' : 'expanded';
  }

  function setOverride(nodeId: string, next: 'expanded' | 'collapsed'): void {
    const node = nodes.get(nodeId);
    if (!node || !node.hasChildren) return;
    overrides.set(nodeId, next);
  }

  return {
    getCollapseState(nodeId: string): CollapseState {
      return resolveState(nodeId);
    },

    toggle(nodeId: string): CollapseToggleResult {
      const prev = resolveState(nodeId);
      if (prev === 'leaf') {
        return { nodeId, previousState: 'leaf', nextState: 'leaf' };
      }
      const next: 'expanded' | 'collapsed' =
        prev === 'expanded' ? 'collapsed' : 'expanded';
      setOverride(nodeId, next);
      return { nodeId, previousState: prev, nextState: next };
    },

    collapse(nodeId: string): CollapseToggleResult {
      const prev = resolveState(nodeId);
      if (prev !== 'expanded') {
        return { nodeId, previousState: prev, nextState: prev };
      }
      setOverride(nodeId, 'collapsed');
      return { nodeId, previousState: 'expanded', nextState: 'collapsed' };
    },

    expand(nodeId: string): CollapseToggleResult {
      const prev = resolveState(nodeId);
      if (prev !== 'collapsed') {
        return { nodeId, previousState: prev, nextState: prev };
      }
      setOverride(nodeId, 'expanded');
      return { nodeId, previousState: 'collapsed', nextState: 'expanded' };
    },

    isVisible(nodeId: string, parentMap: ReadonlyMap<string, string>): boolean {
      if (!nodes.has(nodeId)) return false;
      let current = nodeId;
      for (;;) {
        const parentId = parentMap.get(current);
        if (parentId === undefined) return true;
        if (resolveState(parentId) === 'collapsed') return false;
        current = parentId;
      }
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML escaping
// ─────────────────────────────────────────────────────────────────────────────

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-element renderers
// ─────────────────────────────────────────────────────────────────────────────

function renderChevronControl(
  nodeId: string,
  collapseState: 'expanded' | 'collapsed',
  options: RenderOptions,
  cfg: CollapseExpandConfig,
): string {
  const p = cfg.classPrefix;
  const visClass =
    options.hovered || options.focused
      ? `${p}__control--visible`
      : `${p}__control--hidden`;
  const dirClass =
    collapseState === 'collapsed'
      ? `${p}__chevron--right`
      : `${p}__chevron--down`;

  return (
    `<button` +
    ` class="${p}__control ${visClass}"` +
    ` data-node-id="${esc(nodeId)}"` +
    ` data-action="${ACTION_TOGGLE_COLLAPSE}"` +
    ` aria-label="Toggle collapse"` +
    ` title="${esc(cfg.shortcutHint)}"` +
    ` tabindex="0"` +
    ` style="width:${cfg.controlSlotWidth}px;flex-shrink:0;"` +
    `><span class="${p}__chevron ${dirClass}" aria-hidden="true"></span></button>`
  );
}

function renderControlSpacer(cfg: CollapseExpandConfig): string {
  const p = cfg.classPrefix;
  return (
    `<span` +
    ` class="${p}__control-spacer"` +
    ` aria-hidden="true"` +
    ` style="width:${cfg.controlSlotWidth}px;flex-shrink:0;display:inline-block;"` +
    `></span>`
  );
}

function renderMarker(
  nodeId: string,
  collapseState: CollapseState,
  cfg: CollapseExpandConfig,
): string {
  const p = cfg.classPrefix;
  const id = esc(nodeId);

  if (collapseState === 'leaf') {
    return (
      `<span` +
      ` class="${p}__marker ${p}__marker--leaf"` +
      ` data-node-id="${id}"` +
      ` aria-hidden="true"` +
      `></span>`
    );
  }

  return (
    `<button` +
    ` class="${p}__marker ${p}__marker--${collapseState}"` +
    ` data-node-id="${id}"` +
    ` data-action="${ACTION_TOGGLE_COLLAPSE}"` +
    ` aria-label="Toggle collapse"` +
    ` title="${esc(cfg.shortcutHint)}"` +
    ` tabindex="-1"` +
    `></button>`
  );
}

function renderVerticalGuide(cfg: CollapseExpandConfig): string {
  const p = cfg.classPrefix;
  const leftPx =
    cfg.controlSlotWidth +
    Math.floor((cfg.gutterWidth - cfg.controlSlotWidth) / 2);
  return (
    `<span` +
    ` class="${p}__guide"` +
    ` aria-hidden="true"` +
    ` style="left:${leftPx}px;"` +
    `></span>`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Primary render function
// ─────────────────────────────────────────────────────────────────────────────

export function renderOccurrenceGutter(
  node: OccurrenceNode,
  state: CollapseExpandState,
  options: RenderOptions,
  configOverride: Partial<CollapseExpandConfig> = {},
): RenderedOccurrence {
  const cfg = resolveConfig(configOverride);
  const p = cfg.classPrefix;
  const collapseState = state.getCollapseState(node.id);
  const showGuide = collapseState === 'expanded' && node.hasChildren;

  const control: string =
    collapseState === 'leaf'
      ? renderControlSpacer(cfg)
      : renderChevronControl(node.id, collapseState, options, cfg);

  const marker = renderMarker(node.id, collapseState, cfg);
  const guide = showGuide ? renderVerticalGuide(cfg) : '';

  const gutterHtml =
    `<span` +
    ` class="${p}__gutter"` +
    ` style="width:${cfg.gutterWidth}px;position:relative;display:inline-flex;align-items:center;flex-shrink:0;"` +
    `>` +
    guide +
    control +
    marker +
    `</span>`;

  return { gutterHtml, showGuide, collapseState };
}

// ─────────────────────────────────────────────────────────────────────────────
// Batch rendering
// ─────────────────────────────────────────────────────────────────────────────

export function renderOccurrenceList(
  flatNodes: readonly FlatNode[],
  state: CollapseExpandState,
  configOverride: Partial<CollapseExpandConfig> = {},
): readonly RenderedOccurrence[] {
  return flatNodes.map(({ node, renderOptions }) =>
    renderOccurrenceGutter(node, state, renderOptions, configOverride),
  );
}

export function visibleNodeIds(
  orderedNodes: readonly OccurrenceNode[],
  state: CollapseExpandState,
  parentMap: ReadonlyMap<string, string>,
): string[] {
  return orderedNodes
    .filter((n) => state.isVisible(n.id, parentMap))
    .map((n) => n.id);
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard interpretation (f-v2.10, f-v2.11)
// ─────────────────────────────────────────────────────────────────────────────

export function interpretKeyboardEvent(
  event: SyntheticKeyboardEvent,
  nodeId: string,
  currentState: CollapseState,
): CollapseKeyAction {
  if (event.altKey || event.ctrlKey || event.metaKey || currentState === 'leaf') {
    return { type: 'none', nodeId };
  }

  switch (event.code) {
    case 'Space':
    case 'Enter':
      return { type: 'toggle', nodeId };

    case 'ArrowLeft':
      return {
        type: currentState === 'expanded' ? 'collapse' : 'none',
        nodeId,
      };

    case 'ArrowRight':
      return {
        type: currentState === 'collapsed' ? 'expand' : 'none',
        nodeId,
      };

    default:
      return { type: 'none', nodeId };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Event-delegation helpers
// ─────────────────────────────────────────────────────────────────────────────

export function nodeIdFromTarget(
  targetAttributes: Readonly<Record<string, string | undefined>>,
  ancestorChain: ReadonlyArray<Readonly<Record<string, string | undefined>>>,
  maxAncestors = 4,
): string | null {
  const direct = targetAttributes[DATA_NODE_ID];
  if (direct !== undefined) return direct;

  const limit = Math.min(ancestorChain.length, maxAncestors);
  for (let i = 0; i < limit; i++) {
    const v = ancestorChain[i]?.[DATA_NODE_ID];
    if (v !== undefined) return v;
  }
  return null;
}

export function isToggleAction(
  attributes: Readonly<Record<string, string | undefined>>,
): boolean {
  return attributes[DATA_ACTION] === ACTION_TOGGLE_COLLAPSE;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stylesheet generator
// ─────────────────────────────────────────────────────────────────────────────

export function generateStyleSheet(
  configOverride: Partial<CollapseExpandConfig> = {},
): string {
  const cfg = resolveConfig(configOverride);
  const p = cfg.classPrefix;
  const dur = cfg.transitionDurationMs;

  return `
/* ── Collapse-Expand generated styles ──────────────────────────── */

.${p}__gutter {
  box-sizing: border-box;
  user-select: none;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  width: ${cfg.gutterWidth}px;
}

.${p}__control,
.${p}__control-spacer {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${cfg.controlSlotWidth}px;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: opacity ${dur}ms ease;
}

.${p}__control--hidden {
  opacity: 0;
  pointer-events: none;
}

.${p}__control--visible {
  opacity: 1;
  pointer-events: auto;
}

.${p}__row:hover .${p}__control--hidden {
  opacity: 1;
  pointer-events: auto;
}

.${p}__control:focus-visible {
  opacity: 1;
  pointer-events: auto;
  outline: 2px solid currentColor;
  outline-offset: 1px;
  border-radius: 2px;
}

.${p}__chevron {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transition: transform ${dur}ms ease;
  flex-shrink: 0;
}
.${p}__chevron--down  { transform: rotate(45deg); }
.${p}__chevron--right { transform: rotate(-45deg); }

.${p}__marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}
.${p}__marker--leaf {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.45;
  cursor: default;
}
.${p}__marker--expanded,
.${p}__marker--collapsed {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  cursor: pointer;
}

.${p}__guide {
  position: absolute;
  top: 50%;
  bottom: calc(-100vh);
  width: 1px;
  background: currentColor;
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}
`.trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Phoenix VCS metadata
// ─────────────────────────────────────────────────────────────────────────────

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '5e5ca75f4749c08d4af66e94563df56745d5f22f9a3db606822f9ccca174ff8f',
  name: 'Collapse-Expand',
  risk_tier: 'high',
  canon_ids: [3 as const],
} as const;