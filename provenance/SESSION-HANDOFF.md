# Session Handoff — Bramble spec/eval migration + Phoenix run

Durable capture so the next session can resume cold. **Marks clearly what is on disk vs. agreed-in-conversation-but-not-yet-written.** Out of `spec/` on purpose (Phoenix only ingests `spec/`).

---

## 1. What this project is

Migrate `input docs/PLUGIN.mdl` (a DXOS/Composer Tana-reimplementation spec, 43 feats / 223 reqs / 101 tests) + the `docs/*` conceptual canon into a **Phoenix-style spec+eval corpus** for **Bramble** — "Tana without tag-on-node" — such that a regenerative pipeline (Phoenix) can regenerate Bramble against **any** target architecture (DXOS included). Phoenix = Chad Fowler's regenerative VCS at `~/sandbox/phoenix` (cloned, built); essays at https://aicoding.leaflet.pub.

Core stance (from `docs/conceptual-foundations.md`): **tag-on-node is the architectural error**; framing/lenses → **frame / frame application** (blend). Supertags are removed; the lens lineage is re-expressed as frames.

---

## 2. On-disk state (what exists)

- **`spec/`** — the neutral spec, **normative `must` prose**, organized by capability with nested `### Behavior` / `### Surface` subsections:
  - `editing.md` (Outline-Editing, Collapse-Expand, Headers, Navigation)
  - `graph.md` (Graph-DAG, References-Backlinks, Versioning, The-Bramble)
  - `nodes.md` (Days, Attachments, Host-Substrate Bridge, Import)
  - `frames-run.md` (the Run frame — isolated blending seam; has a "Deferred" note on frame-application gesture + DXOS realization)
  - `profiles/dxos.md` (the DXOS architecture profile — ECHO binding of Host-Substrate Bridge + "bindings to be completed")
  - ⚠️ **These are NOT yet neutralized** — they still contain gesture/surface language ("Pressing Tab must nest…"). The §5–7 refactor below rewrites them.
- **`provenance/`** — `S1-classification.md` (every req/test → Phoenix primitive + stance), `S1-non-spec-inventory.md` (types/components/rules/flags), `considered-and-removed/tag-on-node.md` (the quarantine + re-home ledger, reconciled).
- **`docs/`** — conceptual canon (vocabulary, conceptual-foundations, architecture-rationale, features, principles, scenarios, etc.) + `docs/to-be-done.md` (deferred: broader blending, frame-application gesture, create-new-host-object, Tana-supertag import).
- **`src/generated/`** — Phoenix-generated TypeScript modules. **Real (usable):** `graph/graph-dag.ts` (570L, a complete `GraphDAG` class — the working Bramble core engine), `editing/{collapse-expand,headers,navigation,bramble-editing-viewing}.ts`, `dxos/*` (4). Plus scaffold `index.ts`/`server.ts`/`*.test.ts` (generic, not app servers).
- **`bramble-demo.ts`** (repo root) — a runnable demo driving the generated `GraphDAG` through split/indent/multi-parent/cycle-prevention/collapse. **Runs:** `cd ~/sandbox/bramble && node bramble-demo.ts` (Node 24 strips types natively; zero deps).
- **`.phoenix/`** — Phoenix state. Currently reflects the **option-3 split plan** (25 IUs incl. `… — Behavior`/`… — Surface`); the canonical nested `spec/` was restored after. Regenerable; ignore inconsistencies.
- **`/tmp/phoenix-bin/claude`** — the hardened wrapper (see §8). `/tmp/spec-canonical-backup/` — backup of the 3 core specs.

---

## 3. ACTIVE THREAD — DAG-baseline neutralize-and-extract — ✅ DONE (written to files)

**Status: EXECUTED.** `docs/vocabulary.md` carries the DAG baseline + both principles (§4); `spec/{editing,graph,nodes}.md` are neutralized to occurrence-scoped operations (no `### Behavior`/`### Surface`); `spec/interaction.md` is the new medium-neutral grammar. Split fan-out, Join (net-new), and tombstone-Retire (detach-all) are in. Provenance verified — every F-/T- id re-homed to core or grammar, none dropped. **Decisions made:** structural ops (insert-sibling/indent/dedent/link) defined once in `graph.md › Graph-DAG`, content ops in `editing.md`; retire = detach-all tombstone. **Deferred per Steve (2026-06-06):** `frames-run.md` (blend layer) and `profiles/dxos.md` (arch profile) keep their old Behavior/Surface structure for now. The design record below is retained for reference.

