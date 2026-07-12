<!-- derives-from: [IP-1, IP-2, UP-1.author, UX-direct, UX-immediate]; role: target; status: draft -->

# Plan 2b — Editing + authoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Turn Plan 2a's read-only outline into a genuinely **editable** one — type to edit a row, **Enter** to create/split a row, **Backspace-at-start** to delete/merge, an **editable header**, and caret flow across rows — all wired to the Plan-1 edge algebra. Realizes `UP-1.author` (create/edit/remove) + `UX-direct`/`UX-immediate`.

**Architecture:** Rows stay one `EditorView` each (Plan 2a), now **editable** (`readOnly` off; edits write back through the existing automerge binding). Structural authoring is coordinated by a shell-owned **`OutlineController`** (React context): a `Map<nodeId, EditorView>` registry each row populates on mount, plus intent methods (`createAfter`, `mergeBackward`, `focusAdjacent`, `focusRow`) the per-row CodeMirror keymaps call. Because a substrate mutation is async and only re-renders the rows afterward, focus is **deferred**: an intent sets `pendingFocus`, and the target row fulfills it when its view *registers*. The substrate math (what a split/merge does to nodes+edges) lives in **pure, headless-tested** functions; the controller + keymaps are the thin imperative layer.

**Tech Stack:** `@dxos/ui-editor` (`createBasicExtensions`/`createDataExtensions`), `@dxos/react-ui-editor` (`useTextEditor`), CodeMirror (`keymap`/`Prec`/`EditorSelection`), `@dxos/async` (`Event` — if used), the Plan-1 edge algebra, Vitest + Storybook `play`.

## Global Constraints

- **Public `@dxos/*` imports only**; nothing outside `packages/plugins/plugin-bramble/` except `pnpm-lock.yaml`. Editor factories import from **`@dxos/ui-editor`** (not `@dxos/react-ui-editor` — they moved).
- **Editable via `createBasicExtensions({ readOnly: false })`** (or omit the flag). Write-back is the existing `createDataExtensions({ text: Doc.createAccessor(node.text.target, ['content']) })` automerge binding — no new write path.
- **Gesture keymaps bind at `Prec.highest`** so `Enter`/`Backspace`/arrows win over the markdown list-continuation handler. `keymap` from `@codemirror/view`; `Prec`, `EditorSelection` from `@codemirror/state`.
- **Keybindings follow R (Tana)**, not DXOS's own outliner: `Enter` = create/split, `Backspace`-at-start = delete/merge, `↑/↓` at a row edge = move to the adjacent row. (Indent/outdent/reorder are **Plan 2c**.)
- **Substrate math is pure & headless.** `splitPlan`/`mergePlan` compute the mutation from the flat rows + caret; they take no `EditorView` and no DOM. The controller applies them via the Plan-1 edge algebra (`createEdge`/`removeEdge`/`reparentEdge`/`orderBetween`) directly.
- **Undo is OUT OF SCOPE** (deferred to its own later slice). Per-row text edits ride CodeMirror's built-in history; structural gestures are *not* wrapped as app-framework Operations here. Do **not** add `UndoMapping`/operation-invoker plumbing in this plan.
- **Reads stay reactive** (`useQuery`); the pure view-model (`outlineRows`) is unchanged.
- Tests: `moon run plugin-bramble:test` (headless units + wiring), `moon run plugin-bramble:test-storybook -- NodeOutline` (row-editor `play`, chromium). Never raw vitest.
- **Branch:** continue on `claude/plugin-bramble-substrate` (Plan 1 + 2a); tree must stay build/lint green.

## Cross-row editing model (read before Task 3)

The `OutlineController` is a plain object the shell creates and provides via context:

```ts
export type FocusPos = 'start' | 'end' | number;
export type OutlineController = {
  // registry — each row calls register on mount (returns an unregister fn)
  register(nodeId: string, view: EditorView): () => void;
  focusRow(nodeId: string, pos: FocusPos): void;
  // gesture intents (called from a row's keymap):
  createAfter(nodeId: string, caretOffset: number): void;  // Enter: split at caret → new sibling row
  mergeBackward(nodeId: string): void;                     // Backspace at offset 0 → merge into preceding row
  focusAdjacent(nodeId: string, dir: -1 | 1): void;        // Arrow at a row edge → adjacent row
};
```

