# Architecture Rationale

The reasoning behind the settled Bramble vocabulary: the theory inputs that
informed each architectural commitment, and the design decisions that followed
from them. This document is the rationale companion to the [vocabulary
reference](vocabulary.md). Where the vocabulary states *what* the terms are, this states *why*
they take the shape they do.

## Conceptual-blending grounding

Bramble's blend operation is grounded in conceptual blending theory
(Fauconnier and Turner). The choice to make **Blend** the general operation —
with **frame application** as a subtype rather than a separate mechanism —
follows directly from how the theory analyzes integration networks.

**Inputs as roles, not types.** In conceptual blending, the things that go
into a blend are *input spaces*. This is why input space and output space are
*roles*, not node types: a space takes the input role because an edge marks it
so (edge-borne, not intrinsic). Any content with identity and meaning can be
drawn into an input space and projected; and the recursion runs on content —
the content produced as one blend's output is available as input to the next.
Edges can themselves carry significance and serve as inputs: a disagreement
between two pieces of content is itself something a later blend can operate on.
A subset of an input does not require a separate "subset" node; it is handled
by *selective projection* — the input space holds the whole, but only selected
elements project into the blend. Material outside the architecture (a web page,
a person, an event) becomes available only after being cast into content.

**Selective projection, completion, elaboration.** The theory describes the
blend as produced through composition, completion (recruiting background
structure to fill out the projected material), and elaboration ("running the
blend," operating within the blend according to its own emergent logic). These
are stages of producing one blend, not steps that produce successive blends —
a fact that bears directly on identity: the blend builds one piece of content,
not a chain.

**Frame application as the simplex case.** Frame application is the subtype of
blend where an input is a **frame** — content used as a reusable schema, such as
Lean Canvas. Its distinctive property: the output content's structure follows
the frame's slot specification, and the blend fills those slots with material
drawn from the other inputs. Slot filling is the *necessary outcome* of
blending with a frame — a frame whose slots stay empty would only be useful if
the other inputs had nothing relevant. General blending, by contrast, has no
predetermined output structure; the structure emerges from the composition.

This fits how conceptual blending treats frames and spaces — though not via the
universal claim it is tempting to make. Mental spaces are *structured by*
frames, and an input's organizing frame ranges from novel and situation-specific
to conventional and shared; the network typology turns on exactly this (mirror,
single-scope, and double-scope differ by which organizing frames the inputs
carry, and the simplex case is asymmetric — one input supplies the frame, the
other supplies values). What matters for Bramble is that there is no *type*
boundary between "a frame" and "framed content": a frame is content whose
organizing structure has been conventionalized and made reusable. The
difference between Lean Canvas as input and a customer interview as input is
that the canvas's organizing frame is conventional, shared, and
library-resident, while the interview's is novel and specific to the situation.
Socially shared structures (Lean Canvas as a Lean Startup convention) are simply
organizing frames that have been culturally conventionalized; the blending
operation is identical whether the frame is informal or shared. What differs is
the frame's availability, persistence, and recruitability — a sociological
difference, not an architectural one. This is why Bramble treats a frame as
**content in a schema role** rather than its own entity type.

**The network typology.** Fauconnier and Turner classify integration networks
by the role of organizing frames in the inputs:

- *Simplex* — one input supplies a familiar abstract frame, the other supplies
  values that fill its roles. This is exactly the frame-application case.
- *Mirror* — both inputs share the same organizing frame; the blend inherits a
  richer version of it.
- *Single-scope* — two inputs with different organizing frames, but only one
  frame's structure organizes the blend (typical of conventional metaphor).
- *Double-scope* — two inputs with clashing organizing frames; the blend has
  an emergent frame combining parts of both. Identified as the most creative
  form of blending.
- *Multi-blend / iterated* — hyper-blends that take blends as inputs.

Bramble's **Network type** (simplex / mirror / single-scope / double-scope /
multi-blend) is adopted directly from this typology. The typology is mature:
it has been extended rather than discredited (Brandt and Brandt's 2005 levels
of integration, and their complementary notion of *disintegration*), and taken
seriously enough by the computational tradition (Confalonieri and colleagues;
Goguen, Veale, Eppe) to be formalized. Critiques have been methodological or
about underspecification (Glebkin 2013), not about the categories themselves.

