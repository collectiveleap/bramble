<!-- derives-from: [UP-2, IP-2, IP-3]; role: target; status: draft -->

# I4 — Backlinks panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox
> (`- [ ]`) syntax. Execute inline.

**Goal:** A Node presents a **"Mentioned in" backlinks view** (`UP-2.backlinks-view`): its inbound
edges, auto-populated by reverse traversal, **grouped and distinguished by kind** — structural
predecessors ("Appears under" — where the Node is co-located) and linked referrers ("Mentioned in" —
what mentions it). No author-created return edge. This is the last references item; it completes the slice.

**Architecture:** Same testable-core + framework-adapter split proven in I3b:
- **`BacklinksPanel` component (testable):** reads the Node's inbound edges live via
  `useQuery(db, Query.select(Filter.id(node.id)).targetOf(Edge))` — the reactive equivalent of the I1
  `backlinks` helper — groups by `kind`, resolves each source via `Relation.getSource`, and renders two
  labeled groups. Each entry opens beside on click (reusing `useOpenBeside` from I3b-2, injectable in
  storybook). Gets its db from `Obj.getDatabase(subject)` (no outline controller — it's a companion).
- **Framework boundary:** register a second Surface at `AppSurface.Related` for `Node` → `BacklinksPanel`,
  wrapped in the same open-beside provider the outline surface uses (extracted from I3b-2's adapter).

**Tech Stack:** React, ECHO (`useQuery` `targetOf`, `Relation.getSource`, `Obj.getDatabase`),
`@dxos/app-framework/ui` + `@dxos/app-toolkit` (Surface registration at `AppSurface.Related`), Storybook.

## Global Constraints

- **Spec `UP-2.backlinks-view` (`spec/user-primitives.mdl:149`):** the view "includes both P and A, grouped
  by edge kind — structural predecessors (where T is co-located) distinguished from linked references
  (what mentions T)", "populated automatically by reverse traversal, with no author-created return edge".
- **Model (I1):** `backlinks(db, node): Promise<{ structural: Node[]; linked: Node[] }>`
  (`model/edges.ts:132`) already computes this grouping over `targetOf`; the panel uses the same grouping
  reactively (via `useQuery`) rather than the async helper. Both edge kinds are reified `Edge` relations,
  so one reverse traversal yields both groups (`design.md §3` "Backlinks — the 'Mentioned in' grouped union").
- **Reuse (I3b-2):** `OpenBesideContext` / `useOpenBeside` (`components/NodeOutline/OpenBeside.ts`) for
  click-to-open; the open-beside provider from `react-surface.tsx`.
- **Runners are `moon`**, never raw vitest, from `/Users/san/sandbox/dxos/.claude/worktrees/plugin-bramble-substrate`.
  **Run the gate without competing `moon` jobs** — the browser story suite mass-times-out under concurrent load.
- **Branch** `claude/plugin-bramble-substrate`; NEVER merge to main; NEVER stage `.changeset/config.json`
  or `.claude/launch.json`.
- **Story seeding gotcha:** set `Text` content via `Obj.update(t, (t) => { t.content = … })`.

---

### Task 1: BacklinksPanel component (testable)

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/BacklinksPanel.tsx`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/node-outline.css`
- Modify: `packages/plugins/plugin-bramble/src/components/index.ts` (export `BacklinksPanel` if the barrel lists components — check first)
- Test: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx`

**Interfaces:**
- Consumes: `useQuery`, `Relation.getSource`, `Obj.getDatabase`, `Edge`, `Node`, `useOpenBeside`.
- Produces: `BacklinksPanel({ subject: Node })`.

- [ ] **Step 1: Write the failing story** in `NodeOutline.stories.tsx`. Import `BacklinksPanel` from `./BacklinksPanel`.

```tsx
// A Node T with an inbound STRUCTURAL edge (P is T's parent — "appears under") and an inbound LINKED
// edge (A mentions T — "mentioned in"). The panel shows both, grouped + distinguished (UP-2). Clicking
// an entry opens it beside (reuses the I3b-2 handler).
const BacklinksStory = () => {
  const [space] = useSpaces();
  const [opened, setOpened] = useState<string>('');
  const t = useMemo(() => {
    if (!space) {
      return undefined;
    }
    const db = space.db;
    const target = db.add(makeNode({ text: 'the target T' }));
    const p = db.add(makeNode({ text: 'parent P' }));
    const a = db.add(makeNode({ text: 'mentioner A' }));
    void createEdge(db, p, target, 1); // structural: T appears under P
    createLinkedEdge(db, a, target); // linked: A mentions T
    return target;
  }, [space]);
  return t ? (
    <OpenBesideContext.Provider value={(node) => setOpened(node.text?.target?.content ?? '')}>
      <div role='none' className='grow overflow-auto' style={{ backgroundColor: 'var(--surface-bg)' }}>
        <div data-testid='opened-beside'>{opened}</div>
        <BacklinksPanel subject={t} />
      </div>
    </OpenBesideContext.Provider>
  ) : null;
};

export const Backlinks: Story = {
  render: () => <BacklinksStory />,
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Structural group shows P under "Appears under"; linked group shows A under "Mentioned in".
    const structural = await canvas.findByTestId('bramble-backlinks-structural');
    await expect(structural).toHaveTextContent('Appears under');
    await expect(structural).toHaveTextContent('parent P');
    const linked = await canvas.findByTestId('bramble-backlinks-linked');
    await expect(linked).toHaveTextContent('Mentioned in');
    await expect(linked).toHaveTextContent('mentioner A');
    // The two kinds are distinguished (separate groups), not collapsed.
    await expect(structural).not.toHaveTextContent('mentioner A');
    // Clicking a backlink entry opens it beside.
    await userEvent.click(within(linked).getByText('mentioner A'));
    await waitFor(() => {
      if (canvas.getByTestId('opened-beside').textContent !== 'mentioner A') {
        throw new Error('entry did not open beside');
      }
    });
  },
};
```

- [ ] **Step 2: Run, expect FAIL** (`BacklinksPanel` doesn't exist). `moon run plugin-bramble:test-storybook -- NodeOutline`

- [ ] **Step 3: Create `BacklinksPanel.tsx`.**
```tsx
//
// Copyright 2026 DXOS.org
//

import React from 'react';

import { Filter, Obj, Query, Relation } from '@dxos/echo';
import { type EchoDatabase } from '@dxos/echo-client';
import { useQuery } from '@dxos/react-client/echo';

import { useOpenBeside } from './OpenBeside';
import { Edge, type Node } from '../../types';

import './node-outline.css';

const labelOf = (n: Node): string => n.text?.target?.content || '(untitled)';

const sourcesOfKind = (edges: Edge[], kind: 'structural' | 'linked'): Node[] =>
  edges
    .filter((e) => e.kind === kind)
    .map((e) => Relation.getSource(e) as Node | undefined)
    .filter((n): n is Node => !!n);

/**
 * The "Mentioned in" companion (UP-2.backlinks-view): a Node's inbound edges grouped by kind —
 * structural predecessors ("Appears under") and linked referrers ("Mentioned in"). Auto-populated by
 * reverse traversal (`targetOf`), live via `useQuery`; no author-created return edge. Click an entry to
 * open it beside (`useOpenBeside`, from the Surface — a no-op outside it).
 */
export const BacklinksPanel = ({ subject }: { subject: Node }) => {
  const db = Obj.getDatabase(subject) as EchoDatabase | undefined;
  const openBeside = useOpenBeside();
  const inbound = useQuery(db, Query.select(Filter.id(subject.id)).targetOf(Edge)) as Edge[];
  const structural = sourcesOfKind(inbound, 'structural');
  const linked = sourcesOfKind(inbound, 'linked');

  const group = (title: string, testId: string, nodes: Node[]) =>
    nodes.length > 0 ? (
      <div data-testid={testId} className='bramble-backlinks-group'>
        <div className='bramble-backlinks-heading'>{title}</div>
        {nodes.map((n) => (
          <div key={n.id} role='button' className='bramble-backlinks-entry' onClick={() => openBeside?.(n)}>
            {labelOf(n)}
          </div>
        ))}
      </div>
    ) : null;

  return (
    <div data-testid='bramble-backlinks' className='bramble-backlinks'>
      {group('Appears under', 'bramble-backlinks-structural', structural)}
      {group('Mentioned in', 'bramble-backlinks-linked', linked)}
      {structural.length === 0 && linked.length === 0 && (
        <div data-testid='bramble-backlinks-empty' className='bramble-backlinks-empty'>
          No backlinks
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 4: Style it** in `node-outline.css` (append).
```css
/* The backlinks companion (UP-2): grouped, distinguished, bounded. */
.bramble-backlinks {
  padding: 8px;
  font-size: 0.9em;
}
.bramble-backlinks-heading {
  font-weight: 600;
  color: var(--dx-subduedText, #888888);
  margin-block: 8px 2px;
}
.bramble-backlinks-entry {
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
}
.bramble-backlinks-entry:hover {
  background: var(--dx-hoverSurface, rgba(0, 0, 0, 0.06));
}
.bramble-backlinks-empty {
  color: var(--dx-subduedText, #888888);
  font-style: italic;
  padding: 8px;
}
```

- [ ] **Step 5: Run the story, expect PASS.** `moon run plugin-bramble:test-storybook -- NodeOutline` —
`Backlinks` green; all others still green.

- [ ] **Step 6: Build + lint.** `moon run plugin-bramble:build`, `moon run plugin-bramble:lint` — clean.

- [ ] **Step 7: Commit.**
```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/BacklinksPanel.tsx \
        packages/plugins/plugin-bramble/src/components/NodeOutline/node-outline.css \
        packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx
git commit -m "feat(plugin-bramble): backlinks panel — grouped 'Mentioned in' view (I4 T1)

BacklinksPanel reads a Node's inbound edges live (targetOf) and renders them grouped + distinguished by
kind: structural predecessors ('Appears under') and linked referrers ('Mentioned in'). Auto-populated by
reverse traversal, no return edge; entries open beside on click. Realizes UP-2.backlinks-view."
```

---

### Task 2: Register the `Related` surface (framework adapter)

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/capabilities/react-surface.tsx`

**Interfaces:**
- Consumes: `BacklinksPanel`, `AppSurface.Related`, the open-beside provider (extracted from I3b-2's inline `BrambleOutlineSurface`).
- Produces: a second `Surface.create` contribution rendering `BacklinksPanel` at the `Related` role for `Node`.

> **Test note:** like I3b-2's adapter, this is NOT storybook-gated (no app-framework surface resolver / no
> `Related` host in `withClientProvider`). Gate = **build + lint** (the `AppSurface.Related` filter + the
> component wiring must typecheck) plus Task 1's component story. State this in the commit.

- [ ] **Step 1: Extract the open-beside provider and add the Related surface** in `react-surface.tsx`.
Replace the inline `BrambleOutlineSurface` open-beside logic with a reusable `OpenBesideProvider`, and add
the second surface:
```tsx
//
// Copyright 2026 DXOS.org
//

import * as Effect from 'effect/Effect';
import React, { type PropsWithChildren, useCallback } from 'react';

import { Capabilities, Capability } from '@dxos/app-framework';
import { Surface, useOperationInvoker } from '@dxos/app-framework/ui';
import { LayoutOperation, Paths } from '@dxos/app-toolkit';
import { AppSurface } from '@dxos/app-toolkit/ui';

import { BacklinksPanel, NodeOutline } from '../components';
import { OpenBesideContext } from '../components/NodeOutline/OpenBeside';
import { Node } from '../types';

// Supplies the open-beside handler to any Bramble surface: dispatch LayoutOperation.Open with the
// target's navigation path — a new plank alongside the current view (UP-5.open-beside).
const OpenBesideProvider = ({ children }: PropsWithChildren) => {
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
  return <OpenBesideContext.Provider value={openBeside}>{children}</OpenBesideContext.Provider>;
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
        component: ({ role, data }) => (
          <OpenBesideProvider>
            <NodeOutline role={role} subject={data.subject} />
          </OpenBesideProvider>
        ),
      }),
      Surface.create({
        id: 'related.brambleBacklinks',
        filter: AppSurface.object(AppSurface.Related, Node),
        component: ({ data }) => (
          <OpenBesideProvider>
            <BacklinksPanel subject={data.subject} />
          </OpenBesideProvider>
        ),
      }),
    ]),
  ),
);
```
If `BacklinksPanel` isn't re-exported from `../components`, either add it to `components/index.ts` or import
it directly from `../components/NodeOutline/BacklinksPanel`.

- [ ] **Step 2: Build + lint** — expect clean (typechecks `AppSurface.Related` + the second surface).
`moon run plugin-bramble:build`, `moon run plugin-bramble:lint`.

- [ ] **Step 3: Full sweep unaffected.** `moon run plugin-bramble:test` (66), `:test-storybook -- NodeOutline`
(run alone; expect the Task-1 count).

- [ ] **Step 4: Commit.**
```bash
git add packages/plugins/plugin-bramble/src/capabilities/react-surface.tsx
git commit -m "feat(plugin-bramble): register the backlinks panel at the Related surface (I4 T2)

