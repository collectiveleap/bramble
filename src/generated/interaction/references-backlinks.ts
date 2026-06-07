export type NodeId = string;

export interface Reference {
  readonly sourceId: NodeId;
  readonly targetId: NodeId;
}

export interface BacklinkSummary {
  readonly targetId: NodeId;
  readonly count: number;
  readonly sources: ReadonlyArray<NodeId>;
}

export type BacklinkChangeHandler = (summary: BacklinkSummary) => void;

/**
 * Formats the inline badge label for n incoming references.
 * Returns "[n]" for n > 0, empty string for n <= 0.
 * (f-v4.1, f-v4.2)
 */
export function formatBadgeLabel(count: number): string {
  return count > 0 ? `[${count}]` : '';
}

/**
 * Renders the HTML for an inline backlink badge.
 * Returns an empty string when count is zero — no badge is shown.
 * (f-v4.1, f-v4.3)
 */
export function renderBadge(
  count: number,
  options?: { className?: string },
): string {
  if (count <= 0) return '';
  const cls = options?.className ?? 'backlink-badge';
  const label = formatBadgeLabel(count);
  const plural = count === 1 ? 'backlink' : 'backlinks';
  return `<span class="${cls}" aria-label="${count} ${plural}">${label}</span>`;
}

/**
 * Renders node text with the backlink badge placed inline immediately after
 * the text content. Because both the text and badge are inline elements the
 * badge flows with — and wraps onto — the last line of the node text rather
 * than appearing at a fixed margin. (f-v4.placement, f-v4.2, f-v4.3)
 *
 * When backlinkCount is zero no badge is emitted at all. (f-4.2, f-4.3)
 */
export function renderNodeTextWithBadge(
  nodeText: string,
  backlinkCount: number,
  options?: { textClassName?: string; badgeClassName?: string },
): string {
  const textCls = options?.textClassName ?? 'node-text';
  const badge = renderBadge(backlinkCount, { className: options?.badgeClassName });
  return `<span class="${textCls}">${escapeHtml(nodeText)}${badge}</span>`;
}

/**
 * CSS that enforces inline badge placement so the badge wraps with the last
 * line of node text rather than sitting at a fixed margin. Consume this string
 * by injecting it into a <style> tag. (f-v4.placement)
 */
export const BACKLINK_BADGE_CSS = `
.backlink-badge {
  display: inline;
  margin-left: 0.3em;
  font-size: 0.75em;
  opacity: 0.65;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}
`.trim();

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Bidirectional reference graph.
 *
 * - addReference / removeReference mutate the graph and fire change
 *   handlers on the affected target node.
 * - removeNode tears down all edges touching that node.
 * - onChange subscribes to count changes for one target; returns an
 *   unsubscribe function.
 *
 * (f-4.2, f-4.3, f-4.6, f-4.7, f-5.2, f-5.3, f-v3.1, f-v3.2)
 */
export class BacklinksStore {
  /** incoming[targetId] → set of sourceIds that reference it */
  private readonly incoming = new Map<NodeId, Set<NodeId>>();
  /** outgoing[sourceId] → set of targetIds it references */
  private readonly outgoing = new Map<NodeId, Set<NodeId>>();
  /** per-target change handlers */
  private readonly listeners = new Map<NodeId, Set<BacklinkChangeHandler>>();

  /**
   * Records that sourceId references targetId.
   * Returns true if the edge was new, false if it already existed.
   */
  addReference(ref: Reference): boolean {
    const { sourceId, targetId } = ref;

    let out = this.outgoing.get(sourceId);
    if (!out) {
      out = new Set<NodeId>();
      this.outgoing.set(sourceId, out);
    }
    if (out.has(targetId)) return false;
    out.add(targetId);

    let inc = this.incoming.get(targetId);
    if (!inc) {
      inc = new Set<NodeId>();
      this.incoming.set(targetId, inc);
    }
    inc.add(sourceId);

    this.notify(targetId);
    return true;
  }

