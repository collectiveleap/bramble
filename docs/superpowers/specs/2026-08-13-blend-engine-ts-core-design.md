<!-- derives-from: [Blend Engine — Architecture baseline v1 (Tana tGDlxwUz1xLa); action Tana Hn-h3Df7yukD; project Tana W1tme3Gb6Cz_]; role: target; status: draft -->

# Blend Engine — TypeScript Core (v1) — Design

## Summary

A system-agnostic TypeScript implementation of the Bramble blend engine
(Fauconnier & Turner Conceptual Blending, regimented — see the Architecture
baseline v1 in Tana, node `tGDlxwUz1xLa`). v1 builds the **deterministic core**
in real code and puts every non-deterministic (cognitive) decision **behind a
typed seam** that is stubbed by an oracle for tests and wired to Claude later.

The guiding correction that produced this design: we must not *simulate*
determinism on top of a non-deterministic substrate (Claude). Determinism lives
in code; cognition is contained behind interfaces and its outputs are gated.

The package depends on **`effect` only** (no `@dxos/*`), so the same core runs
in Node/tests today, in a Tana script, and later inside DXOS Composer through a
thin adapter.

- **Package:** `packages/blend-engine`
- **Runtime:** pure TypeScript, no I/O in the core; tested with vitest.
- **Cognition in v1:** oracle-injected (deterministic). Claude wired in later
  behind the same seam.

## Key decisions (log)

Each is a decision we settled during brainstorming; rationale is kept because
the *why* is the durable part.

- **D1 — Neurosymbolic split.** Deterministic operations are pure code; cognitive
  operations are typed interface methods. Determinism is structural: if an
  operation does not require the `Cognition` service, its result cannot vary.
- **D2 — All-in on Effect.** The blend-state is defined in **Effect Schema**
  (the shape ECHO already uses, so it ports to Composer); services and their
  swappable implementations use Effect's `Context.Tag` / `Layer`; operations and
  the scheduler are `Effect` programs. Verified: DXOS ECHO core and the existing
  Bramble plugin are built on `effect` v3 (Schema pervasively; Context/Layer in
  ECHO core).
- **D3 — Frames are recruited by completion, not pre-supposed.** This is the
  CB-faithful reading: *completion* is the CB operation that recruits a
  background frame to complete an emergent pattern. Inquiry → Response → Warrant
  arises because each stage leaves a pattern that recruits the next frame
  (question-pattern → Inquiry; reply-pattern → Response; assertion-pattern →
  Warrant). Nothing is pre-loaded. (Supersedes the earlier "pre-supposed frames"
  framing; the Tana two-input model and baseline "two doors" note were updated
  accordingly.)
- **D4 — The sequence is emergent, via a state-driven scheduler.** A monotonic
  fixpoint loop runs any operation whose inputs are ready until quiescence. The
  Inquiry→Response→Warrant order is the topological order of data-dependencies,
  never a written-down pipeline. Feedback (a Warrant rebuttal creating a new gap;
  residue looping back to recruit) is just more pending work.
- **D5 — No "network definition" as input.** In this architecture the
  integration network is the *emergent output*, not an input you hand in. A run
  takes only what every blend needs: its **inputs**. (Frames, arrangement, and
  network type are all emergent, so defining a network up front would re-import
  the very stipulation we removed.)
- **D6 — Purpose is a governing pressure, not an input.** CB treats purpose as
  the **Relevance principle** among the governing/optimality principles — a
  constraint that biases recruitment, selective projection, clash resolution,
  and elaboration. It is provided as `GoverningPressures`, read by the cognitive
  operations; it is never an input space.
- **D7 — `#BrambleIntegrationNetwork` is retired.** Its job (pre-defining a
  frame arrangement) is deprecated by D3–D6. Retirement plan (content-preserving)
  to be proposed before any Tana change.
