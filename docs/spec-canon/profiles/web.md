# Bramble Web Client

The **web** realization of the interaction grammar ([../interaction.md](../interaction.md)), delivered the way Phoenix's examples deliver browser UI — **a single HTML page served inline by the server** ([../app/server.md](../app/server.md)), no build step, browser code embedded in the page. The typed, DOM-free core (`GraphDAG` and the operations in [editing.md](../editing.md), [graph.md](../graph.md), [nodes.md](../nodes.md)) is the logic; this profile specifies the **served page** that binds browser gestures to those operations and renders the DAG as an outline. Because all DOM access lives inside the page's script (a string, not a typechecked module), **no DOM type library is required** — matching the examples (cf. `pixel-wars/ui.md`).

Each section says what the served page must do and convey, not how. A bullet flagged *(system invariant)* is durable. *Source* lines trace each section to the interaction-grammar binding it realizes.

## Delivery

- The web client must be a single HTML page served at `GET /` (see [../app/server.md](../app/server.md)), embedding its own styles and script, with no external assets or build step.
- The page's script must hold an in-browser `GraphDAG` instance as the source of view truth: apply each gesture to it, re-render the affected occurrences, and persist the operation to the server. An operation the engine refuses (e.g. a cycle) must leave the page unchanged and persist nothing.
- The typed core modules must stay DOM-free; the served page's script is the only code that touches the document. *(system invariant)*
- On load, the page must fetch the DAG snapshot from the server and render the focused node.

## Outline-Editing

