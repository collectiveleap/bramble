<!-- derives-from: []; role: target; status: current -->

# Bramble DXOS plugin — issues ledger

Issue tracker for the Bramble plugin program (branch `claude/plugin-bramble-substrate`, DXOS worktree,
never merged). Tracks **all issue classes** — bugs, design decisions, verification, docs, and cross-layer
spec/design propagations (an item may span the neutral spec `S1`/`S2`, the `S4` design, and the `S6` build) —
not only plugin bugs. References-specific design items live in
[`references-issue-ledger.md`](./references-issue-ledger.md). The dependency- and risk-ordered execution
sequence across these tickets is [`plans/2026-07-15-ledger-sequencing.md`](./plans/2026-07-15-ledger-sequencing.md).
Each ticket has a unique `BR-<n>` id. `Status`: open · design · deferred · done. Root-cause guesses are
marked **hyp** (unverified). Next id: **BR-21**.

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
4. **Root-cause to the right altitude (5-whys).** The proximate tech bug is rarely the root cause. Ask "why" up the
   flow — build → test → plan (S5) → design (S4) → neutral spec (S1/S2) → FLOW gate — and propose a fix at **each**
   rung that failed, not only the bottom one. A build that contradicts an explicit spec requirement and still ships
   green is a *verification-path* gap higher up, not just a code bug. (Precedent: BR-6.)
5. **Verification must match the bug class.** A visual/layout bug is verified by measuring the rendered result
   (computed position relative to siblings) and looking at it — not by an existence/logic-green test. A surface-affecting
   change is verified against the reference realization + the neutral `PX` requirements, not unit tests alone.
6. **Trace a claim before acting on it; ground a reversal.** State intent from the spec (`UP/IP/IX`), never inferred
   from the current build (the build is what the flow converges — reading intent off it is circular). Any decision that
   fixes *what an operation targets or how it discriminates / routes* cites the req it realizes. A ticket that
   **contradicts a settled decision** (a decision-log answer, a Steve call, a spec req) must carry
   `contradicts: <D-n | req-id>` **and** `grounded-by: <req-id | runnable test>` — never a subagent's assertion;
   without a valid `grounded-by` it is `UNVERIFIED — do not act on`. (Precedent: BR-19 — an over-match claim inferred
   from `Filter.type(Node)`, contradicting `UP-2`/`UP-3`/`IP-1`, reshaped D2 with no grounding.)

---

## BR-1 — New Bramble: no focus cursor on create
`Status: open` · `Type: bug` · `Source: smoke test :5174 (2026-07-14)`
- Symptom: creating a new Bramble shows no caret; must click around to find where to type, and it doesn't
  always work.
- **hyp:** the create flow doesn't focus the header/first-row editor on mount. `capabilities/create-object.ts`
  adds the Node (`makeNode` → `SpaceOperation.AddObject`) but places no focus; `OutlineController` handles only
  intra-outline (post-gesture) focus, not focus-on-first-open. Investigate how a freshly-opened surface takes focus.

## BR-2 — Created Bramble has no left-nav presence
`Status: open · reshaped by BR-16` · `Type: bug` · `Source: smoke test :5174 (2026-07-14)`
- **⚠ Re-frame (BR-16 settled 2026-07-15):** with nodes = typed `Obj`s that already carry nav identity, nav is about
  surfacing the **Bramble view** (its root object), not giving a bare `Node` an identity. Fix follows the BR-16 model.
- Symptom: created a Bramble 3×; none appear in the left navigation.
- **hyp:** the created `Node` is added to the space but never surfaced in the navtree. `BramblePlugin.tsx`
  contributes schema + surface + create-object + translations, but **no app-graph / navtree module**, and the
  `Node` type may lack the label/icon metadata the navtree renders. Investigate: does `AddObject` place it in a
  navigable collection, and what does a nav-visible plugin contribute that bramble doesn't? Interacts with BR-3.

