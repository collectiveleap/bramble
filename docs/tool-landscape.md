# Tool and Framework Landscape

A survey of how existing tools and frameworks treat the lens (the perspective, the cut) as an artifact in its own right — and where the gap in that landscape lies.

## When a lens is a first-class artifact

Most tools treat the lens as a transient configuration: filters are set, a chart is built, a map is drawn. The view is real, but the *cut itself* is not an object with a name, an owner, a version history, or a URL. A lens earns first-class status when it has a name, an owner, a URL, a version, and an audience. Only a subset of tools cross that line.

**ArchiMate Viewpoints** are the cleanest example. They sit on top of the ISO/IEC/IEEE 42010 standard for architecture description, which formally separates a *viewpoint* (the specification of the lens — which concerns it addresses, which stakeholders it serves, which elements it makes visible) from a *view* (the picture produced by applying that lens to the model). A viewpoint dictates which parts of the architecture model are visible and how they are presented: the camera captures the entire scene, but the lens determines what comes into focus. Viewpoints are named, catalogued, and reused across organizations. Enterprise architecture tools — **LeanIX**, **Ardoq**, and **Bizzdesign** — implement this directly, so a "capability heatmap viewpoint" or a "lifecycle viewpoint" is an object people share and govern, not a one-off chart.

**Kumu** treats perspectives the same way for systems and network maps. Perspectives switch between lenses that highlight different information on the same underlying map; each is a named object that lives with the project rather than in someone's head.

The **semantic layer** family is the strongest version of the idea in the data world. Metric definitions become YAML files in a Git repository, reviewed in pull requests, tested in CI/CD, and consumed identically by every downstream tool — change a definition once and it updates everywhere. Looker's **LookML**, the **dbt Semantic Layer / MetricFlow**, **Cube**, and **AtScale** all turn the "way of cutting" data (what counts as revenue, what counts as an active customer, how customers roll up to accounts) into versioned code shared across every downstream tool. This is the purest instance of a lens as a governable artifact, because it has commits, owners, reviewers, and tests.

Everyday productivity tools carry a lighter version of the same idea. **Notion**, **Airtable**, and **Coda** all expose multiple named *views* on a database, and those views are first-class objects with their own permissions and links rather than personal preferences. **Linear**, **Jira**, **Asana**, and **Datadog** do the same for saved filters and saved views — in Datadog, saved views are shared across the organization and identified by who created them. **Ashby** added named, shareable dashboard views as a first-class concept, where a combination of dashboard-level filters is stored as a named view and a share button generates URLs encoding the current filter configuration.

A more cultural example: **Are.na channels**. A channel is explicitly a curatorial lens — a person's chosen cut of the web — that others can subscribe to, fork, and remix. The lens travels socially as the artifact, not the underlying material. **Pinboard** tags and **Zotero** group libraries work similarly.

**Soft Systems Methodology's root definitions** and the **CATWOE** framing are unusual in that the artifact is explicitly the *worldview* behind a model rather than a software configuration. SSM forces practitioners to write down whose perspective a system is being described from, which makes the lens itself a document that gets reviewed and argued over.

Wardley Maps, EventStorming canvases, and rich pictures *can* function this way socially, but they do not enforce it the way ArchiMate, semantic layers, and database-view tools do.

## DSRP and Plectica

**DSRP** (Distinctions, Systems, Relationships, Perspectives), Derek Cabrera's systems-thinking framework, rests on the claim that systems are not intrinsic but are constructed by the observer. It names Perspective as one of four irreducible cognitive moves and decomposes it into a *point* (who or what is doing the viewing) and a *view* (what gets seen from that point). Observer-dependence is baked directly into the theory rather than left implicit.

The main tool is **Plectica**, the Cabrera Research Lab's mapping software, which treats perspective as a literal first-class object on the canvas. A perspective filters and describes cards on a map from a specific point of view: a visibility eye icon identifies who or what is taking the perspective, dot icons identify which cards are seen from that point of view, and a perspective note describes the perspective-taker's view of a specific card. On a single shared map, one can flip between "the same reality seen as engineering," "seen as exec," "seen as a customer," each carrying its own annotations and visibility rules — and the perspectives travel with the map when it is shared or embedded.

