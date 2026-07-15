<!-- derives-from: []; role: target; status: current -->

# Bramble DXOS plugin — issues ledger

Broad tracker of open bugs, deferred work, and TBD items for the plugin build (branch
`claude/plugin-bramble-substrate`, DXOS worktree, never merged). The references-specific tracker is
[`references-issue-ledger.md`](./references-issue-ledger.md); this is the project-wide ledger.

Status vocab: `OPEN` (bug, unfixed) · `DESIGN` (needs a decision before build) · `DEFERRED` (known,
parked) · `IN-PROGRESS` · `DONE`. Hypotheses about root cause are marked **hyp** and are unverified.

---

## A. Smoke-test bugs — Composer app (`:5174`, 2026-07-14)

Found by Steve driving the real Composer integration. This path is **stubbed in Storybook** (spies for
open-beside + the Related surface; the app-framework layout/nav/create flow is absent), so the green
gate (unit 66/66, storybook 22/22) never exercised any of these. They are the integration the plans
explicitly marked "not storybook-gated."

### A1 — New Bramble: no focus cursor on create  · OPEN · bug
- **Symptom:** creating a new Bramble shows no caret; must click around to find where to type, and it
  doesn't always work.
- **hyp:** the create flow doesn't focus the header/first-row editor on mount. `capabilities/create-object.ts`
  adds the Node (`makeNode` → `SpaceOperation.AddObject`) but places no focus; `OutlineController`'s focus
  handling is intra-outline only (post-gesture), not "focus on first open". Needs investigation of how a
  freshly-opened surface receives focus.

### A2 — Created Bramble has no left-nav presence  · OPEN · bug
- **Symptom:** created a Bramble 3×; none appear in the left navigation.
- **hyp:** the created `Node` is added to the space but never surfaced in the navtree. `BramblePlugin.tsx`
  contributes schema + surface + create-object + translations, but **no app-graph / navtree module** and the
  `Node` type may lack the label/icon metadata the navtree renders. Needs investigation: does `AddObject`
  place it in a navigable collection, and what does a plugin whose created objects appear in nav contribute
  that bramble doesn't? Interacts with A3 (creating many is itself the smell).

### A3 — Bramble should be a singleton — 1 per space  · DESIGN (Steve)
- **Ask:** one Bramble root per space, not an unbounded set of Nodes. Create becomes **get-or-create**; "the
  Bramble" needs a stable per-space identity.
- **Open questions:** what *is* the singleton — a designated root Node, or a Bramble wrapper object? How does
  nav show it (A2)? What happens to the multiple Nodes already created in testing? Needs a design decision
  before build; couples to A1 (focus on open) and A2 (nav).

### A4 — Embed live-update lags until Enter  · OPEN · bug · HIGH
- **Symptom:** embed node X in node Y; edit X → Y reflects the edit only after **Enter**, not per keystroke.
  Expected: **each keystroke** updates Y.
- **Why it matters:** this is the exact Tana `IX-immediate` behavior ("edit X → every place showing X updates
  without a manual refresh") that motivated the entire references slice.
- **Why the gate missed it:** Storybook `MentionLive` passed — but it drove a *programmatic* `Obj.update`, not
  per-keystroke typing through the editor. So the gap is specifically the **editor → ECHO commit cadence**:
  **hyp** the CodeMirror↔automerge text binding (`createDataExtensions` / `Doc.createAccessor`) batches or
  defers the commit (throttle, or on certain events), so Y's reactive re-render (which drives the chip/embed
  refresh) doesn't fire until the change lands — and Enter forces a commit. Needs investigation of the
  text-binding commit timing; possibly a debounce to remove, or Y should observe X's live doc rather than the
  committed ECHO value. Cross-ref references-ledger I3c (which closed the *programmatic* case as satisfied).

