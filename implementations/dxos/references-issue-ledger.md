<!-- derives-from: [UP-1, UP-2, UP-4, IP-2, IP-3, IX-direct, IX-inflow, IX-immediate]; role: target; status: current -->

# References / embed / backlinks — issue ledger

Living tracker for the reference-slice design effort (opened 2026-07-14). Several threads got
braided together; this separates them so they're worked one at a time. Some issues touch the
**neutral spec** (`spec/`), some the **Bramble design/target**, some the **build** — noted per item.
Source discussion: the design-references thread; the standing proposal is `design-references.md`.

**States:** `OPEN` (needs a decision) · `PROPOSED` (I proposed; awaiting ack) · `DECIDED` (chosen;
needs recording) · `ASSESS` (needs an empirical live-Tana check) · `BLOCKED` (on upstream items) ·
`BUILT` (done).

**Dependency order:** settle the model + stance (N1–N4, T1, B1) → record the deviation (D1) → fix the
method (P1, now informed by the model) → build (I1–I4). I2 is already done.

## ▶ RESUME POINT (2026-07-14 — survives compaction)

**I3a (mention insertion) + I3c (live labels, false positive) + I3b (secondary view — both UP-5
placements) COMPLETE + whole-branch review-clean.** **NEXT = `I4` (backlinks panel) — the last references
item.** Plans under `plans/` (`…-plan-i3a-…`, `…-plan-i3c-…`, `…-plan-i3b1-inline-expand`, `…-plan-i3b2-open-beside`).

**I3b outcome:** Option-click a chip → the target's outline expands inline (bounded, live, edit-through,
cycle-safe via `ExpansionPathContext`); Shift-click → opens the target alongside (`LayoutOperation.Open`).
Built inline over 5 tasks + review fixes (commits `39cbdfa70e..2e218986b6`); gate green (test 66/66,
storybook 20/20). Inline-expand direct-mounts `<NodeOutline subject={target}/>` (Steve-approved deviation
from `<Surface>` — testability). One deferred perf item (duplicate per-row query, task `task_6f306a6e`).

**I3c outcome:** the review's C2 ("chip label not live") did not reproduce — a substrate-level `Obj.update`
of a non-rendered mentioned target already updates the chip (ECHO query reactivity re-renders the row +
recomputes the label). Closed with the `MentionLive` regression test (dxos commit `d64dfae3d7`); no
production change (Steve chose A / YAGNI).

**I3a commits (branch `claude/plugin-bramble-substrate`, DXOS worktree, NEVER merged):**
- T1 `7ef2795da0` (controller.db + NodeOutline structural filter) · T2 `34f2769cdf` (`mention-extension.ts`
  — `{{ref:id}}` marker + custom chip decoration; de-risk PROVEN by the `Mention` story) · T3 `8ffff0ec37`
  (`useMentionPicker` @-picker → `createLinkedEdge` + insert `makeMarker(edge.id)`; `EditorMenuProvider`
  wrapper) · T4 `46540e2bae` (`staleEdgeIds` + `RowEditor` `updateListener` → `removeEdge`).
- Whole-branch review (base `6697742093`) → 3 findings, ALL verified against source:
  - **C1 (picker keyboard) FIXED `2fe6e9ddcd`** — the picker popover keymap and `brambleGestures` are
    both `Prec.highest`; array-order breaks the tie, so the row gestures were stealing Enter/Arrow while
    the menu was open (mouse-select hid it). Picker now registered BEFORE gestures in `RowEditor`. The
    popover can't be driven by the storybook runner (synthetic `@` never opens it) → open-menu confirm
    stays MANUAL; the closed-menu fall-through (Enter→new row when no menu) is covered by `EnterCreatesRow`
    et al., now running with the picker-first order.
  - **I3 (delete-sync guard) FIXED `2fe6e9ddcd`** — the listener now acts only on user input/delete
    transactions (plan Task 4 Step 3 mandated this guard; it was omitted). Stops a remote-sync/undo change
    that drops a marker from silently deleting the linked Edge.
  - **C2 (label not live) → carved to `I3c`** (Steve chose A: fix C1+I3 now, carve C2). See `I3c` below.