- **Registry:** `views: Map<nodeId, EditorView>`; `register(id, view)` adds it and, if `pendingFocus?.nodeId === id`, immediately fulfills the pending focus (place cursor + `.focus()`) and clears it. (Pattern: plugin-markdown's `EditorViews` capability + `scroll-to-anchor`'s dispatch-into-another-view.)
- **Deferred focus:** an intent that creates/removes a row can't focus it synchronously (the row mounts only after the async substrate mutation re-renders). So the intent sets `pendingFocus = { nodeId, pos }`; the row fulfills it on `register`. An intent targeting an *already-mounted* row (`focusAdjacent`) focuses immediately via the registry.
- **Substrate math (pure):** `splitPlan(rows, nodeId, caretOffset)` and `mergePlan(rows, nodeId)` (Task 2) turn the current flat `OutlineRow[]` + a caret offset into a plain description of the mutation (texts to set, edges to create/remove/reparent, and which node to focus at which offset). The controller (Task 3) executes that description via the Plan-1 edge algebra, then sets `pendingFocus`.
- The controller receives the current `rows` (from the shell's `outlineRows(edges, subject)`) so its intents can resolve preceding/next/parent without querying.

---

### Task 1: Make rows + header editable (write-back)

Flip the per-row editor from read-only to editable and confirm edits persist to the ECHO `Text`. No structure yet — just typing into an existing row/header changes and saves it.

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx` (add an edit `play`)

**Interfaces:**
- Consumes: `useTextEditor` (`@dxos/react-ui-editor`); `createBasicExtensions`, `createDataExtensions`, `createThemeExtensions` (`@dxos/ui-editor`); `Doc.createAccessor` (`@dxos/echo-doc`); `useThemeContext` (`@dxos/react-ui`).
- Produces: `RowEditor` renders an **editable** CodeMirror by default; an optional `readOnly?: boolean` prop preserves the read-only render for any caller that still wants it. Public shape otherwise unchanged (`{ node, testId?, className?, readOnly? }`).

- [ ] **Step 1: Write the failing edit `play`** — add a `Editable` story to `NodeOutline.stories.tsx` (reusing the existing seeded wrapper) whose `play` types into the first row and asserts the bound text changed:

```ts
export const Editable: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = await canvas.findAllByTestId('bramble-node-name');
    const content = rows[0].querySelector<HTMLElement>('.cm-content')!;
    content.focus();
    // place caret at end and type
    await userEvent.keyboard('{End} X');
    await expect(content).toHaveTextContent('a X');
  },
};
```

- [ ] **Step 2: Run it, verify it fails**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: FAIL — the row is read-only (Plan 2a), so the typed text is rejected and the content stays `a`.

- [ ] **Step 3: Make `RowEditor` editable** — change the `readOnly` handling so it defaults to editable:

```tsx
export const RowEditor = ({
  node,
  readOnly = false,
  testId,
  className,
}: {
  node: Node;
  readOnly?: boolean;
  testId?: string;
  className?: string;
}) => {
  const { themeMode } = useThemeContext();
  const text = node.text?.target;
  const { parentRef } = useTextEditor(
    () => ({
      id: node.id,
      initialValue: text?.content ?? '',
      extensions: text
        ? [
            createDataExtensions({ id: node.id, text: Doc.createAccessor(text, ['content']) }),
            createBasicExtensions({ readOnly }),
            createThemeExtensions({ themeMode }),
          ]
        : [createBasicExtensions({ readOnly: true })],
    }),
    [node.id, text, themeMode, readOnly],
  );
  return <div data-testid={testId} className={className} ref={parentRef} />;
};
```
(The header in `NodeOutline.tsx` and body rows in `OutlineRow.tsx` already call `RowEditor` without `readOnly`, so both become editable with no change there — verify that, and if any call site passes `readOnly`, remove it.)

- [ ] **Step 4: Run, verify it passes**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: PASS — typing into a row updates its `.cm-content` (and the automerge binding writes it back to the `Text`; the existing render assertions still hold). Also run `moon run plugin-bramble:test` (node) + `moon run plugin-bramble:build` — green.

- [ ] **Step 5: Commit**

```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx
git commit -m "feat(plugin-bramble): editable rows + header (read-only flip, write-back)"
```

---

### Task 2: Gesture-logic pure functions (split / merge)

Pure, headless functions that turn the flat `OutlineRow[]` + a caret offset into a plain mutation description. No `EditorView`, no DOM, no `db`.

**Files:**
- Create: `packages/plugins/plugin-bramble/src/model/gestures.ts`
- Test: `packages/plugins/plugin-bramble/src/model/gestures.test.ts`

**Interfaces — Consumes:** `OutlineRow` (`./outline`), `orderBetween` (`./edges`), `Relation` (`@dxos/echo`), `Node` (`../types`). **Produces:**
```ts
export type SplitPlan = { keepText: string; newText: string; parentId: string; order: number };
export type MergePlan = { precedingId: string; nodeText: string; mergeOffset: number };
export const splitPlan: (rows: OutlineRow[], root: Node, nodeId: string, caretOffset: number) => SplitPlan;
export const mergePlan: (rows: OutlineRow[], root: Node, nodeId: string) => MergePlan | null; // null = no-op (has children / not found)
```

- [ ] **Step 1: Write the failing test** `gestures.test.ts` — seed a db (as `outline.test.ts` does), get `rows` via `outlineRows`, and assert the plans:

```ts
//
// Copyright 2026 DXOS.org
//

