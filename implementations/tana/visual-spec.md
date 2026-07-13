# Tana visual specification

<!-- derives-from: [PX-mark, PX-disclosure, PX-nesting, PX-state, PX-rhythm, PX-theme, UP-1, IP-1]; role: reference; status: current -->

The **reference realization of the presentation primitives** (`PX-*`): Tana's
concrete answer, per concern, to what a surface must present. It is the
"expected" side of a `visual-verification` diff — a target reproduces these
values within a pinned theme. Companion to the behavioral realization in
`user-experience.md`.

**Organized by `PX` concern, not by ad-hoc element.** Every `PX-*` concern below
is answered, including **states** and **both themes** — the completeness sweep the
earlier "capture a few regions" pass skipped (it recorded the bullet's 15px
*hit-area* as "the bullet" and missed the 5px painted dot, the indent step, the
hover states, and the theme axis — the miss that made the plugin not look like
Tana while a 4/4 gate passed).

**Method.** Values read live from Tana web with `getComputedStyle` — never
eyeballed. Source: the "Tana With Claude" workspace (daily note + the "Welcome to
Tana!" guide `LjQXrYsQTlVw` for nested/disclosure/indent). Each concern records
its evidence selector.

**Theme is pinned (`PX-theme`).** Tana's theme follows **macOS time-of-day**, so
colour is theme-unstable; it is captured per theme (toggle: Tana → settings →
"Enable dark mode"). **Geometry is theme-independent** (sizes/spacing are the same
light and dark); only **colour** is per-theme. A target is compared **within one
stated theme**.

## Design tokens (observed)

- **Font family:** `InterVariable` (fallback: `-apple-system, system-ui, …, sans-serif`)
- **Type scale:** `body` 15px / 21px / w400 · `title` 29px / 33.4px / w550 · `chrome` 14px (breadcrumb 14/30)
- **Greyscale (oklch, hue 240, ~0 chroma):**
  - `mark` — `oklch(0.606 0.0003 240)` — the bullet dot; **theme-stable** (same light + dark)
  - `ink` — **light** `oklch(0.283 0.0027 240)` · **dark** `oklch(0.848 0.0000 240)` — body + title text (theme-dependent)
  - `muted` — light `oklch(0.444 0.0009 240)` (breadcrumb, sidebar)
  - `border` — light `oklch(0.896 0.0000065 240)` (faint hairline)
- **Accent** — `rgb(41 125 217)` (reference-blue: inline refs + external links)
- **Surface:** element backgrounds transparent; the themed page surface shows through.

## `PX` concerns — Tana's realization

### `PX-mark` — the Node handle (bullet)
- **Painted dot:** `5px × 5px`, `border-radius: 50%`, `background: oklch(0.606 0.0003 240)` (`mark`, theme-stable).
- **Hit-area:** the dot sits centered in a **15px** transparent slot (`--bulletDiameterOuter`); the visible mark is the 5px dot, *not* the slot. This is the correction — the original spec recorded 15px.
- **Evidence:** `span.bullet::after` (dot) inside `.OutlinerItem-module_bullet__…` (15px slot).

### `PX-disclosure` — expand/collapse affordance (chevron)
- **Slot:** `15px` wide, `font-size: 15px`, `padding: 3.75px 0`.
- **Glyph:** a disclosure triangle, rendered only for a Node **with** successors, and **revealed on hover** (see `PX-state`); a childless Node keeps the slot for alignment but paints no glyph.
- **Evidence:** `.BulletChevron-module_container__…`.

### `PX-nesting` — depth shown by indentation
- **Indent step:** **32px** per structural level; equal depth aligns to the same inset.
- **Alignment:** the handle column aligns to the **top of the first text line** (`align-items: flex-start`), not the vertical centre — matters for multi-line Nodes.
- **Evidence:** bullet `left` at depth *n* vs *n+1* (291.8px → 324px); `.NodeAsListElement-module_main` `align-items`.

### `PX-state` — rest / hover / focus / active
- **Handle reveal:** the `bulletSide` (chevron + drag affordance) is `opacity: 0` at rest, `opacity: 1` on **row hover** (`.hideBullet:hover .bulletSide`). The dot itself stays visible at rest.
- **Mark active:** `.bullet:active { transform: scale(0.9) }`.
- **Row / editable:** `background-color: var(--colorConfigEditorBackground)` on **hover** and on **focus-within** (`.SharedComponents-module_editableWrapper:hover` / `:focus-within`).
- **Evidence:** the `:hover` / `:active` / `:focus-within` rules above (harvested from Tana's stylesheets).

### `PX-rhythm` — gutter + spacing
- **Gutter:** the panel carries `padding-left: 24px` — content is **not** flush to the surface edge.
- **Handle↔text gap:** **7.5px** (`.NodeAsListElement-module_main` `gap`).
- **Evidence:** `.Scrollable-module_scrollable` `padding-left`; row `gap`.

### `PX-theme` — theme-relativity
- **Text (`ink`)** resolves per theme: light `oklch(0.283 0.0027 240)`, dark `oklch(0.848 0.0000 240)`.
- **Mark (`mark`)** is theme-stable: `oklch(0.606 0.0003 240)` in both.
- **Capture is pinned:** geometry is captured once (theme-independent); colour is captured per theme; a target is diffed within one stated theme (never across).
- **Evidence:** `.editable` `color` under each theme (Tana theme = macOS time-of-day; toggle in Tana settings).

## Out-of-floor (Tana-exclusive chrome; reference detail only)

Anchors to no neutral concept (supertags/tasks/app-nav are outside the SUP floor);
recorded for completeness, not required for reproduction.

- **Supertag pill:** `tag` 12px / 15px / w400; `#` glyph `mark` colour; name in the tag's own colour. `.TemplateTag-module_tagIconHash__…`
- **Reference bullet:** `.bullet.isReference` — dashed 1px border in the tag colour.
- **Task checkbox:** `.NodeDoneCheckbox-module_container__…` (24×21).
- **Inline reference / external link:** `body` 15px, no underline, `accent` `rgb(41 125 217)`.

## Companion mapping

The `visual-verification` mapping `visual/tana-outline.json` carries these values
as the diff's expected side; the target mapping is
`implementations/dxos/visual/composer-outline.json`. Both are pinned to a stated
theme and must cover **every `PX-*` concern** above (not a region subset) — that
coverage requirement is the FLOW delivery-gate upgrade (U4).
