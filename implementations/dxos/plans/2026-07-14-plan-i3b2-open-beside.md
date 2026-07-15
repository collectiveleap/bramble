<!-- derives-from: [UP-5]; role: target; status: draft -->

# I3b-2 — Open-beside secondary view Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox
> (`- [ ]`) syntax. Execute inline.

**Goal:** `Shift`-clicking a mention chip opens the target Node **alongside** the current view (a new
deck plank), without replacing it — `UP-5.open-beside`.

**Architecture:** Two layers with a clean seam so the in-plugin logic stays storybook-testable while
the framework call stays out of the test harness:
- **In-plugin (testable):** `Shift`-click → resolve the chip's linked `Edge` → its target `Node` →
  call an `onOpenBeside(target)` handler taken from a React context (`OpenBesideContext`, default a
  no-op). Extends the existing `mentionClicks` extension (which already handles `Option`-click for
  inline-expand) with a `shiftKey` branch.
- **Framework boundary (adapter):** the plugin's Surface component (`react-surface.tsx`) is the only
  place with app-framework context, so it provides `OpenBesideContext` with a handler that dispatches
  `LayoutOperation.Open`. Bramble's own storybook mounts `NodeOutline` directly (no Surface, no
  provider) → the handler defaults to a no-op there, and the Task-1 story injects a spy handler to
  assert the wiring.

**Tech Stack:** React context, CodeMirror `domEventHandlers` (already added in I3b-1), ECHO
(`Relation.getTarget`), `@dxos/app-framework/ui` (`useOperationInvoker`), `@dxos/app-toolkit`
(`LayoutOperation`, `Paths`).

## Global Constraints

- **Spec:** `UP-5.open-beside` — "T's secondary view opens alongside the current one; the current view
  is not replaced; it shows T live." Design: `design.md §3` ("beside — open the target alongside…";
  Tana `Shift`-click), `design-references.md`.
- **Verified APIs (Explore 2026-07-14, exemplar `packages/sdk/app-toolkit/src/ui/hooks/useShowItem.ts:52-59`):**
  - `const { invokePromise } = useOperationInvoker();` — from `@dxos/app-framework/ui`.
  - `LayoutOperation.Open` — from `@dxos/app-toolkit`; payload
    `{ subject: string[]; pivotId?: string; navigation?: 'immediate' | 'validate'; positioning?: 'start' | 'end' }`.
  - `Paths.getObjectPathFromObject(obj): string` — from `@dxos/app-toolkit`; needs the object's db +
    type URI (a Bramble `Node` has both).
- **Adjacency (`pivotId`) is deferred:** v1 dispatches `Open` with `navigation: 'immediate'` and no
  `pivotId` — the target opens as a new plank in the deck (alongside, current not replaced), satisfying
  the req. Exact "immediately next to this pane" needs the current context id threaded to the surface;
  note it as a follow-up, do not block on it.
- **Corrected-model constraint (do NOT re-drift):** chip is a custom decoration over `{{ref:<edgeId>}}`;
  no `xmlTags`, no markdown link.
- **Runners are `moon`**, never raw vitest, from `/Users/san/sandbox/dxos/.claude/worktrees/plugin-bramble-substrate`.
- **Branch** `claude/plugin-bramble-substrate`; NEVER merge to main; NEVER stage `.changeset/config.json`
  or `.claude/launch.json`.
- **Story seeding gotcha:** set `Text` content via `Obj.update(t, (t) => { t.content = … })`.

---

### Task 1: Shift-click → onOpenBeside(target) (in-plugin, storybook-tested)

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/OpenBeside.ts`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/mention-extension.ts`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx`
- Test: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx`

**Interfaces:**
- Consumes (I3b-1): `mentionClicks({ onExpand })`, `controller.toggleMention`.
- Produces: `OpenBesideContext` (`React.Context<((target: Node) => void) | null>`, default `null`);
  `useOpenBeside()`; `mentionClicks({ onExpand, onOpenBeside? })` — the `shiftKey` branch calls
  `onOpenBeside(edgeId)`.

- [ ] **Step 1: Write the failing story** in `NodeOutline.stories.tsx`. Add `useState` to the React
import (`import React, { useMemo, useRef, useState } from 'react';`).

