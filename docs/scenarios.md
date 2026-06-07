# Scenarios

Worked scenarios that prove how Bramble operates. Each follows one team — two founders, the author and Sam, in discovery on a meal-planning product — and projects them through a distinct core mechanic of the architecture. This document is the extended companion to the single worked scenario in [conceptual-foundations.md](conceptual-foundations.md): that one proves *append-not-overwrite* and *multiple observers*; these extend it across the mechanics it leaves undemonstrated.

Scenario 0 establishes the *floor* — what a user gets before, or without, any blend — so the rest can be read as what blending *adds* on top of it. The five that follow each prove a distinct blending mechanic: emergent structuring, multiple frames over one substrate, frame recommendation, the open-blend lifecycle, and recursion.

Each scenario narrates one stretch of work and closes with a **What this proves** list mapping each beat to the canonical vocabulary.

## Scenario 0 — The no-blend floor

It is the author's first afternoon in Bramble, before she has declared any frame or run anything she would call a blend. She does what she would do in any notes tool: she dumps. A note from a podcast — *"meal-kit churn is brutal after month 3."* A note with a competitor's URL. A half-thought — *"the Sunday ritual keeps coming up."* A photo of a whiteboard. Each lands directly in the **substrate** as content — added by her, attributed, timestamped — without any blend opening. The surface in front of her is just notes; the graph underneath is decoration she never has to look at.

She links some of them. From the Sunday-ritual note she drops a reference into the meal-kit-churn note — an **edge** between two pieces of content. This is not a blend; pointing one note at another is just a reference. She builds up a small web of linked notes the way she would in Roam or Obsidian, and she can follow the links in either direction.

Sam opens the same space that evening. Both happen to be editing the competitor note at once — the author fixing a typo, Sam appending a price. There is no blend, and there is no conflict dialog: the two edits **merge via CRDT**, and the note's history shows both hands, each attributed. The next morning the author rereads the churn note and tweaks a word; that edit **appends to the note's event log** rather than overwriting — the prior wording is still recoverable.

What she has *not* done is say anything *typed* about any note. Nothing is marked an assumption, nothing carries fields, nothing has a supertag. The moment she wants to — to mark the churn claim "assumption," or to read the Sunday note through Jobs-to-be-Done — she crosses a line: that marking is a **framing**, which is a blend, and that is where Scenario 1 picks up. Until she chooses to cross it, she is living entirely in the floor: notes and links, versioned and multiplayer, with zero classification.

**What this proves**

- **Content needs no blend to exist.** Notes, links, and a photo entered the substrate directly — added by the user, attributed, durable — with no blend opened. (*vocabulary.md §Content; "other content comes directly from the user or another source."*)
- **A reference is an edge, not a blend.** Linking one note to another is pointing, not blending — so Roam/Obsidian-style informal linking is fully available at the floor. (*vocabulary.md §Edge*.)
- **The floor is already richer than a classic notes tool.** Even un-blended content carries an append-only attributed event log and merges concurrent multi-user edits via CRDT — versioning and real-time collaboration that Tana/Roam/Obsidian do not provide. (*vocabulary.md §Append-only history, §Attribution, §Concurrent editing*.)
- **Classification is the line into blending.** Saying something *typed* about a note — marking it, giving it fields, applying a supertag's analog — is a framing, hence a blend; without blends there is no typed classification at all. This is exactly the "without supertags" boundary. (*conceptual-foundations.md worked scenario; vocabulary.md §Frame application*.)
- **The architecture is invisible at the floor.** The user sees notes; the substrate graph stays behind the surface until she needs it. (*principles.md principle 5*.)
- **Open question the floor exposes.** The architecture *permits* this no-blend surface to be an outliner (a tree is a subset of the substrate DAG), but the canon commits only to "notes, threads, or documents" and does not yet pin the no-blend editing experience. How Tana-like the floor *feels* — nestable zoomable bullets versus a linked-document editor — is a design decision the docs have not made. (*principles.md:15, stated as open.*)

## Scenario 1 — Capture becomes structure

The author finishes a customer call and, walking back to her desk, dictates a thirty-second voice memo into Bramble: *"That was the third person who said they already meal-plan on Sunday nights but fall off by Wednesday. The fridge photo thing keeps coming up. Nobody mentioned price unprompted. Honestly the Sunday ritual might be the whole wedge."*

