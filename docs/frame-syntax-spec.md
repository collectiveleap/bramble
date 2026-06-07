# Frame Notation — Self-Contained Specification

A notation for describing **frames** (in the sense shared by Minsky's frames, Tana's
supertags, and Fillmore/FrameNet frame semantics) and for setting up **conceptual blends**
over them. The notation is a terse surface syntax that **desugars into typed feature
structures (TFS)**, which is where its meaning lives.

This document is self-contained. You can paste it into a fresh context (another Claude
session, a development task, a parser project) and have everything needed to read, write,
or implement the notation. No prior conversation is required.

---

## 0. Orientation — what a "frame" is here

A **frame** is *a named, inheritable type whose slots carry type constraints, defaults,
cardinality, and optionally attached behavior.* This single structure unifies:

- **Minsky frames** — named node, slots ("terminals"), defaults, attached procedures
  ("daemons"), inheritance.
- **Tana supertags** — a type with typed fields and defaults, extensible from other tags.
- **FrameNet / frame semantics** — a named frame with **Core** and **Peripheral** frame
  elements (roles), and typed relations between frames.

The notation lets you author such frames Tana-style, *and* declare **blends** that put two
frames into correspondence through a shared **generic space** — the setup step for
conceptual blending.

---

## 1. Formal basis (why it means anything)

The surface syntax is **sugar over typed feature structures**, per
**Bob Carpenter, *The Logic of Typed Feature Structures* (1992)**. Concrete prior art for
an authoring layer is **TDL (Type Description Language)** from the DELPH-IN community,
parsed and unified by the **LKB** and **ALE** systems.

Three TFS properties give the notation its power:

1. **Partiality** — an underspecified structure (a type with most slots empty) is still
   well-formed and meaningful. This makes incremental note-taking legal, and makes
   partial blend inputs legal.
2. **Type hierarchy with appropriateness conditions** — a lattice of types where each type
   declares which features are appropriate and the value type of each. This *is* typed
   fields / Core-Peripheral elements / slot constraints. Inheritance (incl. multiple
   inheritance) is free.
3. **Reentrancy** — two paths may lead to the same node (coindexing). A blend's **counterpart
   link** is reentrancy *lifted from within one structure to across two structures*; the
   **generic space** is the structure both inputs are reentrant with.

The dividing line to keep in mind: the whole **declarative** surface (frames + blend
*declarations*) has model-theoretic meaning, and **composition** of projected structures is
exactly **TFS unification** (solved, with implementations). Only **running** a blend —
selective projection + completion + elaboration, scored by governing principles — is open,
search-based work (see §9).

---

## 2. Lexical rules

- **Identifiers** (`Ident`): start with a letter, then letters/digits/`-`/`_`. Hyphens are
  legal inside identifiers.
- **Types** are always written `#Name` — *everywhere*, in declarations and in slot
  constraints. There is no other type notation.
- **Node references** are written `@Name`.
- **Generic-space roles** are written `^name`.
- **Strings**: double-quoted.
- **Numbers**: optional leading `-`, digits, optional `.` fraction.
- **Booleans**: `true`, `false`.
- **Comments**: `--` to end of line.
- **Reserved words**: `blend`, `generic`, `input`, `project`, `governed-by`, `if-needed`,
  `on-fill`, `on-clear`, `ask`, `run`, `infer`, `link`, `true`, `false`.
- **Lexing rule**: use **maximal munch**, so `if-needed` and `governed-by` lex as single
  tokens, then check the result against the reserved set.
- **Parsing lookahead**: at a top-level `#`, read `#` then the identifier; if it is the
  reserved word `blend`, parse a blend declaration, otherwise a frame declaration. This is
  the only place lookahead is required.
- **Authoring layout (optional but recommended)**: run an **offside-rule pass** that converts
  indentation into the `{` `}` tokens the grammar expects, so the typed surface can be
  indentation-based (Python/Haskell style) while the grammar stays brace-delimited.

---

## 3. Grammar (W3C-style EBNF)

Notation: `*` = zero-or-more, `+` = one-or-more, `?` = optional, quoted = terminal.

