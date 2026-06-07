# Features

Features derived from [the stance](principles.md): structure is a byproduct of frame application, and frames are first-class objects. The tool operates over a library of methodological frames, applies them flexibly to ongoing work, helps choose between them, and lets the same material be seen through multiple frames at once.

## Emergent structuring

Users need not arrive with structure. They can arrive with a mess, and structuring happens *as* the blend is performed. The tool converts unstructured material into structured content in the act of frame application itself, rather than only retrospectively translating already-formed thoughts.

This requires two distinct operations. The first is *inference*: reading a paragraph and extracting slot values — reading what is already there. The second is *structuration*: taking unstructured material and proposing a structure that was not fully latent in the input and had to be partly constructed. Structuration proposes a way to organize material into something recognizable and editable.

The interaction reflects this. Material arrives as a stream of thoughts or transcripts; the tool responds with a draft *organization*, not just a translation. The proposed structure appears as a sketch that can be rearranged — collaboration on the act of frame application rather than mere recording.

The model is a good facilitator in a workshop: listening to a group's messy conversation and proposing back "here is what I am hearing as the three threads," with the group accepting or adjusting the structuring. The tool does facilitator-work continuously and quietly as a background operation on whatever is produced.

## Declared frames

Users declare which frames they are using, and the tool helps structure emerge toward those frames. Frames are not just ad-hoc one-off structures but *named, persistent, possibly external schemas* that govern how structuration happens. Declaring "we are working in the Lean Canvas frame plus the Assumption-Test-Learning frame" commits to a specific set of slot structures that the tool uses to organize incoming material.

Frames are therefore first-class objects with their own slot specifications. A Lean Canvas frame defines its slots (problem, customer segment, value proposition, and so on) and their relationships. An Assumption-Test-Learning frame defines assumptions, test design, evidence, learning, and how they connect. Declaring a frame selects a schema the tool uses to interpret and structure whatever is produced. This is analogous to ontologies in the linked-data world, types in programming language theory, and templates in the facilitator world. The distinctive move is that frames are *applied* to ongoing natural-language activity, with continuous coercion of free text into frame-shaped structure: the frame is a commitment to a schema, and the tool handles the schema-filling.

This implies a *frame library* — a collection of named, shareable, possibly forkable schemas that is a peer to the accumulated frame-application history. Common frames (Lean Canvas, OKRs, RICE prioritization, Wardley Map, polarity map, ICE scoring, working-backwards memo, and similar) become objects that teams can adopt, modify, or author from scratch.

This also distinguishes a frame as an artifact from an ad-hoc one-off. An artifact-frame has a declared schema (slot structure plus relationship rules) that can be applied to multiple substrates and produces structurally consistent results. An ad-hoc one-off is a single frame application carrying its own content, with no reusable schema behind it. Both are representable, but they are different kinds of things; the difference is whether the cut is one-off or reusable.

## Frame-finding / suggestion

Users can ask for help finding a frame. When a team is stuck and lacks a way to structure their thinking, the tool understands what they are working on well enough to recommend that Lean Canvas, Jobs-to-be-Done, the Wardley Map, the Polarity Map, or some combination would help.

This is a *recommendation system over frames*, conditioned on the substrate. It requires a meaningful representation of which kinds of substrates a given frame is useful for. Some of this is metadata on the frame ("Lean Canvas is useful for early-stage business opportunities"), some is learned from how the frame has been applied historically across the user base, and some is inferred at suggestion-time by reading the substrate and matching its character against known frames. The frame library therefore needs a *characterization* of each frame's fit conditions, and the tool needs the ability to read a substrate and propose frames against it — a recommendation engine over methodological choices.

The tool can also *notice* when the current structure is straining and proactively suggest a frame, for example: "you have been adding claims about pricing without a consistent frame; would Van Westendorp's Price Sensitivity Meter help here?" This shifts the tool from passive structurer to active methodological collaborator — a richer position, but a more sensitive one, since proactive suggestion risks feeling presumptuous.

