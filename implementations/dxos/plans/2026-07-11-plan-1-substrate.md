# Bramble Plugin — Plan 1: Substrate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the substrate of a fresh `@dxos/plugin-bramble` — the `Node` object type, the reified `Edge` relation (`predecessor→successor` + `order`), and the edge algebra (create / order / traverse / cycle-check / reparent) — with unit tests, plus the plugin scaffold that registers the schema in Composer.

**Architecture:** Realizes S4 design §1 (`implementations/dxos/design.md`). A Node is any typed ECHO `Obj` (here the default text Node); structural edges are reified `Type.makeRelation` entities carrying a numeric `order`; multi-predecessor is native (many Edges → one Node); the structural subgraph is kept acyclic in the app (ECHO enforces none). No UI — this plan delivers the data model + algebra, unit-tested against an in-memory ECHO database.

**Tech Stack:** DXOS v0.10.0 monorepo; TypeScript; `effect/Schema`; ECHO (`@dxos/echo`, `@dxos/echo-client`); the app-framework (`@dxos/app-framework`, `@dxos/app-toolkit`); vitest.

## Global Constraints

- **Monorepo root:** `~/sandbox/dxos`. All file paths below are relative to it. The plugin lives at `packages/plugins/plugin-bramble/`.
- **Public plugin APIs only.** Import from package entry points — `@dxos/echo`, `@dxos/echo-client`, `@dxos/echo-client/testing`, `@dxos/app-framework`, `@dxos/app-toolkit`, `@dxos/schema`, `@dxos/plugin-space`, `@dxos/compute`, `@dxos/plugin-testing/harness`. **Never** import deep internal paths (`.../src/internal/...`). The one internal-namespaced export we use is the package subpath `@dxos/echo/internal` (for `SystemTypeAnnotation`), exactly as existing plugins do.
- **Type IDs (verbatim):** Node = `org.dxos.type.bramble.node` `0.1.0`; Edge = `org.dxos.type.bramble.edge` `0.1.0`; plugin key = `org.dxos.plugin.bramble`.
- **Floor-first.** Only the table-stakes substrate. No `kind` taxonomy, Runs/Steps, supertags, or view-state on the Edge (collapse/expand is local per-user view-state, a later plan). The Edge carries **only** `order`.
- **TDD, frequent commits.** Each task: failing test → confirm fail → minimal implementation → confirm pass → commit. Test runner: `vitest run <path>` from the monorepo root (or the package dir).
- **Traceability (delivery gate, per FLOW.md).** Every unit here realizes `IP-1` (Node), `IP-1.typed-node` (Node is a typed Obj), `IP-2.direction/multi-predecessor/shared-identity/acyclic` (Edge), and `UP-1.outline`/`UP-1.multi-location`. No un-grounded mechanism.

---

### Task 1: Package scaffold + `Node`/`Edge` schema

**Files:**
- Create: `packages/plugins/plugin-bramble/package.json`
- Create: `packages/plugins/plugin-bramble/tsconfig.json`, `tsconfig.test.json`, `project.json`, `vitest.config.ts` (copied — see Step 1)
- Create: `packages/plugins/plugin-bramble/src/types/Node.ts`
- Create: `packages/plugins/plugin-bramble/src/types/Edge.ts`
- Create: `packages/plugins/plugin-bramble/src/types/index.ts`
- Test: `packages/plugins/plugin-bramble/src/types/schema.test.ts`

**Interfaces:**
- Produces: `Node` (class), `makeNode({text?}): Node`, `Edge` (relation class), `makeEdge({source,target,order}): Edge` — consumed by every later task.

- [ ] **Step 1: Scaffold the package by copying an existing plugin's config**

`ls packages/plugins/plugin-outliner` to see its config files. Copy `tsconfig.json`, `tsconfig.test.json`, `project.json`, and `vitest.config.ts` (whichever exist) verbatim into `packages/plugins/plugin-bramble/`. Then create `package.json` with exactly these fields (deps taken from `plugin-outliner`):

