# S1 — Classification Ledger

Master index of every `feat`/`req`/`test` in `input docs/PLUGIN.mdl`, classified for the Phoenix-primitive migration. This is Stage S1 output: **classification only — no lifting, no spec authoring.** Reasons for quarantined items live in [considered-and-removed/tag-on-node.md](considered-and-removed/tag-on-node.md); non-F/T source and flagged items live in [S1-non-spec-inventory.md](S1-non-spec-inventory.md).

## How items were classified

Each `req`/`test`, in order:

1. **Stance filter** — `tag-on-node` → **QUARANTINE** (accounting); `frame-family` / `neutral` → continue.
2. **Phoenix primitive** — `spec` (architecture-neutral behavior, survives non-DXOS re-implementation) · `dxos-profile` (about the ECHO/Composer representation itself) · `context-boundary` (type/component contract) · `flag` (no destination).
3. **Sub-segment** (spec / dxos-profile only) — `functionality` vs `ux`.
4. **Vocab rewrite** (`rw`) — `Y` where the kept text uses lens/perspective/POV/supertag/Run/Day-supertag wording that must be re-expressed in docs/ vocabulary (frame / frame application / selective projection / day-noun) during S2. `node`/`edge`/`DAG` are kept terms — not a rewrite trigger.

**Policy applied — Option 1 (keep-the-behavior, quarantine-the-mechanism).** The Run/Step workflow, the Day day-noun, and Versioning behavior are **kept** (rw = Y, re-expressed as a Run **frame** / Day **noun** in S2); only the supertag substrate they sit on (`#Run`/`#Step`/`#Day` membership, `Node.supertags`, typed-instance fields) is quarantined. This is the [conceptual-foundations.md](../docs/conceptual-foundations.md) frame stance applied at scale.

## Coverage

| Source unit | Distinct | Note |
|---|---|---|
| feat | 43 | grouping headers; reqs carry the classification |
| req | 223 | (`grep` counts 224; line 1627 `req is preserved.` is a wrapped body line) |
| test | 101 | (`grep` counts 102–103; line 168 is a rule-embedded example, plus 2 wrapped lines) |
| type | 7 | → [S1-non-spec-inventory.md](S1-non-spec-inventory.md) |
| component | 5 | → [S1-non-spec-inventory.md](S1-non-spec-inventory.md) |
| rule | 13 | → [S1-non-spec-inventory.md](S1-non-spec-inventory.md) |

## Rollup — reqs

| Destination | Count |
|---|---|
| spec/functionality | 41 |
| spec/ux | 90 |
| dxos-profile/functionality | 20 |
| dxos-profile/ux | 18 |
| QUARANTINE (tag-on-node) | 52 |
| flag | 2 |
| **total** | **223** |
| *(memo: 3 of the kept reqs — F-V2.12, F-Pending-Child.sibling-slot, F-PDF-Upload.chip-rendering — carry a clause that is quarantined)* | |

## Rollup — tests

| Destination | Count |
|---|---|
| eval (spec-bound) | 43 |
| eval (dxos-bound) | 25 |
| QUARANTINE (tag-on-node) | 33 |
| **total** | **101** |

---

## Reqs (source order, by feat)

`dest` legend: `S/fn` spec-functionality · `S/ux` spec-ux · `D/fn` dxos-profile-functionality · `D/ux` dxos-profile-ux · `Q` quarantine · `flag`.

### F-Day-Title

| req | dest | rw |
|---|---|---|
| F-Day-Title.1 | S/ux | Y (day-noun) |
| F-Day-Title.2 | S/ux | Y |
| F-Day-Title.3 | S/ux | N |

### F-1 Plugin scaffold

| req | dest | rw |
|---|---|---|
| F-1.1 | D/ux | N |
| F-1.2 | D/fn | N |
| F-1.3 | D/ux | N |
| F-1.4 | flag | — (CI/build gate) |

### F-2 Editable bullet · F-3 Flat siblings · F-3b Nested

