<!-- derives-from: [IP-2, UP-1.reshape, UP-1.author, IX-direct]; role: target; status: draft -->

# Plan 2c — Structural gestures + substrate-authoritative fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add keyboard **restructure** to the editable outline — **indent/outdent** (Tab/Shift-Tab) and **reorder** (Cmd-Shift-↑/↓), realizing `UP-1.reshape` — and land the two carried-forward substrate fixes that make the mutation layer robust and view-independent (a prerequisite for Plan 2d's collapse, where rows become unmounted).

**Architecture:** Two fixes first — (1) text mutation goes **substrate-authoritative** (`Obj.update` on the ECHO `Text`, letting the automerge binding update any mounted editor) instead of dispatching into the source/preceding `EditorView`; (2) `mergeBackward` removes only the **occurrence edge** (and the Node only when it was the last inbound edge), so a multi-predecessor Node isn't globally deleted. Then indent/outdent/reorder as **pure gesture-logic** functions (over the flat rows) applied through the Plan-1 edge algebra (`reparentEdge`, `Obj.update` on `Edge.order`). Restructure keeps focus for free: each row's `EditorView` is keyed by `node.id`, so a reparent/reorder re-render preserves the same editor instance and caret — no deferred-focus dance.

**Tech Stack:** Plan-1 edge algebra (`reparentEdge`/`orderBetween`/`parentEdges`), `@dxos/echo` `Obj.update`, CodeMirror keymaps (`Tab`, `Mod-Shift-Arrow*`), Vitest + Storybook `play`.

## Global Constraints

- **Public `@dxos/*`/`@codemirror/*` imports only**; nothing outside `packages/plugins/plugin-bramble/` except `pnpm-lock.yaml`.
- **Substrate math is pure & headless.** `indentPlan`/`outdentPlan`/`reorderPlan` take `(rows, root, nodeId[, dir])`, no `EditorView`/DOM/`db`; each returns a plain plan or `null` (no-op). The controller applies them via the edge algebra.
- **Keys follow R (Tana):** `Tab`/`Shift-Tab` indent/outdent; `Cmd-Shift-↑/↓` reorder. Keymaps at `Prec.highest`. `Tab` uses `preventDefault: true` (else focus leaves the editor).
- **Restructure preserves the focused editor** — do NOT set `pendingFocus` for indent/outdent/reorder; the `node.id`-keyed row keeps its `EditorView` + caret across the re-render.
- **Undo stays OUT OF SCOPE** (deferred slice) — no `UndoMapping`/operation-invoker plumbing.
- **Cycle safety:** indent/outdent go through `reparentEdge` (already cycle-checked); a rejected reparent leaves the graph unchanged.
- Tests: `moon run plugin-bramble:test` (headless units + controller), `moon run plugin-bramble:test-storybook -- NodeOutline` (keymap `play`), `moon run plugin-bramble:build`, `moon run plugin-bramble:lint`. Run `:build` before committing any task that adds an import. Never raw vitest.
- **Branch:** continue on `claude/plugin-bramble-substrate`.

---

### Task 1: Substrate-authoritative text mutation (fix the view-mediated Medium)

Make `createAfter`/`mergeBackward` write row text through the ECHO `Text` (`Obj.update`) rather than the `EditorView`. The mounted editor updates via its automerge binding; an unmounted row (Plan 2d collapse) no longer loses text. This also makes text content headless-testable.

**Files:** Modify `src/components/NodeOutline/controller.ts`, `src/components/NodeOutline/controller.test.ts`.

**Interfaces:** add `Obj` to the `@dxos/echo` import. Behavior/signatures unchanged; only the internal text-write path changes.

- [ ] **Step 1: Strengthen the controller test to assert TEXT content** (currently it only checks the node/edge graph). Add to `controller.test.ts`:

