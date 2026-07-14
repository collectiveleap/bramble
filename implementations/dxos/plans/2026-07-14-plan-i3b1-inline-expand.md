<!-- derives-from: [UP-5, UP-4, IX-direct, IP-3]; role: target; status: draft -->

# I3b-1 — Inline-expand secondary view Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox
> (`- [ ]`) syntax. Tightly coupled (view-state → controller → components → css → stories) — execute
> inline in one session.

**Goal:** Option-clicking a mention chip **expands the target's outline inline** — a live, bounded,
edit-through view of the target Node and its subtree, rendered below the mention's row and above that
row's own children. Clicking again collapses it. Expansion is per-occurrence, on-demand, and
cycle-safe (a target already on the expansion path shows a stub, never recurses).

**Architecture:** Expansion is **local per-user view-state** (like collapse/zoom), keyed by the linked
`Edge` id (each mention occurrence is one linked edge). A CodeMirror `mousedown` handler on the chip
(`Option`/`altKey`) toggles it via the controller. `OutlineRow` renders the target's secondary view by
**direct-mounting `<NodeOutline subject={target}/>`** (a confirmed, deliberate deviation from the
`<Surface type={Section}>` anchor — behaviorally identical since bramble's Section surface for a `Node`
*is* `NodeOutline`, but direct-mount is testable under `withClientProvider` and simplest for
Node-only targets; swap to `<Surface>` in one line if a cross-type target ever arrives). Cycle-safety
uses a React context carrying the set of secondary-view subject ids on the current nesting path.

**Tech Stack:** React (context), CodeMirror 6 (`EditorView.domEventHandlers`), ECHO
(`useQuery`, `Relation.getTarget`), Storybook play tests.

## Global Constraints

- **Spec:** `UP-5` (secondary view — one live, on-demand, bounded, edit-through renderer; INLINE
  placement), `UP-4.embed`, `IX-direct.expand` (per-occurrence toggle), `IP-3.expand`/`may-cycle`
  (on-demand, cycle-safe). Design: `design.md §3` "Embed = the target's secondary view", `design-references.md`.
- **Corrected-model constraint (do NOT re-drift):** the chip is a custom decoration over the
  `{{ref:<edgeId>}}` marker; no `xmlTags`, no markdown link.
- **Confirmed deviation:** inline-expand direct-mounts `<NodeOutline subject={target}/>`, NOT
  `<Surface type={Section}>` (Steve-approved 2026-07-14: testability + Node-only targets). Open-beside
  is a separate plan (I3b-2), not in scope here.
- **Runners are `moon`**, never raw vitest: `moon run plugin-bramble:{test,test-storybook -- <Story>,build,lint}`
  from `/Users/san/sandbox/dxos/.claude/worktrees/plugin-bramble-substrate`.
- **Branch** `claude/plugin-bramble-substrate`; NEVER merge to main; NEVER stage `.changeset/config.json`
  or `.claude/launch.json`.
- **Story seeding gotcha:** set `Text` content via `Obj.update(t, (t) => { t.content = … })`.

---

### Task 1: Expansion view-state + controller toggle

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/model/view-state.ts`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/controller.ts`
- Test: `packages/plugins/plugin-bramble/src/model/view-state.test.ts`

**Interfaces:**
- Produces: `ViewState.expandedMentions: ReadonlySet<string>` (linked-edge ids);
  `toggleExpandedMention(state, edgeId): ViewState`; `OutlineController.toggleMention(edgeId): void`
  (mutates view-state + `notifyMutated`); `getViewState().expandedMentions`.

- [ ] **Step 1: Write the failing test** in `view-state.test.ts`.

