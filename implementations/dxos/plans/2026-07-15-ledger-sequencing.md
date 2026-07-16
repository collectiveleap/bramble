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

**Next:** in parallel — **(a)** Phase 1.0: fix the user-visible bugs BR-1/2/3 against the *current* build now
(pre-mortem F8); **(b)** the **BR-20 move-up** (author the `PX` req → propagate §4 → rework 1.3a) **before** 1.4/1.5.
Build box was load-saturated during 1.3a — re-verify on a cool machine.

## BR-16 is done when *behaviour* converges — not when traces are green (pre-mortem F1)

A pre-mortem (2026-07-16, subagent) found the load-bearing risk: this flow measures convergence by
trace-cleanliness (citations, `## Traces` tables, green storybook), which is **orthogonal** to whether
Composer-native objects actually behave as nodes. Two phases in, the `@`-picker still runs `Filter.type(Node)` — you
still cannot mention a non-Node — yet every gate is green. So:
- **BR-16's definition of done is one end-to-end, user-observable proof, not a set of green traces:** in a real
  Composer space, `@`-mention a **native object (e.g. a Person)** into a Bramble, see it as a row showing its **text
  equivalent** (BR-20), and **expand it to its native card on command**. Until that gesture works live, BR-16 is not
  converging, whatever the gate colour.