import { afterEach, beforeEach, describe, test } from 'vitest';
import { Filter, Query } from '@dxos/echo';
import { type EchoDatabase } from '@dxos/echo-client';
import { EchoTestBuilder } from '@dxos/echo-client/testing';
import { Text } from '@dxos/schema';
import { createEdge } from './edges';
import { splitPlan, mergePlan } from './gestures';
import { outlineRows } from './outline';
import { Edge, Node, makeNode } from '../types';

describe('gestures', () => {
  let builder: EchoTestBuilder;
  let db: EchoDatabase;
  beforeEach(async () => {
    builder = await new EchoTestBuilder().open();
    ({ db } = await builder.createDatabase({ types: [Node, Edge, Text.Text] }));
  });
  afterEach(async () => { await builder.close(); });

  const add = (t: string) => db.add(makeNode({ text: t }));
  const rowsOf = async (root: Node) => outlineRows((await db.query(Query.select(Filter.type(Edge))).run()) as Edge[], root);

  test('splitPlan on a childless node makes a next sibling with the tail text', async ({ expect }) => {
    const root = add('root'); const a = add('alpha'); const b = add('bravo');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    const rows = await rowsOf(root);
    const plan = splitPlan(rows, root, a.id, 2); // caret after "al"
    expect(plan.keepText).toBe('al');
    expect(plan.newText).toBe('pha');
    expect(plan.parentId).toBe(root.id);        // sibling of a → same parent (root)
    expect(plan.order).toBeGreaterThan(1);       // between a(1) and b(2)
    expect(plan.order).toBeLessThan(2);
  });

  test('splitPlan on a node with children makes a first child', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const a1 = add('a1');
    await createEdge(db, root, a, 1); await createEdge(db, a, a1, 5); await db.flush();
    const rows = await rowsOf(root);
    const plan = splitPlan(rows, root, a.id, 1);
    expect(plan.parentId).toBe(a.id);            // first child of a
    expect(plan.order).toBeLessThan(5);          // before a1(5)
  });

  test('splitPlan on the root (header) makes a first child of root', async ({ expect }) => {
    const root = add('title');
    await db.flush();
    const rows = await rowsOf(root);
    const plan = splitPlan(rows, root, root.id, 5);
    expect(plan.parentId).toBe(root.id);
    expect(plan.keepText).toBe('title');
    expect(plan.newText).toBe('');
  });

  test('mergePlan merges a childless node into the row above', async ({ expect }) => {
    const root = add('root'); const a = add('aa'); const b = add('bb');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    const rows = await rowsOf(root);
    const plan = mergePlan(rows, root, b.id);
    expect(plan).not.toBeNull();
    expect(plan!.precedingId).toBe(a.id);
    expect(plan!.nodeText).toBe('bb');
    expect(plan!.mergeOffset).toBe(2); // caret lands after "aa"
  });

  test('mergePlan is a no-op for the first row (merges into root header) and for a node with children', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const a1 = add('a1');
    await createEdge(db, root, a, 1); await createEdge(db, a, a1, 1); await db.flush();
    const rows = await rowsOf(root);
    expect(mergePlan(rows, root, a.id)).toBeNull();          // a has a child → deferred
    expect(mergePlan(rows, root, a1.id)!.precedingId).toBe(a.id); // a1 merges into a
  });
});
```

- [ ] **Step 2: Run, verify it fails.** Run: `moon run plugin-bramble:test -- gestures` → FAIL (module missing).

- [ ] **Step 3: Implement** `gestures.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { Relation } from '@dxos/echo';
import { orderBetween } from './edges';
import { type OutlineRow } from './outline';
import { type Node } from '../types';