Cabrera also defines reusable templates called **jigs**, including the **P-Circle**, a content-agnostic structure for representing an idea viewed from multiple points of view, reusable across wide-ranging examples with perspectives distinguished by color. Plectica earlier existed as **MetaMap**, and the Cabrera Lab pairs the tool with **Thinkquiry**, a structured inquiry method that asks, among other things, whether the distinctions, relationships, or part-whole organization of a map reveal an implicit perspective — a bias, an assumption, a root perspective. That is the audit move for noticing which lens one is already inside.

One caveat: DSRP is contested inside the broader systems-thinking community. **Gerald Midgley** argued in 2008 that the DSRP pattern is an interpretation imposed on other perspectives, and that Cabrera et al. would be better off acknowledging that theirs is one perspective amongst many — arguing its coherence and utility while keeping the door open to insights from other perspectives. The critique is itself a DSRP-style perspective move applied to DSRP. The practical takeaway: Plectica is the single most explicit operationalization of "the lens as a shareable artifact" in the systems-thinking space, but the framework underneath makes strong universal claims. Treated as a tool for *externalizing* perspectives rather than as the *correct theory of cognition*, it delivers most of the value without the philosophical bill.

## Adjacent frameworks

Several families operationalize perspective-taking in their own domains.

**Futures and systems thinking**

- **Causal Layered Analysis (CLA)**, by Sohail Inayatullah: the futures-studies equivalent of DSRP's perspective move, treating the cut as four stacked lenses on the same situation — the litany, social causes, discourse/worldview, and myth/metaphor. Practitioners produce a literal four-row CLA grid as the shared object; the metaphor layer is the externalized worldview that is usually invisible. Tools like **Shaping Tomorrow** and **Futures Platform** include CLA as a template.
- **Critical Systems Heuristics (CSH)**, by Werner Ulrich: specifically about making the lens visible and contestable. Its central operation is "boundary critique" — surfacing and challenging boundary judgments about what is relevant to the system of interest. The shared artifact is a set of twelve boundary questions answered twice, for "what is" and "what ought to be," covering sources of motivation, control, knowledge, and legitimation. Boundary unfolding reveals the judgments; boundary questioning challenges their adequacy.
- **Wilber's AQAL / Integral Theory**: treats perspective-taking as the deep structure of cognition. The four quadrants are four irreducible perspectives on any event — the Upper Left being the interior of the individual (thoughts, feelings, awareness), the other three covering exterior-individual, interior-collective, and exterior-collective. Tools (**Integral Life Practice** software, **Holon**, AQAL-based coaching platforms) operationalize the quadrant grid as a reusable template.
- **Polarity Maps**, by Barry Johnson: the lens *is* "this is a polarity, not a problem" — a four-quadrant artifact showing the upsides and downsides of each pole. Polarities are interdependent pairs that need each other over time, challenges to be managed rather than problems to be solved. **Polarity Partnerships** maintains public and personal Polarity Map libraries.
- **Three Horizons** (Bill Sharpe / International Futures Forum): treats H1/H2/H3 as three named perspectives on the same present moment.
- **Theory U** (Otto Scharmer): frames "four levels of listening" as a perspective ladder applied to the same conversation.
- **The Ladder of Inference** (Chris Argyris, popularized by Peter Senge): a tool for surfacing the ladder of selection and interpretation that produced one's current view.

**Software architecture and modeling**

- **Kruchten's 4+1 View Model**: the more famous predecessor to ArchiMate viewpoints, describing software-intensive system architecture through multiple concurrent views to separately address the concerns of various stakeholders (end-users, developers, systems engineers, project managers) and to separate functional from non-functional requirements. Older than ISO 42010, it helped establish the convention that *the view itself* is a named, owned, reusable architectural artifact.
- **Bounded Contexts and Context Mapping in Domain-Driven Design**: the clearest software-engineering version of "different cuts of the same reality" at the modeling level. DDD divides a large system into Bounded Contexts, each with a unified model; contexts may hold completely different models of common concepts, with mechanisms to map between these polysemic concepts. The Context Map is the meta-artifact naming the perspectives and how they relate. Eric Evans and Vaughn Vernon's strategic DDD: a "customer" in sales is not the same thing as a "customer" in support, and pretending otherwise is the bug. Each bounded context is a lens with an owner.

**Data and the semantic web**