- Gate green throughout: build · lint · test 65/65 · storybook 15/15.
- **Story seeding gotcha:** set Text content via `Obj.update(t, (t) => { t.content = … })`, never direct
  assignment.

**⚠ CRITICAL corrected-model constraint (do NOT re-drift):** the inline-mention marker is an
**edge-referencing token `{{ref:<edgeId>}}`** in the node's plain text — it references the linked
`Edge` id, NOT a target URL, NOT a markdown link. The chip is a **custom CodeMirror decoration**
(resolve marker → `Edge` → target → live label). **Do NOT use `xmlTags` or add the markdown language** —
that was the pre-unify leftover we caught + scrubbed via the move-down gate (commit `6ee7e7a`; see
`FLOW.md` gate clause 4). Authoritative model: `design.md §1/§3` + `design-references.md`.

**Build state (branch `claude/plugin-bramble-substrate`, DXOS worktree, NEVER merged):**
- **I1 (kind-typed `Edge` model) BUILT** — 5 commits `6f783f2a2b..6697742093`; whole-branch READY; gate
  green (test 61/61, build, lint). `Edge.kind` (structural|linked, `order` optional, v0.2.0);
  `makeLinkedEdge`/`createLinkedEdge` (may-cycle); `backlinks` grouped union (`targetOf`); structural
  ops + `outlineRows` filter `kind='structural'`.
- **I2 (co-location substrate) BUILT** earlier. **I3a executing.** **I3b + I4 pending.**
- I1 whole-branch Minors → folded into I3a Task 1: expose `controller.db` (private today) + filter
  `NodeOutline`'s edge use to structural.

**Durable env:** runners `moon run plugin-bramble:{test,test-storybook -- <Story>,build,lint}` from
`/Users/san/sandbox/dxos/.claude/worktrees/plugin-bramble-substrate`; NEVER raw vitest; NEVER stage
`.changeset/config.json` / `.claude/launch.json`; branch never merged to main. Verified Composer APIs
for I3 are in `design-references.md` (reuse the `@`-picker UI + node-query + `PreviewComponent`/Surface +
`dx-anchor` chip visual — NOT `xmlTags`).

