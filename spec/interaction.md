# Bramble — Interaction Grammar

The **medium-neutral interaction grammar**. It binds user gestures to the neutral operations in [editing.md](editing.md), [graph.md](graph.md), and [nodes.md](nodes.md); states focus rules; and says what a view must convey — without committing to a medium (terminal, web, …). Gesture names use the **keyboard as the shared default**, since every target medium has one; a non-keyboard medium rebinds them in its profile. **Per-medium additions and overrides** (exact glyphs, pointer affordances, layout) live in [profiles/](profiles/).

Rendering requirements below say *what must be conveyed*, never *how*. A bullet flagged *(system invariant)* is durable. *Source* lines trace each binding to the PLUGIN.mdl surface requirements it carries.

Throughout, the view tracks an **active occurrence** — one placement `p → N` of a node `N` — and a **caret**, a position within the active node's content. "Focus moves to *X*" means *X* becomes the active occurrence.

## Outline-Editing

**Gestures → operations** (active occurrence `p → N`, caret at position *k*):

- **Enter** → split `N` at *k* (see [editing.md](editing.md#outline-editing)); focus moves to the new node `M` at occurrence `p → M`, caret at its start.
- **Tab** → indent the active occurrence; `N` stays focused. Consumed with no effect when `N` has no preceding sibling under `p` — focus does not leave it.
- **Shift+Tab** → dedent the active occurrence; `N` stays focused. Consumed with no effect at top level.
- **Cmd+Tab** → link the active occurrence under its preceding sibling (the [Graph-DAG](graph.md#graph-dag) link operation: add the edge, keep the existing one).
- **Shift+Enter** → open a pending sibling at the slot just below the active occurrence, at the same predecessor; focus moves there. **Cmd+Shift+Enter** → the same, just above.
- **Backspace at caret start** of a node `M` that has a preceding sibling `N` under `p` → join `N` with `M` (see [editing.md](editing.md#outline-editing)); focus moves to `N` with the caret at the seam. *(Inverse of Enter. The same key retires instead when the node is already empty across every axis — see next.)*
- **Backspace that empties** the active node across every axis → retire it; focus moves to the pending node that takes its place.

**Rendering:**

- A node shows its content when it opens for editing; an empty node shows as empty with a placeable caret, and typing the first character begins building its content (materializing a pending node).
- A pending node renders as not-yet-persisted at its materialization spot; its caret sits on the same baseline as a persisted node's text, not raised above it.
- A trailing pending node is always available at the focused node's body end, after any existing successors, so the list extends without first pressing Enter; it appears whether the focused node is collapsed or expanded, and is the only thing in the body when the focused node has no successors.

*Source: F-3b.1, F-3b.2, F-3b.3, F-3b.4, F-Shift-Enter.1, F-Cmd-Shift-Enter.1, F-Pending-Child.hover, F-Pending-Child.expand, F-Pending-Child.type, F-Pending-Child.cursor-alignment, F-Pending-Child.page-root, F-Pending-Child.sibling-slot; evals T-5, T-6, T-Sibling-Above-Lands-Between, T-Sibling-Below-Lands-Between, T-Backspace-To-Empty-Retires-Node, T-New-Sibling-Focus-And-Caret, T-Page-Last-Node-Has-Pending-Child-Below, T-Pending-Row-Mention-Commit-Attaches-At-Slot. Backspace-as-join is net-new.*

## Collapse-Expand

A node with successors can be collapsed to hide them or expanded to show them; the state is per-occurrence (see [graph.md › Graph-DAG](graph.md#graph-dag)).

- **Toggle marker** → switch the active occurrence between collapsed and expanded. **Mod+ArrowUp** collapses an expanded occurrence that has successors; **Mod+ArrowDown** expands a collapsed one; where collapse/expand does not apply the keystroke falls through to default cursor movement.

**Rendering:**

- Every occurrence shows a marker at a consistent gutter offset; an expanded occurrence with successors draws a vertical guide down through its nested column, and the gutter width is the same across siblings regardless of collapse state so text stays aligned.
- A collapsed occurrence hides its successors and shows a halo on its marker as the lone signal that hidden successors exist; an occurrence with no successors and an expanded one both show a plain marker with no halo, distinguished only by the nested column below.
- A reveal control (chevron) sits immediately before the marker with its slot reserved at all times so layout never shifts; it appears when the pointer is over the occurrence's row and hides when the pointer leaves (unless it holds focus), and activating it toggles collapse the same as the marker. Occurrences with no control show a same-width spacer to stay aligned. The control offers a hint naming the matching shortcut.

*Source: F-V2.1, F-V2.2, F-V2.3, F-V2.4, F-V2.5, F-V2.6, F-V2.6a, F-V2.6b, F-V2.6c, F-V2.10, F-V2.11; evals T-9.*

## Headers

Zooming into a node makes it the **focused node**, rendered as an editable header with its successors below — another view of the same DAG, not a new entity. Editing the header edits the focused node.

- **Enter** in the header → split the focused node at the caret, placing the tail in a new node that becomes the focused node's **first successor** (a split whose new edge lands at the head of the focused node's order); the caret moves to the start of that new successor.
- **Shift+Enter** and **Cmd+Shift+Enter** in the header → nothing: the text is unchanged, the caret stays, and no node is created.
- **ArrowDown** moves the caret from the header to the first successor below (nothing if there are none); **ArrowUp** in the header does nothing; ArrowUp from the topmost successor moves up into the header.

**Rendering:**

- The header shows the focused node's content and inline references in order, each reference showing the referenced node's current label and updating live on rename; an empty focused node shows an "(empty)" placeholder.
- The focused node renders as an editable header with its successors below; activating a successor makes it the focused node and header.
- An empty header shows a muted "Untitled" placeholder where the first character would sit — purely visual, not stored as content, not selectable or focusable; it coexists with the caret (the only focus indicator), hides as soon as the user types, and returns when the header is cleared.
- A focused node with empty content takes header focus automatically with the caret at the start; one with non-empty content does not.

*Source: F-Page-Header.8, F-Headline.1, F-Headline.empty, F-Page-Header.1, F-Page-Header.2, F-Page-Header.4, F-Page-Header.7, F-Page-Header.9, F-Page-Header.10, F-Page-Header.11, F-Page-Header.12; evals T-Headline.*

## Navigation

- Activating an occurrence (e.g. click) → make it the focused node in place: its header and successors fill the current view, with no separate view opened.
- **ArrowUp / ArrowDown** → move the caret to the start of the visible occurrence immediately above / below, crossing occurrences (not lines) and scrolling it into view if off-screen; at the top or bottom edge the caret does not move and the view does not scroll. ArrowDown can move the caret into the trailing pending node, which stays a placeholder until the user types.

**Rendering:**

- Focusing an occurrence (by activation, creation, or arrow navigation) shows exactly one visible caret, positioned as close as possible to where focus occurred and exactly one line tall; the caret is the only focus indicator — no outline, ring, border, halo, or background change is drawn.
- After materializing a pending node by typing, the caret lands after the typed character (typing "1234" yields a node whose content is exactly "1234").
- Activating a row's whitespace (padding or empty end-of-row space, not a control) focuses the editor at the position closest to the activation; it is never silently ignored.
- The view shows a scroll affordance when its content overflows its visible height, and none when it fits.

*Source: F-Open-Pane.regular-click, F-Nav.up, F-Nav.up.edge, F-Nav.down, F-Nav.down.edge, F-Nav.pending-child, F-Caret.1, F-Caret.2, F-Caret.3, F-Caret.4, F-Caret.5, F-Scroll.1, F-Scroll.2; evals T-Caret, T-Caret-margin-click, T-Caret-enter-pending-child, T-Zoom-click-changes-subject.*

## Graph-DAG (sharing surface)

When a node has more than one predecessor, the surface signals it and lets the user navigate predecessors.

- Activating a predecessor in the navigation control → switch the focused node to it in place (the control then reflects the new node's own predecessors); activating it with the "open alongside" modifier opens it alongside.

**Rendering:**

- A node with more than one predecessor shows a small badge of its predecessor count (with a hint naming how many places it appears in), suppressed for a node with one predecessor or none, and present on every occurrence.
- A focused node with predecessors offers a predecessor-navigation control listing every predecessor, labelled by content (unnamed placeholder for empty content), sorted case-insensitively with a deterministic tiebreaker and unnamed predecessors last; it replaces a single-predecessor breadcrumb. With 1–3 predecessors each renders as an inline control side by side; with 4 or more, a single trigger opens the list.
- Indenting or linking a node under a currently-collapsed preceding sibling auto-expands that sibling so the newly placed node is visible; the placed node stays focused with its caret unchanged.

*Source: F-DAG.Phase3e.multi-parent-badge, F-DAG.Phase3e.predecessor-nav-list, F-DAG.Phase3e.predecessor-nav-inline, F-DAG.Phase3e.predecessor-nav-dropdown, F-DAG.Phase3e.predecessor-nav-switch, F-DAG.Phase3e.predecessor-nav-open-pane, F-Indent.auto-expand-parent; evals T-PredecessorNav-click-changes-subject.*

## References-Backlinks

The user creates references through an "@" picker; incoming references are counted as a badge and surfaced in a panel.

- **Type "@"** at the start of a node or after whitespace → open a picker at the caret, listing nodes by label, positioned to stay within view; nodes with no label are omitted, and the node being edited is omitted (no self-reference). Typing more characters narrows the list to labels containing them (case-insensitive substring).
- **ArrowUp / ArrowDown** → move the picker selection by one (wrapping at the ends); the selection is highlighted, pointer hover selects the entry under it (keyboard and pointer share one selection), and it scrolls into view when hidden.
- **Commit** (bare Enter on a selection) → replace the typed "@" and query with an inline reference to the chosen node, add the reference edge, and leave the caret after the reference; with no matches it does nothing while the picker stays open. **Escape** → close the picker, leaving "@" as plain text. Enter pressed with a modifier is swallowed while the picker is open, creating no new node.

**Rendering:**

- An inline reference shows the target node's current label, renders in a link style without an underline, and shows a hover affordance without shifting the surrounding layout.
- A node with at least one incoming reference shows a "[N]" badge inline immediately after its text, wrapping with the last line rather than at a fixed margin; a node with none shows no badge.
- A linked-references panel renders below the focused node, listing each external node's label and the label of the node it references; it shows nothing (no empty header) when no external node references anything within.

*Source: F-4.2, F-4.3, F-4.6, F-4.7, F-V3.1, F-V3.2, F-V4.placement, F-V4.1, F-V4.2, F-V4.3, F-5.2, F-5.3; evals T-7, T-8, T-10.*

## Days

**Rendering:**

- A Day whose date is today shows a header beginning "Today," at full strength; one whose date is yesterday shows "Yesterday," at full strength.
- A Day of any other date shows a short human date — "{short weekday}, {month} {day}" in the current year, or "… {year}" otherwise (e.g. "Wed, May 7" or "Wed, May 7 2025") — at full strength.

*Source: F-Day-Title.1, F-Day-Title.2, F-Day-Title.3; evals T-Day-Title-today.*

## Attachments

- **Drag a file over the outline** → a drop highlight snaps to the specific occurrence (or trailing pending node) under the cursor so a predecessor can be targeted: dropping over an occurrence makes the file's node its successor, over the pending node the last successor of that node, over neither falls back to the focused node. The drop performs the [import-file](nodes.md#attachments) operation.

**Rendering:**

- A file node shows its editable filename with a non-interactive file icon, and remains zoomable with its marker unchanged.

*Source: F-PDF-Upload.chip-rendering, F-PDF-Upload.drop-target-per-row.*

## Host-Substrate Bridge

- For each native host type, the user can browse that type's instances, with those not yet wrapped distinguished from those already in the DAG.
- **Activate a not-yet-wrapped instance** → import it (the [wrap](nodes.md#host-substrate-bridge) operation) and bring it into view. **Activate an already-wrapped instance** → navigate to its existing node.
- **Open-in-host** from a wrapped node → open the host object in the host's own editor/surface.

**Rendering:**

- A wrapped node's field-value successors are revealed when the node is expanded.

*Source: F-Supertag.types-shown.filter, F-6.Phase3b.promote, F-6.Phase3b.promote.reuse, F-Supertag.open-instance-control, F-V2.12 (field group revealed on expand); evals T-Promote-Row-Click-Creates-Wrapper-Under-Today, T-Promote-Row-Click-Reuses-Existing-Wrapper, T-Supertag-open-control-renders, T-Supertag-open-control-click, T-Supertag-open-control-shift-click-pane.*

## Related

- [editing.md](editing.md) · [graph.md](graph.md) · [nodes.md](nodes.md) — the neutral-core operations these gestures invoke.
- [profiles/](profiles/) — per-medium and per-architecture additions and overrides (exact gestures, glyphs, layout, render).
- [../docs/vocabulary.md](../docs/vocabulary.md) — the vocabulary this spec speaks.
