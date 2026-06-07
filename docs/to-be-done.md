# To Be Done (out-of-band)

Deferred capabilities, kept **out of `spec/`** so the regenerative pipeline (Phoenix) never ingests them as current intent. Each is real and intended, but not part of the current "Tana without tag-on-node" core. They are recorded here so they aren't lost.

## 1. Blending capabilities (beyond the Run frame)

The broader frame/blend layer — a frame library, frame recommendation, and multiple frames over one substrate (see [features.md](features.md), [conceptual-foundations.md](conceptual-foundations.md)). The Run frame ([../spec/frames-run.md](../spec/frames-run.md)) is the first concrete frame application and is already isolated; the rest of blending comes later.

## 2. Frame-application gesture

How a frame is *applied* to a node without the removed `#`-picker. `frames-run.md` says "a node with the Step frame applied" but specifies no application gesture (the supertag picker was the removed mechanism). Defining that gesture belongs to the frame/blend layer.

## 3. Create a new host object from Bramble

The Host-Substrate Bridge ([../spec/nodes.md](../spec/nodes.md)) currently only **imports existing** host objects. Creating a *new* host object of a given native type from within Bramble (e.g. a new ECHO object of type X) is a real, intended bridge capability — it was fused with the removed tag-apply flow (`F-6.Phase1.apply` / `create-instance`, `T-Supertag-title-seed-outliner`). Needs its own design.

## 4. Imported Tana-supertags mapping

Tana Paste import ([../spec/nodes.md](../spec/nodes.md) › Import) preserves structure, references, and dates today. Mapping imported Tana **supertags** (`F-7.2`) onto Bramble has no home until the frame layer exists — Tana supertags would map to frames. Deferred with §1.

## Related

- [../provenance/considered-and-removed/tag-on-node.md](../provenance/considered-and-removed/tag-on-node.md) — what was removed and where each piece was re-homed.
- [../spec/frames-run.md](../spec/frames-run.md) — the isolated frame seam these build on.
