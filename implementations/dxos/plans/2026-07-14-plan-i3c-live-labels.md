<!-- derives-from: [IX-immediate, UP-4, UP-5]; role: target; status: draft -->

# I3c — Live mention labels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking. This is a single-file change (`RowEditor.tsx`) plus one storybook test — execute inline.

**Goal:** An inline mention's chip shows the target's title **live** — editing the target Node anywhere updates every chip that mentions it, with no manual refresh.

**Architecture:** The chip label is already resolved through `edge → target → content`, but the resolution is cached in a `useMemo` keyed on the row's own linked-edge set, so a change to a *target* Node (two hops away, in-place) never invalidates it. Two changes fix this: (1) resolve the label **live** at decoration-build time (hold the target `Node`, read `.content` when the chip rebuilds, don't cache the string); (2) subscribe to each mentioned target's `Text` via `Obj.subscribe` and dispatch the existing `refreshChips` effect on change. `Obj.subscribe` (from `@dxos/echo`) returns an unsubscribe and fires on any mutation of the target's `Text` object — the canonical ECHO "react to a live field" primitive (precedent: `echo-solid/src/useObject.ts:320-332` maintains a `Map<id, unsubscribe>` per target; `plugin-inbox/.../Message.tsx:208` subscribes to fire a side-effect that `useQuery` misses).

**Tech Stack:** React, CodeMirror 6 (`StateEffect` `refreshChips`, already defined in `mention-extension.ts`), ECHO (`Obj.subscribe`, `Relation.getTarget`), Storybook play tests (`moon run plugin-bramble:test-storybook`).

## Global Constraints

- **Spec req:** `IX-immediate.gesture` (`spec/interaction-primitives.mdl:150`) — "where the changed Node is shown in more than one place, every place reflects the change without a manual refresh." A mention chip is such a place.
- **Corrected-model constraint (do NOT re-drift):** the marker is an edge-referencing token `{{ref:<edgeId>}}`; the chip is a custom CodeMirror decoration resolving `marker → Edge → target → live label`. No `xmlTags`, no markdown link. (`design-references.md`, `design.md §1/§3`.)
- **Runners are `moon`**, never raw vitest: `moon run plugin-bramble:{test,test-storybook -- <Story>,build,lint}`. Run from `/Users/san/sandbox/dxos/.claude/worktrees/plugin-bramble-substrate`.
- **Branch** `claude/plugin-bramble-substrate` (DXOS worktree); NEVER merge to main; NEVER stage `.changeset/config.json` or `.claude/launch.json`.
- **Story seeding gotcha:** set `Text` content via `Obj.update(t, (t) => { t.content = … })`, never direct assignment.

---

### Task 1: Live chip labels via per-target subscription

**Files:**
- Modify: `packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx`
- Test: `packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx` (new `MentionLive` story + fixture)

**Interfaces:**
- Consumes (from I1/I3a, unchanged): `Edge`, `Relation.getTarget`, `createLinkedEdge`, `createEdge`, `makeMarker`, `mentionChips`, `refreshChips` (`StateEffect<null>`).
- Consumes (new): `Obj.subscribe(obj, () => void): () => void` from `@dxos/echo` — fires on any mutation of `obj`; returns an unsubscribe.
- Produces: no new exported symbols; behavior change only.

- [ ] **Step 1: Write the failing test — a new `MentionLive` story + fixture.**

Add to `NodeOutline.stories.tsx`. The fixture seeds X as its **own structural row** under root AND mentioned by Y, so the play test can edit X's row and watch Y's chip. `Obj` is already imported in this file.

```tsx
// Seeds Root → { X ("hello world"), Y }, plus a LINKED edge Y→X so Y's text mentions X. Because X is
// also a structural child, it has its own editable row — editing it must update Y's chip live (IX-immediate).
const MentionLiveStory = () => {
  const [space] = useSpaces();
  const root = useMemo(() => {
    if (!space) {
      return undefined;
    }
    const db = space.db;
    const r = db.add(makeNode({ text: 'Root' }));
    const x = db.add(makeNode({ text: 'hello world' }));
    const y = db.add(makeNode({ text: 'begin  end' }));
    void createEdge(db, r, x, 1); // structural: X is its own row under root
    void createEdge(db, r, y, 2); // structural: Y under root
    const linked = createLinkedEdge(db, y, x); // linked: Y mentions X
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

export const MentionLive: Story = {
  render: () => <MentionLiveStory />,
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = () => canvasElement.querySelector('dx-anchor[data-edge-id]');
    // The chip starts at X's title.
    await waitFor(() => {
      if (chip()?.textContent !== 'hello world') {
        throw new Error('chip not at initial label yet');
      }
    });
    // Edit X's own row (rows[0], order 1); Y's chip (rows[1]) must update WITHOUT a manual refresh.
    const rows = await canvas.findAllByTestId('bramble-node-name');
    await expect(rows[0]).toHaveTextContent('hello world');
    const xContent = rows[0].querySelector<HTMLElement>('.cm-content')!;
    xContent.focus();
    await userEvent.keyboard('{End}y');
    await waitFor(() => {
      if (chip()?.textContent !== 'hello worldy') {
        throw new Error('chip did not update live');
      }
    });
    await expect(chip()).toHaveTextContent('hello worldy');
  },
};
```

