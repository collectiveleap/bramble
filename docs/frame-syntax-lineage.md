# Frame Notation — Lineage, Reasoning, and Design Decisions

This document records *why* the frame notation looks the way it does. It traces the
intellectual lineage of the idea, states the constraints that shaped the design, and
captures the decisions (including the ones that were genuinely ambiguous and had to be
resolved) made along the way. It is the companion to the specification document, which
contains the actual syntax. Read this one if you want to understand the reasoning;
read the spec if you just want to use the notation.

---

## 1. The starting question

The investigation began with an observation that three quite different things seem to be
describing the same underlying structure:

- **Minsky's frames** (from *A Framework for Representing Knowledge*, 1974) — a knowledge
  representation in classic AI.
- **Tana's supertags** — a note-taking / knowledge-capture feature in a commercial tool.
- **Conceptual Blending** (Fauconnier & Turner, *The Way We Think*, 2002) and its
  reliance on *frames* and *mental spaces*, which in turn lean on Fillmore's frame
  semantics.

The question was whether there is a **syntax or pseudo-syntax for describing a frame**
that these three share.

---

## 2. The common skeleton

The first finding was that the three references are not merely analogous — they are three
*views* of one structure.

- **Minsky (the procedural view).** A frame is a named node with *terminals* (slots). Each
  terminal has a default value, a constraint on legal fillers, and — the part most people
  forget — *attached procedures* ("daemons") that fire when a slot is filled, queried, or
  emptied. Frames inherit through frame-systems.
- **Fillmore / Fauconnier & Turner (the linguistic-background view).** A frame is the
  structured background a word evokes, defined by its *roles* and their relations. The
  `COMMERCIAL_TRANSACTION` frame has roles Buyer, Seller, Goods, Money; "buy," "sell,"
  "cost," "pay" each profile that one frame from a different angle. **FrameNet** is the
  formalized version: every frame has a name, a definition, Frame Elements marked **Core**
  or **Peripheral**, the lexical units that evoke it, and typed frame-to-frame relations
  (Inheritance, Using, Subframe, Perspective_on).
- **Tana (the storage view).** A supertag is a type; its fields are slots; fields can be
  constrained to other types or carry defaults; supertags can extend other supertags
  (plain inheritance). Authoring `#person` with fields for birthday, employer, and email
  *is* authoring a Minsky frame whose slots happen to be queryable.

**Conclusion of stage one:** all three are dialects of a single structure —
*a named, inheritable type whose slots carry type constraints, defaults, cardinality, and
optionally attached behavior.* A shared pseudo-syntax therefore exists, and the early
sketch had four obligations: carry the type and its inheritance; carry slots with
constraints/defaults/cardinality; carry Minsky's attached procedures; carry FrameNet's
inter-frame relations.

---

## 3. The crack in the unification — why "describing" and "running" split

A syntax for *describing* a static frame is easy and well-established. The thing that
breaks a single tidy notation is **conceptual blending**, because blending does not treat
a frame as a static type — it treats frames as **inputs to an operation**:

1. compose two input spaces against a shared **generic space**,
2. **complete** the result by recruiting background frames,
3. **elaborate** ("run the blend") to develop emergent structure that exists in *neither*
   input.

That third step is the killer. The blend has structure none of the source frames contain
(a houseboat has properties neither a house nor a boat has), so it cannot be expressed as
a *declaration over* those frames. It needs **operators**, not just type definitions.

**Conclusion of stage two:** the family splits cleanly in two.

- *Frame as a static type with slots* → a real, convergent pseudo-syntax exists.
- *Frame as something you transform* (blending) → no settled syntax, because the interesting
  content lives in the operators and the emergent output, not in the frame description.

---

## 4. The two requirements that drove the design

The goal was sharpened to: an **inclusive syntax, based on a formal spec**, that

1. can be used in a Tana-like context — note-taking, knowledge capture; and
2. **sets up for attempts to run blending.**

These two requirements are what selected the formal base and shaped every later decision.

---

## 5. Decision: build on Typed Feature Structures (TFS)

The chosen formal foundation is the **typed feature structure**, specified in
**Bob Carpenter, *The Logic of Typed Feature Structures* (1992)**, with a concrete
authoring language already in the wild: **TDL (Type Description Language)** from the
DELPH-IN community (the LKB and ALE systems parse it and perform unification).

Three properties of TFS line up with the two requirements almost suspiciously well, and
each property serves *both* requirements at once:

1. **Partiality.** A TFS may be underspecified — name a type, leave most slots empty — and
   still be a well-formed object with defined meaning. Note-taking is partial and
   incremental, *and* blending inputs are partial structures completed later. One property,
   both requirements.
2. **Type hierarchy with appropriateness conditions.** Carpenter gives a lattice of types
   where each type declares which features are appropriate and what type each value must be.
   This *is* Tana's "typed fields," *is* FrameNet's Core/Peripheral elements, *is* Minsky's
   slot constraints — all three earlier references are special cases of appropriateness
   conditions over a type lattice. Inheritance (including multiple inheritance) falls out of
   the lattice for free.
3. **Reentrancy.** A TFS can mark that two different paths lead to the *same* node
   (coindexing, the tags/boxes like `#1`). This is the decisive one for blending:

   > **A counterpart connection in conceptual blending is reentrancy lifted from within
   > one structure to across structures.**

   A cross-space mapping between two input spaces says "these two roles share an identity" —
   structurally the same relation as TFS reentrancy, just spanning two feature structures
   instead of living inside one. The **generic space** is precisely the structure both inputs
   are reentrant *with*. So the blending machinery is an *extension of a mechanism the formal
   spec already has*, not an invention from nothing.

