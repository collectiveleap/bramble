# Tana UX realization

<!-- derives-from: [UX-*, UP-*]; role: reference; status: draft -->

Concrete, isomorphic realization of the neutral interaction spec
(`spec/interaction-primitives.mdl`) by Tana: for each behavior, the observed
trigger, response, visual/layout, and edge cases — each tracing to the SUP
capability (`UP-*`) it realizes and the S2 law (`UX-*`) it exhibits.

## Concreteness bar

An implementer could reproduce each behavior on Composer **without ever watching
Tana** — from this file alone. Per behavior: the trigger, the response, the
visual / layout / feedback, and the edge cases. Values are observed and
verified, never asserted from memory.

Sourcing: filled from Tana's canonical docs (`nodes-and-references`,
`outline-editor` learn pages). Feature pages name outline operations by symbolic
command (`indent`, `move-up`, `expand`, …) and do not print literal keystrokes;
literal keys below are carried from prior-session notes and flagged inline for
confirmation in a live Tana session (search the flag token to list open items).

**Capture method — do not inherit the source doc's taxonomy.** A feature doc
lists the *nameable* operations (indent, move, expand, zoom) and assumes the
elementary ones, so a doc-sourced pass silently omits them. Before this R is
called complete, run these sweeps beyond the doc's named operations: (a) the
**elementary lifecycle** — create, edit, remove, focus, navigate — as first-class
behaviors, not assumptions; (b) **every persistent UI element** (bullet, chevron,
breadcrumb, reference token, header), asking "is it a Node? what does *clicking*
it do?" — which catches pointer affordances and the element-as-Node cases a
keystroke-first inventory misses; (c) the **full verb set** on the structure — not
only create/edit/remove but **reshape** (reorder / move / re-nest an existing Node),
which hides inside "it's nested" and gets missed; (d) for every gesture, **every
input modality** — key, click, and **continuous direct-manipulation** (drag, with
its press→track→commit lifecycle), which a discrete-trigger inventory compresses to
a one-liner or drops. The behaviors and triggers added by these sweeps carry
`[live-check pending]` flags until confirmed live. (These are the R-capture instance
of the neutral **Spec completeness sweeps** in `spec/README`.)

Keys are macOS (`Cmd`); on Windows substitute `Ctrl`.

**View vs. substrate.** These gestures act on the *current view*, which is an
outline in both Tana and the DXOS/Bramble target. The underlying substrate
differs — Tana stores a single-owner outline, the SIP a multi-predecessor DAG —
but the outline gestures below are described at the view level, where the two
agree.

## Entry format

Each behavior is a `###` section with these fields, in order:

- **Trigger** — the exact key(s) / click / drag that initiates it
- **Response** — what happens to the Node and cursor, step by step
- **Visual/layout** — placement, affordance, popover / animation / indicator
- **Edge cases** — the boundary behavior for this gesture
- **traces (capability)** — the `UP-*` ids realized, glossed
- **traces (manner)** — the `UX-*` ids exhibited, glossed

The split trace line (capability vs. manner) lets the downstream DXOS UX gap
analysis return two separate verdicts for Composer — "capability present?" and
"manner satisfied?". The @-mention entry is the worked pattern.

## Behaviors

### Edit a Node's content

