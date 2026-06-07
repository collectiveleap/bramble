import type { IncomingMessage, ServerResponse } from 'node:http';

// ── ID types ──────────────────────────────────────────────────────────────────

export type SpaceId = string;
export type BrambleId = string;
export type NodeId = string;
export type EdgeId = string;
export type OccurrenceId = string;

// ── Domain types ──────────────────────────────────────────────────────────────

export type NodeContent = {
  text: string;
};

/** A node that is live (not tombstoned). */
export type LiveNode = {
  id: NodeId;
  content: NodeContent;
};

/** Whether an edge expresses structural containment or a cross-reference. */
export type EdgeKind = 'structural' | 'reference';

/**
 * A directed edge in the DAG.
 * `order` is a fractional sort key among siblings that share the same
 * parent and kind; the client groups edges by (parentId, kind) before sorting.
 */
export type DagEdge = {
  id: EdgeId;
  kind: EdgeKind;
  parentId: NodeId;
  childId: NodeId;
  order: number;
};

/**
 * Persisted UI state for one occurrence of a node in the rendered tree.
 * An occurrence is uniquely identified by the edge that introduces the node
 * at that position; the same node can have many occurrences (transclusion).
 */
export type OccurrenceState = {
  occurrenceId: OccurrenceId;
  nodeId: NodeId;
  /** The edge whose childId === nodeId that places this occurrence. */
  parentEdgeId: EdgeId;
  collapsed: boolean;
};

/**
 * Complete client-load snapshot for the space's single bramble.
 * Contains everything needed to render any occurrence in its persisted state.
 */
export type BrambleSnapshot = {
  brambleId: BrambleId;
  spaceId: SpaceId;
  /** Entry point for rendering; guaranteed live in the snapshot. */
  rootNodeId: NodeId;
  /** All live (non-tombstoned) nodes with content. */
  nodes: LiveNode[];
  /** All live edges (structural and reference) with their order values. */
  edges: DagEdge[];
  /** Most-recent persisted collapse state per occurrence. */
  occurrenceStates: OccurrenceState[];
  /** Server wall-clock ms when the snapshot was assembled. */
  generatedAt: number;
};

// ── Raw persistence type ──────────────────────────────────────────────────────

/** A node as stored — may carry a tombstone. */
export type RawNode = {
  id: NodeId;
  content: NodeContent;
  tombstoned: boolean;
};

// ── Store interface (satisfied by the Persistence store module) ───────────────

export interface BrambleReadStore {
  /**
   * Returns the ID of the single bramble for the space, or null when
   * no bramble exists yet.
   */
  getBrambleIdForSpace(spaceId: SpaceId): BrambleId | null;

  /** Returns the designated root node ID for the bramble. */
  getRootNodeId(brambleId: BrambleId): NodeId;

  /** Returns every node record for the bramble, including tombstoned ones. */
  getAllNodes(brambleId: BrambleId): RawNode[];

  /** Returns every live edge for the bramble. */
  getAllEdges(brambleId: BrambleId): DagEdge[];

  /**
   * Returns the most-recent persisted OccurrenceState per occurrence.
   * Occurrences with no stored state are absent (client treats them as
   * expanded by default).
   */
  getAllOccurrenceStates(brambleId: BrambleId): OccurrenceState[];
}

// ── Snapshot result types ─────────────────────────────────────────────────────

export type SnapshotErrorKind = 'no_bramble' | 'corrupt_root' | 'internal';

export type SnapshotError = {
  readonly kind: SnapshotErrorKind;
  readonly message: string;
};

export type SnapshotResult = BrambleSnapshot | SnapshotError;

export function isSnapshotError(r: SnapshotResult): r is SnapshotError {
  return (r as SnapshotError).kind !== undefined;
}

// ── Core assembly logic ───────────────────────────────────────────────────────

/**
 * Assembles the full client-load snapshot for a space's single bramble.
 *
 * Guarantees:
 *   - Only non-tombstoned nodes are included.
 *   - The root node is verified to be live.
 *   - All edges and occurrence states are included verbatim from the store.
 *
 * Returns a SnapshotError when the space has no bramble or the bramble is
 * in an unrenderable state.
 */
