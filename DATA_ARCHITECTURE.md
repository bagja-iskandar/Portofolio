# DATA ARCHITECTURE SPECIFICATION
## Duality — A Canvas in Motion
**Role:** Data Architect  
**Authority:** Derived from `PROJECT_BIBLE.md` (§39 Mandate) & `THRESHOLD_CONCEPT.md`  
**Status:** Canonical Reference Specification  

---

### 1. Executive Summary & Core Mandates

Portofolio **Duality — A Canvas in Motion** beroperasi di atas prinsip kuratorial seni, kedalaman editorial, dan presisi rekayasa digital. Untuk menjaga integritas karya ini dan menghindari perangkap portofolio developer generik, sistem data dirancang dengan pemisahan mutlak (*zero hardcoding mandate*) antara domain konten, repositori data, dan lapisan presentasi visual.

#### Mandat Utama Data Layer:
1. **Single Source of Truth (§39 Bible):** Semua entitas proyek (`Project[]`), bab editorial (`NarrativeChapter[]`), eksperimen studio (`StudioStudy[]`), filosofi, dan profil disimpan dalam struktur data terpusat, teruji, dan bertipe kuat (*strictly typed*).
2. **Zero Hardcoding Rule:** Komponen presentasi UI/UX dilarang keras menampung teks mentah (*string literals*), URL aset, konfigurasi kanvas, atau metadata proyek secara langsung di dalam markup/JSX/TSX. Semua data disuplai melalui domain repository & typed contract.
3. **Dual-Lens Content Representation:** Mendukung konsep **THRESHOLD** (`STRUCTURE` vs `EXPRESSION`) tanpa menduplikasi data inti. Setiap proyek dan bab memiliki proyeksi ganda:
   - **Structure Lens:** Ringkas, terukur, berfokus pada arsitektur teknis, metrik performa, dan pengambilan keputusan rekayasa (*the short read*).
   - **Expression Lens:** Narasi kuratorial, refleksi estetika, dinamika friksi rekayasa-seni, dan visual eksibisi imersif (*the full story*).