```tsx
const shiftMouseDown = (el: Element) => el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, shiftKey: true }));

// Root → Y (Y mentions X). Shift-clicking Y's chip calls the OpenBeside handler with X — the in-plugin
// half of open-beside (UP-5). The handler is a spy that records the opened Node's title.
const OpenBesideStory = () => {
  const [space] = useSpaces();
  const [opened, setOpened] = useState<string>('');
  const root = useMemo(() => {
    if (!space) {
      return undefined;
    }
    const db = space.db;
    const r = db.add(makeNode({ text: 'Root' }));
    const x = db.add(makeNode({ text: 'target X' }));
    const y = db.add(makeNode({ text: 'begin  end' }));
    void createEdge(db, r, y, 1);
    const linked = createLinkedEdge(db, y, x);
    const yText = y.text?.target;
    if (yText) {
      Obj.update(yText, (yText) => {
        yText.content = `begin ${makeMarker(linked.id)} end`;
      });
    }
    return r;
  }, [space]);
  return root ? (
    <OpenBesideContext.Provider value={(target) => setOpened(target.text?.target?.content ?? '')}>
      <div role='none' className='grow overflow-auto' style={{ backgroundColor: 'var(--surface-bg)' }}>
        <div data-testid='opened-beside'>{opened}</div>
        <NodeOutline subject={root} />
      </div>
    </OpenBesideContext.Provider>
  ) : null;
};

export const OpenBeside: Story = {
  render: () => <OpenBesideStory />,
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
    await expect(canvas.getByTestId('opened-beside')).toHaveTextContent('');
    shiftMouseDown(chip);
    await waitFor(() => {
      if (canvas.getByTestId('opened-beside').textContent !== 'target X') {
        throw new Error('open-beside handler not called with the target');
      }
    });
    await expect(canvas.getByTestId('opened-beside')).toHaveTextContent('target X');
  },
};
```
Add `OpenBesideContext` to the story file's imports from `./OpenBeside`.

- [ ] **Step 2: Run, expect FAIL** (`OpenBesideContext` doesn't exist / handler never called).

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`

- [ ] **Step 3: Create `OpenBeside.ts`.**
```ts
//
// Copyright 2026 DXOS.org
//

import { createContext, useContext } from 'react';

import { type Node } from '../../types';

/** Opens a Node's secondary view alongside the current one (UP-5.open-beside). Supplied by the
 *  plugin's Surface (app-framework context); `null` outside it (e.g. storybook) → open-beside is a no-op. */
export const OpenBesideContext = createContext<((target: Node) => void) | null>(null);
export const useOpenBeside = (): ((target: Node) => void) | null => useContext(OpenBesideContext);
```

- [ ] **Step 4: Extend `mentionClicks` in `mention-extension.ts`** with a `shiftKey` branch.
```ts
export const mentionClicks = ({
  onExpand,
  onOpenBeside,
}: {
  onExpand: (edgeId: string) => void;
  onOpenBeside?: (edgeId: string) => void;
}): Extension =>
  EditorView.domEventHandlers({
    mousedown: (event) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('dx-anchor[data-edge-id]') as
        | HTMLElement
        | undefined;
      const edgeId = anchor?.dataset.edgeId;
      if (!edgeId) {
        return false;
      }
      if (event.altKey) {
        onExpand(edgeId);
        event.preventDefault();
        return true;
      }
      if (event.shiftKey && onOpenBeside) {
        onOpenBeside(edgeId);
        event.preventDefault();
        return true;
      }
      return false;
    },
  });
```

- [ ] **Step 5: Wire it in `RowEditor.tsx`.** Add `useOpenBeside` import (`import { useOpenBeside } from './OpenBeside';`).
Just after the existing `linkedEdgesRef` (added in I3a Task 4 — reuse it to resolve the target), add:
```tsx
  const openBeside = useOpenBeside();
  const openBesideRef = useRef(openBeside);
  openBesideRef.current = openBeside;
```
Extend the `mentionClicks(...)` call (from I3b-1) to add `onOpenBeside`:
```tsx
              mentionClicks({
                onExpand: (edgeId) => controller?.toggleMention(edgeId),
                onOpenBeside: (edgeId) => {
                  const edge = linkedEdgesRef.current.find((e) => e.id === edgeId);
                  if (edge) {
                    openBesideRef.current?.(Relation.getTarget(edge) as Node);
                  }
                },
              }),
```
`Relation` and the `Node` type are already imported in `RowEditor.tsx`; `linkedEdgesRef` already exists.
The closure reads refs only, so no new dependency on the `useTextEditor` memo is required.

- [ ] **Step 6: Run the story, expect PASS.** `moon run plugin-bramble:test-storybook -- NodeOutline` —
`OpenBeside` green; all other NodeOutline stories still green (Option-click expand unaffected).

- [ ] **Step 7: Build + lint.** `moon run plugin-bramble:build`, `moon run plugin-bramble:lint` — clean.

- [ ] **Step 8: Commit.**
```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/OpenBeside.ts \
        packages/plugins/plugin-bramble/src/components/NodeOutline/mention-extension.ts \
        packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx \
        packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx
git commit -m "feat(plugin-bramble): Shift-click a mention chip opens the target beside (I3b-1... I3b-2 T1)

