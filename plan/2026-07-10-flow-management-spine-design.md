# Design — Bramble flow management spine

Date: 2026-07-10
Status: draft (awaiting review)
Topic: an operating model that manages the whole Bramble flow — neutral spec →
reference realization → gap analysis → design → plan → plugin — as one thing
that can be moved up and down as new information emerges, hosted entirely in
the `bramble` repo.

## 1. Purpose & problem

Bramble today holds implementation-neutral specs (`spec/`: SIP, SUP,
gap-analysis-guide) and one implementation evaluation (`implementations/dxos/gap-analysis.md`).
The goal is to build a DXOS/Composer plugin that realizes the spec. Three
problems block treating that as a single managed effort:

1. **A missing layer.** The neutral specs describe the substrate (SIP) and the
   user-facing capabilities (SUP) but say nothing about *interaction* — the
   editor surface, gestures, keystrokes. The SUP explicitly defers this to
   "separate user-experience specifications" without saying where they live.
2. **Fragmentation.** The flow's stages have been run as separate sessions with
   human sync points between them. Moving *up* the flow (an implementation
   finding that should revise a neutral spec) or *down* (propagating a spec
   change into design/build) has no defined path, so it depends on the human
   re-briefing each session.
3. **Two planning modes wanted at once.** Spec-authoring and cross-layer
   adaptation want a persistent, non-linear map. Software-dev stages want
   superpowers planning (writing-plans → executing-plans) with checkpoints.

This design resolves all three: it defines the pipeline (incl. the missing
interaction layer), a single living **flow-map** doc as the spine, a
**traceability convention** as the up/down machinery, and the **hand-off points**
where superpowers planning takes over for code stages.

## 2. The pipeline

The flow is a fixed sequence of stages. Each stage names the artifact it
produces and where that artifact lives. `R` is a distinct *role*, not a
sequential stage — a reference realization documented from an existing system.

| Stage | Artifact | Location | Status today |
|---|---|---|---|
| **S1 · Neutral substrate spec** | SIP + SUP (`internal-primitives.mdl`, `user-primitives.mdl`) | `spec/` | done |
| **S2 · Neutral interaction spec** | system-agnostic interaction/experience primitives | `spec/` | **missing** |
| **R · Reference realization** | how an existing system realizes S1+S2, concretely (visual, layout, fonts, keystrokes, shortcuts) — isomorphic to the neutral specs | `implementations/<ref-system>/` (Tana first) | not started |
| **S3 · Gap analysis (target)** | evaluation of the target system against the neutral specs **and** the reference realization | `implementations/<target>/` (DXOS) | substrate done; UX pass missing |
| **S4 · Implementation design** | how the target reproduces neutral UX + reference realization | `implementations/<target>/` | not started |
| **S5 · Plan** | superpowers implementation plan | `implementations/<target>/plans/` | not started |
| **S6 · Plugin code** | the plugin (hosting deferred) | TBD | not started |

### Artifact roles: reference vs. target

`implementations/<system>/` holds two *kinds* of system folder, distinguished by
**role**, not by directory:

- **reference** — an existing system (Tana, later possibly Obsidian/Roam) whose
  UX we document as a concrete, complete realization of the neutral specs, to
  serve as the thing the target reproduces. It is authored by *observation*, not
  built.
- **target** — the system we are building (DXOS/Composer). Its folder carries the
  gap analysis, design, plan, and a pointer to the plugin.

The role is recorded in the flow-map and in each folder's `README`, so the
neutral-vs-specific invariant (bramble `CLAUDE.md`) is preserved and the extra
reference/target distinction is explicit rather than implied.

### The Tana loop, concretely

The user's intent, stated precisely: produce (a) a **neutral UX spec** (S2), and
(b) a **Tana UX realization** (R) isomorphic to it, then (c) run the DXOS gap
analysis (S3) against **S2 + Tana-R together** — so the DXOS design (S4) has a
complete target: "reproduce this UX, as Tana does it, in Composer."

## 3. Two-loop architecture

The spine is an **outer loop**; superpowers planning is an **inner loop**. They
compose by scope.

### Outer loop — the flow-map doc

A single living document at the repo root (`FLOW.md`), read first by every
session (referenced from `CLAUDE.md`). It is never closed out. It holds:

1. **Pipeline + status table** — the S1–S6/R rows above with a live status per
   stage (`not-started / authoring / needs-review / done`) and a link to each
   artifact.
2. **Artifact index** — every artifact in the flow, its role, and the upstream
   `req` IDs it derives from.
3. **Adaptation protocol** — the rules for moving up/down (§4), plus a
   **pending-propagations** list: upstream changes whose downstream review is
   still owed.
4. **Active-work pointer** — the single "where we are right now / next action"
   note, so a cold session resumes without a human re-brief.

### Inner loop — superpowers plans