BacklinksPanel is contributed at AppSurface.Related for Node — Composer's companion 'Related' area shows
a Node's grouped backlinks. Extracted OpenBesideProvider so both the outline and backlinks surfaces share
the open-beside dispatch. Framework-boundary code; gated by build/lint + the T1 component story."
```

---

## Self-Review

- **Spec coverage:** `UP-2.backlinks-view` — the story asserts both groups present, **distinguished**
  (structural ≠ linked), auto-populated by reverse traversal (no return edge authored). ✓ Liveness comes
  from `useQuery(targetOf)`. Click-to-open reuses `UP-5.open-beside`.
- **Placeholder scan:** none.
- **Type consistency:** `BacklinksPanel({ subject: Node })`; `sourcesOfKind` typed to `Node[]`;
  `OpenBesideProvider` shared by both surfaces; `AppSurface.Related` filter matches the outline surface's
  `AppSurface.object` shape.
- **Deviation/limit logged:** Related surface not storybook-gated (stated in commit); dangling-source
  edges are skipped (same guard as I3b's `MentionExpansions`).
- **Post-plan:** update `references-issue-ledger.md` (I4 done → **references slice complete**) + `FLOW.md`
  S6. This is the last references item — consider whether the whole slice (I1–I4) warrants a final note or
  a slice-level review before moving the flow on.
