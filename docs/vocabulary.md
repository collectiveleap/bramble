# Architectural Vocabulary

Stable specification at the architectural level. Implementation-neutral. Drawing on conceptual blending (Fauconnier and Turner), distributed cognition (Hutchins), and frame semantics (Fillmore, Minsky), with refinements from working through the architecture.

## Core terms

The substrate is a graph. Its **nodes** are of two kinds — **content** (durable) and **spaces** (transient scaffolding) — and its **edges** connect nodes and may carry roles. Because every blend builds on prior content, the derivation structure is a directed acyclic graph (DAG). (This graph-theoretic *node* is not the *tag-on-node* pattern Bramble critiques in [conceptual-foundations.md](conceptual-foundations.md): there a node is a UI item you attach tags to; here it is a vertex of the substrate graph.)

### Content

The durable unit of the substrate. A unit of material — a claim, a framing, a filled frame instance, a frame used as a reusable schema, a note, an image — structured or not. It is in the substrate: available to be referenced and to serve as input to further blends. It has a stable identity, an append-only event history, and edges to other content.

Content is the noun that persists; spaces are the transient scaffolding in which some content is made — other content comes directly from the user or another source.

### Space

A transient scaffolding **node** used during a blend. Input, output, and generic spaces are all spaces. A space exists only while its blend is open and disappears when the blend is designated *done*. It is not in the substrate and carries no durable identity of its own; what persists is the content created within it.

### Blend

The operation. Takes input spaces and a generic space, optionally a frame, and builds new content in an output space. The blend stays open and modifiable for as long as its participants agree it is being worked; when designated *done*, the new content joins the substrate and the scaffolding spaces disappear.

Blends are the verb; content is the noun.

### Input space / output space

The roles a scaffolding space plays in a blend, assigned by edges: a space is an input space because an edge from the output space marks it with the *input* role — the role is edge-borne, not intrinsic to the node. An input space holds content that is input to the blend (selectively projected into it); the output space holds the content being built. Both are transient — they exist while the blend is open and vanish at *done*. What persists is the content created in the output space.

### Frame

Content used as a reusable schema. A frame defines slot structure, fit characterization, selection profile, entailment commitments, and (optionally) temporal-causal profile, and typically lives in a shared library. Because a frame *is* content, it inherits identity, append-only history, concurrent editing, and edges — frames can be authored, versioned, forked, and combined like any other content.

Content takes on the frame role when it is annotated as a schema. A blend with a frame as an input is a frame application.

### Frame application

A blend with a frame as an input. The content built in the output space inherits the frame's slot structure, with slot fillers drawn from the other inputs via selective projection, completion, and elaboration.

A subtype of blending, distinguished by the presence of a frame as an input.

### Generic space

The abstract structure that licenses a blend; itself a space (scaffolding, transient by default). It provides:

- Licensing of the blend (warrants the inputs are blendable)
- Cross-space mapping (identifies counterparts between inputs)
- Organizational structure for the output content
- Coherence maintenance under projection

In frame applications the generic space is largely supplied by the frame's role structure. In other blends it is iteratively discovered through user–AI collaboration over the inputs. A generic space that proves useful across blends can be promoted to durable, reusable content.

### Edge

A directed reference from one node to another, optionally carrying a role (e.g. *input*). Live by default, with explicit "as of" pinning available.

A live edge follows the referenced node's current state as it evolves; a pinned edge fixes a specific historical state. Edges to or from spaces belong to a blend's scaffolding and carry roles like *input*; they dissolve at *done*. Edges between content persist as substrate relationships.

### Network type

Adopted from conceptual blending: simplex, mirror, single-scope, double-scope, multi-blend.

- **Simplex** — one input is a familiar frame; the other supplies values for the frame's slots. (Frame application.)
- **Mirror** — both inputs share the same organizing frame.
- **Single-scope** — two inputs with different organizing frames; one frame organizes the output.
- **Double-scope** — two inputs with different (often clashing) frames; the output has emergent frame structure combining both.
- **Multi-blend** — networks with more than two inputs, or with prior output content as inputs (recursive composition).

Hybrid mode: network type is declared with user/AI collaboration during the blend. Either the user or the AI can propose loosening the type to a descriptive category at any point during or after the blend. If the type needs to change after *done*, a new blend is required (which references the prior output content as input).

## DAG structure

The substrate is a **directed acyclic graph**: **nodes** joined by directed **structural edges**. This section fixes the graph-theoretic terms the specification speaks in, so operations can be stated precisely without appealing to any rendering metaphor (an outline, a bullet, a row).

### Edges, predecessors, successors

A structural edge `p → c` makes **p** a **direct predecessor** of **c**, and **c** a **direct successor** of **p**. A node's out-edges are **ordered**. Two nodes are **siblings** when they are direct successors of the same predecessor; the **preceding sibling** of `c` under `p` is the successor immediately before `c` in `p`'s order. **Ancestor** and **descendant** are the transitive closures: `a` is an ancestor of `d` when a directed path runs from `a` to `d`.

