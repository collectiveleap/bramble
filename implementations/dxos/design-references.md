<!-- derives-from: [UP-2, UP-3, UP-4, IP-3, IX-inflow, IX-direct.expand]; role: target; status: needs-review -->

# Sub-design proposal — References / embed / backlinks (the `RefSpan` mechanism)

> **Status: PROPOSAL awaiting Steve's review.** Authored autonomously (2026-07-13, Steve offline)
> to warm-start the next slice. It resolves the one mechanism `design.md §3` left open — how a
> reference is *stored and edited* — because that decision is a genuine fork I shouldn't guess.
> Nothing here is built. Approve/redirect the **Decision** below and the sub-plans become buildable.

## Why this exists

`design.md §3` settled the **stances** for references but not the **mechanism**. It says the
`@`-picker "inserts a first-class inline `Ref` into the node's content (a `RefSpan` — **the node's
text is a union of text-spans and ref-spans**), *not* a markdown text link" and that user `@`-mentions
"feed the backlinks view natively via `referencedBy`." The DXOS API research (2026-07-13) found that
**no such primitive exists** in the monorepo:

- Bramble's `Node.text` is `Ref.Ref(Text.Text)` — a single ECHO `Text` object whose `.content` is a
  **plain string**. There is no "text ∪ inline-refs" content type in ECHO.
- Composer's own reference feature (`plugin-markdown`) stores mentions as **markdown-string links**
  `[label](echo:/id)` inside plain text. These are *strings*: the reverse-reference index
  (`ReverseRefIndex`, which powers `Query.referencedBy`) indexes **typed `Ref` schema fields only**,
  **not** URIs embedded in text. So Composer's markdown mentions do **not** feed `referencedBy` —
  exactly the gap `design.md §3` says Bramble closes.

So "a first-class `Ref`-span with native backlinks" is genuinely **net-new**, and *how* to realize it
is a data-model decision with materially different cost and blast radius. That is this document.

## Fixed points (settled in `design.md §3` — not reopened here)

1. A reference is a **first-class ECHO `Ref`** to the target Node, queryable by `referencedBy` — so
   user `@`-mentions populate backlinks natively (`UP-2.backlinks-view`, `IP-3.backlinks`). *Not* a
   bare markdown-string link.
2. Insertion is **in-flow via the `@`-picker** (`IX-inflow`, `UP-2.link`) — reuse Composer's
   `useLinkQuery`/`EditorMenuProvider` machinery.
3. A reference renders **collapsed by default** as an inline chip (visual accent `rgb(41 125 217)`).
4. **Embed = the same reference expanded**, not a separate insertion (`UP-4`, `IP-3.expand`): a
   per-occurrence local view toggle swaps the chip for the target Node's `Section` Surface rendered
   **in place, edit-through** (`IX-direct.expand`). Reuse the Surface-rendering of the target.
5. Composer's `@@` **block-embed** markdown convention is **dropped** — it has no UP/IP counterpart.
6. Backlinks also include **structural predecessors** (a Node's parent `Edge`s via `targetOf`) — the
   "where does this Node live" view — independent of the reference mechanism below.

## The decision — how is a `RefSpan` stored and edited?

A reference must be **both** (a) *positioned inline* in the node's text (to render as a chip at a
spot in the flow) **and** (b) *a real queryable `Ref`* (so `referencedBy` finds it). A plain-string
markdown link gives (a) not (b); a plain `Ref` field gives (b) not (a). The options differ in how they
reconcile the two.

### Option A — string content + inline URI marker + parallel `Ref.Array` (RECOMMENDED)

Keep `Node.text = Ref(Text.Text)` (plain string, **unchanged**). A reference is an inline **marker**
carrying the target's `echo:/id` URI (giving inline position), rendered as a chip by a CodeMirror
extension. **Additionally** maintain a real structural field on the Node — `Node.refs: Ref.Array<Node>`
— kept in sync with the markers present in the text (add on insert, drop on delete). `referencedBy`
indexes that field, so backlinks are native. The chip and inline-expand rendering reuse
`plugin-markdown`'s `xmlTags` + `PreviewComponent` machinery almost verbatim.

- **Blast radius: small.** `Node.text` stays a string, so every Plan 2a–2c text gesture
  (type / Enter / Backspace / split / merge / the CodeMirror `Doc.createAccessor` binding) is
  untouched. Adds one schema field + one editor extension + a sync listener.
- **Reuse: maximal.** Chip widget (`AnchorWidget`), transclusion Surface (`PreviewComponent`), and
  the `@`-picker (`useLinkQuery`) all transfer directly.
