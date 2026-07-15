# Bramble — Flow Map

> Read this first. It is the living spine for the whole Bramble flow: neutral
> spec → reference realization → gap analysis → design → plan → plugin. It is
> never closed out. The operating model is specified in
> `plan/2026-07-10-flow-management-spine-design.md`; conventions are in
> `CLAUDE.md`.

## Active work

**Where we are:** S2 (interaction laws) and the Tana R realization are drafted
and cross-checked (every R behavior traces to SUP+S2; every law has an R
instance). The R **behavioral** layer is complete and live-confirmed in Tana (all
keystroke live-checks closed). The R **visual** layer — computed-style capture
into `implementations/tana/visual-spec.md` + a `visual-verification` mapping
(`visual/tana-outline.json`) — is complete: design tokens + all element
specimens harvested (incl. the inline reference chip and the Option-click
expansion panel). R is promoted to **current** (only `UP-1.any-content-type`,
non-text nodes, remains deferred). **S3 · UX gap analysis is done** with a
decisive conclusion, live-confirmed against the latest Composer build: **a new
Bramble outliner plugin is needed** — Composer's Outline rows carry no ECHO
identity (row menu = "Delete row" only; addressing stops at the whole object), so
no existing surface reproduces Tana's every-bullet-is-a-Node primitive; but the
ECHO substrate is strong and reusable (identity, refs, relations, backlinks,
edit-through embed, in-flow `@`-link). Visual diff is deferred to post-plugin (the
new surface is built to `visual-spec.md`, then diffed). **S4 · design is underway** (`implementations/dxos/design.md`). **Sub-design 1 —
substrate data model — is settled:** a Node is *any typed ECHO `Obj`* (leveraging
`IP-1.typed-node`); structural edges are *reified multi-predecessor Relations*
(fractional-ordered, app-kept-acyclic — closing ECHO's owner+reference
divergence); linked edges are `Ref`s; an outline is the view of a Node's
structural-successor subtree. **Sub-design 2 — surface + gestures — is settled**
too: **hybrid rendering** (a bespoke outline shell + per-row content = inline text
editor *or* the object's `Section` Surface), gesture→structural-`Edge` mapping,
**local per-user** view-state, built to R's visual-spec — grounded in DXOS plugin
patterns and *corroborated by* (not evolved from) the prior `plugin-bramble`, a
pre-spec iteration deliberately restarted. Sub-designs 3 (reference/embed/
backlinks — first-class `Ref`-spans feeding the "Related" backlinks view) & 4
(floor hosting **in-monorepo** `packages/plugins/plugin-bramble`; out-of-monorepo
a deferred spike) are settled — **S4 design is complete** (`design.md` current).
**S6 · Plan 1 (the substrate) is BUILT** — `@dxos/plugin-bramble` in the DXOS
monorepo (branch `claude/plugin-bramble-substrate`, 6 commits): `Node` object +
reified multi-predecessor `Edge` relation + edge algebra (order / traverse /
cycle-checked mutation / reparent) + plugin scaffold + Composer-app registration.
Built subagent-driven (5 tasks, each per-task-reviewed; whole-branch review found
+ fixed one `reparentEdge` atomicity bug). **`moon run plugin-bramble:{test,lint}`
green (9/9 tests, 0 lint); `composer-app:build` typecheck passes.** Merge-ready.
**S6 · Plan 2a (read-only outline surface) is BUILT** — same branch (7 more commits,
now 13 total): pure `outlineRows` view-model → a registered React surface → reactive
`useQuery(Filter.type(Edge))` edge read → nested rows (bullet/chevron/indent) → per-row
**read-only** CodeMirror bound to each Node's text → chrome styled to R's visual-spec.
Subagent-driven (5 tasks, each reviewed; whole-branch opus review = **READY**, read-only
guarantee confirmed). **`plugin-bramble:{build,test,test-storybook,lint}` all green.**
**Visual gate ran** (Storybook in chromium): 4/4 regions match Tana's target values
exactly (header 29/33.36/550, row 15/21/400, bullet 15×15, chevron 3.75px); an inline-row
layout bug caught **by screenshot** was fixed. **Verified live in real Composer** (:5174, worktree
build): plugin enables under Labs; `Node` create-entry appears (HiddenAnnotation hides navtree, not
create-menu); seeded outline renders correctly. **Conformance gap — accepted-with-reason:** `'Inter
Variable'` is named in the theme but the font file is **not loaded** in the Composer build (system-
sans fallback) — loading it is a shared `@dxos/ui-theme` change (out-of-plugin), deferred; the
outline is correct in every measured dimension but glyph shape. **Decisions (2026-07-12):** undo
deferred to its own later slice (2b/2c ride CodeMirror text history); branch kept & continued;
R live-checks deferred. **S6 · Plan 2b (editable outline) is BUILT** — same branch (7 more
commits, 20 total): editable rows/header (readOnly flip + automerge write-back) · pure
split/merge math · `OutlineController` (per-row `EditorView` registry + deferred-focus +
create/merge intents) · Enter→create/split · Backspace-at-start→merge (leaf) · arrows→adjacent
row (all `Prec.highest` CodeMirror keymaps). Subagent-driven (6 tasks each reviewed; whole-branch
opus review **READY**). `plugin-bramble:{build,test,test-storybook,lint}` + `composer-app:build`
all green; the four editing gestures pass in real chromium via the `play` suite. Undo out of
scope (deferred slice). **Carried to Plan 2c** (2c-latent, unreachable in 2b): `mergeBackward`
must go substrate-authoritative (removal branch too) and remove only the occurrence edge (not the
whole Node) so multi-predecessor nodes aren't globally deleted; the view-mediated-text Medium is
fixed by the same 2c substrate rewrite. **Plans 2c (indent/outdent · reorder), 2d (expand/collapse
+ zoom view-state, pointer + keyboard), and 2e (drag-to-reshape via the Pragmatic-dnd tree-item
hitbox) are BUILT** — all subagent-driven, per-task + whole-branch reviewed, delivery gate green,
branch unmerged for spin-out (see the ledger `.superpowers/sdd/progress.md` in the DXOS worktree for
per-task detail). **The reference/backlink/transclusion slice — the last major R behavior — is COMPLETE**
on the DXOS plugin. Design **settled** (`implementations/dxos/design-references.md`, `current`): one unified
kind-typed `Edge` (structural | linked); the inline mention is an **edge-referencing marker token** rendered
by a custom atomic chip decoration; secondary view (inline-expand + open-beside); grouped backlinks. Built +
whole-branch review-clean across **I1** (edge model) · **I2** (co-location) · **I3a** (mention insertion +
chip) · **I3c** (live labels) · **I3b** (secondary view) · **I4** (backlinks panel). Live tracker:
`implementations/dxos/references-issue-ledger.md`.

**Smoke test (2026-07-14, Composer `:5174`) found integration bugs** the storybook gate never covered —
focus-on-create, no left-nav presence, singleton question, per-keystroke live-embed lag, and an
option-click double-handle + oversized embed panel. Captured in
[`implementations/dxos/issues-ledger.md`](implementations/dxos/issues-ledger.md) (the plugin-wide tracker;
references-specific items stay in `references-issue-ledger.md`).

**Next action:** decide the next flow move. Open work now spans: the smoke-test bugs (issues-ledger `BR-1`…`BR-6`)
— the real Composer integration the build never exercised; the two task chips (`BR-7`, `BR-8`); neutral-spec `S2`
status promotion (`BR-11`; `IX`/`PX` are drafted, not mid-authoring); and the Tana `R` live-checks (`BR-12`). Not
the reference slice — that's built.

## Pipeline & status

Status values: `not-started · authoring · needs-review · done`.

| Stage | Artifact | Role | Status |
|---|---|---|---|
| S1 · Neutral substrate + capabilities | `spec/internal-primitives.mdl` (`IP-*`, internal substrate), `spec/user-primitives.mdl` (`UP-*`, capabilities) | neutral | done |
| S2 · Neutral surface — interaction | `spec/interaction-primitives.mdl` (`IX-*`) | neutral | draft |
| S2 · Neutral surface — presentation | `spec/presentation-primitives.mdl` (`PX-*`) | neutral | authoring |
| R · Reference realization (Tana) | `implementations/tana/` | reference | current · open live-checks (lifecycle + pointer, 2026-07-12) |
| S3 · Gap analysis — substrate | `implementations/dxos/gap-analysis.md` | target | done |
| S3 · Gap analysis — UX | `implementations/dxos/gap-analysis-ux.md` | target | done (→ new plugin needed; `UP-1.author` verdict added) |
| S4 · DXOS design | `implementations/dxos/design.md` | target | current (§1–§4; §2 covers authoring + editable header + pointer affordances) |
| S4 · References sub-design | `implementations/dxos/design-references.md` | target | current (settled — unified kind-typed `Edge`; inline mention = an edge-referencing marker token rendered by a custom atomic chip decoration; the earlier `RefSpan` storage fork is resolved) |
| S5 · Plan | `implementations/dxos/plans/` | target | Plans 1, 2a, 2b, 2c, 2d (view-state), **2e (drag)** built |
| S6 · Plugin code | `packages/plugins/plugin-bramble` (DXOS monorepo) | target | Plan 1 + 2a–2e + references model **I1 (kind-typed `Edge`: structural\|linked · `createLinkedEdge` may-cycle · `backlinks` grouped union · structural-only traversal)** + **I3a (@-mention insertion + atomic chip: `{{ref:id}}` marker · custom chip decoration · @-picker · delete-sync)** built — gate green (test 65, storybook 15, build, lint), both whole-branch reviewed + review-clean. **I3c (live labels)** closed as a false positive with a regression test (`MentionLive`; ECHO query reactivity already keeps the chip live); **I3b (secondary view)** built + whole-branch review-clean — Option-click a chip expands the target's outline inline (bounded, cycle-safe); Shift-click opens it alongside (`LayoutOperation.Open`). **I4 (backlinks panel)** built + review-clean — `BacklinksPanel` at the `Related` surface shows a Node's inbound edges grouped + distinguished (structural "Appears under" / linked "Mentioned in"), click-to-open-beside; test 66, storybook 22. **References slice COMPLETE (I1–I4).** **Never merged** — spun out later as a separate plugin |

## Artifact index

| Artifact | derives-from | Notes |
|---|---|---|
| `spec/internal-primitives.mdl` | — | `IP-*` — internal substrate (entities · identity · relationships · types); upstream root |
| `spec/user-primitives.mdl` | IP-* | `UP-*` — user capabilities |
| `spec/interaction-primitives.mdl` | UP-*, IP-* | `IX-*` — interaction (a *surface* facet); IDs `IX-<n>.<concern>` |
| `spec/presentation-primitives.mdl` | UP-1, IP-1, IP-2 | `PX-*` — presentation (the other *surface* facet). `IX`+`PX` = the **surface** over the surface-independent `UP` capabilities; a new surface (mobile) is a new *realization* of `IX`+`PX`, not a change to `UP` |
| `implementations/tana/user-experience.md` | IX-*, UP-* | Tana behavioral realization |
| `implementations/tana/visual-spec.md` | PX-*, UP-1, IP-1 | Tana visual reference, organized per `PX` concern + both themes (+ `visual/tana-outline.json` mapping) |
| `implementations/dxos/gap-analysis.md` | IP-*, UP-* | substrate gap analysis (done) |
| `implementations/dxos/gap-analysis-ux.md` | IX-*, Tana R | UX gap analysis |

## Adaptation protocol (move up / down)

Traceability is `grep` over stable req IDs. Every downstream artifact opens with
a `derives-from` header listing the upstream req IDs it depends on.

- **Move up (impl → spec):** a downstream finding invalidates/underspecifies an
  upstream req → log it under *Pending propagations* → amend the upstream spec →
  `grep -r "<req-id>" spec/ implementations/` → mark each hit `needs-review` in
  the table above → re-review (revise/re-run any affected plan).
- **Move down (spec → impl):** a changed/new upstream req → grep flags the
  downstream artifacts that must now cover it. A req with no downstream citation
  is visibly un-realized.

### Traceability validation (delivery gate)

Before a downstream artifact is **delivered** (marked `current`/`done` or
committed as complete), validate it against traceability:

1. **Every element traces up.** Each behavior / gesture / element / finding cites
   the upstream req(s) it realizes (`UP-*` / `IP-*` / `IX-*` / `PX-*`). Nothing is
   *un-grounded* — no mechanism imported from the target system (a UI convention,
   an API) that lacks a neutral counterpart. (This gate is what would have caught
   the Composer `@@` block-embed in the DXOS design — a convention with no UP/IP.)
2. **Grep both directions.** The `derives-from` header lists the upstream reqs;
   `grep` each confirms coverage. An element with no trace is either fixed, or
   explicitly dispositioned (out-of-floor / move-up) — never left silent.
3. **Cover every concern, not just the ones drawn.** Trace-up alone is not
   enough: a delivery must also show it *covers every neutral concern* its facet
   enumerates — e.g. a visual realization/gate covers every `PX-*` concern
   (element × state × layout × theme), not a hand-picked few. Coverage runs on
   three dimensions, matching the completeness sweeps (`spec/README`): every
   **concern** a facet lists; every **render-mode** of a capability whose result
   is rendered (mode × editability × liveness — a reference's collapsed / expanded
   / beside, not just the default); and every **axis** an edge kind declares
   (containment · cyclicity · shared-identity · expansion). A green that checks
   only what was captured is a false green (the 2026-07-13 visual miss: `R.vis`
   captured 4 regions, matched 4, yet did not look like Tana).
4. **Gate the propagated design, not only code.** A **move-down** (propagating a settled
   model to `design.md`/sub-designs) *ends* by running clauses 1–3 over the design artifacts
   themselves. **Reuse anchors and imported target-system mechanisms are not exempt** — each
   must trace to the settled model or it is a carried-over leftover. Re-derive every reuse anchor
   against current canon *at the moment of use*; never carry a reuse list across a canon change;
   scrub the **secondary** sections (reuse lists · examples · API notes), not just the headline
   model. **Direction rule:** derive the mechanism from the principle first, then select reusable
   pieces for it — never let the target system's convention pick the mechanism. (2026-07-14: the
   references move-down carried Composer's markdown-URL / `xmlTags` marker into
   `design-references.md`'s reuse anchors, contradicting the just-settled edge-based model; the
   gate, un-run on the design, missed it.)
