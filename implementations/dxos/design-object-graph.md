<!-- derives-from: [IP-1, IP-1.typed-node, IP-2, IP-3, IP-4, UP-4, UP-5]; role: target; status: current -->

# Object-graph convergence — settled design (BR-16)

Bramble is **the structural outline over Composer's whole object graph** (decision BR-16, 2026-07-15).
This is the settled design for converging the *build* (a homogeneous `Node`-type outline) **up** to
`design.md` §1(ii) ("Node = any typed `Obj`"), which the spec + design already committed to and the build
diverged from. It feeds a phased plan under `plans/`.

## ▶ RESUME POINT — IP-4 / non-destructive substrate follow-through (2026-07-15, survives compaction)

**Context.** BR-16 is **SETTLED**: Bramble = the structural outline over Composer's object graph (Node = role,
`Edge` = the only foundational schema over `Obj.Unknown`; feasibility verified via `plugin-inbox`'s
`ExtractedFrom`). This doc is the settled convergence design. `IP-4` (non-destructive / append-only /
provenance) was added to the neutral spec as **substrate richness** (distinctive, *divergent* — same category
as the multi-predecessor DAG). Commits: BR-16 settle `78f0dc3` · feasibility `99ea244` · convergence design +
render 2×2 `2341943` · IP-4 draft + §3 lifecycle `7ea8aba` · IP-4 conformance harmonized `83068c5`.

**`IP-4` is DONE in the neutral spec.** `spec/internal-primitives.mdl` = `feat IP-4` (3 reqs: `append-only` ·
`non-destructive-removal` · `provenance`) + intro bullet + the `IP-1` "deleted" probe neutralized;
`spec/README.md` lists it in the "deliberately diverges" set. Conformance status **CONFIRMED by Steve**:
distinctive above-floor / substrate richness (divergent), NOT appendix.

**Pending `IP-4`-related work (the resume tasks) — also in `FLOW.md` → Pending propagations:**
1. **`IX-reversible` fold** — make undo a *consequence* of `IP-4` (undo = append a corrective event), not a
   bolt-on. Edit `spec/interaction-primitives.mdl` (look for an `IX-reversible` req; `design.md` §2 gesture-map
   notes "Undo — gesture-granular — see open item"). Small propagation.
2. **Feasibility gate — ECHO removal-history — VERIFIED GREEN (2026-07-15).** `db.remove` is already a
   reversible tombstone: it flips `system.deleted = true`, leaves data inline, and the automerge history
   survives (re-`add` restores; `getObjectById(id,{deleted:true})` reads removed data); relations remove the
   same way. So `mergeBackward`'s `db.remove` is **already `IP-4`-compliant** — no custom tombstone needed. Two
   provisos: no high-level reconstruct/`getHistory` API (re-`add` is the restore; a history affordance is a
   future build), and keep compaction (`unlinkDeletedObjects`) off Bramble objects. See §3 + §7.5.
3. **UP-4/UP-5 collapse** (adjacent move-up) — `spec/user-primitives.mdl` `UP-4`/`UP-5` → one secondary-view
   primitive, 2×2 (§4/§5); propagate to `design.md`.

**Then:** writing-plans → phase 1 = **Edge generalization** (`Node` → `Obj.Unknown`, drop casts; traversal
unchanged). Phased path in §7. **Text-schema residual** (A = native `Text.Text` · B = thin type) leans **A** —
decide at build step 2 (the lifecycle argument for B dissolved: removal is uniform + non-destructive).

**Key files:** this doc = the authoritative convergence design · `spec/internal-primitives.mdl` (`IP-4`) ·
`spec/README.md` (divergence list) · `FLOW.md` (pending propagations) · `issues-ledger.md` `BR-16` (+ `BR-3`/`BR-2` reshaped).