The typology is adopted as a **hybrid** commitment rather than a strict one:
the network type is asked for, the human and AI collaborate to settle it in
context, and the human can loosen a type from an enforced commitment to a
descriptive category — with the AI able to suggest the same. The AI may surface
concerns about the declared type at any point, and the human may revise their
judgment at any point. Two cases bound type revision: while the blend is
**open**, the type can be re-declared freely — it is just another aspect of the
work in progress; once the blend is **done**, the type is fixed, because the
blend and the scaffolding that carried it are gone, so changing it means a new
blend that takes the prior output content as input. Both are consistent with the
append-only commitment.

## Generic space

The **generic space** is explicit in the architecture — itself a space
(scaffolding while the blend is open) that can be promoted to durable, reusable
content — because conceptual blending assigns it several distinct jobs worth
making first-class:

- *Licensing the blend.* The generic space holds what the inputs share at an
  abstract level. Its existence is the warrant that the blend is coherent
  rather than arbitrary; without shared abstract structure the inputs would
  have nothing to map onto each other through.
- *Guiding cross-space mapping.* It provides the template against which
  counterparts in the inputs are identified and mapped.
- *Providing organizational structure.* In simplex networks specifically, its
  abstract roles become the slots of the output content.
- *Maintaining coherence under projection.* As elements are selectively
  projected, the generic space constrains the blend to remain a recognizable
  instance of the shared abstract pattern, keeping composition, completion, and
  elaboration from drifting into incoherence.
- *Being deliberately non-specific.* The generic space leaves outcomes open so
  different inputs can fill it with their own particulars; this non-specificity
  is what makes the blend's emergent structure possible.

In simplex networks the generic space tends to be coextensive with the frame's
role structure — the frame already supplies the abstract roles, so the generic
space is essentially the frame's abstracted skeleton. In mirror, single-scope,
and double-scope networks it is more independent: the shared abstract pattern
has to be constructed or discovered by comparing inputs, neither of which is a
pre-existing convention.

**Iteratively discovered, not pre-formed.** Although the standard four-space
diagram shows the generic space present alongside the inputs and the blend from
the start, the theory describes the network's spaces as constructed during
meaning-construction, not pre-given — the generic space can only be identified
by comparing the inputs, and that comparison is part of the blending operation.
Grady's critique (2005, "Metaphors of Conceptual Integration") argues the
connecting principle is often a pre-existing learned schema being recruited
rather than something computed fresh. Computational implementations take the
iterative view explicitly, treating the search for shared semantic structure as
a core open problem of the process. Bramble follows the iterative model: the
generic space is identified collaboratively between human and AI by iterating
over the contents of the inputs, comes into being primarily ad hoc during
blending, and is promoted to durable, reusable content explicitly or on AI
suggestion when it proves useful across many blends.

**Frame and generic space: a collapse underway.** Frame is now **content used
as a reusable schema** (a frame *is* content, in a schema role), and a generic
space that proves useful is promoted to durable, reusable content in the same
way. Both are abstract structural templates realized as content, so the earlier
posture of keeping them as separate entity types has largely dissolved. One
sub-question is deliberately held open: whether a promoted generic space simply
*is* a frame, or whether "generic space" and "frame" remain distinct *roles*
that content can play. Bramble keeps them as distinct roles for now and expects
use to settle it.

## Identity and material anchoring

The central question is: *what has durable identity, and when does it
acquire it?* The answer shapes the whole substrate — collaboration,
references, history, and supersession all depend on it. The short answer:
durable identity belongs to **content**, acquired when content enters the
substrate; a **blend** has only a transient identity, held while it is open
and gone when it closes.

