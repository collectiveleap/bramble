import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';

// ---------------------------------------------------------------------------
// Operation types
// ---------------------------------------------------------------------------

export type OperationType =
  | 'add_node'
  | 'remove_node'
  | 'add_edge'
  | 'remove_edge'
  | 'set_head';

export interface NodeData {
  [key: string]: string | number | boolean | null;
}

export interface AddNodePayload {
  nodeId: string;
  data: NodeData;
}

export interface RemoveNodePayload {
  nodeId: string;
}

export interface AddEdgePayload {
  fromId: string;
  toId: string;
}

export interface RemoveEdgePayload {
  fromId: string;
  toId: string;
}

export interface SetHeadPayload {
  nodeId: string;
}

export type OperationPayload =
  | AddNodePayload
  | RemoveNodePayload
  | AddEdgePayload
  | RemoveEdgePayload
  | SetHeadPayload;

export interface Operation {
  readonly seq: number;
  readonly id: string;
  readonly type: OperationType;
  readonly payload: OperationPayload;
  readonly timestamp: number;
}

// ---------------------------------------------------------------------------
// DAG types
// ---------------------------------------------------------------------------

export interface DagNode {
  readonly id: string;
  data: NodeData;
  readonly parentIds: Set<string>;
  readonly childIds: Set<string>;
}

export interface Dag {
  readonly nodes: Map<string, DagNode>;
  head: string | null;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface OperationRow {
  seq: number;
  id: string;
  type: string;
  payload: string;
  timestamp: number;
}

function rowToOperation(row: OperationRow): Operation {
  return {
    seq: row.seq,
    id: row.id,
    type: row.type as OperationType,
    payload: JSON.parse(row.payload) as OperationPayload,
    timestamp: row.timestamp,
  };
}

function applyOperation(dag: Dag, op: Operation): void {
  switch (op.type) {
    case 'add_node': {
      const { nodeId, data } = op.payload as AddNodePayload;
      if (!dag.nodes.has(nodeId)) {
        dag.nodes.set(nodeId, {
          id: nodeId,
          data: { ...data },
          parentIds: new Set<string>(),
          childIds: new Set<string>(),
        });
      }
      break;
    }

    case 'remove_node': {
      const { nodeId } = op.payload as RemoveNodePayload;
      const node = dag.nodes.get(nodeId);
      if (node) {
        for (const pid of node.parentIds) {
          dag.nodes.get(pid)?.childIds.delete(nodeId);
        }
        for (const cid of node.childIds) {
          dag.nodes.get(cid)?.parentIds.delete(nodeId);
        }
        dag.nodes.delete(nodeId);
        if (dag.head === nodeId) dag.head = null;
      }
      break;
    }

    case 'add_edge': {
      const { fromId, toId } = op.payload as AddEdgePayload;
      const from = dag.nodes.get(fromId);
      const to = dag.nodes.get(toId);
      if (from && to) {
        from.childIds.add(toId);
        to.parentIds.add(fromId);
      }
      break;
    }

    case 'remove_edge': {
      const { fromId, toId } = op.payload as RemoveEdgePayload;
      dag.nodes.get(fromId)?.childIds.delete(toId);
      dag.nodes.get(toId)?.parentIds.delete(fromId);
      break;
    }

    case 'set_head': {
      const { nodeId } = op.payload as SetHeadPayload;
      if (dag.nodes.has(nodeId)) {
        dag.head = nodeId;
      }
      break;
    }
  }
}

// ---------------------------------------------------------------------------
// PersistenceStore
// ---------------------------------------------------------------------------

export class PersistenceStore {
  private readonly db: DatabaseSync;
  private readonly dag: Dag;

  constructor(dbPath: string) {
    this.db = new DatabaseSync(dbPath);
    this.initSchema();
    this.dag = { nodes: new Map<string, DagNode>(), head: null };
    this.foldLog();
  }

  private initSchema(): void {
    this.db.exec('PRAGMA journal_mode = WAL');
    this.db.exec('PRAGMA synchronous = NORMAL');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS operations (
        seq       INTEGER PRIMARY KEY AUTOINCREMENT,
        id        TEXT    NOT NULL UNIQUE,
        type      TEXT    NOT NULL,
        payload   TEXT    NOT NULL,
        timestamp INTEGER NOT NULL
      )
    `);
  }

  private foldLog(): void {
    const rows = this.db
      .prepare(
        'SELECT seq, id, type, payload, timestamp FROM operations ORDER BY seq ASC',
      )
      .all() as unknown as OperationRow[];

    for (const row of rows) {
      applyOperation(this.dag, rowToOperation(row));
    }
  }

  append(
    type: OperationType,
    payload: OperationPayload,
    id: string = randomUUID(),
  ): Operation {
    const timestamp = Date.now();
    const result = this.db
      .prepare(
        'INSERT INTO operations (id, type, payload, timestamp) VALUES (?, ?, ?, ?)',
      )
      .run(id, type, JSON.stringify(payload), timestamp);

    const seq = Number(result.lastInsertRowid);
    const op: Operation = { seq, id, type, payload, timestamp };
    applyOperation(this.dag, op);
    return op;
  }

  getDag(): Dag {
    return this.dag;
  }

  getOperations(): Operation[] {
    const rows = this.db
      .prepare(
        'SELECT seq, id, type, payload, timestamp FROM operations ORDER BY seq ASC',
      )
      .all() as unknown as OperationRow[];
    return rows.map(rowToOperation);
  }

  getOperationsSince(afterSeq: number): Operation[] {
    const rows = this.db
      .prepare(
        'SELECT seq, id, type, payload, timestamp FROM operations WHERE seq > ? ORDER BY seq ASC',
      )
      .all(afterSeq) as unknown as OperationRow[];
    return rows.map(rowToOperation);
  }

  getOperationById(id: string): Operation | undefined {
    const row = this.db
      .prepare(
        'SELECT seq, id, type, payload, timestamp FROM operations WHERE id = ?',
      )
      .get(id) as unknown as OperationRow | undefined;
    return row !== undefined ? rowToOperation(row) : undefined;
  }

  getLatestSeq(): number {
    const row = this.db
      .prepare('SELECT COALESCE(MAX(seq), 0) AS seq FROM operations')
      .get() as unknown as { seq: number } | undefined;
    return row?.seq ?? 0;
  }

  close(): void {
    this.db.close();
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createPersistenceStore(dbPath: string): PersistenceStore {
  return new PersistenceStore(dbPath);
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '849813f4b61466cddf941ce6f54351763868ed03fe89088d5df47bbe12446cbb',
  name: 'Persistence store',
  risk_tier: 'low',
  canon_ids: [2 as const],
} as const;