```ts
  test('createAfter leaves keepText in the source and puts the tail in the new node', async ({ expect }) => {
    const root = add('root'); const a = add('alpha');
    await createEdge(db, root, a, 1); await db.flush();
    await make(root).createAfter(a.id, 2); // split "al|pha"
    await db.flush();
    const rows = outlineRows(await allEdges(), root);
    const texts = rows.map((r) => r.node.text?.target?.content).sort();
    expect(texts).toEqual(['al', 'pha']); // source trimmed to 'al', new node holds 'pha'
  });

  test('mergeBackward appends the removed row text to the preceding node', async ({ expect }) => {
    const root = add('root'); const a = add('aa'); const b = add('bb');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    await make(root).mergeBackward(b.id);
    await db.flush();
    const rows = outlineRows(await allEdges(), root);
    expect(rows.map((r) => r.node.id)).toEqual([a.id]);
    expect(rows[0].node.text?.target?.content).toBe('aabb'); // b's text appended to a
  });
```
(These use the existing `add`/`allEdges`/`make` helpers. `add(t)` seeds text `t`; note `makeNode` always creates a `Text` now.)

- [ ] **Step 2: Run, verify they fail** (`moon run plugin-bramble:test -- controller`) — the current view-mediated code makes no substrate text change when no view is registered, so `alpha`/`aa` are unchanged. Expected: FAIL.

- [ ] **Step 3: Rewrite the text paths** in `controller.ts`. Add `Obj` to the import (`import { Obj, Relation } from '@dxos/echo';` — keep whatever else is used). In `createAfter`, replace the view-dispatch trim block with a substrate write:

```ts
    // was: if (view && caretOffset < view.state.doc.length) view.dispatch({ changes: {...} });
    const sourceText = this.nodeOf(rows, nodeId).text?.target;
    if (sourceText) {
      Obj.update(sourceText, (m) => {
        m.content = plan.keepText;
      });
    }
```
In `mergeBackward`, replace the `precedingView` append block with:

```ts
    // was: if (precedingView) precedingView.dispatch({ changes: {...} });
    const precedingText = this.nodeOf(rows, plan.precedingId).text?.target;
    if (precedingText) {
      Obj.update(precedingText, (m) => {
        m.content = (precedingText.content ?? '') + plan.nodeText;
      });
    }
```
Remove the now-unused `view`/`precedingView` local lookups if they're no longer referenced. **Verify the `Obj.update(text, m => { m.content = … })` mutation is the correct API for an automerge `Text.content`** — the two tests above are the check; if `Obj.update` rejects a wholesale `content` reassignment, report the exact error and the working alternative (e.g. a `Text`-specific splice) rather than guessing. Do NOT reintroduce the view-dispatch path — it must be substrate-authoritative.

- [ ] **Step 4: Run, verify pass.** `moon run plugin-bramble:test -- controller` (all controller tests green, incl. the new text assertions) + `moon run plugin-bramble:build` + `moon run plugin-bramble:test-storybook -- NodeOutline` (the `play` suite still green — the mounted editors update via the binding). 
- [ ] **Step 5: Commit.** `git commit -m "fix(plugin-bramble): substrate-authoritative row text (Obj.update, not view-dispatch)"`

---

### Task 2: mergeBackward removes only the occurrence edge (multi-predecessor safe)

`mergeBackward` currently does `db.remove(row.node)` unconditionally — a Node with more than one structural parent would be globally deleted, dangling its other inbound edges. Remove the Node only when the merged edge was its **last** inbound edge.

**Files:** Modify `src/components/NodeOutline/controller.ts`, `src/components/NodeOutline/controller.test.ts`.

**Interfaces:** add `parentEdges` to the `../../model/edges` import. `mergeBackward` becomes `async` end-to-end (it already is).

- [ ] **Step 1: Failing test** — add to `controller.test.ts`:

```ts
  test('mergeBackward under one parent keeps a multi-predecessor node alive elsewhere', async ({ expect }) => {
    const root = add('root'); const p = add('p'); const shared = add('shared');
    // shared has TWO parents: root (order 2) and p (order 1); p is root's first child
    await createEdge(db, root, p, 1);
    await createEdge(db, p, shared, 1);
    await createEdge(db, root, shared, 2); await db.flush();
    // merge the root→shared occurrence (the last row) into the row above it
    const rows0 = outlineRows(await allEdges(), root);
    const rootShared = rows0.find((r) => r.node.id === shared.id && r.depth === 0)!;
    await make(root).mergeBackward(rootShared.node.id);
    await db.flush();
    // `shared` still exists (still a child of p); only the root→shared edge is gone
    const stillThere = (await db.query(Query.select(Filter.id(shared.id))).run()).length;
    expect(stillThere).toBe(1);
  });
```
(If `mergeBackward`'s `nodeId` lookup can't distinguish the two occurrences, note it — merge acts on the row/occurrence, and `mergePlan` returns null for a node with children, so pick fixtures where the merged occurrence is a childless leaf row. Adjust the fixture so the merged occurrence is a leaf if needed, keeping the multi-parent shape.)

