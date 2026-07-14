<!-- derives-from: [IP-2, IP-3, UP-2.backlinks-view]; role: target; status: current -->

# Plan I1 — Kind-typed Edge (structural | linked) + backlinks helper

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Realize the unified edge family in the model layer: one `Edge` relation kind-typed `structural | linked`; structural-edge ops become structural-only; add linked-edge creation and a grouped-union backlinks helper. Pure model — no UI (that is I3/I4).

**Architecture:** Extend the existing `Edge` relation with a `kind` discriminant (`order` becomes structural-only, hence optional). The existing structural ops (`childEdges`, `parentEdges`, `nextOrder`, cycle guard, `outlineRows`) filter `kind: 'structural'` so linked edges never pollute the outline. Add `makeLinkedEdge` + `createLinkedEdge` (may-cycle, unordered, no acyclicity check) and `backlinks(db, node)` returning `{ structural, linked }` via reverse traversal (`targetOf`) grouped by kind.

**Tech Stack:** TypeScript, `effect/Schema`, `@dxos/echo` (`Type.makeRelation`, `Relation`, `Filter`, `Query`), `EchoTestBuilder`, Vitest via `moon`.

## Global Constraints

- **Runners are `moon`, never raw vitest:** `moon run plugin-bramble:{test,build,lint}`. Run from the worktree root `/Users/san/sandbox/dxos/.claude/worktrees/plugin-bramble-substrate`.
- **Branch `claude/plugin-bramble-substrate` is never merged to main** (spun out later). Do not open a merge-to-main PR.
- **Never `git add -A`/`.`** — the worktree has pre-existing local mods (`.changeset/config.json`, `.claude/launch.json`) that must NOT be staged. Stage only the files each task names.
- **Fresh plugin — no migration.** All edges are created via `makeEdge`/`makeLinkedEdge`; adding a required `kind` needs no data migration. Bump the `Edge` schema version `0.1.0 → 0.2.0`.
- **Model = pure.** No React/CodeMirror here. The `@`-picker, marker, chip, and secondary view are I3.

## File Structure

- `src/types/Edge.ts` — add `kind` + `EdgeKind`; `order` optional; `makeEdge` (structural) + `makeLinkedEdge` (linked); version bump.
- `src/model/edges.ts` — structural ops filter `kind: 'structural'`; add `createLinkedEdge`, `linkedReferrers`, `backlinks`.
- `src/model/outline.ts` — `outlineRows` traverses structural edges only.
- Tests: `src/types/schema.test.ts`, `src/model/edges.test.ts`, `src/model/outline.test.ts`.

---

### Task 1: `Edge.kind` + `makeLinkedEdge`

**Files:**
- Modify: `src/types/Edge.ts`
- Test: `src/types/schema.test.ts`

**Interfaces:**
- Produces: `EdgeKind` (`Schema.Literal('structural','linked')`); `Edge` struct gains `kind: EdgeKind`, `order: Schema.optional(Schema.Number)`; `makeEdge({source,target,order})` → `kind:'structural'`; `makeLinkedEdge({source,target})` → `kind:'linked'` (no order).

- [ ] **Step 1: Write the failing tests**

Add to `src/types/schema.test.ts` (it already imports `Edge, Node, makeEdge, makeNode` and has the `EchoTestBuilder` harness — extend the import to add `makeLinkedEdge`):

```ts
  test('a structural edge carries kind=structural and an order', async ({ expect }) => {
    const p = db.add(makeNode({ text: 'p' }));
    const c = db.add(makeNode({ text: 'c' }));
    const e = db.add(makeEdge({ source: p, target: c, order: 0 }));
    await db.flush();
    expect(e.kind).toBe('structural');
    expect(e.order).toBe(0);
  });

  test('a linked edge carries kind=linked and no order', async ({ expect }) => {
    const a = db.add(makeNode({ text: 'a' }));
    const t = db.add(makeNode({ text: 't' }));
    const e = db.add(makeLinkedEdge({ source: a, target: t }));
    await db.flush();
    expect(e.kind).toBe('linked');
    expect(e.order).toBeUndefined();
  });
```

- [ ] **Step 2: Run to verify they fail**

Run: `moon run plugin-bramble:test -- schema`
Expected: FAIL — `makeLinkedEdge` is not exported / `kind` is undefined.

- [ ] **Step 3: Implement**

Replace `src/types/Edge.ts` body:

