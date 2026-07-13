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
workspace — daily note `Q5eOIZHXjKaV` (and the Demo-content template
`M4sBLGdFNfSP` for the description line and tag colour) — harvested 2026-07-11,
Brave/Chromium. Each element records its real source selector as an **evidence
anchor** (not a reproduction instruction).

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
  - `subtext` — `oklch(0.639 0.0002 240)` (node description line)
  - `border` — `oklch(0.896 0.0000065 240)` (faint hairline: expansion-panel border)
- **Accent** — `rgb(41 125 217)` (reference-blue: inline references *and* external links share it)
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
- **Renders:** the expand/collapse affordance on a Node → traces `UP-1.outline` · `IX-direct.outline` (act on the Node in place)
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

### Inline reference chip (atomic token)
- **Renders:** an inline reference to another Node → traces `UP-2.link` (link from within content) · `IX-inflow.link` (reference in the typing flow)
- **Typography:** `body` — 15px / 21px / w400 · no underline
- **Color:** `accent` — rgb(41 125 217) (reference-blue)
- **Box:** padding 0 · transparent bg · no border/radius — an atomic inline token (see `user-experience.md`)
- **Evidence:** `.inlineelement.inlinerefnode.inlineinteractive`

### Reference bullet (variant)
- **Renders:** the bullet on a referenced Node → traces `UP-2.link`
- **Box:** 15×15 (bullet geometry as normal) · **Evidence:** `.bullet.isReference…`

### Node description (subtext line)
- **Renders:** a Node's description line → traces `IP-1` (Node content) · `UP-1.outline`
- **Typography:** InterVariable 12px / 16.8px / w400
- **Color:** `subtext` — oklch(0.639 0.0002 240)
- **Evidence:** description `.editable`

### Reference expansion panel (Option-click)
- **Renders:** the inline expansion of a reference — a panel below the referrer → traces `UP-4.embed` (render a reference inline) · `IX-direct.expand` (expand in place)
- **Border:** 1px solid `oklch(0.896 0.0000065 240)` (`border` token) · **Radius:** 7.5px · **Shadow:** none · **Background:** transparent
- **Box:** scrollable container (~636×433 in the captured specimen)
- **Evidence:** `.Scrollable-module_scrollable__…`

## Elements — out-of-floor (Tana-exclusive chrome; reference detail only)

Anchor to no neutral concept (supertags/tasks/app-nav are outside the SUP floor);
captured for completeness, not required for the reproduction.

### Supertag pill (name + `#` glyph)
- **Typography:** `tag` — InterVariable 12px / 15px / w400 · **Color:** `faint` on the `#` glyph; the *name* renders in the tag's own colour (per-tag rgb, e.g. `#Person` = `rgb(132 81 223)` purple)
- **Box:** `#` glyph padding 0 1.8px · **Evidence:** `.TemplateTag-module_tagIconHash__…`

### External link
- **Typography:** `body` — 15px w400 · no underline · **Color:** `accent` — rgb(41 125 217) (**same** reference-blue as internal references) · **Evidence:** `.inlineelement.inlinerefnode.inlinerefurl…`

### Task done-checkbox
- **Box:** 24×21 · **Evidence:** `.NodeDoneCheckbox-module_container__…`

### Sidebar item
- **Typography:** `chrome` 14px w400 · **Color:** `muted` · **Evidence:** sidebar row

## Specimens — all captured

Every element above is harvested from a live rendered instance. The
reference-dependent specimens (reference chip, reference bullet, expansion panel,
external link) were captured by inserting a real reference — an `@`-mention of an
existing Node — in the sandbox daily note, then `Option`-clicking it for the
panel; the scratch was removed after capture (Demo content was read-only).

## Method note

Computed-style *harvest* is reliable through the browser. **Synthetic keyboard
input is not** — injected `Tab`/`Backspace` do not drive Tana's editor (measured:
`Tab` left a node un-indented at the same x). Structural edits during capture are
therefore done via the **Command-K palette** (reliable command dispatch), and
keystroke facts rest on the operator's hardware confirmations recorded in
`user-experience.md`, not on synthetic re-validation.