- **Trigger:** place the cursor in a Node (click into its line, or arrive by navigation) and type.
- **Response:** typed characters enter the Node's content at the cursor; the Node's text updates as typed. Editing the Node in focus (the zoom-root shown as the panel's top) edits that same Node — view position does not change what editing does.
- **Visual/layout:** a standard text caret sits in the Node's line; there is no separate edit mode or field.
- **Edge cases:** the focused / zoom-root Node — rendered as the header / title — is editable in place exactly like a body Node. `[live-check pending: header caret + in-place edit]`
- **traces (capability):** `UP-1.author` — edit a Node's content · `UP-1.outline` — the edited unit is individually addressable
- **traces (manner):** `UX-direct.outline` — act on the Node in place · `UX-immediate.gesture` — shown as typed

### Create a Node

- **Trigger:** `Enter` with the cursor in a Node.
- **Response:** a new sibling Node is created immediately below the current one at the same level, and the cursor moves into it; pressing `Enter` mid-content **splits** the Node — the text after the cursor becomes the new Node's content.
- **Visual/layout:** a new bullet appears beneath the current line; the caret is in the new (possibly empty) Node.
- **Edge cases:** on the focused / zoom-root Node, `Enter` creates its first child (the body of the zoom); on an expanded Node that already has children, `Enter` creates a first child rather than a sibling. `[live-check pending: sibling-vs-child rule for expanded / zoom-root Nodes]`
- **traces (capability):** `UP-1.author` — create a Node · `UP-1.outline` — the new Node is a first-class outline unit
- **traces (manner):** `UX-direct.outline` — build the outline in place · `UX-immediate.gesture` — shown at once · `UX-reversible.undo` — gesture-granular undo

### Delete / merge a Node

- **Trigger:** `Backspace` at the start of a Node's content (or on an empty Node).
- **Response:** the Node merges into the preceding Node — its content joins the end of the preceding Node and the Node is removed, the caret landing at the join; `Backspace` on an empty Node removes it and moves the caret to the preceding Node.
- **Visual/layout:** the Node's bullet disappears; the caret sits at the merge point in the preceding Node.
- **Edge cases:** a removed Node's children re-attach to the preceding Node rather than being deleted with it. `[live-check pending: merge target (preceding sibling vs parent) + child re-parenting]`
- **traces (capability):** `UP-1.author` — remove a Node
- **traces (manner):** `UX-direct.outline` — act on the Node in place · `UX-immediate.gesture` — shown at once · `UX-reversible.undo` — gesture-granular undo

### Indent / nest

- **Trigger:** `Tab` on the focused node.
- **Response:** the node becomes a structural successor of the sibling immediately above it; it and its subtree shift one level right; the cursor stays on the node, editing uninterrupted.
- **Visual/layout:** the node's bullet moves right one indent step, now beneath the preceding sibling.
- **Edge cases:** with no preceding sibling at its level, indent is a no-op (nothing happens).
- **traces (capability):** `UP-1.reshape` — reorder & re-nest a Node (identity-preserving)
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Outdent

- **Trigger:** `Shift`+`Tab` on the focused node.
- **Response:** the node detaches from its current owner and becomes that owner's following sibling, one level left, carrying its own subtree; the cursor stays on the node.
- **Visual/layout:** the node's bullet shifts left one indent step.
- **Edge cases:** outdenting a top-level node is a no-op (nothing happens).
- **traces (capability):** `UP-1.reshape` — reorder & re-nest a Node (identity-preserving)
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Reorder (move up / down)

- **Trigger:** `Cmd`+`Shift`+`↑` moves the node up (swaps it with the preceding sibling); `Cmd`+`Shift`+`↓` moves it down (swaps with the following sibling). (Pointer alternative: **drag the bullet** — see *Drag to reorder / re-parent*.)
- **Response:** the node swaps position with the adjacent sibling at its level, carrying its subtree; the cursor stays on the node.
- **Visual/layout:** the bullet (and its subtree) moves past the adjacent sibling.
- **Edge cases:** move-up/down act among siblings at the same level, ignoring whether a sibling has children — the node swaps past the whole adjacent sibling (its subtree included), and the moved node carries its own subtree with it. (Drag reorders too, and additionally re-parents — see *Drag to reorder / re-parent*.)
- **traces (capability):** `UP-1.reshape` — reorder & re-nest a Node (identity-preserving)
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Drag to reorder / re-parent

- **Trigger:** press on a node's **bullet** and drag it (pointer). `[live-check pending: whole-bullet vs a drag-handle affordance]`
- **Response:** the node, carrying its whole subtree, follows the pointer; releasing commits. Dropping **between siblings** reorders it to that position; dropping **onto / into another node** (the pointer moving beneath a target) **re-parents** it under that node.
- **Visual/layout:** the dragged node follows the pointer; a **drop indicator** marks the target — a between-line for a sibling drop vs a nested position for a re-parent drop. `[live-check pending: exact drop-indicator affordance + the between-vs-into threshold]`
- **Edge cases:** re-parenting is **cycle-safe** — a node cannot be dropped into its own subtree (rejected). The whole subtree travels with the dragged node. Same underlying effect as the keyboard Reorder / Indent gestures, reached by direct pointer manipulation. `[live-check pending: cycle-rejection feedback; Safari HTML-DnD rendering quirks]`
- **traces (capability):** `UP-1.reshape` — reorder & re-nest a Node (identity-preserving)
- **traces (manner):** `UX-direct.outline` — reshape the outline in place by direct manipulation · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Zoom into a Node

- **Trigger:** `Cmd`+`.` to zoom in; `Cmd`+`,` to zoom back out. Or **click the Node's bullet** to zoom into it. `[live-check pending: click-bullet-to-zoom]`
- **Response:** the focused node becomes the panel's top — it "becomes a full page" — showing only that node and its subtree. The zoom-root renders as an **editable header** (see *Edit a Node's content*, *Create a Node*), not a static title.
- **Visual/layout:** breadcrumbs at the top of the panel show where the node lives; leave the zoom via the zoom-out key or by **clicking a breadcrumb segment**, which zooms out to that ancestor Node. `[live-check pending: breadcrumb click zooms to ancestor]`
- **Edge cases:** — (any node, including a nested one, can be zoomed).
- **traces (capability):** `UP-1.outline` — address a single Node
- **traces (manner):** `UX-direct.outline` — act on the Node in place