- **Backlinks: native** — via the real `Node.refs` field.
- **Cost:** the marker↔`Ref.Array` **sync** is a real consistency burden — deleting the marker text
  must drop the `Ref`; paste/merge must reconcile; the field is a second source of truth for "what
  this Node references." Bounded by a single CodeMirror update-listener that diffs markers vs. field.
- **Fidelity to §3's wording:** *partial* — the `Ref` is real and queryable, but it lives in a
  parallel array; the text holds a URI marker, not a literal `Ref` object.

### Option C — same as A, marker = the existing `dxn:`/`echo:` link convention

Identical to A, but the marker is literally the `dxn:`/`echo:` URL form that Composer's `xmlTags`
extension **already** recognizes (`urlSchemes: ['dxn:', 'echo:']`), so chip + transclusion rendering
are **100% reuse, zero net-new rendering** — the only net-new is the `Ref.Array` sync. The catch:
that marker is a markdown link `[label](echo:/id)`, which `design.md §3` explicitly calls "*not* a
markdown text link." **Open sub-question:** is §3's "not a markdown link" about the *user* never
seeing raw markdown (the chip hides it — satisfied) or about the *storage* not being a markdown
string (violated)? If the former, C is strictly better than A (more reuse, same result).

### Option B — structured span content (`text ∪ ref-spans` as first-class data)

Replace `Node.text` (plain `Text.Text`) with a **structured content type**: an ordered list of spans,
each a text-span (string) or a ref-span (a real `Ref<Node>`). This is *literally* `design.md §3`'s
"the node's text is a union of text-spans and ref-spans."

- **Fidelity: highest** — refs are truly inline *and* first-class; single source of truth; each
  ref-span is directly `referencedBy`-queryable.
