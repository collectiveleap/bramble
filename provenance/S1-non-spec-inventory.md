# S1 — Non-F/T Source Inventory & Flag Report

The success criterion was: *flag any source from `PLUGIN.mdl` that did not fit the segmentation criteria — i.e. does not have a destination.* This file accounts for every part of the source that is **not** a `feat`/`req`/`test` (those are in [S1-classification.md](S1-classification.md)), plus the individual `req`/`test` entries that landed in **flag** (no destination).

Each entry has a **disposition**: `context-boundary` (a Phoenix primitive — has a home) · `dxos-constraint` (an architecture-profile constraint — has a home in the DXOS profile) · `QUARANTINE` (tag-on-node — see [accounting](considered-and-removed/tag-on-node.md)) · `flag` (genuinely no destination).

## Types (7)

| type | disposition | note |
|---|---|---|
| TextSpan | context-boundary | inline text run; neutral content shape |
| RefSpan | context-boundary | inline ref span; neutral (ECHO `Ref` incidental) |
| StructuredContent | context-boundary | ordered run of spans |
| Node | context-boundary | **hybrid** — `content`/`children`/`kind`/`state` kept; `supertags`/`fields` → QUARANTINE |
| Graph | context-boundary | space marker; neutral |
| Day | context-boundary | **hybrid** — `date` kept as **day-noun**; `#Day` supertag mechanism → QUARANTINE |
| TagDef | QUARANTINE | supertag definition — pure tag-on-node |

## Components (5)

| component | disposition | note |
|---|---|---|
| Article | context-boundary | surface/loading contract |
| Editor | context-boundary | ProseMirror-over-Node contract |
| Graph | context-boundary | bullet-list renderer contract |
| Node | context-boundary | recursive renderer contract |
| TagChip | QUARANTINE | renders a supertag attached to a node — tag-on-node |

Also referenced-but-never-authored component blocks (named in reqs/tests, no definition): `OpenInstanceControl`, `SupertagNode`, `PredecessorNav` → `OpenInstanceControl`/`SupertagNode` QUARANTINE (supertag UI); `PredecessorNav` context-boundary (kept, DAG nav).

## Rules (13)

| rule | disposition | note |
|---|---|---|
| R-Edges-First-Class | dxos-constraint | edges as ECHO `Relation` entities |
| R-Predecessor-Successor-Terms | flag | spec authoring terminology convention |
| R-No-Echo-Changes | dxos-constraint | the core DXOS-profile constraint (no `@dxos/echo` edits) |
| R-Spec-Entry-Conventions | flag | meta authoring conventions for this .mdl |
| R-Greenfield-Stance | flag | no-backwards-compat policy (process) |
| R-Step-Is-Tagged-Node | QUARANTINE | encodes the tag-on-node stance for Step |
| R-Run-Is-Tagged-Node-Linked-Via-Edge | QUARANTINE | encodes the tag-on-node stance for Run |
| R-Substrate-Types-Are-Plugin-Bramble-Local | dxos-constraint | plugin-local type ownership (R-No-Echo-Changes corollary) |
| R-DAG-First-Class | dxos-constraint | DAG-over-ECHO model constraint (node/edge/DAG kept) |
| R-Consolidation-Scrub | flag | canon-scrub process rule (no spec content) |
| R-Bramble-Surfaces-Wrap-Only | dxos-constraint | wrap payload ECHO objects; surfacing rule |
| R-Pending-Row-Is-The-Empty-Bullet | spec-constraint | the pending-row UX invariant (kept, neutral) |
| R-Bramble-Subject-Path | dxos-constraint | Composer pane subject-path convention |

## `req`/`test` entries that landed in **flag** (no destination)

| id | kind | why flagged |
|---|---|---|
| F-1.4 | req | "build, lint, tests pass" — CI/build gate, not user behavior |
| F-Page-Header.3 | req | explicitly marked `[SUPERSEDED]`; legacy single-parent breadcrumb |
| F-V6 | feat | whole feat marked `[DEPRECATED in F-DAG.Phase3a]`; no live reqs |

## Source sections with no F/T destination (whole-section flags)

- **Front-matter + intro prose** (lines 1–11) — plugin description; narrative.
- **`## Rules`** (12–621) — see the 13 rules above.
- **`## Extensions`** + **`## Appendix: Extension Definitions`** — `.mdl` notation registry (ext type/feat/test/component/rule URIs); build-tooling meta.
- **`## Remaining`** (6539–6701) — entirely non-spec working notes:
  - *How to resume the smoke test* — dev-server/Composer toggle instructions (process).
  - *Future increments (not started)* — F-6 Phase 3 popover, F-7 parser stub.
  - *Pieces flagged but not yet spec'd* — concurrent-mount race, unauthored component blocks, i18n key, BacklinksPanel reactivity, Storybook story, **upstream `react-ui-search`/`react-ui-list` defects** (out of scope — other consumers), R-Consolidation-Scrub one-time audit, sidebar-collapse bug, "page"/"pageNode" vocab scrub, the DXOS-capabilities reconciliation audit.
- **Feat-level `desc` scope/deferral notes** — out-of-scope lists and dated revision notes inside `F-2`, `F-3`, `F-Retire-Empty-Node`, **`F-PDF-Upload` (the superseded `attachment` struct "Switch note 2026-05-16")**, `F-Versioning`, `F-Drag-Drop` descs. These mix narrative with retired-model history → flag (per canon-partition, retired-model notes do not carry into in-scope spec).

## Related

- [S1-classification.md](S1-classification.md) — the F-/T- master ledger.
- [considered-and-removed/tag-on-node.md](considered-and-removed/tag-on-node.md) — the quarantined tag-on-node material.
