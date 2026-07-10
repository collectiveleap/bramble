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