- **JSON-LD @context**: the purest computational instance of "the lens is an artifact." JSON-LD is based on a "context" that maps JSON object properties to concepts in an ontology using an RDF model. The @context document is a separate, URL-addressable file that says how to interpret raw JSON as linked data; the same underlying triples can be projected through different contexts to produce different shapes of the same reality. Schema.org plus JSON-LD is the version deployed at web scale.
- **GraphQL schemas**: function like client-specific lenses over the same underlying data graph, the way @context does for JSON-LD.

**Spatial and physical models**

- **GIS layers and Participatory GIS**: each layer (zoning, ecology, mobility, demographics) is a named, ownable, shareable cut of the same physical territory. Participatory GIS brings together multiple perspectives and can act as a portal to government and professional data. **Esri's ArcGIS**, **QGIS**, **Mapbox Studio**, and **Felt** treat layer sets and styled basemaps as first-class shared objects. The map is the substrate; the layer set is the lens.
- **Building Information Modeling (BIM)**: a single federated model carries discipline-specific views (architectural, structural, mechanical, electrical, fire, cost) produced and consumed by different roles, with the IFC standard formalizing these as separate but reconcilable cuts of one underlying object.

**Deliberation and annotation**

- **Argument mapping (Kialo, Argdown, Rationale)**: the lens is "this is a structured controversy." Kialo shows arguments for and against claims beneath user-submitted theses, structured into hierarchical pro/con branches rooted in a main thesis. The argument map is the persistent shared artifact, and the structure (pro/con tree, with weights) is the lens applied to a topic.
- **Web annotation layers (Hypothes.is, Genius)**: instead of producing a new view of structured data, groups overlay shared interpretation onto an existing document or page. The annotation set is a lens that can be subscribed to, forked, and curated. Hypothes.is is built on the W3C Web Annotation standard so the lenses are portable rather than platform-locked.

**Organizational structure**

- **Sociocracy and Holacracy**: treat circles and roles as the explicit "from where" lens through which decisions are made.

## The landscape mapped

Four 2×2 matrices carry distinct signal about the landscape.

### Lens-as-artifact × Scope of use

Axes: *how first-class is the lens* (implicit configuration → named, ownable, versioned object) and *who uses it* (individual → collective). This matrix matches the central question most directly.

- **Implicit + individual:** Obsidian with filters, Roam queries, personal Notion views. The lens lives in the user's head.
- **First-class + individual:** Tana supertags, Heptabase whiteboards, Capacities object types. The lens is a real object but stays personal.
- **Implicit + collective:** Slack channels, Discord servers, Notion team wikis, Miro boards. Shared space, but no named frame.
- **First-class + collective:** Are.na channels, Plectica perspectives, Kumu perspectives, ArchiMate viewpoints, dbt semantic layer, Pol.is opinion clusters, Hypothes.is annotation layers. The lens is the social object.

The upper-right (first-class + collective) is where the gap lives: it is populated, but only by domain-specific tools, not by a horizontal one.

### What kind of cut is first-class

Axes: *what the lens is made of* (stakeholder concern ↔ epistemic stance) and *where it operates* (data/schema ↔ interpretation/meaning).

- **Schema + stakeholder:** ArchiMate viewpoints, Kruchten 4+1, BIM views, GIS layer sets. "Here's how the architect sees the building; here's how the MEP engineer sees it."
- **Schema + epistemic:** dbt semantic layer, JSON-LD @context, GraphQL schemas, DDD bounded contexts. "Here's what 'customer' means in this context."
- **Meaning + stakeholder:** Plectica perspectives, Kumu perspectives, Polarity Maps, Soft Systems root definitions. "Here's how marketing sees this problem vs engineering."
- **Meaning + epistemic:** CLA (litany/system/worldview/myth), AQAL quadrants, DSRP, CSH boundary questions. "Here's the deep frame that's shaping how we're seeing this at all."

This shows that "lens" is not one thing — at least four distinct families exist, operating at different layers of the stack rather than competing.

### Authored vs. emergent × Static vs. living

Axes: *who makes the lens* (a person authors it ↔ it emerges from collective behavior) and *whether it changes* (fixed once made ↔ continuously updated).

- **Authored + static:** ArchiMate viewpoints, Polarity Maps, CLA grids, a one-off Plectica perspective. Someone draws the lens, it stays put.
- **Authored + living:** dbt semantic layer, Tana supertags, Are.na channels, Kumu perspectives. The lens has an owner who maintains it as reality changes.
- **Emergent + static:** A snapshot Pol.is report, an opinion cluster from a one-off Remesh session. The lens fell out of the data, then froze.
- **Emergent + living:** Pol.is run continuously, recommendation-algorithm clusters, knowledge-graph communities computed on the fly. The lens is recomputed as new behavior arrives.

