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

**Current focus: → I3 (mention slice)** via `writing-plans`. Spec (N1–P1) + design (D1/D2) done; **I1
(kind-typed `Edge` model) BUILT**; I2 (co-location substrate) built. Next: plan + build I3 (@-picker →
linked `Edge` + positional marker · atomic chip · secondary-view renderer at both placements ·
cycle-safe expansion; start by filtering `NodeOutline`'s edge use to structural — I1 Minor) → I4 (backlinks panel).

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
  - **DONE (2026-07-14):** both drafted into `spec/README` "Spec completeness sweeps" — sweep **4**
    (output-side: render-modes × editability × liveness) and sweep **5** (factor shared-shape families:
    abstraction + axes + capabilities-per-axis; new members declare axes). Delivery gate (`FLOW.md`
    clause 3) extended to check coverage on all three dimensions (concerns · render-modes · edge-axes).
  - *State: DONE.*

## Neutral-spec model (what the primitives ARE)
- **N1** — Two relationships, kept distinct: **subtree-child** (co-location · structural · **acyclic**)
  vs **inline-mention** (reference · in-text · **may-cycle**). **Finding:** the *substrate* already
  distinguishes them textbook-cleanly (`IP-2` vs `IP-3`); the blur was only `UP-4`'s framing + this
  thread's design talk. **Fix (Light, chosen 2026-07-14):** added an *open, typed edge family + per-axis
  capabilities* paragraph to `internal-primitives.mdl`; clarified `UP-4` (shared-identity axis bundles;
  routes differ on containment). `design.md §1/§2` already kept them distinct — no scrub needed;
  `design-references.md` gets revised downstream under N2/I1. **State: DONE (pending Steve's in-place
  review + commit).**
- **N2** — Render-modes & editability of an appearance. **Finding:** most was already specced
  (collapsed-by-default + expand-on-demand + expand-editable + liveness in `IP-3`/`UP-4.embed`). Gaps
  closed: (a) **collapsed mention is atomic** (floor) → new `IX-direct.reference-atomic`; editable-collapsed
  stays above-floor (see T1). (b) **open-in-secondary-view** → new `UP-5`. (c) **"secondary view"**
  unifies the inline-expand (`UP-4.embed`) and the alongside panel (`UP-5`) as ONE artifact, two
  placements — cascades to I3 (one node-view renderer, two mount points). **State: DONE (committed).**
  - `UP-5` corpus status: verified Tana + Roam; Obsidian unconfirmed. Placed in the **body** (Steve's
    call, 2026-07-14) — the gap-analysis probes carry the per-system check.
  - Follow-up (minor): `IX-direct.expand`'s "not a navigation to a separate viewer" now reads as the
    *inline* placement's property; fine as-is, revisit if it confuses against `UP-5.open-beside`.
- **N3** — "Mentioned in" = **union** of subtree-child occurrences + inline-mention occurrences.
  **Fix:** broadened `UP-2.backlinks-view` to the reverse-traversal of inbound edges of **all kinds**,
  **grouped by edge kind** (structural predecessors = where co-located · linked = what mentions it ·
  future kinds each their own group); `UP-2` traces gain `IP-2`. **State: DONE (committed).**
  - Deferred (same class as N1's full-factor): the backlinks view is really a *reverse-traversal-axis*
    capability spanning all edge kinds — not owned by `UP-2` (links). Relocating it to its own concern
    waits until the edge family grows (YAGNI).
- **N4** — "Real node, not shadow" invariant: every appearance of X is the real, editable X (one
  identity, live) — never a Tana read-only shadow. **Finding (2026-07-14):** already stated in IP —
  `IP-2.shared-identity` ("one vertex") + `IP-3.expand` ("the same target vertex, not a copy"). Home =
  `IP`, already there. **State: NEAR-CLOSED — confirm no UP-level restatement needed.**

## Stance / tier
- **T1** — Floor vs ceiling, and where beyond-a-reference-system capability lives. **Resolved:** by noun
  — richer **internal substrate** → `IP` (divergence recorded); a **user capability** no system does →
  **design** (`implementations/dxos`), never the neutral user-capabilities floor; a plausible-but-unverified
  class candidate → **appendix** status. Floor bar = strong-evidence + judgment (not all-3-verified).
  Written up as a "Layers and conformance status" section in `spec/README.md`; facet nouns fully
  parallel (internal substrate · user capabilities · user interaction · user presentation). **State: DONE.**
  - Surfaced (needs Steve): `spec/README.md` decision-log staleness — **#4** ("core 4 user primitives" →
    now 5, `UP-5` added) and **#7** ("interaction mechanics out of scope / separate UX specs" → `IX`/`PX`
    are now neutral facets; only concrete mechanics live in the R realization). Proposed fixes pending.