- The page must render the focused node and its DAG as an outline — one editable line per occurrence, in out-edge order, indented by depth.
- **Enter** at the caret must split the active node there (the [split](../editing.md#outline-editing) operation): the text before the caret stays, a new line holds the text after, and focus moves to the start of the new line.
- **Tab** / **Shift+Tab** must indent / dedent the active occurrence; a Tab with no preceding sibling, or a Shift+Tab at top level, must change nothing.
- **Cmd+Tab** must link the active occurrence under its preceding sibling.
- **Shift+Enter** / **Cmd+Shift+Enter** must open a pending line just below / above at the same depth, moving focus there.
- **Backspace** at line start must join into the preceding sibling; Backspace that empties the line across every axis must retire it, focus moving to the pending line that replaces it.
- A trailing pending line must always sit at the focused node's body end; typing the first character into it materializes the node and continues focus there.
- An edit to a shared node must update every visible occurrence of it without moving the edited line's caret or scrolling it.

*Source: realizes [interaction.md › Outline-Editing](../interaction.md#outline-editing); operations in [editing.md](../editing.md), [graph.md](../graph.md).*

## Collapse-Expand

- Each line must show a marker, with a control to toggle the active occurrence's collapse state (e.g. activating the marker); a hover-revealed control may duplicate it.
- A collapsed occurrence must hide its successors and signal that hidden successors exist; an expanded occurrence with successors must show a guide down its nested column; a line with no successors shows neither.
- **Mod+ArrowUp** must collapse an expanded occurrence that has successors and **Mod+ArrowDown** must expand a collapsed one; where neither applies the keystroke must fall through to caret movement.
- Markers must align to a consistent gutter so content stays aligned regardless of collapse state.

*Source: realizes [interaction.md › Collapse-Expand](../interaction.md#collapse-expand).*

## Headers

- The focused node must render as an editable header above its successor lines; activating a successor must make it the focused node and header in place.
- **Enter** in the header must split the focused node at the caret, the tail becoming the focused node's first successor, with the caret moving there.
- **Shift+Enter** and **Cmd+Shift+Enter** in the header must do nothing.
- The header must show the focused node's content with inline references resolved to their targets' current labels, updating live on rename; an empty focused node must show a muted placeholder that is purely visual, disappears on first input, and returns when cleared.
- A focused node with empty content must take header focus automatically; **ArrowDown** must move from the header to the first successor, and **ArrowUp** from the topmost successor must return to the header.

*Source: realizes [interaction.md › Headers](../interaction.md#headers).*

## Navigation

- Activating a line must make it the focused node in place — its header and successors fill the current view, with no separate view opened.
- **ArrowUp / ArrowDown** must move the caret to the start of the visible line immediately above / below (crossing lines, not visual rows), scrolling it into view if off-screen; at the top or bottom edge the caret must not move and the view must not scroll. ArrowDown must be able to enter the trailing pending line.
- A focused line must show exactly one caret as the only focus indicator — no outline, ring, border, halo, or background change.
- Activating a line's whitespace (not a marker or control) must place the caret at the closest position; it must never be silently ignored.
- The outline must scroll when its content overflows its height and not when it fits.

*Source: realizes [interaction.md › Navigation](../interaction.md#navigation).*

## Graph-DAG (sharing surface)

- A node with more than one predecessor must show a small predecessor-count badge on every occurrence, with a hint naming the count; a node with one predecessor or none must show no badge.
- A focused node with predecessors must offer a predecessor-navigation control listing every predecessor, labelled by content (placeholder for empty), sorted case-insensitively with a deterministic tiebreaker and unnamed predecessors last; with 1–3 each renders inline, with 4 or more a single trigger opens the list.
- Activating a predecessor must switch the focused node to it in place; activating with the "open alongside" modifier must open it alongside.
- Indenting or linking a node under a collapsed preceding sibling must auto-expand that sibling so the placed line is visible, keeping it focused.

*Source: realizes [interaction.md › Graph-DAG (sharing surface)](../interaction.md#graph-dag-sharing-surface).*

## References-Backlinks

- Typing **"@"** at line start or after whitespace must open a picker at the caret listing nodes by label (omitting unlabelled nodes and the node being edited), narrowing to case-insensitive substring matches as more is typed.
- Arrow keys must move the picker selection with wraparound; pointer hover must share that selection. Committing a selection must replace the "@" and query with an inline reference, add the reference edge, and leave the caret after it; with no matches it does nothing while the picker stays open. **Escape** must close the picker leaving "@" as plain text; a modified Enter must be swallowed while the picker is open.
- An inline reference must show the target's current label in a link style without an underline, with a hover affordance that does not shift surrounding layout.
- A node with at least one incoming reference must show a "[N]" count immediately after its text; a backlinks panel below the outline must list each external node's label and the label of the node it references, showing nothing when nothing external references within.

*Source: realizes [interaction.md › References-Backlinks](../interaction.md#references-backlinks).*

## Days

- A Day's header and line must show its bound date as a label: "Today," for the current local date, "Yesterday," for the previous day, otherwise a short human date — "{short weekday}, {month} {day}", adding " {year}" outside the current year (e.g. "Wed, May 7" or "Wed, May 7 2025"). The label must be computed relative to the current local date at render time.

*Source: realizes [interaction.md › Days](../interaction.md#days).*

## Attachments

- Dragging a file over the outline must show a drop-target highlight snapping to the line (or trailing pending line) under the pointer: dropping over a line makes the file's node that line's successor, over the pending line the last successor of that node, over neither falls back to the focused node. The drop must perform the [import-file](../nodes.md#attachments) operation.
- A file's line must show its editable filename with a non-interactive file icon and remain zoomable.

*Source: realizes [interaction.md › Attachments](../interaction.md#attachments); operation in [nodes.md](../nodes.md).*

## Host-Substrate Bridge

- The page must let the user browse each native host type's instances, distinguishing instances already wrapped in the DAG from those not yet wrapped.
- Activating a not-yet-wrapped instance must import (wrap) it and bring it into view; activating an already-wrapped instance must navigate to its existing node.
- Expanding a wrapped node must reveal its field-value successor lines; a wrapped node must offer an open-in-host control that opens the host object in the host's own surface.

*Source: realizes [interaction.md › Host-Substrate Bridge](../interaction.md#host-substrate-bridge); operations in [nodes.md](../nodes.md).*

## Styling

- The served page's styles must be embedded — clean and minimal, legible at typical reading sizes, usable at desktop widths, with indentation depth visually clear and markers, badges, and guides aligned to a consistent gutter.
- Exact glyphs, colours, and spacing are page choices and may be tuned without changing behavior.

## Related

- [../interaction.md](../interaction.md) — the medium-neutral grammar this page realizes.
- [../app/server.md](../app/server.md) — the server that serves this page and persists its operations.
- [../editing.md](../editing.md) · [../graph.md](../graph.md) · [../nodes.md](../nodes.md) — the DOM-free operations the page invokes.