```ts
test('toggleExpandedMention adds then removes an edge id', ({ expect }) => {
  const s0 = EMPTY_VIEW_STATE;
  expect([...s0.expandedMentions]).toEqual([]);
  const s1 = toggleExpandedMention(s0, 'edge-1');
  expect([...s1.expandedMentions]).toEqual(['edge-1']);
  const s2 = toggleExpandedMention(s1, 'edge-1');
  expect([...s2.expandedMentions]).toEqual([]);
  // independent of collapse/zoom
  expect(s1.collapsed).toBe(s0.collapsed);
  expect(s1.zoomRootId).toBe(s0.zoomRootId);
});
```

Add `toggleExpandedMention` to the existing import from `../../model/view-state` (or `./view-state` per that test file's existing import path — match it).

- [ ] **Step 2: Run it, expect FAIL** (`toggleExpandedMention` undefined, `expandedMentions` undefined).

Run: `moon run plugin-bramble:test -- view-state`

- [ ] **Step 3: Extend `view-state.ts`.**

Change the type + empty value:
```ts
export type ViewState = { collapsed: ReadonlySet<string>; zoomRootId: string | null; expandedMentions: ReadonlySet<string> };

export const EMPTY_VIEW_STATE: ViewState = { collapsed: new Set(), zoomRootId: null, expandedMentions: new Set() };
```
The existing `toggleCollapsed`, `zoomTo`, `zoomOut` use `{ ...state, … }`, so they carry `expandedMentions` through unchanged — verify each still spreads `state`. Add:
```ts
export const toggleExpandedMention = (state: ViewState, edgeId: string): ViewState => {
  const next = new Set(state.expandedMentions);
  next.has(edgeId) ? next.delete(edgeId) : next.add(edgeId);
  return { ...state, expandedMentions: next };
};
```

- [ ] **Step 4: Add `toggleMention` to the controller.** In `controller.ts`, import `toggleExpandedMention` alongside `toggleCollapsed`, and add (mirrors `toggleCollapse`):
```ts
  toggleMention(edgeId: string) {
    this.viewState = toggleExpandedMention(this.viewState, edgeId);
    this.ctx.notifyMutated?.();
  }
```

- [ ] **Step 5: Run the test, expect PASS.** `moon run plugin-bramble:test -- view-state`

- [ ] **Step 6: Commit.**
```bash
git add packages/plugins/plugin-bramble/src/model/view-state.ts \
        packages/plugins/plugin-bramble/src/model/view-state.test.ts \
        packages/plugins/plugin-bramble/src/components/NodeOutline/controller.ts
git commit -m "feat(plugin-bramble): per-occurrence mention-expansion view-state (I3b-1 T1)

expandedMentions (linked-edge ids) joins collapse/zoom as local view-state; toggleExpandedMention +
controller.toggleMention drive it."
```

---

### Task 2: Chip Option-click toggles expansion

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/mention-extension.ts`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx`

**Interfaces:**
- Consumes (Task 1): `controller.toggleMention(edgeId)`.
- Produces: `mentionClicks({ onExpand }): Extension` — a `EditorView.domEventHandlers` that, on
  `mousedown` of a `dx-anchor[data-edge-id]` with `altKey`, calls `onExpand(edgeId)` and consumes the
  event. (Shift/open-beside is I3b-2; not added here.)

- [ ] **Step 1: Add `mentionClicks` to `mention-extension.ts`.**

```ts
/**
 * Option/`altKey`-click on a chip toggles the target's inline secondary view. `mousedown` (not
 * `click`) so the chip's atomic selection doesn't swallow it; consumes the event so the editor
 * doesn't also move the cursor. (Shift-click → open-beside is a separate slice.)
 */
export const mentionClicks = ({ onExpand }: { onExpand: (edgeId: string) => void }): Extension =>
  EditorView.domEventHandlers({
    mousedown: (event) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('dx-anchor[data-edge-id]') as
        | HTMLElement
        | undefined;
      const edgeId = anchor?.dataset.edgeId;
      if (edgeId && event.altKey) {
        onExpand(edgeId);
        event.preventDefault();
        return true;
      }
      return false;
    },
  });
```
`EditorView` and `Extension` are already imported in this file (`@codemirror/view`, `@codemirror/state`).

- [ ] **Step 2: Wire it in `RowEditor.tsx`.** Add `mentionClicks` to the `./mention-extension` import.
Inside the `text ? [ … ]` extensions branch, after `mentionChips({ resolveLabel })`, add:
```ts
              mentionClicks({ onExpand: (edgeId) => controller?.toggleMention(edgeId) }),
```
`controller` is already in scope (`const controller = useOutlineController();`). It's in the always-on
`text` branch (not gated on `canMention`) so expansion works on read-only rows too. No new dep needed
(the closure reads `controller`, already a dep of the `useTextEditor` memo).

- [ ] **Step 3: Build + lint** (no unit test here — behavior is covered by Task 3's story).

Run: `moon run plugin-bramble:build` — expect clean.
Run: `moon run plugin-bramble:lint` — expect clean.

- [ ] **Step 4: Commit.**
```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/mention-extension.ts \
        packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx
git commit -m "feat(plugin-bramble): Option-click a mention chip toggles inline expansion (I3b-1 T2)

mentionClicks: a mousedown handler that, on altKey-click of a dx-anchor[data-edge-id], calls
controller.toggleMention(edgeId). Rendering lands in T3."
```

---

### Task 3: Render the secondary view in the row, cycle-safe

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/ExpansionPath.ts`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.tsx`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/OutlineRow.tsx`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/node-outline.css`
- Test: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx`

**Interfaces:**
- Consumes: `controller.getViewState().expandedMentions` (T1), `useOutlineController` (context),
  `Relation.getTarget`, `useQuery`.
- Produces: `ExpansionPathContext` (a `React.Context<ReadonlySet<string>>`); the rendered secondary
  view (`data-testid='bramble-secondary'`) or a cycle stub (`data-testid='bramble-secondary-cycle'`).

- [ ] **Step 1: Write the failing stories** in `NodeOutline.stories.tsx`.

Fixture — Root → Y (Y mentions X; X has a child X1). Also a cycle fixture — Root → A (A mentions Root).
```tsx
const MentionExpandStory = () => {
  const [space] = useSpaces();
  const root = useMemo(() => {
    if (!space) {
      return undefined;
    }
    const db = space.db;
    const r = db.add(makeNode({ text: 'Root' }));
    const x = db.add(makeNode({ text: 'target X' }));
    const x1 = db.add(makeNode({ text: 'child of X' }));
    const y = db.add(makeNode({ text: 'begin  end' }));
    void createEdge(db, r, y, 1); // Y is the only row under root
    void createEdge(db, x, x1, 1); // X has a structural child
    const linked = createLinkedEdge(db, y, x); // Y mentions X
    const yText = y.text?.target;
    if (yText) {
      Obj.update(yText, (yText) => {
        yText.content = `begin ${makeMarker(linked.id)} end`;
      });
    }
    return r;
  }, [space]);
  return root ? (
    <div role='none' className='grow overflow-auto' style={{ backgroundColor: 'var(--surface-bg)' }}>
      <NodeOutline subject={root} />
    </div>
  ) : null;
};

const altMouseDown = (el: Element) => el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, altKey: true }));