const contentOf = (node: Node): string => node.text?.target?.content ?? '';
const childRowsOf = (rows: OutlineRow[], parentId: string): OutlineRow[] =>
  rows.filter((r) => Relation.getSource(r.edge).id === parentId);

export type SplitPlan = { keepText: string; newText: string; parentId: string; order: number };

export const splitPlan = (rows: OutlineRow[], root: Node, nodeId: string, caretOffset: number): SplitPlan => {
  const node = nodeId === root.id ? root : rows.find((r) => r.node.id === nodeId)!.node;
  const content = contentOf(node);
  const keepText = content.slice(0, caretOffset);
  const newText = content.slice(caretOffset);
  const kids = childRowsOf(rows, nodeId);

  let parentId: string;
  let before: OutlineRow | undefined;
  let after: OutlineRow | undefined;
  if (nodeId === root.id || kids.length > 0) {
    parentId = nodeId; // new first child
    after = kids[0];
  } else {
    const row = rows.find((r) => r.node.id === nodeId)!;
    parentId = Relation.getSource(row.edge).id; // new next sibling
    const sibs = childRowsOf(rows, parentId);
    const i = sibs.findIndex((r) => r.node.id === nodeId);
    before = sibs[i];
    after = sibs[i + 1];
  }
  return { keepText, newText, parentId, order: orderBetween(before?.edge, after?.edge) };
};

export type MergePlan = { precedingId: string; nodeText: string; mergeOffset: number };

/** Backspace at offset 0. Floor: only childless nodes merge; a node with children is a no-op (deferred). */
export const mergePlan = (rows: OutlineRow[], root: Node, nodeId: string): MergePlan | null => {
  const idx = rows.findIndex((r) => r.node.id === nodeId);
  if (idx < 0 || childRowsOf(rows, nodeId).length > 0) {
    return null;
  }
  const preceding = idx === 0 ? root : rows[idx - 1].node;
  return { precedingId: preceding.id, nodeText: contentOf(rows[idx].node), mergeOffset: contentOf(preceding).length };
};
```

- [ ] **Step 4: Run, verify pass.** Run: `moon run plugin-bramble:test -- gestures` → all green.
- [ ] **Step 5: Commit.** `git commit -m "feat(plugin-bramble): pure split/merge gesture math"`

---

### Task 3: OutlineController — registry, deferred focus, intents

The shell-owned coordinator. Structural intents mutate the substrate via the Plan-1 edge algebra + the Task-2 math; focus is deferred to row registration. Headless-testable for the substrate half.

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/controller.ts`
- Test: `packages/plugins/plugin-bramble/src/components/NodeOutline/controller.test.ts`

**Interfaces — Consumes:** `EditorView` (`@codemirror/view`), `EditorSelection` (`@codemirror/state`); `createEdge`, `removeEdge` (`../../model/edges`); `splitPlan`, `mergePlan` (`../../model/gestures`); `outlineRows`, `OutlineRow` (`../../model/outline`); `makeNode`, `Node`, `Edge` (`../../types`); `EchoDatabase` (`@dxos/echo-client`). **Produces:** the `OutlineController` class + `FocusPos` type (used by Tasks 4–6 and the shell).

- [ ] **Step 1: Write the failing test** `controller.test.ts` — headless, no views registered (so intents mutate the substrate; focus is a no-op path):