4. **Environment Awareness:** Setiap konten terasosiasi dengan lingkungan kanvas asalnya (`Ivory Canvas` / `#F5F2EB` vs `Ink Canvas` / `#0E0D0C`) beserta aksen pigmen bumi (`Terracotta` #B85A3A vs `Ochre` #C98A4B).

---

### 2. Arsitektur Data Layer (Layered Clean Architecture)

Sistem data mengadopsi prinsip *Ports and Adapters (Hexagonal / Clean Architecture)* yang memisahkan storage dari konsumsi UI:

```
┌─────────────────────────────────────────────────────────────┐
│                 PRESENTATION LAYER (UI / UX)                 │
│  (ExhibitViewport, ScrollytellingEngine, ThresholdPortal)  │
└──────────────────────────────▲──────────────────────────────┘
                               │ (Strict Readonly Props / Hooks)
┌──────────────────────────────┴──────────────────────────────┐
│                    DATA ACCESS REPOSITORY                   │
│  (ProjectRepository, ChapterRepository, ThresholdService)   │
└──────────────────────────────▲──────────────────────────────┘
                               │ (Domain Entities & Queries)
┌──────────────────────────────┴──────────────────────────────┐
│                  DOMAIN SCHEMAS & VALIDATION                │
│         (TypeScript Advanced Types + Zod Runtime Safe)       │
└──────────────────────────────▲──────────────────────────────┘
                               │ (Type-Checked Fixtures)
┌──────────────────────────────┴──────────────────────────────┐
│                   CANONICAL CONTENT STORE                   │
│   (src/data/*.data.ts / Markdown/MDX / Static Manifests)     │
└─────────────────────────────────────────────────────────────┘
```

#### Struktur Direktori yang Ditetapkan:
```text
src/
├── types/
│   ├── brand.ts               # Nominal/Branded type primitives
│   ├── common.ts              # Canvas, Lens, Typography, Media types
│   ├── chapter.ts             # 8 Narrative Chapters schema
│   ├── project.ts             # Project[] exhibit & architecture models
│   ├── study.ts               # Studio/Studies experiments schema
│   ├── threshold.ts           # Diagonal threshold configuration
│   └── profile.ts             # Personal identity, philosophy, artifact
├── data/
│   ├── schemas/               # Zod validation schemas
│   │   ├── project.schema.ts
│   │   ├── chapter.schema.ts
│   │   └── threshold.schema.ts
│   ├── content/               # Pure data fixtures (Zero JSX, Zero CSS)
│   │   ├── chapters.data.ts
│   │   ├── projects.data.ts
│   │   ├── studies.data.ts
│   │   ├── philosophy.data.ts
│   │   ├── profile.data.ts
│   │   └── threshold.data.ts
│   └── repositories/          # Decoupled query services (Ports & Adapters)
│       ├── chapter.repository.ts
│       ├── project.repository.ts
│       ├── study.repository.ts
│       └── threshold.repository.ts
```

---

### 3. Tipe TypeScript Canonical

Berikut adalah kontrak tipe data TypeScript lengkap yang dirancang dengan standar `typescript-pro` dan `typescript-advanced-types`:

#### 3.1. Primitif Domain & Brand Types
```typescript
/**
 * Nominal Brand Type Utility
 */
export type Brand<K, T extends string> = K & { readonly __brand: T };

export type ProjectId = Brand<string, 'ProjectId'>;
export type ChapterId = Brand<string, 'ChapterId'>;
export type StudyId = Brand<string, 'StudyId'>;
export type TechnologyId = Brand<string, 'TechnologyId'>;

/**
 * Lingkungan Kanvas sesuai §8 & §9 PROJECT_BIBLE.md
 */
export type CanvasEnvironment = 'ivory' | 'ink';

/**
 * Modalitas Membaca sesuai THRESHOLD_CONCEPT.md
 */
export type ExperienceLens = 'structure' | 'expression';

/**
 * Progresi Emosional Alur Naratif (§1 Bible)
 */
export type EmotionalProgression =
  | 'curiosity'
  | 'discovery'
  | 'immersion'
  | 'appreciation'
  | 'experimentation'
  | 'intimacy'
  | 'connection';

/**
 * Sistem Tiga Suara Tipografi (§10 Bible)
 */
export type TypographyVoice = 'serif' | 'sans' | 'mono';

/**
 * Aksen Pigmen Bumi (§9 Bible)
 */
export type AccentColorToken = 'terracotta' | 'ochre';

/**
 * Metadata Aset Visual & Media Terstruktur (Zero hardcoded image paths)
 */
export interface MediaAsset {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly aspectRatio: `${number}:${number}` | number;
  readonly mediaType: 'image' | 'video' | 'sketch_scan' | 'model_3d';
  readonly caption?: string;
  readonly blurDataUrl?: string; // LQIP (Low Quality Image Placeholder)
}
```

---

#### 3.2. Threshold Model (`THRESHOLD_CONCEPT.md`)
```typescript
export interface ThresholdLensConfig {
  readonly id: ExperienceLens;
  readonly title: string;
  readonly tagline: string; // "the short read." vs "the full story."
  readonly canvas: CanvasEnvironment;
  readonly geometry: 'diagonal-top-left' | 'diagonal-bottom-right';
  readonly description: string;
  readonly accent: AccentColorToken;
}

export interface ThresholdConfig {
  readonly enabled: boolean;
  readonly crossoverWordmark: {
    readonly word: string; // Tipografi yang melintasi garis batas diagonal
    readonly splitIndex: number;
  };
  readonly organicDividerWave: {
    readonly amplitude: number;
    readonly frequency: number;
    readonly inkColor: string; // Pigmen tinta alami
  };
  readonly lenses: {
    readonly structure: ThresholdLensConfig;
    readonly expression: ThresholdLensConfig;
  };
  readonly persistenceStrategy: 'session' | 'cookie' | 'none';
}
```

---

#### 3.3. Narrative Chapters Model (8 Editorial Chapters — §6 Bible)
```typescript
export type ChapterSequenceNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ChapterSequenceDisplay = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';

export interface NarrativeChapter {
  readonly id: ChapterId;
  readonly number: {
    readonly value: ChapterSequenceNumber;
    readonly display: ChapterSequenceDisplay;
  };
  readonly title: string;
  readonly subtitle: string;
  readonly narrativePrompt: string; // "Siapa saya?", "Apa yang sudah saya bangun?", dll.
  readonly emotionalProgression: EmotionalProgression;
  readonly canvasEnvironment: CanvasEnvironment;
  readonly accentToken: AccentColorToken;
  readonly motionPacing: 'slow' | 'measured' | 'contemplative' | 'immersive';
  readonly dominantVoice: TypographyVoice;
}
```

---

#### 3.4. Project[] Domain Model (Selected Work — §16 & §39 Bible)
```typescript
export interface TechTag {
  readonly id: TechnologyId;
  readonly name: string;
  readonly category: 'frontend' | 'graphics_shader' | 'systems' | 'interaction' | 'architecture';
  readonly isCore: boolean;
}

export interface ProjectExhibitMedia {
  readonly heroAsset: MediaAsset;
  readonly processScan?: MediaAsset; // Halaman sketsa asli/wireframe fisik
  readonly gallery?: ReadonlyArray<MediaAsset>;
  readonly liveInteractiveCanvasUrl?: string;
}

export interface ArchitecturalDecision {
  readonly decision: string;
  readonly rationale: string;
  readonly tradeOff: string;
}

export interface EngineeringBenchmark {
  readonly metric: string;
  readonly value: string;
  readonly context: string;
}

export interface ProjectTechnicalArchitecture {
  readonly stack: ReadonlyArray<TechTag>;
  readonly architecturalDecisions: ReadonlyArray<ArchitecturalDecision>;
  readonly benchmarks?: ReadonlyArray<EngineeringBenchmark>;
  readonly engineeringHighlight: string;
}

/**
 * Representasi Dualitas: Structured vs Expressive Reading
 */
export interface ProjectStructureRead {
  readonly executiveSummary: string;
  readonly problemStatement: string;
  readonly engineeringSolution: string;
  readonly impactMetrics: ReadonlyArray<string>;
}

export interface ProjectExpressionRead {
  readonly editorialHeadline: string;
  readonly narrativeStory: string; // Kisah kuratorial & dialektika desain-engineering
  readonly craftReflection: string;
  readonly pullQuote?: {
    readonly text: string;
    readonly attribution?: string;
  };
}

export interface ProjectExternalLink {
  readonly type: 'repository' | 'live_demo' | 'case_study' | 'specification';
  readonly label: string;
  readonly url: string;
  readonly isExternal: boolean;
}

/**
 * Model Tunggal Canonical Project Sesuai §39 Bible
 */
export interface Project {
  readonly id: ProjectId;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly year: number;
  readonly role: string;
  readonly timeline: string;
  readonly status: 'completed' | 'active' | 'archived';
  readonly displayOrder: number; // 3–5 proyek pilihan terbaik
  readonly featured: boolean;
  readonly canvasEnvironment: CanvasEnvironment;
  readonly structureRead: ProjectStructureRead;
  readonly expressionRead: ProjectExpressionRead;
  readonly technical: ProjectTechnicalArchitecture;
  readonly exhibit: ProjectExhibitMedia;
  readonly links: ReadonlyArray<ProjectExternalLink>;
}
```

---

#### 3.5. Studio / Studies Model (Chapter 05 — §16 & §22 Bible)
```typescript
export interface StudioStudy {
  readonly id: StudyId;
  readonly slug: string;
  readonly title: string;
  readonly category: 'creative_code' | 'shader_canvas' | 'interaction_experiment' | 'system_architecture';
  readonly year: number;
  readonly synopsis: string;
  readonly technicalDeepDive: string;
  readonly technologies: ReadonlyArray<TechTag>;
  readonly mediaAsset: MediaAsset;
  readonly prototypeUrl?: string;
  readonly canvasEnvironment: CanvasEnvironment;
  readonly displayOrder: number;
}
```

---

#### 3.6. Personal Profile, Philosophy, & The Artifact
```typescript
export interface DualityPair {
  readonly thesis: string;
  readonly antithesis: string;
  readonly synthesis: string;
}

export interface PhilosophyPrinciple {
  readonly id: string;
  readonly title: string;
  readonly aphorism: string;
  readonly explanation: string;
  readonly duality: DualityPair;
}

export interface ArtifactKeyframe {
  readonly chapterId: ChapterId;
  readonly rotationEuler: readonly [number, number, number];
  readonly scale: number;
  readonly fragmentationRate: number; // 0 (utuh) s/d 1 (terfragmentasi)
}

export interface PersonalProfile {
  readonly hero: {
    readonly name: string;
    readonly monogram: string;
    readonly role: string;
    readonly largeStatement: string; // Pernyataan singkat berbobot (§13)
    readonly smallMetadata: ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }>;
    readonly sketchPolaroid: MediaAsset; // Halaman sketsa asli polaroid (§13)
  };
  readonly introduction: {
    readonly builderStatement: string; // Persona pembuka (§16)
    readonly editorialLead: string;
  };
  readonly philosophy: ReadonlyArray<PhilosophyPrinciple>;
  readonly about: {
    readonly narrative: string;
    readonly personalDisciplines: ReadonlyArray<string>;
    readonly craftMethodology: string;
  };
  readonly contact: {
    readonly closingReflection: string;
    readonly email: string;
    readonly connections: ReadonlyArray<{
      readonly platform: string;
      readonly identifier: string;
      readonly url: string;
    }>;
  };
  readonly recurringArtifact: {
    readonly id: string;
    readonly name: string;
    readonly assetUrl: string;
    readonly rationale: string;
    readonly keyframes: ReadonlyArray<ArtifactKeyframe>;
  };
}
```

---

### 4. Aturan Pemisahan Data Murni (Zero Hardcoding Rule)

Untuk menjamin portabilitas, kemurnian data, dan arsitektur yang bersih:

1. **Aturan Format Konten (Content Purity):**
   - File data (`src/data/content/*.data.ts`) HANYA berisi nilai primitif terstruktur, typed arrays, dan objek.
   - **DILARANG** mengimpor modul React, JSX/TSX elements, Tailwind utility classes (`className: "text-red-500"`), atau CSS styles ke dalam data layer.
   - Format teks panjang menggunakan markdown netral atau plain text string murni. Parsing tipografi ditangani oleh komponen presentasi (misalnya `EditorialRenderer` atau `RichTextRenderer`).

2. **Aturan Konsumsi Komponen UI (Data Access Enforcement):**
   - Komponen presentasi tidak boleh memanggil `fetch` atau mengakses storage secara sembarangan.
   - Komponen hanya menerima `readonly` typed props yang disuplai oleh Server Component / Container / Custom Hooks melalui Repositori (`ProjectRepository`, `ChapterRepository`, dll.).
   - Komponen presentasi bertanggung jawab atas gaya (styling), animasi, dan semantik HTML, sedangkan data layer bertanggung jawab atas kebenaran nilai dan hierarki relasi.

3. **Repository Pattern Contract:**
   ```typescript
   export interface IProjectRepository {
     getAllProjects(): Promise<ReadonlyArray<Project>>;
     getFeaturedProjects(): Promise<ReadonlyArray<Project>>;
     getProjectBySlug(slug: string): Promise<Project | null>;
     getProjectsByCanvas(canvas: CanvasEnvironment): Promise<ReadonlyArray<Project>>;
   }
   ```
   Keuntungan: Bila di masa depan konten dipindahkan ke Headless CMS, database SQLite lokal, atau git-based MDX, lapisan presentasi **100% tidak terpengaruh**.

---

### 5. Rekomendasi Teknis Layer Data untuk `TECH_STACK.md`

Berikut adalah rekomendasi teknis yang harus diadopsi ke dalam `TECH_STACK.md` untuk menjamin stabilitas data layer:

| Aspek Layer Data | Rekomendasi Teknologi | Alasan Arsitektural & Manfaat |
| :--- | :--- | :--- |
| **Type Safety & Contracts** | **TypeScript 5.x (Strict Mode, `noImplicitAny`, `exactOptionalPropertyTypes`)** | Menjamin tipe data compile-time yang ketat, nominal types melalui Branding, serta pencegahan mutasi data via `Readonly<T>` dan `as const`. |
| **Runtime Validation** | **Zod v3+** | Memvalidasi integritas data pada fase build-time atau SSR. Mencegah error runtime akibat ketiadaan field penting pada data konten statis atau input CMS. |
| **Content Authoring & Fixture Engine** | **TypeScript Literals with `satisfies` Operator** (Tahap 1) & **Contentlayer / Velite** (Bila menggunakan Markdown/MDX naratif) | Operator `satisfies` memberikan validasi tipe penuh tanpa menghilangkan keakuratan literal types, performa build instan, zero external latency. |
| **State Modalitas Lens** | **URL Search Param (`?lens=structure\|expression`) + Lightweight Cookie/Store** | Menjamin SSR dan Deep Linking bekerja sempurna (URL dapat dibagikan), mencegah layout flash (*FOUC*), dan konsisten dengan THRESHOLD CONCEPT. |
| **Asset Metadata & Optimization** | **Next.js / Astro Image Pipeline + Typed Asset Manifest** | Gambar diproses otomatis menjadi WebP/AVIF dengan pembuatan blur placeholder (LQIP) otomatis, mencegah CLS (Cumulative Layout Shift) saat transisi kanvas. |
| **Immutability Assurance** | **Native `Object.freeze` / Deep Readonly Types** | Menjamin tidak ada komponen presentasi yang secara tidak sengaja memodifikasi state data kanvas selama navigasi scroll. |

---

### 6. Verification & Testability

Lapisan data layer dirancang agar dapat diuji secara otomatis:
- **Unit Testing Data:** Menguji bahwa setiap `Project` memiliki minimal 1 `TechTag` kategori `architecture` dan link valid.
- **Contract Testing:** Memverifikasi bahwa seluruh 8 bab naratif (`01` s/d `08`) terdefinisi tanpa celah nomor urut.
- **Type Checking CLI:** Menjalankan `tsc --noEmit` dalam pipeline CI/CD untuk memastikan tidak ada pelanggaran tipe pada konten.