**Durable identity belongs to content; the blend's is transient.** The
literature converges on identity being established by the constructed result,
not its constituents — each blending operation is a distinct event (Fauconnier
and Turner); the anchor is one specific clock face, not the abstract structure
it shares with another (Hutchins); a boundary object is identified by the
object itself, not by what it connects (Star and Griesemer). Bramble
establishes durable identity on the **content** a blend produces, anchored
when that content enters the substrate — at *done*, or immediately when a user
or source adds content directly. Identity is *not* inherited from input
identities. A consequence is that deduplication is not possible — every blend
produces new content even if structurally identical to a prior result
(consistent with append-only). The **blend itself** carries only a transient
identity while it is open, enough for participants to find and join the work,
and it disappears when the blend closes. Referring to existing content is a
different operation from blending: referencing, not creating.

**Why materialization makes the question exist at all.** Conceptual blending
itself has no notion of this identity. In the theory, mental spaces are
transient cognitive constructs that can be modified at any moment as thought
unfolds; the composition–completion–elaboration sequence produces one
continuously-modifiable blend, and identity is sustained by *continuity of
attention* — the cognizer is working on the same blend because they have not
shifted tasks. There is no completion state, no commitment point. Bramble
keeps the theory's spaces transient — they are exactly its **scaffolding
spaces**, alive only while the blend is open. What Bramble materializes as a
persistent artifact is not the space but the **content** built within it. And
Bramble adds the one thing the theory lacks: a completion point — *done* — at
which the content enters the substrate and the scaffolding falls away. The
identity question arises precisely because content is materialized while the
container is not.

**Material anchors (Hutchins).** Hutchins's material-anchor extension of
conceptual blending (2005, "Material Anchors for Conceptual Blends") is the
closest the literature comes: external artifacts fix part of a blend's
structure in the world, and a materially anchored blend acquires identity
sufficient to persist across modifications and across cognizers (two people
attending the same chart engage the same anchored blend). Bramble's persistent
**content** are material anchors in this sense — and the open blend's transient
identity is the *social* anchor that lets collaborators hold the same
work-in-progress before it materializes. Hutchins's "How a Cockpit Remembers
Its Speeds" (1995) shows that representational persistence is a *spectrum*, not
a binary — transient flap configurations, airspeed bugs set during calm periods
to serve as reminders, semi-permanent printed speed cards — and that cognitive
systems strategically move work between durations as stability becomes useful.
The open-blend-then-content move is exactly that: work is held live in
scaffolding while useful, then settled into durable content at *done*. The 2005
paper's structural claim — "conceptual structure must be represented in a way
that allows some parts to be manipulated, while other parts remain stable" — is
the open blend (manipulable) yielding stable content.