The memo lands directly in the **substrate** as content — unstructured, attributed to the author, timestamped. No blend yet; it is just material she dropped in, sitting alongside the call recording and two earlier memos.

She has the **Jobs-to-be-Done frame** declared as active for this project. Bramble opens a **frame application** (a simplex blend): it pulls the memo into an **input space**, blends it against the JTBD frame, and builds a draft in the **output space**. Two distinct operations happen here. By *inference*, it reads what is already in the memo — "falls off by Wednesday" is lifted into the frame's *struggling moment* slot, "Sunday ritual" into *current approach*. By *structuration*, it proposes something not fully latent in the words: it sketches "Sunday meal-planner who can't sustain through midweek" as a candidate *job executor*, a structuring the author never said but can recognize and edit.

What she sees is not a form. It is a short sketch — "here's what I'm hearing" — that she can rearrange. She accepts the struggling-moment slot, rewrites the executor in her own words, and drags the fridge-photo observation out of the frame entirely; it stays in the input space, pulled in but **not projected**, still available for a later blend. The price observation she leaves unslotted too.

She does not click "done." This is a lightweight blend, and the system recognizes completion when she navigates away. The drafted content — a JTBD-structured reading of the memo — joins the substrate with an edge back to the original memo. The input and output **spaces** disappear. The memo itself is untouched; the structure sits beside it as separate, addressable content.

A day later she can read the memo as a plain note (the structure decorates it on hover) or open the JTBD reading as first-class content and blend further over it.

**What this proves**

- **Structure is a byproduct, not a precondition.** The author arrived with a mess and structuring happened *as* the blend ran — she never switched into authoring-mode. (*emergent structuring*; principle 3.)
- **Inference and structuration are different operations.** Lifting "falls off by Wednesday" into a slot is reading what's there; proposing the executor is constructing structure that wasn't latent. The tool does both and labels which is which by letting her edit the proposed part. (*features.md §Emergent structuring*.)
- **Selective projection keeps the substrate richer than the frame.** The fridge-photo and price observations were pulled into the input space but not projected into the JTBD reading — present, unprojected, available to other blends. (*vocabulary.md §Input space*.)
- **The frame application is a simplex blend.** One input supplies the familiar frame (JTBD), the other supplies the values; the output's structure follows the frame's slots. (*network type: simplex*.)
- **Lightweight *done* needs no manual signal.** The system recognized completion without an explicit click; the content anchored into the substrate and the scaffolding spaces vanished. (*blend lifecycle*; principle 2.)
- **The memo and its reading are distinct content.** The original is never mutated; the JTBD structure is separate, addressable, edged back to its source — the substrate-versus-operation distinction holds from the first capture. (*conceptual-foundations.md core error, avoided*.)

## Scenario 2 — A second frame over the same material

By now the team has weeks of work in the substrate, most of it read through a **Lean Canvas frame** they declared early. Among that material is a claim the author wrote after the pricing conversations: *"Home chefs will pay $5/month for nutrition coaching."* Under Lean Canvas it sits in the *Revenue / pricing* slot, next to the value proposition and customer-segment slots filled from the same body of work.

Sam thinks the team is treating a guess as a plan. She declares a second frame — **Discovery-Driven Planning** (Rita McGrath) — and applies it over the *same* substrate. This is a new **frame application**: DDP is pulled in as a frame, the existing body of work is pulled into an **input space**, and Bramble *finds* the elements that fit DDP's slots rather than asking Sam to re-enter anything. The "$5/month" claim is located and slotted as a **checkpoint assumption** — something that must be true by a named milestone, carrying an explicit test. The same words that read as settled revenue under Lean Canvas read as an unproven assumption-to-be-tested under DDP.

Nothing about the underlying claim changed. There is still one piece of content — *"Home chefs will pay $5/month"* — with one identity and one history. What changed is that a second frame application now references it, slotting it differently. The two readings coexist: Lean Canvas's *Revenue* slot and DDP's *checkpoint assumption* slot both point at the same content. Switching which frame is active changes the **view** — how the material is structured for the eye — and leaves the work itself untouched.