5. A failed trace **or an uncovered concern blocks delivery** until resolved.

### Pending propagations

**Resolved — 2026-07-13 · presentation facet + naming cleanup (move-up, U4):** the visual
miss (Bramble outline not matching Tana despite a "4/4" gate) root-caused to a
**missing neutral facet** — the specs described substrate, capabilities, and
interaction *manner*, but never **presentation** — so Tana's visual capture was
authored ungrounded and a trace-only gate green-lit it. Added
**`spec/presentation-primitives.mdl` (`PX-*`)**: the neutral presentation concern-set
(mark · disclosure · nesting · states · rhythm · theme), with a completeness sweep +
surface-relativity in its rule. Also **renamed `UX-* → IX-*`** ("UX" is the broad
experience umbrella, not one facet) and fixed naming: neutral specs are named by
req-family (`IP`/`UP`/`IX`/`PX`); `S<n>` is a FLOW phase only; `IX`+`PX` are the two
*surface* facets over `UP`. **Gate upgraded** (delivery-gate clause 3): coverage of
every `PX-*` concern, not just trace-up. Pattern metadata: `pattern/reproduction-flow.md`.
**Move-down complete (2026-07-13):** ✓ `visual-spec.md` re-grounded on `PX-*` (all six
concerns · states · both themes captured live). ✓ `composer-outline.json` mapping
expanded 4→**8 regions, one per `PX` concern**. ✓ plugin chrome re-derived (5px dot ·
24px gutter · 15px chevron · 7.5px gap · **32px indent** · `flex-start` · hover states ·
theme-adaptive text) — DXOS commit `af22bdadb0`; caught a real dot-colour bug the narrow
gate couldn't. ✓ **upgraded coverage gate re-run clean** (8/8 regions within tolerance);
`plugin-bramble:{build,test,test-storybook,lint}` green, both themes legible.
**Follow-up (2026-07-13, from a real-browser check):** viewing the Storybook surface in
a real browser exposed an illegible light theme — the outline's text is theme-adaptive
but the shared `withLayout({ fullscreen })` decorator wraps stories in a hardcoded
`bg-black`, so light-mode dark text landed on black. Component + Composer were fine (both
get a themed surface); the *story harness* wasn't, and the coverage gate had missed it
because **it checked text colour, not text-vs-background contrast**. Fixed: story renders
on the theme's `--surface-bg` (DXOS `b825b37547`); and a `LegibleInBothThemes` play test now
asserts real contrast in both themes (DXOS `11533f4708`) — the gate enforces `PX-theme`
legibility, not just colour values. Lesson: the same "verify a value, not the outcome"
miss recurs one level down; a coverage gate must check the *legible result*, not the token.