The governing discipline is *suggest but never impose*: the tool offers frames, the user always chooses, and the tool explains *why* it suggests a particular frame in terms of what has been happening in the substrate, so the suggestion can be evaluated rather than merely accepted or rejected.

## Multiple frames over one substrate

Users can apply a new frame to existing material. After working in Lean Startup vocabulary, a Discovery-Driven Planning frame (Rita McGrath) can be added over the same substrate, and the same material can then be seen through both frames simultaneously. The tool does not force a choice; it maintains multiple frame applications over the same material in parallel.

This requires that frames be applicable to arbitrary substrates rather than tied to the material that originally produced them. A Discovery-Driven Planning frame applied to existing Lean Startup work *finds* the elements that fit its slots (the assumptions, the milestones, the disconfirming events) and proposes a structuring of the same material under the new schema.

This requires handling polysemy gracefully. The same claim — "$5/month nutrition coaching" — might be a *Value Proposition* in Lean Canvas, a *checkpoint assumption* in Discovery-Driven Planning, a *user-stated price point* in JTBD, and a *probe* in a Cynefin sense-making frame. The same material appears differently slotted under different frames, and switching frames re-structures the same substrate through a different schema.

Frames and material therefore live in a *many-to-many* relationship. The same material can be slotted into multiple frames simultaneously, and a frame can be applied to multiple bodies of material. Switching the active frame does not change the material — it changes the *view* of how the material is structured. The underlying work is untouched.

*Frame application becomes a primary verb.* The work is not only framing individual claims but adding frames over whole bodies of substrate, supported naturally in the interface: "view this material through the DDP lens," "compare what this material looks like in Lean Canvas versus Wardley Mapping," "what does this look like with the polarity-management frame applied." Each is a separate operation producing a different structured view over the same substrate.

Taken together, these capabilities position the product as a *methodology workbench*: teams pick which frames to operate under, the tool structures their natural-language activity into those frames in real time, frames can be swapped or layered without losing the underlying work, and the entire history of how the work has been framed is preserved as inspectable structure. The discipline that keeps this from becoming a tool with opinions about how people should think is that *frames are commitments by users, not impositions by the tool*: the library is rich and the assistance is helpful, but the user always declares which frames apply, can ignore suggestions without friction, and can author or modify frames freely. The tool is a workbench, not a teacher.

## Frame recommendation as the highest-value feature

The inversion: most tools answer "given a frame, how should this material be structured?" This feature answers "given this material, which frames am I not using that I should be?" This is the capability to surface *unconsidered alternatives*. In decision theory it is the *consideration set* problem: the most important determinant of decision quality is usually not how options are chosen but which options are brought into consideration at all.

The standard human failure mode is becoming locked into the frame already held, seeing all material through it, and never noticing that a different frame would reveal what the current frame hides. A tool that proactively surfaces *frames not in use* does something humans cannot easily do for themselves, precisely because the limitation is that one cannot see what one's own frame is hiding. The capability is *meta-methodological literacy delivered at point of use*.

This single feature does several things at once:

- It addresses the *blind spot of frames themselves*. Every frame makes some things visible and others invisible — Lean Canvas makes business model visible but flattens timing and capability evolution; Wardley Map makes evolution visible but de-emphasizes user emotion; JTBD makes user motivation visible but underweights infrastructure. From a position outside any single frame, the tool can see what the frame is missing.
- It *democratizes methodological breadth*. With access to a large library, the tool can surface frames the user has never heard of, appropriately and when relevant — the same move Stack Overflow makes for programming knowledge: recognizing the right approach when shown it rather than having to remember it.
- It creates a *learning surface*. Each suggested unused frame is an opportunity to learn a new frame in the most useful context — applied to material already cared about — turning suggestion into a teaching moment without being pedagogical.
- It produces *epistemic humility as a side effect*. Knowing there are always frames not in use, and being shown which might apply, conditions the user to hold current frames more lightly.

