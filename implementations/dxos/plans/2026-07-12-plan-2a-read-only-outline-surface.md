<!-- derives-from: [IP-1, IP-1.typed-node, IP-2, UP-1, IX-immediate]; role: target; status: draft -->

# Plan 2a — Read-only outline surface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Opening a Bramble `Node` in Composer renders its structural-successor subtree as a read-only, nested, visually-conformant outline (bullets, indent guides, disclosure chevrons, per-row text) — no editing, no gestures yet.

**Architecture:** A React surface registered for the `Node` type. A **pure** view-model (`outlineRows`) turns an edge array into an ordered, depth-annotated row list; the surface reads all Bramble `Edge` relations **reactively** via `useQuery` and feeds them to the view-model. The opened Node renders as a **header** (Tana zoom), its descendants as the indented body. Each row's text renders through a **read-only per-row CodeMirror** — the shipping renderer, so the visual gate measures what actually ships. Editing, gestures, view-state (expand/collapse, zoom), and heterogeneous typed-object rows are **Plan 2b+**.

**Tech Stack:** DXOS/ECHO (`@dxos/echo`, `@dxos/react-client/echo`), the app-framework Surface system (`@dxos/app-framework/ui`, `@dxos/app-toolkit/ui`), `@dxos/react-ui-editor` + `@dxos/ui-editor` (CodeMirror), `@dxos/ui-theme` (`mx`, tokens), Vitest + Storybook (`play` functions run via the Vitest+Playwright storybook project) + `@dxos/plugin-testing/harness`.

## Global Constraints