### Expand / collapse

- **Trigger:** `Cmd`+`↓` to expand, `Cmd`+`↑` to collapse the focused node's children. Or **click the disclosure chevron** beside the bullet to toggle. `[live-check pending: chevron click toggles expand/collapse]`
- **Response:** the node's successors show or hide beneath it in place; the node itself stays put and stays focused.
- **Visual/layout:** the bullet's disclosure indicator reflects expanded vs. collapsed state.
- **Edge cases:** expanding a node with no children reveals a **pending node** — a placeholder where no node yet exists, shown by a grey bullet (vs. the black bullet of a real node); typing into the pending node brings it into existence.
- **traces (capability):** `UP-1.outline` — address a single Node
- **traces (manner):** `UX-direct.outline` — act on the Node in place · `UX-immediate.gesture` — effect shown at once

### Create a mirror / instance (multi-location)

- **Trigger:** Tana has **no separate multi-parent gesture**. A node is shown in a second location by inserting a **reference** to it (the @-mention below) and expanding that reference inline to reveal its content there.
- **Response:** the referenced node appears in the second location as a live, edit-through instance drawing from the same node id; an edit at either place updates the one underlying node.
- **Visual/layout:** the second appearance is a reference (optionally expanded in place to show the subtree).
- **Edge cases:** this is the **owner + reference** model, not a structural multi-predecessor edge — Tana satisfies the multi-location *capability* via references while diverging from a true multi-parent substrate (a reference-vs-target divergence the DXOS design can close more directly, since the SIP substrate is natively multi-predecessor). Edit-through confirmed 2026-07-10 via tana-local MCP: editing the referenced Node updated its reference (shared id, one underlying Node).
- **traces (capability):** `UP-1.multi-location` — one Node shown in two places · `UP-4.edit-through` — an edit flows to the one shared Node · `UP-1.stable-under-edit` — the reference survives edits to its target
- **traces (manner):** `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Insert inline reference (@-mention)

- **Trigger:** Type `@` in a node's content; an inline search list opens at the cursor. (On an empty node: `@` → `Enter` to select a node, then `Space` to turn it into an inline reference.)
- **Response:** Typing keywords filters the list live; `Enter` selects the target and inserts an inline reference at the cursor, editing continuing in place. `Cmd`+`Enter` instead creates a new node in the Library and inserts a reference to it. With text selected first, `@` then `Enter` inserts the reference using the selected text as its **alias**.
- **Visual/layout:** The reference renders inline as an **atomic** linked token showing the target's title — cursoring into it from the surrounding text selects the whole reference (a rounded-rectangle highlight); it is **not** editable in the text flow. Being a *"carbon copy"* of the target's id, the token always displays the target's current title, and edits made to the target (at its source or in an expansion panel) update every reference of it.
- **Edge cases:** Any node is reachable as the target by keyword search, including one nested beneath others — the reference stores the target's **stable id**, so it resolves to exactly that node, not an enclosing container. Selecting text before `@` aliases the reference to that text; `Cmd`+`Enter` creates-and-references a brand-new Library node. A **plain click** on the token (no modifier) navigates to / opens the target Node — `Option`-click and `Shift`-click instead expand it (see *Embed / expand a reference inline*). `[live-check pending: plain-click navigates to target]`
- **traces (capability):** `UP-2.link` — link from within a Node's content · `UP-3.any-node-target` — target any Node, incl. nested
- **traces (manner):** `UX-inflow.link` — reference within the typing flow · `UX-inflow.address` — reach any target within the gesture · `UX-immediate.gesture` — effect shown at once

### Copy link to a Node

- **Trigger:** open the command line (`Cmd`+`K`) and type `get html` to filter to **Copy node link (HTML formatted)** (command `get html link to node`); or use the inline toolbar's 🔗 (link) action.
- **Response:** a link to the exact focused node is produced (e.g. `Tana Outliner node [nodeID]: [title]`), resolving to that node's stable id.
- **Visual/layout:** command-line palette / inline toolbar.
- **Edge cases:** works for any node, including one nested beneath others — the link carries the node's own id, so it resolves to that node, not a container.
- **traces (capability):** `UP-3.any-node-target` — address any Node, incl. nested
- **traces (manner):** `UX-immediate.gesture` — effect shown at once

### Backlinks view

- **Trigger:** automatic — open or focus a node; there is no gesture to author it.
- **Response:** the node's footer shows a **References** section listing every node that references it, as breadcrumbs of where those references live. It also surfaces **unlinked mentions** with a **Link** button to convert them into references.
- **Visual/layout:** the References section at the node's footer.
- **Edge cases:** the References set is populated by reverse traversal with no author-created return link; unlinked mentions remain separate until the user presses **Link**.
- **traces (capability):** `UP-2.backlinks-view` — what-links-here on a Node
- **traces (manner):** `UX-immediate.gesture` — populated at once, no return link authored

### Embed / expand a reference inline

- **Trigger:** `Option`+click a reference expands it in a transient panel anchored **below the referrer** (above the referrer's own children), showing the referenced node and its subtree, with an ✕ to close. `Shift`+click instead opens the referenced node **zoomed in an adjacent panel** (a separate viewer). Confirmed live 2026-07-10.
- **Response:** the panel renders the referenced node's content and children; because references share the node's id, an edit made within the expansion edits the one underlying node (edit-through), and the expansion reflects later changes to it.
- **Visual/layout:** `Option`+click → a bordered panel inserted between the referrer's line and its children, with a close ✕ (its child renders inside, pending-node grey bullet included); `Shift`+click → the node opens zoomed in an adjacent side panel.
- **Edge cases:** `Cmd`+`↓` does **not** expand a reference — it expands/collapses the focused node's own children (see *Expand / collapse*). Tana has **no truly in-text-flow transclusion**; reference expansion is panel-based, and the collapsed inline reference is an atomic token — not editable in the flow (cursoring in selects the whole reference). Editing the target happens at its source or in an expansion panel, never through the inline token. Expansion is on demand, so a linked-edge cycle through the target does not expand unboundedly. Edit-through confirmed 2026-07-10 via tana-local MCP (an edit to the source Node propagated to its reference; shared id).
- **traces (capability):** `UP-4.embed` — render a reference inline · `UP-4.edit-through` — an edit flows to the one shared Node
- **traces (manner):** `UX-direct.expand` — expand the reference in place · `UX-immediate.gesture` — effect shown at once

### Undo

- **Trigger:** `Cmd`+`Z`.
- **Response:** reverses the last gesture — a structural move, a reference insertion, or a content edit — returning the store to the state immediately before it.
- **Visual/layout:** — (no distinct surface).
- **Edge cases:** gesture-granular — one gesture, one undo step — over a complete history (undo is not coarsened to whole-session or whole-document).
- **traces (capability):** (rides on the gesture undone)
- **traces (manner):** `UX-reversible.undo` — gesture-granular undo

## Dispositions

No orphans: every behavior above cites ≥1 `UP-*`/`UX-*` id. Tana's above-floor
features (supertags as typed objects, typed fields, calendar/search nodes) are
out of scope by the SUP appendix and are not documented here. The multi-location
behavior records one reference-vs-target divergence (owner+reference, not a
native multi-predecessor edge) — noted in that entry, not an orphan.

SUP coverage: every core SUP capability req is cited by a behavior above —
including `UP-1.author` (create / edit / remove a Node), realized by the three
elementary-lifecycle behaviors — except `UP-1.any-content-type` — interaction
with non-text Nodes (drawings, audio, widgets) — which has no dedicated behavior
in this floor pass and is deferred to a follow-up observation.

Open live-checks (reopened by the capture-method sweeps): the elementary
lifecycle specifics (Enter sibling-vs-child rule; Backspace merge target + child
re-parenting; in-place header edit) and the pointer affordances (click-bullet
zoom, click-chevron expand/collapse, breadcrumb-click navigate, plain-click
reference navigate, drag-to-reorder / re-parent) are flagged `[live-check pending]` inline. They are described
at Tana's standard-outliner semantics but not yet confirmed in a live session —
grep `live-check pending` to list them.

Transclusion nuance (for S3, and a possible S2 refinement): Tana realizes
`UP-4.embed` / `UX-direct.expand` by **panel** expansion — `Option`-click opens
a panel below the referrer; `Shift`-click opens a separate zoomed panel — not
rendering inside the text flow. The neutral `UX-direct.expand` ideal ("in place,
not a separate viewer") is met by the `Option`-click panel but not by
`Shift`-click. Further, the collapsed inline reference is an **atomic token** —
not editable in the text flow (cursoring in selects it whole); edit-through
happens at the target's source or in an expansion panel, never by editing the
inline token. So Tana realizes `UP-4.embed`'s edit-through via the panel, not
via an editable inline rendering. Whether S2 should distinguish *in-flow inline*
expansion from *panel* expansion is an open question for review.
