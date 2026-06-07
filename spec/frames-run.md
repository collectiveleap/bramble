# Bramble — Frames: the Run Frame (isolated)

> **Scope note.** This document is **isolated from Bramble's core, no-blend capabilities** ([editing.md](editing.md), [graph.md](graph.md), [nodes.md](nodes.md)), which specify "Tana without tag-on-node." The Run frame is the **first concrete frame application** — the seam where Bramble's blending layer begins. The broader frame/blend capabilities (a frame library, frame recommendation, multiple frames over one substrate; see [../docs/features.md](../docs/features.md)) are deliberately **out of scope here and brought in later**. Keep this file separable so the core can be regenerated without the frame layer.

Architecture-neutral behavioral specification for the Run frame, written as plain-language requirements for a regenerative pipeline (e.g. Phoenix) to canonicalize and generate from. Each capability is a `##` section split into `### Behavior` and `### Surface`; each bullet is one requirement; a bullet flagged *(system invariant)* is a durable assertion that must hold in any implementation. *Source* lines trace to PLUGIN.mdl (see [../provenance/S1-classification.md](../provenance/S1-classification.md)).

The substrate is a DAG of nodes and edges (see [../docs/vocabulary.md](../docs/vocabulary.md)). A **frame** is a reusable schema applied to a node via a **frame application** (see [../docs/vocabulary.md](../docs/vocabulary.md), [../docs/features.md](../docs/features.md)). A frame application produces a new view of the DAG via selective projection. The Run frame is the first such frame.

## Frames-Run

A node with the Step frame applied is a reusable unit of work, recursively composed; applying the Run frame to it produces one execution — a "run", rendered as a guided walkthrough view. A run relates to the Step it was created from and, when nested, to its parent run.

### Behavior

- The relationship from a run to its originating Step, and from a child run to its parent run, must be first-class edges, distinct from structural parent/child edges. Structural traversal and cycle detection consider only structural edges.
- Invoking "New Run" on a Step-framed node must create a run with the Run frame applied, related to the originating Step; every Step-framed node nested within gets a child run the same way, related to its parent run, recursing to full depth. The run mirrors the Step's nested structure as a tree of nodes, and focus moves into the new top-level run.
- A run's child runs must be found by following the parent-run relationship, in their recorded order.
- A Run frame application must have an active/open state: starting a run opens it, stopping or marking it done closes it, and reopening it resets the walkthrough's progression.
- Each step's response area must be a full outline of nodes rooted at that step's run node, with the standard outline editing affordances.
- A run mirrors the structure of the Step it was created from. *(system invariant)*

### Surface

- A Step-framed node in focus must offer a "New Run" action; a node without the Step frame shows none. It also lists the runs created from it, showing nothing (no empty-state panel) when there are none; a row click navigates to that run and a shift-click opens it alongside.
- A Run-framed node in focus must render as the Run frame's walkthrough view rather than a plain outline: each step's originating-Step content is selectively projected read-only as prompt text, with an editable response area alongside, and child runs render recursively indented one level per depth.
- A Run-framed node must show a page-top navigation row linking to its originating Step and its parent run — each link present only when that relationship and its target node exist; a click navigates and a shift-click opens alongside.
- When a run's walkthrough is active, it must render with a banner identifying the run by its originating Step and a row of wizard controls: Start begins with the first step active; Next and Previous move the active step (disabled at the last and first); Stop closes the walkthrough preserving every response as-is; Done is enabled only when every step has a non-empty response, and marks the run done and closes the walkthrough. The active step is highlighted and scrolled into view.

*Source: F-Run.3, F-New-Run-On-Step.1, F-New-Run-On-Step.2, F-Run-Execution-View.1, F-Run-Execution-View.2, F-Run-Execution-View.3, F-Run-Nav.1, F-Run-Nav.2, F-Run-Nav.3, F-Step-Runs-List.1, F-Step-Runs-List.2, F-Step-Runs-List.3, F-Run-Lens.1, F-Run-Lens.2, F-Run-Lens.3, F-Run-Lens.4, F-Run-Lens.5; evals T-CreateRun-click-opens-run, T-New-Run-On-Step, T-Run-Lens-Lifecycle.*

## Deferred: frame application & DXOS binding

- **How a frame is applied (open question).** The source applied the Step / Run frame by attaching a `#Step` / `#Run` supertag through the `#`-picker — the tag-on-node mechanism, which is removed. This spec says "a node with the Step frame applied" but does **not yet specify the non-supertag gesture** by which a frame is applied to a node. Defining that gesture belongs to the broader frame/blend layer.
- **DXOS realization (kept with the frame layer; binding deferred).** Under DXOS the Step and Run frames are realized as ECHO schemas (`Bramble.Step`, `Bramble.Run`), the run's done-state as a field on the Run, and the run-relating relationships as ECHO `Edge` relations. These are *kept* (not removed) and will live in this frame layer's DXOS profile when it is built. Source: `F-Step.1`, `F-Run.1`, `F-Run-Lens.6`, and rules `R-Step-Is-Tagged-Node`, `R-Run-Is-Tagged-Node-Linked-Via-Edge` (re-expressed as frame constraints, not supertag membership).

## Related

- [editing.md](editing.md) · [graph.md](graph.md) · [nodes.md](nodes.md) — the core, no-blend capabilities this frame layer sits on.
- [../docs/features.md](../docs/features.md) — the broader frame/blend capabilities to be brought in later.
- [../docs/conceptual-foundations.md](../docs/conceptual-foundations.md) — why framing is distinct content, not tag-on-node.
