# Gap analysis (UX) — X = DXOS / Composer

<!-- derives-from: [UX-direct, UX-inflow, UX-immediate, UX-reversible, UP-1.author, implementations/tana/user-experience.md, implementations/tana/visual-spec.md]; role: target; status: current -->

Evaluates DXOS / Composer against the neutral interaction spec (S2,
`spec/interaction-primitives.mdl`) and the Tana reference realization (R,
`implementations/tana/user-experience.md` + `visual-spec.md`). Companion to the
substrate `gap-analysis.md` (SIP/SUP), which it does not duplicate.

Measured against a **live Composer build** (`localhost:5173`, latest, fresh run)
2026-07-11, Brave/Chromium.

**This is a decision-oriented gap analysis, not an exhaustive one.** It answers
one question first — *can any existing Composer surface reproduce Tana's core
outline primitive?* — because the answer determines whether the rest of the
survey is worth doing. It is **not**: since the finding is *a new plugin is
needed*, exhaustively cataloguing existing plugins' keystrokes and visual styles
(which a new plugin will not inherit) would be wasted work. The value is the
decision, the forcing gap, and the reuse-vs-new split.

## 1. Framing — Composer's UX surfaces and plugin architecture

Composer is a **plugin composition**: a fresh build boots by *activating plugins*
(splash: `operation-handler`, `operation-invoker`, `companion-chat-provisioner`),
and surfaces are contributed by plugins registered through a **Plugin Registry**
(left rail → Plugins). Observed shell (live): navtree (Personal Space → Welcome,
Settings, Collections, Database, DevTools); left rail (Space, Plugin Registry,
App Settings, DevTools, Account); right-rail companions (Search, Trace, Stats,
Database); a **markdown editor** (toolbar: Link, Bullet/Numbered/Task lists,
Block quote, Code block, Table, image/embed, Markdown-mode). Object types are
created via a "Create Object" picker (Document, Collection, Outline, Table,
Sketch, …).

Where each R behavior could live, and the substrate-analysis capability verdict:

| R behavior | Candidate surface | `gap-analysis.md` verdict |
|---|---|---|
| Create / edit / delete a row-as-Node | **Outline** object rows | `UP-1.author` **fail** — a created row is not a first-class Node (see §2) |
| Indent/outdent/reorder/zoom/expand | **Outline** object | `UP-1.outline` **partial** |
| Multi-location (one node, two places) | Collections / navtree | `UP-1.multi-location` **partial** |
| Insert inline reference (`@`) | Markdown `@` → `[label](dxn)` | `UP-2.link` **pass** |
| Copy link to a node | object URI / markdown link | `UP-3.any-node-target` **partial** |
| Backlinks view | "Related" companion panel | `UP-2.backlinks-view` **partial** |
| Embed / expand inline | Markdown block embed `![label](dxn)` | `UP-4.embed` / `UP-4.edit-through` **pass** |

## 2. The forcing gap — outline rows are not addressable nodes (live-confirmed)

Tana's core primitive is that **every bullet is a first-class Node**: individually
addressable, linkable, multi-locatable, edit-through. The decisive test is whether
Composer's outline surface gives a row that identity. It does not — confirmed
against the latest build:

- Created an **Outline** object (`org.dxos.type.outline`), added two rows.
- Each row is a **per-row CodeMirror editor** (`.cm-*` spans) under the outliner
  plugin's ReactSurface, with **no per-row ECHO `dxn`/object-id** in the DOM.
- The **row `⋮` menu offers only "Delete row"** — no copy-link, no get-URI, no
  "reference this row".
- The **object-level** menu *does* have "Copy link" — so addressing stops at the
  **whole outline object**; the fragment-less URI ceiling (`gap-analysis.md`:
  EID/DXN has no fragment) is confirmed at the UI.

So `UP-1.outline` clause (b), `UP-1.author` (create/edit/delete a *first-class*
row-Node), and `UP-3.any-node-target` **fail for outline rows**, and — since a row
has no identity — `UP-1.multi-location` and per-row edit-through are unreachable in
the outline. **No existing surface or plugin
provides an addressable-node outline** (Stack sections are addressable but flat;
the navtree nests whole objects, not content rows). This is the gap that forces a
new plugin; it is structural (substrate addressing + surface model), not a
missing toolbar affordance.

## 3. Reuse-vs-new split (what a new plugin builds on)

The gap is concentrated in the **outline surface**, not the substrate. Per
`gap-analysis.md`, ECHO's relevant primitives are strong and directly reusable:

**Reuse / build on (already `pass` at substrate or product):**
- **Node identity** — every `Obj` has a stable ULID `EntityId`, content-type-open
  (`IP-1.*` pass).
- **References & backlinks** — `Ref`/`Relation`, `referencedBy`/`ReverseRefIndex`
  (`IP-3.cross-reference/backlinks` pass); the "Related" companion panel.
- **Edit-through transclusion** — the markdown block embed `![label](dxn)` portals
  the live object's surface, edit-through (`UP-4.embed`/`edit-through` pass).
- **In-flow `@`-link** — the markdown `@` popover inserts `[label](dxn)`
  in-content (`UP-2.link` pass) — the interaction *pattern* to reuse.
- **Object-level addressing + Copy link** — works (confirmed live).

**Net-new (what the Bramble plugin must build):**
- A **node-per-row outline-view surface** whose rows each render a **first-class
  ECHO object** — a Node with its own `EntityId`/URI — so a row is addressable, `@`-linkable, multi-locatable,
  and per-row edit-through — the Tana primitive the existing `Text`-blob /
  CodeMirror Outliner cannot provide.
- The **manner** laws (S2) applied to that surface: direct in-place restructuring,
  in-flow reference, immediacy, gesture-granular undo — measured, when it exists,
  against R (`user-experience.md`).

## 4. Visual side — deferred (by design)

The `visual-verification` mapping (`implementations/tana/visual/tana-outline.json`)
holds Tana's computed styles as `expect`. Diffing the *existing* thin Outliner
against it would be the wasted work this analysis avoids: the new plugin is built
**to** R's `visual-spec.md`, and the differ (`diff-styles.mjs`) runs against the
**new plugin's** surface once it exists. The mapping's Composer `app` selectors
stay `TODO(S3-post-plugin)`.

## 5. Conclusion

**A new Bramble outliner plugin is needed.** Composer's existing Outline object is
a CodeMirror-over-`Text` surface whose rows carry no ECHO identity (row menu =
"Delete row" only; addressing stops at the whole object) — it cannot reproduce
Tana's every-bullet-is-a-Node primitive, and no other installed plugin supplies an
addressable-node outline. The substrate underneath is strong and reusable (Node
identity, refs, relations, backlinks, edit-through embed, in-flow `@`-link), so the
new plugin **builds on ECHO and composes Composer's markdown link/embed patterns**
rather than starting from scratch. The existing Outliner is **not** the
destination.

## 6. Onward

Feeds **S4 · DXOS design** (`implementations/dxos/design.md`): design the Bramble
outliner plugin — a node-per-row outline view over first-class ECHO objects (the
DAG) — realizing R's behavioral spec and S2's interaction laws, and built to R's
visual-spec.
Sequence against the substrate dependencies in `gap-analysis.md` (per-row object
identity + sub-object addressing is the first thing to close).