Shift-click resolves the chip's linked edge to its target Node and calls an OpenBesideContext handler
(null/no-op outside the plugin's Surface). The framework dispatch is wired in T2. UP-5.open-beside."
```

---

### Task 2: Framework adapter — dispatch `LayoutOperation.Open` from the Surface

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/capabilities/react-surface.tsx`

**Interfaces:**
- Consumes: `OpenBesideContext` (Task 1), `useOperationInvoker` (`@dxos/app-framework/ui`),
  `LayoutOperation` + `Paths` (`@dxos/app-toolkit`).
- Produces: the Surface component now provides a real `onOpenBeside` handler to `NodeOutline`.

> **Test note:** this layer is NOT storybook-gated — the app-framework `OperationInvoker` capability is
> absent in the plugin's `withClientProvider` harness, and the component only renders via the Surface
> (production). The gate is **build + lint** (the verified `LayoutOperation.Open` / `Paths` signatures
> must typecheck) plus the Task-1 story proving the in-plugin wiring. State this in the commit.

- [ ] **Step 1: Rewrite `react-surface.tsx`** to wrap `NodeOutline` in a component that supplies the handler.
```tsx
//
// Copyright 2026 DXOS.org
//

import * as Effect from 'effect/Effect';
import React, { useCallback } from 'react';

import { Capabilities, Capability } from '@dxos/app-framework';
import { Surface, useOperationInvoker } from '@dxos/app-framework/ui';
import { LayoutOperation, Paths } from '@dxos/app-toolkit';
import { AppSurface } from '@dxos/app-toolkit/ui';

import { NodeOutline } from '../components';
import { OpenBesideContext } from '../components/NodeOutline/OpenBeside';
import { Node } from '../types';

// Bramble's Surface is the only place with app-framework context, so it supplies the open-beside
// handler: dispatch LayoutOperation.Open with the target's navigation path — a new plank alongside the
// current view (UP-5.open-beside). `pivotId` (exact adjacency) is a follow-up.
const BrambleOutlineSurface = ({ role, subject }: { role?: string; subject: Node }) => {
  const { invokePromise } = useOperationInvoker();
  const openBeside = useCallback(
    (target: Node) => {
      void invokePromise(LayoutOperation.Open, {
        subject: [Paths.getObjectPathFromObject(target)],
        navigation: 'immediate',
      });
    },
    [invokePromise],
  );
  return (
    <OpenBesideContext.Provider value={openBeside}>
      <NodeOutline role={role} subject={subject} />
    </OpenBesideContext.Provider>
  );
};

export default Capability.makeModule(() =>
  Effect.succeed(
    Capability.contributes(Capabilities.ReactSurface, [
      Surface.create({
        id: 'article.brambleOutline',
        filter: AppSurface.oneOf(
          AppSurface.object(AppSurface.Article, Node),
          AppSurface.object(AppSurface.Section, Node),
        ),
        component: ({ role, data }) => <BrambleOutlineSurface role={role} subject={data.subject} />,
      }),
    ]),
  ),
);
```

- [ ] **Step 2: Build + lint** — expect clean (this typechecks the `LayoutOperation.Open` payload and
`Paths.getObjectPathFromObject` against their real signatures).

Run: `moon run plugin-bramble:build`
Run: `moon run plugin-bramble:lint`

- [ ] **Step 3: Full test sweep unaffected.** `moon run plugin-bramble:test` (66), `:test-storybook -- NodeOutline`.

- [ ] **Step 4: Commit.**
```bash
git add packages/plugins/plugin-bramble/src/capabilities/react-surface.tsx
git commit -m "feat(plugin-bramble): dispatch LayoutOperation.Open for open-beside (I3b-2 T2)

The Surface supplies the OpenBesideContext handler: invokePromise(LayoutOperation.Open, { subject:
[Paths.getObjectPathFromObject(target)], navigation: 'immediate' }) — a new plank alongside the current
view. Framework-boundary code (no OperationInvoker in the storybook harness); gated by build/lint + the
T1 in-plugin story. pivotId adjacency is a follow-up. UP-5.open-beside."
```

---

## Self-Review

- **Spec coverage:** `UP-5.open-beside` — Task 1 proves Shift-click resolves and calls the handler with
  the target; Task 2 dispatches `LayoutOperation.Open` (alongside, current not replaced). Liveness is
  inherited (the opened plank renders the same `Node` via the same reactive `NodeOutline`). ✓
- **Placeholder scan:** none.
- **Type consistency:** `mentionClicks({ onExpand, onOpenBeside? })` matches its RowEditor call site;
  `OpenBesideContext`/`useOpenBeside` typed `((target: Node) => void) | null`; adapter payload matches
  the verified `LayoutOperation.Open` schema.
- **Deviation/limit logged:** `pivotId` adjacency deferred; Task 2 not storybook-gated (stated in commit).
- **Post-plan:** update `references-issue-ledger.md` (I3b-2 done → I3b complete) + `FLOW.md` S6; then run
  the deferred whole-branch review over I3b-1 + I3b-2 (both UP-5 placements). Then I4 (backlinks).
