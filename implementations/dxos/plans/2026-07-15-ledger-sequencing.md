<!-- derives-from: [BR-1, BR-2, BR-3, BR-7, BR-9, BR-10, BR-11, BR-12, BR-13, BR-14, BR-15, BR-16, BR-17, BR-18, BR-19, BR-20]; role: target; status: current -->

# Ledger sequencing plan — autonomous-execution roadmap (2026-07-15, updated 2026-07-16)

The dependency- and risk-ordered sequence through **every open item** in
[`issues-ledger.md`](../issues-ledger.md), with all Steve-decisions gathered **up-front** so the sequence
can be *triggered to run autonomously*. This is the **outer-loop** sequencing plan; each build item (above
all BR-16) gets its own **inner-loop** TDD plan (superpowers `writing-plans`) under this folder when it is
reached — and each such plan now opens with a **`## Traces`** table (FLOW gate clause 6). This file is not itself a TDD task list.

## Progress (updated 2026-07-16)

**Done, verified & committed:**
- **Phase 0** (0.1–0.5) — `IX-reversible` fold, `UP-4/UP-5` collapse, BR-15 verified, S2 promoted to `done`.
- **Phase 1.1** — Edge endpoints `Node → Obj.Unknown` (gate 70/70). Finding: `Node ≈ Obj.Unknown` structurally.
- **1.2** — **schema A confirmed** (D2); BR-19's "breaks discrimination" withdrawn (false premise).
- **Phase 1.3a** — heterogeneous render **built** — but built **native-first**, which **BR-20 says is backwards**;
  it needs the 1.3-fix rework before the render phases continue.
- **Process fixes** (root-cause work on the BR-19 miss): FLOW gate **clauses 6–8** (behavioural decisions in
  plans/BRs cite a req; reshaping a decision needs `grounded-by`), a compaction-proof **flow-gate commit hook**
  (`.claude/`), `CLAUDE.md` recall lines, ledger Resolution protocol #6.

**New since the D1–D6 decisions:**
- **BR-19 recast** — *not* a reshape of D2; the type-agnostic `@`-scoping + surface-routing work under schema A.
- **BR-20 (neutral req)** — *every node shows a text equivalent on its row by default; native rendering on command.*
  The design (§4) + 1.3a do the **inverse**; this **move-up now gates the render phases**.

**Next:** the **BR-20 move-up** (author the `PX` req → propagate §4 → rework 1.3a) **before** 1.4/1.5. Build box was
load-saturated during 1.3a — re-verify on a cool machine.

## Captured decisions (2026-07-15)

| # | Decision | Answer |
|---|---|---|
| D1 | BR-3 singleton — what is "the Bramble"? | **Interim: get-or-create one simple root object per space.** Don't over-build the singleton now. **Eventual** open-target is a **daily node** (or similar) Bramble opens to — a future slice (the spec's appendix *daily-note* candidate, README decision 4). |
| D2 | BR-16 text schema | **A — native `Text.Text`** (confirmed 2026-07-16). BR-19's "pure-A breaks discrimination" claim is **withdrawn** — false premise (that the `@`-picker targets only bramble rows), whereas `UP-2`/`UP-3`/`IP-1` and the design already require linking *any* typed object. The real A-work is type-agnostic (edge-based `@`-scoping + surface routing), tracked in the recast BR-19. |
| D3 | BR-18 undo model | **Undo = append a corrective event / un-tombstone**, as the `IP-4` consequence (grounded by the verified removal gate). |
| D4 | BR-11 S2 promotion | **Yes — promote if content-complete + no placeholders** (verified in-run); fix FLOW's illegal `draft` label. |
| D5 | BR-9 + BR-10 | **Kept deferred**; the render/lifecycle rewrite (1.4/1.5) absorbs them later. Reversible. |
| D6 | BR-14 Inter font | **Keep deferred** — out-of-plugin shared-theme change, out of scope. |

## Dependency graph (what blocks what)

- **BR-16 (object-graph convergence) is the hub.** It reshapes the create-nav-singleton cluster (BR-1/2/3),
  *contains* the `UP-4/UP-5` collapse and BR-18's removal realization, and its render/lifecycle rewrite is where
  BR-9 / BR-10 / BR-17 land.