```json
{
  "name": "@dxos/plugin-bramble",
  "version": "0.10.0",
  "type": "module",
  "sideEffects": true,
  "exports": {
    ".": "./src/index.ts",
    "./plugin": "./src/plugin.ts",
    "./translations": "./src/translations.ts"
  },
  "imports": {
    "#meta": "./src/meta.ts",
    "#plugin": "./src/BramblePlugin.tsx",
    "#types": "./src/types/index.ts",
    "#capabilities": "./src/capabilities/index.ts",
    "#translations": "./src/translations.ts"
  },
  "dependencies": {
    "@dxos/app-framework": "workspace:*",
    "@dxos/app-toolkit": "workspace:*",
    "@dxos/compute": "workspace:*",
    "@dxos/echo": "workspace:*",
    "@dxos/echo-client": "workspace:*",
    "@dxos/plugin-client": "workspace:*",
    "@dxos/plugin-space": "workspace:*",
    "@dxos/schema": "workspace:*",
    "effect": "catalog:"
  },
  "devDependencies": {
    "@dxos/plugin-testing": "workspace:*",
    "vitest": "catalog:"
  }
}
```

Verify the `effect` and `vitest` version specifiers against `plugin-outliner/package.json` and match them exactly (they use `catalog:` / `workspace:*` conventions).

- [ ] **Step 2: Write the failing schema test**

`packages/plugins/plugin-bramble/src/types/schema.test.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { afterEach, beforeEach, describe, test } from 'vitest';

import { Filter, Query, Relation } from '@dxos/echo';
import { type EchoDatabase } from '@dxos/echo-client';
import { EchoTestBuilder } from '@dxos/echo-client/testing';
import { Text } from '@dxos/schema';

import { Edge, makeEdge, Node, makeNode } from './index';

describe('Bramble schema', () => {
  let builder: EchoTestBuilder;
  let db: EchoDatabase;

  beforeEach(async () => {
    builder = await new EchoTestBuilder().open();
    ({ db } = await builder.createDatabase({ types: [Node, Edge, Text.Text] }));
  });

  afterEach(async () => {
    await builder.close();
  });

  test('an Edge relation connects two Nodes and is queryable by endpoint', async ({ expect }) => {
    const parent = db.add(makeNode({ text: 'parent' }));
    const child = db.add(makeNode({ text: 'child' }));
    const edge = db.add(makeEdge({ source: parent, target: child, order: 0 }));
    await db.flush();

    const out = await db.query(Query.select(Filter.id(parent.id)).sourceOf(Edge)).run();
    expect(out).toEqual([edge]);
    expect(Relation.getSource(edge).id).toBe(parent.id);
    expect(Relation.getTarget(edge).id).toBe(child.id);
  });
});
```

- [ ] **Step 3: Run it to confirm it fails**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/types/schema.test.ts`
Expected: FAIL — `Cannot find module './index'` (types not written yet).

- [ ] **Step 4: Implement `Node`**

`packages/plugins/plugin-bramble/src/types/Node.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import * as Schema from 'effect/Schema';

import { Annotation, DXN, Obj, Ref, Type } from '@dxos/echo';
import { SystemTypeAnnotation } from '@dxos/echo/internal';
import { Text } from '@dxos/schema';

export class Node extends Type.makeObject<Node>(DXN.make('org.dxos.type.bramble.node', '0.1.0'))(
  Schema.Struct({
    text: Schema.optional(Ref.Ref(Text.Text)),
  }).pipe(
    Annotation.IconAnnotation.set({ icon: 'ph--circle--regular', hue: 'indigo' }),
    // P3: keep row Nodes out of Composer's generic per-typename navigator.
    SystemTypeAnnotation.set(true),
  ),
) {}

export const makeNode = ({ text }: { text?: string } = {}): Node =>
  Obj.make(Node, { text: text != null ? Ref.make(Text.make({ content: text })) : undefined });
```

- [ ] **Step 5: Implement `Edge`**

`packages/plugins/plugin-bramble/src/types/Edge.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import * as Schema from 'effect/Schema';

import { DXN, Relation, Type } from '@dxos/echo';

import { Node } from './Node';

export class Edge extends Type.makeRelation<Edge>(DXN.make('org.dxos.type.bramble.edge', '0.1.0'))({
  source: Node,
  target: Node,
})(
  Schema.Struct({
    order: Schema.Number,
  }),
) {}

