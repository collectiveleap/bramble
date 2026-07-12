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
**S5 · Plan 1 (substrate) is written** —
`implementations/dxos/plans/2026-07-11-plan-1-substrate.md`: 5 TDD tasks building
`@dxos/plugin-bramble`'s `Node`/`Edge` schema + edge algebra + scaffold in the
DXOS monorepo (`~/sandbox/dxos`), plugin-facing APIs only, grounded in a DXOS-API
research pass. **Next action:** execute Plan 1 (subagent-driven or inline), then
Plan 2 (outline surface).

## Pipeline & status

Status values: `not-started · authoring · needs-review · done`.

| Stage | Artifact | Role | Status |
|---|---|---|---|
| S1 · Neutral substrate spec | `spec/internal-primitives.mdl`, `spec/user-primitives.mdl` | neutral | done |
| S2 · Neutral interaction spec | `spec/interaction-primitives.mdl` | neutral | draft |
| R · Reference realization (Tana) | `implementations/tana/` | reference | current |
| S3 · Gap analysis — substrate | `implementations/dxos/gap-analysis.md` | target | done |
| S3 · Gap analysis — UX | `implementations/dxos/gap-analysis-ux.md` | target | done (→ new plugin needed) |
| S4 · DXOS design | `implementations/dxos/design.md` | target | current (design complete §1–§4) |
| S5 · Plan | `implementations/dxos/plans/` | target | authoring (Plan 1 substrate written) |
| S6 · Plugin code | (hosting deferred) | target | not-started |

## Artifact index

| Artifact | derives-from | Notes |
|---|---|---|
| `spec/internal-primitives.mdl` | — | SIP (neutral, upstream root) |
| `spec/user-primitives.mdl` | IP-* | SUP |
| `spec/interaction-primitives.mdl` | UP-*, IP-* | S2 neutral UX — IDs `UX-<n>.<concern>` |
| `implementations/tana/user-experience.md` | UX-*, UP-* | Tana behavioral realization |
| `implementations/tana/visual-spec.md` | UP-1, IP-1 | Tana computed-style visual reference (+ `visual/tana-outline.json` mapping) |
| `implementations/dxos/gap-analysis.md` | IP-*, UP-* | substrate gap analysis (done) |
| `implementations/dxos/gap-analysis-ux.md` | UX-*, Tana R | UX gap analysis |

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
   the upstream req(s) it realizes (`UP-*` / `IP-*` / `UX-*`). Nothing is
   *un-grounded* — no mechanism imported from the target system (a UI convention,
   an API) that lacks a neutral counterpart. (This gate is what would have caught
   the Composer `@@` block-embed in the DXOS design — a convention with no UP/IP.)
2. **Grep both directions.** The `derives-from` header lists the upstream reqs;
   `grep` each confirms coverage. An element with no trace is either fixed, or
   explicitly dispositioned (out-of-floor / move-up) — never left silent.
3. A failed trace **blocks delivery** until resolved.

### Pending propagations

_(none open.)_

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