**Identity accretes incrementally; anchoring is partial.** This dissolves a
naïve in-progress-versus-committed binary. While a blend is open, its content
accretes — elements added, slots filled, structure firmed — and the blend's
transient identity, together with the participants' shared attention, holds the
work together; this is *social* anchoring (Hutchins's cultural models, Star and
Griesemer's boundary objects), which gives group work identity even before it
is materially anchored. The content acquires durable identity when the blend is
*done* and it enters the substrate: *material* anchoring. The relevant boundary
is at the *element* level, not the blend level — different parts firm up at
different times, and the content stabilizes incrementally up to *done*.
Bramble's choice follows from this: social anchoring carries the open work;
material anchoring lands a durable substrate identity on the content at *done*.

**Supporting theory.** The grounding draws on a convergent literature:
Hutchins's distributed cognition (1995, *Cognition in the Wild*), which maps
the substrate onto "representational states stored in media"; Clark and
Chalmers's extended mind (1998), in which cognitive artifacts are parts of the
cognitive system; Star and Griesemer's boundary objects (1989); Latour's
"immutable mobiles" (*Science in Action*, 1987); Goodwin's professional vision
(1994); activity theory (Engeström, building on Vygotsky and Leont'ev); and
Norman's cognitive artifacts (1991). These converge on three points that bear
on Bramble: identity is not binary but exists in degrees; identity is
established through anchoring (material, social, or activity-based); and
strategic conversion between durations is a fundamental cognitive operation.
Bramble's split — transient social/blend anchoring for open work, durable
material anchoring for content — is the direct application.

## Modification semantics

Three driving use cases set the requirements: collaborators work an open blend
together; content can be revisited and revised — directly in the substrate, or
by a new blend that takes it as input; and while a blend is open, a change to
one of its inputs flags the output for potential revision.

**A stable instance with an append-only event log, not version-per-modification.**
Two models were weighed. *Version-per-modification* would make each change a new
entity superseding the prior one — each state a distinct artifact (the
Git-commit / file-version feel). *Stable instance with event log* keeps one
entity whose state is computed from an append-only sequence of attributed events
(the living-document feel of Google Docs or Figma). Bramble adopts the
**stable-instance model** and rejects version-per-modification, because it fits
the use cases better: real-time collaboration on one shared piece of content,
low-friction revisit-and-revise, and inputs that evolve under open blends. The
stable instance is the **content**, not the blend — the blend is the transient
operation that builds it.

**Where the event log lives.** The append-only event log belongs to the
**content**. While a blend is open, the content being built sits in its output
space and accumulates events there — input added, input removed, projection
added or removed, slot filler set, generic space proposed, generic space
accepted, and so on. At *done* the content enters the substrate carrying that
history; the output-space scaffolding disappears, but the content and its log
persist, and later direct edits continue to append. Each event is attributed
and timestamped — per-event provenance finer than version-level attribution
(Sam added input X on Tuesday; the AI inferred slot filler Z on Thursday).
Current state is computed from the event history; historical states are
reconstructed by replaying events.

**Following inputs while the blend is open.** The dependency of an output on its
inputs is carried by **edges**. While a blend is open, edges run from the output
space to its input spaces, each carrying the *input* role — a space *is* an
input space because an edge marks it as one (roles are edge-borne, not intrinsic
to the node). These edges are *live* by default, so the output follows each
input's current state as it evolves, with explicit **"as of" pinning** when the
blend should hold a specific point-in-time state of an input (more like a
spreadsheet formula than a Git snapshot). If a live input changes while the
blend is open — its content changes, or *which* content the input space holds
changes — the output is flagged as having a changed input and ready for
potential revision. Surfacing is followed by *explicit incorporation*: a
participant (or the AI) decides whether the change is relevant and either adds
an event incorporating it, or records a reviewed-no-update-needed event that
clears the flag. Collaborators may disagree, so the open blend can hold multiple
competing proposed updates until one is selected. At *done* these edges and the
scaffolding spaces dissolve together; the settled content carries no live
dependency on its former inputs, and a later input change is brought in by a
fresh blend rather than an automatic flag.

**Concurrent editing via CRDT.** Collaborators see current state in real time
and operate on the same content, whether it is being built in an open blend or
already sits in the substrate. Non-overlapping concurrent modifications merge
cleanly. Genuinely overlapping edits — two collaborators setting the same slot
filler to different values at once — are a real conflict the merge resolves via
CRDT semantics, with the conflict-resolution policy (last-write-wins, explicit
human resolution, or operational combination) a design choice that follows from
the model without changing it.

**Rollback as a forward action.** Undoing recent modifications does not delete
past events. Rollback adds new events that reverse prior ones; the history still
shows the modifications and the subsequent undo, and current state matches the
desired earlier state. This keeps rollback consistent with append-only: the
desired state is produced by moving forward through the event sequence, not by
destroying history.

**Revisiting content: direct edit or new blend.** Because content is not frozen
at *done* and the blend that built it is gone, returning to revise is one of two
moves: a **direct edit** of the content in the substrate (events appended), or a
**new blend** that takes the content as input and produces fresh content
(existing references continue to point at the original unless explicitly
repointed). The architecture imposes no threshold between them; as with
collaborative documents, the human decides, and the architecture may surface
guidance when a change touches most of a piece of content. While a blend is
still open, continued work simply stays within it.

These commitments were validated against stress-test scenarios — simultaneous
editing, revision after an input change (including collaborator disagreement
over relevance), an input pinned to a specific version alongside a parallel live
input, rollback, and deep revision of heavily-referenced content — each of which
the resolved model handles without altering it.

## Related

- [vocabulary.md](vocabulary.md) — the terms this document explains.
- [conceptual-foundations.md](conceptual-foundations.md) — the conceptual schema underneath the architecture.
- [scenarios.md](scenarios.md) — worked scenarios demonstrating the lifecycle, identity, and propagation reasoning here.
