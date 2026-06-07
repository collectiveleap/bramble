# Conceptual Foundations

This document records the reasoning behind Bramble's architecture vocabulary. It explains *why* the settled terms (substrate, space, blend, frame, generic space) take the shape they do, and what cross-tradition evidence supports treating that shape as real rather than as a single philosophical commitment. The canonical term definitions live in the sibling [vocabulary reference](vocabulary.md); this document supplies the conceptual "why" behind them.

## The three-part schema and why it recurs

The deep pattern underneath the architecture is a three-part move:

1. *something given* — composed of both unfiltered field and results from prior blends;
2. an *operation* that selects, shapes, or organizes it — highlighting some aspects and dimming others;
3. a *resulting structured thing* — which joins the *something given* again, and therefore available as input to a further operation.

In Bramble's canonical terms: the **substrate** is the *something given*, some of which may be as a result of a blend; a **blend** is the organizing operation; the **input spaces** are scaffolding containers in which existing content is pulled in from the **substrate** as input to the **blend** and the **output space** is the scaffolding container in which new content is created, and post-blend the content joins the substrate. The defining property is recursion: the content from a blend joins the **substrate** , so it may re-enter as input to the next blend. The structure is self-similar at every level. The operation also has duration. A blend stays open for as long as its participants agree it is still being worked — new inputs added, inputs or frames revised, the structuring reconsidered together — and only on being designated done does its content join the substrate. This durational, socially-worked character is Hutchins's material anchor (below). Upon close of a blend, the input spaces and output space scaffolding containers disappear.

The same three-part structure appears across an unusually wide span of intellectual traditions, in different vocabularies but with a stable underlying schema. Each tradition names the three parts differently:

- **von Uexküll** — *Umgebung* (the surrounding physical environment, the unfiltered world) → *Umwelt* (the species-specific perceptual world shaped by which signals the organism registers) → the lived experience of the organism. The tick responds to only butyric acid, warmth, and hairiness out of the entire universe, and that is its world.
- **Maturana and Varela** — the unspecified background of perturbations → the structure of the autopoietic system (structural coupling, which determines which perturbations register) → the brought-forth world / cognitive domain.
- **Kant** — *Ding an sich* (the thing-in-itself, noumenon) → the categories of understanding plus the forms of intuition → *Erscheinung* (appearance, phenomenon).
- **Husserl and phenomenology** — the hyletic data (raw sensory matter) → the noesis (the intentional act of meaning-giving) → the noema (the object-as-meant).
- **Buddhist Abhidharma / Yogācāra** — *ālambana* (the object-condition) → the sense-faculty plus the constructive activity of consciousness (*saṃskāra*, the eight consciousnesses) → the experienced object. Yogācāra is the strongest version ("consciousness-only").
- **Predictive processing (Karl Friston, Andy Clark, Jakob Hohwy)** — the sensory signal → the brain's generative model (priors, predictions, precision-weighting) → the perceived world. Perception is "controlled hallucination" constrained by sensory evidence.
- **Gibson and ecological psychology** — the energy array in the environment → perceptual systems attuned to specific affordances → the perceived affordance-world.
- **Information theory / Shannon** — the signal → the channel (noise, bandwidth, encoding) → the received message.
- **Bateson** — "the territory" → "the map" (with its conventions, scale, projection, selection) → the cognitive use of the map. "The difference that makes a difference" is the mediating function.
- **George Spencer-Brown / DSRP (Cabrera)** — the unmarked space → the act of distinction → the marked space and its complement. The most formal version, reduced to a single operator; DSRP makes the same move with "Distinctions" as the first irreducible cognitive operation.
- **Cognitive linguistics (Lakoff and Johnson)** — bodily-perceptual experience → conceptual metaphor and image schemas → linguistic and thought structure.
- **Sociology of knowledge / framing (Goffman, Kuhn, Foucault)** — reality → frame / paradigm / discourse → socially constructed knowledge. The mediating function is collective rather than individual.
- **Marshall McLuhan and media ecology** — reality → medium → the perceived/communicated world. Every new medium produces a different *Umwelt*.
- **The Blind Spot (Frank, Gleiser, Thompson, 2024)** — "reality as it is" → scientific abstraction and the structure of measurement → the picture of the world science produces, which forgets the middle term.

Two further traditions sharpen the *internal* structure of the organizing operation rather than restating the cycle:

- **Frame semantics (Fillmore, Minsky, Lakoff)** — frame (the schema) → frame invocation / activation → frame instance. The schema–instance–value layering is explicit and well-established here, making it the closest match to Bramble's frame / blend / framing (content) layering.
- **DSRP (Cabrera)** — does not map to the cycle; it unpacks the internal structure of the organizing operation, holding that every such operation has distinctions, systems, relationships, and a perspective.

Three traditions speak specifically to the *recursion*:

- **Bateson and cybernetics** treat re-entry as the recursion mechanism.
- **Conceptual blending (Fauconnier and Turner)** — input spaces, blending operation, blended space — with blends recursively becoming input spaces (hyperblending). This is the direct precedent for the results generated in the output space being substrate-grade.
- **Buddhist Madhyamaka** raises the question of the substrate itself: nothing has intrinsic essence (*svabhāva*), a strong reading in which the substrate is always already cooked by prior cycles.

One tradition speaks specifically to the operation's *duration*:

- **Distributed cognition (Hutchins)** — a materially and socially anchored blend persists across modifications and across cognizers: two people attending the same chart work the same blend across many sittings. Representational persistence is a spectrum, not a binary, and a cognitive system strategically moves work between durations — the precedent for a blend that stays open and is socially worked until it is designated *done*.

The convergence is treated as *evidence* that the structure is real, not as adoption of any one tradition. The traditions disagree on three questions: how much the substrate is knowable independently, whether the organizing operation is individual or social, and whether the recursion ever bottoms out in an unmediated layer. The architecture stays neutral on all three, which is exactly why the traditions can be drawn from selectively without committing to any one of them.

## Why tag-on-node tools conflate the operation with what it operates on

A statement such as "home chefs want to improve their nutrition" is a claim about the world. Marking it as an assumption is a different kind of thing entirely — a position taken on the epistemic status of that claim, a proposition about the author's relationship to the first proposition. Tag-on-node tools (Tana, Roam, Obsidian, and the rest) attach `#assumption` to the original node and thereby flatten both into a single composite object.

This is the core architectural error. Two consequences follow:

- **Recursion is lost.** Once the marking is just a label on the node, "all my assumptions about home chefs" is a query result but not an object that a *further* operation can be applied to. The question "which of my operations treat these as assumptions versus as facts" cannot be asked, because the operation is not a thing — it is a tag stuck on the material.
- **Multiple observers cannot coexist.** When two people mark the same statement differently, the tool either lets one win or shows both tags side by side as if they were properties of the statement rather than positions held by two different observers. Disagreement becomes a tag collision instead of a representable difference between two observers' positions.

The error is not really about tags; it is about *what kind of thing* a tag is. Attribute-based modeling is fine for intrinsic properties ("this is a customer," "this is a meeting note") but wrong for positions *toward* an object, which live in the relationship between an observer and the object, not in the object.

There is a deeper layering point. The statement is not raw given material; it is already a structured artifact — the output of an earlier operation in which aspects were selected and put into the form of a generalization. The tool therefore conflates *two operations at different levels of recursion*: the one that produced the statement, and the one that marks the statement. It treats them as the same kind of operation at the same level, when the second takes the first's output as its input. The tool has no representation of *level* at all; every operation sits flat on the canvas, and the recursive structure is invisible.

The fix is to keep the marking — the framing the operation produces — and what it operates on as distinct, addressable content, so that the marking has its own author, target, position, and time — and so that it, in turn, becomes material that later operations can address. The honest counter-argument is that flat tag-on-node modeling is cognitively cheap and was the right trade-off for the previous generation of tools; the full version (every such operation made a first-class entity) was built before (Cyc, OpenCog, formal ontology tools) and went unused because authoring overhead was brutal. What shifts the trade-off now is AI: models can do most of the structural work from natural-language input, so the previously prohibitive cost of treating the operation as first-class becomes affordable.

## Worked scenario

Two founders, the author and Sam, explore a meal-planning product. On Monday the author writes down a claim: *"Home chefs will pay $5/month for nutrition coaching."* On Wednesday, five customer interviews are run. On Friday, Sam adds her own view of the same claim. Three moments, two observers, one claim.