```ts
//
// Copyright 2026 DXOS.org
//

import { afterEach, beforeEach, describe, test } from 'vitest';
import { Filter, Query, Relation } from '@dxos/echo';
import { type EchoDatabase } from '@dxos/echo-client';
import { EchoTestBuilder } from '@dxos/echo-client/testing';
import { Text } from '@dxos/schema';
import { OutlineController } from './controller';
import { createEdge } from '../../model/edges';
import { outlineRows } from '../../model/outline';
import { Edge, Node, makeNode } from '../../types';

describe('OutlineController (substrate half)', () => {
  let builder: EchoTestBuilder;
  let db: EchoDatabase;
  beforeEach(async () => {
    builder = await new EchoTestBuilder().open();
    ({ db } = await builder.createDatabase({ types: [Node, Edge, Text.Text] }));
  });
  afterEach(async () => { await builder.close(); });

  const add = (t: string) => db.add(makeNode({ text: t }));
  const allEdges = async () => (await db.query(Query.select(Filter.type(Edge))).run()) as Edge[];
  const make = (root: Node) => new OutlineController({ db, root, getRows: async () => outlineRows(await allEdges(), root) });

  test('createAfter adds a Node under the resolved parent with the tail text', async ({ expect }) => {
    const root = add('root'); const a = add('alpha');
    await createEdge(db, root, a, 1); await db.flush();
    await make(root).createAfter(a.id, 2); // split "al|pha"
    await db.flush();
    const rows = outlineRows(await allEdges(), root);
    // a is childless → new node is a sibling under root, after a
    const texts = rows.map((r) => r.node.text?.target?.content);
    expect(texts).toContain('pha');
    expect(rows.length).toBe(2);
  });

  test('mergeBackward removes a childless node and its edge', async ({ expect }) => {
    const root = add('root'); const a = add('a'); const b = add('b');
    await createEdge(db, root, a, 1); await createEdge(db, root, b, 2); await db.flush();
    await make(root).mergeBackward(b.id);
    await db.flush();
    const rows = outlineRows(await allEdges(), root);
    expect(rows.map((r) => r.node.id)).toEqual([a.id]); // b gone
  });
});
```
(Note: `getRows` is async here so the controller can re-query; the shell passes a sync snapshot — the controller awaits it either way.)

- [ ] **Step 2: Run, verify it fails.** Run: `moon run plugin-bramble:test -- controller` → FAIL (module missing).