| req | dest | rw |
|---|---|---|
| F-2.1 | S/ux | N |
| F-2.2 | S/fn | N |
| F-2.3 | S/fn | N |
| F-2.4 | S/ux | N |
| F-3.1 | S/fn | N |
| F-3.2 | D/fn | N (DXN) |
| F-3.3 | D/ux | N (DXN copy) |
| F-3.4 | D/fn | N (ECHO migration) |
| F-3b.1 | S/fn | N |
| F-3b.2 | S/ux | N |
| F-3b.3 | S/fn | N |
| F-3b.4 | S/ux | N |

### F-4 Inline refs

| req | dest | rw |
|---|---|---|
| F-4.1 | S/ux | N |
| F-4.2 | S/ux | N |
| F-4.3 | S/fn | N |
| F-4.4 | S/ux | N |
| F-4.5 | S/ux | N |
| F-4.6 | S/ux | N |
| F-4.7 | S/ux | N |

### F-V1 markers · F-V2 collapse/expand

| req | dest | rw |
|---|---|---|
| F-V1.1 | S/ux | N |
| F-V1.2 | S/ux | N |
| F-V1.3 | S/ux | N |
| F-V2.1 | S/ux | N |
| F-V2.2 | S/ux | N |
| F-V2.3 | S/ux | N |
| F-V2.4 | S/ux | N |
| F-V2.5 | S/fn | N |
| F-V2.6 | S/ux | N |
| F-V2.6a | S/ux | N |
| F-V2.6b | S/ux | N |
| F-V2.6c | S/ux | N |
| F-V2.7 | S/ux | N |
| F-V2.8 | S/ux | N |
| F-V2.9 | S/ux | N |
| F-V2.10 | S/ux | N |
| F-V2.11 | S/ux | N |
| F-V2.12 | S/fn | N — **hybrid**: supertag field-group clause → Q (see accounting) |

### F-Pending-Child · F-Retire-Empty-Node · F-Shift-Enter · F-Cmd-Shift-Enter

| req | dest | rw |
|---|---|---|
| F-Pending-Child.hover | S/ux | N |
| F-Pending-Child.expand | S/ux | N |
| F-Pending-Child.type | S/fn | N |
| F-Pending-Child.empty-collapse | S/fn | N |
| F-Pending-Child.cursor-alignment | S/ux | N |
| F-Pending-Child.page-root | S/ux | N |
| F-Pending-Child.sibling-slot | S/fn | N — **hybrid**: `#`-supertag-apply clause → Q |
| F-Retire-Empty-Node.1 | S/fn | N |
| F-Shift-Enter.1 | S/fn | N |
| F-Cmd-Shift-Enter.1 | S/fn | N |

### F-Zoom · F-Headline · F-Page-Header

| req | dest | rw |
|---|---|---|
| F-Zoom.click-changes-subject | D/fn | N (pane subject) |
| F-Zoom.subject-change-replaces-rendered-target | D/fn | N |
| F-Headline.1 | S/ux | N |
| F-Headline.empty | S/ux | N |
| F-Page-Header.1 | S/ux | N |
| F-Page-Header.2 | S/ux | N |
| F-Page-Header.3 | flag | — (SUPERSEDED) |
| F-Page-Header.4 | S/ux | N |
| F-Page-Header.7 | S/ux | N |
| F-Page-Header.5 | D/fn | N (name↔content migration) |
| F-Page-Header.6 | D/fn | N (navigator label sync) |
| F-Page-Header.8 | S/fn | N |
| F-Page-Header.9 | S/ux | N |
| F-Page-Header.10 | S/ux | N |
| F-Page-Header.11 | S/ux | N |
| F-Page-Header.12 | S/ux | N |

### F-Scroll · F-Open-Pane · F-Nav · F-Caret

| req | dest | rw |
|---|---|---|
| F-Scroll.1 | S/ux | N |
| F-Scroll.2 | S/ux | N |
| F-Open-Pane.1 | D/ux | N (Composer Deck) |
| F-Open-Pane.recursive | D/ux | N |
| F-Open-Pane.regular-click | S/ux | N |
| F-Open-Pane.deck-disabled-fallback | D/ux | N |
| F-Nav.up | S/ux | N |
| F-Nav.up.edge | S/ux | N |
| F-Nav.down | S/ux | N |
| F-Nav.down.edge | S/ux | N |
| F-Nav.pending-child | S/ux | N |
| F-Caret.1 | S/ux | N |
| F-Caret.2 | S/ux | N |
| F-Caret.3 | S/ux | N |
| F-Caret.4 | S/ux | N |
| F-Caret.5 | S/ux | N |