After I3a: **I3c (live labels)** · **I3b (secondary view** — `PreviewComponent`/Surface at inline-expand +
open-beside, cycle-safe) · I4 (backlinks panel). I3c + I3b both need target-node observation (subscribe to
a target's yText → `refreshChips`/re-render) so can be built together or in either order — Steve to sequence.

---

## Process / method
- **P1** — Completeness-method miss + fix (the "U5" move-up). Two root-cause threads:
  - **P1a — output-side sweep.** The method has only *input-side* sweeps (verb set, modality); it lacks
    an *output-side* sweep (render-modes · editability · liveness). Add a 3rd sweep + upgrade the gate.
  - **P1b — family/axis abstraction (added 2026-07-14, Steve).** Why was the *edge-as-open-typed-family,
    capabilities-per-axis* distinction not surfaced earlier — even though `IP-2`/`IP-3` and the intro's
    "`kind` taxonomy over edges" implied it? What is the **reusable pattern** that catches this in future
    (e.g. "when ≥2 primitives share a shape — both directed node→node relations — factor the family:
    name the general abstraction + the distinguishing axes + define capabilities per-axis, so the set
    stays open")? Deliver as a reusable method step, not a one-off.
  - **DONE (2026-07-14):** both drafted into `spec/README` "Spec completeness sweeps" — sweep **4**
    (output-side: render-modes × editability × liveness) and sweep **5** (factor shared-shape families:
    abstraction + axes + capabilities-per-axis; new members declare axes). Delivery gate (`FLOW.md`
    clause 3) extended to check coverage on all three dimensions (concerns · render-modes · edge-axes).
  - *State: DONE.*

## Neutral-spec model (what the primitives ARE)
- **N1** — Two relationships, kept distinct: **subtree-child** (co-location · structural · **acyclic**)
  vs **inline-mention** (reference · in-text · **may-cycle**). **Finding:** the *substrate* already
  distinguishes them textbook-cleanly (`IP-2` vs `IP-3`); the blur was only `UP-4`'s framing + this
  thread's design talk. **Fix (Light, chosen 2026-07-14):** added an *open, typed edge family + per-axis
  capabilities* paragraph to `internal-primitives.mdl`; clarified `UP-4` (shared-identity axis bundles;
  routes differ on containment). `design.md §1/§2` already kept them distinct — no scrub needed;
  `design-references.md` gets revised downstream under N2/I1. **State: DONE (pending Steve's in-place
  review + commit).**
- **N2** — Render-modes & editability of an appearance. **Finding:** most was already specced
  (collapsed-by-default + expand-on-demand + expand-editable + liveness in `IP-3`/`UP-4.embed`). Gaps
  closed: (a) **collapsed mention is atomic** (floor) → new `IX-direct.reference-atomic`; editable-collapsed
  stays above-floor (see T1). (b) **open-in-secondary-view** → new `UP-5`. (c) **"secondary view"**
  unifies the inline-expand (`UP-4.embed`) and the alongside panel (`UP-5`) as ONE artifact, two
  placements — cascades to I3 (one node-view renderer, two mount points). **State: DONE (committed).**
  - `UP-5` corpus status: verified Tana + Roam; Obsidian unconfirmed. Placed in the **body** (Steve's
    call, 2026-07-14) — the gap-analysis probes carry the per-system check.
  - Follow-up (minor): `IX-direct.expand`'s "not a navigation to a separate viewer" now reads as the
    *inline* placement's property; fine as-is, revisit if it confuses against `UP-5.open-beside`.
- **N3** — "Mentioned in" = **union** of subtree-child occurrences + inline-mention occurrences.
  **Fix:** broadened `UP-2.backlinks-view` to the reverse-traversal of inbound edges of **all kinds**,
  **grouped by edge kind** (structural predecessors = where co-located · linked = what mentions it ·
  future kinds each their own group); `UP-2` traces gain `IP-2`. **State: DONE (committed).**
  - Deferred (same class as N1's full-factor): the backlinks view is really a *reverse-traversal-axis*
    capability spanning all edge kinds — not owned by `UP-2` (links). Relocating it to its own concern
    waits until the edge family grows (YAGNI).
- **N4** — "Real node, not shadow" invariant: every appearance of X is the real, editable X (one
  identity, live) — never a Tana read-only shadow. **Finding (2026-07-14):** already stated in IP —
  `IP-2.shared-identity` ("one vertex") + `IP-3.expand` ("the same target vertex, not a copy"). Home =
  `IP`, already there. **State: NEAR-CLOSED — confirm no UP-level restatement needed.**

## Stance / tier
- **T1** — Floor vs ceiling, and where beyond-a-reference-system capability lives. **Resolved:** by noun
  — richer **internal substrate** → `IP` (divergence recorded); a **user capability** no system does →
  **design** (`implementations/dxos`), never the neutral user-capabilities floor; a plausible-but-unverified
  class candidate → **appendix** status. Floor bar = strong-evidence + judgment (not all-3-verified).
  Written up as a "Layers and conformance status" section in `spec/README.md`; facet nouns fully
  parallel (internal substrate · user capabilities · user interaction · user presentation). **State: DONE.**
  - Surfaced (needs Steve): `spec/README.md` decision-log staleness — **#4** ("core 4 user primitives" →
    now 5, `UP-5` added) and **#7** ("interaction mechanics out of scope / separate UX specs" → `IX`/`PX`
    are now neutral facets; only concrete mechanics live in the R realization). Proposed fixes pending.

## Design deviation (Bramble-specific)
- **D1** — "All X-*as-a-node* elsewhere = co-location" (deviation from Tana's owner+reference; real
  multi-parent). **Finding (2026-07-14):** already recorded at both layers — `design.md §1` ("closes the
  owner+reference divergence") + §2:161 (co-locate gesture, "the gesture Tana lacks") + `gap-analysis.md`
  (`IP-2` divergent; `UP-1.multi-location` partial). No new recording needed. **State: DONE (already recorded).**
- **D2** — Propagate N1–N3/T1 **down** to the design layer. **Done (2026-07-14):** rewrote
  `design.md §1` (edges = one kind-typed `Edge`; linked edge = `kind: linked` reified `Edge`, not a
  bare `Ref`; backlinks uniform via `targetOf`), §2 gesture rows (mention = linked `Edge` + marker;
  expand/open-beside), §3 (settled references narrative: atomic mention · secondary-view unification ·
  grouped-union backlinks · cycle-safe expansion), and `design-references.md` (proposal → settled
  sub-design, status → `current`). **State: DONE.**

## Behavior to assess (empirical)
- **B1** — Cycle/recursion in mention-expansion: mentions may-cycle (self/ancestor); expansion needs a
  bounded, on-demand, path-guarded rule. **Finding (2026-07-14):** the rule is already canon —
  `IP-3.may-cycle` + `IP-3.expand` ("expansion is on-demand, so a linked-edge cycle through T does not
  expand unboundedly"). Reduced to: confirm Tana matches (live-check) + honor it in the build.
  **State: ASSESS (confirm-only).**

## Implementation (DXOS build)
- **I1** — Kind-typed `Edge` model layer. **BUILT (2026-07-14, subagent-driven, 5 tasks, commits
  6f783f2a2b..6697742093):** `Edge.kind` (structural|linked, `order` optional, v0.2.0) + `makeLinkedEdge`;
  structural ops (`childEdges`/`parentEdges`/`outlineRows`) filter `kind=structural`; `createLinkedEdge`
  (may-cycle); `backlinks` grouped union via `targetOf`. Whole-branch review **READY**; gate green
  (test 61/61, build, lint). **State: BUILT.**
  - Carried to **I3** (whole-branch Minors): (1) `NodeOutline.tsx` zoom-root fallback + edge `useQuery`
    read unfiltered `edges` — filter to `kind=structural` before I3 creates live linked edges (dormant
    now; avoids outline re-render churn on linked-edge changes). (2) plan's `linkedReferrers` was never
    needed (`backlinks` covers it) — doc-only.
- **I2** — Co-location substrate: multi-parent + cycle guard + multi-location render tests. Co-location
  *UX* (add-parent picker, render occurrence) pending. **State: BUILT (substrate); UX pending.**
- **I3a** — @-mention insertion + atomic chip (marker `{{ref:id}}` · custom chip decoration · @-picker →
  `createLinkedEdge` + insert marker · delete-sync). **BUILT + review-clean (2026-07-14, inline, 4 tasks,
  commits `7ef2795da0..46540e2bae`; review fixes `2fe6e9ddcd`).** Gate green (test 65/65, storybook 15/15,
  build, lint). **State: BUILT.**
- **I3c** — Live mention labels (`IX-immediate`: "edit X → Y's chip updates immediately"). Carved from
  I3a review C2, then **RESOLVED as a false positive (2026-07-14).** The C2 diagnosis (that `useQuery` is
  membership-based and won't re-render the mentioning row on a target's in-place edit) did **not hold
  empirically**: the `MentionLive` regression test mutates a mentioned target purely at the substrate level
  (`Obj.update`, target NOT rendered — a faithful remote-edit proxy) and the chip updates live against the
  unmodified code. ECHO query reactivity already re-renders the row + recomputes the label. **Steve chose to
  close with the regression test only** (no production change; YAGNI — the test guards against a future
  reactivity change breaking liveness). Test commit `d64dfae3d7`; plan `plans/2026-07-14-plan-i3c-live-labels.md`
  retains the `Obj.subscribe` fix as a documented fallback. **State: DONE (regression-guarded, no code change).**
- **I3b** — Secondary view (`UP-5`: one renderer, two placements). **Split** (2026-07-14, Steve chose):
  - **I3b-1 — inline-expand.** Option-click a chip → `expandedMentions` view-state → render the target's
    outline below the row, bounded + cycle-safe. **BUILT (inline, 3 tasks, commits `39cbdfa70e..0bd2e27783`;
    plan `plans/2026-07-14-plan-i3b1-inline-expand.md`).** Gate green (test 66/66, storybook 18/18 incl.
    `MentionExpand` + `MentionExpandCycle`, build, lint). **Deviation (Steve-approved):** direct-mounts
    `<NodeOutline subject={target}/>` not `<Surface type={Section}>` — behaviorally identical (bramble's
    Section surface for a Node *is* NodeOutline), but testable under `withClientProvider` and simplest for
    Node-only targets; swap to `<Surface>` in one line if a cross-type target ever arrives. **State: BUILT.**
  - **I3b-2 — open-beside.** Shift-click a chip → `LayoutOperation.Open` (from `@dxos/app-toolkit`) via
    `useOperationInvoker` (`@dxos/app-framework/ui`), payload `{ subject: [Paths.getObjectPathFromObject(target)],
    navigation: 'immediate' }` — supplied through `OpenBesideContext` from the plugin's Surface (null/no-op
    outside it). **BUILT (2 tasks, commits `8431182d47`, `a73f00cb2f`; plan `plans/2026-07-14-plan-i3b2-open-beside.md`).**
    In-plugin click→resolve→handler is storybook-tested (`OpenBeside`); the thin Surface adapter is
    build/lint-gated (no operation-invoker in the story harness). `pivotId` exact-adjacency deferred.
    **State: BUILT.**
  - **I3b whole-branch review (base `d64dfae3d7`) → READY** with 2 Important + robustness findings, all
    verified + fixed (`2e218986b6`): (1) a mention in the **header's own text** toggled expansion but never
    rendered (header renders via `RowEditor`, not `OutlineRow`) → extracted `MentionExpansions`, rendered for
    both header and rows (`HeaderMentionExpand` story); (2) **dangling linked edge** (target removed, edge
    survives) → `getTarget` null-guards in `MentionExpansions` + open-beside. Deferred (review Important #2,
    task chip `task_6f306a6e`): `RowEditor` + `MentionExpansions` run a duplicate per-row linked-edges query.
    Gate green (test 66/66, storybook 20/20, build, lint).
- **I4** — Backlinks panel build (the union view). Gated on N3 (settled). **State: READY to plan.**

---

## Decisions log
_(appended as each issue resolves)_
- 2026-07-14f — **I3b complete (both UP-5 placements) + whole-branch review-clean.** I3b-2 open-beside built
  (Shift-click → `LayoutOperation.Open` via a Surface-supplied `OpenBesideContext`; in-plugin half
  storybook-tested, adapter build/lint-gated). Whole-branch review over I3b-1+I3b-2 → READY; fixed 2 verified
  findings (header-hosted mentions couldn't expand → extracted `MentionExpansions` for header + rows;
  dangling-target null-guards) and deferred one perf item (duplicate per-row query, chip `task_6f306a6e`).
  Storybook-flake note: under peak concurrent load the browser story suite mass-times-out (saw 14/20 fail at
  197s); a clean isolated run is 20/20 at ~13s test time — run the gate without competing moon jobs.
- 2026-07-14e — **I3b split + inline-expand deviation (Steve chose recommended on both).** I3b (secondary
  view) split into **I3b-1 inline-expand** (built now, storybook-gated) and **I3b-2 open-beside** (separate
  plan — `LayoutOperation.Open`, framework wiring, tested by dispatch payload not storybook). Deviation: the
  inline secondary view **direct-mounts `<NodeOutline subject={target}/>`** rather than the design's
  `<Surface type={Section}>` anchor — behaviorally identical (bramble's Section surface for a Node resolves to
  NodeOutline) but `<Surface>` renders nothing under the plugin's `withClientProvider` story harness, so
  direct-mount is what lets the inline-expand be gate-tested. One-line swap to `<Surface>` if a cross-type
  mention target ever arrives. Cycle-safety via an `ExpansionPathContext` (nesting-subject ids) — a mention of
  an ancestor renders a stub. Root cause the split surfaced: open-beside vs inline-expand have different
  integration + test surfaces, so bundling them would force two test strategies into one plan.
- 2026-07-14d — **I3c closed as a false positive (Steve chose A).** Wrote the I3c plan (`Obj.subscribe`
  per target → `refreshChips`), grounded via an Explore pass on ECHO's live-field API. But the TDD red step
  didn't go red: a `MentionLive` test that mutates a mentioned target purely at the substrate level
  (`Obj.update`, target not rendered) already updated the chip against unmodified code. So C2's premise
  (`useQuery` won't re-render the row on a target's in-place edit) was wrong here — ECHO query reactivity
  covers it. Closed with the regression test only (no production change); the `Obj.subscribe` fix stays in
  the plan as a documented fallback if `MentionLive` ever regresses. Lesson: run the review finding's own
  failing test before building its fix — a plausible mechanism-level diagnosis can still be empirically false.
- 2026-07-14c — **I3a review outcome (Steve chose A).** Whole-branch review found 3 real issues (all
  verified against source). Fixed now: **C1** picker-keymap precedence (register the @-picker before the
  row gestures; both are `Prec.highest` so array order decides) and **I3** the delete-sync user-event guard
  (plan-mandated, was omitted). Carved out: **C2** "chip label not live on target-title edit" → new item
  **I3c**, because the fix is a cross-node yText-subscription — its own reactivity-design slice, not part of
  I3a's insertion scope, and it shares machinery with I3b. Learned: the storybook runner can't open the
  @-popover from synthetic keys, so the open-menu keyboard path is manual; the closed-menu fall-through is
  regression-covered by the existing row-gesture tests running with the new picker-first extension order.
- 2026-07-14b — **Marker mechanism corrected + move-down gate fix.** While grounding Plan I3 I adopted
  Composer's markdown-URL/`xmlTags` marker — inconsistent with unify (it puts the target in the text *and*
  the edge). Root cause: the D2 move-down carried `design-references.md`'s pre-unify **reuse anchors**
  over verbatim; the delivery gate was never run on the propagated design. Corrected: marker = an
  **edge-referencing token**, chip = a **custom decoration** (no `xmlTags`, no markdown language needed).
  Gated the whole references design; fixed `design.md §3` + `design-references.md`. Process fixes:
  `FLOW.md` gate clause 4 (gate the propagated design · re-derive reuse anchors · scrub secondary sections
  · direction rule), `spec/README` note, `pattern/reproduction-flow.md` record.
- 2026-07-14 — D1 direction set: multi-location of a *node* = co-location (real multi-parent), a
  deliberate deviation from Tana's owner+reference. (Recording pending.)
- 2026-07-14 — Correction (feeds N1): subtree-child and inline-mention are **distinct relationships**,
  not two routes to one capability; "child" was overloaded.
- 2026-07-14 — N1 finding: the *substrate* already keeps them distinct (`IP-2`/`IP-3`); B1 + N4 are
  already answered in `IP`. The blur was `UP-4` framing + this thread's design talk only.
- 2026-07-14 — **Extensibility flip:** because more edge *kinds* are expected, **UNBUNDLE is rejected**
  (it hardcodes today's two kinds into capabilities). Capabilities are defined **per-axis**; `UP-4`'s
  bundling is correct (it's the shared-identity axis). Chose **Light**: an open-typed-edge-family +
  per-axis paragraph in `internal-primitives.mdl` now; full axis-factoring deferred until a *3rd* edge
  kind arrives (YAGNI). New method guard (→ P1b): a new edge kind must declare its axes.
- 2026-07-14 — **N2:** collapsed mention = **atomic** at the floor (`IX-direct.reference-atomic`);
  editable-collapsed above-floor (T1). Editing a mention is always one gesture away (expand), so atomic
  costs no capability — it only makes editing another node a deliberate step rather than something that
  can happen while the user thinks they're editing their own sentence.
- 2026-07-14 — **"Secondary view" unification:** the inline-expand panel (`UP-4.embed`) and the
  alongside panel (`UP-5.open-beside`) are ONE artifact — a live, on-demand, bounded view of a Node +
  subtree — in two placements (inline / alongside). Defined once in `UP-5`; reused by `UP-4.embed` and
  `IX-direct.reference-atomic`. Cascades to I3: one renderer, two mount points.
- 2026-07-14 — **Unify the edge realization (design):** both edge kinds are ONE reified kind-typed
  `Edge` relation (`kind ∈ {structural, linked}`), realizing the N1 neutral edge-family in the design.
  The **linked mention is a reified linked-`Edge`** whose target is the reference (not a bare in-text
  `Ref`) — this closes the backlinks-queryability hole (`referencedBy` indexes schema `Ref` fields, not
  text-positioned URIs) and unifies backlinks under `targetOf`. Reshaped `design.md §1` + I1.