- **D8 — The frame catalog is `#BrambleFrame`, reached through a port.** The
  catalog is external, live, and extensible; the core reads it through the
  `FrameCatalog` service. A `Recruited when` field will be added to the
  `BrambleFrame` supertag to carry each frame's completion cue (authored,
  inspectable, auditable). Schema change to be proposed before applying.
- **D9 — Inputs come from Tana through the adapter.** `#discuss` question nodes
  and `#statement` nodes map to core input elements. A statement's grounding
  `#quote` node id becomes its provenance `sourceRef` — which is exactly what the
  provenance gate checks. Tana's grounding quotes are the provenance backbone.
- **D10 — One medium adapter per medium.** Tana now, ECHO later. The core never
  learns the medium; adapters do all I/O.

## Architecture

Four parts and two service groups.

- **State** (`state/`) — the blend-state as Effect Schema (below). Pure data.
- **Operations** (`ops/`) — the eight operations as `Effect` programs;
  deterministic ones need no service, cognitive ones require `Cognition`.
- **Scheduler** (`scheduler/`) — the fixpoint loop that drives operations to
  quiescence, then gates and settles.
- **Ports** — services the core depends on, provided as Layers:
  - `Cognition` — the cognitive seam (oracle in tests, Claude later). *The
    cognitive substrate — orthogonal to the medium.*
  - `FrameCatalog`, `Sink`, and input loading — the **medium boundary** (Tana
    now, ECHO later).
  - `GoverningPressures` — relevance/purpose + the resolve-strategy backbone.

Entry points:

```ts
// core — fully general; no Tana, no post-call vocabulary
const runBlend = (inputs: InputSpace[]) =>
  Effect.Effect<BlendResult, BlendError, Cognition | FrameCatalog | GoverningPressures>;

// Tana adapter — scenario-driven wrapper: materialize inputs, run, sink
const runFromTana = (cfg: { inputs: NodeId[] }) => Effect.Effect<BlendResult>;
```

A run is invoked with inputs and a governing-relevance pressure; different
scenarios are simply different inputs. (The four regression baselines are four
different scenarios, including a non-post-call double-scope blend — the core
cannot be post-call-specific and still pass its own tests.)

## Blend-state schema

The "must not get wrong" core. Domain-neutral: nothing named
Inquiry/Response/Warrant appears here — those are frames whose outputs ride in a
tagged annotation slot, which is what lets simplex, mirror, and double-scope all
fit without reshaping. (Code blocks throughout are illustrative sketches —
shorthand like `id, name` stands for `id: Schema.String` — not compile-ready.)