### F-V3 · F-V4 · F-4b · F-5

| req | dest | rw |
|---|---|---|
| F-V3.1 | S/ux | N |
| F-V3.2 | S/ux | N |
| F-V4.live | S/fn | N |
| F-V4.placement | S/ux | N |
| F-V4.1 | S/ux | N |
| F-V4.2 | S/fn | N |
| F-V4.3 | S/ux | N |
| F-4b.1 | S/fn | N |
| F-4b.2 | D/fn | N (dxn re-bind) |
| F-4b.3 | D/fn | N (subscription lifecycle) |
| F-5.1 | S/ux | N |
| F-5.2 | S/fn | N |
| F-5.3 | S/ux | N |
| F-5.4 | S/fn | N |

### F-6 Tags as ECHO-typed instances — entire lineage → QUARANTINE

`F-6.Phase1.trigger, .escape, .keyboard-nav, .apply, .chip, .create-instance · F-6.Phase2.group, .fields, .field-type-icon, .field-placeholder, .field-row-layout, .persistence, .coexist, .enum.materialize, .enum.pill, .enum.picker · F-6.Phase3.tag-node.label, .tag-node.header, .system-node.readonly, .regular-node.header-editable, .regular-node.chip-section, .picker.uses-renamed-label, .tag-node.children-are-queries · F-6.Phase3b.query-node.materialize, .query-node.render, .promote, .promote.reuse` — **27 reqs → Q** (rw Y). Salvageable generic picker UX (`.escape`, `.keyboard-nav`, `.enum.picker`) and generic header-edit (`.system-node.readonly`, `.regular-node.header-editable`) noted in accounting.

### F-Supertag · F-Promote-Generalisation — → QUARANTINE

`F-Supertag.types-shown.filter, .types-shown.reactivity, .types-shown.label, .picker-renders-prefixed, .eager-materialization, .uniqueness, .typename-uniqueness, .title-sync, .title-hidden-in-fields, .chip-gestures, .open-instance-control` — **11 reqs → Q**.
`F-Promote-Generalisation.two-query-body, .conditional-orphan-query, .promote-from-row, .external-echo-predicate` — **4 reqs → Q** (rw Y).

### F-DAG parent/child as first-class edges

| req | dest | rw |
|---|---|---|
| F-DAG.Phase1.schema | D/fn | N (Edge=Relation) |
| F-DAG.Phase1.helpers | D/fn | N |
| F-DAG.Phase1.promote-via-edge | D/fn | N |
| F-DAG.Phase1.tree-reads-via-merge | D/fn | N |
| F-DAG.Phase2.tag-block-edges | Q | Y (tag-node attach) |
| F-DAG.Phase5.structural-kind-default | D/fn | N |
| F-DAG.Phase5.cycle-prevention | S/fn | N (DAG invariant) |
| F-DAG.Phase3a.add-existing-via-picker | S/fn | N |
| F-DAG.Phase4.per-occurrence-collapse | S/fn | N |
| F-DAG.Phase3d.read-side-migration-backstop | D/fn | N |
| F-DAG.Phase3e.multi-parent-badge | S/ux | N |
| F-DAG.Phase3e.link-via-cmd-tab | S/fn | N |
| F-DAG.Phase3e.predecessor-nav-list | S/ux | N |
| F-DAG.Phase3e.predecessor-nav-inline | S/ux | N |
| F-DAG.Phase3e.predecessor-nav-dropdown | S/ux | N |
| F-DAG.Phase3e.predecessor-nav-switch | S/ux | N |
| F-DAG.Phase3e.multi-occurrence-edit-sync | S/fn | N |
| F-DAG.Phase3e.predecessor-nav-open-pane | S/ux | N |
| F-DAG.Phase3c.indent-dedent-as-edge-move | S/fn | N |
| F-Indent.auto-expand-parent | S/ux | N |
| F-DAG.Phase3b.sibling-insert-via-edge | S/fn | N |
| F-DAG.Phase3a.append-via-edge | D/fn | N |
| F-DAG.Phase2.blocknode-merge | D/fn | N |

### F-One-Graph · F-Bramble-Nav · F-No-Root

