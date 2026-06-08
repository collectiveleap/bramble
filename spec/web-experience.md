# Bramble — Web Experience

Bramble's web experience is the outliner the user opens in a browser: a single page that shows their
outline and lets them edit it with the keyboard. It is the human-facing front end for the Bramble Store.

## Web Experience

- On open, the page fetches the full operation log from the store and **folds** it into the current
  outline by applying every operation in order from the first. The fold produces the page's in-memory
  model: a tree of nodes, each with a stable id, its text, an ordered list of child nodes, and a
  collapsed-or-expanded flag.
- Every change the user makes is one operation, applied to the in-memory model immediately — so the
  screen updates with no delay — and appended to the store in the background. The page never reloads;
  reopening it later replays the log and reproduces the same outline.
- Applying an operation locally and appending it must not block typing; if an append fails, the page
  keeps the local edit and shows a small unobtrusive hint.
- The outline renders as nested lines: one line per node, in child order, indented by depth. Each line
  shows its node's text and is editable in place.
- A line whose node has children shows a small marker before it that toggles collapse; a collapsed line
  hides its children. A line with no children shows a plain dot in the same place.
- There is always a faint empty line at the end of the children of the deepest focused node; typing in
  it creates a new child node, and a fresh empty line appears below.
- **Typing** in a line edits its node's text and appends a `set-content` operation carrying the node id
  and the new text.
- **Enter** splits the active line at the caret and appends a `split` operation: the text before the
  caret stays in the current node; a new node holds the text after the caret and becomes the current
  node's next sibling; the caret moves to the start of the new line.
- **Tab** indents the active line and appends an `indent` operation: the line becomes the last child of
  the line just above it at the same level (its preceding sibling), carrying its own children with it.
  A line with no preceding sibling does nothing.
- **Shift+Tab** dedents the active line and appends a `dedent` operation: the line moves up to become a
  child of its grandparent, placed just after its former parent. A top-level line does nothing.
- **Backspace at the start** of a line that has a preceding sibling appends a `join` operation: the
  line's text is appended to the preceding sibling, the line's children move under that sibling, and the
  line's node is removed from the outline; the caret lands where the two texts meet.
- **Backspace in an empty line** appends a `retire` operation removing the node, and moves the caret to
  the line that takes its place.
- **Shift+Enter** appends an `insert-sibling` operation, opening a new empty sibling line just below the
  active line at the same level, and moves the caret there.
- **Up / Down arrows** move the caret to the line above / below in reading order; at the top or bottom
  edge nothing moves.
- **Clicking a line's marker** appends a `set-collapse` operation that toggles whether that line is
  collapsed, and the children show or hide accordingly.
- The design is clean and minimal, legible at reading sizes, usable at desktop width: a light neutral
  background, a readable system font, and clear indentation so depth is obvious. Markers and the caret
  align to a consistent left gutter, and the trailing empty line is faint until typed into. All CSS and
  JavaScript are inline in the page; the page is served at the root path with no build step.
