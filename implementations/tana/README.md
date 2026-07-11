# Tana — reference realization

<!-- derives-from: [UX-*, UP-*]; role: reference; status: not-started -->

Role: **reference** — an existing system documented as a concrete, complete
realization of the neutral specs, to serve as the exemplar the target
reproduces. Authored by observation, not built.

## Contents (planned)

- `user-experience.md` — how Tana realizes the neutral interaction spec (S2)
  concretely: triggers, response, keystrokes, edge cases — each mapped to its
  `UX-<law>.<application>` req and the `UP-*` capability it realizes.
- `visual-spec.md` — computed-style capture of Tana's rendered surface (the
  reference "expected" side of a `visual-verification` diff), with design tokens
  and per-element entries anchored to the neutral concept each renders.
- `visual/tana-outline.json` — the `visual-verification` mapping (Tana's
  harvested values as `expect`; Composer `app` selectors filled in at S3).

Status: draft (stage R) — behavioral layer authored and live-confirmed in Tana
(all keystroke live-checks closed); visual layer started (core elements
harvested; reference-chip and expansion-panel specimens pending).