export const MentionExpand: Story = {
  render: () => <MentionExpandStory />,
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = await waitFor(() => {
      const el = canvasElement.querySelector('dx-anchor[data-edge-id]');
      if (!el || el.textContent !== 'target X') {
        throw new Error('chip not resolved');
      }
      return el as HTMLElement;
    });
    // No secondary view before expansion.
    await expect(canvasElement.querySelector('[data-testid="bramble-secondary"]')).toBeNull();
    // Option-click expands: the target's outline (X and its child X1) renders inline.
    altMouseDown(chip);
    const secondary = await canvas.findByTestId('bramble-secondary');
    await expect(secondary).toHaveTextContent('target X');
    await expect(secondary).toHaveTextContent('child of X');
    // Option-click again collapses.
    altMouseDown(canvasElement.querySelector('dx-anchor[data-edge-id]')!);
    await waitFor(() => {
      if (canvasElement.querySelector('[data-testid="bramble-secondary"]')) {
        throw new Error('secondary view still present');
      }
    });
  },
};

const MentionCycleStory = () => {
  const [space] = useSpaces();
  const root = useMemo(() => {
    if (!space) {
      return undefined;
    }
    const db = space.db;
    const r = db.add(makeNode({ text: 'Root' }));
    const a = db.add(makeNode({ text: 'begin  end' }));
    void createEdge(db, r, a, 1);
    const linked = createLinkedEdge(db, a, r); // A mentions ROOT — expanding it would recurse into an ancestor
    const aText = a.text?.target;
    if (aText) {
      Obj.update(aText, (aText) => {
        aText.content = `begin ${makeMarker(linked.id)} end`;
      });
    }
    return r;
  }, [space]);
  return root ? (
    <div role='none' className='grow overflow-auto' style={{ backgroundColor: 'var(--surface-bg)' }}>
      <NodeOutline subject={root} />
    </div>
  ) : null;
};

