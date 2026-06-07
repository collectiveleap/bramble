# Observer-dependent systems and alternative domain perspectives

**Created:** 5/29/2026 10:21:25  
**Updated:** 6/3/2026 17:21:07  
**Exported:** 6/3/2026 17:29:12  
**Link:** [https://claude.ai/chat/b3983adb-c092-4f06-8cdb-ab183df9f368](https://claude.ai/chat/b3983adb-c092-4f06-8cdb-ab183df9f368)  

## User:

> 5/29/2026 10:21:26

If systems are not intrinsic, but are instead the result of the viewer, and we have a consensus around domains like technology, product, operating model, Executive. Then it’s implied that a different view of the same reality could produce different silos, systems. Taken further, there could be a system that instead of seeing product, engineering, Executive as three separate domains, has a view that sees common elements across all of them as its own domain. Who writes about this potential of seeing the same underlying reality from a different perspective, forming a different system or domain?

## Assistant:

> 5/29/2026 10:21:43

Your intuition lines up with several thinkers who argue that systems are observer-dependent constructs rather than objective features of the world.

The most direct match is **Niklas Luhmann** and second-order cybernetics more broadly. Luhmann's social systems theory holds that a system exists only through the distinctions an observer draws, and that different observers carve up the same reality into different systems. **Heinz von Foerster** and **Humberto Maturana** are the foundational figures here, with the idea that "objectivity is a subject's delusion that observing can be done without him." Maturana and Varela's concept of *structural coupling* and the autopoiesis tradition all point at exactly what you're describing: the domains aren't out there, the observer's distinctions produce them.

For the organizational angle specifically, look at **Russell Ackoff** (systems thinking, idealized design), **Peter Checkland's Soft Systems Methodology** (which is explicitly about how different stakeholders construct different "relevant systems" from the same situation), and **Gareth Morgan's *Images of Organization***, which argues an organization is simultaneously a machine, an organism, a brain, a culture, a political system, etc., depending on the metaphor you bring. **Karl Weick's** work on sensemaking is also close, since organizations get "enacted" into being by how people bracket and label the flow of experience.

The cross-cutting alternative slicing you describe (a domain that sees common elements across product, engineering, exec) shows up practically in **Wardley Mapping** (Simon Wardley), **Team Topologies** (Skelton & Pais) with their "stream-aligned" vs functional cuts, and in older work on the **viable system model** by **Stafford Beer**, which deliberately re-cuts an organization by recursive function rather than by department. **Christopher Alexander's** pattern language is the same move applied to the built environment, finding domains of pattern that cut across the conventional categories of architect, engineer, and resident.

## User:

> 5/29/2026 10:24:33

What assistance happens through tools to let people re-cut the same reality into a different perspective

## Assistant:

> 5/29/2026 10:24:53

Re-cutting reality into a different perspective is exactly what a surprising number of tools are designed to enable, though they rarely advertise it that way. A few categories worth knowing:

**Mapping and modeling tools.** Wardley Maps let you re-cut a business by value chain and evolution rather than by org chart. Causal loop and stock-and-flow diagrams (Kumu, Loopy, Vensim, Stella) re-cut a situation by feedback structure instead of by department. Domain Story Telling and EventStorming re-cut software by the flow of events and domain language rather than by service or team boundary. Theory of Change and outcome mapping tools re-cut programs by causal contribution rather than by activity.

**Soft systems and sensemaking tools.** Checkland's Soft Systems Methodology has a specific artifact called a *rich picture*, which is a deliberately messy hand-drawn map meant to surface multiple worldviews of the same situation before anyone commits to a model. Cynefin's sense-making framework (Dave Snowden, SenseMaker software) re-cuts situations by the kind of causality at play (clear, complicated, complex, chaotic) rather than by topic. Cognitive Edge's narrative tools collect micro-stories and let patterns emerge bottom-up rather than through pre-set categories.

**Graph and knowledge tools.** Obsidian, Roam, Logseq, Tana, and Notion databases let you tag the same note many ways and surface emergent clusters, which is precisely the move of letting alternative cuts coexist over the same underlying reality. Kumu and Gephi do this for relationships at larger scale. Anything built on a property graph (Neo4j) is structurally about re-querying the same nodes through different lenses.

**Visualization and pivoting tools.** Pivot tables, OLAP cubes, and BI tools like Tableau and Power BI exist so the same dataset can be re-sliced by any dimension on demand. The whole point is that no single cut is privileged. Miro and FigJam serve the same function for qualitative material, since affinity mapping is literally the act of trying multiple cuts until a useful one emerges.

**Facilitation methods more than tools.** Liberating Structures (especially Ecocycle Planning and Critical Uncertainties), the Six Thinking Hats, and premortems all force a group to view the same reality through a deliberately different lens than the default one.

The pattern underneath all of these is the same: they separate the substrate (events, relationships, data, stories) from the cut, and make the cut cheap to change. That's the affordance that lets a different perspective produce a different system.

## User:

> 5/29/2026 10:25:58

Review this list and do some deeper research, are there tools where the cut in other words the perspective or lens is a first class artifact that is shared among people

## Assistant:

> 5/29/2026 10:27:47

> Synthesized tools where perspective itself becomes a shared, governable artifact.
>
> - The user is asking about tools where the perspective or lens itself becomes a shareable, versionable artifact—not just a view layered on top of data, but the actual lens as the primary thing being created and exchanged. I'm thinking through what this means conceptually and what kinds of tools might embody this idea.
>   
>   Now I'm looking for concrete examples to ground this in.
> - tools where perspective or lens is a shareable first-class artifact collaboration
> - The initial search didn't give me what I needed, so I'm going to try a more targeted approach and look specifically for tools that support shareable views or lenses as first-class artifacts.
> - "saved views" shareable lens database tool data perspective
> - I'm noticing that saved views keep coming up as a pattern, so I want to dig deeper into tools that treat lenses as true first-class objects—things like Wardley maps, knowledge management systems with perspective features, or view-as-code approaches.
> - Obsidian Roam perspective views shared knowledge graph filter
> - I'm realizing the user is asking specifically about tools where the lens or view itself is a shareable, first-class object—not just the underlying data. Notion, Airtable, and Coda all fit this pattern with their saved views (table, board, calendar, gallery) that can be independently shared. Looker also treats "Looks" and "Explores" as distinct artifacts with versioned definitions in LookML. antic layer where the "way of cutting" data is the artifact.
>   
>   3. **dbt semantic layer / metrics layer** - The definition of what a metric means and how it's cut is version controlled as code.
>   
>   4. **Tableau workbooks, Power BI reports** - These embed the filter state, but views are first-class.
>   
>   5. **Kumu** - Has "perspectives" as first-class objects where you save a particular view configuration.
>   
>   6. **Figma's pages/views** - shareable.
>   
>   7. **Wardley Mapping tools** (OnlineWardleyMaps) - the map IS the lens.
>   
>   8. **Cynefin's SenseMaker** - the framework is the artifact.
>   
>   9. **GitLens / Linear / Jira saved filters** - filters are shareable artifacts.
>   
>   10. **Linear's "Views"** - first-class shareable filters.
>   
>   11. **Notion's "Views" feature on databases** - first-class shareable views.
>   
>   12. **Airtable's "Views"** - first-class shareable views.
>   
>   13. **Code editors with workspace files** - VS Code workspaces are shareable.
>   
>   14. **Probably most interesting**: tools that explicitly have "lens" or "perspective" as a named object—Power BI's tabular model perspectives, causal loop diagram tools, and Excel's saved pivot table configurations all fit this pattern. InfraNodos offers different graph views, Polarity overlays intelligence perspectives, and Are.na's channels function as shareable lenses on the web. I should search more deliberately for tools that use "lens" or "perspectives" as explicit named features.
> - Kumu perspectives shareable lens systems mapping
> - I'm noticing that Kumu treats perspectives as proper, named artifacts within the system. Now I want to explore how Notion and Airtable handle views, and also look into semantic layer and metric layer tools that similarly elevate the "way of slicing data" to first-class status.
> - "semantic layer" dbt LookML metric definition as code shared view
> - I'm looking for more examples of tools where the lens or perspective itself is a versioned, shareable object — Kumu's named Perspectives and the Views in Notion, Airtable, and Coda all fit this pattern well. I think I have enough material now to write a comprehensive answer. I'm noticing that enterprise architecture tools like Ardoq, LeanIX, and Bizzdesign have formalized this concept—they let you create multiple named viewpoints on the same underlying model, which is exactly what we're looking for. ArchiMate even has an explicit "Viewpoint" specification as a shareable lens on architecture models, so that's worth exploring further.
> - ArchiMate viewpoint stakeholder concern shared lens enterprise architecture
> - I'm crystallizing the core distinction here: most BI tools treat views as private personal artifacts, but what the user really needs are tools where the lens itself becomes a first-class, named, shareable, and governable object—something that persists and travels as a reusable piece of analytical thinking. I'll organize my answer around tools that treat viewpoints as formal artifacts rather than ephemeral views. old standard), ISO 42010 (the standard that ArchiMate inherits from), Enterprise Architecture tools (LeanIX, Ardoq, Bizzdesign)
>   2. **"Perspective" as a named, shareable object** — Kumu Perspectives
>   3. **Views as shareable artifacts on top of structured data** — Notion, Airtable, Coda, Linear, Jira, Asana, Datadog Saved Views
>   4. **Semantic Layers / Metrics as Code** — LookML (Looker), dbt Semantic Layer + MetricFlow, Cube, AtScale — these are the most "code-like" version: a lens defined once and consumed everywhere
>   5. **Curation as lens** — Are.na channels, Pinboard tag clouds
>   6. **Soft systems / SSM** — rich pictures and CATWOE/root definitions explicitly externalize the worldview behind a model
>   7. **Wardley Maps** as an entire mapping discipline where the map itself is the lens shared with others
>   
>   The key insight here is that ISO 42010 formally distinguishes between "viewpoint" (the lens specification itself) and "view" (what you see through it), which maps directly onto what you're asking about — where does the cut become a first-class, shareable artifact that people can pass around and collaborate through?
>   
>   The strongest examples are the ones where the lens is **named, versioned, and governable** — where it's not just "what I'm looking at right now" but "here's the lens we've agreed on as a team."
>   
>   I should keep this tight for mobile. The user gets the pattern now.
> - **Done**

Reviewing the previous list with that filter in mind, most of those tools treat the lens as a transient configuration — you set filters, you make a chart, you draw a map. The view is real, but the *cut itself* isn't an object with a name, an owner, a version history, or a URL. Only a subset of tools cross that line. Here are the ones where the perspective genuinely is a first-class, shareable artifact:

The cleanest example is **ArchiMate Viewpoints**, which sit on top of the ISO/IEC/IEEE 42010 standard for architecture description. That standard formally separates a *viewpoint* (the specification of the lens, including which concerns it addresses, which stakeholders it serves, and which elements it makes visible) from a *view* (the picture you get when you apply that lens to the model). A viewpoint is defined as a specification of a model or view from a particular perspective, dictating which parts of the architecture model are visible and how they are presented — the camera captures the entire scene, but the lens determines what comes into focus. Viewpoints are named, catalogued, and reused across organizations. Enterprise architecture tools like LeanIX, Ardoq, and Bizzdesign implement this directly, so a "capability heatmap viewpoint" or a "lifecycle viewpoint" is an object people share and govern, not a one-off chart.

**Kumu** treats perspectives the same way for systems and network maps. Perspectives let you switch between different lenses to highlight different information on the same underlying map, and each one is a named object that lives with the project rather than living in someone's head.

The **semantic layer** family is the strongest version of this idea in the data world. Metric definitions become YAML files in a Git repository, reviewed in pull requests, tested in CI/CD, and consumed identically by every downstream tool. Change a metric definition once, and it updates everywhere. Looker's **LookML**, **dbt Semantic Layer / MetricFlow**, **Cube**, and **AtScale** all turn the "way of cutting" data (what counts as revenue, what counts as an active customer, how customers roll up to accounts) into versioned code that's shared across every tool downstream. This is probably the purest instance of a lens as a governable artifact, because it has commits, owners, reviewers, and tests.

The everyday productivity tools have a lighter version of the same idea. **Notion**, **Airtable**, and **Coda** all expose multiple named *views* on a database, and those views are first-class objects with their own permissions and links rather than personal preferences. **Linear**, **Jira**, **Asana**, and **Datadog** do the same for saved filters and saved views — all saved views are shared across your organization in Datadog, for instance, and are identified by who created them. **Ashby** recently added named, shareable dashboard views as a first-class concept for the same reason. Store any combination of dashboard-level filters as a named view, and use the share button to generate URLs that include the current filter configuration so anyone opening the link lands on the exact same filtered dashboard.

A more cultural example worth flagging: **Are.na channels**. A channel is explicitly a curatorial lens — a person's chosen cut of the web — that other people can subscribe to, fork, and remix. The lens travels socially as the artifact, not the underlying material. **Pinboard** tags and **Zotero** group libraries work similarly.

Worth also noting **Soft Systems Methodology's root definitions** and the CATWOE framing. These are unusual in that the artifact is explicitly the *worldview* behind a model rather than a configuration of a piece of software. SSM forces practitioners to write down whose perspective a system is being described from, which makes the lens itself a document that gets reviewed and argued over.

The pattern across all of these: a lens earns first-class status when it has a name, an owner, a URL, a version, and an audience. Wardley Maps, EventStorming canvases, and rich pictures *can* function this way socially, but they don't enforce it the way ArchiMate, semantic layers, and database-view tools do.

---

**Sources:**

- [Efficient sharing of artifacts between collaboration applications](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9804863)
- [Efficient sharing of artifacts between collaboration applications](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11023251)
- [Beyond the Artifact: Power as a Lens for Creativity Support Tools](https://dl.acm.org/doi/fullHtml/10.1145/3586183.3606831)
- [(PDF) An Artifact Ecology in a Nutshell: A Distributed Cognition Perspective for Collaboration and Coordination](https://www.researchgate.net/publication/287999711_An_Artifact_Ecology_in_a_Nutshell_A_Distributed_Cognition_Perspective_for_Collaboration_and_Coordination)
- [Beyond the Artifact: Power as a Lens for Creativity Support Tools | Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology](https://dl.acm.org/doi/10.1145/3586183.3606831)
- [SPARC: Shared Perspective with Avatar Distortion for Remote   Collaboration in VR](https://arxiv.org/pdf/2406.05209)
- [Architecture Artifacts: Collaboration vs Documentation | by Ivan Padabed | system5.dev | Medium](https://medium.com/system5-dev/architecture-artifacts-collaboration-vs-documentation-a6c33f2a34d2)
- [Saved Views](https://docs.datadoghq.com/logs/explorer/saved_views/)
- [Custom Analytics Report Views](https://help.dialpad.com/docs/custom-analytics-report-views)
- [Saved views - Finance & Operations | Dynamics 365 | Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/get-started/saved-views)
- [Saving Views](https://docs.oracle.com/en/cloud/saas/enterprise-profitability-cost-management-cloud/pcmpl/saving_views.html)
- [Saving Views](https://docs.oracle.com/en/cloud/saas/account-reconcile-cloud/adarc/saving_views.html)
- [Back to all product releases](https://www.ashbyhq.com/product-updates/saved-dashboard-views)
- [Saving Supplemental Data Views](https://docs.oracle.com/en/cloud/saas/financial-consolidation-cloud/usfcc/sdm_saving_views.html)
- [Saved views](https://learn.microsoft.com/en-us/training/modules/personalize-finance-operations/11-2-saved-views)
- [Lens Databases](https://luminar.media.mit.edu/lens-docs/api/tutorial-dbs.html)
- [ec.europa.eu](https://ec.europa.eu/eurostat/de/web/user-guides/data-browser/data-selection-display/save)
- [Comparing RoamResearch graph-view with Logseq and Obsidian | by Dr. S. S. | alvistor | Medium](https://medium.com/alvistor/comparing-roamresearch-graph-view-with-logseq-and-obsidian-b0c1fd51c2ee)
- [Obsidian Knowledge Graph: AI-Powered Visualization & Analysis - InfraNodus](https://infranodus.com/use-case/visualize-knowledge-graphs-pkm)
- [Roam Research vs Obsidian: Has Roam Died? | by Theo James | Medium](https://medium.com/@theo-james/roam-research-vs-obsidian-has-roam-died-aba7bb456b4d)
- [How to visualize your notes in Obsidian with Graph view](https://www.xda-developers.com/how-to-visualize-your-notes-in-obsidian-with-graph-view/)
- [Choosing Between Roam Research and Obsidian.md – MarkMcElroy.com](https://markmcelroy.com/how-to-choose-between-roam-and-obsidian/)
- [Comparing RoamResearch graph-view with Logseq and Obsidian | alvistor](https://alvistor.com/comparing-roamresearch-graph-view-with-logseq-obsidian-and-others/)
- [Obsidian vs Roam Research: Knowledge Management Comparison | DeepTerm](https://deepterm.app/blog/obsidian-vs-roam-research-knowledge-management-comparison)
- [Apps with 'Graph view' feature](https://alternativeto.net/feature/graph-view)
- [Systems mapping | Kumu](https://docs.kumu.io/disciplines/system-mapping)
- [docs/disciplines/system-mapping.md at main · kumu/docs](https://github.com/kumu/docs/blob/main/disciplines/system-mapping.md)
- [Systems Mapping • Kumu](https://kumu.io/yryana/systems-mapping)
- [System Mapping](https://kumu.io/markets/system-mapping)
- [Systems Mapping for Storytelling: Tips for using Kumu - RJI](https://rjionline.org/news/systems-mapping-for-storytelling-tips-for-using-kumu/)
- [Kumu: A Powerful Tool for Mapping and Visualizing Complex Data | United Nations Development Programme](https://www.undp.org/jordan/blog/kumu-powerful-tool-mapping-and-visualizing-complex-data-0)
- [Network Mapping](https://kumu.io/markets/network-mapping)
- [Resources — Map the System Canada](https://www.mapthesystem.ca/resources)
- [Kumu](https://kumu.io/)
- [dbt Semantic Layer: MetricFlow, Setup & Examples | Atlan](https://atlan.com/dbt-semantic-layer/)
- [Metrics as Code: Building a Semantic Layer With dbt and MetricFlow | by Alwyn DSouza | Towards Data Engineering | Medium](https://medium.com/towards-data-engineering/metrics-as-code-building-a-semantic-layer-with-dbt-and-metricflow-93d7e29e6ab3)
- [Semantic Layer: The Definitive Guide - DEV Community](https://dev.to/alexmercedcoder/semantic-layer-the-definitive-guide-5h6i)
- [LookML vs. dbt Semantic Layer: Which One is Better? | Devoteam](https://www.devoteam.com/expert-view/lookml-vs-dbt-semantic-layer-which-one-is-better/)
- [dbt Semantic Layer | dbt Developer Hub](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl)
- [Semantic Layer vs. Metrics Layer: What's the Difference? - DEV Community](https://dev.to/alexmercedcoder/semantic-layer-vs-metrics-layer-whats-the-difference-58k8)
- [“How do you decide what to model in dbt vs LookML?” | dbt Labs](https://www.getdbt.com/blog/how-do-you-decide-what-to-model-in-dbt-vs-lookml)
- [Getting Started with Looker & dbt Metrics | Euno](https://euno.ai/blog/getting-started-with-looker-and-dbt-metrics)
- [Getting Started with Looker & dbt Metrics - Euno.ai](https://euno.ai/resources/getting-started-with-looker-and-dbt-metrics/)
- [Semantic Layer with dbt Metrics | CelestInfo](https://www.celestinfo.com/semantic-layer-dbt-metrics.html)
- [ArchiMate Viewpoints | A Guide for 2026](https://www.theknowledgeacademy.com/blog/archimate-viewpoints/)
- [Full ArchiMate Viewpoints Guide (Examples Included)](https://www.visual-paradigm.com/guide/archimate/full-archimate-viewpoints-guide/)
- [Stakeholders, Architecture Views and Viewpoints: ArchiMate® 3.2 Specification](https://pubs.opengroup.org/architecture/archimate3-doc/ch-Stakeholders-Architecture-Views-and-Viewpoints.html)
- [ArchiMate 1.0 Technical Standard - Chapter 9](https://pubs.opengroup.org/architecture/archimate-doc/ts_archimate/chap9.html)
- [Comparing ArchiMate Viewpoints: A Guide for Leads 🏛️](https://www.archimetric.com/comparing-archimate-viewpoints-architect-lead-guide/)
- [Strategic Insights Using ArchiMate Viewpoints in Enterprise Planning 🏗️](https://www.archimetric.com/strategic-insights-using-archimate-viewpoints-enterprise-planning/)
- [Architectural Clarity Through ArchiMate Viewpoints Explained](https://www.archimetric.com/architectural-clarity-through-archimate-viewpoints/)
- [Navigating ArchiMate Viewpoints: A Leader's Guide 🏛️](https://www.archimetric.com/navigating-archimate-viewpoints-leaders/)
- [ArchiMate Viewpoints FAQ: Complete Guide 🏛️ - ArchiMetric](https://www.archimetric.com/archimate-viewpoints-faq-guide/)
- [Breaking Down ArchiMate Viewpoints: A Component-by-Component Guide](https://www.archimetric.com/breaking-down-archimate-viewpoints-component-guide/)

## User:

> 5/29/2026 10:36:38

What about tools from the DSRP space

## Assistant:

> 5/29/2026 10:37:24

> Synthesized DSRP framework and operationalized tools matching conversation arc.
>
> - The user is asking about DSRP — Derek Cabrera's systems thinking framework that breaks down into Distinctions, Systems, Relationships, and Perspectives. Since the "P" directly addresses perspectives, that's particularly relevant here. I'm thinking through what tools actually support this framework, with Plectica being the primary DSRP-based mapping tool from Cabrera's group, though there are a few others in that space.
> - DSRP Cabrera Plectica mapping tool perspectives
> - DSRP is Derek Cabrera's framework, and the "P" stands for Perspectives—exactly what the user is looking for. Plectica is the main tool that implements this, so I'm digging into how it treats perspectives as first-class objects in its system.
> - Plectica perspective point view feature map collaborative
> - So DSRP is Derek Cabrera's framework built on four cognitive primitives: Distinctions, Systems, Relationships, and Perspectives. The perspective component specifically consists of a point—the observer or subject doing the viewing—and a view, which is what's perceived from that vantage point. This directly connects to what we're exploring here.
>   
>   Plectica operationalizes DSRP as a practical tool, treating Perspectives as a core feature where you can filter and annotate cards from a specific viewpoint, complete with visibility markers and perspective-specific notes. Cabrera also developed reusable templates like the P-Circle for examining the same subject through multiple lenses. What's striking is how closely this aligns with what you've been describing—a system where Perspective becomes a first-class, named, shareable artifact grounded in the principle that the observer fundamentally shapes the system being observed.
>   
>   There's also Gerald Midgley's pluralism critique worth considering—
>   
>   the irony that DSRP itself is just one perspective imposed on systems thinking, which is a meta-level reflection that seems fitting given how intellectually engaged you are with these ideas. Beyond Plectica, there's MetaMap as an earlier iteration, ThinkBlocks as physical educational tools, and materials from the Cabrera Research Lab including their book "Systems Thinking Made Simple." The real power here is that DSRP starts from the premise that perspectives determine what you see, then builds tools where that perspective becomes something you can actually manipulate and layer across the same map.
>   
>   Now I'm thinking about how to frame this response—the user has clearly been thinking deeply about this, and Midgley's critique about the limitations of any single framework is exactly the kind of meta-reflective point that belongs in this conversation. Since they're on mobile, I should keep this tight and direct, probably two or three paragraphs.
> - **Done**

DSRP is actually the most on-point framework for the whole conversation you've been building, because the entire framework rests on the claim you started with — that systems are not intrinsic but are constructed by the observer. Derek Cabrera's DSRP (Distinctions, Systems, Relationships, Perspectives) names Perspective as one of four irreducible cognitive moves, and crucially decomposes it into a *point* (who or what is doing the viewing) and a *view* (what gets seen from that point). That is the observer-dependence baked directly into the theory rather than left implicit, which is why it lines up with where you've been going.

The main tool is **Plectica**, the Cabrera Research Lab's mapping software. It treats perspective as a literal first-class object on the canvas. A perspective lets you filter and describe cards on your map from a specific point of view. A visibility eye icon identifies who or what is taking the perspective, dot icons identify which cards are seen from that point of view, and a perspective note lets you describe the view of the perspective-taker on a specific card. So on a single shared map, you can flip between "the same reality seen as engineering," "seen as exec," "seen as a customer" and have each one carry its own annotations and visibility rules — and the perspectives travel with the map when you share or embed it. There's also a notion of reusable templates Cabrera calls **jigs**, including the **P-Circle**, which is a content-agnostic structure for representing an idea viewed from multiple points of view, where the same structure can be reused across wide-ranging examples and the perspectives are distinguished by color. Plectica earlier existed as **MetaMap**, and the Cabrera Lab pairs the tool with **Thinkquiry**, a structured inquiry method that asks, among other things, whether the distinctions, relationships, or part-whole organization of a map reveal an implicit perspective — a bias, an assumption, a root perspective. That's the audit move for noticing which lens you're already inside without realizing it.

One honest caveat worth flagging since you're working at the meta-level: DSRP is contested inside the broader systems thinking community. Gerald Midgley argued in 2008 that the DSRP pattern Cabrera proposes is an interpretation imposed on other perspectives, and that Cabrera et al. would be better off acknowledging that theirs is one perspective amongst many, arguing its coherence and utility while still keeping the door open to insights from other perspectives. Which is a delicious irony, since the critique is itself a DSRP-style perspective move applied to DSRP. The practical takeaway is that Plectica is probably the single most explicit operationalization of "the lens as a shareable artifact" in the systems thinking space, but the framework underneath it is making strong universal claims that you may or may not want to inherit. If you treat Plectica as a tool for *externalizing* perspectives rather than as the *correct theory of cognition*, you get most of the value without the philosophical bill.

---

**Sources:**

- [(PDF) Outthink Outsync Outdo Outlast: Plectica Mapping Tools Help Individuals and Teams Iterate Real-World Solutions](https://www.academia.edu/45435474/Outthink_Outsync_Outdo_Outlast_Plectica_Mapping_Tools_Help_Individuals_and_Teams_Iterate_Real_World_Solutions)
- [DSRP - HandWiki](https://handwiki.org/wiki/DSRP)
- [DSRP - Wikiwand](https://www.wikiwand.com/en/DSRP)
- [Systems Mapping: Applied Systems Thinking | by Derek Cabrera | Medium](https://medium.com/@derekcabrera/systems-mapping-applied-systems-thinking-4ad9b632e89a)
- [Systems Thinking: The Crux of Organizational Learning - Plectica](https://www.plectica.com/publications/crux-of-organizational-learning)
- [DSRP and Systems Thinking | Macroware Technology Blog](https://macroware.wordpress.com/2022/12/26/dsrp-and-systems-thinking/)
- [Book Summary - Systems Thinking Made Simple (Derek Cabrera)](https://readingraphics.com/book-summary-systems-thinking-made-simple/)
- [DSRP](https://en.wikipedia.org/wiki/DSRP)
- [FAQ - Plectica](https://www.plectica.com/faq)
- [Ching Ting , Yu - Redesign a feature - Perpective-Taking](https://melodyyu.myportfolio.com/capstone-at-plectica)
- [Concept Mapping. Collaboration. Metacognition. - Plectica | Product Hunt](https://www.producthunt.com/products/plectica)
- [Perspectives in Plectica: Collaborative Tool](https://www.facebook.com/groups/235075123710450/posts/343173249567303/)
- [Jig: P-Circle](https://blog.cabreraresearch.org/jig-p-circle)
- [Nexus Perspective - Plectica](https://www.plectica.com/maps/IE5Z8AW3T)
- [Perspectives on a system - Plectica](https://www.plectica.com/maps/339JOCXUC)
- [Thinkquiry - Plectica](https://www.plectica.com/thinkquiry)

## User:

> 5/29/2026 18:17:31

Claude missed this. Do deeper research to find anything else missed

## Assistant:

> 5/29/2026 18:19:54

> Excavated overlooked frameworks spanning systems thinking, architecture, and data modeling.
>
> - I should dig deeper into categories I might have overlooked—argument mapping tools like Kialo and Argdown that explicitly frame different perspectives, role-play and simulation approaches for exploring scenarios, polarity mapping for understanding tensions, and frameworks like causal layered analysis that structure how we examine problems from multiple angles.
>   
>   Beyond that, there are organizational and technical systems where perspectives are baked into the structure itself: Holacracy's circles, semantic web ontologies where the schema defines the lens, GIS layers in mapping software, BIM for construction stakeholders, and software engineering approaches like the 4+1 view model. I'm also noticing deeper theoretical frameworks—Spiral Dynamics, Integral Theory's AQAL quadrants, Koestler's holons, and Dooyeweerd's modal aspects—that all treat different perspectives as fundamental to understanding reality. Then there are practical tools like stakeholder analysis, empathy maps, and collaborative platforms like Mural that let teams create shared cuts of information, plus semantic technologies like JSON-LD contexts that literally reframe data through different lenses.
>   
>   I'm seeing this pattern extend into modern tech stacks too: GraphQL schemas as views over data, CRDTs enabling personalized collaborative views, 3D modeling with shared cameras, and domain-driven design's bounded contexts. I should dig deeper into some of these systematically—particularly Causal Layered Analysis, Integral Theory tools, GIS layer systems, DDD bounded contexts, argument mapping, and Critical Systems Heuristics—to understand how they operationalize perspective-taking.
> - Causal Layered Analysis Inayatullah futures four levels tool
> - Let me look for anything else I might have overlooked.
> - "4+1 view" Kruchten software architecture viewpoint stakeholder
> - I'm exploring some additional frameworks that might offer useful perspectives on this problem—integral theory's multi-dimensional approach, domain-driven design's bounded contexts, GIS layering systems, JSON-LD's semantic structuring, and critical systems heuristics all seem relevant to understanding how different domains organize and relate to each other.
> - "bounded context" "context map" Domain Driven Design perspective
> - Critical Systems Heuristics Ulrich boundary judgment perspective
> - Wilber Integral AQAL four quadrants tool software perspective
> - GIS layers shared geographic information stakeholder viewpoint same reality
> - argument map Kialo deliberation tool perspectives share
> - I'm thinking through a few more frameworks and examples that would strengthen this—polarity mapping for examining tensions from multiple angles, the Three Horizons model, and concrete examples like JSON-LD contexts and GraphQL schemas as formal lenses, plus bounded contexts from domain-driven design.
>   
>   I'm also noting some facilitation approaches like Open Space and World Café, organizational structures like Sociocracy and Holacracy where roles themselves are perspectives, and domain-specific examples like Building Information Modeling where different stakeholders literally see the same building through different lenses. Knowledge graph ontologies and Wardley mapping fit here too—different ways of cutting and interpreting the same underlying reality.
>   
>   For coding and data specifically, I'm thinking about how GraphQL schemas, DBT models, and API contracts all function as opinionated lenses over the same underlying data. Schema.org and JSON-LD's @context are particularly strong examples since the context literally reinterprets raw data into a shared formal structure. I should also look into Polarity Mapping by Barry Johnson and Three Horizons to make sure I'm covering the full landscape.
> - Polarity Map Barry Johnson tool both/and shareable
> - There are a few more concepts worth exploring that I haven't dug into yet—JSON-LD and its @context as a kind of lens, BIM's approach to multiple stakeholder perspectives on a single model, Team Topologies and Wardley mapping, the Ladder of Inference, Joint Application Design, and Holacracy or Sociocracy. Let me search deeper into JSON-LD and schema since that seems particularly relevant.
> - JSON-LD context same RDF data different shared perspectives ontology
> - Now I'm checking what I might have missed—BIM for multi-stakeholder 3D model views, the Ladder of Inference for how we construct meaning, Bohm Dialogue for genuine collective thinking, Holacracy and Sociocracy with their circle structures, Conway's Law about how system architecture mirrors organizational structure, and Three Horizons for thinking across different time scales.
>   
>   I should also add Theory U for sensing and presencing, Bohmian dialogue as a distinct practice, reflexivity in research methods, Popper's three worlds framework, and annotation tools like Hypothesis and Genius that layer perspectives onto text. In the data realm, JSON-LD @context for semantic meaning in linked data, GraphQL schemas for flexible data querying, CIDOC-CRM as a museum ontology standard, and BIM's explicit viewpoint management are all worth including.
>   
>   Let me organize these into coherent categories and write a comprehensive summary of what was genuinely missing from the original analysis. Looking at which frameworks I actually missed or underexplored, the strongest gaps are CLA's four levels, AQAL's quadrants, Critical Systems Heuristics' boundary questions, Polarity Maps as a lens itself, the 4+1 View Model, JSON-LD @context as a clean data-based lens example, DDD bounded contexts, GIS layers, BIM, and annotation systems like Hypothesis. I'll focus the response on these with proper citations.
>   
>   The user wants depth and thoroughness rather than brevity, so I should give them a substantial, well-organized answer even if it's longer.
> - **Done**

A real sweep turns up several families I underweighted or skipped entirely. The biggest gaps:

**Causal Layered Analysis (CLA), by Sohail Inayatullah.** This is the futures-studies equivalent of DSRP's perspective move and the most direct match to your original question, since it explicitly treats "the cut" as four stacked lenses on the same situation. CLA consists of four levels: the litany, social causes, discourse/worldview, and myth/metaphor, and the challenge is to conduct research that moves up and down these layers of analysis and thus is inclusive of different ways of knowing. What makes it a "lens as artifact" rather than just a facilitation method is that CLA works by identifying different levels of analysis to create coherent new futures, making explicit the assumptions, frames, and metaphors that shape individual and collective thinking — practitioners produce a literal four-row CLA grid that becomes the shared object, and the metaphor layer in particular is the externalized worldview that's usually invisible. Tools like Shaping Tomorrow and Futures Platform have CLA built in as a template.

**Kruchten's 4+1 View Model.** I gave you ArchiMate viewpoints but skipped its more famous predecessor in software architecture. The 4+1 view model presents a model for describing the architecture of software-intensive systems based on the use of multiple concurrent views, allowing one to address separately the concerns of various stakeholders — end-users, developers, systems engineers, project managers — and to handle separately functional and non-functional requirements. The interesting thing for your question is that 4+1 is older than ISO 42010 and helped establish the convention that *the view itself* is a named, owned, reusable architectural artifact rather than a one-off diagram.

**Critical Systems Heuristics, by Werner Ulrich.** This is a profound miss because CSH is *specifically* about making the lens visible and contestable. Its central operation is "boundary critique": CSH is an approach used to surface, elaborate, and critically consider boundary judgments — the ways in which people or groups decide what is relevant to the system of interest. The shared artifact is a set of twelve boundary questions answered twice, once for "what is" and once for "what ought to be," covering sources of motivation, control, knowledge, and legitimation. Boundary unfolding identifies and reveals boundary judgments, whereas boundary questioning critically evaluates and challenges the adequacy of those judgments. The questions themselves are the canonical artifact, and the answers become the explicit, comparable record of how different stakeholders are cutting the same situation.

**Wilber's AQAL / Integral Theory.** Treats perspective-taking as the deep structure of cognition the same way DSRP does, but with a different cut. The four quadrants represent four irreducible perspectives on any event: the Upper Left is the interior of the individual — thoughts, feelings, awareness, with the other three covering exterior-individual, interior-collective, and exterior-collective. Practitioners produce literal AQAL diagrams as a shared artifact, and there are tools (Integral Life Practice software, Holon, coaching platforms built on AQAL) that operationalize the quadrant grid as a reusable template.

**Polarity Maps, by Barry Johnson.** Distinct from everything else because the lens *is* "this is a polarity, not a problem" — and the map itself is a four-quadrant artifact showing the upsides and downsides of each pole. Polarities are interdependent pairs that need each other over time, and represent challenges to be managed rather than problems to be solved. Polarity Partnerships maintains public and personal Polarity Map libraries of common Polarity wisdom experienced across a broad range of contexts and industry sectors, which is exactly the "lens as a reusable, sharable, governed artifact" pattern.

**Bounded Contexts and Context Mapping in Domain-Driven Design.** The clearest software-engineering version of "different cuts of the same reality" at the *modeling* level rather than the diagramming level. DDD divides up a large system into Bounded Contexts, each of which can have a unified model — a way of structuring multiple canonical models. Bounded Contexts have both unrelated concepts and shared concepts: different contexts may have completely different models of common concepts with mechanisms to map between these polysemic concepts for integration. The Context Map is the meta-artifact that names the perspectives and how they relate. Eric Evans and Vaughn Vernon's strategic DDD essentially says: a "customer" in sales is not the same thing as a "customer" in support, and pretending otherwise is the bug. Each bounded context is a lens with an owner.

**JSON-LD @context.** Probably the purest computational instance of "the lens is an artifact." JSON-LD is based on the concept of a "context" that maps JSON object properties to concepts in an ontology using an RDF model. The @context document is literally a separate, URL-addressable file that tells you how to interpret raw JSON as linked data. The same underlying triples can be projected through different contexts to produce different "shapes" of the same reality — exactly the pattern you started this thread on, but in machine-readable form. Schema.org plus JSON-LD is the version of this that's deployed at web scale.

**GIS layers and Participatory GIS.** Geographic information systems are an enormous category I underweighted. Each layer (zoning, ecology, mobility, demographics) is a named, ownable, shareable cut of the same physical territory, and Participatory GIS is capable of providing citizens with information and dissemination options not only by bringing together multiple perspectives but also through the capacity to act as portal to government and professional data. The map is the substrate; the layer set is the lens. Esri's ArcGIS, QGIS, Mapbox Studio, and Felt all treat layer sets and styled basemaps as first-class shared objects.

**Building Information Modeling (BIM).** Same idea for buildings. A single federated model carries discipline-specific views (architectural, structural, mechanical, electrical, fire, cost) that are produced and consumed by different roles, and the IFC standard formalizes these as separate but reconcilable cuts of one underlying object.

**Argument mapping (Kialo, Argdown, Rationale).** Worth including alongside the DSRP family because the lens is "this is a structured controversy" rather than "this is a fact." Kialo is a collaborative reasoning tool for thoughtful discussion, understanding different points of view, and collaborative decision-making, showing arguments for and against claims underneath user-submitted theses or questions. Argument-boxes are structured into hierarchical branches where the root is the main thesis, enabling deliberation and navigable debates between opposing perspectives. The argument map itself is the persistent shared artifact, and what makes it interesting is that the *structure* (pro/con tree, with weights) is the lens being applied to a topic.

**Web annotation layers (Hypothes.is, Genius).** A different mechanism worth mentioning: instead of producing a new view of structured data, these tools let groups overlay shared interpretation onto an existing document or page. The annotation set is a lens that can be subscribed to, forked, and curated. Hypothes.is is built on the W3C Web Annotation standard specifically so these lenses are portable rather than locked to one platform.

A few smaller but real misses worth naming briefly: **Three Horizons** (Bill Sharpe / International Futures Forum) treats H1/H2/H3 as three named perspectives on the same present moment; **Theory U** (Otto Scharmer) frames "four levels of listening" as a perspective ladder applied to the same conversation; **the Ladder of Inference** (Chris Argyris, popularized by Peter Senge) is a tool for surfacing the ladder of selection and interpretation that produced your current view; **Sociocracy and Holacracy** treat circles and roles as the explicit "from where" lens through which decisions are made; and **GraphQL schemas** function like client-specific lenses over the same underlying data graph, the way @context does for JSON-LD.

The deeper pattern worth naming: across all these, you can sort them by what kind of lens is being made first-class. ArchiMate, 4+1, BIM, and GIS make *stakeholder concerns* the lens. Semantic layers, JSON-LD, and DDD make *the schema itself* the lens. CLA, CSH, AQAL, and Polarity Maps make *the epistemic stance* the lens. DSRP/Plectica, Kialo, and Hypothes.is make *the act of looking* the lens. Same move, different layer of the stack.

---

**Sources:**

- [Causal layered analysis: Poststructuralism as method - ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S001632879800086X)
- [(PDF) Causal Layered Analysis A Four-Level Approach to Alternative Futures RELEVANCE AND USE IN FORESIGHT](https://www.researchgate.net/publication/332706079_Causal_Layered_Analysis_A_Four-Level_Approach_to_Alternative_Futures_RELEVANCE_AND_USE_IN_FORESIGHT)
- [Causal layered analysis - Scenario Planning](https://www.shapingtomorrow.com/webtext/55)
- [Shaping Tomorrow : Causal layered analysis](https://www.shapingtomorrow.com/methods/CLA)
- [(PDF) Causal layered analysis](https://www.academia.edu/48136812/Causal_layered_analysis)
- [Causal Layered Analysis — Deepening the future Sohail Inayatullah](https://www.metafuture.org/cla%20papers/Inayatullah%20Causal%20layered%20analysis%20-%20%20Deepening%20the%20Future.pdf)
- [Causal Layered Analysis](https://www.futuribles.com/wp-content/uploads/2020/01/ToolBox3CLA.pdf?postId=73703)
- [Causal Layered Analysis](https://www.metafuture.org/wp-content/uploads/2016/01/Causal-Layered-Analysis-FRM-version-3-2009.pdf)
- [Causal layered analysis](https://en.wikipedia.org/wiki/Causal_layered_analysis)
- [Sohail Inayatullah](https://en.wikipedia.org/wiki/Sohail_Inayatullah)
- [Architecture Viewpoints (4+1 AVM by Kruchten) | by Mustafa Aslanov | Medium](https://aslanovmustafa.medium.com/architecture-viewpoints-4-1-avm-by-kruchten-468d08b64d2d)
- [Kruchten’s 4 + 1 views of Software Design | by Puneet Sapra | The Mighty Programmer | Medium](https://medium.com/the-mighty-programmer/kruchtens-views-of-software-design-e9088398c592)
- [Understanding the 4+1 Architectural View Model | by Tharushi Lakshani | Medium](https://medium.com/@tharushilakshani81/understanding-the-4-1-architectural-view-model-dd32d0b17e53)
- [(PDF) A 4+1 View Model of Software Architecture](https://www.researchgate.net/publication/238381956_A_41_View_Model_of_Software_Architecture)
- [[2006.04975] Architectural Blueprints: The 4+1 View Model of Software Architecture](https://arxiv.org/abs/2006.04975)
- [4+1 architectural view model - Wikipedia](https://en.wikipedia.org/wiki/4+1_architectural_view_model)
- [Kruchten’s 4 + 1 views of Software Design | The Mighty Programmer](https://themightyprogrammer.dev/article/kruchten-software-view-model)
- [4+1 | Software Architecture Guild](https://software-architecture-guild.com/guide/competencies/modeling/frameworks/4-plus-1/)
- [How do you use bounded contexts and context maps to define the boundaries and relationships of your domains?](https://www.linkedin.com/advice/0/how-do-you-use-bounded-contexts-context-maps)
- [Context mapping in Domain Driven Design | by Chen Chen | Ingeniously Simple | Medium](https://medium.com/ingeniouslysimple/context-mapping-in-domain-driven-design-9063465d2eb8)
- [Context Mapping in Domain-Driven Design | Avanscoperta](https://www.avanscoperta.it/en/context-mapping/)
- [Context Mapping - What Is Domain-Driven Design? [Book]](https://www.oreilly.com/library/view/what-is-domain-driven/9781492057802/ch04.html)
- [Strategic DDD by Example: Bounded Contexts Mapping | by Jarek Orzel | Level Up Coding](https://levelup.gitconnected.com/strategic-ddd-by-example-bounded-contexts-mapping-d94ffcd45954)
- [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html)
- [system design domain driven design bounded context and context mapping c6ecda3c935f](https://solutions-architect.medium.com/system-design-domain-driven-design-bounded-context-and-context-mapping-c6ecda3c935f)
- [ddd contextmapping](https://www.infoq.com/articles/ddd-contextmapping)
- [(PDF) Ulrich, W. & Reynolds, M. (2010). Critical systems heuristics](http://www.academia.edu/11403010/Critical_systems_heuristics)
- [(PDF) Critical Systems Heuristics](https://www.academia.edu/18042593/Critical_Systems_Heuristics)
- [(PDF) Ulrich, W. (1987). Critical heuristics of social systems design](https://www.academia.edu/23198797/Ulrich_W_1987_Critical_heuristics_of_social_systems_design)
- [Critical system heuristics | Better Evaluation](https://www.betterevaluation.org/en/plan/approach/critical_system_heuristics)
- [(PDF) Critical Systems Heuristics](https://www.researchgate.net/publication/43642939_Critical_Systems_Heuristics)
- [Assessing assumptions about boundaries with critical systems heuristics – Integration and Implementation Insights](https://i2insights.org/2022/05/24/critical-systems-heuristics/)
- [A brief introduction to Critical Systems Heuristics (CSH)](https://wulrich.com/downloads/ulrich_2005f.pdf)
- [The 4 Quadrants by Ken Wilber. I / We / It / Its | by Justin Bolognino | Medium](https://medium.com/@jbolognino/the-4-quadrants-26fe1a96ef30)
- [Understand Ken Wilber's AQAL Model: Introducing Integral Theory [[New Eps Spotify & Apple Pods]] - YouTube](https://www.youtube.com/watch?v=8xnsgaVdnxM)
- [Ken Wilber Fundamentals: The Four Quadrants For Newbies - Deep Psychology Podcast](https://deep-psychology.com/ken-wilber-four-quadrants/)
- [The AQAL Cube for Dummies - Integral Leadership Review](http://integralleadershipreview.com/9013-the-aqal-cube-for-dummies/)
- [Ken Wilber's Integral Theory: The AQAL Map Explained](https://thalira.com/blogs/quantum-codex/integral-theory-ken-wilber)
- [Integral Theory: Learning and Leadership, Part 2](https://www.bhavanalearning.com/integral-theory-learning-leadership-part-2/)
- [The AQAL Model Explained: Ken Wilber's Integral Framework for Coaching and Leadership - AI Coach System](https://aicoachsystem.com/aqal-model-integral-theory-guide/)
- [Ken Wilber's AQAL Integral Theory Map — Building the Life You Want](https://www.buildingthelifeyouwant.com/blog/an-integral-theory-map)
- [Integral theory](https://en.wikipedia.org/wiki/Integral_theory)
- [GIS in Urban Planning: Application, Tools & Examples](https://www.maptionnaire.com/blog/gis-in-urban-planning-benefits-application-examples)
- [Real-time collaborative GIS: A technological review - ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S092427161500221X)
- [What Is GIS Mapping? Breaking Down Its 5 Layers](https://dna.firstam.com/insights-blog/the-5-layers-of-gis-mapping-what-they-are-and-how-they-work)
- [Full article: GISualization: visualized integration of multiple types of data for knowledge co-production](https://www.tandfonline.com/doi/full/10.1080/00167223.2019.1605301)
- [1000 GIS Use Cases - Real-world examples of GIS applications](https://atlas.co/gis-use-cases/)
- [Participatory GIS - an overview | ScienceDirect Topics](https://www.sciencedirect.com/topics/earth-and-planetary-sciences/participatory-gis)
- [Full article: Leveraging GIS for policy design: spatial analytics as a strategic tool](https://www.tandfonline.com/doi/full/10.1080/25741292.2025.2474784)
- [Proqio Blogs | Understanding GIS Layers and Their Application in Infrastructure Projects: A Guide to Proqio's 5 Map Types](https://www.proqio.com/blog/understanding-gis-layers)
- [Outline Classroom Discussions with Kialo Edu – TCEA TechNotes Blog](https://blog.tcea.org/outline-classroom-discussions-with-kialo-edu/)
- [How argument mapping trains critical thinking on Kialo Edu](https://blog.kialo-edu.com/critical-thinking/how-argument-mapping-trains-critical-thinking-on-kialo-edu/)
- [Kialo Edu - Canvas](https://canvas.rutgers.edu/external-apps/kialo-edu/)
- [Company:Kialo - HandWiki](https://handwiki.org/wiki/Company:Kialo)
- [Kialo](https://en.wikipedia.org/wiki/Kialo)
- [Kialo Discussion - Google Workspace Marketplace](https://workspace.google.com/marketplace/app/kialo_discussion/271471745322)
- [Kialo: Learn How to Map Argument Structure (External) – Resources for Teaching: Inspiration and Sources from IUPUI and Beyond](https://iu.pressbooks.pub/resourceconveniencestore/chapter/kialo-external/)
- [AMQuestioner: Training Critical Thinking with Question- ...](https://zhenhuipeng.com/docs/cscw2025_amquestioner.pdf)
- [workspace.google.com](https://workspace.google.com/marketplace/app/debates_kialo/271471745322?hl=ar)
- [The Joys of Polarity Mapping - UX Mastery](https://uxmastery.com/the-joys-of-polarity-mapping/)
- [Polarity Management – Leveraging the Power of “And” | Lead Read Today](https://fisher.osu.edu/blogs/leadreadtoday/polarity-management-leveraging-power-and)
- [Polarity Management: Identifying and Managing Unsolvable Problems: Johnson Ph.D., Barry: 9780874251760: Amazon.com: Books](https://www.amazon.com/Polarity-Management-Identifying-Managing-Unsolvable/dp/0874251761)
- [Barry Johnson - Creator of the original Polarity Map and ...](https://www.linkedin.com/in/barry-johnson-32871056/)
- [POLARITY MAP® by Barry Johnson, Polarity Management, Polarity Thinking concepts practices and tools. — Polarity Partnerships](https://www.polaritypartnerships.com/the-power-of-pact)
- [Resource:Polarity Mapping - University Innovation Fellows](https://www.universityinnovation.org/wiki/Resource:Polarity_Mapping)
- [Polarity Partnerships](https://www.polaritypartnerships.com/)
- [Navigating Complexity: Managing Polarities - Harvard Business Impact](https://www.harvardbusiness.org/insight/navigating-complexity-managing-polarities/)
- [Polarity Resource Portal | Welcome to Polarity Partnerships, your home for Polarity Maps and Polarity Assessments](https://polaritypracticetools.com/)
- [What is JSON-LD?. Future-Proof Your Data with JSON-LD | by Kevin Doubleday | Fluree PBC | Medium](https://medium.com/fluree/what-is-json-ld-e6ddaf1611f7)
- [RDF AND JSON-LD UseCases - Data on the Web Best Practices](https://www.w3.org/2013/dwbp/wiki/RDF_AND_JSON-LD_UseCases)
- [What is JSON-LD? | Fluree](https://flur.ee/fluree-blog/what-is-json-ld/)
- [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD)
- [JSON-LD tutorial | NeuroWeb — Official documentation](https://docs.neuroweb.ai/knowledge-mining/knowledge-mining-kit/json-ld-tutorial)
- [JSON-LD Serialization - Linked Art](https://linked.art/api/1.0/json-ld/)
- [JSON-LD | NIEM GitHub](http://niem.github.io/json/reference/json-ld/)
- [Using JSON-LD - linkml documentation](https://linkml.io/linkml/howtos/using-jsonld.html)
- [RO-Crate JSON-LD | Research Object Crate (RO-Crate)](https://www.researchobject.org/ro-crate/specification/1.2/appendix/jsonld.html)

## User:

> 5/30/2026 8:29:48

Show me some initial entry points to varela and maturana’s work

## Assistant:

> 5/30/2026 8:30:26

> Charted pedagogical pathway through foundational texts and key concepts.
>
> - I'm recognizing this is a conceptual question about two foundational thinkers in cognitive science and philosophy, so I can draw from my existing knowledge without needing current information. Let me map out their most important contributions—autopoiesis as their central biological concept about self-producing systems, structural coupling describing how organisms interact with their environment, their work on cognition as embodied and enactive rather than representational, and the crucial role of the observer in any system of knowledge. I should identify which of these ideas serve as the clearest entry points for someone new to their work.
>   
>   For someone starting out, *The Tree of Knowledge* is really the gateway—it's the accessible, beautifully illustrated version that makes their ideas tangible without the technical density. *The Embodied Mind* is the crucial next step because it connects their biological framework to cognitive science and phenomenology, essentially launching enactivism as a major movement. *Autopoiesis and Cognition* is the original technical foundation but demands serious engagement. For Maturana's foundational paper on the biology of cognition and Varela's later work on ethical knowing and autonomy, these fill out the picture of how their thinking evolved and branched into different domains. I'm settling on a conversational prose structure that moves from the most accessible entry point through to deeper academic work, organized around what the user actually needs to understand rather than just listing sources.
> - **Done**

The single best entry point is **Maturana and Varela's *The Tree of Knowledge: The Biological Roots of Human Understanding*** (1987). It was deliberately written for a general audience, it is beautifully illustrated, and it walks you through the entire arc — autopoiesis, structural coupling, the nervous system, language, and what they call the "biological roots" of cognition — without assuming you have read anything else. The famous Maturana line that you have been circling all the way back to your first message, "everything said is said by an observer," is unpacked here in its original setting. If you only read one book, read this one.

After that, the two natural forks are technical and applied. The technical path is the original 1980 volume **Maturana and Varela, *Autopoiesis and Cognition: The Realization of the Living***, which collects Maturana's 1970 essay "Biology of Cognition" together with their 1972 essay "Autopoiesis: The Organization of the Living." This is dense, but the 1970 essay is freely available online and is the source text for nearly everything that comes after, including Luhmann's social systems theory. The applied path is **Francisco Varela, Evan Thompson, and Eleanor Rosch, *The Embodied Mind: Cognitive Science and Human Experience*** (1991, revised 2016), which is where Varela connects the biology of cognition to phenomenology (especially Merleau-Ponty) and to contemplative traditions, and where the term "enactivism" really lands. *The Embodied Mind* is the bridge from their biology into contemporary cognitive science, and it is the book that makes clearest why the observer-dependence claim is not a soft hand-wave but a substantive position about what minds are.

For Varela specifically, who is the more philosophically expansive of the two and the easier writer to follow, the short book **Ethical Know-How: Action, Wisdom, and Cognition** (1999) is a very compact way in, and his paper **"Neurophenomenology: A Methodological Remedy for the Hard Problem"** (1996) is the single best demonstration of how he uses the framework on a concrete scientific problem. Varela's dialogues with the Dalai Lama through the Mind and Life Institute are also a much gentler entry point if you prefer conversational format.

If you want a contemporary synthesis that does the heavy lifting of placing Maturana and Varela in the broader landscape, **Evan Thompson's *Mind in Life: Biology, Phenomenology, and the Sciences of Mind*** (2007) is the definitive one — it explicitly carries Varela's project forward after his death and connects it to current debates in philosophy of mind. **Fritjof Capra's *The Web of Life*** (1996) is the popular-science version, easier but thinner. For something free and immediate, Maturana has a number of recorded lectures and interviews on YouTube where he explains structural coupling and the observer in his own voice, which is worth doing before or alongside reading him, because his English prose is famously idiosyncratic and hearing him talk makes the writing easier to parse.

## User:

> 5/30/2026 8:39:54

What about their collaboration/convergence with buddhism

## Assistant:

> 5/30/2026 8:40:41

> Synthesized Varela's Buddhist bridge and key philosophical convergences.
>
> - Varela Buddhism Mind and Life Institute Dalai Lama collaboration
> - "Embodied Mind" Varela Nagarjuna Madhyamaka emptiness mindfulness
> - I'm ready to structure a substantive response about how Varela bridged autopoiesis with Buddhist philosophy—he was the key figure who practiced Buddhism from 1974 onward and established the Mind and Life Institute with the Dalai Lama in 1987, while Maturana himself remained largely outside this convergence, which is an important distinction to make clear.
>   
>   The Embodied Mind from 1991 is where Varela explicitly wove enactivism together with Madhyamaka Buddhism, drawing on Nagarjuna and the Yogacara and Abhidharma traditions to explore groundlessness, no-self, dependent origination, and sunyata. His later neurophenomenology program formalized this by integrating contemplative methods into neuroscience research.
>   
>   I'm noticing the user's intellectual trajectory here—they've been thinking about observer-dependence and constructed systems, which maps directly onto the Madhyamaka concept of svabhava, the idea that things lack inherent essence, just as systems lack intrinsic properties independent of their relational context. I'll write this in a mobile-friendly format with full sentences, keeping it focused but substantive across roughly two screens.
> - **Done**

One important clarification first: the Buddhist convergence is essentially Varela's project, not Maturana's. Maturana stayed within a secular biological epistemology and was actually somewhat skeptical of the spiritual framings that grew up around autopoiesis. Varela was the practitioner — he became a student of Chögyam Trungpa in 1974, was involved with the Naropa Institute, and remained a serious Buddhist for the rest of his life. So when people talk about the Maturana-Varela-Buddhism axis, they're really talking about Varela carrying the biology of cognition into dialogue with the dharma.

The institutional form of that work is the **Mind and Life Institute**, which was co-founded in 1987 by the Dalai Lama, neuroscientist Francisco J. Varela, and entrepreneur Adam Engle for the purpose of creating a rigorous dialogue and research collaboration between modern science and Buddhism. The format Varela helped design was small, multi-day, off-the-record dialogues between the Dalai Lama and a handful of scientists in Dharamsala, and many of these were later published. The first one, *Gentle Bridges* (1992), edited by Jeremy Hayward and Varela, is the most accessible volume and a good entry point. Later volumes covered emotion (*Healing Emotions*), sleep and dying (*Sleeping, Dreaming, and Dying*, which Varela himself edited), and destructive emotions. Mind and Life is also the organization that catalyzed the contemporary science of meditation — the whole Richard Davidson / contemplative neuroscience program flows out of these dialogues.

The intellectual convergence — the actual substance of the bridge — is in **The Embodied Mind** (1991), and specifically in its argument that mainstream cognitive science had to confront the fact that *there is no inner self doing the perceiving*. This is where Varela, Thompson, and Rosch turn to Madhyamaka Buddhism, particularly Nāgārjuna, as a tradition that had already thought through the implications of groundlessness without collapsing into nihilism. For Varela, Thompson, and Rosch, this view of the mind entails the rejection of objectivism: there is no common ground. For one representative of the Madhyamaka tradition, Nāgārjuna, the ego-less view of the mind is a good thing, permitting us to shed the constant anxiety and irritation of egoistic concern. The Buddhist concept of *śūnyatā* (emptiness) maps very cleanly onto the autopoietic claim you've been working with — that systems lack intrinsic essence and arise through relations. Śūnyatā refers to the idea that dharmas are empty of svabhāva, variously translated as essence, intrinsic nature, inherent existence, own being, and substance. The whole Madhyamaka critique of *svabhāva* is essentially a 2nd-century Indian version of "systems are not intrinsic."

The book also introduces *mindfulness/awareness* (the translation of *śamatha/vipaśyanā*) as a *methodology* for cognitive science — the claim being that you can't have a science of mind that excludes the first-person investigation of mind, and Buddhism happens to have spent two and a half millennia refining exactly that. This becomes Varela's late-career research program, **neurophenomenology**, where he tries to triangulate first-person reports trained by contemplative methods with third-person neural measurements. His 1996 paper "Neurophenomenology: A Methodological Remedy for the Hard Problem" is the manifesto. Evan Thompson's *Waking, Dreaming, Being* (2015) is the best continuation of this line of work after Varela's death in 2001.

The Buddhist tradition Varela engages with most deeply is Tibetan, especially Madhyamaka and Yogācāra, but *The Embodied Mind* also draws on the Abhidharma (the early systematic analysis of mind into momentary mental factors) because the Abhidharma's atomic view of experience as flickering aggregates is what allows them to make the no-self argument operate at the level of cognitive mechanism rather than just philosophy. Eleanor Rosch, the third co-author, is the bridge to cognitive psychology (she's the prototype-theory person) and brings the experimental sensibility.

For entry points, I'd suggest this order. Start with *Gentle Bridges* to get a feel for the actual dialogue format and Varela's voice in conversation with the Dalai Lama. Then read *The Embodied Mind*, which is the intellectual core. Then, if you want the deeper philosophical grounding, Jay Garfield's translation and commentary on Nāgārjuna (*The Fundamental Wisdom of the Middle Way*) is the standard reference, and Garfield himself has been a Mind and Life participant and writes accessibly. For the contemporary continuation, Thompson's *Mind in Life* and *Waking, Dreaming, Being*, and B. Alan Wallace's work (Wallace was Varela's interpreter for years and is unusual in being both a Tibetan-trained monastic and a PhD in religious studies).

One honest note: there's an ongoing debate about whether the *Embodied Mind* reading of Buddhism is too quick, particularly on the question of whether emptiness really aligns with enactivism or whether Varela was importing a Romantic-Western reading. Thompson himself has acknowledged shortcomings, especially in their depiction of Buddhist philosophy — the Indian Buddhist Abhidharma school and the writings of the Madhyamaka philosopher Nāgārjuna, in his "in hindsight" reflections on the book. So treat *The Embodied Mind* as the beginning of the conversation, not the final word.

---

**Sources:**

- [The Lama in the Lab - Tricycle: The Buddhist Review](https://tricycle.org/magazine/lama-lab/)
- [InvestigatingTheMind.org - AboutUs](https://aboutus.com/InvestigatingTheMind.org)
- [Dalai Lama Holds 35th Anniversary Dialogue with the Mind & Life Institute - Buddhistdoor Global](https://www.buddhistdoor.net/news/dalai-lama-holds-35th-anniversary-dialogue-with-the-mind-life-institute/)
- [Bridging Science and Buddhism: The Dalai Lama's 100 Year Vision - Mind & Life Institute](https://www.mindandlife.org/insight/bridging-science-and-buddhism-the-dalai-lamas-100-year-vision/)
- [Mind & Life Institute – The Frederick P. Lenz Foundation](https://fredericklenzfoundation.org/mind-life-institute/)
- [Mind %26 Life Institute](https://en.wikipedia.org/wiki/Mind_%26_Life_Institute)
- [Mind & Life Institute - Wikipedia](https://en.wikipedia.org/wiki/Mind_&_Life_Institute)
- [An Interview with Francisco Varela - Techgnosis](https://techgnosis.com/interview-with-francisco-varela/)
- [the dalai lama and scientists unite to study meditation](https://news.wisc.edu/the-dalai-lama-and-scientists-unite-to-study-meditation)
- [Reading List – London Radical Mindfulness](https://londonradicalmindfulness.wordpress.com/reading-list/)
- [Varela -Embodied Mind | Edmund Husserl | Mind](https://www.scribd.com/doc/259242707/Varela-Embodied-Mind)
- [The Embodied Mind in Hindsight](https://philosophyofbrains.com/2017/01/23/the-embodied-mind-in-hindsight.aspx)
- [Madhyamaka](https://en.wikipedia.org/wiki/Madhyamaka)
- [The Embodied Mind, revised edition: Cognitive Science and Human Experience - DOKUMEN.PUB](https://dokumen.pub/the-embodied-mind-revised-edition-cognitive-science-and-human-experience.html)
- [The Embodied Mind, revised edition: Cognitive Science and Human Experience - Francisco J. Varela, Evan Thompson, Eleanor Rosch - Google Books](https://books.google.com/books/about/The_Embodied_Mind.html?id=gzLaDQAAQBAJ)
- [The Embodied Mind: Cognitive Science and Human Experience – Metapsychology Online Reviews](https://metapsychology.net/index.php/book-review/the-embodied-mind-cognitive-science-and-human-experience/)
- [Cutting Through Spiritual Materialism](https://www.goodreads.com/notes/20520937-cutting-through-spiritual-materialism/117845444-zach-kolp?page=9)

## User:

> 5/30/2026 8:44:07

And then into the upcoming event at Upaya

## Assistant:

> 5/30/2026 8:44:47

> Traced intellectual convergence toward upcoming contemplative science retreat.
>
> - The user is asking about an upcoming event at Upaya Zen Center in Santa Fe that connects to the Varela/Maturana/Buddhism thread they mentioned earlier, so I should search for what's happening there.
> - Upaya Zen Center upcoming event Varela Buddhism cognitive science 2026
> - I'm noticing how this conversation has traced a remarkable arc — starting from the observation that systems are observer-dependent, moving through organizational silos and alternative frameworks, then into tools like DSRP and Plectica for reshaping how we see reality, and eventually arriving at the deeper philosophical territory of Maturana and Varela's work on cognition and enaction. What's striking is that this intellectual journey has led directly to a concrete opportunity: there's an actual Varela Contemplative Science Retreat happening at Upaya in August, which feels like the natural culmination of following this thread. This event is the perfect convergence—everything they've been exploring about systems, perspective, and direct experience crystallizes here in August, just three months away, with exactly the right people asking exactly the right questions about science's blind spot.
> - **Done**

The thread you've been pulling on lands almost too neatly at Upaya's upcoming event. Upaya runs an annual **Varela Symposium** (formerly called "Zen Brain") and a companion **Varela Contemplative Science Retreat**, both named for Francisco Varela because Dr. Varela was a close associate of Upaya's abbot, Roshi Joan Halifax, and a frequent visitor to Upaya in its early years, and he was an important influence on the ethos of Upaya. So the lineage you've been tracing — observer-dependence, enactivism, the bridge to Buddhism — is institutionally alive at Upaya in a very direct way.

The upcoming one is the **Varela Contemplative Science Retreat, August 20–23, 2026**, available both in-person at Upaya in Santa Fe and online. The Varela Contemplative Science Retreat is a joint collaboration between Upaya Zen Center and Mind and Life Institute. The retreat honors and is named for the seminal contributions of neuroscientist, philosopher, and Buddhist practitioner, Francisco Varela. The faculty this year is the astrophysicist Adam Frank, the cognitive scientist Molly Crockett, the Buddhist philosopher John Dunne, and Zen teacher Roshi Joan Halifax, with Crockett, Dunne, Frank, and Roshi Joan as long-time Buddhist practitioners coming from the Theravada, Tibetan, and Zen schools respectively. The format is worth knowing about: this is a retreat, not a conference nor a conventional program, meaning the intellectual content is embedded in the stream of practice rather than delivered as a sequence of talks.

The theme this year sits squarely on the thread you've been working. The retreat will focus on how many believe that science gives us an incontrovertible view of reality, and how this perspective has us turning away from the role of our direct experience — what has been called "the blind spot" in science and the Western worldview. The "blind spot" is a direct reference to Adam Frank, Marcelo Gleiser, and Evan Thompson's 2024 book *The Blind Spot*, which is the contemporary continuation of Varela's project — the argument that science has systematically excluded the experiencing subject from its picture of the world, and that this exclusion produces a metaphysics, not just a method. Frank is one of the authors, so he'll be teaching from inside that book.

Molly Crockett's piece of the retreat is the one that maps most cleanly onto your original question about systems and perspectives. Cognitive scientist Molly Crockett will explore the relationship between self and society, power and knowledge, and technology and culture. She will share that knowing the world is, in fact, a collective endeavor that is advanced, enriched, and deepened by including different perspectives on reality into our lived and collective experience. That's almost a paraphrase of where this conversation started — that the same underlying reality can be cut differently by different observers, and that the differences are generative rather than just noise to be reconciled. Roshi Joan, from the Zen side, is going to frame how realization itself is embodied, collective, context sensitive, and in this very moment, as it is, which is the Mahāyāna version of the same claim.

A few practical notes. Upaya runs these as proper sesshin-style retreats with early mornings, silence, and zazen, so the intellectual content sits inside a contemplative container rather than next to one — which is faithful to how Varela himself thought science and practice should meet, but worth knowing if you're choosing between in-person and online. The online option preserves the talks and dialogue but obviously not the embodied container. There are recordings from past Varela Symposia available free on Upaya's website if you want to sample the format before committing — the 2022 session with Richard Davidson on the four pillars of well-being and the one with Abeba Birhane on machine learning and human indeterminacy are both worth listening to as a calibration. And if you want background reading specifically for *this* retreat, *The Blind Spot* by Frank, Gleiser, and Thompson is the single most direct preparation, since two of its central ideas — that science has a structural blind spot for experience, and that the way through is enactive and contemplative — are essentially the curriculum.

---

**Sources:**

- [VARELA CONTEMPLATIVE SCIENCE RETREAT - In Person + Online - Upaya Zen Center](https://www.upaya.org/program/varela-contemplative-science-retreat-in-person-2026/)
- [Varela International Symposium—Experience & Self-Transcendence - Upaya Zen Center](https://www.upaya.org/program/varela-contemplative-science-retreat-online-2026/)
- [Upaya Zen Center & Buddhist Monastery | Santa Fe, New Mexico - A Santa Fe, NM Zen center and community with retreats, daily meditation, weekly Dharma talks on Buddhist teachings](https://www.upaya.org/)
- [Varela - Upaya Zen Center](https://www.upaya.org/science-and-buddhism/)
- [VARELA SYMPOSIUM (formerly Zen Brain): Transforming Conflict – From Science to Real World Applications - Upaya Zen Center](https://www.upaya.org/program/varela-symposium-formerly-zen-brain-transforming-conflict-science-real-world-applications/)
- [VARELA SYMPOSIUM (formerly “Zen Brain”) - Upaya Zen Center](https://www.upaya.org/social-action/zen-brain/)
- [Upaya Zen Center: AWAKENED ACTION – Everyday Zen Foundation](https://everydayzen.org/event/upaya-zen-center-awakened-action/)

## User:

> 5/30/2026 8:47:34

Given this arc - summarize entry point(s) and progression

## Assistant:

> 5/30/2026 8:47:53

Here's a coherent progression that mirrors the arc this conversation actually traced.

**Start with the foundational claim — that systems are observer-dependent.** Read **Maturana and Varela's *The Tree of Knowledge*** (1987). This is the gentlest entry into autopoiesis, structural coupling, and the famous "everything said is said by an observer." It establishes the philosophical ground that everything downstream builds on.

**Then make the move from biology to mind.** Read **Varela, Thompson, and Rosch's *The Embodied Mind*** (1991, revised 2016). This is where the biology of cognition meets cognitive science and, critically, where the bridge to Buddhism gets built — particularly to Madhyamaka emptiness and the Abhidharma analysis of mind. This is the central text of the whole arc. If you only read two books, these are the two.

**Then locate yourself in the contemporary continuation.** Read **Frank, Gleiser, and Thompson's *The Blind Spot*** (2024). This is the direct preparation for the Upaya retreat in August and the current expression of Varela's program — the argument that science has systematically excluded experience from its picture of reality, and that the way through is enactive and contemplative. Adam Frank is teaching at the retreat, so reading this beforehand means you walk in already inside the conversation.

**Then go to the retreat as the embodied integration.** The **Varela Contemplative Science Retreat at Upaya, August 20–23, 2026**, is the place where the intellectual thread becomes lived practice rather than just reading. The format — Mind and Life plus Upaya, four teachers across Theravada, Tibetan, and Zen, content embedded in zazen rather than delivered as lectures — is the most faithful contemporary expression of how Varela himself thought science and contemplative practice should meet.

Three optional side paths if you want to deepen specific branches:

For the **Buddhist philosophical grounding**, read Jay Garfield's translation of Nāgārjuna's *Mūlamadhyamakakārikā* (*The Fundamental Wisdom of the Middle Way*). This is the source text for the emptiness arguments *The Embodied Mind* leans on.

For the **practitioner-to-practitioner dialogue**, read *Gentle Bridges* (Hayward and Varela, 1992), the first published Mind and Life dialogue. It's the most human introduction to the Varela–Dalai Lama relationship and gives you the texture of how these conversations actually unfold.

For the **deeper philosophical synthesis**, read **Evan Thompson's *Mind in Life*** (2007) and *Waking, Dreaming, Being* (2015). Thompson is the person carrying Varela's project forward, and these are the rigorous continuations of the arc into philosophy of mind and the science of consciousness.

The throughline across all of it: systems aren't intrinsic, the observer is part of the system, experience is not noise to be excluded but the ground that science has been standing on without noticing. *Tree of Knowledge* makes the claim biologically. *Embodied Mind* makes it cognitively and connects it to a tradition that has thought about it for two millennia. *The Blind Spot* makes it about the present moment in science. The Upaya retreat makes it something you do rather than something you read.

## User:

> 5/30/2026 9:00:32

What are the names for the idea I started with?

## Assistant:

> 5/30/2026 9:00:55

The idea you started with — that systems aren't intrinsic features of reality but are produced by the observer who draws distinctions — has several names depending on which tradition is naming it.

**Constructivism** is the broadest philosophical label, with **radical constructivism** (Ernst von Glasersfeld) being the strongest version. The "radical" part is the claim that we don't discover pre-existing structures but actively construct them.

**Second-order cybernetics** is the cybernetics term for it, sometimes called "the cybernetics of observing systems" rather than "the cybernetics of observed systems." Heinz von Foerster coined the distinction, and his line "objectivity is a subject's delusion that observing can be done without him" is the slogan. This is probably the most precise name for what you described.

**Observer-dependence** or the **observer problem** is the plain-English version, used across systems thinking, physics, and philosophy of science.

**Distinction-making** is the term from George Spencer-Brown's *Laws of Form* and the tradition it spawned. Spencer-Brown's opening line "Draw a distinction" is the foundational move — the claim that all form arises from an act of distinction by an observer. This is what DSRP's "D" comes from.

**Enactivism** (Varela, Thompson, Rosch) is the name for it specifically in cognitive science — the view that cognition enacts a world rather than representing a pre-given one. "The world is not pre-given, it is enacted through perception and action."

**Autopoietic epistemology** or the **Santiago theory of cognition** is Maturana and Varela's specific version inside biology.

**Operational closure** and **structural coupling** are the mechanism names — they describe *how* an autopoietic system constructs its world from inside its own organization rather than from outside.

**Social constructionism** (Berger and Luckmann's *The Social Construction of Reality*) is the sociological cousin, focused on how shared social systems get constructed and then experienced as objective. **Luhmann's social systems theory** is the most rigorous extension of this into how organizations and institutions self-produce as systems of distinctions.

**Frame, lens, paradigm, worldview, gestalt** are the everyday vocabulary. **Paradigm** is Kuhnian, **frame** is Goffman and lakoff, **gestalt** is the perceptual psychology version, **worldview** is the philosophical-cultural version.

In **Buddhist philosophy**, the closest term is **śūnyatā** (emptiness) — the claim that things lack *svabhāva* (intrinsic essence) and arise through dependent origination (*pratītyasamutpāda*). This is the version Varela was drawing on.

In **phenomenology**, it's the **noetic-noematic correlation** (Husserl) — the claim that consciousness is always consciousness *of* something, and that subject and object co-arise rather than existing independently.

If you want the single most precise name for the specific claim you opened with — that the same underlying reality can be cut differently by different observers to produce different systems — the cleanest fit is **second-order cybernetics** or **constructivist epistemology**, with **enactivism** as the cognitive-science version and **distinction-making** (Spencer-Brown / DSRP) as the operational version.

The deeper pattern: every one of these names is itself a distinction drawn by an observer naming the act of distinction. The idea is self-referential in a way that none of its names quite escape.

## User:

> 5/30/2026 9:03:07

Are there popular - horizontal - tools for enabling frames, enactivisim, social systems - i.e. where tools like tana and obsidian go with personal content but expanded to have this capability in one dimension and expanded to have both individual and social in the other dimension

## Assistant:

> 5/30/2026 9:04:11

> Mapped tool landscape across personal-social and lens-explicit axes, identified gap.
>
> - I'm parsing what they're really asking for—tools that sit at the intersection of personal knowledge management with collaborative features, while also supporting those perspective-shifting capabilities we've been discussing. They want something general-purpose rather than domain-specific, and they're looking for that sweet spot between individual and collective use.
>   
>   Let me map out what's actually in this space. The personal knowledge tools like Tana, Obsidian, and Notion are horizontal and flexible, but they mostly treat lenses as implicit—buried in tags and filters rather than being first-class objects. Some are getting closer: Tana's supertags and views, Notion's named views on databases, Capacities' object types, and Heptabase's whiteboards all push toward making perspectives more explicit. Then there's the social dimension—Notion workspaces, Coda, and Roam's shareable graphs bridge personal and collaborative, though most work management tools like Linear and Asana skew more vertical and specialized.
>   
>   On the explicitly social side with lenses as artifacts, I'm seeing Are.na with its channels, Pol.is for collective intelligence, Kialo's argument maps, and tools like Hypothes.is that layer shared annotations on top of content. The real insight is mapping this onto a 2x2: personal with explicit lenses (Tana, Obsidian with Dataview, Heptabase), personal with implicit lenses (Roam, Logseq), social with explicit lenses (Are.na, Kialo, Pol.is, shared Notion databases), and social with implicit lenses (Slack, Discord, Twitter). The gap the user is really pointing at is whether there's a social equivalent of Tana that treats frames as first-class objects and spans both personal and collective use.
>   
>   The honest answer is there's a real gap here. Most tools fall into silos—domain-specific ones like ArchiMate or dbt, personal tools with hidden lenses like Obsidian and Roam, or social platforms that don't prioritize the lens itself like Slack and Notion. Are.na gets closest on the social side by making channels explicit lenses, though it's limited as a knowledge workspace. Notion and Coda let teams work across personal and shared views, but the lens is just a UI layer, not a conceptual artifact. Tana's supertags hint at something closer to lens-as-object, but it hasn't fully bridged the personal-social divide.
>   
>   The more interesting examples come from the perspective-surfacing angle. Pol.is is genuinely fascinating—it visualizes opinion clusters as different lenses on the same claims at social scale, which is why it's been used by vTaiwan and The New York Times. There's a whole ecosystem of tools exploring this: collective deliberation platforms like Loomio and Decidim, community conversation tools like Cortico, AI-assisted perspective clustering with Remesh, and annotation layers like Hypothes.is that create shared lenses over web content. Even Roam's Discourse Graph plugin moves in this direction by making claims and evidence explicit as structured objects rather than buried in prose.
>   
>   Then there are the systems mapping and concept mapping tools—Kumu and Plectica both have explicit perspectives features built in. The horizontal collaboration tools like Miro and Mural are interesting because they're lens-agnostic; whatever workshop method you bring (rich pictures, polarity maps, CLA grids) becomes the lens, but the tools themselves don't enforce that structure. Annotation tools like Recogito and Pundit work similarly, where the annotation layer itself becomes the shared lens. Some tools like Twine and Substack-style platforms aren't really lens-first at all.
>   
>   What strikes me is that the closest approximation to what we're looking for—something that combines social features with lens-as-a-first-class concept—would be a hybrid of several existing tools: Notion or Coda's named views that can be shared across users, Are.na's curatorial lenses as social objects, Pol.is's ability to cluster perspectives at scale, and the lens-first mapping approach of Kumu or Plectica. But honestly, none of them really solve this completely. There's a real gap here in the tool landscape.
>   
>   Now I'm re-reading the question more carefully to make sure I'm addressing what they're actually asking for. They're describing two axes: one moving from personal content management (like Tana or Obsidian) toward tools that support frames, enactivism, and social systems; the other spanning from individual to social. They want horizontal, general-purpose tools that work across both dimensions. That's a more precise framing than I initially had, and it clarifies what's actually missing.
> - **Done**

Honest answer first: this quadrant is sparsely populated. The horizontal personal-knowledge tools (Tana, Obsidian, Roam, Logseq, Capacities, Heptabase) treat the *content* as first-class but the *lens* as implicit — tags, queries, and filters that the user assembles in their head. The horizontal social tools (Slack, Discord, Notion-as-wiki) treat the *conversation* or *page* as first-class but don't make the frame an object at all. The tools that *do* make the lens first-class tend to be either domain-specific (ArchiMate, dbt, Plectica) or single-purpose (Kialo for arguments, Are.na for curation). The "Tana but horizontal and social and lens-first" tool you're describing mostly doesn't exist yet, which is interesting in itself.

Here's what fills the corners and what's closest to the center.

**Closest in the personal-lens-explicit corner:** Tana with supertags comes the closest of the PKM tools, because a supertag is genuinely a reusable structural lens rather than just a label — it carries fields, views, and behaviors that travel with anything you tag. Heptabase's whiteboards function as named spatial lenses on the same underlying cards. Obsidian with Dataview is the power-user version, but the lens lives in query syntax rather than as a named object. Capacities is built around "object types" which are closer to lens-as-thing.

**Closest in the social-lens-explicit corner:** Are.na is the most "horizontal" tool I know where the lens *is* the primary artifact — a channel is explicitly a curatorial cut, channels can be forked and remixed, and people follow each other's channels as a way of subscribing to lenses rather than to feeds. Notion and Coda span personal-and-team and expose multiple named views on the same database, which is a lighter version of the same idea (the lens is a configuration, but it's shared, linkable, and ownable). Kumu does this for systems and network maps with its Perspectives feature, and Plectica does it for DSRP-style concept mapping.

**Closest in the explicitly-social-systems corner:** Pol.is is the most interesting tool nobody outside civic-tech circles has heard of. It's used by vTaiwan, The New York Times, and others to surface clusters of opinion on contested issues — participants vote on statements, and Pol.is uses dimensionality reduction to show the different "groups" (i.e., the different lenses) that emerge from the same set of claims. The lens is computed rather than authored, which is genuinely novel. Remesh, Cortico's Local Voices Network, and Talkmap are adjacent tools that do AI-assisted perspective clustering. Loomio and Decidim sit in collective-deliberation territory but treat the *proposal* as the artifact rather than the lens.

**Closest in the annotation-layer corner:** Hypothes.is treats annotations as a portable layer on top of any web document, and the annotation set is a shareable lens — a class can subscribe to its professor's annotations, a research group can layer interpretation over a corpus. Built on the W3C Web Annotation standard so the lenses are interoperable rather than locked to one platform. Recogito and Pundit are the more academic variants.

**Closest in the workshop-canvas corner:** Miro, Mural, and FigJam are horizontal and span individual-to-social, but the lens is "whatever template you drop in" (a rich picture, a polarity map, a CLA grid). They host the artifacts more than they enforce or make first-class the underlying frame. This is why they're popular but feel slightly empty — they don't have an opinion about *what kind of cut* you're making.

If I had to name the gap precisely, it's this: a horizontal tool where (1) lenses are named, ownable, forkable objects with URLs, (2) the same underlying content can be projected through multiple lenses, (3) the tool spans individual sense-making and group sense-making without forcing you to switch products, and (4) it doesn't presuppose a single methodology (DSRP, ArchiMate, polarity, CLA). The closest near-misses are Are.na (great on lens-as-social-object but thin on structured content), Tana (great on structured personal content but social and lens-first are both stretched), and Pol.is (great at surfacing emergent lenses at scale but only for opinion data).

The most interesting frontier is whether a tool can make *frames themselves* the social object — channels of lenses, forks of frames, version histories of how a community is currently cutting reality — rather than just letting people share the content they produced through their private frames. As far as I know, nobody has built it yet. Are.na is the philosophical closest. The semantic-layer world (dbt, Cube) is the technical closest. The convergence hasn't happened.

## User:

> 5/30/2026 9:07:03

Are there several 2x2’s to give an overview of these findings?

## Assistant:

> 5/30/2026 9:07:32

Yes — a few different 2x2s clarify different things. Here are the ones that actually carry signal.

**2x2 #1: Lens-as-artifact × Scope of use**

The axes are *how first-class is the lens* (implicit configuration → named, ownable, versioned object) and *who uses it* (individual → collective). This is the one that matches your question most directly.

- Lower-left (implicit + individual): Obsidian with filters, Roam queries, personal Notion views. The lens lives in the user's head.
- Upper-left (first-class + individual): Tana supertags, Heptabase whiteboards, Capacities object types. The lens is a real object but stays personal.
- Lower-right (implicit + collective): Slack channels, Discord servers, Notion team wikis, Miro boards. Shared space, but no named frame.
- Upper-right (first-class + collective): Are.na channels, Plectica perspectives, Kumu perspectives, ArchiMate viewpoints, dbt semantic layer, Pol.is opinion clusters, Hypothes.is annotation layers. The lens is the social object.

The upper-right is where the gap you intuited lives — it's populated, but only by domain-specific tools, not by a horizontal one.

**2x2 #2: What kind of cut is first-class**

The axes are *what the lens is made of* (stakeholder concern ↔ epistemic stance) and *where it operates* (data/schema ↔ interpretation/meaning).

- Schema + stakeholder: ArchiMate viewpoints, Kruchten 4+1, BIM views, GIS layer sets. "Here's how the architect sees the building; here's how the MEP engineer sees it."
- Schema + epistemic: dbt semantic layer, JSON-LD @context, GraphQL schemas, DDD bounded contexts. "Here's what 'customer' means in this context."
- Meaning + stakeholder: Plectica perspectives, Kumu perspectives, Polarity Maps, Soft Systems root definitions. "Here's how marketing sees this problem vs engineering."
- Meaning + epistemic: CLA (litany/system/worldview/myth), AQAL quadrants, DSRP, CSH boundary questions. "Here's the deep frame that's shaping how we're seeing this at all."

This one is useful because it shows that "lens" doesn't mean one thing — there are at least four distinct families, and they don't compete with each other so much as operate at different layers of the stack.

**2x2 #3: Authored vs. emergent × Static vs. living**

The axes are *who makes the lens* (a person authors it ↔ it emerges from collective behavior) and *whether it changes* (fixed once made ↔ continuously updated).

- Authored + static: ArchiMate viewpoints, Polarity Maps, CLA grids, a one-off Plectica perspective. Someone draws the lens, it stays put.
- Authored + living: dbt semantic layer, Tana supertags, Are.na channels, Kumu perspectives. The lens has an owner who maintains it as reality changes.
- Emergent + static: A snapshot Pol.is report, an opinion cluster from a one-off Remesh session. The lens fell out of the data, then froze.
- Emergent + living: Pol.is run continuously, recommendation-algorithm clusters, knowledge-graph communities computed on the fly. The lens is recomputed as new behavior arrives.

The emergent quadrants are the most interesting and the least developed. Almost nothing in the upper-right of 2x2 #1 is also in the emergent half of this one. Tools that *compute* lenses from collective behavior rather than asking someone to author them are still rare.

**2x2 #4: Theoretical depth × Practical adoption**

The axes are *how rigorous the underlying theory is* (light heuristic ↔ deep theoretical commitment) and *how widely used the tool is* (niche ↔ mainstream).

- Light + mainstream: Notion views, Miro templates, Slack channels, saved Jira filters. Everyone uses them; the theory is "this filter is useful."
- Light + niche: Are.na channels, Kialo argument maps. Small but devoted communities.
- Deep + mainstream: dbt semantic layer, ArchiMate, GIS, BIM. Heavy theory deployed at enterprise scale, but the theory is hidden behind tooling.
- Deep + niche: Plectica/DSRP, CSH, AQAL, CLA, Polarity Mapping, Pol.is. Rigorous frameworks, narrow adoption.

This 2x2 explains the market gap better than any other. The deep-and-niche tools have the theory you actually want; the light-and-mainstream tools have the adoption. Almost nothing sits in the upper-right where deep theory meets mass adoption *and* keeps the lens first-class. dbt is the closest, and it only works because the lens is constrained to "metric definitions" rather than asking users to do full epistemic work.

If I had to pick the single most useful one for your purposes, it's #1, because it most directly answers "is there a Tana for shared lenses?" The answer it gives is: the upper-right exists but is fragmented across single-purpose tools, and the horizontal-and-first-class-lens-and-individual-to-social cell at the center of the grid is genuinely empty.

## User:

> 5/30/2026 9:07:37

Can you render as actual visual 2x2s

## Assistant:

> 5/30/2026 9:09:42

> Architected editorial HTML design with responsive typography and distinctive aesthetics.
>
> - I think an HTML artifact with styled 2x2 grids would work best for mobile viewing, so I'll use that approach to render the four grids visually.
> - Read frontend design skill before creating the 2x2 visual artifact
> - I'm planning to build an HTML artifact with four separate 2x2 grids that work well on mobile with vertical scrolling, styled with an editorial aesthetic that feels thoughtful rather than generic.
>   
>   Writing the HTML structure... Writing HTML with styling... I'm settling on Instrument Serif for headers, Manrope for body text, and JetBrains Mono for the technical labels, with a cream background and deep ink accented by terracotta. Now I'll build this out and save it to the outputs folder.
> - Create HTML artifact with four visual 2x2 matrices about lens/frame tools
> - Presenting file(s)...
> - **Done**

Each 2x2 has axis labels, four cells with examples, and a takeaway. The highlighted cells (warm cream tint with terracotta coordinate labels) mark the interesting spots — the gap in Matrix 01, the frontier in Matrix 03, the rare-and-constrained quadrant in Matrix 04. Read across all four and the structural reason the gap exists becomes visible: epistemic lenses stay theoretical, lens-tools stay authored rather than emergent, and deep theory rarely reaches mass adoption unless the lens is constrained to something narrow like metric definitions or architectural viewpoints.

> File: [/mnt/user-data/outputs/lens-tools-2x2s.html](https://claude.ai/api/organizations/a050e10c-b7bf-42c7-a07a-745fe92ffb0e/conversations/b3983adb-c092-4f06-8cdb-ab183df9f368/wiggle/download-file?path=%2Fmnt%2Fuser-data%2Foutputs%2Flens-tools-2x2s.html)

## User:

> 5/30/2026 9:14:33

How would you determine if there is demand for a horizontal social lens-first tool?

## Assistant:

> 5/30/2026 9:15:17

Demand discovery for a category that doesn't exist yet is a different problem than demand discovery for a known category. You can't ask people if they want a "horizontal social lens-first tool" — they don't have the concept. The question has to be reframed as: where are people *already paying a cost* that this tool would reduce, and would they recognize the tool as the answer if they saw it.

Here's how I'd actually sequence it.

**Start with the pain, not the solution.** The hypothesis is that teams and groups are doing lens-work today using tools that weren't built for it, and the friction shows up as recurring symptoms. Go find those symptoms. Look for: people who maintain parallel documents to capture "how engineering sees this" and "how product sees this" of the same thing; teams that keep relitigating the same definitional argument ("what counts as an active user?") because there's no shared artifact for the lens; companies that have a glossary or a "principles" doc that nobody updates because it's not connected to anything; consultants who keep redrawing the same frameworks (CLA, polarity maps, AQAL grids) in Miro because there's no native home for them; communities that fork each other's reading lists, link collections, or annotation sets through screenshots and Notion exports because Are.na doesn't quite fit the use case. Each of these is a workaround. Workarounds are demand signals.

**Run the five-interviews test before anything else.** Find five people who you think have this problem and ask them to walk you through the last time they did lens-work — without ever using the word "lens." Ask: "Tell me about the last time your team disagreed about how to think about something and you tried to resolve it." "Show me the document where your team's shared way of seeing X lives." "What happens when a new person joins and needs to learn how your group sees the world?" If they describe pain confidently and at length, and if the workarounds are expensive (time, repeated arguments, lost institutional knowledge), there's demand. If they shrug or describe it as fine, there isn't — or it isn't yet.

**Look at where the workaround is already a business.** Notion's "view" feature has a cousin that's actually selling: Coda, Airtable, Tana, all positioned on "multiple views of the same data." The fact that Plectica, Kumu, Are.na, and Hypothes.is exist and have paying users tells you the *atomized* demand is real. The question is whether someone would pay for a tool that horizontally combines what they currently buy across three. Look for people who use two or more of these in combination, and ask why.

**Check adjacent categories that succeeded as proxies.** Figma succeeded partly because it made "the design lens" a shared, versioned, multiplayer object instead of a personal file. Linear succeeded partly because it made "the engineering lens on the roadmap" a shared, opinionated artifact rather than a Jira filter. dbt succeeded because it made "the metric definition" a versioned, ownable object. These are all narrow versions of the move you're describing. The question is whether the *horizontal* version has the same gravitational pull, or whether the narrowness is what made each one work.

**Watch what consultants and facilitators do.** Facilitators are demand canaries for sense-making tools because they're the ones who feel the friction sharpest and have the budget and willingness to try new tools. If facilitators running CLA workshops, polarity mapping, or strategic planning sessions are buying the same three tools and gluing them together, that's a sign. The Cabreras (Plectica), the Polarity Partnerships team, the SenseMaker (Cynefin) folks, and Mind and Life affiliates all sell into this market. Talk to them about what they wish existed.

**Look at the AI-native opening specifically.** The previous wave of these tools (Miro, Plectica, Are.na) required users to *author* the lens manually. The current wave can plausibly *generate* candidate lenses from a corpus — "here are the three different ways your team has talked about this in Slack over the last six months." That changes the economics from "tool for facilitators" to "tool for any group with shared text." Tools like Granola, Glasp, Lex, and Cohere's enterprise offerings are nibbling at the edges. The demand question becomes: would people pay for a tool that *makes the lens visible* in a corpus they already produce, rather than asking them to externalize it manually?

**Run a smoke test before building.** A landing page with a clear articulation ("see how your team is actually framing this — surface the lenses hidden in your docs and conversations"), $500 of paid traffic from communities adjacent to the audience (systems thinking, knowledge management, organizational design, futures, strategy consulting), and a waitlist. Look at conversion rate, the quality of waitlist replies, and whether people self-describe the problem back to you in their own words. Then call the top twenty signups and ask them what they thought they were signing up for. If their answers cluster, there's a real shape. If they're all over the map, the concept is too abstract to sell.

**Run the negative test.** Try to articulate why this *wouldn't* work, and see if any of the reasons stick. Candidates: lens-work is a small fraction of most people's work, so the tool gets used too rarely to become habitual; the people who want this are already over-served by Miro plus Notion plus a facilitator; the lens-as-artifact concept is too abstract to onboard people into; the value only shows up in groups, but groups don't adopt tools, individuals do; the AI version solves it as a feature inside Notion/Slack/Linear before a standalone tool can build distribution. If most of these stick, the category isn't ready. If most fail when tested against real users, the category is probably underserved.

**The honest meta-point.** Demand for category-creating tools is rarely revealed by surveys or interviews directly. It's revealed by watching what people do when they don't have the tool, and by smoke-testing whether the framing of the tool's value lands. The strongest signal isn't "yes I want this" — it's "wait, can you show me that again?" followed by them describing a specific use case you hadn't mentioned. That's the moment to know there's something there.

If I had to compress this to one move: find ten people who facilitate group sense-making for a living, watch them work, and count the number of times they apologize for the tool they're using. The apology rate is the demand signal.

## User:

> 5/30/2026 9:17:55

If all of these are problem signals, are there sources of problem signals available to Claude that can be retrieved and analyzed as an initial proxy?

## Assistant:

> 5/30/2026 9:18:50

> Inventoried accessible data sources and mapped analytical approach.
>
> - The user is asking whether I can actually tap into data sources that reveal underlying demand signals—things like workarounds, complaints, and recurring patterns. I can access public web search results across forums like Reddit and Hacker News, product reviews, and social media discussions, which would give me visibility into these kinds of problem signals.
>   
>   For PKM tools specifically, I'd want to focus on communities where people are actively discussing pain points—subreddits dedicated to different tools, GitHub issues from open source projects, and community forums where users share their workflows and frustrations. I can't access private customer data or conduct direct interviews, but I can do meaningful pattern analysis across these public sources to identify what's actually causing friction. share my Obsidian setup with my team?" or "Looking for tool that does X" are signal-rich.
>   
>   2. **Hacker News** - Tool launch threads usually contain extensive workaround descriptions. "Show HN: [tool]" comments are gold for adjacent demand.
>   
>   3. **Product Hunt** - Less rich but real comments on tool launches.
>   
>   4. **GitHub issues and discussions** - especially feature request threads on Obsidian, Logseq, Roam, etc. People literally describe the missing capability.
>   
>   5. **Twitter/X via web search** - Tweets complaining about tools or asking for tools.
>   
>   6. **Are.na blocks and channels** themselves - meta-channels about "tools for thought" curate the workarounds.
>   
>   7. **Blog posts/Substacks** about workflows - "How I use Obsidian for team work" articles are demand signals when they exist.
>   
>   8. **App Store / Chrome Web Store reviews** - especially low-star reviews of tools that almost solve the problem.
>   
>   9. **Forum posts on tool-specific forums** - Obsidian forum, Notion community.
>   
>   10. **Academic literature** - papers on PKM, CSCW (Computer-Supported Cooperative Work), sense-making research.
>   
>   For the actual analysis, I'd search for specific workaround language patterns like "I wish there was a way to..." or "How do I share my..." across these sources, then look at feature request volume, identify the most-upvoted complaints, and find recurring pain categories. Rather than just describing this approach, I should offer to actually execute it—being clear about what I can retrieve directly versus what would need manual checking, and suggesting we start with a structured portion if they want.
> - **Done**

Yes — quite a lot of this is accessible via web search, and several sources are unusually signal-rich for this specific question. The structural reason is that PKM and "tools for thought" communities are unusually articulate about their workarounds — they describe them in public, at length, with examples, because their hobby *is* describing how they think with tools. That makes them retrievable in a way that, say, salespeople's CRM frustrations are not.

Here are the sources I can actually pull from, ranked by signal density for this question.

**Reddit subreddits** are the highest-signal source. r/ObsidianMD, r/Notion, r/PKMS, r/Roam, r/logseq, r/TanaInc, r/Zettelkasten, and r/ProductivityApps are full of "I wish there was a tool that..." and "How do I share my [setup] with my team?" threads. The "team" and "shared" qualifiers in personal-knowledge subreddits are exactly the workaround pattern you'd want to detect. Upvote counts give you a rough demand weighting.

**Hacker News threads on tool launches** are second-highest. Whenever a tools-for-thought product launches on HN, the comments contain dozens of people describing what they currently glue together and why it doesn't work. "Show HN" for Tana, Capacities, Reflect, mymind, Heptabase, Mem — each comment thread is a small focus group. The HN search API lets me retrieve these specifically.

**GitHub issues and discussions on the major tools** are unusually direct. People literally file feature requests describing the missing capability. The Obsidian forum, Logseq's GitHub, Roam Research's community, and the Tana feedback portal all have public-ish threads where the "share my lens" request appears in slightly different costumes. The repetition of similar requests across different tools is a strong signal that the gap is structural rather than tool-specific.

**Product Hunt comments** on launches of adjacent tools — Are.na, Plectica, Kumu, Pol.is, Cortico — give you the voice of people who *almost* found what they wanted but didn't.

**Substack/Medium posts** under tags like "tools for thought," "PKM," "knowledge management," and "sense-making" function as long-form workaround descriptions. Maggie Appleton, Linus Lee, Andy Matuschak's working notes, Joel Chan, and the broader "tools for thought" Twitter circle have written extensively about gaps in this exact space. Their posts often explicitly name what's missing.

**Are.na itself** is worth searching as a primary source — there are channels specifically about tools-for-thought gaps, "missing software," and "tools that should exist." Meta-curation is signal.

**Academic CSCW and HCI literature** is the slowest but most rigorous source. The Computer-Supported Cooperative Work conference, CHI, and Communications of the ACM publish papers on sense-making tools, distributed cognition, and the gap between individual and collective knowledge work. Joel Chan's lab at Maryland, Andy Matuschak's writing, and Aza Raski's older work are good entry points. These won't give you demand numbers but they'll give you well-articulated problem statements that can be used to design searches in the other sources.

**Twitter/X via web search** is patchier than it used to be but still useful for finding specific complaints. Search queries like "wish there was a tool" combined with "Obsidian," "Tana," "knowledge management," or specific frameworks (CLA, polarity map, DSRP) surface real-time grumbling.

**App Store and Chrome Web Store reviews** of Obsidian, Notion, Are.na, Hypothes.is, Roam, and Logseq — especially three-star reviews — are concentrated workaround literature, because three-star reviews are the ones where users explain what almost worked.

What I can actually do with these in a session: pull a structured sample, code the recurring complaint patterns, and produce something like a frequency map of which workarounds come up where. I can't get usage data or run interviews, but I can detect linguistic patterns ("I have to maintain two separate...", "I wish I could share my...", "We keep relitigating...") and cluster them across communities.

The limitations worth naming honestly: this is a *selection-biased* sample (people who post on Reddit and HN are not representative of all potential users); upvotes are noisy weighting; recency matters and a lot of relevant threads are years old; the very-online PKM community is genuinely different from the much larger population of people who might benefit from a horizontal lens tool but never thought to articulate it. So treat the output as a *qualitative* signal map, not a market-size estimate.

If you want, I can run a first pass right now. The most efficient initial sweep would be: (1) Reddit search across the four or five most relevant subreddits for workaround-language patterns, (2) HN search for the tool launches I named, looking at the comment threads, and (3) a sample of the Obsidian forum and Tana feedback portal for feature-request clustering. That would take a handful of searches and produce a coded list of recurring patterns with example quotes and rough frequency. Want me to start there, or would you rather scope the search differently first?

## User:

> 5/30/2026 9:19:11

Start there

## Assistant:

> 5/30/2026 9:21:22

> Excavating collaboration workarounds and GitHub integration patterns.
>
> - Now I'm going to systematically search across Reddit PKM communities, Hacker News, and product feedback forums to identify common language patterns around workarounds and feature requests—things like how users describe their setup needs and pain points.
> - **Done**

Let me run the sweep. I'll do this in waves and then synthesize.

> Synthesized market signals revealing unmet demand for shareable analytical frameworks.
>
> - reddit obsidian share my system with team collaboration views
> - The early results are revealing some interesting patterns. There's clearly demand for real-time collaboration in Obsidian—people are building workarounds like Peerdraft and even using GitHub repos as makeshift solutions for team vault sharing. UserBit caught my attention too, since it's solving a similar problem for UX teams with personas and journey maps. I should explore this angle more to understand what's driving these gaps.
> - "I wish there was a tool" "tools for thought" team shared knowledge
> - The search results are mostly SEO-driven listicles that don't offer much insight, but the framing itself is revealing. "Information silos" keeps appearing across results, which aligns with the original problem, and there's a consistent stat about professionals losing hours daily just searching for information. What's striking is that people frame this as a discovery problem—finding information—rather than a framing problem, which suggests the lens-first approach might actually be addressing something people haven't articulated yet.
>   
>   Let me dig into the lens and framing angle more directly.
> - reddit "we keep relitigating" OR "same arguments" team product engineering definition
> - reddit obsidian roam "shared vault" "team setup" frustration workaround
> - "sensemaking" OR "sense-making" tool gap "knowledge workers" frustration discussion
> - hacker news "tools for thought" group shared frustrated collaboration
> - The initial search results aren't giving me what I need, so I'm going to refine my query to target the specific patterns I'm looking for.
> - "multiplayer" OR "shared" "second brain" "tools for thought" feature request gap
> - I'm noticing a clear pattern where several tools—Tana, Capacities, Reflect, and Kosmik—are all emphasizing multiplayer collaboration as a core differentiator, which suggests this is a genuine market gap they're exploiting. Kosmik's messaging directly addresses the pain points of isolated workflows and lack of collaboration, while Obsidian's biggest vulnerability across reviews consistently comes down to its absence of native collaborative features.
>   
>   Let me search a bit more to understand how facilitators and consultants are approaching this problem space.
> - facilitator Miro Mural template "wish there was" frustration framework
> - reddit notion airtable "different views" team "doesn't scale" duplicate
> - I've got what I need to pull this together, but let me do one more search to see if there's an explicit pattern for how AI systems surface different perspectives or analytical lenses from existing information.
> - "surface perspectives" OR "different framings" AI team Slack documents tool
> - I'm noticing a consistent pattern across all these searches—the lack of real-time collaboration in PKM tools like Obsidian keeps coming up as a major limitation, with various plugins attempting to fill that gap. This seems to be a widely recognized pain point that users are actively trying to solve.
>   
>   The market is currently framing the solution as "multiplayer" or "real-time collaboration" features—tools like Kosmik, Tana, and Heptabase are positioning themselves around making personal tools collaborative rather than treating shared perspectives as a core primitive. But what's interesting is that facilitators have already figured this out: they're buying tools like Mural specifically because templates (which are essentially reusable lenses) are what actually get shared and reused across teams. The facilitator market recognizes the lens problem even if the broader PKM space doesn't frame it that way.
>   
>   AI is starting to shift this conversation too, with tools surfacing insights from existing conversations, though they're still calling it summarization rather than lens-making. The real gap I'm seeing is between personal knowledge management and team-scale knowledge work—that's where the opportunity sits. People are literally creating GitHub repos of Obsidian vaults to share with teams (TrustedSec's "Obsidian: Taming a Collective Consciousness" framing is interesting - they're framing it as "collective consciousness").
>   
>   6. **"View" as feature is HIGHLY valuable in DBs**: Airtable's views are constantly praised; Notion's views are catching up. People want multiple ways to see the same data. The lens IS valuable. But it's contained within a specific database, not a horizontal property.
>   
>   7. **The PostHog "PMs vs Engineers" example is exactly the lens problem**: "Engineering CAN replace Product Management" articles, "PMs are from Saturn, EMs are from..." - these are people relitigating the engineering vs product lens. This pain is well-documented but no tool addresses it - the tools (Linear, Jira) reify ONE lens (engineering's).
>   
>   8. **Sensemaking has academic vocabulary but no consumer product**: Karl Weick's work is widely cited; sensemaking workshops happen; but there's no mainstream "sensemaking tool." The CHI workshop signals the academic problem is real, but the consumer translation hasn't materialized.
>   
>   The demand signal is real but displaced—people want collaborative second brains, facilitator-grade templates, and AI that surfaces patterns from their docs and Slack, but they're not explicitly asking for "lens-first" tools because they lack the vocabulary. The academic frameworks exist, but no mainstream product has cracked the "lens-as-shareable-artifact for horizontal use" problem.
>   
>   What's interesting is the convergence: PKM tools are adding collaboration, collaboration tools are adding structure, AI tools are surfacing patterns, and facilitator tools are adding AI. These vectors seem to be pointing toward something, but the category language doesn't exist yet in the market.
>   
>   I need to write this up analytically—coding the patterns I've found, estimating signal strength, being honest about what's missing, and distinguishing between genuine demand and adjacent demand. The user wants prose over bullet points, so I'll keep it mostly narrative with some structure where it helps. This feels substantial enough to warrant a fuller response.
> - **Done**

I have enough to synthesize a first pass. Here's what the sweep actually shows, coded by pattern with rough signal strength.

**Pattern 1: The collaboration gap in PKM is universally acknowledged, paying, and unsolved.** Every Obsidian comparison page lists "no true real-time collaboration" as the top con. Multiple workaround plugins exist as small businesses — Peerdraft, for instance, is a paid Obsidian plugin starting at $30/year specifically for sharing folders and documents. People are literally maintaining GitHub repositories of Obsidian vaults to share with teams (the TrustedSec "Obsidian: Taming a Collective Consciousness" template is one example; the FutureInsight TeamVault repo is another). The newer tools — Tana, Heptabase, Kosmik, Reflect — are all positioning "multiplayer" as the explicit differentiator versus Obsidian and Roam. Signal strength: very high. But it's framed as "make my personal tool collaborative," not "make lenses shareable as first-class objects." The demand is real; the framing isn't yet about lenses.

**Pattern 2: The "view" feature is the closest existing proxy and is highly valued.** Airtable's views, Notion's views, and Linear's saved views come up constantly in tool comparisons as decisive features. Whalesync's Airtable-vs-Notion review explicitly says "these views enable you to work with the same data in different ways" — that's lens-language without naming it. Signal strength: high, but contained. The lens exists as a feature inside a database product, not as a horizontal capability. The translation step from "named view of one database" to "named lens across all team content" hasn't been made.

**Pattern 3: Facilitators are a real, paying market who already buy lens-tools — but call them templates.** Mural was built specifically for facilitators (versus Miro which is general collaboration). Mural's "Facilitator Superpowers" feature, plus a thriving template economy at facilitator.school, plus Miroverse's facilitator community templates, plus the Heather-Lynn Remacle "VASE" framework on Medium being released as a Miro template — all of it is people *authoring shareable lenses* and the market is calling them templates. Signal strength: very high in this segment. The honest read: the lens-as-shareable-artifact problem is *already solved* for facilitators, just at the document/template level rather than the data level.

**Pattern 4: The cross-functional definitional fights are universally felt but not tool-addressed.** "Engineering CAN replace Product Management," "PMs are from Saturn, EMs are from...," PostHog's published manifesto about how Product and Engineering should relate, the Teamblind threads, the Substack genre of "what does Product even do" — this is people relitigating the engineering-versus-product lens in public, repeatedly, with high emotional energy. The tools they use (Linear, Jira, Notion) all reify *one* lens — engineering's view of the work — without acknowledging the others exist. Signal strength: very high pain, near-zero tool response. This is the cleanest version of the "we keep relitigating the same definitional argument" workaround that you'd want to detect.

**Pattern 5: The AI-native opening is being approached from multiple directions but nobody has named it.** Slack's new Slackbot, Notion AI, Confluence AI, and the explosion of Slack AI integrations are all approaching the same thing — "surface insights from your existing team content" — but the framing is *summarization* and *retrieval*, not *lens-surfacing*. None of these tools say "here are the three different ways your team is framing this issue." They say "here's a summary." The conceptual move from "summarize" to "show me the frames embedded in this corpus" hasn't been made publicly by any major player I can find. Signal strength: huge adjacent demand (every enterprise is buying these), zero direct execution.

**Pattern 6: The academic frameworks (CLA, DSRP, CSH, AQAL, Polarity Mapping) have devoted practitioner communities but minimal consumer-product translation.** Plectica exists for DSRP. Polarity Partnerships sells the Polarity Map. There's a CSH presence in evaluation circles. But none of these have crossed into the "every team uses this" zone. Signal strength: moderate niche demand, no mass-market path. Consistent with Matrix 04 in the visual — deep theory stays niche unless the lens is constrained.

**Pattern 7: Sensemaking has serious academic infrastructure but no consumer product.** The CHI Sensemaking Workshop runs annually. Karl Weick's framework is widely taught. Multiple substack writers (Grado, The Lantern, Not Saying There's Hope) are publishing about sensemaking as a personal practice. Signal strength: persistent intellectual demand, no commercial translation. Same shape as Pattern 6.

**The synthesized read.**

The demand for "horizontal social lens-first tool" doesn't exist in the search signal because users don't have that vocabulary. What exists in the signal, with high confidence, is four displaced demands that all point at the same gap:

The first is collaborative PKM (people who love Tana/Obsidian/Roam want their teams to work that way), which is large and unsolved. The second is facilitator-grade structure on top of whiteboards (Mural is the existence proof; the template economy is the demand evidence), which is real and paying. The third is the cross-functional definitional war (PM vs eng vs exec relitigating the same arguments), which is widely felt but tool-unaddressed. The fourth is AI-surfacing of patterns in existing team content (enterprise buying this aggressively), which has commercial momentum but lacks the lens-framing.

These don't combine in any current product. The closest convergent vector right now is *AI-augmented collaborative whiteboards* (Miro AI, Mural AI, FigJam AI), but none of them is yet treating "the lens" as the unit. They treat clusters, summaries, and topics as the unit. A product that named "lenses" as first-class — and let teams see how their corpus is being framed, fork each other's framings, and overlay frames on shared content — would be operating in the gap between four real markets, not creating demand from nothing.

**Honest caveats.** This is a qualitative signal map, not a sized market. The PKM community over-indexes in my search results because they're verbose online; the enterprise customers who'd actually pay for this product (consultancies, internal strategy teams, policy organizations, design teams) are quieter. I haven't surveyed Reddit at sufficient depth — what I'd want next is a direct scrape of r/ObsidianMD, r/Notion, and r/PKMS for the specific phrase patterns ("wish there was," "for my team," "we keep arguing about") with frequency counts. I also haven't pulled the Tana feedback portal, the Roam discourse forum, or Are.na's own meta-channels, all of which would be high-signal next steps. The HN comment threads on tool launches would also be worth pulling specifically — they're more articulate about what's missing than Reddit, and easier to retrieve.

If you want me to push deeper on any single pattern — for example, pulling the actual recurring complaint phrases from the Obsidian forum, or quantifying how often "engineering vs product" framing fights show up in public — say which one and I'll do it.

---

**Sources:**

- [obsidian plugin](https://github.com/peerdraft/obsidian-plugin)
- [compare samepage vs obsidian md](https://www.saashub.com/compare-samepage-vs-obsidian-md)
- [FutureInsight TeamVault](https://github.com/FutureInsightTech/FutureInsight-TeamVault)
- [freedcamp vs obsidian](https://stackshare.io/stackups/freedcamp-vs-obsidian)
- [compare codetogether vs obsidian md](https://www.saashub.com/compare-codetogether-vs-obsidian-md)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-stack-overflow-for-teams-vs-obsidian-md)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-obsidian-md-vs-stack-overflow-for-teams)
- [compare obsidian md vs brainstormer online](https://www.saashub.com/compare-obsidian-md-vs-brainstormer-online)
- [stackshare.io](https://stackshare.io/microsoft-sharepoint/vs/obsidian)
- [compare obsidian md vs userbit](https://www.saashub.com/compare-obsidian-md-vs-userbit)
- [7 Platforms and Tools for Thought Leaders To Share Their Expertise](https://www.linkedin.com/pulse/7-platforms-tools-thought-leaders-share-expertise-denise-brosseau)
- [7 Top Knowledge Sharing Tools Every Team Should Use](https://document360.com/blog/knowledge-sharing-tools/)
- [The Best Knowledge Sharing Tools in 2025](https://slite.com/learn/knowledge-sharing-tools)
- [5 best AI tools to improve knowledge sharing at work | Glide Blog](https://www.glideapps.com/blog/ai-knowledge-sharing-tools)
- [Top 12 Team Knowledge Sharing Tools for 2025](https://www.embednotionpages.com/blog-/team-knowledge-sharing-tools/)
- [What are the best tools for sharing knowledge, resources and links in a small team? - Quora](https://www.quora.com/What-are-the-best-tools-for-sharing-knowledge-resources-and-links-in-a-small-team)
- [Best Knowledge Sharing Tools 2026 | Complete Comparison | Glitter AI](https://www.glitter.io/blog/knowledge-sharing/knowledge-sharing-tools)
- [Engineering CAN replace Product Management](https://theproductweb.substack.com/p/engineering-can-replace-product-management)
- [Product Engineering](https://www.slideshare.net/slideshow/product-engineering-services-unlocking-innovation-and-agility/275234741)
- [newsletter.posthog.com](https://newsletter.posthog.com/p/the-deadline-doom-loop/comments)
- [pms are from saturn ems are from](https://engineeringorg.substack.com/p/pms-are-from-saturn-ems-are-from)
- [The Product Engineer and the Shift from Stakeholders to Partners](https://gitpushleadership.substack.com/p/the-product-engineer-and-the-shift)
- [What's the true role of a product team at an engineering-led organization?](https://posthog.com/founders/product-at-posthog)
- [engineering or product by7jnzfu](https://www.teamblind.com/post/engineering-or-product-by7jnzfu)
- [Collaborate on a shared vault - Obsidian Help](https://help.obsidian.md/Collaborate+on+a+shared+vault)
- [notebook demo](https://github.com/lawrencet149/notebook_demo)
- [obsidian rabbit hole](https://kellimcgraw.substack.com/p/obsidian-rabbit-hole)
- [My Obsidian Vault](https://github.com/zak-admin/My-Obsidian-Vault)
- [Obsidian Vault Structure](https://github.com/trustedsec/Obsidian-Vault-Structure)
- [New on Yahoo](https://tech.yahoo.com/apps/articles/reason-obsidian-works-better-without-171611617.html)
- [compare obsidian md vs pesto app](https://www.saashub.com/compare-obsidian-md-vs-pesto-app)
- [maddoxlocher.substack.com](https://maddoxlocher.substack.com/p/a-notemaking-system-for-compounding/comments)
- [25980224 careful this can mess up your obsidian vault settings](https://www.goodreads.com/author_blog_posts/25980224-careful-this-can-mess-up-your-obsidian-vault-settings)
- [Sensemaking](https://en.wikipedia.org/wiki/Sensemaking)
- [Sensemaking (information science)](https://en.wikipedia.org/wiki/Sensemaking_(information_science))
- [Tools and Tasks in Sensemaking: A Visual Accessibility Perspective](https://arxiv.org/pdf/2404.00192)
- [How Do Experts Make Sense of Integrated Process Models?](https://arxiv.org/pdf/2505.20667)
- [(PDF) A Sensemaking Model Of Knowledge Management In Organisations.](https://www.researchgate.net/publication/221409513_A_Sensemaking_Model_Of_Knowledge_Management_In_Organisations)
- [The Foundations of a Framework for Sense-Making](https://notsayingthereshope.substack.com/p/the-foundations-of-a-framework-for)
- [grado.substack.com](https://grado.substack.com/p/sensemaking)
- [thelantern.substack.com](https://thelantern.substack.com/p/sensemaking)
- [Tools for thought as cultural practices, not computational objects | Hacker News](https://news.ycombinator.com/item?id=33666160)
- [How can we develop transformative tools for thought? | Hacker News](https://news.ycombinator.com/item?id=21152542)
- [Hacker News](https://news.ycombinator.com/item?id=8921164)
- [Hacker News new | past | comments | ask | show | jobs | submit login](https://news.ycombinator.com/item?id=4769701)
- [Hacker News](https://news.ycombinator.com/item?id=8983232)
- [Hacker News](https://news.ycombinator.com/user?id=pketh)
- [Exploring Tools for Thought](https://tfthacker.substack.com)
- [Trend Report](https://www.forrester.com/report/Use+ThinkTank+To+Overcome+Group+ProblemSolving+Limits/-/E-RES136081)
- [Hacker Newsnew | past | comments | ask | show | jobs | submitlogin](https://news.ycombinator.com/item?id=746103)
- [the lonely work of moderating hacker news](https://courses.cs.washington.edu/courses/cse481p/23sp/readings/W8S1/the-lonely-work-of-moderating-hacker-news.pdf)
- [Best second brain app in 2026 | Fabric – The workspace that thinks with you](https://fabric.so/comparison/best-second-brain-app)
- [Roundup of 66 Tools for Thought to Build Your Second Brain – Wild Rye](https://wildrye.com/roundup-of-67-tools-for-thought-to-build-your-second-brain/)
- [7 Best MyMind Alternatives in 2026 (Reviewed) | Kosmik](https://www.kosmik.app/blog/mymind-alternatives)
- [Announcing Second Brain Meetups](https://www.goodreads.com/author_blog_posts/18961360-announcing-second-brain-meetups)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-notion-second-brain-vs-notion-tools)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-coglayer-vs-notion-second-brain)
- [My Second Brain](https://apps.apple.com/qa/app/my-second-brain/id6496372557?l=ar)
- [Building a Second Brain](https://desireecervantes.substack.com/p/building-a-second-brain)
- ["Best Miro Alternatives in 2026: 10 Whiteboard and Collaboration Tools for Distributed Teams"](https://resources.rework.com/tools/design-creative/best-miro-alternatives)
- [Facilitation Template: Miro. Hello World — beta version | by Heather-Lynn Remacle | VASE: Stories about a centering framework for building strategy | Medium](https://medium.com/vase-stories-about-a-centering-framework/facilitation-template-miro-8bf94b6cf1d0)
- [Miro vs. Mural: What's the better tool? [2025] | Facilitator School](https://www.facilitator.school/blog/miro-vs-mural)
- [FREE 4 Ls Retrospective Template | Miro 2026](https://miro.com/templates/4-ls-retrospective/)
- [Lock areas of the board that only facilitator can unlock | Miro](https://community.miro.com/ideas/lock-areas-of-the-board-that-only-facilitator-can-unlock-440/index2.html)
- [Redesigning the workshop: AI-powered facilitation in Miro, FigJam, and Mural — #CopingWithAI | by UX.raspberry | Medium](https://medium.com/@uxraspberry/redesigning-the-workshop-ai-powered-facilitation-in-miro-figjam-and-mural-84d8b3deab62)
- [4L Reflection Template (Free Download & Guide)](https://www.facilitator.school/template/4l-reflection)
- [Facilitator Community Templates | Miroverse](https://miro.com/miroverse/facilitator/)
- [Airtable vs Notion: the Ultimate Guide | Whalesync](https://www.whalesync.com/blog/airtable-vs-notion-the-ultimate-guide)
- [prodview jjfwan3xl2kvw](https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-jjfwan3xl2kvw?page=30)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-airtable-vs-notion)
- [airtable vs notion](https://stackshare.io/stackups/airtable-vs-notion)
- [Compare Airtable and Notion](https://www.g2.com/compare/airtable-vs-notion)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-airtable-vs-the-notion-templates)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-airtable-vs-notion-tools)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-airtable-vs-notion-automations)
- [What Is AI Summarization? Benefits and Uses | Slack](https://slack.com/blog/productivity/ai-summarization-a-guide-to-conquering-information-overload)
- [Learn about generative AI, tools for workflow automation | Slack](https://slack.com/blog/transformation/what-is-generative-ai)
- [Employee-facing AI Agents: A Guide to Boosting Internal Productivity | Slack](https://slack.com/resources/why-use-slack/employee-facing-ai-agents)
- [Introducing Slackbot, Your Context-Aware AI Agent for Work | Slack](https://slack.com/blog/news/slackbot-context-aware-ai-agent-for-work)
- [Slack AI has arrived | Slack](https://slack.com/blog/news/slack-ai-has-arrived)
- [Slack AI at Dreamforce: Introducing Native AI for Teams | Slack](https://slack.com/blog/news/dreamforce-slack-native-ai)
- [The 8 Best Slack AI Integration Tools in 2026](https://clearfeed.ai/blogs/slack-ai-integration-tools)
- [Native AI in Slack: Powering Collaboration and Productivity | Salesforce](https://www.salesforce.com/slack/native-ai/)

## User:

> 5/30/2026 9:28:41

List possible next steps in concise number list

## Assistant:

> 5/30/2026 9:28:57

1. Pull recurring complaint phrases from r/ObsidianMD, r/Notion, r/PKMS, r/TanaInc, r/Roam with frequency counts and example quotes.

2. Scrape HN comment threads on tool launches (Tana, Capacities, Reflect, Heptabase, Kosmik, mymind) for "I wish" and "I currently glue together" patterns.

3. Pull the Tana feedback portal, Obsidian forum feature requests, and Roam discourse for clustered missing-capability themes.

4. Survey Are.na's meta-channels about "missing software" and "tools that should exist."

5. Quantify how often the engineering-versus-product framing fight shows up in public writing over the last 12 months, by Substack/HN/Reddit.

6. Map the facilitator template economy: how many paid templates exist on Mural, Miroverse, facilitator.school, and Gumroad, and which frameworks dominate.

7. Interview ten facilitators who run sense-making workshops about which tools they buy, which they glue together, and what they apologize for.

8. Interview five consultancies (Cognitive Edge/SenseMaker, Polarity Partnerships, Cabrera Lab, Mind and Life affiliates) about what their clients ask for that no tool provides.

9. Build a single landing page articulating the lens-first concept in two competing framings, A/B test against $500 of paid traffic from adjacent communities.

10. Run the smoke test: collect waitlist signups, then call the top twenty and ask them to describe in their own words what they thought they were signing up for.

11. Sketch a narrow first version constrained to one concrete use case (e.g., "shared lens on customer feedback" or "shared lens on a research corpus") to test whether constrained beats horizontal at the wedge.

12. Map adjacent competitive threats: which existing tool (Notion, Slack, Linear, Miro) could ship the lens-first feature as a sidecar before a standalone tool builds distribution.

13. Read *The Blind Spot* (Frank, Gleiser, Thompson) before the August retreat to walk in already inside the conversation.

14. Use the Upaya retreat itself as a discovery surface — the attendees are exactly the audience who'd recognize the problem framing.

## User:

> 5/30/2026 9:29:39

1

## Assistant:

> 5/30/2026 9:31:16

> Strategized systematic subreddit searches for complaint pattern analysis.
>
> - I'm starting with targeted searches across those subreddits to identify the most common complaint patterns, focusing on collaboration limitations, workaround dependencies, and feature requests around views and perspectives.
> - **Done**

Running the Reddit sweep. I'll search each subreddit for the workaround-language patterns, then code what I find.

> Synthesized recurring patterns from community research into structured analysis.
>
> - site:reddit.com r/ObsidianMD "wish" team share collaboration
> - The site:reddit.com filter isn't giving me the results I need through web search, so I'll try searching for those specific phrases without the domain restriction instead.
> - reddit obsidian "for my team" OR "with my team" frustration feature
> - reddit r/Notion "wish I could" team views perspectives different
> - I found something useful in that Notion review on AWS Marketplace—a user describing how views feel cognitively overwhelming even when they exist, saying their first instinct is confusion followed by deletion unless absolutely necessary. This suggests that having lens-like capabilities isn't enough if they're too complex to use intuitively. The Notion dashboard launch seems relevant too, though the thought cuts off there.
> - "r/PKMS" OR "r/Zettelkasten" tool gap collaboration shared team workspace
> - That Substack comment is a goldmine—it shows someone actively combining Tana, Obsidian, Miro/Mural, Kumu, and Loopy for their knowledge work, which perfectly illustrates the "I currently glue together" pattern I'm tracking. Let me search more specifically for Roam and Tana usage patterns, then I can synthesize everything together.
> - reddit Tana Roam Capacities "missing" feature complaint workflow team
> - I've gathered enough data from the community sweep to start organizing these findings into a structured format. Looking at the recurring themes across Reddit and other sources, there's a clear pattern emerging around how people are combining multiple tools to fill gaps in their workflows—like someone using Obsidian for note-taking, Mural for collaborative whiteboarding, and Kumu for other specialized needs.
>   
>   Another major theme is the friction when teams try to adopt personal tools at scale—Obsidian users asking how to manage team tasks, Notion implementations hitting adoption barriers despite initial satisfaction, and tools like Tana explicitly deferring collaborative features to later versions.
>   
>   Views themselves are a double-edged sword: users love having multiple perspectives on the same data, but the cognitive load of creating and managing them is real—Notion even shipped dashboard views in response to complaints about view-switching fatigue.
>   
>   There's also a clear pattern of power users building their own solutions when tools fall short, whether that's paid plugins for collaboration, custom Python bots polling for changes, or entire GitHub repos dedicated to extending what these tools can do.
>   
>   I'm noticing something interesting about templates too: the same frameworks and methodologies get reimplemented separately across different platforms because templates are locked to their host tool. Someone selling an academic PKM template has to create it twice—once for Notion, once for Obsidian—and facilitators do the same thing with Miro versus Mural.
>   
>   What's also striking is how community knowledge about these tools is fragmenting. Users are learning from each other through scattered channels—YouTube videos, Slack threads, Substack newsletters—but there's no central place where this emergent shared vocabulary lives. Everyone's essentially improvising the same solutions independently.
>   
>   The honest reality is that "shared lens" isn't even language the market uses. People talk about "views," "perspectives," "templates," "supertags"—but there's no unified term. The paying market has settled on "collaborative second brain" instead, and even Notion's new dashboard feature is about combining views within a tool, not sharing them as portable artifacts. Templates are the closest thing to a working market for shared lenses right now, though Tana's moving toward this with supertags, just still early and figuring out the collaboration piece.
>   
>   On frequency: the "no team collaboration in PKM" complaint shows up everywhere. Views being valuable but confusing is a consistent pain point, especially in Notion. People duplicate templates across tools constantly—that's proven by the Gumroad and Etsy template economy. The "we keep relitigating definitions across teams" problem comes up a lot in management writing, but nobody frames it as a tool problem yet.
>   
>   I should structure this as numbered patterns with evidence and frequency attached, since the user wants step-by-step output and asked for concise full sentences.
> - **Done**

Here's the coded pattern map from the Reddit/community sweep, with rough frequency and example evidence.

**Pattern A — "I currently glue together [tool X] + [tool Y] + [tool Z]"**
Frequency: very high. Best example I pulled was a Substack commenter describing their actual stack: "Obsidian on my desktop... Mural which is similar to Miro has been a daily tool for 4 years. Kumu when wanting to formalise and even loopy [causal loops]. Then lots of physical whiteboarding, paper and pen sketches." Tana users describe combining "supertags + search queries + views" to build apps within an app. ClickUp's Tana-alternatives roundup frames the whole market as "ClickUp and Capacities [AI], Heptabase and Milanote [visual], Workflowy and Obsidian [simple]" — explicitly an admission that no single tool covers it. *Interpretation: the workaround stack is real and articulated, but the friction is described as "tool sprawl," not as "lens fragmentation."*

**Pattern B — "We start with the personal tool, then try to scale to team and it breaks"**
Frequency: very high. Obsidian forum post from April 2025: "I'm exploring ways to manage my team's tasks and meetings within Obsidian and would like to find out how others are doing similar things." Tana's own roadmap, per their May office hours, explicitly defers collaborative workspaces: "Collaborative workspaces probably won't be part of this first iteration. This makes sense, as syncing changes made offline across multiple users in a shared space adds significant complexity." Notion review: "Learning Notion has been difficult for some team members." *Interpretation: this is the single most-acknowledged gap. Demand is enormous and well-articulated, but the framing is "real-time multiplayer," not "shared lens."*

**Pattern C — "Views are powerful but cognitively expensive"**
Frequency: high, especially around Notion. A real Notion review captures it: "I think views are complicated to figure out... when I create a view, my brain always first thinks 'WTF is going on' and then I delete it unless I really need it." Notion's response to this complaint, shipped in March 2026, is exactly relevant: dashboard views, which let users assemble multiple views from one database into a single customizable layout, with global filters that span widgets. *Interpretation: the lens-as-object exists inside Notion, but users find it too expensive to author, which is why most lenses stay implicit. The new dashboard feature is Notion's bet that combining views is more valuable than authoring them.*

**Pattern D — "I want different views/perspectives of the same data"**
Frequency: moderate, and uses lens-adjacent language naturally. Notion review: "I like that databases can be viewed from different perspectives. I really love that." Airtable users similarly: "these views enable you to work with the same data in different ways." *Interpretation: the lens concept lands when constrained to a database. Users do use the word "perspectives." The translation is from "perspectives on this database" to "perspectives across our entire team's work," and that gap is unbridged.*

**Pattern E — "I built my own workaround"**
Frequency: high. Concrete examples: Peerdraft (paid Obsidian collaboration plugin, $30/year, exists because Obsidian Sync doesn't do real-time collaboration); a Notion user who literally wrote a Python bot to poll the Notion API for category changes because Notion's API doesn't expose them; TrustedSec's open-source "Obsidian: Taming a Collective Consciousness" vault structure on GitHub; FutureInsight TeamVault doing the same for an organization. *Interpretation: people are spending real engineering effort to bridge personal-to-team. The workaround economy is mature enough that some of it is selling.*

**Pattern F — "Templates are the lens, but they're trapped per-tool"**
Frequency: high once you look for it. Concrete: Genevieve Shanahan's Gumroad sells "Academic PKM Template" as two separate products — one for Notion and one for Obsidian — same intellectual content, two duplications. facilitator.school sells the 4Ls retrospective template as separate Miro and Mural files. Miro's "Miroverse" and Mural's template gallery each have facilitator communities authoring shareable lenses, but the lens cannot move between platforms. *Interpretation: templates are the shareable lens, and there's a small but real economy around them. But the lens is tied to the substrate, which is the inverse of the architecture you'd want.*

**Pattern G — "Community-emergent shared sensemaking with no canonical home"**
Frequency: moderate but persistent. The Tana newsletter literally documents users learning from each other across Slack, YouTube, and Substack: "Lukas gives an excellent overview of Calendar... Great thread from Fis Fraga on views too." Same for Obsidian, Roam, Logseq — knowledge about how to set up the tool lives distributed across creator economy. *Interpretation: the lens-making is happening, just outside the tool. The implicit demand for "a place where my team's way of using this lives canonically" is visible in the workaround pattern.*

**Frequency rollup, rough ranking.**

The complaints, in descending order of how often they appeared across the sweep:

1. "No team collaboration in my PKM tool" — universal.
2. "Views are powerful but I get confused" — Notion-specific, very common.
3. "I glue together multiple tools" — common in Substack/blog posts, less common in direct complaints.
4. "I built a workaround / plugin / script" — common enough that there's a small economy.
5. "I want different perspectives on the same data" — present, uses adjacent language.
6. "Templates are duplicated across platforms" — present, visible in commerce.
7. "We keep relitigating definitional fights" — heavily present in management writing, almost never framed as a tool problem.

**Synthesis.**

The Reddit/community signal confirms what the earlier sweep suggested: the demand exists in displaced form. People articulate the workaround, not the underlying lens-language. The single strongest demand signal is collaborative PKM. The single most interesting under-articulated demand is the template-duplication pattern in Pattern F — that's people *literally maintaining the same lens across multiple tools*, paying for it twice, and not naming the inefficiency as such.

The two things this sweep added that I hadn't fully grasped from the earlier passes: first, Notion's March 2026 dashboard-views launch is more relevant than I'd realized — they're explicitly shipping the "combine multiple views into one canvas" move, which is one step away from "share this lens-assembly as an artifact." Second, the template economy on Gumroad, facilitator.school, and Miroverse is more concrete evidence of the paying market than I gave it credit for.

What's still missing for a real signal: I'd want to run actual upvote-weighted Reddit scrapes (which web search isn't giving me cleanly) and look at the Tana and Roam Discord/Slack archives for the specific "I wish there was..." phrasings. The next step would be either to use a Reddit-specific search or to pull the Obsidian forum's feature-request board directly.

---

**Sources:**

- [Construction collaboration technology](https://en.wikipedia.org/wiki/Construction_collaboration_technology)
- [Digital collaboration](https://en.wikipedia.org/wiki/Digital_collaboration)
- [Social collaboration](https://en.wikipedia.org/wiki/Social_collaboration)
- [Collaboration discussion](https://www.goodreads.com/topic/show/1010615-requests)
- [Collaboration Features](https://help.imagine.art/workflows/understanding-the-interface/collaboration-features)
- [Collaborating on AskEdith with Teams](https://askedith.substack.com/p/collaborating-on-askedith-with-teams)
- [Discuss Scratch](https://scratch.mit.edu/discuss/post/2396107)
- [Snap! Forum](https://forum.snap.berkeley.edu/t/join-our-team-part-1/15452/253)
- [Discuss Scratch](https://scratch.mit.edu/discuss/post/1656193)
- [Collaboration Station](https://deirdreladson.substack.com/p/improve-team-collaboration-by-hacking/comments)
- [Best Practices for Managing Team Tasks and Meetings in Obsidian - Knowledge management - Obsidian Forum](https://forum.obsidian.md/t/best-practices-for-managing-team-tasks-and-meetings-in-obsidian/99808)
- [compare obsidian md vs know your team](https://www.saashub.com/compare-obsidian-md-vs-know-your-team)
- [compare obsidian md vs pesto app](https://www.saashub.com/compare-obsidian-md-vs-pesto-app)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-obsidian-md-vs-stack-overflow-for-teams)
- [the great note taking trap](https://billmclean.substack.com/p/the-great-note-taking-trap)
- [compare obsidian md vs mana](https://www.saashub.com/compare-obsidian-md-vs-mana)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-stack-overflow-for-teams-vs-obsidian-md)
- [compare teamhub vs obsidian md](https://www.saashub.com/compare-teamhub-vs-obsidian-md)
- [huggingface.co](https://huggingface.co/spaces/anpigon/obsidian-qa-bot/blob/e272fa2f2c33a981360ec7e29f42e93f75fd504f/docs/obsidian-help/Help%20and%20support.md?code=true)
- [changemyview](https://en.wikipedia.org/wiki/R/changemyview)
- [prodview eoc4gcvwcs3a6](https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-eoc4gcvwcs3a6?page=608)
- [Embracing Notion for Teams: Navigating Challenges and Maximizing Efficiency](https://noncode.substack.com/p/embracing-notion-for-teams-navigating)
- [prodview eoc4gcvwcs3a6](https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-eoc4gcvwcs3a6?page=986)
- [Notion introduces dashboard views to turn any database into a customizable control center](https://alternativeto.net/news/2026/3/notion-introduces-dashboard-views-to-turn-any-database-into-a-customizable-control-center)
- [prodview eoc4gcvwcs3a6](https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-eoc4gcvwcs3a6?page=1000)
- [prodview eoc4gcvwcs3a6](https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-eoc4gcvwcs3a6?page=984)
- [Lithic PKMS Alternatives](https://alternativeto.net/software/lithic-pkms/?p=2)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/compare-glossary-vs-zettelkasten-for-notion)
- [Zettelkasten for Notion](https://www.saashub.com/zettelkasten-for-notion-alternatives)
- [github.com](https://github.com/topics/pkm?l=typescript)
- [Software Alternatives, Accelerators & Startups](https://www.saashub.com/zkn-zettelkasten-alternatives)
- [tijntjoelker.substack.com](https://tijntjoelker.substack.com/p/digital-gardening/comments)
- [Scrapbox AlternativesNote-taking & Team Collaboration Tools like Scrapbox](https://alternativeto.net/software/scrapbox)
- [Oleksandr Golovatyi](https://www.goodreads.com/notes/58165477-digital-zettelkasten/59273547-oleksandr-golovatyi/20ce380d-3d5f-46f4-8ef8-8654bcb7a1ef)
- [Genevieve Shanahan](https://genshanahan.gumroad.com)
- [note taking methods](https://prewww.zoho.com/workplace/articles/tag/note-taking-methods)
- [13 Best Tana Alternatives for Note-Taking in 2026 | The ClickUp Blog](https://clickup.com/blog/tana-alternatives/)
- [Here's how I use Tana for Task Management](https://williamvanzweeden.nl/2025/02/heres-how-i-use-tana-for-task-management/)
- [Roamler](https://en.wikipedia.org/wiki/Roamler)
- [offline access in tana what the latest](https://productivematters.substack.com/p/offline-access-in-tana-what-the-latest)
- [tana news issue 008](https://idlerlabs.substack.com/p/tana-news-issue-008)

## User:

> 5/30/2026 10:05:52

Short video introduction to the first step in the arc of learning

## Assistant:

> 5/30/2026 10:06:54

> Curated video recommendations prioritizing direct Maturana interview access.
>
> - The user wants a short video introduction to the first step in the learning arc, which starts with Maturana and Varela's foundational work on the tree of knowledge. I should create something that introduces this opening concept before moving into the subsequent steps they've outlined.
> - Maturana Varela autopoiesis Tree of Knowledge introduction video youtube
> - Humberto Maturana interview youtube observer "everything said" English
> - I'm refining my search to focus specifically on video content that introduces or explains the topic.
> - "autopoiesis" explained short video animation Maturana Varela living systems
> - "Fritjof Capra" OR "Daniel Schmachtenberger" autopoiesis Maturana Varela explained video
> - The search results aren't giving me direct YouTube links, so I'll refine my search strategy to be more targeted.
> - site:youtube.com Maturana autopoiesis observer English interview
> - I'm weighing different video options to introduce the foundational concepts from Maturana and Varela—the direct interview with Maturana himself seems like the strongest choice for authenticity, though I should also consider whether the reflective conversation might work better for accessibility depending on the audience.
>   
>   Since the user specifically wants something short and I can't verify the actual length of these videos, I should probably give them a curated recommendation with a few solid options rather than committing to one I haven't confirmed, and maybe look for additional resources from educators like Schmachtenberger who might have distilled these ideas into a more digestible format.
> - Maturana "The Observer" lecture video 10 minutes English short introduction
> - I've narrowed down the best options for what the user needs—a concise video introduction to the foundational concepts of observer-dependence and autopoiesis from Maturana and Varela. The most promising lead is a direct interview with Maturana himself speaking in English, which should give an authoritative and accessible entry point to these ideas. I should be upfront that I haven't actually watched these videos myself, so I can't verify their exact length or quality—but I'll give my best curated recommendation based on what I know, and let them decide if it fits what they're looking for.
> - **Done**

My single best recommendation as the entry point: **the Humberto Maturana interview by Ward Mailliard (2009)** at https://www.youtube.com/watch?v=fQFlceVouPA. This is Maturana himself, in English, speaking directly about the core ideas — the observer, autopoiesis, structural coupling, "everything said is said by an observer." Hearing him say it in his own voice makes the prose in *The Tree of Knowledge* much easier to parse afterward, which matters because his English is famously idiosyncratic on the page.

If you want something with more contemporary framing rather than Maturana solo, **Petra Kuenkel and Humberto Maturana on "The Systems View of Life"** at https://www.youtube.com/watch?v=EJDWEJYSjyI is a good alternative — it's a dialogue, so the ideas get pushed and responded to in real time, and Kuenkel brings the applied/organizational angle.

For the Varela side specifically, **"Speaker Series #6: Clarke and Clough on Varela"** at https://www.youtube.com/watch?v=zp-ii9zZ-P0 is the cleanest introduction, since Bruce Clarke is a serious Varela scholar and the format is interview rather than lecture.

One honest caveat: I can't verify exact runtimes or video quality from search alone. The Mailliard interview is the one I'd start with — it's the closest you'll get to sitting across from Maturana for fifteen minutes and having him explain what he means.

If you want something even shorter and more produced rather than an interview, the next move would be to look on YouTube for "Fritjof Capra autopoiesis" or "Daniel Christian Wahl systems view of life" — Capra and Wahl are the two clearest popular synthesizers of this material, and both have short talks that frame Maturana and Varela's work for newcomers. I didn't surface a specific one I'd vouch for, but that's the direction.

---

**Sources:**

- [Maturana Varela Tree of Knowledge - PDFCOFFEE.COM](https://pdfcoffee.com/maturana-varela-tree-of-knowledge-pdf-free.html)
- [Maturana Varela Tree of Knowledge | PDF | Cell Nucleus | Cell (Biology)](https://www.scribd.com/document/270395556/Maturana-Varela-Tree-of-Knowledge)
- [Maturana Varela Tree of Knowledge](https://www.yumpu.com/en/document/view/29508644/maturana-varela-tree-of-knowledge)
- [The Tree of Knowledge: The Biological Roots of Human Understanding by Humberto R. Maturana | Goodreads](https://www.goodreads.com/book/show/695440.The_Tree_of_Knowledge)
- [Humberto R. Maturana & Francisco J. Varela, The tree of knowledge:The biological roots of human understanding - PhilPapers](https://philpapers.org/rec/MATTTO-5)
- [‘The Tree of Knowledge’ by Maturana and Varela | Middle Way Society](https://www.middlewaysociety.org/books/science-and-social-science-books/the-tree-of-knowledge-by-maturana-and-varela/)
- [The Tree of Knowledge: The Biological Roots of Human Understanding, Revised ... - Francisco J. Varela, Humberto R. Maturana - Google Books](https://books.google.com/books/about/Tree_of_Knowledge.html?id=dExSNKl4RWAC)
- [The Tree of Knowledge: The Biological Roots of Human Understanding, Revised Edition - 9780877736424](https://www.shambhala.com/the-tree-of-knowledge.html)
- [Everything said is said by an observer | by Miguel Pantaleon | Medium](https://medium.com/@MiguelPantaleon/everything-said-is-said-by-an-observer-effffeded07a)
- [TOP 8 QUOTES BY HUMBERTO MATURANA | A-Z Quotes](https://www.azquotes.com/author/19933-Humberto_Maturana)
- [Humberto Maturana quote: Everything said is said by someone.](https://www.azquotes.com/quote/703356)
- [Humberto Maturana - Deconstruction Coaching](https://www.dekonstruktions-coaching.de/humberto-maturana/)
- [Humberto Maturana Quote: “Everything said is said by someone.”](https://quotefancy.com/quote/1553086/Humberto-Maturana-Everything-said-is-said-by-someone)
- [Distinguishing the Observer: An Attempt at Interpreting Maturana - DigiVis](https://dbis-digivis.uibk.ac.at/mediawiki/index.php/Distinguishing_the_Observer:_An_Attempt_at_Interpreting_Maturana)
- [EVERYTHING SAID IS SAID BY AN OBSERVER | MATURANA H. R. (1987) - TOWARDS LIFE-KNOWLEDGE](https://bsahely.com/2020/12/15/everything-said-is-said-by-an-observer-maturana-h-r-1987/)
- [Maturana (1988) Reality](https://constructivist.info/radical/papers/maturana/88-reality.html)
- [Systemic and meta-systemic laws](https://www.dubberly.com/articles/systemic-and-meta-systemic-laws.html)
- [Autopoiesis](https://en.wikipedia.org/wiki/Autopoiesis)
- [Autopoiesis: How Maturana & Varela Redefined Life | Ideasthesia](https://www.ideasthesia.org/the-biologists-who-redefined-life-maturana-varela-and-the-autopoietic-revolution/)
- [Autopoiesis and Cognition: The Realization of the Living | Springer Nature Link](https://link.springer.com/book/10.1007/978-94-009-8947-4)
- [Autopoiesis and Cognition: The Realization of the Living](https://en.wikipedia.org/wiki/Autopoiesis_and_Cognition:_The_Realization_of_the_Living)
- [Requisite Variety, Autopoiesis, and Self-organization](https://arxiv.org/pdf/1409.7475)
- [Understanding Autopoiesis: Life, Systems, and Self-Organisation](https://www.mannaz.com/en/articles/coaching-assessment/understanding-autopoiesis-life-systems-and-self-organization/)
- [Humberto Maturana and Francisco Varela’s Contribution to Media Ecology:](https://www.nesacenter.org/uploaded/conferences/FLC/2019/Handouts/Arpin_Humberto_Maturana_and_Francisco_Varela_Contribution_to_Media_Ecology_Autopoiesis.pdf)
- [Structure%E2%80%93organization%E2%80%93process](https://en.wikipedia.org/wiki/Structure%E2%80%93organization%E2%80%93process)
- [Web of Life | Reflections & Notes - vialogue - WordPress.com](https://vialogue.wordpress.com/2021/10/21/web-of-life-reflections-notes/)
- [Autopoiesis and Autonomy. Autonomy is a Biological Function | by Peter Fritz Walter | Manifesting the Self | Medium](https://medium.com/manifesting-the-self/autopoiesis-and-autonomy-c0101a55e294)
- [Mind, matter and life](https://theecologist.org/2022/jul/12/mind-matter-and-life)
- [Transformative Change: conversations with Fritjof Capra | by Daniel Christian Wahl | Age of Awareness | Medium](https://medium.com/age-of-awareness/transformative-change-conversations-with-fritjof-capra-2705783b3d4)
- [“Living systems are regenerative systems” (Part 2 of 3) | by Daniel Christian Wahl | Regenerate The Future | Medium](https://medium.com/activate-the-future/living-systems-are-regenerative-systems-part-2-of-3-d1a55cf11834)
- [Resurgence • Article - The Systems View of Life](https://www.resurgence.org/magazine/article4162-the-systems-view-of-life.html)
- [Transformative Change: conversations with Fritjof Capra](https://www.gaiaeducation.org/blog/57160-transformative-change-conversations-with)
- [La autopoiesis: Humberto Maturana - YouTube](https://www.youtube.com/watch?v=lWJ8Swwi5Sc)
- [HUMBERTO MATURANA y la AUTOPOIESIS - YouTube](https://www.youtube.com/watch?v=gzpwMvjb5_o&pp=0gcJCdgAo7VqN5tD)
- ["El Origen de la Vida" HUMBERTO MATURANA (PARTE 1) en Congreso Futuro 2017 - YouTube](https://www.youtube.com/watch?v=K67ll2aavrw)
- [Seres vivos como máquinas. Maturana, Varela y el impacto de la autopoiesis - Juan Carlos Letelier - YouTube](https://www.youtube.com/watch?v=8TbqdtgmNZc)
- [Speaker Series #6: Clarke and Clough on Varela, an Interview with Lombardi - YouTube](https://www.youtube.com/watch?v=zp-ii9zZ-P0)
- [Humberto Maturana: vida y autopoiesis - YouTube](https://www.youtube.com/watch?v=HJ0k4UanzTU)
- [How does he think? Reflections with Humberto Maturana - YouTube](https://www.youtube.com/watch?v=x8fLNJlnfkw)
- [Humberto Maturana Interview - YouTube](https://www.youtube.com/watch?v=fQFlceVouPA)
- [Dr. Petra Kuenkel and Dr. Humberto Maturana talk about “The Systems view of Life” - YouTube](https://www.youtube.com/watch?v=EJDWEJYSjyI)
- [Maturana and the Observer | Springer Nature Link](https://link.springer.com/chapter/10.1007/978-1-4613-0115-8_4)
- [TB871: "Anything said is said by an observer": Humberto Maturana’s impact on Systems Thinking](https://blog.dougbelshaw.com/tb871-humberto-maturana-2/)
- [(PDF) Maturana's constitutive ontology of the observer](https://www.academia.edu/26596044/Maturanas_constitutive_ontology_of_the_observer)
- [(PDF) Maturana's constitutive ontology of the observer](https://www.researchgate.net/publication/232480485_Maturana's_constitutive_ontology_of_the_observer)
- [Maturana's Party: Sense-making through everyday language](https://www.gregoryvig.com/p/maturanasparty)

## User:

> 5/30/2026 21:41:38

Contemporary Buddhists influenced by this work

## Assistant:

> 5/30/2026 21:42:21

The most direct lineage runs through three figures, then branches out.

**Evan Thompson** is the central one. He's the third co-author of *The Embodied Mind*, was effectively Varela's intellectual son (Thompson's father William Irwin Thompson founded the Lindisfarne Association where Varela was a fellow), and has carried the project forward more than anyone else after Varela's death in 2001. He's not a robed practitioner but he's deeply trained in Buddhist philosophy, particularly Madhyamaka and Yogācāra. His books *Mind in Life* (2007), *Waking, Dreaming, Being* (2015), and *Why I Am Not a Buddhist* (2020) are the rigorous continuation. The third one is particularly worth knowing about — it's a critique of "Buddhist exceptionalism" and "Buddhist modernism" from inside the tradition, arguing that the Western scientific embrace of Buddhism (including some of *The Embodied Mind*'s own moves) has flattened and distorted the actual tradition. Thompson is the one who can both defend and critique the Varela project from inside it.

**B. Alan Wallace** is the other essential figure. He was Varela's interpreter and translator for years at Mind and Life dialogues, is unusual in being both a Tibetan-trained monastic (ordained by the Dalai Lama) and a PhD in religious studies from Stanford, and runs the Santa Barbara Institute for Consciousness Studies. His work is the most direct attempt to actually *do* what Varela proposed — combining rigorous contemplative training (especially śamatha) with scientific investigation of mind. Books like *The Attention Revolution*, *Contemplative Science*, and *Mind in the Balance* are the practitioner-facing version of the neurophenomenology program.

**Stephen Batchelor** is the third pillar, though he's the most independent. A former Tibetan and Zen monastic, now a secular Buddhist teacher and translator, his project is to recover what he calls "Buddhism 2.0" — a Buddhism stripped of metaphysical commitments and focused on a phenomenology of experience. *Buddhism Without Beliefs*, *Confession of a Buddhist Atheist*, and *After Buddhism* are the core texts. He's not directly a Varela successor but the intellectual sensibility is parallel — naturalistic, phenomenological, skeptical of dogma, deeply trained in classical sources, especially Nāgārjuna.

**Joan Halifax** is the Zen teacher you've already encountered through Upaya. Her connection to Varela was personal as well as intellectual — he was a frequent visitor in Upaya's early years and helped shape the ethos — and her work on compassion, contemplative end-of-life care, and the GRACE program for healthcare clinicians is the most embodied application of these ideas in a Zen lineage. Her book *Being with Dying* is the practical version of what Varela was reaching for in *Sleeping, Dreaming, and Dying*.

**Mingyur Rinpoche** is the Tibetan teacher most actively involved in the neuroscience-Buddhism dialogue post-Varela. Richard Davidson's lab has studied him extensively; his book *In Love with the World* is a beautiful account of a four-year wandering retreat that's also a phenomenological text about the mind. He represents the Tibetan-tradition side of the conversation that Varela helped initiate.

**Matthieu Ricard** belongs in this group too — French-born Tibetan monk, PhD in molecular biology (Pasteur Institute) before ordination, frequent Mind and Life participant, the Dalai Lama's French interpreter for many years. He's the Western-scientist-turned-monk who embodies the bridge Varela was building.

**Jay Garfield** is the philosopher's philosopher in this space. His translation and commentary on Nāgārjuna's *Mūlamadhyamakakārikā* (*The Fundamental Wisdom of the Middle Way*) is the standard reference, and his more recent *Losing Ourselves: Learning to Live Without a Self* is the contemporary Madhyamaka argument that there is no self, written for a general audience. He's a Mind and Life veteran and probably the strongest analytic philosopher writing on Buddhism today.

**John Dunne** — who's teaching at the August Upaya retreat — is the academic who most directly works the Varela-Buddhism intersection now. He's at Wisconsin-Madison, deeply involved with the Center for Healthy Minds (Davidson's center), and his work on Dharmakīrti and on contemplative theory is the closest current academic equivalent of what Thompson does, but more rooted in classical Buddhist epistemology specifically.

A few additional names worth knowing for breadth. **David Loy** writes from a Zen perspective on the Buddhist response to modernity and ecological crisis, and his work draws on autopoiesis-adjacent ideas. **Robert Wright**'s *Why Buddhism Is True* is the popular-science version of the Buddhism-meets-cognitive-science argument, accessible but thinner. **Christine Wilkinson Daugherty** and others in the contemplative psychotherapy world (especially the Naropa lineage that Trungpa founded, where Varela himself studied) carry the influence into clinical practice. **Andreas Roepstorff** at Aarhus is a cognitive anthropologist running empirical studies in the Varela-neurophenomenology tradition with active Buddhist collaborators.

One pattern worth naming. The figures most directly carrying Varela's project forward tend to share three things: rigorous training in both contemplative practice and academic philosophy/science; a commitment to Madhyamaka and the Mind and Life dialogue tradition; and a wariness of "Buddhist modernism" (the tendency to flatten Buddhism into wellness or neuroscience without taking its philosophical commitments seriously). Thompson, Wallace, Garfield, Dunne, and Batchelor all fit this profile, even though they disagree with each other on important points — Batchelor on whether to keep rebirth, Thompson on whether Buddhist exceptionalism distorts the tradition, Wallace on whether secular framings lose the goods. The disagreements are themselves a sign that the lineage is alive.

If you want a single next book that opens this whole field, **Thompson's *Why I Am Not a Buddhist*** is the most provocative and the most useful, precisely because it makes the lineage argue with itself.

## User:

> 5/31/2026 17:29:07

Is there a consistent structure ala 
- the unfiltered existing reality
- some mediating function, ie umwelt, highlight some aspects and not others 
- the resulting perception

## Assistant:

> 5/31/2026 17:30:02

Yes — that three-part structure is one of the most consistent moves across the entire intellectual landscape you've been exploring. It shows up in different vocabularies, but the underlying schema is remarkably stable. Here's the structure across traditions, with each tradition's name for the three parts.

**von Uexküll (1909–1934).** *Umgebung* (the surrounding physical environment, the unfiltered "objective" world) → *Umwelt* (the species-specific perceptual world, shaped by which signals the organism's receptors and effectors register) → the lived experience of the tick, the bee, the human. This is the originating version of your schema in modern thought. Von Uexküll's tick famously responds to only three signals — butyric acid, warmth, hairiness — out of the entire universe, and *that's its world*.

**Maturana and Varela.** The unspecified background of perturbations → the structure of the autopoietic system (which determines which perturbations register as which changes) → the brought-forth world / cognitive domain. Their language: "structural coupling" mediates between an organism and its medium, and what counts as a "perturbation" is determined entirely by the organism's structure, not by anything intrinsic to the environment. The famous frog-eye paper ("What the Frog's Eye Tells the Frog's Brain") was the empirical seed of this — the frog's retina doesn't transmit "the world," it transmits four specific feature-detectors.

**Kant.** *Ding an sich* (the thing-in-itself, noumenon) → the categories of understanding plus the forms of intuition (space and time) → *Erscheinung* (appearance, phenomenon). This is the philosophical ancestor of the whole structure. Kant's claim that we cannot know the noumenon directly but only as filtered through the categories is the move that everything downstream is variations on.

**Husserl and phenomenology.** The hyletic data (raw sensory matter) → the noesis (the intentional act of consciousness, the "how" of meaning-giving) → the noema (the object-as-meant). Husserl's noetic-noematic correlation is the phenomenological version. Merleau-Ponty's body-schema is a more embodied version of the same move.

**Buddhist Abhidharma.** *Ālambana* (the object-condition) → the sense-faculty plus the constructive activity of consciousness (especially *saṃskāra*, formations, and the eight consciousnesses in Yogācāra) → the experienced object. The Yogācāra version is the strongest — the school is sometimes called "consciousness-only" because it argues there is no graspable object apart from the construction. Madhyamaka adds the further move that even the construction lacks intrinsic existence (*śūnyatā*).

**Cognitive science / predictive processing (Karl Friston, Andy Clark, Jakob Hohwy).** The sensory signal → the brain's generative model (priors, predictions, precision-weighting) → the perceived world. Andy Clark's *Surfing Uncertainty* is the clearest statement: perception is "controlled hallucination" constrained by sensory evidence. The model is the mediating function.

**Gibson and ecological psychology.** The energy array (light, sound, etc.) in the environment → the organism's perceptual systems attuned to specific *affordances* → the perceived affordance-world. Gibson is unusual in pushing more of the structure into the environment-organism *relation* rather than into a mental representation, but the three-part schema is still there.

**Information theory / Shannon.** The signal → the channel (with its noise, bandwidth, encoding) → the received message. This is the engineering version of the same structure and it's worth knowing because Maturana and Varela's "perturbation → structure → state-change" maps onto it directly.

**Bateson.** "The territory" → "the map" (with all its conventions, scale, projection, selection) → the cognitive use of the map. Bateson's famous "the map is not the territory" line, borrowed from Korzybski, is the most quoted version of your schema in cybernetic vocabulary. Bateson's "differences that make a difference" is the mediating function — only certain differences register as information.

**George Spencer-Brown / DSRP.** The unmarked space → the act of distinction (drawing a boundary) → the marked space and its complement. This is the most formal version, reduced to a single operator. Cabrera's DSRP makes the same move with "Distinctions" as the first irreducible cognitive operation.

**Cognitive linguistics (Lakoff and Johnson).** The bodily-perceptual experience → conceptual metaphor and image schemas → linguistic and thought structure. The mediating function here is metaphor, which selects and structures which aspects of source domains get mapped onto target domains.

**Sociology of knowledge / framing.** Reality → frame (Goffman) or paradigm (Kuhn) or ideology or discourse (Foucault) → socially constructed knowledge. The mediating function is collective rather than individual, but the schema is the same.

**Marshall McLuhan and media ecology.** Reality → medium ("the medium is the message") → the perceived/communicated world. The medium is the filter that determines which aspects of reality become salient and how. Every new medium produces a different *umwelt*.

**The Blind Spot (Frank, Gleiser, Thompson, 2024).** "Reality as it is" → scientific abstraction and the structure of measurement → the picture of the world science produces, which mistakes its abstractions for the territory. Their whole argument is that science has forgotten the middle term, treating its filtered output as unfiltered reality.

**The underlying pattern.** Every version has three slots: an *unfiltered something* (which most of the traditions agree we cannot access directly), a *mediating function* that selects, shapes, or constructs, and a *resulting experience or knowledge* that the organism / mind / culture / instrument actually operates on. The traditions differ on three questions: how much we can say about the unfiltered something, whether the mediating function is individual or collective, and whether the resulting perception is best understood as representation, enaction, construction, or interpretation.

A few subtle differences worth knowing. The strongest version of the schema — Maturana, Madhyamaka, radical constructivism — denies that the unfiltered something is meaningfully describable at all, because describing it would already be a mediated act. A weaker version — Kant, predictive processing, Bateson — treats the unfiltered something as real and consequential but inaccessible directly. The weakest version — Gibson, sometimes Husserl — pushes back against the schema by saying the mediation is less of a barrier than the others claim, that perception is direct contact with affordances or essences rather than a constructed inner picture.

The Varela-Buddhist convergence sits at the strong end of this spectrum. Both traditions deny that the unfiltered something has intrinsic essence (*svabhāva*), both treat the mediating function as constitutive rather than just selective, and both treat the perceived world as enacted rather than received. That's what makes the convergence non-trivial — they're not just sharing a three-part schema, they're agreeing on the strong reading of it.

The most useful single way to hold this: **substrate / cut / projection**. The substrate is whatever you can't access directly. The cut is the mediating function — sensory, conceptual, cultural, technological, perspectival. The projection is what shows up for the observer as world. Everything you've been exploring — DSRP, ArchiMate viewpoints, semantic layers, polarity maps, Pol.is, CLA, AQAL, the lens-as-artifact tools — is a different attempt to make the *cut* itself an object you can see, share, fork, and change. That's the deeper through-line of the whole conversation.

## User:

> 5/31/2026 18:02:39

How is the idea accounted for that what’s perceived can be used recursively to build on it . Ala conceptual blending with an output space becoming an input space

## Assistant:

> 5/31/2026 18:03:38

The recursive move — that perception becomes an input to the next round of perception — is one of the most important features of every serious version of this framework, and the traditions handle it in characteristically different ways. The short version: nobody serious treats the three-part schema as a one-shot. They all treat it as iterating, with the output of one cycle becoming the substrate of the next. Here's how each tradition accounts for the recursion, with conceptual blending as one of the most explicit cases.

**Fauconnier and Turner's conceptual blending** is the most explicit. Their architecture has two (or more) *input spaces*, a *generic space* that captures what they share, and a *blended space* that integrates them and crucially develops *emergent structure* that isn't present in either input. The recursive move is that the blended space can then become an input space for a further blend. This is called a *megablend* or *hyperblend*. Turner's *The Origin of Ideas* (2014) makes this central: human cognition's distinctive feature is *advanced blending*, where blends compress, then feed back as new inputs, recursively building conceptual complexity. The whole point is that the output space *must* be reusable as an input space, or you can't get from "horse" plus "rider" to "knight" to "chivalry" to "the chivalrous tech CEO." Each level is a blend that becomes raw material for the next.

**Maturana and Varela** handle the recursion through their concept of *second-order distinctions* and the *observer of the observer*. In their framework, a living system distinguishes things in its medium, and then a nervous system can distinguish *its own distinctions*, and then language allows the distinguishing of distinguishing of distinguishing, in principle without limit. They call this *recursion in the linguistic domain*, and it's the move that gets you from biological cognition to self-awareness to culture. The famous Maturana line "everything said is said by an observer" already presupposes an observer who can observe their own observing. In *The Tree of Knowledge* they describe this as the move into the "linguistic domain" and then into "reflective consciousness," which is recursion all the way up.

**Spencer-Brown's *Laws of Form*** is the most formal version. The opening operation is "draw a distinction," producing a marked state. The crucial later move is *re-entry* — the form re-entering its own indicational space — which is what allows self-reference and recursion. Spencer-Brown shows that re-entry generates time, paradox, and the imaginary values that aren't in the original two-state calculus. Niklas Luhmann built his entire social systems theory on this: social systems are *autopoietic* in the sense that their outputs (communications) become the inputs for further communications, recursively, without ever touching anything outside the system. Communication produces communication produces communication. The recursion *is* the system.

**Predictive processing and active inference (Friston, Clark)** make recursion the engine of cognition. The brain's generative model produces a prediction, the prediction is compared to incoming sensory signal, the prediction error updates the model, the updated model produces the next prediction. Each cycle's output is the next cycle's prior. Clark's *Surfing Uncertainty* makes this explicit: perception isn't a one-shot inference, it's an ongoing recursive loop where what you just perceived shapes what you can perceive next. This is also why priors are so consequential — they compound across cycles, which is why two people watching the same event can perceive radically different things by the tenth iteration.

**Buddhist Yogācāra** has perhaps the most sophisticated treatment. The eighth consciousness, *ālayavijñāna* (store-consciousness), holds *bīja* (seeds) deposited by past mental acts. These seeds ripen into present perceptions, which deposit fresh seeds, which ripen into future perceptions. The whole apparatus is a recursive loop: experience conditions consciousness conditions experience. This is *vāsanā* (perfuming or impregnation) — the way past acts leave a residue that shapes future perception. The soteriological project of Yogācāra is to interrupt the recursion at the seed level, since seeds laid now will determine what world appears next. Madhyamaka's *pratītyasamutpāda* (dependent origination) is the same recursion described from the outside: every link in the chain is both effect of what came before and cause of what comes after.

**Bateson** describes the recursion as *deutero-learning* or *learning to learn*. First-order learning is learning a specific response. Second-order learning is learning the pattern of what kinds of contexts call for what kinds of responses. Third-order learning is changing the framework within which second-order learning happens. Each level takes the output of the previous level as its content. Bateson's hierarchy of logical types, borrowed from Russell, is the formal scaffolding.

**Hofstadter** is the popular-science laureate of this. *Gödel, Escher, Bach* and *I Am a Strange Loop* are 800 pages on the single claim that self-reference and recursive feedback are what produce minds. His *strange loop* is exactly the structure where output becomes input becomes output, and the loop is what makes a "self" appear. Hofstadter takes the move you named — output space becoming input space — and argues it *is* consciousness.

**Phenomenology** handles recursion through *sedimentation* (Husserl) and *the body schema* (Merleau-Ponty). Sedimentation is the process by which past acts of meaning-constitution become the implicit ground for future ones — you don't re-construct the meaning of "chair" each time you see one, the past constitutions have sedimented into a habit of perception. Merleau-Ponty's body schema is the recursively updated map of the body-in-the-world that organizes the next perception. Both are versions of "the output becomes the input."

**Cybernetics** had this from the start as *feedback*. First-order cybernetics (Wiener) made feedback the core concept — the output of a system loops back as input, allowing self-correction. Second-order cybernetics (von Foerster) recursed the move onto the observer: the observer is part of the observed system, the observer's observation becomes input to further observation. The slogan "cybernetics of cybernetics" is literally the recursive form.

**Vygotsky and developmental psychology** treat the recursion socially. Tools and signs that started as external (a knot in a handkerchief, a word from a parent) get internalized and become inner tools for further cognition. Each internalization is an output (of culture) becoming an input (to individual mind). Then the individual produces new outward signs, which become inputs for others. Mike Cole's cultural-historical psychology develops this into a full account of how culture and cognition recurse on each other across generations.

**The Blind Spot** (Frank, Gleiser, Thompson) names a particular pathology of recursion: when the output of one round (a useful scientific abstraction) gets re-input as if it were the unfiltered substrate, the recursion drifts away from experience. Each cycle takes the abstraction more seriously as "reality," and the original experiential ground gets buried under accumulated abstractions. This is one diagnosis of how science can lose touch with experience without anyone making a mistake at any given step — the recursion does it.

**The deeper pattern.** Every tradition that takes the three-part schema seriously eventually has to add a fourth element: *the feedback path from projection back to substrate*. Without it, the schema is a one-shot, and one-shot doesn't account for development, learning, culture, language, or self-awareness. With it, the schema becomes a spiral rather than a sequence: substrate → cut → projection → (which becomes new substrate for) → cut → projection → and so on. The projection at level *n* doesn't replace the substrate, it *becomes part of* the substrate at level *n+1*.

Conceptual blending is one of the cleanest accounts of this because it makes the recursion structurally explicit — the blended space is literally available as an input space for the next blend, and the architecture is the same at every level. That's why Fauconnier and Turner can use the same diagram to describe "the horse is a vehicle" and "the modern corporation is a person" — the recursion is general.

There's one move worth flagging that the traditions handle differently. Some (Madhyamaka, Maturana, Spencer-Brown) treat the recursion as the *whole* of what's happening — there is no unmediated substrate underneath, the spiral is reality. Others (Kant, predictive processing, Husserl) treat the recursion as operating on a real but inaccessible substrate. The choice has consequences for whether you treat the lens-tools you've been mapping as approximations of a fixed reality, or as the only reality there is. Cabrera, Wilber, and the contemplative traditions you've been moving toward all sit on the strong side of that question: the recursion is the substrate.

The practical implication for the tool question you were working on earlier: a lens-first tool that takes itself seriously would not just let people share lenses — it would let *the output of one lens become an input space for the next*. The lens applied to a corpus would produce a projection. The projection would be available as substrate for a further lens. Sharing the lens would mean sharing a recursive operator, not a static cut. That's the move conceptual blending makes formally, and it's the move that no current tool I named in the earlier 2x2s actually supports. Tana's supertags come closest in spirit — a tag can apply to anything, including the output of another tag's query — but the tool doesn't make the recursion first-class. That gap might be the deeper version of the gap you were originally pointing at.

## User:

> 5/31/2026 18:48:25

So let’s use a real example to unpack it. Imagine I see an opportunity to build a new product. At some point, I write down my interpretation in the form of statements or claims, such as “home chefs want to improve their nutrition “ or “ cooks will pay five dollars a month for this service “.

Using that as input, I would make a cut where I designated those two statements as assumptions

When I apply the idea of the three parts schema, then I see a fundamental error in how Tanna, Rome, other tools operate in that they apply a tag or super tag to the original statement. Effectively combining the substrate with the cut.
Critique this interpretation

## Assistant:

> 5/31/2026 18:49:14

Your interpretation is largely correct, and the error you've identified is real and consequential. Let me sharpen it, push back where it overreaches, and then say where I think it actually lands.

**Where you're right.**

The core observation is sound. When you write "home chefs want to improve their nutrition" and then tag it `#assumption`, the tag is doing something philosophically distinct from the statement itself, but the tool treats them as a single composite object. The statement is a *claim about the world* (a candidate projection). The tag `#assumption` is a *metacognitive cut* — a stance you've taken on the epistemic status of that claim. These are not the same kind of thing. One is a proposition about home chefs. The other is a proposition about your relationship to the first proposition. The tool flattens them into one node with one tag, when they should be two distinct things in two distinct layers with a relation between them.

This matters because the moment you treat the tag as part of the statement, you lose the ability to do the recursive move cleanly. If `#assumption` is just a label on the original node, then "all my assumptions about home chefs" is a query result, but it's not an object you can apply a *further* cut to. You can't ask "which of my framings is treating these as assumptions versus as facts" — because the framing isn't a thing, it's a tag stuck on the substrate.

This is also why most PKM tools struggle with the move from individual to collective sense-making, which connects back to your original question. When two people tag the same statement differently — one tags it `#assumption`, the other tags it `#validated` — the tool has no way to represent that *both cuts are valid simultaneously from different observers*. It just shows one tag winning or both tags coexisting as if they were properties of the statement rather than properties of two different observers' stances toward the statement.

**Where the critique slightly overreaches.**

Calling it "combining the substrate with the cut" is *almost* right, but I'd refine it. The statement "home chefs want to improve their nutrition" is not the substrate in the strong sense. The substrate, in the strong Maturana-Madhyamaka reading, is whatever is actually happening with actual home chefs out in the world — most of which you have no direct access to. The statement is already a projection. It's the output of a cut you made before you ever opened the tool: you noticed something, you selected which aspects mattered, you put it into the form of a generalization about a category of people. The statement is itself a cooked artifact.

So the more precise critique is this: the tool is conflating *two cuts at different levels of recursion*. The first cut produced the statement (a projection treated, for working purposes, as a stable object). The second cut — the `#assumption` tag — is a metacognitive operation on that projection. The tool treats them as if they were the same kind of operation operating at the same level, when in fact the second cut is *taking the first cut's output as its input*. That's the recursion the previous turn was about, and the tool collapses it.

This refinement actually makes your critique stronger, not weaker, because it shows the problem isn't just about one missing layer — it's about the tool having no representation of *level* at all. Every cut sits flat on the canvas. The recursive structure is invisible.

**The deeper architectural error.**

The error isn't really about tags. It's about what *kind of thing* a tag is in these tools. In Tana, Roam, Obsidian, and the rest, a tag is an attribute of a node. Attribute-based modeling is fine when you're describing intrinsic properties of an object ("this is a customer," "this is a meeting note"). It becomes wrong when you use it to describe *stances toward* the object. The stance is not in the object. The stance is in the relationship between an observer and the object.

A faithful version would treat the cut as a *first-class relational entity* with three positions: who is making the cut, what is being cut, and what the cut declares. Something like a triple: `(me, "home chefs want to improve their nutrition", treats-as-assumption)`. Then a different observer could form a different triple over the same statement: `(my-cofounder, "home chefs want to improve their nutrition", treats-as-validated)`. Then *both triples become objects* available for further cuts: `(me, [the disagreement above], treats-as-the-thing-we-need-to-resolve-before-Series-A)`. That's recursion preserved.

This is closer to how RDF triples, JSON-LD with named graphs, or DDD bounded contexts work — and it's why the semantic layer family appeared in your earlier matrices as the only tools that actually treat the cut as first-class. They got the layering right because they're handling the same problem at a different altitude.

**One honest counter-argument worth steel-manning.**

The PKM tool builders aren't unaware of this. They've made a deliberate trade-off: flat tag-on-node modeling is cognitively cheap and scales to a population of users who would never tolerate triple-based authoring. Tana's supertags are a partial concession — a supertag carries fields and behaviors, which is one step toward "the tag is a thing, not just a label." Notion's relations between databases are another partial concession. The full version of what you're describing — where every cut is a first-class entity with an observer, a target, and a declared stance — has been built (Cyc, OpenCog, formal ontology tools) and *nobody uses it* because the authoring overhead is brutal. The PKM tools are sitting at a particular point on a cost-quality curve, and the flattening you're objecting to is the price of mass usability.

The honest read is that this trade-off was right for the previous generation of tools and is becoming wrong now. The reason it's becoming wrong is AI: the authoring cost of triple-style structure is collapsing because models can do most of the structural work from natural-language input. The cost-quality curve is shifting, and the tools haven't repositioned yet. That's the actual market opening — not "build the lens-first tool from scratch," but "AI makes the previously-prohibitive cost of cut-as-first-class structure now affordable, and somebody is going to ship it."

**Where your interpretation lands.**

The critique is correct, sharper than most, and points at a real architectural gap. The one upgrade I'd make is to stop calling the original statement the substrate. Call it *projection-treated-as-substrate-for-the-next-cut*. That phrasing keeps the recursion visible and lets you talk about what's happening at every level without losing the layer structure. The "fundamental error" is then nameable precisely: the tool has no representation of *cuts being applied to prior cuts*, which means it cannot show the recursive structure that actually produced any given node, which means the lens-work stays invisible and the substrate-versus-cut confusion you identified is forced on every user by the tool's data model.

For your product example, the practical implication is this: if you wanted a tool that did this right, you wouldn't tag the statement `#assumption`. You would treat "this statement is an assumption I'm currently working with" as its own object — a *frame* over the statement — and that frame would have an author (you), a target (the statement), a stance (assumption), and a time (when you decided this). Then later, when you've done customer interviews, you'd produce a *new* frame: `(me, [statement + earlier assumption-frame], treats-as-partially-validated)`. The whole history of your lens-work on that statement would be inspectable, forkable, and shareable. The original statement wouldn't move. Your relationship to it would have a record.

That's the tool you've been describing for the last several turns. The critique you just made is the architectural reason it doesn't exist yet.

## User:

> 5/31/2026 18:57:19

So really there are four elements, the first element might be called substrate, but once it is based on a initial cycle, then it is no longer actual reality. The second is the mediation, the function, the frame. The third layer is the perception of the results. And the fourth thing is the feedback from perception into a new round as part of what’s not called substrate. If this is correct, or we can correct this, I need names for all four of those elements.

## Assistant:

> 5/31/2026 18:58:01

Your structure is correct, with one refinement worth making before naming. Let me restate, refine, then name.

**The structure restated.**

What you have is a four-element cycle, where the fourth element is not a *thing* alongside the other three but the *operation* that closes the loop and makes the cycle iterate. Three nouns and one verb, in other words. The fourth element isn't another layer at the same level as substrate, mediation, and perception — it's the dynamic that turns a one-shot schema into a recursive one. It's the *folding-back*.

The refinement worth making: once you're past the first cycle, "substrate" isn't unfiltered reality anymore, but it isn't *just* the previous projection either. It's the previous projection *plus* whatever fresh perturbations are arriving from the world that the current cut is sensitive to. So the substrate at cycle *n* is a *composite* — sedimented prior projections mixed with fresh inputs. This matters for naming, because you don't want a name that suggests the substrate is only the previous projection (that would erase the world entirely, which is the strong-Madhyamaka reading; you may want it, but you should name it knowing that's what you're committing to).

So the question is whether you want names that commit to the strong reading (substrate-after-cycle-1 is *just* prior projection, world drops out) or the weak reading (substrate-after-cycle-1 is *prior projection plus fresh perturbations*). I'll give you both vocabularies.

**The four elements, named.**

Here are several naming sets, each internally consistent, each with different commitments. Pick the one that matches what you actually mean.

**Set 1 — Cybernetic / process. Neutral, technical, weakly committed.**
1. *Substrate* — what the cut operates on (initially unfiltered reality, later a composite)
2. *Frame* — the mediating function, the cut, the lens
3. *Projection* — the resulting perception, what shows up for the observer
4. *Sedimentation* — the folding of projection back into substrate for the next cycle

The fourth term, *sedimentation*, is Husserl's word and carries exactly the right meaning: past acts of meaning-making settle into the ground that future acts will operate on, without being identical to that ground. I think this is the strongest single set.

**Set 2 — Enactivist / Maturana-flavored. Stronger commitment to observer-dependence.**
1. *Medium* — the unspecified field of perturbations
2. *Structural coupling* — the cut, the structurally-determined sensitivity of the observer
3. *Brought-forth world* — the projection
4. *Recursion* — the looping that makes the brought-forth world a perturbation in the next round

*Recursion* is the most technically accurate word but it's a verb dressed as a noun. If you want the fourth slot to feel like the others, this set is slightly awkward.

**Set 3 — Buddhist / Yogācāra-flavored. Strongest commitment to the strong reading.**
1. *Ālambana* (object-condition) — what's there to be cognized
2. *Vijñāna* (consciousness) — the discriminating activity
3. *Nimitta* (the appearance, the sign) — the projection
4. *Vāsanā* (perfuming, impregnation) — the residue that conditions the next cycle

This is the most philosophically loaded set. It commits you to a particular tradition. Use it only if you want the tradition's full weight.

**Set 4 — Computational / data. Clean, modern, easy to teach.**
1. *Input* — what's there
2. *Operator* — the cut, the function being applied
3. *Output* — the projection
4. *Feedback* — the path from output to next input

This set is correct and unromantic. It loses everything that makes the schema philosophically distinctive, but it's the easiest to communicate in product or engineering contexts.

**Set 5 — Spencer-Brown / DSRP-flavored. Most formal.**
1. *Unmarked space* — the undifferentiated
2. *Distinction* — the act of cutting
3. *Marked space* — what's distinguished
4. *Re-entry* — the form re-entering its own indicational space

*Re-entry* is Spencer-Brown's term for the recursive move and is technically the most precise word in the English language for what you're describing. Tradeoff: it's obscure outside of cybernetics.

**My recommendation.**

If I had to pick one set for general use, it would be Set 1: **Substrate, Frame, Projection, Sedimentation**. Here's why.

*Substrate* is neutral about strong-versus-weak readings, which lets you stay rigorous without committing prematurely. *Frame* is the most adopted English word for "the cut" across all the traditions you've been reading (Goffman, Lakoff, framing theory, social construction), so it carries broad recognition. *Projection* avoids "perception" (which has too much sensory connotation) and avoids "output" (which is too engineering), and it has the right geometric feel — something is being thrown forward onto a surface by the frame. *Sedimentation* is the best fourth term in English because it carries the meaning correctly (past acts settle into ground) without being a verb-as-noun like *recursion* or *feedback*, and it preserves the temporal dimension that the others lack — sedimentation happens over time, and the deeper layers are older.

**An alternative fourth term worth considering.**

If *sedimentation* feels too geological, three serious alternatives:

*Imprint* — short, English, captures the marking of the next cycle's substrate. Closest to Buddhist *vāsanā*.

*Sediment* (as noun rather than nominalized verb) — what you have at any moment as the residue of all prior cycles. "Today's substrate is yesterday's sediment plus fresh perturbations."

*Carry-over* — plainest English, less evocative but unambiguous.

If your audience is design or product, *imprint* probably reads best. If your audience is contemplative or academic, *sedimentation* reads best. If your audience is technical, *feedback* is fine and clearer than the alternatives.

**One naming pitfall to avoid.**

Don't name the fourth element something that suggests it's a fourth *thing* parallel to the first three. It isn't. Substrate, frame, and projection are *states* or *objects*. The fourth element is the *transition* that turns one cycle's projection into the next cycle's substrate. If you name it like a peer to the others (something like "memory" or "record"), you'll confuse yourself later. Keep it named as an operation, a process, or a residue — something whose grammar makes clear that it's the loop-closing move rather than a fourth thing on the canvas.

The cleanest visual representation, if you were diagramming this for someone, would be three boxes for substrate / frame / projection, and an *arrow* from projection back to substrate labeled with the fourth term. That arrow is what makes the schema a spiral instead of a sequence. Everything important about recursion lives in the arrow.

## User:

> 5/31/2026 19:02:29

The 2nd (eg frame) is also an operation , right?

## Assistant:

> 5/31/2026 19:02:58

Yes, and catching that is important. The frame is also an operation, not a thing. The four-element schema is actually *two states and two operations*, alternating:

- **Substrate** — a state, what's available to be operated on
- **Framing** — an operation, the act of applying a cut
- **Projection** — a state, what results
- **Sedimenting** — an operation, the folding back

State, operation, state, operation. The cycle alternates between something existing and something being done to it. That's why the loop works — operations transform states into other states.

Calling the second slot "frame" rather than "framing" obscures this in exactly the same way that calling the fourth slot "sedimentation" (as a thing) rather than "sedimenting" (as an act) would obscure it. Both are operations, and the noun form is a nominalization that hides the verb.

This matters for a few reasons worth being explicit about.

**The frame as a noun is the artifact of an act of framing.** When you save a Plectica perspective or a Notion view or an ArchiMate viewpoint, what gets stored is a *crystallized framing operation* — a recipe for how to cut, packaged as if it were a thing. The reason these tools can make the lens first-class at all is precisely this nominalization: they turn the act of framing into a stored, named, shareable object. So in product or tool contexts, "frame" as a noun is useful — it names the saved operation. But conceptually, the noun is shorthand for "the operation that produces this kind of projection when applied to this kind of substrate."

**This also clarifies the substrate-versus-cut confusion from your Tana critique.** The tool stores `#assumption` as a tag (a thing) on a node (a thing). But `#assumption` is really a *frozen framing operation* — the act of treating-as-assumption, packaged as a label. Because the tool stores the result of the operation rather than the operation itself with its observer and its target, it loses the layering. A more faithful tool would store the *framing* (the verb) rather than just the *frame* (the noun), because then "who framed this as an assumption, when, against what" becomes inspectable.

**The cleaner four-element vocabulary, with this correction:**

- **Substrate** (state) — what's there to be operated on
- **Framing** (operation) — the act of cutting, applying a lens
- **Projection** (state) — what results
- **Sedimenting** (operation) — the folding back of projection into next substrate

Or, if you want each slot in noun form for symmetric readability and don't mind the nominalization:

- **Substrate** — the field
- **Frame** — the cut
- **Projection** — the appearance
- **Sediment** — the residue

The second pair reads cleaner but hides that two of these are operations. The first pair is more philosophically precise but the *-ing* endings feel awkward.

A third option, which I think is actually the best for keeping the structure visible, is to use **different parts of speech deliberately to mark the alternation:**

- **Substrate** (noun) — the field
- **Framing** (gerund) — the cutting
- **Projection** (noun) — the appearance
- **Sedimenting** (gerund) — the carrying-over

This is faithful to the structure and tells you, just from the grammar, which slots are states and which are operations. If you were writing this up, the noun-gerund-noun-gerund pattern would make the cycle visible without needing a diagram.

**One deeper consequence worth naming.**

If both framing and sedimenting are operations, then the cycle has two distinct *agencies* at work. Framing is something an observer does — the active selection, the explicit cut. Sedimenting is something that happens *through* the observer — the passive carrying-over, often not noticed, often automatic. The Buddhist Yogācāra distinction maps onto this directly: *vijñāna* (consciousness, discriminating) is the active framing, *vāsanā* (perfuming, impregnation) is the passive sedimenting. Husserl's *active synthesis* versus *passive synthesis* is the phenomenological version. Predictive processing's *prediction* versus *prior update* is the cognitive-science version.

This matters because most of the lens-tools you've been studying address only one of the two operations. ArchiMate, Plectica, polarity maps, DSRP — they make *framing* first-class. Almost nothing makes *sedimenting* first-class. The tool that did would let you see, for any current substrate, which prior projections have settled into it and are now shaping what the next frame can cut. That's a different and arguably more important kind of visibility, because sedimenting is the operation that happens invisibly.

So the fuller picture is: four slots, two of them states and two of them operations, with the two operations being qualitatively different — one active and selective, one passive and accumulative. The tools you've mapped address the active one. The passive one is the unaddressed half.

## User:

> 5/31/2026 21:36:36

How does P in DSRP fit

## Assistant:

> 5/31/2026 21:37:16

DSRP's P is doing real work in this schema, but not the work you might expect from its name. Let me unpack carefully because there's a genuine subtlety here.

**What DSRP's P claims to be.**

In Cabrera's framework, Perspective is one of four irreducible cognitive operations: Distinctions (D), Systems (S), Relationships (R), Perspectives (P). Each is described as something the mind *does*. P specifically is the operation of taking a point of view: every Perspective decomposes into a *point* (from where) and a *view* (toward what). The claim is that any cognitive act involves all four operations simultaneously, and P is what makes the other three observer-relative rather than absolute.

**Where P fits in your four-element schema.**

P fits in *both* the framing slot *and* outside the schema entirely, depending on how you read Cabrera. Here's the careful version.

Read narrowly, P is one type of framing operation among many. When you take the perspective "from engineering's point of view," you're applying a particular kind of cut — a stakeholder-positional cut — to whatever substrate is in play. That's framing. So P sits inside the framing slot as a *specific* operation: framing-by-position. Other framings — temporal, evaluative, modal, scalar — would also live in the framing slot but wouldn't be P in Cabrera's narrow sense. In this reading, your four-element schema is the more general structure and P is a special case.

Read broadly, P is something different and more interesting. Cabrera's stronger claim is that *every* cognitive act has a Perspective baked in, whether or not the observer notices. The act of drawing a Distinction is always from some point of view. The act of identifying a System is always from some point of view. The act of seeing a Relationship is always from some point of view. In this reading, P isn't *a* framing operation, it's the *observer-position-dependence of all framing operations*. It's the meta-fact that framing always has a from-where.

In your schema, that broad reading means P is best understood not as a peer of framing but as a *property* of framing — specifically, the property that framing always has an observer-position. It's what your four-element schema would call out if you wanted to fully specify a framing operation: not just "what cut" but "whose cut, from where."

**The cleaner mapping.**

Cabrera's DSRP and your four-element schema are doing different jobs at different altitudes. DSRP is a taxonomy of *what cognitive operations a mind performs in any single act of thinking*. Your schema is a description of *how those acts iterate over time and accumulate*. They're not competitors — they sit at right angles to each other.

Cabrera's four operations (D, S, R, P) all live inside your framing slot. They're the *internal structure* of any framing operation. Every act of framing involves: drawing distinctions (D), identifying systems-of-parts-and-wholes (S), seeing relationships (R), and doing so from a position (P). That's what framing *is*, internally. Your schema then adds the temporal/iterative dimension that DSRP doesn't really have: substrate before the framing, projection after, sedimenting into next substrate.

So a fuller picture would be:

- **Substrate** (state)
- **Framing** (operation), which internally is some combination of D + S + R + P
- **Projection** (state)
- **Sedimenting** (operation)

DSRP unpacks what's inside the framing slot. Your schema describes how framings sequence and accumulate.

**Where this gets interesting.**

The P-as-property reading is actually consistent with the strong observer-dependence claim you've been working with from Maturana and von Foerster. Cabrera is making a Maturana-style move: there is no observer-independent cognition, so the from-where is always present, even when it's invisible. The reason to name it as a separate operation in DSRP is *exactly* to make it noticeable in cases where people would otherwise treat their framing as a view from nowhere.

This connects back to your Plectica critique a few turns ago. Plectica makes Perspective a literal first-class object on the canvas — you can attach perspectives to cards, color-code them, switch between them. That's Cabrera operationalizing his claim: if P is always present in cognition, then the tool should make P always inspectable. The architectural move is the same one you were pointing at for your `#assumption` example: don't bury the from-where as a hidden property, surface it as a thing.

**One honest tension.**

DSRP claims that D, S, R, and P are *irreducible* and *co-equal* — none reduces to any other, none is more fundamental. But if you accept the strong observer-dependence reading, then P arguably has a different ontological status from D, S, and R, because P is what makes the other three observer-relative in the first place. Without P, D and S and R would be operations on a pre-given world. With P, they become operations from a position. So P is doing something the other three aren't doing — it's *constituting the observer-relativity* of the whole framework.

This is the same critique Midgley made of DSRP that I mentioned much earlier in our conversation: that the framework presents itself as a neutral description of cognition, while actually being one perspective (with a small p) among many. The framework is doing P on itself, claiming to be a view from nowhere while being from somewhere. The honest version of DSRP would acknowledge that P has a privileged role.

**The practical implication for your product example.**

When you tag a statement `#assumption`, what's missing isn't just "the tag is a frozen operation rather than a thing" (the previous critique). What's also missing is the *P* — the from-where of the assumption-judgment. *Whose* assumption is this? At *what point in time*? *From what position* in the company / project / market understanding? A faithful tool would attach not just the framing but also the position of the framer. The frame and the from-where are two facets of the same operation, and treating them as separable is part of what your critique was reaching toward.

So to answer directly: DSRP's P sits inside your framing slot as the *position-of-the-framer* component of any framing operation. Your schema is the temporal envelope; DSRP is the internal anatomy of one operation within it. Where they converge is on the substantive claim that the observer-position is always present and always consequential, and that the job of a faithful tool is to make it inspectable rather than hidden.

## User:

> 5/31/2026 22:40:28

Is Assumption is like a slot in a frame?

## Assistant:

> 5/31/2026 22:41:04

Yes, and naming it that way unlocks something important. Let me unpack carefully because there's a useful distinction hiding here.

**Frames have slots in the technical AI sense.**

This isn't just metaphor. Marvin Minsky's 1974 paper "A Framework for Representing Knowledge" introduced *frames* as structured knowledge representations: a frame is a stereotyped situation (a restaurant visit, a birthday party, a customer call) with named *slots* that get *filled* with specific values for any given instance. A restaurant frame has slots for diner, food, server, bill. A particular dinner fills those slots: diner=me, food=ramen, server=Anna, bill=$18. The frame structures expectation; the slots are where the variability lives; the fillers are the case-specific content.

Roger Schank's *scripts* (1977) refined this for narratives. Charles Fillmore's *frame semantics* (1976 onward) developed the linguistic version — every word evokes a frame with slots, and using the word commits you to the slot structure. "Buy" evokes a commercial transaction frame with slots for buyer, seller, goods, price; you can't really use "buy" without implicitly populating those slots.

So when you ask whether "assumption" is a slot in a frame, you're invoking a specific architectural concept that has decades of research behind it. The answer is yes, but with a refinement.

**Where "assumption" actually lives.**

"Assumption" isn't a slot inside any one content frame. It's a slot inside a *meta-frame* — a frame about *how to relate to a claim*. The meta-frame might be called something like the *epistemic-stance frame*, and its slots would be:

- *the claim* — the proposition being held
- *the stance* — assumption / hypothesis / belief / validated finding / open question / disproven
- *the holder* — who is taking this stance
- *the basis* — what evidence or reasoning supports the current stance
- *the time* — when this stance was adopted
- *the conditions for change* — what would update the stance

This is the frame your `#assumption` tag was reaching for and failing to capture. The tag fills the *stance* slot but leaves all the others empty and implicit. The tool has no representation of the holder, the basis, the time, or the conditions for change — even though all five are needed to make the stance interpretable later, especially by another person.

This is why the tag breaks under recursion: when you come back to the statement six months later, you have "this is an assumption" without knowing whose assumption, why, on what basis, and what would change it. The other slots aren't gone; they were just never made explicit.

**Two different framings that both fit here.**

Your home-chefs example actually involves *two* frames operating simultaneously, and seeing them as distinct sharpens the picture.

The first is the *opportunity frame* — the content frame in your head about a possible product. Its slots might be: target user, jobs-to-be-done, willingness to pay, channel, competitive landscape, defensibility. Each slot gets filled with content: target user = home chefs, willingness to pay = $5/month, etc. This is the *what* you're thinking about.

The second is the *epistemic-stance frame* — a meta-frame applied to each filler from the first frame. For "$5/month," your current stance is "assumption." For "target user = home chefs," your current stance might be "validated through five interviews." The meta-frame slots get filled per-claim, and they change over time as you learn.

Most tools collapse these two frames into a single flat structure. Linear's "we believe..." templates, OKR docs, lean canvas variants, and PRDs all gesture at the meta-frame but rarely make all its slots first-class. You get a section called "Assumptions" with bullets in it, which is the *stance* slot frozen as a heading, but the holder, basis, time, and conditions-for-change are missing.

**What this means for the tool critique.**

Your earlier critique — that the tag combines substrate with cut — can now be restated more precisely: the tool gives you a single slot ("tags") that's used to express stances, categorizations, and topical labels indiscriminately, when stances are actually *a meta-frame with its own slot structure* and deserve their own representation. The tool flattens a six-slot meta-frame into one tag because tags are the only structural primitive available.

A faithful tool would treat "this is an assumption" as instantiating an epistemic-stance frame, with all six slots either filled or visibly empty. You'd see at a glance: "Sarah, on May 31, marked $5/month as an assumption with basis 'industry analog pricing,' to be invalidated by ten customer conversations." That's the saved frame instance, not just a tag.

**The recursive payoff.**

This also explains how the recursion actually works in practice. When you do those ten customer conversations, the *projection* you get becomes the input substrate for a new framing operation. You apply the epistemic-stance meta-frame again to the same claim ("$5/month") with new slot-fillers: stance is now "partially validated," basis is "7 of 10 said yes," holder is still you, time is now later, conditions for change are now "test in production." The original frame instance doesn't get overwritten. A new one is created. The history of stance-changes becomes inspectable.

That history is the actual record of your learning. The reason no tool surfaces it is that no tool models the meta-frame.

**The deeper pattern.**

What you're converging on, across the last several turns, is a specific architectural insight: *the framing operation has internal structure, and that structure is itself frame-like*. Cabrera's DSRP unpacks the internal structure one way (every framing has distinctions, systems, relationships, and a position). Minsky's frame theory unpacks it another way (every framing instantiates a typed schema with named slots). Both are saying that "the cut" isn't a primitive — it has parts. The tool that takes lens-as-first-class seriously would have to model the parts.

So yes, "assumption" is a slot — specifically, the *stance* slot of the epistemic-stance meta-frame. And recognizing it as a slot rather than a tag is the precise architectural move that would let a tool support the recursion you've been describing. The tag flattens. The slot preserves layering. That's the difference.

## User:

> 6/1/2026 6:59:47

Let’s develop a minimal, concise scenario that shows how this might work.
- criteria: the same done in Tana-like-solution vs this direction show a difference wrt: framing (Tana-like tags vs ?)
- criteria: the same done in Tana-like-solution vs this direction show a difference wrt: framing (different observers)
-  criteria: the same done in Tana-like-solution vs this direction show a difference wrt: framing(sedimentation)

## Assistant:

> 6/1/2026 7:00:25

Here's a minimal scenario that exercises all three criteria in a few short steps. I've kept the content thin on purpose so the structural difference shows clearly.

**The scenario.**

You and your cofounder Sam are exploring a meal-planning product. On Monday, you write down: *"Home chefs will pay $5/month for nutrition coaching."* On Wednesday, you run five customer interviews. On Friday, Sam adds her own view of the same claim.

That's the whole scenario. Three moments, two observers, one claim. Now let's run it through both architectures.

---

**In a Tana-like tool.**

*Monday.* You create a node: `Home chefs will pay $5/month for nutrition coaching` and add `#assumption`. The node now has one tag.

*Wednesday.* After the interviews, you edit the same node. You remove `#assumption` and add `#partially-validated`. You add a child bullet: "7 of 10 said yes, but pricing was anchored." The original stance is gone — it survives, if at all, in the edit history that nobody reads.

*Friday.* Sam opens the node and disagrees with your reading of the interviews. She wants to mark it `#still-an-assumption` because she thinks the sample was biased. The tool lets her add the tag alongside yours, but now the node has two contradictory tags sitting next to each other with no indication of who put them there, when, or why. Or she overwrites your tag with hers, and your stance is gone.

The result after one week: a node with a confused tag soup, no record of who thought what when, no visible disagreement, no inspectable history of how the stance evolved. The original Monday framing has been erased by Wednesday's, and Sam's Friday framing is colliding with yours invisibly.

---

**In a frame-slot tool.**

*Monday.* You create a *claim* object: `Home chefs will pay $5/month for nutrition coaching`. Then you create a separate *stance* object that references the claim, with its slots filled:

- claim → [link to the claim above]
- holder → you
- stance → assumption
- basis → "industry analog pricing"
- time → Monday
- conditions for change → "ten customer conversations"

The claim and the stance are two distinct objects. The stance is your *framing operation* made explicit. The claim sits underneath as the substrate.

*Wednesday.* You don't edit the original stance. You create a *new* stance object referencing the same claim:

- claim → [same link]
- holder → you
- stance → partially validated
- basis → "7 of 10 said yes, but pricing was anchored"
- time → Wednesday
- conditions for change → "test in production"

Both stances now coexist. The claim has two stance-objects attached, in chronological order, both yours. The trajectory of your thinking is visible: Monday-you held it as assumption, Wednesday-you holds it as partially validated. The shift is inspectable. Neither stance overwrites the other.

*Friday.* Sam creates her own stance object referencing the same claim:

- claim → [same link]
- holder → Sam
- stance → still an assumption
- basis → "sample biased toward existing meal-kit users"
- time → Friday
- conditions for change → "re-run with cold outreach"

The claim now has three stance-objects attached. Two are yours, one is Sam's. The disagreement between you and Sam is not a contradiction — it's a visible difference in framing, attributed to two observers, each with their own basis. You can both hold your stances simultaneously, and either of you can create a *fourth* stance object framing the disagreement itself ("we currently disagree about validation; resolution requires expanded interviews").

---

**Reading against the three criteria.**

*Framing (tag vs slot).* The Tana-like tool stores the framing as a tag — a single label attached to the substrate, with the framing operation collapsed into the substrate itself. The frame-slot tool stores the framing as a typed object with six slots, separate from the substrate. The substrate stays clean; the frame is explicit; the operation that produced the projection is fully recoverable.

*Framing (different observers).* In the Tana-like tool, Sam's framing either overwrites yours or sits adjacent to it as an indistinguishable tag, with no representation of *who* did the framing. In the frame-slot tool, every stance object has a *holder* slot, so multiple observers' framings of the same substrate coexist as parallel objects, each fully attributed. Disagreement is structurally representable rather than a tag collision.

*Framing (sedimentation).* In the Tana-like tool, Wednesday's framing replaces Monday's, and the historical sequence is lost or buried in edit history. In the frame-slot tool, each new framing creates a *new* stance object rather than mutating an old one, so the chronological trajectory is visible. You can ask the substrate: "show me all the framings ever applied to this claim, in order, by whom" and get back the full sedimented history. Wednesday's stance doesn't replace Monday's; it sits *on top of* Monday's, and Monday's stance is now also part of the substrate that Wednesday's stance is responding to. The sedimentation operation from your four-element schema is preserved as data.

---

**The minimal architectural difference.**

The frame-slot tool only needs three things the Tana-like tool doesn't have. First, it needs *claims* and *stances* to be separate object types rather than node-plus-tag. Second, it needs stances to be *appended* rather than *mutated* — every framing event creates a new object, none overwrites a previous one. Third, every stance object needs at minimum a *holder* and a *time* slot, so observers and sedimentation are first-class.

That's the whole architectural delta. The user experience could still look like writing notes and adding tags — modern AI can do most of the slot-filling from natural-language input. The user types "I think home chefs will pay $5/month" and the tool infers: claim, holder=you, stance=assumption (because of "I think"), time=now. The user doesn't have to author the structure; the tool does. But the structure is *there*, which means every subsequent operation has the layering it needs.

The scenario is deliberately small, but it's the exact same architecture that scales: a board of three claims becomes a board of three hundred, the stances stack into a visible history, observers' framings sit side by side without colliding, and the substrate-cut confusion that broke the Tana version never arises because the cut was a different object type from the start.

## User:

> 6/1/2026 7:07:01

Re: sedimenting, the Wednesday change appears to only be responding the the original claim - not the combined ‘output’ of Monday (claim + Monday stance).

## Assistant:

> 6/1/2026 7:07:34

You're right, and you've put your finger on a real underspecification in my Wednesday example. Let me fix it precisely, because the fix matters for the whole architecture.

**What I did wrong.**

In the Wednesday step I wrote, the new stance object referenced *only* the original claim. Its `claim` slot pointed to "$5/month nutrition coaching." Nothing in the stance object indicated that Wednesday-you was responding to Monday-you's assumption-stance. The Monday stance might as well not have existed, from Wednesday's stance's point of view. Which means I claimed sedimentation was preserved, but actually the architecture I described would let Wednesday's stance be authored in total ignorance of Monday's — and would have no way to record that Wednesday was a *response to* Monday rather than an independent re-framing.

That's exactly the failure mode you're naming. Sedimentation isn't just "old framings are still findable later." It's that the *next* framing operates on the *composite* — the prior projection has become part of the substrate, and the new framing should be able to reference what it's responding to, not just what it's about.

**The fix.**

The stance object needs a slot I omitted. Call it `responds-to`. Its value is one or more prior stance objects (or, more generally, prior framings) that the new stance is taking up. Now Wednesday's stance looks like:

- claim → [link to the original claim]
- holder → you
- stance → partially validated
- basis → "7 of 10 said yes, but pricing was anchored"
- time → Wednesday
- conditions for change → "test in production"
- **responds-to → [link to Monday's stance]**

Now the architecture knows that Wednesday's framing is not a fresh framing of the claim — it's a framing of *the claim-plus-Monday's-stance*. The substrate for Wednesday is the composite. The new projection is a response to that composite, not to the bare claim.

This also makes Sam's Friday stance more precise. Without the `responds-to` slot, her stance just sits parallel to yours, holding "still an assumption." With it, she can be explicit about what she's responding to:

- responds-to → [link to *your* Wednesday stance], with disagreement-stance

Sam's "still an assumption" is no longer floating alongside two of your stances. It's a direct response to your Wednesday "partially validated" stance, and the architecture knows that the disagreement is specifically about Wednesday's framing, not about the original claim. That distinction matters: Sam isn't disagreeing with the *claim*, she's disagreeing with your *framing* of the interviews as partial validation.

**Why this matters for the four-element schema.**

The `responds-to` slot is what makes the sedimenting operation work as data. Without it, the architecture has substrate, framing, projection — but the loop never closes, because the next cycle's framing has no way to point at *what previous projection it's taking up*. Sedimentation is name-only; in practice, each new framing operates on the same bare claim as if no time had passed.

With `responds-to`, the architecture preserves the actual structure of the cycle: each framing references its substrate, and after cycle 1 the substrate includes prior projections, which can be explicitly named. The cycle now actually iterates. A new framing isn't just a fresh take on the bare claim — it's a framing of a substrate that has been *cooked* by prior framings, and the architecture records which prior framings are part of the substrate it's responding to.

**A subtle distinction worth naming.**

The `responds-to` relationship isn't the same as the `claim` relationship. They're orthogonal. The `claim` slot points at what the framing is *about*. The `responds-to` slot points at what the framing is *taking up from prior cycles*. A new framing could respond to multiple prior framings ("Wednesday's partial-validation, plus the cofounder offsite where we decided to bound pricing to round numbers"), or respond to zero prior framings if it's a fresh first cut on the substrate. Most after-cycle-1 framings will have both slots filled, but the slots are independent.

This also means the sedimentation history of a claim becomes a *graph*, not just a chronological list. Some framings respond to many prior framings; some are tributaries that don't get taken up by anything later; some are widely referenced. You can look at any current framing and trace back what's sedimented into it. You can look at the original claim and see the full branching tree of framings that have been applied. The historical structure of the lens-work is fully inspectable.

**The architectural primitive, restated.**

A stance object now has, at minimum:

- claim — what the framing is about (the original substrate)
- holder — who is framing
- stance — the cut being applied
- basis — what supports the cut
- time — when the cut was made
- conditions for change — what would update it
- responds-to — which prior framings are being taken up (the sedimentation pointer)

The seventh slot is what was missing. It's the slot that makes the schema actually recursive in the architecture, rather than just recursive in the philosophy. Good catch.

**One implication for tools.**

Almost no current PKM, planning, or whiteboard tool has anything resembling a `responds-to` slot on stance-like objects. Comments threads have it implicitly (a reply points at its parent). Pull request reviews have it implicitly. Argument-mapping tools like Kialo have it explicitly (claims attach to parent claims with pro/con stance). But none of these treat the relationship as "this framing operation takes up that prior framing operation as part of its substrate." The closest existing analog is *git commit history*: each commit has a parent, and the parent is the substrate the new commit is responding to. A frame-slot tool with `responds-to` is essentially git for stances. Which, when you say it that way, is striking — version control for framings is a real and underexplored primitive, and it's structurally what your four-element schema actually requires.

## User:

> 6/1/2026 7:16:02

From the POV of conceptual blending, My Wednesday action takes the claim as an input space & My interpretation of interviews as an input space, produces an output space composed of claim + new stance, then Sam’s Friday action takes the Wednesday output space as an input space & Sam’s intepretation of interviews as an input space, produces an output space composed of Wednesday output space + new stance.

In the scenario compounding/sedimentation is tightly defined to be two slots (claim + responds-to). Given the POV of conceptual blending, this appears too narrow. How does the other traditions, practices see this compounding/sedimentation and how does that change the specification

## Assistant:

> 6/1/2026 7:17:07

You've spotted a real narrowness, and the conceptual blending lens is exactly the right one for naming it. Let me work through what blending makes visible, then survey what the other traditions add, then put a sharper specification on the table.

**What blending reveals.**

In Fauconnier and Turner's architecture, when Wednesday-you takes the claim plus the interview interpretation as two input spaces and produces a blended output, several things happen that the simple "claim + responds-to" slot doesn't capture.

First, the blend has *emergent structure* — something in the output that wasn't in either input. "Partially validated at this price point, anchored by meal-kit pricing" is not in the claim ("$5/month") and not in the raw interview transcripts ("7 of 10 said yes"). It's produced by the blending itself. The blend has its own content.

Second, the blend involves *selective projection from each input* — not everything in the claim or in the interviews makes it into the blend. Wednesday-you brought forward the price point and the willingness-to-pay aspect, dropped other parts of the claim (the nutrition coaching aspect mostly), brought forward the yes-count from the interviews, and dropped a lot else (what specific home chefs said, demographic information, length of interview).

Third, the blend is constrained by a *generic space* — the abstract structure shared by both inputs (in this case something like "people making purchase decisions about meal-related services"). The generic space governs what *can* be blended.

Fourth, when Sam takes Wednesday's blend as input on Friday, she's not just "responding to" it. She's taking it as one input, taking her own interpretation of the same interviews as a second input, and producing a *new blend* with its own selective projections and emergent structure. The relationship isn't a pointer ("Sam responds to Wednesday"); it's a structured composition with several distinct elements.

The narrowness you've identified is that "claim + responds-to" represents the *graph* of which framings reference which, but doesn't represent the *internal mechanics* of how the new framing is built from prior material.

**What other traditions add.**

The narrowness becomes clearer when you survey what each tradition models that a simple `responds-to` slot misses.

**Conceptual blending (Fauconnier and Turner)** adds at minimum: multiple input spaces (often more than two), a generic space that licenses the blend, *selective projection* (which elements from each input come into the blend and which don't), *composition* (how projected elements combine), *completion* (background knowledge that gets pulled in to make the blend coherent), and *elaboration* ("running the blend" to see what it implies). A faithful representation would need slots for all of these, not just for "what I'm responding to."

**Bakhtin and dialogism** add a different dimension: *every utterance is shaped by anticipated responses and by the chorus of prior voices*. Wednesday-you isn't just responding to Monday-you's stance — Wednesday-you is also responding to imagined future investors, to the cofounder Sam who hasn't spoken yet but whose view you're anticipating, to industry analysts whose framings you've absorbed. The substrate of a framing includes *imagined and anticipated voices*, not just explicitly-referenced prior framings. Bakhtin's *heteroglossia* says any single utterance carries traces of many voices, and the architecture should at least allow this to be representable.

**Hermeneutics (Gadamer)** adds the *fusion of horizons*. When Wednesday-you takes up Monday-you's stance, you're not just receiving Monday-you's framing as a packet. You're fusing your current horizon (everything you know now, including the interview results) with the horizon Monday-you was operating from (which is no longer accessible directly). The fusion produces understanding that neither horizon contained on its own. Gadamer would also flag *prejudices* (in his neutral sense, *Vorurteile* — pre-judgments) as constitutive of the framing: every observer brings interpretive habits that get folded in invisibly. A faithful architecture would acknowledge that the framer's broader horizon (prior beliefs, methodological commitments, current concerns) is part of what's compounding, not just the explicitly-cited prior stances.

**Yogācāra Buddhism** adds *vāsanā* — the karmic perfuming of consciousness by past acts. Every framing deposits *bīja* (seeds) in the *ālayavijñāna* (store-consciousness), which then ripen and color future framings without ever being explicitly cited. The implication for the schema: a lot of what's sedimented into Wednesday's framing is *not consciously accessible to Wednesday* and not citable as `responds-to`. The architecture would need a category for *implicit sedimentation* — influences shaping the framing that the framer cannot point at because they've been absorbed below the level of articulation. Yogācāra is also strict about there being *no clean separation* between input space, framing operation, and output space — all three are aspects of a single perfumed cognitive event.

**Predictive processing (Friston, Clark)** adds the *prior* as a separate element. The framer comes to the substrate with a *generative model* already in place — a structured prior that determines what counts as a perturbation, what counts as expected, what registers as surprise. Wednesday's framing isn't just "claim + interview interpretation"; it's "claim + interview interpretation, processed through a prior that includes expectations about pricing psychology, about home chef demographics, about what 7-of-10 means as a sample." The prior is a third input space, not derived from either the claim or the interviews, that nonetheless shapes the blend.

**Niklas Luhmann's social systems** add *systemic memory* — the social system (the team, the company, the industry) has its own accumulated framings that any individual framing is operating within. Wednesday-you isn't just responding to Monday-you; you're operating within the team's accumulated framings about how to evaluate customer evidence, within the startup ecosystem's framings about validation, within VC-speak's framings about what "partially validated" means. These are sedimented in the medium of communication itself, not in any individual's stance objects.

**DSRP (Cabrera)** adds, as you'd expect, that every blending operation has its own DSRP structure: the act of blending makes distinctions about what goes in and what doesn't, treats inputs as systems, identifies relationships between elements, and is done from a perspective. The blending itself isn't atomic — it has internal structure that DSRP would unpack.

**Hermeneutic phenomenology and Heidegger** add *thrownness*. The framer is already in the middle of a situation with concerns, projects, moods, and equipment — the framing happens against that whole standing context, which is always present and never fully articulable. Heidegger would say `responds-to` captures only the explicitly cited prior; the *thrown* substrate is much larger and largely tacit.

**The pattern across all of them.**

Every tradition is making the same kind of refinement: the substrate of a new framing is *richer* than the simple list of prior framings being cited. The traditions disagree on which additional elements matter most, but they agree that "claim + responds-to" undercounts. Some elements are *explicitly referenced* (the Monday stance), some are *implicit and selectively projected* (which parts of the interviews come into the blend), some are *background prior or horizon* (the framer's standing beliefs and habits), some are *tacit and unarticulable* (Yogācāra's perfuming, Heidegger's thrownness, the systemic memory of the medium), and some are *anticipatory* (Bakhtin's imagined audience).

**A sharpened specification.**

If you wanted the architecture to be faithful to the conceptual blending view *and* informed by the other traditions, the stance object would need more than seven slots. Here's a richer specification, organized by which family of considerations each slot addresses.

For the framing operation's *internal mechanics* (the blending architecture):

- *inputs* — the multiple input spaces this framing draws on (not just one claim and one `responds-to` pointer, but a list of objects/spaces being blended)
- *projected from each input* — which elements from each input are actually carried into the blend (the selective projection)
- *generic space* — the abstract structure that licenses combining these inputs (often implicit, but should be nameable when relevant)
- *emergent content* — what's in the blend that wasn't in any input

For the framing's *epistemic stance* (your earlier specification):

- holder, stance, basis, time, conditions for change

For the framing's *broader context* (what the other traditions surface):

- *prior / horizon* — the framer's standing beliefs and habits that shaped this framing (Gadamer, predictive processing)
- *anticipated audience* — who or what this framing is implicitly addressing (Bakhtin)
- *systemic context* — the social, organizational, or disciplinary frame within which this framing is intelligible (Luhmann)
- *acknowledged tacit ground* — an explicit acknowledgment that some sedimentation is operating below articulation (Yogācāra, Heidegger) — this would be a slot whose value is a note like "I cannot fully account for what's shaping this framing" rather than a list of pointers

Not all of these are operationally necessary for every framing. Most framings most of the time would leave most slots empty. The point is that the *architecture* allows them to be filled when they matter, rather than forcing everything into "claim + responds-to."

**The trade-off and where it lands.**

There's a real tension here. Make the slots too rich and the authoring cost becomes prohibitive (Cyc problem). Make the slots too thin and you lose the layering you've been working to preserve. The right answer is probably a layered architecture: a small core that's always present (claim, holder, stance, time, inputs/responds-to-as-list-not-single-pointer), and an optional rich layer that gets filled when the framing is consequential enough to warrant it. AI does most of the inference of slot values from natural-language input. The user authors a paragraph; the system identifies inputs, basis, anticipated audience, etc., and presents them as structured suggestions the user can accept, edit, or ignore.

The deeper refinement to your earlier critique is this: `responds-to` was already a structural improvement over flat tags, but it still treats compounding as a graph of pointers between stance objects. Conceptual blending and the other traditions surface that compounding is *internal* to the framing — the new projection isn't just *referencing* prior framings, it's *built out of selected elements from them, combined under a generic structure, with emergent content, against a broader horizon and audience*. A faithful architecture would represent at least the inputs-as-multiple, the selective projection, and the broader context — not just the pointer.

The minimum upgrade to make the architecture genuinely recursive in the conceptual-blending sense is to change `responds-to` from a single-or-multiple pointer to *a list of input spaces with selective-projection annotations*. That single change moves the architecture from "graph of framings" to "compositional history of framings," which is the structural difference between citation and blending.

## User:

> 6/1/2026 7:27:11

- I assume that it’s possible to view the new projection in the same way as the N-1 projection
- I assume that the cognitive heavy lifting is done outside of the tool
- I assume that the AI might be used to augment framing in the process of forming new projection
- I assume that the architecture is present, but not always visible

## Assistant:

> 6/1/2026 7:28:13

Those four assumptions hold together cleanly, and each one carries a real consequence worth unpacking. They also collectively answer the trade-off I left dangling at the end of the last turn — the cost-quality tension between rich slots and authoring overhead — by relocating the cognitive work and letting the architecture mostly recede from view. Let me work through each assumption, what it commits you to, and what it means for the design.

**Assumption 1: a new projection is viewable the same way as the N-1 projection.**

This is the deepest of the four because it commits the architecture to *self-similarity across levels*. Every projection is the same kind of thing as every other projection, regardless of how many cycles deep it sits. Viewing the Friday composite uses the same affordances as viewing the original Monday claim. Inspecting Sam's stance uses the same affordances as inspecting yours. There is no privileged level.

This is the standard fractal move in well-designed recursive systems. Unix treats everything as a file. Lisp treats code as data and data as code. Git treats every commit identically regardless of its position in history. The payoff is enormous: the user learns one set of operations and they work at every scale. The architectural cost is forcing a discipline where the *unit* (a projection-with-its-framing-history) is genuinely uniform, which means resisting the temptation to add special cases for "original claims" versus "derived stances" versus "synthesized views."

The consequence for your design: there is one object type, the projection-with-attached-framing-history, and it can be viewed, forked, framed, or referenced uniformly. Sam's Friday output is, structurally, the same kind of thing as your Monday claim. You can drill into either, attach a new framing to either, share either. The user doesn't have to remember which level they're at, because operations are identical.

This also means the four-element schema (substrate, framing, projection, sedimenting) is *internal* to every projection-object. Every projection contains its own framing history. When you view Wednesday's output, you can see Wednesday's framing applied to (claim + Monday's stance) without leaving the object. The schema isn't external scaffolding; it's the internal structure of each unit.

**Assumption 2: cognitive heavy lifting is done outside the tool.**

This is the most important assumption for product feasibility, and it inverts the dominant PKM design philosophy. Tana, Roam, Obsidian, and Notion all implicitly assume the tool is *where* the thinking happens — they're called "tools for thought" for this reason. Your assumption is closer to how spreadsheets, version control, and design files actually work: the thinking happens in your head, in conversation, in walks, in interview rooms; the tool is where the *result* gets recorded and structured.

The consequence is that the tool optimizes for *capture-and-structure*, not for *generation*. The user arrives at the tool with a stance already formed ("after these interviews I now think this is partially validated") and the tool's job is to record it faithfully with all its layered relationships intact. The user is not asked to invent slot values from scratch; they're asked to confirm or adjust slot values the tool has inferred from their natural-language description.

This dissolves the Cyc problem. The reason structured-knowledge tools have historically failed at adoption is that they forced users to do the structural authoring themselves, which is cognitively expensive and breaks the flow of thinking. If the thinking happens elsewhere and the tool captures the result, the authoring cost is much smaller — you're translating an already-formed thought, not generating one. The structural overhead becomes incidental rather than primary.

It also means the tool's value proposition is *not* "this will help you think better in the moment." The value proposition is "this will preserve the layering of your thinking over time so that you and your collaborators can reason about your reasoning later." Those are very different products. The second one has historically been hard to sell, but AI may be making it easier — see the fourth assumption.

**Assumption 3: AI augments framing during projection-formation.**

This is what makes the rich slot specification feasible without breaking assumption 2. The user writes or speaks naturally: "I did five interviews this week and I'm now more confident on the price point, but Sam thinks the sample was biased." The AI infers the slot structure: new stance object, holder=you, claim=$5/month price point, stance=more-confident, basis=five-interviews, responds-to=Monday's stance, anticipated-disagreement-from=Sam. The user sees the inferred structure as a draft, edits whatever's wrong, and confirms.

The crucial design choice is *what level of inference the AI does*. Too aggressive and the user feels the tool is putting words in their mouth; too passive and the authoring cost returns. The middle path is the AI infers the *structural slots* but leaves the *content judgments* to the user. Inferring that there's a new stance is structural. Deciding whether the stance is "more confident" or "partially validated" or "still cautious" is a content judgment that has to stay with the user. The AI proposes a draft of the slot-fillers and the user retains editorial control.

There's a subtler thing AI enables: *retrospective structuring*. The user can write loose paragraphs, transcripts of meetings, or voice memos, and the AI can extract the implicit framings later. The cognitive work happens in the natural medium; the structural capture happens asynchronously. This is the key feasibility point. The user never has to context-switch from thinking-mode to authoring-mode, because the AI handles the translation between them.

It also means the AI is naturally suited to handle the broader specifications from the previous turn — the inputs from multiple spaces, the selective projection, the anticipated audience, the broader horizon. These are *exactly* the kind of inferences AI is good at: reading a paragraph and identifying who's being addressed, what's being implicitly assumed, what prior context is being taken up. The slots that seemed impractical to author manually become easy when the AI does the first pass.

**Assumption 4: architecture is present but not always visible.**

This is the design discipline that makes the other three livable. The structural richness is *there* in the data model, but it's not pushed into the user's face. Most of the time, the user sees something that looks like notes, threads, or documents. The framing structure is queryable when needed, surfaced when relevant, and inspectable on demand, but it doesn't drive the primary visual layer.

The dominant interface metaphor probably isn't a graph view or a card canvas. It's something closer to a document or thread that *progressively reveals structure on hover or tap*. The user reads Wednesday's stance as a paragraph. If they want to see what it's responding to, they pull on a thread or tap an indicator and the structure unfolds. If Sam wants to see whose framings have shaped the current state, she opens an inspector. The architecture sits behind the surface, available but not dominant.

This is how good software in adjacent categories handles structural complexity. Git has an enormous structural model underneath, but most of the time most users see file diffs and commit messages. Figma has a deep tree structure, but most of the time you see frames and components. The architecture is present, deeply consequential, and mostly invisible. The user surfaces it when they need it.

The consequence for your design: the primary view should not be the data model. It should be the natural representation of what the user is actually thinking about — a thread of reasoning, a board of claims, a meeting log. The framing structure decorates and undergirds that primary view rather than replacing it.

**What changes when all four assumptions hold together.**

These four assumptions in combination produce a different product than what would result from any one of them alone. The product is something like: *a place where the layered history of how a group has been framing things gets recorded incidentally as a byproduct of natural communication, made structurally rich by AI in the background, and surfaceable on demand when anyone needs to see what's underneath*.

That's not Tana. That's not Notion. That's not Plectica. It's also not Slack or Loom. It sits in a different position in the matrices from the earlier conversation: upper-right of Matrix 1 (first-class lens, collective use), upper-left of Matrix 4 (deep theory, but newly mainstreamable because AI dissolved the authoring cost), upper-right of Matrix 3 (the lens can be emergent and living because AI infers it continuously from natural language).

The product's center of gravity is also clearer. It's not about helping people think; it's about preserving the structure of how groups have *been* thinking, so that later thinking can build on it rather than recapitulating it. This is the gap your original question was reaching toward. The reason no tool sits in the empty cell of Matrix 1 isn't that the need was unclear — it's that the architecture required to fill it was historically too expensive to author. AI changes that, and your four assumptions describe exactly how.

**One last sharpening worth offering.**

The four assumptions also tell you what the *demo* looks like. If you were showing this to someone for the first time, the demo would be: "Have a normal conversation about a decision you're working on. Speak naturally. Don't think about structure." Then, two minutes in, you'd open an inspector and show them the structured history of framings that has been quietly accumulating — who said what, in response to whom, with what basis, taking up which prior stances. The reveal is the moment they realize that everything they'd just said in natural language has been losslessly captured as a structured record, available to be inspected, forked, and built on.

That demo only works because of all four assumptions. The structural richness comes from the data model (architecture present). The user effort is zero because the AI did the inference (cognitive heavy lifting outside). The natural language was the input because the thinking happened where thinking actually happens (outside the tool). And the recursive recording works because every utterance is, structurally, the same kind of projection-object as every other, capable of being viewed and framed identically (self-similarity across levels).

That's the product. The four assumptions don't just simplify the trade-offs from the previous turn — they constitute the product's identity.

## User:

> 6/1/2026 8:52:51

Related assumption: 
- structure will emerge as part of the framing - the user(s) may begin with unstructured thoughts and the tool will help structure emerge during framing.
- user may indicate frame(s) they are using/need to use and the tool will help structure emerge towards those frames, e.g. Sam and I are both using a frame that helps with building a product & business, e.g. lean canvas or business model canvas + value proposition canvas, along with a frame about assumptions/scoring of assumptions/tests/learnings 
- user may need help finding a frame or frames to use, e.g. if Sam and i were to try to find a useful frame
- user will be able to utilize a new, different frame - e.g. if we started with a frame based on lean startup and then added in a frame that is based on Rita McGraths work - we want to look at the same projections/substrates with different frames

## Assistant:

> 6/1/2026 8:54:09

These four extensions are coherent with the previous four, and together they describe a product that's substantially more ambitious than the one I was sketching. Let me work through each carefully, because each one is doing something different to the architecture, and the cumulative effect is significant.

**Extension 1: structure emerges during framing from unstructured input.**

This is the natural complement to your earlier assumption that cognitive heavy lifting happens outside the tool. You're saying the user doesn't even need to arrive *with* structure — they can arrive with a mess, and the structuring happens *as* the framing operation is performed. The AI is doing the work of converting unstructured material into structured framings *in the act of framing itself*, not just retrospectively translating already-formed thoughts.

The architectural consequence is that the AI needs to be doing two distinct things, not one. The first is *inference* (reading a paragraph and extracting slot values), which I covered in the previous turn. The second is *structuration* (taking unstructured material and proposing a structure that wasn't latent in the input, exactly — it had to be partially constructed). These are different operations. Inference is reading what's there. Structuration is *proposing* a way to organize what's there into something the user can recognize and edit.

This also implies a different kind of interaction. The user dumps a stream of thoughts or transcripts. The AI responds with a draft *organization*, not just a translation. The user sees the proposed structure as something like a sketch they can rearrange. The AI is collaborating on the act of framing rather than just recording it.

A useful way to think about this: the AI is doing what a good facilitator does in a workshop. A facilitator listens to a group's messy conversation and proposes back "here's what I'm hearing as the three threads," and the group either accepts the structuring or adjusts it. Your tool is doing facilitator-work continuously and silently as a background operation on whatever the user produces.

**Extension 2: users can declare which frames they're using, and the tool helps structure emerge toward those frames.**

This is more architecturally substantive than it might first appear. You're treating frames not just as ad-hoc cuts that emerge per-stance, but as *named, persistent, possibly external schemas* that govern how structuration happens. When Sam and you declare "we're working in the Lean Canvas frame plus the Assumption-Test-Learning frame," you're committing to a specific set of slot structures that the tool will use to organize incoming material.

This means frames themselves are first-class objects with their own slot specifications. A Lean Canvas frame defines what slots exist (problem, customer segment, value proposition, etc.) and what their relationships are. An Assumption-Test-Learning frame defines stance, test design, evidence, learning, and how they connect. Declaring you're using a frame is selecting a schema that the AI will use to interpret and structure whatever you produce.

This is essentially what *ontologies* are in the linked-data world, what *types* are in programming language theory, and what *templates* are in the facilitator world. The new and interesting move is that frames are *applied* to ongoing natural-language activity, with the AI doing continuous coercion of free text into frame-shaped structure. The frame is a commitment to a schema; the AI handles the schema-filling.

The architectural implication is that you need a *frame library* — a collection of named, shareable, possibly forkable schemas — that's a peer to the projection history. Common frames (Lean Canvas, OKRs, RICE prioritization, Wardley Map, polarity map, ICE scoring, working-backwards memo, etc.) become objects that teams can adopt, modify, or author from scratch. This is essentially the "lens-as-first-class-artifact" answer from much earlier in our conversation, now operationalized: a frame is a shareable schema that an AI uses to structure ongoing work.

This also creates a clean answer to a question I haven't been able to resolve: what makes a frame an artifact versus an ad-hoc cut? An artifact-frame is one with a *declared schema* (slot structure plus relationship rules) that can be applied to multiple substrates and produces structurally consistent projections. An ad-hoc cut is just a stance with content. The difference is whether the cut is one-off or reusable. Both should be representable, but they're different kinds of things.

**Extension 3: users can ask for help finding a frame.**

This is the most interesting of the four because it requires the tool to know something about the *fit* between a substrate and possible frames. The user says: "Sam and I have been thinking about this opportunity and we're feeling stuck — we don't have a way of structuring our thinking. Can you suggest a frame?" The tool needs to understand what they're working on well enough to recommend that Lean Canvas, Jobs-to-be-Done, the Wardley Map, the Polarity Map, or some combination would help.

This is a *recommendation system over frames*, conditioned on the substrate. It requires the tool to have a meaningful representation of what kinds of substrates a given frame is useful for. Some of this can be metadata on the frame ("Lean Canvas is useful for early-stage business opportunities"), some can be learned from how the frame has been applied historically across the user base, some can be inferred at suggestion-time by the AI reading the substrate and matching its character to known frames.

The architectural implication is that the frame library needs a *characterization* of each frame's fit conditions, and the AI needs the ability to read a substrate and propose frames against it. This is more than just a catalogue. It's a recommendation engine over methodological choices, which is a serious capability and probably the longest-pole technical work in the system.

It also opens a different and potentially more valuable interaction: the tool could *notice* when a current framing structure is straining and proactively suggest "you've been adding stances about pricing without a consistent frame; would Van Westendorp's Price Sensitivity Meter help here?" This shifts the tool from passive structurer to active methodological collaborator. That's a much richer product, and a much more sensitive one — users might find it presumptuous if it crosses the line from helpful to bossy.

The design discipline here is probably *suggest but never impose*: the tool can offer frames, but the user always chooses. And the tool should be able to explain *why* it's suggesting a particular frame, in terms of what's been happening in the substrate, so the user can evaluate the suggestion rather than just accept or reject it.

**Extension 4: users can apply a new frame to existing projections.**

This is the most powerful of the four, and it's the one that delivers on the original promise of your whole inquiry. You've been working in Lean Startup vocabulary; you add a Discovery-Driven Planning frame (Rita McGrath) over the same substrate; you can now see the same projections through both frames simultaneously. The tool doesn't make you choose; it lets you maintain multiple framings of the same material in parallel.

This is the move that ArchiMate viewpoints, Kumu perspectives, and Plectica perspectives all gesture at but none fully delivers. It requires that frames be *applicable to* arbitrary substrates rather than tied to the material that originally produced them. A Discovery-Driven Planning frame applied to existing Lean Startup work should *find* the elements in the existing work that fit DDP's slots (the assumptions, the milestones, the disconfirming events), and propose a structuring of the same material under the new schema.

This is technically non-trivial. The same claim "$5/month nutrition coaching" might be a *Value Proposition* in Lean Canvas, a *checkpoint assumption* in Discovery-Driven Planning, a *user-stated price point* in JTBD, and a *probe* in a Cynefin sense-making frame. The tool needs to handle the polysemy gracefully — the same projection appears differently slotted in different frames, and switching frames is a re-projection of the same substrate through a different schema.

The architectural consequence is that frames and projections live in a *many-to-many* relationship. A projection can be slotted into multiple frames simultaneously. A frame can be applied to multiple projections. Switching the active frame doesn't change the projections — it changes the *view* of how they're structured. This is exactly the move semantic layers make in the data world (the same metric can be exposed under multiple business models), and it's the move ArchiMate makes architecturally (the same model element appears in multiple viewpoints).

The user experience implication is that *frame application becomes a primary verb*. You're not just adding stances — you're adding frames over substrate. The interface needs to support this naturally: "view this material through the DDP lens," "compare what this material looks like in Lean Canvas versus Wardley Mapping," "what does Sam's framing look like if I apply the polarity-management frame to it." Each of these is a separate operation that produces a different structured projection over the same substrate.

**What these four extensions do together.**

The cumulative effect is significant. The first eight assumptions described a tool that captures and structures one team's thinking, with rich layering and AI-assisted authoring. These four additional assumptions turn it into something different: a tool that *operates over a library of methodological frames*, applies them flexibly to ongoing work, helps users choose between them, and lets the same material be seen through multiple frames simultaneously.

The product is now closer to: *a methodology workbench where teams pick which frames to operate under, the tool structures their natural-language activity into those frames in real time, frames can be swapped or layered without losing the underlying work, and the entire history of how the work has been framed is preserved as inspectable structure*.

This is a much bigger product than what was implied by the first eight assumptions, but it's also more defensible. The earlier version was "richer note-taking with AI." This version is "the missing infrastructure layer for methodology-driven thinking." The first has obvious competitors in every direction. The second has almost none, because no existing tool treats methodologies as a first-class library that's applicable to arbitrary substrate.

**What the architecture actually needs, in summary form.**

To make these four extensions work, the architecture grows in three specific ways beyond what was already there.

First, there's a *frame library* as a peer to the projection history. Frames are named, versioned, shareable objects with declared slot structures, relationship rules, fit characterizations, and authorship. Common frames ship with the tool; teams can author or fork their own.

Second, there's a *frame-application relationship* between frames and projections. The same projection can be slotted into multiple frames. A frame can be applied to a body of existing projections retroactively. Applying a frame produces a *view*, not a transformation — the underlying projections are untouched.

Third, there's a *recommendation and structuration layer* that connects substrate to frames via the AI. It does three jobs: structuring unstructured input under a declared frame, suggesting frames when users are stuck, and applying new frames to existing material.

These three additions don't break any of the earlier assumptions — they extend them. Self-similarity across levels still holds (frames apply uniformly at any level of projection). Cognitive heavy lifting still happens outside the tool (the user brings the messy thinking; the tool structures it). AI still augments framing (now including frame-selection and frame-application). Architecture is still present but not always visible (most users see threads and views; the frame-application layer surfaces only when needed).

**One honest tension to flag.**

The richer the frame library and the more active the frame-suggestion layer, the more the tool starts to have *opinions* about how its users should think. This is a serious product question. The methodology-workbench framing implies that the tool knows useful things about how to structure thinking, and is willing to nudge users toward better frames when their current ones aren't serving them. That's valuable when the suggestions are good and welcomed; it's invasive when they aren't.

The design discipline that resolves this is *frames are commitments by users, not impositions by the tool*. The library is rich, the AI is helpful, but the user always declares which frames apply, can ignore suggestions without friction, and can author or modify frames freely. The tool is a workbench, not a teacher. It should make methodological thinking easier, not replace the user's judgment about which methodologies to use.

This positions the product squarely in the gap your original conversation was pointing at: a horizontal, social, lens-first tool, where the lens itself is the artifact, AI dissolves the historical authoring cost, and the same underlying material can be seen through multiple frames by multiple observers without collisions. That's the empty cell in the Matrix 1 from the visual artifact. These twelve assumptions, taken together, describe what fills it.

## User:

> 6/1/2026 9:10:27

One interesting consequence: a situation where given any particular projection (or set of projections) what frames might be useful that are not in use?

## Assistant:

> 6/1/2026 9:11:44

Yes, and this is the most interesting consequence you've surfaced so far. It inverts the usual relationship between user and tool, and it has implications that ripple back through the whole architecture. Let me work through what it actually is, why it's powerful, where the precedents are, and what it costs.

**What you've just described.**

Most tools answer the question "given a frame, how should I structure this material?" Your inversion answers "given this material, which frames am I not using that I should be?" That's a fundamentally different capability, and it has a specific name in adjacent fields: it's the capability to surface *unconsidered alternatives*. In decision theory it's the *consideration set* problem — the most important determinant of decision quality is usually not how you choose among options but which options you bring into consideration in the first place.

The standard human failure mode is exactly the failure your inversion addresses. People get locked into the frame they already have, see all their material through it, and never notice that a different frame would reveal something the current frame is hiding. Kuhn called this the structure of paradigms. Bohm called it the rigidity of thought. Predictive processing calls it precision-weighting collapse. Buddhist Yogācāra calls it *vāsanā* — the perfuming of consciousness by past habits. Every tradition we've discussed has noticed this failure mode and has nothing automatic to offer against it.

A tool that proactively surfaces *frames you are not using* is therefore doing something genuinely valuable that humans cannot easily do for themselves, because the limitation is precisely that you cannot see what your frame is hiding from you. The capability is *meta-methodological literacy delivered at point of use*. That's a real product.

**Why it's powerful.**

This single feature does several things at once that no individual product currently does.

It addresses the *blind spot of frames themselves*. Every frame has things it makes visible and things it makes invisible. Lean Canvas makes business model visible but flattens timing and capability evolution. Wardley Map makes evolution visible but de-emphasizes user emotion. JTBD makes user motivation visible but underweights infrastructure. The user inside any one frame cannot see what the frame is missing. The tool, looking at the substrate from a position outside any single frame, can.

It *democratizes methodological breadth*. Most practitioners know three or four frames well and have heard of maybe ten others. Senior consultants with thirty years of practice know a few hundred. The tool, with access to a large library, can surface frames the user has never heard of — appropriately, when relevant, without the user having to know they exist. This is the same move Stack Overflow makes for programming knowledge: you don't have to remember the right approach, you have to be able to recognize it when shown.

It creates a *learning surface*. Every time the tool suggests an unused frame, the user has an opportunity to learn a new frame in the most useful context — applied to material they already care about. This is how methodology gets learned in practice, and the tool turns the suggestion into a teaching moment without being pedagogical.

It produces *epistemic humility as a side effect*. Knowing that there are always frames you're not using, and being shown which ones might apply, conditions the user to hold their current frames more lightly. This is exactly the disposition that the contemplative traditions you've been reading are trying to cultivate. The tool isn't preaching; it's structurally producing the disposition through use.

**Where the precedents are, partial as they are.**

A few existing tools approximate this in narrow ways and are worth knowing about as design references.

*De Bono's Six Thinking Hats* is the analog version: when you notice you've been using only the black hat (caution), the framework prompts you to put on the yellow hat (value) or the green hat (creativity). The "hats you're not using" prompt is built into the methodology. It's a single-method analog of what your feature would be in software at scale.

*Liberating Structures*' "Critical Uncertainties" and "Ecocycle Planning" practices are designed specifically to surface considerations a group is currently missing. They're facilitator interventions, not software features, but the underlying move is the same.

*Stack Overflow's "linked questions" and "related questions"* surface adjacent problems users didn't know they had. Not the same as frames, but the same mechanic of "things you didn't know to ask about, but might want."

*GitHub Copilot's suggestions* are the closest computational precedent — surfacing relevant code patterns the user wasn't actively considering, based on context. The user can accept, modify, or ignore. The relationship between programmer and Copilot is roughly what the relationship between user and your tool would be on this feature.

*Pol.is* surfaces opinion clusters the user might not have known existed in the group. This is closer to your feature than the others — it's making visible a frame on the data that no individual user produced.

What none of these do is *recommend methodological frames against current work in real time*. That's the specific gap. It exists because the prerequisite — a structured library of frames with fit characterizations, plus AI that can read substrate and match — only recently became feasible.

**How it would actually work.**

The mechanism breaks into three parts.

First, the tool has *characterizations* of each frame in its library — not just slot structures, but metadata about what kinds of substrates the frame illuminates and what kinds of questions it answers. Lean Canvas illuminates business-model coherence; Wardley illuminates evolutionary positioning; CLA illuminates underlying worldview; Polarity Mapping illuminates persistent tensions misread as problems. Each frame has a "diagnostic signature" of what its presence implies about the situation.

Second, the tool *reads the substrate* — the user's current projections, framings, and accumulated work — and identifies what's present, what's emphasized, and what's noticeably absent. This is AI work: looking at a body of structured material and identifying its character. Are stances proliferating without disconfirming tests being attached? Are time horizons all near-term? Are different stakeholders' perspectives represented or only one? Is the work treating something as a problem that is actually a polarity?

Third, the tool *matches* the substrate's character against the frame library's diagnostic signatures and surfaces high-value mismatches — frames whose diagnostic value is high relative to substrate gaps, that aren't currently in use. "You've been working in Lean Canvas for two weeks; the substrate is heavy on what but light on how-it-evolves; Wardley Mapping might help here." "You and Sam keep cycling between 'we should focus' and 'we should explore'; this looks like a polarity, not a problem; consider the Polarity Map." "Your stances are all your own; you don't have any stakeholder framings in the substrate; consider the Stakeholder Salience model."

The match-quality is the key technical problem, and it's not trivial. Too eager and the suggestions become noise. Too cautious and they don't appear when they should. The honest answer is this will need iteration and probably some learning from which suggestions users accept versus dismiss. But the structure of the problem is tractable, especially with modern AI.

**The interaction design that makes it work.**

The feature lives or dies on its interaction design. Suggestions that feel like nagging will be turned off; suggestions that feel like discoveries will be returned to. A few design principles emerge from thinking about it carefully.

*Pull rather than push as the default.* The user can ask "what am I missing here?" and get a thoughtful answer. The tool *can* surface suggestions proactively, but the proactive surfacing should be rare and high-confidence. Pull keeps the feature welcome; push risks making it unwelcome.

*Explain why.* Every suggestion should come with a short reason rooted in the substrate. "Suggesting Polarity Map because the recent stances keep oscillating between focus and exploration without resolution." The reason is what makes the suggestion evaluable rather than an opaque recommendation.

*Offer to apply, not impose.* Suggestions come with a one-click "show me what this would look like" — the tool applies the frame to the existing substrate, shows the resulting projection, and lets the user decide whether the new view is illuminating. The cost of trying a frame is near-zero.

*Track what gets used.* The tool learns from accept/dismiss patterns, both per-user and across the user base. Over time, the suggestion engine gets better at matching frames to substrate character.

*Allow frames to be added to consideration without being applied.* "Mark for later" is a useful primitive. The user might not want to apply CLA right now but wants to remember the suggestion existed.

**What this changes about the rest of the architecture.**

This feature is the highest-value point of contact between user and the frame library, which means the frame library itself becomes the central asset of the product. Everything depends on its quality, breadth, and the depth of its diagnostic characterizations.

Three implications follow.

First, the frame library is *editorial work*, not just data. Each frame needs a careful characterization, not a Wikipedia stub. This is consultant-level intellectual labor and probably needs to be done by people who know each methodology deeply. The product's quality is bounded by the quality of this work. This is also why it's defensible — anyone can ship a tool that captures notes, but few can ship a library of two hundred well-characterized methodological frames with diagnostic signatures.

Second, the library should be *forkable and authorable*. Power users will want to author their own frames. Consultancies will want to maintain their proprietary frames. Communities will want to share frames. The architecture has to support frames as objects that can be created, shared, modified, versioned, and combined.

Third, the suggestion engine becomes a *strategic asset*. Its quality compounds with use, both because the AI gets better at matching and because the library grows in characterization through user feedback. Early users contribute disproportionately to the long-term capability. This is the same dynamic that made Stack Overflow defensible despite trivially copyable software.

**One deeper implication worth surfacing.**

This feature also makes the tool *honest* about its own limitations in a way most tools aren't. Every suggestion implicitly admits "your current frame is incomplete." The tool is telling the user, structurally and continuously, that there is always more to see than any single frame reveals. That's the disposition the contemplative traditions you've been reading are trying to cultivate — not as a one-off insight but as a habit. The tool produces the habit through use.

This is also a serious epistemological move. Most software treats its representation of the user's world as accurate enough for action. Your tool treats every representation as incomplete by design, and makes the incompleteness visible. That positions it differently in the landscape: it's not a productivity tool, it's a tool for *thinking about thinking*, with productivity as a side effect. Which is exactly the gap in the original 2x2.

**Where this lands.**

The feature you've described — surfacing frames not currently in use, against the current substrate — is probably the single most distinctive and valuable capability of the product as you've sketched it. It's the feature that turns the tool from "structured note-taking with multiple lenses" into "methodological literacy at point of use." It dissolves the blind spot of frames themselves, which is a problem every prior tradition has acknowledged and none has solved automatically.

It's also the feature that does the most work in the cumulative product vision. It's the answer to "what does the tool actually do for me that no facilitator, no consultant, no book, and no other tool does?" The answer is: it sees what your current frames are hiding from you, and shows you which other frames would help, against your actual material, in real time. That's the unique value proposition. Everything else is plumbing in service of that.

The feature also makes the product *fundamentally pedagogical* without being didactic. Every use is a small lesson in methodological breadth. Over time, sustained use makes the user more methodologically literate, more frame-flexible, more aware of the limits of any single perspective. Which is, in the end, the disposition the entire arc of this conversation has been pointing at — from Maturana's observer-dependence to Varela's enactivism to *The Blind Spot* to the Upaya retreat. The tool is the operational form of the insight that started this conversation, which was that the same underlying reality can be cut differently and that the cuts are productive rather than noise.

That's what makes this not just a clever feature but the right feature. It's the architectural expression of the philosophical commitment the whole inquiry has been working out.

## User:

> 6/1/2026 11:04:18

Some interesting analogs
- Metaphor theory from Erickson Hypnosis/Metaphor, NLP tradition - metaphors highlight some aspects & dim others
- Similar with metaphor from Lakoff POV
- NLP presupposition that separates meaning from behavior

## Assistant:

> 6/1/2026 11:05:28

These three analogs are tightly relevant, and pulling them in actually sharpens the architecture in ways the previous turns hadn't quite reached. Let me work through each, then say what the cumulative addition is.

**Ericksonian metaphor and the NLP tradition's metaphor work.**

Milton Erickson's therapeutic metaphors did something specific that's worth naming carefully. When Erickson told a client a story about a tomato plant or a dripping faucet, he wasn't decorating his therapy with allegory — he was performing a *structural transfer* of selection from one domain to another. The metaphor served as a frame that *highlighted* certain features of the client's situation (resilience, slow growth, persistence) while *dimming* others (current pain, immediate constraints, urgency). The client didn't experience this as analysis; they experienced it as a story. But the cognitive work happening was a deliberate re-cutting of their situation through a different substrate.

Bandler and Grinder, extracting what they took to be Erickson's structure into NLP, formalized this as the *metaphor's selective function* — every metaphor brings forward some features of the target domain and obscures others. The therapeutic move is choosing the metaphor whose selection profile produces useful re-framing. The story about a tomato plant works because it foregrounds patience without naming patience, and a client who could not have heard "be patient" can hear "the tomato plant grew slowly until the day it didn't."

What this adds to your tool architecture is the recognition that *frames are not neutral re-presentations of substrate*. Every frame has a selection profile — what it foregrounds and what it backgrounds. The Erickson tradition treats the selection profile as the *operative element* of the frame, not as an unfortunate side-effect. Choosing a frame is choosing what to make visible and what to make invisible. The skill of the practitioner is matching selection profiles to situations.

The architectural implication: each frame in your library needs not just slot structure and fit characterization, but an explicit *highlight-and-dim signature* — what does this frame make visible, and what does it push to the periphery? Lean Canvas highlights revenue model and customer segment; it dims power dynamics, capability evolution, and emotional texture. Wardley Map highlights evolutionary positioning; it dims user emotion and team dynamics. Polarity Map highlights persistent tensions; it dims one-off problems and root-cause analysis. The diagnostic value of a frame for a given substrate is partly about what gaps in the current view it would fill — but it's also about what *new* dimming it would introduce that you might not want.

This adds a real subtlety to the "suggest frames not currently in use" feature. The honest suggestion isn't "here's a frame that would help" — it's "here's a frame that would *make visible* X which is currently hidden, *at the cost of* dimming Y which is currently emphasized." Every frame switch involves trade-offs, and surfacing them is part of what makes the tool methodologically literate rather than methodologically promiscuous.

**Lakoff's conceptual metaphor.**

Lakoff and Johnson's *Metaphors We Live By* (1980) and Lakoff's later work make a stronger claim than the Ericksonian one: metaphors aren't decorative or therapeutic, they're *constitutive* of how abstract thought is possible at all. Argument-is-war structures how we conduct disagreements ("attack a position," "defend a claim," "demolish an argument"). Time-is-money structures how we relate to duration ("spend time," "waste time," "invest hours"). Mind-is-machine structures cognitive science itself. These aren't choices we make about how to express thought; they're the substrate of how we have thought.

The crucial point for your tool: Lakoff would say that *frames are metaphors all the way down*. The Lean Canvas is not a neutral diagram; it's the business-as-canvas metaphor (a thing you can survey, paint, revise). The Wardley Map is the business-as-territory metaphor (a thing you navigate, with paths, positions, frontiers). The Polarity Map is the dynamics-as-pendulum metaphor (a thing that swings between poles, requiring management). Each frame imports an entire metaphorical structure, with all of that structure's entailments — what counts as progress, what counts as success, what counts as failure.

Lakoff's contribution to your architecture is the recognition that frames don't just have selection profiles, they have *entailment structures*. Once you commit to a frame, you commit to a whole web of inferences the frame licenses. Working in Lean Canvas, "we don't have a customer segment" is a serious problem because the canvas demands one; in Wardley, the same situation looks like "we're at evolutionary stage X and the user emerges from the value chain." The same substrate produces different problems and different solutions depending on which frame's entailments are operating.

The architectural implication: each frame needs not just a slot structure and a highlight-and-dim signature, but a representation of its *core entailments* — what it commits the user to inferring or noticing, what it makes feel like progress, what it makes feel like failure. The suggestion engine becomes richer because it can compare entailment structures, not just slot structures. "This frame would let you ask questions you can't ask in your current one." "Switching to this frame would re-classify what you currently think of as failure as something else."

This also explains why frame *combinations* are powerful. Two frames with different entailment structures applied to the same substrate produce a richer view than either alone, because each frame's entailments illuminate what the other can't ask. The tool's value isn't just in helping you use one good frame — it's in letting you hold multiple frames with conflicting entailments simultaneously, which is cognitively difficult and which good tools make easier.

**NLP's presupposition that separates meaning from behavior.**

This one is doing different work from the metaphor analogs, and it's the most subtle of the three. The NLP frame separates the *behavior* (what someone observably does) from the *intention or meaning* (what the behavior is serving for them), and treats them as orthogonal. The presupposition is roughly: every behavior has a positive intention for the person doing it, even if the behavior is dysfunctional; the same intention can be served by many different behaviors; the same behavior can serve many different intentions in different people.

This is structurally identical to what your tool architecture needs to handle for substrate and frame. The *substrate* — a behavior, an observation, a claim, a piece of customer feedback — is one thing. The *meaning* the framing assigns it is a different thing. The substrate doesn't carry its meaning; the framing does. Two observers can frame the same substrate with very different meanings, and both can be valid in the sense that they correspond to real selection profiles and entailment structures, not in the sense that both are accurate to a reality-out-there.

This sharpens your earlier critique of `#assumption` tags. The tag was conflating substrate and meaning. The NLP presupposition makes the architectural move explicit: meaning is *attached* to substrate by an act of framing, and the same substrate can have many meanings attached by many framers. Separating them is not a quirk of the architecture; it's a faithful representation of how meaning actually relates to material.

Where NLP goes further than the metaphor traditions is in the operational move that follows. Once you separate behavior from meaning, you can ask: "what other meaning could this same substrate carry?" That's exactly the move your "suggest frames not currently in use" feature performs, but at a more granular level. For any given claim, what other meanings could be attached to it? For "$5/month nutrition coaching," current meaning under Lean Canvas is "pricing assumption to validate." Under JTBD it's "user-anchored price point." Under Wardley it's "evolutionary stage indicator." Under Polarity Map it might not be a price point at all but evidence of the freemium-vs-premium polarity. The substrate is stable; the meaning is plural; the tool's job is to make the plurality visible.

The architectural implication: each *claim* (substrate object) should be able to carry multiple *meaning attachments* (frame-applications) simultaneously without any of them being privileged. This is roughly what extension 4 in your previous turn was about, but the NLP framing makes it sharper: the meaning is *not in the substrate*. It's added by the framing, and the architecture should preserve the meaning-substrate separation rigorously.

**The cumulative addition.**

These three analogs, taken together, refine the architecture in three specific ways.

First, frames carry *selection profiles* — explicit signatures of what they highlight and dim. The frame library becomes richer because each entry includes not just slot structure but a characterization of what the frame makes visible and invisible. The suggestion engine uses this to surface frames that would fill current blind spots, and is honest about the new blind spots each suggested frame would introduce.

Second, frames carry *entailment structures* — webs of inference each frame licenses. The frame library tracks what each frame commits its users to noticing, what it treats as progress, what it treats as failure. The suggestion engine can compare entailments and surface frames whose inferences would unlock questions the current frame doesn't allow.

Third, the substrate-meaning separation becomes a *core architectural commitment* rather than an incidental design choice. Claims (substrate) and stances (meaning attached by framing) are different object types. The same claim can carry many stances. Switching frames doesn't change claims; it changes which stances are foregrounded. The user's view is always "claims, currently viewed through these frames, with these meanings attached" — and the frames are switchable without disturbing the substrate.

**The deeper through-line.**

What's interesting about these three analogs is that they're all attempting to make the *invisibility of frames* visible. Erickson made selection visible by deliberately choosing metaphors whose selection profiles served the client. Lakoff made entailment visible by showing that everyday language carries unrecognized metaphorical commitments. NLP made the substrate-meaning gap visible by training practitioners to separate observation from interpretation.

All three are doing what your tool would do at scale and automatically: surfacing what frames are doing under the surface so that users can choose them deliberately rather than be chosen by them. This is also the move Maturana, Varela, *The Blind Spot*, and Madhyamaka are making philosophically. The tool is operationalizing across many users what these traditions developed as cognitive practices. It's making frame-awareness a default capability rather than an advanced skill.

One last sharpening worth offering. The Ericksonian and NLP traditions both emphasize that *most framing happens below conscious awareness*. People don't choose their metaphors; their metaphors choose them. The tool's deepest value might be in making this visible without making it heavy. The user is operating in a frame; the tool shows them they are; the user can stay in it or switch. The shift from unconscious to conscious framing is exactly the shift the contemplative traditions are trying to produce through years of practice. The tool produces it through use, against the user's actual work, in real time.

That's the deep promise of what you've been building toward in this conversation. The four-element schema, the lens-as-first-class architecture, the AI-assisted slot inference, the frame library, the suggest-frames-not-in-use feature, and now the selection-and-entailment characterization — all of it amounts to *operationalizing frame-awareness as a default capability of a working group*. That's a substantial product, and it's positioned in a gap that nothing else fills.

## User:

> 6/1/2026 12:55:37

Now i want to look at a hypothetical architecture - that also represents a potential order of building
- architecture where the common, simple, content layer at the bottom and more advanced architectural components are layered on top
- order of operation where it’s building out the minimal needed to run a sample scenario (e.g.  order of building progresses through architectural layers/components - not building the complete layer/component but a minimal set and then repeat with the next layer/component, etc.

## Assistant:

> 6/1/2026 12:57:11

This is a good architectural instinct, and it maps cleanly onto how this kind of system actually wants to be built. Let me work through both questions together because they're tightly coupled: the layering tells you what's foundational, and the build order is a specific path through the layers that proves each one before moving up.

**The architectural layers, bottom to top.**

The layers below should be read as a dependency stack — each layer depends on the ones below it and is independent of the ones above. Higher layers are *richer* but also *more optional*. The product is usable at lower layers; it becomes more powerful as upper layers come online.

**Layer 0: persistence and identity.**
The undifferentiated substrate of the system: a way to store objects, identify them uniquely, and associate them with users and timestamps. Nothing distinctive about this layer — it's the database, the auth, the object model. Every system has it. The only architectural commitment worth naming is that *every object is immutable by default* — new versions are new objects, not mutations. This is what makes sedimentation possible at higher layers.

**Layer 1: claims as content objects.**
The first product-meaningful layer. A claim is a piece of natural-language content — a sentence, a paragraph, a quote, a snippet — owned by a user, timestamped, addressable. No structure beyond that. This is what users see and write at the surface. It looks like notes or threads. Claims can reference each other (link to, quote, derive from) but they don't yet carry stances or framings.

At this layer the tool is essentially a clean note-taking app with rigorous provenance. Users can write, share, and reference each other's claims. This is the layer that's competitive with the bottom row of Matrix 1 (Slack, Notion, basic Obsidian). The product is real but undifferentiated.

**Layer 2: stances as separate objects.**
The first distinctive layer. A stance is a separate object that references one or more claims and carries metadata: holder, stance-type, basis, time, conditions for change, responds-to (other stances), inputs (other objects being blended). Crucially, stances are append-only — adding a new stance never overwrites an old one.

This is the layer where the substrate-cut separation becomes architecturally real. The `#assumption` flattening is solved here. Multiple observers can attach stances to the same claim without collision. Sedimentation works because the history of stances on a claim is the inspectable history of how the claim has been framed over time.

At this layer the tool is competitive with Plectica, Kumu, and the structured note-takers, but with proper layering. It's still missing the frame library and the AI structuration.

**Layer 3: frames as named schemas.**
A frame is a named, versioned, shareable schema that defines a slot structure, relationship rules, fit characterization, highlight-and-dim signature, and entailment structure. Frames are first-class objects in the database, peer to claims and stances, but they exist *at a different level* — they describe what kinds of stances are well-formed in a given methodology.

Applying a frame to a body of claims produces a *view*, not a transformation. The underlying claims and stances are unchanged. The frame application is itself an object — a record that this user applied this frame to this scope at this time. Multiple frame applications can coexist over the same substrate.

This is the layer that makes the lens-as-first-class architecture real. It's also the heaviest editorial work: each frame needs careful authoring, including its signature and entailments. The frame library is a strategic asset that compounds over time.

**Layer 4: AI structuration and inference.**
The AI layer reads natural-language input and infers slot values: identifying that something is a stance, identifying its holder, identifying what it responds to, identifying its basis. It does this against whichever frame is currently active, so the inference is conditioned on the frame's slot structure.

This layer also handles retrospective structuring — applying frames to existing material, structuring loose paragraphs into stances, identifying implicit references. It's the layer that makes the architecture livable, because it dissolves the authoring cost that would otherwise make the structured-knowledge model untenable.

Crucially, this layer is *optional* in the sense that lower layers work without it. Users can author stances and apply frames manually. The AI just makes it dramatically cheaper.

**Layer 5: frame recommendation and gap detection.**
The most distinctive layer. The AI reads the current substrate and identifies what's present, what's emphasized, what's absent. It compares this against the frame library's diagnostic signatures and surfaces frames that would illuminate current blind spots. This is the "suggest frames not in use" feature you named as the most interesting capability.

This layer also handles the "user is stuck and needs a frame" interaction, the "this material would look different through X" comparison, and the proactive surfacing of methodological options when the current frame seems to be straining.

This is the layer that turns the tool from "rich note-taking with frames" into "methodological literacy at point of use." It depends on Layer 3 (the frame library has to exist and be well-characterized) and Layer 4 (the AI has to be reading the substrate competently).

**Layer 6: collaboration, social features, sharing.**
Multi-user dynamics: who can see what, who can fork what, who can author frames for whom. Forking a frame, subscribing to a frame channel (Are.na-style), publishing frame libraries, organizational permissions.

This layer is socially important but architecturally lighter than the others. It's mostly access control plus a few sharing primitives on top of the data model that already exists.

**Layer 7: emergent or computed lenses.**
The most ambitious layer, addressed in Matrix 3 of the visual: emergent rather than authored frames. The AI looks at how a corpus is being framed and surfaces patterns nobody explicitly authored. "Across all the stances Sam and you have taken, there's an implicit frame around urgency-versus-care that you haven't named." This is the Pol.is move applied to internal team thinking.

This layer is genuinely research-grade and probably shouldn't be in the initial product. But it's worth naming because it's where the architecture eventually goes.

**The build order: a vertical slice approach.**

The right build order isn't to fully complete each layer before moving to the next. It's to build *the minimum of each layer needed to run an end-to-end scenario*, and iterate. This is sometimes called a "tracer bullet" or vertical-slice approach. The advantage is that you have a working system at every checkpoint, you discover integration problems early, and you can demonstrate value to users (or yourself) continuously.

The scenario from earlier — your Monday claim, Wednesday's interview results, Sam's Friday disagreement — is a good calibration target. The build order below progressively makes that scenario fuller.

**Iteration 1: Layers 0–1 minimal. The note-taking baseline.**

Build just enough to let two users (you and Sam) create claims, see each other's claims, and link them. No stances, no frames, no AI. A claim is a string with an author and a timestamp. You can write "Home chefs will pay $5/month for nutrition coaching." Sam can write something else. You can link claims together.

This iteration tells you nothing distinctive yet, but it establishes the database, the identity model, the immutability discipline, and the basic UI. It's the platform that everything else sits on.

What you can do: write notes, share them, reference them. Tana-level functionality.

What you can't do: anything distinctive.

**Iteration 2: Layer 2 minimal. The stance object.**

Add one new object type: stance. A stance references a claim, carries a holder, a stance-value (free text initially), a time, and an optional `responds-to` pointer. You can manually attach stances to claims. Sam can attach her own stances. Stances are append-only.

At this point you can run the original scenario almost in full. Monday-you attaches an assumption-stance. Wednesday-you attaches a partially-validated-stance with responds-to pointing at the Monday stance. Friday-Sam attaches her disagreement-stance pointing at Wednesday's.

The visual representation can be primitive — a claim with stances listed below it chronologically. No frame structure, no AI. But the architectural commitment is real: substrate and cut are separate, multiple observers' framings coexist, sedimentation is inspectable.

What you can do: the full Monday-Wednesday-Friday scenario, with proper layering.

What you can't do: anything frame-aware. Stance-values are free text. No methodological structure yet.

**Iteration 3: Layer 3 minimal. One frame, hard-coded.**

Add the concept of a frame. Implement *one* frame in the library — probably the epistemic-stance frame (the meta-frame for assumption / hypothesis / validated / etc.), because it's the one your scenario directly uses. Frame is a typed schema: stance-value must be one of {assumption, hypothesis, partially-validated, validated, disproven}, with a basis slot, a conditions-for-change slot.

Stances now declare which frame they're in. The epistemic-stance frame structures the stance-value into something inspectable rather than free text.

You only need one frame to prove the layer works. You don't yet need Lean Canvas, Wardley, or the rest. Those come later, as content additions, not architectural ones.

What you can do: the scenario with structured epistemic stances.

What you can't do: switch between frames. Apply different frames to the same material. Anything multi-frame.

**Iteration 4: Layer 4 minimal. AI structuration on the existing frame.**

Add AI inference *just for the epistemic-stance frame*. The user types: "After interviews, I'm more confident on the price point but Sam thinks the sample was biased." The AI infers: this is a new stance, holder is the speaker, stance-value is "partially validated," basis is "interviews," responds-to is your Monday stance, anticipated-disagreement-from is Sam.

The AI is doing inference against *one* known frame. The user reviews and confirms.

This iteration proves the AI-assisted authoring model works. It dissolves the manual slot-filling burden, but only for one frame. Once it works for one frame, extending it to others is mostly a matter of describing additional frames in a way the AI can use.

What you can do: write naturally, get structured stances.

What you can't do: work with multiple frames. Get methodological suggestions.

**Iteration 5: Layer 3 expanded. A second frame.**

Add a second frame — something content-meaningful, probably Lean Canvas, because it operates at a different level (claims about a business, not stances about claims). Frames are now plural. Frame application becomes a real operation: declare a Lean Canvas instance, slot claims into its positions (problem, value proposition, etc.).

A single claim can now be referenced from multiple frames. "$5/month nutrition coaching" can be a value proposition in a Lean Canvas and the target of an epistemic-stance assumption simultaneously.

This iteration proves the polysemy works architecturally — claims aren't owned by frames, claims are referenced by frames, the substrate-meaning separation holds across multiple frames.

What you can do: work in two frames at once. See the same claim through different schemas.

What you can't do: get suggestions about which frame to use. Apply frames retroactively.

**Iteration 6: Layer 4 expanded. AI handles multiple frames.**

The AI learns to infer not just stance structure but *which frame the user is operating in*. The user writes naturally; the AI decides whether this is Lean Canvas content, epistemic stance content, or both. Slot-filling proceeds against the inferred frame.

This iteration proves the AI scales across frames. It also surfaces the user-experience question of how confident the AI should be before structuring, and how it presents alternatives. Probably the AI proposes a primary structuring and notes alternatives the user can switch to.

What you can do: write naturally and have structure emerge across multiple frames simultaneously.

What you can't do: get frames recommended to you.

**Iteration 7: Layer 5 minimal. Suggest-frames on pull.**

The user can ask "what am I missing here?" and the system surfaces frames not currently in use that might illuminate the substrate. This is pull-only initially — no proactive surfacing. The system reads the substrate, compares its character against the frame library's signatures, and ranks unused frames by likely fit.

Each suggestion comes with a brief reason rooted in the substrate. The user can ignore, mark for later, or apply.

This iteration delivers the most distinctive capability of the product. Even pull-only, it's the feature that turns the tool from "structured notes" into "methodological workbench."

What you can do: ask for frame suggestions and get useful ones.

What you can't do: get proactive surfacing. Use collaborative features beyond shared access. Author your own frames.

**Iteration 8: Layer 6 minimal. Multi-user with frame sharing.**

Sam and you can be in proper collaboration, with shared access to claims and frames, the ability to see each other's stances, and clean attribution throughout. Forking a frame, subscribing to frame channels, and basic permission models. This is mostly building on the data model that already exists — the architectural work was done in earlier iterations.

What you can do: real collaborative use.

What you can't do: emergent frame detection (Layer 7). Frame authorship by end users without significant tooling.

**Iterations 9+: depth across layers.**

After iteration 8, you have a complete vertical slice. Subsequent iterations are about *depth* in each layer rather than new layers: more frames in the library, better AI inference, proactive frame suggestions when confidence is high, frame authoring tools for power users, emergent-frame detection, deeper collaboration features, the recursive viewing of projections at any depth.

**A few build-order principles worth being explicit about.**

*The frame library should never be "complete" before shipping.* Three to five well-characterized frames at launch is fine if they're chosen carefully (probably epistemic-stance, Lean Canvas, Polarity Map, Wardley Map, and one more). The library grows over time, including through user authorship.

*The AI's role grows iteratively.* Iteration 4's AI is small and confident — it's just doing slot-filling on one frame. By iteration 7 it's doing methodological recommendation against a small library. The capability grows alongside the architecture, not ahead of it.

*Every iteration is shippable to a small audience.* You don't have to wait until iteration 8 to have users. By iteration 4 the product is doing something nobody else does, and a small group of users (probably people from facilitator and consultant communities — see iteration 7 from the smoke-test list earlier in our conversation) would derive real value from it. Their feedback should shape subsequent iterations.

*The hardest engineering work is concentrated in iteration 7.* The frame-suggestion engine is the most novel technical component. Everything before it is well-understood patterns (object model, append-only history, AI inference against schemas). The suggestion engine is research-grade. Build the easier layers first to give yourself runway when you hit the hard one.

*The hardest editorial work is in Layer 3 (the frame library).* This is where consultant-level intellectual labor is required, and it never really stops. The product's quality scales with the quality of this work, and it's the most defensible asset in the long run.

**One pattern that's worth flagging.**

The build order above optimizes for *proving the architecture* before *expanding any one layer*. The alternative would be to fully build the frame library first, then the AI, then the suggestion engine. That alternative is worse for two reasons. First, you'd discover integration problems late. Second, you'd be doing the most expensive editorial work (frame characterization) before you know whether the architecture supports it. The vertical-slice order means each iteration validates the layer below it, and you learn what each layer actually needs to do in practice.

The cumulative effect is that by iteration 4 or 5 you have a product that's structurally distinctive, even if it's content-thin. By iteration 7 you have the most distinctive feature working at minimum viable quality. By iteration 8 you have the social layer that makes it actually usable. From there, every iteration adds depth and breadth to a foundation that's already proven.

That's the path. The architecture and the build order are the same shape: a clean dependency stack, where each layer is provable in isolation and each iteration carries a recognizable scenario through one more layer until the full vision is operational.

## User:

> 6/1/2026 13:01:10

Back to the capabilities - Metaphor also incorporate change over time, ie causal relationships, to influence the system in a direction. Many of the canvases, like lean and business model, seem to lack an explicit notion of change over time. But another way, frames are not just diagnostic, but they’re also interventions.

## Assistant:

> 6/1/2026 13:02:33

This is a sharp observation, and it adds a dimension to the architecture that the previous turns weren't quite handling. You're identifying something real about most frames: they're often *static descriptions* dressed up as *dynamic tools*. Let me work through what you've surfaced, what it implies for the architecture, and where it lands.

**The asymmetry you've named.**

Erickson's metaphors didn't just *describe* the client's situation. They *moved it*. The tomato-plant story was an intervention designed to produce change in the client's psychological organization over time. The frame had a direction baked in — patience leads to flowering, slow growth leads to readiness. The frame's selection profile wasn't just "here's what to notice" but "here's what to notice *because attending to it will move you*." The metaphor was an instrument of change, with the change-direction encoded in the metaphor's structure.

Most business frames lack this. Lean Canvas tells you what slots to fill in. Business Model Canvas tells you the same. Value Proposition Canvas adds more slots. None of them have an opinion about *which direction the system should move over time* or *what causal levers produce that movement*. They're snapshots. You fill them in, you stare at them, and they don't tell you anything about how the situation evolves or what to do to change it. The diagnostic frame and the intervention frame are different categories, and most popular business frames are only the first.

This is one of Rita McGrath's main critiques of the Lean Startup canon — and it's why Discovery-Driven Planning has milestones, checkpoint assumptions, and tripwires built in. DDP is a frame *about how to act over time under uncertainty*, not a snapshot of a current state. The same distinction shows up in Wardley Mapping, which encodes *evolution* on its horizontal axis as a core structural commitment, not as an afterthought. The map itself tells you something about where things are going and what moves are available.

So the asymmetry has two related dimensions: *temporal* (does the frame represent how things change over time?) and *causal* (does the frame represent what acts on what to produce change?). A frame can have both, either, or neither. Most popular frames have neither, which is why they're useful for getting started but quickly become inadequate for sustained work.

**The deeper distinction: diagnostic vs. interventional frames.**

You've named it cleanly: frames are not just diagnostic. They're also interventions. But this is worth unpacking further because *every* frame is interventional in a weak sense (using it changes what you attend to, which changes what you do) and *some* frames are interventional in a strong sense (using them is doing a directed action with intended consequences).

Three rough categories, with increasing intentionality:

**Descriptive frames.** Lean Canvas, Business Model Canvas, SWOT. They give you a structured way to inventory the present state. The intervention is incidental — by inventorying, you notice gaps. But the frame has no opinion about which direction to move and no causal model of how the system changes.

**Diagnostic frames.** Polarity Map, Cynefin, Wardley Map. They tell you what *kind* of situation you're in and what response that kind of situation calls for. There's a causal commitment — Cynefin says clear domains call for sense-categorize-respond, complex domains call for probe-sense-respond. The frame is starting to encode "if this is the diagnosis, this is the appropriate move."

**Interventional frames.** Erickson's metaphors, Theory U, Discovery-Driven Planning, Appreciative Inquiry, NVC, Immunity to Change (Kegan), the GROW coaching model, design sprints. These are *acts performed over time* with intended effects. They have phases, sequences, conditions for movement, and explicit theories of what produces change. Using them is doing something, not just looking at something.

The three categories aren't a clean hierarchy. The same content can be packaged in any of the three modes depending on how the frame is structured. Customer interviews can be a descriptive activity (inventory what users said), a diagnostic activity (identify what kind of problem we're in), or an interventional activity (run them in a specific sequence to produce a specific shift in team belief — which is roughly what The Mom Test is teaching).

What this tells you is that *every frame has a temporal-causal profile*, and most existing frame libraries don't make that profile explicit. The architecture you've been building should.

**What this adds to the architecture.**

The frame characterization needs a new dimension: *temporal-causal structure*. Each frame in the library should declare:

*Time horizon.* Is this frame a snapshot of now, a comparison across time points, a trajectory over time, a sequence of phases, or a sustained loop? Lean Canvas is a snapshot. DDP is a trajectory with checkpoints. Theory U is a sequence of phases. OKRs are a recurring cycle.

*Causal commitments.* What does this frame claim moves what? Wardley claims that evolution is driven by user need plus capability movement down its value chain. Polarity Mapping claims that overemphasis on one pole produces downside that triggers movement to the other pole. Discovery-Driven Planning claims that early checkpoint failures should re-direct effort rather than escalate commitment. The causal model is part of the frame.

*Intended direction.* Where does this frame want to take the system? Appreciative Inquiry wants to amplify what's working. Immunity to Change wants to surface the contradictory commitment that's preventing stated change. Lean Startup wants to find product-market fit through validated learning. The direction is part of the frame's identity.

*Levers.* What does this frame say the user can act on to produce change? Wardley's levers are "doctrine" (how to act) and gameplay moves (specific strategic options at given evolutionary stages). DDP's levers are reverse income statement assumptions and checkpoint design. NVC's levers are the four-part communication structure. The levers are what makes the frame actionable rather than just observational.

Without these dimensions, the frame library is mostly a catalogue of descriptive schemas. With them, the library becomes a *library of interventions* — methodological tools that have opinions about what to do, not just how to look. That's a substantially more useful library.

**What this changes about the suggest-frames feature.**

The suggestion engine becomes much more interesting once frames carry temporal-causal profiles, because it can match not just on substrate gaps but on *intended movement*. The user can ask different questions:

"What frames would help me *see* this situation differently?" — the diagnostic version, which is what we had before.

"What frames would help me *move* this situation in a particular direction?" — the interventional version, which is new. "We're stuck on whether to focus or explore — what frame would help us *resolve* this?" The Polarity Map appears. "We've validated the problem but not the solution — what frame helps us *test* solutions efficiently?" The Discovery-Driven Planning or Mom Test appears. "Our team is in conflict about strategy — what frame helps us *surface* what's underneath?" Immunity to Change appears.

The match becomes substantively richer because it's now matching the user's *direction of intended movement* against the frames' *intended directions*. This is exactly what good consultants do when they recommend a methodology — they listen to the situation and the desired outcome, then propose a frame whose intervention profile fits both.

It also enables a different kind of warning. "You've been using Lean Canvas for two months. It's a descriptive snapshot frame with no temporal model. Your situation has shifted from finding product-market fit to scaling early growth. Lean Canvas can't tell you anything about what to do next. Consider Wardley Mapping or Geoffrey Moore's Crossing the Chasm." That's a substantially more useful suggestion than "this frame might illuminate things differently."

**What it adds to the four-element schema.**

It also feeds back into your earlier four-element schema in an interesting way. The schema as I described it was *cyclical* — substrate, framing, projection, sedimenting, repeat — but the cycles didn't have a *direction*. You could iterate indefinitely without the system going anywhere in particular. Adding temporal-causal structure to frames means that the cycles can be *directed*: framings carry intended movement, and the trajectory of the substrate over many cycles can be tracked against the frames' intended directions.

This makes the whole schema more honest about what frames are actually for. Framing isn't just a way to look at substrate. It's also a way to *act on* substrate over time. The cycles aren't just spinning — they're (sometimes) producing change in a direction that the framing intends. The architecture should make this trackable: did the substrate move where the frame wanted it to move? Is the gap between intended direction and observed movement growing or shrinking?

This is also where the tool starts to support something like *learning about frames themselves*. If you can see, across many uses, whether a frame's intended movements actually happened, you can characterize each frame's *real-world track record* rather than just its theoretical structure. Frames that consistently fail to produce their claimed effects can be identified. Frames that produce unexpected effects can be identified. The library becomes empirical, not just curatorial.

**What it changes about the build order.**

The temporal-causal dimension doesn't add a new layer; it deepens Layer 3 (the frame library) and Layer 5 (the suggestion engine). But it adds real editorial work. Each frame now needs not just slot structure, fit characterization, highlight-and-dim signature, and entailment structure — it also needs time-horizon, causal commitments, intended direction, and levers. That's significant additional work per frame, and it has to be done by someone who understands the methodology deeply.

The build order probably stays the same, with two refinements. First, the initial frame library should include at least one frame from each of the three categories (descriptive, diagnostic, interventional) so that the architecture proves it can handle all three. Lean Canvas (descriptive), Polarity Map (diagnostic), and Discovery-Driven Planning (interventional) would be a defensible initial set. Second, the suggestion engine should be tested against intended-direction queries from the start, not just substrate-gap queries, because the interventional matching is the more distinctive capability.

**One deeper implication worth surfacing.**

Erickson, Lakoff, and the NLP traditions are all working from a strong premise that you haven't fully articulated yet but that this turn is moving toward: *language is constitutive of reality, and the right metaphor or frame doesn't just describe a situation, it changes it*. Saying it well changes things. Naming it precisely changes things. Imposing a structure on it changes things.

This is also Maturana and Varela's claim about *languaging* — that language isn't a tool for transmitting representations of a pre-given world, it's a coordinated activity that *brings forth* worlds. When Erickson tells the tomato-plant story, the client is not receiving information about patience; the client is *participating in a languaging activity that constitutes a different relationship to time and growth*. The metaphor is performative, not descriptive.

If frames are interventions, and interventions are performative languaging, then your tool is doing something more interesting than "helping people see their situation differently." It's *helping people change their situation through structured languaging*. The suggested frame is not just a new lens — it's a new way of speaking and thinking that, applied consistently, alters the substrate it's applied to. This is closer to what coaches, therapists, and good consultants actually do, and it's substantially more ambitious than "richer note-taking."

It also brings the architecture closer to the contemplative-traditions arc you've been following. The Buddhist analysis of *vāsanā* and *saṃskāra* is exactly the claim that current cognitive activity *shapes* future cognitive substrate — there is no neutral observation, only various kinds of intervention into the stream of mind. Erickson, Lakoff, NLP, Yogācāra, and *The Blind Spot* are all saying versions of the same thing: framing changes what gets framed. Your tool operationalizes this claim by making the intentional structure of framings explicit.

**Where this lands.**

The capability you've just added — frames as interventions, not just diagnostics — is probably the second most important capability of the product, after the suggest-frames-not-in-use feature. Together, they describe a tool that:

knows methodologies have temporal-causal structure and tracks it,

suggests frames not just by fit but by intended direction,

surfaces when a current frame is structurally inadequate to the kind of movement the situation needs,

makes the performative nature of framing visible to the user,

and over time, accumulates empirical track records of which frames produce which kinds of movement in which kinds of situations.

That's a substantially more sophisticated product than what I'd been describing two turns ago. It also positions the tool more strongly. "Structured note-taking with frames" is a small market. "Methodological intervention selection at point of use" is a market that historically only senior consultants could serve, and the tool is making that capability accessible to working teams. That's a much bigger and more defensible position.

One last sharpening. The asymmetry between snapshot frames and intervention frames is itself a *diagnostic signal* about how much methodological sophistication a user or team has. Beginners use snapshot frames because they're easier; experienced practitioners use intervention frames because they actually move situations. The tool's suggestion of intervention frames over snapshot frames, over time and across uses, would naturally pull users toward methodological maturity. That's the pedagogical side effect from the previous turn, made operational: the tool isn't just helping people use frames better, it's quietly upgrading which kinds of frames they reach for. Over a year of use, a team's vocabulary of methodological options would expand toward the interventional end of the spectrum. That's a real change in the team's capability, produced by sustained use of the tool rather than by explicit training.

That's what makes this not just a feature addition but a refinement of what the product *is*. It's not a workbench for thinking. It's a workbench for *acting through thinking* — and the distinction matters.

## User:

> 6/1/2026 14:00:40

some more assumptions:

* underlying substrate can be composed of not just text, but much richer objects - e.g. spreadsheets, projects & tasks, email feeds, records about people, about organizations - look at DXOS Composer as an example of the possible different types
* collaborative dimension is foundational, not a layer on top - so it should be at the bottom of the dependency - again see DXOS Composer a platform layer

## Assistant:

> 6/1/2026 14:02:24

These two assumptions reshape the architecture substantially, and they're worth thinking through carefully because they move the foundation rather than adding new floors. Let me work through what each one changes, then revise the layered architecture and the build order accordingly.

**Assumption: the substrate is heterogeneous, not just text.**

This is a significant change. The previous architecture quietly assumed claims were strings of text. Once the substrate includes spreadsheets, project structures, email threads, people records, organization records, code, design files, and so on, several things shift.

First, the *referenced-by* relationship has to work across object types. A stance about "$5/month nutrition coaching" can reference the cell in a pricing spreadsheet that contains $5, the customer interview note that produced the validation evidence, the LinkedIn record of the interviewee who said it, the Linear ticket that tracks the test design, and the email thread where Sam raised her concern about sample bias. The architecture has to support stances and framings that span object types, treating each as a first-class element of the substrate.

Second, *frames* have to be able to operate on heterogeneous substrate. Lean Canvas is straightforward — its slots can be filled by text, but they can also be filled by references to spreadsheet ranges, customer records, or document sections. Wardley Mapping is more interesting — its positions could be people, services, infrastructure components, or product lines, each of which is a different object type in the substrate. The frame's slot specification has to be type-aware (or type-flexible) in a way that the previous architecture was hiding by assuming strings.

Third, *projections* become richer. The output of applying a frame isn't just a structured-text view — it might be a visualization, a table joining records from multiple object types, a derived dataset, a graph. The "view" produced by a frame application has to handle the heterogeneity of what it's framing.

Fourth, the AI structuration layer becomes substantially more capable but also more demanding. Reading a paragraph of natural language and proposing structure is one thing. Reading a paragraph plus an attached spreadsheet plus a linked customer record and proposing structure that integrates all three is another. The AI has to be multimodal in a meaningful sense, not just text-multimodal.

DXOS Composer is a useful reference here because it does treat heterogeneous objects as foundational. Composer's plugin architecture lets different object types (markdown docs, spreadsheets, kanban boards, drawing surfaces, presence indicators, calendars) coexist in the same workspace, addressable through the same primitives, with cross-references between them. The architectural commitment is that *objects are objects, regardless of type*, and the framework provides the connective tissue that lets them reference and be referenced uniformly.

What this implies for your architecture is that the **claims layer** has to be generalized into an **objects layer**. An object is any addressable, typed, owned, timestamped entity in the system. Text claims are one object type. Spreadsheets are another. People records are another. The architecture treats them uniformly at the object level; type-specific behavior lives in plugins or adapters. This is exactly what Composer does.

**Assumption: collaboration is foundational, not a layer on top.**

This is the bigger architectural change, and it's correct. Treating collaboration as Layer 6 (something added late, on top of an existing single-user model) is a common mistake that almost always produces a worse product than designing for collaboration from the start. The reason is that collaborative semantics affect every layer below. Identity, object addressability, immutability, conflict resolution, concurrent editing, presence, permission, attribution — these aren't bolted onto a single-user system without compromise. Multiplayer-first design is a different discipline.

DXOS Composer is again a useful reference because it's built on the ECHO database, which is a local-first peer-to-peer database with CRDTs (conflict-free replicated data types) as the foundational primitive. Collaboration in Composer isn't a feature; it's the database. Every object can be edited by multiple peers simultaneously, conflicts merge deterministically, and synchronization happens without a central authority. The architectural foundation is *shared state over a peer network*, not *single-user state with sync added later*.

What this implies for your architecture is that the lowest layer — what I was calling Layer 0 (persistence and identity) — has to be substantially richer than a typical database. It needs to be:

- *Local-first*, so each user has full operational capability without network connectivity, and so the system's primary surface is on each user's device rather than on a central server.
- *Peer-aware*, so multiple users can coexist in shared spaces without a central authority defining authority over the shared state.
- *CRDT-based or operationally transformed*, so concurrent edits merge deterministically rather than producing conflict states that need manual resolution.
- *Identity-aware from the start*, so every object carries attribution and every operation carries authorship, because collaborative semantics depend on this.
- *Permission-aware*, with sharing primitives built into the foundation rather than added later, because access control affects how objects can be referenced and which views are computable.

This is substantially more demanding than "build on a Postgres or SQLite database." It's closer to "build on a CRDT library like Yjs or Automerge, or use a platform like DXOS that already provides this foundation, or use a backend like Liveblocks or Replicache designed for collaborative state."

The DXOS approach is the most ambitious: peer-to-peer, no central server required, with the database itself being the synchronization primitive. The Liveblocks/Replicache approach is more pragmatic: collaborative state with a server in the middle, but with optimistic local-first updates and CRDT-style merge semantics. The choice is significant, but the principle — collaboration in the foundation, not on top — is the same either way.

**The revised layered architecture.**

Putting both assumptions together changes the layer ordering meaningfully. Here's the revised stack, bottom to top:

**Layer 0: collaborative object foundation.**

The lowest layer is now substantially richer. It provides: local-first storage, peer-aware synchronization, CRDT-based merge semantics, identity and attribution on every object and operation, permission and sharing primitives, and a uniform object model where any typed object can be addressed, referenced, and edited collaboratively. This is roughly what DXOS provides as a platform, or what you'd build on top of Automerge with significant work, or what a Liveblocks-style backend gives you with different trade-offs.

The architectural commitments at this layer are foundational: every object is immutable in the append-only sense (versions are new objects), every operation is attributed, every change is potentially seen by every peer who has access, and the database itself is the sync primitive.

**Layer 1: heterogeneous objects.**

Objects are typed. Some types are core (text documents, claims, stances, frames). Others are added through plugins or adapters (spreadsheets, kanban boards, calendars, people records, organization records, email threads, file attachments, code). The architecture treats them uniformly at the object level; type-specific rendering and behavior live in plugin code that the foundation knows how to load.

References between objects are first-class. A stance can reference a cell in a spreadsheet, a row in a people database, a date in a calendar, or a section of an email thread. The reference is a real object — a link with its own identity, attribution, and metadata — not just a URL or a foreign key.

This layer is roughly what Composer provides through its plugin system. The product is now a *workspace of heterogeneous addressable objects* rather than a text-centric note-taking app.

**Layer 2: claims and stances over heterogeneous substrate.**

Claims become *one type* of object among many, not the primary type. A claim is a natural-language statement, but the substrate the architecture cares about includes all the other object types in Layer 1.

Stances are the new layer's distinctive contribution. A stance is a typed object that references one or more substrate objects (of any type) and carries the framing metadata: holder, stance-value, basis, time, conditions for change, responds-to, inputs being blended. Stances are append-only, attributed, and visible to all peers in the shared space.

The substrate-cut separation now works across object types. You can attach a stance to a row in a customer database, a cell in a pricing spreadsheet, a paragraph in a doc, an email, or another stance. The architecture is uniform.

**Layer 3: frames as named schemas operating over heterogeneous substrate.**

Frames are first-class objects with slot specifications, fit characterizations, highlight-and-dim signatures, entailment structures, and now also temporal-causal profiles (from the previous turn).

The key change from the earlier description is that frame slots can be filled by *any object type*. A Lean Canvas "customer segment" slot can be filled by text, by a query over a people database, by a reference to a market segment defined elsewhere, or by a derived view. The frame's slot specification is type-aware (or type-tolerant) and the AI structuration layer above handles the inference of which substrate objects fit which slots.

Applying a frame to a workspace produces a *view* — a computed projection over the substrate that respects the frame's structure. The view might be a canvas, a table, a graph, or a hybrid. The underlying substrate objects are untouched; the view is a separate object that references them through the frame's structure.

**Layer 4: AI structuration across heterogeneous substrate.**

The AI now has to read across object types. A user describes their thinking; the AI proposes stances that reference text claims, spreadsheet cells, customer records, and prior stances appropriately. The AI also has to handle frame application across heterogeneous substrate — when applying Lean Canvas, it needs to identify which existing objects fit which slots, regardless of their type.

This is more demanding than the text-only version but it's also more powerful, because the AI's structuring work integrates material that previously lived in different tools.

**Layer 5: frame recommendation and gap detection across heterogeneous substrate.**

The suggestion engine reads the workspace's substrate (which now includes everything from spreadsheets to people records to email feeds) and matches against the frame library. Because the substrate is richer, the suggestions can be more substantive: "your customer-records database has 47 entries but your value-proposition canvas only references three; the JTBD frame might help you systematically connect them" — that's a suggestion that depends on the architecture knowing about both the database and the canvas as substrate objects.

**Layer 6: emergent or computed lenses.**

Same as the previous Layer 7 — the research-grade capability of surfacing frames that nobody explicitly authored, computed from how the corpus is being used. This is more powerful with heterogeneous substrate because the patterns to detect are richer.

**The build order, revised.**

The build order also changes meaningfully. The previous order treated collaboration as Iteration 8 and assumed text-only substrate. Both have to move.

**Iteration 1: Layer 0 minimal — collaborative object foundation.**

Build the collaborative substrate first. This is significantly more work than building a single-user database, and it's the most important architectural decision in the whole stack. The options are:

*Build on DXOS.* You get the collaborative foundation, plugin architecture, and many primitives essentially for free, but you commit to DXOS as a platform and have to learn it deeply.

*Build on Automerge or Yjs.* You get CRDT primitives but have to build the plugin architecture, permissions, identity, and many other primitives yourself.

*Build on Liveblocks, Replicache, or a similar service.* You get collaborative state with server-mediated sync, less local-first than DXOS but more familiar architecturally.

The right choice depends on team capability and ambition, but the choice itself happens in Iteration 1, not later. The platform decision is structural.

At this iteration, the product does almost nothing user-visible. You have a workspace where peers can connect, share, and edit a few basic object types. The point is to prove the collaborative substrate works.

**Iteration 2: Layer 1 minimal — two or three object types.**

Add a small number of object types that exercise the heterogeneous-substrate commitment. Probably: text documents, a simple structured object (maybe a kanban card or a checklist), and references between objects. The point is to prove the architecture handles multiple object types uniformly and that references across types work.

**Iteration 3: Layer 2 minimal — claims and stances over heterogeneous substrate.**

Add claims and stances as new object types. A stance can reference any object in the workspace — a text claim, a kanban card, a document section. Multi-user attribution works because Layer 0 already handles it. The Monday-Wednesday-Friday scenario runs in full at this iteration, but now it can be run over a richer substrate (the claim might live in a doc, the interview notes might be in another doc, Sam's interpretation might reference a spreadsheet of customer responses).

**Iteration 4: Layer 3 minimal — one frame across heterogeneous substrate.**

Add the epistemic-stance frame (as before). It now works across object types — you can attach an assumption-stance to a spreadsheet cell or a customer record, not just a text claim. The frame's slot specification handles the type variety.

**Iteration 5: Layer 4 minimal — AI structuration on the existing frame across heterogeneous substrate.**

The AI infers stance structure from natural language, but it now also reads the workspace's other objects and proposes appropriate references. The user writes "after the interviews I'm more confident on $5/month" and the AI proposes a stance that references the existing text claim AND the customer-interview records in the workspace.

**Iteration 6: Layer 3 expanded — a second frame, heterogeneous.**

Add Lean Canvas (or whatever your second frame is). The frame's slots can be filled with text, references to other objects, or queries. The product can now hold multiple frames over the same heterogeneous substrate.

**Iteration 7: Layer 4 expanded — AI handles multiple frames over heterogeneous substrate.**

Same as before but richer.

**Iteration 8: Layer 5 minimal — frame suggestions across heterogeneous substrate.**

Pull-based frame suggestions, now able to reason about gaps in the heterogeneous substrate (not just textual gaps).

**Iterations 9+: depth.**

More object types, more frames, deeper AI capabilities, proactive suggestions, frame authoring tools, emergent-frame detection.

**Trade-offs worth naming honestly.**

The two assumptions you've added significantly increase the difficulty and ambition of the project. Three trade-offs are worth being explicit about.

*The architectural decision in Iteration 1 is now load-bearing.* If you pick the wrong collaborative platform, the cost of switching later is enormous because everything above it depends on it. DXOS is the most aligned with the architecture you've been describing but is also the riskiest choice — it's a relatively new platform with a smaller community. Automerge plus custom plugin architecture is more flexible but is essentially building DXOS yourself. Liveblocks is the safest but commits you to server-mediated collaboration.

*The heterogeneous substrate adds significant breadth of work.* Each object type is real engineering — rendering, editing, references, AI structuration. The architecture is uniform at the abstract level, but the type-specific work doesn't go away. The build order accommodates this by starting with two or three object types and adding more iteratively, but the cumulative work is real.

*The AI work is substantially harder with heterogeneous substrate.* Text-only AI structuration is well-trodden. Multimodal structuration over text, structured data, references, and people records is harder. The AI layer is where some of the most novel technical work lives, and it gets harder, not easier, when the substrate is heterogeneous.

**Where this leaves the product.**

What you've described is now substantially more ambitious than what was on the table two turns ago. It's not "a tool for structured note-taking" or even "a methodology workbench." It's something closer to *a collaborative workspace where heterogeneous objects from across a team's work surface can be framed methodologically, with multiple frames over the same substrate, AI-assisted structuration, and frame recommendation against the workspace's actual content*.

This is a significantly bigger product. It's also better positioned. The competitive landscape changes:

The text-first PKM tools (Tana, Roam, Obsidian) become irrelevant because the substrate is heterogeneous from the start.

The workspace tools (Notion, Coda) become partial overlaps — they handle heterogeneous objects but lack the framing architecture.

The collaboration platforms (DXOS itself, Liveblocks) become foundations rather than competitors — the product is built on them.

The methodology tools (Miro, Mural, Plectica, Kumu) become narrower analogs — they have framing but not heterogeneous substrate or AI structuration.

The semantic-layer tools (dbt, Cube) become orthogonal — they handle the meaning-layer for data, but not the meaning-layer for heterogeneous team substrate.

What's left in your competitive position is a category that doesn't currently exist. That's both the opportunity and the difficulty. Nobody else is building this because the prerequisite stack (collaborative substrate plus heterogeneous objects plus AI structuration plus a frame library) only recently became feasible. You're betting that the convergence is real and that the value of the integrated product is greater than the sum of its parts.

The honest read is that this is a 3-5 year product, not a 12-month MVP. The vertical-slice build order makes it tractable — you have a usable product at every iteration — but the full vision requires significant capability and time. The architectural foundation you've now described is the right one for the product the conversation has been pointing at, and DXOS Composer is probably the closest reference point in the current landscape for what's structurally possible.

One last thing worth flagging. The choice to put collaboration at the foundation isn't just architecturally correct — it's also philosophically aligned with the whole arc of the conversation. The thinkers you've been reading (Maturana, Varela, Luhmann, Cabrera, Lakoff) all converge on the claim that meaning is fundamentally social — that framings are produced and held by groups, not isolated individuals, and that the recursion of cognition operates across observers, not just within them. Building the collaborative foundation as the substrate of the architecture is the same commitment made operational: the tool doesn't model an individual's lens-work and then let other people share it; it models lens-work as fundamentally a multi-observer activity from the start. That alignment between philosophical commitment and architectural foundation is uncommon and worth preserving.

## User:

> 6/1/2026 14:10:29

you stated "Applying a frame to a workspace produces a view" - isn't this producing a new substrate?

## Assistant:

> 6/1/2026 14:11:24

You're right, and catching this is important. Let me work through what I was conflating and what the corrected picture looks like, because the distinction has real architectural consequences.

**What I conflated.**

I used "view" in two incompatible senses in the same sentence. In one sense, "view" means a rendering — a way the underlying objects are displayed without producing anything new. The data is unchanged; only the visualization differs. In another sense, "view" means a derived object — something computed from underlying material that exists as its own addressable artifact, with its own identity, its own ability to be referenced, its own capacity to be the substrate of further operations.

Applying a frame to a workspace is the second kind, not the first. The result isn't a rendering; it's a *new projection-object*. That projection has structure that wasn't present in the raw substrate. It selects certain objects, organizes them into the frame's slots, fills in slots that needed AI inference, carries the entailment commitments of the frame, and exists as a thing that can be looked at, shared, framed further, or referenced by other objects.

Calling it a "view" was lazy shorthand from database vocabulary, where views are read-only renderings of underlying data. The architectural reality of what's happening here is closer to *materialized views* with full object identity, plus all the recursive consequences that follow.

**Why this matters.**

If frame application produces a new substrate rather than a transient view, several things follow that matter for the architecture.

First, the four-element schema applies recursively to its own outputs, as your Assumption 1 from earlier already committed to. A projection produced by applying a frame is itself a substrate that can be framed further. Sam can apply a different frame to the Lean Canvas projection that you produced, and that produces yet another projection, and so on. The architecture has to treat every projection as a candidate substrate for the next operation. This is exactly the self-similarity-across-levels commitment, made concrete.

Second, projections have authorship and time. Your Lean Canvas projection at time T1 is a different object from your Lean Canvas projection at time T2, even if it covers the same underlying claims. The frame is stable; the projection is a particular application of that frame to a particular substrate state at a particular moment by a particular author. The projection is a *snapshot of an act of framing*, not a live view.

Third, projections sediment. Once a Lean Canvas projection exists, it becomes part of the substrate for everything that comes after. Future framings can reference it, build on it, disagree with it. The history of projections is itself an inspectable lineage. Wednesday-you can apply a frame to (Monday's claim + Monday's stance + Monday's Lean Canvas projection), not just to the bare claim. The sedimentation is structural, not just temporal.

Fourth, the substrate-cut-projection distinction has to be maintained carefully through recursion. At any given moment, you have some objects that are functioning as substrate (being operated on), some operations functioning as framings (acting on substrate), and some objects functioning as projections (results of framings, which immediately become candidate substrate for the next operation). The same object can play different roles in different operations. A Lean Canvas projection is a projection-of-prior-operation and a substrate-for-next-operation simultaneously. The architecture has to support this fluidity without confusing roles.

**The corrected picture.**

So the corrected description of what happens when a frame is applied: the user (or AI) takes some collection of substrate objects, applies a frame's slot structure to them, possibly with AI inference to fill slots, and produces a *new projection-object* in the workspace. This projection has identity, authorship, time, full provenance (which substrate objects it references, which frame was applied, who applied it), and is itself addressable and referenceable.

Mechanically, the projection is a derived object — its content can in principle be regenerated by re-applying the frame to the same substrate. But it's stored as a snapshot because the substrate underneath might change over time, because the AI inferences involved in producing it are not perfectly deterministic, and because authorship of *this particular framing act* is part of what makes it useful later. The projection is the record of "here is what the substrate looked like under this frame when applied at this moment by this person."

This is closer to how layered work products actually work in practice. A PRD is a projection over many substrate inputs (interviews, conversations, prior decisions). It's a real artifact, not just a view of underlying data. It has authorship and a date. It becomes the substrate for subsequent work (engineering specs, design files, marketing briefs). Each of those is in turn a projection that becomes substrate for what follows. The whole flow of working life is layered projection-becomes-substrate, and the architecture is just making this structure explicit.

**What this changes about the architecture description.**

The previous layered architecture description needs a small but important correction at Layer 3. I wrote that frame application "produces a view, not a transformation." That's wrong. Frame application *produces a new projection-object*. The substrate isn't transformed (the original objects are untouched), but the result is a new object, not a transient rendering.

The implication for the architecture is that projection-objects need to be a recognized type in Layer 1's object model — alongside claims, stances, frames, and whatever other object types the system supports. A projection-object has:

- a reference to the frame that was applied
- references to all the substrate objects it operates on
- the filled slot structure (the result of applying the frame)
- authorship and time
- responds-to / inputs slots, just like stances, because projections also participate in the recursive composition

Projection-objects are themselves citable, framable, attachable to stances. They're substrate-grade. The architecture is uniform.

**A subtler point worth surfacing.**

There's an interesting question hidden in your catch: *what's the difference between a projection-object and a stance-object?* In the architecture as I'd been describing it, a stance attaches framing metadata (holder, stance-type, basis, etc.) to a substrate object. A projection applies a frame's structure to a collection of substrate objects. They sound different, but at a deep level they're doing the same thing: both are *framings applied to substrate that produce new structured objects*.

The honest answer is they're probably two species of the same genus. A stance is a *minimal* framing — applying a small, often single-slot frame (the epistemic-stance frame) to a single substrate object. A projection is a *richer* framing — applying a multi-slot frame to multiple substrate objects. The mechanism is the same; the elaboration differs. In a clean architecture, both might be instances of the same underlying object type: *frame-application*, with stances being the simplest case and projections being the elaborated case.

If you wanted to push this further, the architecture could collapse stance-objects and projection-objects into a single concept: a *framing-event*. Every framing-event has the same shape:

- the frame being applied (which might be the trivial epistemic-stance frame for what we'd been calling a stance, or a richer frame like Lean Canvas)
- the substrate objects being operated on (one for a stance, many for a richer projection)
- the slot fillers produced by the framing
- authorship, time, responds-to, inputs

The architecture has one fundamental object — the framing-event — with stances being thin framing-events and projections being thick framing-events. This is structurally cleaner and produces fewer special cases in the code.

**Whether to collapse stance and projection.**

There's a genuine design question about whether to collapse them or keep them distinct. Arguments for collapsing: architectural simplicity, uniform handling, easier recursion (every framing-event can be the substrate for another framing-event without special-casing). Arguments for keeping them distinct: stances are emotionally and cognitively different from projections in the user experience (a stance is a quick judgment; a projection is a considered application of a methodology), and conflating them in the data model might leak into a confusing UI.

The right resolution is probably: keep them conceptually distinct in the UI and language, but unify them in the underlying data model as framing-events with different shapes. The user sees stances and projections as different things because they feel different. The architecture treats them uniformly because they are uniformly the same kind of operation.

**The corrected description, summarized.**

Frame application produces a new projection-object, which is itself a substrate-grade object in the architecture. Projections sediment alongside everything else. The four-element schema applies recursively to projection-objects, just as it applies to claims and stances. Projection-objects are full citizens of the workspace — addressable, attributable, referenceable, framable. The "view" terminology I used was misleading because it suggested transient rendering; the reality is that frame application produces durable structure that becomes substrate for subsequent operations.

The cleaner way to think about it: there is one substrate, growing over time as framings produce new projections that become part of the substrate. Every framing-event takes some slice of the current substrate as input and produces a new object that joins the substrate. The architecture is a recursive composition machine; the four-element schema describes one cycle of its operation.

The catch matters because if I'd left the previous turn's description in place, the architecture would have had a quiet bug at the boundary between layers — views as ephemeral renderings would have meant the recursion couldn't actually happen at that layer, and the sedimentation commitment would have broken silently. Catching it now means the architecture stays consistent with the philosophy that produced it: every framing makes the world bigger, not just differently visible.

## User:

> 6/1/2026 14:18:35

I have a related question: what is stance vs a frame? Concisely explain and let's see if they're actually the same or stay different

## Assistant:

> 6/1/2026 14:19:05

**Concise distinction.**

A *frame* is a reusable schema — a named, persistent template with slot structure, fit characterization, highlight-and-dim signature, entailment commitments, and (sometimes) temporal-causal profile. It exists in the library. It can be applied to many substrates. It has an author and a version, but it's not tied to any particular act of framing.

A *stance* is an instance of frame application — a specific act of taking a position on specific substrate at a specific time by a specific holder. It exists in the workspace as a record of "I applied this frame to this material right now."

The relationship: a frame is to a stance what a *class* is to an *instance*, or what a *template* is to a *filled-in document*. The frame defines the shape; the stance is one filling-in.

**Are they actually the same?**

No, they're different in kind, even though they're tightly coupled. A frame without any stance applied is still a frame — it sits in the library as a methodological option. A stance without a frame is incoherent — every stance is necessarily an application of *some* frame, even if the frame is trivial (the implicit "I'm taking a position on this" frame). You can't have a stance without a frame, but you can have a frame without any stances yet.

This is the same distinction as: a recipe vs. a meal cooked from it. A genre vs. a novel in that genre. A musical scale vs. a performance using it. The reusable schema and the specific instantiation are different ontological categories, even though they only exist in relation to each other.

**Where I muddied this in the previous turn.**

I was sliding toward unifying them at the data model level — proposing that both stances and projections are "framing-events" of different sizes. That move is still correct *for the implementation*: a stance is a thin framing-event, a richer projection is a thick framing-event, and at the data layer they have the same shape. The unification is real at that level.

But at the *conceptual* level, the frame-vs-stance distinction is different from the stance-vs-projection distinction I was unifying. Frame-vs-stance is *schema-vs-instance*, which is a genuine ontological difference. Stance-vs-projection is *thin-instance-vs-thick-instance*, which is a difference of degree within a single category.

So the cleaner picture has two distinctions, not one:

The *type-level* distinction: frames (schemas in the library) versus framing-events (instances applied in the workspace). These are categorically different.

The *instance-level* distinction: thin framing-events (which we've been calling stances) versus thick framing-events (which we've been calling projections). These are differences in elaboration within the framing-event category.

**Why the distinction matters.**

Three reasons it has to stay sharp in the architecture.

First, frames are *editorial work*. They're authored carefully, characterized with fit signatures and entailments, and live in a library that grows over time. Stances are *operational work* — produced continuously as users do their thinking. The two have different lifecycles, different authoring patterns, and probably different governance. A frame is updated rarely and deliberately. A stance is produced casually and frequently.

Second, frames are *shareable assets* in a way stances aren't. A consultancy can build proprietary frames as part of its methodology library. A community can fork and remix frames. Frames travel between workspaces. Stances are usually tied to the workspace they were produced in, because they reference substrate that lives there.

Third, the suggest-frames-not-in-use feature operates over frames, not stances. The system is matching the substrate against the frame library, not against historical stances. If frames and stances were the same kind of thing, the recommendation engine would be unclear about what it's matching against.

**One subtle point that keeps the picture honest.**

Frames are themselves objects that get framed. A frame can be the substrate of a stance: "I think Lean Canvas is the right frame for early-stage product work but inadequate for scaling." That stance has Lean Canvas as its substrate and is taking a position on the frame's applicability. So frames live in the library *and* in the substrate of the workspace, simultaneously.

This isn't a contradiction; it's just that the same object can play different roles in different operations. Lean Canvas, as a frame, is a schema you can apply to claims. Lean Canvas, as an object, can have stances taken on it. The architecture handles this by treating frames as first-class objects (so they can be referenced and framed) that also have a special role (they can be *applied* as schemas) that ordinary objects don't.

**Resolved picture.**

Frames and stances are not the same. They sit at different levels: frames are schemas in the library; stances are instances of applying schemas to substrate in the workspace. They have different lifecycles, different governance, different sharing properties. At the data layer the implementation can be unified (both are objects with similar structure), but conceptually and architecturally they remain distinct categories. Keeping them distinct in language and UI prevents confusion. Unifying them in the implementation prevents code duplication. Both can be true at once.

The right way to hold it: a frame is the *operator*; a stance is the *application of that operator*. The operator is reusable; the application is specific. The operator lives in the library; the application lives in the workspace. They're different things tied tightly together — and the architecture is cleanest when that tightness is recognized while the distinction is preserved.

## User:

> 6/1/2026 14:21:24

In the earlier turns, "stance" was described in a way as if I was judging something (I think it was treating the marking of a statement as an assumption was a stance), then "frame" or applying a frame was a larger operation. Two questions: a) what is the current definitions - concisely. b) what do the traditions say about this. let's get to stable definitions

## Assistant:

> 6/1/2026 14:22:17

**a) Current definitions, concisely.**

A *frame* is a reusable methodological schema with named slots, applied to substrate to produce structure. Lives in the library. Examples: the epistemic-stance frame (with slots for stance-value, basis, time, conditions for change), Lean Canvas, Wardley Map, Polarity Map.

A *stance* is one slot within the epistemic-stance frame — specifically the slot that holds the position taken (assumption, hypothesis, validated, disproven, etc.). It's a *value*, not an operation.

A *framing-event* is the instance produced when a frame is applied to substrate. It has authorship, time, the substrate it references, and the slot fillers produced by the application. When the frame applied is the epistemic-stance frame, the framing-event contains a stance value among its other slot fillers.

So the three terms operate at three different levels: frame (the schema), framing-event (the instance), stance (one slot value within a particular instance of a particular frame).

What I did in the earlier turns was sloppy: I used "stance" as shorthand for "framing-event produced by applying the epistemic-stance frame." That was lazy, and it produced the confusion you're now flagging. The marking of a statement as an assumption is not itself "a stance" — it's a *framing-event using the epistemic-stance frame*, in which the stance-slot is filled with the value "assumption." Stance is a slot value; the act of marking is the framing-event.

This also makes the relationship to bigger frames clean. Applying Lean Canvas to a workspace is a framing-event. Applying the epistemic-stance frame to a single claim is also a framing-event. They're the same kind of operation, differing only in the frame's richness. "Stance" is not a smaller kind of framing — it's a specific value type that appears in one particular frame's slot structure.

**b) What the traditions say about this layering.**

The traditions converge on the same three-level structure, with different vocabulary at each level. Looking across them sharpens the definitions and tells you which terms to settle on.

**Frame semantics (Fillmore, Lakoff, Minsky)** uses the cleanest version. *Frames* are stereotyped schemas with named *slots*; particular uses of a frame fill the slots with values, producing a *frame instance*. The schema-instance-value layering is explicit and well-established in this tradition. Stance is naturally a value in a slot; framing is the act of instantiating a schema. This vocabulary is the closest to what you want.

**Stance in linguistics** is a technical term and worth knowing precisely. Du Bois's *stance triangle* (2007) defines stance as a public act of taking a position, evaluating an object, and aligning with other subjects. Stance is the *taken position* — a value with content (this is good, this is doubtful, this is mine), held by a subject, with respect to an object, often in relation to others' stances. This is exactly the slot-value sense. Stance taxonomies in this literature (epistemic stance, affective stance, evaluative stance) are categories of *what kind of position* is being taken — what slot it fills, in your architecture. So linguistic usage strongly supports "stance is a value, not an operation."

**Frame theory in sociology (Goffman, Snow and Benford)** uses *framing* as the activity and *frame* as the schema. Framing is the verb, frame is the noun. "Collective action framing" is the process of producing aligned framings within a movement. This tradition doesn't typically use "stance" — its analog is "frame alignment" or "framing process." But the verb-noun distinction maps onto your framing-event-versus-frame distinction cleanly.

**Cognitive linguistics (Lakoff)** uses *frame* for the schema and *frame activation* for the event of invoking it in context. Stance isn't really a term in this tradition; the closest concept is *construal* — a particular way of construing a situation, which is roughly your framing-event.

**Buddhist Yogācāra** distinguishes *vijñāna* (the discriminating activity, the act of distinguishing), *bīja* (the seed planted by the act), and *vāsanā* (the cumulative perfuming over time). Vijñāna is closest to framing-event (the act). Bīja is closest to a stored framing-event (the result). Vāsanā is closest to sedimented framing history (the accumulated record). The tradition doesn't really separate frame-as-schema from frame-as-event; everything is event-and-trace. This is a useful corrective: in lived experience, the schema only exists through its uses.

**Erickson and the NLP tradition** distinguish *frame* (the schema or perspective) from *reframing* (the act of changing frames) from *content* (the substrate being framed). NLP also distinguishes the *outcome frame* (a frame oriented toward what you want to produce), *evidence frame* (oriented toward what counts as success), and so on — these are frame types, which fit your library notion. "Stance" isn't a primary term, but the related concepts of *position* (where you stand) and *modal operator* (necessity, possibility, obligation — the kind of stance you're taking) are central.

**Conceptual blending (Fauconnier and Turner)** uses *input space*, *generic space*, *blended space*, and *projection* (in the technical sense of mapping elements from input to blend). Frames in this tradition are mental spaces with structure; the act of blending is producing a new space from inputs. Stance doesn't really appear; the closest analog is the *vital relations* (cause-effect, identity, time) that the blend establishes.

**DSRP (Cabrera)** separates Perspectives (the operation of taking a point of view) from points-and-views (the components of a perspective). DSRP doesn't use "stance" or "frame" in your sense; perspective is the closest, and it operates as both schema and event in Cabrera's usage. DSRP is less precise about the schema-instance distinction than the linguistic traditions.

**Husserlian phenomenology** distinguishes *noesis* (the act of intending) from *noema* (the object as intended). Noesis is the act, noema is the result. Noema corresponds to framing-event-as-object — what gets produced when an act of intending fixes on something. Stance, in this vocabulary, would be the *modal character* of the noesis (believing, doubting, asserting, questioning).

**The pattern across traditions.**

Every tradition that takes this seriously distinguishes at least two levels: the schema and the application. Most distinguish three: the schema, the act of applying it, and the result. Many distinguish a fourth: the cumulative trace of many applications over time. The vocabulary varies, but the layering is stable.

The cleanest vocabulary across traditions is probably:

- *frame* — the schema (everyone agrees on this term and meaning)
- *framing* or *framing-event* — the act and its result (Goffman, NLP, cognitive linguistics)
- *stance* — a particular kind of slot value, the position taken (Du Bois, linguistics)

This gives you a three-term vocabulary with each term doing distinct work, none overlapping. Stance is reserved for its precise meaning (a position-taking value within a particular frame's slot), framing-event covers the act of applying any frame, frame covers the schema.

**Settled definitions.**

*Frame.* A reusable schema with named slots, fit characterization, highlight-and-dim signature, entailment structure, and temporal-causal profile. Lives in the library. Can be applied to substrate to produce framing-events.

*Framing-event.* The instance produced when a frame is applied to substrate. Has authorship, time, references to the substrate it operates on, references to prior framing-events it responds to or builds on, and the filled slot structure that resulted from applying the frame. Becomes part of the substrate available to future framing-events.

*Stance.* A specific value type that appears as a slot filler within certain frames — most importantly the epistemic-stance frame (with values like assumption, hypothesis, validated, disproven). Not an operation. Not a separate object type. Just one kind of slot value among many.

These three terms now operate cleanly at three levels: schema, instance, value. Earlier turns conflated framing-event and stance by using "stance" loosely for what should have been called a framing-event using the epistemic-stance frame. With these definitions, the architecture's data model has one object type at the instance level (framing-event), one object type at the schema level (frame), and a vocabulary of value types (including stance) that appear in slots within specific frames.

This also tells you what to call things in the UI. The user creates a framing-event when they apply any frame, large or small. When the frame applied is the epistemic-stance frame, the framing-event prominently shows the stance value (assumption, validated, etc.) because that's the slot most users care about. When the frame applied is Lean Canvas, the framing-event shows the canvas structure with its many slot values. The interface adapts to the frame, but the underlying object is uniformly a framing-event.

The earlier mess came from letting "stance" do double duty — sometimes as the slot value, sometimes as the framing-event. With these definitions, stance does only one job, framing-event does the other, and the conflation goes away.

## User:

> 6/1/2026 14:27:53

so a "stance" is shorthand for applying a particular frame to (epistemic judgement?) to substrate?

## Assistant:

> 6/1/2026 14:28:36

Yes, that's right — and naming this precisely matters because it explains why the earlier turns felt slippery.

**What "stance" is shorthand for.**

A stance is shorthand for: *the result of applying the epistemic-stance frame (or a closely related frame in that family) to a substrate object*. When the user marks "$5/month nutrition coaching" as `#assumption`, they're producing a framing-event whose frame is the epistemic-stance frame, and the slot value in the "position taken" slot is "assumption." Saying "I'm taking a stance on this" is a natural-language compression of "I'm applying the epistemic-stance frame to this and the position value is X."

The shorthand is useful in the same way "I have an opinion about X" is useful — it lets you talk about the operation without naming the whole apparatus. But the shorthand carries a hidden frame, and the architecture has to make that hidden frame explicit. The frame is what defines which positions are even available (assumption, hypothesis, validated, disproven, etc.), what counts as basis for each position, and what conditions would change it. Without naming the frame, the position values feel like primitives — "assumption" sounds like a basic kind of thing — when in fact they only make sense within a particular methodological tradition (Lean Startup, scientific epistemology, etc.).

**Why the shorthand caused confusion in earlier turns.**

The trouble in the earlier turns wasn't that I used the shorthand — it's that I used it without naming what it was shorthand *for*. When I said "Tana flattens substrate and cut by combining a statement with the `#assumption` tag," I was using stance-shorthand to talk about an epistemic-stance framing-event, but I was treating it as if "stance" were a primitive concept rather than the result of applying a specific frame. That obscured the fact that the same architectural complaint applies to *any* frame application, not just epistemic ones. Tana would flatten substrate and Lean Canvas application in the same way it flattens substrate and assumption-marking. The architecture problem is general; the shorthand made it look local to one kind of operation.

**What this clarifies about the epistemic-stance frame itself.**

It's worth being explicit that "epistemic stance" is one frame among many, not a privileged base layer. It happens to be the frame everyone working in product or research applies constantly, often without naming it, because the question "how confident am I in this claim?" is so foundational to working under uncertainty. But it's still a frame — with its own slot structure, its own selection profile, its own entailments.

The selection profile: the epistemic-stance frame foregrounds *confidence in claims* and dims things like *emotional resonance*, *strategic value*, *ethical weight*, *political feasibility*. Two collaborators arguing under the epistemic-stance frame are arguing about evidence and validity, not about importance or rightness.

The entailment structure: the frame commits its users to treating claims as things to be *tested*, with disconfirmation as a virtue and unfalsifiable positions as suspect. This is the scientific-Popperian inheritance baked into Lean Startup.

The temporal-causal profile: the frame is mildly directional — it wants positions to move from assumption toward validation or disproof, through evidence-gathering. The progression is implicit but real.

Saying all this makes the frame look like one option among many rather than a default. There are alternative frames for the same kind of work — Cynefin's sense-categorize-respond, Discovery-Driven Planning's checkpoint structure, design thinking's diverge-converge cycles, Theory of Constraints' constraint identification. Each is doing similar epistemic work but with different selection profiles, entailments, and directions. The Lean Startup epistemic-stance frame is popular but not unique.

**Other frames that produce stance-like outputs.**

It's worth knowing what else lives in this neighborhood, because they're all candidates for the "stance shorthand" but with different content:

*Affective stance* — applying a frame about emotional position-taking. The slot is filled with values like "concerned," "excited," "wary," "indifferent." Useful for team-building and conflict navigation.

*Evaluative stance* — applying a frame about value judgment. Slot values are "good," "bad," "worth pursuing," "harmful." Useful for prioritization and ethical work.

*Modal stance* — applying a frame about necessity and possibility. Slot values are "must," "should," "might," "cannot." Useful for strategic planning.

*Commitment stance* — applying a frame about willingness to act. Slot values are "I commit to this," "I'm exploring this," "I'm watching this," "I'm declining this." Useful for governance.

All of these would be different small frames in the library, each producing framing-events that look like "stances" in the shorthand sense. The architecture treats them uniformly. The user experience might present them as different kinds of marking — and each carries different entailments about what to do next.

**Why this matters for the architecture and the suggest-frames feature.**

Once you see that "stance" is shorthand for applying a specific frame, two architectural points get clearer.

First, the user's choice of which kind of stance to take is itself a framing choice. Marking something as "assumption" rather than "concern" or "must" is choosing the epistemic-stance frame over the affective-stance frame or the modal-stance frame. The suggest-frames feature could operate at this level: "you've marked twelve things as assumptions in the last week but you have no affective-stance framings — is the team's emotional alignment around this work visible to you?" That's a frame-level suggestion that operates on the meta-pattern of which kinds of small frames the user has been reaching for.

Second, the library structure has implications. Small frames (epistemic-stance, affective-stance, modal-stance, etc.) operate at the slot-on-a-claim level. Large frames (Lean Canvas, Wardley Map, Theory U) operate at the workspace level. They're both frames, but they have different scales of substrate they work on. The architecture should support this gracefully — a user can apply a small frame to a single object or a large frame to a collection of objects, and the framing-event has the same shape either way.

**The cleaned-up vocabulary.**

So the final stable vocabulary is:

*Frame* — the schema (epistemic-stance, Lean Canvas, etc.).

*Framing-event* — the instance of applying a frame to substrate.

*Stance* — shorthand for a framing-event using the epistemic-stance frame (or related small frames), where the position-value slot is the foregrounded content.

When the user "takes a stance," they're producing a framing-event using the epistemic-stance frame. The architecture stores the framing-event; the UI presents the stance value prominently because that's what the user cares about. The hidden frame is recoverable on inspection.

This also means the answer to your earlier question — whether `#assumption` is a slot — is now sharper. Yes, "assumption" is a value in the position-taken slot of the epistemic-stance frame. When the user types `#assumption`, they're filling that slot. The tag is shorthand for filling a slot in a specific frame. The architectural error in tools like Tana is conflating "shorthand for filling one specific slot in one specific frame" with "general-purpose label on an object." That confusion is what produced the substrate-cut flattening you were originally critiquing.

So stance is shorthand for a particular framing-event of a particular kind. The shorthand is fine to use, as long as the architecture knows what it's shorthand *for*. With these definitions stable, the rest of the design follows cleanly.

## User:

> 6/1/2026 14:30:08

so the vocabulary keeps shifting, I'm concerned Claudes context window is making this unmanageable. Earlier we had: Substrate, Framing, Projection, Sedimenting - now it's drifted to Frame, Framing-event (and I'll ignore stance).

## Assistant:

> 6/1/2026 14:30:33

You're right to flag this, and the concern is legitimate. Let me address it directly.

**What actually happened.**

The four-element vocabulary (substrate, framing, projection, sedimenting) and the three-term vocabulary I introduced later (frame, framing-event, stance) are not in conflict — they're at different levels of description, and I never made that explicit. That's the failure. Two coherent vocabularies were drifting in parallel without me reconciling them, which feels like instability even though it's actually layering.

Here's the reconciliation:

*Substrate, framing, projection, sedimenting* describe the **cycle** — what happens across time as the system operates. This is the four-element schema you settled on. It's about the *process*.

*Frame, framing-event, stance* describe the **objects** that the cycle operates on and produces. Frame is what gets applied. Framing-event is the act and its result. Stance is a value within certain framing-events. This is about the *things*.

In the cycle vocabulary: the substrate goes into a framing operation and a projection comes out, then sediments back. In the object vocabulary: substrate objects are taken up by applying a frame, producing a framing-event, which then becomes part of the substrate for the next cycle.

They're the same architecture described at two levels. Process vocabulary on one axis, object vocabulary on the other. Both are needed. Neither replaces the other.

**The mapping, made explicit.**

- *Substrate* (process term) = the substrate objects available at this cycle (claims, prior framing-events, other typed objects).
- *Framing* (process term) = the act of applying a frame to substrate, which produces a framing-event.
- *Projection* (process term) = the framing-event treated as output of this cycle.
- *Sedimenting* (process term) = the framing-event becoming part of the substrate available to the next cycle.

So a framing-event plays the role of "projection" in the cycle it was produced by, and plays the role of "substrate" in subsequent cycles. The object stays the same; its role changes depending on which cycle you're looking at.

This is the same self-similarity commitment from your earlier assumption: every projection is the same kind of thing as substrate, because they're the same object class playing different roles.

**Settled vocabulary, for the rest of this conversation.**

To prevent further drift, let me name what I'll use from here on:

- *Frame* — reusable schema in the library.
- *Framing-event* — instance produced by applying a frame to substrate.
- *Substrate* — the objects available at a given moment to be operated on (includes claims, framing-events from prior cycles, and other typed objects).
- *Framing* — the act/operation of applying a frame. Produces a framing-event.
- *Sedimenting* — the operation by which a framing-event becomes part of the substrate for the next cycle.

I'll drop *projection* as a distinct term because it was producing exactly the confusion you've named — it implied a separate object type when it's actually just "framing-event viewed from the next cycle's perspective." The cycle has substrate, framing, framing-event, sedimenting. Three states (substrate, framing-event-as-output, substrate-again-for-next-cycle) connected by two operations (framing, sedimenting). The "projection" was a phase, not a thing.

I'll also drop *stance* unless we're specifically talking about the epistemic-stance frame, since you said to ignore it. When we discuss framing-events generally, I'll just call them framing-events.

**About the context window concern.**

You're correct that long conversations make this harder to manage, and the proper response is exactly what you just did — flag drift when you see it and ask for reconciliation. I should have proactively reconciled the two vocabularies several turns ago rather than letting them drift in parallel. That's on me, not on the conversation length per se. Even in a fresh context, sloppy vocabulary introduction would have produced the same problem.

The recoverable move, if you want to keep going from here, is to treat the above five-term vocabulary as fixed and to push back immediately if I start sliding back into "projection" or other terms that we've now retired. The conversation can carry forward on a stable base from this point.

If you'd rather restart fresh on a specific piece of the design with the stable vocabulary in hand, that also works and might actually be cleaner. The full arc up to here is recoverable; the design work can resume on stable ground.

## User:

> 6/1/2026 14:35:53

is this duplicative of the terminology from conceptual blending or other traditions, such that we should use their terms?

## Assistant:

> 6/1/2026 14:36:57

Good question to ask before we lock the vocabulary, because borrowing established terms has real advantages — they carry decades of refinement and let people connect what you're doing to existing literature. Let me work through whether any tradition's vocabulary is close enough that we should adopt it wholesale.

**Conceptual blending (Fauconnier and Turner).**

Their vocabulary: *input spaces*, *generic space*, *blended space*, *projection* (in the technical sense of mapping elements from input spaces into the blend), *vital relations*, *compression*.

Mapping to your architecture: input spaces correspond roughly to your substrate objects being taken up by a framing-event. Blended space corresponds to the framing-event itself. The act of blending corresponds to your framing operation. Projection (their sense) corresponds to *which substrate elements get carried into the framing-event* — the selective import.

Where it fits: cleanly, for the act of producing a new framing-event from multiple inputs. Their analysis of selective projection, generic space, and emergent structure is exactly what your architecture needs once you take heterogeneous inputs seriously.

Where it doesn't fit: blending doesn't have a strong concept of *schema-applied-from-a-library*. Their input spaces are content, not reusable templates. The closest analog to your frame is what they call "frames" or "schemas" within an input space, but it's not their primary structural commitment. They also don't have a strong sedimenting concept — they're describing single blends, not how blends accumulate over time and feed into subsequent blends.

Verdict: borrow *input space* and *blended space* for the moments when you're describing multi-input framing-events specifically. Don't replace your whole vocabulary with it, because they don't carry your schema-vs-instance distinction or your temporal cycle.

**Frame semantics (Fillmore, Minsky).**

Their vocabulary: *frame*, *slot* (or *role*), *filler*, *frame instance* (or *frame element*). Sometimes *frame invocation* for the act of bringing a frame to bear.

Mapping: this is the closest match to your architecture, and the vocabulary is well-established and cleanly defined. Frame = your frame. Slots = the named positions in the schema. Fillers = the values placed in slots when a frame is applied. Frame instance = your framing-event. Frame invocation = your framing operation.

Where it fits: nearly everywhere. The schema-instance distinction is precise. The slot-and-filler structure is exactly your design. The vocabulary is widely known in linguistics, cognitive science, AI, and HCI, so it carries broad recognition.

Where it doesn't fit: frame semantics doesn't have a strong concept of *substrate-existing-before-framing*. Frames are invoked to interpret language or experience, but the underlying material is more diffuse than your discrete substrate objects. The vocabulary also doesn't have a sedimenting concept — frames are invoked, not recursively layered into substrate.

Verdict: this is the strongest candidate to adopt wholesale. *Frame*, *slot*, *filler*, *frame instance* are clean, well-known, and precise. You'd lose nothing by using them. The only place you'd need to extend is for the temporal cycle (substrate → framing → frame instance → sedimenting) and for the substrate concept.

**Phenomenology (Husserl).**

Vocabulary: *noesis* (the act of intending), *noema* (the object as intended), *hyle* (the raw sensory material), *intentional act*, *sedimentation*.

Mapping: noesis ≈ your framing operation. Noema ≈ your framing-event. Hyle ≈ your substrate. Sedimentation ≈ your sedimenting (Husserl's term is actually where this word comes from).

Where it fits: the cycle structure is closer than any other tradition. Husserl explicitly has substrate (hyle), the act (noesis), the result (noema), and sedimentation as the operation by which past acts shape current ground. Four-element schema, his vocabulary.

Where it doesn't fit: phenomenology is intensely philosophical and the terms carry a lot of baggage — committing to "noesis" and "noema" pulls you into Husserlian phenomenology in ways most readers don't want. The vocabulary also doesn't have schema-vs-instance built in; noesis is the act, but the "type" of act (what we'd call the frame being applied) isn't a primary structural element.

Verdict: borrow *sedimentation* (which you already are). Don't borrow noesis and noema unless your audience is philosophical, because the cost in baggage exceeds the benefit in precision.

**Yogācāra Buddhism.**

Vocabulary: *ālambana* (object-condition), *vijñāna* (consciousness/discrimination), *bīja* (seed), *vāsanā* (perfuming/karmic residue), *nimitta* (sign, appearance).

Mapping: ālambana ≈ substrate. Vijñāna ≈ framing operation. Bīja or nimitta ≈ framing-event. Vāsanā ≈ sedimenting. The fit is striking.

Where it fits: the cycle is fully present, with explicit attention to how past acts shape future substrate (vāsanā). The tradition is unusually clear about recursion and accumulation.

Where it doesn't fit: same problem as phenomenology, amplified. The vocabulary is Sanskrit, carries enormous religious and philosophical baggage, and is inaccessible to most audiences. Using it would signal a specific philosophical commitment that you probably don't want as the default reading of your architecture.

Verdict: useful for understanding the architecture, but not for naming it in a product or technical context.

**Cybernetics (Bateson, von Foerster, Spencer-Brown).**

Vocabulary: *system*, *observer*, *distinction*, *difference*, *feedback*, *re-entry*, *recursion*.

Mapping: distinction ≈ framing operation (in the Spencer-Brown sense). Feedback / re-entry ≈ sedimenting. Observer ≈ holder of a framing-event. System ≈ the recursive whole.

Where it fits: the recursion structure is well-handled. Spencer-Brown's re-entry is the most formal account of how outputs become inputs.

Where it doesn't fit: cybernetics doesn't have a strong concept of substrate as a layer of objects, or of frames as reusable schemas in a library. The vocabulary is process-heavy and object-light.

Verdict: borrow *re-entry* and *recursion* when you need formal precision about the cycle. Don't replace the object vocabulary with cybernetics terms.

**Predictive processing (Friston, Clark).**

Vocabulary: *prior*, *prediction*, *prediction error*, *generative model*, *precision-weighting*.

Mapping: prior ≈ accumulated sedimented substrate (what the framer brings in). Generative model ≈ the frame being applied. Prediction ≈ the framing-event. Prediction error ≈ the gap between framing-event and incoming material that drives the next cycle.

Where it fits: the cycle of expectation-and-update is well-handled. The notion that priors compound across cycles is exactly your sedimenting.

Where it doesn't fit: predictive processing is unconscious and continuous; your architecture is about deliberate, articulable, shareable framings. Borrowing the vocabulary would suggest a continuity that isn't actually present.

Verdict: useful conceptually, not as vocabulary.

**DSRP (Cabrera).**

Vocabulary: *distinction*, *system*, *relationship*, *perspective*; *point* and *view* within perspective.

Mapping: doesn't map cleanly to your architecture. DSRP is unpacking what happens *inside* a single framing operation (any cognitive act has D, S, R, P structure). It's at right angles to your cycle vocabulary.

Verdict: useful for understanding the internals of framing operations, not for naming the cycle.

**Where this leaves the vocabulary question.**

The strongest candidate for wholesale adoption is *frame semantics*. Its vocabulary (frame, slot, filler, frame instance, frame invocation) is well-established, precise, and matches your architecture closely. Two adjustments would be needed:

First, your *substrate* concept isn't quite present in frame semantics. You could borrow *content* or *referent* but neither is perfect. The honest move is to keep *substrate* as your term — it's clear, it's not overloaded, and it carries the philosophical weight from the four-element schema you developed.

Second, your *sedimenting* concept isn't in frame semantics either. The cleanest borrow is from Husserl directly — *sedimentation* is a real philosophical term with the right meaning, and it travels well into general usage without forcing readers into phenomenology. Using it is fine.

So the proposed reconciled vocabulary, drawing from established traditions where they help and keeping your terms where they're stronger:

*Frame* — the reusable schema (from frame semantics, Fillmore/Minsky).

*Slot* — a named position within a frame (from frame semantics).

*Filler* — a value placed in a slot when the frame is applied (from frame semantics).

*Frame instance* — the result of applying a frame to substrate (from frame semantics; replaces "framing-event" in my prior usage, which was more cumbersome).

*Framing* — the act of applying a frame, producing a frame instance (from frame semantics' "frame invocation" but shorter and more natural).

*Substrate* — the objects available to be framed at a given moment (your term, kept because it's clear and unattached).

*Sedimentation* — the operation by which frame instances become part of the substrate for subsequent framing (from Husserl, via you).

This is a six-term vocabulary, mostly borrowed from established traditions, with two terms (substrate and sedimentation) carrying through from your prior work because they're stronger than the alternatives. *Frame instance* replaces *framing-event*, *projection*, and the other variations that were drifting. *Filler* covers what we were calling stance-values and slot-fillers.

**Why this is better than inventing.**

Three reasons to adopt the borrowed vocabulary rather than continuing with novel terms.

First, frame semantics is widely known in cognitive science, AI, linguistics, and HCI. Anyone in those fields recognizes the vocabulary immediately. Building on it lets your architecture connect to existing literature without translation work.

First, the terms are well-defined. Frame, slot, filler, frame instance have been refined over decades. You inherit that precision instead of having to define your own terms from scratch.

Third, using established vocabulary reduces drift. Once we're using terms with external definitions, we can both reference those definitions and stop arguing about what each term means. The vocabulary is anchored outside the conversation, which prevents the kind of slippage you flagged.

**Where novel vocabulary is still justified.**

For the cycle structure (substrate → framing → instance → sedimentation → next substrate), no single tradition has the full vocabulary, so the assembly is yours. That's fine. The cycle is a real contribution of the architecture; combining frame semantics' object vocabulary with Husserl's process vocabulary gives you the full picture.

For the recursive self-similarity claim (every frame instance is a candidate substrate for subsequent framing), the language exists scattered across traditions (cybernetic re-entry, conceptual blending's hyperblending, Buddhist vāsanā), but no single term captures it cleanly. Your "self-similarity across levels" is a fine way to name it.

**The recommendation, concisely.**

Adopt frame semantics vocabulary (frame, slot, filler, frame instance, framing) for the object structure. Keep substrate and sedimentation for the cycle structure. Drop the experimental terms (framing-event, projection, others) that drifted through the conversation. The total vocabulary is six terms, mostly borrowed, with clear external references where helpful.

This is more grounded than inventing, more compact than drifting, and it gives you a stable base for the rest of the design work.

## User:

> 6/1/2026 14:52:25

If framing -> framing instance -> sedimentation -> next substrate
then whats the purpose of distinguishing between framing instance, sedimentation, next substrate?

## Assistant:

> 6/1/2026 14:52:56

Sharp catch. You're right to push on this — the three terms as I laid them out aren't actually doing three distinct jobs, and the architecture is cleaner if I admit it.

**What I was implicitly claiming.**

I described the cycle as if there were three different states after the framing operation: the frame instance (the output), the sedimentation (the operation of folding back), and the next substrate (the new starting point). That's three labels for what is essentially one object viewed from three temporal vantages.

The frame instance is the new object as it just came into being. The next substrate is the same object, available for the next framing operation. Sedimentation is the transition between those two vantages — but the transition is *no operation at all* in terms of the object. The object doesn't change. What changes is the role it plays in the next cycle.

So the cycle isn't substrate → framing → instance → sedimentation → next substrate. It's substrate → framing → instance, and the instance *is* part of the next cycle's substrate without any separate operation happening. The "sedimentation" I named as a fourth element was really just naming the fact that the cycle continues, which doesn't need its own term.

**What this means for the four-element schema.**

The four-element schema you built up earlier in the conversation — substrate, framing, projection, sedimenting — was honoring a real intuition but bloating it into four terms when the underlying structure is simpler. The honest count is:

*Two states*: substrate (objects available to be framed) and frame instance (the object produced by framing).

*One operation*: framing (which takes substrate and produces a frame instance).

*One structural property*: that frame instances are themselves substrate for subsequent framings, which is what makes the system recursive.

That's three terms, not four. The fourth term (sedimentation) was naming the recursion itself, but recursion is a property of how the architecture composes, not a separate element. It's the *consequence* of frame instances being addressable, persistent objects in the same namespace as everything else — they're available to subsequent framings because they exist in the workspace, full stop. No special "sedimenting" operation is doing additional work.

**The cleaner schema.**

Three elements, one of which is an operation:

*Substrate* — objects available to be framed.

*Framing* — the operation of applying a frame to substrate to produce a frame instance.

*Frame instance* — the object produced. Becomes substrate for subsequent framings by virtue of existing in the workspace, not by any separate operation.

The recursion is implicit in the fact that frame instances are objects, addressable in the same way as everything else. That's the whole point of the self-similarity-across-levels commitment from your earlier assumption: there's no special status for "raw" substrate versus "produced" substrate, because everything is just objects of various types, and any of them can be framed.

**Why I added the fourth element originally.**

The fourth element (sedimenting) was reaching for something real that the three-element version doesn't capture cleanly: *time* and *accumulation*. The intuition was that the substrate at cycle N is richer than the substrate at cycle 1, because all the framings done in between have left their traces. That intuition is correct, but it doesn't need its own term — it follows automatically from frame instances being persistent objects that accumulate over time.

If you want to talk about the temporal accumulation specifically, the right move is to say "substrate at time T includes all frame instances produced before T" rather than introducing a separate "sedimentation" operation. The accumulation is just what happens when frame instances are persistent. There's no separate verb.

**One thing genuinely worth distinguishing.**

There is a real distinction worth preserving, but it's not between frame instance and next substrate. It's between two kinds of references a new framing can make:

*Direct references* — the framing operates on substrate objects directly, treating them as the inputs to be framed.

*Background references* — the framing is shaped by prior frame instances that aren't directly being framed but are part of what the framer is bringing to the operation (the framer's accumulated horizon, the prior framings that have shaped how they see this material).

This is the distinction we surfaced when conceptual blending entered the conversation — the difference between input spaces (direct inputs to the blend) and the framer's background priors (Gadamer's horizon, Yogācāra's vāsanā). Both are present in the substrate at the next cycle, but they play different roles in the next framing operation.

This distinction is worth keeping because it has architectural implications: the explicit `inputs` slot in a frame instance captures the direct references, while the *implicit* shaping by prior frame instances that the framer brings in is harder to capture and might require a different mechanism. But it's a distinction between *kinds of substrate references*, not between *substrate and frame instance*.

**Stable, minimal schema.**

The cleanest version of what you've been building:

*Substrate* — the set of objects in the workspace at a given moment, including primitive content and all prior frame instances.

*Framing* — the operation of applying a frame to selected substrate objects, producing a new frame instance.

*Frame instance* — the new object produced. Joins the substrate. Becomes available to future framings.

That's it. Three terms, one operation, with recursion as an emergent property rather than a named element.

You were right that the four-element version was carrying redundancy. The honest version is three. Thank you for pushing — this is exactly the kind of correction that prevents the architecture from drifting under its own weight.

## User:

> 6/3/2026 10:54:20

very concisely, how does this schema relate to the traditions/practices

## Assistant:

> 6/3/2026 10:54:45

**Substrate, framing, frame instance** maps across the traditions like this:

*Frame semantics (Fillmore, Minsky)* — frame, frame invocation, frame instance. Direct match.

*Kant* — noumenon, the categories of understanding, phenomenon. Direct match.

*Husserl* — hyle, noesis, noema. Direct match.

*Maturana and Varela* — medium of perturbations, structural coupling, brought-forth world. Direct match.

*Yogācāra Buddhism* — ālambana, vijñāna, nimitta (with vāsanā as the accumulation that makes the next substrate richer). Direct match.

*Predictive processing* — sensory signal, generative model, perception. Direct match.

*Bateson and cybernetics* — territory, difference that makes a difference, map. Direct match, with re-entry as the recursion mechanism.

*Spencer-Brown* — unmarked space, distinction, marked space. Direct match.

*Conceptual blending* — input spaces, blending operation, blended space. Match, with the addition that blends recursively become input spaces (hyperblending), which is your self-similarity claim.

*Lakoff (conceptual metaphor)* — source domain, metaphorical mapping, target domain. Match.

*Goffman / sociological framing* — situation, framing activity, frame. Match.

*DSRP (Cabrera)* — doesn't map to the cycle; it unpacks the *internal* structure of the framing operation (every framing has distinctions, systems, relationships, and a perspective).

*Ericksonian / NLP metaphor* — content, metaphorical reframing, new construal. Match.

*Buddhist Madhyamaka* — the question of substrate itself; the school argues nothing has intrinsic essence (svabhāva), which is a *strong* reading of the schema where the substrate is always already cooked by prior cycles.

**The pattern.**

Every tradition that takes observer-dependence seriously converges on this three-element structure. The names differ; the architecture doesn't. The traditions disagree on three questions: how much the substrate is knowable independently, whether the framing operation is individual or social, and whether the recursion ever bottoms out in an unmediated layer. Your architecture stays neutral on all three, which is why the traditions can be drawn from selectively without committing to any one of them.

The convergence across this many traditions is the strongest evidence that the schema is naming something real rather than imposing a particular philosophical commitment.

## User:

> 6/3/2026 10:56:29

if the schema has three terms then is anything missingto show how the process works, i.e. how a frame instance joins the substrate

## Assistant:

> 6/3/2026 10:56:59

Yes, something is missing — and it's worth being explicit about it rather than letting it stay implicit. Let me work through what the three-term schema currently accounts for, what it doesn't, and whether the gap needs a new term or is handled by something already in the architecture.

**What the three-term schema accounts for.**

Substrate, framing, frame instance. The schema names what exists (substrate, frame instance) and what acts (framing). It implies that frame instances join the substrate because they're persistent objects in the same namespace, but it doesn't actually *describe the mechanism* by which that happens. The recursion is asserted as a property of the system, not explained as an operation.

This is exactly the gap you're flagging. "Frame instances become substrate for future framings" is a claim about the architecture's behavior. The mechanism that makes it true is unspecified.

**What the mechanism actually is.**

In the architecture as it stands, a frame instance joins the substrate by being *stored in the same workspace as other objects, with the same addressability, attribution, and reference structure*. There's no special operation that "promotes" a frame instance from output to substrate. The promotion is automatic because the frame instance is an object of the same kind as everything else, and "substrate" is just the name for "all the objects currently available to be referenced."

So the mechanism is: persistence plus uniform addressability. A frame instance is created, it lives in the workspace, future framings can reference it as an input. No additional operation is required.

But this mechanism *is* doing real work — it's not nothing. It's specifically the architectural commitment that frame instances are persistent, addressable, and indistinguishable from other substrate objects in terms of how they can be referenced. Without this commitment, recursion wouldn't work. The mechanism is implicit in the architecture's object model, but it's worth naming because it's the thing that makes the cycle close.

**Whether this needs a new term.**

There are two ways to handle the gap. The first is to leave the cycle's closure implicit and trust that "frame instances are first-class persistent objects" carries the weight. This is the minimal three-term version. The second is to make the closure explicit by naming the property of the architecture that allows frame instances to join substrate.

The second approach doesn't need a new *element* in the schema. The cycle still has three elements: substrate, framing, frame instance. What it needs is a name for the *architectural property* that lets the cycle close. Call this property *persistence* or *uniform addressability* or, most precisely, *substrate-grade status* — the property that frame instances are full citizens of the substrate from the moment they exist, not derived or secondary objects.

This is a structural commitment, not a process step. It says something about how the architecture is built, not about what happens in any given cycle. The cycle has substrate → framing → frame instance, and the architecture guarantees that the frame instance counts as substrate for the next cycle by virtue of how it was created.

**The honest minimum.**

So the schema doesn't need a fourth element to describe the cycle. It needs to declare *one architectural commitment* alongside the three elements:

*Substrate* — the objects available at a moment.

*Framing* — the operation of applying a frame to selected substrate, producing a frame instance.

*Frame instance* — the new object produced.

*Commitment: substrate-grade status* — frame instances are stored and addressed identically to other substrate objects, so they are available to future framings without any intermediate operation.

The first three describe the cycle. The fourth describes the architecture that makes the cycle recursive. They're not parallel; the fourth is a constraint on how the first three are implemented.

**Why this matters concretely.**

The substrate-grade commitment has real consequences that would otherwise need to be re-derived. It implies that:

Frame instances have identity, attribution, and time, just like other substrate objects.

Frame instances can be referenced, cited, framed, forked, and shared, just like other substrate objects.

There is no special "ephemeral output" status — every framing produces something durable.

The workspace at time T includes all frame instances produced before T, indistinguishable in citation rights from any other object.

The recursion is uniform across all levels — framing a frame instance works the same as framing a primitive content object.

Without naming this commitment, all of these properties have to be argued for one by one. With it named, they fall out automatically.

**Where this connects to the traditions.**

The substrate-grade commitment is the architectural form of what several traditions handle philosophically. Yogācāra's claim that bīja (seeds) deposited by mental acts become part of the next moment's substrate is exactly this — each act produces a seed of the same ontological grade as the conditions that produced it. Spencer-Brown's re-entry is the formal version: the form re-entering its own indicational space produces a new value that is full citizen of the calculus. Husserl's sedimentation has the same structure: prior intentional acts become part of the standing ground for future intentions without changing status.

What these traditions name philosophically, your architecture has to handle structurally. The three-term schema doesn't need a fourth element, but it does need to be paired with the structural commitment that closes the loop. Naming the commitment is what was missing.

**Concisely.**

The schema is substrate, framing, frame instance — three elements. The cycle closes by virtue of frame instances being substrate-grade objects from the moment they exist. That last clause isn't a fourth element in the cycle; it's the architectural property that makes the cycle recursive. Name it explicitly alongside the three elements and the picture is complete.

## User:

> 6/3/2026 10:59:59

another solution is to define the substrate so that it's clear it's composed of 'objects' (or some specified term) where 'frame instance' is a kind of 'object' and the other 'object's are ???

## Assistant:

> 6/3/2026 11:00:43

Yes — this is actually the cleaner solution, and it's worth taking seriously because it dissolves the closure problem by getting the substrate's definition right, rather than by adding architectural commitments alongside the schema.

**The shift.**

Instead of: substrate, framing, frame instance, plus a commitment that frame instances are substrate-grade.

You define: the substrate is composed of *objects*, and frame instances are one type of object. Then the closure is automatic because frame instances were never *not* substrate-grade — they're objects, like everything else in the substrate. The cycle closes by definition, not by an external commitment.

This is structurally cleaner because it puts the type-theoretic work in the right place. The substrate is a *collection of objects*. Frame instances are a *kind of object*. Therefore frame instances are part of the substrate the moment they exist. No additional language needed.

**What this requires you to do.**

You need a typology of objects — a clear answer to "what other kinds of objects are in the substrate besides frame instances?" The traditions and the architecture suggest several categories worth considering. I'll work through them and then propose a clean set.

**Candidate object types.**

*Primitive content objects.* The raw material the user brings in — a text claim, a quote, a piece of data, a customer record, a file. Things that don't have a frame structure but are referenced by framings. In the heterogeneous-substrate assumption from earlier, this category includes spreadsheets, emails, kanban cards, people records, and so on.

*Frame instances.* The objects produced by applying frames to substrate. They have slot structure, authorship, time, references to other objects, and so on. They're substrate-grade because they're objects.

*Frames themselves.* Frames are objects in the workspace (or at least in the library). They have authorship, version, slot structure, fit characterization. They can be referenced by frame instances (every frame instance points at the frame it instantiates) and they can be the substrate of further framings (you can take a stance on a frame, propose a new version, fork it).

*References.* Pointers from one object to another. A frame instance references its substrate inputs; one frame instance references another in its responds-to slot. Whether references are themselves objects (with identity, authorship, time) or just attributes of other objects is a design choice. The cleaner architecture treats them as objects, because then they can be referenced and framed in turn.

*Compositions or collections.* Sometimes you want to refer to a set of objects as a unit — "all the customer interview notes from May," "the cluster of claims about pricing." Whether this is a separate object type or just a query result is also a design choice.

That's roughly the typology. The substrate consists of these kinds of objects, all uniformly addressable, attributable, referenceable.

**A clean naming.**

The most established vocabulary for this kind of typology comes from a few sources worth knowing about.

*RDF / linked data.* Resources, properties, and statements. Everything is a resource (object), properties connect resources, statements assert that a resource has a property with a value. RDF's commitment is *everything is a resource*, which is structurally identical to your "everything is an object" move.

*Object-oriented data modeling.* Objects, classes, instances, references. The vocabulary is well-known but heavy with programming-language associations that might not fit your conceptual framing.

*ECHO / DXOS.* Objects, with type schemas and references. Closer to what you'd actually implement, and aligned with the platform commitment from earlier.

*Conceptual blending.* Spaces, with elements and relations. The "everything is a space" move is similar to "everything is an object" but the term *space* carries connotations of context and content that *object* doesn't.

*Frame semantics.* Frames, slots, fillers, instances. Doesn't really have a parent category that contains all of them as members.

The cleanest move is probably to use *object* as the base type, because it's neutral, widely understood, and doesn't pull in specific theoretical commitments. RDF's *resource* is more precise but less familiar. *Element* is also possible but feels less concrete than *object*.

**Proposed typology, cleanly.**

The substrate is a collection of *objects*. Objects come in several types:

*Content objects* — primitive material brought into the workspace by users or imported from elsewhere. Text claims, spreadsheets, customer records, emails, files. These don't have frame structure.

*Frame instances* — objects produced by applying a frame to substrate. They reference the frame applied, the substrate inputs, the slot fillers produced, and metadata like author and time.

*Frames* — reusable schemas in the library. They have slot specifications, fit characterizations, and so on. They're objects because they have identity, authorship, version, and can be referenced and framed in turn.

*References* — pointers from one object to another, treated as objects in their own right so they can be referenced and framed.

(*Collections* are optional — whether they're separate objects or query results is a downstream design choice.)

All four types are *objects*, meaning they share certain properties: identity, attribution, time, addressability, ability to be referenced by other objects. The substrate is the set of all current objects, regardless of type.

**The schema, with this typology in place.**

Now the cycle is cleaner. Substrate is defined as the set of objects in the workspace. Framing is the operation that produces a new object (specifically, a frame instance) from existing objects. Frame instances are objects, therefore they join the substrate automatically.

The three-element schema stays at three elements. The closure problem disappears because it was a category error — frame instance and substrate aren't different categories; frame instance is a member of the substrate from the moment it exists.

If you want to be maximally precise, you can say:

*Substrate* — the set of all objects currently in the workspace.

*Framing* — the operation that takes one or more substrate objects as input and produces a new object (a frame instance) as output.

*Object* — the unit of the substrate. Comes in types: content, frame, frame instance, reference.

And that's the whole architecture at the abstract level. Three terms in the cycle; a typology of objects underlying the substrate; no separate operations needed to close the loop.

**Why this is better than the previous solution.**

The previous solution (adding a "substrate-grade commitment" alongside the three elements) was a workaround. It was naming the closure mechanism without putting it in the right structural place. Your solution puts it in the right structural place — in the *type system* — and the closure becomes definitional rather than asserted.

This also matches how the underlying implementation will actually work. If you're building on DXOS or a similar platform, you have an object model with types. Frame instances are a type. Content is a type. References are a type. The substrate is the universe of objects across all types. The architecture's behavior is determined by the type system, not by separate commitments layered on top.

**A subtler payoff.**

This also clarifies what *kind of question* "what makes a frame instance substrate?" is. It's not a question about process or operation. It's a question about *types*. The answer is: frame instances are a subtype of object, and substrate is defined as the set of objects, therefore frame instances are substrate. The question dissolves once the typology is explicit.

This is one of those situations where the right architectural move is to refuse the question by defining the terms so that the question doesn't arise. You did exactly that. The three-element cycle is correct, but it only fully works once "substrate" is defined as composed of typed objects with frame instances as one of the types.

**Concisely.**

The schema is substrate (a set of objects), framing (an operation that produces a new object from substrate), and frame instance (the kind of object produced). Objects come in types: content, frames, frame instances, references. Frame instances are objects, so they join the substrate by definition the moment they exist. The cycle closes through the type system, not through a separate operation or commitment. Three elements, four object types, no additional structure required.

This is the cleanest formulation we've reached. It's what should be locked in.

## User:

> 6/3/2026 11:07:24

before advancing. some constraints for creating our specifications (which is what i'm doing)

* specification is not coupled to a specific implementation; it's abstract and can be transformed into a specific implementation (e.g. could be transformed to work in DXOS or with RDF - but the specification is not DXOS or RDF)
* include collections
* look at using DAG (graph, node, edge)
* unpack the delta between this spec and conceptual blending

## Assistant:

> 6/3/2026 11:08:28

Good constraints. Let me work through each in order, then propose the revised specification.

**Constraint 1: specification is implementation-neutral.**

This means the vocabulary has to be abstract enough that it doesn't pre-commit to RDF triples, DXOS objects, ECHO schemas, or any other specific representational choice. The specification describes *what kinds of things exist and how they relate*, not how they're stored, addressed, or synchronized.

The practical implication is that we should avoid terms that carry implementation baggage. "Object" is mostly neutral but has weak object-oriented-programming associations. "Resource" pulls toward RDF. "Entity" is the cleanest implementation-neutral term — it's used across data modeling, philosophy, and software architecture without committing to a particular implementation. I'll use *entity* as the base type term going forward.

This also means the specification should describe properties (identity, attribution, time, references) without specifying *how* they're realized. An entity has identity, but the specification doesn't say whether that's a UUID, a content hash, a path, or a CRDT actor-id. The implementation decides.

**Constraint 2: include collections.**

Collections are real and worth including. They cover several distinct needs:

A user wants to refer to a group of entities as a unit ("the customer interviews from May," "the cluster of claims about pricing"). The collection is then itself something that can be framed or referenced.

A frame instance might need to reference multiple substrate inputs as a meaningful group rather than as a flat list — for example, "I'm framing *these three claims together* as a contradiction." The grouping carries meaning the flat list wouldn't.

The framing operation might produce outputs that are themselves collections — applying a clustering frame produces a collection of clusters, each itself a collection of entities.

So collections need first-class status. A collection is an entity that has, in addition to the standard entity properties, a *membership* — references to the entities it contains. The membership can be defined extensionally (a fixed list of members) or intensionally (a query or rule that defines membership dynamically). Both kinds exist in practice.

The cleanest specification treats *collection* as an entity type alongside the others, with membership as the distinguishing property.

**Constraint 3: use DAG vocabulary (graph, node, edge).**

This is a significant structural commitment and worth thinking through. A directed acyclic graph (DAG) gives you:

*Nodes* — discrete units, each with identity.

*Edges* — directed relationships between nodes, each with identity and type.

*Acyclicity* — the constraint that no node can reach itself by following edges in the direction they point.

For your specification, this maps cleanly:

Entities are *nodes*. Each entity (content, frame, frame instance, collection) is a node with identity.

References are *edges*. A frame instance referencing its substrate inputs is a set of typed directed edges from the frame instance node to the input nodes. A frame instance referencing its frame is a typed directed edge.

The DAG constraint (acyclicity) is a real architectural commitment: it means a frame instance cannot reference itself, directly or transitively, in its inputs. This is exactly the constraint that makes the system well-founded and free of paradox.

This vocabulary has three advantages over the entity-and-reference vocabulary I was using before. First, it's more general and widely understood — graph theory is a stable language across many domains. Second, edges are first-class, which they should be (a reference is a thing with identity, type, attribution, and possibly its own metadata, not just an attribute on a node). Third, the DAG constraint is explicit and structurally enforced rather than left implicit.

There's a subtlety worth naming. The DAG describes the *production* relationships — how new nodes are derived from older nodes. The DAG doesn't have to describe *all* relationships in the system. Users might also reference one node from another in non-production ways (a citation, a "see also," a comment) that don't need to respect acyclicity. So the specification should distinguish:

*Production edges* — the edges that capture how a node was derived from other nodes. These must respect acyclicity. They form a DAG.

*Reference edges* — other directed relationships between nodes that don't represent derivation. These can be cyclic; they're just citations or annotations.

Both are edges with identity and type, but they participate in different structural constraints.

**Constraint 4: unpack the delta between this specification and conceptual blending.**

Conceptual blending and your architecture are doing closely related work, but they're not identical. Naming the delta sharpens both.

*What they share.*

Both treat cognition as taking multiple inputs and producing a structured output that has properties not in any single input. Both treat the output as available to be input to further operations (Fauconnier and Turner's hyperblending; your recursion). Both have selective projection from inputs into the output (their elements-projected-into-blend; your slot fillers drawn from substrate). Both acknowledge that the output is shaped by something beyond just the inputs — for them, the generic space and background knowledge; for you, the frame being applied.

*Where they differ.*

The most significant delta is *the role of the frame*. In conceptual blending, the structure of the blend is produced through a complex interaction of inputs, generic space (the abstract structure shared by inputs), and a process of composition, completion, and elaboration. There is no separate, named, reusable "frame" being applied — the structuring emerges from the blending operation itself.

In your specification, the frame is *primary*. A frame is a named, reusable, library-resident schema that *governs* the structuring. Applying a Lean Canvas frame to substrate isn't blending; it's invocation of a specific schema. The slots are predetermined; what gets filled in is the new content. The selective projection isn't a property of the blending operation — it's a property of which frame was applied.

This is a real philosophical difference. Conceptual blending treats structuring as *bottom-up emergent* from the interaction of inputs. Your specification treats structuring as *top-down imposed* by the frame chosen. Both are right about different cognitive phenomena. Conceptual blending describes how novel meaning arises in language and imagination — where there isn't a pre-existing template, and structure has to emerge. Your specification describes deliberate, methodological work — where the practitioner is choosing which template to apply.

A second delta is *the library of frames*. Conceptual blending doesn't have an analog to the methodological library. Every blend is fresh. Your specification commits to a curated set of named, characterized schemas that can be selected, recommended, and applied repeatedly. This is part of what makes your architecture a *workbench for methodological work* rather than a model of general cognition.

A third delta is *attribution and time*. Conceptual blending is largely atemporal and non-attributed — it's a model of how blends are *constructed*, not of how communities of practitioners maintain attributed records of their blends over time. Your specification has every node attributed and timestamped, with the whole DAG of derivations preserved.

A fourth delta is *the explicit substrate*. Conceptual blending starts with input spaces that are already mental constructs. Your specification has a substrate of objects in a shared workspace, including primitive content brought in from outside. The substrate has its own existence prior to and independent of any framing.

*What your specification could borrow.*

A few elements of conceptual blending that strengthen your specification if incorporated explicitly:

*Generic space.* When a framing operation takes multiple substrate inputs, what abstract structure do they share that makes them blendable? In Lean Canvas terms, what makes a set of customer interviews blendable into a "customer segment" slot? Fauconnier and Turner would say: a generic space that captures what these inputs have in common at an abstract level. Your specification could acknowledge this by allowing the framing operation to reference a generic space — the abstract pattern the inputs share that makes them coherent inputs to this frame.

*Selective projection.* Each substrate input contributes only *some* of its content to the frame instance. Your specification should explicitly capture which elements of each input were taken up. This is the conceptual-blending insight that frame instances aren't built from whole substrate objects but from selected projections of them.

*Emergent structure.* The frame instance contains content not in any input. Your specification should distinguish *what came from substrate inputs* (with attribution back to which input) from *what was introduced by the framing operation itself* (often produced by AI inference or by the frame's own rules). These are different ontological statuses and worth separating.

*Composition, completion, elaboration.* Fauconnier and Turner distinguish three stages: composition (combining selected elements), completion (filling in implicit material from background knowledge), and elaboration (running the blend to see what it implies). Your specification could distinguish what was *combined*, what was *completed* (inferred), and what was *elaborated* (derived by running the frame's logic). This is finer-grained than just "filling slots."

**Proposed revised specification.**

Drawing all four constraints together, here's a tighter specification:

*Entity.* The unit of the substrate. Has identity, attribution, timestamp. Comes in types.

*Entity types.*

- *Content* — primitive material with no internal frame structure. Includes text, structured data, files, records, references to external systems.
- *Frame* — a reusable schema in the library. Defines a slot structure, fit characterization, selection profile, entailment commitments, and temporal-causal profile.
- *Frame instance* — produced by applying a frame to substrate. Carries the frame applied, the substrate inputs, the slot fillers, and metadata about how the fillers were produced (combined, completed, elaborated).
- *Collection* — a group of entities treated as a unit. Has membership (extensional or intensional).

*Graph structure.*

- *Node* — every entity is a node in the graph.
- *Edge* — directed, typed relationship between nodes. Has identity.
- *Production edges* — edges representing how a node was derived from other nodes (substrate inputs of a frame instance, members of a collection). Must form a DAG.
- *Reference edges* — other directed relationships (citations, see-alsos, comments). Need not respect acyclicity.

*Operation.*

- *Framing* — the operation of producing a new frame instance node by applying a frame to selected substrate entities (and possibly a declared generic space). Creates the frame instance node, production edges from it to its substrate inputs and to the frame applied, and the slot fillers. Records what was combined from inputs, what was completed by inference, what was elaborated by the frame's logic.

*Properties of the system.*

- *Closure*: frame instances are entities and therefore part of the substrate by definition. No additional operation is needed for them to be available to future framings.
- *Recursion*: any entity, including a frame instance, can be substrate for further framings.
- *Acyclicity*: production edges form a DAG. Frame instances cannot transitively depend on themselves.
- *Attribution and time*: every entity and edge has authorship and timestamp.

**Concisely.**

Four entity types (content, frame, frame instance, collection), connected by typed edges (production edges forming a DAG, reference edges unrestricted), with one operation (framing) that produces a new frame instance from substrate. The closure is structural — frame instances are entities, entities are substrate, no additional commitment needed. The delta from conceptual blending is that frames are reusable named schemas in a library, and the framing operation is *invocation of a frame* rather than *bottom-up emergent blending*. The specification borrows selective projection, generic space, and the composition-completion-elaboration distinction from conceptual blending to capture how slot fillers actually relate to substrate inputs.

This is implementation-neutral, includes collections, uses DAG vocabulary, and is explicit about its differences from conceptual blending. It's also stable in a way the earlier vocabulary wasn't.

## User:

> 6/3/2026 11:15:07

re: DAG and production - DAG is independent of production, reference, etc. For instance, Tana is a tree (a subset of DAG) and can be used as a note taking tool. The relationships of production, reference can be solved by typed edges. Re-evaluate use of DAG and identify if DAG is not a fit

Re: comparison with conceptual blending. Is this session claiming that conceptual blending as silent in an example of cognition that involves Lean Startup Canvas ? I am dubious about that claim. Instead, how does conceptual blending use a pre-existing 'frame' like Lean Startup Canvas in cognition?

## Assistant:

> 6/3/2026 11:16:00

Both are good corrections. Let me work through each carefully because they're substantive, not just terminological.

**On DAG.**

You're right. I conflated two separate questions: *what is the graph structure of the architecture* and *what relationships exist between nodes*. They're orthogonal.

The graph structure is a property of how entities relate to each other in the system. Tana is a tree (every node has one parent), which is a constrained DAG. A more general system would allow nodes to have multiple parents (still a DAG, but not a tree). A still more general system would allow arbitrary directed graphs, with cycles permitted. Each is a different structural choice.

The relationships between nodes — production, reference, citation, comment, derivation — are *types of edges*. They're encoded in the edge type, not in the graph topology. Production edges, reference edges, citation edges all coexist in the same graph; what makes them different is their type, not their structural role.

So the question "is the graph a DAG?" is independent of the question "what kinds of edges exist?" I was treating production edges as definitionally constituting the DAG, which was wrong.

The real question is whether *some subset of edges* in the architecture should be required to be acyclic. The candidates:

*Production edges* (a frame instance was produced from substrate inputs): should these be acyclic? Probably yes, because a frame instance shouldn't be produced from itself, directly or transitively. Allowing cycles here means you could have a frame instance whose production depends on its own existence, which is paradoxical.

*Reference edges* (this node cites or refers to that node): no constraint needed. Cycles are fine. A claim can reference another claim that references it back.

*Membership edges* (this node is a member of that collection): should these be acyclic? Probably yes for similar reasons — a collection shouldn't contain itself.

*Frame application edges* (this frame instance instantiates that frame): probably acyclic, but trivially so because frames and frame instances are different types.

So acyclicity is a constraint on *certain edge types*, not on the graph as a whole. The cleaner statement is: the graph is a typed directed graph, with acyclicity constraints applied to specific edge types (production, membership) where cycles would be paradoxical, and no acyclicity constraint on other edge types (reference, citation, comment, "see also").

This is more general than calling the whole thing a DAG. It's a *typed directed graph with per-edge-type integrity constraints*.

Whether DAG vocabulary fits at all depends on whether you want to foreground acyclicity. For some entity types (frame instances, collections) acyclicity matters and DAG vocabulary is useful for that subgraph. For the overall system, a *typed directed graph* (or just *typed graph*) is the more accurate description. DAG is too restrictive as a description of the whole.

The revised graph-level vocabulary:

*Node* — every entity is a node.

*Edge* — typed directed relationship between nodes.

*Edge types* — production, membership, reference, frame-application, and others as needed. Each edge type has its own integrity rules.

*Acyclicity constraint* — applied to specific edge types where it's meaningful (production, membership). Not a property of the whole graph.

This is cleaner and doesn't pre-commit to a structural shape that doesn't fit all the edges.

**On conceptual blending.**

You're right to push back. I was claiming or implying that Lean Canvas is "not blending" because it has a pre-existing frame, and that's wrong. Conceptual blending absolutely operates when a practitioner uses Lean Canvas. The question is *how*, and I undersold it.

Let me work through what's actually happening when someone applies Lean Canvas to a business opportunity.

The practitioner has a body of substrate — interviews, observations, intuitions about a possible product. They're applying Lean Canvas to it. From the conceptual-blending perspective, several spaces are in play:

*Input space 1: the Lean Canvas frame itself.* The canvas is a structured mental space with named positions (problem, customer segment, value proposition, etc.) and abstract expectations about what fills each (a "customer segment" is a specifiable group of people with shared characteristics, a "value proposition" is a benefit-claim, etc.). The frame *is* a mental space, with its own structure, in the conceptual-blending sense.

*Input space 2: the practitioner's substrate.* The interviews, observations, ideas — also a mental space, with its own structure (who said what, what stood out, what felt important).

*Generic space.* What's shared between the Lean Canvas frame and the substrate that makes them blendable? Something like: a commercial enterprise involving humans, problems, exchanges, and value. This is the abstract structure both spaces share, which licenses the blending.

*Blended space.* The filled-in canvas. It contains content drawn from the substrate (the actual customers, the actual problem, the actual value proposition) structured according to the canvas's slot organization. Crucially, it contains *emergent content* that wasn't in either input: the *unified picture* of this specific business opportunity expressed in Lean Canvas terms. That unified picture is a new thing — neither the canvas nor the raw substrate had it.

So the framing operation in your architecture is not just slot-filling; it's a *conceptual blend* in the technical Fauconnier-and-Turner sense, where the frame and the substrate are two input spaces, the generic space licenses the blend, and the frame instance is the blended space.

This is a more accurate picture than what I'd been describing. The frame doesn't just "structure" the substrate. It *blends* with it. The result has emergent properties because composition, completion, and elaboration are happening as the blend forms.

**What this changes about the specification.**

The framing operation is not "apply a frame to substrate to fill its slots." It's "blend a frame with a substrate selection to produce a new frame instance that has emergent content drawn from both inputs and from inferred completion."

The slot fillers in the frame instance aren't just direct copies of substrate content. They're the result of:

*Composition* — combining elements from the frame (its slot structure, its constraints on what kinds of things go in which slots) with elements from the substrate (the actual content available).

*Completion* — filling in implicit material from the practitioner's background knowledge or, in your architecture, from AI inference. When the canvas asks for "customer segment" and the substrate has interviews but no explicit segment definition, the completion step is *constructing* a segment characterization that wasn't in the substrate directly.

*Elaboration* — running the blend to see what it implies. The filled canvas, once produced, can be examined for what it says about the business — implications that weren't visible in the substrate or in the empty canvas, only in their combination.

Each of these is a substantive cognitive step. The frame instance is the result of all three, and the specification should distinguish them because they have different ontological status.

**What this means for the architecture.**

The frame instance, as an object, should carry traces of all three steps:

*Compositional content* — slot fillers that come directly from substrate inputs, with attribution back to which substrate element they came from and what was selected from it (the selective projection).

*Completed content* — slot fillers produced by inference (AI, practitioner judgment, frame defaults) that aren't directly attributable to substrate inputs.

*Elaborated content* — implications, contradictions, gaps that became visible after the blend was assembled. These often appear as new claims or new framings produced *from* the blend, rather than as content of the original frame instance.

Distinguishing these matters because they have different evidentiary weight. Compositional content is grounded in substrate. Completed content is inferential and should be marked as such. Elaborated content is interpretive and may be contested.

**The delta with conceptual blending, restated.**

So the actual delta isn't "your architecture uses pre-existing frames, conceptual blending doesn't." That was wrong. The actual delta is narrower and worth naming precisely:

*Conceptual blending* describes how cognition produces structured meaning by blending mental spaces. It includes the case where one input space is a pre-existing frame from a library — that's a normal case, not an exception. The theory is general.

*Your specification* commits to two specific features that conceptual blending doesn't require:

First, frames are *first-class shared artifacts* — named, versioned, library-resident, attributable, forkable. In conceptual blending, frames are mental spaces that may or may not be socially shared; your architecture makes them explicitly social and persistent.

Second, frame instances are *persistent, attributed, addressable objects in a shared workspace*. In conceptual blending, blends are cognitive constructions that may or may not be externalized. Your architecture externalizes them as objects that can be referenced, framed further, shared, and inspected.

So the delta isn't about cognition — your architecture's framing operation *is* a conceptual blend. The delta is about what gets *made durable and shareable*. Your architecture is essentially a system for externalizing and persisting conceptual blends in a way that makes them collaborative, traceable, and recursively composable.

That's a more honest and useful framing of the relationship.

**Concisely.**

DAG was too restrictive — the architecture is a typed directed graph with acyclicity constraints on specific edge types (production, membership), not on the whole graph. Edge type, not graph topology, encodes the relationship semantics.

Conceptual blending is not silent on the Lean Canvas case — it's actively in play, with the frame as one input space, the substrate as another, the generic space licensing the blend, and the frame instance as the blended space. Your architecture's framing operation is a conceptual blend. The delta from conceptual blending isn't about cognition; it's that your architecture externalizes blends as persistent, shareable, attributed objects in a workspace, and makes frames first-class library artifacts. That's the contribution, and it's a real one — but it's built *on top of* conceptual blending, not in opposition to it.

## User:

> 6/3/2026 11:25:02

Claude - from now on, work on the problems with me and do not deliver work on the consequences until i have approved, e.g. i am asking about DAG - you proposed a solution, and then delivered a revised vocab. don't deliver revised vocab until i agree

the graph: allowing cyclic and acyclic is more complicated that restricting to acyclic. what is the benefit, what is the problem to be solved ,that makes adding cyclic a solution

re conceptual blending: Claude claims that 'framing' is now a blending of two spaces and and the generic input space, where one of the spaces has a pre-defined frame. Given this structure it is possible that this system could blend two input spaces where neither are frames. As a result, anchoring terminology on 'frames' is excluding the more general case of blending and it appears the blending terminilogy is more general and usable.

## Assistant:

> 6/3/2026 11:25:24

Understood on the working style. I'll stop before delivering downstream work and check in on the question itself.

**On the graph: what's the actual benefit of allowing cyclic edges?**

Let me think through this honestly rather than assert. The benefit only matters if there are real relationships in the architecture that *cannot* be expressed without cycles. If everything can be expressed as a DAG, the additional complexity of allowing cycles is unjustified.

Candidate cases where cycles might seem necessary:

*Mutual citation.* Claim A cites Claim B, and Claim B cites Claim A. This appears cyclic, but it's not — these are two separate edges going in opposite directions. The graph is still acyclic if you treat each edge as one-directional. The "cycle" is an illusion from thinking of citation as symmetric.

*Conversational reference.* A stance responds to a prior stance, and later the prior stance is updated to acknowledge the response. Again, this is two distinct edges in time, not a cycle. The later update is a new node, not a modification of the original.

*Living mutual definition.* Two concepts that define each other (predator-prey, supply-demand). But in your architecture, these would be two nodes with edges between them, and the edges represent the *current* relationship at a moment in time. Updates create new nodes.

I can't think of a case in your architecture where a *true cycle* (a node transitively reaching itself through edges) is necessary or even useful. Every apparent case I can construct turns out to be either two separate edges or sequential states that produce new nodes.

So the honest answer to your question is: I don't see a benefit to allowing cyclic edges that justifies the complexity. Restricting the whole graph to acyclic appears to be the right move. The earlier separation I proposed between "production edges (acyclic)" and "reference edges (no constraint)" was unmotivated — I was preserving an option I couldn't justify.

The full graph as a DAG is simpler and I can't find a case it breaks. Do you have a case in mind where cycles would be necessary?

**On conceptual blending: the case where neither input space is a frame.**

You're right, and this is a real correction. If the architecture's framing operation is a conceptual blend, and conceptual blends can have input spaces that are not pre-existing frames, then anchoring the architecture's vocabulary on "frames" excludes cases that the architecture should support.

Examples of blends without a pre-existing frame as input:

*Two substrate claims being blended.* Two customer interview excerpts blended to produce a synthesized observation that wasn't in either alone. Neither input is a frame; the synthesis is the blend.

*A substrate object blended with another substrate object.* A pricing spreadsheet blended with a customer record to produce a per-customer price analysis. Neither is a frame.

*Two frame instances blended.* Two prior framings of the same substrate, blended to produce a synthesized view that takes elements from both. Neither input is a "frame" in the library sense — they're frame instances.

In all of these, blending is happening, structuring is being produced, a new node is being created, but no library frame is being invoked. The architecture should handle these cases, and the vocabulary should support them.

The implication: "framing" is too narrow as the name for the operation. The more general operation is *blending*, with the input spaces being any combination of substrate entities, and "applying a frame from the library" being one specific kind of blending (where one input space happens to be a library frame).

This is a real reframing of the architecture. It's not just a vocabulary swap; it's a recognition that the operation is more general than I'd been describing.

Before I work on consequences: do you want to confirm that blending should replace framing as the primary operation name, with frame-application becoming a subtype? And do you want to keep "frame" as the term for library-resident schemas, or does that need to change too?

## User:

> 6/3/2026 11:27:14

confirmed that blending should replace framing, and frame-application becomes a subtype. Keep frame as the term for library resident schemas

## Assistant:

> 6/3/2026 11:27:30

Confirmed. Working from here with:

- *Blending* as the primary operation.
- *Frame-application* as a subtype of blending (the case where at least one input is a library frame).
- *Frame* still meaning a library-resident schema.

Before I work on consequences, a few questions are worth surfacing because they affect the rest of the specification and I'd rather check than guess.

**Question 1: What are the input spaces to a blend?**

Conceptual blending traditionally has at least two input spaces. Some questions about your architecture:

- Are exactly two inputs required, or can a blend have N inputs (N ≥ 2)?
- Can a blend have a single input? (This would be a degenerate case — essentially a transformation of one entity into a new entity. Conceptual blending doesn't really cover this, but your architecture might want to.)
- Are the inputs always entities (nodes in the graph), or can other things be inputs?

**Question 2: What about the generic space?**

In Fauconnier and Turner, the generic space is the abstract structure that the input spaces share, which licenses the blend. Two sub-questions:

- Should the generic space be an explicit node in the architecture, or is it implicit / inferred?
- If explicit, who creates it — the user, the AI, or is it computed?

I have a tentative view but want to check before specifying.

**Question 3: What's the output of a blend?**

In conceptual blending, the output is the "blended space" — a new mental space with structure drawn from inputs plus emergent content. In your architecture:

- The output is a new entity (a node in the graph). What's its type? Previously I was calling outputs "frame instances," but if blending is the general operation and frame-application is a subtype, then frame instance only describes the output of one kind of blend. What's the general term for the output of any blend?

**Question 4: The frame-application subtype.**

If frame-application is a subtype of blending, then frame-application is just "blending where one input is a library frame." This has implications:

- Is the frame always the *first* input or does its position not matter?
- Does frame-application have any properties or constraints that general blending doesn't? (For instance, frame-application might be required to fill the frame's declared slots, while general blending has no slot structure to fill.)

**Question 5: Whether to keep "framing" anywhere.**

Even if blending is the primary operation, "framing" is a useful word in English for what people do when they apply a perspective. Should we:
- Drop "framing" entirely from the specification?
- Keep it as informal synonym for frame-application?
- Keep it for the UI but not the spec?

I want to confirm direction on these five before I go further. The biggest ones are probably question 3 (what to call the output of a blend generally) and question 2 (whether generic space is explicit).

## User:

> 6/3/2026 11:34:27

Q1) can have N inputs; yes allow for single input for now, i don't know what it is though; what other entities would there be, e.g. edges?
Q2) I dont' know, we need to work through examples to see 
Q3) is there precedent for naming - i.e. when a blend creates an output space, it must be joining with other ??? in a persons perception; does conceptual blending (or it's descendants) address this (ala the output space joins with other ...) and if not, then lets start by drawing on other traditions
Q4) position doesn't matter; general blending has a notion of filling slot structures in that the example of Lean Canvas as a frame results in attempting to fill in the 'slots' in the lean canvas during the blend
Q5) framing becomes a specific type of blend (i.e. a blend where 1 input is a frame). How does blending address 'applying a perspective' - is it always with a frame/mental model?

## Assistant:

> 6/3/2026 11:35:28

Good. Let me work through each before committing to specification, because there are real questions to think about, not just answers to deliver.

**Q1 follow-up: what other entities besides nodes could be inputs?**

You raised the right question. Let me think through what else could be an input to a blend.

*Edges as inputs.* In principle, yes — an edge has identity and meaning, and a blend could take an edge as input. Example: "the disagreement between Sam's stance and my stance" is a thing, and a new blend could operate on that disagreement itself rather than on the stances individually. The edge representing the disagreement is the input.

Whether this is actually useful depends on how rich edges become in the architecture. If edges carry significant metadata (type, attribution, time, even content), treating them as potential inputs makes sense. If edges are thin (just typed pointers), then practically you'd reify the relationship as a node and operate on that.

*Collections as inputs.* A collection is a node in your architecture, so this is already covered.

*Subsets of nodes.* Could a blend take "the parts of this node that are about pricing" as input, rather than the whole node? This is what conceptual blending calls *selective projection from an input space*. The convention there is: the input space is the whole, but only selected elements get projected into the blend. So you don't need a separate "subset" entity type; you just need to support selective projection within the blending operation.

*External entities.* A web page, a person, an event in the world. These exist outside the architecture. Two options: treat them as content entities (importing a reference to them into the graph) or treat them as not-yet-entities that have to become content entities before they can be inputs. The second is cleaner.

My read: nodes (of any type) are the inputs. Edges *could* be inputs if you want that generality, but it adds complexity. I'd lean toward "nodes only" for now and see if edge-as-input emerges as a real need. We can revisit. What's your instinct?

**Q2: generic space — work through examples.**

Yes, let's do this rather than speculate. Here are examples to think through:

*Example A.* You blend "$5/month nutrition coaching" with "my interview with Maria where she said she'd pay $4 for the right service." What's the generic space?

Candidate: "pricing claims about nutrition services from home cooks." This is the abstract pattern both share — both are about price points for nutrition services from this user population.

If the generic space is explicit, where does it come from? Three options:
- The user names it ("I'm blending these because both are about home-cook willingness to pay")
- The AI infers it
- It's implicit and never named

*Example B.* You blend a customer interview record with the Lean Canvas frame. What's the generic space?

This is harder. The canvas is a methodological schema; the interview is content. What do they share at an abstract level? Maybe: "a business situation involving humans, problems, exchanges." But that feels generic to the point of vacuousness — it's true for everything Lean Canvas would ever blend with.

Maybe the generic space matters less when one input is a frame, because the frame's slot structure does the licensing work that the generic space would otherwise do.

*Example C.* You blend Monday's stance with Wednesday's stance to produce a synthesized view of how your thinking evolved. What's the generic space?

Candidate: "epistemic positions on a single claim, by a single holder, across time." The abstract pattern that makes them blendable is that they're both stances by you on the same claim.

What I'm noticing across these examples:

When two substrate entities are blended (Example A, Example C), the generic space is concrete and meaningful — it's the abstract pattern that licenses combining these specific inputs.

When a substrate entity is blended with a library frame (Example B), the generic space feels almost redundant because the frame itself encodes what kind of substrate it can be applied to.

Possible interpretation: the generic space matters more when the blend is between substrate entities (non-frame blending), and matters less when one input is a frame (frame-application is the subtype where the frame's structure substitutes for the generic space's licensing role).

This is a hypothesis. Does it match your intuition? It would mean the generic space becomes a more important explicit element for general blending and a less important one (or implicit) for frame-application.

**Q3: precedent for "the output space joins with other ___."**

This is a great question and I want to think through it before answering. Let me work through what the traditions actually say.

*Conceptual blending and its descendants.* Fauconnier and Turner describe the blend producing a new mental space that becomes available for subsequent blends (hyperblending). But they don't have strong vocabulary for *where the blend lives* or *what it joins*. The blend is just available in the conceptual space the cognizer occupies. It joins... the cognizer's overall mental landscape? Their conceptual repertoire? They don't name it.

*Husserl.* The noema produced by a noetic act joins the *intentional horizon* — the standing background of meanings against which future intentional acts take place. The horizon is the right concept. It's the totality of what the cognizer can intend, structured by sedimented prior intentions.

*Yogācāra Buddhism.* New cognitive acts produce *bīja* (seeds) that are stored in the *ālayavijñāna* (store-consciousness). The store-consciousness is the totality of accumulated cognitive residue available to condition future cognition. The output joins the store.

*Maturana and Varela.* The brought-forth world joins the *cognitive domain* of the observer — the totality of distinctions available to them.

*Bateson.* New differences join the *pattern that connects* — the larger web of relationships that makes future differences meaningful.

*Library/archive traditions.* The output joins the *corpus* or *body of work* — the accumulated collection of attributed records.

*Wiki and knowledge-management traditions.* The output joins the *workspace* or *knowledge base* — the addressable collection of all current entities.

So several traditions have names for what the output joins. The strongest candidates:

*Horizon* (Husserl, Gadamer) — emphasizes the standing background against which future cognition takes place. Carries philosophical weight, might be too heavy.

*Cognitive domain* (Maturana) — emphasizes the totality of distinctions an observer can make. Carries enactivist commitments.

*Store* or *repository* — neutral, implementation-flavored.

*Workspace* — what you've already been calling it for the collaborative environment. Familiar from contemporary tools.

*Corpus* — emphasizes the accumulated body of work.

There's also the simplest possibility: the output joins the *substrate*. We already have a name for the totality of what's available to be input to future blends. The output joins the substrate by becoming one of its entities. No new term needed.

This is actually the cleanest move. The substrate is *the set of all current entities in the workspace*. A blend produces a new entity. The new entity joins the substrate by definition. The closure is structural, not a separate operation, exactly as we discussed for the framing case.

Do you want a richer term that carries the cognitive/temporal dimension (horizon, cognitive domain), or is "joins the substrate" sufficient?

**Q4 follow-up: frame-application's slot structure.**

You confirmed: position doesn't matter, but frame-application has the additional property that the frame's slots get filled during the blend. General blending doesn't have a slot structure to fill.

This gives frame-application a specific signature: it's a blend where one input is a frame, and the blend's output has a slot structure derived from that frame, with the slot fillers drawn from the other inputs (via selective projection, completion, etc.). General blending has no required slot structure in its output.

So frame-application is the subtype where:
- At least one input is a frame.
- The output's structure follows the frame's slot specification.
- The blending operation includes filling the frame's slots.

General blending is the supertype where:
- Inputs can be any entities.
- The output's structure is not predetermined by any input.
- The blending operation produces a new structured entity whose structure emerges from the composition.

This is a meaningful distinction and worth keeping. Does this match your intent?

**Q5 follow-up: does blending always involve a frame or mental model?**

You're asking whether "applying a perspective" without explicitly naming a frame is still a blend in this architecture, and whether blending can happen without any frame-like structure.

The honest answer requires thinking carefully about what "applying a perspective" actually is.

When someone says "I'm looking at this from the customer's perspective," they're not necessarily invoking a library frame. They're doing something more like: bringing a mental model of "what the customer cares about" to bear on the substrate. That mental model has structure (probably), but it's not necessarily a named, shareable schema.

In conceptual blending terms, "the customer's perspective" is an input space — a mental space the cognizer is bringing to the blend. It has structure (typical customer concerns, typical reactions, etc.), and it's blending with the substrate to produce a new view. Whether that mental space is *also* a library frame depends on whether it's been formalized and shared.

So: blending always involves bringing *something with structure* as an input — but that something doesn't have to be a library frame. It can be an unnamed mental model, an example, a metaphor, a comparison.

This suggests a distinction worth making:

*Library frames* — named, shared, persistent schemas with declared slot structure. First-class in the architecture.

*Informal frames* (or *implicit frames* or *ad hoc mental models*) — unnamed structures the cognizer brings to a blend. May or may not be made explicit. Probably appear as substrate entities (content describing the perspective) that get blended with other substrate.

The architecture could support both:
- Library frames are blended via frame-application (their slot structure is filled).
- Informal frames are blended via general blending (no slot structure, but they contribute structure to the output).

This means "applying a perspective" is a blend, but it's general blending unless the perspective has been formalized as a library frame. The act of formalizing — taking an informal frame and turning it into a library frame — is itself an act in the architecture worth supporting eventually.

Does this distinction work for you? It preserves "applying a perspective" as a real operation while letting it sit naturally in the blending vocabulary.

**Summary of where I'd like to land before proceeding.**

For Q1: nodes only as inputs (revisit edges later if needed). Confirm?

For Q2: hypothesis is that generic space is more important for general blending and less important (or implicit) for frame-application. Confirm with more examples, or push back.

For Q3: candidate is "output joins the substrate" — clean, structural, no new term needed. Alternative is to add a term like "horizon" if you want the cognitive/temporal weight. Which?

For Q4: frame-application's distinctive property is that the output has the frame's slot structure and slots get filled during the blend. Confirm?

For Q5: blending can involve library frames (frame-application) or informal frames (general blending). The architecture supports both. Confirm?

Tell me where you agree, where you want to push, or where examples would help.

## User:

> 6/3/2026 11:49:39

Q1) both nodes and edges (edges will carry significance); subset of nodes via selective project is fine; external entities are "casted" to (transformed) to entities (and nodes if applicable)
Q2) Example A: i'd want the user and the AI to collaborate to identify and finalize generic space; Example B: similar to A, with the specific elements in generic space being seeded from the lean canvas, e.g. lean canvas identifies 'customer segment' and the interview has some info on a new segment - it does point out a question: is the generic space formed before the blend occurs and can it be based on iterating through the content of the input spaces first?; Example C: i agree, and similar to Example A - AI and human collaborate; intuition: i agree with Claude's hypothesis. Do research to determine if there is existing POV on this from conceptual blending and it's descendants.
Q3) use 'substrate' and update its definition; at the same time, also do further (deep) research to see if Conceptual blending and its descendants address this at all and then lets review if there's new info.
Q4) slot filling would be the necessary outcome of blending with an inputspace as a frame (eg. Lean Canvas), in that the inverse - no slots in Lean Canvas are filled in - would only be useful if the other input space had nothing relevant; therefore, blending must produce filling in of slots when an input space is a frame to be filled in.
Q5) what if we invert this? so that 'mental model' has various forms - some are structured like a lean canvas. Since we continue to work around the effect of socially shared structures (like lean canvas as a frame) in conceptual blending - do deep research to inform us with the current POVs on this

## Assistant:

> 6/3/2026 11:51:35

Good direction. Let me do the research before responding on Q2, Q3, and Q5, then come back with what I find.

> Synthesized conceptual blending research across five questions to inform framework design.
>
> - conceptual blending "generic space" how formed before blend iterative
> - I'm noticing some key patterns in the literature. The generic space concept appears optional rather than mandatory in network structures, blend creation involves iterative cycles of generation and evaluation, and there's pushback on the generic space framework itself—particularly around how the connecting principle might be better understood as something learned rather than inherent.
>   
>   Now I need to dig deeper into how integration networks feed into subsequent operations and connect with existing conceptual frames.
> - conceptual blending "integration network" hyperblending blend becomes input space
> - I'm digging deeper into how this blend functions within a larger system—specifically where it connects, how it facilitates sharing and collaboration, and what role it plays in structuring or organizing different frames.
> - "conceptual blending" "organizing frame" "background frame" recruited social shared schema
> - I should dig deeper into how "join" operations work in this architecture and where they fit in, especially since the user is interested in understanding how socially-shared structures are distributed across the system.
> - "distributed cognition" "shared mental space" Hutchins conceptual blending external artifact
> - I'm pulling together the research on conceptual blending to address the core questions. The literature shows the generic space is treated as optional in some frameworks, and blend creation itself is iterative—constantly generating and evaluating new blends. The generic space can apparently take on different forms depending on the context.
>   
>   There's real disagreement here too. Grady pushes back on the generic space concept entirely, arguing it's better understood as a learned schema rather than a distinct cognitive structure. Meanwhile, computational approaches actively search for the generic space as something to discover during the blending process itself, which actually supports the user's intuition about it emerging collaboratively rather than being predetermined.
>   
>   On where blends end up, the conceptual blending framework itself stays quiet—blends just feed into the integration network or become inputs for further blending. But the descendant theories fill this gap: distributed cognition talks about how cognitive work spreads across people and artifacts, extended mind treats tools as part of cognition itself, and cultural models emphasize what gets shared within a community. So the blend doesn't really "go" anywhere in classical blending theory, but these later frameworks suggest it becomes part of the broader cognitive and cultural ecosystem.
>   
>   Now looking at how frames organize mental models, conceptual blending actually has a precise answer through its network typology. Simplex networks are where one input brings the organizing frame while the other supplies the content—that's exactly what I mean by frame-application. Mirror networks have both inputs sharing the same frame, creating a richer blend. Single-scope networks pit two different frames against each other, with one winning out to structure the blend. These distinctions capture how frames can either be applied, negotiated, or compete when blending happens. ible-scope networks** - two inputs with different/clashing frames, blend has emergent frame combining parts of both. Most creative/innovative blending
>   
>   5. **Multiple/iterative networks** - "hyper-blends that have blends as inputs"
>   
>   This is fascinating because it ALREADY DISTINGUISHES the user's "frame-application" case (simplex) from the more general blending case. The architecture should preserve this distinction.
>   
>   Also, "organizing frame" is a TECHNICAL term in conceptual blending. ALL input spaces have organizing frames (mental models with structure). The difference is whether the frame is:
>   - Familiar/conventional (like a library frame)
>   - Novel/specific (like a particular situation)
>   - The same in both inputs (mirror)
>   - Different across inputs (single/double-scope)
>   
>   This means the user's intuition in Q5 ("what if 'mental model' has various forms - some are structured like a lean canvas") is EXACTLY what conceptual blending already says. The user is converging on the existing theory's terminology.
>   
>   The user said "we continue to work around the effect of socially shared structures (like lean canvas as a frame) in conceptual blending". The research shows conceptual blending DOES address this through the simplex/mirror/single-scope/double-scope typology — socially shared structures are just conventional organizing frames, and even informal mental models count as frames in this sense.
>   
>   Now I need to figure out what to deliver. The user wants me to work through the questions without jumping to consequences, so I should present findings on Q2, Q3, and Q5, then ask which directions to pursue. Let me think through Q4 as well. it was confirmed.
>   
>   Wait - I need to check the prompt more carefully. The user said:
>   - Q1) Both nodes and edges, subset via selective projection fine, external cast
>   - Q2) work through examples; intuition confirmed; DO RESEARCH on existing POV
>   - Q3) use 'substrate' update definition; DO FURTHER RESEARCH on what conceptual blending says
>   - Q4) slot filling is necessary outcome when input is frame
>   - Q5) DO DEEP RESEARCH on current POVs
>   
>   So I need to deliver research findings, NOT consequences. The user will then approve direction.
>   
>   Let me organize the findings:
>   
>   For Q2 (generic space - before blend or iterative):
>   - CB historically treats generic space as one of the four spaces in the integration network
>   - BUT: literature actually describes it as discovered or constructed during blending, not pre-formed
>   - Grady's critique points out generic space is sometimes confused with metaphor; it's more accurately a learned schema
>   - Computational research shows generic space is something to search for iteratively during blending
>   - The iterative formation of generic space aligns with current computational work and theory
>   
>   For Q3 (what blends join):
>   - Conceptual blending itself just describes integration networks with recursive hyperblending; it doesn't strongly specify where the blend goes
>   - Hutchins' distributed cognition framework treats cognition as spread across people, artifacts, and procedures, with representational states stored in different media
>   - Extended...
>   
>   For Q5 (mental models / organizing frames):
>   - Conceptual blending already has a sophisticated typology: simplex, mirror, single-scope, double-scope networks
>   - All input spaces have organizing frames with some structure
>   - The key distinction lies in familiarity, conventionality, social shareability, and whether frames clash
>   - Your intuition about mental models and frames like lean canvas aligns exactly with what conceptual blending describes
>   
>   When frames get applied, that's a simplex network in blending terms, while general blending could involve any of the four network types. The crucial insight is that conventional, socially shared structures like lean canvas are just frames that have been culturally consolidated over time — the underlying cognitive operation remains identical whether the frame is informal or widely adopted. Background frames are recruited dynamically regardless of their origin.
>   
>   I should present these findings clearly without proposing new vocabulary or theoretical revisions, then ask what direction would be most useful.
> - **Done**

Here's what I found, organized by question. I'll share findings and stop, so you can direct the next step.

**On Q2: generic space — formed before, during, or iteratively?**

Conceptual blending's original formulation describes the generic space as one of four spaces in the integration network, alongside the two input spaces and the blended space. The standard diagrams show all four spaces simultaneously, which suggests they're all present at once. But when you look at how the theory actually describes the process, the generic space is more dynamic than the diagrams suggest.

Fauconnier and Turner describe the network's spaces as constructed during the meaning-construction process, not pre-given. The generic space is what "the two input spaces have in common," which means it can only be identified by comparing the input spaces — and that comparison happens as part of the blending operation itself.

There's a real critique of this in the literature. Joseph Grady (2005, "Metaphors of Conceptual Integration") argues that the generic space concept is misleading: the "connecting principle is better described as a learned schema or convention for spatial representation of sequential events, and is not well captured by the metaphor of a 'generic space.'" His view is that what the theory calls a generic space is often a pre-existing conceptual structure being recruited, not something computed fresh from the inputs.

Computational work on conceptual blending takes the iterative view explicitly. A 2019 Springer paper by Confalonieri and colleagues describes blend creation as "an iterative process of blend generation and blend evaluation," with the generic space being one of the things searched for during the process. They identify "searching for the shared semantic structure between concepts—the so-called generic space in conceptual blending" as one of two core open problems in computational approaches to blending.

So the honest answer to "is the generic space formed before the blend or iteratively?" is that the original theory is ambiguous, the critique camp argues it's often pre-existing schemas being recruited, and the computational implementations treat it as iteratively discovered. Your intuition that the generic space is formed collaboratively between user and AI through iteration over the input contents is well-supported by current work, especially the computational implementations. Whether to call this "iterative discovery of generic space" or "iterative recruitment of background frames" depends on which strand of the literature you follow.

**On Q3: what blends join.**

Conceptual blending itself is thin on this. The theory talks about the "integration network" as the structure within which blends exist, and notes that blends can become input spaces for further blends ("hyperblending" or "iterated blending"), but it doesn't strongly name a larger structure that blends join. Mark Turner's 2007 piece on frame blending mentions that "there can be, and usually are, hyper-blends that have blends as inputs," but the language stops there.

The descendant traditions are where the language gets richer. Edwin Hutchins's distributed cognition (1995, *Cognition in the Wild*) is the most useful. Hutchins argues that cognition is distributed across "a collection of individuals and artifacts and their relations to each other in a particular work practice," with cognitive activity creating "representational states" that are stored in "media" — including external artifacts. The unit of analysis is the whole socio-technical system, not the individual. In Hutchins's vocabulary, what your architecture calls "substrate" maps directly onto "representational states stored in media." That's a clean fit.

Andy Clark and David Chalmers's extended mind thesis (1998) makes a related move: cognitive artifacts (notebooks, tools, external structures) become part of the cognitive system itself. The blend doesn't just join "your mind" — it joins the extended cognitive system that includes your mind, your tools, your collaborators, and the artifacts you're working with.

Holland and Quinn's "cultural models" (1987) name another piece: blends can become cultural models, "widely shared among culture members" but existing as collective representations rather than individual ones. This is the social-shared-structure piece your Q5 is reaching toward.

Synthesizing across traditions: blends join a distributed cognitive system that includes individual minds, externalized artifacts (notes, tools, frames in libraries), shared cultural structures, and other agents. The substrate in your architecture is the artifactual layer of this distributed system — the externalized portion that's persistent, addressable, and shareable.

So the answer to whether to keep "substrate" or borrow a richer term: substrate is fine if you're naming the *artifactual layer* of the distributed cognitive system. If you want to capture the broader cognitive surround (including the people, the unspoken shared culture, the tacit knowledge), then "substrate" is too narrow — but probably appropriately so, because the architecture is about the externalized layer specifically. The richer terms (cognitive ecology, distributed cognitive system, extended mind) describe the whole environment your substrate is one piece of.

**On Q5: mental models / organizing frames / socially shared structures.**

This is where the research most strongly clarified the picture, because conceptual blending has a sophisticated typology I should have surfaced earlier.

Fauconnier and Turner identify several types of integration networks based on the role of organizing frames in the input spaces:

*Simplex networks* — one input space has a familiar abstract frame (like the kinship frame "parent-ego" or, in your case, Lean Canvas), and the other input space has specific values that get projected as fillers of the frame's roles. The blend inherits the frame's structure with the values filling its slots. This is exactly your "frame-application" subtype. The technical term in CB for this is *simplex network*.

*Mirror networks* — both input spaces share the same organizing frame. The blend inherits that frame, often in a richer version. Example: two debates compared using the "debate" frame in both inputs.

*Single-scope networks* — two input spaces with different organizing frames, but only one frame's structure projects to organize the blend. Conventional metaphors are typically single-scope (the source-domain frame organizes the target-domain understanding).

*Double-scope networks* — two input spaces with different (and often clashing) organizing frames; the blend has an emergent frame that combines parts of both. Fauconnier and Turner identify this as the most creative form of blending.

What this typology says is significant for your Q5: *every input space has an organizing frame in conceptual blending's analysis*. Frames aren't a special kind of input that's distinct from "normal" content — they're the structural component of every mental space. The difference between "Lean Canvas as input" and "a customer interview as input" is that the Lean Canvas's organizing frame is conventional, shared, and library-resident, while the interview's organizing frame is novel, specific, and not in any library. But both have organizing frames.

Your intuition in Q5 — "what if 'mental model' has various forms - some are structured like a Lean Canvas" — is essentially restating conceptual blending's "organizing frame" concept. The theory already says: all mental spaces have organizing frames; some frames are conventional and shared (Lean Canvas), others are ad hoc and specific (a particular customer interview's interpretive structure), but the architecture of cognition treats them uniformly.

On the specific question of socially shared structures: Fauconnier and Turner address this through "background frames recruited dynamically" — the idea that any blending operation pulls in conventional frames from the cognizer's cultural background, often without explicit awareness. Lean Canvas, as a Lean Startup convention, is one such background frame that practitioners recruit when thinking about business situations. The theory treats it as a culturally-consolidated organizing frame, structurally equivalent to other organizing frames but socially shared.

So the answer to "we continue to work around the effect of socially shared structures in conceptual blending" is: actually, conceptual blending has a built-in account of this. Socially shared structures are organizing frames that have been culturally conventionalized. The cognitive operation (blending) is the same regardless of whether the organizing frame is informal/personal or formal/shared. What differs is the frame's availability, persistence, and recruit-ability.

**What this means for the questions you asked.**

For Q2: your intuition is supported, especially by the computational implementations. The generic space is iteratively discovered during blending, and the user+AI collaborative identification is a reasonable model. There's also a stronger position you could take — adopting Grady's critique that what's really happening is *recruitment of background frames* rather than *construction of generic space*. The two views are compatible if the iterative process is itself a search through background frames for the one that best licenses the blend.

For Q3: substrate is the right term for what your architecture handles. Conceptual blending doesn't have a better word for it; the descendant traditions (Hutchins, Clark) describe it as the artifactual layer of a distributed cognitive system. The substrate is your architecture's name for that layer.

For Q5: conceptual blending already has the typology you're reaching for. Library frames (Lean Canvas) are organizing frames that have been socially conventionalized; informal mental models are organizing frames that haven't. Both function structurally as organizing frames in input spaces; the difference is sociological, not architectural. Frame-application maps cleanly onto *simplex network* in CB's typology. General blending maps onto mirror, single-scope, or double-scope networks depending on what's happening with the organizing frames.

**Where I'll stop.**

I'm not going to propose vocabulary updates or revised specification yet. The findings raise several decisions that are yours to make:

Whether to adopt CB's existing network typology (simplex, mirror, single-scope, double-scope) as architectural distinctions, or to keep a simpler "frame-application vs general blending" two-way split.

Whether the generic space is an explicit element in your architecture (with the iterative collaboration model you described) or implicit/inferred (with the background-frame-recruitment view).

Whether to keep "substrate" or borrow Hutchins's "representational states in media" or some other term.

What do you want to take next?

---

**Sources:**

- [Conceptual Blending | FunBlocks AI](https://www.funblocks.net/thinking-matters/classic-mental-models/conceptual-blending)
- [Upward refinement operators for conceptual blending in the description logic 𝓔ℒ++ | Request PDF](https://www.researchgate.net/publication/307616130_Upward_refinement_operators_for_conceptual_blending_in_the_description_logic_L)
- [A Complementary Perspective of Conceptual Blending ...](https://www.academypublication.com/issues2/tpls/vol05/10/16.pdf)
- [Metaphors of Conceptual Integration](https://web.pdx.edu/~cgrd/Metaphors%20of%20Conceptual%20Integration.html)
- [Metonymy and Conceptual Blending](https://pages.ucsd.edu/~scoulson/metonymy-new.htm)
- [Conceptual blending](https://en.wikipedia.org/wiki/Conceptual_blending)
- [Conceptual Blending](https://www.neurohumanitiestudies.eu/archivio/blending.pdf)
- [Conceptual blending — Grokipedia](https://grokipedia.com/page/Conceptual_blending)
- [1 Frame Blending © Mark Turner, 2007](https://markturner.org/FrameBlendingTurner.pdf)
- [CONCEPTUAL BLENDING, FORM AND MEANING1 Gilles Fauconnier2 and Mark Turner3](https://tecfa.unige.ch/tecfa/maltt/cofor-1/textes/Fauconnier-Turner03.pdf)
- [Philosophy:Conceptual blending - HandWiki](https://handwiki.org/wiki/Philosophy:Conceptual_blending)
- [(PDF) Blending basics (linguistic aspects of conceptual blending theory and conceptual integration)](https://www.researchgate.net/publication/296882629_Blending_basics_linguistic_aspects_of_conceptual_blending_theory_and_conceptual_integration)
- [conceptual integration Flashcards](https://brainscape.com/flashcards/conceptual-integration-15052429/packs/21859894)
- [Framing (social sciences)](https://en.wikipedia.org/wiki/Framing_(social_sciences))
- [Frames, scripts, scenarios,](https://www.slideshare.net/slideshow/frames-and-other-animals/18341846)
- [www.cambridge.org](https://www.cambridge.org/core/books/semantic-leaps/applications-blending-framing-and-blaming/96B7E4BA1C1369DAD080AE7FD225B378)
- [www.academia.edu](https://www.academia.edu/80170223)
- [s10472 019 09654 6](https://link.springer.com/10.1007/s10472-019-09654-6)
- [s10472 019 09654 6](https://link.springer.com/article/10.1007/s10472-019-09654-6)
- [Distributed cognition](https://en.wikipedia.org/wiki/Distributed_cognition)
- [Distributed cognition - HandWiki](https://handwiki.org/wiki/Distributed_cognition)
- [MET:Distributed Cognition - UBC Wiki](https://wiki.ubc.ca/MET:Distributed_Cognition)
- [Distributed Cognition | Social Learning Theory](https://blogs.ubc.ca/sociallearning512/distributed-cognition/)
- [Distributed Cognition and Communication](https://www.researchgate.net/publication/240746371_Distributed_Cognition_and_Communication)
- [Commentary: Distributed Cognition and Distributed Morality: Agency, Artifacts and Systems](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5900412/)
- [Distributed Cognition | BCL Learning Library](https://bcltraining.com/learning-library/distributed-cognition/)
- [distributed cognition: a useful theory in HCI and interface design — rachael paine](https://www.rachaelpaine.com/research/distributed-cognition)

## User:

> 6/3/2026 12:59:56

restate the questions, with numbers

## Assistant:

> 6/3/2026 13:00:03

**Question 1.** Whether to adopt conceptual blending's existing network typology (simplex, mirror, single-scope, double-scope) as architectural distinctions in the specification, or to keep a simpler two-way split between frame-application and general blending.

**Question 2.** Whether the generic space is an explicit element in the architecture (with the iterative user-AI collaborative identification model you described), or implicit/inferred (with the background-frame-recruitment view from Grady's critique).

**Question 3.** Whether to keep "substrate" as the term, or borrow Hutchins's "representational states in media" (or another term from the distributed cognition tradition) to capture the artifactual layer of a distributed cognitive system.

## User:

> 6/3/2026 13:01:25

Q1) has the CB network topology evolved over time, has it been strengthened or discredited? 
Q2) what is the purpose of the generic space in the process?
Q3) use substrate, and retain this enhanced definition

## Assistant:

> 6/3/2026 13:02:23

> Synthesized network topology evolution, generic space function, and confirmed substrate definition.
>
> - conceptual blending network typology critique evolution Fauconnier Turner update
> - I'm looking into what the generic space is used for.
> - conceptual blending "generic space" purpose function role cross-space mapping
> - I have enough to give substantive answers to Q1 and Q2, and Q3 is already settled with the substrate approach. For Q1 about whether the network typology has evolved, the key insight is that Fauconnier & Turner's double-scope blending represents a claimed cognitive universal or "panhuman singularity," while Brandt & Brandt show the typology has been extended rather than replaced by newer frameworks.
>   
>   The 2005 addition of "disintegration" as a complementary concept created a supplementary three-level typology, and while Glebkin's 2013 criticism raised methodological concerns about cultural-historical analysis and experimental data, the real limitation is that single-scope networks can't represent certain metaphors like "digging one's own grave." What's compelling is that recent computational work by Confalonieri and others takes the typology seriously enough to formalize it, suggesting it remains theoretically robust despite its constraints.
>   
>   For Q2 on the generic space's purpose, the sources are clear that it licenses the blend by abstracting the shared, non-specific structure across the input spaces. The generic space intentionally leaves certain values open so the inputs can populate them with their own specifics, and in simplex networks this role structure becomes the organizing frame itself. Now I need to write a focused response addressing the three questions—covering how the concept evolved and can be strengthened, clarifying its purpose, and confirming that the substrate approach resolves the third question—without proposing new specifications yet, just presenting the findings and asking what direction to take next.
> - **Done**

Here are the findings on each.

**Q1: Has the CB network typology evolved, been strengthened, or discredited?**

The typology has been extended and computationally formalized, not discredited. The core five-way distinction (simplex, mirror, single-scope, double-scope, plus multi-blend/iterated networks) is still the standard reference and is treated seriously in current cognitive science and computational implementations.

The strongest claim Fauconnier and Turner made — that double-scope blending is a "panhuman singularity" not shared by non-human primates — has held up in the literature as broadly accepted, though uncontroversial enough that it's described as "not very interesting as a claim in itself." The interest is in what the typology enables you to do, not whether it's correct.

The most significant extension is Brandt and Brandt (2005), which proposed a supplementary typology of three levels of increasing complexity, and introduced *disintegration* as a complementary concept to integration. Their argument is that blending often presupposes disintegration (fragmentation, differentiation) of source material before re-integration happens. This refines rather than replaces the original typology.

The computational tradition has taken the typology seriously and tried to formalize it. The Springer 2019 paper by Confalonieri and colleagues, and the broader work on computational conceptual blending (Goguen, Veale, Eppe, and others) build on the typology directly. Their critique is not that the typology is wrong but that the original theory is *underspecified* — the network types are useful descriptive categories but lack precise formal definitions that algorithms can use. They work to fill that gap, not to overturn the categories.

The substantive criticisms are methodological rather than typological. Vladimir Glebkin (2013) points out the lack of cultural-historical analysis and the neglect of experimental data, arguing the theory is more useful for adapting knowledge to ordinary experience than as a basic instrument for creating new knowledge. Some metaphors fit the typology awkwardly — "digging one's own grave" is sometimes given as a case where single-scope categorization doesn't capture what's happening, because the blend's emergent structure is radically different from a simple projection from one input.

The honest summary: the typology is mature, widely used, has been extended rather than replaced, and its critics have focused on methodology and underspecification rather than on the categories themselves. It's a stable target to adopt or borrow from, with the recognition that newer work (Brandt and Brandt, computational implementations) adds refinements worth knowing about.

Worth flagging one detail: Wikipedia's current entry on conceptual blending lists "view application" as another name for the theory. That's striking given your architecture's interest in applying viewpoints to substrate — there's terminology overlap worth being aware of, though I haven't traced where "view application" originates in the literature.

**Q2: What is the purpose of the generic space in the process?**

The literature describes the generic space as doing several distinct jobs in the blending process. They're worth separating because they have different implications for your architecture.

*Licensing the blend.* The generic space contains what the two input spaces have in common at an abstract level. Its existence is what justifies treating the inputs as blendable — without shared abstract structure, the inputs would have nothing to map onto each other through. The generic space is the warrant that the blend is coherent rather than arbitrary.

*Guiding cross-space mapping.* The generic space provides the template against which counterparts in the two input spaces are identified. When the Buddhist monk example has a mountain path in both inputs, the generic space's "mountain path" is what allows the two specific paths to be recognized as counterparts and mapped to each other. The mapping operation is licensed by the shared abstract structure.

*Providing organizational structure.* In simplex networks specifically, the generic space provides the role structure (parent, child, customer, segment) that the values from the other input fill. The generic space's abstract roles become the slots of the blend.

*Maintaining coherence under projection.* As elements get selectively projected from inputs into the blend, the generic space provides the constraint that the resulting blend remains a recognizable instance of the shared abstract pattern. It keeps the blend from drifting into incoherence as composition, completion, and elaboration proceed.

*Being deliberately non-specific.* Fauconnier explicitly notes that the generic space leaves outcomes unspecified. In his Clinton-iceberg example, the generic space contains "one entity involved in an activity motivated by some purpose encounters another entity that poses a threat to that activity. In the generic space, the outcome of that encounter is not specified." This non-specificity is what allows different inputs to fill the generic space with different specifics — and what makes the blend's emergent structure possible.

There's a subtlety in the literature worth noting. In simplex networks (where one input is a familiar frame like a kinship structure or Lean Canvas), the generic space tends to be *coextensive with the frame's role structure*. The frame already provides the abstract roles; the generic space is essentially the abstracted skeleton of the frame. In other network types (mirror, single-scope, double-scope), the generic space is more independent — it's the shared abstract pattern that emerges from comparing two inputs neither of which is a pre-existing convention.

So the purpose of the generic space can be summarized: it's the *abstract structure that licenses the blend, guides the mapping between input spaces, provides organizational scaffolding for the blend, maintains coherence under projection, and remains intentionally non-specific so inputs can fill it with their particulars*. In simplex networks involving a library frame, it's largely supplied by the frame. In other networks, it has to be constructed or discovered.

**Q3 acknowledged.**

Substrate with the enhanced definition (the artifactual layer of a distributed cognitive system, drawing on Hutchins's "representational states in media" framing) is locked in.

**Where this lands.**

You now have findings on all three. Decisions still open:

For Q1, the question is whether to adopt CB's network typology directly (simplex, mirror, single-scope, double-scope, multi-blend) as the architectural distinctions, or to keep a simpler two-way split (frame-application vs general blending), or some intermediate position.

For Q2, the question is whether the generic space is an explicit element in the architecture (with its purposes of licensing, guiding mapping, and providing structure made first-class) or whether it remains implicit/computed.

What do you want to decide next?

---

**Sources:**

- [A Сritical View on Conceptual Blending Theory](https://escholarship.org/content/qt95p302sj/qt95p302sj_noSplash_915227ed37c13210752713ed4e659169.pdf?t=os5zwp)
- [FAUCONNIER e TURNER. Conceptual Blending - Form and Meaning (2003) | PDF | Cognitive Science](https://www.scribd.com/document/704125612/FAUCONNIER-e-TURNER-Conceptual-blending-form-and-meaning-2003)
- [Constraining conceptual integration theory: Levels of blending and disintegration - ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0378216605000615)
- [A Critical View on Conceptual Blending Theory by Vladimir Glebkin :: SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2297721)
- [Conceptual Integration and Fictive Interaction | Literary Universals Project | English Department | University of Connecticut](https://literary-universals.uconn.edu/2016/09/15/conceptual-integration/)
- [Conceptual blending](https://en.wikipedia.org/wiki/Conceptual_blending)
- [A uniform model of computational conceptual blending - ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1389041720300759)
- [Conceptual Blending Theory - Discourses on Learning in Education](https://learningdiscourses.com/discourse/conceptual-blending-theory-conceptual-integration-theory/)
- [1 COMPRESSION AND EMERGENT STRUCTURE1 Gilles Fauconnier](https://pages.ucsd.edu/~scoulson/spaces/fauconnier05.pdf)
- [A Complementary Perspective of Conceptual Blending ...](https://www.academypublication.com/issues2/tpls/vol05/10/16.pdf)
- [Metonymy and Conceptual Blending](https://pages.ucsd.edu/~scoulson/metonymy-new.htm)
- [Cross-Domain Mapping and Cross-Space Mapping (based on Imaz and Benyon,... | Download Scientific Diagram](https://www.researchgate.net/figure/Cross-Domain-Mapping-and-Cross-Space-Mapping-based-on-Imaz-and-Benyon-2006_fig1_262328405)
- [BLENDING AND METAPHOR - Mark Turner](https://markturner.org/blendaphor.html)
- [Conceptual Integration - Mark Turner](https://markturner.org/cinLEA.pdf)
- [Conceptual Integration | The Oxford Handbook of Cognitive Linguistics | Oxford Academic](https://academic.oup.com/edited-volume/34552/chapter/293163551)
- [Conceptual blending — Grokipedia](https://grokipedia.com/page/Conceptual_blending)
- [Academia Letters Papers (Peer Reviewed) by Ross Turner](https://yorksj.academia.edu/RossTurner)

## User:

> 6/3/2026 13:06:09

Q1) adopt
Q2) generic space is explicit

## Assistant:

> 6/3/2026 13:06:24

Both confirmed. Two more questions before working on consequences, because each decision implies follow-on choices I'd rather check than guess.

**Q4: When you say "adopt CB's network typology," do you want it adopted as architectural commitments or as descriptive categories?**

There's a real distinction between:

*Adopted as architectural commitments* — the system enforces network type. When a user initiates a blending operation, the system requires them (or the AI) to declare which network type is being used (simplex, mirror, single-scope, double-scope, or multi-blend). The network type affects what the operation does — for example, simplex networks must have at least one input that is a library frame.

*Adopted as descriptive categories* — the system records what network type was used after the fact, as metadata on the blend instance, but doesn't enforce or distinguish behaviorally. The categories are useful for analysis, search, and recommendation but don't constrain the operation.

The first is more rigorous and machine-tractable but more burdensome. The second is more flexible but less structured. There's also a hybrid: enforce certain constraints (simplex requires at least one frame input; multi-blend has more than two inputs) while leaving other distinctions descriptive (mirror vs single-scope vs double-scope, which are about whether organizing frames clash, can be harder to determine mechanically).

Which direction do you want?

**Q5: When you say "generic space is explicit," what kind of entity is it in the architecture?**

Several possible answers, each with different implications:

*The generic space is itself a node (entity).* It has identity, attribution, time, and persists in the substrate alongside other entities. When a blending operation occurs, a generic-space node is created (or referenced if reused) and connected via edges to the input spaces and the blend.

*The generic space is a property of the blending operation, not a separate node.* It's content carried on the edge that connects inputs to the blend, or on the blend instance itself, but doesn't have independent existence as a node.

*The generic space is a node, and reusable.* A particularly useful generic space (the abstract structure shared by "customers" and "audiences," for example) might be referenced by many different blends over time. It functions almost like a library entry — not a frame, but a shared abstract pattern that recurs.

The third option is the richest. It would mean generic spaces accumulate in the workspace as a kind of meta-library — the abstract patterns that have proven useful for connecting input spaces. They'd be candidates for the same kinds of operations as other entities (citation, framing, sharing).

Which of these is closer to what you have in mind, or is there a different direction?

## User:

> 6/3/2026 13:09:15

Q4) hybrid - ask for type, ai and human collab in that context, with the ability for human to loosen from commitment to becoming a category, and the ai can suggest the same
Q5) The generic space is a node, and reusable

## Assistant:

> 6/3/2026 13:09:32

Both confirmed. Before working on consequences, I have follow-on questions on each, because the hybrid mode and the reusable generic space both raise design choices I'd rather check than guess.

**Q6: On the hybrid mode for network type — what triggers the loosening?**

Three sub-cases worth distinguishing:

*User-initiated loosening.* The human explicitly says "treat this as descriptive rather than enforced" for this particular blending operation. The system records the network type as a category but stops enforcing constraints like "simplex requires a frame input."

*AI-initiated suggestion to loosen.* The AI observes that the declared network type doesn't quite fit (the inputs don't actually share a clean organizing frame, or the user is trying to do something the strict typology doesn't accommodate) and proposes loosening as an option.

*Mutual revision during the operation.* The user starts with a declared type, the AI infers something different from what's being assembled, and they negotiate during the blend itself. The type might shift from "simplex" to "single-scope" mid-blend as the actual structure becomes clearer.

Are all three modes in scope, or only some? And should the network type be revisable after the blend is complete — i.e., can a blend originally tagged as simplex later be re-tagged as something else if you realize the typology was wrong?

**Q7: On reusable generic spaces — how do they come into being?**

If generic spaces are reusable nodes, then there's a question of where they originate. Several possibilities:

*Each blending operation creates its own generic space, and reuse happens by reference.* The first blend creates a generic-space node. A later blend that involves similar abstract structure references the existing node rather than creating a new one. This requires the system (or user, or AI) to recognize when an existing generic space applies.

*Generic spaces are authored separately and made available in a library.* Like frames, generic spaces would be first-class library entries that users (or the AI) can compose into blends. This treats them more like reusable conceptual building blocks.

*Generic spaces emerge during blending and may or may not be reified for reuse.* Most generic spaces stay attached to their original blend; some get promoted to reusable status because they prove useful across many blends. Promotion could be explicit (the user marks one as reusable) or emergent (the AI notices a pattern recurring and suggests promoting it).

The third option is closest to how the literature describes the actual cognitive phenomenon — most generic spaces are ad hoc and ephemeral, but some get consolidated into shared abstract patterns through repeated use. The first and second options are more architecturally controlled.

Which fits your intent, or is there a different model?

There's also a sub-question: is a generic space the same kind of thing as a frame, or different? Both are abstract structural templates. A frame has slot structure, fit characterization, entailment commitments, etc. A generic space (in the literature) is more like a bare abstract pattern. If they're different, what distinguishes them in the architecture? If they're the same, why have two terms?

## User:

> 6/3/2026 13:12:08

Q6) how are options 2 and 3 different?
Q7) third option
is a generic space the same kind of thing as a frame, or different - my intuition is there the same, but thats likely to evolve over time as we use it; so initially keep them seperate

## Assistant:

> 6/3/2026 13:12:19

Good check on Q6. They are very close, and on reflection the distinction I was drawing is thin.

**Option 2** (AI-initiated suggestion to loosen) is the AI noticing the type doesn't fit and offering loosening as one option. It's a discrete moment — the AI sees a problem, proposes a solution, user accepts or rejects.

**Option 3** (mutual revision during the operation) is the same thing happening continuously and possibly more than once during a single blending operation. As the inputs are being assembled and projected, both the user and the AI may surface mid-blend that the type is wrong, and the type can shift before the blend is complete.

So the difference is really just *when* and *how often* the AI surfaces concerns: at a discrete moment versus continuously throughout the operation. They're variations of the same mechanism, not different mechanisms.

If you want both, the cleaner way to say it is: the AI can surface concerns about the declared network type at any point during or after the blending operation, not just at one discrete checkpoint. The user can also surface their own revision at any point.

The honest reduction: there are really just two modes — *user-initiated* (option 1) and *AI-suggested* (options 2 and 3 collapsed), with the AI's suggestions being possible at any point during or after the operation. Plus the meta-question of whether revision is possible after the blend is complete.

Does this reduction match your intent? And is post-completion revision in scope?

**Q7 confirmed.** Generic space is reusable, comes into being primarily ad hoc during blending, with explicit or AI-suggested promotion to reusable status. Generic space and frame are kept as separate entity types for now, with the expectation that the distinction may evolve or collapse as the architecture is used.

## User:

> 6/3/2026 13:14:03

Q6) yes this reduction matches my intent; I don't think post-revision is in scope, i.e. if it's revised then the blend needs to be revised

## Assistant:

> 6/3/2026 13:14:13

Confirmed. The reduction holds: user-initiated loosening, or AI-suggested loosening at any point during or after the blending operation. Post-completion type revision is out of scope — if the type needs to change after completion, the blend itself needs to be revised (which would mean producing a new blend instance, since blend instances are append-only in the architecture).

This implies something worth flagging before moving on: there's a real distinction between *the type is wrong, so revise the blend* and *the type was loosened to category, so no enforcement applies*. Both are ways of handling typology mismatch, but they have different downstream consequences. The first creates a new blend instance with a different type. The second keeps the existing blend instance but flags its type as descriptive rather than enforced.

The user (or AI) needs to choose between these when a mismatch is detected. The two paths are:

*Loosen to category.* The blend stays, the type label becomes descriptive metadata, no constraints are enforced. Useful when the original blend is still valuable even if it doesn't fit the typology cleanly.

*Revise the blend.* A new blend instance is produced (with the correct type, or with adjusted inputs that fit the original type), and the old blend instance remains in the substrate as part of the history. Useful when the original blend was actually wrong, not just typologically ambiguous.

These are different choices with different implications. Do you want both available, with the user (or AI) explicitly selecting which path to take when a mismatch is found? Or is one of them the default?

## User:

> 6/3/2026 13:17:24

I would think that both would result in a new blend, in that the new blend would be referencing the version of the inputs that produced it

## Assistant:

> 6/3/2026 13:17:36

Good catch. That changes the picture meaningfully.

If both paths produce a new blend, then the difference between "loosen to category" and "revise the blend" is not *whether* a new blend is created but *what the new blend differs in* from the original.

In *loosen to category*: the new blend has the same inputs and content but its type label is descriptive rather than enforced. It's a re-instantiation of essentially the same blending operation under different typological status.

In *revise the blend*: the new blend has either different inputs, different selective projections, different slot fillers, or different type — something substantively different in the operation itself.

So the typology mismatch is always handled by producing a new blend, and the original blend remains in the substrate as historical record. The distinction between the two paths is just what the new blend changes relative to the original.

This is consistent with the append-only commitment and with the position that blend instances reference the version of inputs that produced them. The substrate accumulates blend instances over time; mismatches produce new instances rather than mutating old ones.

It also clarifies something I'd been holding ambiguously. When a blend instance references "its inputs," it's referencing them *at the time of blending*. If those inputs are later updated (by being framed further, by being part of a new blend), the original blend's references still point at the earlier versions. The DAG (in its acyclic edge-type sense) preserves this — earlier versions of nodes remain addressable, and edges point at specific versions.

One follow-on question worth checking before moving on: when a new blend supersedes an old one (in the sense of being a corrected version), is there an explicit *supersedes* relationship between them, or is the supersession implicit in the user's intent?

If explicit: a typed edge connects the new blend to the old one, declaring that the new is a revision of the old. Useful for navigating revision histories.

If implicit: the new blend is just another blend in the substrate, possibly referencing the old as one of its inputs (in a "responds to" or "builds on" sense), but no special supersession marker.

Which fits your intent?

## User:

> 6/3/2026 13:19:18

designation of superseding needs to be automatic, so that iterations of the same blend do not cause multiple (out of date versions) to end up in the substrate

## Assistant:

> 6/3/2026 13:19:34

Good. This is a real architectural constraint and worth being precise about, because "automatic supersession" can mean a few different things.

The core requirement: when a new blend is produced as a revision of an old one, the system automatically marks the new as superseding the old, so that downstream consumers (other blends, frame applications, queries) see only the current version by default. Out-of-date versions remain in the substrate (because of the append-only commitment) but don't clutter the active view.

Let me check a few sub-questions because the implementation has consequences.

**Q8: What triggers automatic supersession?**

A few possibilities:

*Same author + same inputs + small change.* If you produce a new blend with the same inputs as a previous one of yours and the change appears to be a revision rather than a fresh blend, the system automatically marks the new as superseding the old.

*Explicit "revise" action by the user.* The user invokes a "revise this blend" operation rather than creating a fresh blend. The supersession is automatic because the operation itself signals it.

*AI-detected revision pattern.* The AI notices that a new blend is structurally a revision of an earlier one (same inputs, minor structural change) and marks the supersession even if the user didn't explicitly invoke a revise action.

Which of these (or which combination) fits? The middle option (explicit revise action) is the cleanest because the supersession is intentional and unambiguous. The first and third are more inferential and risk getting the supersession wrong.

**Q9: What does "by default see only the current version" mean for collaborators?**

When Sam queries the substrate, does she see only the current version of a blend, or all versions with the current one highlighted? When she has been working with an earlier version and you supersede it, what happens to her ongoing work?

This gets into collaboration semantics. Two extremes:

*Aggressive supersession.* Sam's view automatically updates to the current version. If she was referencing the old version in her own work, her references now point at the current version. Risk: her work changes under her without warning.

*Notification-based supersession.* The supersession is automatic in the substrate, but Sam is notified that a blend she's been working with has been superseded. She can choose to update her references or keep them pointed at the older version. The substrate tracks both.

The second is safer but more complicated. Which fits?

**Q10: Can supersession be undone?**

If you supersede an old blend with a new one, then realize the new one is worse and want to go back, what happens?

*Append-only consistency would say:* the only way to "undo" is to produce a third blend that supersedes the second and matches (or revises) the first. Nothing is mutated; the chain of supersessions just grows.

*Practical convenience would say:* the user can explicitly un-supersede, reverting the supersession marker. The old version becomes current again.

The first is cleaner architecturally; the second is more user-friendly but breaks the append-only invariant.

Which fits your intent?

## User:

> 6/3/2026 13:24:44

Q8) this seems to be a deeper architectural question of identity. As a blend is iteratating (as can happen with forming the generic space, or other processes in CB) how does the ‘process’ know it’s a revision to an existing blend in-progress vs an entirely new blend? Look deeply at the literature for this issue

## Assistant:

> 6/3/2026 13:25:45

> Excavated literature revealing theoretical gap in blend identity continuity.
>
> - conceptual blending iterative revision blend identity versioning in-progress
> - I need to dig into what makes a blend distinct from another blend versus just being a revision of the same one, and understand how the actual process of running a blend works and what role iteration plays in all this.
> - "running the blend" elaboration "same blend" different blend identity criteria
> - I'm noticing the search results are pulling up a lot of material about chemical blending rather than the conceptual blending theory I'm looking for. I need to refine my search to focus specifically on the literature around whether iterating or elaborating on a blend creates the same blend or generates a new one, and what it means to actually run a blend.
> - Fauconnier Turner "running the blend" elaboration emergent identity continuous
> - I'm seeing a critical distinction emerge from the research: mental spaces can be actively modified throughout the construction process, not just set at the beginning, and elaboration works by operating within the blend itself rather than externally manipulating it.
>   
>   The computational work and procedural blending theory both treat the iterative creation process as fundamental to how blends actually work, which means the literature doesn't cleanly separate "in-progress" from "complete" blends—they're continuously modifiable until stabilized through use. What's striking is that the original conceptual blending literature doesn't explicitly address when iteration produces the same blend versus a new one, suggesting the implicit model treats blends as fundamentally continuous through their development.
> - **Done**

Here's what the literature says, and what it doesn't.

**What the literature does say about blend identity during iteration.**

The original Fauconnier and Turner formulation explicitly treats mental spaces — including the blended space — as *continuously modifiable during construction*. Wikipedia summarizes it directly: "The basic form of integration network consists of at least four separate and interconnected spaces which can be modified at any moment as a discourse progresses." Fauconnier's own 1996 description says mental spaces "are interconnected, and can be modified as thought and discourse unfold."

This means in the original theory, a blend doesn't have a clean "complete" state. The blend's identity is fluid throughout the cognitive process. Elaboration ("running the blend") operates *within* the existing blend, modifying its structure according to its own emergent logic — and this is treated as continuous with the blend, not as a successor blend.

The composition-completion-elaboration sequence is described as stages of producing one blend, not as producing multiple blends. If you change something during elaboration, you haven't created a new blend; you've continued constructing the same one.

This is consistent with how the theory describes the recruitment of background frames: "input spaces and blends under construction recruit structure from more stable, elaborate, and conventional conceptual structures" — the phrase "under construction" implies a single ongoing operation that may take significant time and many modifications before stabilizing.

**What computational implementations do.**

The computational tradition has had to operationalize this and has converged on treating iteration as a workflow/UX concern rather than a theoretical one. The "Roadmap for Visual Conceptual Blending" paper (de Bonis et al.) describes "different stages of blend production occur in an iterative manner, allowing the user to go back to improve the blend and its elaboration" — explicitly framing iteration as within a single blend's production, not as producing multiple blends.

The VisiBlends system (Chilton et al.) similarly treats iteration as part of "the iterative design process" within a single blending workflow. Users go through brainstorming, synthesis, and iteration as stages of producing one blend.

Procedural blending (Garrelfs 2015) extends conceptual blending to explicitly treat the iterative process of creation as part of the blend itself, rather than as preliminary to it. The iterations *constitute* the blend.

None of these implementations offer a theoretical rule for when iteration becomes a new blend versus revision of the existing one. They handle it as a UX choice: users explicitly initiate new blends, and within a blending operation everything is iteration of that blend.

**What the literature doesn't address.**

Here's the honest gap: the conceptual blending literature does not have a worked-out theoretical answer to your question. The in-progress versus new-blend distinction is not addressed because the original theory treats blending as a fluid cognitive process where identity isn't a sharp question. The computational implementations sidestep the theoretical question by making it a workflow design choice.

A few critics have flagged this. Glebkin's critical review notes the lack of testable hypotheses and precision in the theory. Gibbs (2000) — cited in the HandWiki entry — argued that "blending theory cannot be treated as a single theory but rather as a framework," partly because questions like the one you're asking don't have determinate answers.

**What this means for your architecture.**

The literature doesn't give you a principled answer; you'll have to make a design choice. The choice space, as the literature implies it, is roughly:

*Treat blend identity as established by an explicit user action.* The user initiates a new blend or continues an existing one. Iteration within an initiated blend is the same blend. This is what computational implementations have converged on. It's a workflow commitment, not a theoretical one.

*Treat blend identity as established by structural criteria.* Some change threshold (different inputs, different network type, different generic space) triggers a new blend; smaller changes remain the same blend. This requires the architecture to define what constitutes a "structural" change. The literature doesn't help here.

*Treat blend identity as fluid until stabilized.* The blend remains in an in-progress state until the user explicitly "commits" it. After commitment, further changes produce a new blend. This is the closest analog to the original cognitive theory, but it requires distinguishing in-progress from committed states.

*Treat every change as a new blend.* The append-only commitment is taken seriously: any modification produces a new blend instance, with an explicit supersedes relationship to the previous one. The "current" blend is whichever supersedes the others. This is the most architecturally clean but most operationally heavy.

Each of these has different consequences for collaboration (when Sam sees a blend you're working on, is she seeing the same blend you're iterating or a series of new ones?), for the recursive structure (when a downstream blend references this one, what version does it reference?), and for the supersession mechanism we were discussing.

**Where I'll stop.**

The literature has been searched and does not provide a definitive answer. This is a design choice you'll need to make based on what fits the architecture's other commitments.

The question worth surfacing before moving on: do you want to pick from the four options above, or should we explore the choice space further before committing? The four options have real differences in implementation cost and in how they interact with append-only, collaboration, and supersession.

---

**Sources:**

- [(PDF) Enriching the blend: Creative extensions to conceptual blending in music](https://www.academia.edu/22772171/Enriching_the_blend_Creative_extensions_to_conceptual_blending_in_music)
- [Conceptual blending](https://en.wikipedia.org/wiki/Conceptual_blending)
- [(PDF) Let's Figure This Out: A Roadmap for Visual Conceptual Blending](https://www.researchgate.net/publication/343290301_Let's_Figure_This_Out_A_Roadmap_for_Visual_Conceptual_Blending)
- [A Сritical View on Conceptual Blending Theory](https://escholarship.org/content/qt95p302sj/qt95p302sj_noSplash_915227ed37c13210752713ed4e659169.pdf?t=os5zwp)
- [(PDF) Features of Conceptual Blending in the Context of Visualisation](https://www.researchgate.net/publication/317937263_Features_of_Conceptual_Blending_in_the_Context_of_Visualisation)
- [Master the Art of Conceptual Blending: A Guide to Combining Unrelated Ideas for Innovation](https://alchemlearning.com/conceptual-blending-guide/)
- [Conceptual Blending → Term](https://lifestyle.sustainability-directory.com/term/conceptual-blending/)
- [Conceptual Blending and Composability | by Carlos E. Perez | Intuition Machine | Medium](https://medium.com/intuitionmachine/conceptual-blending-and-composability-b85d7234f1f2)
- [Blending tips and advanced concepts | Data Studio | Google Cloud Documentation](https://docs.cloud.google.com/looker/docs/studio/blending-tips-and-advanced-concepts)
- [Blending, Sampling and Segregation - Chemical Engineering | Page 1](https://www.chemengonline.com/blending-sampling-and-segregation/)
- [Efficient blending based on blending component availablity for a partial blend duration](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/7668622)
- [System for blending surfaces in geometric modeling](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/5251160)
- [Method and apparatus for on-line non-interactive blending using an uncoupling matrix](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/3940600)
- [Mapping Cultural Frame Shifting in Interaction Design with Blending Theory](http://www.ijdesign.org/index.php/IJDesign/article/view/323/162)
- [Metaphors of Conceptual Integration](https://web.pdx.edu/~cgrd/Metaphors%20of%20Conceptual%20Integration.html)
- [Conceptual Integration - Mark Turner](https://markturner.org/cinLEA.pdf)
- [Philosophy:Conceptual blending - HandWiki](https://handwiki.org/wiki/Philosophy:Conceptual_blending)
- [Conceptual blending - Wikipedia](https://en.wikipedia.org/?title=Conceptual_blending)
- [Neurohumanitiestudies](https://www.neurohumanitiestudies.eu/archivio/blending.pdf)
- [Conceptual blending — Grokipedia](https://grokipedia.com/page/Conceptual_blending)
- [www.academia.edu](https://www.academia.edu/80170223)

## User:

> 6/3/2026 13:30:07

Exploring: in the theory, how does it recognize that the same two input spaces in a blend result in modifications to an existing output space vs creating an entirely new output space upon each change?

## Assistant:

> 6/3/2026 13:30:54

This is the right question to push on, and the honest answer requires being precise about what the theory actually says versus what it leaves underspecified.

**What the theory actually says.**

Conceptual blending describes blending as a *cognitive process*, not as a discrete computational operation that produces an artifact with identity. In the original Fauconnier and Turner formulation, when a cognizer considers two input spaces and constructs a blend, there is one ongoing construction. If the cognizer reconsiders the same two input spaces a moment later with modified projections, the theory treats this as continued construction of the same blend, not as construction of a new one.

The reason this works in the theory is that mental spaces are *transient cognitive constructs*, not persistent artifacts. They exist in working memory while the cognizer is engaged with them. There is no "stored blend" that gets compared against a "new blend" to determine identity. The blend just is whatever the cognizer is currently constructing from those input spaces. Identity is sustained by *continuity of attention* — the cognizer is still working on the same blend because they haven't shifted to a different cognitive task.

Fauconnier (1996) and Turner are explicit that mental spaces "are interconnected, and can be modified as thought and discourse unfold." The modifiability is constitutive of mental spaces. There is no theoretical mechanism for distinguishing modification from replacement, because the theory doesn't need one — both are just continuations of the cognitive process.

**Where the theory's silence is informative.**

The theory's silence on your question is itself a finding. The theory doesn't have a notion of *blend identity* at all in the architectural sense you're working with. Identity in the theory is supplied by the cognizer's continuous engagement, not by anything in the structure of the blend itself.

What this means: when the same two input spaces produce different blends in different cognitive episodes (different cognizers, or the same cognizer at different times), the theory treats these as different cognitive events, not as different versions of the same blend. There is no "the blend" of these two inputs as an abstract object — there are particular cognitive episodes in which someone blends these two inputs in some particular way.

This is consistent with the theory's broader commitments. Conceptual blending is a description of how cognition works, not a specification of how to build persistent representations. The cognitive process produces transient constructs; persistence isn't part of the theoretical apparatus.

**What this implies for the question of identity criteria.**

If we ask the theory directly: "what are the identity criteria for a blend such that we can tell whether a modification produces the same blend or a new one?" — the theory does not answer. The question is outside its scope. The closest the theory comes is in describing what features stabilize a blend over time (composition, completion, elaboration converge on a stable structure), but it doesn't say at what point that stability counts as fixing the blend's identity.

The Wikipedia summary captures this: integration networks "can be modified at any moment as a discourse progresses." There is no terminus. There is no commitment point. The blend continues to be modifiable until the cognizer stops attending to it, and then the blend simply ceases to exist as a working construct (though its effects may persist in long-term memory as schemas, frames, or stabilized concepts).

**Where the literature offers partial answers.**

Three nearby concepts do partial work on this question.

*Stabilization.* The literature describes some blends as becoming stabilized through repeated use — the desktop interface metaphor, double-scope blends that get conventionalized, conceptual blends that enter the language. Stabilization is a *gradual social process* by which a blend's structure becomes fixed across many uses by many cognizers. It's not a single-event commitment by one cognizer. The theory uses stabilization to explain how new conventional structures arise from blending, but doesn't use it to define identity criteria for in-progress blends.

*Hyperblending / iterated networks.* When the literature talks about blends becoming input spaces for subsequent blends, the implication is that the original blend has reached *some* settled state sufficient to function as an input to a new blend. But the literature doesn't specify what makes a blend "ready" to function as input. It just describes that this happens.

*Material anchoring (Hutchins 2005).* Hutchins extends conceptual blending by introducing material anchors — external artifacts that fix some of the blend's structure in the world rather than in cognition. A navigation chart, a sextant reading, a written note all serve as material anchors. The implication is that *when a blend is materially anchored*, the anchor partially constitutes the blend's identity. Two cognizers attending to the same chart are engaging the same materially-anchored blend, in a way they couldn't be if the blend were purely mental.

This last point is the most useful for your architecture. Hutchins's material-anchor extension addresses precisely the problem you're working with: how does a blend acquire identity sufficient to persist across modifications and across cognizers? His answer: through external artifacts that fix the blend's structure in the world. Your architecture's persistent entities (substrate, blend instances, frames) are essentially material anchors in Hutchins's sense.

**What this means for your question.**

The theory itself doesn't recognize when modifications constitute the same blend versus a new one. It doesn't have to, because in the theory's terms blends are transient cognitive constructs whose identity is sustained by continuous attention. The question only arises when blends are *materialized as persistent artifacts*, which is exactly what your architecture does.

So the theory doesn't help you answer the question; it shows you that the question only exists in your architecture because you've taken a step the theory doesn't take. You've made blends into persistent artifacts. That step is faithful to Hutchins's extension but goes beyond the original theory. The identity question is yours to define.

A few implications follow.

The identity criteria can't be derived from the theory; they have to be *imposed* by the architecture as a design decision.

The closest theoretical guidance is Hutchins's material anchor concept: identity is constituted by the artifact. In your architecture, that means identity is whatever the architecture says it is when it creates a blend instance.

The question "same two input spaces, modification or new blend?" is unanswerable in the abstract. It depends on what the architecture is trying to support. If the architecture wants to support a Sam-and-you collaborative process where you both refine a blend over time, identity should be more permissive (modifications continue the same blend). If the architecture wants append-only history with full auditability of every change, identity should be more strict (every modification produces a new blend instance).

**The deeper question this surfaces.**

The choice of identity criteria is really a choice about *what the architecture is for*. Two interpretations of your architecture suggest different criteria:

*Architecture as cognitive prosthesis.* The architecture is helping individuals and groups think. Blends correspond to ongoing cognitive episodes. Identity is sustained by continuity of attention, materialized as a session or working context. Modifications during a session continue the same blend. New sessions produce new blends.

*Architecture as historical record.* The architecture is preserving the history of how a group's thinking has evolved. Every state is an artifact that should be addressable, citable, and inspectable. Modifications produce new blend instances with supersession relationships. Nothing is ever modified in place.

These are different products. The first is closer to a whiteboard or shared workspace. The second is closer to a version control system or scientific record. Your earlier assumptions (append-only, attribution on every change, recursive sedimentation) all point toward the second. But the cognitive realism of conceptual blending points toward the first.

The architecture probably wants to be both. Sessions correspond to ongoing cognitive episodes during which modifications continue the same blend. When a session is committed or paused, the blend is fixed and any further modification produces a new blend with supersession. This is closer to how version-controlled documents work — there's an in-progress working copy that can be modified freely, and commits produce immutable historical records.

But this is a design choice, not a theoretical deliverable. The theory doesn't tell you where to draw the line.

**Where I'll stop.**

The literature has been searched on this specific question. The honest finding: conceptual blending theory does not address blend identity criteria for materialized blends, because the theory doesn't treat blends as materialized in the first place. Hutchins's material anchor extension is the closest the literature gets, and it points toward identity being whatever the architecture establishes.

The question worth surfacing before moving on: do you want to explore the session-versus-commit distinction (in-progress modifications continue the blend, committed modifications produce new blends), or do you want to consider other ways of handling the identity question?

## User:

> 6/3/2026 13:45:00

The literature makes an implicit distinction between transient work (one persons attention for a period of time; not addressed for social / multiple people) vs persisted work (Hutchins artifact). The implication is that identity is only needed outside of transience?

## Assistant:

> 6/3/2026 13:45:32

Yes, that's the implication, and it's worth holding precisely because it has consequences for what your architecture has to handle and what it doesn't.

**The implication restated.**

In conceptual blending theory, transient work doesn't need identity criteria because the cognizer's attention provides identity. While someone is engaged with a blend, the blend just is whatever they're currently engaged with. There's nothing else it could be, because nothing else is competing for the role of "this blend."

The moment work becomes persistent (Hutchins's material anchor), identity criteria become necessary, because the artifact can now be referenced, modified by others, encountered later, compared to other artifacts. Persistence creates the conditions under which "is this the same blend or a different one?" becomes a meaningful question.

So the literature's implicit position is: identity is a property required only when work crosses from transient cognition into materialized artifact. Within transient cognition, identity is supplied by continuity of attention and doesn't need to be theorized.

**Why this matters for your architecture.**

This means your architecture has a *choice point* the literature doesn't address: at what moment does work cross from transient to persisted, and therefore at what moment does identity need to be established?

Several positions are available, each consistent with the literature's implicit framing:

*Persist on every action.* Every keystroke, every change is materialized. Identity is established from the first moment. This collapses the transient/persistent distinction by treating all work as immediately persistent. The cost is operational heaviness; the benefit is total auditability.

*Persist on session boundaries.* Work within a session is treated as transient (modifications continue the same in-progress blend). Session end (explicit save, timeout, context switch) materializes the work as a persistent artifact with identity. Modifications after that produce new artifacts. This matches the version-control analogy from the previous turn.

*Persist on explicit commit.* The user (or AI) explicitly marks work as ready for persistence. Until that moment, work is transient and identity is unstable. After commit, identity is fixed. This is closer to how published papers, signed contracts, or released software work.

*Persist on social sharing.* Work is transient as long as it's only visible to its author; the moment it becomes visible to others, it materializes as a persistent artifact with identity. This makes the transient/persistent distinction *social*: identity becomes necessary at the point when someone else might engage with the work.

The fourth option is particularly interesting because it aligns with both the literature's implicit framing (Hutchins's material anchors are inherently social — they're external structures that *other people* can engage with) and the collaborative foundation of your architecture (the substrate is fundamentally shared). It says: work is transient until it becomes shareable, and identity is established at the moment of sharing.

**The deeper structural point.**

If you accept the literature's implicit framing — identity is needed only outside of transience — then your architecture needs to be explicit about *where the transience boundary sits*. The architecture has to decide:

What constitutes transient work in this system?

When does transient work become persistent?

What identity criteria apply to persistent work?

The literature gives you a clean structural rationale for distinguishing these. Within transient work, you don't need to solve the identity problem because the cognitive process supplies identity. Across the boundary into persistent work, you need explicit identity because the cognitive process is no longer the only source of continuity.

This also means the architecture can be honest about *not solving* the identity problem in some regions. If a user is working alone in a draft state, the architecture doesn't need to track every revision as a separate blend with supersession relationships. It can just let the work be transient. Only when the work materializes — by being saved, shared, committed, or referenced — does the identity machinery engage.

**A useful framing this enables.**

The architecture has *two regimes*:

*Transient regime.* Work is being constructed. Identity is sustained by continuity of the working context (a session, a draft, an in-progress state). Modifications are not tracked as separate entities. The literature's silence on identity is operationally fine because the architecture mirrors the theory's assumption.

*Persistent regime.* Work has materialized. Identity is established by architectural commitment. Modifications produce new entities with supersession relationships. The append-only commitment and all the recursive structure apply here.

The transition between regimes is the place where the architecture has to make a choice (which of the four boundary positions above to use), but within each regime the behavior is consistent.

This is also probably more humane as a product. The user isn't burdened with versioning concerns while they're still thinking. The versioning machinery engages when it actually matters — when work crosses into a state where someone else might engage with it, or when the user themselves needs to reference it later as a stable artifact.

**Where this lands as a question for you.**

The literature has given you a structural rationale for thinking about this, but the boundary placement is still a design choice. The four boundary positions above (every-action, session, explicit-commit, social-sharing) each produce a different product character.

Which boundary best fits your intent? Or is there a different boundary worth considering?

There's also a sub-question worth being explicit about: are these regimes meant to be visible to the user, or hidden? If visible, the user knows when they're in transient versus persistent mode and can transition between them. If hidden, the architecture handles the transition automatically without surfacing it.

## User:

> 6/3/2026 13:50:17

This path precludes the option of group collaboration, where the group is cognizing - effectively a group that is doing joint work thats transient

## Assistant:

> 6/3/2026 13:50:53

You're right, and that exposes a real limitation in how I framed the boundary positions. Let me think through what you're naming.

**What I missed.**

I framed the transient/persistent boundary as if transience were inherently individual — "one person's attention for a period of time" was the literature's framing, and I carried that assumption into the four boundary positions. The fourth option (persist on social sharing) treats the moment work becomes visible to others as the point of materialization, which implicitly says: sharing equals persistence, and group work is therefore by definition persistent.

But that's wrong about what group cognitive work actually looks like. When a group is brainstorming on a whiteboard, working through a problem in conversation, co-constructing an idea in a meeting, sketching together on a shared canvas — they are doing transient cognitive work *together*. There's no individual cognizer; the cognition is distributed across multiple minds and a shared workspace. The work is transient in the same way individual thinking is transient: it's being constructed in real time, modifications are continuous, and identity is sustained by the group's shared attention rather than by any persistent artifact's structure.

The boundary I drew at "becomes visible to others" doesn't fit this case. The work is visible to others *throughout*, but it's still transient. The shared attention of the group is doing what individual attention does in the literature's account — sustaining identity without needing the identity machinery to engage.

**What the literature actually supports.**

Looking back at the search results, this is more visible than I initially read. Hutchins's distributed cognition is explicitly about group cognitive work: navigation teams aboard ships are doing distributed cognitive work across people and artifacts simultaneously. The unit of analysis is "a collection of individuals and artifacts and their relations to each other in a particular work practice." This is group transient cognition, materially anchored, with no individual cognizer being the locus.

Hutchins's "representational states" stored in "media" includes both transient and persistent media. A team plotting a course is creating representational states that are partly transient (the conversation, the gestures, the in-progress estimates) and partly persistent (the marks on the chart, the recorded fix, the written log). The architecture has to handle both.

So the literature actually does support group transient cognition; I just collapsed it incorrectly by treating the individual case from CB as the only model of transience.

**The corrected picture.**

Transience is not inherently individual. It's a property of *cognitive work that's being actively constructed and not yet materialized as a stable artifact*. The cognizer can be one person or a group. The continuity of attention that sustains identity can be one person's sustained attention or a group's coordinated joint attention.

This means the four boundary positions I offered need to be reconsidered. Some of them collapse the cases I shouldn't collapse:

*Persist on every action* — still treats every action as a boundary, which doesn't accommodate group transience.

*Persist on session boundaries* — sessions can be group sessions, so this actually works if "session" means "the period of joint attention by the group on this work."

*Persist on explicit commit* — works for groups as well, but requires the group to coordinate the commit decision.

*Persist on social sharing* — broken for the group transience case, because the work is socially shared throughout and is still transient.

Of the four, the session-based and explicit-commit positions adapt to group transience; the others don't.

**What the architecture has to support.**

Group transient cognition requires the architecture to support several things that I hadn't been explicit about:

*Shared transient workspaces.* A space where multiple people can co-construct work in real time, with modifications being continuous and joint attention sustaining identity. This is what whiteboards, shared docs in edit mode, and live collaboration tools provide. The architecture needs an analog.

*Joint attention as identity continuity.* The architecture needs to recognize when a group is engaged in joint work on the same thing, and treat that joint engagement as analogous to individual sustained attention. When the group disperses (members leave, the session ends, attention shifts), the work materializes.

*Multi-party commit.* The transition from transient to persistent work has to be doable by the group, not just by one individual. This might be explicit (someone says "let's save this") or implicit (the session ends, the work materializes automatically).

*Distinguishing joint transience from solo transience.* The architecture might need to know whether transient work is being done by one person or multiple, because the social dynamics differ. Solo transience can be private to that user; joint transience is inherently visible to the group.

**The corrected boundary framing.**

The boundary between transient and persistent isn't really about visibility to others. It's about *whether the work is currently being actively constructed by attentive cognizers* — individual or collective.

A revised set of boundary positions:

*Persist on attention dispersal.* Work is transient as long as someone (or the group) is actively attending to it. When attention disperses (timeout, explicit close, group disbands), the work materializes. This handles both individual and group transience uniformly.

*Persist on explicit commit by any participant.* Any participant in the transient work can declare it ready for persistence. The commit applies to the joint work, not just to that individual's view of it.

*Persist on structural milestones.* Certain events (a frame is fully applied, a blend instance is fully assembled, a stance is fully articulated) trigger materialization regardless of whether attention continues. The work continues to be modifiable but each milestone is a persisted snapshot.

The first option is closest to what group cognitive work actually looks like in practice. People work together on something; when they stop, what they made is preserved; further work continues from that preserved state.

**Where this lands.**

The architecture needs to support both individual and group transience, with persistence triggered by attention dispersal (or explicit commit, or structural milestone) rather than by social visibility. This means the substrate has *two layers*:

*Transient layer.* Active work in progress, by individuals or groups, with continuity of attention sustaining identity without requiring persistent identity machinery.

*Persistent layer.* Materialized work, with explicit identity, supersession relationships, and all the recursive structure.

The boundary between them is crossed by attention dispersal or explicit commit, and both individual and group work can occupy either layer.

This is more honest about what group work looks like and what the architecture has to support. Thank you for catching the misframing.

The question before moving on: does this two-layer model with attention-based transience fit, or are there cases this still misses?

## User:

> 6/3/2026 13:58:20

I want to see a concise comparison of models from other domains that address this, e.g. shared document work - in google doc the document is identified from the beginning and new versions are a separate act, and old versions can be resumed on

## Assistant:

> 6/3/2026 13:59:13

Here's a concise comparison across domains. I've picked models that handle persistent identity, transient work, and the relationship between them differently, so the contrasts are visible.

**Google Docs / collaborative document editing.**

Identity established at creation. The document is named and addressable from the first keystroke. All edits modify the same document; version history is a side-channel record that can be browsed but doesn't fragment identity. "Saving" is automatic and continuous. Group transience exists within the document — multiple cursors editing simultaneously — but it's not modeled as a separate state from solo work. Reviving an old version is an explicit action that overwrites the current state; old versions remain accessible but aren't independent documents.

Trade-off: simple identity, low operational overhead, but the history of how the document evolved is hard to reason about as a structured artifact. The version history is a log, not a graph.

**Figma / collaborative design files.**

Identity established at creation, like Google Docs. Multiplayer editing is first-class — multiple users see each other's cursors and selections in real time. Components and styles are first-class artifacts within the file, with versioning at that level. Branches (introduced later) allow parallel work that can be merged back. Auto-save throughout, with named version snapshots as explicit commits.

Trade-off: handles group transience well at the file level (joint editing is the default), but introduces an additional identity layer for components/styles that participants treat as more stable than the file itself.

**Git / source code version control.**

Identity is split across two layers. *Working copy* is transient — modifications happen freely without identity machinery engaging. *Commits* are persistent — each commit has a hash, is immutable, and has explicit parent relationships forming a DAG. The transition from transient to persistent is explicit (`git commit`). Branches allow multiple parallel transient working copies. Merges combine multiple persistent histories.

Trade-off: clean separation of transient and persistent, full history graph, but heavy operational overhead and a steep learning curve. Group transience is poorly supported — collaboration happens through repeated commit/push/pull, not through shared real-time work.

**Wiki / MediaWiki.**

Identity established at page creation. Every save is a new revision; old revisions are addressable and inspectable. Edits are atomic — you can't have a transient state visible to others, only your local draft and committed revisions. Edit conflicts (two people saving simultaneously) are surfaced and require resolution. Group transience doesn't exist as a first-class concept; collaboration happens through sequential edits.

Trade-off: full history, clean identity, but no real-time collaboration. Group work is implicit and sequential.

**Notion / Coda / collaborative wiki.**

Identity established at creation, like Google Docs. Real-time collaboration is supported. Version history is captured but treated as side-channel. Pages, databases, and views have their own identity; relations between them are first-class. Database views allow multiple lenses on the same data, treated as separate identities.

Trade-off: handles both individual and group transience reasonably, but the relationship between version history and current state is informal. No structured graph of how versions relate.

**Hypothes.is / web annotation.**

Identity is split across substrate and annotation. The substrate (a web page) has its own identity, often controlled by someone other than the annotator. Annotations are first-class artifacts with their own identity, attribution, and persistence. Group annotation is supported through groups/channels. Annotations can reference other annotations.

Trade-off: handles the substrate-cut separation explicitly (which is structurally what your architecture is reaching for), but doesn't address group transience in annotation-making — annotations are always atomic acts.

**Email / threaded conversation.**

Identity established at thread creation. Each message is immutable and has a parent (the message it replies to). Threads form a tree. There's no transient phase — drafts are private until sent. After sending, the message is permanent and can't be modified.

Trade-off: clean immutable history, but no group transience and no way to revise without producing a new artifact (a follow-up message).

**Conversation transcripts (Slack, Discord, Teams).**

Identity established per message. Messages are immutable (with limited edit windows on some platforms). Threads aggregate messages. Real-time presence indicates who's currently engaged. The boundary between transient and persistent is unclear — typing is transient (others see "X is typing"), sending is permanent.

Trade-off: handles group transience as a presence indicator but doesn't model the work-product being constructed. The transcript is a byproduct of conversation, not the artifact being made.

**Live whiteboarding (Miro, Mural, FigJam).**

Identity established at board creation. Multiple users edit simultaneously with cursor presence. Auto-save throughout. Snapshots can be taken as explicit commits. The board is the artifact; individual elements within the board don't usually have their own identity.

Trade-off: excellent group transience support (this is what they're built for), weaker structured-history (snapshots are flat images, not graph entries).

**Operating systems (Unix file system).**

Identity established at file creation. Edits modify the file in place. Old versions are not preserved unless explicit (backup, copy, snapshot). Transience is the default; persistence requires explicit save.

Trade-off: simple, but loses history by default. Not suited to collaborative or structured-history use cases.

**CRDT-based collaborative systems (DXOS, Automerge, Yjs).**

Identity established at creation. Every operation is captured as a CRDT update — a small immutable change that can be merged with others without conflict. The full operation log is the canonical history; the current state is computed from it. Multiple users contribute operations concurrently; the system merges them deterministically.

Trade-off: full operation history at fine granularity, supports group transience natively, but the operation log is usually too granular to be useful as a human-readable history. Higher-level identity (what constitutes a "version" worth naming) has to be layered on top.

**Scientific publishing (preprints, journal articles).**

Identity established at first publication (DOI, arXiv ID). Subsequent versions are new artifacts with explicit version numbers and relationships to the original. The original remains addressable; later versions are explicit revisions. Pre-publication work is entirely transient and private to the author.

Trade-off: clean identity, full history, but the persistence boundary (when does a draft become a publication?) is socially and editorially determined, not technically.

**Legal contracts.**

Identity established at signing. Drafts are transient and informal. The signed contract is immutable. Amendments are new artifacts with explicit reference to the original.

Trade-off: clear ceremony for persistence boundary (signing), but no support for collaborative drafting beyond passing documents back and forth.

**Comparison summary.**

The models cluster along a few axes:

*When identity is established.* At creation (Google Docs, Figma, Notion, wiki, CRDT systems), at commit (Git, scientific publishing, contracts), or per-message (email, Slack). Establishing at creation makes the document immediately addressable but conflates draft and final states. Establishing at commit cleanly separates transient and persistent but requires explicit ceremony.

*How group transience is handled.* Native real-time editing (Google Docs, Figma, Notion, Miro, CRDT systems), sequential editing (wiki, email), or not handled (Git in its standard usage). The native real-time editing tools have converged on auto-save with snapshots, which is essentially the "session boundary" pattern but with very fine granularity.

*Whether old versions are addressable.* Yes (Git, wiki, scientific publishing, CRDT logs), informally (Google Docs version history), or not (Unix files, Slack messages). Addressability of old versions is what enables the kind of recursive reference your architecture needs.

*Whether revisions form a graph.* Yes (Git, scientific publishing with versioning relationships), implicitly (wiki revision chains), or not (most others). A graph structure is what supports your supersession relationships and your DAG commitment.

**What this surfaces.**

The closest existing model to what your architecture seems to be reaching for is *Git with multiplayer working copy* — explicit commits forming a DAG, with full history and supersession relationships, but with a multi-user transient phase that the standard Git model doesn't support. Figma branching, multiplayer Git platforms like Replit, and some research systems are moving toward this combination, but no widely-used model has fully solved it.

The other notable absence: no existing model treats the *substrate-cut* separation the way your architecture does. Everything I listed treats the artifact as a single thing with versioning. Your architecture wants to separate the underlying material from the framings applied to it, which is closer to how annotation systems work but at the level of the whole architecture rather than at the level of marginal commentary.

The honest read: your architecture is reaching for a combination of (a) Git's commit-based persistence with full graph history, (b) Google Docs's real-time multiplayer transience, (c) Hypothes.is's substrate-annotation separation, and (d) Figma's component-level identity layering. No single existing model does all four. That's part of what makes the architecture distinctive and part of what makes it hard to build.

Before moving on, the question worth surfacing: which of these models is closest to the right starting reference for your architecture? Or is the architecture distinctive enough that no single starting point is right?

## User:

> 6/3/2026 14:00:41

Look at Hutchins, more empirical and theoretical POVs

## Assistant:

> 6/3/2026 14:02:32

> Excavated Hutchins's empirical findings on representational persistence and cognitive distribution.
>
> - Hutchins distributed cognition empirical study artifact identity persistence transient
> - I need to dig into the empirical literature more carefully, particularly that "How a Cockpit Remembers Its Speeds" paper and similar studies that directly address whether these effects are persistent or transient.
> - Hutchins "How a Cockpit Remembers" representational state memory artifact
> - I'm seeing that Hutchins' cockpit paper provides a really useful framework for understanding how long different representational states persist—from the transient physical configurations that only exist during their creation, to the semi-permanent speed cards that stick around much longer, with things like airspeed indicators falling somewhere in between. The speed bugs are another category worth examining here.
>   
>   What strikes me is that the system deliberately shifts computational work from high-pressure moments like landing approaches into calmer periods by encoding that work into persistent artifacts—the pilots essentially pre-compute and store information in the cockpit itself rather than trying to remember and calculate it under stress. This suggests representational persistence isn't binary but exists on a spectrum, and the system strategically moves work across different durations depending on when it's needed. I should look into Hutchins' work on material anchors for conceptual blending since that seems directly relevant to this question.
> - Hutchins "material anchors for conceptual blending" 2005 stable structure
> - I'm organizing Hutchins's key empirical findings on how different representational media persist or fade—from the cockpit study showing flap configurations that vanish immediately to speed cards that maintain semi-permanent status, each with distinct functional roles in maintaining cognitive work. the appropriate speeds permanently printed on the card."
>      - Airspeed indicators with bugs: "Physical, dynamic" 
>      - Speed bugs are notable because they convert ephemeral computation into persistent artifacts
>      - The pilots STRATEGICALLY move computational work into artifacts during calmer periods so they don't have to do it during demanding periods
>      
>   2. **Material Anchors paper (2005):** Two principal ways to achieve stability in conceptual models:
>      - Cultural models (intrapersonal + interpersonal processes)
>      - Association with material structure (material anchors)
>      - The stability of representations is a "necessary feature of reasoning"
>      - Material anchors allow some parts to be manipulated while others remain stable
>      - "Conceptual structure must be represented in a way that allows some parts of the representation to be manipulated, while other parts remain stable"
>   
>   3. **Distributed cognition framework:** 
>      - Cognitive activity is distributed across people, artifacts, and procedures
>      - Different media store representational states with distinct properties
>      - The cognitive system gains emergent properties from how representations interact across these different media
>      - Cultural practices form a core part of how humans actually think
>   
>   What's striking is that Hutchins's empirical work demolishes the simple transient-versus-persistent distinction I was working with. Representations actually exist along a spectrum—from momentary states like flap positions to dynamic indicators to temporary task-specific artifacts like speed bugs set for a particular landing, all the way up to semi-permanent and truly permanent structures. The key insight is that pilots strategically offload ephemeral cognitive work into persistent artifacts during quieter moments, reducing the mental load when things get demanding. This is exactly what your system needs to enable—letting users convert their computational thinking into durable artifacts.
>   
>   The material anchor concept is equally important: stability comes from physical structure. A speed bug has identity because of its physical mark on the gauge. In your architecture, addressable entities serve that same function. And crucially, material anchors don't lock everything in place—they allow some elements to be manipulated while others stay fixed, which maps directly onto your in-progress versus persistent distinction.
>   
>   So the empirical work suggests the binary model is too simplistic. What's actually happening is a spectrum of durations, with cognitive systems strategically moving work between them. Identity for persistent representations emerges from material anchoring—having an addressable entity. And within a single artifact, some parts can be in flux while others remain stable.
>   
>   For your architecture, this means supporting multiple durations simultaneously, letting users promote work from transient to persistent when it matters, and anchoring identity through addressable entities that can be partially modified while maintaining stability—like how a blend instance could be locked at certain points while still being adjusted elsewhere.
>   
>   This connects to how pilots materialize mental computation into physical artifacts strategically, deciding when to anchor something. The whole system is distributed memory with different temporal properties, similar to how a cockpit functions. There's also relevant work from Latour on inscription devices, Goodwin on how artifacts structure professional perception, and Norman's cognitive artifacts framework.
>   
>   Now I'm pulling in additional theoretical perspectives — Bowker and Star's boundary objects that maintain coherence across different communities, Clark's extended mind thesis, and activity theory approaches. I should present these findings as empirical and theoretical grounding without proposing new frameworks or vocabulary, keeping the response structured and substantive.
> - **Done**

Hutchins's empirical and theoretical work has more to say than I'd surfaced. Here are the findings, with the implications for your question.

**The cockpit study (1995): empirical evidence of a duration spectrum.**

Hutchins's "How a Cockpit Remembers Its Speeds" is the most directly relevant empirical study. He analyzed the cognitive system in a commercial cockpit during landing and identified multiple representational media with different durability properties:

*The wing flap configuration* — "Endures only during its production, temporal." The most transient. It exists physically while the pilots are manipulating it.

*Airspeed indicators with bugs* — "Physical, dynamic." The dial shows current speed continuously; the bug (a small mechanical marker) marks target speed and persists for the duration of the approach.

*Speed cards* — "Semi-permanent. Contains the weight interval with the appropriate speeds permanently printed on the card." These are printed reference cards that survive the lifetime of the aircraft, modifiable only by the manufacturer.

*Verbal communications between crew* — transient but recoverable through joint memory.

*The crew's individual memories* — internal, not directly observable, varying in duration.

Hutchins explicitly identifies these as a *cognitive system* whose properties emerge from the interaction of representations in different media. The cockpit-as-a-system "remembers" speeds not in any single place but in the interactions across this set of media. Identity of the represented information lives across the system, not in any single artifact.

The crucial empirical observation for your question: pilots *strategically convert* between durations. They set the speed bugs during calmer periods (early in the descent) so the bugs serve as persistent reminders during demanding periods (landing approach). Ferd Chu's summary of the paper captures this directly: "by moving the memory requirements ('remembering the speeds and configurations') into artifacts in the cockpit, they can take computational tasks done at a calmer time and use them to reduce the cognitive work in more demanding periods."

This is empirical evidence that the boundary between transient and persistent isn't binary and isn't fixed. The cognitive system continuously moves work between durations based on when stability is useful and when flexibility is needed.

**The Material Anchors paper (2005): theoretical framing.**

Hutchins's "Material Anchors for Conceptual Blends" formalizes the cockpit findings into a theoretical extension of conceptual blending. The core claim:

"Reasoning processes require stable representations of constraints. There are two principal ways to achieve stability in conceptual models. First, the conceptual models that anthropologists call cultural models achieve representational stability via a combination of intrapersonal and interpersonal processes. Second, the association of conceptual structure with material structure can stabilize conceptual representations."

The deeper structural claim is this: "Conceptual structure must be represented in a way that allows some parts of the representation to be manipulated, while other parts remain stable. The complexity of the manipulations of structure can be increased if the stability of the representations can be increased."

This directly addresses your question. The cognitive operation doesn't require a binary distinction between in-progress and committed. It requires *partial stability*: some elements held fixed while others are manipulated. The anchored parts provide identity and stability; the manipulated parts provide flexibility. A blend in progress is one whose anchored parts give it identity while its other parts are still being worked out.

Hutchins's examples are illuminating. A clock face anchors the abstract concept of cyclic time in a physical mechanism — the numbers and dial positions are stable, but the hands move continuously. The clock has identity throughout despite the continuous motion. A slide rule anchors logarithmic arithmetic in physical position — the scales are stable, the slider moves. A queue of people anchors order-of-arrival in spatial position — the line shape is stable, individual people move within it.

The pattern across these: identity comes from the stable parts of the material anchor. Manipulation happens within the parts that aren't anchored. There's no commitment ceremony, no version boundary, no in-progress versus committed distinction. There are anchored elements (which provide identity) and free elements (which provide manipulability).

**Cultural models: identity through social process rather than material structure.**

Hutchins's other stability mechanism — cultural models — provides identity through "a combination of intrapersonal and interpersonal processes." Cultural models are shared mental structures that are stabilized by being held by many people simultaneously. The Lean Canvas, treated as a cultural model among Lean Startup practitioners, has identity not because it's stored in a particular place but because many people share roughly the same mental representation of what it is.

This addresses the group transience case. Group work has identity not because it's materialized as an artifact but because multiple participants are holding a shared mental representation of what they're working on. The work is socially anchored even when it's not yet materially anchored.

**Other empirical and theoretical lineages worth knowing.**

Several adjacent traditions inform this question:

*Bruno Latour (Science in Action, 1987)* — develops the concept of "immutable mobiles," inscriptions that can travel between contexts while maintaining their structure. Scientific instruments, charts, photographs, and diagrams are immutable mobiles that allow distributed work to coordinate. Identity is established by inscription; mobility is what makes the inscription socially useful.

*Charles Goodwin (Professional Vision, 1994)* — empirical study of how professionals see structured environments. His work on archaeology, oceanography, and legal proceedings shows how professional communities construct shared ways of seeing through trained perception plus material artifacts (Munsell color charts, transcript notations, courtroom diagrams). Identity of objects of attention is established through coordinated professional practice.

*Susan Star and James Griesemer (Boundary Objects, 1989)* — empirical study of how scientific work coordinates across communities. They identify "boundary objects" as things that maintain identity across communities even while having different meanings within each. A museum specimen is a boundary object — it has stable identity as a physical thing while different scientific communities treat it differently. This directly addresses how identity can be maintained across observers who frame the same substrate differently.

*Activity theory (Engeström, building on Vygotsky and Leont'ev)* — theoretical framework treating cognition as activity mediated by tools, signs, and community. The unit of analysis is the activity system, with the artifact's identity being established by its role in the system rather than by any inherent property. Engeström's "expansive learning" addresses how artifacts (and the activities they're part of) evolve over time through contradictions and resolution.

*Andy Clark and David Chalmers (Extended Mind, 1998)* — philosophical argument that cognitive artifacts (notebooks, phones, navigation tools) are literally parts of the cognitive system when they're tightly coupled to the user. The artifact's identity is co-constituted with the user's cognitive activity. Olo notebooks become extensions of memory; their identity is established by their role in supporting memory functions.

*Donald Norman (Cognitive Artifacts, 1991)* — empirical/design analysis of how artifacts amplify and transform cognition. The "personal view" (what's in the head) and "system view" (the artifact and how it's used) need to be distinguished. Identity in the system view is established by the artifact's affordances and constraints; identity in the personal view is established by how the user mentally engages with it.

**Synthesizing across these.**

The literature converges on several points that bear on your question:

*Identity is not binary.* Across Hutchins, Latour, Goodwin, Star and Griesemer, and Activity Theory, identity exists in degrees. A representation can be partially stabilized through material structure, social conventions, or coordinated activity. Full stabilization is rare and is usually achieved through some combination of all three.

*Identity is established through anchoring.* Whether the anchor is material (Hutchins's speed cards), social (Star and Griesemer's boundary objects), or activity-based (Engeström's activity systems), identity comes from anchoring some parts of the representation while allowing other parts to remain flexible.

*Strategic conversion between durations is a fundamental cognitive operation.* Hutchins's pilots converting mental computation into bug settings, Latour's scientists converting field observations into immutable mobiles, Goodwin's archaeologists converting visual perception into Munsell-coded notations — all involve deliberately moving work from less stable to more stable representational media when the stability becomes useful.

*Group work has identity through social anchoring even when not materially anchored.* The cultural-models mechanism in Hutchins, the boundary-object mechanism in Star and Griesemer, and the joint-attention mechanism in distributed cognition all describe how groups maintain shared identity of work products without requiring those products to be materialized.

*Material anchoring and social anchoring complement each other.* A boundary object works both materially (it's a stable physical thing) and socially (multiple communities anchor their work to it). The cockpit speed card works both materially (it's printed) and socially (the procedures around it are shared culture). Real cognitive systems use both kinds of anchoring simultaneously.

**The implication for your architecture.**

The binary transient-versus-persistent framing I'd been using doesn't survive contact with this literature. Hutchins's empirical work in particular shows that the question your architecture has to handle is *which parts of a blend are anchored*, not *whether the blend is in-progress or committed*.

This suggests a different way of thinking about identity. A blend instance has identity from the moment it has any anchored elements. Anchoring can be material (the entity exists in the substrate, has a persistent identifier, is addressable) or social (multiple participants are jointly attending to it). Different parts of the blend can have different degrees of anchoring at different times. As more parts become anchored, the blend's identity becomes more stable. The blend doesn't transition from "in-progress" to "committed" as a single event — it accretes anchoring incrementally.

This also suggests that your architecture's "session" or "explicit commit" boundary, which I proposed earlier, is at the wrong level of granularity. The relevant boundary is at the *element* level, not the *blend* level. Parts of a blend can be anchored while other parts remain flexible. A blend instance is identifiable as long as it has *enough* anchored elements to support reference; the in-progress parts don't preclude identity, they just preclude full stability.

This also makes the group transience case clean. A group co-constructing a blend can have it socially anchored throughout (everyone is jointly attending), with parts becoming materially anchored as the work proceeds. The blend has identity from the start; materialization happens incrementally; the question is just which elements are anchored at any given moment, not whether the blend is "transient" or "persistent" as a whole.

**Where this lands as a question for you.**

The empirical literature has moved the design question from "where is the transient/persistent boundary?" to "how does the architecture represent partial anchoring?" The latter is a richer question and probably the right one.

Some sub-questions that follow:

How does an element become anchored? By being assigned identity in the substrate? By being committed by user action? By being jointly attended to by multiple participants?

Can anchoring be partial or graded? Can an element be "mostly anchored" or "weakly anchored"? Or is anchoring binary at the element level even if it's gradient at the blend level?

How does the architecture represent the difference between socially anchored work (jointly attended but not yet materialized) and materially anchored work (in the substrate with persistent identity)?

I'll stop here. Do you want to explore the partial-anchoring question, or is there a different direction this opens up that's worth pursuing first?

---

**Sources:**

- [Distributed cognition](https://en.wikipedia.org/wiki/Distributed_cognition)
- [375 f o u r t e e n The Distributed Cognition Perspective on Human Interaction](https://pages.ucsd.edu/~ehutchins/integratedCogSci/DCOG-Interaction.pdf)
- [Distributed Cognition](http://faculty.lawrence.edu/wp-content/uploads/sites/18/2015/11/DCog.pdf)
- [Distributed Cognition - an overview | ScienceDirect Topics](https://www.sciencedirect.com/topics/social-sciences/distributed-cognition)
- [Cognition, Distributed](https://pages.ucsd.edu/~johnson/COGS102B/Hutchins01.pdf)
- [(PDF) Distributed Cognition](https://www.researchgate.net/publication/280243695_Distributed_Cognition)
- [Distributed Cognition | Social Learning Theory](https://blogs.ubc.ca/sociallearning512/distributed-cognition/)
- [Distributed Cognition Edwin Hutchins ...](https://arl.human.cornell.edu/linked%20docs/Hutchins_Distributed_Cognition.pdf)
- [Cognition, Distributed](https://www.researchgate.net/publication/290865644_Cognition_Distributed)
- [1 HOW A COCKPIT REMEMBERS ITS SPEEDS Edwin Hutchins](https://pages.ucsd.edu/~johnson/COGS102B/Hutchins95.pdf)
- [Paper: How a Cockpit Remembers Its Speed](https://ferd.ca/notes/paper-how-a-cockpit-remembers-its-speed.html)
- [[PDF] How a Cockpit Remembers Its Speeds | Semantic Scholar](https://www.semanticscholar.org/paper/How-a-Cockpit-Remembers-Its-Speeds-Hutchins/abb99746f14064e67a08594820abcac11c6a1b1a)
- [How a Cockpit Remembers Its Speeds - Hutchins - 1995 - Cognitive Science - Wiley Online Library](https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1903_1)
- [Cognitive Ethnography: How a Cockpit Remembers its Speeds (Hutchins)](https://cogs102b.blogspot.com/2007/02/how-cockpit-remembers-its-speeds.html)
- [Edwin Hutchins, How a cockpit remembers its speeds - PhilPapers](https://philpapers.org/rec/HUTHAC)
- [How a cockpit remembers its speeds - ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/0364021395900209)
- [Material anchors for conceptual blends Edwin Hutchins](https://cognitivearchaeologyblog.wordpress.com/wp-content/uploads/2015/11/hutchins-2005-material-anchors.pdf)
- [Material anchors for conceptual blends](https://www.researchgate.net/publication/222706442_Material_anchors_for_conceptual_blends)
- [Material Anchors for Conceptual Blends Edwin Hutchins](https://pdfs.semanticscholar.org/af2d/d8c20fc2ff15463784bbcba1771535008f4b.pdf)
- [Material anchors for conceptual blends - [PDF Document]](https://fdocuments.in/document/material-anchors-for-conceptual-blends.html)
- [Material anchors for conceptual blends - ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0378216605000597)
- [[PDF] Material anchors for conceptual blends | Semantic Scholar](https://www.semanticscholar.org/paper/Material-anchors-for-conceptual-blends-Hutchins/471ae1ae068f855dbf363887dd091517360a34a1)
- [Material Anchors in Language Learning - PMC - NIH](https://pmc.ncbi.nlm.nih.gov/articles/PMC12831612/)
- [Google Scholar](https://scholar.google.com/scholar_lookup?title=Material+anchors+for+conceptual+blends&amp=&author=E.+Hutchins&amp=&publication_year=2005&amp=&journal=J.+Pragmat.&amp=&volume=37&amp=&pages=1555-1577)

## User:

> 6/3/2026 14:12:19

A simple case: is the identity of a blend the join of the identifies of all of the input spaces?

## Assistant:

> 6/3/2026 14:12:53

Good test case. Let me think this through carefully before answering, because the simple version has problems that surface immediately.

**The simple version of the proposal.**

The identity of a blend is fully determined by the identities of its input spaces. Same input spaces means same blend. Different input spaces means different blend. Identity is the join (or set, or tuple) of input identities.

This has appeal — it's clean, computable, and avoids needing any commitment ceremony. The blend's identity falls out automatically from its inputs.

**Where it breaks.**

Several cases break it.

*Same inputs, different selective projections.* You and Sam both blend the same two substrate entities (the original $5/month claim and the Maria interview). You project the pricing aspect of the interview; Sam projects the willingness-to-pay aspect. Your blends will have different content. If identity were just the join of input identities, your blend and Sam's would have the same identity — which is wrong, because they're different blends.

*Same inputs, different generic spaces.* The same two inputs can be blended under different generic spaces, producing different blends. If identity were just inputs, these would collapse to the same blend even though they're substantively different.

*Same inputs, different network types.* The same two inputs could be blended as a simplex network (using one as a frame) or as a single-scope network (treating both as content). Same inputs, structurally different blends, would collapse to the same identity.

*Same inputs, different elaboration.* Even with identical inputs, generic space, and network type, the "running the blend" elaboration phase can produce different blends depending on what's elaborated. Two cognizers (or you at different times) running the same blend can produce substantively different blended spaces.

*Same inputs, same blend, different times.* Conversely, if you blend the same two inputs twice in quick succession with identical intent, you probably want these to be the same blend, not two different ones. Pure join-of-inputs would treat them as the same; that's correct for this case but breaks the previous cases.

So the simple version has a real problem: it can both *over-identify* (collapsing genuinely different blends into one identity) and *under-identify* (failing to recognize when two blends are actually the same).

**What the literature suggests instead.**

The literature converges on identity being established by the *blending operation itself*, not by its inputs. Several pieces of evidence:

Fauconnier and Turner treat each blend as a distinct cognitive event. Two events involving the same input spaces are different blends because they're different events — they have different cognizers, different times, different selective projections, different elaborations. The inputs are necessary but not sufficient for blend identity.

Hutchins's material anchors suggest that identity comes from the anchoring of the blended space itself, not from its inputs. The clock-face anchor for cyclic time is one specific clock face; another clock face with the same conceptual structure is a different anchor with a different identity.

Star and Griesemer's boundary objects are identified by the object itself (the specimen, the chart, the map), not by the things it's connecting.

The pattern: identity is established by *the blend as a constructed thing*, not by the constituents that went into it.

**A more accurate version.**

The identity of a blend is established when the blend itself is anchored — materially (assigned a persistent identifier in the substrate) or socially (jointly attended to by participants). The inputs are referenced *by* the blend but don't constitute its identity.

So in your architecture, a blend instance has its own identity from the moment it's instantiated. The inputs are edges from the blend instance to other entities. Two blend instances can reference the same inputs and still be different blends because they're different instances with different identities.

This is also closer to how the underlying graph model works. A node has identity. Edges from the node to its inputs are relationships, not constitutive of the node's identity. The node could in principle exist with no edges (a blend instance with no inputs would be incoherent, but the identity mechanism doesn't depend on the edges).

**One more subtlety.**

There's a related question worth flagging: when the same inputs are blended again with the same intent, is that the *same* blend or a *new* blend that happens to be very similar?

The literature implies it's a new blend. Each blending operation is a distinct cognitive event. Even when two operations produce structurally identical blends, they're different blends because they're different events.

The architectural consequence: deduplication isn't possible. The architecture can't decide "you've already blended these inputs, so we'll return the existing blend instance." Every blending operation produces a new blend instance, even if structurally identical to a prior one. This is consistent with the append-only commitment.

If a user *wants* to refer to an existing blend rather than create a new one, that's a different operation — they're referencing an existing entity, not blending. The architecture should distinguish "create a new blend with these inputs" from "reference an existing blend that happens to have these inputs."

**Answering your question directly.**

No, the identity of a blend is not the join of the identities of its input spaces. The inputs are referenced by the blend but don't constitute its identity. The blend has its own identity established when it's anchored (materially or socially). The inputs appear as edges from the blend to other entities in the graph, not as components of the blend's identifier.

This also implies that the blend identifier is independent of the inputs in a useful way: if an input is later modified or superseded, the blend's identity doesn't change. The blend still refers to the input it was blended from. The graph edge points at the specific version of the input that was used.

**Where this leaves the next question.**

If identity is established by anchoring rather than by inputs, then the question becomes: what does anchoring look like in your architecture? Several possibilities:

*Anchoring at instantiation.* The moment a blend instance is created in the substrate, it has an identifier. It's anchored. Even if the blend is still being constructed, the instance exists and is addressable.

*Anchoring at first reference.* The blend instance is anchored when someone (or something) first references it from another entity. Until then, it's transient.

*Anchoring at materialization.* The blend instance is anchored when it's saved, committed, or otherwise materialized. Transient construction prior to materialization doesn't have identity.

These differ in operational consequences but they all reject the "identity from inputs" idea. Which feels right, or is there a different anchoring model worth considering?

## User:

> 6/3/2026 15:22:01

let's make it anchored as soon as its instantiated; so that

* e.g. we can work on blend together
* e.g. I/we can go back to a blend and add/remove inputs, projections, etc
* e.g. if an instantiated blend Y uses input space X and then that input space X gets new material (e.g. a new set of customer interviews are added and appear in input space X) then then blend/space Y can be shown as having new input and ready for potential revision

## Assistant:

> 6/3/2026 15:22:40

Confirmed. Anchoring at instantiation, with the three use cases you've named driving the requirements.

Let me make sure I understand the implications before working on consequences, because the three examples reveal architectural commitments that aren't obvious.

**Example 1: working on a blend together.**

Anchored-at-instantiation makes this work because the blend has an identifier from the moment it's created. You and Sam can both reference the same blend instance, see each other's modifications, and jointly build it. The substrate has one entity for the blend, both of you are operating on it, no need for materialization ceremony.

But this raises a question: what does "modification" mean for an anchored entity if the architecture is append-only? Two possibilities:

*Modifications produce new versions of the blend instance.* Each modification creates a new entity that supersedes the prior one. You and Sam are each producing versions of the blend rapidly, with the architecture tracking the supersession chain. This preserves append-only but produces lots of versions.

*Modifications are recorded as separate operations on a stable blend instance.* The blend instance persists; modifications are recorded as events (additions of inputs, changes to selective projection, etc.) that compose to produce the current state. The blend's content is computed from its history. This is similar to how CRDTs and event-sourced systems work.

The second is more aligned with what your collaboration assumptions require. The first would produce a confusing version history in real-time collaboration. But the second is more complex to implement.

Which fits your intent?

**Example 2: going back to a blend and adding/removing inputs and projections.**

This requires that the blend remains modifiable indefinitely, not just during initial construction. You can return to a blend you made last week and add a new input or change a selective projection.

Implication: there's no "completion" state for blends. They remain mutable for as long as anyone wants to modify them. This is consistent with anchored-at-instantiation but it has consequences for collaboration and supersession.

A few sub-questions:

When you modify a blend later, is that a new version of the blend (with the old version superseded), or is it a continued modification of the same blend (with history)?

If Sam was working with the old version of the blend before your modification, does her work continue to reference the old version, or does it follow the modifications?

Do modifications need to be attributed (we can see that Sam added input X to the blend on Tuesday) or is the blend just "the current state" without per-element attribution?

The append-only commitment from earlier in our conversation pulls toward "every modification is a new version with full attribution." But that produces lots of versions for what's logically the same blend being refined.

**Example 3: input space X gets new material, blend Y is flagged for potential revision.**

This is the most interesting case and surfaces something important. You're saying: when an input changes, blends that reference it should be aware and flag themselves for review.

This implies two things:

*Edges from blends to inputs are not snapshots of specific versions of the input.* If the blend's edge to input X referred to a specific version of X at the time of blending, then adding new material to X wouldn't affect the blend — the blend would still reference the old version. Your intent is the opposite: the blend's reference to X follows X's evolution.

*The architecture proactively notifies blends about input changes.* When X gets new material, the architecture identifies all blends that reference X and surfaces them as candidates for revision. This requires backward indexing (knowing which blends reference which inputs) and some notification mechanism.

This is closer to how spreadsheet formulas work than how Git references work. A formula `=A1+B1` follows whatever's currently in A1 and B1; it doesn't snapshot the values at the time the formula was written. Your blend references seem to want the same property.

There's a tension worth flagging. The append-only commitment and the input-version-as-snapshot model are aligned with each other — both say that references point at specific historical states. But your Example 3 says that blend references should follow inputs as they evolve. These are inconsistent unless we add something.

Three ways to resolve the tension:

*Inputs are themselves stable identifiers that point at evolving content.* Input X has a stable identity, but its content evolves over time. The blend's edge to X follows X's identity, not a specific version of X's content. New material gets added to X (appending to its content), and blends that reference X are notified of the change.

*Blends reference inputs with explicit "as of" semantics, but also have a separate mechanism for tracking "input has changed since I referenced it."* The blend's reference is a snapshot, but the architecture maintains a separate "currently outdated" flag that surfaces when an input has new material the blend hasn't incorporated.

*Blends reference inputs as live references and there's an optional way to pin a specific version.* Default behavior is live; pinning is opt-in. This is closer to how Notion and many modern tools handle references.

The first option preserves the append-only commitment most cleanly — input X has a stable identity and an append-only history of content additions, and blends watch for additions to X. The second is more complex but gives more control. The third is the most flexible but requires users to think about pinning.

Which fits your intent for how inputs and blends relate?

**A meta-question.**

These three examples together suggest a model that's quite different from what I'd been sketching:

Blends are stable entities that persist and are modifiable over time.

Modifications produce a history (whether as separate versions or as events on the stable entity is the question above).

Inputs are stable identities that can themselves accumulate content over time.

Edges from blends to inputs are live references that follow input evolution.

When inputs evolve, dependent blends are notified.

This is closer to a *graph of stable entities with append-only content and live cross-references* than to *immutable snapshots in an append-only history*. The two models have different properties and different implementations.

The Git analogy I drew earlier is less apt; the spreadsheet analogy is closer. Or, more precisely: it's closer to event-sourced systems where entities have stable identities but their state is computed from an append-only event log, with cross-references being to entity identities rather than to specific event-log positions.

Does this revised mental model match your intent? Before I work on consequences, I want to be sure the model is right.

## User:

> 6/3/2026 15:28:15

Example 1: what's the difference from the user's POV?
Example 2: 

* "When you modify a blend later, is that a new version of the blend (with the old version superseded), or is it a continued modification of the same blend (with history)?" -> lets answer Example 1 to drive this answer
* "If Sam was working with the old version of the blend before your modification, does her work continue to reference the old version, or does it follow the modifications?" -> lets answer Example 1 to drive this answer
* "Do modifications need to be attributed (we can see that Sam added input X to the blend on Tuesday) or is the blend just "the current state" without per-element attribution?" -> ideally there's attribution
Example 3: Blends reference inputs with explicit "as of" semantics, but also have a separate mechanism for tracking "input has changed since I referenced it."

Yes this revised model matches my intent; 

Lets work on scenarios if needed to refine

## Assistant:

> 6/3/2026 15:29:15

Good. Let me address Example 1 first since it gates the others, then look at how the resolved model plays out in scenarios.

**Example 1: the user's POV difference between the two modification models.**

The two models I named were:

*Version-per-modification.* Each modification creates a new blend instance that supersedes the prior one. The substrate accumulates many versions of "the blend."

*Stable instance with event log.* The blend instance is one entity. Modifications are events recorded against it. The current state is computed from the event history.

From the user's POV, what differs:

*How "the blend" is referenced from other places.* In the version model, references must point at a specific version (or at "the latest version of X," which requires the architecture to resolve to a specific version each time). In the stable-instance model, references point at the blend's stable identity, and the current state is whatever it currently is.

*How real-time collaboration feels.* In the version model, you and Sam editing together produces a rapid chain of superseding versions. If Sam looks at "the blend" while you're typing, she sees the latest version at that moment, but the version identifier keeps changing. In the stable-instance model, you and Sam are working on the same entity; modifications appear in real time without changing the entity's identity.

*How history looks.* In the version model, history is a chain of complete blend states, each fully formed. You can compare any two states in their entirety. In the stable-instance model, history is a sequence of modification events. To see a complete state at a past moment, you replay events up to that point.

*How attribution works.* Both models can support attribution, but they record it differently. Version model attributes the version as a whole to whoever produced it. Stable-instance model attributes each modification event to its author. The stable-instance model gives finer-grained attribution; the version model gives coarser-grained but more easily browsable history.

*Operationally, what feels like "saving."* Version model: there isn't really saving; each modification is immediately persisted as a new version. Stable-instance model: same, but it feels less like producing new artifacts and more like collaborating on a living document.

*How "going back to an old state" works.* Version model: you can pin a reference to a specific version, or roll back by superseding the current version with content from an old one. Stable-instance model: you can view past states by replaying to a point in history, and roll back by adding a new event that reverses prior events.

The honest summary of the difference: the version model treats each blend state as a distinct artifact; the stable-instance model treats the blend as one persistent thing with a history of changes. From the user's perspective, the second feels more like a living document (Google Docs, Figma) and the first feels more like a series of snapshots (Git commits, file versions).

Given your three use cases — working together on a blend, returning to modify it, having inputs evolve under blends — the stable-instance model is a much better fit. The version model produces noise in real-time collaboration (constant superseding) and friction in modification (the blend keeps changing identity). The stable-instance model handles both naturally.

**Cascading answers to Example 2.**

If we adopt the stable-instance model:

*Modification is continued work on the same blend with history.* The blend has stable identity; modifications are events recorded against it. No supersession of the blend itself; just accumulation of events.

*Sam's work follows the current state of the blend.* Her references point at the blend's stable identity, so they see whatever the blend currently is. If she needs to reference a specific historical state (because her work depended on the blend being a certain way at a certain time), she can do that explicitly with "as of" semantics — similar to how Example 3 handles input changes.

*Attribution is per-event.* Each modification event has an author and timestamp. We can see that Sam added input X on Tuesday, you removed projection Y on Wednesday, and the AI inferred slot filler Z on Thursday.

**The resolved model, restated.**

Drawing your responses together:

Blends are stable entities anchored at instantiation. They have one identity that persists for the entity's lifetime.

The blend's content is the result of an append-only sequence of events: input added, input removed, projection added, projection removed, slot filler set, generic space proposed, generic space accepted, etc.

Each event is attributed and timestamped.

Edges from blends to inputs are live references with explicit "as of" semantics — by default, the edge points at the input's stable identity and follows its evolution; the user can pin to a specific version when needed.

When an input evolves, blends that reference it are flagged for potential revision.

Collaborators see the current state in real time; historical states are reconstructable by replaying events.

**Scenarios to test the model.**

Worth running through a few scenarios to see where the model holds up and where it strains.

*Scenario A: simultaneous editing.* You and Sam are working on the same blend at the same time. You add an input; she adds a projection from a different input. The events are recorded in some order (probably by timestamp). The blend's current state reflects both modifications. The history shows both events. No conflict — these are non-overlapping modifications.

What if you both try to set the same slot filler at the same moment to different values? Then there's a real conflict. The event log can record both events, but the blend's current state has to pick one. Standard resolutions: last-write-wins, explicit conflict surface for human resolution, or operational transformation that combines both events into a coherent state. Which the architecture should use is a design choice.

*Scenario B: revision after input change.* You created blend Y from input X last week. Today, X gets new content (new customer interviews added). The architecture flags Y as having an outdated reference to X. You open Y, see the flag, decide that the new material in X is relevant, and add an event that updates Y's projection from X to incorporate the new material. The blend Y's history now shows: created last week with X as it was, today projection updated to include new X material. The "as of" reference now points at a more recent version of X.

But what if you decide the new material in X isn't relevant to Y? You add an event that explicitly says "reviewed input X changes, no update needed." The blend Y is no longer flagged as outdated; the review event records your judgment.

What if Sam comes along later and disagrees with your judgment, thinking the new X material *is* relevant? She adds a different event proposing the update. The blend's history shows two judgments; the architecture needs a way to handle disagreement about whether an update is needed.

This is getting interesting. The "blend flagged for review when input changes" mechanism is more than just notification — it's a place where two collaborators might disagree about how to respond. The architecture might need to support multiple competing proposed updates that are visible until one is selected or some other resolution happens.

*Scenario C: pinning to specific input versions.* You're building blend Y because you want to capture a specific point-in-time analysis of input X. You explicitly pin the reference to X-as-of-Tuesday. Later, X evolves, but your blend Y doesn't get flagged because it's pinned. This is the explicit "as of" semantics in use.

What if Sam wants to do a parallel analysis that follows X's evolution? She creates a different blend Y' with the same inputs but as a live reference. Now you have two blends, both referencing X, but with different temporal semantics.

This works cleanly with the stable-instance model. Two distinct blend instances, each with its own identity and its own reference semantics to X.

*Scenario D: blend reference to another blend.* Blend Z references blend Y as one of its inputs. Y has been modified over time (events added). Z's reference to Y is either live (follows Y's current state) or pinned (points at Y as of a specific moment).

If live: when Y changes, Z is flagged for review. Same mechanism as input changes.

If pinned: Z continues to reference Y-as-of-the-pinned-moment, even as Y evolves. Z can be reviewed and updated to point at a newer version of Y, or kept pinned indefinitely.

This works recursively: blends can reference blends with the same live-or-pinned semantics as references to other entities.

*Scenario E: rollback.* You realize that recent modifications to blend Y made it worse. You want to roll back to last week's state. With the stable-instance model, you don't actually "roll back" — you add events that undo the recent modifications. The history still shows the bad modifications; the current state matches what last week's state was. If someone wants to see why the rollback happened, they can see the modifications and the subsequent undo events.

This is consistent with append-only: history is preserved; the current state is whatever the event sequence produces. Rollback is a forward action that produces the desired current state, not a destructive deletion of past events.

*Scenario F: blend referenced by many other things, then needs deep revision.* Blend Y has been referenced by 20 other blends. You realize Y has a fundamental error and needs deep revision. With the stable-instance model, you modify Y in place (events added). All 20 referencing blends are flagged for review because Y has changed. Each can be addressed individually.

But what if Y's revision is so deep that it's effectively a different blend? Then the right move is probably to create a new blend Y' rather than modify Y. The 20 references continue to point at Y; if any of them should point at Y' instead, that's an explicit choice for each referencing blend.

This raises a question: when does modification stay within the same blend versus producing a new blend? The architecture itself doesn't decide this — the user does. If the user thinks of the change as continued work on the same blend, they modify it. If they think of the change as starting fresh, they create a new blend. This is consistent with how Google Docs and similar tools work — there's no automatic threshold; the user decides.

**Where the scenarios surface design questions.**

A few sub-questions surface from the scenarios that probably need resolution:

*Conflict resolution in simultaneous modification.* When two collaborators modify the same slot or property concurrently, how does the architecture resolve? Last-write-wins, explicit conflict surface, or operational transformation.

*Multiple competing updates after input change.* When two collaborators have different views on how to respond to an input change, how does the architecture represent the disagreement? As multiple proposed updates that coexist until resolved, or as a serialized event log where the latest event wins.

*Threshold for "modification" vs "new blend."* This is a user judgment, but the architecture might want to surface guidance. If you're making changes that touch most of the blend's content, maybe the architecture should ask "are you sure you want to modify this blend, or would you prefer to create a new one?"

These are design questions that follow from the resolved model but don't change the model itself. The model is:

*Blends are stable entities with append-only event histories. Inputs are stable identities with append-only content. Edges between them follow live references by default, with explicit "as of" pinning when needed. Per-event attribution throughout. Real-time collaboration on a single stable entity.*

Does this resolved model match what you intended, and do the sub-questions from the scenarios need to be addressed now, or held for later?

## User:

> 6/3/2026 15:52:11

Here’s some scenarios to describe how changes propagate
One: and output space depends on an input space, when a change occurs in the input space the notification of the change is sent and surfaced in the output space.
Two: in a space that receives a notification that a dependent space has a change, users can choose to bring the space up-to-date with the changes from a dependent space
3:2 people editing the same space at the same time their changes are merged together in real time, think CRDT

## Assistant:

> 6/3/2026 15:52:43

Confirmed. Let me restate each to make sure I have them right before I work out implications.

**Scenario 1: change propagation by notification.**

An output space (a blend) has a live reference to an input space. The input space changes (new content added, events recorded against it). The architecture sends a notification to the output space, and that notification is surfaced in the output space's view. The output space is not automatically modified — it just knows that one of its inputs has changed.

This is what your earlier Example 3 described, formalized as a system behavior: dependencies are tracked, changes propagate as notifications, but the output space remains stable until its participants act on the notification.

**Scenario 2: explicit update to incorporate changes.**

When a space has a notification about a change in a dependent space, the users of the space can choose to bring it up-to-date. This is an explicit action — the space doesn't automatically follow its dependencies, and users decide whether and how to incorporate the upstream changes.

This is the "review and incorporate" workflow. It preserves user agency over whether changes propagate, while making the propagation possible when desired. It also means notifications can be dismissed without incorporating (the user reviews and decides the change isn't relevant) or held indefinitely (the user defers the decision).

Worth flagging: bringing a space up-to-date is itself an event in that space's history. The event records who made the update, when, and what they incorporated. The space's history then shows: was at state N, dependent space X changed, user incorporated changes on date Y, now at state N+1.

**Scenario 3: real-time concurrent editing with CRDT-style merge.**

Two people editing the same space at the same time have their changes merged automatically. CRDT (conflict-free replicated data type) semantics: each user's changes are operations that compose deterministically with other users' operations. No central authority needed; merges produce consistent state across all participants.

This applies to in-space modifications (adding inputs, changing projections, filling slots, etc.) rather than to cross-space changes. Within a single blend instance, concurrent edits merge. Across spaces, the notification mechanism from Scenarios 1 and 2 handles propagation.

**What this resolves.**

These three scenarios together resolve the conflict-resolution question I flagged earlier. The answer is:

*Within a space:* CRDT-style real-time merge for concurrent edits. No conflict surface, no explicit resolution; the merge is automatic and deterministic.

*Across spaces:* notification-based propagation with user-controlled incorporation. Changes in one space surface as notifications in dependent spaces. The user of the dependent space decides whether and how to incorporate.

These are different mechanisms because they handle different kinds of changes. Within-space changes are about multiple collaborators converging on a single blend. Cross-space changes are about updates flowing through a graph of dependencies, where each space's owners have agency over their own space's state.

**One sub-question to surface before I work on consequences.**

What about CRDT-style merge applied to slot fillers that two people are setting concurrently with different values? For instance, you and Sam are filling the "customer segment" slot of a Lean Canvas blend simultaneously. You write "home cooks who care about nutrition." Sam writes "weekend hobby cooks." These aren't structurally compatible operations like adding to different parts of the canvas — they're competing fillers for the same slot.

Several options for CRDT behavior in this case:

*Last-write-wins.* The system records both writes; the later one is the current value. Both are in the history. This is the simplest CRDT behavior and works fine for many cases but loses one of the values from the user's view.

*Both values coexist as alternatives.* The slot's current state is "two proposed fillers, by you and by Sam." Users see both and can decide which to keep, or merge them by editing. The architecture treats the slot as multi-valued temporarily.

*Concurrent edits produce conflict that gets surfaced.* The system detects that two writes happened simultaneously to the same slot and surfaces a conflict UI. One of the users (or both together) resolves it. This is more like Git merge conflicts.

The first is operationally cleanest. The second is most honest about the disagreement. The third is most user-visible but introduces friction.

The choice depends on what you want the user experience to feel like. Real-time collaborative tools (Google Docs, Figma) typically use the first because the interaction is fast — by the time you'd notice the conflict, one of you has already adjusted. Slower-paced tools (Git, Wikipedia) use the third because changes are deliberate and conflicts are meaningful.

For your architecture, which fits? Given the cognitive workbench character — where slot fillers represent considered judgments, not just text being typed — I'd lean toward the second or third over the first. But this is your call.

## User:

> 6/3/2026 15:54:18

The filler is treated as the same as the CRDT content

## Assistant:

> 6/3/2026 15:54:35

Confirmed. Slot fillers are treated as CRDT content, with the same merge semantics as any other content in the space. Concurrent edits to the same slot merge automatically; there's no special conflict-resolution UI for slots versus other content.

This is a clean and consistent choice. It means the architecture has one merge mechanism (CRDT) for all within-space modifications, regardless of whether the modification is to a slot filler, an input reference, a projection annotation, or any other content. Users don't have to learn different rules for different parts of the blend.

It also has a real consequence worth being explicit about: simultaneous edits to the same slot will produce a merged result that may or may not be what either user intended. Two users writing "home cooks who care about nutrition" and "weekend hobby cooks" simultaneously will produce some merged string — likely interleaved characters, depending on the CRDT implementation. Both users will see the merge happen and can correct it through subsequent edits.

In practice, this is how Google Docs and Figma already handle the same situation. Users learn to coordinate verbally or through turn-taking when they're editing the same area at the same time. Simultaneous edits to truly overlapping content are rare enough that the awkward merged result is acceptable, and when it happens, it's visible and quickly correctable.

Before I work on consequences, let me check what else might need to be resolved. Looking back at our resolved model, I think we have:

*Blends* are stable entities anchored at instantiation, with append-only event histories, supporting concurrent CRDT-merged editing within the space.

*Inputs* are stable identities with append-only content. Changes in inputs propagate as notifications to dependent blends.

*Edges* from blends to inputs are live references by default, with explicit "as of" pinning available. When an input changes, blends with live references to it get notifications.

*Updates* to incorporate upstream changes are explicit user actions, recorded as events in the receiving space's history with full attribution.

*Per-event attribution* throughout, so we can see who did what when within each space.

*CRDT semantics* for all within-space concurrent modifications, including slot fillers, with no special conflict UI.

*Identity* is established by anchoring at instantiation, not by inputs. The same inputs can produce many blends with different identities.

What's still open, that I can think of:

The relationship between the three entity types (content, frame, frame instance/blend) and the *collection* entity type — we agreed collections were in scope but haven't worked through how they interact with blending.

The relationship between the *frame library* (where frames live) and the *substrate* (where blend instances live). Are they the same workspace, or separate?

How generic spaces become reusable nodes specifically — we agreed they should be, but didn't work out the promotion mechanism.

Is there a piece you want to push on next, or do you want me to surface where the model still has gaps?

## User:

> 6/3/2026 17:17:02

Blends are stable entities anchored at instantiation, with append-only event histories, supporting concurrent CRDT-merged editing within the space. -> Output Space? the Blend is an operation

Inputs are stable identities with append-only content. Changes in inputs propagate as notifications to dependent blends.  -> Input Spaces?

## Assistant:

> 6/3/2026 17:17:24

Yes, you're right. I slipped back into using "blend" for both the operation and the resulting space, which is exactly the conflation we cleaned up earlier in the conversation. Let me restate carefully.

**The vocabulary correction.**

A *blend* is an operation. It takes input spaces, applies a generic space (and optionally a frame), and produces an output space.

An *input space* is a space being used as input to a blend.

An *output space* is the space produced by a blend.

Spaces have stable identity, append-only content, edges to other spaces. Blends are operations recorded as events in the output space's history.

This also means *input space* and *output space* are *roles* that spaces play in a particular blending operation, not separate entity types. The same space can be an output space of one blend and an input space of another. A blend instance produces a space that becomes substrate for subsequent blends — that's the recursive self-similarity we worked out.

**The corrected model.**

*Spaces* are stable entities anchored at instantiation, with append-only event histories, supporting concurrent CRDT-merged editing within the space.

*Blends* are operations that take input spaces, possibly a frame and a generic space, and produce output spaces. The blend operation is recorded as an event in the output space's history.

*Input space* and *output space* are roles played by spaces in a particular blend operation, not separate types.

*Edges* between spaces are live references by default, with explicit "as of" pinning available. When a referenced space changes, spaces that reference it get notifications.

*Updates* to incorporate upstream changes are explicit user actions, recorded as events in the receiving space's history with full attribution.

*Per-event attribution* throughout.

*CRDT semantics* for all within-space concurrent modifications, including slot fillers.

*Identity* is established by anchoring a space at instantiation. The same input spaces blended again produce a different output space with different identity.

**One thing this corrects.**

Earlier in the conversation I'd been using "blend instance" and "frame instance" somewhat interchangeably with "the output of a blend." That was sloppy. The cleaner vocabulary is:

- A *blend* is the operation.
- The *output space* is what the operation produces.
- A *frame application* is a specific kind of blend where one input space is a frame.

There's no separate object called a "blend instance" that's distinct from the output space. The output space *is* the result of the blend; it doesn't need a separate name.

This also affects how we talk about identity. The space has identity. The blend operation is recorded as an event in the space's history. The space's identity persists through subsequent modifications (more events added) and through being referenced by other blends as one of their inputs.

**A small check.**

Does this also mean "input space" and "output space" should drop from the formal specification, since they're just roles? The specification would say:

*Spaces* are the entities. *Blends* are operations on spaces. In any particular blend operation, the spaces taken as inputs play the input-space role; the space produced plays the output-space role. But there's only one type of entity — the space.

That feels cleaner. Spaces are the noun; blends are the verb; input-space and output-space are just role labels in a particular operation.

Does this match what you intended?

## User:

> 6/3/2026 17:19:21

yes

## Assistant:

> 6/3/2026 17:19:29

Confirmed. The resolved vocabulary:

*Space* — the entity. Stable identity anchored at instantiation. Append-only event history. CRDT-merged concurrent editing within. Carries content that can be live-referenced by other spaces.

*Blend* — the operation. Takes spaces as inputs, optionally a frame and a generic space, produces a space as output. Recorded as an event in the output space's history.

*Input space* / *output space* — roles a space plays in a particular blend operation. Not separate types.

*Frame* — a reusable schema in the library. Can be used as an input to a blend (the frame-application subtype of blending).

*Frame application* — a blend where one input is a frame.

*Generic space* — the abstract structure that licenses a blend. Itself a space; can be reusable.

*Edges* — references between spaces. Live by default, with explicit "as of" pinning available. Changes in referenced spaces propagate as notifications to referencing spaces. Updates to incorporate changes are explicit user actions.

*Network type* — adopted from conceptual blending (simplex, mirror, single-scope, double-scope, multi-blend). Hybrid mode: declared with user/AI collaboration, can be loosened to descriptive category by either party at any point during or after the blend.

*Attribution and time* — on every event throughout.

This is the stable specification at the architectural level. Where would you like to go next?

## User:

> 6/3/2026 17:20:23

export this vocabulary as a .md file

## Assistant:

> 6/3/2026 17:21:07

> Prepared clean vocabulary file for direct output.
>
> - Viewing file
> - Read the markdown skill before creating the vocabulary file
> - I'll create the vocabulary file directly in the outputs folder as a clean, reference-quality document that captures what we just confirmed.
> - Export the stable vocabulary as a markdown reference file
> - Presenting file(s)...
> - **Done**

The vocabulary file is exported. It captures the stable specification we converged on: spaces as the entity type, blends as the operation, frames and generic spaces as reusable assets, the network typology adopted from conceptual blending, and the properties (identity, append-only history, attribution, CRDT editing, change propagation, anchoring) that hold across the architecture.

> File: [/mnt/user-data/outputs/vocabulary.md](https://claude.ai/api/organizations/a050e10c-b7bf-42c7-a07a-745fe92ffb0e/conversations/b3983adb-c092-4f06-8cdb-ab183df9f368/wiggle/download-file?path=%2Fmnt%2Fuser-data%2Foutputs%2Fvocabulary.md)

Powered by Claude Exporter (https://www.ai-chat-exporter.net)
