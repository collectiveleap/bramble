import { createHash } from 'node:crypto';

// ─── Node Kind Definitions ─────────────────────────────────────────────────────

export type NodeId    = string;
export type EdgeLabel = string;

export const NODE_KINDS = ['text', 'tag', 'day', 'link', 'block'] as const;
export type NodeKind = (typeof NODE_KINDS)[number];

export interface TextNodeProps  { readonly content: string }
export interface TagNodeProps   { readonly name: string; readonly color?: string }
export interface DayNodeProps   { readonly date: string }        // YYYY-MM-DD
export interface LinkNodeProps  { readonly url: string; readonly title?: string }
export interface BlockNodeProps { readonly content: string; readonly language?: string }

export type NodePropsByKind = {
  text:  TextNodeProps;
  tag:   TagNodeProps;
  day:   DayNodeProps;
  link:  LinkNodeProps;
  block: BlockNodeProps;
};

export interface BrambleNode<K extends NodeKind = NodeKind> {
  readonly id:        NodeId;
  readonly kind:      K;
  readonly props:     NodePropsByKind[K];
  readonly createdAt: number; // Unix ms
}

export interface BrambleEdge {
  readonly from:  NodeId;
  readonly to:    NodeId;
  readonly label: EdgeLabel;
}

export interface SubstrateSnapshot {
  readonly nodes: ReadonlyArray<BrambleNode>;
  readonly edges: ReadonlyArray<BrambleEdge>;
}

// ─── Validation ────────────────────────────────────────────────────────────────

const ISO_DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const HTTP_URL_RE = /^https?:\/\/.+/;

export interface ValidationResult {
  valid:  boolean;
  errors: string[];
}