- **BR-20 (neutral req, 2026-07-16) gates the render phases.** "Text equivalent per node by default; native on
  command" — design §4 and the 1.3a build do the inverse, so BR-20's move-up (PX req → §4 → rework 1.3a) must land
  **before** 1.4 (2×2) and 1.5 build further on the wrong default.
- **Process gates now bind the build** (FLOW clauses 6–8): every inner-loop build-phase plan opens with a `## Traces`
  table; any decision reversal needs `grounded-by`.
- **BR-7** targets files BR-16 rewrites (`RowEditor`, `MentionExpansions`) → must come **after** BR-16, else throwaway.
- **BR-3** (singleton, decided D1) gates the BR-1/2/3 realization at 1.7.
- **BR-18** — the `IX-reversible` fold is a standalone spec edit (0.1); non-destructive removal *realization* rides BR-16 (1.5).
- **BR-11** (0.5) requires 0.1 done first (else it promotes an about-to-change `IX` spec).
- **Independent, any time:** BR-12, BR-15.
- **Done, no action:** BR-4, BR-5, BR-6, BR-8.

## Sequence

### Phase 0 — Settle & decide — ✓ DONE (2026-07-15/16)
- **0.1** ✓ `IX-reversible` fold → `spec/interaction-primitives.mdl` (BR-18; D3)
- **0.2** ✓ `UP-4/UP-5` collapse → `spec/user-primitives.mdl`
- **0.3** ✓ BR-15 — verified already-applied (no new authoring needed)
- **0.4** ✓ decisions captured (table above) · **0.5** ✓ BR-11 — S2 promoted to `done`, FLOW `draft` label fixed

### Phase 1 — BR-16 convergence build (per [`design-object-graph.md`](../design-object-graph.md) §7)
- **1.1** ✓ Edge generalization `Node → Obj.Unknown` (gate 70/70; `Node ≈ Obj.Unknown` finding)
- **1.2** ✓ Text node type — **schema A confirmed** (D2). BR-19's "pure-A breaks discrimination" **withdrawn** (false premise; `UP-2`/`UP-3`/`IP-1` and the design already require linking any node). Residual = type-agnostic `@`-scoping + surface routing, recast into **BR-19**, folded into 1.3b/1.5. `Node`-as-type-discriminator not required.
- **1.3a** ✓ Heterogeneous render **built** (a non-`Node` row renders via its `Section` surface). **⚠ Built native-first — inverted vs BR-20; blocked on the 1.3-fix rework below.**
- **1.3-fix (BR-20 move-up — NEW; blocks 1.4/1.5):** *every node shows a text equivalent on its row by default; native rendering on command.* (a) author the neutral **`PX`** req (present for review; confirm Tana R); (b) propagate to `design-object-graph.md` §4 (row line = text equivalent; native = 2×2 secondary-view only); (c) **rework 1.3a** — invert to text-first (label default; native surface via the secondary-view command); (d) fold the queued 1.3a cleanup (discriminator `Obj.instanceOf(Node)` → edge / text-node basis).
- **1.3b** Native-render-on-command gestures on any row ("non-text rows" was a misnomer — all rows are text by default): keyboard structural gestures + the native toggle.
- **1.4** Secondary-view primitive **2×2** → realizes `UP-4/UP-5` collapse; **BR-17** chip/embed/beside visual checks ride the delivery (FLOW gate clause 5)
- **1.5** Joining + lifecycle → create (`Enter`/`/`) + reference (`@`, incl. recast **BR-19** `@`-scoping) gestures; **non-destructive removal via `db.remove`** (BR-18 realized; no compaction on Bramble objects)
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
- Every build item passes the delivery gate (FLOW clauses **1–8**): **clause 5** visual check per surface; **clause 6** behavioural decisions cite a req (build-phase plan opens with a `## Traces` table); **clause 7** a decision-reversal needs `grounded-by`.
- BR-16 build runs **subagent-driven** via the Workflow tool (deterministic orchestration — planner → build → review per phase), so the chain has no main-session pause points; per-task + whole-branch review as in the prior 2a–2e plans.

## Links
- Ledger: [`issues-ledger.md`](../issues-ledger.md) · references: [`references-issue-ledger.md`](../references-issue-ledger.md)
- Convergence design: [`design-object-graph.md`](../design-object-graph.md) (RESUME POINT + §3/§7)
- FLOW spine: [`FLOW.md`](../../../FLOW.md) → Pending propagations