- **A phase that cannot express success as a failing→passing *user-path* test changed no behaviour** and does not
  count as convergence progress (1.1 type-widening is the cautionary example — the design itself notes "no red→green
  TDD is available"). Traceability is *necessary, not sufficient*: the gates verify citations; this proof verifies
  convergence. (memory: `test-reproduces-real-user-path`.)

**Other pre-mortem findings — tracked as open risks (not yet actioned):**
- **F3 · never-merged branch rot** — 78 commits ahead, `origin` last fetched Jul 13 vs HEAD Jul 16, tree
  perpetually dirty. Mitigation: a weekly `git fetch && git rebase origin/main` on the branch even without merging;
  a rebase that no longer builds is a real ticket.
- **F4 · load-flaky verification** — pass counts swing (9/16/1); "load flake" is becoming an accepted excuse, so a
  real regression in the same costume gets waved through. Mitigation: quarantine load-sensitive stories; the core
  gate must be 100% deterministic.
- **F7 · IP-4 realization — a planned gate, NOT a demotion (Steve, 2026-07-16).** IP-4 **stays committed floor**
  (substrate richness / divergent — `internal-primitives.mdl` "NOT an appendix candidate"). The pre-mortem's
  "demote it" is **rejected**; its compaction-safety is *planned verification work* resolved in-build (Phase 1.5):
  (a) realize removal as an **append-only app-level projection — never `db.remove`** for nodes *or edges* (so no
  Bramble object ever carries `deleted=true`, the flag compaction targets); (b) **feasibility gate** — verify
  whether ECHO compaction is flag-based or reachability-based (one grep of the compaction path); (c) a **retention
  root** (shadow list) for objects Bramble references but another surface `db.remove`s; (d) confirm full
  automerge-history retention for `IP-4.provenance`. **Supersedes** the earlier "`db.remove` satisfies IP-4" gate
  (`32b1f48`) — it verified reversibility but missed that the `deleted` flag is compaction's target. Grounded: F7 +
  the edge-is-append-only observation + the verified `db.remove → system.deleted → unlinkDeletedObjects` chain.

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

- **BR-16 (object-graph convergence) is the hub.** It *contains* the `UP-4/UP-5` collapse and BR-18's removal
  realization, and its render/lifecycle rewrite is where BR-9 / BR-10 / BR-17 land. **But it no longer holds the
  create-nav-singleton cluster hostage** — BR-1/2/3 are fixed NOW against the current build (Phase 1.0) and only
  *re-fitted* if BR-16 later changes their shape (1.7), per pre-mortem F8.
- **BR-20 (neutral req, 2026-07-16) gates the render phases.** "Text equivalent per node by default; native on
  command" — design §4 and the 1.3a build do the inverse, so BR-20's move-up (PX req → §4 → rework 1.3a) must land
  **before** 1.4 (2×2) and 1.5 build further on the wrong default.
- **Process gates now bind the build** (FLOW clauses 6–8): every inner-loop build-phase plan opens with a `## Traces`
  table; any decision reversal needs `grounded-by`.
- **BR-7** targets files BR-16 rewrites (`RowEditor`, `MentionExpansions`) → must come **after** BR-16, else throwaway.
- **BR-1/2/3** are fixed NOW (Phase 1.0) against the current build; 1.7 only *re-fits* them if BR-16 changes their shape — they are no longer blocked by the convergence (pre-mortem F8).
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

### Phase 1.0 — Un-hostage the user-visible bugs, NOW, against the current build (pre-mortem F8)
BR-1/2/3 are the bugs a real smoke test found (no cursor on create, no left-nav presence, no singleton) — small and
user-visible. Holding them behind the open-ended BR-16 rewrite is the F8 failure. **Fix them against the *current*
homogeneous `Node` build; do not wait for the convergence:**
- **BR-1** — focus the header / first-row editor on create (`capabilities/create-object.ts` places no focus today).
- **BR-2** — surface the Bramble in the left nav (no app-graph / navtree module today).
- **BR-3** — get-or-create one root object per space (D1 interim), so "the Bramble" is a stable singleton.
These get *re-fitted* only if BR-16 later changes their shape (1.7) — but the user gets a working create / nav / singleton now.

### Phase 1 — BR-16 convergence build (per [`design-object-graph.md`](../design-object-graph.md) §7)
- **1.1** ✓ Edge generalization `Node → Obj.Unknown` (gate 70/70; `Node ≈ Obj.Unknown` finding)
- **1.2** ✓ Text node type — **schema A confirmed** (D2). BR-19's "pure-A breaks discrimination" **withdrawn** (false premise; `UP-2`/`UP-3`/`IP-1` and the design already require linking any node). Residual = type-agnostic `@`-scoping + surface routing, recast into **BR-19**, folded into 1.3b/1.5. `Node`-as-type-discriminator not required.
- **1.3a** ✓ Heterogeneous render **built** (a non-`Node` row renders via its `Section` surface). **⚠ Built native-first — inverted vs BR-20; blocked on the 1.3-fix rework below.**
- **1.3-fix (BR-20 move-up — NEW; blocks 1.4/1.5):** *every node shows a text equivalent on its row by default; native rendering on command.* (a) author the neutral **`PX`** req (present for review; confirm Tana R); (b) propagate to `design-object-graph.md` §4 (row line = text equivalent; native = 2×2 secondary-view only); (c) **rework 1.3a** — invert to text-first (label default; native surface via the secondary-view command); (d) fold the queued 1.3a cleanup (discriminator `Obj.instanceOf(Node)` → edge / text-node basis).
- **1.3b** Native-render-on-command gestures on any row ("non-text rows" was a misnomer — all rows are text by default): keyboard structural gestures + the native toggle.
- **1.4** Secondary-view primitive **2×2** → realizes `UP-4/UP-5` collapse; **BR-17** chip/embed/beside visual checks ride the delivery (FLOW gate clause 5)
- **1.5** Joining + lifecycle → create (`Enter`/`/`) + reference (`@`, incl. recast **BR-19** `@`-scoping) gestures; **non-destructive removal via an append-only app-level projection — NOT `db.remove`** for nodes *or edges* (BR-18). Carries the **IP-4 realization gate**: verify ECHO compaction semantics (flag vs reachability), realize removal as a projection the outline query filters out, add a retention root for externally-deleted references, confirm history retention. (Corrects the earlier "removal via `db.remove`" step.)
- **1.6** `UP-4/UP-5` collapse → `design.md` propagation
- **1.7** **Re-fit** BR-1/2/3 to the converged model *only if* the Phase 1.0 fixes need adjustment (e.g. nav now surfaces the Bramble *view* root; singleton under the object-graph model). Not a from-scratch build — 1.0 already shipped them.

### Phase 2 — Cleanup & verify
- **2.1** BR-7 — dedup per-row linked-edges query (render now rewritten)
- **2.2** BR-17 — remaining surfaces (backlinks panel + chip) close the standing gate
- **2.3** BR-12 — Tana R live-checks (`tanawithclaude` workspace)

### Deferred (out of autonomous scope)
- BR-9, BR-10 (D5 — absorbed later by 1.4/1.5) · BR-13 (post-plugin visual diff) · BR-14 (D6 — out-of-plugin font)

## Autonomy guardrails
- **Stop policy — a HARD BLOCKER halts the run and surfaces to Steve.** A hard blocker is: (a) the build cannot be
  made green after the bounded fix retries; (b) a step needs a credential / permission or an out-of-plugin change that
  genuinely *blocks* progress; (c) a decision with no safe default and no way to defer; **or (d — added 2026-07-16 per
  pre-mortem F5/F6) any ticket that is a `move-up` / neutral requirement, or that reshapes a settled decision or a
  target-set.** These (d) are **Steve-altitude and MUST NOT be resolved by a subagent "safe default"** — BR-19 (a
  reshaped decision) and BR-20 (a neutral requirement) both walked through the old safe-default door, drifting the
  build from intent while looking compliant. They now block.
- **Everything else does NOT block:** an implementation-level review finding → the fix loop or a `BR`; a routine new
  choice *within* an already-settled decision → sensible default + record. Milestones and phase boundaries do not pause
  the run — the chain advances automatically.
- **Never** merge the DXOS branch `claude/plugin-bramble-substrate`; **never** stage `.claude/launch.json` or `.changeset/config.json` (local-only).
- Every build item passes the delivery gate (FLOW clauses **1–8**): **clause 5** visual check per surface; **clause 6** behavioural decisions cite a req (build-phase plan opens with a `## Traces` table); **clause 7** a decision-reversal needs `grounded-by`.
- BR-16 build runs **subagent-driven** via the Workflow tool for *mechanical* phases (planner → build → review), but
  per the tightened stop policy any phase that **reshapes a decision, a target-set, or a requirement** halts for a
  human checkpoint — the reviewer that caught BR-19's ungrounded claim (pre-mortem F5) is **not** removed for the
  phases that most need it. Autonomy is for transcription-and-test work, not for Steve-altitude calls.

## Links
- Ledger: [`issues-ledger.md`](../issues-ledger.md) · references: [`references-issue-ledger.md`](../references-issue-ledger.md)
- Convergence design: [`design-object-graph.md`](../design-object-graph.md) (RESUME POINT + §3/§7)
- FLOW spine: [`FLOW.md`](../../../FLOW.md) → Pending propagations
