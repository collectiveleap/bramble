# Bramble — Node Kinds, Host Bridge & Import

Architecture- and medium-neutral behavioral specification for Bramble's special node kinds (days and file attachments), the bridge that brings the host environment's native objects into the DAG, and import. Each capability is a `##` section listing the **operations** it contributes, stated in DAG terms (see [../docs/vocabulary.md](../docs/vocabulary.md)). Operations obey the **content-global / structural-local** rule. A bullet flagged *(system invariant)* is a durable assertion that must hold in any implementation. *Source* lines trace to PLUGIN.mdl (see [../provenance/S1-classification.md](../provenance/S1-classification.md)).

User-facing interaction (gestures, focus, what the view must convey) is specified separately in [interaction.md](interaction.md); per-medium/architecture realization lives in [profiles/](profiles/).

The substrate is a DAG of nodes and directed edges. These capabilities are part of Bramble's **core, no-blend floor** — Tana-style outlining without supertags or tag-on-node. The frame/blending layer is specified separately in [frames-run.md](frames-run.md).

## Days

A Day is a node standing for a single calendar day — a day-noun.

- A Day is a node that carries one calendar date as its bound attribute; the date is what the Day stands for, not content typed into it.

*Source: F-Day-Title.1, F-Day-Title.2, F-Day-Title.3; evals T-Day-Title-today. The human-readable date label (relative "Today,"/"Yesterday," forms and the short-date format) is in [interaction.md](interaction.md).*

## Attachments

A file brought into the outline becomes a node representing it.

- **Import file.** Bringing a file in creates a node whose content is the dropped file's name. The node represents the file.
- Editing a file node's content never changes which file the node represents. *(system invariant)*

*Source: F-PDF-Upload.drop-seeds-content-with-filename; evals (drop targeting). The file icon and the drop-target highlight are in [interaction.md](interaction.md).*

## Host-Substrate Bridge

Bramble runs inside some host environment, which has its own native data types and objects. The bridge surfaces those native types and lets the user bring their instances into the DAG — *wrapping* an instance casts it into a node (the canon's "material outside the architecture becomes available only after being cast into content"). The concrete set of native types is supplied by the architecture profile for the target environment (e.g. ECHO types under DXOS/Composer; file types such as PDF or CSV under a filesystem host); the bridge behaves the same regardless of which types those are. Bringing a file in (see [Attachments](#attachments)) is the filesystem binding's import path.

- Every data type native to the host environment is surfaced, and the instances of each are discoverable from within Bramble.
- The set of surfaced types and their instances stays live: types or instances that appear in the host over time become available without a reload.
- An instance not yet represented in the DAG is importable, which casts it into a node (*wrapping* it) and brings it into the DAG as content.
- A host instance is wrapped at most once: importing an instance that already has a node reuses that node rather than creating a duplicate. *(system invariant)*
- A wrapped node carries its own durable identity and full history, like any node; wrapping does not copy or restructure the host object.
- A wrapped node's title stays in sync with the host object's title, **bidirectionally**: editing the title in Bramble updates the host object, and a title change made to the host object elsewhere propagates back to the wrapped node. Title is the field carried on the wrapper node itself; if the host object has no title, the wrapped node's content is plain editable text with nothing to sync. *(system invariant — a wrapped node's title and its host object's title stay equal)*
- Wrapping is **field-deep**: a wrapped object is represented not by a single node but by the wrapper node plus, for each editable field of the object, a successor node holding that field's value (the filler).
- Each field-value node is bound **bidirectionally** to its field on the host object: editing the value in Bramble writes the object's field, and a change to that field on the host object propagates back to the node. *(system invariant — each wrapped field-value node and its host field stay equal)*

*Source: re-homed from quarantine — F-Supertag.eager-materialization, F-Supertag.types-shown.filter, F-Supertag.types-shown.reactivity, F-6.Phase3b.query-node.materialize, F-6.Phase3b.query-node.render, F-Promote-Generalisation.two-query-body, F-Promote-Generalisation.conditional-orphan-query, F-Promote-Generalisation.promote-from-row, F-6.Phase3b.promote, F-6.Phase3b.promote.reuse, F-Supertag.title-sync (bidirectional wrapped-node ↔ host-object title), F-6.Phase2.{group, fields, persistence, enum.materialize, enum.pill, enum.picker, field-type-icon, field-placeholder, field-row-layout, coexist}, F-Supertag.title-hidden-in-fields (field-deep bidirectional wrap), F-Supertag.open-instance-control (open host object's native surface), F-V2.12 field-group clause, F-PDF-Upload.dedup-reuses-existing-node; evals T-Promote-Row-Click-Creates-Wrapper-Under-Today, T-Promote-Row-Click-Reuses-Existing-Wrapper, T-Supertag-title-write, T-Supertag-title-read, T-Supertag-title-seed-from-instance, T-Supertag-title-no-label-noop, T-Supertag-title-hidden-in-fields, T-Supertag-open-control-renders, T-Supertag-open-control-click, T-Supertag-open-control-shift-click-pane, T-PDF-Upload-dedupes-on-second-drop. The supertag/tag-on-node mechanism (attaching a type to a node) is NOT part of this capability and remains removed. Browsing a type's instances, activating one to import or navigate, revealing field-value nodes on expand, and opening the host object's native surface are in [interaction.md](interaction.md).*

## Import

Import parses an outside outline format (Tana Paste) into nodes and edges within the Bramble, reproducing the outline's shape in the DAG.

- Parsing a Tana-Paste payload imports its structure as nodes and edges: nesting becomes structural edges, references between items become reference edges between the corresponding nodes, and dates carried by items are preserved.

*Source: F-7.1.*

## Related

- [editing.md](editing.md) · [graph.md](graph.md) — the rest of the no-blend core.
- [interaction.md](interaction.md) — the interaction grammar (gestures, focus, rendering).
- [frames-run.md](frames-run.md) — the isolated frame/blending layer.
- [../docs/vocabulary.md](../docs/vocabulary.md) — the vocabulary this spec speaks.