The author opens the same substrate in Lean Canvas; Sam keeps it in DDP. Neither is asked to choose. Later the author runs a one-off comparison — "show me this material in Lean Canvas next to DDP" — and the polysemy is on screen at once: the value proposition that Lean Canvas foregrounds is, under DDP, a cluster of assumptions ranked by how much rides on them and how little is known.

**What this proves**

- **One material, many frames, no forced choice.** Lean Canvas and DDP are both live over the same substrate in parallel; the tool maintains multiple frame applications rather than making the team pick. (*features.md §Multiple frames over one substrate*.)
- **Frames are applied to arbitrary substrate, not tied to their origin material.** DDP was declared *after* the work existed and still *found* its slots in material it never produced. (*features.md §Multiple frames*.)
- **Polysemy is handled, not flattened.** The identical claim is *Revenue* under one frame and *checkpoint assumption* under another — the same content slotted differently, not two copies. (*features.md §Multiple frames*; polysemy.)
- **Frames and material are many-to-many.** One claim slots into multiple frames; one frame slots multiple claims. Switching the active frame is a change of view over unchanged work. (*vocabulary.md §Frame application*.)
- **The claim keeps one identity through both readings.** No deduplication problem and no fork: a single piece of content with a single history, referenced by two frame applications. (*architecture-rationale.md §Identity*.)
- **Frame application is a primary verb.** "View this through DDP," "compare Lean Canvas versus DDP" — each is its own operation producing a distinct structured view, supported directly in the interface. (*features.md §Multiple frames*.)

## Scenario 3 — "What am I missing here?"

A month in, the substrate has grown dense with pricing work: a dozen claims about what home chefs will pay, three competitor price points, a willingness-to-pay spread from the interviews, the $5/month assumption now carrying a test under DDP. The team feels productive. The author, half on instinct, asks Bramble: *"What are we missing here?"*

This is a **pull**, not a push — she asked. Bramble *reads the substrate*: not just the content but the frame applications over it and the shape of the accumulated work. It notices a pattern the team cannot see from inside their own frames — claims about price are proliferating, but almost every one carries a *near-term* horizon, and the disconfirming tests that DDP would attach are sparse relative to the number of assumptions. It matches that character against the **diagnostic signatures** in the frame library and surfaces two frames the team is *not* using.

It leads with the higher-confidence one and explains why, rooted in the substrate: *"Suggesting Van Westendorp's Price Sensitivity Meter — you have eleven pricing claims anchored to single points and no representation of the range where price reads as 'too cheap to trust' versus 'too expensive.' Van Westendorp structures exactly that spread."* The second comes with its own short reason: a Polarity Map, *"because the recent claims keep oscillating between 'keep it cheap to grow' and 'charge enough to signal quality' without resolving — that reads as a tension to manage, not a problem to solve."*

Each suggestion carries a one-click **"show me what this would look like."** The author clicks Van Westendorp; Bramble runs the frame application against the existing pricing claims and shows the resulting view — the same eleven claims redistributed across the four price-perception thresholds, with the gaps where she has no data made visible. The cost of trying the frame was near zero, and she did not have to know the frame existed to be shown it. She isn't ready to commit to the Polarity Map, so she **marks it for later** — added to consideration without being applied.

Bramble imposes nothing. The suggestions sit until she acts; dismissing either costs nothing, and the tool records the accept/dismiss to sharpen later matches. She declines neither and adopts neither today — both outcomes are fine.

**What this proves**

- **The tool surfaces frames the team is *not* using.** Most tools answer "given a frame, how should this be structured?"; this answers "given this material, which frames should you be considering?" — the consideration-set move. (*features.md §Frame recommendation as the highest-value feature*.)
- **Suggestion is conditioned on a read of the substrate.** The recommendation came from noticing proliferating near-term claims with thin disconfirmation — the substrate's character matched against diagnostic signatures, not a generic tip. (*features.md §Frame-finding, mechanism step 2–3*.)
- **Every suggestion explains *why*, rooted in what's there.** The Van Westendorp and Polarity reasons each cite the substrate pattern that triggered them, so each is evaluable rather than opaque. (*features.md §Interaction design: Explain why*.)
- **Pull by default; near-zero cost to try.** She asked; the one-click preview applied the frame to real material and showed the view without commitment. (*features.md §Interaction design: Pull / Offer to apply*.)
- **Consideration without application is a first-class move.** "Mark for later" added the Polarity Map to the consideration set without restructuring anything. (*features.md §Allow frames to be added to consideration*.)
- **Suggest but never impose.** The frames waited on her choice; dismissal is frictionless and feeds the match over time. (*features.md §The governing discipline*.)
- **Incompleteness is made visible by design.** The act of surfacing an unused frame tells her, structurally, that the current frames hide something — epistemic humility as a side effect. (*features.md §The epistemic-humility side effect*.)