| req | dest | rw |
|---|---|---|
| F-One-Graph.singleton-per-space | S/fn | N |
| F-One-Graph.bramble-created-via-space-menu | D/ux | N |
| F-One-Graph.create-action-is-idempotent | D/ux | N |
| F-One-Graph.bramble-not-listed-under-types | D/ux | N |
| F-Bramble-Nav.section-present-iff-bramble-exists | D/ux | N |
| F-Bramble-Nav.today-visible | D/ux | Y (day-noun) |
| F-Bramble-Nav.today-opens-todays-day-node | D/ux | Y (day-noun) |
| F-Bramble-Nav.today-resets-zoom | D/ux | Y |
| F-Bramble-Nav.all-tags-opens-schema-node | Q | Y (supertag registry) |
| F-Bramble-Nav.section-expands-on-bramble-creation | D/ux | N |
| F-Bramble-Nav.node-hidden-from-per-typename-listing | D/ux | N |
| F-No-Root.graph-has-no-root-field | S/fn | N |
| F-No-Root.graph-not-directly-viewable | S/fn | N |
| F-No-Root.create-navigates-to-today | D/ux | Y (day-noun) |
| F-No-Root.create-focuses-pane-cursor | D/ux | N |

### F-7 Tana Paste import

| req | dest | rw |
|---|---|---|
| F-7.1 | S/fn | N (parse paste format) |
| F-7.2 | Q | Y — **hybrid**: parse kept, supertag/TagDef materialization → Q |

### F-Step · F-Run (supertag classes) · Run-frame workflow

