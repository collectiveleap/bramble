# DXOS design — the Bramble outliner plugin

<!-- derives-from: [IP-1, IP-1.typed-node, IP-2, IP-3, UP-1, UP-2, UP-3, UP-4, UX-direct, UX-inflow, UX-immediate, UX-reversible]; role: target; status: authoring -->

Design of the Bramble plugin for DXOS/Composer — the S4 stage. Its purpose (from
the S3 UX gap analysis conclusion): **a new plugin is needed** — a node-per-row
outline view over first-class ECHO objects — because no existing Composer surface
reproduces Tana's every-bullet-is-a-Node primitive (the Outliner is a `Text` blob
with no per-row identity). This plugin realizes R (`implementations/tana/`
behavioral + visual) and the S2 interaction laws, **built on** ECHO's strong
substrate (identity, refs, relations, backlinks, edit-through embed, in-flow
`@`-link).

**Decomposition.** The plugin is designed as four sub-designs, each its own
section here (grown one at a time), then planned and built:

1. **Substrate data model** — how Nodes + the structural DAG map onto ECHO. *(this
   section — settled)*
2. **Outline surface + gestures** — rendering + the S2/R interaction, built to R's
   visual-spec. *(pending)*
3. **Reference / embed / backlinks integration** — reuse Composer's markdown
   `@`-link, block-embed, "Related" panel. *(pending)*
4. **Hosting / build** — how the plugin builds and loads into Composer. *(pending)*

---

## §1 Substrate data model

### The model

> **Node** = any typed ECHO `Obj` · **structural edge** = a reified
> `predecessor→successor` Relation (multi-predecessor native, fractional-ordered,
> app-kept-acyclic) · **linked edge** = an ECHO `Ref` · **outline** = the *view*
> rendering a Node's structural-successor subtree.

Concretely:

- **Node = any typed `Obj`** (decision (ii)). A bullet is an arbitrary ECHO object
  — a plain text node, or a Person / Task / Document / Sketch — each with its own
  `EntityId`/URI. The outline is a **view over the heterogeneous typed DAG**, not a
  parallel node type beside ECHO's objects. This is the realization the
  `IP-1.typed-node` accommodation was added for: every ECHO type is nestable
  outline content, addressable / linkable / multi-locatable.
- **Structural edge = a reified `predecessor→successor` Relation** (decision (C)) —
  a first-class ECHO `Relation` entity per parent→child link, `Source` =
  predecessor, `Target` = successor, of a distinguished Bramble structural-edge
  type (kept apart from linked edges and from arbitrary domain Relations).
  Multiplicity is **native**: two structural Relations targeting one Node give it
  two predecessors — **true multi-predecessor**, edit-through free (one `Obj`).
  This *closes* the ECHO "owner+reference" divergence the substrate gap analysis
  recorded (`gap-analysis.md`, `IP-2.shared-identity` divergent).
- **Linked edge = an ECHO `Ref`** — the lightweight `[[X]]` mention / backlink
  form, type-distinct from the structural edge (SIP `IP-3`); backlinks via
  `referencedBy` / `ReverseRefIndex` (already `pass`).
- **Sibling ordering = a fractional index** (LexoRank-style) property on the
  structural Relation — CRDT/merge-friendly, no reindexing on insert.
- **Acyclicity = app-enforced** (SIP `IP-2.acyclic`; ECHO enforces none). Before
  adding/moving a structural edge (nest / move / co-locate), the plugin checks the
  successor is not already an ancestor of the predecessor; the same guard covers
  the second-predecessor (co-locate) case.
- **Rooting = no special root primitive.** An "outline document" is simply **a Node
  opened as the view root**; its structural-successor subtree renders as the
  outline (SIP: view from any Node; Tana: zoom). A named navtree entry is just a
  Node with a name.
- **Default text bullet = a minimal text-bearing `Obj`** (ECHO `Text`/`Markdown`
  type or a lightweight Bramble text node); typed objects (Person/Task/…) are the
  explicit opt-in case.

### How it realizes the SIP

| SIP | Realization |
|---|---|
| `IP-1` Node (identity, content-type open) | any ECHO `Obj` — ULID `EntityId`, open content-type (already `pass`) |
| `IP-1.typed-node` | a Node may be any typed `Obj`; structural edges connect them uniformly (the point of (ii)) |
| `IP-2.direction` | reified Relation with distinct `Source`/`Target` (already `pass`) |
| `IP-2.multi-predecessor` / `.shared-identity` | **native** — many structural Relations → one Node; **closes** ECHO's owner+reference divergence |
| `IP-2.acyclic` | app-enforced cycle check at gesture time (closes the ECHO `fail`) |
| `IP-3` linked edge | ECHO `Ref` (cross-reference, may-cycle, backlinks — already `pass`) |

### Reuse vs net-new

- **Reuse:** ECHO `Obj` identity + open content-type; `Relation` as the reified
  edge entity; `Ref` + `referencedBy` for linked edges/backlinks; the typed-object
  system.
- **Net-new:** the Bramble structural-edge Relation type + its fractional-order
  property; app-level acyclicity enforcement; the traversal (children = structural
  Relations by `sourceOf`, ordered) and the outline-as-view rendering (§2).

### Alternatives considered

- Structural edges as **ordered `Ref`-arrays** (owner+reference, B) — rejected:
  reproduces Tana's *divergent* mechanism the whole spec moves away from; ships
  "another owner+reference outliner."