```ts
//
// Copyright 2026 DXOS.org
//

import * as Schema from 'effect/Schema';

import { DXN, Relation, Type } from '@dxos/echo';

import { Node } from './Node';

/** The two current edge kinds of the open edge family (see design.md §1). */
export const EdgeKind = Schema.Literal('structural', 'linked');
export type EdgeKind = Schema.Schema.Type<typeof EdgeKind>;

export class Edge extends Type.makeRelation<Edge>(DXN.make('org.dxos.type.bramble.edge', '0.2.0'))({
  source: Node,
  target: Node,
})(
  Schema.Struct({
    kind: EdgeKind,
    // Structural-only: sibling order (fractional). Linked edges are unordered.
    order: Schema.optional(Schema.Number),
  }),
) {}

/** A structural edge (containment, ordered, acyclic — enforced by the model ops). */
export const makeEdge = ({ source, target, order }: { source: Node; target: Node; order: number }): Edge =>
  Relation.make(Edge, { [Relation.Source]: source, [Relation.Target]: target, kind: 'structural', order });

/** A linked edge (cross-reference / mention — may-cycle, unordered). */
export const makeLinkedEdge = ({ source, target }: { source: Node; target: Node }): Edge =>
  Relation.make(Edge, { [Relation.Source]: source, [Relation.Target]: target, kind: 'linked' });
```

Update `src/types/index.ts` to also export `makeLinkedEdge` and `EdgeKind`:

```ts
export { Edge, EdgeKind, makeEdge, makeLinkedEdge } from './Edge';
```

- [ ] **Step 4: Run to verify pass**

Run: `moon run plugin-bramble:test -- schema`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/plugins/plugin-bramble/src/types/Edge.ts packages/plugins/plugin-bramble/src/types/index.ts packages/plugins/plugin-bramble/src/types/schema.test.ts
git commit -m "feat(plugin-bramble): kind-typed Edge (structural|linked) + makeLinkedEdge"
```

---

### Task 2: structural ops filter `kind: 'structural'`

**Files:**
- Modify: `src/model/edges.ts`
- Test: `src/model/edges.test.ts`

**Interfaces:**
- Consumes: `Edge`, `makeLinkedEdge` (Task 1).
- Produces: `childEdges`, `parentEdges`, `nextOrder`, `wouldCreateCycle` restricted to structural edges (a linked edge never counts as a structural child/parent).

**Context:** `childEdges`/`parentEdges` currently query `Query.select(...).sourceOf(Edge)` / `.targetOf(Edge)` with no kind filter. A linked edge into a Node would wrongly appear as a structural child/parent. Filter each to `kind === 'structural'`. (The existing `order` reads already use `?? 0`, which is now correct since `order` is optional.)

- [ ] **Step 1: Write the failing test**

Add to `src/model/edges.test.ts` (in the `traversal` describe, which has the `EchoTestBuilder` harness; extend imports with `makeLinkedEdge`):

```ts
  test('childEdges and parentEdges ignore linked edges (structural only)', async ({ expect }) => {
    const p = db.add(makeNode({ text: 'p' }));
    const c = db.add(makeNode({ text: 'c' }));
    db.add(makeEdge({ source: p, target: c, order: 0 }));   // structural p→c
    db.add(makeLinkedEdge({ source: p, target: c }));         // linked p→c (a mention)
    await db.flush();

    const kids = await childEdges(db, p);
    expect(kids).toHaveLength(1);
    expect(kids[0].kind).toBe('structural');
    const parents = await parentEdges(db, c);
    expect(parents).toHaveLength(1);
    expect(parents[0].kind).toBe('structural');
  });
```

- [ ] **Step 2: Run to verify it fails**

Run: `moon run plugin-bramble:test -- edges`
Expected: FAIL — both come back length 2 (linked edge included).

- [ ] **Step 3: Implement**

In `src/model/edges.ts`, filter the two queries to structural. Change:

```ts
export const childEdges = async (db: EchoDatabase, node: Node): Promise<Edge[]> => {
  const edges = await db.query(Query.select(Filter.id(node.id)).sourceOf(Edge)).run();
  return [...edges].filter((e) => e.kind === 'structural').sort((x, y) => (x.order ?? 0) - (y.order ?? 0));
};