export function validateNodeProps<K extends NodeKind>(
  kind: K,
  props: NodePropsByKind[K],
): ValidationResult {
  const errors: string[] = [];

  switch (kind) {
    case 'text': {
      const p = props as TextNodeProps;
      if (typeof p.content !== 'string')
        errors.push('text: content must be a string');
      break;
    }
    case 'tag': {
      const p = props as TagNodeProps;
      if (typeof p.name !== 'string' || p.name.trim() === '')
        errors.push('tag: name must be a non-empty string');
      if (p.color !== undefined && typeof p.color !== 'string')
        errors.push('tag: color must be a string when provided');
      break;
    }
    case 'day': {
      const p = props as DayNodeProps;
      if (!ISO_DATE_RE.test(p.date))
        errors.push('day: date must be a valid YYYY-MM-DD string');
      break;
    }
    case 'link': {
      const p = props as LinkNodeProps;
      if (typeof p.url !== 'string' || !HTTP_URL_RE.test(p.url))
        errors.push('link: url must be a valid http/https URL');
      if (p.title !== undefined && typeof p.title !== 'string')
        errors.push('link: title must be a string when provided');
      break;
    }
    case 'block': {
      const p = props as BlockNodeProps;
      if (typeof p.content !== 'string')
        errors.push('block: content must be a string');
      if (p.language !== undefined && typeof p.language !== 'string')
        errors.push('block: language must be a string when provided');
      break;
    }
    default: {
      const exhaustive: never = kind;
      errors.push(`unknown node kind: ${String(exhaustive)}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// ─── Node Factory ──────────────────────────────────────────────────────────────

function newNodeId(kind: NodeKind): NodeId {
  return `n:${createHash('sha256')
    .update(kind)
    .update(String(Date.now()))
    .update(String(Math.random()))
    .digest('hex')
    .slice(0, 16)}`;
}

export function createNode<K extends NodeKind>(
  kind: K,
  props: NodePropsByKind[K],
): BrambleNode<K> {
  const v = validateNodeProps(kind, props);
  if (!v.valid)
    throw new Error(`Invalid props for "${kind}" node: ${v.errors.join('; ')}`);
  return Object.freeze({ id: newNodeId(kind), kind, props, createdAt: Date.now() });
}

// ─── In-Memory DAG Substrate ───────────────────────────────────────────────────

export class BrambleSubstrate {
  private readonly nodeMap  = new Map<NodeId, BrambleNode>();
  private readonly edgeList: BrambleEdge[] = [];

  addNode(node: BrambleNode): void {
    if (this.nodeMap.has(node.id))
      throw new Error(`Substrate: node "${node.id}" already exists`);
    this.nodeMap.set(node.id, node);
  }

  removeNode(id: NodeId): BrambleNode {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`Substrate: node "${id}" not found`);
    this.nodeMap.delete(id);
    for (let i = this.edgeList.length - 1; i >= 0; i--) {
      const e = this.edgeList[i];
      if (e.from === id || e.to === id) this.edgeList.splice(i, 1);
    }
    return node;
  }

  addEdge(edge: BrambleEdge): void {
    if (!this.nodeMap.has(edge.from))
      throw new Error(`Substrate: source node "${edge.from}" not found`);
    if (!this.nodeMap.has(edge.to))
      throw new Error(`Substrate: target node "${edge.to}" not found`);
    if (this.edgeList.some(e => e.from === edge.from && e.to === edge.to && e.label === edge.label))
      return; // idempotent
    if (this.canReach(edge.to, edge.from))
      throw new Error(`Substrate: edge ${edge.from}→${edge.to} would introduce a cycle`);
    this.edgeList.push(edge);
  }

  removeEdge(from: NodeId, to: NodeId, label: EdgeLabel): void {
    const idx = this.edgeList.findIndex(e => e.from === from && e.to === to && e.label === label);
    if (idx === -1)
      throw new Error(`Substrate: edge ${from}→${to} (${label}) not found`);
    this.edgeList.splice(idx, 1);
  }

  getNode(id: NodeId): BrambleNode | undefined {
    return this.nodeMap.get(id);
  }

  getNodesByKind<K extends NodeKind>(kind: K): ReadonlyArray<BrambleNode<K>> {
    const out: BrambleNode<K>[] = [];
    for (const n of this.nodeMap.values()) {
      if (n.kind === kind) out.push(n as BrambleNode<K>);
    }
    return out;
  }

  outEdges(from: NodeId): ReadonlyArray<BrambleEdge> {
    return this.edgeList.filter(e => e.from === from);
  }

  inEdges(to: NodeId): ReadonlyArray<BrambleEdge> {
    return this.edgeList.filter(e => e.to === to);
  }

  snapshot(): SubstrateSnapshot {
    return {
      nodes: Array.from(this.nodeMap.values()),
      edges: Array.from(this.edgeList),
    };
  }

  /** DFS from `start`; returns true if `target` is reachable. Used for cycle detection. */
  private canReach(start: NodeId, target: NodeId): boolean {
    const visited = new Set<NodeId>();
    const stack   = [start];
    while (stack.length > 0) {
      const cur = stack.pop()!;
      if (cur === target) return true;
      if (visited.has(cur)) continue;
      visited.add(cur);
      for (const e of this.edgeList) {
        if (e.from === cur) stack.push(e.to);
      }
    }
    return false;
  }
}

// ─── Bridge Event Types ────────────────────────────────────────────────────────

export type BridgeEventType =
  | 'node:added'
  | 'node:removed'
  | 'edge:added'
  | 'edge:removed'
  | 'import:completed';

export interface BridgeEvent {
  type:      BridgeEventType;
  payload:   BrambleNode | BrambleEdge | { id: NodeId } | ImportResult;
  timestamp: number;
}

export type BridgeEventHandler = (event: BridgeEvent) => void;

export interface HostRegistration {
  /** Receives every substrate mutation emitted by Bramble. */
  onEvent:       BridgeEventHandler;
  /** Returns the host's authoritative snapshot, used to hydrate on connect. */
  fetchSnapshot: () => SubstrateSnapshot;
}

// ─── Import Types ──────────────────────────────────────────────────────────────

export type ImportFormat = 'bramble-json' | 'markdown-lines' | 'plain-lines';

export interface ImportOptions {
  format: ImportFormat;
}

export interface ImportResult {
  imported: number;
  skipped:  number;
  errors:   string[];
  nodeIds:  NodeId[];
}

// ─── Host Bridge ───────────────────────────────────────────────────────────────

export class HostBridge {
  private readonly substrate: BrambleSubstrate;
  private host: HostRegistration | null = null;
  private readonly listeners = new Map<BridgeEventType, Set<BridgeEventHandler>>();

  constructor(substrate: BrambleSubstrate) {
    this.substrate = substrate;
  }

  /** Attach to a host application and hydrate from its current snapshot. */
  connect(registration: HostRegistration): void {
    if (this.host !== null)
      throw new Error('HostBridge: already connected — call disconnect() first');
    this.host = registration;
    this.hydrateFrom(registration.fetchSnapshot());
  }

  disconnect(): void {
    this.host = null;
  }

  get isConnected(): boolean {
    return this.host !== null;
  }

  // ── DAG mutations ──────────────────────────────────────────────────────────

  addNode<K extends NodeKind>(kind: K, props: NodePropsByKind[K]): BrambleNode<K> {
    const node = createNode(kind, props);
    this.substrate.addNode(node);
    this.emit({ type: 'node:added', payload: node as BrambleNode, timestamp: Date.now() });
    return node;
  }

  removeNode(id: NodeId): BrambleNode {
    const node = this.substrate.removeNode(id);
    this.emit({ type: 'node:removed', payload: { id }, timestamp: Date.now() });
    return node;
  }

  addEdge(from: NodeId, to: NodeId, label: EdgeLabel): BrambleEdge {
    const edge: BrambleEdge = { from, to, label };
    this.substrate.addEdge(edge);
    this.emit({ type: 'edge:added', payload: edge, timestamp: Date.now() });
    return edge;
  }

  removeEdge(from: NodeId, to: NodeId, label: EdgeLabel): void {
    const edge: BrambleEdge = { from, to, label };
    this.substrate.removeEdge(from, to, label);
    this.emit({ type: 'edge:removed', payload: edge, timestamp: Date.now() });
  }

  // ── Read-through ───────────────────────────────────────────────────────────

  getNode(id: NodeId): BrambleNode | undefined {
    return this.substrate.getNode(id);
  }

  getNodesByKind<K extends NodeKind>(kind: K): ReadonlyArray<BrambleNode<K>> {
    return this.substrate.getNodesByKind(kind);
  }

  outEdges(from: NodeId): ReadonlyArray<BrambleEdge> {
    return this.substrate.outEdges(from);
  }

  inEdges(to: NodeId): ReadonlyArray<BrambleEdge> {
    return this.substrate.inEdges(to);
  }

  snapshot(): SubstrateSnapshot {
    return this.substrate.snapshot();
  }

  // ── Import ─────────────────────────────────────────────────────────────────

  importData(data: string, options: ImportOptions): ImportResult {
    const result = dispatchImport(data, options, this);
    this.emit({ type: 'import:completed', payload: result, timestamp: Date.now() });
    return result;
  }

  // ── Event subscription ─────────────────────────────────────────────────────

  on(type: BridgeEventType, handler: BridgeEventHandler): () => void {
    let bucket = this.listeners.get(type);
    if (!bucket) { bucket = new Set(); this.listeners.set(type, bucket); }
    bucket.add(handler);
    return () => bucket!.delete(handler);
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private emit(event: BridgeEvent): void {
    this.host?.onEvent(event);
    const handlers = this.listeners.get(event.type);
    if (handlers) for (const h of handlers) h(event);
  }

  private hydrateFrom(snap: SubstrateSnapshot): void {
    for (const node of snap.nodes) {
      try { this.substrate.addNode(node); } catch { /* idempotent */ }
    }
    for (const edge of snap.edges) {
      try { this.substrate.addEdge(edge); } catch { /* idempotent or cycle */ }
    }
  }
}

// ─── Standalone import helper (delegates to bridge.importData) ─────────────────

export function importData(
  data: string,
  options: ImportOptions,
  bridge: HostBridge,
): ImportResult {
  return bridge.importData(data, options);
}

// ─── Import Format Implementations (module-private) ───────────────────────────

interface RawNodeEntry  { id?: string; kind: string; props: Record<string, unknown> }
interface RawEdgeEntry  { from: string; to: string; label: string }
interface BrambleJsonDoc { nodes: RawNodeEntry[]; edges?: RawEdgeEntry[] }

function parseBrambleJsonDoc(raw: string): BrambleJsonDoc {
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== 'object' || parsed === null)
    throw new Error('root must be a JSON object');
  const doc = parsed as Record<string, unknown>;
  if (!Array.isArray(doc['nodes']))
    throw new Error('"nodes" array required');
  return {
    nodes: doc['nodes'] as RawNodeEntry[],
    edges: Array.isArray(doc['edges']) ? doc['edges'] as RawEdgeEntry[] : [],
  };
}

function importFromBrambleJson(data: string, bridge: HostBridge): ImportResult {
  const result: ImportResult = { imported: 0, skipped: 0, errors: [], nodeIds: [] };

  let doc: BrambleJsonDoc;
  try { doc = parseBrambleJsonDoc(data); }
  catch (err) {
    result.errors.push(`Parse error: ${(err as Error).message}`);
    return result;
  }

  const idRemap = new Map<string, NodeId>();

  for (const raw of doc.nodes) {
    if (!(NODE_KINDS as ReadonlyArray<string>).includes(raw.kind)) {
      result.errors.push(`Skipping node: unknown kind "${raw.kind}"`);
      result.skipped++;
      continue;
    }
    const kind = raw.kind as NodeKind;
    const v = validateNodeProps(kind, raw.props as unknown as NodePropsByKind[NodeKind]);
    if (!v.valid) {
      result.errors.push(`Skipping ${kind} node: ${v.errors.join('; ')}`);
      result.skipped++;
      continue;
    }
    try {
      const node = bridge.addNode(kind, raw.props as unknown as NodePropsByKind[NodeKind]);
      if (raw.id) idRemap.set(raw.id, node.id);
      result.nodeIds.push(node.id);
      result.imported++;
    } catch (err) {
      result.errors.push(`Node add failed: ${(err as Error).message}`);
      result.skipped++;
    }
  }

  for (const e of doc.edges ?? []) {
    const from = idRemap.get(e.from) ?? e.from;
    const to   = idRemap.get(e.to)   ?? e.to;
    try { bridge.addEdge(from, to, e.label); }
    catch (err) {
      result.errors.push(`Edge ${e.from}→${e.to} failed: ${(err as Error).message}`);
    }
  }

  return result;
}

function importFromMarkdownLines(data: string, bridge: HostBridge): ImportResult {
  const result: ImportResult = { imported: 0, skipped: 0, errors: [], nodeIds: [] };
  for (const raw of data.split('\n')) {
    const line = raw.trimEnd();
    if (line === '') { result.skipped++; continue; }
    const heading = /^#{1,6}\s+(.+)$/.exec(line);
    try {
      const node = heading
        ? bridge.addNode('tag',  { name: heading[1].trim() })
        : bridge.addNode('text', { content: line });
      result.nodeIds.push(node.id);
      result.imported++;
    } catch (err) {
      result.errors.push(`"${line.slice(0, 60)}": ${(err as Error).message}`);
      result.skipped++;
    }
  }
  return result;
}

function importFromPlainLines(data: string, bridge: HostBridge): ImportResult {
  const result: ImportResult = { imported: 0, skipped: 0, errors: [], nodeIds: [] };
  for (const raw of data.split('\n')) {
    const line = raw.trimEnd();
    if (line === '') { result.skipped++; continue; }
    try {
      const node = bridge.addNode('text', { content: line });
      result.nodeIds.push(node.id);
      result.imported++;
    } catch (err) {
      result.errors.push(`"${line.slice(0, 60)}": ${(err as Error).message}`);
      result.skipped++;
    }
  }
  return result;
}

function dispatchImport(data: string, options: ImportOptions, bridge: HostBridge): ImportResult {
  switch (options.format) {
    case 'bramble-json':   return importFromBrambleJson(data, bridge);
    case 'markdown-lines': return importFromMarkdownLines(data, bridge);
    case 'plain-lines':    return importFromPlainLines(data, bridge);
    default: {
      const fmt: never = options.format;
      return {
        imported: 0,
        skipped:  0,
        errors:   [`Unsupported import format: ${String(fmt)}`],
        nodeIds:  [],
      };
    }
  }
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: 'c7afb87be3c384c98671e02cd0cb5f50e346019a9f18b1d7ea063352f8bbbe19',
  name: 'Bramble — Node Kinds, Host Bridge & Import',
  risk_tier: 'low',
  canon_ids: [2 as const],
} as const;