## Scenario 4 — An open blend worked over three days

The team decides the willingness-to-pay question deserves sustained work, not a lightweight capture. They open a **blend** and leave it open: inputs are the interview willingness-to-pay spread, the three competitor price points, and the DDP checkpoint assumption, blended toward a **Van Westendorp frame** to produce a defensible price band. This blend will stay open for days, and it carries a **transient identity** by which both founders can find and join it.

**Monday.** The author pulls the three inputs into **input spaces** and begins filling the frame's slots in the **output space** — the "too cheap" and "too expensive" thresholds drafted from the interview spread. The edge from the output to the interview-spread input is **live** by default, so the blend follows that input's current state. She pins the competitor-price input "as of" today, though — those numbers were scraped on a date and she wants them held fixed, not silently updated. Every move appends an attributed event to the content's log: *input added*, *slot filler set*, *as-of pin set*.

**Tuesday.** Sam joins the same open blend — same transient identity, found and entered — and adds two more interviews to the willingness-to-pay input. Because that input edge is live, the output is **flagged**: an input changed, the price band may need revision. The flag does not rewrite anything. It surfaces, and incorporation is **explicit**: the author reviews the two new interviews, decides they widen the lower threshold, and appends an event incorporating them. Sam, separately, thinks one of the new interviews is an outlier and shouldn't move the band; the open blend holds both proposed updates side by side until they talk and the author's incorporation is the one they keep — a *reviewed* decision, recorded, not a silent overwrite.

That same afternoon both founders are in the blend at once and both edit the *upper* threshold slot — the author to $9, Sam to $8 — within seconds of each other. There is no conflict dialog. The concurrent edits **merge via CRDT semantics**, deterministically, and the merge result is itself per-event attributed: the log shows the author set $9 and Sam set $8, and which the merge policy resolved to. Nobody's edit was destroyed; the history shows both hands.

**Wednesday.** The band reads cleanly — a defensible $6–$8 with the thresholds sourced. The founders agree it's settled and designate the blend **done**. The output content — the price band, carrying its full three-day event log — joins the **substrate** with a durable identity. The input and output **spaces** dissolve; the live edge to the interview spread and the pinned edge to the competitor prices both **vanish with the scaffolding**. The settled band now carries *no* standing dependency on its former inputs: if a new interview lands next week, it does not auto-flag the band — bringing it in takes a *fresh* blend over the now-substrate band.

**What this proves**

- **A blend has duration and is socially worked.** It stayed open across three days and two people, modifiable throughout, closing only when the participants designated it *done*. (*vocabulary.md §Blend lifecycle*; principle 2.)
- **Transient blend identity lets collaborators find and join.** Sam entered the same open work by its transient identity on Tuesday; that identity disappears at *done*, where durable identity lands on the content instead. (*architecture-rationale.md §Identity and material anchoring*.)
- **Live edges follow; pinned edges hold.** The interview-spread edge tracked its input's changes; the competitor-price edge was pinned "as of" a date and stayed fixed — both live in the same open blend. (*vocabulary.md §Edge*; *architecture-rationale.md §Following inputs*.)
- **Change propagation flags but never auto-applies.** The new interviews flagged the output; incorporation was an explicit, attributed decision, and competing proposed updates coexisted until one was chosen. (*vocabulary.md §Change propagation*.)
- **Concurrent edits merge without a conflict UI.** Two simultaneous edits to the same slot merged deterministically via CRDT, with both hands preserved in per-event attribution. (*vocabulary.md §Concurrent editing*; *Attribution*.)
- **Append-only throughout.** Every move — including the disagreement and the merge — is a recorded event; nothing was destructively overwritten. (*vocabulary.md §Append-only history*.)
- **At *done*, dependencies dissolve.** The scaffolding spaces and both edges vanished; the settled band carries no live dependency, so a later input change is brought in by a new blend, not an automatic flag. (*architecture-rationale.md §Following inputs while the blend is open*.)