- A **dedicated `Bramble.Node` type** (i) — rejected: wastes the typed accommodation
  and sits parallel to ECHO's objects instead of viewing them.
- **Hybrid carrier** (iii) — held as fallback if a row needs structural state that
  can't live on the content object (none identified yet; collapse/expand is
  view-state, not substrate).

### Open questions (deferred to later sub-designs)

- Rendering a heterogeneous row (a Person vs a text bullet) inline in the outline
  — §2 (surface).
- Whether structural Relations coexist cleanly with an object's own ECHO
  `ParentId`/Collection membership (independent layers — to validate in the plan).
- Performance of Relation-per-edge at outline scale — to validate; the hybrid (iii)
  or an ordering-index cache is the hedge.

### Grounding & prior art

This design is **fresh and spec-driven** (the flow drives; the earlier
`~/sandbox/plugin-bramble` was a pre-spec, messy iteration deliberately
restarted — no traceability, no neutral/impl layers, no UX rigor, not
floor-first). It is **grounded in DXOS's real plugin patterns** and
**corroborated** by prior bramble, whose useful learnings are adopted as
*design guidance* (re-derived clean, not code-lifted):

- **Plugin skeleton** — `AppPlugin.add{Schema,Surface,CreateObject,OperationHandler,Translations}Module` (canonical shape in `plugin-markdown`); create-object + surface file shapes from `plugin-outliner`.
- **Reified edge** — `Type.makeRelation({ source: Node, target: Node })` + an `order` field, created via `Relation.make`; live exemplar `plugin-connector`'s `SyncBinding`. Prior bramble's `Edge` (source→target + `order` + cycle detection + `orderBetween` + multi-parent + reparent) independently converged on this model — corroboration.
- **Indexed traversal (P2)** — children/parents via `Query.select(Filter.id(x)).sourceOf/targetOf(Edge)`, not whole-typename in-memory scans (prior bramble's inefficiency).
- **Hide rows from the generic navtree (P3)** — `SystemType`/`Hidden` annotation on the Node type.
- **Edges-only (N1)** — no inline `children` field (prior bramble's dual representation forced a painful migration).
- **Deferred, floor-first** — prior bramble's above-floor layer (edge `kind` taxonomy, Runs/Steps, supertags/fields, DSRP framing) is **not** in the floor plugin.

---

## §2 Outline surface + gestures

The view/interaction layer over §1, realizing R (behavioral + visual) and the S2
interaction laws.

### Rendering — hybrid (decision (3))

A **bespoke outline shell** (React) owns the structure, chrome (bullet / indent
guide / disclosure chevron, per `visual-spec.md`), caret-flow, keyboard, and
gestures. Each **row's content** renders by Node kind:

- **Text node** → an inline text editor (per-row CodeMirror bound to the Node's
  text), reusing Composer's markdown extensions for the in-flow `@`-link /
  block-embed.
- **Typed-object node** (Person / Task / Document / Sketch …) → the object's
  **`Section` Surface**: `<Surface type={AppSurface.Section} data={{ subject: node }} limit={1} />`, wrapped in the outline chrome.

This delivers §1(ii)'s heterogeneous typed rows *and* a real editable outline —
the key **net-new** composition (no existing plugin renders an outline whose rows
are each their own type's Surface). A **fallback `Section` surface** covers bare
nodes with no registered surface.

### Gesture → substrate mapping

| Gesture (R behavior) | Substrate / view operation | S2 law |
|---|---|---|
| Indent / outdent | rewire the focused Node's structural `Edge` (predecessor → preceding-sibling / grandparent); cycle-checked; `order` set | `UX-direct` |
| Reorder up/down | change the `Edge`'s `order` (`orderBetween` neighbours) | `UX-direct` |
| Insert `@`-reference | insert a **linked** `Ref` in text via `useLinkQuery` (`[label](uri)`); `@@` = block-embed | `UX-inflow` |
| Co-locate (multi-location) | **add a second** structural `Edge` to the Node — the gesture Tana lacks (Bramble's edge-native advantage) | `UX-direct` |
| Expand / collapse, Zoom | **local per-user view-state**, keyed by edge/node id — *not* substrate | — |
| (all store mutations) | ECHO reactive subscription → immediate re-render | `UX-immediate` |
| Undo | gesture-granular — see open item | `UX-reversible` |

Acyclicity is enforced at gesture time on every structural-`Edge` add/move (§1);
ECHO reactivity gives immediacy for free.

### Visual conformance

The shell + chrome are **built to `implementations/tana/visual-spec.md`** (tokens:
InterVariable; oklch ink/muted/faint ramp; bullet 15×15; chevron; reference chip
`rgb(41 125 217)`; expansion-panel border `oklch(0.896)`). Verification: fill the
Composer `app` selectors in `visual/tana-outline.json` and run `diff-styles.mjs`
once the surface exists.

### Reuse vs net-new

- **Reuse:** `Surface` for typed rows (the stack/kanban idiom); `useLinkQuery`
  `@`/`@@` for linked edges + embed; ECHO reactivity for immediacy.
- **Net-new:** the outline shell driving per-row Surfaces with continuous
  caret-flow / gestures across heterogeneous rows; the fallback `Section` surface.

### Open item (to verify in the plan)

- **Undo** — whether ECHO/Composer exposes gesture-granular undo, or the plugin
  maintains an app-level undo stack, for `UX-reversible`.

## §3 Reference / embed / backlinks integration

_(pending.)_

## §4 Hosting / build

_(pending.)_
