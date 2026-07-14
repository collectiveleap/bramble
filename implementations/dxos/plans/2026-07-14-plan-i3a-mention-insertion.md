<!-- derives-from: [UP-2.link, IP-3, IX-inflow, IX-direct.reference-atomic]; role: target; status: current -->

# Plan I3a — `@`-mention insertion + atomic chip (edge-referencing marker)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`).

**Goal:** Insert an `@`-mention that creates a **linked `Edge`** and drops an **edge-referencing marker token** in the node's text, rendered as a **live, atomic chip** by a custom CodeMirror decoration — consistent with the unify decision (the marker references the edge id, never a target URL; **not** `xmlTags`/markdown).

**Architecture:** The marker is `{{ref:<edgeId>}}` in the node's plain-text content. A custom CodeMirror extension scans for these tokens and replaces each with an **atomic** widget that resolves `edgeId → linked Edge → target Node` and renders the target's live label as a chip. The `@`-picker (reuse Composer's `popover`/`EditorMenuProvider` + a node-query) on select creates the linked `Edge` (via `createLinkedEdge`, I1) and inserts the marker. A doc update-listener keeps edges in sync (marker deleted → edge removed).

**Tech Stack:** TypeScript, React, `@dxos/echo`, `@dxos/react-ui-editor` (`popover`, `useEditorMenu`, `EditorMenuProvider`), CodeMirror 6 (`Decoration`, `WidgetType`, `EditorView.atomicRanges`), Vitest + Storybook via `moon`.

## Global Constraints

- **Runners are `moon`**, never raw vitest: `moon run plugin-bramble:{test,test-storybook -- <Story>,build,lint}`. Run from `/Users/san/sandbox/dxos/.claude/worktrees/plugin-bramble-substrate`.
- **Branch never merged to main.** **Never `git add -A`/`.`** (pre-existing local mods `.changeset/config.json`, `.claude/launch.json` must not be staged).
- **Marker = `{{ref:<edgeId>}}`** — references the **linked `Edge` id**, NOT a target URL, NOT a markdown link. The chip resolves the target *through* the edge. Do **not** add the markdown language or `xmlTags` (see `design-references.md`; that was the corrected leftover).
- **Consumes I1:** `Edge` is kind-typed; `makeLinkedEdge`/`createLinkedEdge`; `backlinks`. Structural ops are already `kind='structural'`-filtered.
- **Chip is atomic** (`IX-direct.reference-atomic`): selectable/deletable as one unit, not editable inside; the label is the target's **live** content.

## File Structure
- `src/components/NodeOutline/controller.ts` — add a public `db` getter (prerequisite).
- `src/components/NodeOutline/NodeOutline.tsx` — filter its edge `useQuery` use to structural (I1 whole-branch Minor).
- `src/components/NodeOutline/mention-extension.ts` — **new**: the marker-scanning chip decoration + the `{{ref:id}}` helpers.
- `src/components/NodeOutline/useMentionPicker.ts` — **new**: the `@`-picker wiring (query nodes → create edge + insert marker).
- `src/components/NodeOutline/RowEditor.tsx` — wire the mention extension + picker; wrap in `EditorMenuProvider`.
- Tests: `mention-extension.test.ts` (pure token helpers), `RowEditor.stories.tsx` (chip render + picker, storybook).

---

### Task 1: Prerequisites — public `db` + structural edge filter in `NodeOutline`

**Files:** Modify `src/components/NodeOutline/controller.ts`, `src/components/NodeOutline/NodeOutline.tsx`. Test: `src/components/NodeOutline/controller.test.ts`.

**Interfaces:** Produces `OutlineController.prototype.db: EchoDatabase` (public getter). `NodeOutline` uses only structural edges for its outline query use.

- [ ] **Step 1: Write the failing test** — add to `controller.test.ts`:
```ts
  test('exposes db (for editor extensions that need query access)', async ({ expect }) => {
    const root = add('root');
    await db.flush();
    expect(controllerFor(root).db).toBe(db);
  });
```
- [ ] **Step 2: Run** `moon run plugin-bramble:test -- controller` → FAIL (`db` getter absent).
- [ ] **Step 3: Implement** — in `controller.ts`, add a public getter: `get db(): EchoDatabase { return this.ctx.db; }`. In `NodeOutline.tsx`, where the outline consumes `edges` (the zoom-root fallback at ~line 46 and the `outlineRows` call), use a structural-filtered list: `const structuralEdges = useMemo(() => edges.filter((e) => e.kind === 'structural'), [edges]);` and pass/use `structuralEdges` for the zoom-root fallback + `outlineRows` (outlineRows already filters, but this removes the linked-edge churn the I1 whole-branch review flagged). Update the "structural EDGES" comment to be accurate.
- [ ] **Step 4: Run** `moon run plugin-bramble:test -- controller` → PASS; `moon run plugin-bramble:build` → clean.
- [ ] **Step 5: Commit**
```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/controller.ts packages/plugins/plugin-bramble/src/components/NodeOutline/controller.test.ts packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.tsx
git commit -m "feat(plugin-bramble): expose controller.db; NodeOutline uses structural edges only"
```

---

### Task 2: The chip decoration (integration de-risk) — prove a marker renders as a live atomic chip

**Files:** Create `src/components/NodeOutline/mention-extension.ts`, `src/components/NodeOutline/mention-extension.test.ts`. Modify `RowEditor.tsx` (add the extension), `RowEditor.stories.tsx` or `NodeOutline.stories.tsx` (a `Mention` story).

**Interfaces:**
- `MARKER_RE = /\{\{ref:([0-9A-Za-z]+)\}\}/g`; `makeMarker(edgeId: string): string` → `{{ref:<edgeId>}}`; `markerEdgeIds(text: string): string[]` (all edge ids in a text).
- `mentionChips({ db, resolveLabel }): Extension` — a CodeMirror extension that replaces each `{{ref:id}}` range with an **atomic** widget rendering the target's label (resolved `edgeId → Edge → target → label`), styled as a `dx-anchor` chip.

**This task is the integration crux.** If the chip does not render or the atomic behaviour fights CodeMirror, STOP and report BLOCKED with the exact symptom — do not thrash.

- [ ] **Step 1: Write the failing pure test** — `mention-extension.test.ts` (pure helpers, no CodeMirror):
```ts
import { describe, test } from 'vitest';
import { makeMarker, markerEdgeIds } from './mention-extension';
describe('mention marker helpers', () => {
  test('makeMarker + markerEdgeIds round-trip', ({ expect }) => {
    const m = makeMarker('01H2XYZ');
    expect(m).toBe('{{ref:01H2XYZ}}');
    expect(markerEdgeIds(`begin ${m} and ${makeMarker('01H2ABC')} end`)).toEqual(['01H2XYZ', '01H2ABC']);
  });
  test('markerEdgeIds returns [] when none', ({ expect }) => {
    expect(markerEdgeIds('plain text')).toEqual([]);
  });
});
```
- [ ] **Step 2: Run** `moon run plugin-bramble:test -- mention-extension` → FAIL.
- [ ] **Step 3: Implement the helpers + the decoration.** In `mention-extension.ts`:
```ts
//
// Copyright 2026 DXOS.org
//
import { RangeSetBuilder } from '@codemirror/state';
import { Decoration, type DecorationSet, EditorView, ViewPlugin, type ViewUpdate, WidgetType } from '@codemirror/view';

import { type EchoDatabase } from '@dxos/echo-client';

export const MARKER_RE = /\{\{ref:([0-9A-Za-z]+)\}\}/g;
export const makeMarker = (edgeId: string): string => `{{ref:${edgeId}}}`;
export const markerEdgeIds = (text: string): string[] =>
  [...text.matchAll(MARKER_RE)].map((m) => m[1]);

/** Renders a reference chip. `label` is resolved by the caller (edgeId → Edge → target → title). */
class ChipWidget extends WidgetType {
  constructor(private readonly _edgeId: string, private readonly _label: string) { super(); }
  override eq(o: ChipWidget) { return o._edgeId === this._edgeId && o._label === this._label; }
  override toDOM() {
    const el = document.createElement('dx-anchor');
    el.classList.add('dx-tag--anchor');
    el.textContent = this._label;
    el.setAttribute('data-edge-id', this._edgeId);
    return el;
  }
  override ignoreEvent() { return false; }
}

/** Replace each `{{ref:id}}` with an atomic chip. `resolveLabel(edgeId)` returns the current
 *  target title (or a fallback). Rebuild on doc change; a separate mechanism triggers rebuild
 *  when a target's title changes (see Task 3 note). */
export const mentionChips = ({ resolveLabel }: { db: EchoDatabase; resolveLabel: (edgeId: string) => string }): EditorView.Extension => {
  const build = (view: EditorView): DecorationSet => {
    const b = new RangeSetBuilder<Decoration>();
    const text = view.state.doc.toString();
    for (const m of text.matchAll(MARKER_RE)) {
      const from = m.index!, to = from + m[0].length, edgeId = m[1];
      b.add(from, to, Decoration.replace({ widget: new ChipWidget(edgeId, resolveLabel(edgeId)) }));
    }
    return b.finish();
  };
  const plugin = ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;
      constructor(view: EditorView) { this.decorations = build(view); }
      update(u: ViewUpdate) { if (u.docChanged || u.viewportChanged) this.decorations = build(u.view); }
    },
    {
      decorations: (v) => v.decorations,
      // Make the chips atomic: cursor skips them, backspace deletes the whole token.
      provide: (plugin) =>
        EditorView.atomicRanges.of((view) => view.plugin(plugin)?.decorations ?? Decoration.none),
    },
  );
  return plugin;
};
```
> Note the `db` param is accepted for symmetry/future use; `resolveLabel` is what the caller supplies (built from `db` — a map of the node's linked-edge ids → target titles). Keeping resolution in the caller avoids async in the widget.

In `RowEditor.tsx`, add `mentionChips(...)` to the extensions array. The caller builds `resolveLabel` from the node's linked edges: query the node's outgoing linked edges (`sourceOf(Edge)` filtered `kind='linked'`), map `edge.id → Relation.getTarget(edge).text?.target?.content ?? '…'`. Access `db` via `useOutlineController()?.db` (Task 1). Add `dx-anchor` chip styling to `node-outline.css` if the web component isn't globally styled (verify — `dx-anchor` is a shared web component; it may already render chip styling).

- [ ] **Step 4: Prove it — a storybook `Mention` render test.** Add a story that seeds a node whose text contains a `{{ref:<edgeId>}}` marker and a matching linked `Edge` to a target titled "hello world", mounts the outline, and asserts a `dx-anchor[data-edge-id]` chip with text "hello world" renders (and the raw `{{ref:...}}` text is not visible). Run `moon run plugin-bramble:test-storybook -- <Story>`.
> If the chip does not render, or `atomicRanges` misbehaves (cursor enters the token, or backspace deletes one char), report BLOCKED with the symptom — this is the integration proof; do not force it.
- [ ] **Step 5: Run** `moon run plugin-bramble:test -- mention-extension` (helpers) + the storybook + `moon run plugin-bramble:build` → all green.
- [ ] **Step 6: Commit**
```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/mention-extension.ts packages/plugins/plugin-bramble/src/components/NodeOutline/mention-extension.test.ts packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx
git commit -m "feat(plugin-bramble): custom chip decoration for edge-referencing mention markers"
```

---

### Task 3: The `@`-picker — create a linked `Edge` + insert the marker

**Files:** Create `src/components/NodeOutline/useMentionPicker.ts`. Modify `RowEditor.tsx` (wire the picker; wrap the editor in `EditorMenuProvider`). Story: `NodeOutline.stories.tsx` (`MentionPicker`, manual — the popover isn't reliably driven in the test runner).

**Interfaces:** `useMentionPicker({ db, sourceNode }): { extension, providerProps }` — wraps `useEditorMenu({ trigger: '@', getMenu })` where `getMenu` queries candidate `Node`s (label-filtered), and each item's `onSelect({ view, head })` (a) calls `createLinkedEdge(db, sourceNode, target)` (I1), then (b) inserts `makeMarker(edge.id)` at `head` via `insertAtCursor`. Returns the popover `extension` + the `EditorMenuProvider` props to thread into `RowEditor`'s JSX.

**Context (verified APIs, from the 2026-07-13 research — reuse the picker UI + query, NOT a markdown-URL insert):**
- `useEditorMenu`, `EditorMenuProvider`, `EditorMenuGroup`/`EditorMenuItem` from `@dxos/react-ui-editor`; `insertAtCursor` from `@dxos/ui-editor`.
- Query candidate nodes: `db.query(Query.select(Filter.type(Node))).run()`, filter out `sourceNode`, filter by title containing the query text (mirror `plugin-markdown/src/hooks/useLinkQuery.ts`'s label filter — but the insert differs: we create an edge + marker, not `[label](uri)`).
- `RowEditor` currently returns a bare `<div ref={parentRef}/>`; wrap it in `<EditorMenuProvider getView={() => view} groups={groupsRef.current} {...menuProps}>…</EditorMenuProvider>` and add the popover `extension` to the extensions array (alongside `mentionChips`).

- [ ] **Step 1: Write the failing test** — the pure insert/create logic is testable without the popover. Add to `mention-extension.test.ts` a test of a small pure helper `onPickTarget(db, view-like, head, source, target)` if you extract one; otherwise assert the marker+edge via a controller-level integration test: create a linked edge + confirm `makeMarker(edge.id)` would be inserted. (The popover UI itself is manual — a `MentionPicker` story with no play, since the CM popover isn't reliably synthesizable, mirroring the drag decision in Plan 2e.)
- [ ] **Step 2–4:** Implement `useMentionPicker`, wire it into `RowEditor` (extension + `EditorMenuProvider` wrapper), add the `MentionPicker` story. Verify: `moon run plugin-bramble:build` + `:lint` + existing `:test-storybook` stay green (the wrapper/extension must not regress the existing row editors or gestures — the Bramble gesture keymap is `Prec.highest`, so `@` insertion coexists). Manually drive the picker in the story to confirm select → chip appears.
> If wrapping `RowEditor` in `EditorMenuProvider` fights `OutlineController.register(nodeId, view)` or the per-row editor lifecycle, report the specific conflict.
- [ ] **Step 5: Commit** (stage only `useMentionPicker.ts`, `RowEditor.tsx`, `NodeOutline.stories.tsx`):
```bash
git commit -m "feat(plugin-bramble): @-picker creates a linked Edge + inserts an edge marker"
```

---

### Task 4: Marker ↔ edge deletion sync

**Files:** Modify `src/components/NodeOutline/mention-extension.ts` (add a sync update-listener) or `RowEditor.tsx`. Test: `mention-extension.test.ts` (pure diff helper).

**Interfaces:** `staleEdgeIds(currentText: string, linkedEdgeIds: string[]): string[]` — the linked-edge ids whose `{{ref:id}}` marker is no longer present in the text (to be removed). A CodeMirror `EditorView.updateListener` computes this on doc change and calls `removeEdge(db, edge)` for each stale edge (`removeEdge` from I1/edges.ts).

- [ ] **Step 1: Write the failing test**
```ts
  test('staleEdgeIds finds edges whose marker was deleted', ({ expect }) => {
    // linked edges e1,e2 exist; text only still contains e1's marker → e2 is stale.
    expect(staleEdgeIds(`begin ${makeMarker('e1')} end`, ['e1', 'e2'])).toEqual(['e2']);
    expect(staleEdgeIds(`${makeMarker('e1')} ${makeMarker('e2')}`, ['e1', 'e2'])).toEqual([]);
  });
```
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** `staleEdgeIds = (text, ids) => { const present = new Set(markerEdgeIds(text)); return ids.filter((id) => !present.has(id)); }`. Wire an `EditorView.updateListener` in `RowEditor` that, on `docChanged`, queries the node's linked edges, computes `staleEdgeIds`, and `removeEdge`s each (guard: only act on real user deletions, not programmatic inserts).
- [ ] **Step 4: Run** `moon run plugin-bramble:test -- mention-extension` → PASS; `build`/`lint` clean.
- [ ] **Step 5: Commit** `git commit -m "feat(plugin-bramble): remove a linked Edge when its marker is deleted"`

---

## Post-plan verification
`moon run plugin-bramble:{build,test,test-storybook -- NodeOutline,lint}` all green.
Update `references-issue-ledger.md` (I3a done) and note **I3b** next (the secondary view: `PreviewComponent`/Surface at inline-expand + open-beside, cycle-safe expansion — the chip's expand affordance).

## Deferred to I3b (not here)
The **secondary view** — expanding a mention (or opening it beside) to render the target's `Section` Surface, edit-through, cycle-safe. I3a ships the collapsed atomic chip + insertion + sync only.

## Self-review (author)
- **Consistency with unify:** marker = `{{ref:<edgeId>}}` (edge id, not a URL); chip = custom decoration resolving edge→target; NO `xmlTags`/markdown. Matches `design.md §1/§3` + `design-references.md` (post-gate).
- **Reuse (re-derived, not carried):** the `@`-picker UI + node-query (`popover`/`EditorMenuProvider`, à la `useLinkQuery` but not its insert); the `dx-anchor` chip visual. `xmlTags` explicitly NOT used.
- **Integration honesty:** Task 2 is the de-risk (chip render + atomic); Task 3's popover is manual-verified (not jsdom-synthesizable), mirroring Plan 2e's drag decision; both have explicit BLOCKED-escalation points.
- **Placeholders:** none — helpers/tests are concrete; the CodeMirror recipe is specified; the two genuinely-manual/integration points are flagged, not faked.
