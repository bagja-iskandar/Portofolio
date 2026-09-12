/**
 * @file structure.ts
 * @description Type definitions for Portfolio Structure View (Portfolio 1 / Recruiter Fast-Track)
 * @specification Strictly adheres to §16, §22, §38, §39, §46, and §47 of PROJECT_BIBLE.md
 */

import type {
  AccentColorToken,
  Brand,
  CanvasEnvironment,
  Project,
  ProjectId,
  TechnologyId,
} from './duality';

// ============================================================================
// 1. Branded Primitives for Structure View
// ============================================================================

export type CapabilityId = Brand<string, 'CapabilityId'>;
export type PatternId = Brand<string, 'PatternId'>;

// ============================================================================
// 2. Capabilities Taxonomy (§22 & §46 Mandates: Zero Skill-Bars, Pure Metadata)
// ============================================================================

export type CapabilityDomain =
  | 'mobile_architecture'
  | 'frontend_architecture'
  | 'fullstack_systems'
  | 'systems_analysis'
  | 'ai_machine_learning'
  | 'graphics_shaders'
  | 'systems_concurrency'
  | 'design_systems';

export interface CapabilityItem {
  readonly id: CapabilityId;
  readonly name: string;
  readonly scope: string;
  readonly technologies: ReadonlyArray<string>;
  readonly evidencedInProjects: ReadonlyArray<ProjectId>;
  readonly standardsCompliance?: ReadonlyArray<string>;
}

export interface CapabilityDiscipline {
  readonly domain: CapabilityDomain;
  readonly title: string;
  readonly description: string;
  readonly items: ReadonlyArray<CapabilityItem>;
}

export interface CapabilitiesTaxonomy {
  readonly headline: string;
  readonly philosophy: string;
  readonly disciplines: ReadonlyArray<CapabilityDiscipline>;
}

// ============================================================================
// 3. Systems Architecture Matrix
// ============================================================================

export type ArchitecturePatternCategory =
  | 'concurrency'
  | 'rendering'
  | 'state'
  | 'tooling'
  | 'monorepo'
  | 'machine_learning'
  | 'integration'
  | 'mobile';

export interface SystemsArchitectureMatrixItem {
  readonly id: PatternId;
  readonly pattern: string;
  readonly category: ArchitecturePatternCategory;
  readonly problemAddressed: string;
  readonly architecturalSolution: string;
  readonly tradeOffs: {
    readonly benefit: string;
    readonly liability: string;
    readonly mitigation: string;
  };
  readonly benchmarks: ReadonlyArray<{
    readonly metric: string;
    readonly value: string;
    readonly context: string;
  }>;
  readonly adoptedInProjects: ReadonlyArray<ProjectId>;
}

export interface SystemsArchitectureMatrix {
  readonly title: string;
  readonly description: string;
  readonly patterns: ReadonlyArray<SystemsArchitectureMatrixItem>;
}

// ============================================================================
// 4. Engineering Highlights & Rollup Benchmarks
// ============================================================================

export interface EngineeringBenchmarkCard {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly unit?: string;
  readonly description: string;
  readonly context: string;
  readonly verifiedStandard: string;
  readonly linkUrl?: string;
  readonly linkText?: string;
}

export interface EngineeringPrinciple {
  readonly title: string;
  readonly premise: string;
  readonly enforcement: string;
}

export interface EngineeringHighlightsRollup {
  readonly title: string;
  readonly subtitle: string;
  readonly executiveSummary: string;
  readonly benchmarkCards: ReadonlyArray<EngineeringBenchmarkCard>;
  readonly corePrinciples: ReadonlyArray<EngineeringPrinciple>;
}

// ============================================================================
// 5. Direct Contact Meta (Fast-Track Recruiter & Hiring Manager SLA)
// ============================================================================

export type AvailabilityStatus = 'available' | 'in_dialogue' | 'unavailable';

export interface DirectContactProfile {
  readonly platform: 'github' | 'linkedin' | 'readcv' | 'resume' | 'email';
  readonly label: string;
  readonly url: string;
  readonly handle?: string;
  readonly isPrimary: boolean;
}

export interface DirectContactMeta {
  readonly title: string;
  readonly subtitle: string;
  readonly availability: {
    readonly status: AvailabilityStatus;
    readonly statusBadge: string;
    readonly timeline: string;
    readonly targetRoles: ReadonlyArray<string>;
    readonly locationDetails: {
      readonly primaryLocation: string;
      readonly mode: 'Remote Global' | 'Hybrid' | 'Relocation Negotiable';
      readonly timezone: string;
      readonly timezoneOverlapNote: string;
    };
  };
  readonly communicationChannels: {
    readonly directEmail: string;
    readonly defaultSubject: string;
    readonly responseSla: string;
    readonly profiles: ReadonlyArray<DirectContactProfile>;
  };
  readonly noteToHiringTeams: string;
}

// ============================================================================
// 6. Professional Work Experience Models
// ============================================================================

export interface WorkExperienceItem {
  readonly id: string;
  readonly company: string;
  readonly projectName?: string;
  readonly role: string;
  readonly employmentType: string;
  readonly period: string;
  readonly location: string;
  readonly executiveSummary: string;
  readonly problemStatement?: string;
  readonly engineeringSolution?: string;
  readonly keyDeliverables: ReadonlyArray<string>;
  readonly coreSubsystems: ReadonlyArray<{
    readonly name: string;
    readonly responsibility: string;
  }>;
  readonly benchmarks?: ReadonlyArray<{
    readonly metric: string;
    readonly value: string;
    readonly context: string;
  }>;
  readonly technologies: ReadonlyArray<string>;
  readonly credentialUrl?: string;
  readonly credentialLabel?: string;
}

// ============================================================================
// 7. Complete Structure View Aggregation Model
// ============================================================================

export interface StructureViewHeaderMeta {
  readonly title: string;
  readonly lensTagline: string;
  readonly quickSummary: string;
  readonly canvas: CanvasEnvironment;
  readonly accent: AccentColorToken;
}

export interface StructureViewData {
  readonly headerMeta: StructureViewHeaderMeta;
  readonly projects: ReadonlyArray<Project>;
  readonly workExperience?: ReadonlyArray<WorkExperienceItem>;
  readonly capabilities: CapabilitiesTaxonomy;
  readonly systemsMatrix: SystemsArchitectureMatrix;
  readonly engineeringHighlights: EngineeringHighlightsRollup;
  readonly directContact: DirectContactMeta;
}

// ============================================================================
// 8. Structure View Repository Port (Clean Architecture)
// ============================================================================

export interface IStructureRepository {
  getStructureViewData(): Promise<StructureViewData>;
  getCapabilitiesTaxonomy(): Promise<CapabilitiesTaxonomy>;
  getSystemsArchitectureMatrix(): Promise<SystemsArchitectureMatrix>;
  getEngineeringHighlights(): Promise<EngineeringHighlightsRollup>;
  getDirectContactMeta(): Promise<DirectContactMeta>;
  getProjectsSummary(): Promise<ReadonlyArray<Project>>;
}