**Residual (minor):** ✓ `gap-analysis-ux.md` / `design.md` now cite `PX` (trace propagated,
2026-07-13). Left as-is by choice: the DXOS branch `claude/plugin-bramble-substrate` is
**never merged** — it lives on to be spun out as a separate plugin — and its
`.claude/launch.json` storybook preset stays uncommitted (local).

**Resolved — 2026-07-12 · node-authoring capability (move-up, U1):** an R-capture gap
(the editable Tana header) traced to a deeper omission — the SUP addressed/nested/
linked Nodes but never said the user **creates, edits, or removes** one. Added SUP
`UP-1.author` (create / edit-content / remove a Node; a created Node is a
*first-class unit, not a lesser row* — which also formalizes the S3 identity gap).
Added R behaviors (Edit content, Create=`Enter`, Delete/merge=`Backspace`) tracing
it. **Propagated:** `design.md` §2 gesture-map now has authoring rows (create=`Enter`
→ `makeNode`+`createEdge`; delete=`Backspace` → `removeEdge`+merge+`reparentEdge`;
edit → `readOnly:false`), and `gap-analysis-ux.md` records `UP-1.author` **fail** on
existing Outline rows. Design §2 + gap-analysis-ux back to `current`/`done`. **Plan 2b**
carries the create/edit/delete gestures. Plan 1 (substrate) + Plan 2a (read-only) unaffected.