**Cited precedents (partial).** *De Bono's Six Thinking Hats* is the analog version: the "hats you are not using" prompt is built into the methodology, a single-method analog of this feature at software scale. *Liberating Structures*' "Critical Uncertainties" and "Ecocycle Planning" are facilitator interventions designed to surface missing considerations. *GitHub Copilot's suggestions* are the closest computational precedent — surfacing relevant patterns the user was not actively considering, with accept/modify/ignore. *Pol.is* surfaces opinion clusters the user might not have known existed, making visible a frame on the data that no individual produced. None of these recommend methodological frames against current work in real time, which is the specific gap.

**The mechanism.** It breaks into three parts:

1. The tool holds *characterizations* of each frame — not just slot structures but metadata about which substrates the frame illuminates and which questions it answers (Lean Canvas illuminates business-model coherence; Wardley illuminates evolutionary positioning; CLA illuminates underlying worldview; Polarity Mapping illuminates persistent tensions misread as problems). Each frame has a "diagnostic signature" of what its presence implies about the situation.
2. The tool *reads the substrate* — current material, frame applications, and accumulated work — identifying what is present, what is emphasized, and what is noticeably absent. For example: are claims proliferating without disconfirming tests attached? Are time horizons all near-term? Are multiple stakeholders' perspectives represented or only one? Is something being treated as a problem that is actually a polarity?
3. The tool *matches* the substrate's character against the library's diagnostic signatures and surfaces high-value mismatches — frames with high diagnostic value relative to substrate gaps that are not currently in use. Match-quality is the key technical problem: too eager and suggestions become noise, too cautious and they do not appear when needed; this needs iteration and learning from which suggestions are accepted versus dismissed.

**Interaction design.** The feature lives or dies on its interaction design — suggestions that feel like nagging get turned off, suggestions that feel like discoveries get returned to:

- *Pull rather than push by default.* The user can ask "what am I missing here?" and get a thoughtful answer. Proactive surfacing is possible but should be rare and high-confidence.
- *Explain why.* Every suggestion comes with a short reason rooted in the substrate ("Suggesting Polarity Map because the recent claims keep oscillating between focus and exploration without resolution"), making it evaluable rather than opaque.
- *Offer to apply, not impose.* Suggestions come with a one-click "show me what this would look like" — the frame is applied to the existing substrate and the resulting view shown, so the cost of trying a frame is near-zero.
- *Track what gets used.* The tool learns from accept/dismiss patterns, per-user and across the user base, improving the match over time.
- *Allow frames to be added to consideration without being applied.* "Mark for later" is a useful primitive.

**Why the frame library becomes the central strategic asset.** This feature is the highest-value point of contact between user and frame library, so the library's quality, breadth, and the depth of its diagnostic characterizations determine everything. Three implications follow: the library is *editorial work*, not just data — each frame needs a careful characterization at consultant-level depth, done by people who know each methodology deeply; the library should be *forkable and authorable* — power users author their own frames, consultancies maintain proprietary frames, communities share frames, and frames are objects that can be created, shared, modified, versioned, and combined; and the suggestion engine becomes a *strategic asset* whose quality compounds with use, as the matching improves and the library's characterizations grow through feedback — the dynamic that made Stack Overflow defensible despite trivially copyable software.

**The epistemic-humility side effect.** Every suggestion implicitly admits that the current frame is incomplete. The tool tells the user, structurally and continuously, that there is always more to see than any single frame reveals. Most software treats its representation of the user's world as accurate enough for action; this tool treats *every representation as incomplete by design* and makes the incompleteness visible. That positions it as a tool for thinking about thinking, with productivity as a side effect — and makes the product pedagogical without being didactic, since sustained use makes the user more methodologically literate, more frame-flexible, and more aware of the limits of any single perspective.

## Related

- [principles.md](principles.md) — the design principles these features derive from.
- [product-positioning.md](product-positioning.md) — the positioning these features realize.
- [vocabulary.md](vocabulary.md) — frame, frame application, and the substrate these features operate on.
- [tool-landscape.md](tool-landscape.md) — the methodological frames (Lean Canvas, CLA, polarity) in their original tools.
- [market-signal.md](market-signal.md) — the demand these features address.
- [scenarios.md](scenarios.md) — worked scenarios exercising these features in operation.