## BR-3 — Bramble should be a singleton — 1 per space
`Status: design · reshaped by BR-16 (re-settle under the object-graph model)` · `Type: design decision (Steve)` · `Source: smoke test :5174 (2026-07-14)`
- **⚠ Re-frame (BR-16 settled 2026-07-15):** a Bramble is now a **view** over Composer's object graph, not a bag of
  Nodes — so "one Bramble per space" may dissolve into "what is the Bramble view's root, and is it singleton?" Settle
  this question in the BR-16 convergence design, not standalone.
- Ask: one Bramble root per space, not an unbounded set of Nodes. Create becomes **get-or-create**; "the Bramble"
  needs a stable per-space identity.
- Open questions: what *is* the singleton — a designated root Node, or a Bramble wrapper object? How does nav show
  it (BR-2)? What happens to Nodes already created in testing? Needs a decision before build; couples to BR-1/BR-2.

## BR-4 — Embed live-update lags until Enter (should be per-keystroke)
`Status: FIXED (verified)` · `Type: bug · HIGH` · `Source: smoke test :5174 (2026-07-14)` · `Fix: f488ae465b`
- Symptom: edit X → Y's chip reflected it only after **Enter**, not per keystroke (Tana `IX-immediate`).
- **Root cause (confirmed):** the write path was fine (CM↔automerge writes per keystroke, no throttle —
  `ui-editor/.../automerge.ts:97-105`). The lag was **observation-side**: the chip label was read once into a
  `labelMap` and rebuilt only when Y's `RowEditor` re-rendered — which fires on a **membership** change
  (Enter → `createEdge`) but NOT on the target's in-place per-keystroke text edit (Y's `useQuery` is over **Y's
  own** edges). Hence "until Enter."
- **Fix (flow: down / build, in-plugin):** `RowEditor` now (1) holds a `targetMap` so `resolveLabel` reads the
  target's `.content` **live** at chip-build time, and (2) subscribes to each linked target's text via the same
  automerge accessor-`change` signal the editor itself uses (fires per keystroke) → dispatches `refreshChips`.
  Re-subscribes only when the mention set changes.
- **Verification (clean env, load ~9):** build + lint green; node **68/68** incl. new `mention-live.test.ts`
  (accessor-change fires on the editor write path); storybook **22/22** incl. `MentionLive` **rewritten** to edit
  X through its own row editor — the real per-keystroke path, replacing the `Obj.update` proxy that gave I3c its
  false pass. Reopened and closed I3c (references-ledger).

## BR-5 — Option-click chip double-handles (popup menu + expand panel)
`Status: FIXED (app-verified :5180, 2026-07-15)` · `Type: bug` · `Source: smoke test :5174 (2026-07-14)` · `Fix: dbf5797145`
- **App confirmation (2026-07-15):** created a bramble in the running Composer, inserted a real `@`-mention, and
  Option-clicked the chip. Only the secondary view opened — **no preview popup**. DOM: chip is `SPAN.dx-tag--anchor`,
  `dx-anchor` element count = 0, visible popovers = 0. The dx-anchor→preview path can no longer fire.
- Symptom: Option-clicking the chip shows a **popup menu** AND opens the inline expand panel.
- **Root cause (confirmed):** the `dx-anchor` custom element (`packages/ui/lit-ui/src/dx-anchor/dx-anchor.ts:37-43`)
  auto-wires its own `click` → `DxAnchorActivate` dispatch on `connectedCallback`; `plugin-preview` listens for
  `DX_ANCHOR_ACTIVATE` and opens a preview popover. Our `ChipWidget` rendered a `<dx-anchor>` with no `dxn` (we set
  `data-edge-id`), so **every** click fired an empty-`dxn` preview popover alongside bramble's option-click expand.
- **Fix (flow: down / build, in-plugin):** render the chip as a `<span class="dx-tag--anchor" role="button">` — same
  visual class (`.dx-tag--anchor` is a plain class selector, works on any element), no platform click behavior;
  bramble owns the chip's semantics via `mentionClicks`. Updated `mentionClicks` + all story selectors to the
  tag-agnostic `[data-edge-id]`.