The problem we found: the spec's `### Surface` sections leaked **medium/architecture concerns** (Tab, click, glyphs, caret) into the behavioral core. Phoenix intentionally separates **behavior** (durable, arch-neutral) from **architecture** (selectable per regen — its examples put `server`/`ui`/`api` in separate arch-layer specs). So our move:

1. **Neutralize the core** (`editing/graph/nodes.md`): strip all gesture/render language; restate as **occurrence-scoped DAG operations**. Drop the `### Behavior`/`### Surface` split.
2. **Extract surface → `spec/interaction.md`**: a **medium-neutral interaction grammar** (gesture→operation bindings + focus rules + what-the-view-must-convey). Per the user: keep it medium-neutral now; **per-medium additions/overrides come later** as `spec/profiles/{terminal,web}.md`.
3. Capabilities that are *entirely* surface today (Navigation/caret, Headers rendering, drag indicators, Day labels) move wholesale to the grammar; the DAG/refs/versioning/collapse-state/bridge/frames keep only neutral operations in the core.

Target spec architecture:
- `spec/{editing,graph,nodes}.md` → neutral operations
- `spec/interaction.md` → medium-neutral interaction grammar
- `spec/profiles/{dxos,terminal,web}.md` → arch/medium-specific (render, app/server, overrides)

---

## 4. DAG terminology baseline + design principles (AGREED — write into `docs/vocabulary.md`)

The substrate is a **directed acyclic graph**: **nodes** + directed **structural edges**.

- Edge `p → c`: **p = direct predecessor of c**, **c = direct successor of p**.
- A node's **out-edges are ordered**. **Siblings** = direct successors of the same predecessor; **preceding sibling** of `c` under `p` = the successor immediately before `c` in `p`'s order.
- **Ancestor / descendant** = transitive (directed path).
- **In-degree** = number of direct predecessors. **In-degree > 1 ⇒ *shared*** (the node appears in multiple places).
- **Occurrence** = one in-edge `p → n` (one placement). The view renders the DAG by walking out-edges in order from a focused root; **each rendered bullet is an occurrence**; a shared node is rendered once per reaching in-edge. **Per-occurrence state** (e.g. collapse) keys on the occurrence.
- "**Parent** of a node" is **ambiguous and must not be used** — a node has a *set* of direct predecessors. Operations name "the direct predecessor *of an occurrence*."
- **Acyclic invariant**: no directed cycle; adding `p → c` is refused when `p` is `c` or a descendant of `c`.

**Two principles that decide operation fan-out** (these are the crux):
- **Content is node-level; structure is edge-level.** → **content-global / structural-local rule**: content operations (set, type, *split*, *join*) change the node and show at **every** occurrence; structural operations (indent, dedent, link, insert-sibling) rewire **one** in-edge.
- **Tombstone-delete (non-destructive).** There is no destructive delete. "Delete" marks a node **tombstoned**: identity + full history retained, removed from active structure (in-edges removed), **never erased**. Tombstoned nodes stay resolvable (pinned refs still render; rollback can revive). Latent in canon already (`vocabulary.md` append-only; Versioning "deletion is non-destructive"). DXOS profile realizes it via append-only ECHO/Automerge (tombstone event, not removal).

---

## 5. Operation definitions reached (occurrence-scoped, DAG terms)

