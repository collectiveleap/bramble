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

### Indent / nest

- **Trigger:** `Tab` on the focused node. `[live-check: exact key binding]` (doc names the operation `indent`)
- **Response:** the node becomes a structural successor of the sibling immediately above it; it and its subtree shift one level right; the cursor stays on the node, editing uninterrupted.
- **Visual/layout:** the node's bullet moves right one indent step, now beneath the preceding sibling.
- **Edge cases:** with no preceding sibling at its level, there is nothing to nest under. `[live-check: no-op vs. rejected when no preceding sibling]`
- **traces (capability):** `UP-1.outline` — address & nest a single Node
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Outdent

- **Trigger:** `Shift`+`Tab` on the focused node. `[live-check: exact key binding]` (doc names the operation `outdent`)
- **Response:** the node detaches from its current owner and becomes that owner's following sibling, one level left, carrying its own subtree; the cursor stays on the node.
- **Visual/layout:** the node's bullet shifts left one indent step.
- **Edge cases:** outdenting a top-level node. `[live-check: no-op vs. some promotion — not stated in doc]`
- **traces (capability):** `UP-1.outline` — address & nest a single Node
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Reorder (move up / down)

- **Trigger:** the `move-up` / `move-down` shortcut on the focused node, or click-and-drag the node's bullet up/down. `[live-check: exact key binding for move-up/move-down]`
- **Response:** the node swaps position with the adjacent sibling at its level, carrying its subtree; the cursor stays on the node.
- **Visual/layout:** the bullet (and its subtree) moves past the adjacent sibling; on drag, the bullet follows the pointer to a drop position.
- **Edge cases:** reordering past a collapsed sibling. `[live-check: moves over the whole collapsed subtree as one unit?]`
- **traces (capability):** `UP-1.outline` — address & nest a single Node
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Zoom into a Node

- **Trigger:** `Cmd`/`Ctrl`+`.` to zoom in; `Cmd`/`Ctrl`+`,` to zoom back out. `[live-check: exact key binding]` (doc confirms zoom + breadcrumbs, not the keys)
- **Response:** the focused node becomes the panel's top — it "becomes a full page" — showing only that node and its subtree.
- **Visual/layout:** breadcrumbs at the top of the panel show where the node lives; leave the zoom via a breadcrumb or the zoom-out key.
- **Edge cases:** — (any node, including a nested one, can be zoomed).
- **traces (capability):** `UP-1.outline` — address a single Node
- **traces (manner):** `UX-direct.outline` — act on the Node in place

### Expand / collapse

- **Trigger:** `Cmd`/`Ctrl`+`Down` to expand, `Cmd`/`Ctrl`+`Up` to collapse the focused node's children. `[live-check: exact key binding]` (doc names the operations `expand`/`collapse`)
- **Response:** the node's successors show or hide beneath it in place; the node itself stays put and stays focused.
- **Visual/layout:** the bullet's disclosure indicator reflects expanded vs. collapsed state.
- **Edge cases:** a node with no children. `[live-check: no-op?]`
- **traces (capability):** `UP-1.outline` — address a single Node
- **traces (manner):** `UX-direct.outline` — act on the Node in place · `UX-immediate.gesture` — effect shown at once

### Create a mirror / instance (multi-location)

- **Trigger:** Tana has **no separate multi-parent gesture**. A node is shown in a second location by inserting a **reference** to it (the @-mention below) and expanding that reference inline to reveal its content there.
- **Response:** the referenced node appears in the second location as a live, edit-through instance drawing from the same node id; an edit at either place updates the one underlying node.
- **Visual/layout:** the second appearance is a reference (optionally expanded in place to show the subtree).
- **Edge cases:** this is the **owner + reference** model, not a structural multi-predecessor edge — Tana satisfies the multi-location *capability* via references while diverging from a true multi-parent substrate (a reference-vs-target divergence the DXOS design can close more directly, since the SIP substrate is natively multi-predecessor). Edit-through confirmed 2026-07-10 via tana-local MCP: editing the referenced Node updated its reference (shared id, one underlying Node).
- **traces (capability):** `UP-1.multi-location` — one Node shown in two places
- **traces (manner):** `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Insert inline reference (@-mention)

- **Trigger:** Type `@` in a node's content; an inline search list opens at the cursor. (On an empty node: `@` → `Enter` to select a node, then `Space` to turn it into an inline reference.)
- **Response:** Typing keywords filters the list live; `Enter` selects the target and inserts an inline reference at the cursor, editing continuing in place. `Cmd`/`Ctrl`+`Enter` instead creates a new node in the Library and inserts a reference to it. With text selected first, `@` then `Enter` inserts the reference using the selected text as its **alias**.
- **Visual/layout:** The reference renders inline as a linked node token showing the target's title. It is a *"carbon copy"* — references share the target's node id, so editing the reference edits the original and every other reference of that node.
- **Edge cases:** Any node is reachable as the target by keyword search, including one nested beneath others — the reference stores the target's **stable id**, so it resolves to exactly that node, not an enclosing container. Selecting text before `@` aliases the reference to that text; `Cmd`/`Ctrl`+`Enter` creates-and-references a brand-new Library node.
- **traces (capability):** `UP-2.link` — link from within a Node's content · `UP-3.any-node-target` — target any Node, incl. nested
- **traces (manner):** `UX-inflow.link` — reference within the typing flow · `UX-inflow.address` — reach any target within the gesture · `UX-immediate.gesture` — effect shown at once

### Copy link to a Node

- **Trigger:** open the command line (`Cmd`/`Ctrl`+`K`) and run **`get html link to node`**; or use the inline toolbar's 🔗 (link) action. `[live-check: exact command-line steps]` (the command label `get html link to node` is doc-confirmed)
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

- **Trigger:** `Shift`+click a reference, or focus it and press `Cmd`/`Ctrl`+`Down`. `[live-check: prior-session notes said Alt/Option-click; canonical doc says Shift+click]`
- **Response:** the referenced node renders inline in place, showing its content/subtree; editing the inline-rendered node edits the one underlying node (shared id, edit-through), and the inline rendering reflects later changes to it.
- **Visual/layout:** the reference expands where it sits — no navigation to a separate viewer.
- **Edge cases:** expansion is on demand (one level), so a linked-edge cycle through the target does not expand unboundedly. Edit-through confirmed 2026-07-10 via tana-local MCP: an edit to the source Node propagated to its reference (shared id); the doc states editing a reference likewise edits the original.
- **traces (capability):** `UP-4.embed` — render a reference inline, edit-through
- **traces (manner):** `UX-direct.expand` — expand the reference in place · `UX-immediate.gesture` — effect shown at once

### Undo

- **Trigger:** `Cmd`/`Ctrl`+`Z`. `[live-check: exact binding]`
- **Response:** reverses the last gesture — a structural move, a reference insertion, or a content edit — returning the store to the state immediately before it.
- **Visual/layout:** — (no distinct surface).
- **Edge cases:** gesture-granular — one gesture, one undo step. `[live-check: confirm granularity, not whole-session/document]`
- **traces (capability):** (rides on the gesture undone)
- **traces (manner):** `UX-reversible.undo` — gesture-granular undo

## Dispositions

No orphans: every behavior above cites ≥1 `UP-*`/`UX-*` id. Tana's above-floor
features (supertags as typed objects, typed fields, calendar/search nodes) are
out of scope by the SUP appendix and are not documented here. The multi-location
behavior records one reference-vs-target divergence (owner+reference, not a
native multi-predecessor edge) — noted in that entry, not an orphan.
