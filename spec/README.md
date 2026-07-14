# Table-stakes primitive specifications

Four system-agnostic specifications of the table-stakes primitives for the networked-notes / outliner / PKM product class (the class of Roam, Tana, Obsidian), plus a guide for using them downstream.

- **[internal-primitives.mdl](internal-primitives.mdl)** — **Internal substrate (SIP, `IP-*`)**: the substrate as a directed acyclic graph.
- **[user-primitives.mdl](user-primitives.mdl)** — **User capabilities (SUP, `UP-*`)**: what the user can do, assuming the substrate.
- **[interaction-primitives.mdl](interaction-primitives.mdl)** — **User interaction (`IX-*`)**: the *manner* of those capabilities (directness, in-flow, immediacy, reversibility), modality-independent.
- **[presentation-primitives.mdl](presentation-primitives.mdl)** — **User presentation (`PX-*`)**: how the outline is shown (marks, disclosure, nesting, state, rhythm, theme).
- **[gap-analysis-guide.md](gap-analysis-guide.md)** — how a downstream process uses these to evaluate an existing system X and produce a gap analysis.

Each requirement carries a **conformance test** (its `given/then`) and **probes** (questions that size the work when X fails it). Every user-facing `feat` carries `traces:` to the internal primitives it assumes, so an internal gap auto-flags the user capabilities it breaks. The `IP-*` / `UP-*` IDs are stable reference targets — downstream gap analyses, change specs, and separate user-experience specs cite them.

## Layers and conformance status

The specs are **layers**, each named for its noun:

- **Internal substrate** (`IP`) — the substrate as a DAG.
- **User capabilities** (`UP`) — what the user can do, assuming the substrate.
- **User interaction** (`IX`) — the *manner* of those capabilities (directness, in-flow, immediacy, reversibility), modality-independent.
- **User presentation** (`PX`) — how the outline is shown.

These four are **neutral** (system-agnostic). System-specific work lives one layer out, under `implementations/<system>/`: a **design** layer (a target being built — e.g. DXOS) or a **reference** realization (an existing exemplar — e.g. Tana).

Within the neutral layers, each requirement has a **conformance status**:

- **floor** — a committed table-stakes requirement (the numbered `IP/UP/IX/PX-*`). The bar is *strong evidence + judgment*: a capability may enter the floor on the strength of Tana plus one other system, without waiting for all three — the gap-analysis probes carry the per-system verdict.
- **appendix** — a *candidate for the class*: plausibly table-stakes but unverified as shared, held out of the floor pending a verification pass (e.g. daily-note, search).

**Where a behavior richer than a reference system belongs**, by noun:

- a richer **internal substrate** — one that still delivers the user floor but exceeds a reference system's substrate — stays in `IP`; the reference system is recorded **divergent** in the gap analysis (e.g. multi-predecessor edges vs Tana's owner + reference). Substrate richness lives here; the neutral *user* floor stays what the reference systems actually share.
- a **user capability** that is a plausible class candidate but unverified → **user capabilities**, *appendix* status.
- a **user capability that no reference system does** (a Bramble-specific enhancement) → the **design** layer (`implementations/<system>/`), never the neutral user-capabilities floor.

## The model in one breath

One design choice drives everything: **where reference-based tools introduce a "reference" to avoid creating another edge, this substrate creates a real edge instead.** There is no separate reference primitive; multiplicity is native to the graph.

- **Node** — the atomic content unit and only vertex kind; stable identity; content of an open set of types (text or non-text).
- **Structural edge** — directed `predecessor → successor`; multi-predecessor is first-class (one Node appears in many outline locations as one vertex); the structural subgraph is **acyclic** — the DAG backbone.
- **Linked edge** — a directed cross-reference (`[[X]]`-style mention); does not nest its target; **may cycle**; backlinks are incoming linked edges by reverse traversal; expandable inline (edit-through), on demand.

## Decision log (what is deliberate)

Read this before revising — these choices are intentional, not accidents.

1. **User behavior follows Roam/Tana/Obsidian, at Tana's semantics where the three differ.** Typed objects (Tana supertags / DXOS ECHO types) and calendar/search nodes sit above the floor — optional, not table-stakes; typed objects are *accommodated but not required* by the SIP (`IP-1.typed-node`).
2. **The internal model deliberately diverges from all three:** real edges, not references; **multi-predecessor** structural edges, not single-owner; **typed** edges (structural vs linked). A system can satisfy the SUP while failing the SIP (e.g. Tana — see validation).
3. **Acyclicity binds the structural subgraph only.** Linked edges may cycle; inline expansion is on demand, so cycles never force unbounded rendering.
4. **Scope = the numbered user primitives (`UP-1`…`UP-5`).** Daily-note/journal and search/query are candidate extensions in the SUP appendix, outside the conformance floor (verified for Tana only, not as shared). `UP-5` (secondary view) entered the floor on Tana + Roam evidence (Obsidian unverified), per the strong-evidence bar (see *Layers and conformance status*).
5. **Backlinks — split bar.** SIP requires inbound linked edges be enumerable/reverse-traversable; SUP requires a user-visible backlinks view. A query language is above the floor.
6. **Content type is open.** A Node may hold text or non-text (drawing/audio/widget…); all primitives apply uniformly. No type is enumerated. Distinct axis: a Node MAY also carry a *schema-type* (a named type with typed fields) — optional and additive, accommodated by `IP-1.typed-node`, not required.
7. **Neutral interaction and presentation are in scope** — the `IX` and `PX` facets (the *manner* of the capabilities and the *look* of the outline, at law altitude). Only **concrete mechanics** (specific keystrokes, `@` vs `[[ ]]` syntax, exact panel behavior) stay out of the neutral specs; those live in the reference realization (`implementations/tana/user-experience.md`) and the target design, and cite the `UP-*` / `IX-*` / `PX-*` IDs.

