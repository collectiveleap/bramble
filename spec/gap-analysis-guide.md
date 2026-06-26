# Gap-analysis guide — evaluating a system X

How to use the **Specification of Internal Primitives (SIP)** and **Specification of User Primitives (SUP)** to evaluate an existing system X for compliance, produce a gap analysis, and feed the downstream change specs and evolution plan. This guide is the method; the specs are the criteria.

## Inputs

- `internal-primitives.mdl` (SIP) and `user-primitives.mdl` (SUP).
- System X, with enough access to observe its behavior: live use, its docs, its data model, and — ideally — the ability to run the probes hands-on (as the validation runs did against a live Tana workspace).

## Verdict vocabulary

Evaluate each requirement and assign one verdict:

- **pass** — every `then` clause of the req holds of X.
- **fail** — one or more `then` clauses do not hold, and X has no equivalent.
- **partial** — X meets the req only at a coarser grain or in limited cases (record the limit).
- **divergent** — X delivers the req's capability, but via a different internal mechanism than the spec models. Typically appears as a **SIP fail whose traced SUP capability passes**. Record the actual mechanism X uses (e.g. "owner + reference, not multi-predecessor edges").

A req is satisfied only when its conformance test holds as written; a near-miss is `partial` or `fail`, not `pass`.

## Method

1. **Evaluate each req as a conformance test.** Treat the req's `given/(when)/then` as a pass/fail check against X. Read at the spec's altitude — **invariant** altitude for SIP (data-model truths), **user-observable** altitude for SUP (what the user can do and see). Record the evidence behind each verdict; flag any verdict resting on assumption rather than observation.
2. **For every non-pass, run the probes.** The req's `probes:` are the questions that turn a failure into sized work: they reveal what X does instead and what it would take to satisfy the req. A probe answer that doesn't lead to a concrete unit of work means the evidence is still too thin — keep digging.
3. **Evaluate both layers, and use `traces:`.** When an SUP `feat` traces to an internal primitive that X fails, note it. The interesting case is **SUP pass + SIP fail on a traced primitive = divergence**: X reaches the user capability another way. Record it as divergent, not as a contradiction.
4. **Cluster the results.** Group gaps by the primitive that causes them. Respect the SIP dependency: `IP-2.multi-predecessor / shared-identity / acyclic` presuppose `IP-2.direction`, so `IP-2.direction` is the first gap to close when the structural-edge model is absent.

## Output — the gap analysis

Produce, per requirement: the **ID**, the **verdict**, the **evidence**, and — for every non-pass — the **probe answers** and the **sized work** to close it. Then a short **summary**: which clusters pass, which fail, and whether the pattern is "different internal model" (SUP passes, SIP diverges) or "missing capability" (gaps at both layers).

Two reference exemplars from the spec's own validation:

- **Tana** — SUP fully passes; SIP divergent on `IP-2.multi-predecessor` and `IP-2.shared-identity` (owner + reference instead of multi-predecessor edges). Pattern: *different internal model.*
- **Markdown / file model (Obsidian)** — gaps at both layers; passes only `IP-3.cross-reference/may-cycle/backlinks` and `UP-2.*`. Pattern: *missing capability* (no first-class Node identity, no structural-edge model, embeds sync-only not edit-through).

## Onward (downstream of the gap analysis)

The gap analysis, the specs, and X together feed two further artifacts (separate work, not part of this guide):

- **Change specifications** — one per failing or divergent req: the smallest change to X that makes the conformance test hold, scoped using the probe answers.
- **Evolution plan** — the change specs ordered by dependency. Close internal-primitive gaps before the user capabilities that `trace:` to them; within the SIP, close `IP-2.direction` before the structural reqs that presuppose it. A *divergent* verdict is a design decision, not an automatic gap: decide whether to adopt the spec's mechanism or keep X's, and record why.

## Cautions

- Evaluate at the spec's altitude; don't down-convert an SUP req into an implementation check or up-convert a SIP invariant into a UI observation.
- Record evidence for every verdict; mark any claim not directly observed in X so it can be confirmed before a change spec is built on it.
- Treat *divergent* deliberately — it often means X made a reasonable different choice, and forcing conformance may cost more than it returns.