- **Split** node `N` at content position *k*: `N` keeps content before *k*; new node `M` holds content from *k*. For **every in-edge `p → N`**, insert `p → M` immediately after `p → N`. `M` is shared with the **same in-degree as `N`**. (Content edit is node-global → structural fan-out must be global too, or other occurrences lose the tail content. The active occurrence only decides caret/focus, an interaction-grammar concern.)
- **Join** sibling pair `p → N`, `p → M` (`M` is `N`'s immediate following sibling): destination `N` keeps identity; `N.content += M.content` [global]; `M`'s children re-attach under `N` (appended) [global]; `M` is **deleted (tombstoned)**. Valid only when `M` is `N`'s immediate following sibling at **every** occurrence of `N` (i.e. `M` mirrors `N`'s placements — the post-split shape; trivially true when `M` in-degree 1). Otherwise refused. → exact inverse of split.
- **Indent** occurrence `p → N`: with `s` = `N`'s preceding sibling under `p`, replace `p → N` with `s → N` (`N` appended last under `s`); `N`'s out-edges unchanged (descendants follow). Refused if `s` is a descendant of `N`.
- **Dedent** occurrence `p → N` reached via `g → p`: replace `p → N` with `g → N`, just after `p` in `g`'s order. **Needs the parent occurrence `g → p`** (because `p` may itself be shared — `g` can't come from `N` or `p` alone). Generated engine already encodes this: `dedent(grandParentId, parentId, nodeId)`.
- **Link** occurrence `p → N` under preceding sibling `s`: **add** `s → N`, keep `p → N`; `N` in-degree rises (shared). Idempotent; refused on cycle.
- **Insert sibling** at `p → N`: add node `M` with edge `p → M` before/after `p → N`.
- **Retire** (re-audit as tombstone-detach): a node emptied across every axis → in-edges removed (tombstoned), identity/history retained. *Open: remove only the active occurrence's in-edge, or detach all? — decide when batching.*

---

## 6. Worked example (the template for batching) — Outline-Editing

**Neutral core** (`editing.md › Outline-Editing`) — operations only, occurrence-scoped, content-global/structural-local applied: see §5 (split fans out; indent/dedent/insert-sibling occurrence-local; pending materialize; retire tombstones). Plus invariants: out-edge order preserved across ops + on reload; identity/history preserved across split/join/indent/dedent/retire; acyclic always. *Source* lines carry the F-/T- ids (already in current files).

**Interaction grammar** (`interaction.md › Outline-Editing`):
- *Focus*: the view tracks an **active occurrence**; the caret is a position in the active node's content.
- *Gestures→operations*: Enter = split at caret (focus → new node); Tab = indent active occurrence (preceding sibling becomes direct predecessor); Shift+Tab = dedent; Cmd+Tab = link; Shift+Enter / Cmd+Shift+Enter = pending sibling below/above; Backspace-at-start = **join** into preceding sibling; Backspace-empty-across-every-axis = retire.
- *Rendering (what must be conveyed, not how)*: active content shown/editable; empty node shows placeable caret; pending node renders as not-yet-persisted at its materialization spot; a trailing pending node always available at the focused node's body end.

---

## 7. Open questions for the batch — ✅ all resolved

1. **Cross-capability dedup** — RESOLVED: structural ops (insert-sibling/indent/dedent/link) defined once in `graph.md › Graph-DAG`; `editing.md` content ops reference them. Falls along the content-global/structural-local seam.
2. **Gesture abstraction** — keyboard names as shared default; per-medium override in profile. Confirmed.
3. **Retire fan-out** — RESOLVED: **detach-all** (tombstone removes all in-edges; "emptied across every axis" is already a global condition since content is global).
4. **Surface-layer shape** — medium-neutral grammar + thin per-medium render/override profiles. Confirmed, realized in `spec/interaction.md`.

---

## 8. Phoenix run — findings + reproducible setup (so it's not lost)

**How to run Phoenix against `spec/`:** `node` is `~/.proto/shims/node` (v24, native TS); `pnpm` available (no npm). Phoenix built at `~/sandbox/phoenix/dist/`. From `~/sandbox/bramble`: `node ~/sandbox/phoenix/dist/cli.js {init,ingest,canonicalize,plan,regen}`. State in `.phoenix/`. IUs in `.phoenix/graphs/ius.json`. `regen --iu="<exact IU name>"` regenerates one IU (works off `.phoenix` cache, not the spec files — so you can transform spec → plan → restore spec, and regen still uses the planned IUs).

**Local-Claude provider:** env `PHOENIX_LLM_PROVIDER=claude-cli` (overrides API-key autodetect). `claude` binary is the Composer install (`/opt/homebrew/bin/claude` symlink → the .app). The shell PATH lacks it; we put a wrapper on PATH at `/tmp/phoenix-bin/claude`.

