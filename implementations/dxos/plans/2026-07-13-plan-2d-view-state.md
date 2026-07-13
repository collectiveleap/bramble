# Plan 2d — View-state (expand/collapse + zoom) Implementation Plan

<!-- derives-from: [UP-1.outline, IX-direct, IX-direct.expand, PX-disclosure]; role: target; status: draft -->

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add local, per-user **view-state** to the Bramble outline — collapse/expand a Node's children, and zoom into a Node as the view root — driven by both pointer (chevron/bullet click) and keyboard.

**Architecture:** View-state is a `collapsed` set of Node ids plus a `zoomRootId`, held as **local React state** in `NodeOutline` — it is **not** substrate (no ECHO writes; design §2). The pure view-model `outlineRows` gains a `collapsed` parameter and stops descending into a collapsed Node; `NodeOutline` re-roots the whole view at the zoom-root Node. Triggers are modality-independent: **click the chevron** (or a keymap) toggles collapse; **click the bullet** (or a keymap) zooms in; **Escape** / clicking the header bullet zooms out.

**Tech Stack:** React (local state + `useReducer` force-rerender, already present), `@dxos/echo` (`Obj`, `Relation`), CodeMirror `keymap` at `Prec.highest` (existing `gestures-extension.ts`), Storybook play tests + Vitest unit tests via `moon`.

## Global Constraints

- **Test runners — never raw vitest/playwright.** Use `moon run plugin-bramble:test` (unit), `moon run plugin-bramble:test-storybook` (interaction), `moon run plugin-bramble:lint`, `moon run plugin-bramble:build`. App typecheck: `moon run composer-app:build`.
- **View-state is LOCAL per-user, NOT substrate** (design §2 line 162): collapse and zoom write **no** `Node`/`Edge` — they only change React state. The read-only/edit substrate guarantees are unchanged.
- **Both modalities** (IX modality-independence, `R-Interaction-Laws` clause 4): every view op is reachable by pointer **and** keyboard.
- **Reuse the existing chevron** (from the PX visual work): it is `opacity:0` at rest, revealed on row hover, `font-size:15px`. Collapse state is shown by its glyph: `▸` collapsed, `▾` expanded. Only `row.hasChildren` rows render a glyph.
- **The bullet's click = zoom** here; a later slice (2e, drag) adds press-drag to the same bullet. Wire `onClick` only (not pointer-down/drag) so 2e can add drag without conflict.
- Rows are keyed by `row.edge.id` (established in the dup-key fix) — keep that; collapse/zoom must not reintroduce duplicate keys.

---

## File Structure

- `packages/plugins/plugin-bramble/src/model/outline.ts` — add `collapsed` param to `outlineRows`; add `collapsed: boolean` to `OutlineRow`; stop descending into a collapsed Node. (pure, unit-tested)
- `packages/plugins/plugin-bramble/src/model/outline.test.ts` — collapse cases.
- `packages/plugins/plugin-bramble/src/model/view-state.ts` — **new**: pure view-state helpers (`toggleCollapsed`, `resolveZoomRoot`) so the reducer logic is unit-testable without React.
- `packages/plugins/plugin-bramble/src/model/view-state.test.ts` — **new**: helper tests.
- `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.tsx` — hold `{collapsed, zoomRootId}` state; re-root at the zoom-root Node; pass `onToggleCollapse` / `onZoom` to rows and `zoomOut` to the header; hand the controller the view-state intents for keymaps.
- `packages/plugins/plugin-bramble/src/components/NodeOutline/OutlineRow.tsx` — chevron `onClick` → toggle collapse; chevron glyph reflects `row.collapsed`; bullet `onClick` → zoom.
- `packages/plugins/plugin-bramble/src/components/NodeOutline/controller.ts` — add `toggleCollapse(nodeId)`, `zoomTo(nodeId)`, `zoomOut()` intents (called by both pointer handlers and the keymap).
- `packages/plugins/plugin-bramble/src/components/NodeOutline/gestures-extension.ts` — keymap: collapse/expand + zoom-in + zoom-out.
- `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx` — `Collapse`, `Zoom` stories with `play` tests.