| req | dest | rw |
|---|---|---|
| F-Step.1 | Q | (#Step supertag class) |
| F-Step.2 | Q | (#Step picker/chip) |
| F-Run.1 | Q | (#Run supertag class) |
| F-Run.2 | Q | (#Run picker/chip) |
| F-Run.3 | S/fn | Y (edge-kinds; Run-frame rewrite) |
| F-New-Run-On-Step.1 | S/ux | Y (Run frame) |
| F-New-Run-On-Step.2 | S/fn | Y |
| F-Run-Execution-View.1 | S/ux | Y |
| F-Run-Execution-View.2 | S/ux | Y |
| F-Run-Execution-View.3 | S/fn | Y |
| F-Run-Nav.1 | S/ux | Y |
| F-Run-Nav.2 | S/ux | Y |
| F-Run-Nav.3 | S/ux | N |
| F-Step-Runs-List.1 | S/ux | Y |
| F-Step-Runs-List.2 | S/ux | Y |
| F-Step-Runs-List.3 | S/ux | N |
| F-Run-Lens.1 | S/fn | Y (lens→frame) |
| F-Run-Lens.2 | S/ux | Y |
| F-Run-Lens.3 | S/ux | Y |
| F-Run-Lens.4 | S/ux | Y |
| F-Run-Lens.5 | S/fn | Y |
| F-Run-Lens.6 | Q | (completed field on supertag instance) |

### F-Supertag-Chips-On-Page-Header — → QUARANTINE

`F-Supertag-Chips-On-Page-Header.1, .2` — **2 reqs → Q**.

### F-PDF-Upload · F-Versioning · F-Drag-Drop

| req | dest | rw |
|---|---|---|
| F-PDF-Upload.drop-creates-node | D/fn | Y (drop a PDF-as-node kept; #File supertag → drop) |
| F-PDF-Upload.drop-seeds-content-with-filename | S/fn | N |
| F-PDF-Upload.dedup-reuses-existing-node | D/fn | Y |
| F-PDF-Upload.chip-rendering | S/ux | Y — **hybrid**: #File chip clause → Q |
| F-PDF-Upload.no-uploader-graceful | D/ux | N |
| F-PDF-Upload.drop-target-per-row | S/ux | N |
| F-Versioning.pinning-edge-kinds-set | S/fn | N |
| F-Versioning.auto-pin-on-create | D/fn | N (Automerge heads) |
| F-Versioning.unpinned-edges-render-live | S/fn | N |
| F-Versioning.pinned-edges-render-snapshot | S/fn | N |
| F-Versioning.pin-survives-deletion | S/fn | N |
| F-Drag-Drop.click-drag-starts-drag | S/ux | N |
| F-Drag-Drop.dragging-shows-dropspot-indicator | S/ux | N |
| F-Drag-Drop.drop-changes-edges | S/fn | N |
| F-Drag-Drop.dropspot-placement | S/ux | N |
| F-Drag-Drop.dropspot-rendering | S/ux | N |
| F-Drag-Drop.reparent-via-horizontal-cursor | S/ux | N |

---

## Tests (source order)

`dest` legend: `E-S` eval (spec-bound) · `E-D` eval (dxos-bound) · `Q` quarantine.

| test | dest | rw | kind |
|---|---|---|---|
| T-Day-Title-today | E-S | Y | invariant |
| T-1 | E-D | N | e2e |
| T-2 | E-S | N | invariant |
| T-3 | E-S | N | invariant |
| T-4 | E-D | N | contract (DXN) |
| T-5 | E-S | N | invariant |
| T-6 | E-S | N | invariant |
| T-7 | E-S | N | e2e |
| T-Mention-Day-Node-Inserts-Ref | E-S | Y | e2e |
| T-9 | E-S | N | invariant |
| T-V4-live | E-S | N | property |
| T-10 | E-S | N | e2e |
| T-8 | E-S | N | property |
| T-Cmd-Shift-Enter-Pending-Row-Above | E-S | N | invariant |
| T-Caret | E-S | N | invariant |
| T-Caret-margin-click | E-S | N | e2e |
| T-Caret-enter-pending-child | E-S | N | e2e |
| T-Caret-no-other-focus-indicator | E-S | N | unit-coupled (CSS) |
| T-Headline | E-S | N | e2e |
| T-Zoom-click-changes-subject | E-S | N | e2e |
| T-PredecessorNav-click-changes-subject | E-S | N | e2e |
| T-CreateRun-click-opens-run | E-S | Y | e2e (Run frame) |
| T-types-shown-filter | Q | — | (supertag picker) |
| T-types-shown-filter-sort-order | Q | — | |
| T-types-shown-reactivity | Q | — | |
| T-picker-renders-prefixed | Q | — | |
| T-Supertag-schema-shows-all-types | Q | — | |
| T-Supertag-mat-idempotent | Q | — | |
| T-Supertag-mat-live | Q | — | |
| T-Supertag-picker-creates-fresh-instance | Q | — | |
| T-Supertag-promote-reuses-existing | Q | — | |
| T-Supertag-uniq-sweep | Q | — | |
| T-supertag-typename-uniqueness | Q | — | |
| T-Supertag-title-seed-outliner | Q | — | |
| T-Supertag-title-seed-from-instance | Q | — | |
| T-Supertag-title-write | Q | — | |
| T-Supertag-title-read | Q | — | |
| T-Supertag-title-no-label-noop | Q | — | |
| T-Supertag-title-hidden-in-fields | Q | — | |
| T-Supertag-chip-click-zoom | Q | — | |
| T-Supertag-chip-shift-click-pane | Q | — | |
| T-Supertag-open-control-renders | Q | — | |
| T-Supertag-open-control-click | Q | — | |
| T-Supertag-open-control-shift-click-pane | Q | — | |
| T-Supertag-browse-reactivity | Q | — | |
| T-Promote-Two-Query-External | Q | — | |
| T-Promote-One-Query-Bramble-Owned | Q | — | |
| T-Promote-Row-Click-Creates-Wrapper-Under-Today | Q | — | |
| T-Promote-Row-Click-Reuses-Existing-Wrapper | Q | — | |
| T-Create-Filter-And-Pick | E-S | N | e2e (generic create dialog) |
| T-Add-Existing-Via-At-Picker-Edges-Not-Duplicates | E-D | N | e2e (Edge) |
| T-Sibling-Above-Lands-Between | E-S | N | invariant |
| T-Sibling-Below-Lands-Between | E-S | N | invariant |
| T-Pending-Row-Mention-Commit-Attaches-At-Slot | E-D | N | e2e (createEdge) |
| T-Backspace-To-Empty-Retires-Node | E-D | N | e2e (Edge removal) |
| T-New-Sibling-Focus-And-Caret | E-S | N | e2e |
| T-Page-Last-Node-Has-Pending-Child-Below | E-S | N | e2e |
| T-Zoom-Empty-Node-New-Pane-Untitled-And-Autofocus | E-S | N | e2e |
| T-Zoom-Leaf-Shows-Pending-Child-In-Pane | E-S | N | e2e |
| T-New-Node-Collapsed | Q | — | (field-group-on-tag; collapse half salvageable) |
| T-Tag-Picker-Keyboard-Nav | Q | — | |
| T-Step-Picker-Lists | Q | — | (supertag picker) |
| T-Run-Picker-Lists | Q | — | (supertag picker) |
| T-Run-Edge-Kinds-Accepted | E-D | Y | unit-coupled (Run frame) |
| T-New-Run-On-Step | E-D | Y | e2e (Run frame) |
| T-Run-Lens-Lifecycle | E-S | Y | e2e (frame walkthrough) |
| T-Step-Runs-List | E-S | Y | e2e |
| T-Run-Nav | E-S | Y | e2e |
| T-Run-Execution-View-Renders | E-S | Y | e2e |
| T-Supertag-Chips-On-Page-Header | Q | — | |
| T-PDF-Upload-creates-node | E-D | Y | e2e (PDF-as-node kept; #File chip → Q) |
| T-PDF-Upload-dedupes-on-second-drop | E-D | Y | e2e |
| T-PDF-Mention-renders-attachment | E-S | Y | e2e (ref-render kept; #File icon → Q) |
| T-Mention-Hides-Promotable-Payloads | E-D | Y | contract (wrap-only surfacing) |
| T-One-Graph-create-via-menu | E-D | N | e2e |
| T-One-Graph-create-action-idempotent | E-D | N | invariant |
| T-One-Graph-not-in-typename-listing | E-D | N | contract |
| T-Bramble-Nav-section-present-iff-bramble-exists | E-D | N | invariant |
| T-Bramble-Nav-today-visible | E-D | Y | e2e (day-noun) |
| T-Bramble-Nav-today-opens-todays-day-node | E-D | Y | e2e (day-noun) |
| T-Today-Resets-Zoom | E-D | Y | e2e (day-noun) |
| T-Zoom-Writes-Subject-Path | E-D | N | e2e |
| T-Bramble-Nav-all-tags-opens-schema-node | Q | — | (supertag registry) |
| T-Bramble-Nav-section-expands-on-bramble-creation | E-D | N | e2e |
| T-Bramble-Node-hidden-from-nav | E-D | N | contract |
| T-No-Root-graph-has-no-root-field | E-D | N | invariant |
| T-No-Root-graph-not-directly-viewable | E-D | N | invariant |
| T-No-Root-create-navigates-to-today | E-D | Y | e2e (day-noun) |
| T-No-Root-create-focuses-pane-cursor | E-S | N | e2e |
| T-Versioning-pin-on-edge-create | E-D | Y | unit-coupled (Automerge; Run-frame vehicle) |
| T-Versioning-pinned-edge-renders-snapshot | E-S | Y | e2e |
| T-Versioning-live-target-edits-do-not-disturb-pinned-view | E-S | Y | e2e |
| T-Versioning-unpinned-edges-render-live | E-S | Y | contract |
| T-Versioning-pin-survives-target-deletion | E-D | Y | e2e (Automerge) |
| T-Drag-Drop-click-drag-starts-drag | E-S | N | e2e |
| T-Drag-Drop-dragging-shows-dropspot-indicator | E-S | N | e2e |
| T-Drag-Drop-drop-changes-edges | E-S | N | e2e |
| T-Drag-Drop-dropspot-placement-structural-depth | E-S | N | e2e |
| T-Drag-Drop-descendant-dropspot-excluded | E-S | N | property (cycle) |
| T-Drag-Drop-pending-row-drop | E-S | N | e2e |
| T-Drag-Drop-reparent-via-horizontal-cursor | E-S | N | e2e |

## Related

- [S1-non-spec-inventory.md](S1-non-spec-inventory.md) — types, components, rules, and flagged items (the "did not fit" report).
- [considered-and-removed/tag-on-node.md](considered-and-removed/tag-on-node.md) — accounting for every quarantined item.
- [../docs/vocabulary.md](../docs/vocabulary.md) — the kept vocabulary the S2 rewrite targets.
