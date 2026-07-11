# Design — Neutral-spec accommodation of typed Nodes (move-up)

Date: 2026-07-11
Status: draft (approved in brainstorming; awaiting spec-review)
Topic: amend the neutral spec (SIP/SUP) so it explicitly *accommodates* — permits,
without requiring — a Node carrying a schema-type (a named type with typed
fields), so a type-rich implementation (DXOS/ECHO) can lean on its type system
with the spec's blessing. A **move-up**: a downstream finding (Composer's rich
typed-object system) revising an upstream neutral artifact.

## 1. Purpose & trigger

While surveying Composer for S3, its **Create Object** picker exposed a rich
schema-type system (Document, Table, Sketch, Person, Outline… backed by ECHO
`EntityKind` + `org.dxos.type.*`). Tana has the analogue (supertags). The neutral
spec currently calls this "**Tana's exclusive layer … above the floor**" — but it
is not Tana-exclusive; the target (DXOS) has it too. The spec should be able to
take advantage of an implementation's types.

**Decision (from brainstorming): accommodate, not require — option (b).** Permit a
Node to be typed, and reframe typed objects from "Tana-exclusive" to an
**admitted optional extension**; do not force type-poor systems (Roam/Obsidian
core) to grow a type system.

## 2. The distinction this rests on

Two different "type" concepts; the spec treats them oppositely today:
- **content-type** — the *medium* of a Node's content (text/drawing/audio). In the
  floor, open + uniform (`IP-1.content-type`).
- **schema-type** — a *named type with typed fields* classifying a Node
  (Person/Task/Document). Currently excluded ("Tana-exclusive").

Composer's "types" are **schema-type**. `IP-1.content-type` does **not** already
cover it (its examples are media). So accommodation needs a genuinely new
permissive statement. Naming stays neutral: keep "content type" for the medium;
use "**schema-type**" / "typed Node" for the classification — never
"supertag"/"ECHO type".

## 3. The changes (all approved)

### 3.1 SIP (`spec/internal-primitives.mdl`)

Add to `feat IP-1`'s `desc`:
> A Node MAY additionally carry a schema-type — a named type with typed fields —
> that classifies it. Typing is optional: it does not change what a Node is, and
> every primitive in this spec applies to a typed Node exactly as to an untyped one.

Add a req (sibling to `IP-1.content-type`; same uniformity spine, plus
optional/additive):

```mdl
  req IP-1.typed-node:
    given: a Node that carries a schema-type (a named type with typed fields), in a system that supports typing
    then:
      - the typed Node is a Node like any other — identity, structural and linked edges, addressing, and expansion apply to it unchanged by its type
      - typing is optional and additive: a Node with no type is equally first-class, and adding or removing a type preserves the Node's identity and its incident edges
    probes:
      - Can a Node in X carry a named type with typed fields, or is every Node untyped?
      - If X has typed Nodes, are they addressable, nestable, linkable, and embeddable the same as untyped Nodes — or does typing move them into a separate object space outside the outline/graph?
      - Does adding or removing a Node's type preserve its identity and incident edges?
```

It is an **accommodation invariant**: conditional on typing existing (type-poor
systems satisfy it vacuously), and its load-bearing clause — *typing does not move
a Node into a separate object space outside the outline/graph* — is exactly what
blesses typed ECHO objects as outline rows.

### 3.2 SUP (`spec/user-primitives.mdl`)

Reframe the resolution-rule caveat — from:
> "Tana's *exclusive* layer — supertags as typed objects, typed fields, calendar/search nodes — sits ABOVE this floor and is not table-stakes."

to:
> "Layers ABOVE this floor are not table-stakes: **typed objects** (a Node carrying
> a named type with typed fields — e.g. Tana's supertags, DXOS's ECHO types;
> *accommodated* by the SIP's `IP-1.typed-node` but not required) and
> calendar/search nodes. Candidate capabilities plausibly table-stakes but
> unverified as shared (daily-note/journal, search/query) live in the appendix."

Add an appendix candidate-extension entry:
> **Typed objects.** A Node carries a named type with typed fields that classifies
> it — a Person with an email, a Task with a status. In DAG terms, a Node bearing
> a schema; every Node primitive still applies (SIP `IP-1.typed-node`). *(Verified
> for both Tana's supertags and DXOS's ECHO types — stronger cross-system evidence
> than the Tana-only extensions above. Optional, not floor, because type-poor
> systems (Roam/Obsidian core) lack it.)*

### 3.3 README (`spec/README.md`)

- Decision-log item 1: drop typed objects from the "Tana's exclusive layer"
  parenthetical (leave calendar/search).
- Decision-log item 6 ("content type is open"): add a companion line noting the
  **schema-type accommodation** (`IP-1.typed-node`) — distinct axis from content
  medium.
- "The model in one breath" and any other mention: scrub the "exclusive" framing.
- `grep spec/` for `exclusive`/`supertag` and fix every stale mention in the same
  commit (canon-partition: retired framing does not linger in-scope).

## 4. Move-up mechanics (per FLOW.md adaptation protocol)

1. **Log** under FLOW.md *Pending propagations*: new `IP-1.typed-node`.
2. **Amend** SIP + SUP + README (§3).
3. **`grep -r "IP-1" spec/ implementations/`** → downstream hit:
   `implementations/dxos/gap-analysis.md` (verdicts `IP-1.*`). Mark **needs-review**
   and add the `IP-1.typed-node` verdict: **pass** — ECHO's typed objects are `Obj`s
   of `EntityKind.Object` with full identity/edges/addressing (see that file's
   `IP-1.content-type` finding); typing is additive via schema. One-line add, not a
   re-run.
4. **Clear** the pending propagation once the verdict lands; advance FLOW.

## 5. Downstream effect

Feeds **S4**: the Bramble outliner plugin may model **outline rows as typed ECHO
objects** (first-class Nodes bearing a schema) *with the neutral spec's blessing*
— combining the node-per-row requirement (S3 conclusion) with ECHO's type system.

## 6. Alternatives considered

- **(a) Require** typed objects in the floor — rejected: forces type-poor systems
  to grow a type system; over-reaches "table-stakes".
- **(c) Fuller model** — specify field types / schema identity / required fields —
  rejected: drifts toward "require" and over-specifies for a permit.

## 7. Non-goals

- Not defining a field-type taxonomy or schema-identity rules (that's the
  implementation's freedom).
- Not mandating typing; not changing `IP-1.content-type` (content medium) — a
  distinct axis.
- Not touching the four floor capabilities; typed-node is an accommodation
  invariant, not a fifth capability.