export const parentEdges = async (db: EchoDatabase, node: Node): Promise<Edge[]> => {
  const edges = await db.query(Query.select(Filter.id(node.id)).targetOf(Edge)).run();
  return [...edges].filter((e) => e.kind === 'structural');
};
```

`nextOrder` calls `childEdges` (already structural). `wouldCreateCycle` walks `parentEdges` (now structural) — correct: acyclicity binds the structural subgraph only. No other change needed.

- [ ] **Step 4: Run to verify pass**

Run: `moon run plugin-bramble:test -- edges`
Expected: PASS — the new test green, all existing edge tests still green.

- [ ] **Step 5: Commit**

```bash
git add packages/plugins/plugin-bramble/src/model/edges.ts packages/plugins/plugin-bramble/src/model/edges.test.ts
git commit -m "feat(plugin-bramble): structural edge ops filter kind=structural"
```

---

### Task 3: `createLinkedEdge` (may-cycle, unordered)

**Files:**
- Modify: `src/model/edges.ts`
- Test: `src/model/edges.test.ts`

**Interfaces:**
- Produces: `createLinkedEdge(db, source, target): Edge` — adds a `kind:'linked'` edge; **no** cycle check (linked edges may cycle, `IP-3.may-cycle`); no order.

- [ ] **Step 1: Write the failing test**

Add to `edges.test.ts` (in the `mutation + acyclicity` describe):

```ts
  test('createLinkedEdge adds a linked edge and admits cycles', async ({ expect }) => {
    const a = db.add(makeNode({ text: 'a' }));
    const b = db.add(makeNode({ text: 'b' }));
    createLinkedEdge(db, a, b);
    createLinkedEdge(db, b, a); // reciprocal — must be admitted (no cycle rejection)
    await db.flush();
    const outA = (await db.query(Query.select(Filter.id(a.id)).sourceOf(Edge)).run()).filter((e) => e.kind === 'linked');
    const outB = (await db.query(Query.select(Filter.id(b.id)).sourceOf(Edge)).run()).filter((e) => e.kind === 'linked');
    expect(outA).toHaveLength(1);
    expect(outB).toHaveLength(1);
  });
```

- [ ] **Step 2: Run to verify it fails**

Run: `moon run plugin-bramble:test -- edges`
Expected: FAIL — `createLinkedEdge is not a function`.

- [ ] **Step 3: Implement**

Add to `src/model/edges.ts` (import `makeLinkedEdge` from `../types`):

```ts
/** Add a linked edge (mention / cross-reference) source→target. Unlike structural edges,
 *  linked edges may cycle (IP-3.may-cycle) and carry no order — so there is no cycle check. */
export const createLinkedEdge = (db: EchoDatabase, source: Node, target: Node): Edge => {
  const edge = makeLinkedEdge({ source, target });
  db.add(edge);
  return edge;
};
```

(Also add `makeLinkedEdge` to the existing `import { … } from '../types'` line, and re-export it from `edges.ts` alongside `makeEdge` if that pattern is used.)

- [ ] **Step 4: Run to verify pass**

Run: `moon run plugin-bramble:test -- edges`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/plugins/plugin-bramble/src/model/edges.ts packages/plugins/plugin-bramble/src/model/edges.test.ts
git commit -m "feat(plugin-bramble): createLinkedEdge (may-cycle, unordered)"
```

---

### Task 4: `backlinks` — grouped union via `targetOf`

**Files:**
- Modify: `src/model/edges.ts`
- Test: `src/model/edges.test.ts`

**Interfaces:**
- Produces: `backlinks(db, node): Promise<{ structural: Node[]; linked: Node[] }>` — the Node's incoming edges by reverse traversal, grouped by kind: `structural` = its structural predecessors ("appears under"), `linked` = its linked referrers ("mentioned in"). Realizes `UP-2.backlinks-view`.

- [ ] **Step 1: Write the failing test**

```ts
  test('backlinks group inbound edges by kind (structural + linked)', async ({ expect }) => {
    const t = db.add(makeNode({ text: 't' }));
    const p = db.add(makeNode({ text: 'p' }));  // structural parent (co-located under p)
    const a = db.add(makeNode({ text: 'a' }));  // linked referrer (a mentions t)
    db.add(makeEdge({ source: p, target: t, order: 0 }));
    createLinkedEdge(db, a, t);
    await db.flush();

    const bl = await backlinks(db, t);
    expect(bl.structural.map((n) => n.id)).toEqual([p.id]);
    expect(bl.linked.map((n) => n.id)).toEqual([a.id]);
  });
```

- [ ] **Step 2: Run to verify it fails**

Run: `moon run plugin-bramble:test -- edges`
Expected: FAIL — `backlinks is not a function`.

- [ ] **Step 3: Implement**

Add to `src/model/edges.ts` (uses `Relation.getSource`, already imported):

