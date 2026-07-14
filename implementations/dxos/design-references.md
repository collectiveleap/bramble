<!-- derives-from: [UP-2, UP-4, UP-5, IP-2, IP-3, IX-inflow, IX-direct]; role: target; status: current -->

# References / embed / backlinks — settled sub-design

The storage/model fork this doc was opened to resolve is **closed**. Multi-location and
mentions are realized over the **kind-typed `Edge`** of `design.md §1`; the narrative is
`design.md §3`. This doc holds the settled decisions, the reuse anchors, and the build
decomposition (the S4 → S5 bridge).

## Settled model (recap; authoritative in `design.md §1`/§3)

- **Two relationships, one edge family.** A node appearing elsewhere *as a node* =
  **co-location** (a `kind: structural` `Edge` — real multi-parent, editable, backlinks via
  `targetOf`). A **mention inside another node's text** = a `kind: linked` `Edge` + a
  **positional marker** in the text (kept in sync). Distinct relationships (N1), both reified
  edges.
- **No structured-span content model** — plain text + positional markers; the marker pairs
  with the linked `Edge`. The earlier A-vs-B "RefSpan" question is moot: the linked edge is a
  reified `Edge`, not a bare in-text `Ref`.
- **Collapsed mention is atomic** (`IX-direct.reference-atomic`); the target is edited via its
  secondary view. Editable-collapsed is an above-floor option, not built (T1).
- **Secondary view = one renderer, two placements** (`UP-5`): inline-expand (below the mention)
  and open-beside. Per-occurrence, on-demand, cycle-safe (`IP-3.expand` / `may-cycle`).
- **Backlinks = grouped union** via `targetOf` — structural ("appears under") + linked
  ("mentioned in"), `UP-2.backlinks-view`. No `referencedBy` path.

## Verified reuse anchors (DXOS research 2026-07-13)

- **`@`-picker:** `popover()` + `EditorMenuProvider` + `useEditorMenuOptions`
  (`@dxos/react-ui-editor`), driven by an `onLinkQuery` like
  `plugin-markdown/src/hooks/useLinkQuery.ts` — queries candidate objects, inserts on select.
  **The exemplar to copy** — adapt it to emit a linked `Edge` + marker, not a markdown URL.
- **Chip:** `xmlTags` + `AnchorWidget` (`@dxos/ui-editor`) — the inline collapsed chip.
- **Secondary-view renderer:** `plugin-markdown/src/components/PreviewComponent` —
  `<Surface.Surface type={AppSurface.Section} data={{ subject, … }} limit={1} />`, target
  resolved via `space.db.makeRef(uri)` + `useResolveRef` (`@dxos/react-client/echo`). **One
  instance mounted at both placements** (inline-expand + open-beside).
- **Edge:** the existing Bramble `Edge` relation, extended with `kind`; backlinks via `targetOf`
  (the `parentEdges`-style reverse traversal already in the plugin).
- **Do NOT reuse:** `ui-editor/extensions/mention.ts` (unused) or
  `react-ui-chat/.../references.ts` (`@deprecated`).

## Build decomposition (S5 plans → I1 / I3 / I4)

- **I1 — content + edge model.** `Edge` gains `kind` (structural | linked); the linked edge's
  target endpoint; the positional text marker + marker↔edge sync helpers (insert / delete);
  a backlinks helper (`targetOf` grouped by kind). Co-location substrate (I2) is already built.
- **I3 — mention slice.** `@`-picker → create the linked `Edge` + insert the marker; atomic chip
  render; the **secondary-view** component (`PreviewComponent`/Surface) mounted at inline-expand
  + open-beside, with the per-occurrence cycle-safe expansion guard.
- **I4 — backlinks panel.** The "Mentioned in" companion: the grouped-union view over `targetOf`
  (structural + linked).

Each becomes a `writing-plans` plan under `implementations/dxos/plans/`, derived from this
sub-design + `design.md §1`/§3.