- [ ] **Step 2: Run, verify fail** — the current `db.remove(row.node)` deletes `shared` globally, so the query returns 0. Expected: FAIL.

- [ ] **Step 3: Fix** `mergeBackward` in `controller.ts` — count inbound edges before removing, and delete the Node only if this was its last one:

```ts
    const inbound = await parentEdges(this.ctx.db, row.node);
    removeEdge(this.ctx.db, row.edge);
    if (inbound.length <= 1) {
      this.ctx.db.remove(row.node);
    }
```
(replacing the unconditional `removeEdge(...) ; this.ctx.db.remove(row.node)`).

- [ ] **Step 4: Run, verify pass.** `moon run plugin-bramble:test -- controller` + `:build` green.
- [ ] **Step 5: Commit.** `git commit -m "fix(plugin-bramble): mergeBackward removes only the occurrence edge; keeps multi-predecessor nodes"`

---

### Task 3: Indent / outdent (Tab / Shift-Tab)

Pure `indentPlan`/`outdentPlan` + controller intents + the keymap. Indent nests the focused row under its preceding sibling; outdent lifts it to become its parent's following sibling.

**Files:** Modify `src/model/gestures.ts` (+ `gestures.test.ts`), `src/components/NodeOutline/controller.ts` (+ `controller.test.ts`), `src/components/NodeOutline/gestures-extension.ts`, `NodeOutline.stories.tsx`.

**Interfaces — Produces:**
```ts
export type ReparentPlan = { newParentId: string; order: number };
export const indentPlan:  (rows: OutlineRow[], root: Node, nodeId: string) => ReparentPlan | null;
export const outdentPlan: (rows: OutlineRow[], root: Node, nodeId: string) => ReparentPlan | null;
// controller:
async indent(nodeId: string): Promise<void>;
async outdent(nodeId: string): Promise<void>;
```

- [ ] **Step 1: Failing pure tests** in `gestures.test.ts`:

```ts
  test('indentPlan nests a row under its preceding sibling (appended)', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const b = add('b');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    const rows = await rowsOf(root);
    const plan = indentPlan(rows, root, b.id);
    expect(plan).toEqual({ newParentId: a.id, order: 0 }); // a has no children → appended at 0
  });
  test('indentPlan is a no-op for a first child (no preceding sibling)', async ({ expect }) => {
    const root = add('root'); const a = add('a');
    await createEdge(db, root, a, 1); await db.flush();
    expect(indentPlan(await rowsOf(root), root, a.id)).toBeNull();
  });
  test('outdentPlan lifts a nested row to be its parent’s following sibling', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const a1 = add('a1'); const b = add('b');
    await createEdge(db, root, a, 1); await createEdge(db, a, a1, 1); await createEdge(db, root, b, 2); await db.flush();
    const plan = outdentPlan(await rowsOf(root), root, a1.id);
    expect(plan!.newParentId).toBe(root.id);   // grandparent
    expect(plan!.order).toBeGreaterThan(1);      // after a(1), before b(2)
    expect(plan!.order).toBeLessThan(2);
  });
  test('outdentPlan is a no-op at the top level', async ({ expect }) => {
    const root = add('root'); const a = add('a');
    await createEdge(db, root, a, 1); await db.flush();
    expect(outdentPlan(await rowsOf(root), root, a.id)).toBeNull();
  });
```

- [ ] **Step 2: Run, verify fail** (`moon run plugin-bramble:test -- gestures`).

- [ ] **Step 3: Implement** in `gestures.ts`:

```ts
export type ReparentPlan = { newParentId: string; order: number };

export const indentPlan = (rows: OutlineRow[], root: Node, nodeId: string): ReparentPlan | null => {
  const row = rows.find((r) => r.node.id === nodeId);
  if (!row) return null;
  const parentId = Relation.getSource(row.edge).id;
  const sibs = childRowsOf(rows, parentId);
  const i = sibs.findIndex((r) => r.node.id === nodeId);
  if (i <= 0) return null; // no preceding sibling
  const newParent = sibs[i - 1];
  const kids = childRowsOf(rows, newParent.node.id);
  return { newParentId: newParent.node.id, order: orderBetween(kids[kids.length - 1]?.edge, undefined) };
};

export const outdentPlan = (rows: OutlineRow[], root: Node, nodeId: string): ReparentPlan | null => {
  const row = rows.find((r) => r.node.id === nodeId);
  if (!row) return null;
  const parentId = Relation.getSource(row.edge).id;
  if (parentId === root.id) return null; // already top level
  const parentRow = rows.find((r) => r.node.id === parentId)!;
  const grandparentId = Relation.getSource(parentRow.edge).id;
  const gpKids = childRowsOf(rows, grandparentId);
  const pi = gpKids.findIndex((r) => r.node.id === parentId);
  return { newParentId: grandparentId, order: orderBetween(gpKids[pi]?.edge, gpKids[pi + 1]?.edge) };
};
```
(`childRowsOf` already exists in `gestures.ts` from Plan 2b.)

- [ ] **Step 4: Run, verify pass** (`moon run plugin-bramble:test -- gestures`).

- [ ] **Step 5: Controller intents** — add to `controller.ts` (and a failing controller test first, in `controller.test.ts`, asserting Tab-equivalent moves `b` under `a`):

```ts
  async indent(nodeId: string) {
    const rows = await this.ctx.getRows();
    const plan = indentPlan(rows, this.ctx.root, nodeId);
    if (!plan) return;
    const row = rows.find((r) => r.node.id === nodeId)!;
    await reparentEdge(this.ctx.db, row.edge, this.nodeOf(rows, plan.newParentId), plan.order);
  }
  async outdent(nodeId: string) {
    const rows = await this.ctx.getRows();
    const plan = outdentPlan(rows, this.ctx.root, nodeId);
    if (!plan) return;
    const row = rows.find((r) => r.node.id === nodeId)!;
    await reparentEdge(this.ctx.db, row.edge, this.nodeOf(rows, plan.newParentId), plan.order);
  }
```
Add `reparentEdge`, `indentPlan`, `outdentPlan` to the imports.

Controller test:
```ts
  test('indent moves a row under its preceding sibling', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const b = add('b');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    await make(root).indent(b.id); await db.flush();
    const rows = outlineRows(await allEdges(), root);
    expect(rows.map((r) => [r.node.id, r.depth])).toEqual([[a.id, 0], [b.id, 1]]); // b nested under a
  });
```

- [ ] **Step 6: Keymap** — add to `brambleGestures`' array in `gestures-extension.ts`:

```ts
      {
        key: 'Tab',
        preventDefault: true,
        run: () => { void controller.indent(nodeId); return true; },
        shift: () => { void controller.outdent(nodeId); return true; },
      },
```

- [ ] **Step 7: `play` test** — add `IndentOutdent` story: focus the 2nd top-level row, press `Tab`, assert its `bramble-row` gains `data-depth="1"` (nested); press `Shift-Tab`, assert back to `data-depth="0"`. Use `waitFor` for the async re-render (as `BackspaceMergesRow` does).

- [ ] **Step 8: Run all** — `moon run plugin-bramble:test` + `test-storybook -- NodeOutline` + `:build` + `:lint` green.
- [ ] **Step 9: Commit.** `git commit -m "feat(plugin-bramble): indent/outdent (Tab/Shift-Tab) reshape the structural edge"`

---

### Task 4: Reorder (Cmd-Shift-↑/↓)

Move the focused row up/down among its siblings by rewriting its edge's `order` in place.

**Files:** Modify `src/model/gestures.ts` (+ `gestures.test.ts`), `src/components/NodeOutline/controller.ts` (+ `controller.test.ts`), `gestures-extension.ts`, `NodeOutline.stories.tsx`.

**Interfaces — Produces:**
```ts
export const reorderPlan: (rows: OutlineRow[], root: Node, nodeId: string, dir: -1 | 1) => { order: number } | null;
// controller:
async reorder(nodeId: string, dir: -1 | 1): Promise<void>;
```

- [ ] **Step 1: Failing pure tests** in `gestures.test.ts`:

```ts
  test('reorderPlan up moves a row before its preceding sibling', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const b = add('b'); const c = add('c');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await createEdge(db, root, c, 3); await db.flush();
    const rows = await rowsOf(root);
    const plan = reorderPlan(rows, root, c.id, -1); // c up → between a(1) and b(2)
    expect(plan!.order).toBeGreaterThan(1);
    expect(plan!.order).toBeLessThan(2);
  });
  test('reorderPlan is a no-op at the ends', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const b = add('b');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    const rows = await rowsOf(root);
    expect(reorderPlan(rows, root, a.id, -1)).toBeNull(); // a is first
    expect(reorderPlan(rows, root, b.id, 1)).toBeNull();  // b is last
  });
```

- [ ] **Step 2: Run, verify fail.**

- [ ] **Step 3: Implement** in `gestures.ts`:

```ts
export const reorderPlan = (rows: OutlineRow[], root: Node, nodeId: string, dir: -1 | 1): { order: number } | null => {
  const row = rows.find((r) => r.node.id === nodeId);
  if (!row) return null;
  const parentId = Relation.getSource(row.edge).id;
  const sibs = childRowsOf(rows, parentId);
  const i = sibs.findIndex((r) => r.node.id === nodeId);
  const j = i + dir;
  if (j < 0 || j >= sibs.length) return null; // no neighbour
  const order =
    dir < 0
      ? orderBetween(sibs[j - 1]?.edge, sibs[j].edge) // land before the preceding sibling
      : orderBetween(sibs[j].edge, sibs[j + 1]?.edge); // land after the following sibling
  return { order };
};
```

- [ ] **Step 4: Run, verify pass.**

- [ ] **Step 5: Controller intent** (+ failing controller test asserting the order swap) — add to `controller.ts`:

```ts
  async reorder(nodeId: string, dir: -1 | 1) {
    const rows = await this.ctx.getRows();
    const plan = reorderPlan(rows, this.ctx.root, nodeId, dir);
    if (!plan) return;
    const row = rows.find((r) => r.node.id === nodeId)!;
    Obj.update(row.edge, (m) => {
      m.order = plan.order;
    });
  }
```
(add `reorderPlan` to the imports; `Obj` is already imported from Task 1). Controller test:
```ts
  test('reorder down swaps a row past its following sibling', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const b = add('b');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    await make(root).reorder(a.id, 1); await db.flush();
    const rows = outlineRows(await allEdges(), root);
    expect(rows.map((r) => r.node.id)).toEqual([b.id, a.id]); // a now after b
  });
```

- [ ] **Step 6: Keymap** — add to `brambleGestures`:

```ts
      {
        key: 'Mod-Shift-ArrowUp',
        preventDefault: true,
        run: () => { void controller.reorder(nodeId, -1); return true; },
      },
      {
        key: 'Mod-Shift-ArrowDown',
        preventDefault: true,
        run: () => { void controller.reorder(nodeId, 1); return true; },
      },
```

- [ ] **Step 7: `play` test** — `ReorderRows` story: focus a middle row, `{Mod>}{Shift>}{ArrowUp}{/Shift}{/Mod}`, assert the row order (`bramble-row` text sequence) changed; `waitFor` the re-render.

- [ ] **Step 8: Run all** green (`test` + `test-storybook -- NodeOutline` + `build` + `lint`).
- [ ] **Step 9: Commit.** `git commit -m "feat(plugin-bramble): reorder (Cmd-Shift-Up/Down) rewrites the edge order"`

---

## Delivery gate (before Plan 2c is done)

1. `moon run plugin-bramble:{build,test,test-storybook,lint}` green; `moon run composer-app:build` typecheck green.
2. **Re-run the R gate in Composer** (:5174): create a Bramble node, type/Enter to build a small tree, then Tab/Shift-Tab/Cmd-Shift-↑↓ — check indent/outdent/reorder against `user-experience.md`. The view-mediated Medium is gone, so behavior matches headless.
3. Traceability: gestures trace `UP-1.reshape` (indent/outdent/reorder) · `UP-1.author` (the merge fix) · `IX-direct`.
4. Update `FLOW.md` (S6 Plan-2c built) + pipeline.

## Deferred (out of 2c)

Expand/collapse + zoom view-state (chevron/bullet click, Cmd-↑↓, Cmd+./,) → **Plan 2d** (needs the now-substrate-authoritative text so collapsed/unmounted rows are safe). Drag (Pragmatic DnD via `@dxos/react-ui-list`) → **Plan 2e**. Undo (Operation-wrapping) → its own later slice.
