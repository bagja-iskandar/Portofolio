/**
 * @file capabilities.data.ts
 * @description Architectural Capabilities Taxonomy for Bagja Iskandar Jamil
 * Pure structured metadata organized into 4 core competency pillars derived from official resume:
 * 1. Requirements Engineering & Systems Modeling
 * 2. Modern Frontend Engineering & Design Systems
 * 3. Backend Systems, REST APIs & Databases
 * 4. Applied Machine Learning & Signal Processing
 */

import type { CapabilitiesTaxonomy, CapabilityId, ProjectId } from '../../types/duality';

export const CAPABILITIES_TAXONOMY: CapabilitiesTaxonomy = {
  headline: 'Core Engineering Capabilities & Competency Pillars',
  philosophy:
    'Technical capability is demonstrated through working software, verifiable test suites, and peer-reviewed research — not through subjective skill bars, arbitrary percentages, or vanity ratings.',
  disciplines: [
    {
      domain: 'requirements_to_system',
      title: 'Requirements to System',
      description:
        'Translating complex operational workflows into structured technical specifications, formal UML architecture diagrams, and role-based access models.',
      items: [
        {
          id: 'cap-uml-srs' as CapabilityId,
          name: 'Software Requirements Specification (SRS) & UML Modeling',
          scope:
            'Formulating 16-use-case Software Requirements Specifications (SRS), use case diagrams, sequence diagrams, and activity flows derived from operational logistics requirements.',
          technologies: [
            'UML 2.5',
            'SRS Documentation',
            'Use Case Modeling',
            'Sequence Diagrams',
            'Activity Diagrams',
          ],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: [
            'Structured SRS Documentation',
            '16/16 SRS Verification',
          ],
        },
        {
          id: 'cap-rbac-workflows' as CapabilityId,
          name: 'Role-Based Access Control & Operational Workflows',
          scope:
            'Designing multi-role permission boundaries (Admin, Driver, Tenant) and operational status state machines for warehouse and fintech operations.',
          technologies: [
            'RBAC Security Models',
            'State Machine Transitions',
            'User Journey Mapping',
          ],
          evidencedInProjects: ['proj-wms' as ProjectId, 'proj-swap-on' as ProjectId],
          standardsCompliance: [
            'Principle of Least Privilege',
            'Workflow State Determinism',
          ],
        },
      ],
    },
    {
      domain: 'frontend_delivery',
      title: 'Frontend Delivery',
      description:
        'Building performant, accessible, and responsive user interfaces with Next.js 15, React 19, Nuxt 4, Vue.js 3, and reusable atomic component libraries.',
      items: [
        {
          id: 'cap-nextjs-react' as CapabilityId,
          name: 'Next.js 15 & React 19 Web Applications',
          scope:
            'Developing web application frontends with Next.js 15 App Router, React 19 Server Components, TanStack Query v5, and responsive telemetry dashboards.',
          technologies: [
            'Next.js 15',
            'React 19',
            'TypeScript',
            'Tailwind CSS',
            'TanStack Query v5',
          ],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: [
            'Next.js App Router Standards',
            'W3C Semantic HTML5 & A11y',
          ],
        },
        {
          id: 'cap-nuxt-vue' as CapabilityId,
          name: 'Nuxt 4, Vue.js 3 & Atomic UI Component Libraries',
          scope:
            'Engineering cross-border remittance and management dashboards using Vue 3 Composition API, Pinia state management, and reusable atomic UI components (~20 screens delivered).',
          technologies: [
            'Nuxt 4',
            'Vue.js 3',
            'TypeScript',
            'Tailwind CSS',
            'Pinia',
            'Vite',
          ],
          evidencedInProjects: ['proj-swap-on' as ProjectId, 'proj-mgmt-dashboard' as ProjectId],
          standardsCompliance: [
            'Atomic Component Architecture',
            'Vue 3 Composition API Patterns',
          ],
        },
        {
          id: 'cap-cms-refactoring' as CapabilityId,
          name: 'CMS Frontend Refactoring & UI Remediation',
          scope:
            'Refactoring legacy municipal CMS frontend modules, implementing clean service interfaces, enforcing schema validation, and resolving cross-browser layout defects in a 3-person team.',
          technologies: [
            'Nuxt.js',
            'Vue.js',
            'TypeScript',
            'Bootstrap 5',
            'Pinia',
            'Docker',
            'Git',
          ],
          evidencedInProjects: ['proj-diskominfo-cms' as ProjectId],
          standardsCompliance: [
            'Clean Service Layer Pattern',
            'UI Defect Remediation',
          ],
        },
      ],
    },
    {
      domain: 'backend_and_systems',
      title: 'Backend & Systems',
      description:
        'Developing modular backend services, typed REST APIs, relational schemas, and automated test suites for scalable web applications.',
      items: [
        {
          id: 'cap-nestjs-rest' as CapabilityId,
          name: 'NestJS RESTful APIs & Monorepo Architecture',
          scope:
            'Developing modular backend services with NestJS 10, implementing 10 backend modules, 56 documented REST endpoints (Swagger), and coordinating monorepo shared TypeScript types.',
          technologies: [
            'NestJS 10',
            'TypeScript',
            'RESTful APIs',
            'Swagger / OpenAPI',
            'Docker',
          ],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: [
            'Modular Architecture',
            'Comprehensive OpenAPI Documentation',
          ],
        },
        {
          id: 'cap-database-orm' as CapabilityId,
          name: 'Relational Databases & ORM Architecture',
          scope:
            'Designing relational data models (18 Prisma tables), migrations, connection pooling via PgBouncer, and object-relational mapping using Supabase PostgreSQL 16 and Prisma ORM v6.',
          technologies: [
            'PostgreSQL 16 (Supabase)',
            'Prisma ORM v6',
            'PgBouncer',
            'SQL Data Modeling',
          ],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: [
            'Relational Normalization',
            'Connection Pooling Optimization',
          ],
        },
        {
          id: 'cap-automated-testing' as CapabilityId,
          name: 'Automated Testing & Quality Verification',
          scope:
            'Writing unit, integration, and E2E test suites with Jest and automated test runners, achieving 214 passing tests across domain controllers and business logic.',
          technologies: [
            'Jest',
            'Automated Integration Testing',
            'CI/CD Pipelines',
            'Git',
          ],
          evidencedInProjects: ['proj-wms' as ProjectId],
          standardsCompliance: [
            '214 Automated Tests (100% Passing)',
            'Continuous Quality Verification',
          ],
        },
      ],
    },
    {
      domain: 'machine_learning_and_research',
      title: 'Machine Learning & Research',
      description:
        'Researching deep learning architectures for biomedical signal classification, academic instruction, and modern AI-assisted engineering.',
      items: [
        {
          id: 'cap-deep-learning-bci' as CapabilityId,
          name: 'Deep Learning & Biomedical Signal Classification (EEG BCI)',
          scope:
            'Developing hybrid Graph Convolutional Networks (GCN) and Mamba State Space Models (SSM) with Wavelet Packet Transform (WPT db4) for 4-class motor imagery EEG classification, achieving 82.05% mean accuracy across 9 subjects.',
          technologies: [
            'Python 3',
            'PyTorch',
            'Mamba (SSM)',
            'Graph Neural Networks (GCN)',
            'Wavelet Packet Transform (db4)',
            'MNE-Python',
            'LDA',
          ],
          evidencedInProjects: ['proj-bci-research' as ProjectId],
          standardsCompliance: [
            'IEEE ICIC 2025 Peer-Reviewed Publication (#11309504)',
            'BCI Competition IV-2a Benchmark Protocol',
          ],
        },
        {
          id: 'cap-ai-assisted-engineering' as CapabilityId,
          name: 'AI-Assisted Software Engineering & Pedagogy',
          scope:
            'Guiding undergraduate students through AI laboratory practicums in Python, and accelerating development velocity via modern AI tools (Antigravity, OpenAI Codex) while manually validating architecture and business logic.',
          technologies: [
            'Python 3',
            'AI Practicum Mentoring',
            'Google Antigravity',
            'OpenAI Codex',
          ],
          evidencedInProjects: ['proj-bci-research' as ProjectId, 'proj-wms' as ProjectId],
          standardsCompliance: [
            'Academic Laboratory Curriculum',
            'Transparent AI-Assisted Workflows',
          ],
        },
      ],
    },
  ],
} as const;

export const CAPABILITIES_DATA = CAPABILITIES_TAXONOMY;
