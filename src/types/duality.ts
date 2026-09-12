/**
 * @file duality.ts
 * @description Canonical Data Layer Types for Duality Portfolio
 * @specification Adheres to PROJECT_BIBLE.md (§39) and THRESHOLD_CONCEPT.md
 */

// ============================================================================
// 1. Nominal Brands & Primitives
// ============================================================================

export type Brand<K, T extends string> = K & { readonly __brand: T };

export type ProjectId = Brand<string, 'ProjectId'>;
export type ChapterId = Brand<string, 'ChapterId'>;
export type StudyId = Brand<string, 'StudyId'>;
export type TechnologyId = Brand<string, 'TechnologyId'>;

/**
 * Canvas Environment as defined in §8 & §9 of PROJECT_BIBLE.md
 * Ivory (#F5F2EB) represents light, paper texture, editorial clarity.
 * Ink (#0E0D0C) represents dark, deep charcoal, spatial tension.
 */
export type CanvasEnvironment = 'ivory' | 'ink';

/**
 * Reading Modality as defined in THRESHOLD_CONCEPT.md
 * 'structure' represents the short read, dense technical precision.
 * 'expression' represents the full story, immersive scrollytelling.
 */
export type ExperienceLens = 'structure' | 'expression';

/**
 * Emotional Progression throughout the 8 chapters (§1 Bible)
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
 * Typography Three-Voice System (§10 Bible)
 */
export type TypographyVoice = 'serif' | 'sans' | 'mono';

/**
 * Earth Pigment Accent Tokens (§9 Bible)
 */
export type AccentColorToken = 'terracotta' | 'ochre';

/**
 * Strongly Typed Media & Visual Asset Metadata
 * Ensures zero hardcoded image paths in UI presentation components.
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
  readonly blurDataUrl?: string; // Low Quality Image Placeholder
}

// ============================================================================
// 2. Threshold Split-Screen Domain Model (THRESHOLD_CONCEPT.md)
// ============================================================================

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
    readonly word: string;
    readonly splitIndex: number;
  };
  readonly organicDividerWave: {
    readonly amplitude: number;
    readonly frequency: number;
    readonly inkColor: string;
  };
  readonly lenses: {
    readonly structure: ThresholdLensConfig;
    readonly expression: ThresholdLensConfig;
  };
  readonly persistenceStrategy: 'session' | 'cookie' | 'none';
}

// ============================================================================
// 3. Narrative Chapters Model (8 Editorial Chapters — §6 Bible)
// ============================================================================

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
  readonly narrativePrompt: string; // e.g. "Siapa saya?", "Apa yang sudah saya bangun?"
  readonly emotionalProgression: EmotionalProgression;
  readonly canvasEnvironment: CanvasEnvironment;
  readonly accentToken: AccentColorToken;
  readonly motionPacing: 'slow' | 'measured' | 'contemplative' | 'immersive';
  readonly dominantVoice: TypographyVoice;
}

// ============================================================================
// 4. Project[] Domain Model (Selected Work — §16 & §39 Bible)
// ============================================================================

export interface TechTag {
  readonly id: TechnologyId;
  readonly name: string;
  readonly category: 'frontend' | 'graphics_shader' | 'systems' | 'interaction' | 'architecture';
  readonly isCore: boolean;
}

export interface ProjectExhibitMedia {
  readonly heroAsset: MediaAsset;
  readonly processScan?: MediaAsset; // Authentic sketchbook page or physical wireframe
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

export interface ProjectStructureRead {
  readonly executiveSummary: string;
  readonly problemStatement: string;
  readonly engineeringSolution: string;
  readonly impactMetrics: ReadonlyArray<string>;
  readonly architecturePattern?: string;
  readonly coreSubsystems?: ReadonlyArray<{
    readonly name: string;
    readonly responsibility: string;
  }>;
}

export interface ProjectExpressionRead {
  readonly editorialHeadline: string;
  readonly narrativeStory: string; // Curatorial narrative & design-engineering dialectic
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
 * Single Structured Source of Truth for Project Entities (§39 Bible)
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
  readonly displayOrder: number;
  readonly featured: boolean;
  readonly canvasEnvironment: CanvasEnvironment;
  readonly structureRead: ProjectStructureRead;
  readonly expressionRead: ProjectExpressionRead;
  readonly technical: ProjectTechnicalArchitecture;
  readonly exhibit: ProjectExhibitMedia;
  readonly links: ReadonlyArray<ProjectExternalLink>;
}

// ============================================================================
// 5. Studio / Studies Model (Chapter 05 — §16 & §22 Bible)
// ============================================================================

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

// ============================================================================
// 6. Personal Profile, Philosophy, & The Artifact
// ============================================================================

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
  readonly fragmentationRate: number;
}

export interface PersonalProfile {
  readonly hero: {
    readonly name: string;
    readonly monogram: string;
    readonly role: string;
    readonly largeStatement: string;
    readonly smallMetadata: ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }>;
    readonly sketchPolaroid: MediaAsset;
  };
  readonly introduction: {
    readonly builderStatement: string;
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

// ============================================================================
// 7. Repository Interfaces (Ports & Adapters)
// ============================================================================

export interface IProjectRepository {
  getAllProjects(): Promise<ReadonlyArray<Project>>;
  getFeaturedProjects(): Promise<ReadonlyArray<Project>>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getProjectsByCanvas(canvas: CanvasEnvironment): Promise<ReadonlyArray<Project>>;
}

export interface IChapterRepository {
  getAllChapters(): Promise<ReadonlyArray<NarrativeChapter>>;
  getChapterBySequence(sequence: ChapterSequenceNumber): Promise<NarrativeChapter | null>;
  getChapterById(id: ChapterId): Promise<NarrativeChapter | null>;
}

export interface IStudyRepository {
  getAllStudies(): Promise<ReadonlyArray<StudioStudy>>;
  getStudyBySlug(slug: string): Promise<StudioStudy | null>;
}

export interface IThresholdRepository {
  getThresholdConfig(): ThresholdConfig;
  getLensConfig(lens: ExperienceLens): ThresholdLensConfig;
}

// Re-export Structure View models and contracts
export * from './structure';

