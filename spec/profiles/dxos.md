# Bramble — Architecture Profile: DXOS / Composer

> **Scope note.** This is a **compile-target profile**, not the neutral specification. Include it only when regenerating the **DXOS / Composer** implementation; exclude it (and [frames-run.md](../frames-run.md)) to regenerate the pure no-blend core. It does two things: states the **architecture constraints** the DXOS implementation must satisfy, and **binds** the neutral capabilities in [editing.md](../editing.md) / [graph.md](../graph.md) / [nodes.md](../nodes.md) to DXOS/ECHO specifics. Unlike the neutral spec, this profile is *allowed* to name ECHO, DXN, the schema registry, Composer surfaces, etc. — that is its job.

This file is a **stub**: the ECHO binding of the Host-Substrate Bridge is specified in full; the remaining bindings are mapped under *Bindings to be completed*.

## Architecture constraints

The DXOS target is a constraint system every regenerated component must satisfy:

- **No ECHO changes.** Bramble is a strict consumer of `@dxos/echo`'s stable API. It must not depend on edits to those packages, schema additions there, or new core APIs; everything — including the bridge below — is implemented as a layer *above* the ECHO surface that ships today. *(R-No-Echo-Changes)*
- **Edges are first-class ECHO Relations.** Structural parent/child and other relations are modelled as first-class ECHO `Relation` entities (the `Edge` schema), not as opaque child arrays; the DAG is realized over them. *(R-Edges-First-Class, R-DAG-First-Class)*
- **Bramble types are plugin-local.** Bramble's own substrate types (`Bramble.Node`, `Bramble.Graph`, `Edge`, …) are defined and owned within the plugin. *(R-Substrate-Types-Are-Plugin-Bramble-Local)*
- **Bramble surfaces wrap, not own.** When Bramble brings an external ECHO object into the DAG it *wraps* it (a Bramble node referencing the payload object) rather than owning or copying it; other ECHO consumers see the payload unchanged. *(R-Bramble-Surfaces-Wrap-Only)*
- **Pane subject is path-addressed.** A view's subject (the focused node, zoom target) is addressed by a Composer pane subject-path convention. *(R-Bramble-Subject-Path)*

## Bindings

### Host-Substrate Bridge → ECHO types

