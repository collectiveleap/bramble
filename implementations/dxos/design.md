# DXOS design — the Bramble outliner plugin

<!-- derives-from: [IP-1, IP-1.typed-node, IP-2, IP-3, UP-1, UP-1.author, UP-1.reshape, UP-2, UP-3, UP-4, UX-direct, UX-inflow, UX-immediate, UX-reversible]; role: target; status: current -->

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
   visual-spec. *(settled)*
3. **Reference / embed / backlinks integration** — reuse Composer's `@`-picker,
   object Surfaces, and the "Related" panel. *(settled)*
4. **Hosting / build** — how the plugin builds and loads into Composer. *(settled — floor in-monorepo)*

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
  text), reusing Composer's markdown extensions for the in-flow `@`-reference
  picker.
- **Typed-object node** (Person / Task / Document / Sketch …) → the object's
  **`Section` Surface**: `<Surface type={AppSurface.Section} data={{ subject: node }} limit={1} />`, wrapped in the outline chrome.

This delivers §1(ii)'s heterogeneous typed rows *and* a real editable outline —
the key **net-new** composition (no existing plugin renders an outline whose rows
are each their own type's Surface). A **fallback `Section` surface** covers bare
nodes with no registered surface.

### Gesture → substrate mapping

| Gesture (R behavior) | Substrate / view operation | S2 law · UP |
|---|---|---|
| Edit a Node's content (type) | edit the Node's bound text — the per-row CodeMirror with `readOnly:false` (Plan 2a shipped it read-only; 2b flips the flag) | `UX-direct` · `UP-1.author` |
| Create a Node (`Enter`) | create a `Node` (`makeNode`) + a structural `Edge` to the parent, `order` via `orderBetween`; `Enter` mid-content **splits** — trailing text becomes the new Node's content | `UX-direct` · `UP-1.author` |
| Delete / merge a Node (`Backspace` at start) | `removeEdge` + remove the emptied `Node`; its text merges into the preceding Node; its children `reparentEdge` onto the preceding Node | `UX-direct` · `UP-1.author` |
| Edit the zoom-root **header** | the header renders the **same** editable per-row editor as body rows — a Node keeps its capabilities in any view position (view-position invariance); `Enter` in it creates the first child | `UX-direct` · `UP-1.author` |
| Indent / outdent | rewire the focused Node's structural `Edge` (predecessor → preceding-sibling / grandparent); cycle-checked; `order` set | `UX-direct` |
| Reorder up/down | change the `Edge`'s `order` (`orderBetween` neighbours) | `UX-direct` |
| Insert `@`-reference | insert a **linked** `Ref`-span (collapsed chip) via the `@`-picker | `UX-inflow` |
| Expand a reference inline | per-occurrence local view toggle → render the target's `Section` Surface in place, edit-through (§3) | `UX-direct.expand` |
| Co-locate (multi-location) | **add a second** structural `Edge` to the Node — the gesture Tana lacks (Bramble's edge-native advantage) | `UX-direct` |
| Expand / collapse, Zoom | **local per-user view-state**, keyed by edge/node id — *not* substrate; triggered by key **or** pointer (**click the chevron** = expand/collapse; **click the bullet** = zoom) | — |
| Drag a bullet (reorder / re-parent) | pointer input for reorder (`orderBetween`) or **re-parent** (`reparentEdge`, cycle-checked) — the *same* substrate ops as the keyboard structural gestures, reached by drag; reuses Composer's **Atlassian Pragmatic drag-and-drop** via `@dxos/react-ui-list`'s `useReorderList`/`useReorderItem` (`dragHandle`=bullet, `element`=row) + hitbox `attachInstruction` for reorder-vs-make-child (the navtree's stack; **not** dnd-kit — that dep is vestigial). The bullet does double duty: click = zoom, press-drag = move | `UX-direct` |
| (all store mutations) | ECHO reactive subscription → immediate re-render | `UX-immediate` |
| Undo | gesture-granular — see open item | `UX-reversible` |

Acyclicity is enforced at gesture time on every structural-`Edge` add/move (§1);
ECHO reactivity gives immediacy for free. **Authoring (`UP-1.author`)** — create /
edit / delete — is realized by the first four rows: Plan 2a shipped the read-only
render (per-row editors + header via one path); Plan 2b flips `readOnly:false` and
wires the create/delete/split-merge gestures to the Plan-1 edge algebra. The header
being the *same* editable editor as body rows is the view-position-invariance
realization (a created/focused Node is a first-class, editable Node like any other).

### Visual conformance

The shell + chrome are **built to `implementations/tana/visual-spec.md`** (tokens:
InterVariable; oklch ink/muted/faint ramp; bullet 15×15; chevron; reference chip
`rgb(41 125 217)`; expansion-panel border `oklch(0.896)`). Verification: fill the
Composer `app` selectors in `visual/tana-outline.json` and run `diff-styles.mjs`
once the surface exists.

### Reuse vs net-new

- **Reuse:** `Surface` for typed rows (the stack/kanban idiom); `useLinkQuery`
  `@`-picker for the linked edge, the object Surface for its expansion; ECHO reactivity for immediacy.
- **Net-new:** the outline shell driving per-row Surfaces with continuous
  caret-flow / gestures across heterogeneous rows; the fallback `Section` surface.

### Open item (to verify in the plan)

- **Undo** — whether ECHO/Composer exposes gesture-granular undo, or the plugin
  maintains an app-level undo stack, for `UX-reversible`.

## §3 Reference / embed / backlinks integration

Realizes `UP-2` (link + backlinks), `UP-4` (embed), `UX-inflow`,
`UX-direct.expand` — almost entirely by reusing Composer's markdown machinery.

### Linked edge (`@`-mention) — a first-class `Ref`-span

The in-flow `@`-picker (`useLinkQuery`) provides the `UX-inflow` gesture; on
select it inserts a **first-class inline `Ref`** into the node's content (a
`RefSpan` — the node's text is a union of text-spans and ref-spans), **not** a
markdown text link. It matches §1 (linked edge = `Ref`): rendered as an inline
chip (visual-spec accent `rgb(41 125 217)`), **collapsed by default** (a mention),
resolving to the target Node and feeding the backlinks view natively via
`referencedBy`. Traces `UP-2.link` · `UX-inflow.link` · `IP-3.cross-reference`.

### Embed — expand the linked edge inline, on demand

Per the neutral spec, embed is **not a separate insertion** — it is the *same*
linked edge **expanded inline on demand** (`UP-4.embed` / `IP-3.expand`; and R:
Tana's `Option`-click expands the *same* reference). So a `Ref`-span carries a
per-occurrence **local view toggle** (like outline collapse, §2): collapsed → the
inline chip; expanded → the target Node's `Section` Surface rendered **in place**,
**edit-through** (edits flow to the one target). The reusable piece is the
**Surface-rendering of the target** (edit-through), *not* Composer's `@@`
block-embed — a Composer-only authoring convention with **no UP/IP counterpart**,
so it is dropped. Two transclusion routes coexist, both spec-grounded: this
linked-edge expansion (`IP-3.expand`), and structural multi-location (a Node under
two structural `Edge`s is one edit-through vertex, `IP-2`). Traces `UP-4.embed` ·
`UX-direct.expand` · `IP-3.expand`.

### Backlinks view — the "Related" panel

Reuse Composer's "Related" companion: for a focused Node it enumerates inbound
`Ref`s (`referencedBy`) + Relation endpoints. Because linked edges are first-class
`Ref`s (above), user-authored `@`-mentions feed it — **closing** the gap-analysis
caveat that text-embedded markdown links don't. Traces `UP-2.backlinks-view`. (The
outline's *structural* `Edge`s are Relations too, so a Node's structural
predecessors — "where does this Node live" — are reverse-traversable via
`targetOf`.)

### Reuse vs net-new

- **Reuse:** `useLinkQuery` (`@` in-flow UX), the **Surface-rendering** of an
  expanded reference (edit-through), the "Related" panel, `referencedBy`.
- **Net-new:** wiring the `@`-picker to emit a `Ref`-span (not a text link); the
  per-occurrence collapse/expand toggle on a `Ref`-span rendering the target's
  Surface in place; rendering `Ref`-spans inline to visual-spec.

## §4 Hosting / build

### Floor build — in the DXOS monorepo

The fresh plugin lives at `~/sandbox/dxos/packages/plugins/plugin-bramble`
(rebuilt clean, spec-driven — the prior in-tree plugin was carved out to
`~/sandbox/plugin-bramble`, a pre-spec iteration). It builds and loads via the
standard `AppPlugin` module + Plugin Registry path every Composer plugin uses —
the proven route that unblocks the floor build immediately. Skeleton from
`plugin-markdown`; create-object / surface file shapes from `plugin-outliner`.

### Deferred — out-of-monorepo hosting (feasibility spike)

"A Bramble plugin *outside* the DXOS monorepo" (a separate repo; `workspace:*` /
catalog vs published `@dxos/*` packages; moon/pnpm build) is the eventual
aspiration but has **unverified** build-tooling feasibility. It is a **later
feasibility spike**, not a floor blocker — the floor ships in-monorepo first.
