<!-- derives-from: [UP-1, UP-2, UP-4, IP-2, IP-3, IX-direct, IX-inflow, IX-immediate]; role: target; status: current -->

# References / embed / backlinks — issue ledger

Living tracker for the reference-slice design effort (opened 2026-07-14). Several threads got
braided together; this separates them so they're worked one at a time. Some issues touch the
**neutral spec** (`spec/`), some the **Bramble design/target**, some the **build** — noted per item.
Source discussion: the design-references thread; the standing proposal is `design-references.md`.

**States:** `OPEN` (needs a decision) · `PROPOSED` (I proposed; awaiting ack) · `DECIDED` (chosen;
needs recording) · `ASSESS` (needs an empirical live-Tana check) · `BLOCKED` (on upstream items) ·
`BUILT` (done).

**Dependency order:** settle the model + stance (N1–N4, T1, B1) → record the deviation (D1) → fix the
method (P1, now informed by the model) → build (I1–I4). I2 is already done.

**Current focus: → N2** (render-modes & editability). N1 done; N4/B1 near-closed in IP. Next: N2,
then N3, T1, D1 → then P1 (P1a output-sweep + P1b family/axis pattern) → build (I1–I4).

---

## Process / method
- **P1** — Completeness-method miss + fix (the "U5" move-up). Two root-cause threads:
  - **P1a — output-side sweep.** The method has only *input-side* sweeps (verb set, modality); it lacks
    an *output-side* sweep (render-modes · editability · liveness). Add a 3rd sweep + upgrade the gate.
  - **P1b — family/axis abstraction (added 2026-07-14, Steve).** Why was the *edge-as-open-typed-family,
    capabilities-per-axis* distinction not surfaced earlier — even though `IP-2`/`IP-3` and the intro's
    "`kind` taxonomy over edges" implied it? What is the **reusable pattern** that catches this in future
    (e.g. "when ≥2 primitives share a shape — both directed node→node relations — factor the family:
    name the general abstraction + the distinguishing axes + define capabilities per-axis, so the set
    stays open")? Deliver as a reusable method step, not a one-off.
  - *State: PROPOSED (P1a) · OPEN (P1b). Worked after the model layer.*

## Neutral-spec model (what the primitives ARE)
- **N1** — Two relationships, kept distinct: **subtree-child** (co-location · structural · **acyclic**)
  vs **inline-mention** (reference · in-text · **may-cycle**). **Finding:** the *substrate* already
  distinguishes them textbook-cleanly (`IP-2` vs `IP-3`); the blur was only `UP-4`'s framing + this
  thread's design talk. **Fix (Light, chosen 2026-07-14):** added an *open, typed edge family + per-axis
  capabilities* paragraph to `internal-primitives.mdl`; clarified `UP-4` (shared-identity axis bundles;
  routes differ on containment). `design.md §1/§2` already kept them distinct — no scrub needed;
  `design-references.md` gets revised downstream under N2/I1. **State: DONE (pending Steve's in-place
  review + commit).**
- **N2** — Render-modes & editability of an appearance: collapsed-atomic chip (mention) /
  expanded-editable panel (embed) / adjacent panel / nested bullet; + liveness across all. `UP-4.embed`
  wrongly models the inline rendering as editable; the atomic collapsed mode is unspecced. **State: OPEN.**
- **N3** — "Mentioned in" = **union** of subtree-child occurrences (`targetOf`) + inline-mention
  occurrences (`referencedBy`). `UP-2.backlinks-view` under-specifies this. **State: OPEN.**
- **N4** — "Real node, not shadow" invariant: every appearance of X is the real, editable X (one
  identity, live) — never a Tana read-only shadow. **Finding (2026-07-14):** already stated in IP —
  `IP-2.shared-identity` ("one vertex") + `IP-3.expand` ("the same target vertex, not a copy"). Home =
  `IP`, already there. **State: NEAR-CLOSED — confirm no UP-level restatement needed.**

## Stance / tier
- **T1** — Floor vs ceiling, and where beyond-Tana capability lives (floor / appendix / substrate
  door-open). The DAG-analogy question. — synthesis proposed; not chosen. **State: OPEN.**

## Design deviation (Bramble-specific)
- **D1** — "All X-*as-a-node* elsewhere = co-location" (deviation from Tana's owner+reference; real
  multi-parent). Record explicitly in `design.md` + gap-analysis. **State: DECIDED; needs recording.**

## Behavior to assess (empirical)
- **B1** — Cycle/recursion in mention-expansion: mentions may-cycle (self/ancestor); expansion needs a
  bounded, on-demand, path-guarded rule. **Finding (2026-07-14):** the rule is already canon —
  `IP-3.may-cycle` + `IP-3.expand` ("expansion is on-demand, so a linked-edge cycle through T does not
  expand unboundedly"). Reduced to: confirm Tana matches (live-check) + honor it in the build.
  **State: ASSESS (confirm-only).**

## Implementation (DXOS build)
- **I1** — Content model = **Option A** (plain text + positional marker + real `Ref` + chip/panel) for
  mentions; structural edges for co-location; **no Option B**. — leaning A; gated on N1–N3. **State: BLOCKED.**
- **I2** — Co-location substrate: multi-parent + cycle guard + multi-location render tests. Co-location
  *UX* (add-parent picker, render occurrence) pending. **State: BUILT (substrate); UX pending.**
- **I3** — Reference/mention slice build (@-picker · chip · expand-panel Surface · backlinks-`Ref` ·
  cycle-safe expansion). Gated on N/T/B. **State: BLOCKED.**
- **I4** — Backlinks panel build (the union view). Gated on N3. **State: BLOCKED.**

---

## Decisions log
_(appended as each issue resolves)_
- 2026-07-14 — D1 direction set: multi-location of a *node* = co-location (real multi-parent), a
  deliberate deviation from Tana's owner+reference. (Recording pending.)
- 2026-07-14 — Correction (feeds N1): subtree-child and inline-mention are **distinct relationships**,
  not two routes to one capability; "child" was overloaded.
- 2026-07-14 — N1 finding: the *substrate* already keeps them distinct (`IP-2`/`IP-3`); B1 + N4 are
  already answered in `IP`. The blur was `UP-4` framing + this thread's design talk only.
- 2026-07-14 — **Extensibility flip:** because more edge *kinds* are expected, **UNBUNDLE is rejected**
  (it hardcodes today's two kinds into capabilities). Capabilities are defined **per-axis**; `UP-4`'s
  bundling is correct (it's the shared-identity axis). Chose **Light**: an open-typed-edge-family +
  per-axis paragraph in `internal-primitives.mdl` now; full axis-factoring deferred until a *3rd* edge
  kind arrives (YAGNI). New method guard (→ P1b): a new edge kind must declare its axes.