---

## Task 1: `outlineRows` respects collapse (view-model)

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/model/outline.ts`
- Test: `packages/plugins/plugin-bramble/src/model/outline.test.ts`

**Interfaces:**
- Produces: `OutlineRow` gains `collapsed: boolean`; `outlineRows(edges: Edge[], root: Node, collapsed?: ReadonlySet<string>): OutlineRow[]` — a Node whose id is in `collapsed` still emits its own row (with `collapsed: true`) but its successor subtree is omitted.

- [ ] **Step 1: Write the failing test** — append to `outline.test.ts` (reuse its existing edge-graph seeding helper; the file already builds `Root → { a → a1, b }`):

```ts
test('a collapsed node emits its row but omits its successors', () => {
  const { edges, root, a, a1 } = seedRootABTree(); // existing helper: Root→a→a1, Root→b
  const rows = outlineRows(edges, root, new Set([a.id]));
  const ids = rows.map((r) => r.node.id);
  expect(ids).toContain(a.id);
  expect(ids).not.toContain(a1.id); // a's subtree is hidden
  const aRow = rows.find((r) => r.node.id === a.id)!;
  expect(aRow.collapsed).toBe(true);
  expect(aRow.hasChildren).toBe(true); // still has children, just hidden
});

test('collapsed defaults to false and omits nothing when empty', () => {
  const { edges, root, a1 } = seedRootABTree();
  const rows = outlineRows(edges, root); // no collapsed arg
  expect(rows.map((r) => r.node.id)).toContain(a1.id);
  expect(rows.every((r) => r.collapsed === false)).toBe(true);
});
```

> If a shared `seedRootABTree()` helper does not yet exist in the test file, factor the existing inline seeding of the first test into one and reuse it (DRY) as part of this step.

- [ ] **Step 2: Run it — expect FAIL** (`collapsed` param/field don't exist yet):

Run: `moon run plugin-bramble:test -- outline`
Expected: FAIL (type error / `collapsed` undefined).

- [ ] **Step 3: Implement.** In `outline.ts`, add the field to the type and the param to the function, and gate the recursion:

```ts
export type OutlineRow = { node: Node; depth: number; edge: Edge; hasChildren: boolean; collapsed: boolean };

export const outlineRows = (edges: Edge[], root: Node, collapsed: ReadonlySet<string> = new Set()): OutlineRow[] => {
  const bySource = new Map<string, Edge[]>();
  for (const edge of edges) {
    const sourceId = Relation.getSource(edge).id;
    const list = bySource.get(sourceId) ?? (bySource.set(sourceId, []), bySource.get(sourceId)!);
    list.push(edge);
  }
  for (const list of bySource.values()) {
    list.sort((a, b) => a.order - b.order);
  }

  const rows: OutlineRow[] = [];
  const walk = (parentId: string, depth: number, ancestors: Set<string>) => {
    for (const edge of bySource.get(parentId) ?? []) {
      const node = Relation.getTarget(edge) as Node;
      if (ancestors.has(node.id)) {
        continue;
      }
      const hasChildren = (bySource.get(node.id) ?? []).length > 0;
      const isCollapsed = collapsed.has(node.id);
      rows.push({ node, depth, edge, hasChildren, collapsed: isCollapsed });
      if (!isCollapsed) {
        walk(node.id, depth + 1, new Set(ancestors).add(node.id));
      }
    }
  };
  walk(root.id, 0, new Set([root.id]));
  return rows;
};
```

- [ ] **Step 4: Run it — expect PASS.** Run: `moon run plugin-bramble:test -- outline`  →  all green (existing tests unaffected because `collapsed` defaults to empty and every row now carries `collapsed: false`).

- [ ] **Step 5: Commit.**

```bash
git add packages/plugins/plugin-bramble/src/model/outline.ts packages/plugins/plugin-bramble/src/model/outline.test.ts
git commit -m "feat(plugin-bramble): outlineRows skips a collapsed node's successors"
```

---

## Task 2: Pure view-state helpers

**Files:**
- Create: `packages/plugins/plugin-bramble/src/model/view-state.ts`
- Test: `packages/plugins/plugin-bramble/src/model/view-state.test.ts`

**Interfaces:**
- Produces:
  - `type ViewState = { collapsed: ReadonlySet<string>; zoomRootId: string | null }`
  - `EMPTY_VIEW_STATE: ViewState`
  - `toggleCollapsed(state: ViewState, nodeId: string): ViewState` — immutably flips membership of `nodeId` in `collapsed`.
  - `zoomTo(state: ViewState, nodeId: string): ViewState` — sets `zoomRootId`; a zoomed-in Node is never also collapsed, so it is removed from `collapsed`.
  - `zoomOut(state: ViewState): ViewState` — clears `zoomRootId` (`null`).
  - `resolveZoomRoot(rootId: string | null, subjectId: string): string` — `rootId ?? subjectId`.

- [ ] **Step 1: Write the failing test** — `view-state.test.ts`:

```ts
import { describe, expect, test } from 'vitest';
import { EMPTY_VIEW_STATE, resolveZoomRoot, toggleCollapsed, zoomOut, zoomTo } from './view-state';