- **Verification:** build + lint green; **storybook 20/22** — the chip-dependent stories (`MentionExpand`,
  `HeaderMentionExpand`, `OpenBeside`, `MentionLive`, `MentionExpandCycle`) all pass, locating the chip via
  `[data-edge-id]` and option-clicking it, so the span chip + `mentionClicks` work. (The 2 fails, `Default` +
  `Mention`, are `waitFor` timeouts under env load ~34, not regressions.) The popup-ABSENCE itself isn't
  storybook-testable (no `plugin-preview` there) — confirm in the Composer app (`:5174`) when convenient.

## BR-6 — Inline embed panel oversized / wrong-looking
`Status: FIXED (app-verified :5180, 2026-07-15)` · `Type: bug` · `Source: smoke test :5174 (2026-07-14, screenshot)` · `Fix: 0f8d06884f, 8eec32d604`
- **Symptom fixes (both done):** (1) 29px page-title header → 17px inside `.bramble-secondary` (`0f8d06884f`);
  (2) expansion rendered to the far RIGHT (x=1026 vs row x=374) because `.bramble-outline-row` was `display:flex`
  and `MentionExpansions` was a flex sibling of the editor → row made a column with an inner `.bramble-outline-row-line`
  (`8eec32d604`; now x=398, below the line). App-verified :5180; storybook 22/22 (asserts header<20px + below-line).
- **5-whys root cause (the real lesson — the spec AND design already said "below"; the failure was a missing
  verification path from that requirement to the pixels):**
  - **W1 build/tech:** flex-sibling layout. → row→column. **DONE.**
  - **W2 build/test:** existence-only assertion, no position check. → position assertion + memory `existence-tests-miss-layout-bugs`. **DONE.**
  - **W3 plan (S5):** the build plan required no visual verification. → **DONE** — folded into FLOW gate clause 5 as an upstream corollary (plan DoD carries the visual-check step).
  - **W4 design (S4):** placement stated as prose, not a checkable/traced requirement. → **DONE** — `design.md` §3 embed now states the layout as a checkable `PX-embed` requirement + traces it.
  - **W5 neutral spec (S1/S2):** `UP-5` states the placement but `PX-*` had no secondary-view presentation primitive → nothing neutral to verify against. → **DONE** — added floor `feat PX-embed` to `spec/presentation-primitives.mdl` (in-flow · below · inset · bounded); `tana/visual-spec.md` gains the `PX-embed` value slots (awaiting capture).
  - **W6 FLOW gate:** no standing presentation-verification stage; visual check was one-off for the base outline. → **DONE** — `FLOW.md` delivery-gate **clause 5** (presentation fidelity: every surface gets a mapping + visual check vs `PX` + reference; a mis-positioned surface fails the gate). Elevates BR-17 from a ticket to a standing gate.
- **Visual fidelity DONE (2026-07-15, live pass vs Tana):** captured Tana's inline-expansion computed styles and
  matched the embed — full 1px bordered box, 7.5px corners, transparent, 24px inner inset, 15px/400 content, row
  highlight scoped to the line so the box sits clean. `MentionExpand` story asserts these values (`e0a73fac3a`).
  Tana values recorded in `tana/visual-spec.md`; `PX-embed` wording corrected. App-confirmed on :5180 vs Tana.
- Symptom (screenshot): the inline secondary-view panel renders the target's **full `NodeOutline` including a
  page-scale H1 header** plus children, unbounded — reads like a large side panel, not a compact expansion.
- **Root cause:** the inline-expand direct-mounts `<NodeOutline subject={target}/>`, which carries the full outline
  chrome; the header is `.bramble-outline-header .cm-content { font-size: 29px !important }` (Tana page-title scale).