```ebnf
(* ===== Top level ===== *)
Program       ::= TopLevel*
TopLevel      ::= FrameDecl | BlendDecl | Instance

(* ===== Frame (supertag) declaration ===== *)
FrameDecl     ::= '#' Ident Inherits? '{' SlotItem* '}'
Inherits      ::= '<' TypeRef ( ',' TypeRef )*       (* multiple inheritance *)
SlotItem      ::= SlotDecl | Daemon

SlotDecl      ::= Ident '::' SlotType Cardinality? Default? Peripheral?
SlotType      ::= TypeRef | EnumSet
TypeRef       ::= '#' Ident
EnumSet       ::= '{' Symbol ( ',' Symbol )* '}'
Cardinality   ::= '[' Card ']'
Card          ::= Int '..' ( Int | '*' ) | Int | '*'
Default       ::= '=' Value
Peripheral    ::= '?'                                 (* unmarked = core *)

Daemon        ::= '@' DaemonKind Ident ':' Action
DaemonKind    ::= 'if-needed' | 'on-fill' | 'on-clear'
Action        ::= Ask | Call | Infer | Assign         (* host-extensible *)
Ask           ::= 'ask' String
Call          ::= 'run' String
Infer         ::= 'infer' Path
Assign        ::= 'link' Path AssignOp Value
AssignOp      ::= '=' | '+='
Path          ::= Ident ( '.' Ident )*

(* ===== Blend declaration ===== *)
BlendDecl     ::= '#' 'blend' Ident '{'
                    GenericClause
                    InputClause+
                    ProjectClause?
                    GovernClause?
                  '}'
GenericClause ::= 'generic' GenRef ( '{' GenRole ( ',' GenRole )* '}' )?
GenRef        ::= '^' Ident                           (* ^ = "in the generic space" *)
GenRole       ::= Ident '::' TypeRef
InputClause   ::= 'input' Ident ':' TypeRef '{' Counterpart+ '}'
Counterpart   ::= Ident '~' GenRef                    (* input-slot ~ ^generic-role *)
ProjectClause ::= 'project' QPath ( ',' QPath )*
QPath         ::= Ident '.' Ident                     (* inputAlias.slot *)
GovernClause  ::= 'governed-by' Ident ( ',' Ident )*

(* ===== Instance (the note you actually type) ===== *)
Instance      ::= NodeHead ( '{' Filling* '}' )?
NodeHead      ::= NodeRef? '::' TypeRef
Filling       ::= Ident '::' Value
NodeRef       ::= '@' Ident

(* ===== Values & lexis ===== *)
Value         ::= NodeRef | String | Number | Boolean | Symbol | List | Instance
List          ::= '[' ( Value ( ',' Value )* )? ']'
Symbol        ::= Ident
Boolean       ::= 'true' | 'false'
Ident         ::= Letter ( Letter | Digit | '-' | '_' )*
Int           ::= Digit+
Number        ::= '-'? Digit+ ( '.' Digit+ )?
String        ::= '"' Char* '"'
Comment       ::= '--' ( Char - Newline )*
```

---

## 4. Frame declarations

A frame is a `#Type`, an optional inheritance list, and a brace block of slots and daemons.

```
#Dwelling < #Artifact {
  resident :: #Person [1..*]          -- core slot, typed, cardinality
  location :: #Place                  -- core slot
  shelter  :: #Structure = walls      -- core slot with a default
  builder  :: #Person ?               -- '?' marks it peripheral/optional
  @if-needed location : ask "where is it?"      -- Minsky if-needed daemon
  @on-fill resident   : link resident.dwellings += self
}
```

Reading the slot line `SlotDecl ::= Ident '::' SlotType Cardinality? Default? Peripheral?`:

- `Ident` — the slot (role) name.
- `SlotType` — either a `#Type` or an enum set like `{flying, walking}`.
- `Cardinality?` — e.g. `[1..*]`, `[0..1]`, `[3]`, `*`. Absent means single-valued.
- `Default?` — `= value`, overridable.
- `Peripheral?` — a trailing `?` marks the element **Peripheral**; unmarked means **Core**
  (FrameNet's distinction).

**Daemons** (`@kind slot : action`) are Minsky's attached procedures:

- `@if-needed slot : …` — fires when the slot is queried but empty.
- `@on-fill slot : …` — fires when the slot is filled.
- `@on-clear slot : …` — fires when the slot is emptied.

The four built-in actions are `ask "…"`, `run "…"`, `infer Path`, and
`link Path = value` / `link Path += value`. **These are a host-language hole** — replace them
with whatever expression language your tool runs. TFS has no notion of procedure, so daemons
are the deliberate extension beyond the formal base.

---

## 5. Instances (the notes you type)

An instance names an optional node, a `#Type`, and fillings. Instances are partial by
default — leave slots empty freely.

```
@cabin ::#Dwelling
  resident :: @Alice
  location :: "Pier 39"
```

`@cabin` is the node reference (omit it for an anonymous node). Each `Filling` is
`slot :: value`, where a value may itself be a nested instance, a list, a string, number,
boolean, symbol, or another `@node`.

---

## 6. Blend declarations (the setup for blending)

A blend names a **generic space**, two-or-more **inputs** (each with a local alias and the
counterpart links that route through the generic), an optional **selective projection**, and
optional **governing principles**.

```
#blend Houseboat {
  generic ^Dwelling { occupant :: #Person, site :: #Place }

  input house : #House {              -- alias 'house' for type #House
    resident  ~ ^occupant             -- counterpart: house.resident ↔ generic.occupant
    location  ~ ^site
  }
  input boat : #Boat {
    passenger ~ ^occupant
    waterway  ~ ^site
  }

  project house.shelter, boat.mobility   -- selective projection; clashing detail dropped
  governed-by integration, topology, web, unpacking, good-reason
}
```

Semantics of each clause:

- **`generic ^G { … }`** — the shared structure both inputs map into; it guarantees the
  inputs are commensurable. Its roles are written `^role`.
- **`input alias : #Type { … }`** — a participating space. The **alias** is a local handle
  (so projection paths are unambiguous and a type can even be blended with itself).
- **`slot ~ ^role`** — a **counterpart link**: cross-structure reentrancy coindexing the
  input's slot with a generic role.
- **`project alias.slot, …`** — **selective projection**: which features are carried into the
  composition. This is what makes the operation a *blend* rather than a unification — you
  deliberately drop clashing detail.
- **`governed-by …`** — named optimality/governing constraints (Fauconnier & Turner's
  principles) that score the eventual elaboration.

---

## 7. Desugaring to typed feature structures

This table is what gives the surface its meaning. Every declarative construct maps to a
TFS construct; only the last two rows fall outside the static formalism.

| Surface construct          | Typed-feature-structure meaning                                            |
|----------------------------|-----------------------------------------------------------------------------|
| `#T < #P`                  | `T` is a subtype of `P` in the type lattice                                |
| `slot :: #X`               | appropriateness condition: feature `slot` appropriate here, value type `X` |
| `[1..*]` etc.              | the feature is list-valued, with the stated length constraint              |
| `= v`                      | a default value, overridable on unification                                |
| `?` (peripheral)           | a non-core feature element (FrameNet Core/Peripheral)                       |
| `@…` daemons               | side-conditions fired on unification — the extension beyond Carpenter       |
| `input … ~ ^role`          | cross-structure reentrancy: input slot and generic role are coindexed       |
| `generic ^G { … }`         | the structure both inputs are reentrant with — their shared upper bound     |
| `project …`                | selective projection: the subset of features carried into composition       |
| `governed-by …`            | named optimality constraints scoring the eventual elaboration               |

---

## 8. Worked example end-to-end

```
-- Frames -------------------------------------------------------------
#House < #Artifact {
  resident :: #Person [1..*]
  location :: #Place
  shelter  :: #Structure = walls
}

#Boat < #Artifact {
  passenger :: #Person [0..*]
  waterway  :: #Place
  mobility  :: #Propulsion = engine
}

-- Instances (notes) --------------------------------------------------
@my_place ::#House
  resident :: [@Alice, @Bob]
  location :: "Sausalito"

-- Blend setup --------------------------------------------------------
#blend Houseboat {
  generic ^Dwelling { occupant :: #Person, site :: #Place }
  input house : #House {
    resident ~ ^occupant
    location ~ ^site
  }
  input boat : #Boat {
    passenger ~ ^occupant
    waterway  ~ ^site
  }
  project house.shelter, boat.mobility
  governed-by integration, topology, web, unpacking, good-reason
}
```

Composition of the projected structures (`house.shelter` + `boat.mobility` over the shared
`occupant`/`site`) is plain unification and yields the static skeleton of the blend. The
*emergent* properties of a houseboat are produced by elaboration — see next section.

---

## 9. Running a blend — what is solved and what is open

Be precise about this; do not oversell it.

- **Composition is solved.** Merging projected structures where they agree is exactly **TFS
  unification**. Implementations exist (LKB, ALE, DELPH-IN). You get this essentially for
  free.
- **Running is open.** Real blending is *not* unification: unification fails on clash, blending
  *feeds* on clash, and the blend has emergent structure present in neither input. So "run the
  blend" is a **constrained search**, not a function — which to selectively project, which
  background frames to recruit during completion, which elaboration to run, all scored by the
  `governed-by` principles.

Prior art to build on rather than reinvent:

- **Goguen, algebraic semiotics** — models generic-plus-two-inputs as a category-theoretic
  **pushout/colimit**, but notes that real blends are usually the *optimal* object, not the
  colimit.
- **COINVENT (Schorlemmer, Kutz, Confalonieri, Plaza, et al.)** — uses **amalgams** from
  case-based reasoning: *generalize* each input upward to shed clashing detail, then combine
  the generalizations. This is the formal counterpart of `project`.

**Recommended implementation split:** composition via unification (solved); selective
projection + completion via an **amalgam-style generalize-then-combine search** constrained by
`governed-by` (prototype, not a library call).

---

## 10. Quick reference card

```
#Type < #Super { … }          frame (supertag) declaration, optional inheritance
slot :: #Type                 typed slot (Core by default)
slot :: {a, b, c}             enum-valued slot
slot :: #Type [1..*]          cardinality
slot :: #Type = default       default value
slot :: #Type ?               Peripheral slot
@if-needed slot : action      daemon: fired when queried-but-empty
@on-fill slot   : action      daemon: fired when filled
@on-clear slot  : action      daemon: fired when emptied
   actions: ask "…" | run "…" | infer path | link path =/+= value   (host-extensible)

@node ::#Type                 instance head (@node optional)
slot :: value                   filling (value may be nested instance/list/@node/literal)

#blend Name { … }             blend declaration
generic ^G { role :: #Type }  generic space + roles
input alias : #Type { … }     participating space, local alias
slot ~ ^role                  counterpart link (cross-structure reentrancy)
project alias.slot, …         selective projection
governed-by a, b, …           optimality/governing principles

-- comment to end of line
```