### Sharing, occurrence, per-occurrence state

A node's **in-degree** is its number of direct predecessors. A node with in-degree greater than one is **shared** — it stands in more than one place at once. Each in-edge `p → n` is one **occurrence** of `n` (one placement). A view renders the DAG by walking out-edges in order from a focused node; **each rendered position is an occurrence**, and a shared node is rendered once per reaching in-edge. State that belongs to a placement rather than to the node — for example whether a node is shown collapsed or expanded — is **per-occurrence**: it keys on the occurrence, so the same node can be collapsed in one place and expanded in another.

Because a node can occupy many places, "**the parent of a node**" is ambiguous and is not used: a node has a *set* of direct predecessors. Operations instead name "the direct predecessor *of an occurrence*."

### Acyclic invariant

The graph is always acyclic — no node is ever its own ancestor. Adding an edge `p → c` is refused when `p` is `c` or a descendant of `c`, leaving existing structure unchanged.

## Operation principles

Two principles decide how an operation's effect spreads across a shared node's occurrences.

### Content is node-level; structure is edge-level

**Content** (a node's material) lives on the node; **structure** (which node stands under which, in what order) lives on the edges. So:

- **Content operations** — set, type, **split**, **join** — change the node and therefore show at **every** occurrence of it.
- **Structural operations** — indent, dedent, link, insert-sibling — rewire **one** in-edge and leave the node's other occurrences untouched.

This is the **content-global / structural-local** rule. A corollary catches a subtle case: splitting a shared node is a content change, so the new tail node must be placed at *every* occurrence of the original (not only the one in view), or the other occurrences would silently lose the tail.

### Tombstone, never erase

There is no destructive delete. "Deleting" a node marks it **tombstoned**: its identity and full history are retained, it is removed from the active structure (its structural in-edges are removed), but it is **never erased**. A tombstoned node stays resolvable — a pinned reference still renders its snapshot, and a rollback can revive it. This is the structural reading of the substrate's append-only commitment (see [Append-only history](#append-only-history)): deletion and rollback are both forward actions that add events, never remove them.

## Properties

### Blend lifecycle

A blend has duration. It opens when work begins, stays modifiable while participants agree it is still being worked (e.g. inputs added or removed, frames revised, structuring reconsidered, concurrent edits merged, etc.), and closes when designated *done*. On close, the output content joins the substrate and the scaffolding spaces disappear.

While open, the blend has a transient identity by which participants can find and join it; on *done* that identity disappears along with the scaffolding spaces. Durable identity belongs to the content, not to the blend.

How *done* is determined depends on the blend: participants may signal it explicitly for sustained collaborative work, or the system may recognize it without an explicit signal for lightweight blends (e.g. marking a statement as an assumption).

### Identity

Content in the substrate has a stable, durable identity, independent of the blend's inputs: the same inputs blended again produce different content with a different identity. It persists through subsequent events in the content's history and through being referenced by other blends.

An open blend also has an identity, but a transient one — it exists only while the blend is open, lets participants find and join the work, and disappears on *done*.

### Append-only history

Every modification to a piece of content is recorded as an event with author and timestamp; the current state is computed from the event history.

There is no destructive modification. Rollback is a forward action: adding events that undo prior ones. History is preserved.

### Attribution

Every event is attributed to its author. Per-event attribution throughout, including within CRDT-merged concurrent edits.

### Concurrent editing

Content can be edited concurrently wherever it is worked — within an open blend or directly in the substrate. Concurrent edits by multiple participants merge via CRDT semantics; no conflict UI, merges automatic and deterministic. Applies uniformly, including to slot fillers in frame applications.

### Change propagation

Within an open blend, if a live input edge's referenced content changes, the output is flagged as having a changed input and ready for potential revision. Incorporation is explicit: a participant (or the AI) adds an event incorporating the change, or records a reviewed-no-update-needed event that clears the flag.

This following-and-incorporation belongs to the open blend; its edges dissolve at *done*, so settled content carries no standing live dependency — a later input change is brought in by a new blend, not an automatic flag.

### Anchoring

Content is anchored in the substrate: it gains a durable identity and becomes available to be referenced and operated on by subsequent blends.

Scaffolding spaces are not anchored — they are transient and disappear when the blend is designated *done*.

## Implementation neutrality

This specification describes what exists and how things relate. It does not commit to how content is stored, how identity is realized, how synchronization happens, or how the CRDT merge is implemented.

The specification can be transformed into different implementations (DXOS, RDF, CRDT libraries like Automerge or Yjs, traditional databases with event sourcing, etc.) without changing the architectural commitments.

## Related

- [architecture-rationale.md](architecture-rationale.md) — the reasoning behind each commitment stated here.
- [conceptual-foundations.md](conceptual-foundations.md) — the cross-tradition schema these terms encode.
- [scenarios.md](scenarios.md) — worked scenarios showing these terms in operation.