- **Fix applied (flow: down / build, CSS):** scope `.bramble-secondary .bramble-outline-header .cm-content` down to
  17px/500 so the embed's header reads as an inline line, not a title. `MentionExpand` story asserts the embedded
  header font-size < 20px.
- **Remaining (→ BR-17 visual pass):** this fixes the glaring header scale only; the panel's placement, width, and
  chrome fidelity vs Tana still need the visual-integrity check. **Verification:** build + lint green; `MentionExpand`
  storybook passes its computed-style assertion (embedded header font-size < 20px).

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
`Status: DONE (2026-07-15, plan 0.5)` · `Type: docs` · `Source: FLOW pipeline`
- **Done (D4 authorized):** verified `IX`/`PX` content-complete (no placeholders), promoted both to `done` in the
  FLOW pipeline table (was `draft`/`authoring` — the illegal `draft` label removed), and set each file's
  front-matter + derives-from header `status: draft → current`. See [FLOW.md](../../FLOW.md).

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
`Status: DONE (verified 2026-07-15, plan 0.3 — all items already applied)` · `Type: docs` · `Source: references-issue-ledger`
- **Verified 2026-07-15:** every listed item was already applied in prior commits (the main-ledger description
  was stale) — README decision-log `#4` reads "`UP-1`…`UP-5`" and `#7` scopes `IX`/`PX` as neutral facets (no
  stale phrasing remains); D1 (co-location-vs-Tana deviation) recorded in `design.md §1/§2` + `gap-analysis.md`;
  N1 (distinct subtree-child vs inline-mention) recorded as the open typed-edge-family paragraph in
  `internal-primitives.mdl` line 18 + the `UP-4` clarification. Stale "pending" notes in the references ledger
  (T1 #4/#7, N1) corrected to match.

## BR-16 — Heterogeneous typed rows / Composer-native instances as nodes (designed, not built)
`Status: SETTLED 2026-07-15 — affirm design (ii); build converges UP` · `Type: design decision → build program` · `Source: design review 2026-07-14`
- **Build progress (plan Phase 1):**
  - **1.1 Edge generalization DONE** (2026-07-15) — `Edge` endpoints `Node → Obj.Unknown`, constructors accept any
    object (`788ea1937e`, `dd0d9194f8`); gate 70/70. Finding: `Node ≈ Obj.Unknown` structurally (see `design-object-graph.md` §2).
  - **1.2 text node type → schema A confirmed** (D2) — BR-19's "pure-A breaks discrimination" was **withdrawn** (2026-07-16, false premise: the spec `UP-2`/`UP-3`/`IP-1` and the design already require linking any typed object). The residual type-agnostic work (`@`-scoping + surface routing) is recast into BR-19; `Node`-as-type-discriminator is not required.
  - **1.3a heterogeneous render (read-only slice) DONE** (2026-07-16) — a row now renders by its object's type: a
    Bramble `Node` → text `RowEditor`; any other object → its registered `Section` surface (read-only) + plain-text
    fallback (`Obj.instanceOf(Node,…)` branch; `attendableId` threaded). Commits `ef8728c517`, `a4d7e0bd1f`,
    `9f2d5da480`; build green, new stories `HeterogeneousRow`+`Fallback` pass, 24/25 storybook in low-load run (lone
    `Default` failure is a pre-existing ECHO index-query load-flake, not a regression).
  - **Next / notes:** on **schema A** (D2, confirmed), 1.4 (render 2×2) / 1.5 (lifecycle + `@`-picker) carry the
    type-agnostic `@`-scoping + surface-routing work (recast BR-19) — no discrimination decision is pending. The
    build machine was load-saturated during 1.3a (storybook flake counts swung 9/16/1) — re-verify on a cool box.
    Keyboard gestures on non-text rows = 1.3b.
- **Decision (Steve, 2026-07-15):** Bramble is **"the structural outline over Composer's whole object graph."**
  Affirm `design.md` §1(ii) + `IP-1.typed-node`: a node = **any typed ECHO `Obj`**; structural + linked edges connect
  **arbitrary objects**; a row renders by its **type's Surface** (text is one type, `RowEditor` its renderer; a
  fallback `Section` surface covers typeless objects). The spec + design already say this — the **build diverged**
  (dedicated homogeneous `Node` schema, `makeNode`, `Filter.type(Node)`, `RowEditor` for every row). **Flow
  direction: the build moves UP to the design.** The middle "Node-wraps-an-object" stance was rejected (it
  re-introduces the object duplication the edge-native model exists to avoid).
