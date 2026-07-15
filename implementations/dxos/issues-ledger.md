<!-- derives-from: []; role: target; status: current -->

# Bramble DXOS plugin — issues ledger

Ticket tracker for the plugin build (branch `claude/plugin-bramble-substrate`, DXOS worktree, never
merged). References-specific design items live in [`references-issue-ledger.md`](./references-issue-ledger.md).
Each ticket has a unique `BR-<n>` id. `Status`: open · design · deferred · done. Root-cause guesses are
marked **hyp** (unverified). Next id: **BR-18**.

> The green gate (unit 66/66, storybook 22/22) never covered BR-1…BR-6: Storybook runs the in-plugin
> logic under `withClientProvider`; the app-framework create / nav / layout / anchor flow — where those
> bugs live — is absent there. Fixes for them must be verified in the running Composer app (`:5174`).

## Resolution protocol

Resolving any ticket requires, as part of the work (not just a code patch):
1. **Root-cause assessment** — the actual cause, not the symptom. Investigate and cite state before proposing.
2. **Proposed fixes, naming the flow direction.** A fix may move **up** the flow (amend the neutral spec `S1`/`S2`,
   the `S4` design, or `references-issue-ledger`) or **down** (change the `S5` plan / `S6` build) — say which. Don't
   default to a code patch when the root cause is a spec/design gap.
3. **If a fix needs Steve** (a design or scope decision) and he's unavailable, **turn that fix into a new ticket**
   (`BR-<n>`) linked back to the originating ticket (`from: BR-<x>`), rather than guessing. The originating ticket
   notes `blocked-by: BR-<n>`.

---

## BR-1 — New Bramble: no focus cursor on create
`Status: open` · `Type: bug` · `Source: smoke test :5174 (2026-07-14)`
- Symptom: creating a new Bramble shows no caret; must click around to find where to type, and it doesn't
  always work.
- **hyp:** the create flow doesn't focus the header/first-row editor on mount. `capabilities/create-object.ts`
  adds the Node (`makeNode` → `SpaceOperation.AddObject`) but places no focus; `OutlineController` handles only
  intra-outline (post-gesture) focus, not focus-on-first-open. Investigate how a freshly-opened surface takes focus.

## BR-2 — Created Bramble has no left-nav presence
`Status: open` · `Type: bug` · `Source: smoke test :5174 (2026-07-14)`
- Symptom: created a Bramble 3×; none appear in the left navigation.
- **hyp:** the created `Node` is added to the space but never surfaced in the navtree. `BramblePlugin.tsx`
  contributes schema + surface + create-object + translations, but **no app-graph / navtree module**, and the
  `Node` type may lack the label/icon metadata the navtree renders. Investigate: does `AddObject` place it in a
  navigable collection, and what does a nav-visible plugin contribute that bramble doesn't? Interacts with BR-3.

## BR-3 — Bramble should be a singleton — 1 per space
`Status: design` · `Type: design decision (Steve)` · `Source: smoke test :5174 (2026-07-14)`
- Ask: one Bramble root per space, not an unbounded set of Nodes. Create becomes **get-or-create**; "the Bramble"
  needs a stable per-space identity.
- Open questions: what *is* the singleton — a designated root Node, or a Bramble wrapper object? How does nav show
  it (BR-2)? What happens to Nodes already created in testing? Needs a decision before build; couples to BR-1/BR-2.

## BR-4 — Embed live-update lags until Enter (should be per-keystroke)
`Status: open · diagnosed (write-path ruled out; fix needs live repro)` · `Type: bug · HIGH` · `Source: smoke test :5174 (2026-07-14)`
- Symptom: embed node X in node Y; edit X → Y reflects the edit only after **Enter**, not per keystroke.
  The exact Tana `IX-immediate` behavior that motivated the whole references slice.