Binds [nodes.md › Host-Substrate Bridge](../nodes.md#host-substrate-bridge). The host environment is DXOS / Composer; the host substrate is ECHO; the native types are the ECHO schemas registered in the space.

#### Behavior

- The native types must be every ECHO type registered in the space's schema registry, *excluding* relation schemas (edges, e.g. the `Edge` type) and Bramble's own scaffolding types (`Bramble.Node`, `Bramble.Graph`). The remainder is surfaced, with no allowlist beyond these exclusions.
- For each surfaced ECHO type, a per-type index node must be materialized — one per (space, typename) — carrying a query child that lists the ECHO instances of that type. This index node is a browse surface only; it attaches nothing to user content.
- The index must distinguish ECHO instances already wrapped in a Bramble node from those not yet wrapped ("orphans"), so the un-wrapped instances are visible for import.
- The surface must be live: the plugin subscribes to the schema registry; a qualifying ECHO type registered or removed adds or drops its index within a tick, and new instances of a type appear in its query without a reload.
- Importing an un-wrapped ECHO instance must create a Bramble node that wraps it. Wrapping is idempotent: importing an instance that already has a wrapper reuses that wrapper rather than creating a second. *(system invariant — at most one wrapper node per ECHO object)*
- Wrapping must reference the payload ECHO object rather than copying or restructuring it; Bramble does not own it, and other ECHO consumers continue to see the same object. *(R-Bramble-Surfaces-Wrap-Only)*
- The wrapped node's title must be bound to the ECHO object's label field bidirectionally: editing the node's title writes the object's label, and a change to the object's label propagates to the node via subscription. When the type has no label field, the node's content is plain text with nothing to sync. *(binds the neutral title-sync invariant)*
- Each editable schema field of the wrapped ECHO object (text, number, enum, ref) must be represented by a field-value node nested under the wrapper; editing it writes the object's field via `Obj.update`, and a change to that field propagates back via subscription. The field group is rendered when the wrapper is expanded; the label field is omitted from it (it is the title, handled above). *(binds the neutral field-deep wrap invariant)*
- An enumerated field's allowed values must be materialized as shared per-space nodes — one per declared literal value — so renaming a value's label propagates to every object using that value; the field renders as a pill whose label comes from the live value node. *(R-No-Echo-Changes: enum-as-node lives above the stable ECHO API)*
- The index node must render as a page node (the per-type index node component, source `SupertagNode`): an H1 from its own content, and a body consisting solely of its query child — index nodes carry only query children.
- The index node and its query child must be attached into the graph via ECHO `Edge` relations, per the edges-as-Relations constraint.
- A single navigator entry (the type registry, source "All Tags" → Schema node) must open the registry of per-type index nodes.
- The generated registry and per-type index nodes (the "system" nodes — Schema, Library, index) must render with read-only, muted headers, since they are generated rather than user-authored; wrapped object nodes and their field-value nodes remain editable.
- Field-value nodes must be carried via the node's `fields` representation; the `supertags` array (applied-type tags attached to a bullet) is not part of the bridge.
- Opening a wrapped node's host object must open that ECHO object's Composer article surface.

#### Surface

- A per-type index must render as a browsable node whose query child lists the type's instances, the un-wrapped ones distinguished from those already in the DAG.
- Activating an un-wrapped instance must wrap it into a node and navigates to that node; activating an already-wrapped instance navigates to its existing node.

*Binds: Host-Substrate Bridge (neutral). Source — re-homed from quarantine: F-Supertag.{eager-materialization, types-shown.filter, types-shown.reactivity, types-shown.label, uniqueness}, F-6.Phase3b.{query-node.materialize, query-node.render, promote, promote.reuse}, F-Promote-Generalisation.{two-query-body, conditional-orphan-query, promote-from-row, external-echo-predicate}, F-6.Phase3.tag-node.children-are-queries, F-DAG.Phase2.tag-block-edges, F-Bramble-Nav.all-tags-opens-schema-node, F-Supertag.title-sync, F-6.Phase2.{group, fields, persistence, enum.materialize, enum.pill, enum.picker, field-type-icon, field-placeholder, field-row-layout, coexist}, F-Supertag.title-hidden-in-fields, F-6.Phase3.system-node.readonly, F-Supertag.open-instance-control, type Node.fields, components SupertagNode + OpenInstanceControl; evals T-Supertag-schema-shows-all-types, T-Supertag-mat-idempotent, T-Supertag-mat-live, T-Promote-Two-Query-External, T-Promote-One-Query-Bramble-Owned, T-Promote-Row-Click-Creates-Wrapper-Under-Today, T-Promote-Row-Click-Reuses-Existing-Wrapper, T-Bramble-Nav-all-tags-opens-schema-node, T-Supertag-title-write, T-Supertag-title-read, T-Supertag-title-seed-from-instance, T-Supertag-title-no-label-noop, T-Supertag-title-hidden-in-fields. The tag-application reqs (apply `#Type` to a bullet, the chip, the field-editor) remain quarantined — see [considered-and-removed/tag-on-node.md](../../provenance/considered-and-removed/tag-on-node.md).*

## Bindings to be completed

The remaining DXOS-profile work, grouped by the neutral capability each binding specializes (source reqs from [provenance/S1-classification.md](../../provenance/S1-classification.md), dest = `dxos-profile`):

- **App scaffold & The-Bramble** — Graph appears in the navigator Create menu (isLabs-gated); creating it persists a Graph + root Node in ECHO; opening renders the Article surface; creation via the space menu is idempotent and the Bramble is hidden from the per-typename navigator listing. *(F-1.1, F-1.2, F-1.3, F-One-Graph.bramble-created-via-space-menu, F-One-Graph.create-action-is-idempotent, F-One-Graph.bramble-not-listed-under-types)*
- **Node identity** — each node has a stable DXN; right-click copies it. *(F-3.2, F-3.3)*
- **Edges as ECHO Relations** — the `Edge` relation schema and its read/write helpers; structural reads merge legacy children with edges; default structural kind; lazy read-side migration. *(F-DAG.Phase1.schema, .Phase1.helpers, .Phase1.promote-via-edge, .Phase1.tree-reads-via-merge, .Phase2.blocknode-merge, .Phase3a.append-via-edge, .Phase3d.read-side-migration-backstop, .Phase5.structural-kind-default)*
- **References (ECHO)** — re-binding a reference's subscription on DXN change; releasing subscriptions on unmount. *(F-4b.2, F-4b.3)*
- **Zoom, panes & navigation** — pane subject-path changes on zoom; Composer Deck "open alongside" and its deck-disabled fallback. *(F-Zoom.click-changes-subject, F-Zoom.subject-change-replaces-rendered-target, F-Open-Pane.1, F-Open-Pane.recursive, F-Open-Pane.deck-disabled-fallback)*
- **Navigator sidebar & Days** — the per-space sidebar section (present iff a Bramble exists, expands on creation); Today item visible, opens today's Day-node, resets zoom; Bramble nodes hidden from the per-typename listing; creation navigates to today and focuses the cursor. *(F-Bramble-Nav.section-present-iff-bramble-exists, .today-visible, .today-opens-todays-day-node, .today-resets-zoom, .section-expands-on-bramble-creation, .node-hidden-from-per-typename-listing, F-No-Root.create-navigates-to-today, F-No-Root.create-focuses-pane-cursor)*
- **ECHO migrations & name sync** — increment auto-migrations; `outline.name` ↔ root `content` sync to the navigator label. *(F-3.4, F-Page-Header.5, F-Page-Header.6)*
- **File storage (Attachments binding)** — drop creates a node wrapping a `Wnfs.File`; dedup keyed on content id; graceful fallback when no file-uploader capability is present. *(F-PDF-Upload.drop-creates-node, F-PDF-Upload.dedup-reuses-existing-node, F-PDF-Upload.no-uploader-graceful)*
- **Versioning storage** — pinning captures the target's Automerge version heads at edge creation. *(F-Versioning.auto-pin-on-create)*

Plus the DXOS-bound evals (DXN clipboard contents, ECHO `Edge`/`Relation` existence, navigator-surface presence, Automerge snapshot mechanics) — see the `eval (dxos-bound)` rows in [provenance/S1-classification.md](../../provenance/S1-classification.md).

## Related

- [../editing.md](../editing.md) · [../graph.md](../graph.md) · [../nodes.md](../nodes.md) — the neutral capabilities this profile binds.
- [../../provenance/S1-classification.md](../../provenance/S1-classification.md) — the dxos-profile reqs and dxos-bound evals.