test('toggleCollapsed flips membership immutably', () => {
  const s1 = toggleCollapsed(EMPTY_VIEW_STATE, 'n1');
  expect(s1.collapsed.has('n1')).toBe(true);
  expect(EMPTY_VIEW_STATE.collapsed.has('n1')).toBe(false); // original untouched
  const s2 = toggleCollapsed(s1, 'n1');
  expect(s2.collapsed.has('n1')).toBe(false);
});

test('zoomTo sets root and un-collapses the target; zoomOut clears', () => {
  const collapsed = toggleCollapsed(EMPTY_VIEW_STATE, 'n1');
  const zoomed = zoomTo(collapsed, 'n1');
  expect(zoomed.zoomRootId).toBe('n1');
  expect(zoomed.collapsed.has('n1')).toBe(false);
  expect(zoomOut(zoomed).zoomRootId).toBeNull();
});

test('resolveZoomRoot falls back to the subject', () => {
  expect(resolveZoomRoot(null, 'subj')).toBe('subj');
  expect(resolveZoomRoot('n1', 'subj')).toBe('n1');
});
```

- [ ] **Step 2: Run it — expect FAIL** (module missing). Run: `moon run plugin-bramble:test -- view-state` → FAIL "Cannot find module './view-state'".

- [ ] **Step 3: Implement `view-state.ts`:**

```ts
//
// Copyright 2026 DXOS.org
//

// Local, per-user outline view-state — NOT substrate (design §2). Collapse and zoom
// change only what the current viewer sees; they write no Node or Edge.
export type ViewState = { collapsed: ReadonlySet<string>; zoomRootId: string | null };

export const EMPTY_VIEW_STATE: ViewState = { collapsed: new Set(), zoomRootId: null };

export const toggleCollapsed = (state: ViewState, nodeId: string): ViewState => {
  const next = new Set(state.collapsed);
  next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId);
  return { ...state, collapsed: next };
};

// A zoomed-in Node is the view root, so it is shown expanded — drop it from `collapsed`.
export const zoomTo = (state: ViewState, nodeId: string): ViewState => {
  const next = new Set(state.collapsed);
  next.delete(nodeId);
  return { collapsed: next, zoomRootId: nodeId };
};

export const zoomOut = (state: ViewState): ViewState => ({ ...state, zoomRootId: null });

