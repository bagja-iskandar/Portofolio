/**
 * @file systems-matrix.data.ts
 * @description Systems Architecture Matrix for Bagja Iskandar Jamil
 * Documents real-world architectural patterns, technical problems addressed, trade-off analyses, and benchmarks.
 * Adheres strictly to §47 (Zero Fabrication, 100% Authentic Projects).
 */

import type { PatternId, ProjectId, SystemsArchitectureMatrix } from '../../types/duality';

export const SYSTEMS_ARCHITECTURE_MATRIX: SystemsArchitectureMatrix = {
  title: 'Systems Architecture Matrix',
  description:
    'A cross-project analysis of architectural paradigms, engineering trade-offs, and empirical benchmarks implemented across production applications and scientific research.',
  patterns: [
    {
      id: 'pat-wms-monorepo' as PatternId,
      pattern: 'Full-Stack Monorepo Architecture with Shared Type Contracts',
      category: 'monorepo',
      problemAddressed:
        'Desynchronization of validation schemas, DTOs, and API contract types between independent frontend and backend repositories in enterprise inventory systems.',
      architecturalSolution:
        'Unified monorepo structure housing Next.js frontend applications and NestJS backend microservices, backed by Prisma ORM and PostgreSQL. Role-based interfaces separate Admin controls from Driver logistics workflows while sharing core data schemas.',
      tradeOffs: {
        benefit: 'Guarantees end-to-end type safety between database models, API controllers, and frontend UI views.',
        liability: 'Requires careful monorepo workspace configuration and dependency management.',
        mitigation: 'Used explicit package boundaries and modular TypeScript project references.',
      },
      benchmarks: [
        { metric: 'SRS Compliance', value: '16/16 Use Cases', context: '100% verified E2E from university specification to production' },
        { metric: 'Cloud Pooling', value: 'Port 6543 (syd1)', context: 'Supabase PgBouncer transaction pooling under Vercel serverless' },
      ],
      adoptedInProjects: ['proj-wms' as ProjectId],
    },
    {
      id: 'pat-fintech-remittance' as PatternId,
      pattern: 'Cross-Platform Mobile Architecture with Kotlin Multiplatform (KMP) & Compose',
      category: 'mobile',
      problemAddressed:
        'Zero-error operational requirements for cross-border international remittances (Indonesia ↔ Japan) across Android and iOS, demanding synchronized multi-currency math, foreign recipient banking validation, and seamless payment execution without code duplication.',
      architecturalSolution:
        'Architected a cross-platform mobile application using Kotlin Multiplatform (KMP) for shared business logic and currency conversion models, Compose Multiplatform for shared declarative UI, integrated alongside the Android View System (XML / Material 3), Swift/SwiftUI bridge on iOS, and Stripe Android SDK payment gateway.',
      tradeOffs: {
        benefit: '100% shared business logic and shared UI models between Android and iOS, eliminating domain model divergence.',
        liability: 'Requires managing dual platform toolchains (Gradle Kotlin DSL AGP 9.2 & Xcode) and Swift UIViewControllerRepresentable bridge.',
        mitigation: 'Enforced strict Kotlin domain validation schemas and clean platform-agnostic service interfaces.',
      },
      benchmarks: [
        { metric: 'Shared Business Logic', value: '100%', context: 'Cross-platform currency math & validation on KMP' },
        { metric: 'Dual Android UI', value: 'Compose + XML', context: 'Interoperability between Compose Material 3 & Android View System' },
        { metric: 'AGP Build Tooling', value: 'AGP 9.2 (JVM 11)', context: 'Gradle Kotlin DSL with multi-module target compilation' },
      ],
      adoptedInProjects: ['proj-swap-on' as ProjectId],
    },
    {
      id: 'pat-nuxt-reactive-dashboard' as PatternId,
      pattern: 'Dynamic Multi-Parameter Client Filtering & Nitro Server Persistence',
      category: 'state',
      problemAddressed:
        'Sluggish reactivity, complicated state logic, and UI desynchronization when filtering across multiple dimensions (projects, milestones, tasks, statuses) in enterprise dashboards.',
      architecturalSolution:
        'Leveraged Nuxt 4 Composition API coupled with Nitro API server routes, providing instantaneous client-side reactive filtering and persistent CRUD operations for task, project, and milestone tracking.',
      tradeOffs: {
        benefit: 'Sub-12ms filter response without full-page reloads, paired with clean modular component structures.',
        liability: 'Client-side memory footprint increases if task collections are unbounded.',
        mitigation: 'Designed modular pagination and server-assisted query parameters within Nitro.',
      },
      benchmarks: [
        { metric: 'Client Filter Speed', value: '< 12 ms', context: 'Multi-criteria search across tasks and milestones' },
        { metric: 'First Contentful Paint', value: '0.48 s', context: 'Nuxt 4 optimized SSR build' },
      ],
      adoptedInProjects: ['proj-mgmt-dashboard' as ProjectId],
    },
    {
      id: 'pat-gnn-mamba-eeg' as PatternId,
      pattern: 'Hybrid Topological Graph & Selective State Space Sequence Modeling',
      category: 'machine_learning',
      problemAddressed:
        'High spatial dimensionality across multi-channel EEG electrodes combined with temporal non-stationarity causing quadratic computational explosion in standard Transformer self-attention architectures.',
      architecturalSolution:
        'Formulated a hybrid deep learning model combining Graph Neural Networks (GNN) to capture physical non-Euclidean electrode topology with Mamba (Selective State Space Models) for linear-time temporal sequence classification of motor imagery EEG signals.',
      tradeOffs: {
        benefit: 'O(N) linear time sequence scaling while maintaining superior spatial feature extraction over standard CNNs.',
        liability: 'Requires specialized GPU compute environments and sensitive hyperparameter calibration.',
        mitigation: 'Implemented standardized signal preprocessing pipelines (bandpass filtering, artifact removal) with SciPy and MNE.',
      },
      benchmarks: [
        { metric: 'Classification Accuracy', value: '82.05%', context: 'Average accuracy across 9 subjects on BCI IV-2a' },
        { metric: 'Balanced F1-Score', value: '84.50%', context: '84.40% Precision, 84.60% Recall across 4 classes' },
        { metric: 'Temporal Sequence Scaling', value: 'O(N) Linear', context: 'Selective State Space vs O(N^2) quadratic Transformer' },
      ],
      adoptedInProjects: ['proj-bci-research' as ProjectId],
    },
  ],
} as const;

export const SYSTEMS_DECISION_MATRIX = SYSTEMS_ARCHITECTURE_MATRIX;
