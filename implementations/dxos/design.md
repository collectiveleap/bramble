# DXOS design — the Bramble outliner plugin

<!-- derives-from: [IP-1, IP-1.typed-node, IP-2, IP-3, UP-1, UP-1.author, UP-1.reshape, UP-2, UP-3, UP-4, IX-direct, IX-inflow, IX-immediate, IX-reversible, PX-mark, PX-disclosure, PX-nesting, PX-state, PX-rhythm, PX-theme]; role: target; status: current -->

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

> **Node** = any typed ECHO `Obj` · **edge** = one reified `Edge` Relation, kind-typed:
> **structural** (predecessor→successor, multi-predecessor native, fractional-ordered,
> app-kept-acyclic) and **linked** (cross-reference, may-cycle; target = the reference) ·
> **outline** = the *view* rendering a Node's structural-successor subtree.

Concretely:

- **Node = any typed `Obj`** (decision (ii)). A bullet is an arbitrary ECHO object
  — a plain text node, or a Person / Task / Document / Sketch — each with its own
  `EntityId`/URI. The outline is a **view over the heterogeneous typed DAG**, not a
  parallel node type beside ECHO's objects. This is the realization the
  `IP-1.typed-node` accommodation was added for: every ECHO type is nestable
  outline content, addressable / linkable / multi-locatable.