**Resolved — 2026-07-12 · view-position invariance (move-up, U2):** the header was
mis-captured as chrome because no spec stated a Node keeps its full identity/
capabilities in any view position. Added the invariant to SUP `UP-1` desc (+
`UP-1.author` focus-position clause) and an `IX-direct` S2 note (directness invariant
under view position). R: the zoom-root renders as an **editable header**. Propagated to
`design.md` §2 (the header is the *same* editable per-row editor as body rows).

**Resolved — 2026-07-12 · reshape capability + drag; root-cause method fix (move-up, U3):**
drag-and-drop had no first-class home. Root cause (deeper than the earlier R-capture
gap): specs described the outline's *state* but under-enumerated the *verbs* on it
(reshape) and the *modalities* per verb (drag). Added SUP `UP-1.reshape` (reorder /
move / re-nest, identity- & link-preserving, acyclic) + S2 modality-independence law
(`R-Interaction-Laws` clause 4 + `IX-direct` line: key/click/drag interchangeable;
continuous gestures first-class). R: drag promoted to a first-class behavior; the four
reshape behaviors retraced `UP-1.outline`→`UP-1.reshape`; §2 has a drag row (Pragmatic
drag-and-drop via `@dxos/react-ui-list` — dnd-kit is vestigial in the repo, corrected).
**Instructions (prevent recurrence):** neutral **Spec completeness sweeps** added to
`spec/README` (full verb set × modality set per noun; continuous-gesture sweep); R
"Capture method" extended; agent memory `spec-completeness-sweeps`. Design already
realizes reshape (§2 reorder/indent/reparent/drag rows) → `design.md` derives-from
`UP-1.reshape`. **Plan 2c** carries drag; SIP unchanged (`IP-2` already permits it).