export function assembleBrambleSnapshot(
  store: BrambleReadStore,
  spaceId: SpaceId,
): SnapshotResult {
  const brambleId = store.getBrambleIdForSpace(spaceId);
  if (brambleId === null) {
    return {
      kind: 'no_bramble',
      message: `Space "${spaceId}" has no bramble.`,
    };
  }

  let rootNodeId: NodeId;
  let rawNodes: RawNode[];
  let edges: DagEdge[];
  let occurrenceStates: OccurrenceState[];

  try {
    rootNodeId = store.getRootNodeId(brambleId);
    rawNodes = store.getAllNodes(brambleId);
    edges = store.getAllEdges(brambleId);
    occurrenceStates = store.getAllOccurrenceStates(brambleId);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return {
      kind: 'internal',
      message: `Store read failed for bramble "${brambleId}": ${detail}`,
    };
  }

  // The root must exist and be live — without it nothing can render.
  const rootRecord = rawNodes.find((n) => n.id === rootNodeId);
  if (rootRecord === undefined || rootRecord.tombstoned) {
    return {
      kind: 'corrupt_root',
      message: `Bramble "${brambleId}" root node "${rootNodeId}" is ${
        rootRecord === undefined ? 'missing' : 'tombstoned'
      }.`,
    };
  }

  const liveNodes: LiveNode[] = rawNodes
    .filter((n) => !n.tombstoned)
    .map(({ id, content }) => ({ id, content }));

  return {
    brambleId,
    spaceId,
    rootNodeId,
    nodes: liveNodes,
    edges,
    occurrenceStates,
    generatedAt: Date.now(),
  };
}

// ── HTTP handler ──────────────────────────────────────────────────────────────

const JSON_CONTENT_TYPE = 'application/json';

function jsonResponse(
  res: ServerResponse,
  status: number,
  body: object,
): void {
  const payload = JSON.stringify(body);
  const length = Buffer.byteLength(payload, 'utf8');
  res.writeHead(status, {
    'Content-Type': JSON_CONTENT_TYPE,
    'Content-Length': length,
  });
  res.end(payload);
}

/**
 * Returns an HTTP request handler that serves the bramble snapshot.
 *
 * The caller (Serving the client module) is responsible for routing and
 * extracting `spaceId` before invoking the returned handler.
 *
 * Responses:
 *   200  BrambleSnapshot JSON   — success
 *   404  {error}                — space has no bramble
 *   405  {error}                — non-GET method
 *   409  {error}                — bramble is in an unrenderable state
 *   500  {error}                — unexpected store failure
 */
export function createSnapshotHandler(
  store: BrambleReadStore,
): (req: IncomingMessage, res: ServerResponse, spaceId: SpaceId) => void {
  return function handleSnapshotRequest(
    req: IncomingMessage,
    res: ServerResponse,
    spaceId: SpaceId,
  ): void {
    if (req.method !== 'GET') {
      jsonResponse(res, 405, { error: 'Method not allowed' });
      return;
    }

    let result: SnapshotResult;
    try {
      result = assembleBrambleSnapshot(store, spaceId);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      jsonResponse(res, 500, { error: 'Internal server error', detail });
      return;
    }

    if (isSnapshotError(result)) {
      switch (result.kind) {
        case 'no_bramble':
          jsonResponse(res, 404, { error: result.message });
          return;
        case 'corrupt_root':
          jsonResponse(res, 409, { error: result.message });
          return;
        case 'internal':
          jsonResponse(res, 500, { error: result.message });
          return;
      }
    }

    jsonResponse(res, 200, result);
  };
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: 'd08a12d5a5e46c91861afcad52c7f50c4841ff532a3101aa716dc5cd7aa20efd',
  name: 'Loading the Bramble',
  risk_tier: 'high',
  canon_ids: [3 as const],
} as const;