- [ ] **Step 2: Run the test to verify it FAILS.**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: `MentionLive` FAILS at "chip did not update live" — the chip stays `hello world` after editing X, because the label is cached on the linked-edge set (which doesn't change when X's content mutates).

- [ ] **Step 3: Make the label resolve LIVE.** In `RowEditor.tsx`, replace the string-cached `labelMap` with a target-`Node` map, and read `.content` live in `resolveLabel`.

Replace:
```tsx
  const labelMap = useMemo(
    () => new Map(linkedEdges.map((e) => [e.id, (Relation.getTarget(e) as Node).text?.target?.content ?? '…'])),
    [linkedEdges],
  );
  const labelMapRef = useRef(labelMap);
  labelMapRef.current = labelMap;
  const resolveLabel = useCallback((edgeId: string) => labelMapRef.current.get(edgeId) ?? '…', []);
```
with:
```tsx
  // Hold the target Node (identity stable per linked-edge set) and read its title LIVE when a chip
  // rebuilds — so a `refreshChips` dispatch always reflects the target's current content.
  const targetMap = useMemo(
    () => new Map(linkedEdges.map((e) => [e.id, Relation.getTarget(e) as Node])),
    [linkedEdges],
  );
  const targetMapRef = useRef(targetMap);
  targetMapRef.current = targetMap;
  const resolveLabel = useCallback(
    (edgeId: string) => targetMapRef.current.get(edgeId)?.text?.target?.content ?? '…',
    [],
  );
```

- [ ] **Step 4: Point the existing refresh effect at `targetMap`.** The effect that rebuilds chips when the mention SET changes (new/removed chip) keyed on `labelMap` must now key on `targetMap`.

Replace:
```tsx
  useEffect(() => {
    view?.dispatch({ effects: refreshChips.of(null) });
  }, [view, labelMap]);
```
with:
```tsx
  useEffect(() => {
    view?.dispatch({ effects: refreshChips.of(null) });
  }, [view, targetMap]);
```

- [ ] **Step 5: Subscribe to each mentioned target's text; refresh chips on change.** Add, near the other effects in `RowEditor.tsx` (after the refresh effect). Keyed on the edge-id set so it only re-subscribes when the mention set changes, not every render.

```tsx
  // Live labels (IX-immediate): a target's title can change with no change to THIS row's linked-edge
  // set, and `useQuery` won't react to that in-place, two-hops-away edit. Subscribe to each target's
  // Text directly and rebuild the chips on change. Re-subscribes only when the mention set changes.
  const linkedEdgeKey = linkedEdges.map((e) => e.id).join(',');
  useEffect(() => {
    if (!view) {
      return;
    }
    const unsubscribers = linkedEdges
      .map((e) => {
        const target = (Relation.getTarget(e) as Node).text?.target;
        return target ? Obj.subscribe(target, () => view.dispatch({ effects: refreshChips.of(null) })) : undefined;
      })
      .filter((u): u is () => void => !!u);
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
    // linkedEdgeKey captures the mention set; linkedEdges' array identity churns every render.
  }, [view, linkedEdgeKey]); // eslint-disable-line react-hooks/exhaustive-deps
```

Add `Obj` to the existing `@dxos/echo` import:
```tsx
import { Filter, Obj, Query, Relation } from '@dxos/echo';
```

- [ ] **Step 6: Run the test to verify it PASSES.**

Run: `moon run plugin-bramble:test-storybook -- NodeOutline`
Expected: `MentionLive` PASS (chip becomes `hello worldy`); all other NodeOutline stories still pass, including `Mention` (initial label) and `MentionPicker`.

- [ ] **Step 7: Full gate.**

Run: `moon run plugin-bramble:build` — expect clean.
Run: `moon run plugin-bramble:lint` — expect clean (if the `exhaustive-deps` disable is rejected by the repo's config, instead memoize the target list into a `useMemo` and key the effect on `linkedEdgeKey` without the disable; do NOT add `linkedEdges` to deps — it churns every render).
Run: `moon run plugin-bramble:test` — expect 65/65 (unit tests unaffected).

- [ ] **Step 8: Commit.**

```bash
git add packages/plugins/plugin-bramble/src/components/NodeOutline/RowEditor.tsx \
        packages/plugins/plugin-bramble/src/components/NodeOutline/NodeOutline.stories.tsx
git commit -m "feat(plugin-bramble): live mention labels — chip updates when its target changes (I3c)

The chip label was cached on the row's own linked-edge set, so editing a *target* Node (two hops
away, in-place) never refreshed it. Resolve the label live at decoration-build time and subscribe to
each mentioned target's Text via Obj.subscribe, dispatching refreshChips on change. Realizes
IX-immediate for the inline mention (a place where the target is shown)."
```

---

## Self-Review

- **Spec coverage:** `IX-immediate.gesture` clause "every place reflects the change without a manual refresh" — the `MentionLive` test edits the target and asserts the chip updates. ✓
- **Placeholder scan:** none. All steps carry concrete code.
- **Type consistency:** `targetMap`/`targetMapRef`/`resolveLabel` renamed consistently; the refresh effect and both refs updated together. `Obj.subscribe` signature matches the Explore finding (`(obj, cb) => () => void`).
- **Post-plan:** update `references-issue-ledger.md` (I3c state → BUILT; resume point) and `FLOW.md` S6 row. If the whole slice warrants it, run a whole-branch review; otherwise the single-file change + its play test is the gate.
