# Principles

These design principles follow from Bramble's stance ([product positioning](product-positioning.md)): structure is a byproduct of applying blends — captured and made inspectable rather than generated for the user.

## Principles

1. **Self-similarity across levels** — Every output is viewable and operable the same way as its inputs. The one durable object type is the *content* a blend produces; it carries its own append-only history and can be viewed, anchored, blended, or referenced uniformly regardless of how many cycles deep it sits. The blend's input and output spaces are transient scaffolding — what persists and re-enters the substrate is the content created within them, not the spaces. No privileged level: a synthesized composite is structurally the same kind of thing as an original claim. The user learns one set of operations that work at every scale.

2. **Blending is social and open-ended** — A blend is not a one-shot operation. It can stay open for as long as its participants treat it as still being worked — inputs added or removed, frames revised, the structuring reconsidered together — and its content joins the substrate when the blend is *done*. How *done* is reached depends on the blend: participants settle sustained collaborative work themselves, while for lightweight blends the system recognizes completion without demanding an explicit signal. The commitment is that nothing is forced closed prematurely — not that every blend needs a manual "done."

3. **Cognition stays outside the tool** — The heavy lifting is capture-and-structure, not generation. The user arrives with a stance already formed and the tool records it; it does not ask the user to invent structure from scratch. This dissolves the authoring-cost problem that historically sank structured-knowledge tools: translating an already-formed thought is far cheaper than generating one, so the structural overhead becomes incidental rather than primary.

4. **AI augments blending during structuring** — AI dissolves the cost of authoring structure rather than thinking for the user. For example, in a blend where one input is a frame (a simplex blend) it infers the *structural slots* from natural language and leaves the *content judgments* to the user, who edits and confirms a draft. This enables retrospective structuring: loose paragraphs, transcripts, and voice memos can be captured in the natural medium and structured asynchronously, so the user never context-switches from thinking-mode to authoring-mode.

5. **The architecture stays invisible** — Structure is present in Bramble's data model but surfaced on demand, never dominant. Most of the time the user sees notes, threads, or documents; the underlying structure progressively reveals itself on hover or tap and is inspectable when needed. As with Git's model under file diffs or Figma's tree under frames, the architecture sits behind the surface — deeply consequential, mostly invisible, surfaced when the user needs it. The primary view is the natural representation of what the user is thinking about, which the underlying structure decorates and undergirds rather than replaces.

## Related

- [product-positioning.md](product-positioning.md) — the stance these principles serve.
- [features.md](features.md) — the features derived from these principles.
- [conceptual-foundations.md](conceptual-foundations.md) — the tag-on-node critique these principles invert.
- [vocabulary.md](vocabulary.md) — the architecture that keeps the structure present but invisible.
- [scenarios.md](scenarios.md) — worked scenarios that make these principles concrete.