```ts
/** A Node's backlinks: its incoming edges by reverse traversal, grouped by kind —
 *  structural predecessors ("appears under") and linked referrers ("mentioned in").
 *  Realizes UP-2.backlinks-view's grouped union over the one kind-typed Edge. */
export const backlinks = async (db: EchoDatabase, node: Node): Promise<{ structural: Node[]; linked: Node[] }> => {
  const inbound = await db.query(Query.select(Filter.id(node.id)).targetOf(Edge)).run();
  const structural: Node[] = [];
  const linked: Node[] = [];
  for (const e of inbound) {
    (e.kind === 'linked' ? linked : structural).push(Relation.getSource(e) as Node);
  }
  return { structural, linked };
};
```

- [ ] **Step 4: Run to verify pass**

Run: `moon run plugin-bramble:test -- edges`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/plugins/plugin-bramble/src/model/edges.ts packages/plugins/plugin-bramble/src/model/edges.test.ts
git commit -m "feat(plugin-bramble): backlinks helper (grouped union by edge kind)"
```

---

### Task 5: `outlineRows` traverses structural edges only

**Files:**
- Modify: `src/model/outline.ts`
- Test: `src/model/outline.test.ts`

**Interfaces:**
- `outlineRows(edges, root, collapsed?)` unchanged signature, but ignores linked edges when building the tree (only `kind: 'structural'` edges nest).

**Context:** `NodeOutline` queries all `Edge`s (`Filter.type(Edge)`) and passes them to `outlineRows`, which groups by `source`. A linked edge would wrongly create an outline row. Filter to structural at the top of `outlineRows` so the outline never renders a mention as a nested bullet.

- [ ] **Step 1: Write the failing test**

Add to `src/model/outline.test.ts` (extend imports with `makeLinkedEdge`):

```ts
  test('a linked edge is not rendered as an outline row (structural only)', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const t = add('t');
    await createEdge(db, root, a, 0);         // structural: a under root
    db.add(makeLinkedEdge({ source: a, target: t })); // linked: a mentions t
    await db.flush();

    const rows = outlineRows(await allEdges(), root);
    // Only the structural child renders; the linked target is not a row.
    expect(rows.map((r) => r.node.id)).toEqual([a.id]);
  });
```

- [ ] **Step 2: Run to verify it fails**

Run: `moon run plugin-bramble:test -- outline`
Expected: FAIL — `t` (linked target) appears as a row, or the linked edge corrupts the tree.

- [ ] **Step 3: Implement**

In `src/model/outline.ts`, at the top of `outlineRows`, restrict to structural edges before building `bySource`:

```ts
export const outlineRows = (edges: Edge[], root: Node, collapsed: ReadonlySet<string> = new Set()): OutlineRow[] => {
  const structural = edges.filter((e) => e.kind === 'structural');
  const bySource = new Map<string, Edge[]>();
  for (const edge of structural) {
    // …existing body, iterating `structural` instead of `edges`…
  }
  // …unchanged…
};
```

(Only the source of the loop changes: build `bySource` from `structural`, not `edges`. The rest of `outlineRows` is unchanged.)

- [ ] **Step 4: Run to verify pass**

Run: `moon run plugin-bramble:test -- outline`
Expected: PASS — the linked edge is ignored; existing outline tests (incl. multi-location) still green.

- [ ] **Step 5: Commit**

```bash
git add packages/plugins/plugin-bramble/src/model/outline.ts packages/plugins/plugin-bramble/src/model/outline.test.ts
git commit -m "feat(plugin-bramble): outlineRows traverses structural edges only"
```

---

## Post-plan verification

```bash
moon run plugin-bramble:test        # full node suite green (schema/edges/outline + prior)
moon run plugin-bramble:build       # typecheck (the schema change + optional order)
moon run plugin-bramble:lint
```

Then update `references-issue-ledger.md` (I1 done) and note I3/I4 next.

## Self-review (author)
- **Spec coverage:** `IP-2` (structural, ordered, acyclic — kind filter keeps it structural) · `IP-3` (linked, may-cycle, no order — `createLinkedEdge`) · `UP-2.backlinks-view` (`backlinks` grouped union). The design's kind-typed `Edge` (design.md §1) is realized.
- **Type consistency:** `EdgeKind` = `'structural'|'linked'` used in `Edge`, `makeEdge`/`makeLinkedEdge`, the query filters, `backlinks`. `order` optional throughout (structural reads use `?? 0`).
- **Placeholders:** none — each step has concrete code + commands.
- **Deferred to I3/I4 (not here):** the positional text marker, marker↔edge sync, `@`-picker, atomic chip, secondary-view renderer, backlinks panel UI.
