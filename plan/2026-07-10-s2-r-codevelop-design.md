# Design — Bramble S2 (neutral interaction spec) + Tana R, co-developed

Date: 2026-07-10
Status: draft (awaiting review)
Topic: how to author the neutral interaction spec (S2, `spec/interaction-primitives.mdl`)
and the Tana reference realization (R, `implementations/tana/user-experience.md`)
as one co-developed cycle, such that a downstream DXOS/Composer gap analysis and
implementation can reproduce Tana's user experience on a different substrate.

## 1. Purpose & goal

The flow's end goal for this leg is concrete: **reproduce Tana's UX on
Composer.** The chain is R (concrete Tana behavior) → S3-UX gap analysis
(Composer vs. R + the neutral bar) → S4 design → build. This design settles the
two upstream artifacts that leg depends on — S2 and R — and, importantly, *where
the specification content actually lives* so the reproduction is buildable.

The governing realization: **sufficiency for the reproduction lives in R, not in
S2.** S2 is a thin evaluation lens; R is the build target. The design below is
shaped around that.

## 2. The layering — meaning vs. physical

The stack has two *kinds* of layer:

- **Neutral / semantic (the "meaning").** Two specs, two kinds of meaning:
  - **SUP** (`spec/user-primitives.mdl`) — **capability** semantics ("what"):
    the user can nest, link, address any Node, sees backlinks. DAG-phrased.
  - **S2** (`spec/interaction-primitives.mdl`) — **interaction-manner**
    semantics ("how, qualitatively"): that nesting is *direct*, linking is
    *in-flow*, effects are *immediate*, gestures are *reversible*.
    Interaction-phrased. Names no keystroke.
- **Physical (the "how, concretely").** One layer:
  - **R** (`implementations/tana/user-experience.md`) — the concrete Tana
    realization: keystrokes, visual placement, feedback, edge cases.

So it is **not** "SUP = semantics, R = physical." It is **SUP + S2 = the neutral
semantic layer; R = the sole physical layer.** (SIP sits under SUP as the
substrate spec; unchanged by this design.)

### The dual-trace invariant

Every concrete R behavior traces *up* to whichever neutral primitive(s) it
realizes — and, in general, to **both** kinds:

- the **capability** it realizes → a **SUP** id (`UP-*`)
- the **manner** it exhibits → an **S2** id (`UX-*`)

Most concrete gestures realize both. The hard rule:

> **No-orphan rule.** Every R entry cites ≥1 SUP or S2 id. An R entry that traces
> to nothing is one of two things, and each is an explicit disposition, not
> silent scope creep:
> - **Tana-exclusive / above-floor** (supertags, typed fields, calendar/search
>   nodes — the layer the SUP explicitly excludes) → *out of scope* for the
>   reproduction unless first promoted into SUP.
> - **A table-stakes primitive the neutral specs missed** → a *move-up* signal
>   (FLOW.md adaptation protocol): amend SUP/S2 so it has a home, then cite it.

This invariant is what keeps R honest and scoped: it realizes the floor, nothing
orphaned, and any orphan is a flagged decision.

## 3. S2 as cross-cutting concerns (stance + organization)

**Stance (what S2 *is*): interaction *laws*.** S2 asserts the abstract
*properties every gesture must have* — directness, in-flow, immediacy,
reversibility — not the gestures themselves. This is the only framing that
carries content the SUP lacks (the *manner* of interaction) while staying
honestly keystroke-free, and it gives the downstream gap analysis a sharp,
neutral bar to test Composer against.

*Alternatives considered:* a gesture *inventory* with abstract properties
(risks sliding toward keystroke-naming); a thin *deferral* layer (risks being
empty / redundant with SUP). Rejected in favor of laws.