- **Feasibility gate GREEN (verified 2026-07-15):** ECHO relations span arbitrary objects. `Obj.Unknown` is the
  any-object endpoint type, and `plugin-inbox`'s `ExtractedFrom` relation already declares `source: Obj.Unknown,
  target: Obj.Unknown` (exactly Bramble's needed shape; `SyncBinding` uses a mixed `Connection`/`Obj.Unknown`).
  Endpoints are stored as DXN refs (metadata, not a write-time type lock). So `Edge` generalizes mechanically:
  `source/target: Node` → `Obj.Unknown`, drop the `as Node` casts; all traversal (`childEdges`/`backlinks`/cycle/
  order) is unchanged because it keys on `Filter.id` + `kind`, never type. Confirms **"Node = a role (any `Obj`),
  `Edge` = the only foundational schema."**
- **Design pass DONE (2026-07-15) → [`design-object-graph.md`](./design-object-graph.md)** (the settled convergence
  design). It settles: the foundational DAG (Node = role, `Edge` = only schema over `Obj.Unknown`, feasibility green);
  node types = ECHO types + the text-node residual (leans A: native `Text.Text`); joining the DAG (create-new /
  reference-existing, no new primitive); and **the uniform render model — one secondary-view primitive, 2×2**
  ({structural | native} × {below | beside}, gesture algebra Option=below · Shift=beside · +⌘=native, one region per
  placement). Collapses `UP-4`/`UP-5` into that primitive (spec move-up, folded into the plan). Phased build path in §7.
- **Cascade — re-settle these under the object-graph model before building them:** BR-3 (a Bramble is now a **view**
  rooted at an object, not a bag of Nodes → the "singleton" question changes shape or dissolves); BR-2 (typed objects
  already carry nav identity — nav becomes about the Bramble *view*, not the Node); BR-1 (create/focus) follows.
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
`Status: open (now a standing gate — FLOW clause 5)` · `Type: verify / process` · `Source: smoke test 2026-07-14`
- **Groundwork done (2026-07-15, from BR-6's W5/W6):** `PX-embed` is a floor neutral requirement; `tana/visual-spec.md`
  has the `PX-embed` value slots; FLOW gate clause 5 makes a visual check *required* for every surface. So BR-17 is
  no longer "should we" — it's the concrete work: **(a)** capture the `PX-embed` numbers from Tana (fill the slots);
  **(b)** author visual mappings for the references surfaces (chip, inline embed, backlinks panel); **(c)** run the
  `visual-verification` loop against the running Composer surfaces vs those mappings; **(d)** file each delta.
- **Progress (2026-07-15):** the **inline embed** surface is done — Tana `PX-embed` values captured live + matched +
  locked in the `MentionExpand` story (see BR-6). **Remaining surfaces:** the mention **chip** and the **backlinks
  panel** still need their Tana capture + mapping + check.
- The `visual-verification` skill (extract computed styles from the reference + the running DOM, diff
  deterministically) exists, and a PX check ran **once** against the **Storybook** outline surface
  (`composer-outline.json` mapping, 8 PX regions, both themes — `design.md` §Visual conformance, 2026-07-13).
- But the **running Composer implementation** (`:5174`) has never been visually checked against the Tana reference
  (`implementations/tana/visual-spec.md`), and the **references surfaces** (mention chip, inline embed panel,
  backlinks panel) were built *after* that check and have **no visual mapping or verification at all** — BR-6 (the
  oversized / wrong-looking embed panel) is direct evidence the fidelity is off.
- Fix: run the visual-verification loop against the Composer app surfaces (outline, chip, embed, backlinks) with the
  Tana visual-spec as reference; author mappings for the new references surfaces; capture each delta as its own ticket.

## BR-18 — Non-destructive substrate (`IP-4`) propagation & realization
`Status: open (spec done · gate verified · fold + realization pending)` · `Type: spec/design propagation (cross-layer S1→S6)` · `Source: move-up 2026-07-15 (docs/ + input docs/ substrate-principles corpus)` · `Sequence: plan Phase 0.1 + 1.5`
- **Origin:** the neutral spec missed the append-only / non-destructive / provenance substrate stance (grounded in
  `docs/conceptual-foundations.md` "append, never overwrite" and `input docs/substrate-principles-and-scenarios.md`
  "never destructive … any prior state reconstructable"). Surfaced while working the object-graph lifecycle (BR-16).
- **Done:** `feat IP-4` (append-only · non-destructive-removal · provenance) added to `spec/internal-primitives.mdl`,
  framed as **substrate richness / divergent** (like the multi-predecessor DAG), confirmed by Steve (`7ea8aba`, `83068c5`).
  **ECHO removal-history feasibility gate VERIFIED GREEN** (`32b1f48`): `db.remove` is already a reversible tombstone —
  it flips `system.deleted`, keeps data inline, retains automerge history; re-`add` restores; relations remove the same
  way. So the build needs **no custom tombstone mechanism**.
- **Pending:**
  - **`IX-reversible` fold** (undo = append a corrective event / un-tombstone, as the `IP-4` consequence; decision D3) →
    `spec/interaction-primitives.mdl`. Plan Phase 0.1.
  - **Non-destructive removal realized in the build** — removal uses `db.remove` as-is; **do not** invoke compaction /
    `unlinkDeletedObjects` on Bramble objects. Rides BR-16 lifecycle (plan Phase 1.5).
- **Provisos (recorded):** no high-level `getHistory`/`restore` API (re-`add` is the restore; a history affordance is a
  future build); keep compaction off Bramble objects. See [`design-object-graph.md`](./design-object-graph.md) §3/§7.5.
- **Cross-links:** `FLOW.md` → Pending propagations (non-destructive substrate); the RESUME POINT in `design-object-graph.md`.

## BR-19 — Type-agnostic discrimination under schema A (`@`-picker scope + surface routing)
`Status: open` · `Type: enhancement / build` · `Source: plan Phase 1.2 surface-map, 2026-07-15; recast 2026-07-16` · `from: BR-16` · `grounded-by: UP-2, UP-3, IP-1.typed-node`
- **Recast (2026-07-16) — the original "pure-A breaks UI discrimination, A-vs-B needs re-settling" framing is WITHDRAWN as ungrounded.** It rested on a false premise — that the `@`-picker's intended target set is "bramble rows." The neutral spec (`UP-2` *"the user links to a Node"*, `UP-3` *"any Node is a link destination"*, `IP-1.typed-node` *"unchanged by its type"*) **and** the design (`design-object-graph.md` §1 *"Type re-enters only at the edges of the system … by dispatch, never in the substrate"*, §2 *"regardless of type"*, §3 *"all types"*, §4 *"any node"*) already require linking **any node, whatever its type**. So **D2 = schema A stands, confirmed**; there is no discrimination to "re-settle." (Root-cause + prevention: Resolution protocol #6; FLOW gate clauses 6–7.)
- **The real, narrow, type-agnostic work under schema A:**
  - **`@`-picker scope** — offer *any* node as a mention target (not `Filter.type(Node)`); grounded by `UP-2`/`UP-3`/`IP-1.typed-node`. (`useMentionPicker.ts:33`.) **Open, UNVERIFIED refinement (not grounded — do not adopt without its own basis):** whether to *exclude* an object that is purely another object's `content`/ref-target (e.g. a `Markdown.Document`'s body `Text.Text`). By design §1 every `Obj` is a valid node/target, and `UP-3`/`IP-1.content` prefer the inner unit over its container — so any exclusion needs its own grounding (`IP-1.content-type`? a content-carrier vs a structural node) **and** a reverse-ref feasibility gate first.
  - **Surface routing** — no bramble-vs-markdown `Text.Text` collision arises because **schema A registers no `Text.Text` surface** (text renders via the inline row editor, `design-object-graph.md:70`); the Bramble *outline* is opened at its container/day root (D1/BR-3), and "render as an outline" is discriminated by **edge membership** (has bramble structural edges), not type.
- **`grounded-by`:** `UP-2`, `UP-3`, `IP-1.typed-node` (spec). This is a **build task under D2/A**, not a reshape of it. Folds into 1.3 (routing) / 1.5 (picker).

## BR-20 — Uniform text equivalent per node in the outline; native rendering on command
`Status: open` · `Type: neutral requirement (move-up)` · `Source: design intent (Steve, 2026-07-16)` · `grounded-by: Steve design-intent 2026-07-16 (a Steve call); Tana precedent (R confirmation pending)` · `supersedes: design-object-graph §4:139 (native-inline default)` · `from: plan 1.3a/1.3b`
- **Intent (Steve, 2026-07-16):** every node — a text bullet, an ECHO Person, an ECHO Sketch, any type — has a
  **text equivalent** (its label). (a) The outline **row shows that text by default** (collapsed), uniformly for
  every node regardless of type; (b) the node's **type-native rendering** (the Person card, the Sketch canvas)
  appears **on command**, as a secondary view — *not* inline in the row by default.
- **Altitude: NEUTRAL (Steve's call).** Primarily a **`PX`** requirement (the outline presents any node as a text
  equivalent on its row) coupled with the existing secondary-view capability (`UP-5` / the 2×2 *native* cell) for the
  on-command native rendering. Looks **floor-worthy**: this is Tana's model — a typed / supertag'd node still shows as
  a text bullet in the outline; its fields / native view appear on expand. (Confirm against the Tana R realization
  before promoting to floor.)
- **Divergence to correct (the design + build currently do the INVERSE — native-first):**
  - `design-object-graph.md` §4:139 — *"Inline row = compact type-content (text → editor; **Person → its Section
    surface**; …)"* puts the native surface on the row line by default. §4 also has native as the 2×2 *secondary-view*
    cell, so native appears in two places — this req resolves that: the line is always the text equivalent; native is
    **only** the secondary view.
  - Build **1.3a** — `OutlineRow` renders `Obj.instanceOf(Node) ? <RowEditor/> : <Surface Section/>` (a non-`Node` row
    shows its native Section surface **inline**, with `Obj.getLabel` only as a *fallback*). Native-first; the intent is
    text-first. The label the intent wants (`Obj.getLabel(obj)`) is already computed — wired as the fallback, needs to
    become the default.
- **Work (move-up → down):**
  1. **Author the neutral req** (`PX`: uniform text equivalent per node in the outline row; native rendering is the
     secondary view per `UP-5`/2×2) — present for review; confirm the Tana R instance.
  2. **Propagate to `design-object-graph.md` §4** — row line = text equivalent for every node; native = 2×2
     secondary-view only (drop the "Person → Section surface inline" default).
  3. **Rework 1.3a** — invert the branch: every row renders its text equivalent by default; the native Section surface
     moves to the secondary-view command (the 2×2 *native* cell).
  4. **Re-scope 1.3b** — "non-text rows" is a misnomer (all rows are text by default); 1.3b becomes the
     native-render-on-command gestures + any per-type label specifics.
- **Cross-refs:** BR-16; `design-object-graph.md` §4 / §5 (`UP-4`/`UP-5` 2×2); plan 1.3a / 1.3b.