export const resolveZoomRoot = (rootId: string | null, subjectId: string): string => rootId ?? subjectId;
```

- [ ] **Step 4: Run it — expect PASS.** Run: `moon run plugin-bramble:test -- view-state` → green.

- [ ] **Step 5: Commit.**

```bash
git add packages/plugins/plugin-bramble/src/model/view-state.ts packages/plugins/plugin-bramble/src/model/view-state.test.ts
git commit -m "feat(plugin-bramble): pure view-state helpers (collapse/zoom, immutable)"
```

---

## Task 3: Collapse by pointer — chevron click + glyph reflects state

**Files:**
- Modify: `NodeOutline.tsx`, `OutlineRow.tsx`, `controller.ts`
- Test: `NodeOutline.stories.tsx` (new `Collapse` story)

**Interfaces:**
- Consumes: `outlineRows(edges, root, collapsed)` (Task 1), `ViewState`/`toggleCollapsed` (Task 2).
- Produces: `NodeOutline` holds `viewState` and passes `onToggleCollapse: (nodeId: string) => void` into each `OutlineRow`; `OutlineRow` renders `row.collapsed ? '▸' : '▾'` for `hasChildren` rows and calls `onToggleCollapse(row.node.id)` on chevron click; `OutlineController.toggleCollapse(nodeId)` mutates the shared view-state and force-rerenders.

- [ ] **Step 1: Read the three files first** (they changed in earlier slices — edge.id keys, PX chevron/bullet spans, the `OutlineController` ctx with `notifyMutated`). Do not assume line numbers.

- [ ] **Step 2: Write the failing test** — add to `NodeOutline.stories.tsx`:

```ts
export const Collapse: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const before = await canvas.findAllByTestId('bramble-row');
    await expect(before).toHaveLength(3); // a, a1, b
    // Hover 'a' to reveal its chevron, then click it to collapse.
    const aRow = before[0];
    await userEvent.hover(aRow);
    const chevron = within(aRow).getByTestId('bramble-chevron');
    await userEvent.click(chevron);
    await waitFor(async () => {
      const after = await canvas.findAllByTestId('bramble-row');
      await expect(after).toHaveLength(2); // a1 hidden; a and b remain
    });
    // Click again to expand.
    await userEvent.hover(aRow);
    await userEvent.click(within(await (async () => (await canvas.findAllByTestId('bramble-row'))[0])()).getByTestId('bramble-chevron'));
    await waitFor(async () => {
      await expect(await canvas.findAllByTestId('bramble-row')).toHaveLength(3);
    });
  },
};
```

- [ ] **Step 3: Run it — expect FAIL** (chevron is not clickable / collapse not wired). Run: `moon run plugin-bramble:test-storybook -- NodeOutline` → the `Collapse` play fails.

- [ ] **Step 4: Implement.**
  - `controller.ts`: hold a mutable `viewState` on the controller (seeded `EMPTY_VIEW_STATE`), expose `getViewState()`, and add:

    ```ts
    toggleCollapse(nodeId: string) {
      this.viewState = toggleCollapsed(this.viewState, nodeId);
      this.ctx.notifyMutated?.();
    }
    ```
    (The controller already has `notifyMutated` for forced re-renders — reuse it. Import the helpers from `../../model/view-state`.)
  - `NodeOutline.tsx`: read `controller.getViewState().collapsed` and pass it to `outlineRows(edges, subject, collapsed)` inside the existing `useMemo` (add it to the deps alongside `renderTick`). Pass `onToggleCollapse={(id) => controller.toggleCollapse(id)}` to each `OutlineRow`.
  - `OutlineRow.tsx`: give the chevron `role='button'`, `onClick={() => row.hasChildren && onToggleCollapse(row.node.id)}`, and render `{row.hasChildren ? (row.collapsed ? '▸' : '▾') : null}`. Keep the existing `bramble-chevron` testid and PX classes.

- [ ] **Step 5: Run it — expect PASS.** Run: `moon run plugin-bramble:test-storybook -- NodeOutline` → `Collapse` passes; all prior plays still green.

- [ ] **Step 6: Commit.**

```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/{NodeOutline.tsx,OutlineRow.tsx,controller.ts,NodeOutline.stories.tsx}
git commit -m "feat(plugin-bramble): collapse/expand a node by clicking its chevron"
```

---

## Task 4: Zoom by pointer — bullet click re-roots the outline

**Files:**
- Modify: `NodeOutline.tsx`, `OutlineRow.tsx`, `controller.ts`
- Test: `NodeOutline.stories.tsx` (new `Zoom` story)

**Interfaces:**
- Consumes: `zoomTo`/`resolveZoomRoot` (Task 2), `getViewState` (Task 3).
- Produces: `OutlineController.zoomTo(nodeId)` sets `zoomRootId` + rerenders; `NodeOutline` resolves the zoom-root **Node** (`resolveZoomRoot(zoomRootId, subject.id)`, then find that Node among `subject`/row nodes) and renders the header + `outlineRows` **rooted at it**; `OutlineRow` bullet `onClick` calls `onZoom(row.node.id)`.

- [ ] **Step 1: Write the failing test** — `NodeOutline.stories.tsx`:

```ts
export const Zoom: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Zoom into 'a' (which has child a1) by clicking its bullet.
    const aRow = (await canvas.findAllByTestId('bramble-row'))[0];
    await userEvent.click(within(aRow).getByTestId('bramble-bullet'));
    await waitFor(async () => {
      // Header now shows 'a'; the outline shows only a's subtree (a1), not b.
      await expect(await canvas.findByTestId('bramble-header')).toHaveTextContent('a');
      const rows = await canvas.findAllByTestId('bramble-row');
      await expect(rows).toHaveLength(1);
      await expect(rows[0]).toHaveTextContent('a1');
    });
  },
};
```

- [ ] **Step 2: Run it — expect FAIL** (bullet not clickable / no re-root). Run: `moon run plugin-bramble:test-storybook -- NodeOutline` → `Zoom` fails.

- [ ] **Step 3: Implement.**
  - `controller.ts`: `zoomTo(nodeId: string) { this.viewState = zoomTo(this.viewState, nodeId); this.ctx.notifyMutated?.(); }` (import `zoomTo as zoomToState` to avoid the name clash, or name the method `zoomIn`).
  - `NodeOutline.tsx`: compute `const zoomRootId = resolveZoomRoot(controller.getViewState().zoomRootId, subject.id);` then resolve the Node: if it equals `subject.id` use `subject`, else find it among the current rows' nodes (`rows.find(r => r.node.id === zoomRootId)?.node`) — fall back to `subject` if not found (stale id). Use that Node as **both** the header subject and the `outlineRows(edges, zoomRootNode, collapsed)` root. Pass `onZoom={(id) => controller.zoomTo(id)}` to rows.
  - `OutlineRow.tsx`: bullet gets `role='button'`, `onClick={() => onZoom(row.node.id)}`. (Click only — press-drag is slice 2e.)

- [ ] **Step 4: Run it — expect PASS.** Run: `moon run plugin-bramble:test-storybook -- NodeOutline` → `Zoom` passes; prior plays green.

- [ ] **Step 5: Commit.**

```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/{NodeOutline.tsx,OutlineRow.tsx,controller.ts,NodeOutline.stories.tsx}
git commit -m "feat(plugin-bramble): zoom into a node by clicking its bullet (re-roots the view)"
```

---

## Task 5: Zoom-out + keyboard triggers (modality-independence)

**Files:**
- Modify: `NodeOutline.tsx`, `controller.ts`, `gestures-extension.ts`
- Test: `NodeOutline.stories.tsx` (new `ZoomOutAndKeyboard` story)

**Interfaces:**
- Consumes: `zoomOut` (Task 2), `toggleCollapse`/`zoomTo` (Tasks 3–4).
- Produces: `OutlineController.zoomOut()`; keymap bindings (all at `Prec.highest`, in `gestures-extension.ts`, matching the existing pattern): **`Mod-.`** toggles collapse of the focused row's Node; **`Mod-]`** zooms into the focused row's Node; **`Escape`** zooms out; the header bullet `onClick` also zooms out when zoomed in.

- [ ] **Step 1: Write the failing test** — `NodeOutline.stories.tsx`:

```ts
export const ZoomOutAndKeyboard: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aRow = (await canvas.findAllByTestId('bramble-row'))[0];
    const aContent = aRow.querySelector<HTMLElement>('.cm-content')!;
    aContent.focus();
    // Keyboard zoom-in on the focused row (a), then Escape to zoom out.
    await userEvent.keyboard('{Meta>}]{/Meta}'); // Mod-] ; on non-mac the impl maps Mod→Ctrl (see ReorderRows)
    await waitFor(async () => {
      await expect(await canvas.findByTestId('bramble-header')).toHaveTextContent('a');
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(async () => {
      await expect(await canvas.findByTestId('bramble-header')).toHaveTextContent('Root');
      await expect(await canvas.findAllByTestId('bramble-row')).toHaveLength(3);
    });
    // Keyboard collapse on the focused row.
    (aRow.querySelector<HTMLElement>('.cm-content'))!.focus();
    await userEvent.keyboard('{Meta>}.{/Meta}');
    await waitFor(async () => {
      await expect(await canvas.findAllByTestId('bramble-row')).toHaveLength(2);
    });
  },
};
```

> Note: like `ReorderRows`, pick the modifier at runtime — CodeMirror's `Mod-` is Meta on macOS, Ctrl elsewhere. Use `const modKey = /Mac/.test(navigator.platform) ? 'Meta' : 'Control';` and template the keyboard string.

- [ ] **Step 2: Run it — expect FAIL** (no zoom-out / no keymaps). Run: `moon run plugin-bramble:test-storybook -- NodeOutline` → fails.

- [ ] **Step 3: Implement.**
  - `controller.ts`: `zoomOut() { this.viewState = zoomOut(this.viewState); this.ctx.notifyMutated?.(); }`.
  - `gestures-extension.ts`: in the `brambleGestures(controller, nodeId)` keymap (the existing `Prec.highest` keymap keyed per row), add:

    ```ts
    { key: 'Mod-.', run: () => { controller.toggleCollapse(nodeId); return true; } },
    { key: 'Mod-]', run: () => { controller.zoomTo(nodeId); return true; } },
    { key: 'Escape', run: () => { controller.zoomOut(); return true; } },
    ```
    (`nodeId` is already in scope — the existing keymap binds indent/outdent/reorder against it. Return `true` to consume the key.)
  - `NodeOutline.tsx`: when `zoomRootId` is non-null, the header bullet `onClick` calls `controller.zoomOut()`. The header uses a `RowEditor`; add a small bullet/back affordance beside it wired to `zoomOut` (or reuse the header's existing bullet slot if present). Keep it minimal — one clickable element with `data-testid='bramble-zoom-out'`.

- [ ] **Step 4: Run it — expect PASS.** Run: `moon run plugin-bramble:test-storybook -- NodeOutline` → `ZoomOutAndKeyboard` passes.

- [ ] **Step 5: Full verify + commit.**

Run all: `moon run plugin-bramble:build plugin-bramble:test plugin-bramble:test-storybook plugin-bramble:lint` and `moon run composer-app:build` — all green.

```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/{NodeOutline.tsx,controller.ts,gestures-extension.ts,NodeOutline.stories.tsx}
git commit -m "feat(plugin-bramble): zoom-out + keyboard collapse/zoom (modality-independent view-state)"
```

---

## Self-review notes (for the executor)

- **Spec coverage:** design §2 line 162 (collapse/expand + zoom, local per-user, pointer **and** key) → Tasks 1–5 cover all of it. Drag (line 163) is deliberately **out of scope** here — it is slice 2e.
- **Not substrate:** confirm no Task writes a `Node`/`Edge` for collapse/zoom (grep the diff for `db.add`/`Obj.update`/`createEdge`/`removeEdge` in the view-state paths — there should be none).
- **Keys stay unique:** collapse changes which rows render but not their `edge.id` keys; zoom changes the root but rows remain `edge.id`-keyed — no dup-key risk.
- **Focus on zoom:** zooming re-renders a different row set; if the focused row leaves the view (e.g., zoom into a sibling), focus is lost — acceptable for this slice (Tana behaves similarly). Do **not** add focus-restoration complexity here.
