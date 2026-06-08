# Bramble — a shared outliner

Bramble is a personal outliner: the user writes lines of text nested under one another. Underneath, the
same line can appear in more than one place, and lines can reference each other. This service keeps the
Bramble and offers it to the web client and to other tools.

## Bramble Store

- The store owns the Bramble's durable state as a single append-only log of operations. Each operation
  has a `type`, a `payload` (a small JSON object of node ids and values), and a unique autoincrement
  `seq` number assigned by the store on append. External systems can reference an operation by its seq.
- The defined operation types are: `set-content`, `split`, `join`, `insert-sibling`, `indent`, `dedent`,
  `link`, `add-existing`, `create-reference`, `set-collapse`, and `retire`. The store records operations
  as opaque events; their effect on the outline is applied by the client that folds the log.
- The store must never modify or remove a logged operation; the log only ever grows.
- Users (and tools) can list the operations: the store must return all operations in seq order, and must
  also accept an optional "since" seq and return only the operations after it, so a client can catch up.
- Users (and tools) can append an operation: the store must validate it, append it, and return the stored
  operation including its assigned seq.
- The store must reject an operation whose `type` is not one of the defined types, and one whose `payload`
  is not a JSON object — returning a clear error and appending nothing.
- The store must expose these capabilities as a programmatic interface using standard conventions, so
  external tools can read the log and append operations. Responses are JSON: a successful append returns
  status 201 with the stored operation; a validation failure returns status 400 with `{ "error": "..." }`;
  a list returns status 200 with an array of operations in seq order.
- The operation log must be stored durably in SQLite — one append-only `operations` table whose primary
  key is the autoincrement `seq`, with a `type` column and a JSON `payload` column — and survive a server
  restart. On restart the log is intact and the next append continues the sequence.
- The store holds no per-user state and requires no login: a single Bramble log is served.