### A5 — Option-click embedded mention: double behavior + wrong-looking panel  · OPEN · bug
- **A5a (double handling):** Option-clicking the chip shows a **popup menu** AND opens the inline expand panel.
  The popup is unexpected. **hyp:** the chip renders as a `<dx-anchor>` (`mention-extension.ts` ChipWidget),
  which the platform's preview/anchor mechanism (plugin-preview's `DX_ANCHOR_ACTIVATE`) also reacts to — so
  two click handlers fire on the one chip. Our `mentionClicks` `mousedown` `preventDefault` may not suppress
  the platform anchor handler.
- **A5b (visual):** the inline secondary-view panel looks wrong (screenshot pasted 2026-07-14). It renders the
  target's **full `NodeOutline` including a page-scale header** (the target title "this is 3.1 iajshd jas"
  shown as a large H1) plus its children, unbounded and oversized for an inline embed, set off by a vertical
  rule so it reads like a big side panel rather than a compact in-line expansion. **Root:** the inline-expand
  direct-mounts `<NodeOutline subject={target}/>`, which carries the whole outline chrome (large header, full
  width); `NodeOutline` does not adapt to a compact/embedded `role`. The `.bramble-secondary` bounding
  (max-height/scroll/indent) doesn't tame the header scale. Needs a compact/embedded render mode for the
  secondary view (smaller header, tighter chrome).

---

## B. Task chips (filed, not started)

- **`task_6f306a6e` — Dedup per-row linked-edges query** (perf). `RowEditor` and `MentionExpansions` each run
  the same `useQuery(...sourceOf(Edge))` per row → two live subscriptions where one would do; compounds with
  expansion depth. From the I3b review (Important #2). Not blocking.
- **`task_7ea83f8b` — Guard structural-edge dangling traversal** (latent crash). `Relation.getSource`/`getTarget`
  *throw* on a dangling edge; the I4 fix routed only the *linked*-edge paths through `tryGet*`. The
  *structural* traversal (outline building, zoom-root resolution, cycle check) is still unguarded. Pre-existing;
  from the I4 review. Not blocking (rarely reachable).

---

## C. Deferred within the references build

- **open-beside `pivotId` adjacency:** v1 dispatches `LayoutOperation.Open` and opens a plank, but not
  guaranteed *immediately* adjacent (no current context id threaded to the surface). (I3b-2)
- **Co-location UX:** the I2 substrate (multi-parent + cycle guard) is built, but the UX — an add-parent picker
  and rendering a Node at multiple locations — is unbuilt. (references-ledger I2)
- **Real Composer integration unverified end-to-end** before this smoke test — the source of A1–A5. The
  open-beside dispatch and the Related/backlinks surface are build-gated only.

---

## D. TBD in the docs (open elsewhere in the flow)

- **S2 neutral spec status:** `IX` = `draft`, `PX` = `authoring` in the FLOW pipeline; both files are
  content-complete (no TODO/placeholder). Promotion to done is a **review/label** act, not authoring. Also a
  FLOW label inconsistency (`draft` isn't a legal pipeline status value). See [FLOW.md](../../FLOW.md) pipeline.
- **Tana R reference live-checks:** lifecycle + pointer (2026-07-12); several `[live-check pending]` in
  `implementations/tana/` (indent, outdent, collapse-arrow expand, breadcrumb-click navigate, plain-click
  reference) — close by driving the `tanawithclaude` workspace.
- **R visual layer:** computed-style capture / non-text nodes — deferred. Visual diff of the plugin surface
  deferred to post-plugin.
- **Font:** the non-plain (Inter) font is a shared `@dxos/ui-theme` change (out-of-plugin), deferred.
- **Process-fix propagations pending:** references-ledger decision-log `#4`/`#7` proposed fixes; a couple of
  "recording pending" doc items (the D1 co-location-vs-Tana deviation; the N1 distinct-relationships finding).

---

## Notes

- **The green gate did not cover A1–A5.** Storybook exercises the in-plugin logic with `withClientProvider`;
  the app-framework create/nav/layout/anchor flow — where all five smoke-test bugs live — is absent there.
  Any fix for A1–A5 needs verification in the running Composer app (`:5174`), not only Storybook.
- Priority call (Steve's): A4 (live embed) and A5 (visual + double-click) are the reference-behavior
  regressions; A1/A2/A3 are create/nav/singleton and interrelated.
