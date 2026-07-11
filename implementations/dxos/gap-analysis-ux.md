# Gap analysis (UX) — X = DXOS / Composer

<!-- derives-from: [UX-1, UX-2, UX-3, UX-4, implementations/tana/user-experience.md, implementations/tana/visual-spec.md]; role: target; status: authoring -->

Evaluates DXOS / Composer against the neutral interaction spec (S2,
`spec/interaction-primitives.mdl`) **and** the Tana reference realization (R,
`implementations/tana/user-experience.md` behavioral + `visual-spec.md` visual)
— "does Composer reproduce this UX, as Tana does it, and what is the gap?"
Companion to the substrate `gap-analysis.md` (SIP/SUP), which it does **not**
duplicate: this pass owns the *interaction manner* (S2 laws) and the *visual*
(computed-style diff), and discharges that analysis's pending live-UX probes.

Measured against a live Composer build (`localhost:5173`, fresh run) 2026-07-11,
Brave/Chromium. Verdicts: `pass · partial · fail · divergent` (per
`spec/gap-analysis-guide.md`); each behavior carries a **severity** — **deep**
(violates an S2 law) or **cosmetic** (satisfies the law, differs from Tana).

## 1. Framing — Composer's UX surfaces and plugin architecture

Composer is a **plugin composition**: a fresh build boots by *activating plugins*
(observed on the splash: `operation-handler`, `operation-invoker`,
`companion-chat-provisioner`), and surfaces are contributed by plugins registered
through a **Plugin Registry** (left rail → Plugins; categories Official / Enabled
/ Recommended / Labs / Registry). So "the gap" is not one surface's gap — it is
*which enabled plugin, if any, contributes each behavior*, and what no plugin
covers.

**Observed shell (live):**
- **Navtree** (left): Personal Space → Welcome, Settings, Collections (› Getting
  Started › README), Database, DevTools. Whole-object nodes; nesting is
  collection membership.
- **Left rail plugins:** App menu · Space · **Plugin Registry** · App Settings ·
  DevTools · Account.
- **Right rail surfaces (companions):** Help · Search · Trace · Stats · Database.
- **Markdown editor surface** (opening README): a formatting toolbar — Paragraph,
  Bold/Italic/Strike/Code, **Link**, Bullet/Numbered/**Task** lists, Block quote,
  Code block, Table, image/embed, and a **Markdown-mode** toggle; foldable
  heading chevrons in the gutter.
- **Enabled plugins (partial, via Registry → Enabled):** Assistant, Calls, Code,
  Debug, Feed, Gallery, Game, Inbox, Iroh Beacon, … (full enumeration TODO — see §3).

**Surface map — where each R behavior could live** (from the substrate analysis
§1 + live survey). This is the spine of §2:

| R behavior | Candidate Composer surface(s) | Substrate-analysis capability verdict |
|---|---|---|
| Indent / outdent / reorder / zoom / expand | **Outliner** (thin: Text blob, no per-row id) | `UP-1.outline` **partial** |
| Multi-location (one node, two places) | Collections / navtree | `UP-1.multi-location` **partial** |
| Insert inline reference (`@`) | **Markdown** `@` popover → `[label](dxn)` | `UP-2.link` **pass** |
| Copy link to a node | Markdown link / object URI | `UP-3.any-node-target` **partial** |
| Backlinks view | **"Related"** companion panel | `UP-2.backlinks-view` **partial** |
| Embed / expand a reference inline | **Markdown** block embed `![label](dxn)` | `UP-4.embed` **pass**, `UP-4.edit-through` **pass** |
| Undo | app-wide | (untested) |

**The load-bearing framing (per the target steer):** the one *outline-structured*
surface — the **Outliner** — is **thin** and **not the destination**: its content
is a single `Ref(Text.Text)` blob, rows are CodeMirror-decorated markdown lines
with no ECHO identity, and per-row addressing is an unimplemented TODO
(`gap-analysis.md` §1; `UP-1.outline` partial). The capabilities Bramble needs
(in-flow `@`-link, edit-through block-embed, "Related" backlinks, multi-location)
live on the **Markdown + Stack/Collection** surfaces instead. So reproduction is
expected to be a **composition across surfaces or a new plugin**, not the
Outliner — the gap analysis must attribute each behavior to the surface that
actually carries it, and treat "the outliner plugin" as one thin data point.

## 2. Per-behavior findings (behavioral × manner)

For each R behavior: the Composer surface, the **capability** verdict (carried
from `gap-analysis.md`, then live-confirmed here), the **manner** verdict against
the S2 law (`UX-direct/inflow/immediate/reversible`), severity, evidence, and
sized work. **TODO — author by driving each gesture in the live build.** Skeleton
below; the `@`-mention entry will be worked first (deep) for review, then batched.

_(to author — one entry per R behavior, mirroring `gap-analysis.md` §2 shape:
verdict · confidence · finding · manner-against-S2 · live probe · sized work)_

## 3. Plugin / surface survey (does an existing plugin close the gap?)

The core of the target steer. **TODO:** enumerate the full enabled plugin set via
the Registry; for each R-behavior gap, record which plugin (if any) closes it,
partially closes it, or leaves it open. Content-surface plugins to check
(named in `gap-analysis.md` §1): Markdown/Document, Collections/Stack, Board,
Table, Sketch, File, Outliner. Output: a coverage table — gap × closing-plugin ×
residual work — so S4 knows what to compose vs. build new.

## 4. Visual diff (computed-style)

**TODO:** fill the Composer `app` selectors in
`implementations/tana/visual/tana-outline.json` (currently `TODO(S3)`), harvest
Composer's computed styles with the `visual-verification` harvester, and run
`node ~/.claude/skills/visual-verification/diff-styles.mjs tana-outline.json
<actual>.json`. Report each delta as deep (wrong colour family / missing rule /
≥2px) or cosmetic, per the skill's triage. Composer renders its own design
system; expect systematic deltas from Tana's InterVariable / oklch tokens.

## 5. Pattern classification (to complete)

**TODO:** after §2–§4, classify the overall UX gap — "reproduce by
composing/configuring existing plugins" vs. "needs a new plugin surface" — and
cluster by behavior family (outline manipulation vs. reference/embed vs. visual).

## 6. Onward

Feeds **S4 · DXOS design** (`implementations/dxos/design.md`): the worklist of
what the Bramble plugin must add or compose to reproduce Tana's UX on Composer,
ordered by the substrate dependencies from `gap-analysis.md`.
