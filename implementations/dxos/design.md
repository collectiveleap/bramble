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

---

## §2 Outline surface + gestures

_(pending — next sub-design.)_

## §3 Reference / embed / backlinks integration

_(pending.)_

## §4 Hosting / build

_(pending.)_
