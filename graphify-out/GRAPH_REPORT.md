# Graph Report - Portofolio_Threshold  (2026-09-17)

## Corpus Check
- Corpus is ~48,748 words - fits in a single context window. You may not need a graph.

## Summary
- 327 nodes · 563 edges · 17 communities (14 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Capabilities & Contact Content Data
- Narrative Chapters & Duality Domain Types
- Gateway & Expression View Transitions
- Tailwind CSS & Build Tooling
- Tech Badges & Iconography
- Atmosphere & Magnetic Grid Engine
- Project Repository & Data Layer
- TypeScript Configuration & Compiler Options
- UI Components & Path Aliases
- GitHub Activity Telemetry API
- Lenis Smooth Scroll & Tier Configurations
- Next.js App Router & Layout Architecture
- Core Motion & UI Dependencies
- BIJ Brand Logo Component
- Next.js Environment Declarations

## God Nodes (most connected - your core abstractions)
1. `react` - 23 edges
2. `compilerOptions` - 16 edges
3. `Project` - 15 edges
4. `lucide-react` - 10 edges
5. `StructureRepository` - 9 edges
6. `IStructureRepository` - 9 edges
7. `setDynamicFavicon()` - 9 edges
8. `StructureViewData` - 8 edges
9. `ProjectId` - 7 edges
10. `ProjectRepository` - 7 edges

## Surprising Connections (you probably didn't know these)
- `StructureRepository` --implements--> `IStructureRepository`  [EXTRACTED]
  src/data/repositories/structure.repository.ts → src/types/structure.ts
- `CapabilityItem` --references--> `ProjectId`  [EXTRACTED]
  src/types/structure.ts → src/types/duality.ts
- `SystemsArchitectureMatrixItem` --references--> `ProjectId`  [EXTRACTED]
  src/types/structure.ts → src/types/duality.ts
- `DirectActionFooterProps` --references--> `DirectContactMeta`  [EXTRACTED]
  src/views/recruiter/DirectActionFooter.tsx → src/types/structure.ts
- `EngineeringHighlightsProps` --references--> `EngineeringHighlightsRollup`  [EXTRACTED]
  src/views/recruiter/EngineeringHighlights.tsx → src/types/structure.ts

## Import Cycles
- None detected.

## Communities (17 total, 1 thin omitted)

### Community 0 - "Capabilities & Contact Content Data"
Cohesion: 0.08
Nodes (36): CAPABILITIES_DATA, CAPABILITIES_TAXONOMY, DIRECT_CONTACT_META, ENGINEERING_HIGHLIGHTS, PROJECTS_DATA, SELECTED_PROJECTS, STRUCTURE_VIEW_DATA, SYSTEMS_ARCHITECTURE_MATRIX (+28 more)

### Community 1 - "Narrative Chapters & Duality Domain Types"
Cohesion: 0.06
Nodes (29): NARRATIVE_CHAPTERS, THRESHOLD_DATA, ArchitecturalDecision, ArtifactKeyframe, ChapterId, ChapterSequenceDisplay, ChapterSequenceNumber, DualityPair (+21 more)

### Community 2 - "Gateway & Expression View Transitions"
Cohesion: 0.09
Nodes (26): gsap, metadata, HomeContent(), COS_2PHI, COS_3PHI, COS_PHI, DualTerritoryCursor(), DualTerritoryCursorProps (+18 more)

### Community 3 - "Tailwind CSS & Build Tooling"
Cohesion: 0.07
Nodes (28): devDependencies, autoprefixer, postcss, tailwindcss, @types/node, @types/react, @types/react-dom, typescript (+20 more)

### Community 4 - "Tech Badges & Iconography"
Cohesion: 0.16
Nodes (20): lucide-react, react, AntigravityIcon(), CodexIcon(), getTechVisual(), TechItem, TechLogoBadge(), TechLogoBadgeProps (+12 more)

### Community 5 - "Atmosphere & Magnetic Grid Engine"
Cohesion: 0.13
Nodes (13): clsx, tailwind-merge, MagneticGridState, StructureAtmosphere(), StructureAtmosphereProps, VariableFontCursorProximityHero(), TextProps, VariableFontCursorProximity (+5 more)

### Community 6 - "Project Repository & Data Layer"
Cohesion: 0.13
Nodes (6): ProjectRepository, CanvasEnvironment, IProjectRepository, Project, IStructureRepository, TechnicalProjectsTableProps

### Community 7 - "TypeScript Configuration & Compiler Options"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "UI Components & Path Aliases"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 9 - "GitHub Activity Telemetry API"
Cohesion: 0.21
Nodes (11): formatTelemetry(), GET(), RepoConfig, revalidate, TRACKED_REPOS, GitHubActivityBadge(), GitHubActivityBadgeProps, formatRelativeTime() (+3 more)

### Community 10 - "Lenis Smooth Scroll & Tier Configurations"
Cohesion: 0.23
Nodes (10): lenis, LENIS_DEFAULT_CONFIG, LenisConfigOptions, SCROLL_TIERS, useSmoothScroll(), UseSmoothScrollProps, UseSmoothScrollReturn, SmoothScrollContext (+2 more)

### Community 11 - "Next.js App Router & Layout Architecture"
Cohesion: 0.17
Nodes (7): nextConfig, next, cormorant, geistMono, metadata, plusJakarta, metadata

### Community 12 - "Core Motion & UI Dependencies"
Cohesion: 0.17
Nodes (12): dependencies, clsx, gsap, @gsap/react, lenis, lucide-react, motion, next (+4 more)

### Community 13 - "BIJ Brand Logo Component"
Cohesion: 0.33
Nodes (4): BijLogoProps, BijLogoSize, BijLogoVariant, SIZE_MAP

## Knowledge Gaps
- **140 isolated node(s):** `ArchitecturePatternCategory`, `AvailabilityStatus`, `CapabilityDiscipline`, `CapabilityDomain`, `DirectContactProfile` (+135 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 169 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Tech Badges & Iconography` to `Gateway & Expression View Transitions`, `Tailwind CSS & Build Tooling`, `Atmosphere & Magnetic Grid Engine`, `GitHub Activity Telemetry API`, `Lenis Smooth Scroll & Tier Configurations`, `BIJ Brand Logo Component`?**
  _High betweenness centrality (0.282) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `Tech Badges & Iconography` to `Gateway & Expression View Transitions`, `Tailwind CSS & Build Tooling`, `Atmosphere & Magnetic Grid Engine`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Core Motion & UI Dependencies` to `Tailwind CSS & Build Tooling`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `ArchitecturePatternCategory`, `AvailabilityStatus`, `CapabilityDiscipline` to the rest of the system?**
  _140 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Capabilities & Contact Content Data` be split into smaller, more focused modules?**
  _Cohesion score 0.07616892911010557 - nodes in this community are weakly interconnected._
- **Should `Narrative Chapters & Duality Domain Types` be split into smaller, more focused modules?**
  _Cohesion score 0.0553306342780027 - nodes in this community are weakly interconnected._
- **Should `Gateway & Expression View Transitions` be split into smaller, more focused modules?**
  _Cohesion score 0.08907563025210084 - nodes in this community are weakly interconnected._