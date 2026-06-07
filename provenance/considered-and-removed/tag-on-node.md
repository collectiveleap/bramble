# Considered & Removed — the tag-on-node approach

**Status:** Superseded by the frame / frame-application stance.
**Scope:** This is a Provenance decision record. It is **outside the conservation layer** (`spec/`, `eval/`) by design, so no transformation process regenerates the rejected design. It exists for accounting — to show the approach was considered and removed — not as current spec.

## What it was

`PLUGIN.mdl` began as a faithful DXOS re-implementation of **Tana**, whose classification model is *tag-on-node*: a type is attached to a node as an intrinsic property. In the source this is the **supertag** mechanism — applying `#Task`/`#Step`/`#Run`/`#Day`/`#File` to a Node appends a `Ref` to `Node.supertags`, renders an inline chip, and edits field values on the linked typed instance.

Later in its evolution the source introduced a **Lens / perspective / POV** primitive (`F-Run-Lens`, CONCEPTS.md §9) — a named perspective over the substrate that maps its own vocabulary and visibility rules onto shared identities. That direction *approaches* Bramble's frame/blend model in [docs/](../../docs/vocabulary.md), and is **kept** (re-expressed; see "Kept, not removed" below).

## Why it was removed

[conceptual-foundations.md §"Why tag-on-node tools conflate the operation with what it operates on"](../../docs/conceptual-foundations.md) names this as **the core architectural error**: attaching `#assumption` (or any type) to a node "flattens both into a single composite object," which loses recursion (the marking is a query result, not an object a further operation can address) and prevents multiple observers from coexisting (disagreement becomes a tag collision). Bramble's stance is that a framing is *distinct, addressable, authored content over a target* — a frame application — not a property on the node. Tag-on-node and frame-application are therefore mutually exclusive stances; the spec corpus commits to the latter.

## Kept, not removed (re-expressed in S2)

The behaviors that *sit on* supertags but are not themselves the tag-on-node error are **kept** with a vocabulary rewrite (Option 1, "keep-the-behavior, quarantine-the-mechanism"), tracked in [S1-classification.md](../S1-classification.md) with `rw = Y`:

- **Run / Step workflow** (`F-Run.3`, `F-New-Run-On-Step`, `F-Run-Execution-View`, `F-Run-Nav`, `F-Step-Runs-List`, `F-Run-Lens.1–.5`) → re-expressed as a **Run frame** applied via **frame application**; "lens/POV/perspective/observer-substitution" → frame / blend / selective projection.
- **Run / Step frame *realization*** (re-review 2026-06-05) — `F-Step.1`, `F-Run.1` (the `Bramble.Step` / `Bramble.Run` schemas), `F-Run-Lens.6` (the run's done field), and rules `R-Step-Is-Tagged-Node`, `R-Run-Is-Tagged-Node-Linked-Via-Edge` → **kept with the frame layer** (not the tag-on-node error — these are how the frame is realized; DXOS binding deferred, noted in [spec/frames-run.md](../../spec/frames-run.md)). Only the supertag *application* of the frame (`F-Step.2`, `F-Run.2` picker/chip) remains removed.
- **Day** (`F-Day-Title`, the `today` navigation) → the **day-noun** (`Bramble.Day {date}`), already canonical; only the `#Day` supertag attachment is removed.
- **PDF-as-node** (drop/dedup/filename) → kept; only the `#File` supertag chip is removed.
- **Host-substrate browse/import (13 reqs)** — `F-Supertag.{types-shown.filter, types-shown.reactivity, types-shown.label, eager-materialization, uniqueness}`, `F-6.Phase3b.{query-node.materialize, query-node.render, promote, promote.reuse}`, `F-Promote-Generalisation.{two-query-body, conditional-orphan-query, promote-from-row, external-echo-predicate}` → **re-homed** (2026-06-05) as the architecture-neutral **Host-Substrate Bridge** capability in [spec/nodes.md](../../spec/nodes.md), bound per target environment in [spec/profiles/dxos.md](../../spec/profiles/dxos.md) (ECHO types under DXOS; file types under a filesystem host). The "supertag" was only the vehicle for the per-type index; surfacing host-native types and importing their un-wrapped instances attaches nothing to content nodes, so it is *not* tag-on-node. Only the *attach-`#Type`-to-a-bullet* typing (picker-apply, chips, fields) below remains removed.
- **Host-substrate index *structure*** (re-review 2026-06-05) — `F-6.Phase3.tag-node.children-are-queries`, `F-DAG.Phase2.tag-block-edges`, `F-Bramble-Nav.all-tags-opens-schema-node`, and the unauthored `SupertagNode` component → completed into the bridge's DXOS binding (the per-type index node, its query-child body, its edge attachment, and the navigator entry to the registry) in [spec/profiles/dxos.md](../../spec/profiles/dxos.md).
- **Field-deep bidirectional wrap** (re-review 2026-06-05) — `F-Supertag.title-sync`, `F-6.Phase2.{group, fields, persistence, enum.materialize, enum.pill, enum.picker, field-type-icon, field-placeholder, field-row-layout, coexist}`, `F-Supertag.title-hidden-in-fields` → re-homed to the bridge. Wrapping is **field-deep**: a wrapped object is the wrapper node plus a field-value node per editable field, each bound **bidirectionally** to the host object's field (edit in Bramble writes the object; external change propagates back). Not tag-on-node — these represent and edit an *external* object; they attach nothing to a user's own content. Only the act of marking a user's bullet with a type (the `#`-picker, the chip) stays removed. This softens the wrap "does not mutate" line: editing any field writes through to the shared host object.
- **Bridge infrastructure & affordances** (re-review 2026-06-05, 2nd pass) — `F-6.Phase3.system-node.readonly` (generated registry/index nodes render read-only), `F-Supertag.open-instance-control` + `component OpenInstanceControl` (open the host object's native surface from its wrapper), the `F-V2.12` field-group clause (field group revealed on expand), and the `fields` field of `type Node` (storage for field-value nodes) → re-homed to the bridge. Each is about the bridge's generated nodes / wrapped-object surface, not marking user content.

Only the supertag *substrate* below them — `#X` membership attached to bullets, `Node.supertags`, typed-instance fields like `Run.completed`, the chip and field-editor surfaces — is quarantined here.

## Quarantined items (the removed material)

> Counts below already **exclude** the items re-homed / re-filed 2026-06-05 (see *Kept, not removed* above). Only the *attach-`#Type`-to-a-bullet* typing remains here.

### Reqs (19 full + 2 hybrid clauses)

- **F-6 lineage (11)** — `F-6.Phase1.{trigger, escape, keyboard-nav, apply, chip, create-instance}`, `F-6.Phase3.{tag-node.label, tag-node.header, regular-node.header-editable, regular-node.chip-section, picker.uses-renamed-label}`. *(`system-node.readonly` re-homed; the entire `F-6.Phase2.*` field machinery, `F-6.Phase3b` query/promote, and `Phase3.tag-node.children-are-queries` re-homed earlier)*
- **F-Supertag (3)** — `picker-renders-prefixed`, `typename-uniqueness`, `chip-gestures`. *(types-shown.\*, eager-materialization, uniqueness, title-sync, title-hidden-in-fields, open-instance-control re-homed)*
- **F-Promote-Generalisation (0)** — all four reqs re-homed to the bridge.
- **Frame-application via supertag (2)** — `F-Step.2`, `F-Run.2` (register so the `#`-picker/chip applies the frame). *(the `F-Step.1`/`F-Run.1` schemas + `F-Run-Lens.6` done field re-filed as kept-with-frames; `F-Bramble-Nav.all-tags-opens-schema-node` re-homed to the bridge)*
- **Materialization (2)** — `F-7.2` (supertag/TagDef import target), `F-Supertag-Chips-On-Page-Header.1`/`.2`. *(`F-DAG.Phase2.tag-block-edges` re-homed to the bridge)*
- **Hybrid clauses (kept req, quarantined clause)** — `F-Pending-Child.sibling-slot` (`#`-supertag-apply path), `F-PDF-Upload.chip-rendering` (`#File` chip). *(the `F-V2.12` field-group clause re-homed to the bridge)*

### Tests (11)

`T-picker-renders-prefixed`, `T-Supertag-picker-creates-fresh-instance`, `T-supertag-typename-uniqueness`, `T-Supertag-title-seed-outliner`, `T-Supertag-chip-click-zoom`, `T-Supertag-chip-shift-click-pane`, `T-New-Node-Collapsed`, `T-Tag-Picker-Keyboard-Nav`, `T-Step-Picker-Lists`, `T-Run-Picker-Lists`, `T-Supertag-Chips-On-Page-Header`.

*Re-homed to the Host-Substrate Bridge (22 tests, no longer quarantined):* `T-types-shown-filter`, `T-types-shown-filter-sort-order`, `T-types-shown-reactivity`, `T-Supertag-schema-shows-all-types`, `T-Supertag-mat-idempotent`, `T-Supertag-mat-live`, `T-Supertag-promote-reuses-existing`, `T-Supertag-uniq-sweep`, `T-Supertag-browse-reactivity`, `T-Promote-Two-Query-External`, `T-Promote-One-Query-Bramble-Owned`, `T-Promote-Row-Click-Creates-Wrapper-Under-Today`, `T-Promote-Row-Click-Reuses-Existing-Wrapper`, `T-Bramble-Nav-all-tags-opens-schema-node`, `T-Supertag-title-write`, `T-Supertag-title-read`, `T-Supertag-title-seed-from-instance`, `T-Supertag-title-no-label-noop`, `T-Supertag-title-hidden-in-fields`, `T-Supertag-open-control-renders`, `T-Supertag-open-control-click`, `T-Supertag-open-control-shift-click-pane`.

### Types / components

`type TagDef`, `component TagChip`; the `supertags` field of `type Node`; the `#Day` attachment of `type Day`. *(The `SupertagNode` and `OpenInstanceControl` components and the `Node.fields` field re-homed to the bridge; rules `R-Step-Is-Tagged-Node` and `R-Run-Is-Tagged-Node-Linked-Via-Edge` re-filed as kept-with-frames — all 2026-06-05.)*

## Salvageable (recorded, not imported)

These quarantined reqs contain generic interaction patterns a future **frame-application surface** could re-spec — noted so the work isn't re-discovered, but **not** carried into the spec:

- Generic picker UX — `F-6.Phase1.escape`, `F-6.Phase1.keyboard-nav`, `F-6.Phase2.enum.picker` (keyboard nav, escape-dismiss, viewport-scroll, mouse/keyboard shared highlight).
- Generic zoomed-header edit — `F-6.Phase3.system-node.readonly`, `F-6.Phase3.regular-node.header-editable` (the base "edit H1 → update content" behavior, minus the tag/option-node branches).
- Collapse-on-create — the neutral half of `T-New-Node-Collapsed`.

## Related

- [../S1-classification.md](../S1-classification.md) — full destination index.
- [../../docs/conceptual-foundations.md](../../docs/conceptual-foundations.md) — the critique that motivates the removal.
