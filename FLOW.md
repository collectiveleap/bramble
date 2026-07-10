# Bramble — Flow Map

> Read this first. It is the living spine for the whole Bramble flow: neutral
> spec → reference realization → gap analysis → design → plan → plugin. It is
> never closed out. The operating model is specified in
> `plan/2026-07-10-flow-management-spine-design.md`; conventions are in
> `CLAUDE.md`.

## Active work

**Where we are:** management spine stood up. **Next action:** author S2 (the
neutral interaction spec) as its own brainstorming cycle.

## Pipeline & status

Status values: `not-started · authoring · needs-review · done`.

| Stage | Artifact | Role | Status |
|---|---|---|---|
| S1 · Neutral substrate spec | `spec/internal-primitives.mdl`, `spec/user-primitives.mdl` | neutral | done |
| S2 · Neutral interaction spec | `spec/interaction-primitives.mdl` | neutral | not-started (stub) |
| R · Reference realization (Tana) | `implementations/tana/` | reference | not-started (stub) |
| S3 · Gap analysis — substrate | `implementations/dxos/gap-analysis.md` | target | done |
| S3 · Gap analysis — UX | `implementations/dxos/gap-analysis-ux.md` | target | not-started (stub) |
| S4 · DXOS design | `implementations/dxos/design.md` | target | not-started |
| S5 · Plan | `implementations/dxos/plans/` | target | not-started |
| S6 · Plugin code | (hosting deferred) | target | not-started |

## Artifact index

| Artifact | derives-from | Notes |
|---|---|---|
| `spec/internal-primitives.mdl` | — | SIP (neutral, upstream root) |
| `spec/user-primitives.mdl` | IP-* | SUP |
| `spec/interaction-primitives.mdl` | UP-*, IP-* | S2 neutral UX — IDs `UX-<n>.<concern>` |
| `implementations/tana/` | UX-*, UP-* | Tana reference realization |
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

### Pending propagations

_(none)_

## Superpowers hand-off

Dev stages (S4 design, S5 plan, S6 build) run the superpowers cycle
(brainstorming → writing-plans → executing-plans). Plan files live under
`implementations/dxos/plans/`. This map links them and tracks coarse status;
granular checkboxes live in the plan.