export const makeEdge = ({ source, target, order }: { source: Node; target: Node; order: number }): Edge =>
  Relation.make(Edge, { [Relation.Source]: source, [Relation.Target]: target, order });
```

- [ ] **Step 6: Barrel export**

`packages/plugins/plugin-bramble/src/types/index.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

export { Node, makeNode } from './Node';
export { Edge, makeEdge } from './Edge';
```

- [ ] **Step 7: Run the test to confirm it passes**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/types/schema.test.ts`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
cd ~/sandbox/dxos
git add packages/plugins/plugin-bramble
git commit -m "feat(plugin-bramble): Node + Edge substrate schema"
```

---

### Task 2: Sibling ordering — `orderBetween` + `nextOrder`

**Files:**
- Create: `packages/plugins/plugin-bramble/src/model/edges.ts`
- Test: `packages/plugins/plugin-bramble/src/model/edges.test.ts`

**Interfaces:**
- Consumes: `Edge`, `Node`, `makeNode`, `makeEdge` (Task 1).
- Produces: `orderBetween(before?: Edge, after?: Edge): number`; `nextOrder(db, parent): Promise<number>`; `childEdges(db, node): Promise<Edge[]>` (defined here, tested in Task 3).

- [ ] **Step 1: Write the failing test**

`packages/plugins/plugin-bramble/src/model/edges.test.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { describe, test } from 'vitest';

import { orderBetween } from './edges';