```ts
const Provenance = Schema.Struct({
  origin: Schema.Literal("said", "cognition", "operator", "mechanical"),
  sourceRef: Schema.optional(Schema.String), // grounding id, e.g. a statement's #quote node id
  time: Schema.String,
});
const Stamp = { provenance: Provenance, scaffolding: Schema.Boolean }; // on every element

const Role    = Schema.Struct({ id, name, expectedKind: Schema.optional(Schema.String), ...Stamp });
const Element = Schema.Struct({ id, content, boundRole: Schema.optional(Schema.String), ...Stamp }); // raw value if unbound
const Frame   = Schema.Struct({ id, name, roles: Schema.Array(Role),
                                cue: Schema.String, ...Stamp }); // cue = the completion trigger (from "Recruited when")
const InputSpace = Schema.Struct({ id, elements: Schema.Array(Element),
                                   frame: Schema.optional(Frame), // pre-framed input: matter may arrive framed
                                   priorBlend: Schema.optional(Schema.String), ...Stamp }); // recursion chain

const Mapping = Schema.Struct({ id, from, to,
                 kind: Schema.Literal("identity","analogy","role-value","change"), ...Stamp });

// frame-specific outputs (coverage/directness/kind-match, Toulmin verdict) ride here, NOT in the core:
const FrameAnnotation = Schema.Union(InquiryAnnotation, ResponseAnnotation, WarrantAnnotation /* extensible */);

const Projection   = Schema.Struct({ id, role, value, annotations: Schema.Array(FrameAnnotation), ...Stamp });
const EmergentItem = Schema.Struct({ id,
                       kind: Schema.Literal("composition","completion","elaboration","compression"),
                       content, ...Stamp });
const Clash = Schema.Struct({ id, kind: Schema.Literal("value","frame"), role: Schema.optional(Schema.String),
                candidates: Schema.Array(Schema.String),
                resolution: Schema.Struct({ outcome: Schema.Literal("resolved","held-tension"),
                              value: Schema.optional(Schema.String), rationale, strategy }), ...Stamp });
const ResidueItem = Schema.Struct({ id, element,
                     classification: Schema.Literal("anomaly","noise"),
                     frameCandidate: Schema.optional(Schema.String), ...Stamp });

const BlendState = Schema.Struct({
  id, inputs: Schema.Array(InputSpace),
  generic: Schema.optional(Schema.Struct({ roles: Schema.Array(Role), ...Stamp })),
  mappings: Schema.Array(Mapping), projections: Schema.Array(Projection),
  emergent: Schema.Array(EmergentItem), organizingFrames: Schema.Array(Schema.String),
  clashes: Schema.Array(Clash), residue: Schema.Array(ResidueItem),
  networkType: Schema.optional(Schema.Literal("simplex","mirror","double-scope")), // derived, never input
});
```

**Input-level frames vs recruited frames.** An `InputSpace` may arrive
pre-framed — its own matter is already structured (e.g. the personal-finance
input in the double-scope run). That is different from the blend's *organizing*
and *evaluation* frames (Inquiry/Response/Warrant), which are recruited by
completion. Recruitment applies only to unframed content.

**Reads-against** (a Warrant rebuttal naming another unknown, linking gap→gap) is
a reference inside the `WarrantAnnotation`, not a new core edge type.

**Durability** — the Post-call network maps entirely onto generic slots: gap →
open `Role`; statement → raw-value `Element`; coverage → presence of a
`Projection`; claim → the projection's value + provenance; two statements one gap
→ `Clash(value)`; Warrant verdict → `WarrantAnnotation`; anomaly/noise →
`ResidueItem`; simplex/mirror/double-scope → derived `networkType`. Nothing
reshaped.

## Operations and ports