- **Public plugin APIs only.** Import from published `@dxos/*` package entry points (`@dxos/echo`, `@dxos/react-client/echo`, `@dxos/app-framework`, `@dxos/app-framework/ui`, `@dxos/app-toolkit`, `@dxos/app-toolkit/ui`, `@dxos/react-ui`, `@dxos/react-ui-editor`, `@dxos/ui-editor`, `@dxos/ui-theme`, `@dxos/schema`, `@dxos/echo-doc`). Never deep-import internal `src/` paths of another package.
- **Reads are reactive.** All substrate reads that drive rendering go through `useQuery(db, Query.select(...))` (live, re-renders on change) — never a one-shot `db.query(...).run()` inside render. `db` is obtained with `Obj.getDatabase(subject)`.
- **The view-model is pure.** `outlineRows(edges, root)` is a pure synchronous function over an in-memory edge array — no `db`, no `await`. This is what makes it headless-testable and keeps `hasChildren` an O(1) map lookup (there is no per-node re-query).
- **Root excluded from rows.** The opened Node renders as the outline **header**; `outlineRows` returns only its descendants. The header uses the **same** per-row read-only text path as body rows (just header-styled), so Plan 2b can flip `readOnly` off uniformly.
- **Floor = text `Node` rows.** Every row is a `Node`. The heterogeneous typed-object `Section`-Surface row and the fallback surface (design §2) are **deferred to a later plan** — no gesture inserts a typed object as a row yet, so that branch would be dead code.
- **Static-expanded chrome.** Bullet / indent-guide / disclosure chevron all render (per `visual-spec.md`), but the expand/collapse **toggle** (view-state) is Plan 2b. 2a renders the full tree expanded.
- **Visual conformance is a delivery gate.** Before 2a is marked done, run the `visual-verification` loop (`diff-styles.mjs`) against `implementations/dxos/visual/composer-outline.json` to a clean or consciously-triaged result. Expected token values are Tana's, already harvested in `implementations/tana/visual/tana-outline.json`.
- **Test layering:** pure logic → headless Vitest units; plugin/module wiring → `createComposerTestApp` (`@dxos/plugin-testing/harness`); render behavior → Storybook `.stories.tsx` + `play` (Vitest+Playwright storybook project).
- **Branch:** continue on `claude/plugin-bramble-substrate` in the DXOS monorepo (Plan 2a builds on Plan 1's unmerged substrate). Test/lint/typecheck runners: `moon run plugin-bramble:test`, `moon run plugin-bramble:lint`, `moon run composer-app:build` (the typecheck). Never raw `vitest`.
- **Traceability (delivery gate):** every rendered element / behavior traces to `IP-*` / `UP-*` / `IX-*` (or `visual-spec.md` for pixels); nothing imported from Composer without a neutral counterpart. Grep `derives-from` both directions before delivery.

---

### Task 1: Outline view-model (pure tree-walk)

Realizes the "outline = the view rendering a Node's structural-successor subtree" (design §1; `IP-2` structural nesting). Pure and headless — the same test discipline as Plan 1's edge algebra.

**Files:**
- Create: `packages/plugins/plugin-bramble/src/model/outline.ts`
- Test: `packages/plugins/plugin-bramble/src/model/outline.test.ts`

**Interfaces:**
- Consumes (from Plan 1): the `Edge` relation and `Node` object types (`../types`); `Relation.getSource(edge)`, `Relation.getTarget(edge)` (`@dxos/echo`) — synchronous accessors on a materialized relation; `edge.order: number`.
- Produces:
```ts
export type OutlineRow = { node: Node; depth: number; edge: Edge; hasChildren: boolean };
export const outlineRows: (edges: Edge[], root: Node) => OutlineRow[];
// Pure. Builds sourceId→children adjacency (sorted by order), DFS from root, root excluded.
// depth 0 = a direct structural-successor of root. hasChildren = O(1) adjacency lookup.
```

- [ ] **Step 1: Write the failing test**

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
import { outlineRows } from './outline';
import { Edge, Node, makeNode } from '../types';

describe('outlineRows', () => {
  let builder: EchoTestBuilder;
  let db: EchoDatabase;

  beforeEach(async () => {
    builder = await new EchoTestBuilder().open();
    ({ db } = await builder.createDatabase({ types: [Node, Edge, Text.Text] }));
  });
  afterEach(async () => {
    await builder.close();
  });

  const add = (t: string) => db.add(makeNode({ text: t }));
  const allEdges = async () => (await db.query(Query.select(Filter.type(Edge))).run()) as Edge[];

  test('a childless root yields no rows', async ({ expect }) => {
    const root = add('root');
    await db.flush();
    expect(outlineRows(await allEdges(), root)).toEqual([]);
  });

  test('children render at depth 0 in order', async ({ expect }) => {
    const root = add('root');
    const a = add('a');
    const b = add('b');
    const c = add('c');
    await createEdge(db, root, a, 1);
    await createEdge(db, root, b, 2);
    await createEdge(db, root, c, 3);
    await db.flush();

    const rows = outlineRows(await allEdges(), root);
    expect(rows.map((r) => r.node.id)).toEqual([a.id, b.id, c.id]);
    expect(rows.map((r) => r.depth)).toEqual([0, 0, 0]);
  });

  test('descendants are depth-annotated depth-first, with hasChildren', async ({ expect }) => {
    const root = add('root');
    const a = add('a');
    const a1 = add('a1');
    const b = add('b');
    await createEdge(db, root, a, 1);
    await createEdge(db, a, a1, 1);
    await createEdge(db, root, b, 2);
    await db.flush();

    const rows = outlineRows(await allEdges(), root);
    expect(rows.map((r) => [r.node.id, r.depth])).toEqual([
      [a.id, 0],
      [a1.id, 1],
      [b.id, 0],
    ]);
    expect(rows.map((r) => r.hasChildren)).toEqual([true, false, false]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `moon run plugin-bramble:test -- outline`
Expected: FAIL — `outlineRows` is not exported from `./outline`.

- [ ] **Step 3: Write minimal implementation**

```ts
//
// Copyright 2026 DXOS.org
//

import { Relation } from '@dxos/echo';

import { type Edge, type Node } from '../types';

export type OutlineRow = { node: Node; depth: number; edge: Edge; hasChildren: boolean };

/**
 * Pure view-model: given all Bramble structural edges and a view root, produce the
 * ordered, depth-annotated row list for the root's structural-successor subtree.
 * The root itself is excluded (it renders as the outline header).
 */
export const outlineRows = (edges: Edge[], root: Node): OutlineRow[] => {
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
  const walk = (parentId: string, depth: number) => {
    for (const edge of bySource.get(parentId) ?? []) {
      const node = Relation.getTarget(edge) as Node;
      rows.push({ node, depth, edge, hasChildren: (bySource.get(node.id) ?? []).length > 0 });
      walk(node.id, depth + 1);
    }
  };
  walk(root.id, 0);
  return rows;
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `moon run plugin-bramble:test -- outline`
Expected: PASS — 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add packages/plugins/plugin-bramble/src/model/outline.ts packages/plugins/plugin-bramble/src/model/outline.test.ts
git commit -m "feat(plugin-bramble): outline view-model (structural-successor tree walk)"
```

---

### Task 2: Surface registration + shell skeleton + story harness

Registers a React surface so opening a `Node` routes to a Bramble outline component, and stands up the Storybook harness that Tasks 3–5 extend. The component at this task renders only the **header** (the opened Node's text); the body arrives in Task 3.

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.tsx`
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx`
- Create: `packages/plugins/plugin-bramble/src/components/index.ts`
- Create: `packages/plugins/plugin-bramble/src/capabilities/react-surface.tsx`
- Modify: `packages/plugins/plugin-bramble/src/capabilities/index.ts` (export `ReactSurface`)
- Modify: `packages/plugins/plugin-bramble/src/BramblePlugin.tsx` (add the surface module)
- Modify: `packages/plugins/plugin-bramble/src/BramblePlugin.test.ts` (assert `ReactSurface` activates)
- Create: `packages/plugins/plugin-bramble/vitest.config.ts` **only if absent** (enable the storybook project)

**Interfaces:**
- Consumes: `Node` (`../../types`); `Obj.getDatabase`, `Query`, `Filter` (`@dxos/echo`); `useObject`, `useQuery` (`@dxos/react-client/echo`); `Surface`, `Capabilities`, `Capability` (`@dxos/app-framework`, `@dxos/app-framework/ui`); `AppSurface` (`@dxos/app-toolkit/ui`); `AppPlugin.addSurfaceModule` (`@dxos/app-toolkit`).
- Produces: `NodeOutline` component (`{ subject: Node; role?: string }`); a `ReactSurface` capability module; the `NodeOutline` Storybook story infra reused by Tasks 3–5. `data-testid`s: `bramble-outline` (root container), `bramble-header` (header text wrapper).

- [ ] **Step 1: Write the failing wiring test** — extend `BramblePlugin.test.ts` with a second test:

```ts
  test('the ReactSurface module activates', async ({ expect }) => {
    await using harness = await createComposerTestApp({
      plugins: [ClientPlugin({}), BramblePlugin()],
    });
    expect(harness.manager.getActive()).toEqual(expect.arrayContaining([moduleId('ReactSurface')]));
  });
```

- [ ] **Step 2: Run to verify it fails**

Run: `moon run plugin-bramble:test -- BramblePlugin`
Expected: FAIL — `ReactSurface` module is not registered.

- [ ] **Step 3: Create the shell skeleton** `NodeOutline.tsx` (header only; body added in Task 3):

```tsx
//
// Copyright 2026 DXOS.org
//

import React from 'react';

import { useObject } from '@dxos/react-client/echo';

import { type Node } from '../../types';

export type NodeOutlineProps = { subject: Node; role?: string };

export const NodeOutline = ({ subject }: NodeOutlineProps) => {
  const [root] = useObject(subject);
  if (!root) {
    return null;
  }
  return (
    <div data-testid='bramble-outline' role='tree'>
      <div data-testid='bramble-header'>{root.text?.target?.content ?? ''}</div>
    </div>
  );
};
```

- [ ] **Step 4: Create `components/index.ts`**

```ts
//
// Copyright 2026 DXOS.org
//

export * from './NodeOutline/NodeOutline';
```

- [ ] **Step 5: Create the surface capability** `react-surface.tsx`:

```tsx
//
// Copyright 2026 DXOS.org
//

import * as Effect from 'effect/Effect';
import React from 'react';

import { Capabilities, Capability } from '@dxos/app-framework';
import { Surface } from '@dxos/app-framework/ui';
import { AppSurface } from '@dxos/app-toolkit/ui';

import { NodeOutline } from '../components';
import { Node } from '../types';

export default Capability.makeModule(() =>
  Effect.succeed(
    Capability.contributes(Capabilities.ReactSurface, [
      Surface.create({
        id: 'article.brambleOutline',
        filter: AppSurface.oneOf(
          AppSurface.object(AppSurface.Article, Node),
          AppSurface.object(AppSurface.Section, Node),
        ),
        component: ({ role, data }) => <NodeOutline role={role} subject={data.subject} />,
      }),
    ]),
  ),
);
```

- [ ] **Step 6: Export it from `capabilities/index.ts`** — add (via `Capability.lazy`, so the module id resolves to `'ReactSurface'`; a static re-export falls back to the id `'surfaces'` and the wiring test would fail):

```ts
export const ReactSurface = Capability.lazy('ReactSurface', () => import('./react-surface'));
```
(`react-surface.tsx` keeps its `export default Capability.makeModule(...)`. Mirrors plugin-outliner's `capabilities/index.ts`.)

- [ ] **Step 7: Wire the surface module** in `BramblePlugin.tsx` — add `ReactSurface` to the capabilities import and insert into the pipe (after the schema module):

```tsx
  AppPlugin.addSurfaceModule({ activate: ReactSurface }),
```

- [ ] **Step 8: Run the wiring test to verify it passes**

Run: `moon run plugin-bramble:test -- BramblePlugin`
Expected: PASS — both the schema and ReactSurface tests green.

- [ ] **Step 9: Create the story + first `play`** `NodeOutline.stories.tsx`:

```tsx
//
// Copyright 2026 DXOS.org
//

import { type Meta, type StoryObj } from '@storybook/react-vite';
import React, { useMemo } from 'react';
import { expect, within } from 'storybook/test';

import { useSpaces } from '@dxos/react-client/echo';
import { withClientProvider } from '@dxos/react-client/testing';
import { withLayout, withTheme } from '@dxos/react-ui/testing';
import { Text } from '@dxos/schema';

import { NodeOutline } from './NodeOutline';
import { createEdge } from '../../model/edges';
import { translations } from '../../translations';
import { Edge, Node, makeNode } from '../../types';

// Seeds Root → { a → a1, b } and renders the outline rooted at Root.
const NodeOutlineStory = () => {
  const [space] = useSpaces();
  const root = useMemo(() => {
    if (!space) {
      return undefined;
    }
    const db = space.db;
    const r = db.add(makeNode({ text: 'Root' }));
    const a = db.add(makeNode({ text: 'a' }));
    const a1 = db.add(makeNode({ text: 'a1' }));
    const b = db.add(makeNode({ text: 'b' }));
    void createEdge(db, r, a, 1);
    void createEdge(db, a, a1, 1);
    void createEdge(db, r, b, 2);
    return r;
  }, [space]);
  return root ? <NodeOutline subject={root} /> : null;
};

const meta = {
  title: 'plugins/plugin-bramble/NodeOutline',
  component: NodeOutlineStory,
  decorators: [
    withTheme(),
    withLayout({ layout: 'fullscreen' }),
    withClientProvider({ createIdentity: true, createSpace: true, types: [Text.Text, Node, Edge] }),
  ],
  parameters: { layout: 'fullscreen', translations },
} satisfies Meta<typeof NodeOutlineStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = await canvas.findByTestId('bramble-header');
    await expect(header).toHaveTextContent('Root');
  },
};
```

- [ ] **Step 10: Ensure the storybook project is enabled.** If `packages/plugins/plugin-bramble/vitest.config.ts` does not already set `storybook: true`, create/replace it with:

```ts
//
// Copyright 2026 DXOS.org
//

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createConfig } from '../../../vitest.base.config';

export default createConfig({
  dirname: typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url)),
  node: true,
  storybook: true,
});
```

- [ ] **Step 11: Run the story test to verify it passes**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: PASS — the `Default` story's `play` finds the header with text "Root".

- [ ] **Step 12: Commit**

```bash
git add packages/plugins/plugin-bramble/src/components packages/plugins/plugin-bramble/src/capabilities packages/plugins/plugin-bramble/src/BramblePlugin.tsx packages/plugins/plugin-bramble/src/BramblePlugin.test.ts packages/plugins/plugin-bramble/vitest.config.ts
git commit -m "feat(plugin-bramble): register outline surface + story harness (header only)"
```

---

### Task 3: Render the tree body (nested rows)

The shell reads all Bramble edges reactively and renders the view-model as nested rows (bullet + text, indented by depth). Realizes `IX-immediate` (reactive re-render on substrate change).

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.tsx`
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/OutlineRow.tsx`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx` (add a body-assertion `play`)

**Interfaces:**
- Consumes: `outlineRows`, `OutlineRow` (`../../model/outline`); `Obj.getDatabase`, `Query`, `Filter` (`@dxos/echo`); `useQuery` (`@dxos/react-client/echo`); `Edge` (`../../types`).
- Produces: nested-row DOM. `data-testid`s: `bramble-row` (one per row), `bramble-node-name` (row text), plus `data-depth={row.depth}` on each row.

- [ ] **Step 1: Add a failing body `play`** to `NodeOutline.stories.tsx` — a second story:

```ts
export const Tree: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = await canvas.findAllByTestId('bramble-row');
    // Root excluded; descendants are a, a1, b, depth-first.
    await expect(rows).toHaveLength(3);
    await expect(rows[0]).toHaveTextContent('a');
    await expect(rows[0]).toHaveAttribute('data-depth', '0');
    await expect(rows[1]).toHaveTextContent('a1');
    await expect(rows[1]).toHaveAttribute('data-depth', '1');
    await expect(rows[2]).toHaveTextContent('b');
    await expect(rows[2]).toHaveAttribute('data-depth', '0');
  },
};
```

- [ ] **Step 2: Run to verify it fails**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: FAIL — no `bramble-row` elements are rendered yet.

- [ ] **Step 3: Create the row component** `OutlineRow.tsx` (text as a plain node for now; Task 4 swaps in the editor):

```tsx
//
// Copyright 2026 DXOS.org
//

import React from 'react';

import { type OutlineRow as OutlineRowModel } from '../../model/outline';

const INDENT_PX = 24;

export const OutlineRow = ({ row }: { row: OutlineRowModel }) => {
  return (
    <div data-testid='bramble-row' data-depth={row.depth} role='treeitem' style={{ paddingInlineStart: row.depth * INDENT_PX }}>
      <span data-testid='bramble-chevron' aria-hidden={!row.hasChildren} />
      <span data-testid='bramble-bullet' aria-hidden='true' />
      <span data-testid='bramble-node-name'>{row.node.text?.target?.content ?? ''}</span>
    </div>
  );
};
```

- [ ] **Step 4: Wire the reactive read + body** into `NodeOutline.tsx`:

```tsx
//
// Copyright 2026 DXOS.org
//

import React, { useMemo } from 'react';

import { Filter, Obj, Query } from '@dxos/echo';
import { useObject, useQuery } from '@dxos/react-client/echo';

import { OutlineRow } from './OutlineRow';
import { outlineRows } from '../../model/outline';
import { Edge, type Node } from '../../types';

export type NodeOutlineProps = { subject: Node; role?: string };

export const NodeOutline = ({ subject }: NodeOutlineProps) => {
  const [root] = useObject(subject);
  const db = Obj.getDatabase(subject);
  const edges = useQuery(db, Query.select(Filter.type(Edge))) as Edge[];
  const rows = useMemo(() => (root ? outlineRows(edges, root) : []), [edges, root]);

  if (!root) {
    return null;
  }
  return (
    <div data-testid='bramble-outline' role='tree'>
      <div data-testid='bramble-header'>{root.text?.target?.content ?? ''}</div>
      {rows.map((row) => (
        <OutlineRow key={row.node.id} row={row} />
      ))}
    </div>
  );
};
```

- [ ] **Step 5: Run to verify both stories pass**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: PASS — `Default` (header) and `Tree` (3 nested rows) green.

- [ ] **Step 6: Commit**

```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline
git commit -m "feat(plugin-bramble): render structural-successor tree as nested rows"
```

---

### Task 4: Per-row read-only CodeMirror text

Swap the plain text span for the shipping renderer: a read-only per-row CodeMirror bound to the Node's `text`. Header and body rows share this path so Plan 2b can flip `readOnly` off uniformly (the editable-header requirement).

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx`
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/OutlineRow.tsx` (use `RowEditor`)
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.tsx` (header uses `RowEditor`)

**Interfaces:**
- Consumes: `useTextEditor` (`@dxos/react-ui-editor`); `createBasicExtensions`, `createDataExtensions`, `createThemeExtensions` (`@dxos/ui-editor`); `Doc.createAccessor` (`@dxos/echo-doc`); `useThemeContext` (`@dxos/react-ui`); `Node` (`../../types`).
- Produces: `RowEditor` (`{ node: Node; readOnly?: boolean }`), rendering the `data-testid='bramble-node-name'` container.

- [ ] **Step 1: Add a failing text-binding `play`** — extend the `Tree` story's `play` with a per-row text assertion that targets the editor container's rendered content (append after the existing assertions):

```ts
    // The row text renders through the editor (CodeMirror content), not a bare span.
    const editors = await canvas.findAllByTestId('bramble-node-name');
    await expect(editors[0].querySelector('.cm-content')).not.toBeNull();
    await expect(editors[0]).toHaveTextContent('a');
```

- [ ] **Step 2: Run to verify it fails**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: FAIL — `bramble-node-name` has no `.cm-content` (still a plain span).

- [ ] **Step 3: Create `RowEditor.tsx`**

```tsx
//
// Copyright 2026 DXOS.org
//

import React from 'react';

import { Doc } from '@dxos/echo-doc';
import { useThemeContext } from '@dxos/react-ui';
import { useTextEditor } from '@dxos/react-ui-editor';
import { createBasicExtensions, createDataExtensions, createThemeExtensions } from '@dxos/ui-editor';

import { type Node } from '../../types';

export const RowEditor = ({
  node,
  readOnly = true,
  testId,
}: {
  node: Node;
  readOnly?: boolean;
  testId?: string;
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
  // The caller owns the test id: rows tag `bramble-node-name`; the header leaves the
  // inner editor untagged (its `bramble-header` wrapper is the region target) so the two
  // never collide in findAllByTestId or in the visual-region selectors.
  return <div data-testid={testId} ref={parentRef} />;
};
```

- [ ] **Step 4: Use `RowEditor` in `OutlineRow.tsx`** — replace the `bramble-node-name` span:

```tsx
import { RowEditor } from './RowEditor';
// ...
      <RowEditor node={row.node} testId='bramble-node-name' />
```
(Remove the now-unused `content` span; keep chevron + bullet spans.)

- [ ] **Step 5: Use `RowEditor` for the header in `NodeOutline.tsx`** — replace the header `<div>{...content}</div>` with:

```tsx
      <div data-testid='bramble-header'>
        <RowEditor node={root} />
      </div>
```
(Import `RowEditor` from `./RowEditor`.)

- [ ] **Step 6: Run to verify it passes**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: PASS — rows render CodeMirror editors (`.cm-content` present) with the right text.

- [ ] **Step 7: Commit**

```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline
git commit -m "feat(plugin-bramble): render row + header text via read-only per-row CodeMirror"
```

---

### Task 5: Chrome + visual conformance

Style the shell to `visual-spec.md` (header title, row text, bullet, chevron, indent) and gate on the `visual-verification` differ. This is where Plan 2's **R visual validation gate** first runs.

**Files:**
- Create: `packages/plugins/plugin-bramble/src/components/NodeOutline/node-outline.css` (or apply `mx()` tokens inline — follow whatever the plugin already does; if none, a small CSS module colocated here)
- Modify: `OutlineRow.tsx`, `NodeOutline.tsx`, `RowEditor.tsx` (apply classes; header-styled vs row-styled variants)
- Create (in the **bramble spec repo**): `implementations/dxos/visual/composer-outline.json`

**Interfaces:**
- Consumes: `mx` (`@dxos/ui-theme`) for class composition; the theme neutral ramp + `--font-body` tokens.
- Produces: styled chrome carrying the stable `data-testid`s the mapping targets: `bramble-header` (title), `bramble-node-name` (row text), `bramble-bullet`, `bramble-chevron`.

- [ ] **Step 1: Author the conformance mapping** `implementations/dxos/visual/composer-outline.json` — derived from `implementations/tana/visual/tana-outline.json`: keep `viewport`, `tolerances`, and each region's `expect` + `source` **verbatim**; repoint every `app` selector at the Storybook-rendered surface (via `data-testid`). Scope 2a to the four static-outline regions (defer `reference-chip` and `expansion-panel` to Plan 3):

```jsonc
{
  "view": "composer-outline",
  "note": "DXOS/Composer bramble outline conformance to Tana. expect/source verbatim from implementations/tana/visual/tana-outline.json (Tana's harvested values); app selectors target the NodeOutline Storybook surface. Plan 2a scope: node-title (header), node-name (row), bullet, chevron. reference-chip + expansion-panel deferred to Plan 3.",
  "mockup": "(live Tana web app — see source selectors in tana-outline.json)",
  "app": "plugin-bramble NodeOutline story (Storybook), rendered in the preview Chromium",
  "viewport": { "width": 1456, "height": 813 },
  "tolerances": { "length": 1, "colorChannel": 6 },
  "regions": [
    { "name": "node-title", "app": "[data-testid=bramble-header] .cm-content",
      "expect": { "font-family": "InterVariable", "font-size": "29px", "line-height": "33.3615px", "font-weight": "550", "color": "oklch(0.282985 0.00269329 240)" } },
    { "name": "node-name", "app": "[data-testid=bramble-node-name] .cm-content",
      "expect": { "font-family": "InterVariable", "font-size": "15px", "line-height": "21px", "font-weight": "400", "color": "oklch(0.282985 0.00269329 240)" } },
    { "name": "bullet", "app": "[data-testid=bramble-bullet]",
      "expect": { "width": "15px", "height": "15px" } },
    { "name": "chevron", "app": "[data-testid=bramble-chevron]",
      "expect": { "padding": "3.75px 0px" } }
  ]
}
```

- [ ] **Step 2: Style the chrome** — apply the header title, row text, bullet (15×15), chevron (padding `3.75px 0px`), and indent to approach the mapping's expected values, using theme tokens (`--font-body`, the neutral ramp) via `mx()` / a colocated CSS module. Header = the `node-title` scale (larger/weight 550); rows = `node-name` scale (15px/400).

  **Note (verify, do not assume):** `visual-spec.md` expects `InterVariable`, but the theme's `--font-body` names `'Inter Variable'` and the variable font import may be **absent from the build** (harvest will show the resolved family). If the running surface resolves to the fallback stack, that is a **flag-for-human / accept-with-reason** triage item per the visual-verification loop — record it; do not fake the value.

- [ ] **Step 3: Run the visual-verification loop** (per the `visual-verification` skill):
  1. Start the plugin-bramble Storybook (or the composer-app dev server showing the surface) and open the `NodeOutline` `Tree` story in the preview browser at the mapping viewport.
  2. Harvest computed styles with `harvest-styles.js` over the mapping's regions → `<scratchpad>/actual.json`.
  3. `node ~/.claude/skills/visual-verification/diff-styles.mjs implementations/dxos/visual/composer-outline.json <scratchpad>/actual.json`.
  4. Triage each delta: **fix** (real divergence), **accept-with-reason** (e.g. the font-token caveat), or **flag-for-human** (subjective). Re-harvest + re-diff after each fix.

- [ ] **Step 4: Run the render tests to confirm no regression**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: PASS — chrome styling does not break the structural/text assertions.

- [ ] **Step 5: Commit** (two repos — the code in DXOS, the mapping in the bramble spec repo)

```bash
# DXOS monorepo
git add packages/plugins/plugin-bramble/src/components/NodeOutline
git commit -m "feat(plugin-bramble): outline chrome styled to Tana visual-spec"

# bramble spec repo
git add implementations/dxos/visual/composer-outline.json
git commit -m "docs(dxos): composer outline visual-conformance mapping (derived from Tana R)"
```

---

## Delivery gate (before marking Plan 2a done)

1. `moon run plugin-bramble:test` green (units + wiring + stories); `moon run plugin-bramble:lint` clean; `moon run composer-app:build` typecheck passes.
2. `diff-styles.mjs` clean, or every residual delta recorded as accept-with-reason / flag-for-human (Step 5.3).
3. Traceability: each rendered element traces to `IP-*`/`UP-*`/`IX-*` or `visual-spec.md`; nothing imported from Composer without a neutral counterpart. Update `FLOW.md` (S6 Plan-2a built) and the pipeline row.

## Deferred to Plan 2b (explicitly out of 2a scope)

Editing (flip `readOnly` off, incl. the editable header); structural gestures (Tab/Shift-Tab indent/outdent, Cmd-Shift-Up/Down reorder, create/remove rows) wired to the Plan-1 edge algebra; cross-row caret handoff; expand/collapse + zoom **view-state** (the chevron toggle); heterogeneous typed-object `Section`-Surface rows + fallback surface; the `reference-chip` / `expansion-panel` visual regions (Plan 3).