## Scenario 5 — Blending a disagreement

The substrate now holds the multi-observer history from the canonical case: the $5/month claim carries three **framings** edged to it — the author's *Assumption* (Monday), the author's *Partially validated* (Wednesday), and Sam's *Assumption* (Friday, basis: "sample biased toward existing meal-kit users"). The disagreement between the author and Sam is not a tag collision and not a problem the substrate hides; it is *visible structure* — two attributed framings of the same claim pointing in different directions. And in this architecture, that difference is itself a thing: an **edge** between content can carry significance, and a disagreement is exactly such an edge.

The founders decide the disagreement is worth working, so they open a **blend whose input is the disagreement itself.** Not the claim, not either framing in isolation — the relationship between them. Bramble pulls the disagreement into an **input space** and the team builds, in the **output space**, new content that names what the disagreement is *about* and what would resolve it: *"We disagree on whether the $5 willingness signal generalizes; resolution requires interviews outside the existing meal-kit user base — ten non-meal-kit home chefs by end of month."* On **done**, that content joins the **substrate** with edges to both framings and to the claim.

The decisive point is that this new content is *no different in kind* from the claim it descends from. It is **content**: durable identity, append-only history, its own edges. It can be read as a plain note, framed under DDP as its own checkpoint assumption, surfaced by the recommendation engine, or pulled as input to a *further* blend — for instance, a Tuesday blend that takes the resolution-plan content and the eventual ten-interview results together and produces a settled verdict. The recursion runs on content: each blend's output is substrate-grade and re-enters as the next blend's possible input. There is no privileged level — a synthesized resolution-of-a-disagreement is the same kind of object as the original claim, operated on with the same moves.

Crucially, nothing upstream was overwritten to make this happen. The three framings still sit in the substrate in chronological order; the disagreement-edge still exists; the new resolution-plan sits alongside them, edged in. The history of *how the team thought about how they disagreed* is itself now inspectable structure — the substrate reasoning about its own reasoning.

**What this proves**

- **A relationship is operable, not just viewable.** The disagreement — an edge between two framings — was pulled in as a blend input. Edges can carry significance and serve as inputs, so the difference between two observers' positions is itself something a later blend can work. (*architecture-rationale.md §Inputs as roles*; *conceptual-foundations.md Friday beat*.)
- **The output is substrate-grade and re-enters.** The resolution plan joined the substrate as content with full identity and history, available as input to the next blend — the recursion the whole architecture is built to preserve. (*conceptual-foundations.md §three-part schema, recursion*; *vocabulary.md §Content*.)
- **No privileged level — self-similarity holds.** A resolution-of-a-disagreement is the same kind of object as a first-capture claim, viewed and operated on identically however many cycles deep it sits. (*principles.md principle 1*.)
- **Recursion that tag-on-node tools cannot reach.** A flat `#assumption` label could never become an object a further operation addresses; here "what our disagreement is about" is first-class content, which is precisely the capability the conceptual-foundations critique says flat tools lose. (*conceptual-foundations.md §Recursion is lost*.)
- **Append preserved all the way up.** The three framings, the disagreement edge, and the new resolution plan all coexist; the substrate now holds an inspectable history of the team reasoning about its own reasoning. (*vocabulary.md §Append-only history*.)

## Related

- [conceptual-foundations.md](conceptual-foundations.md) — the single worked scenario these five extend, and the tag-on-node critique they demonstrate Bramble avoiding.
- [vocabulary.md](vocabulary.md) — the settled definitions of every term used here.
- [features.md](features.md) — the features these scenarios exercise (emergent structuring, multiple frames, frame recommendation).
- [principles.md](principles.md) — the design principles the scenarios make concrete.
- [architecture-rationale.md](architecture-rationale.md) — the reasoning behind the lifecycle, identity, and propagation behavior shown in Scenario 4.