- **Investigation (2026-07-14):**
  - **Write path RULED OUT.** The CM↔automerge binding writes on *every* change — `ui-editor/.../automerge.ts:97-105`
    reconciles CM→automerge on each non-empty doc change, no throttle/debounce. So X's automerge doc updates per
    keystroke; the lag is **not** a write-side debounce.
  - **Suspect: the observation / re-render side.** Y's chip label refreshes only when Y's `RowEditor` re-renders
    (its `labelMap` recomputes → `refreshChips`). Y's `useQuery` is over **Y's own** outgoing edges; editing **X's**
    text changes neither Y's edge set. A **membership** change (Enter → `createEdge`) *does* re-render Y's query →
    the chip refreshes — matching "until I hit Enter."
  - **Unresolved tension (do not overclaim):** storybook `MentionLive` drives `Obj.update(X.text)` and the chip DID
    update — so `Obj.update` and a CM→automerge write appear to trigger **different** reactivity (Obj.update fires
    ECHO's reactive notify; the raw automerge handle-change may not). I have **not** pinned the exact ECHO mechanism.
- **⚠ Casts doubt on I3c.** BR-4 is the live manifestation of review finding **C2**, which I closed in I3c as a
  "false positive." `MentionLive` likely gave a **false pass** (Obj.update ≠ per-keystroke CM write). **I3c should be
  reopened** (see references-ledger); its deferred `Obj.subscribe` fix — or observing the target's live automerge
  handle `change` (the signal the editor itself uses) and firing `refreshChips` — is the candidate fix.
- **Blocked on:** live-app reproduction (or deeper ECHO-reactivity spelunking) to pin the mechanism + verify a fix —
  the storybook harness gives a false pass, so a fix can't be verified there. Not shipping a speculative fix under
  the current loaded env; needs a proper repro. Flow direction of the eventual fix: **down / build** (in-plugin,
  RowEditor observes the target's live text), unless the ECHO asymmetry turns out to be an upstream bug (→ new ticket).

## BR-5 — Option-click chip double-handles (popup menu + expand panel)
`Status: fixed (storybook re-verify pending)` · `Type: bug` · `Source: smoke test :5174 (2026-07-14)` · `Fix: dbf5797145`
- Symptom: Option-clicking the chip shows a **popup menu** AND opens the inline expand panel.
- **Root cause (confirmed):** the `dx-anchor` custom element (`packages/ui/lit-ui/src/dx-anchor/dx-anchor.ts:37-43`)
  auto-wires its own `click` → `DxAnchorActivate` dispatch on `connectedCallback`; `plugin-preview` listens for
  `DX_ANCHOR_ACTIVATE` and opens a preview popover. Our `ChipWidget` rendered a `<dx-anchor>` with no `dxn` (we set
  `data-edge-id`), so **every** click fired an empty-`dxn` preview popover alongside bramble's option-click expand.
- **Fix (flow: down / build, in-plugin):** render the chip as a `<span class="dx-tag--anchor" role="button">` — same
  visual class (`.dx-tag--anchor` is a plain class selector, works on any element), no platform click behavior;
  bramble owns the chip's semantics via `mentionClicks`. Updated `mentionClicks` + all story selectors to the
  tag-agnostic `[data-edge-id]`.
- **Verification:** build + lint green. Storybook behavioral re-run blocked by env load (~54; mass-flake — runner
  missing-file + unrelated stories failing to render). Re-run in a clean env to confirm; the popup-absence itself
  isn't storybook-testable (no `plugin-preview` there) — needs the Composer app (`:5174`).

## BR-6 — Inline embed panel oversized / wrong-looking
`Status: partial fix (storybook re-verify pending)` · `Type: bug` · `Source: smoke test :5174 (2026-07-14, screenshot)` · `Fix: 0f8d06884f`
- Symptom (screenshot): the inline secondary-view panel renders the target's **full `NodeOutline` including a
  page-scale H1 header** plus children, unbounded — reads like a large side panel, not a compact expansion.
- **Root cause:** the inline-expand direct-mounts `<NodeOutline subject={target}/>`, which carries the full outline
  chrome; the header is `.bramble-outline-header .cm-content { font-size: 29px !important }` (Tana page-title scale).
- **Fix applied (flow: down / build, CSS):** scope `.bramble-secondary .bramble-outline-header .cm-content` down to
  17px/500 so the embed's header reads as an inline line, not a title. `MentionExpand` story asserts the embedded
  header font-size < 20px.
- **Remaining (→ BR-17 visual pass):** this fixes the glaring header scale only; the panel's placement, width, and
  chrome fidelity vs Tana still need the visual-integrity check. **Verification:** build + lint green; storybook
  measurement pending a clean env.

## BR-7 — Dedup per-row linked-edges query
`Status: open` · `Type: perf` · `Source: I3b review (was task chip task_6f306a6e)`
- `RowEditor.tsx` (~line 42, for chip labels) and `MentionExpansions.tsx` (~line 22, for expanded mentions) each
  run `useQuery(controller?.db, Query.select(Filter.id(node.id)).sourceOf(Edge)).filter(e => e.kind === 'linked')`
  for the same node → two live subscriptions per row where one would do; compounds with expansion depth (each
  nested outline mounts a fresh `RowEditor` + `MentionExpansions` pair per row).
- Fix: compute the node's linked edges once and share — lift the query into `OutlineRow` and pass both components
  a prop, or expose it via a shared hook / the row model. **Caveat:** `NodeOutline` renders `RowEditor` +
  `MentionExpansions` for the zoom-root **directly** (not via `OutlineRow`), so the sharing mechanism must cover
  that path too. Verify with `moon run plugin-bramble:{test,test-storybook -- NodeOutline,build,lint}`. Not blocking.

## BR-8 — Guard structural-edge dangling traversal
`Status: FIXED` · `Type: bug (latent)` · `Source: I4 review (was task chip task_7ea83f8b)` · `Fix: 143430e71a`
- **Done (flow: down / build):** routed `outlineRows` (both sites), `wouldCreateCycle`, and NodeOutline's zoom-root
  resolution through `tryGetTarget`/`tryGetSource`, skipping a dangling edge. Node unit test (`outline.test.ts`)
  removes a structural child while its edge survives and asserts `outlineRows` skips it, not throws — **passes**
  (build + lint green; verified via the node test, robust under the loaded env).
- `Relation.getSource`/`getTarget` *throw* (not return undefined) when an endpoint can't resolve — e.g. a node was
  deleted while its edge survives (`db.remove` has no relation cascade). The I4 fix added `tryGetTarget`/`tryGetSource`
  (try/catch → undefined) in `src/model/edges.ts` and routed only the **linked**-edge render paths through them
  (`BacklinksPanel`, `backlinks()`, `MentionExpansions`, `RowEditor`).
- Still unguarded — the **structural**-edge traversal paths, which would throw on a dangling structural edge:
  `components/NodeOutline/NodeOutline.tsx` (~lines 58, 69, zoom-root resolution via `Relation.getTarget`);
  `model/outline.ts` (`outlineRows` building); `model/edges.ts` (~line 65, `wouldCreateCycle`'s ancestor walk via
  `Relation.getSource`).
- Less reachable than the linked case (the outline's delete gestures remove a node's structural edge when deleting
  it), but the same latent crash class. Fix: route those calls through `tryGetTarget`/`tryGetSource` + a regression
  story where a structural child's node is removed but its edge survives, asserting the outline renders without
  crashing. Verify with `moon run plugin-bramble:{test,test-storybook -- NodeOutline,build,lint}` (no competing moon jobs).

## BR-9 — open-beside exact adjacency (pivotId)
`Status: deferred` · `Type: enhancement` · `Source: I3b-2`
- v1 dispatches `LayoutOperation.Open` and opens a plank, but not guaranteed *immediately* adjacent (no current
  context id threaded to the surface). Thread the pane's context id as `pivotId` for true adjacency.

## BR-10 — Co-location UX (add-parent picker, multi-location render)
`Status: deferred` · `Type: feature` · `Source: I2`
- The I2 substrate (multi-parent + cycle guard) is built, but the UX — an add-parent picker and rendering a Node
  at multiple locations — is unbuilt.

## BR-11 — S2 neutral spec status promotion
`Status: open` · `Type: docs` · `Source: FLOW pipeline`
- `IX` = `draft`, `PX` = `authoring`, but both files are content-complete (no TODO/placeholder). Promotion to done
  is a **review/label** act, not authoring. Also fix the FLOW label inconsistency (`draft` isn't a legal pipeline
  status value). See [FLOW.md](../../FLOW.md).

## BR-12 — Tana R reference live-checks
`Status: open` · `Type: verify` · `Source: FLOW (2026-07-12)`
- Lifecycle + pointer live-checks open; several `[live-check pending]` in `implementations/tana/` (indent, outdent,
  collapse-arrow expand, breadcrumb-click navigate, plain-click reference) — close by driving the `tanawithclaude`
  workspace.

## BR-13 — R visual layer + plugin visual diff
`Status: deferred` · `Type: verify` · `Source: FLOW`
- Computed-style capture / non-text nodes deferred; visual diff of the plugin surface deferred to post-plugin.

## BR-14 — Non-plain font (Inter)
`Status: deferred` · `Type: enhancement` · `Source: FLOW`
- The non-plain (Inter) font is a shared `@dxos/ui-theme` change (out-of-plugin), deferred.

## BR-15 — Pending process-fix propagations + doc recordings
`Status: open` · `Type: docs` · `Source: references-issue-ledger`
- references-ledger decision-log `#4`/`#7` proposed fixes still to apply; a couple of "recording pending" doc items
  (the D1 co-location-vs-Tana deviation; the N1 distinct-relationships finding).

## BR-16 — Heterogeneous typed rows / Composer-native instances as nodes (designed, not built)
`Status: open` · `Type: design gap (needs decision)` · `Source: design review 2026-07-14`
- The design treats a Composer native typed object (Person / Task / Document / Sketch …) as a **node** in the
  outline, rendered by its own type's Section Surface; the build is a **homogeneous** outline of bramble `Node`s.
- **Spec — accommodates (abstract):** `IP-1.content-type` (open content types) + `IP-1.typed-node` ("a Node that
  carries a schema-type … the typed Node is a Node like any other," citing DXOS ECHO types). Doesn't pin identity —
  whether a pre-existing Composer object instance *is* the node or a bramble wrapper.
- **Design — explicit:** `design.md` §2 — "Typed-object node (Person / Task / Document / Sketch …) → the object's
  Section Surface `<Surface … data={{ subject: node }} />`"; "heterogeneous typed rows … the key net-new
  composition"; the plain `Node` is only the *fallback* Section surface.
- **Built — no:** every row renders via `RowEditor` (CodeMirror bound to `Node.text`); `OutlineRow` has no per-row
  Surface branch. The `@`-picker queries `Filter.type(Node)` (can't target Composer objects); edges, `makeNode`, the
  embed (`<NodeOutline subject={target}/>`), and backlinks are all bramble-`Node`-typed.
- **Why it matters:** underneath BR-2 (a bare Node has no nav identity; a typed object would), BR-3 (the singleton
  question only exists because a "Bramble" is a loose bag of Nodes, not typed objects in the space), and the mention
  scope (references can only point at bramble Nodes). Reshapes what "a node" *is* — settle before the BR-1/2/3
  create-nav-singleton cluster.

## BR-17 — Visual integrity check (Tana reference ↔ Composer implementation) not done
`Status: open` · `Type: verify / process` · `Source: smoke test 2026-07-14`
- The `visual-verification` skill (extract computed styles from the reference + the running DOM, diff
  deterministically) exists, and a PX check ran **once** against the **Storybook** outline surface
  (`composer-outline.json` mapping, 8 PX regions, both themes — `design.md` §Visual conformance, 2026-07-13).
- But the **running Composer implementation** (`:5174`) has never been visually checked against the Tana reference
  (`implementations/tana/visual-spec.md`), and the **references surfaces** (mention chip, inline embed panel,
  backlinks panel) were built *after* that check and have **no visual mapping or verification at all** — BR-6 (the
  oversized / wrong-looking embed panel) is direct evidence the fidelity is off.
- Fix: run the visual-verification loop against the Composer app surfaces (outline, chip, embed, backlinks) with the
  Tana visual-spec as reference; author mappings for the new references surfaces; capture each delta as its own ticket.