An operation is an `Effect`; only its *cognitive* part touches a service. Per-op
split (this is the baseline's determinism classification, made mechanical):

| Operation | Mechanical part | Cognitive part (→ `Cognition`) |
|---|---|---|
| `add-input` | register the space | — |
| `recruit-frame` | cue-precondition (structural match) | semantic match: `recruitFrame(pattern, catalog)` → frame or miss |
| `build-generic` | simplex: copy shared roles | double-scope: `abstractGeneric(frames)` |
| `map-counterparts` | already-bound + identity | raw free-text: `matchCounterparts(elements, roles)` |
| `selective-project` | project-all default; miss→anomaly | genuine selection: `selectProjections(candidates, pressures)` |
| `resolve-clash` | value-clash by hard-rule | frame-clash / weighted / hold-tension: `resolveClash(clash, purpose)` |
| `compose/complete/elaborate/compress` | change→delta | run-the-blend: `elaborate(state, activeFrame)` |
| `settle` | provenance gate + discard scaffolding + write sediment | — |

Refinement folded back to the baseline: matching a *raw statement* to a gap is
semantic, so it is a `Cognition` call — the mechanical/cognitive line sits at "is
the element already bound," not at the operation.

`elaborate` is **frame-aware**: run with the Response frame active it emits
`ResponseAnnotation`s; with Warrant active, `WarrantAnnotation`s. This keeps the
eight operations fixed and generic — frames supply what `elaborate` produces —
so Response/Warrant are not new operations.

Services (all provided as Layers; oracle for tests):

```ts
interface CognitionApi {
  recruitFrame(unframed: Element[], catalog: Frame[], trigger: Trigger): Effect.Effect<FrameOrMiss>;
  abstractGeneric(frames: Frame[]): Effect.Effect<Role[]>;
  matchCounterparts(elements: Element[], roles: Role[]): Effect.Effect<Mapping[]>;
  selectProjections(candidates: Candidate[], pressures: Pressures): Effect.Effect<{ project: Projection[]; residue: ResidueItem[] }>;
  resolveClash(clash: Clash, purpose: Purpose): Effect.Effect<Resolution>;
  elaborate(state: BlendState, activeFrame: Frame): Effect.Effect<{ emergent: EmergentItem[]; annotations: FrameAnnotation[] }>;
}
class Cognition extends Context.Tag("BlendEngine/Cognition")<Cognition, CognitionApi>() {}

interface FrameCatalogApi { listFrames(): Effect.Effect<Frame[]>; getFrame(id: string): Effect.Effect<Frame>; }
class FrameCatalog extends Context.Tag("BlendEngine/FrameCatalog")<FrameCatalog, FrameCatalogApi>() {}

// GoverningPressures: relevance/purpose + the resolve-strategy backbone (optimality-shaped weights)
class GoverningPressures extends Context.Tag("BlendEngine/GoverningPressures")<GoverningPressures, PressuresApi>() {}
```

**The provenance gate** is a pure function inside `settle`: a claim whose
`origin` is `"said"` with no `sourceRef` resolving to a real element is dropped
and recorded as dropped. This is the regression backstop for the two founding
bugs ("ran short", "managed both hires") — they carry no `sourceRef`.

## The scheduler

Monotonic fixpoint. Each operation exposes `pending(state)` (is there work of my
kind left?) and a `run(state)` that only *adds* what is missing.

```ts
interface Operation {
  name: string;
  pending: (s: BlendState) => boolean;
  run:     (s: BlendState) => Effect.Effect<BlendState, never, Cognition | FrameCatalog | GoverningPressures>;
}

const runBlend = (inputs: InputSpace[]) =>
  Effect.gen(function* () {
    let s = seed(inputs);
    let fuel = MAX_ITERATIONS;
    while (true) {
      const ready = OPERATIONS.filter((op) => op.pending(s)); // fixed registry order
      if (ready.length === 0) break;                          // quiescence
      const before = signature(s);
      for (const op of ready) s = yield* op.run(s);           // sequential = reproducible
      if (signature(s) === before) break;                     // pending but no progress → stop
      if (--fuel <= 0) return yield* Effect.fail(new SchedulerStuck({ state: s }));
    }
    return settle(gate(s));                                   // deterministic close
  });
```

**Recruited walk (Post-call):** only question-content present → `recruit-frame`
recruits Inquiry → gaps; gaps + statements → `map-counterparts`; mappings →
`selective-project` (leftovers → residue); a reply-pattern now exists →
`recruit-frame` recruits Response; → `elaborate(Response)`; asserted claims now
exist → `recruit-frame` recruits Warrant; → `elaborate(Warrant)`; residue →
`recruit-frame` ladder (match → apply; miss → anomaly); nothing pending → gate →
settle. `recruit-frame` fires repeatedly; the order is just which pattern comes
into being. One door, one operation, for core frames and residue alike.

**Guarantees:** determinism (only `Cognition` varies; with an oracle a run is
byte-identical); termination (monotonic ops over a finite universe + the
signature progress-check + the `fuel` guard, which turns any pathological loop —
a real risk once Claude is live — into a typed `SchedulerStuck`); sequential
execution on purpose (reproducible, not concurrent).

## Medium boundary (Tana adapter)

The core depends on `effect` only; all medium I/O lives in a Tana adapter with
three jobs:

- **Load inputs.** `#discuss` node → raw-content `Element`
  (`provenance.origin = "operator"`, `sourceRef = discuss node id`). `#statement`
  node → raw-value `Element` (`provenance.origin = "said"`,
  `sourceRef = grounding #quote node id`; the asserted/hypothetical marker rides
  as an attribute). Inputs are materialized and handed to `runBlend` — a snapshot,
  so a run is reproducible.
- **`FrameCatalog`.** Query `#BrambleFrame` nodes → core `Frame`s (fields →
  roles; `Recruited when` field → cue; description → semantics). A run snapshots
  the catalog at start.
- **`Sink`.** Write settle output (coverage gaps, residue/anomalies, sediment)
  back to Tana. Beyond v1's core tests; noted, not built yet.

The one scenario-specific extensibility point is **element extractors**
(node-type → `Element`), keyed by node-type and reusable across scenarios. The
run's inputs name which extractor each source uses. The core never sees them.

`EchoAdapter` later mirrors these three jobs; the core is untouched.

## Testing

Because the only non-determinism sits behind the services, the core is fully
testable with oracles (vitest, pure TS, Node):

- **Oracle-driven determinism.** Tests supply `OracleCognition` +
  `OracleFrameCatalog` + a fixed `GoverningPressures`; `runBlend` is then
  reproducible with no Tana, no Claude.
- **Four baseline runs as regression fixtures** — Run 1 simplex, Run 2 mirror,
  Run 3 mixed, Run 4 double-scope ("digging your financial grave"). Four
  *different scenarios*; enforces generality.
- **Provenance-gate regression** — the two founding bugs encoded as claims with
  no valid `sourceRef`; assert the gate drops them.
- **Determinism test** — same inputs + oracle twice → identical `BlendResult`.
- **Emergence tests** — Inquiry→Response→Warrant ordering arises with no
  hardcoded sequence; feedback loops fire (warrant→new gap re-triggers
  projection; residue re-triggers recruit).
- **Termination test** — a non-progressing oracle yields a typed
  `SchedulerStuck`, not a hang.
- **Port-contract tests** — one conformance suite per service, so real
  `TanaFrameCatalog` / `ClaudeCognition` are later checked against the same
  contract as the oracles.

## Out of scope for v1

- Live Claude cognition (the `ClaudeCognition` Layer). Wired later behind the
  same seam.
- The ECHO/Composer adapter.
- The Tana `Sink` (writing results back).
- The cognitive *forms* of the combination operators — v1 implements the
  mechanical/deterministic forms; the cognitive forms are stubs behind the seam.

## Spec/vocabulary changes this design requires

Already applied in Tana (grounded by the CB completion argument + Steve's
decisions):

- Two-input model child `8-Qj0Is5EXT5`: "Pre-supposed frames" → "Recruited
  frames (catalog, content-driven by completion …; not pre-supposed)".
- Action Steps `XR2UyrCPFjmz`: "with the three frames pre-supposed" → "recruited
  by completion (content-driven)".
- Baseline "Two doors" `o9p4oNuhp1kF`: appended that the organizing frames are
  recruited by completion, not only residue.

To be proposed before applying:

- Add a `Recruited when` field (plain text) to the `BrambleFrame` supertag.
- Retire `#BrambleIntegrationNetwork` — content-preserving plan for each tagged
  node (notably the Post-call node `JqzPgEOQ_GZC`, whose baseline content is
  kept).

## Traceability

- Architecture baseline v1 — Tana `tGDlxwUz1xLa`.
- Action — Tana `Hn-h3Df7yukD`; project — Tana `W1tme3Gb6Cz_`.
- Frames — Inquiry `EdHO8_LSSCHA`, Response `HWQLMxnu0CYU`, Warrant
  `4GzrRJbCKmxv` (catalog members, `#BrambleFrame`).
- Post-call network (to be retired as a definition) — Tana `JqzPgEOQ_GZC`.