**Decision:** use TFS (Carpenter) as the semantic base; treat TDL as prior art for the
authoring layer.

---

## 6. Decision: a two-layer design (surface sugar over TFS)

Nobody authors nested attribute-value matrices while taking notes. So the notation is two
layers:

- a **terse surface** you actually type (close to Tana's `#tag` and `::` field conventions),
  which **desugars** into
- **TFS**, where the meaning lives.

"Based on a formal spec" therefore means: the surface is *sugar*, and the semantics is
Carpenter's model theory. Every surface construct has a mechanical translation into a TFS
construct (see the spec document's desugaring table).

---

## 7. Decision: where blending attaches, and where honesty is required

The blend layer adds **cross-structure reentrancy**. A blend declaration names a generic
space, names the inputs, draws counterpart links (`~`), and — crucially — declares the
**selective projection**, because blending is *not* "merge everything"; it is "project some
structure from each input and tolerate the parts that clash."

The honest boundary, stated plainly so it is never oversold:

- Everything up to and including the blend **declaration** sits on solid formal ground.
- The **composition** step (merging projected structures where they agree) is exactly **TFS
  unification** — fully specified, with working implementations (LKB, ALE, the DELPH-IN
  toolchain). Composition is essentially free.
- But real blending is deliberately **not** unification. Unification *fails* on clash;
  blending *feeds* on clash. So "run the blend" cannot be a single well-defined operation
  over the inputs. It is a **constrained search**: which structure to selectively project,
  which background frames to recruit during completion, which elaboration to run — all scored
  against governing/optimality principles.

Prior formal attempts worth knowing (so they are not reinvented):

- **Joseph Goguen's algebraic semiotics** modelled generic-plus-two-inputs as a
  category-theoretic **pushout (colimit)** — then conceded that actual blends are usually
  *not* the colimit but an "optimal" object trading off competing constraints.
- **The COINVENT project** (Schorlemmer, Kutz, Confalonieri, Plaza, et al.) used **amalgams**
  from case-based reasoning: first *generalize* each input upward in the subsumption lattice
  to shed clashing detail, then combine the generalizations — the formal counterpart of
  selective projection.

**Decision:** implement "run" in two honest pieces — composition as plain unification
(solved), and selective-projection-plus-completion as an amalgam-style
generalize-then-combine search constrained by governing principles (open research, to be
prototyped, not called as a library).

---

## 8. Surface-grammar decisions (the genuinely ambiguous ones)

When the surface was firmed into a parseable EBNF, two earlier sketch conventions turned
out to be ambiguous and were resolved:

1. **One notation for "type," everywhere.** Earlier sketches wrote slot constraints with
   angle brackets (`resident :: <Person>`) but declaration heads with hash (`#Dwelling`) —
   two notations for one concept. **Decision: a type is always `#Name` everywhere; angle
   brackets dropped.**
2. **Explicit local aliases for blend inputs.** The earlier `project House.shelter` line
   silently assumed the type name doubled as a reference handle. **Decision: inputs take an
   explicit alias (`input house : #House`)**, which makes projection paths unambiguous and
   lets a frame be blended with itself.

Three implementation notes attached to the grammar:

- **Reserved words:** `blend`, `generic`, `input`, `project`, `governed-by`, `if-needed`,
  `on-fill`, `on-clear`, `ask`, `run`, `infer`, `link`, `true`, `false`. Because hyphens are
  legal in identifiers, `if-needed` and `governed-by` lex as single tokens — the lexer uses
  **maximal munch** then checks against the reserved set. The only lookahead the grammar
  needs is at a top-level `#`: read `#`, and if the next identifier is `blend`, commit to a
  blend declaration, else it is a frame declaration.
- **Offside rule for authoring.** The formal grammar uses explicit braces, but the editor
  surface should run an **indentation→braces layout pass** first (the Python/Haskell trick),
  so the typed surface stays indentation-based and Tana-like while the grammar stays clean.
- **`Action` is a host-language hole.** The four built-in daemon actions cover the examples,
  but in a real implementation you replace them with whatever expression language your note
  tool already runs. TFS itself carries no notion of procedure — the daemons are exactly the
  part of Minsky that sits *outside* Carpenter's formalism, so they are an extension point by
  design.

---

## 9. The clean dividing line (the one-sentence summary)

Everything from `#T` down through `generic` and `project` desugars into well-defined TFS
objects, so the entire declarative surface has model-theoretic meaning and the composition
step is just unification; **only** the `governed-by` constraints and the elaboration they
score remain the open, search-based part to be prototyped rather than derived.

---

## 10. Source map (who supplies what)

| Component of the notation        | Comes from                                  |
|----------------------------------|---------------------------------------------|
| Named inheritable type + slots   | Minsky frames / Tana supertags (convergent) |
| Typed slots, Core vs Peripheral  | FrameNet frame elements                     |
| Defaults + attached procedures   | Minsky terminals & daemons                  |
| Inter-frame relations            | FrameNet (Inheritance, Using, Perspective)  |
| Formal semantics (the base)      | Carpenter, *Logic of Typed Feature Structures* |
| Authoring-language prior art     | DELPH-IN TDL (LKB, ALE)                      |
| Cross-space counterpart links    | Fauconnier & Turner, lifted from TFS reentrancy |
| "Run the blend" as colimit       | Goguen, algebraic semiotics                 |
| Generalize-then-combine search   | COINVENT amalgams (case-based reasoning)    |
