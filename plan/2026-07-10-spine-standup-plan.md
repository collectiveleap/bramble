# Flow Management Spine — Standup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Bramble flow management spine — a living flow-map doc, the conventions that govern it, and the structural stubs for the not-yet-authored stages — all in the `bramble` repo.

**Architecture:** Instantiate the two-loop operating model from the design doc (`plan/2026-07-10-flow-management-spine-design.md`): `FLOW.md` at the repo root is the persistent outer loop; superpowers plans are the per-dev-stage inner loop. Traceability is grep over stable `req` IDs via a `derives-from` header on every downstream artifact.

**Tech Stack:** Markdown + MDL docs; git. No code, no build system. "Tests" are file-existence / content / grep checks.

## Global Constraints

- Repo: `~/sandbox/bramble` (this whole plan operates there, on branch `main` — the repo's established pattern for doc commits).
- Neutral-vs-implementation-specific invariant holds: nothing in `spec/` names a system; system-specific artifacts live under `implementations/<system>/`.
- No new tooling. Traceability is `grep` over stable IDs (`IP-<n>.<concern>`, `UP-<n>.<concern>`, `UX-<n>.<concern>`).
- This standup creates STRUCTURE only — it does NOT author stage content (S2 neutral UX text, Tana realization, DXOS UX gap analysis). Those are their own later cycles.
- Traceability header block (verbatim shape, used by every downstream artifact):
  ```
  <!-- derives-from: [<upstream req IDs>]; role: reference|target|neutral; status: not-started|draft|current|needs-review -->
  ```

---

### Task 1: Commit the meta docs (design + this plan)

**Files:**
- Commit (already on disk): `plan/2026-07-10-flow-management-spine-design.md`, `plan/2026-07-10-spine-standup-plan.md`

**Interfaces:**
- Produces: the `plan/` folder as the home for flow meta-docs (design + plans for the spine itself).

- [ ] **Step 1: Verify both meta docs exist**

Run: `cd ~/sandbox/bramble && ls plan/`
Expected: lists `2026-07-10-flow-management-spine-design.md` and `2026-07-10-spine-standup-plan.md`

- [ ] **Step 2: Commit**

```bash
cd ~/sandbox/bramble
git add plan/
git commit -m "docs(plan): flow management spine design + standup plan"
```

---

### Task 2: Create the flow-map (`FLOW.md`)

**Files:**
- Create: `~/sandbox/bramble/FLOW.md`

**Interfaces:**
- Produces: `FLOW.md` — the read-first spine. Later artifacts and `CLAUDE.md` reference it. Holds: active-work pointer, pipeline+status table, artifact index, adaptation protocol, superpowers hand-off.

- [ ] **Step 1: Create `FLOW.md` with this exact content**

```markdown
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
```

- [ ] **Step 2: Verify the file exists and has the key sections**

Run: `cd ~/sandbox/bramble && grep -c -E '^## (Active work|Pipeline|Artifact index|Adaptation protocol|Superpowers hand-off)' FLOW.md`
Expected: `5`

- [ ] **Step 3: Commit**

```bash
cd ~/sandbox/bramble
git add FLOW.md
git commit -m "docs: add FLOW.md flow-map spine"
```

---

### Task 3: Record conventions in `CLAUDE.md`

**Files:**
- Modify: `~/sandbox/bramble/CLAUDE.md` (append a new section at end of file)

**Interfaces:**
- Consumes: `FLOW.md` (Task 2) — the section points sessions at it.
- Produces: the durable conventions (two-loop, roles, traceability header) that govern the spine.

- [ ] **Step 1: Append this exact section to the end of `CLAUDE.md`**

```markdown

## Flow management

Read `FLOW.md` first — it is the living spine for the whole flow (neutral spec →
reference realization → gap analysis → design → plan → plugin) and records where
work currently stands. The operating model is specified in
`plan/2026-07-10-flow-management-spine-design.md`.

- **Two loops.** `FLOW.md` is the persistent outer loop across all stages and is
  where the flow is moved up/down. Software-dev stages (design, plan, build) use
  the superpowers cycle (brainstorming → writing-plans → executing-plans) as an
  inner loop scoped to one stage; plan files live under
  `implementations/<target>/plans/` and are linked from `FLOW.md`.
- **Roles under `implementations/<system>/`.** A folder is either a *reference*
  realization (an existing system documented as an exemplar — e.g. Tana) or a
  *target* being built (e.g. DXOS). Record the role in the folder `README` and in
  `FLOW.md`.
- **Traceability header.** Every downstream artifact opens with:
  `<!-- derives-from: [<upstream req IDs>]; role: reference|target|neutral; status: not-started|draft|current|needs-review -->`.
  Reverse lookup for a changed req is `grep -r "<req-id>" spec/ implementations/`.
```

- [ ] **Step 2: Verify the section landed**

Run: `cd ~/sandbox/bramble && grep -c '## Flow management' CLAUDE.md`
Expected: `1`

- [ ] **Step 3: Commit**

```bash
cd ~/sandbox/bramble
git add CLAUDE.md
git commit -m "docs: record flow-management conventions in CLAUDE.md"
```

---

### Task 4: Create the structural stubs (S2, R, S3-UX)

**Files:**
- Create: `~/sandbox/bramble/spec/interaction-primitives.mdl`
- Create: `~/sandbox/bramble/implementations/tana/README.md`
- Create: `~/sandbox/bramble/implementations/tana/user-experience.md`
- Create: `~/sandbox/bramble/implementations/dxos/gap-analysis-ux.md`

**Interfaces:**
- Consumes: the traceability header shape (Global Constraints), the `UX-<n>.<concern>` ID convention (from `FLOW.md`).
- Produces: the four stubs the later stages (S2, R, S3-UX) will fill; each carries a `derives-from` header and `not-started` status so grep-based traceability works immediately.

- [ ] **Step 1: Create `spec/interaction-primitives.mdl`**

```markdown
---
id: spec.interaction-primitives
name: Specification of Interaction Primitives
version: 0.1.0
status: stub
---

<!-- derives-from: [UP-1, UP-2, UP-3, UP-4]; role: neutral; status: not-started -->

The system-agnostic interaction primitives — the user-facing gestures and
experience — for a networked-notes / outliner / PKM product. Written assuming
the Specification of Internal Primitives (SIP) and Specification of User
Primitives (SUP). Interaction is described abstractly (a gesture that nests a
node, a gesture that inserts a link) and names no particular system. A reference
realization (`implementations/tana/`) documents one concrete isomorphic
instance; a target gap analysis evaluates a system against this spec plus that
realization.

IDs are `UX-<n>.<concern>` (per R-Spec-Entry-Conventions).

## Rules

STUB — to be authored (stage S2). Mirror `R-Conformance-Format` from the SIP/SUP:
conformance-test clauses (`given`/`when`/`then`), `probes:`, and `traces:` to
UP-/IP- IDs.

## Primitives

STUB — to be authored (stage S2). Candidate feats, each tracing to the SUP
capability it makes interactive:

- `UX-1` Outline interaction (nest / indent / outdent / reorder / zoom) — traces `UP-1`
- `UX-2` Link & address interaction (insert a link, address a node) — traces `UP-2`, `UP-3`
- `UX-3` Transclusion interaction (embed inline, edit-through) — traces `UP-4`
```

- [ ] **Step 2: Create `implementations/tana/README.md`**

```markdown
# Tana — reference realization

<!-- derives-from: [UX-*, UP-*]; role: reference; status: not-started -->

Role: **reference** — an existing system documented as a concrete, complete
realization of the neutral specs, to serve as the exemplar the target
reproduces. Authored by observation, not built.

## Contents (planned)

- `user-experience.md` — how Tana realizes the neutral interaction spec (S2)
  concretely: visual, layout, typography, keystrokes, shortcuts — each mapped to
  its `UX-<n>.<concern>` req.

Status: stub. Authoring is stage R in `FLOW.md`.
```

- [ ] **Step 3: Create `implementations/tana/user-experience.md`**

```markdown
# Tana UX realization

<!-- derives-from: [UX-*]; role: reference; status: not-started -->

Concrete, isomorphic realization of the neutral interaction spec
(`spec/interaction-primitives.mdl`) by Tana: for each `UX-<n>.<concern>`, the
observed visual, layout, typography, keystroke, and shortcut behavior.

STUB — to be authored (stage R).
```

- [ ] **Step 4: Create `implementations/dxos/gap-analysis-ux.md`**

```markdown
# Gap analysis (UX) — X = DXOS / Composer

<!-- derives-from: [UX-*, implementations/tana/user-experience.md]; role: target; status: not-started -->

Evaluates DXOS / Composer against the neutral interaction spec
(`spec/interaction-primitives.mdl`) **and** the Tana reference realization
(`implementations/tana/user-experience.md`) — i.e. "does Composer reproduce this
UX, as Tana does it, and what is the gap?" Companion to the substrate gap
analysis (`gap-analysis.md`).

STUB — to be authored (stage S3, UX pass, after S2 and Tana R exist).
```

- [ ] **Step 5: Verify all four stubs exist and each carries a traceability header**

Run:
```bash
cd ~/sandbox/bramble
for f in spec/interaction-primitives.mdl implementations/tana/README.md implementations/tana/user-experience.md implementations/dxos/gap-analysis-ux.md; do
  test -f "$f" && grep -q 'derives-from:' "$f" && echo "OK $f" || echo "MISSING/NO-HEADER $f"
done
```
Expected: four `OK ...` lines.

- [ ] **Step 6: Commit**

```bash
cd ~/sandbox/bramble
git add spec/interaction-primitives.mdl implementations/tana/ implementations/dxos/gap-analysis-ux.md
git commit -m "docs: add S2/reference/UX-gap structural stubs"
```

---

### Task 5: Final verification

**Files:** none (verification only)

**Interfaces:**
- Consumes: all artifacts from Tasks 1–4.

- [ ] **Step 1: Verify the working tree is clean**

Run: `cd ~/sandbox/bramble && git status --porcelain`
Expected: empty output.

- [ ] **Step 2: Verify reverse-lookup traceability works (grep a req ID finds downstream)**

Run: `cd ~/sandbox/bramble && grep -rl 'UP-1' spec/ implementations/`
Expected: includes `spec/user-primitives.mdl` and `spec/interaction-primitives.mdl` (and any others citing `UP-1`).

- [ ] **Step 3: Verify `FLOW.md` is referenced from `CLAUDE.md`**

Run: `cd ~/sandbox/bramble && grep -c 'FLOW.md' CLAUDE.md`
Expected: `>= 1`

---

## Self-Review

- **Spec coverage** (design doc §6 items):
  1. `FLOW.md` seeded → Task 2. ✓
  2. `CLAUDE.md` update (read-first + two-loop + traceability + roles) → Task 3. ✓
  3. Structural stubs (S2 `.mdl`, Tana R, DXOS UX gap) → Task 4. ✓
  4. Traceability header template documented once → Global Constraints + Task 3 CLAUDE.md section. ✓
  Meta-doc commit (design + plan) → Task 1. ✓
- **Placeholder scan:** every file's full content is inline; "STUB — to be authored" is intentional deferred-stage content, explicitly scoped out by Global Constraints, not a plan gap. ✓
- **Type/name consistency:** `UX-<n>.<concern>` ID convention, the `derives-from` header shape, and stage names (S1–S6/R) are identical across Global Constraints, `FLOW.md`, `CLAUDE.md`, and the stubs. ✓