## Conventions (when editing the specs)

- **`R-Conformance-Format`** (declared in each spec): every req has ≥1 conformance-test clause *sufficient* to decide conformance — no definition-only reqs; every req has `probes:`; every SUP feat has `traces:`.
- **`R-Spec-Entry-Conventions`** (house rule, `input docs/PLUGIN.mdl`): positive language; one concern per req; concern-named req IDs (`IP-<n>.<concern>`); refer-don't-restate; divorce-from-rendering; abstract `#T` example types.
- **DAG terminology:** PREDECESSOR / SUCCESSOR, structural / linked edge — never PARENT / CHILD, never "reference" as a primitive.
- **No undefined UI nouns** ("document", "page") in invariant clauses; express granularity via Node + successor. Such nouns may appear only as *examples* inside probes (e.g. "a file or page").
- **System-agnostic:** invariant clauses must read the same whether X stores the substrate as files, rows, or objects.

## Spec completeness sweeps (before a spec is called complete)

The failure these prevent: **specs describe a noun's *state* but under-enumerate the *verbs* on it and the *modalities* for each verb — and the implicit ones get under-realized downstream.** Two capabilities were found missing this way after the fact (`UP-1.author` = create/edit/remove; `UP-1.reshape` = reorder/move/re-nest, and its drag realization). The generalizable rule: **enumerate the full VERB set on each noun and the full MODALITY set for each verb — not just the noun's state.** Run these sweeps when authoring or revising:

1. **Full verb set on each noun.** For each substrate noun (Node, edge, the outline), list every verb the user applies — create, edit, remove, **and reshape** (reorder / move / re-nest an existing unit). Reshape hides inside "it's nested"; name it as its own capability so gestures that *only* reshape (drag, indent/outdent/reorder) have something to trace to. An implicit capability is the one that gets missed.
2. **Modality-independence.** A capability is invariant across input modality. For each capability/law, enumerate every modality it can have — keyboard, pointer-click, **direct-manipulation drag** — and treat them as interchangeable realizations. Never spec keyboard-only.
3. **Continuous gestures.** A discrete "trigger → response" format silently misses continuous / direct-manipulation gestures (drag, resize, marquee) that have a **press → track → commit** lifecycle. Sweep for them explicitly and give each a first-class entry, not a one-liner riding on a keyboard gesture.

The three sweeps above are **input-side** — what acts on a noun. Two more cover the **output** of a capability and the **shape** of the primitives themselves:

4. **Output-side: render-modes of a result.** For each capability whose result is *rendered* (a reference, an embed, a backlink, a query result), enumerate its full set of **render-modes** — e.g. a reference: collapsed chip / expanded embed / opened beside — and for each mode its **editability** (atomic/read-only vs edit-through) and **liveness** (reflects the source in realtime vs static). Never spec a single render/edit behaviour for a result that has multiple modes. (The miss this prevents: the atomic collapsed mention and the secondary-view unification were under-specified because only the *inputs* to references were swept, never the *modes* their result renders in.)
5. **Factor shared-shape families.** When ≥2 primitives share a structural shape — e.g. both are directed relations over the same noun (structural edge, linked edge) — do not leave them as parallel one-offs. Name the general abstraction (edge), enumerate the **axes** members differ on (containment · cyclicity · shared-identity · expansion), and define capabilities **over the axes, not the specific members**, so the set stays open; a new member must declare its axes. (The miss this prevents: the edge family stayed implicit — capabilities were written per-kind — until the extensibility question forced it out.)

(The reference-realization instance of these sweeps lives in `implementations/tana/user-experience.md`'s "Capture method" note.)

**These run downstream too.** A **reuse anchor** or imported target-system mechanism in a design/plan is not exempt: re-derive it against current canon *at the moment of use* — a carried-over reuse list is the same class of miss as an un-swept concern. Derive the mechanism from the **principle first**, then pick reusable pieces for it (never let the target system's convention pick the mechanism). The delivery gate (`FLOW.md`, clause 4) enforces this on the propagated design.

## How to regenerate from scratch

1. Research the data model and core interactions of Roam, Tana, Obsidian from primary sources; verify shared vs unique (the `/deep-research` harness produced the original corpus).
2. Take the intersection of user-observable capabilities; resolve differences to Tana (decision 1).
3. Express the substrate as the DAG model above (decisions 2–3, 6).
4. Author the **SIP first**, then the **SUP** (it assumes the SIP). One primitive deep for review, then batch the rest; honor the conventions.
5. Validate (below). The specs must discriminate and keep the two layers separable.

## How to revise

- Changing a **decision-log** item ripples to specific reqs: e.g. flipping decision 3 (acyclicity scope) changes `IP-3.may-cycle`; flipping decision 5 changes `IP-3.backlinks` and `UP-2.backlinks-view`. Update the decision log in the same commit.
- Keep `traces:` consistent — if a new SUP capability assumes an internal primitive, add the trace.
- Re-run validation after any change; a revision that makes Tana fail an SUP req, or makes a Markdown/file model pass `IP-2.*`, is a signal the change was wrong or the altitude slipped.

## Validation (current)

Dry-run verdicts (see [gap-analysis-guide.md](gap-analysis-guide.md) for method):

- **Tana** → SUP fully satisfied; SIP divergent on exactly `IP-2.multi-predecessor` and `IP-2.shared-identity` (Tana uses owner + reference, not multi-predecessor edges — confirmed empirically). This UP-pass / SIP-divergent split is the property the two-spec design exists to expose.
- **Markdown / file model (Obsidian)** → gaps at both layers; passes only the cross-reference/backlink cluster (`IP-3.cross-reference/may-cycle/backlinks`, `UP-2.*`).
