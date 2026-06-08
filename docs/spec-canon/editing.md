# Bramble — Editing

Architecture- and medium-neutral behavioral specification for Bramble's content editing. Each capability is a `##` section listing the **operations** it contributes to the substrate, stated in DAG terms (see [../docs/vocabulary.md](../docs/vocabulary.md)) and scoped to an occurrence. Operations obey the **content-global / structural-local** rule: content operations change the node and show at every occurrence; structural operations rewire one in-edge. A bullet flagged *(system invariant)* is a durable assertion that must hold in any implementation. *Source* lines trace each capability to PLUGIN.mdl (see [../provenance/S1-classification.md](../provenance/S1-classification.md)).

User-facing interaction — which gesture invokes which operation, where focus goes, and what a view must convey — is specified separately in [interaction.md](interaction.md). Per-medium and per-architecture realization lives in [profiles/](profiles/).

The substrate is a DAG of nodes and directed structural edges. These capabilities are part of Bramble's **core, no-blend floor** — Tana-style outlining without supertags or tag-on-node. The frame/blending layer is specified separately in [frames-run.md](frames-run.md).

## Outline-Editing

A node holds content; a structural edge `p → N` places `N` as an ordered successor of `p`. A not-yet-persisted node is a **pending node** — it holds no content and has materialized no edge. Creating, splitting, and emptying are one model from different sides: a pending node becomes a persisted node on first input, and a node emptied across every axis becomes pending again at each place it stood.

- **Set content.** Setting a node's content changes it at every occurrence, and the content survives reload.
- **Split** `N` at content position *k*. `N` keeps the content before *k*; a new node `M` holds the content from *k*. For **every** in-edge `p → N`, an edge `p → M` is inserted immediately after `p → N`, so `M` is shared with the same in-degree as `N`. *(content-global — the split fans out to all occurrences, or other occurrences would lose the tail.)*
- **Join** an occurrence `p → N` with its immediate following sibling `p → M`. `N` keeps its identity; `M`'s content is appended to `N`'s; `M`'s successors re-attach under `N`, appended in order; `M` is **retired (tombstoned)**. Valid only when `M` is `N`'s immediate following sibling at **every** occurrence of `N`; otherwise refused. Join is the exact inverse of split.
- **Materialize** a pending node. On first content input it becomes a persisted node holding the typed content plus the structural edge that places it; no second pending node is spawned. A pending node never typed into persists nothing when dismissed.
- **Retire** a node emptied across every axis (no content — which, content being global, means empty everywhere — and no successors). The node is **tombstoned**: **all** its structural in-edges are removed and each place it stood becomes pending; identity and full history are retained, never erased. *(system invariant — a retired node's identity and history survive.)*

Structural placement of a node — insert-sibling, indent, dedent, link — is specified once in [graph.md › Graph-DAG](graph.md#graph-dag); the gestures that invoke every operation here are in [interaction.md](interaction.md).

- Out-edge order is preserved across every operation, and a reload restores the same order. *(system invariant)*
- Splitting, joining, indenting, dedenting, and retiring a node never change its identity or discard its history. *(system invariant)*
- The graph stays acyclic across every operation. *(system invariant)*

*Source: F-2.1, F-2.2, F-2.3, F-2.4, F-3.1, F-3b.1, F-3b.2, F-3b.3, F-3b.4, F-Shift-Enter.1, F-Cmd-Shift-Enter.1, F-Pending-Child.type, F-Pending-Child.empty-collapse, F-Pending-Child.page-root, F-Pending-Child.sibling-slot, F-Retire-Empty-Node.1; evals T-2, T-3, T-5, T-6, T-Sibling-Above-Lands-Between, T-Sibling-Below-Lands-Between, T-Backspace-To-Empty-Retires-Node, T-New-Sibling-Focus-And-Caret, T-Pending-Row-Mention-Commit-Attaches-At-Slot. **Join is net-new** — no PLUGIN.mdl source; specified as the inverse of split.*

## Collapse-Expand

Whether a node is shown collapsed or expanded is **per-occurrence** state on the DAG (the operation that sets and persists it is specified in [graph.md › Graph-DAG](graph.md#graph-dag)). One rule governs a node's initial state.

- A node created through the outline starts **collapsed** at the occurrence where it was created: its pending node and any nested successors are not shown until the occurrence is expanded.

*Source: F-V1.1, F-V1.2, F-V1.3, F-V2.7, F-V2.8, F-V2.9; evals T-9. The markers, guides, chevron, halo, and keyboard toggles are in [interaction.md](interaction.md).*

## Related

- [graph.md](graph.md) · [nodes.md](nodes.md) — the rest of the no-blend core.
- [interaction.md](interaction.md) — the interaction grammar (gestures, focus, rendering), including the Headers and Navigation surfaces that have no neutral-core operations of their own.
- [frames-run.md](frames-run.md) — the isolated frame/blending layer.
- [../docs/vocabulary.md](../docs/vocabulary.md) — the vocabulary this spec speaks.
