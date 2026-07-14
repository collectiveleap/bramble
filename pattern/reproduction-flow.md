# Reproduction-flow pattern — metadata

<!-- role: neutral · product-agnostic method; status: authoring (incremental) -->

The reusable pattern behind the Bramble flow, captured as **metadata** so it can
be repurposed for other products.

**Two kinds of thing, two kinds of relation.**

- **Processes** are nodes — *verbs* ("describe the internal substrate", "capture the
  reference"). **Assets** are what flows on the edges — the *artifacts* a
  process reads or writes.
- **produce / consume** relates a **process ↔ asset** (a process consumes input
  assets and produces output assets).
- **derives-from** relates an **asset ↔ asset** — a consistency dependency (asset
  B is written in asset A's terms and must stay consistent with it). It is **not**
  a production order and does **not** sequence the processes.

**Pattern vs. instance.** Each process's **question** and the asset **roles** are
the reusable *pattern*; the **answers** and asset **content** are *this instance*
(PKM · Tana · DXOS). Swap the answers to reproduce a different product.

**Facets are peers.** The facet processes (P1–P3, and presentation) each describe
one facet of the product from the same `domain` input; there is **no forced order**
among them — only `derives-from` consistency between their assets.

**Two halves — abstract, then synthesize.** The flow folds at the
reference/target boundary:

- **Top half — ABSTRACT.** Turn a *domain of existing solutions* (PKM tools) into
  a *neutral form* (the facet assets IP · UP · IX · PX). System-agnostic distillation:
  many solutions → one neutral description.
- **Bottom half — SYNTHESIZE.** Build a *new solution* from the neutral form **+**
  a *target architecture* (DXOS/Composer, observed as `T0`) **+** *specific
  choices* derived from an *example* (Tana). Construction: neutral + platform +
  example → a new instance.

`P4` is the **hinge**: it realizes the neutral form against the *example* (Tana)
and hands the bottom half its specific choices.

**Realize-against-a-system symmetry.** `P4` and `P5–P8` are the *same operation* —
*realize the neutral form against a concrete system* — differing only in the system
and the verb: `P4` **documents** an existing example (Tana → `R.beh`/`R.vis`,
Tana-specific answers); `P5–P8` **compare-then-build** the target (DXOS/`T0`,
guided by Tana → `CODE`, DXOS-specific answer). Both consume *neutral form + a
system observed*.

## Rendering (how to draw this) — domain-independent grammar

These rules turn the data below into the diagram for **any** instance. Swap the
domain, the example, and the target — the grammar does not change. No rule below
names a specific domain/system; the `e.g.` items are illustrations only.

**Shapes** (shape alone must distinguish the two kinds):
- **Process = rectangle** (rounded), plain fill, labeled with its verb. Dashed
  border if the process is `MISSING` or `inferred`.
- **Asset = pill** (stadium), never a rectangle.

**Asset color = `role`:** `neutral`=blue · `reference`=amber · `target`=green ·
`MISSING`=red dashed · `input`/source=grey.

**Edges are relationships — completeness both ways:** every `consumes`/`produces`/
`derives_from` in the data is an edge, and every edge is a data relationship.
- **produces / consumes** = solid arrow, drawn *process → asset → process*.
- **derives-from** = dashed arrow, drawn *asset → asset* (consistency; carries no
  asset; implies no order). Draw it wherever it adds information the produces/
  consumes edges don't already carry: **always** between peer assets, and
  **always** for a grounded/ungrounded distinction — if an asset's `derives_from`
  target is `MISSING`, draw a broken dashed arrow to that missing asset (this is
  how the diagram shows "ungrounded"). It may be **omitted** where it would merely
  restate the producing process's `consumes` (a downstream asset grounded in
  exactly what its producer consumed) — note such omissions.

**Multi-consumer asset = a standing-reference lane:** an asset consumed at several
far-apart points is drawn **once** as a labeled lane each consumer taps — not
repeated per consumer, not a bare unlabeled rail.

**Realize/compare-against-a-system process:** a process that consumes the neutral
form plus an observed system takes that **observed system as an explicit input
asset**. A **gap** process additionally must show BOTH compared sides — the
*should-be* (neutral + reference assets) and the *is* (the target-baseline input);
a gap cannot be drawn from one input.

**Layout:** two halves top-to-bottom — **ABSTRACT** (domain → neutral form) above,
**SYNTHESIZE** (neutral form + target + example choices → new solution) below,
folded at the reference hinge. Zones read by asset color + legend, not an axis label.

## Processes (nodes)

```yaml
- id: P0
  question: "What are you trying to (re)produce?"
  answer: "a typical Personal Knowledge Management (PKM) tool"
  consumes: []            # external: the human's goal
  produces: [domain]

# --- neutral facet processes (peers; no order among them) ---
- id: P1
  facet: true
  question: "How is the product's content structured?"
  answer: "a DAG of addressable Nodes joined by structural and linked edges"
  consumes: [domain]
  produces: [IP]

- id: P2
  facet: true
  question: "What can a user do with it?"
  answer: "nest/outline, link & backlink, address any Node, transclude"
  consumes: [domain]
  produces: [UP]

- id: P3
  facet: true
  question: "How does the user interact with it?"
  answer: "directly, in-flow, immediately, reversibly (gesture laws)"
  consumes: [domain]
  produces: [IX]

- id: P-present
  facet: true
  status: MISSING          # no process authored — the root-cause gap
  question: "How does the product present itself (visually)?"
  answer: null
  consumes: [domain]
  produces: [PX]

# --- reference capture ---
- id: P4
  question: "Which existing product exemplifies this, to copy concretely?"
  answer: "Tana"
  consumes: [IP, UP, IX, PX, Tana.obs]   # neutral form frames WHAT to capture; Tana.obs is the observed exemplar
  produces: [R.beh, R.vis]                 # Tana-SPECIFIC answers to the neutral facets

# --- target side (DXOS/Composer) — what we have actually done ---
- id: P5
  question: "What does the target already provide vs must be built?"
  answer: "ECHO substrate is strong & reusable; but no surface gives every bullet Node identity → a new Bramble plugin is needed"
  consumes: [IP, UP, IX, R.beh, R.vis, T0]   # compares should-be (neutral+reference) vs is (T0)
  produces: [GA]

- id: P6
  question: "How will the target reproduce it?"
  answer: "bespoke outline shell over ECHO Nodes + reified ordered edges; hybrid rendering; gesture→edge mapping; local view-state"
  consumes: [GA, R.beh, R.vis]
  produces: [DZ]

- id: P7
  question: "What are the build steps?"
  answer: "superpowers plans 1, 2a, 2b, 2c (substrate → read-only → editable → structure)"
  consumes: [DZ]
  produces: [PL]

- id: P8
  question: "Build it — does it match?"
  answer: "@dxos/plugin-bramble; plans 1+2a+2b built, 2c underway; unit/story/lint green"
  consumes: [PL, R.vis]          # built to the visual reference
  produces: [CODE]

- id: Gate
  inferred: true
  question: "Is it complete / does it conform?"
  answer: "visual diff (Storybook): 4/4 regions matched → PASS — but the surface does not look like Tana (FALSE GREEN)"
  consumes: [CODE, R.vis]
  produces: [verdict]
```

## Assets (edges)

```yaml
domain:
  name: "the domain of existing solutions (PKM tools)"
  role: input
  produced_by: P0
  derives_from: []

IP:
  name: "neutral internal substrate"
  role: neutral
  produced_by: P1
  derives_from: []
  artifact: "spec/internal-primitives.mdl (SIP)"

UP:
  name: "neutral user capabilities"
  role: neutral
  produced_by: P2
  derives_from: [IP]          # written in IP's vocabulary
  artifact: "spec/user-primitives.mdl (SUP)"

IX:
  name: "neutral interaction manner"
  role: neutral
  produced_by: P3
  derives_from: [UP]          # laws scope over the capabilities
  artifact: "spec/interaction-primitives.mdl"

PX:
  name: "neutral presentation"
  role: neutral
  produced_by: null           # MISSING — no producing process
  derives_from: [IP, UP]
  artifact: null              # gap since RESOLVED — authored as PX-* in spec/presentation-primitives.mdl (2026-07-13)

T0:
  name: "target baseline — DXOS/Composer as-is (observed)"
  role: target
  produced_by: null           # external observation of the TARGET system
  derives_from: []
  artifact: "(the running Composer / ECHO APIs)"

Tana.obs:
  name: "the example product, observed (Tana)"
  role: input                 # source; the exemplar P4 realizes the neutral form against
  produced_by: null           # external observation of the EXAMPLE system
  derives_from: []
  artifact: "(the running Tana web app)"

R.beh:
  name: "Tana-specific behavior realization (R·beh)"
  role: reference
  produced_by: P4
  derives_from: [UP, IX]      # grounded — Tana's answer to capabilities + interaction
  artifact: "implementations/tana/user-experience.md"

R.vis:
  name: "Tana-specific visual realization (R·vis)"
  role: reference
  produced_by: P4
  derives_from: [PX]        # UNGROUNDED — PX does not exist
  artifact: "implementations/tana/visual-spec.md (+ visual/tana-outline.json)"

GA:
  name: "Gap analysis (substrate + UX)"
  role: target
  produced_by: P5
  derives_from: [IP, UP, IX, R.beh, R.vis]
  artifact: "implementations/dxos/gap-analysis.md, gap-analysis-ux.md"

DZ:
  name: "Target design"
  role: target
  produced_by: P6
  derives_from: [GA, R.beh, R.vis]   # visual design inherits R.vis's blind spots
  artifact: "implementations/dxos/design.md"

PL:
  name: "Implementation plans"
  role: target
  produced_by: P7
  derives_from: [DZ]
  artifact: "implementations/dxos/plans/*.md"

CODE:
  name: "The plugin"
  role: target
  produced_by: P8
  derives_from: [PL, R.vis]          # visual chrome built to an incomplete reference
  artifact: "packages/plugins/plugin-bramble"

verdict:
  name: "Delivery/gate result"
  role: target
  produced_by: Gate
  derives_from: [R.vis]              # checks CODE only against what R.vis captured
  note: "PASS (4/4) — but trace/coverage-blind, so it green-lit a non-matching surface"
```

## Root cause (in the pattern's own terms)

**A produced asset (`R.vis`) whose upstream dependency (`PX`) has no producer.**
The neutral facets describe structure, capabilities, and interaction *manner* —
never **presentation** — so `P4` captures Tana's visuals ad-hoc, with no neutral
asset to frame or completeness-check them.

**It propagates.** `R.vis` is consumed downstream, so its blind spots are
inherited by everything built on it:

```
R.vis  ──▶ DZ (P6 design)  ──▶ CODE (P8 build)  ──▶ Gate
   (incomplete)   (visual design         (chrome built to an   (checks CODE only
                   inherits the gap)      incomplete reference)  against R.vis)
```

**The Gate can't catch it.** The delivery check only asks "does each captured
element trace up / match?" — `R.vis` had 4 regions, `CODE` matched all 4 → **PASS
(false green)**, while the surface still didn't look like Tana. A trace/coverage-
blind gate certifies an incomplete reference as done.

## Proposed change (address the root cause)

1. **Author the missing facet process** `P-present` → `PX` (neutral presentation
   concern-set: mark · disclosure · nesting · states · rhythm · theme; no pixels).
   **✓ Done 2026-07-13:** authored as `PX-*` in `spec/presentation-primitives.mdl`
   (naming resolved — `PX`, not `UX`, since "UX" is the broad experience umbrella,
   not one facet; `IX`+`PX` are the two *surface* facets).
2. **Re-ground `R.vis`**: `derives_from: [PX]` becomes real; re-capture Tana
   *completely* against `PX` (the 5px dot, 24px gutter, states, theme — already
   largely measured).
3. **Upgrade the Gate**: from "trace-up / match captured" to "trace-up **and**
   cover every `PX` concern" — so a narrow green can't recur.
4. **Propagate down** (move-down): `grep` the changed assets; mark `DZ`/`CODE`
   `needs-review`; re-derive the visual design + chrome against the re-grounded
   `R.vis`; re-run the upgraded Gate.

This is the same shape as the earlier drag/reshape move-up (U3): a concern with no
neutral producer, given one, then propagated — now generalized as a reusable step
of this pattern.

## Method additions (2026-07-14 · references move-up)

The references move-up surfaced two more completeness gaps — the same shape as the
`PX` gap (a blind spot that propagates, a gate that can't catch it) — on new axes:

- **Output-side blind spot.** The completeness sweeps swept *inputs* (verbs on a
  noun, modalities per verb) but never the *output* — the render-modes a
  capability's result takes and each mode's editability/liveness. References'
  atomic-collapsed mode and the secondary-view unification slipped through.
  → **`spec/README` sweep 4** (output-side: render-modes × editability × liveness).
- **Un-factored family.** Primitives sharing a structural shape (structural edge,
  linked edge — both directed node→node relations) were written as parallel
  one-offs; the edge *family* and its axes stayed implicit until the extensibility
  question forced them out. → **`spec/README` sweep 5** (factor shared-shape
  families: abstraction + distinguishing axes + capabilities-per-axis; a new member
  declares its axes).
- **Gate extended.** `FLOW.md` clause 3 now checks coverage on three dimensions —
  facet **concerns**, capability **render-modes**, and edge **axes** — so either new
  omission fails the gate rather than slipping.

Generalized lesson (U3/U4/this): a completeness sweep must cover a primitive's
inputs, its output modes, AND the shape it shares with its peers; the gate must
check every dimension the sweeps enumerate, not a hand-picked subset.

## Move-down leftover (2026-07-14b · references design → build)

A second failure, on the **move-down** side. Propagating the unify decision to the design layer, the
headline model of `design-references.md` was rewritten but its **"reuse anchors" were carried over
verbatim from the pre-unify research** — still naming Composer's `xmlTags` / markdown-URL marker. The
chip anchor then contradicted the model two lines above it (marker-references-the-edge), and grounding
the build plan in the target system's code followed the stale anchor. The delivery gate — whose clause 1
exists for exactly this ("no imported target-system mechanism without a counterpart") — was **never run
on the propagated design**, only on code.

Root causes: (1) a move-down that scrubbed the headline model but not the **secondary sections** (reuse
lists); (2) a reuse list treated as durable rather than re-derived against the new canon; (3) the
design→build seam, where immersion in the target system's code lets its conventions **pick the
mechanism** instead of the principle.

Fixes (`FLOW.md` gate clause 4 + `spec/README`): the move-down **ends by running the gate on the design
artifacts**; reuse anchors are re-derived at use, never carried across a canon change, and the secondary
sections are scrubbed too; and the **direction rule** — principle → mechanism → reuse, never
target-convention → mechanism.

## Validation (data ↔ diagram)

Every relationship in the data must appear as an edge in the diagram, and every
edge must be a data relationship. Audit result:

**Fixed in the current-state diagram** (were in the data, were not drawn):
- `R·beh → P6` (P6 consumes `R·beh`) — this makes `R·beh` a two-consumer asset
  (`P5`, `P6`).
- `R·vis ⇢ PX` — the ungrounded link; drawn as a **broken dashed arrow to the
  MISSING `PX`** (the rule's way of showing "ungrounded").
- `R·beh ⇢ UP, IX` — the grounded contrast against `R·vis`.

**Intentional omissions** (derives-from that merely restates the producing
process's `consumes`, permitted by the render rule): `GA ⇢ …`, `DZ ⇢ …`,
`CODE ⇢ …`, `verdict ⇢ …`.

**Optional / low value:** `PX ⇢ IP, UP` — `PX` does not exist yet.

**Note:** the neutral-form standing lane carries `IP · UP · IX` to both `P4` and `P5`;
`PX → P4` is a separate MISSING edge, not part of the lane.