**The hardened wrapper** (`/tmp/phoenix-bin/claude`) — three fixes layered, all empirically validated:
- `--strict-mcp-config --no-chrome`: each `claude -p` cold-boots the **full agent** (fetches remote MCP list, loads plugins, opens proxy connections to tana-local + claude.ai Drive/Excalidraw/Gmail) even with `--tools ''`. Stripping MCP made calls **~3–5× faster** (84–325s vs 7–12 min) and far more stable.
- **3× retry** on socket-drop / `API Error`.
- **12-min per-attempt watchdog** (bash, no `timeout` util on macOS).

**Diagnosis (definitive):** the stub/hang causes were **(a)** Phoenix's hardcoded 600s `ETIMEDOUT` (we raised the provider timeout to 60 min and rebuilt); **(b)** MCP/proxy overhead on every call; **(c)** intermittent socket drops on long streams (same large request failed at 598s once, succeeded at 696s) — **NOT** rate-limiting and **NOT** parallel-limiting (4 small calls sequential AND 4 parallel all succeeded). Hang correlates with **IU size**: ≤8 reqs generate fine; ≥11 reqs (Outline-Editing 19, Graph-DAG 12, Host-Bridge 12, Refs 11) are exposed. Graph-DAG (12) *did* complete (570L). Outline-Editing (19) consistently wedged.
- **Process hygiene bit us repeatedly**: pattern-`pkill` failed on the quoted multiline loop command → **two regen loops ran concurrently and clobbered `src/generated`**. Lesson: kill by explicit PID, verify 0 processes before relaunch.
- **Option-3 (split every capability into Behavior/Surface IUs) hit a NEW Phoenix-level hang** — `regen` wedged in post-generation (evidence/scaffold) on the first split IU after the module was written. Not pursued further.

**Net yield:** 10 real generated modules; the `GraphDAG` engine runs (the demo). The smoke test (spec is a valid Phoenix input → real code) was over-proven.

---

## 9. Bigger Phoenix learnings (architecture/interactivity)

- **Phoenix separates behavior from architecture**, architecture selectable per regen ("destroy code, regen for new arch"). Examples: domain specs (`game-engine`, `expenses`, `tasks`) vs arch specs (`server`, `ui`, `api`, `web-client`). Our neutral-core + `profiles/dxos.md` matches this exactly. → validates everything.
- **Phoenix specs name implementation freely** ("server", "HTML Canvas", "port 3000") because those live in the **arch layer** (selectable), not the behavioral domain specs. Our `Tab`/`click` were the same kind of thing (a *presentation* arch binding) wrongly placed in the behavioral core — hence the §3 refactor.
- **Every Phoenix example is client/server; there is NO all-in-browser example** — even todo-app (spec says "no server") generated a Hono + SQLite server. To make Bramble interactive via Phoenix: write `server.md` + `ui.md` (web). All-browser (no server, single `index.html` embedding the zero-dep `GraphDAG`) is trivial to **hand-assemble** but off Phoenix's paved path.
- **What happened to "Tab" in generation**: the *operation* survived (`indent()`); the *gesture* became a doc-comment; "click the chevron" became an abstract `InteractionTarget` enum + action type — i.e. a **Surface req with no medium degenerates into a logic kernel**. This is *why* surface bindings need a real presentation profile.

---

## 10. Next steps (priority order)

1. ✅ **DONE** — DAG baseline + principles in `docs/vocabulary.md`.
2. ✅ **DONE** — neutralize-and-extract batched: `editing/graph/nodes.md` neutralized; `spec/interaction.md` created; split fan-out + join + tombstone-retire in; §7 resolved.
3. **(Deferred, Steve 2026-06-06)** Neutralize `frames-run.md` (blend layer) + extract its surface to the grammar (it still has Behavior/Surface + a `page/row` leak at line 26). `profiles/dxos.md` left as arch-profile (render language allowed there).
4. (Optional) Re-run Phoenix regen against the neutralized spec (cleaner operation language should generate better; smaller neutral IUs avoid the hang).
5. (Optional) Interactive Bramble: either `spec/app/{server,ui}.md` (Phoenix-generated web app) or hand-assemble an all-browser `index.html` on `GraphDAG`.
6. Cleanup if wrapping: `.phoenix/`, `src/generated/`, `/tmp/phoenix-bin` are smoke-test scaffolding; `spec/` + `docs/` + `provenance/` + `bramble-demo.ts` are the keepers.
