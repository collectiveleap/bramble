<!-- derives-from: [BR-1, BR-2, BR-3, BR-7, BR-9, BR-10, BR-11, BR-12, BR-13, BR-14, BR-15, BR-16, BR-17, BR-18]; role: target; status: current -->

# Ledger sequencing plan — autonomous-execution roadmap (2026-07-15)

The dependency- and risk-ordered sequence through **every open item** in
[`issues-ledger.md`](../issues-ledger.md), with all Steve-decisions gathered **up-front** so the sequence
can be *triggered to run autonomously*. This is the **outer-loop** sequencing plan; each build item (above
all BR-16) gets its own **inner-loop** TDD plan (superpowers `writing-plans`) under this folder when it is
reached. It is not itself a TDD task list.

## Captured decisions (2026-07-15)

| # | Decision | Answer |
|---|---|---|
| D1 | BR-3 singleton — what is "the Bramble"? | **Interim: get-or-create one simple root object per space.** Don't over-build the singleton now. **Eventual** open-target is a **daily node** (or similar) Bramble opens to — a future slice (the spec's appendix *daily-note* candidate, README decision 4). |
| D2 | BR-16 text schema | **A — native `Text.Text`.** Bramble owns only the `Edge` schema. |
| D3 | BR-18 undo model | **Undo = append a corrective event / un-tombstone**, as the `IP-4` consequence (grounded by the verified removal gate). |
| D4 | BR-11 S2 promotion | **Yes — promote if content-complete + no placeholders** (verified in-run); fix FLOW's illegal `draft` label. |
| D5 | BR-9 + BR-10 | **Kept deferred**; the render/lifecycle rewrite (1.4/1.5) absorbs them later. Reversible. |
| D6 | BR-14 Inter font | **Keep deferred** — out-of-plugin shared-theme change, out of scope. |

## Dependency graph (what blocks what)

- **BR-16 (object-graph convergence) is the hub.** It reshapes the create-nav-singleton cluster (BR-1/2/3),
  *contains* the `UP-4/UP-5` collapse and BR-18's removal realization, and its render/lifecycle rewrite is where
  BR-9 / BR-10 / BR-17 land.
- **BR-7** targets files BR-16 rewrites (`RowEditor`, `MentionExpansions`) → must come **after** BR-16, else throwaway.
- **BR-3** (singleton, decided D1) gates the BR-1/2/3 realization at 1.7.
- **BR-18** — the `IX-reversible` fold is a standalone spec edit (0.1); non-destructive removal *realization* rides BR-16 (1.5).
- **BR-11** (0.5) requires 0.1 done first (else it promotes an about-to-change `IX` spec).
- **Independent, any time:** BR-12, BR-15.
- **Done, no action:** BR-4, BR-5, BR-6, BR-8.

## Sequence

### Phase 0 — Settle & decide (spec/docs; low risk; unblocks autonomy)
- **0.1** `IX-reversible` fold → `spec/interaction-primitives.mdl` (BR-18; D3)
- **0.2** `UP-4/UP-5` collapse → `spec/user-primitives.mdl` (BR-16 spec prep — a *simplification*)
- **0.3** BR-15 — pending process-fix propagations + doc recordings
- **0.4** ✓ decisions captured (the table above)
- **0.5** BR-11 — S2 (`IX`/`PX`) status promotion + fix FLOW `draft` label (D4; after 0.1)

### Phase 1 — BR-16 convergence build (high risk; phased per [`design-object-graph.md`](../design-object-graph.md) §7)
- **1.1** Edge generalization `Node → Obj.Unknown` (substrate; drop `as Node` casts; traversal unchanged)
- **1.2** Text node type — schema **A** (native `Text.Text`) (D2)
- **1.3** Heterogeneous row render (per-type `Section` Surface + fallback)
- **1.4** Secondary-view primitive **2×2** → realizes `UP-4/UP-5` collapse; **BR-17** chip/embed/beside visual checks ride the delivery (FLOW gate clause 5)
- **1.5** Joining + lifecycle → create (`Enter`/`/`) + reference (`@`) gestures; **non-destructive removal via `db.remove`** (BR-18 realized; **no** compaction / `unlinkDeletedObjects` on Bramble objects)
- **1.6** `UP-4/UP-5` collapse → `design.md` propagation
- **1.7** Reshaped **BR-3 / BR-2 / BR-1** — interim get-or-create root (D1) + nav surfacing + focus-on-create

### Phase 2 — Cleanup & verify
- **2.1** BR-7 — dedup per-row linked-edges query (render now rewritten)
- **2.2** BR-17 — remaining surfaces (backlinks panel + chip) close the standing gate
- **2.3** BR-12 — Tana R live-checks (`tanawithclaude` workspace)

### Deferred (out of autonomous scope)
- BR-9, BR-10 (D5 — absorbed later by 1.4/1.5) · BR-13 (post-plugin visual diff) · BR-14 (D6 — out-of-plugin font)

## Autonomy guardrails
- **Stop policy — a HARD BLOCKER is the only thing that halts the run and surfaces to Steve.** A hard blocker is:
  (a) the build cannot be made green after the bounded fix retries; (b) a step needs a credential / permission, or an
  out-of-plugin change, that genuinely *blocks* forward progress; or (c) a decision with no safe default AND no way to
  defer it to a ticket. **Everything else does NOT block:** a review finding → the fix loop or a `BR`; a new decision
  with any safe default → take the default (record it) and, if worth revisiting, spawn a `BR`; a non-blocking
  out-of-plugin need → spawn a `BR` and continue the in-scope work. Milestones and phase boundaries do **not** pause the
  run — the chain advances automatically.
- **Never** merge the DXOS branch `claude/plugin-bramble-substrate`; **never** stage `.claude/launch.json` or `.changeset/config.json` (local-only).
- Every build item passes the delivery gate (FLOW clauses 1–6), incl. **clause 5** visual check for every new/changed surface.
- BR-16 build runs **subagent-driven** via the Workflow tool (deterministic orchestration — planner → build → review per phase), so the chain has no main-session pause points; per-task + whole-branch review as in the prior 2a–2e plans.

## Links
- Ledger: [`issues-ledger.md`](../issues-ledger.md) · references: [`references-issue-ledger.md`](../references-issue-ledger.md)
- Convergence design: [`design-object-graph.md`](../design-object-graph.md) (RESUME POINT + §3/§7)
- FLOW spine: [`FLOW.md`](../../../FLOW.md) → Pending propagations