describe('orderBetween', () => {
  test('midpoints and open ends', ({ expect }) => {
    expect(orderBetween(undefined, undefined)).toBe(0);
    expect(orderBetween({ order: 5 } as any, undefined)).toBe(6);
    expect(orderBetween(undefined, { order: 5 } as any)).toBe(4);
    expect(orderBetween({ order: 2 } as any, { order: 4 } as any)).toBe(3);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/model/edges.test.ts`
Expected: FAIL — `Cannot find module './edges'`.

- [ ] **Step 3: Implement `edges.ts` (ordering + the childEdges helper it needs)**

`packages/plugins/plugin-bramble/src/model/edges.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { Filter, Query, Relation } from '@dxos/echo';
import { type EchoDatabase } from '@dxos/echo-client';

import { Edge, makeEdge, type Node } from '../types';

/** Numeric midpoint order between two sibling edges. NOTE: repeated inserts at the
 *  same slot can exhaust float precision; a string-rank scheme is a later refinement. */
export const orderBetween = (before?: Edge, after?: Edge): number => {
  const b = before?.order;
  const a = after?.order;
  if (b === undefined && a === undefined) {
    return 0;
  }
  if (b === undefined) {
    return (a as number) - 1;
  }
  if (a === undefined) {
    return b + 1;
  }
  return (b + a) / 2;
};

/** Structural child edges of a Node (sourceOf), ordered by `order`. */
export const childEdges = async (db: EchoDatabase, node: Node): Promise<Edge[]> => {
  const edges = await db.query(Query.select(Filter.id(node.id)).sourceOf(Edge)).run();
  return [...edges].sort((x, y) => (x.order ?? 0) - (y.order ?? 0));
};

/** Order for appending a new child after all existing siblings. */
export const nextOrder = async (db: EchoDatabase, parent: Node): Promise<number> => {
  const edges = await childEdges(db, parent);
  return edges.length ? (edges[edges.length - 1].order ?? 0) + 1 : 0;
};

export { makeEdge };
```

- [ ] **Step 4: Run the test to confirm it passes**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/model/edges.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd ~/sandbox/dxos
git add packages/plugins/plugin-bramble/src/model
git commit -m "feat(plugin-bramble): edge ordering (orderBetween, nextOrder, childEdges)"
```

---

### Task 3: Traversal — `childEdges` (ordered) + `parentEdges` (multi-predecessor)

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/model/edges.ts`
- Modify: `packages/plugins/plugin-bramble/src/model/edges.test.ts`

**Interfaces:**
- Produces: `parentEdges(db, node): Promise<Edge[]>`.

- [ ] **Step 1: Add the failing traversal tests**

Append to `edges.test.ts`:

```ts
import { afterEach, beforeEach } from 'vitest';

import { Relation } from '@dxos/echo';
import { type EchoDatabase } from '@dxos/echo-client';
import { EchoTestBuilder } from '@dxos/echo-client/testing';
import { Text } from '@dxos/schema';

import { Edge, makeEdge, makeNode, Node } from '../types';
import { childEdges, parentEdges } from './edges';

describe('traversal', () => {
  let builder: EchoTestBuilder;
  let db: EchoDatabase;

  beforeEach(async () => {
    builder = await new EchoTestBuilder().open();
    ({ db } = await builder.createDatabase({ types: [Node, Edge, Text.Text] }));
  });
  afterEach(async () => {
    await builder.close();
  });

  test('childEdges returns children ordered by `order`', async ({ expect }) => {
    const p = db.add(makeNode({}));
    const a = db.add(makeNode({ text: 'a' }));
    const b = db.add(makeNode({ text: 'b' }));
    db.add(makeEdge({ source: p, target: b, order: 1 }));
    db.add(makeEdge({ source: p, target: a, order: 0 }));
    await db.flush();

    const kids = await childEdges(db, p);
    expect(kids.map((e) => Relation.getTarget(e).id)).toEqual([a.id, b.id]);
  });

  test('parentEdges returns every predecessor (multi-location)', async ({ expect }) => {
    const p1 = db.add(makeNode({ text: 'p1' }));
    const p2 = db.add(makeNode({ text: 'p2' }));
    const c = db.add(makeNode({ text: 'c' }));
    db.add(makeEdge({ source: p1, target: c, order: 0 }));
    db.add(makeEdge({ source: p2, target: c, order: 0 }));
    await db.flush();

    const parents = await parentEdges(db, c);
    expect(parents.map((e) => Relation.getSource(e).id).sort()).toEqual([p1.id, p2.id].sort());
  });
});
```

- [ ] **Step 2: Run to confirm the `parentEdges` test fails**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/model/edges.test.ts`
Expected: FAIL — `parentEdges is not a function` (childEdges test already passes).

- [ ] **Step 3: Implement `parentEdges`**

Add to `edges.ts`:

```ts
/** Structural parent edges of a Node (targetOf) — its predecessors; multi-predecessor. */
export const parentEdges = async (db: EchoDatabase, node: Node): Promise<Edge[]> => {
  const edges = await db.query(Query.select(Filter.id(node.id)).targetOf(Edge)).run();
  return [...edges];
};
```

- [ ] **Step 4: Run to confirm it passes**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/model/edges.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd ~/sandbox/dxos
git add packages/plugins/plugin-bramble/src/model
git commit -m "feat(plugin-bramble): edge traversal (childEdges ordered, parentEdges multi-predecessor)"
```

---

### Task 4: Mutation + acyclicity — `createEdge` / `wouldCreateCycle` / `removeEdge` / `reparentEdge`

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/model/edges.ts`
- Modify: `packages/plugins/plugin-bramble/src/model/edges.test.ts`

**Interfaces:**
- Produces: `wouldCreateCycle(db, parent, child): Promise<boolean>`; `createEdge(db, parent, child, order?): Promise<Edge>` (cycle-checked); `removeEdge(db, edge): void`; `reparentEdge(db, edge, newParent, order?): Promise<Edge>`.

- [ ] **Step 1: Add the failing mutation tests**

Append to `edges.test.ts`:

```ts
import { createEdge, reparentEdge, wouldCreateCycle } from './edges';

describe('mutation + acyclicity', () => {
  let builder: EchoTestBuilder;
  let db: EchoDatabase;

  beforeEach(async () => {
    builder = await new EchoTestBuilder().open();
    ({ db } = await builder.createDatabase({ types: [Node, Edge, Text.Text] }));
  });
  afterEach(async () => {
    await builder.close();
  });

  test('createEdge nests a child and appends its order', async ({ expect }) => {
    const p = db.add(makeNode({}));
    const a = db.add(makeNode({ text: 'a' }));
    const b = db.add(makeNode({ text: 'b' }));
    await createEdge(db, p, a);
    const eb = await createEdge(db, p, b);
    await db.flush();

    expect(eb.order).toBe(1);
    const kids = await childEdges(db, p);
    expect(kids.map((e) => Relation.getTarget(e).id)).toEqual([a.id, b.id]);
  });

  test('createEdge rejects a cycle', async ({ expect }) => {
    const a = db.add(makeNode({ text: 'a' }));
    const b = db.add(makeNode({ text: 'b' }));
    await createEdge(db, a, b); // a → b
    await db.flush();
    expect(await wouldCreateCycle(db, b, a)).toBe(true); // b → a would cycle
    await expect(createEdge(db, b, a)).rejects.toThrow(/cycle/);
  });

  test('reparentEdge moves an occurrence to a new parent', async ({ expect }) => {
    const p1 = db.add(makeNode({ text: 'p1' }));
    const p2 = db.add(makeNode({ text: 'p2' }));
    const c = db.add(makeNode({ text: 'c' }));
    const e = await createEdge(db, p1, c);
    await db.flush();
    await reparentEdge(db, e, p2);
    await db.flush();

    expect((await parentEdges(db, c)).map((x) => Relation.getSource(x).id)).toEqual([p2.id]);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/model/edges.test.ts`
Expected: FAIL — `createEdge is not a function`.

- [ ] **Step 3: Implement mutation + acyclicity**

Add to `edges.ts`:

```ts
/** True if adding a structural edge parent→child would create a cycle
 *  (child is parent, or child is already an ancestor of parent). */
export const wouldCreateCycle = async (db: EchoDatabase, parent: Node, child: Node): Promise<boolean> => {
  if (parent.id === child.id) {
    return true;
  }
  const seen = new Set<string>();
  const stack: Node[] = [parent];
  while (stack.length > 0) {
    const n = stack.pop()!;
    if (n.id === child.id) {
      return true;
    }
    if (seen.has(n.id)) {
      continue;
    }
    seen.add(n.id);
    for (const e of await parentEdges(db, n)) {
      stack.push(Relation.getSource(e));
    }
  }
  return false;
};

/** Add a structural edge parent→child (appended by default), rejecting cycles. */
export const createEdge = async (
  db: EchoDatabase,
  parent: Node,
  child: Node,
  order?: number,
): Promise<Edge> => {
  if (await wouldCreateCycle(db, parent, child)) {
    throw new Error('Bramble: structural edge would create a cycle');
  }
  const edge = makeEdge({ source: parent, target: child, order: order ?? (await nextOrder(db, parent)) });
  db.add(edge);
  return edge;
};

export const removeEdge = (db: EchoDatabase, edge: Edge): void => {
  db.remove(edge);
};

/** Move one occurrence (edge) to a new parent: remove the old edge, create a new one (cycle-checked). */
export const reparentEdge = async (
  db: EchoDatabase,
  edge: Edge,
  newParent: Node,
  order?: number,
): Promise<Edge> => {
  const child = Relation.getTarget(edge);
  removeEdge(db, edge);
  return createEdge(db, newParent, child, order);
};
```

Ensure `Relation` is imported at the top of `edges.ts` (add it to the existing `@dxos/echo` import).

- [ ] **Step 4: Run to confirm all pass**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/model/edges.test.ts`
Expected: PASS (all describes).

- [ ] **Step 5: Commit**

```bash
cd ~/sandbox/dxos
git add packages/plugins/plugin-bramble/src/model
git commit -m "feat(plugin-bramble): edge mutation + app-enforced acyclicity (createEdge, reparentEdge)"
```

---

### Task 5: Plugin wiring — schema module, create-object, registration, activation test

**Files:**
- Create: `packages/plugins/plugin-bramble/dx.config.ts`
- Create: `packages/plugins/plugin-bramble/src/meta.ts`
- Create: `packages/plugins/plugin-bramble/src/plugin.ts`
- Create: `packages/plugins/plugin-bramble/src/BramblePlugin.tsx`
- Create: `packages/plugins/plugin-bramble/src/index.ts`
- Create: `packages/plugins/plugin-bramble/src/translations.ts`
- Create: `packages/plugins/plugin-bramble/src/capabilities/create-object.ts`
- Create: `packages/plugins/plugin-bramble/src/capabilities/index.ts`
- Modify: `packages/apps/composer-app/src/plugin-defs.tsx`
- Test: `packages/plugins/plugin-bramble/src/BramblePlugin.test.ts`

**Interfaces:**
- Consumes: `Node`, `makeNode` (Task 1).
- Produces: `BramblePlugin` (default + named export) — registered in the app.

- [ ] **Step 1: Write the failing activation test**

`packages/plugins/plugin-bramble/src/BramblePlugin.test.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { describe, test } from 'vitest';

import { ClientPlugin } from '@dxos/plugin-client/plugin';
import { createComposerTestApp } from '@dxos/plugin-testing/harness';

import { BramblePlugin } from '#plugin';

import { meta } from './meta';

const moduleId = (name: string) => `${meta.profile.key}.module.${name}`;

describe('BramblePlugin', () => {
  test('the schema module activates', async ({ expect }) => {
    await using harness = await createComposerTestApp({
      plugins: [ClientPlugin({}), BramblePlugin()],
    });
    expect(harness.manager.getActive()).toEqual(expect.arrayContaining([moduleId('schema')]));
  });
});
```

- [ ] **Step 2: Run to confirm failure**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/BramblePlugin.test.ts`
Expected: FAIL — `Cannot find module '#plugin'`.

- [ ] **Step 3: Create `dx.config.ts` + `meta.ts`**

`packages/plugins/plugin-bramble/dx.config.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { Config2 } from '@dxos/app-framework/config';
import { trim } from '@dxos/util';

export default Config2.make({
  plugin: {
    key: 'org.dxos.plugin.bramble',
    name: 'Bramble',
    author: 'DXOS',
    description: trim`
      A node-per-row outliner where every bullet is a first-class object, nested via real
      structural edges — a view onto a networked-notes DAG.
    `,
    icon: { key: 'ph--tree-structure--regular', hue: 'indigo' },
    tags: ['labs'],
  },
});
```

`packages/plugins/plugin-bramble/src/meta.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { Plugin } from '@dxos/app-framework';

import config from '../dx.config';

export const meta = Plugin.getMetaFromConfig(config);
```

(Add `@dxos/util` to `package.json` dependencies — confirm the version against `plugin-outliner`.)

- [ ] **Step 4: Create the create-object capability**

`packages/plugins/plugin-bramble/src/capabilities/create-object.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import * as Effect from 'effect/Effect';

import { Capability } from '@dxos/app-framework';
import { Operation } from '@dxos/compute';
import { Type } from '@dxos/echo';
import { SpaceCapabilities, SpaceOperation } from '@dxos/plugin-space';

import { makeNode, Node } from '#types';

export default Capability.makeModule(
  Effect.fnUntraced(function* () {
    return [
      Capability.contributes(SpaceCapabilities.CreateObjectEntry, {
        id: Type.getTypename(Node),
        createObject: (props, options) =>
          Effect.gen(function* () {
            const object = makeNode(props);
            return yield* Operation.invoke(SpaceOperation.AddObject, {
              object,
              target: options.target,
              targetNodeId: options.targetNodeId,
            });
          }),
      }),
    ];
  }),
);
```

`packages/plugins/plugin-bramble/src/capabilities/index.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

export { default as CreateObject } from './create-object';
```

- [ ] **Step 5: Create `translations.ts`, `plugin.ts`, `BramblePlugin.tsx`, `index.ts`**

`packages/plugins/plugin-bramble/src/translations.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { meta } from './meta';

export const translations = [
  {
    'en-US': {
      [meta.profile.key]: {
        'plugin name': 'Bramble',
        'typename org.dxos.type.bramble.node': 'Node',
      },
    },
  },
];
```

`packages/plugins/plugin-bramble/src/plugin.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

import { Plugin } from '@dxos/app-framework';

import { meta } from './meta';

export const BramblePlugin = Plugin.lazy(meta, () => import('#plugin'));
```

`packages/plugins/plugin-bramble/src/BramblePlugin.tsx`:

```tsx
//
// Copyright 2026 DXOS.org
//

import { Plugin } from '@dxos/app-framework';
import { AppPlugin } from '@dxos/app-toolkit';

import { CreateObject } from '#capabilities';
import { meta } from '#meta';
import { translations } from '#translations';
import { Edge, Node } from '#types';

export const BramblePlugin = Plugin.define(meta).pipe(
  AppPlugin.addSchemaModule({ schema: [Node, Edge] }),
  AppPlugin.addCreateObjectModule({ activate: CreateObject }),
  AppPlugin.addTranslationsModule({ translations }),
  Plugin.make,
);

export default BramblePlugin;
```

`packages/plugins/plugin-bramble/src/index.ts`:

```ts
//
// Copyright 2026 DXOS.org
//

export * from './meta';
export * from './types';
```

- [ ] **Step 6: Run the activation test to confirm it passes**

Run: `pnpm -C packages/plugins/plugin-bramble vitest run src/BramblePlugin.test.ts`
Expected: PASS. (If activation errors because the create-object module needs `@dxos/plugin-space` present in the harness, add `SpacePlugin()` from `@dxos/plugin-space` to the harness `plugins` array — import it and include it before `BramblePlugin()`.)

- [ ] **Step 7: Register the plugin in the app**

In `packages/apps/composer-app/src/plugin-defs.tsx`:
1. Add an import near the other plugin imports (alphabetical, ~line 19+): `import { BramblePlugin } from '@dxos/plugin-bramble/plugin';`
2. Add `BramblePlugin(),` to the array returned by `getPlugins(...)` (with the other `SomethingPlugin(),` entries, ~line 185+).
3. Enable it in the labs group: add `BramblePlugin.meta.profile.key,` to the labs list in `getDefaults(...)` (the same list that contains `OutlinerPlugin.meta.profile.key`, ~line 153).

Also add `"@dxos/plugin-bramble": "workspace:*"` to `packages/apps/composer-app/package.json` dependencies. Run `pnpm install` from `~/sandbox/dxos`.

- [ ] **Step 8: Verify the app builds with the plugin registered**

Run: `pnpm -C packages/apps/composer-app build` (or the app's typecheck task — confirm the exact script in its `package.json`).
Expected: builds without type errors referencing `@dxos/plugin-bramble`.

- [ ] **Step 9: Commit**

```bash
cd ~/sandbox/dxos
git add packages/plugins/plugin-bramble packages/apps/composer-app
git commit -m "feat(plugin-bramble): plugin wiring (schema + create-object) and app registration"
```

---

## Self-Review

- **Spec coverage (design §1):** Node = any typed `Obj` (Task 1, `Node`) ✓; structural edge = reified `predecessor→successor` Relation with `order` (Task 1, `Edge`) ✓; multi-predecessor native (Task 3, `parentEdges`) ✓; fractional/numeric ordering (Task 2) ✓; app-enforced acyclicity (Task 4, `wouldCreateCycle`) ✓; indexed `sourceOf/targetOf` queries — P2 (Tasks 3–4) ✓; hide rows from navtree — P3 (`SystemTypeAnnotation`, Task 1) ✓; edges-only, no inline children — N1 (no `children` field) ✓; plugin scaffold in-monorepo — §4 (Task 5) ✓. **Deferred to later plans:** rendering/surface (Plan 2), linked edges / references (Plan 3), undo, the `Ref`-span editor. Not gaps — out of this plan's scope.
- **Placeholder scan:** every code step contains complete code; the two "confirm against `plugin-outliner`" instructions (config-file copy, dependency version specifiers) are concrete copy-and-adapt actions, not placeholders. The one conditional (Step 6 harness plugins) names the exact remedy.
- **Type consistency:** `Node`/`Edge`/`makeNode`/`makeEdge` names are identical across Tasks 1–5; `childEdges`/`parentEdges`/`createEdge`/`reparentEdge`/`orderBetween`/`nextOrder`/`wouldCreateCycle`/`removeEdge` signatures match between definition (Tasks 2–4) and tests; `Relation.Source`/`Relation.Target`/`Relation.getSource`/`getTarget` used consistently.

## Open items carried to execution (verify, don't guess)
- The exact monorepo config-file set + version specifiers (copied from `plugin-outliner` in Task 1 Step 1).
- Whether the create-object module's activation needs `@dxos/plugin-space` in the test harness (Task 5 Step 6 names the remedy).
- The app's exact typecheck/build script name (Task 5 Step 8).