export const MentionExpandCycle: Story = {
  render: () => <MentionCycleStory />,
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = await waitFor(() => {
      const el = canvasElement.querySelector('dx-anchor[data-edge-id]');
      if (!el || el.textContent !== 'Root') {
        throw new Error('chip not resolved');
      }
      return el as HTMLElement;
    });
    // Expanding a mention of an ancestor-subject (Root) shows a cycle stub, not a nested outline.
    altMouseDown(chip);
    await canvas.findByTestId('bramble-secondary-cycle');
    await expect(canvasElement.querySelector('[data-testid="bramble-secondary"]')).toBeNull();
  },
};
```

- [ ] **Step 2: Run, expect FAIL** (no `bramble-secondary` renders — expansion isn't wired to UI).

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`

- [ ] **Step 3: Create `ExpansionPath.ts`.**
```ts
//
// Copyright 2026 DXOS.org
//

import { createContext, useContext } from 'react';

/** The set of secondary-view SUBJECT ids on the current inline-expansion nesting path. A mention
 *  whose target is already in this set must not expand again (cycle guard). Seeded per NodeOutline. */
export const ExpansionPathContext = createContext<ReadonlySet<string>>(new Set());
export const useExpansionPath = (): ReadonlySet<string> => useContext(ExpansionPathContext);
```

- [ ] **Step 4: Seed the path in `NodeOutline.tsx`.** Import `ExpansionPathContext`, `useExpansionPath`.
Just inside the component, add the subject to the inherited path:
```tsx
  const parentPath = useExpansionPath();
  const expansionPath = useMemo(() => new Set([...parentPath, subject.id]), [parentPath, subject.id]);
```
Wrap the returned tree's provider around the existing `OutlineControllerContext.Provider` (outermost or
just inside it — either works):
```tsx
  return (
    <ExpansionPathContext.Provider value={expansionPath}>
      <OutlineControllerContext.Provider value={controllerRef.current ?? null}>
        …existing…
      </OutlineControllerContext.Provider>
    </ExpansionPathContext.Provider>
  );
```

