# Bramble

The home for the specifications for Bramble — a system-agnostic specification
of the table-stakes primitives for a networked-notes / outliner / PKM product
class, plus the artifacts that evaluate and implement it against specific
systems.

## Structure

- **`spec/`** — the implementation-neutral specifications: the SIP
  (`internal-primitives.mdl`), the SUP (`user-primitives.mdl`), the
  `gap-analysis-guide.md`, and a spec `README`. Nothing here names a
  particular implementation.
- **`implementations/<system>/`** — implementation-specific artifacts that
  evaluate or implement the spec against a given system (e.g.
  `implementations/dxos/gap-analysis.md`), plus downstream change-specs and
  evolution plans.
- **`docs/`** — design and background material. **`input docs/`** — source corpus.

See `CLAUDE.md` for the layout convention (neutral spec vs. implementation
artifacts).
