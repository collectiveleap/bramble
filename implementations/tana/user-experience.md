# Tana UX realization

<!-- derives-from: [UX-*, UP-*]; role: reference; status: not-started -->

Concrete, isomorphic realization of the neutral interaction spec
(`spec/interaction-primitives.mdl`) by Tana: for each behavior, the observed
trigger, response, visual/layout, and edge cases — each tracing to the SUP
capability (`UP-*`) it realizes and the S2 law (`UX-*`) it exhibits.

## Concreteness bar

An implementer could reproduce each behavior on Composer **without ever watching
Tana** — from this file alone. Per behavior: the trigger, the response, the
visual / layout / feedback, and the edge cases. Values are observed and
verified, never asserted from memory.

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
"manner satisfied?". The first filled entry serves as the worked pattern.

## Behaviors

The behaviors below carry placeholder slots to be filled from Tana observation
in stage R (see `plan/2026-07-10-s2-r-codevelop-plan.md`, Task 3).

### Indent / nest

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-1.outline` — address & nest a single Node
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Outdent

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-1.outline` — address & nest a single Node
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Reorder (move up / down)

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-1.outline` — address & nest a single Node
- **traces (manner):** `UX-direct.outline` — reshape the outline in place · `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Zoom into a Node

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-1.outline` — address a single Node
- **traces (manner):** `UX-direct.outline` — act on the Node in place

### Expand / collapse

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-1.outline` — address a single Node
- **traces (manner):** `UX-direct.outline` — act on the Node in place · `UX-immediate.gesture` — effect shown at once

### Create a mirror / instance (multi-location)

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-1.multi-location` — one Node shown in two places
- **traces (manner):** `UX-immediate.gesture` — effect shown at once · `UX-reversible.undo` — gesture-granular undo

### Insert inline reference (@-mention)

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-2.link` — link from within a Node's content · `UP-3.any-node-target` — target any Node, incl. nested
- **traces (manner):** `UX-inflow.link` — reference within the typing flow · `UX-inflow.address` — reach any target within the gesture · `UX-immediate.gesture` — effect shown at once

### Copy link to a Node

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-3.any-node-target` — address any Node, incl. nested
- **traces (manner):** `UX-immediate.gesture` — effect shown at once

### Backlinks view

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-2.backlinks-view` — what-links-here on a Node
- **traces (manner):** `UX-immediate.gesture` — populated at once, no return link authored

### Embed / expand a reference inline

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** `UP-4.embed` — render a reference inline, edit-through
- **traces (manner):** `UX-direct.expand` — expand the reference in place · `UX-immediate.gesture` — effect shown at once

### Undo

- **Trigger:** _(observe)_
- **Response:** _(observe)_
- **Visual/layout:** _(observe)_
- **Edge cases:** _(observe)_
- **traces (capability):** (rides on the gesture undone)
- **traces (manner):** `UX-reversible.undo` — gesture-granular undo
