/**
 * @file capabilities.data.ts
 * @description Architectural Capabilities Taxonomy for Bagja Iskandar Jamil
 * Conforms strictly to §22 & §46 of PROJECT_BIBLE.md (Zero Skill-Bars, Zero Percentages, Zero Stars).
 * Pure structured metadata organized by verified engineering disciplines derived from official resume.
 */

import type { CapabilitiesTaxonomy, CapabilityId, ProjectId } from '../../types/duality';

export const CAPABILITIES_TAXONOMY: CapabilitiesTaxonomy = {
  headline: 'Core Engineering Capabilities & Disciplines',
  philosophy:
    'Technical capability is demonstrated through working software, architectural rigor, and verifiable deliverables — not through subjective skill bars, star ratings, or arbitrary percentages.',
  disciplines: [
    {
      domain: 'mobile_architecture',
      title: 'Cross-Platform Mobile & Native Systems',
      description:
        'Architecting resilient mobile client applications across Android and iOS with Kotlin Multiplatform (KMP), Compose Multiplatform, native Android SDK, and digital image processing.',
      items: [
        {
          id: 'cap-kmp-compose' as CapabilityId,
          name: 'Kotlin Multiplatform (KMP) & Compose Architecture',
          scope:
            'Engineering cross-platform mobile clients with shared Kotlin domain logic, Compose Multiplatform declarative UI, Swift/SwiftUI host bridges, and Stripe payment gateway integration.',
          technologies: [
            'Kotlin 2.4 (JVM 11)',
            'Kotlin Multiplatform (KMP)',
            'Compose Multiplatform 1.11',
            'Android (XML / Material 3)',
            'Swift / SwiftUI (iOS)',
            'Stripe Android SDK',
            'Gradle Kotlin DSL (AGP 9.2)',
          ],
          evidencedInProjects: ['proj-swap-on' as ProjectId],
          standardsCompliance: [
            'Cross-Platform Shared Logic',
            'Compose Material 3 Standards',
            'Stripe Secure Payment Guidelines',
          ],
        },
        {
          id: 'cap-android-image-processing' as CapabilityId,
          name: 'Native Android Engineering & Digital Image Processing',
          scope:
            'Developing high-performance Android applications with modern Kotlin, discrete RGB bitmap channel decomposition, real-time pixel frequency histogram calculations, and Canvas matrix manipulation.',
          technologies: [
            'Kotlin (Android SDK 34)',
            'Android Studio / Jetpack',
            'Bitmap Matrix Processing & Canvas',
            'AndroidX AppCompat',
          ],
          evidencedInProjects: ['proj-mobile-image-editor' as ProjectId],
          standardsCompliance: [
            'Android SDK 34 Guidelines',
            'Direct Bitmap Matrix Operations',
          ],
        },
      ],
    },
    {
      domain: 'frontend_architecture',
      title: 'Modern Frontend Engineering',
      description:
        'Building responsive, accessible, and performant web interfaces with Next.js 15, React 19, Nuxt 4, Vue.js 3, TypeScript, and modern component design systems.',
      items: [
        {
          id: 'cap-nextjs-react' as CapabilityId,
          name: 'Next.js 15 & React 19 Enterprise Architecture',
          scope:
            'Architecting full-stack monorepo web clients with Next.js 15 App Router, React 19 Server Components, TanStack Query v5, real-time IoT temperature telemetry monitoring, and role-based operational hubs.',
          technologies: [
            'Next.js 15 (React 19)',
            'TypeScript',
            'Tailwind CSS',
            'TanStack React Query v5',
          ],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: [
            'Next.js 15 App Router Architecture',
            'W3C Semantic HTML5 & A11y',
          ],
        },
        {
          id: 'cap-nuxt-vue' as CapabilityId,
          name: 'Nuxt 4 & Vue.js Dashboard Systems',
          scope:
            'Engineering scalable enterprise dashboards with Nuxt 4, Vue.js Composition API, Nitro server engine routes, and persistent Unstorage KV file CRUD architectures.',
          technologies: [
            'Nuxt 4',
            'Vue.js',
            'Nitro API Engine',
            'Tailwind CSS',
            'TypeScript',
          ],
          evidencedInProjects: ['proj-mgmt-dashboard' as ProjectId],
          standardsCompliance: [
            'Vue 3 Composition API Patterns',
            'Nitro Server Route Standards',
          ],
        },
        {
          id: 'cap-ui-refactoring' as CapabilityId,
          name: 'Enterprise CMS Frontend Modernization & Service Architecture',
          scope:
            'Auditing and modernizing legacy municipal CMS frontend modules, implementing clean OOP ServiceInterface layers, enforcing Zod schema validation, and resolving complex layout rendering glitches.',
          technologies: [
            'Nuxt 3',
            'Vue 3',
            'TypeScript',
            'Bootstrap 5',
            'Zod',
            'Pinia',
            'Vite',
            'Docker',
            'Git',
          ],
          evidencedInProjects: ['proj-diskominfo-cms' as ProjectId],
          standardsCompliance: [
            'Clean OOP Service Layer (ServiceInterface)',
            'Zod Schema Runtime Validation',
          ],
        },
      ],
    },
    {
      domain: 'fullstack_systems',
      title: 'Full-Stack & Backend Systems',
      description:
        'Architecting end-to-end web services, RESTful APIs, relational databases, and monorepos connecting backend business logic with frontend client views.',
      items: [
        {
          id: 'cap-nestjs-backend' as CapabilityId,
          name: 'NestJS REST APIs & Microservices',
          scope:
            'Building modular backend services with NestJS 10, implementing 10 domain microservices, role-based access control (Admin, Driver, Tenant), and structured DTO controllers.',
          technologies: ['NestJS 10.4', 'TypeScript', 'Docker & MinIO S3', 'REST API Design'],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: ['RESTful API Architecture', 'Role-Based Access Control (RBAC)'],
        },
        {
          id: 'cap-database-orm' as CapabilityId,
          name: 'Relational Database Architecture & Connection Pooling',
          scope:
            'Designing relational schemas, entity relationships, migrations, and query optimizations using Supabase PostgreSQL 16 with PgBouncer transaction pooling (port 6543, syd1) and Prisma ORM v6.',
          technologies: ['Supabase PostgreSQL 16', 'Prisma ORM v6', 'SQL Data Modeling'],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: ['Relational Normalization', 'ACID Transaction Guarantees', 'Serverless Connection Pooling'],
        },
        {
          id: 'cap-monorepo-mgmt' as CapabilityId,
          name: 'Monorepo Architecture & Type Sharing',
          scope:
            'Structuring unified multi-package monorepos pairing Next.js 15 with NestJS 10, sharing TypeScript types, DTO contracts, and coordinated build pipelines with 100% SRS compliance.',
          technologies: ['Next.js 15 (React 19)', 'NestJS 10.4', 'TypeScript', 'Git'],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: ['End-to-End Type Safety', 'Modular Monorepo Architecture', '16/16 SRS Use Case Verification'],
        },
      ],
    },
    {
      domain: 'ai_machine_learning',
      title: 'Applied AI & Scientific Research',
      description:
        'Applying deep learning models to biomedical signal processing, academic laboratory instruction, and leveraging modern AI-assisted engineering tools.',
      items: [
        {
          id: 'cap-deep-learning-research' as CapabilityId,
          name: 'Deep Learning & Biomedical Signal Classification (BCI)',
          scope:
            'Engineering hybrid Graph Neural Networks (GNN) and Mamba State Space Models (SSM) with Wavelet Packet Transform (WPT db4) for 4-class motor imagery EEG classification, achieving 82.05% accuracy.',
          technologies: [
            'Python 3',
            'PyTorch',
            'Mamba State Space Models (SSM)',
            'Graph Convolutional Networks (GCN)',
            'Wavelet Packet Transform (db4)',
            'MNE-Python (EEG Processing)',
            'Linear Discriminant Analysis (LDA)',
          ],
          evidencedInProjects: ['proj-bci-research' as ProjectId],
          standardsCompliance: [
            'IEEE ICIC 2025 Peer-Reviewed Academic Publication (#11309504)',
            'BCI Competition IV-2a Benchmark Protocol',
          ],
        },
        {
          id: 'cap-ai-pedagogy-tools' as CapabilityId,
          name: 'AI Laboratory Instruction & AI-Assisted Development',
          scope:
            'Guiding students through fundamental AI programming workflows and actively leveraging AI-assisted development tools (Antigravity, OpenAI Codex) for rapid problem solving.',
          technologies: ['Artificial Intelligence Pedagogy', 'Python 3', 'Antigravity', 'OpenAI Codex'],
          evidencedInProjects: ['proj-bci-research' as ProjectId],
          standardsCompliance: ['Academic Laboratory Curriculum Standards'],
        },
      ],
    },
    {
      domain: 'systems_analysis',
      title: 'Systems Analysis & Design Modeling',
      description:
        'Translating complex operational workflows into rigorous technical specifications, user flows, and formal UML architecture diagrams.',
      items: [
        {
          id: 'cap-uml-modeling' as CapabilityId,
          name: 'UML Architecture & Technical Documentation (SRS)',
          scope:
            'Formulating comprehensive 16-use-case Software Requirements Specifications (SRS), use case diagrams, sequence diagrams, and activity flows guiding enterprise engineering projects.',
          technologies: ['UML Modeling', 'System Flowcharts', 'Software Requirements Specification (SRS)', 'Software Engineering Life Cycle'],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: ['OMG UML 2.5 Standard', 'Structured Systems Analysis & Design (16/16 SRS Verified)'],
        },
        {
          id: 'cap-role-workflows' as CapabilityId,
          name: 'Operational & Role-Based Workflow Design',
          scope:
            'Designing distinct operational boundaries and access levels for administrative controllers, field operators (drivers), and external corporate tenants with instant-persona authentication.',
          technologies: ['RBAC Security Models', 'State Machine Modeling', 'User Journey Mapping'],
          evidencedInProjects: ['proj-wms' as ProjectId, 'proj-swap-on' as ProjectId],
          standardsCompliance: ['Principle of Least Privilege', 'User-Centered Process Flow'],
        },
      ],
    },
  ],
} as const;

export const CAPABILITIES_DATA = CAPABILITIES_TAXONOMY;