## Design deviation (Bramble-specific)
- **D1** — "All X-*as-a-node* elsewhere = co-location" (deviation from Tana's owner+reference; real
  multi-parent). **Finding (2026-07-14):** already recorded at both layers — `design.md §1` ("closes the
  owner+reference divergence") + §2:161 (co-locate gesture, "the gesture Tana lacks") + `gap-analysis.md`
  (`IP-2` divergent; `UP-1.multi-location` partial). No new recording needed. **State: DONE (already recorded).**
- **D2** — Propagate N1–N3/T1 **down** to the design layer. **Done (2026-07-14):** rewrote
  `design.md §1` (edges = one kind-typed `Edge`; linked edge = `kind: linked` reified `Edge`, not a
  bare `Ref`; backlinks uniform via `targetOf`), §2 gesture rows (mention = linked `Edge` + marker;
  expand/open-beside), §3 (settled references narrative: atomic mention · secondary-view unification ·
  grouped-union backlinks · cycle-safe expansion), and `design-references.md` (proposal → settled
  sub-design, status → `current`). **State: DONE.**

## Behavior to assess (empirical)
- **B1** — Cycle/recursion in mention-expansion: mentions may-cycle (self/ancestor); expansion needs a
  bounded, on-demand, path-guarded rule. **Finding (2026-07-14):** the rule is already canon —
  `IP-3.may-cycle` + `IP-3.expand` ("expansion is on-demand, so a linked-edge cycle through T does not
  expand unboundedly"). Reduced to: confirm Tana matches (live-check) + honor it in the build.
  **State: ASSESS (confirm-only).**

## Implementation (DXOS build)
- **I1** — Kind-typed `Edge` model layer. **BUILT (2026-07-14, subagent-driven, 5 tasks, commits
  6f783f2a2b..6697742093):** `Edge.kind` (structural|linked, `order` optional, v0.2.0) + `makeLinkedEdge`;
  structural ops (`childEdges`/`parentEdges`/`outlineRows`) filter `kind=structural`; `createLinkedEdge`
  (may-cycle); `backlinks` grouped union via `targetOf`. Whole-branch review **READY**; gate green
  (test 61/61, build, lint). **State: BUILT.**
  - Carried to **I3** (whole-branch Minors): (1) `NodeOutline.tsx` zoom-root fallback + edge `useQuery`
    read unfiltered `edges` — filter to `kind=structural` before I3 creates live linked edges (dormant
    now; avoids outline re-render churn on linked-edge changes). (2) plan's `linkedReferrers` was never
    needed (`backlinks` covers it) — doc-only.
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
- 2026-07-14 — **N2:** collapsed mention = **atomic** at the floor (`IX-direct.reference-atomic`);
  editable-collapsed above-floor (T1). Editing a mention is always one gesture away (expand), so atomic
  costs no capability — it only makes editing another node a deliberate step rather than something that
  can happen while the user thinks they're editing their own sentence.
- 2026-07-14 — **"Secondary view" unification:** the inline-expand panel (`UP-4.embed`) and the
  alongside panel (`UP-5.open-beside`) are ONE artifact — a live, on-demand, bounded view of a Node +
  subtree — in two placements (inline / alongside). Defined once in `UP-5`; reused by `UP-4.embed` and
  `IX-direct.reference-atomic`. Cascades to I3: one renderer, two mount points.
- 2026-07-14 — **Unify the edge realization (design):** both edge kinds are ONE reified kind-typed
  `Edge` relation (`kind ∈ {structural, linked}`), realizing the N1 neutral edge-family in the design.
  The **linked mention is a reified linked-`Edge`** whose target is the reference (not a bare in-text
  `Ref`) — this closes the backlinks-queryability hole (`referencedBy` indexes schema `Ref` fields, not
  text-positioned URIs) and unifies backlinks under `targetOf`. Reshaped `design.md §1` + I1.