When a stage *is* software-dev work — S4 design, S5 plan, S6 build — the session
drops into the normal superpowers cycle (brainstorming → writing-plans →
executing-plans / subagent-driven-development, with review checkpoints). Each
plan is scoped to **one stage's** dev work, which is what writing-plans is built
for.

### How they connect

- Flow-map S4/S5/S6 rows **link out** to the superpowers plan file and track only
  its coarse status; granular checkboxes live in the plan.
- Each superpowers plan **links back** to the upstream `req` IDs it implements.
  That backlink is the traceability that powers up/down.
- **Cross-stage adaptation is the outer loop's job.** A single linear plan never
  has to absorb the whole flow's churn — that was the flaw in a
  plan-as-spine approach. Amending an upstream spec happens at the map; the map
  flags which plans need revision.

## 4. Traceability convention (the up/down machinery)

Deliberately lightweight and greppable — no tooling.

### Citations

- The neutral specs already carry stable IDs (`IP-<n>.<concern>`,
  `UP-<n>.<concern>`); S2 adopts the same shape (`UX-<n>.<concern>`).
- Every **downstream** artifact — reference realization, gap analysis, design,
  plan — opens each of its entries with the upstream `req` ID(s) it
  realizes/evaluates/implements, in a fixed header form (see below).
- Reverse lookup is `grep -r "<req-id>" implementations/`: given a changed req,
  this lists every downstream artifact that depends on it.

### Artifact header block

Each downstream artifact (or entry) carries:

```
derives-from: [UP-1.outline, UX-2.nest]   # upstream req IDs
role: reference | target
status: draft | current | needs-review
```

### Moving up (implementation → spec)

When a downstream stage surfaces a finding that invalidates or underspecifies an
upstream `req`:

1. Record it as an open thread in the flow-map's pending-propagations.
2. Amend the upstream spec entry (raising its version note).
3. `grep` the req ID; mark every affected downstream artifact `needs-review` in
   the flow-map status table.
4. Re-review each — revising or re-running any affected superpowers plan.

### Moving down (spec → implementation)

Same mechanism in the forward direction: a new/changed upstream req flags the
downstream artifacts that must now cover it. A req with no downstream citation is
visibly un-realized.

## 5. Superpowers hand-off points

| Stage | Mode | Superpowers skill | Plan artifact |
|---|---|---|---|
| S1, S2, R, S3 | authoring (spec/doc) | brainstorming *when design-heavy*; otherwise direct editing | none (tracked in flow-map) |
| S4 | design | brainstorming | design doc |
| S5 | plan | **writing-plans** | `implementations/<target>/plans/<plan>.md` |
| S6 | build | executing-plans / subagent-driven-development | — |

Plan files are pinned under the target folder so the whole flow stays in bramble.

## 6. Scope of "stand up the spine" (what the first plan builds)

This design's *implementation* is doc-only and bounded. It does **not** author
the neutral UX content, the Tana realization, or the DXOS UX gap analysis — those
are their own tracked stages with their own cycles. Standing up the spine
creates the structure that tracks them:

1. **`FLOW.md`** — the flow-map, seeded with the §2 pipeline table (existing +
   planned artifacts), the artifact index, an adaptation-protocol summary, and
   the active-work pointer.
2. **`CLAUDE.md` update** — reference `FLOW.md` as read-first; record the
   two-loop convention, the traceability header convention, and the
   reference-vs-target role distinction.
3. **Structural stubs** with header blocks + `not-started` status:
   - `spec/interaction-primitives.mdl` (S2 skeleton — rules + placeholder feats)
   - `implementations/tana/README.md` (+ realization stub) (R)
   - `implementations/dxos/gap-analysis-ux.md` (S3 UX-pass stub)
4. **Traceability header template** documented once (in `CLAUDE.md` or a short
   `docs/` note) for artifacts to adopt.

## 7. Decisions to confirm in review

- **Neutral UX spec filename/ID prefix.** Proposed `spec/interaction-primitives.mdl`
  with IDs `UX-<n>.<concern>`. (Alternatives: `experience-primitives.mdl`.)
- **Flow-map location/name.** Proposed `FLOW.md` at repo root.
- **Reference systems.** Start with **Tana only** (YAGNI); the structure admits
  Obsidian/Roam later without change.
- **Plan-file location.** Proposed `implementations/<target>/plans/`.

## 8. Deferred (tracked, not designed here)

- **Plugin hosting.** How a "bramble plugin outside the DXOS monorepo" builds and
  loads into Composer (moon / `workspace:*` / catalog vs. published `@dxos/*`
  packages). A real feasibility question; owned by S4/S6, flagged in the
  flow-map.
- **Substrate design choice** already explored this session (object-per-node +
  reified `Contains` relations, hybrid as perf hedge) — carried into S4, not
  re-decided here.

## 9. Non-goals

- No change to the neutral-vs-implementation-specific invariant.
- No new tooling; traceability is grep over stable IDs.
- No authoring of stage content in the spine-standup step.