- [ ] **Step 5: Render the secondary view in `OutlineRow.tsx`.** Add imports:
```tsx
import { Filter, Query, Relation } from '@dxos/echo';
import { useQuery } from '@dxos/react-client/echo';
import { useOutlineController } from './controller';
import { useExpansionPath } from './ExpansionPath';
import { NodeOutline } from './NodeOutline';
import { Edge, type Node } from '../../types';
```
Inside the component, compute the expanded targets for this row's node:
```tsx
  const controller = useOutlineController();
  const expansionPath = useExpansionPath();
  const linkedEdges = (useQuery(controller?.db, Query.select(Filter.id(row.node.id)).sourceOf(Edge)) as Edge[])
    .filter((e) => e.kind === 'linked');
  const expanded = controller?.getViewState().expandedMentions ?? new Set<string>();
  const expandedTargets = linkedEdges
    .filter((e) => expanded.has(e.id))
    .map((e) => ({ edgeId: e.id, target: Relation.getTarget(e) as Node }));
```
Render them after `<RowEditor .../>` (line ~62), before the drop indicator:
```tsx
      {expandedTargets.map(({ edgeId, target }) =>
        expansionPath.has(target.id) ? (
          <div key={edgeId} data-testid='bramble-secondary-cycle' className='bramble-secondary bramble-secondary-cycle'>
            ↩ already expanded above
          </div>
        ) : (
          <div key={edgeId} data-testid='bramble-secondary' className='bramble-secondary'>
            <NodeOutline subject={target} />
          </div>
        ),
      )}
```
Note: `NodeOutline` ↔ `OutlineRow` is now a mutual import (a cycle). This resolves fine at runtime for
React components (both are function refs used at render, not at module-eval). If the bundler/lint
complains, break it by importing `NodeOutline` lazily where used or via the `../components` barrel; try
the direct import first.

- [ ] **Step 6: Style the panel** in `node-outline.css` — bounded height, scroll, indented, ruled.
```css
.bramble-secondary {
  margin-inline-start: var(--dx-spacingLarge, 24px);
  margin-block: 4px;
  max-block-size: 40vh;
  overflow: auto;
  border-inline-start: 2px solid var(--dx-subduedSeparator, #d0d0d0);
  padding-inline-start: 8px;
}
.bramble-secondary-cycle {
  color: var(--dx-subduedText, #888);
  font-style: italic;
  overflow: visible;
  max-block-size: none;
}
```

- [ ] **Step 7: Run the stories, expect PASS.** Both `MentionExpand` and `MentionExpandCycle`, and all
existing NodeOutline stories still green.

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`

- [ ] **Step 8: Full gate.** `moon run plugin-bramble:build`, `:lint`, `:test` — all clean/green.

- [ ] **Step 9: Commit.**
```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/ExpansionPath.ts \
        packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.tsx \
        packages/plugins/plugin-bramble/src/components/NodeOutline/OutlineRow.tsx \
        packages/plugins/plugin-bramble/src/components/NodeOutline/node-outline.css \
        packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx
git commit -m "feat(plugin-bramble): inline-expand a mention into the target's secondary view (I3b-1 T3)

OutlineRow renders <NodeOutline subject={target}/> below a row for each expanded mention (bounded,
edit-through, live). ExpansionPathContext carries the nesting subjects so a mention of an ancestor
renders a cycle stub instead of recursing (IP-3.may-cycle, on-demand). Realizes UP-5 inline placement."
```

---

## Self-Review

- **Spec coverage:** `UP-5` inline placement (bounded, live, edit-through secondary view) — the target
  is rendered by the same `NodeOutline` renderer, editable, reactive. `IX-direct.expand` per-occurrence
  toggle — keyed by linked-edge id, Option-click. `IP-3.may-cycle` cycle-safety — `MentionExpandCycle`
  asserts a stub, not recursion. ✓
- **Placeholder scan:** none; all steps carry code.
- **Type consistency:** `expandedMentions`/`toggleExpandedMention`/`toggleMention` consistent across
  view-state, controller, OutlineRow; `mentionClicks({ onExpand })` matches its call site.
- **Deviation logged:** direct-mount `<NodeOutline>` vs `<Surface>` — recorded in Global Constraints
  (Steve-approved) and to be added to the ledger decisions-log on completion.
- **Post-plan:** update `references-issue-ledger.md` (I3b split; I3b-1 done) + `FLOW.md` S6. Then I3b-2
  (open-beside via `LayoutOperation.Open`). Consider a whole-branch review once I3b-1 + I3b-2 both land.