- [ ] **Step 3: Implement** `controller.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { EditorSelection } from '@codemirror/state';
import { type EditorView } from '@codemirror/view';

import { Relation } from '@dxos/echo';
import { type EchoDatabase } from '@dxos/echo-client';

import { createEdge, removeEdge } from '../../model/edges';
import { mergePlan, splitPlan } from '../../model/gestures';
import { type OutlineRow } from '../../model/outline';
import { Node, makeNode } from '../../types';

export type FocusPos = 'start' | 'end' | number;

export type OutlineControllerCtx = {
  db: EchoDatabase;
  root: Node;
  getRows: () => OutlineRow[] | Promise<OutlineRow[]>;
};

export class OutlineController {
  private readonly views = new Map<string, EditorView>();
  private pendingFocus: { nodeId: string; pos: FocusPos } | null = null;

  constructor(private readonly ctx: OutlineControllerCtx) {}

  /** Update the ctx (fresh root/getRows) on each shell render without recreating the instance. */
  setCtx(ctx: OutlineControllerCtx) {
    (this as any).ctx = ctx;
  }

  register(nodeId: string, view: EditorView): () => void {
    this.views.set(nodeId, view);
    if (this.pendingFocus?.nodeId === nodeId) {
      this.place(view, this.pendingFocus.pos);
      this.pendingFocus = null;
    }
    return () => {
      if (this.views.get(nodeId) === view) {
        this.views.delete(nodeId);
      }
    };
  }

  focusRow(nodeId: string, pos: FocusPos) {
    const view = this.views.get(nodeId);
    if (view) {
      this.place(view, pos);
    } else {
      this.pendingFocus = { nodeId, pos };
    }
  }

  private place(view: EditorView, pos: FocusPos) {
    const at = pos === 'start' ? 0 : pos === 'end' ? view.state.doc.length : Math.min(pos, view.state.doc.length);
    view.dispatch({ selection: EditorSelection.cursor(at) });
    view.focus();
  }

  private nodeOf(rows: OutlineRow[], id: string): Node {
    return id === this.ctx.root.id ? this.ctx.root : rows.find((r) => r.node.id === id)!.node;
  }

  async createAfter(nodeId: string, caretOffset: number) {
    const rows = await this.ctx.getRows();
    const plan = splitPlan(rows, this.ctx.root, nodeId, caretOffset);
    const parent = this.nodeOf(rows, plan.parentId);
    const newNode = this.ctx.db.add(makeNode({ text: plan.newText }));
    await createEdge(this.ctx.db, parent, newNode, plan.order);
    // trim the tail out of the source row's editor (keepText remains)
    const view = this.views.get(nodeId);
    if (view && caretOffset < view.state.doc.length) {
      view.dispatch({ changes: { from: caretOffset, to: view.state.doc.length } });
    }
    this.focusRow(newNode.id, 'start');
  }

  async mergeBackward(nodeId: string) {
    const rows = await this.ctx.getRows();
    const plan = mergePlan(rows, this.ctx.root, nodeId);
    if (!plan) {
      return;
    }
    // append this node's text to the preceding editor (goes through its automerge binding)
    const precedingView = this.views.get(plan.precedingId);
    if (precedingView) {
      precedingView.dispatch({ changes: { from: precedingView.state.doc.length, insert: plan.nodeText } });
    }
    // remove this node's structural edge + the node
    const row = rows.find((r) => r.node.id === nodeId)!;
    removeEdge(this.ctx.db, row.edge);
    this.ctx.db.remove(row.node);
    this.focusRow(plan.precedingId, plan.mergeOffset);
  }

  async focusAdjacent(nodeId: string, dir: -1 | 1) {
    const rows = await this.ctx.getRows();
    const idx = rows.findIndex((r) => r.node.id === nodeId);
    const targetId =
      dir < 0 ? (idx <= 0 ? this.ctx.root.id : rows[idx - 1].node.id) : rows[idx + 1]?.node.id;
    if (targetId) {
      this.focusRow(targetId, dir < 0 ? 'end' : 'start');
    }
  }
}
```
(Verify against Plan 1: `removeEdge(db, edge)` is synchronous `db.remove(edge)`; `createEdge(db, parent, child, order)` is async and cycle-checked. `db.remove` is the ECHO delete. If `removeEdge`'s real signature differs, adapt the two call sites only.)

- [ ] **Step 4: Run, verify pass.** Run: `moon run plugin-bramble:test -- controller` → green; also `moon run plugin-bramble:build`.
- [ ] **Step 5: Commit.** `git commit -m "feat(plugin-bramble): OutlineController — registry + deferred focus + create/merge intents"`

---

### Task 4: Enter → create/split, and wire the controller into the shell

Provide the controller via context, have each row register its `EditorView`, and bind `Enter` to `createAfter`.

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/gestures-extension.ts` (the per-row CodeMirror keymap)
- Modify: `NodeOutline.tsx` (create controller + provide context + pass `getRows`), `OutlineRow.tsx` + `RowEditor.tsx` (register view + add the gesture extension), `controller.ts` (export a React context + `useOutlineController` hook)
- Modify: `NodeOutline.stories.tsx` (Enter `play`)

**Interfaces:** `OutlineControllerContext` (React context holding `OutlineController | null`) + `useOutlineController()` exported from `controller.ts`. `RowEditor` gains a `nodeId` it registers under (it already has `node`, so use `node.id`) and composes the gesture extension when a controller is present.

- [ ] **Step 1: Failing Enter `play`** — add to `NodeOutline.stories.tsx`:

```ts
export const EnterCreatesRow: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const before = await canvas.findAllByTestId('bramble-row');
    const first = before[0].querySelector<HTMLElement>('.cm-content')!;
    first.focus();
    await userEvent.keyboard('{End}{Enter}newrow');
    const after = await canvas.findAllByTestId('bramble-row');
    await expect(after.length).toBe(before.length + 1);
    // focus landed in the new row and typing went there
    await expect(document.activeElement?.closest('[data-node-id]')).not.toBeNull();
  },
};
```

- [ ] **Step 2: Run, verify fail.** `moon run plugin-bramble:test-storybook -- NodeOutline` → FAIL (Enter does nothing structural yet).

- [ ] **Step 3: Context + hook** — append to `controller.ts`:

```ts
import { createContext, useContext } from 'react';
export const OutlineControllerContext = createContext<OutlineController | null>(null);
export const useOutlineController = (): OutlineController | null => useContext(OutlineControllerContext);
```

- [ ] **Step 4: Gesture extension** `gestures-extension.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { Prec } from '@codemirror/state';
import { type Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';

import { type OutlineController } from './controller';

/** Per-row structural keymap. `nodeId` is the row this editor edits. */
export const brambleGestures = (controller: OutlineController, nodeId: string): Extension =>
  Prec.highest(
    keymap.of([
      {
        key: 'Enter',
        preventDefault: true,
        run: (view) => {
          void controller.createAfter(nodeId, view.state.selection.main.head);
          return true;
        },
      },
    ]),
  );
```

- [ ] **Step 5: Register the view + add the extension** — `RowEditor.tsx`: capture the `view` from `useTextEditor`, register it, and add `brambleGestures` when a controller is in context. Also stamp `data-node-id` on the wrapper (the tested focus anchor):

```tsx
import { useEffect } from 'react';
import { brambleGestures } from './gestures-extension';
import { useOutlineController } from './controller';
// ...
export const RowEditor = ({ node, readOnly = false, testId, className }: RowEditorProps) => {
  const { themeMode } = useThemeContext();
  const controller = useOutlineController();
  const text = node.text?.target;
  const { parentRef, view } = useTextEditor(
    () => ({
      id: node.id,
      initialValue: text?.content ?? '',
      extensions: [
        ...(text
          ? [
              createDataExtensions({ id: node.id, text: Doc.createAccessor(text, ['content']) }),
              createBasicExtensions({ readOnly }),
              createThemeExtensions({ themeMode }),
            ]
          : [createBasicExtensions({ readOnly: true })]),
        ...(controller && !readOnly ? [brambleGestures(controller, node.id)] : []),
      ],
    }),
    [node.id, text, themeMode, readOnly, controller],
  );
  useEffect(() => (view && controller ? controller.register(node.id, view) : undefined), [view, controller, node.id]);
  return <div data-testid={testId} data-node-id={node.id} className={className} ref={parentRef} />;
};
```

- [ ] **Step 6: Provide the controller** — `NodeOutline.tsx`: create the controller once (ref), keep its ctx fresh each render, and wrap the tree in the provider:

```tsx
import { useEffect, useMemo, useRef } from 'react';
import { OutlineController, OutlineControllerContext } from './controller';
// ...
export const NodeOutline = ({ subject }: NodeOutlineProps) => {
  const db = Obj.getDatabase(subject);
  const edges = useQuery(db, Query.select(Filter.type(Edge))) as Edge[];
  const rows = useMemo(() => outlineRows(edges, subject), [edges, subject]);

  const controllerRef = useRef<OutlineController>();
  if (!controllerRef.current && db) {
    controllerRef.current = new OutlineController({ db, root: subject, getRows: () => rows });
  }
  controllerRef.current?.setCtx({ db: db!, root: subject, getRows: () => rows });

  return (
    <OutlineControllerContext.Provider value={controllerRef.current ?? null}>
      <div data-testid='bramble-outline' role='tree'>
        <div data-testid='bramble-header'>
          <RowEditor node={subject} className='bramble-outline-header' />
        </div>
        {rows.map((row) => (
          <OutlineRow key={row.node.id} row={row} />
        ))}
      </div>
    </OutlineControllerContext.Provider>
  );
};
```

- [ ] **Step 7: Run, verify pass.** `moon run plugin-bramble:test-storybook -- NodeOutline` (Enter adds a row + focuses it) and `moon run plugin-bramble:test` + `:build` → green.
- [ ] **Step 8: Commit.** `git commit -m "feat(plugin-bramble): Enter creates/splits a row; wire OutlineController + view registry"`

---

### Task 5: Backspace-at-start → delete/merge, focus preceding

**Files:** Modify `gestures-extension.ts` (add the `Backspace` binding), `NodeOutline.stories.tsx` (Backspace `play`).

- [ ] **Step 1: Failing `play`** — add:

```ts
export const BackspaceMergesRow: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const before = await canvas.findAllByTestId('bramble-row');
    // focus the 2nd row (a leaf) and Backspace at its start
    const target = before.find((el) => el.getAttribute('data-depth') === '0' && el !== before[0])!;
    const content = target.querySelector<HTMLElement>('.cm-content')!;
    content.focus();
    await userEvent.keyboard('{Home}{Backspace}');
    const after = await canvas.findAllByTestId('bramble-row');
    await expect(after.length).toBe(before.length - 1);
  },
};
```

- [ ] **Step 2: Run, verify fail** (Backspace at start does nothing structural). `moon run plugin-bramble:test-storybook -- NodeOutline`.

- [ ] **Step 3: Add the binding** to `brambleGestures`' keymap array (before/after the Enter entry):

```ts
{
  key: 'Backspace',
  run: (view) => {
    const { head, empty } = view.state.selection.main;
    if (head === 0 && empty) {
      void controller.mergeBackward(nodeId);
      return true; // consumed — the merge handles it
    }
    return false; // normal backspace within the line
  },
},
```

- [ ] **Step 4: Run, verify pass.** `moon run plugin-bramble:test-storybook -- NodeOutline` + `:test` + `:build` green. Backspace at start of a leaf removes its row and merges its text into the preceding row; Backspace mid-text is unaffected.
- [ ] **Step 5: Commit.** `git commit -m "feat(plugin-bramble): Backspace-at-start merges a leaf row into the preceding row"`

---

### Task 6: Arrow at a row edge → focus adjacent row

**Files:** Modify `gestures-extension.ts` (add `ArrowUp`/`ArrowDown`), `NodeOutline.stories.tsx` (arrow `play`).

- [ ] **Step 1: Failing `play`** — assert ArrowUp from the 2nd row lands focus in the 1st (or header):

```ts
export const ArrowMovesBetweenRows: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = await canvas.findAllByTestId('bramble-row');
    const second = rows[1].querySelector<HTMLElement>('.cm-content')!;
    second.focus();
    await userEvent.keyboard('{Home}{ArrowUp}');
    const focusedId = document.activeElement?.closest('[data-node-id]')?.getAttribute('data-node-id');
    await expect(focusedId).toBe(rows[0].getAttribute('data-node-id'));
  },
};
```

- [ ] **Step 2: Run, verify fail.** `moon run plugin-bramble:test-storybook -- NodeOutline`.

- [ ] **Step 3: Add the bindings** to `brambleGestures` (a single-line row is always on the first & last line, so the edge check is simple; guard against multi-line for safety):

```ts
{
  key: 'ArrowUp',
  run: (view) => {
    const { head } = view.state.selection.main;
    if (view.state.doc.lineAt(head).number === 1) {
      void controller.focusAdjacent(nodeId, -1);
      return true;
    }
    return false;
  },
},
{
  key: 'ArrowDown',
  run: (view) => {
    const { head } = view.state.selection.main;
    if (view.state.doc.lineAt(head).number === view.state.doc.lines) {
      void controller.focusAdjacent(nodeId, 1);
      return true;
    }
    return false;
  },
},
```

- [ ] **Step 4: Run, verify pass.** `moon run plugin-bramble:test-storybook -- NodeOutline` + `:test` + `:build` green.
- [ ] **Step 5: Commit.** `git commit -m "feat(plugin-bramble): arrow at a row edge moves focus to the adjacent row"`

---

## Delivery gate (before Plan 2b is done)

1. `moon run plugin-bramble:{test,test-storybook,lint}` green; `moon run composer-app:build` typecheck passes.
2. **Re-run the R visual/UX gate in real Composer** (:5174): enable the plugin, create a Bramble Node, and drive editing by hand — type, Enter, Backspace, arrows — checking against `user-experience.md` (Edit content / Create / Delete-merge behaviors). Editing now works in-UI, so no console seeding needed.
3. Traceability: each gesture traces `UP-1.author` / `UX-direct` / `UX-immediate`; nothing imported without a neutral counterpart.
4. Update `FLOW.md` (S6 Plan-2b built) + the pipeline row.

## Deferred (explicitly out of 2b)

Indent/outdent, reorder, expand/collapse + zoom (view-state), and drag → **Plan 2c**. Merging a node that *has children* (Backspace) → deferred (2b floors to leaf merge; 2c or later handles child-reparenting on merge). Undo (Operation-wrapping + `UndoMapping`) → its own later slice. References/embed/backlinks → Plan 3.