- **Blast radius: largest** — replaces the `Text.Text` content model that **every** existing text
  gesture depends on, and needs a **new CodeMirror binding layer** mapping the structured model to/from
  an editable doc (today's binding assumes plain-string content via automerge). **No existing DXOS
  primitive** does this (research found none), and it likely forfeits reuse of Composer's
  markdown-text editor extensions.
- **Cost/risk: high** — a from-scratch content model + editor binding; the largest, riskiest build in
  the whole Bramble effort so far.

### Comparison

| Criterion | A (string + marker + `Ref.Array`) | C (A, marker = markdown link) | B (structured spans) |
|---|---|---|---|
| Native `referencedBy` backlinks | ✅ (parallel field) | ✅ (parallel field) | ✅ (direct) |
| Blast radius on Plans 2a–2c text gestures | small | small | **large** (replaces content model) |
| Reuse of Composer chip/transclusion/picker | high | **maximal** | low |
| Single source of truth for refs | ✗ (marker + field) | ✗ (marker + field) | ✅ |
| Fidelity to §3 "text ∪ ref-spans" wording | partial | partial | **exact** |
| New primitives to invent | 1 field + sync listener | sync listener only | content schema + editor binding |
| Build risk / effort | low–moderate | **low** | **high** |

### Recommendation

**Option A (or C, pending the "not a markdown link" clarification).** It achieves the load-bearing
stance — *native backlinks via a real `Ref`* — while leaving the hard-won Plan 2a–2c text-editing
stack untouched and reusing Composer's production reference machinery. Option B is the literal reading
of §3 and the "purest" model, but its blast radius (replacing the content model + a bespoke editor
binding, with no primitive to lean on) is out of proportion to the marginal gain over A, which already
delivers backlinks, chips, and edit-through. If single-source-of-truth is judged essential, B is the
principled choice — but it should be a conscious, eyes-open commitment to a large build, not a default.

**The `design.md §3` text ("the node's text is a union of text-spans and ref-spans") currently reads
as a commitment to B.** If you accept A/C, `§3` should be amended (via the move-up protocol) to
describe the parallel-`Ref` mechanism, so the neutral/target layers stay honest.

## Secondary decisions (fall out of the main one; A/C-specific)

- **Marker format** (A vs C): a custom minimal encoding vs. the existing `[label](echo:/id)` markdown
  link. C maximizes reuse; A better honors "not a markdown link" literally.
- **Where the parallel `Ref` lives:** a new `Node.refs: Ref.Array<Node>` field (simple; the whole
  Node's outbound refs) vs. per-occurrence metadata (needed only if the same target appears twice and
  we must distinguish occurrences — probably YAGNI for the floor).
- **Expand-toggle view-state home:** the per-occurrence collapse/expand toggle is **local view-state**
  (like outline collapse/zoom, Plan 2d) — it belongs in the existing `ViewState`/`OutlineController`,
  keyed by (row edge id + reference occurrence), **not** the substrate.

## Verified DXOS APIs to reuse (research 2026-07-13 — concrete anchors)

- **`@`-picker:** `popover()` + `EditorMenuProvider` + `useEditorMenuOptions` (`@dxos/react-ui-editor`),
  driven by an `onLinkQuery` like `plugin-markdown/src/hooks/useLinkQuery.ts` — queries candidate
  objects (`db.query(Query.select(Filter.type(...)))`), inserts on select. **The exemplar to copy.**
- **Chip rendering:** `xmlTags({ registry: { 'link-preview': { urlSchemes: ['dxn:','echo:'],
  factory: (p) => new AnchorWidget(p.label, p.dxn) } } })` (`@dxos/ui-editor`).
- **Inline transclusion (edit-through):** `xmlTags` block entry → `<Surface.Surface
  type={AppSurface.Section} data={{ subject, attendableId, extrinsic }} limit={1} />`
  (`plugin-markdown/src/components/PreviewComponent`), target resolved via `space.db.makeRef(uri)` +
  `useResolveRef` (`@dxos/react-client/echo`).
- **Reference `Ref` + backlinks:** `Ref.Ref(Node)` schema field / `Ref.make(node)`;
  `Obj.getURI(node, { prefer: 'relative' })` → `echo:/id`; backlinks =
  `Query.select(Filter.id(node.id)).referencedBy(Node)` (real, index-backed; **no UI panel exists** —
  build new, following `plugin-routine`'s query-construction style).
- **Structural "where it lives":** the existing `parentEdges(db, node)` (Plan 1) already gives inbound
  structural `Edge`s — the reverse-traversal for the "where does this Node live" half of the panel.
- **Do NOT reuse:** `ui-editor/extensions/mention.ts` (unused, "not working") or
  `react-ui-chat/.../references.ts` (`@deprecated`, unwired).

## Sub-plan decomposition (all gated on the Decision above)

1. **P-ref-1 — `@`-mention: picker + insertion + chip + resolution.** Wire the `@`-picker to emit a
   `RefSpan` per the chosen model; render it as an inline chip that resolves to the target's label;
   maintain the queryable `Ref` (A/C: the `Node.refs` sync). *Delivers:* type `@`, pick a Node, see a
   live chip. *Blocked on:* the Decision (defines what's emitted + where the `Ref` lives).
2. **P-ref-2 — expand/embed: per-occurrence toggle → inline Surface, edit-through.** Add the local
   view-state toggle on a chip; expanded → the target's `Section` Surface in place, edits flowing to
   the one target. *Delivers:* expand a mention to see/edit the target inline. *Depends on:* P-ref-1
   (the chip + resolution).
3. **P-ref-3 — backlinks "Related" panel.** For a focused Node: inbound `Ref`s (`referencedBy`) +
   structural predecessors (`parentEdges`/`targetOf`), in a companion surface. *Delivers:* "what links
   here / where this lives." *Depends on:* P-ref-1 (refs must be queryable) for the reference half; the
   structural half is buildable independently (see below).
4. **P-colocate — co-locate UX (multi-location).** The substrate already supports a Node under multiple
   structural `Edge`s (`createEdge`, cycle-checked; `outlineRows` renders each occurrence). Net-new is
   only the **UX**: a gesture + target-picker (reuses P-ref-1's picker machinery) to add a second
   structural parent. *Delivers:* "also place this Node under X." *Depends on:* the picker machinery.

### What is buildable BEFORE the Decision

- **The structural half of P-ref-3** — a read-only "where does this Node live" view over `parentEdges`
  (a Node's structural predecessors) — is fully specified and reference-model-independent. Small, real,
  design-settled. (Deferred for now only because a standalone half-panel has limited value until the
  reference half lands; noted here so it's not forgotten.)
- Everything else waits on the Decision — which is why this proposal, not a build, was the right
  autonomous output.

## Open questions for Steve (crisp)

1. **Storage model: A, C, or B?** (Recommendation: A, or C if "not a markdown link" means "user never
   sees raw markdown.")
2. If A/C: **marker format** — custom encoding (honors "not a markdown link" literally) or the reused
   `[label](echo:/id)` convention (maximal reuse)?
3. If A/C: confirm **`Node.refs: Ref.Array<Node>`** as the queryable field (vs. per-occurrence
   metadata — I believe per-occurrence is YAGNI for the floor).
4. Should `design.md §3` be **amended** to match the chosen mechanism (its current wording commits to
   B)? (I'd do this via the move-up protocol as the first step of the slice.)
