# Bramble — Graph, References & Versioning

Architecture- and medium-neutral behavioral specification for Bramble's graph layer: the multi-predecessor DAG beneath the outline, the structural operations that rewire it, references and backlinks, pinned-reference versioning, and the Bramble itself. Each capability is a `##` section listing the **operations** it contributes, stated in DAG terms (see [../docs/vocabulary.md](../docs/vocabulary.md)) and scoped to an occurrence. Operations obey the **content-global / structural-local** rule. A bullet flagged *(system invariant)* is a durable assertion that must hold in any implementation. *Source* lines trace to PLUGIN.mdl (see [../provenance/S1-classification.md](../provenance/S1-classification.md)).

User-facing interaction (gestures, focus, what the view must convey) is specified separately in [interaction.md](interaction.md); per-medium/architecture realization lives in [profiles/](profiles/).

These capabilities are part of Bramble's **core, no-blend floor** — Tana-style outlining without supertags or tag-on-node. The frame/blending layer is specified separately in [frames-run.md](frames-run.md).

## Graph-DAG

A node may have multiple direct predecessors. Each in-edge `p → N` is one **occurrence** of `N`, so the same node can stand in several places at once; an edit to its content is reflected at every occurrence. Structure — which node stands under which, in what order, collapsed or expanded — lives on the edges, so per-occurrence state is independent. This capability owns the **structural operations** that rewire in-edges; the content operations that act on the node are in [editing.md › Outline-Editing](editing.md#outline-editing).

- **Acyclic invariant.** A node can never become its own ancestor, directly or transitively. Any action that would add a structural edge nesting a node beneath one of its own descendants is refused, leaving existing structure unchanged. *(system invariant)*
- **Single identity across occurrences.** A node has one identity no matter how many places it appears. *Add-existing* (bringing an already-existing node under a predecessor) creates a new structural edge and never a duplicate node: the node gains a predecessor and appears in one more place. A selection that would create a cycle is refused. *(system invariant)*
- **Edit fan-out.** An edit to a node's content is reflected immediately at **every** occurrence; the edited occurrence keeps its caret, and the others update without stealing focus or scrolling. *(system invariant)*
- **Insert sibling** at an occurrence `p → N`. A new node `M` is created with edge `p → M`, ordered immediately before `p → N` (before-insert) or immediately after it (after-insert). *(structural-local.)*
- **Indent** an occurrence `p → N`. With `s` = `N`'s preceding sibling under `p`, the edge `p → N` is replaced by `s → N`, with `N` appended last under `s`. `N`'s successors move with it. Refused if `s` is a descendant of `N`. The node's other occurrences are unaffected. *(structural-local.)*
- **Dedent** an occurrence `p → N` reached via `g → p`. The edge `p → N` is replaced by `g → N`, placed just after `p` in `g`'s order. The operation needs the predecessor occurrence `g → p`, because `p` may itself be shared — `g` cannot be derived from `N` or `p` alone. *(structural-local.)*
- **Link** an occurrence `p → N` under its preceding sibling `s`. The edge `s → N` is **added** while `p → N` is kept: `N`'s in-degree rises and it becomes shared (appears in both places). Idempotent — no duplicate edge if the link already exists. Refused on cycle. *(structural-local; contrast indent, which moves the one edge.)*
- **Per-occurrence collapse state.** Collapsed-or-expanded is state on the occurrence, not the node: the same node can be collapsed at one occurrence and expanded at another, defaulting to expanded where no per-occurrence state has been set. The state persists, so a reload reopens each occurrence in the same state. *(system invariant)*

*Source: F-DAG.Phase5.cycle-prevention, F-DAG.Phase3a.add-existing-via-picker, F-DAG.Phase3b.sibling-insert-via-edge, F-DAG.Phase3c.indent-dedent-as-edge-move, F-DAG.Phase4.per-occurrence-collapse, F-DAG.Phase3e.link-via-cmd-tab, F-DAG.Phase3e.multi-occurrence-edit-sync; evals T-Add-Existing-Via-At-Picker-Edges-Not-Duplicates. The predecessor badge, predecessor-navigation control, and auto-expand-on-indent are in [interaction.md](interaction.md).*

## References-Backlinks

A reference is an edge from one node to another, distinct from a structural edge. Backlinks are the reverse edges — the nodes whose references point at a given node.

- **Create reference.** Committing a chosen target adds a persisting reference edge from the editing node to the target node. A node never references itself.
- **Backlink count.** A node's backlink count always equals the number of nodes that currently reference it, and updates promptly when a reference is added or removed anywhere — without the user leaving the editing node, navigating, or reloading. *(system invariant)*
- **Reference label tracks rename.** Renaming a node updates every reference that points at it to resolve the new label. *(system invariant)*
- **Backlinks for a view.** The backlinks of a focused node (and its subtree) are every node outside it that references a node within it; the set updates promptly when an incoming reference is added or removed.

*Source: F-4.1, F-4.4, F-4.5, F-V4.live, F-4b.1, F-5.1, F-5.4; evals T-7, T-V4-live, T-8, T-10. The "@" picker, inline reference rendering, the "[N]" badge, and the backlinks panel are in [interaction.md](interaction.md).*

## Versioning

A reference can be pinned to the state of its target as of pin time. A defined set of reference kinds are pinning.

- The pinning reference kinds are a **single defined set**; a kind joins it only by a deliberate spec change that names it and reasons about why it pins. Creating a reference of a pinning kind captures a snapshot of the target as of creation, by the kind's contract alone.
- An unpinned reference (or one carrying no snapshot) shows the target's current state, and later edits to the target propagate to it.
- A pinned reference's snapshot never changes after pin time: it shows the target's state as of pin time even as the target later changes. *(system invariant)*
- Pinning survives tombstoning: a pinned reference keeps showing its snapshot even after its target is tombstoned (see [vocabulary › Tombstone](../docs/vocabulary.md#tombstone-never-erase)), falling back to a [removed] marker only when no snapshot resolves at all. *(system invariant)*

*Source: F-Versioning.pinning-edge-kinds-set, F-Versioning.auto-pin-on-create, F-Versioning.unpinned-edges-render-live, F-Versioning.pinned-edges-render-snapshot, F-Versioning.pin-survives-deletion; evals T-Versioning-pin-on-edge-create, T-Versioning-pinned-edge-renders-snapshot, T-Versioning-live-target-edits-do-not-disturb-pinned-view, T-Versioning-unpinned-edges-render-live, T-Versioning-pin-survives-target-deletion.*

## The-Bramble

A Bramble is the whole DAG in a space. A DAG has no single top — any node may have multiple predecessors — so the Bramble is a marker over the DAG, not a root node, and is not itself viewable.

- A space holds at most one Bramble, never more. *(system invariant)*
- The Bramble designates no root node; it is only a marker over the DAG and carries no structural top.
- The Bramble marker is never viewable as a view's subject; the user only ever views some node within the DAG. *(system invariant)*

*Source: F-One-Graph.singleton-per-space, F-No-Root.graph-has-no-root-field, F-No-Root.graph-not-directly-viewable; evals T-One-Graph-create-action-idempotent, T-No-Root-graph-has-no-root-field, T-No-Root-graph-not-directly-viewable.*

## Related

- [editing.md](editing.md) · [nodes.md](nodes.md) — the rest of the no-blend core.
- [interaction.md](interaction.md) — the interaction grammar (gestures, focus, rendering).
- [frames-run.md](frames-run.md) — the isolated frame/blending layer.
- [../docs/vocabulary.md](../docs/vocabulary.md) — the vocabulary this spec speaks.