- **Edge = one reified `Edge` Relation, kind-typed** (realizing the neutral
  edge-family) — a first-class ECHO `Relation` with `kind ∈ {structural, linked}`,
  each kind declaring its axes. A new edge kind is a new `kind`, not a new mechanism.
  - **`kind: structural`** (decision (C)) — `Source` = predecessor, `Target` =
    successor, fractional `order`, app-kept-acyclic. Multiplicity **native**: two
    structural edges into one Node give it two predecessors — **true
    multi-predecessor**, edit-through free (one `Obj`). *Closes* the ECHO
    "owner+reference" divergence the gap analysis recorded (`IP-2.shared-identity`).
  - **`kind: linked`** — `Source` = the referring Node, `Target` = the referenced
    Node (**the reference *is* the Edge's target**); may-cycle; non-containment. The
    `@`/`[[X]]` mention. A **positional marker** in the referring Node's text records
    *where* the chip renders; the `Edge` carries the queryable link. A reified linked
    `Edge` (not a bare in-text `Ref`) is what makes mention-backlinks work —
    `referencedBy` indexes schema `Ref` fields, not text-positioned URIs.
- **Backlinks = a Node's incoming edges by `targetOf`, grouped by kind** — structural
  ("appears under") and linked ("mentioned in"); one traversal, realizing
  `UP-2.backlinks-view`'s grouped union.
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
| `IP-3` linked edge | the `Edge` relation `kind: linked` (target = the reference; may-cycle; backlinks via `targetOf`, uniform with structural) |

### Reuse vs net-new

- **Reuse:** ECHO `Obj` identity + open content-type; `Relation` as the reified
  edge entity (**both** edge kinds); `targetOf` for backlinks; Composer's
  mention/embed rendering (`@`-picker, chip, `PreviewComponent` secondary view — §3);
  the typed-object system.
- **Net-new:** the Bramble `Edge` relation type (**kind-typed** structural/linked) +
  the structural kind's fractional-order property; app-level acyclicity enforcement
  (structural only); the traversal (children = structural edges by `sourceOf`,
  ordered) and the outline-as-view rendering (§2); the linked kind's positional
  text-marker and marker↔edge sync (§3).

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
| Edit a Node's content (type) | edit the Node's bound text — the per-row CodeMirror with `readOnly:false` (Plan 2a shipped it read-only; 2b flips the flag) | `IX-direct` · `UP-1.author` |
| Create a Node (`Enter`) | create a `Node` (`makeNode`) + a structural `Edge` to the parent, `order` via `orderBetween`; `Enter` mid-content **splits** — trailing text becomes the new Node's content | `IX-direct` · `UP-1.author` |
| Delete / merge a Node (`Backspace` at start) | `removeEdge` + remove the emptied `Node`; its text merges into the preceding Node; its children `reparentEdge` onto the preceding Node | `IX-direct` · `UP-1.author` |
| Edit the zoom-root **header** | the header renders the **same** editable per-row editor as body rows — a Node keeps its capabilities in any view position (view-position invariance); `Enter` in it creates the first child | `IX-direct` · `UP-1.author` |
| Indent / outdent | rewire the focused Node's structural `Edge` (predecessor → preceding-sibling / grandparent); cycle-checked; `order` set | `IX-direct` |
| Reorder up/down | change the `Edge`'s `order` (`orderBetween` neighbours) | `IX-direct` |
| Insert `@`-mention | create a **linked-kind `Edge`** + a positional text marker (collapsed **atomic** chip) via the `@`-picker | `IX-inflow` · `IX-direct.reference-atomic` |
| Expand a mention / open beside | per-occurrence toggle → the target's **secondary view** inline; or open it alongside (§3) | `IX-direct.expand` · `UP-5` |
| Co-locate (multi-location) | **add a second** structural `Edge` to the Node — the gesture Tana lacks (Bramble's edge-native advantage) | `IX-direct` |
| Expand / collapse, Zoom | **local per-user view-state**, keyed by edge/node id — *not* substrate; triggered by key **or** pointer (**click the chevron** = expand/collapse; **click the bullet** = zoom) | — |
| Drag a bullet (reorder / re-parent) | pointer input for reorder (`orderBetween`) or **re-parent** (`reparentEdge`, cycle-checked) — the *same* substrate ops as the keyboard structural gestures, reached by drag; reuses Composer's **Atlassian Pragmatic drag-and-drop** via `@dxos/react-ui-list`'s `useReorderList`/`useReorderItem` (`dragHandle`=bullet, `element`=row) + hitbox `attachInstruction` for reorder-vs-make-child (the navtree's stack; **not** dnd-kit — that dep is vestigial). The bullet does double duty: click = zoom, press-drag = move | `IX-direct` |
| (all store mutations) | ECHO reactive subscription → immediate re-render | `IX-immediate` |
| Undo | gesture-granular — see open item | `IX-reversible` |

Acyclicity is enforced at gesture time on every structural-`Edge` add/move (§1);
ECHO reactivity gives immediacy for free. **Authoring (`UP-1.author`)** — create /
edit / delete — is realized by the first four rows: Plan 2a shipped the read-only
render (per-row editors + header via one path); Plan 2b flips `readOnly:false` and
wires the create/delete/split-merge gestures to the Plan-1 edge algebra. The header
being the *same* editable editor as body rows is the view-position-invariance
realization (a created/focused Node is a first-class, editable Node like any other).

### Visual conformance

The shell + chrome are **built to `implementations/tana/visual-spec.md`**, which is
grounded on the neutral presentation facet **`PX-*`** — realized per concern:
`PX-mark` (a **5px** dot in a 15px hit-area — *not* a 15px disc), `PX-disclosure`
(15px chevron, hover-revealed), `PX-nesting` (32px indent, `flex-start`), `PX-state`
(hover-reveal + hover/focus surface), `PX-rhythm` (24px gutter, 7.5px gap),
`PX-theme` (theme-adaptive text; theme-stable dot). **Verification is done**: the
`composer-outline.json` mapping covers every `PX` concern (8 regions) and the
upgraded coverage gate ran clean against the built surface in both themes
(2026-07-13, U4) — no longer deferred.

### Reuse vs net-new

- **Reuse:** `Surface` for typed rows (the stack/kanban idiom); `useLinkQuery`
  `@`-picker for the linked edge, the object Surface for its expansion; ECHO reactivity for immediacy.
- **Net-new:** the outline shell driving per-row Surfaces with continuous
  caret-flow / gestures across heterogeneous rows; the fallback `Section` surface.

### Open item (to verify in the plan)

- **Undo** — whether ECHO/Composer exposes gesture-granular undo, or the plugin
  maintains an app-level undo stack, for `IX-reversible`.

## §3 Reference / embed / backlinks integration

Realizes `UP-2` (link + backlinks), `UP-4`/`UP-5` (embed / secondary view),
`IX-inflow`, `IX-direct` — reusing Composer's mention/embed machinery over the
kind-typed `Edge` of §1.

### Linked mention (`@`) — a linked-kind `Edge` + a positional marker

The in-flow `@`-picker (reuse Composer's picker UI + object-query, à la `useLinkQuery`
— but **not** its markdown-URL insert) provides the `IX-inflow` gesture; on select it
creates a **linked-kind `Edge`** (§1) from the current Node to the target and inserts
a **positional marker that references that `Edge` (by id), not a URL** at the cursor,
kept in sync (delete the marker → remove the edge). The text stays plain text + a
marker token — **no structured-span content model, no markdown-URL**. A **custom
CodeMirror decoration** (resolve marker → `Edge` → its target) renders it as an inline
chip (visual-spec accent `rgb(41 125 217)`), **collapsed by default** and **atomic** —
a selectable unit, not editable in place; the target is edited by opening its secondary
view, not by typing into the chip. Traces `UP-2.link` · `IX-inflow.link` ·
`IX-direct.reference-atomic` · `IP-3.cross-reference`.

### Embed = the target's secondary view (one renderer, two placements)

Embed is **not a separate insertion** — it is the mention's target shown as a
**secondary view** (`UP-5`): a live, on-demand, bounded view of the target Node and
its subtree, resolving to the one vertex, **edit-through**. Two placements, the same
renderer:
- **inline** — expand the chip in place → the secondary view opens below the mention,
  above the Node's own subtree (`UP-4.embed` · `IX-direct.expand`; Tana `Option`-click);
- **beside** — open the target alongside the current view (`UP-5.open-beside`; Tana
  `Shift`-click on the chip or a Node handle).
Expansion is **per-occurrence, on-demand, cycle-safe** (`IP-3.expand`/`may-cycle`):
the renderer stops re-expanding a Node already on the current expansion path, so a
self/ancestor mention never expands unboundedly. Reuses Composer's `PreviewComponent`
(target `Section` Surface). Composer's `@@` block-embed is dropped (no UP/IP
counterpart). **Presentation (checkable, `PX-embed`):** the inline expansion renders on
its own line **below** the referring content and **inset** beneath it (nested like a
structural child, `PX-nesting`), bounded and visually distinguished — verified against the
Tana visual-spec's `PX-embed` slots, not asserted as prose. Traces `UP-4.embed` · `UP-5` ·
`IX-direct.expand` · `IP-3.expand` · `PX-embed`.

A second transclusion route stays fully structural: a Node under two **structural**
edges is one edit-through vertex in each location (`IP-2`, §1/§2) — **co-location**,
distinct from the linked mention here.

### Backlinks — the "Mentioned in" grouped union

Both edge kinds are reified `Edge` relations (§1), so a Node's backlinks are its
**incoming edges by `targetOf`, grouped by kind**: **structural** predecessors
("appears under" — where co-located) and **linked** referrers ("mentioned in"). One
traversal, no separate `referencedBy` path; the reified linked `Edge` is what makes
mention-backlinks queryable at all. Surfaced in a companion panel (reuse Composer's
"Related"). Traces `UP-2.backlinks-view`.

### Reuse vs net-new

- **Reuse:** the `@`-picker UI + object-query (à la `useLinkQuery`, **not** its
  markdown-URL insert); the **secondary-view renderer** (`PreviewComponent`/Surface —
  one renderer at both placements, resolving the edge's target); `targetOf` for the
  backlinks union; the companion panel; the `dx-anchor` chip **visual**.
- **Net-new:** emitting a **linked `Edge` + an edge-referencing marker token** on
  `@`-select (and the marker↔edge sync); the **custom chip decoration** (marker →
  edge → target, atomic); mounting the secondary view at the two placements with the
  cycle-safe expansion guard.

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