The emergent quadrants are the most interesting and least developed. Almost nothing in the upper-right of the first matrix is also in the emergent half here. Tools that *compute* lenses from collective behavior rather than asking someone to author them are still rare.

### Theoretical depth × Practical adoption

Axes: *how rigorous the underlying theory is* (light heuristic ↔ deep theoretical commitment) and *how widely used the tool is* (niche ↔ mainstream).

- **Light + mainstream:** Notion views, Miro templates, Slack channels, saved Jira filters. Everyone uses them; the theory is "this filter is useful."
- **Light + niche:** Are.na channels, Kialo argument maps. Small but devoted communities.
- **Deep + mainstream:** dbt semantic layer, ArchiMate, GIS, BIM. Heavy theory deployed at enterprise scale, but hidden behind tooling.
- **Deep + niche:** Plectica/DSRP, CSH, AQAL, CLA, Polarity Mapping, Pol.is. Rigorous frameworks, narrow adoption.

This matrix explains the market gap most clearly: the deep-and-niche tools have the theory; the light-and-mainstream tools have the adoption. Almost nothing sits where deep theory meets mass adoption *and* keeps the lens first-class. dbt is the closest, and only because the lens is constrained to "metric definitions" rather than asking users to do full epistemic work.

### The named gap

The horizontal personal-knowledge tools (Tana, Obsidian, Roam, Logseq, Capacities, Heptabase) treat *content* as first-class but the *lens* as implicit — tags, queries, and filters assembled in the user's head. The horizontal social tools (Slack, Discord, Notion-as-wiki) treat the *conversation* or *page* as first-class but do not make the frame an object at all. The tools that *do* make the lens first-class are either domain-specific (ArchiMate, dbt, Plectica) or single-purpose (Kialo for arguments, Are.na for curation).

The gap, precisely: a horizontal tool where (1) lenses are named, ownable, forkable objects with URLs; (2) the same underlying content can be projected through multiple lenses; (3) the tool spans individual sense-making and group sense-making without forcing a switch between products; and (4) it does not presuppose a single methodology (DSRP, ArchiMate, polarity, CLA).

Near-misses cluster at the corners. In the personal-lens-explicit corner, **Tana** with supertags comes closest of the PKM tools — a supertag is a reusable structural lens carrying fields, views, and behaviors that travel with anything tagged; **Heptabase** whiteboards are named spatial lenses; **Obsidian** with Dataview holds the lens in query syntax; **Capacities** is built around object types. In the social-lens-explicit corner, **Are.na** is the most horizontal tool where the lens *is* the primary artifact, with **Notion**/**Coda** offering a lighter shared-view version and **Kumu**/**Plectica** covering systems and DSRP-style mapping. In the explicitly-social-systems corner, **Pol.is** surfaces computed opinion clusters at scale (used by vTaiwan and The New York Times), with **Remesh**, **Cortico's Local Voices Network**, and **Talkmap** doing adjacent AI-assisted perspective clustering, and **Loomio** and **Decidim** treating the proposal rather than the lens as the artifact. In the annotation-layer corner, **Hypothes.is** treats annotations as a portable shareable lens (with **Recogito** and **Pundit** as academic variants). In the workshop-canvas corner, **Miro**, **Mural**, and **FigJam** span individual-to-social but make "whatever template you drop in" the lens, hosting artifacts rather than making the underlying frame first-class.

The identified empty quadrant is the center of the first matrix: **horizontal, social, lens-first** — a "Tana for shared lenses" that spans individual to collective. The frontier is whether a tool can make *frames themselves* the social object — channels of lenses, forks of frames, version histories of how a community is currently cutting reality — rather than just sharing the content produced through private frames. Are.na is the philosophical closest; the semantic-layer world (dbt, Cube) is the technical closest; the convergence has not happened.

## Related

- [market-signal.md](market-signal.md) — empirical demand for the gap identified here.
- [lineage-and-nomenclature.md](lineage-and-nomenclature.md) — the observer-dependence thinkers behind the lens concept.
- [features.md](features.md) — the product response to this landscape.
