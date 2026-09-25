# Graph Report - Portofolio_Threshold  (2026-09-25)

## Corpus Check
- 75 files · ~70,222 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ico 1, .css 1)

## Summary
- 477 nodes · 694 edges · 32 communities (20 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f19d0544`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- structure.ts
- duality.ts
- Gateway & Expression View Transitions
- package.json
- RecruiterStructureView.tsx
- react
- Duality — A Canvas in Motion
- TypeScript Configuration & Compiler Options
- UI Components & Path Aliases
- GitHub Activity Telemetry API
- 3. Tipe TypeScript Canonical
- Next.js App Router & Layout Architecture
- 2. Alur Kerja Eksekusi Fase 1 (Step-by-Step)
- Duality — A Canvas in Motion
- Next.js Environment Declarations
- 2. Rincian 6 Fase Koreografi Gerak
- Portfolio Threshold — Dual-Lens Architecture
- THRESHOLD CONCEPT
- PROJECT STATUS & HANDOVER LOG
- Atmosphere 3D Layer (`src/atmosphere/`)
- Motion Engine Layer (`src/motion/`)
- app/recruiter/README.md
- story/README.md
- layout/README.md
- ui/README.md
- lib/README.md
- chapters/README.md
- components/README.md
- views/recruiter/README.md
- threshold/README.md

## God Nodes (most connected - your core abstractions)
1. `Duality — A Canvas in Motion` - 31 edges
2. `react` - 23 edges
3. `compilerOptions` - 16 edges
4. `Project` - 15 edges
5. `lucide-react` - 10 edges
6. `Duality — A Canvas in Motion` - 10 edges
7. `structureRepository` - 9 edges
8. `setDynamicFavicon()` - 9 edges
9. `IStructureRepository` - 9 edges
10. `StructureViewData` - 8 edges

## Surprising Connections (you probably didn't know these)
- `HomeContent()` --calls--> `setDynamicFavicon()`  [EXTRACTED]
  src/app/page.tsx → src/lib/favicon.ts
- `projectRepository` --implements--> `IProjectRepository`  [EXTRACTED]
  src/data/repositories/project.repository.ts → src/types/duality.ts
- `RecruiterStructureView()` --calls--> `useSmoothScroll()`  [EXTRACTED]
  src/views/recruiter/RecruiterStructureView.tsx → src/motion/hooks/useSmoothScroll.ts
- `CapabilityItem` --references--> `ProjectId`  [EXTRACTED]
  src/types/structure.ts → src/types/duality.ts
- `SystemsArchitectureMatrixItem` --references--> `ProjectId`  [EXTRACTED]
  src/types/structure.ts → src/types/duality.ts

## Import Cycles
- None detected.

## Communities (32 total, 10 thin omitted)

### Community 0 - "structure.ts"
Cohesion: 0.07
Nodes (36): CAPABILITIES_TAXONOMY, DIRECT_CONTACT_META, ENGINEERING_HIGHLIGHTS, SELECTED_PROJECTS, STRUCTURE_VIEW_DATA, SYSTEMS_ARCHITECTURE_MATRIX, WORK_EXPERIENCE_DATA, projectRepository (+28 more)

### Community 1 - "duality.ts"
Cohesion: 0.05
Nodes (31): NARRATIVE_CHAPTERS, THRESHOLD_DATA, ArchitecturalDecision, ArtifactKeyframe, ChapterId, ChapterSequenceDisplay, ChapterSequenceNumber, DualityPair (+23 more)

### Community 2 - "Gateway & Expression View Transitions"
Cohesion: 0.09
Nodes (26): gsap, metadata, HomeContent(), COS_2PHI, COS_3PHI, COS_PHI, DualTerritoryCursor(), DualTerritoryCursorProps (+18 more)

### Community 3 - "package.json"
Cohesion: 0.05
Nodes (41): dependencies, clsx, gsap, @gsap/react, lenis, lucide-react, motion, next (+33 more)

### Community 4 - "RecruiterStructureView.tsx"
Cohesion: 0.09
Nodes (30): lucide-react, AntigravityIcon(), CodexIcon(), getTechVisual(), TechItem, TechLogoBadge(), TechLogoBadgeProps, TechVisual (+22 more)

### Community 5 - "react"
Cohesion: 0.09
Nodes (21): clsx, react, tailwind-merge, MagneticGridState, StructureAtmosphere(), StructureAtmosphereProps, BijLogoProps, BijLogoSize (+13 more)

### Community 6 - "Duality — A Canvas in Motion"
Cohesion: 0.06
Nodes (35): 10. Tipografi — Sistem Tiga Suara, 11. Grid & Layout, 12. Spacing & Whitespace, 13. Hero / Opening, 14. The Artifact (Motif Berulang di Luar Hero), 15–21. Komponen Bab: Introduction, Philosophy, Selected Work, & Studies, 1. Visi Proyek, 22. Teknologi (+27 more)

### Community 7 - "TypeScript Configuration & Compiler Options"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "UI Components & Path Aliases"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 9 - "GitHub Activity Telemetry API"
Cohesion: 0.21
Nodes (11): formatTelemetry(), GET(), RepoConfig, revalidate, TRACKED_REPOS, GitHubActivityBadge(), GitHubActivityBadgeProps, formatRelativeTime() (+3 more)

### Community 10 - "3. Tipe TypeScript Canonical"
Cohesion: 0.12
Nodes (16): 1. Executive Summary & Core Mandates, 2. Arsitektur Data Layer (Layered Clean Architecture), 3.1. Primitif Domain & Brand Types, 3.2. Threshold Model (`THRESHOLD_CONCEPT.md`), 3.3. Narrative Chapters Model (8 Editorial Chapters — §6 Bible), 3.4. Project[] Domain Model (Selected Work — §16 & §39 Bible), 3.5. Studio / Studies Model (Chapter 05 — §16 & §22 Bible), 3.6. Personal Profile, Philosophy, & The Artifact (+8 more)

### Community 11 - "Next.js App Router & Layout Architecture"
Cohesion: 0.17
Nodes (7): nextConfig, next, cormorant, geistMono, metadata, plusJakarta, metadata

### Community 12 - "2. Alur Kerja Eksekusi Fase 1 (Step-by-Step)"
Cohesion: 0.12
Nodes (15): 1. Tujuan & Sasaran Fase 1, 2. Alur Kerja Eksekusi Fase 1 (Step-by-Step), 3. Matriks Peran Subagent pada Fase 1, 4. Kriteria Selesai Fase 1 (Definition of Done), DOKUMENTASI FASE PROYEK (PROJECT PHASES), Duality — A Canvas in Motion, 🚪 FASE 1: THE THRESHOLD (HALAMAN PEMBUKA), 📑 Gambaran Umum Roadmap (+7 more)

### Community 13 - "Duality — A Canvas in Motion"
Cohesion: 0.13
Nodes (14): 1. Visi Arsitektur & Prinsip Rekayasa, 2. Matriks Teknologi & Paket Inti, 3.1 Palet Warna Kanvas Terkunci (Strict Pigment Tokens), 3.2 Sistem Tiga Suara Tipografi (Three Voices Typography), 3. Konfigurasi Sistem Desain & Token Visual, 4. Arsitektur Sinkronisasi Motion (Lenis + GSAP Master RAF), 5. Sistem Tiga Tingkat Scroll (3-Tier Scroll System), 6. Budget Performa 3D & Efek Atmosferik (§40–45) (+6 more)

### Community 17 - "2. Rincian 6 Fase Koreografi Gerak"
Cohesion: 0.14
Nodes (13): 1. Visual & Spatial Topography, 2.1 Entrance Sequence (The Ink Emergence), 2.2 Idle Organic Wave Dynamics (The Breathing Divider), 2.3 Hover Parallax & Interactive Magnetic Bias, 2.4 Crossover Typography Architecture ("DUALITY"), 2.5 Exit Transition Sequences (Modalitas Dual-Lens), 2. Rincian 6 Fase Koreografi Gerak, 3. Aturan Standar Rekayasa GSAP & Performa (§40–§45) (+5 more)

### Community 18 - "Portfolio Threshold — Dual-Lens Architecture"
Cohesion: 0.20
Nodes (9): 🚀 Getting Started, Installation, 📜 License, 🏛️ Philosophy & Concept: The Threshold, Portfolio Threshold — Dual-Lens Architecture, Prerequisites, Production Build, 📂 Project Structure & Documentation (+1 more)

### Community 19 - "THRESHOLD CONCEPT"
Cohesion: 0.29
Nodes (6): 1. Konsep Dasar, 2. Alasan Reframing (Mengapa Bukan "Recruiter vs Pengunjung Biasa"), 3. Elemen Kunci Konsep, 4. Keputusan Arsitektur & Transisi (Resolved Architecture), Sifat Pengalaman, THRESHOLD CONCEPT

### Community 20 - "PROJECT STATUS & HANDOVER LOG"
Cohesion: 0.33
Nodes (5): 1. Summary of Completed Deliverables, 2. Squad Review & Sign-Off, 3. Next Steps (Roadmap Fase 2):, A. Foundation Documents & Philosophical Codification:, PROJECT STATUS & HANDOVER LOG

### Community 21 - "Atmosphere 3D Layer (`src/atmosphere/`)"
Cohesion: 0.40
Nodes (4): 1. Pemisahan Arsitektur Mutlak (§38), 2. Kepatuhan Budget Performa (§40–§45), 3. Blueprint Komponen Terencana, Atmosphere 3D Layer (`src/atmosphere/`)

### Community 22 - "Motion Engine Layer (`src/motion/`)"
Cohesion: 0.40
Nodes (4): 1. Isolasi Arsitektur Mutlak (§38), 2. Struktur Internal Terencana, 3. Aturan & Standar Teknis Motion Engineer, Motion Engine Layer (`src/motion/`)

## Knowledge Gaps
- **245 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+240 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 292 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `GitHub Activity Telemetry API`, `Gateway & Expression View Transitions`, `package.json`, `RecruiterStructureView.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `RecruiterStructureView.tsx` to `Gateway & Expression View Transitions`, `package.json`, `react`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _245 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `structure.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06663141195134849 - nodes in this community are weakly interconnected._
- **Should `duality.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.047474747474747475 - nodes in this community are weakly interconnected._
- **Should `Gateway & Expression View Transitions` be split into smaller, more focused modules?**
  _Cohesion score 0.08907563025210084 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._