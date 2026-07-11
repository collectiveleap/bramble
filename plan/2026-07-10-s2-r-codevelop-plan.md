# S2 + Tana R Co-Develop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the neutral interaction spec (S2, `/spec/interaction-primitives.mdl`) as four cross-cutting interaction laws, and the Tana reference realization (R, `/implementations/tana/user-experience.md`) as concrete observed behavior, mutually consistent and ready for the downstream DXOS UX gap analysis.

**Architecture:** SUP + S2 form the neutral semantic layer (capability + manner); R is the sole physical layer, tracing up to both. S2 is authored from its settled draft; R is authored from direct Tana observation to an "implement-without-watching-Tana" bar; the two are reconciled (every R entry cites ≥1 neutral id; every law has ≥1 R instance). Design: `/plan/2026-07-10-s2-r-codevelop-design.md`.

**Tech Stack:** Markdown + MDL docs; git. No code, no build. "Tests" are file-existence, content, and `grep` checks over stable IDs.

## Global Constraints

- **Repo / branch:** `~/sandbox/bramble`, this worktree's branch (`claude/flow-md-resume-cdd706`). All commits land here.
- **Neutral-vs-implementation invariant:** nothing in `/spec/` names a system; system-specific artifacts live under `/implementations/<system>/`. S2 in `/spec/`, R in `/implementations/tana/`.
- **Repo paths root-anchored:** reference repo files as `/spec/…`, `/implementations/…` (leading slash = repo root), never bare (a bare path reads as relative to the doc's own folder).
- **Traceability header (verbatim shape)** on every downstream artifact:
  `<!-- derives-from: [<upstream req IDs>]; role: reference|target|neutral; status: not-started|draft|current|needs-review -->`
  Headers keep **bare** ids (grep anchors).
- **Gloss-next-to-id convention:** every reference *citation in a body* (`traces:` blocks, R trace lines, inline `desc` cross-refs) reads `<ID> <gloss>`, never a bare id.
- **No-orphan rule:** every R entry cites ≥1 SUP (`UP-*`) or S2 (`UX-*`) id. An orphan is dispositioned, not left: above-floor Tana behavior → out of scope; a missing table-stakes primitive → move-up (amend SUP/S2 first).
- **R concreteness bar:** an implementer could reproduce each behavior on Composer *without ever watching Tana* — trigger, response, visual/layout/feedback, and edge cases, per entry. Values are **observed and verified, never asserted from memory.**
- **PREREQUISITE for Task 3:** access to the Tana application to observe UX behavior. Tasks 1–2 and the Task 4 checks have no such dependency.
- **IDs:** S2 uses `UX-<law>.<application>`; SUP uses `UP-<n>.<concern>`.

---

### Task 1: Author S2 — the four interaction-law feats

**Files:**
- Modify (replace stub body): `/spec/interaction-primitives.mdl`

**Interfaces:**
- Consumes: SUP feat ids `UP-1 Atomic unit and outline`, `UP-2 Links and backlinks`, `UP-3 Granular addressing`, `UP-4 Transclusion` (from `/spec/user-primitives.mdl`).
- Produces: S2 feat ids `UX-direct`, `UX-inflow`, `UX-immediate`, `UX-reversible` and req ids `UX-direct.outline`, `UX-direct.expand`, `UX-inflow.link`, `UX-inflow.address`, `UX-immediate.gesture`, `UX-reversible.undo` — the manner ids R and the UX gap analysis cite.

- [ ] **Step 1: Replace the `## Rules` and `## Primitives` stub sections**

Keep the frontmatter and the `derives-from` header (bare ids) as-is. Replace the `## Rules` and `## Primitives` sections with a `R-Interaction-Laws` rule declaration plus the four feats. Author `## Rules` to declare, mirroring `R-Conformance-Format` in the SIP/SUP:

```mdl
## Rules

```mdl
rule R-Interaction-Laws:
  desc: |
    S2 specifies the INTERACTION MANNER over the SUP capabilities — the
    cross-cutting laws every gesture must obey (directness, in-flow,
    immediacy, reversibility), not the gestures themselves. It names no
    system and no keystroke; a reference realization
    (/implementations/tana/user-experience.md) instantiates each law
    concretely. Layered on R-Conformance-Format from the SIP/SUP:

    1. Each law is a `feat` (UX-<law>); it is CROSS-CUTTING, so its
       `traces:` names the several SUP capabilities it governs
       (many-to-many is the honest signature of a cross-cutting concern).
    2. Each `req` (UX-<law>.<application>) carries a conformance-test
       clause (given/when/then) SUFFICIENT to decide conformance, plus
       `probes:` that size the work when a system X fails it. Written at
       INTERACTION altitude (mode/flow/step/gesture), not keystroke
       altitude — the clause must read the same for any system.
    3. Every id CITED in a body reads `<ID> <gloss>`, never bare.
```
```

Then author `## Primitives` with the four feats **exactly** as specified in the design doc §4 (`/plan/2026-07-10-s2-r-codevelop-design.md`): `UX-direct` (traces UP-1, UP-4; reqs `.outline`, `.expand`), `UX-inflow` (traces UP-2, UP-3; reqs `.link`, `.address`), `UX-immediate` (traces UP-1, UP-2, UP-4; req `.gesture`), `UX-reversible` (traces UP-1, UP-2, UP-4; req `.undo`). Copy the `desc`/`given`/`when`/`then`/`probes` verbatim from design §4.

- [ ] **Step 2: Update the frontmatter `status` and the header**

Change frontmatter `status: stub` → `status: draft`. Change the `derives-from` header's `status: not-started` → `status: draft` (keep the bare `[UP-1, UP-2, UP-3, UP-4]` ids).

- [ ] **Step 3: Verify structure — all four feats and six reqs present**

Run:
```bash
cd ~/sandbox/bramble
grep -cE '^feat UX-(direct|inflow|immediate|reversible):' spec/interaction-primitives.mdl   # expect 4
grep -cE '^  req UX-[a-z]+\.[a-z]+:' spec/interaction-primitives.mdl                          # expect 6
grep -c 'STUB' spec/interaction-primitives.mdl                                                # expect 0
```
Expected: `4`, `6`, `0`.

- [ ] **Step 4: Verify the gloss convention — no bare id in a `traces:` line**

Run:
```bash
cd ~/sandbox/bramble
grep -nE '^\s+- UP-[0-9]+\s*$' spec/interaction-primitives.mdl && echo "BARE-ID FOUND" || echo "OK glossed"
```
Expected: `OK glossed` (every `- UP-n` line is followed by a gloss, e.g. `- UP-1 Atomic unit and outline`).

- [ ] **Step 5: Commit**

```bash
cd ~/sandbox/bramble
git add spec/interaction-primitives.mdl
git commit -m "docs(spec): author S2 interaction laws (UX-direct/inflow/immediate/reversible)"
```

---

### Task 2: Scaffold R — behavior inventory, entry template, README

**Files:**
- Modify (replace stub body): `/implementations/tana/user-experience.md`
- Modify: `/implementations/tana/README.md` (flip status note only)

**Interfaces:**
- Consumes: the S2 ids from Task 1 and the SUP ids.
- Produces: the R skeleton — a documented concreteness bar, the entry template, and one section header per floor-realizing behavior with its pre-filled dual-trace ids, ready for Task 3 to fill with observed content.

- [ ] **Step 1: Replace the `user-experience.md` stub with the scaffold**

Keep the `derives-from` header (bare ids). Replace `STUB — to be authored (stage R).` with: (a) a short "Concreteness bar" paragraph copied from design §5; (b) an "Entry format" note showing the template; (c) a `## Behaviors` section containing one `###` header per behavior below, each followed by the **trace lines only** (capability + manner, glossed) and a `- **Trigger/Response/Visual/Edge cases:** _(observe)_` skeleton. The behavior inventory (floor-realizing only):

| Behavior | traces (capability) | traces (manner) |
|---|---|---|
| Indent / nest | `UP-1.outline` — address & nest a single Node | `UX-direct.outline` · `UX-immediate.gesture` · `UX-reversible.undo` |
| Outdent | `UP-1.outline` | `UX-direct.outline` · `UX-immediate.gesture` · `UX-reversible.undo` |
| Reorder (move up/down) | `UP-1.outline` | `UX-direct.outline` · `UX-immediate.gesture` · `UX-reversible.undo` |
| Zoom into a Node | `UP-1.outline` — address a single Node | `UX-direct.outline` |
| Expand / collapse | `UP-1.outline` | `UX-direct.outline` · `UX-immediate.gesture` |
| Create a mirror / instance (multi-location) | `UP-1.multi-location` — one Node in two places | `UX-immediate.gesture` · `UX-reversible.undo` |
| Insert inline reference (@-mention) | `UP-2.link` — link from within content · `UP-3.any-node-target` — target any Node incl. nested | `UX-inflow.link` · `UX-inflow.address` · `UX-immediate.gesture` |
| Copy link to a Node | `UP-3.any-node-target` — address any Node | `UX-immediate.gesture` |
| Backlinks view | `UP-2.backlinks-view` — what-links-here on a Node | `UX-immediate.gesture` |
| Embed / expand a reference inline | `UP-4.embed` — render a reference inline, edit-through | `UX-direct.expand` · `UX-immediate.gesture` |
| Undo | (rides on the gesture undone) | `UX-reversible.undo` — gesture-granular undo |

Use this **entry template** (the `@-mention` worked example in design §5 is the pattern to match):

```markdown
### <behavior name>

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** <ids, glossed>
- **traces (manner):** <ids, glossed>
```

- [ ] **Step 2: Flip the README status note**

In `/implementations/tana/README.md`, change `Status: stub. Authoring is stage R in FLOW.md.` → `Status: scaffolded; behaviors awaiting Tana observation (stage R).` Leave the `derives-from` header bare-id and `status: not-started` until Task 3 fills content.

- [ ] **Step 3: Verify the scaffold — every inventory behavior has a section and both trace lines**

Run:
```bash
cd ~/sandbox/bramble
grep -cE '^### ' implementations/tana/user-experience.md                       # expect 11
grep -cE '^\- \*\*traces \(capability\):\*\*' implementations/tana/user-experience.md  # expect 11
grep -cE '^\- \*\*traces \(manner\):\*\*' implementations/tana/user-experience.md      # expect 11
```
Expected: `11`, `11`, `11` (Undo's capability line reads "(rides on the gesture undone)" — still present).

- [ ] **Step 4: Commit**

```bash
cd ~/sandbox/bramble
git add implementations/tana/user-experience.md implementations/tana/README.md
git commit -m "docs(tana): scaffold R behavior inventory + entry template"
```

---

### Task 3: Author R behaviors from Tana observation

**PREREQUISITE:** the Tana application, open, to observe. Do not fabricate values.

**Files:**
- Modify: `/implementations/tana/user-experience.md` (fill each `### behavior` entry)

**Interfaces:**
- Consumes: the Task 2 scaffold (section headers + trace lines).
- Produces: each behavior filled to the concreteness bar — the observed content the DXOS UX gap analysis and S4 design consume.

- [ ] **Step 1: Observe and fill each behavior**

For each `###` entry, perform the gesture in Tana and record — replacing each `_(observe)_`:
- **Trigger:** the exact key(s) / click / drag that initiates it.
- **Response:** what happens to the Node and the cursor, step by step.
- **Visual/layout:** placement, affordance, any popover/animation/indicator.
- **Edge cases:** the boundary behavior named for that gesture — e.g. *Outdent:* at the top level (does it no-op / promote?); *Indent:* first child vs. no preceding sibling; *Reorder:* across a collapsed sibling; *Zoom:* breadcrumb + how to leave; *Mirror:* how a second location is created and shown; *@-mention:* nested-target reachability and disambiguation; *Embed:* cycle handling and edit-through direction; *Undo:* granularity (one gesture = one step?).

Match the `@-mention` worked example in design §5 for depth and phrasing. Keep the pre-filled trace lines; correct them only if observation contradicts them (if so, note it for Task 4).

- [ ] **Step 2: Disposition any orphan or surprise (no-orphan rule)**

If a core interaction observed in Tana traces to *no* `UP-*`/`UX-*` id, record it under a `## Dispositions` heading as either **above-floor** (out of scope — name it, e.g. supertag/field/calendar) or **move-up candidate** (a table-stakes manner/capability the neutral specs miss — name the law/capability it implies). Do not invent a trace to silence it.

- [ ] **Step 3: Update the header + README status to `draft`**

In `user-experience.md`, set the `derives-from` header `status: not-started` → `status: draft`. In `README.md`, set `Status: … awaiting Tana observation` → `Status: draft — behaviors observed (stage R).`

- [ ] **Step 4: Verify no unfilled observation slots remain**

Run:
```bash
cd ~/sandbox/bramble
grep -c '_(observe)_' implementations/tana/user-experience.md   # expect 0
```
Expected: `0`.

- [ ] **Step 5: Commit**

```bash
cd ~/sandbox/bramble
git add implementations/tana/user-experience.md implementations/tana/README.md
git commit -m "docs(tana): author R behaviors from Tana observation"
```

---

### Task 4: Reconcile S2 ↔ R and update the spine

**Files:**
- Modify: `/FLOW.md` (pipeline status, artifact index)
- Possibly modify: `/spec/interaction-primitives.mdl` (only if reconciliation surfaces a law fix)

**Interfaces:**
- Consumes: S2 (Task 1) and R (Task 3).
- Produces: a consistency-verified S2+R and an updated flow-map reflecting their status.

- [ ] **Step 1: No-orphan check — every R entry cites ≥1 neutral id**

Run:
```bash
cd ~/sandbox/bramble
# every behavior block should contain at least one UP- or UX- id
awk '/^### /{name=$0; found=0} /UP-[0-9]|UX-[a-z]/{found=1} /^### /&&NR>1{if(prevname&&!prevfound) print "ORPHAN:", prevname; prevname=name; prevfound=0} {if($0 ~ /UP-[0-9]|UX-[a-z]/) prevfound=1; if($0 ~ /^### /){prevname=name}} END{}' implementations/tana/user-experience.md
grep -cE 'UP-[0-9]|UX-[a-z]' implementations/tana/user-experience.md
```
Expected: no `ORPHAN:` lines; a positive id count. (If the `awk` is awkward, verify by eye that each `###` block has a `traces` line.)

- [ ] **Step 2: Law-coverage check — every S2 law has ≥1 R instance, and vice versa**

Run:
```bash
cd ~/sandbox/bramble
for law in UX-direct UX-inflow UX-immediate UX-reversible; do
  n=$(grep -c "$law" implementations/tana/user-experience.md)
  echo "$law -> $n R citations"
done
```
Expected: each law ≥ 1. If a law has 0, it is either mis-specified (fix S2, note it as a move-up/down) or R missed a behavior (return to Task 3). Any S2 change here is its own commit and follows the FLOW.md adaptation protocol.

- [ ] **Step 3: Update `/FLOW.md` pipeline status**

In the Pipeline & status table: S2 row `not-started (stub)` → `draft`; R row `not-started (stub)` → `draft`. In the Artifact index, no id changes (the rows already list `UX-*`/`UP-*`). Update the **Active work** pointer: `Next action:` → the next stage (S3 · UX gap analysis, once S2+R are reviewed).

- [ ] **Step 4: Verify the spine reflects the new state**

Run:
```bash
cd ~/sandbox/bramble
grep -E 'S2 · Neutral interaction|R · Reference realization' FLOW.md
```
Expected: both rows show `draft`, not `not-started (stub)`.

- [ ] **Step 5: Commit**

```bash
cd ~/sandbox/bramble
git add FLOW.md spec/interaction-primitives.mdl
git commit -m "docs: reconcile S2 + Tana R; advance flow-map to draft"
```

---

## Self-Review

- **Spec coverage** (design doc sections → tasks):
  - §2 layering / dual-trace invariant → enforced by Task 2 (pre-filled dual traces) + Task 4 Step 1 (no-orphan).
  - §3–4 law set → Task 1 (authored) + Task 4 Step 2 (coverage).
  - §5 R concreteness bar + entry format → Task 2 (template) + Task 3 (filled to bar).
  - §6 co-develop cycle → Task 1 (sketch) → Task 3 (observe) → Task 3 Step 2 (disposition) → Task 4 (reconcile).
  - §7 conventions (gloss, split trace line) → Task 1 Step 4, Task 2 Step 1/3.
  - §8 decisions (UP-3 in-flow only) → encoded in Task 1 feats + Task 2 inventory trace rows.
- **Placeholder scan:** the only `_(observe)_` markers are Task 2's scaffold slots, filled and asserted-zero in Task 3 Step 4 — an observation procedure, not a hand-wave. No other TBD/TODO.
- **Type/name consistency:** feat/req ids (`UX-direct.outline`, `UX-inflow.link`, `UX-immediate.gesture`, `UX-reversible.undo`) and SUP ids (`UP-1.outline`, `UP-1.multi-location`, `UP-2.link`, `UP-2.backlinks-view`, `UP-3.any-node-target`, `UP-4.embed`) are identical across Task 1, Task 2's inventory, and Task 4's checks.
- **Neutral invariant:** S2 names no system (Task 1); Tana specifics live only in R (Tasks 2–3).