---

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
- **Build finding (1.1, 2026-07-15):** the plugin's `Node` declares one field, optional `text?`, so
  structurally `Node ≈ Obj.Unknown` — every ECHO object already satisfies it. The old `Edge: Node` endpoints
  therefore enforced nothing; widening them to `Obj.Unknown` (commit `788ea1937e`) is **declarative honesty +
  the foundation for later phases**, not a runtime-behaviour change — so no red→green TDD is available for it
  (verified by the schema declaration + a green gate, not a failing test). This **affirms BR-16** (a node is a
  role, not a type constraint) and **reinforces D2 / schema A** (native `Text.Text`): dropping the `Node`
  wrapper loses no type-safety that ever existed.

## 3. Joining & lifecycle (authoring)

**Two verbs, symmetric — placement picks the edge kind (grounded in Tana):**
- **Create** — `Enter` / typing = a **text** node (default bullet); **`/`** = a **type picker** → a new
  instance of a chosen type (Task, Person, Doc…). Both attach via a **structural** edge from the parent.
- **Reference** (`@`) — the *same* gesture; context decides the edge kind:
  - `@` **inside text** → a **linked** mention (a chip);
  - `@` in an **empty / pending bullet** → a **structural** co-locate (a real child bullet). *(Exactly Tana's
    co-locate gesture — `@` typed in an empty child.)*
- Scope: the current space, all types (cross-space later). No new primitive — `makeEdge` / `makeLinkedEdge`
  over `Obj.Unknown`.

**Lifecycle — uniform and non-destructive (`IP-4`):**
- A text bullet is just an `Obj` like any other, so removal is **uniform for every node**: *remove from Bramble
  = a versioned removal of the edge* (`IP-4.non-destructive-removal`) — the node/edge leaves the *current
  projection*, the history retains it, and it is reversible.
- **"Gone from Bramble" = out of the current projection when its edges are gone** — GC-like, but nothing is
  destroyed; and **never destroy the referenced ECHO object** (per `IP-4`, never destroy *anything*).
- **`db.remove` already satisfies `IP-4` — it is a reversible tombstone, not a purge (feasibility gate
  VERIFIED GREEN, 2026-07-15).** `db.remove(obj)` flips one boolean (`system.deleted = true`) and leaves all
  data inline; the mutation is an append-only automerge `change`, so the document's full history survives and
  prior heads stay reachable. It is reversible: re-`add` clears the flag with data intact,
  `getObjectById(id, {deleted:true})` reads a removed object's live data. **Relations/edges remove via the
  identical path.** So `mergeBackward`'s existing `db.remove` is **already compliant** — no custom tombstone
  mechanism is needed. (Evidence: `entity-manager.ts:487`, `object-core.ts:610`/`416`, `database.ts:384`;
  tests `echo-handler.test.ts:384`, `relations.test.ts:40`.)
- **Two provisos (record, don't block):** (1) full prior-state reconstruction needs reading automerge at an
  earlier head — there is no high-level `getHistory`/`restore` API; the supported restore is re-`add` or
  read-with-`{deleted:true}`. `IP-4.provenance` is satisfied at the substrate (data + history + `createdAt`
  survive); a convenient history/restore affordance is a **future** build, not now. (2) Compaction
  (`unlinkDeletedObjects` → `ObjectCore.delete()`) *can* hard-delete, but it is a **separate,
  explicitly-invoked GC**, never part of `db.remove` — the build must **not** run compaction on Bramble
  objects, to honour "nothing is truly deleted."

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
5. **Joining + lifecycle** — create (`Enter` text / `/` typed) + reference (`@` in-text=linked, `@` empty-bullet=co-locate); `@`-picker + backlinks over any `Obj`. **Non-destructive removal (`IP-4`):** removal uses `db.remove` as-is (gate VERIFIED — it is already a reversible tombstone with retained history); do **not** invoke compaction / `unlinkDeletedObjects` on Bramble objects.
6. **UP-4/UP-5 collapse** (spec move-up) + `design.md` propagation.
7. **Reshaped BR-3 / BR-2 / BR-1.**

## Open / residual

- Text schema **A vs B** (decide at build step 2; leans A).
- The exact native-toggle **affordances / discoverability** (UX polish).
- Whether every ECHO type gets an inline `Section` renderer or a fallback (build step 3).
