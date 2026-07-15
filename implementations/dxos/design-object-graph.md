<!-- derives-from: [IP-1, IP-1.typed-node, IP-2, IP-3, UP-4, UP-5]; role: target; status: current -->

# Object-graph convergence — settled design (BR-16)

Bramble is **the structural outline over Composer's whole object graph** (decision BR-16, 2026-07-15).
This is the settled design for converging the *build* (a homogeneous `Node`-type outline) **up** to
`design.md` §1(ii) ("Node = any typed `Obj`"), which the spec + design already committed to and the build
diverged from. It feeds a phased plan under `plans/`.

## 1. The foundational DAG (nodes + edges)

- **Node = a role, not a schema.** A node is *any ECHO `Obj`*, keyed on its type-neutral identity
  (`EntityId` / DXN). An "untyped node" = `Obj.Unknown` / Expando (first-class, per `IP-1.typed-node`).
  There is no `instanceof` / type check — the role is "an object an edge can point at," which every `Obj`
  satisfies. DXOS gives us the node primitive for free (the identity is already type-neutral).
- **`Edge` = the only foundational schema Bramble owns.** A kind-typed (structural | linked) relation over
  **`Obj.Unknown` endpoints**. **VERIFIED feasible (2026-07-15):** ECHO relations span arbitrary objects —
  `plugin-inbox`'s `ExtractedFrom` already declares `source: Obj.Unknown, target: Obj.Unknown`; endpoints are
  stored as DXN refs, not a write-time type lock.
- **The generalization is mechanical:** `Edge` `source/target: Node` → `Obj.Unknown`; drop the `as Node`
  casts; `makeEdge` / `makeLinkedEdge` accept any `Obj`. **All traversal is unchanged** — `childEdges`,
  `backlinks`, cycle-check, ordering key on `Filter.id` + `kind`, never on type.
- **Type-independent behavior falls out** because every substrate operation keys on identity. Type re-enters
  only at the edges of the system — render / edit / create — by *dispatch*, never in the substrate.

## 2. Node types

- **Node types = ECHO types.** Every ECHO type (text, Person, Document, Sketch, Table, …) is a node type;
  every instance is a node instance, operable by the DAG (nest / link / address / expand) regardless of type.
- **The text node type** is one type among many — the default bullet. **Residual choice (minor, decide at
  build):**
  - **(A, lean):** use the native `Text.Text` directly. Bramble then owns *only* `Edge`; consistent with
    every other type being native. The one asymmetry: Bramble supplies the *default* type's inline-row
    renderer (its editor), rather than dispatching text to a `Section` surface.
  - **(B):** a thin Bramble `Text` / `Bullet` type holding `content: Ref(Text.Text)` — today's `Node` renamed;
    matches the `Markdown.Document → Ref(Text.Text)` precedent.
  - The earlier cons for B (metadata gap, query-mixing, layout-dispatch) were **withdrawn** — the first two
    were unfounded; the third (render-by-type on open) is *uniform across all types*, not text-specific.
    Honest call is close; leans **A** on consistency.
- **`IP-1.typed-node` is satisfied, not in tension.** Untyped nodes = `Obj.Unknown`; typed nodes = typed
  objects; identity ⊥ type. Its "adding/removing a type preserves the node's identity" clause is a
  **property** (type doesn't define identity), *not* a mandate that in-place retype be supported — so ECHO's
  intrinsic types don't violate it. ("Convert this text bullet to a Task" is a new object + re-edge, which
  the spec never forbade.)

## 3. Joining the DAG (no new primitive)

- **Create new:** a new typed instance (default: a text node) becomes a bullet via a **structural** edge from
  its parent. Standard authoring.
- **Reference existing:** pull an object already in the space into the outline — a **structural** edge
  co-locates it as a bullet (BR-10); a **linked** edge mentions it inline (the references work).
- Both are just `makeEdge` / `makeLinkedEdge` over `Obj.Unknown`.

## 4. The uniform render model — one secondary-view primitive, 2×2

Every node has two **orthogonal** aspects: **content** (type-native) and **subtree** (its DAG children). The
secondary view is one primitive = **{rendering} × {placement}**, each cell a toggle:

| | **Structural** (bramble subtree) | **Native** (type surface) |
|---|---|---|
| **Below** (inline) | option-click | option + ⌘ |
| **Beside** (plank) | shift-click | shift + ⌘ |

- **Two axes:** *placement* (Option = below, Shift = beside) · *rendering* (default = structural, +⌘ = native).
  ⌘ not Ctrl — Ctrl-click is the macOS context menu.
- **Same space:** one below-region and one beside-pane per node; toggling swaps/stacks structural vs native
  *within* it, never spawning extra panes. A node shows at most two spaces, each = structural, native, or both.
- **Composition rule (uniform):** *content renders on the node's line; the subtree nests below it.* A node's
  **type-internal fields** (a Person's email) are **content**, not subtree — never conflated with DAG children.
- **Inline row** = compact type-content (text → editor; Person → its `Section` surface; …) + bullet/chevron;
  children nest via the chevron.
- **Generalizes past chips:** the same 2×2 applies to any node — via its chip when mentioned, via its
  bullet/handle when it's a row.
- **Zoom** (bullet-click) stays separate: a full **re-root** of the outline at a node, distinct from these
  bounded peeks.
- **Discoverability:** back the four chords with **visible twin affordances** (a "structure" glyph + a
  "content" glyph, each offering below/beside), so the chords are accelerators, not the only path.

## 5. Spec collapse (move-up — fold into the plan)

`UP-4.embed` (native content) and `UP-5.secondary-view` (structural subtree) **collapse into the one
secondary-view primitive**: they become its two *rendering* values; below/beside are its two *placement*
values. Refine `spec/user-primitives.mdl` (UP-4/UP-5 → one primitive, 2×2) as a **move-up** during the
convergence, then propagate to `design.md`. This is a *simplification* of the spec, not new surface area.

## 6. Cascade (reshaped tickets)

- **BR-3** (singleton): a Bramble is now a **view rooted at a node**, not a bag of Nodes → re-frame the
  singleton question under this model.
- **BR-2** (nav): typed nodes carry their own identity; nav is about surfacing the Bramble **view** (its root).
- **BR-1** (create / focus): follows the new model.

## 7. Phased build path (NOT a big-bang)

1. **Edge generalization** — endpoints `Node` → `Obj.Unknown`; drop casts; traversal unchanged. (Substrate.)
2. **Text node type** — settle A vs B; the current `Node` becomes the text type.
3. **Heterogeneous row render** — inline row by type (text → editor; others → `Section` surface + fallback).
4. **Secondary-view primitive** — the 2×2 (extend the built `expandedMentions` / inline-expand with a native
   toggle + a below/beside axis).
5. **Joining** — create-new-typed + reference-existing gestures; `@`-picker + backlinks over any `Obj`.
6. **UP-4/UP-5 collapse** (spec move-up) + `design.md` propagation.
7. **Reshaped BR-3 / BR-2 / BR-1.**

## Open / residual

- Text schema **A vs B** (decide at build step 2; leans A).
- The exact native-toggle **affordances / discoverability** (UX polish).
- Whether every ECHO type gets an inline `Section` renderer or a fallback (build step 3).
