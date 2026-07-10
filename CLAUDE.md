# Bramble repo — agent guidelines

Bramble is a **system-agnostic specification** of the table-stakes primitives
for a networked-notes / outliner / PKM product class, plus the artifacts that
evaluate and implement it against specific systems.

## Layout convention (implementation-neutral vs. implementation-specific)

Keep the two layers strictly separated:

- **`spec/` is implementation-neutral.** It holds only the system-agnostic
  specifications and their method — the SIP (`internal-primitives.mdl`), the
  SUP (`user-primitives.mdl`), the `gap-analysis-guide.md`, and the `README`.
  Nothing in `spec/` may name or depend on a particular implementation
  (DXOS, Tana, Obsidian, …). An invariant clause must read the same whether a
  system stores the substrate as files, rows, or objects.

- **`implementations/<system>/` is implementation-specific.** Each candidate
  system gets its own folder holding the artifacts that evaluate or implement
  the spec against it — the gap analysis today (`implementations/dxos/gap-analysis.md`),
  and downstream change-specs and evolution plans as they are produced.

A gap analysis, change-spec, or any system-specific finding is **not** spec
material — it belongs under `implementations/<system>/`, never in `spec/`.
This mirrors the general working preference that a gap analysis identifies
whether a primitive exists as-is and is filed separately from the neutral
spec (see `canon/gap-analysis-identifies-not-solves.md` in the
`alright-whats-next` repo).

## Other

- `docs/` holds design/background material (conceptual foundations, lineage,
  scenarios, vocabulary). `input docs/` holds source corpus.

## Flow management

Read `FLOW.md` first — it is the living spine for the whole flow (neutral spec →
reference realization → gap analysis → design → plan → plugin) and records where
work currently stands. The operating model is specified in
`plan/2026-07-10-flow-management-spine-design.md`.

- **Two loops.** `FLOW.md` is the persistent outer loop across all stages and is
  where the flow is moved up/down. Software-dev stages (design, plan, build) use
  the superpowers cycle (brainstorming → writing-plans → executing-plans) as an
  inner loop scoped to one stage; plan files live under
  `implementations/<target>/plans/` and are linked from `FLOW.md`.
- **Roles under `implementations/<system>/`.** A folder is either a *reference*
  realization (an existing system documented as an exemplar — e.g. Tana) or a
  *target* being built (e.g. DXOS). Record the role in the folder `README` and in
  `FLOW.md`.
- **Traceability header.** Every downstream artifact opens with:
  `<!-- derives-from: [<upstream req IDs>]; role: reference|target|neutral; status: not-started|draft|current|needs-review -->`.
  Reverse lookup for a changed req is `grep -r "<req-id>" spec/ implementations/`.