  /**
   * Removes the edge from sourceId → targetId.
   * Returns true if the edge existed and was removed.
   */
  removeReference(ref: Reference): boolean {
    const { sourceId, targetId } = ref;

    const out = this.outgoing.get(sourceId);
    if (!out?.has(targetId)) return false;
    out.delete(targetId);
    if (out.size === 0) this.outgoing.delete(sourceId);

    const inc = this.incoming.get(targetId);
    if (inc) {
      inc.delete(sourceId);
      if (inc.size === 0) this.incoming.delete(targetId);
    }

    this.notify(targetId);
    return true;
  }

  /**
   * Removes a node entirely: clears all edges where it is source or target,
   * fires change handlers on each affected target, and removes its own
   * listener set.
   */
  removeNode(nodeId: NodeId): void {
    // Remove edges where nodeId is the source
    const out = this.outgoing.get(nodeId);
    if (out) {
      for (const targetId of out) {
        const inc = this.incoming.get(targetId);
        if (inc) {
          inc.delete(nodeId);
          if (inc.size === 0) this.incoming.delete(targetId);
          this.notify(targetId);
        }
      }
      this.outgoing.delete(nodeId);
    }

    // Remove edges where nodeId is the target
    const inc = this.incoming.get(nodeId);
    if (inc) {
      for (const sourceId of inc) {
        const srcOut = this.outgoing.get(sourceId);
        if (srcOut) {
          srcOut.delete(nodeId);
          if (srcOut.size === 0) this.outgoing.delete(sourceId);
        }
      }
      this.incoming.delete(nodeId);
    }

    // Drop all listeners registered on this node
    this.listeners.delete(nodeId);
  }

  /** Number of nodes that reference targetId. */
  getIncomingCount(targetId: NodeId): number {
    return this.incoming.get(targetId)?.size ?? 0;
  }

  /** Ordered array of nodeIds that reference targetId. */
  getIncomingSources(targetId: NodeId): ReadonlyArray<NodeId> {
    const inc = this.incoming.get(targetId);
    return inc ? Array.from(inc) : [];
  }

  /** Ordered array of nodeIds that sourceId references. */
  getOutgoingTargets(sourceId: NodeId): ReadonlyArray<NodeId> {
    const out = this.outgoing.get(sourceId);
    return out ? Array.from(out) : [];
  }

  /** Full backlink summary for targetId. */
  getSummary(targetId: NodeId): BacklinkSummary {
    return {
      targetId,
      count: this.getIncomingCount(targetId),
      sources: this.getIncomingSources(targetId),
    };
  }

  /**
   * Subscribes handler to count changes for targetId.
   * Returns an unsubscribe function.
   */
  onChange(targetId: NodeId, handler: BacklinkChangeHandler): () => void {
    let handlers = this.listeners.get(targetId);
    if (!handlers) {
      handlers = new Set<BacklinkChangeHandler>();
      this.listeners.set(targetId, handlers);
    }
    handlers.add(handler);
    return () => {
      const h = this.listeners.get(targetId);
      if (!h) return;
      h.delete(handler);
      if (h.size === 0) this.listeners.delete(targetId);
    };
  }

  /**
   * Snapshot of every node that currently has at least one backlink,
   * ordered by nodeId ascending.
   */
  allNodesWithBacklinks(): ReadonlyArray<BacklinkSummary> {
    return Array.from(this.incoming.entries())
      .filter(([, sources]) => sources.size > 0)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([targetId, sources]) => ({
        targetId,
        count: sources.size,
        sources: Array.from(sources),
      }));
  }

  private notify(targetId: NodeId): void {
    const handlers = this.listeners.get(targetId);
    if (!handlers?.size) return;
    const summary = this.getSummary(targetId);
    for (const handler of handlers) {
      handler(summary);
    }
  }
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: 'fadd9424acc222ae7250d7e3868048553310e3674768c20a8cf1a611c8b12001',
  name: 'References-Backlinks',
  risk_tier: 'medium',
  canon_ids: [2 as const],
} as const;