**Why S2 discriminates (why it isn't ceremony).** The two-spec SIP/SUP design
earns its keep because a system can pass one and fail the other (Tana passes
SUP, fails SIP on multi-predecessor). S2 earns its keep the same way: realistic
systems pass the SUP but fail the laws —

- link to any nested node *only via a modal dialog* → passes `UP-2`/`UP-3`, fails
  *in-flow*;
- reshape the outline *only via a separate structure/properties panel* → passes
  `UP-1`, fails *directness*;
- structural edits appear *only after a save/preview/render step* → passes
  capability, fails *immediacy*.

Because Composer is **not** Tana's stack, the reproduction cannot be
pixel-for-pixel; it will constantly require "reproduce the effect by different
means" calls. S2's laws are precisely the spec of **which effects are
non-negotiable**, so the gap analysis can rank each divergence as a **deep gap**
(violates a law) or a **cosmetic gap** (satisfies the law, differs from Tana's
styling). That ranking is the concrete value S2 delivers to the build.

**Organization: laws are the feats (cross-cutting).** The laws are cross-cutting
concerns over the SUP capabilities — a *sparse matrix* (law × capability):

| Law | UP-1 outline | UP-2 link | UP-3 address | UP-4 transclusion |
|---|---|---|---|---|
| **Directness** | ● | | | ● (expand in place) |
| **In-flow** | | ● | ● | |
| **Immediacy** | ● | ● | | ● |
| **Reversibility** | ● | ● | | ● |

A cross-cutting concern is, by definition, *factored out* rather than scattered.
So each law is its own `feat` (`UX-<law>`), naming its application points (which
capabilities it governs) via `traces:`. The `feat`'s trace is many-to-many *by
nature* — that is the honest signature of a cross-cutting concern, not a defect.

*Alternatives considered:* capabilities as feats with laws inlined as reqs
(scatters each law across every capability it touches — the anti-pattern
"cross-cutting" exists to avoid, and it restates content, violating the house
refer-don't-restate rule); a hybrid that declares laws once but still weaves them
in per-capability (same scatter, lesser degree). Rejected in favor of
laws-as-feats.

## 4. The S2 law set

Four feats, six reqs. IDs are `UX-<law>.<application>`. Each req carries a
neutral-but-testable conformance clause (`given`/`when`/`then`) and `probes:`,
mirroring `R-Conformance-Format` from the SIP/SUP.

```mdl
feat UX-direct: Directness
  traces:
    - UP-1 Atomic unit and outline
    - UP-4 Transclusion
  desc: |
    Structural change is made IN PLACE, on the outline as shown, by
    acting on the Node itself — not by opening a separate form, dialog,
    properties panel, or structure view and editing a representation of
    the outline there. The MANNER over UP-1 Atomic unit and outline (the
    user reshapes the outline) and UP-4 Transclusion (the user expands a
    reference): the SUP says the structure CAN change; this feat says the
    user changes it by direct manipulation of what is on screen.
  req UX-direct.outline:
    given: a Node shown in the outline
    when: the user nests, outdents, or reorders it
    then:
      - the change is made by acting on the Node in place — not through a separate form, dialog, or structure editor
      - the outline as shown is the thing the user manipulates and the thing that changes
    probes:
      - In X, does the user restructure the outline directly on it, or by editing a separate panel / properties view / source representation?
      - Is the thing manipulated the same as the thing displayed?
  req UX-direct.expand:
    given: a Node containing a reference to another Node
    when: the user expands that reference inline
    then: the expansion is a toggle on the reference in place — not a navigation to a separate viewer or a switch of context
    probes:
      - In X, is a referenced Node revealed inline where it sits, or by navigating away to open it?
```

```mdl
feat UX-inflow: In-flow reference
  traces:
    - UP-2 Links and backlinks
    - UP-3 Granular addressing
  desc: |
    Referencing and addressing another Node happen WITHIN the flow of
    editing a Node's content — the user names a target from inside the
    text they are already typing, not by switching to a separate mode,
    dialog, or search screen and back. The MANNER over UP-2 Links and
    backlinks (link) and UP-3 Granular addressing: the SUP says the user
    CAN link to any Node; this feat says the gesture to do so does not
    interrupt the editing context.
  req UX-inflow.link:
    given: a Node being edited, the cursor within its content
    when: the user initiates a reference to another Node
    then:
      - the target is named and chosen without leaving the editing context — no separate mode, dialog, or screen to switch to and back from
      - after insertion, editing continues from the flow with the cursor uninterrupted
    probes:
      - In X, is inserting a reference done within the text being typed, or via a separate insert-reference dialog opened and closed?
      - After insertion, does the user stay in the same editing position, or return to it from a mode switch?
  req UX-inflow.address:
    given: the in-flow reference gesture underway
    when: the user narrows toward a specific target
    then: any Node is reachable as the target from within the gesture, including a Node nested beneath others — the choice is not restricted to top-level Nodes
    probes:
      - Can the in-flow gesture in X target a nested Node, or only top-level containers?
      - Is the whole store of Nodes reachable from within the gesture without leaving it?
```

```mdl
feat UX-immediate: Immediacy
  traces:
    - UP-1 Atomic unit and outline
    - UP-2 Links and backlinks
    - UP-4 Transclusion
  desc: |
    The effect of an interaction gesture is shown AT ONCE — there is no
    separate commit, save, preview, build, or re-render step the user
    must invoke to see the result. The MANNER shared across UP-1 Atomic
    unit and outline (structural change), UP-2 Links and backlinks (a new
    link and its backlink), and UP-4 Transclusion (an edit through a
    shared Node): the SUP says these effects HOLD; this feat says the
    user sees them with no intervening step.
  req UX-immediate.gesture:
    given: an interaction gesture that changes the store — a structural change, a new reference, or an edit to a Node shown in several places
    when: the user completes the gesture
    then:
      - its effect is shown at once, with no separate commit, save, preview, or re-render step required to see it
      - where the changed Node is shown in more than one place, every place reflects the change without a manual refresh
    probes:
      - In X, does a structural or reference change appear immediately, or only after a save / preview / render / refresh step?
      - When a Node shown in several places changes, do all places update at once, or must the user refresh them?
```

```mdl
feat UX-reversible: Reversibility
  traces:
    - UP-1 Atomic unit and outline
    - UP-2 Links and backlinks
    - UP-4 Transclusion
  desc: |
    Each interaction gesture is INDIVIDUALLY undoable — the user reverses
    the last gesture and the store returns to its prior state. The MANNER
    across every capability: whatever the user just did (nest, reorder,
    link, expand, edit) can be taken back as a discrete step, so the
    interface is safe to explore.
  req UX-reversible.undo:
    given: a completed interaction gesture that changed the store
    when: the user issues undo
    then:
      - the store returns to the state immediately before that gesture
      - undo is gesture-granular — one gesture, one undo step — not all-or-nothing for a whole session or document
    probes:
      - In X, can the user undo the last structural / reference / edit gesture individually?
      - Is undo gesture-granular, or coarse (e.g. only whole-document, or absent)?
```

## 5. R — the reference realization

**R is the build target and where sufficiency lives.** The four laws are a lens
on R's quality; they are not a substitute for enumerating Tana's behavior.

### Concreteness bar

> An implementer could reproduce each behavior on Composer **without ever
> watching Tana** — from R alone.

That means, per behavior: the **trigger**, the **response**, the **visual /
layout / feedback**, and the **edge cases** (e.g. outdent at the top of a list,
multi-select, drag targets, zoom / breadcrumb behavior, keyboard↔mouse parity,
expand/collapse affordance). If R is thin, no amount of S2 makes Composer
buildable.

*R content is authored from direct Tana observation and verified — never
asserted from memory.*

### Entry format (with dual trace + gloss conventions applied)

```markdown
### @-mention — inline reference autocomplete

- **Trigger:** typing `@` while editing a node's content.
- **Response:** an inline popover opens at the caret; typing filters a live
  list of nodes by title; ↑/↓ selects, Enter/click inserts an inline
  reference and returns the cursor to just after it, editing uninterrupted.
- **Visual/layout:** popover floats at the caret; the inserted reference
  renders inline as a pill within the text.
- **traces (capability):** `UP-2.link` — link from within a Node's content
  · `UP-3.any-node-target` — target any Node, incl. nested
- **traces (manner):** `UX-inflow.link` — reference within the typing flow
  · `UX-immediate.gesture` — effect shown at once
```

The split trace line (capability vs. manner) is deliberate: it lets the S3-UX
gap analysis return **two separate verdicts** for Composer — "capability
present?" and "manner satisfied?" — which is the whole point of the SUP/S2 split.

## 6. The co-develop cycle

Neither S2 nor R is honestly authorable in isolation: the laws are *induced* from
observing Tana, and R is *classified* by the laws. So they are one cycle,
R-leaning:

1. **Sketch the laws** (S2 draft) — the four feats above, as the working
   taxonomy.
2. **Author R from Tana observation** to the §5 concreteness bar — the primary
   investment.
3. **Tag each R behavior** with its dual trace (capability + manner ids, glossed).
4. **Disposition orphans** (no-orphan rule, §2): above-floor → out of scope;
   missing primitive → move-up (amend SUP/S2). Refine the law set if observation
   reveals a manner not captured by the four.
5. **Reconcile** — S2 crystallizes *from* R: any law with no R instance, or any
   R manner with no law, is a signal to adjust one side.

The result: a thin, validated S2 and a rich, implementation-grade R, both
mutually consistent and ready for the S3-UX gap analysis.

## 7. Conventions locked

- **Gloss-next-to-id.** Every reference *citation in a body* — `traces:` blocks,
  R trace lines, inline cross-refs in `desc` — reads `<ID> <gloss>`, never a bare
  id. (Machine-facing `derives-from:` headers stay bare, as reverse-lookup grep
  anchors.)
- **Split R trace line** into `traces (capability):` and `traces (manner):`.
- **IDs:** `UX-<law>.<application>` for S2; R entries are prose with a trace line.

## 8. Decisions & alternatives (log)

- **S2 stance = interaction laws** (over inventory / thin-deferral).
- **Organization = laws-as-feats, cross-cutting** (over capabilities-with-inlined-laws
  / declare-once-but-weave-in).
- **S2 kept a separate spec** (over folding manner into the SUP), on the
  principled footing that cross-cutting concerns are kept in their own module;
  and because a first-class *DXOS UX gap analysis* needs a neutral manner bar to
  test Composer against.
- **Emphasis inverted vs. a naive pipeline read:** R is the meat (sufficiency),
  S2 is a thin lens. Hence **co-develop**, R-leaning (over S2-first-in-a-vacuum,
  which risks a Procrustean taxonomy that thins R).
- **`UP-3` governed by in-flow only** (not by immediacy/reversibility): granular
  addressing has no independent gesture — its visible effect and its undo ride on
  the `UP-2` link gesture. So `UX-immediate` and `UX-reversible` trace
  `UP-1/UP-2/UP-4`; `UX-inflow` carries `UP-3` via `UX-inflow.address`.

## 9. Open questions / to confirm in review

- **Are these the right four laws?** Coverage check: does any Tana manner fall
  outside {direct, in-flow, immediate, reversible}? (Candidates to weigh during
  R authoring: *discoverability* of a gesture; *keyboard-first parity*.)
- **`UX-immediate.gesture` second bullet** (multi-place propagation with no
  refresh) borders on restating `UP-4.edit-through`. Kept as a *manner* ("no
  manual refresh") distinct from the *capability* ("shown everywhere"); confirm
  the altitude holds or move it wholly to a probe.
- **R scope:** floor-only (the core-4 realizations) for the first pass; Tana's
  above-floor layer stays out unless promoted. Confirm.

## 10. Non-goals

- No change to the neutral-vs-implementation-specific invariant (S2 in `spec/`,
  R in `implementations/tana/`).
- No keystroke or system name in S2.
- No authoring of the S3-UX gap analysis, S4 design, or Composer code here —
  those are their own downstream stages.
- No new tooling; traceability stays grep over stable IDs.