**Open — 2026-07-12 · R capture-method + reopened live-checks:** R now carries a
*capture-method* note (don't inherit the source doc's taxonomy — run the elementary-
lifecycle sweep + the every-persistent-element sweep). The behaviors those sweeps
added (lifecycle specifics; pointer affordances — click-bullet zoom, click-chevron
expand, breadcrumb-click navigate, plain-click reference) are `[live-check pending]`
at standard-outliner semantics, unconfirmed live. **Action:** a live Tana pass in
the `tanawithclaude` workspace to close them (grep `live-check pending`).

**Resolved — 2026-07-11 · typed-Node accommodation (move-up):** added SIP
`IP-1.typed-node` (a Node MAY carry a schema-type; *accommodate, not require*);
propagated to SUP (resolution rule + appendix) and README (decision log), and
`implementations/dxos/gap-analysis.md` (verdict: ECHO **pass**). Design:
`plan/2026-07-11-typed-node-accommodation-design.md`.

**Resolved — 2026-07-11 · SIP outline-terminology (move-up):** scrubbed "outline"
(a *view* notion) from SIP invariant clauses in favour of structural terms
(Bramble is the DAG; the outline is a view onto it). `IP-2.multi-predecessor`
then[1] reworded to a pure structural claim (adopts `gap-analysis.md` §6);
re-reviewed that verdict — **unchanged (divergent)**.

## Superpowers hand-off

Dev stages (S4 design, S5 plan, S6 build) run the superpowers cycle
(brainstorming → writing-plans → executing-plans). Plan files live under
`implementations/dxos/plans/`. This map links them and tracks coarse status;
granular checkboxes live in the plan.
