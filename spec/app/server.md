# Bramble Web Server

The **client/server web** architecture profile: a server that serves the Bramble web client and durably persists the substrate. It is one selectable Phoenix compile target for the same neutral behavior (the DXOS realization in [../profiles/dxos.md](../profiles/dxos.md) is another). The substrate is **append-only** (see [../../docs/vocabulary.md › Append-only history](../../docs/vocabulary.md#append-only-history)): the server stores an ordered operation log, and the current DAG is the fold of that log — nothing is ever destructively removed. The operations it persists are the neutral operations in [../editing.md](../editing.md), [../graph.md](../graph.md), and [../nodes.md](../nodes.md); the client it serves is [../profiles/web.md](../profiles/web.md).

## Serving the client

- The server must serve the Bramble web client as a single page at `GET /`.
- The server must listen on a configurable port (default 3000).
- Any static client assets must be served from the same origin.

## Loading the Bramble

- A space holds at most one Bramble (see [The-Bramble](../graph.md#the-bramble)); the server must expose that single Bramble.
- On client load, the server must return a snapshot of the current DAG: every live (non-tombstoned) node with its content, and every structural and reference edge with its order — enough to render any occurrence.
- The snapshot must include per-occurrence state (collapse), so the client reopens each occurrence in its persisted state.

## Persisting operations (append-only)

- Every change must be recorded as an operation event appended to a durable, ordered log; the current DAG state is the fold of that log. The server must never destructively modify or remove a prior event. *(system invariant)*
- The server must accept and persist these operations, each mapping to a neutral operation in the core spec: set-content, split, join, insert-sibling, indent, dedent, link, add-existing, create-reference, remove-reference, set-per-occurrence-state, retire.
- Retire (and removal of a reference's target) must be recorded as a **tombstone** event: the node or edge is marked tombstoned and removed from active structure, but its identity, content, and history are retained and stay resolvable — a pinned reference must still render its snapshot against a tombstoned target. The server must never hard-delete. *(system invariant — see [vocabulary › Tombstone](../../docs/vocabulary.md#tombstone-never-erase))*
- An operation that would violate the acyclic invariant must be refused, leaving the log unchanged, and the refusal reported to the client.
- After any operation is persisted, a reload must reproduce the same DAG — same nodes, content, out-edge order, and per-occurrence state. *(system invariant)*

## Persistence store

- The operation log must be stored durably in **SQLite** (one append-only `operations` table, ordered by an autoincrement sequence) and survive a server restart. The current DAG is rebuilt by folding the log on startup.

## Related

- [../profiles/web.md](../profiles/web.md) — the web client this server serves.
- [../editing.md](../editing.md) · [../graph.md](../graph.md) · [../nodes.md](../nodes.md) — the neutral operations this server persists.
- [../profiles/dxos.md](../profiles/dxos.md) — the alternative DXOS realization (ECHO/Automerge append-only).