**In a tag-on-node tool.** Monday: a node carries `#assumption`. Wednesday: the same node is edited — `#assumption` removed, `#partially-validated` added, a child bullet noting "7 of 10 said yes, but pricing was anchored." The original position survives only in edit history that nobody reads. Friday: Sam disagrees, wanting to mark it still an assumption because she thinks the sample was biased; she either adds a contradictory tag with no record of who, when, or why, or overwrites the author's tag and erases it. After one week: a confused tag soup, no record of who thought what when, no visible disagreement, no inspectable history.

**In Bramble.** The claim is content in the **substrate**, sitting alongside other material the author has dropped in (side notes, a photo of a competitor's menu, a pricing spreadsheet). Framing the claim as an assumption is a **blend**: a **frame application** that pulls the relevant substrate content into an **input space** (a scaffolding container) and blends it with an **Epistemic Frame** whose *type* slot is set to *Assumption*. **Selective projection** projects just the claim into the blend — the photo and spreadsheet are pulled in but not projected — and the blend builds, in its **output space**, new content recording the claim-as-assumption. When the blend is designated *done*, that content joins the substrate with an edge to the claim, and the input and output spaces disappear:

- *Monday.* The author pulls the claim into an input space and blends it with an Epistemic Frame whose *type* = Assumption. On close, the substrate gains a new piece of content — holder = the author, basis = "industry analog pricing," time = Monday, conditions for change = "ten customer conversations" — edged to the claim. The scaffolding spaces are gone; the claim and this framing both sit in the substrate as distinct content.
- *Wednesday.* The Monday framing is not edited. A *new* blend over the same claim applies an Epistemic Frame whose *type* = Partially validated; on close the substrate gains a second piece of content — holder = the author, basis = "7 of 10 said yes, but pricing was anchored," time = Wednesday — also edged to the claim. Both framings now coexist in the substrate in chronological order; the trajectory of the author's thinking is visible and inspectable, and neither overwrites the other.
- *Friday.* Sam runs her own blend over the same claim — an Epistemic Frame whose *type* = Assumption — adding a third piece of content: holder = Sam, basis = "sample biased toward existing meal-kit users," time = Friday. The claim now has three framings edged to it — two from the author, one from Sam. The disagreement is a visible difference between how the two observers have framed the same claim, each with its own basis. Either founder can run a fourth blend whose input is the disagreement itself ("we currently disagree about validation; resolution requires expanded interviews").

The architectural lessons, aligned to the canonical vocabulary:

- **The claim and the framings over it are distinct content in the substrate.** The thing being framed (the claim) and what each frame application produces (a framing edged to the claim) are kept separate from the start, so the substrate-versus-operation confusion never arises. Each framing is itself substrate-grade content and can be an input to a further blend. The output space in which it was built is scaffolding and does not persist.
- **Append, never overwrite.** Every frame application is a new blend producing new content rather than mutating existing content. This is the append-only history property: Wednesday's framing sits alongside Monday's in the substrate, and Monday's is now part of the substrate that Wednesday's responds to. The full ordered history of how the position evolved is queryable.
- **Attribution and time are recorded per framing.** Every framing carries at minimum a holder and a time. This is per-event attribution, and it is what makes both multiple observers and the historical trajectory first-class rather than buried.
- **Multiple observers coexist on the same material.** Because these framings are parallel, attributed contents over the same claim, disagreement is structurally representable. Distinct observers' framings sit side by side without colliding, and concurrent edits within a still-open blend are merged rather than made to overwrite one another.
- **The substrate holds more than the claim.** A frame application projects only what the frame's slots require — selective projection — so other material in the substrate (photos, spreadsheets, side notes) can be pulled into the input space but stays unprojected, and remains available to other blends.

The user experience can still look like writing notes and adding tags — AI can infer the claim, holder, position, and time from natural-language input such as "I think home chefs will pay $5/month." The structure is present underneath, which means every subsequent operation has the layering it needs, and the same architecture that handles three claims scales unchanged to three hundred.

## Related

- [vocabulary.md](vocabulary.md) — the settled definitions of the terms used here.
- [architecture-rationale.md](architecture-rationale.md) — how this schema becomes the blend/space architecture.
- [principles.md](principles.md) — the design principles that follow from the tag-on-node critique.
- [product-positioning.md](product-positioning.md) — the product stance the critique implies.
- [lineage-and-nomenclature.md](lineage-and-nomenclature.md) — the thinkers behind the cross-tradition convergence.
- [scenarios.md](scenarios.md) — five worked scenarios that extend this document's single example.
