# Table-stakes primitive specifications

Two system-agnostic specifications of the table-stakes capabilities for the networked-notes / outliner / PKM product class (the class of Roam, Tana, Obsidian), plus a guide for using them downstream.

- **[internal-primitives.mdl](internal-primitives.mdl)** — the **Specification of Internal Primitives (SIP)**: the substrate as a directed acyclic graph.
- **[user-primitives.mdl](user-primitives.mdl)** — the **Specification of User Primitives (SUP)**: the user-facing capabilities, written assuming the SIP.
- **[gap-analysis-guide.md](gap-analysis-guide.md)** — how a downstream process uses these to evaluate an existing system X and produce a gap analysis.

Each requirement carries a **conformance test** (its `given/then`) and **probes** (questions that size the work when X fails it). Every user-facing `feat` carries `traces:` to the internal primitives it assumes, so an internal gap auto-flags the user capabilities it breaks. The `IP-*` / `UP-*` IDs are stable reference targets — downstream gap analyses, change specs, and separate user-experience specs cite them.

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
4. **Scope = core 4 user primitives.** Daily-note/journal and search/query are candidate extensions in the SUP appendix, outside the conformance floor (verified for Tana only, not as shared).
5. **Backlinks — split bar.** SIP requires inbound linked edges be enumerable/reverse-traversable; SUP requires a user-visible backlinks view. A query language is above the floor.
6. **Content type is open.** A Node may hold text or non-text (drawing/audio/widget…); all primitives apply uniformly. No type is enumerated. Distinct axis: a Node MAY also carry a *schema-type* (a named type with typed fields) — optional and additive, accommodated by `IP-1.typed-node`, not required.
7. **Interaction mechanics are out of scope** (`@` vs `[[ ]]`, panels, clicks, expand/collapse). Separate UX specs own those and cite the `UP-*` IDs.

## Conventions (when editing the specs)

- **`R-Conformance-Format`** (declared in each spec): every req has ≥1 conformance-test clause *sufficient* to decide conformance — no definition-only reqs; every req has `probes:`; every SUP feat has `traces:`.
- **`R-Spec-Entry-Conventions`** (house rule, `input docs/PLUGIN.mdl`): positive language; one concern per req; concern-named req IDs (`IP-<n>.<concern>`); refer-don't-restate; divorce-from-rendering; abstract `#T` example types.
- **DAG terminology:** PREDECESSOR / SUCCESSOR, structural / linked edge — never PARENT / CHILD, never "reference" as a primitive.
- **No undefined UI nouns** ("document", "page") in invariant clauses; express granularity via Node + successor. Such nouns may appear only as *examples* inside probes (e.g. "a file or page").
- **System-agnostic:** invariant clauses must read the same whether X stores the substrate as files, rows, or objects.

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
