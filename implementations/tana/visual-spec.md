# Tana visual specification

<!-- derives-from: [UP-1, IP-1]; role: reference; status: draft -->

Computed-style capture of Tana's rendered surface, to serve as the **reference
("expected") side** of a `visual-verification` diff: S3/S4 point the skill's
`diff-styles.mjs` at the DXOS/Composer plugin and compare its computed styles
against the values recorded here. Companion to the behavioral realization in
`user-experience.md`.

**Method.** Values are read live from the running Tana web app with
`getComputedStyle` (the `visual-verification` skill's `harvest-styles.js`
shape) — never eyeballed from screenshots. Source: the "Tana With Claude"
workspace (`wsid Q5eOIZHXjKaV`), harvested 2026-07-11, Brave/Chromium. Each
element records its real source selector as an **evidence anchor** (not a
reproduction instruction).

**Traceability** (see the design doc §"visual-spec traceability"): each element
anchors to the neutral concept it *renders* (`UP-*`/`IP-*`); the style **values**
carry no neutral trace, by the spec's divorce-from-rendering rule. Tana-exclusive
chrome (supertag pills, task checkboxes, app navigation) anchors to nothing
neutral and is marked **out-of-floor** — recorded as reference detail, not a
reproduction requirement.

## Design tokens (observed)

The numbers resolve to a small, consistent system:

- **Font family:** `InterVariable` (fallback: `-apple-system, system-ui, "Segoe UI", …, sans-serif`)
- **Type scale:**
  - `tag` — 12px / line-height 15px / weight 400
  - `chrome` — 14px (breadcrumb 14/30, sidebar 14/15.4) / weight 400
  - `body` — 15px / line-height 21px / weight 400
  - `title` — 29px / line-height 33.4px / weight 550
- **Greyscale ramp** (oklch, hue 240, ~0 chroma):
  - `ink` — `oklch(0.283 0.0027 240)` (body + title text)
  - `muted` — `oklch(0.444 0.0009 240)` (breadcrumb, sidebar)
  - `faint` — `oklch(0.606 0.0003 240)` (supertag pills)
- **Surface:** element backgrounds are transparent; the page surface shows through.

## Elements — floor-anchored (Composer must reproduce)

### Outline node row — name text
- **Renders:** a Node's name in the outline → traces `UP-1.outline` (address a single Node) · `IP-1` (Node)
- **Typography:** `body` — InterVariable 15px / 21px / w400
- **Color:** `ink` — oklch(0.283 0.0027 240)
- **Box:** padding 0 · margin 0 · row height ~18px
- **Evidence:** `.editable`

### Bullet
- **Renders:** the addressable Node handle → traces `UP-1.outline` (a Node is individually addressable) · `IP-1` (Node)
- **Color:** `ink`
- **Box:** 15×15
- **Evidence:** `.OutlinerItem-module_bullet__…` (references render a distinct `bullet isReference …` variant — see Pending)

### Disclosure chevron
- **Renders:** the expand/collapse affordance on a Node → traces `UP-1.outline` · `UX-direct.outline` (act on the Node in place)
- **Box:** 15×29 · padding 3.75px 0
- **Evidence:** `.BulletChevron-module_container__…`

### Node title (H1 — the focused Node's name)
- **Renders:** the focused Node's name at the panel top → traces `UP-1.outline` (address a single Node) · `IP-1` (Node)
- **Typography:** `title` — InterVariable 29px / 33.4px / w550
- **Color:** `ink`
- **Box:** margin 0 10px 0 0 · padding 0
- **Evidence:** `.editable.lockedName`

### Breadcrumb
- **Renders:** the zoom/location context above the panel → traces `UP-1.outline` (zoom addresses a Node)
- **Typography:** `chrome` — InterVariable 14px / 30px / w400
- **Color:** `muted` — oklch(0.444 0.0009 240)
- **Evidence:** `.NodeAsDrilldownElement-module_label__…`

## Elements — out-of-floor (Tana-exclusive chrome; reference detail only)

Anchor to no neutral concept (supertags/tasks/app-nav are outside the SUP floor);
captured for completeness, not required for the reproduction.

### Supertag pill (name + `#` glyph)
- **Typography:** `tag` — InterVariable 12px / 15px / w400 · **Color:** `faint` — oklch(0.606 0.0003 240)
- **Box:** `#` glyph padding 0 1.8px · **Evidence:** `.TemplateTag-module_tagIconHash__…`

### Task done-checkbox
- **Box:** 24×21 · **Evidence:** `.NodeDoneCheckbox-module_container__…`

### Sidebar item
- **Typography:** `chrome` 14px w400 · **Color:** `muted` · **Evidence:** sidebar row

## Pending specimens (need a rendered instance, harvest next)

These do not render in an empty daily note; to be captured from existing content
(Demo content / Welcome to Tana):

- **Inline reference chip** (mid-text atomic token) — traces `UP-2.link` · `UX-inflow.link`
- **Option-click expansion panel** (below the referrer) — traces `UP-4.embed` · `UX-direct.expand`
- **Reference bullet** variant (`bullet isReference …`) — traces `UP-2.link`
- **External link** styling (`Tana community`) — out-of-floor chrome

## Method note

Computed-style *harvest* is reliable through the browser. **Synthetic keyboard
input is not** — injected `Tab`/`Backspace` do not drive Tana's editor (measured:
`Tab` left a node un-indented at the same x). Structural edits during capture are
therefore done via the **Command-K palette** (reliable command dispatch), and
keystroke facts rest on the operator's hardware confirmations recorded in
`user-experience.md`, not on synthetic re-validation.
