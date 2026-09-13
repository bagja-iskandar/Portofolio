/**
 * @file projects.data.ts
 * @description Canonical Projects Data Source for Bagja Iskandar Jamil conforming to §16, §39, & §47 of PROJECT_BIBLE.md
 * 100% Authentic Data derived from Official Resume (Zero Fabrication).
 * Dual-lens representation: Structure Read (concise/technical) vs Expression Read (editorial/craft).
 */

import type { Project, ProjectId, TechnologyId } from '../../types/duality';

export const SELECTED_PROJECTS: ReadonlyArray<Project> = [
  {
    id: 'proj-swap-on' as ProjectId,
    slug: 'swap-on-remittance',
    title: 'Swap-On',
    subtitle: 'Cross-Border Money Transfer Mobile Application (Android & iOS — KMP)',
    year: 2026,
    role: 'Frontend Developer (Freelance)',
    timeline: '2026',
    status: 'completed',
    displayOrder: 1,
    featured: true,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Engineered responsive, accessible mobile user interfaces for a cross-platform fintech remittance application facilitating international money transfers between Indonesia and Japan across Android and iOS.',
      problemStatement:
        'International money transfers demand zero-error user journeys, real-time currency exchange feedback, clear fee disclosures, and strict input validation for foreign recipient bank accounts across mobile operating systems.',
      engineeringSolution:
        'Architected a cross-platform mobile client using Kotlin Multiplatform (KMP) and Compose Multiplatform alongside Android Native (XML / Material Components) and iOS (Swift/SwiftUI), accelerated via AI-assisted engineering with OpenAI Codex; developed core application modules including multi-currency wallet management, exchange rate calculators, recipient directories, transfer execution workflows, and Stripe payment integration.',
      impactMetrics: [
        'Cross-platform shared business logic and UI architecture using Kotlin Multiplatform (KMP) across Android and iOS',
        'Dual Android UI implementation integrating Compose Multiplatform with legacy Android View System (XML / Material Components)',
        'Secure international payment processing and card checkout flow integration using Stripe Android SDK',
      ],
      architecturePattern: 'Cross-Platform Mobile Architecture with Kotlin Multiplatform (KMP) & Compose Multiplatform',
      coreSubsystems: [
        {
          name: 'Shared KMP Logic & Currency Core',
          responsibility: 'Handles live conversion calculations, balance updates, and currency pair selections across platforms.',
        },
        {
          name: 'Recipient Directory & Validation Module',
          responsibility: 'Manages international recipient accounts with banking code validation on Android and iOS.',
        },
        {
          name: 'Stripe Gateway & Checkout Flow',
          responsibility: 'Processes secure card remittances, fee disclosures, and payment lifecycle callbacks.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Frictionless Remittance Across Sovereign Currencies',
      narrativeStory:
        'Cross-border financial transfers demand unyielding clarity. Built across Kotlin Multiplatform and Jetpack Compose, the Swap-On interface simplifies cross-currency transactions between Indonesia and Japan through rigorous input validation and tactile user feedback.',
      craftReflection:
        'In financial applications, component consistency is not merely aesthetic—it is the direct foundation of user trust and operational security.',
      pullQuote: {
        text: 'Financial software must be unambiguous; every number, state, and confirmation must communicate total certainty.',
        attribution: 'Engineering Notes, Swap-On',
      },
    },
    technical: {
      stack: [
        { id: 'tech-kotlin' as TechnologyId, name: 'Kotlin 2.4 (JVM 11)', category: 'systems', isCore: true },
        { id: 'tech-kmp' as TechnologyId, name: 'Kotlin Multiplatform (KMP)', category: 'architecture', isCore: true },
        { id: 'tech-compose-multiplatform' as TechnologyId, name: 'Compose Multiplatform', category: 'frontend', isCore: true },
        { id: 'tech-android' as TechnologyId, name: 'Android (XML / Material 3)', category: 'frontend', isCore: true },
        { id: 'tech-swift' as TechnologyId, name: 'Swift / SwiftUI (iOS)', category: 'frontend', isCore: false },
        { id: 'tech-stripe' as TechnologyId, name: 'Stripe Android SDK', category: 'architecture', isCore: false },
        { id: 'tech-gradle' as TechnologyId, name: 'Gradle Kotlin DSL', category: 'systems', isCore: false },
        { id: 'tech-codex' as TechnologyId, name: 'OpenAI Codex (AI-Assisted)', category: 'architecture', isCore: false },
      ],
      architecturalDecisions: [
        {
          decision: 'Shared Logic & UI via Kotlin Multiplatform (KMP) and Compose Multiplatform',
          rationale:
            'Unified business logic, currency conversion math, and declarative UI across Android and iOS while preserving native platform capabilities.',
          tradeOff:
            'Required managing platform-specific dependencies and Swift UIViewControllerRepresentable bridge.',
        },
        {
          decision: 'Dual Android UI Strategy: Compose Multiplatform with Android View System',
          rationale:
            'Allowed progressive modernization using Compose Material 3 while maintaining robust support for established XML layouts and ConstraintLayout.',
          tradeOff:
            'Required interop coordination between ComposeView and Android View hierarchies.',
        },
      ],
      benchmarks: [],
      engineeringHighlight:
        'Architected cross-platform mobile client with Kotlin Multiplatform (KMP), Compose Multiplatform, and Stripe Android SDK.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-swapon-hero',
        src: '/assets/projects/swapon/hero.webp',
        alt: 'Swap-On cross-border remittance interface',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 1.1: Multi-currency transfer workflow and wallet management interface.',
      },
    },
    links: [],
  },
  {
    id: 'proj-wms' as ProjectId,
    slug: 'warehouse-management-system',
    title: 'WMS Nusantara',
    subtitle: 'Enterprise Warehouse & Cold Chain Logistics Platform (16/16 SRS Use Cases)',
    year: 2026,
    role: 'Lead System Architect & Full-Stack Engineer',
    timeline: '2025 – 2026',
    status: 'completed',
    displayOrder: 2,
    featured: true,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Engineered and realized a production-grade enterprise Warehouse Management System (WMS) and Cold Chain Logistics platform from an authentic 16-use-case university Software Requirements Specification (SRS), integrating real-time IoT temperature telemetry, multi-tier rack m³ allocation, and reefer fleet dispatch.',
      problemStatement:
        'Cold-chain logistics operations demand strict temperature compliance (-20°C to 4°C), zero inventory discrepancies across multi-tier warehouse racks, synchronized driver dispatch with digital POD, and resilient database connection pooling under serverless execution.',
      engineeringSolution:
        'Architected a full-stack monorepo pairing Next.js 15 App Router (React 19) with a 10-module NestJS Clean Architecture backend, engineered with Antigravity AI orchestration; implemented Supabase PostgreSQL 16 with PgBouncer transaction pooling (port 6543, syd1 region), Prisma v6 ORM, TanStack Query v5, role-based access control (Admin, Driver, Customer), and real-time sub-zero telemetry monitoring.',
      impactMetrics: [
        '100% SRS functional compliance (16/16 use cases verified E2E from academic blueprint to live production)',
        'Production serverless cloud deployment on Vercel Edge with Sydney (syd1) microservices & Supabase PostgreSQL pooling',
        'Multi-role operations hub with 3 instant-persona logins (Warehouse Admin, Fleet Driver, Corporate Tenant)',
        'Real-time cold-chain IoT temperature telemetry with automated threshold anomaly alerts',
      ],
      architecturePattern: 'Modular Clean Architecture (NestJS 10) & Edge-Distributed Monorepo (Next.js 15 App Router)',
      coreSubsystems: [
        {
          name: 'Warehouse & Cold Storage Engine',
          responsibility: 'Multi-tier rack capacity allocation (m³), zone segregation (Dry vs Cold Food), and live IoT sensor telemetry.',
        },
        {
          name: 'Logistics Dispatch & Fleet Workflow',
          responsibility: 'Reefer vehicle selection, pickup/delivery scheduling, live transit GPS tracking, and Digital Proof of Delivery (POD).',
        },
        {
          name: 'Automated Billing & Rental Engine',
          responsibility: 'Dynamic monthly storage contracts, late payment penalty calculation (5%/week), and invoice settlement.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Bridging Academic Rigor with Cloud-Native Enterprise Engineering',
      narrativeStory:
        'What originated as a rigorous academic Software Requirements Specification (SRS) during university studies was engineered into a fully operational, cloud-native enterprise reality. Every use case—from sub-zero IoT telemetry to digital proof of delivery—was realized through modern software craft, proving that foundational systems analysis and cutting-edge engineering tools create robust production software.',
      craftReflection:
        'Systems analysis is not an academic formality; it is the blueprint that guarantees complex physical supply chains—cold racks, reefer trucks, and financial penalties—operate with zero room for ambiguity.',
      pullQuote: {
        text: 'Transforming a 16-use-case university SRS into a live cloud-native platform is the ultimate proof that rigorous software analysis withstands real-world production demands.',
        attribution: 'Engineering Journal, WMS Nusantara',
      },
    },
    technical: {
      stack: [
        { id: 'tech-nextjs' as TechnologyId, name: 'Next.js 15 (React 19)', category: 'frontend', isCore: true },
        { id: 'tech-nestjs' as TechnologyId, name: 'NestJS 10.4', category: 'systems', isCore: true },
        { id: 'tech-postgres' as TechnologyId, name: 'Supabase PostgreSQL 16', category: 'systems', isCore: true },
        { id: 'tech-prisma' as TechnologyId, name: 'Prisma ORM v6', category: 'architecture', isCore: true },
        { id: 'tech-tanstack-query' as TechnologyId, name: 'TanStack React Query v5', category: 'frontend', isCore: false },
        { id: 'tech-typescript' as TechnologyId, name: 'TypeScript', category: 'architecture', isCore: true },
        { id: 'tech-docker' as TechnologyId, name: 'Docker & MinIO S3', category: 'systems', isCore: false },
        { id: 'tech-antigravity' as TechnologyId, name: 'Antigravity (AI-Assisted)', category: 'architecture', isCore: false },
      ],
      architecturalDecisions: [
        {
          decision: 'Supabase Transaction Pooler via PgBouncer (Port 6543)',
          rationale:
            'Configured dedicated transaction-level pooling with connection_limit=5 to prevent PostgreSQL connection exhaustion under bursty serverless invocations on Vercel.',
          tradeOff:
            'Prepared statements disabled at session level in favor of transaction-mode pooling resilience.',
        },
        {
          decision: 'Modular Clean Architecture with 10 Feature Domains in NestJS',
          rationale:
            'Isolated distinct business contexts (Auth, Users, Warehouse, Goods, Logistics, Billing, Telemetry, Notifications, Analytics, Health) for strict domain boundaries and high testability.',
          tradeOff:
            'Required structured DTO mapping and strict class-validator pipes across micro-boundaries.',
        },
        {
          decision: 'Instant Review Persona Login System',
          rationale:
            'Equipped login interface with one-click reviewer personas (Admin, Driver, Customer) for instant recruiter evaluation with pre-seeded demo telemetry.',
          tradeOff:
            'Maintained sandbox tenant integrity via automated seed resets.',
        },
      ],
      benchmarks: [
        { metric: 'SRS Compliance', value: '16/16', context: '100% functional use cases verified from academic blueprint to production' },
        { metric: 'Cloud Architecture', value: 'Edge + syd1', context: 'Vercel Serverless Functions paired with Supabase AWS Sydney' },
        { metric: 'Feature Domains', value: '10 Modules', context: 'NestJS Clean Architecture with Swagger OpenAPI v3 contract' },
      ],
      engineeringHighlight:
        'Transformed an authentic college SRS blueprint into a live production-grade WMS platform with 16/16 verified use cases, Next.js 15, NestJS 10, and Supabase PostgreSQL.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-wms-hero',
        src: '/assets/projects/wms/hero.webp',
        alt: 'Warehouse Management System interface and UML architecture',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 2.1: Role-based inventory, cold-chain telemetry, and fleet dispatch architecture.',
      },
    },
    links: [
      {
        type: 'repository',
        label: 'GitHub Repository',
        url: 'https://github.com/bagja-iskandar/Warehouse-Management-System',
        isExternal: true,
      },
      {
        type: 'live_demo',
        label: 'Live Application (Vercel)',
        url: 'https://wms-porto.vercel.app',
        isExternal: true,
      },
    ],
  },
  {
    id: 'proj-mgmt-dashboard' as ProjectId,
    slug: 'management-dashboard',
    title: 'Management Dashboard',
    subtitle: 'Scalable Nuxt 4 & Vue.js Task, Milestone & Analytics Engine',
    year: 2025,
    role: 'Frontend Developer',
    timeline: '2025',
    status: 'completed',
    displayOrder: 3,
    featured: true,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Developed a responsive management dashboard using Nuxt 4 and Vue.js with a focus on scalable architecture, persistent CRUD operations, and multi-parameter dynamic filtering.',
      problemStatement:
        'Productivity dashboards frequently suffer from sluggish reactivity, cumbersome filtering across multi-tier entities (projects, tasks, milestones), and state synchronization issues.',
      engineeringSolution:
        'Engineered modular component architecture utilizing Nuxt 4, Vue.js Composition API, and Nitro API services, accelerated with Antigravity AI orchestration; built dynamic filtering, status tracking, interactive modals, and persistent data storage integration.',
      impactMetrics: [
        'Comprehensive project, task, milestone, and activity tracking dashboard',
        'Sub-100ms multi-parameter filtering across extensive task datasets',
        'Refactored frontend codebase improving maintainability, consistency, and user experience',
      ],
      architecturePattern: 'Nuxt 4 + Nitro Server Engine with Composition Architecture',
      coreSubsystems: [
        {
          name: 'Task & Milestone Tracker',
          responsibility: 'Interactive status pipelines, milestone completion bars, and activity logs.',
        },
        {
          name: 'Dynamic Filtering Engine',
          responsibility: 'Multi-criteria real-time search, category sorting, and date range filters.',
        },
        {
          name: 'Nitro API Services',
          responsibility: 'Lightweight server endpoints orchestrating persistent CRUD transactions.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Clarity and Agility in Multi-Tier Project Coordination',
      narrativeStory:
        'An executive dashboard should eliminate noise, not create it. By combining Nuxt 4 with Vue composition patterns, project progress, team velocity, and milestone targets are surfaced with effortless speed.',
      craftReflection:
        'Performance in enterprise productivity tools is measured in the friction removed from daily decision-making.',
      pullQuote: {
        text: 'Simplicity in interface is the product of disciplined architectural hierarchy.',
        attribution: 'Dashboard Engineering Log',
      },
    },
    technical: {
      stack: [
        { id: 'tech-nuxt' as TechnologyId, name: 'Nuxt 4', category: 'frontend', isCore: true },
        { id: 'tech-vue' as TechnologyId, name: 'Vue.js', category: 'frontend', isCore: true },
        { id: 'tech-nitro' as TechnologyId, name: 'Nitro API Engine', category: 'systems', isCore: true },
        { id: 'tech-tailwind' as TechnologyId, name: 'Tailwind CSS', category: 'frontend', isCore: true },
        { id: 'tech-typescript' as TechnologyId, name: 'TypeScript', category: 'architecture', isCore: true },
        { id: 'tech-antigravity' as TechnologyId, name: 'Antigravity (AI-Assisted)', category: 'architecture', isCore: false },
      ],
      architecturalDecisions: [
        {
          decision: 'Nuxt 4 Composition API with Scalable Reusable Components',
          rationale:
            'Centralized task and milestone reactivity, eliminating prop-drilling across deeply nested modal and filter hierarchies.',
          tradeOff:
            'Required strict component conventions to prevent unmonitored state mutations.',
        },
        {
          decision: 'Nitro Server API Routes for Persistent CRUD Operations',
          rationale:
            'Integrated persistent CRUD operations with Nitro API endpoints, keeping data persistence tightly coupled with server-rendered routes.',
          tradeOff:
            'Required endpoint schema validation to ensure robust client-server synchronization.',
        },
      ],
      benchmarks: [
        { metric: 'Architecture', value: 'Nuxt 4 + Nitro', context: 'Vue 3 composition with Nitro unstorage KV file persistence (.data/kv/)' },
        { metric: 'Design System', value: 'Dark Polymorphism', context: 'Inter typography, Dark Navy #0B0F19, glass surfaces rgba(17, 24, 39, 0.75)' },
        { metric: 'Analytics', value: 'KPI & Velocity', context: 'Visual curve charts, status distribution donut gauge, and multi-filter hubs' },
      ],
      engineeringHighlight:
        'Engineered modular task/milestone management features with Nitro API services and persistent CRUD operations.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-dashboard-hero',
        src: '/assets/projects/dashboard/hero.webp',
        alt: 'Nuxt 4 Management Dashboard interface',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 3.1: Task, milestone, and analytics management interface.',
      },
    },
    links: [
      {
        type: 'repository',
        label: 'GitHub Repository',
        url: 'https://github.com/bagja-iskandar/Management',
        isExternal: true,
      },
    ],
  },
  {
    id: 'proj-diskominfo-cms' as ProjectId,
    slug: 'diskominfo-cms-refactoring',
    title: 'Diskominfo CMS Refactoring',
    subtitle: 'Municipal Content Management System Optimization & Code Modernization',
    year: 2025,
    role: 'Frontend Developer Intern',
    timeline: 'Aug 2025 – Sep 2025',
    status: 'completed',
    displayOrder: 4,
    featured: false,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Refactored and modernized frontend modules of an internal municipal Content Management System for Dinas Komunikasi dan Informatika Kota Cimahi, improving maintainability, UI responsiveness, and code readability.',
      problemStatement:
        'Legacy municipal CMS codebase exhibited tightly coupled UI templates, inconsistent design elements, layout rendering glitches, and undocumented frontend logic that slowed down departmental updates.',
      engineeringSolution:
        'Systematically audited and refactored frontend modules; resolved interface bugs; established modular UI structures; collaborated directly with government IT development team to implement code improvements.',
      impactMetrics: [
        'Modernized core internal CMS modules used by municipal government operators',
        'Eliminated UI display glitches and layout inconsistencies across administration panels',
        'Improved code readability and structural maintainability for long-term internal maintenance',
      ],
      architecturePattern: 'Modular UI Refactoring & Component Decomposition',
      coreSubsystems: [
        {
          name: 'CMS Module Audit & Restructuring',
          responsibility: 'Decomposing sprawling legacy views into focused, readable component units.',
        },
        {
          name: 'UI Optimization & Bug Remediation',
          responsibility: 'Identifying edge-case layout regressions and resolving user interface issues.',
        },
        {
          name: 'Team Code Standardization',
          responsibility: 'Collaborating with development team to maintain consistency across the application.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Engineering Discipline in Public Sector Digital Infrastructure',
      narrativeStory:
        'Refactoring government software is an exercise in stewardship. By untangling legacy modules and fixing visual inconsistencies, public administration systems become more reliable for the civil servants who rely on them every day.',
      craftReflection:
        'True software engineering is as much about improving existing code with patience and care as it is about building from scratch.',
      pullQuote: {
        text: 'Refactoring is respect for the next engineer who will maintain your code.',
        attribution: 'Internship Log, Diskominfo Kota Cimahi',
      },
    },
    technical: {
      stack: [
        { id: 'tech-js' as TechnologyId, name: 'JavaScript', category: 'architecture', isCore: true },
        { id: 'tech-html' as TechnologyId, name: 'HTML5 / CSS3', category: 'frontend', isCore: true },
        { id: 'tech-devtools' as TechnologyId, name: 'Browser DevTools', category: 'systems', isCore: true },
        { id: 'tech-git' as TechnologyId, name: 'Git Version Control', category: 'systems', isCore: true },
      ],
      architecturalDecisions: [
        {
          decision: 'Incremental Module-by-Module Refactoring Strategy',
          rationale:
            'Prevented regressions in ongoing municipal operations while systematically modernizing legacy code.',
          tradeOff:
            'Required maintaining compatibility bridges during the transitional period.',
        },
        {
          decision: 'Standardized UI Layout and Styling Conventions',
          rationale:
            'Ensured that forms, data tables, and modal dialogs behaved uniformly across all administrative modules.',
          tradeOff:
            'Required extensive testing across disparate legacy departmental views.',
        },
      ],
      benchmarks: [
        { metric: 'Code Duplication Reduction', value: '35%', context: 'Consolidated repeated template blocks into shared components' },
        { metric: 'Bug Resolution Rate', value: '100%', context: 'All identified frontend interface issues resolved' },
      ],
      engineeringHighlight:
        'Refactored frontend modules of internal municipal CMS to improve code maintainability, readability, and overall structure.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-diskominfo-hero',
        src: '/assets/projects/diskominfo/hero.webp',
        alt: 'CMS Refactoring for Diskominfo Kota Cimahi',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 4.1: Municipal CMS interface refactoring and layout optimization.',
      },
    },
    links: [
      {
        type: 'case_study',
        label: 'Internship Profile',
        url: 'https://linkedin.com/in/bagja-iskandar-jamil',
        isExternal: true,
      },
    ],
  },
  {
    id: 'proj-bci-research' as ProjectId,
    slug: 'bci-eeg-gnn-mamba',
    title: 'Brain-Computer Interface of Motor Imagery EEG Signal Using Hybrid GNN-Mamba Networks',
    subtitle: 'IEEE Publication & Peer-Reviewed Research — 4-Class BCI Competition IV-2a (82.05% Accuracy)',
    year: 2025,
    role: 'First Author & Lead Researcher (with Prof. Esmeralda Contessa Djamal)',
    timeline: '2025',
    status: 'completed',
    displayOrder: 2,
    featured: true,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Engineered and evaluated a hybrid deep learning model combining Wavelet Packet Transform (WPT), Graph Neural Networks (GNN), and Mamba State Space Models (SSM) for 4-class motor imagery EEG classification on the BCI Competition IV-2a dataset, achieving 82.05% average accuracy and 84.50% F1-score.',
      problemStatement:
        'Translating motor imagery neural intentions (right hand, left hand, feet, tongue) from multi-channel EEG requires capturing non-Euclidean spatial electrode correlations and long-range temporal sequences. Traditional CNNs struggle with irregular scalp geometries, while self-attention Transformers exhibit prohibitive quadratic O(N^2) complexity on continuous EEG streams.',
      engineeringSolution:
        'Formulated a hybrid GNN-Mamba pipeline: isolated Mu (8–13 Hz) and Beta (14–30 Hz) rhythms using Daubechies-4 (db4) Wavelet Packet Transform and CWT; aggregated spatial topologies across 22 electrode channels using a 2-layer Graph Convolutional Network (GCN) with k-NN (k=20); and modeled long-term temporal dependencies with linear-time O(N) selective state space Mamba blocks and SiLU gating.',
      impactMetrics: [
        '82.05% Average Accuracy & 84.50% F1-Score across all 9 subjects on BCI Competition IV-2a dataset',
        'Outperformed leading baselines: CNN-Mamba (80.59%), Conformer (78.66%), TBTSCT (77.39%), and FBCNet (76.20%)',
        'High cross-subject generalization stability within a narrow accuracy band (76.09% to 89.13%, peaking at S1: 89.13%)',
        'First author on peer-reviewed academic paper published at IEEE ICIC 2025 with Universitas Jenderal Achmad Yani',
      ],
      architecturePattern: 'Hybrid Graph Convolutional Network (GCN) & Selective State Space Model (Mamba)',
      coreSubsystems: [
        {
          name: 'WPT Time-Frequency Feature Extractor',
          responsibility: 'Decomposes 22-channel EEG signals into Mu and Beta frequency bands using Daubechies-4 (db4) wavelet and CWT descriptors.',
        },
        {
          name: '2-Layer Spatial Graph Convolution (GCN)',
          responsibility: 'Aggregates non-Euclidean electrode topology into trial feature vectors via k-NN graph construction (k=20).',
        },
        {
          name: 'Mamba Selective State Space (SSM) Core',
          responsibility: 'Captures continuous long-range temporal sequences with linear O(N) complexity, SiLU gating, and dropout (0.3).',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Decoding Neural Intent: The Intersection of Computational Graphs and State Space Sequences',
      narrativeStory:
        'When an individual imagines moving a limb, distinct microvolt neural oscillations emerge in the Mu and Beta frequency bands across the sensorimotor cortex. By uniting non-Euclidean graph message passing with the linear temporal dynamics of selective state space models, neural intentions are decoded into discrete BCI control signals with unprecedented cross-subject stability.',
      craftReflection:
        'Rigorous mathematical modeling directly informs scalable software engineering: conquering high-dimensional non-Euclidean data and linear temporal scaling builds the intuition necessary to architect complex, high-throughput production systems.',
      pullQuote: {
        text: 'GNN models the spatial relationships between EEG channels in the form of a graph, while Mamba learns temporal patterns efficiently through a State Space Model approach, achieving 82.05% accuracy.',
        attribution: 'IEEE ICIC 2025 Paper, Bagja Iskandar Jamil et al.',
      },
    },
    technical: {
      stack: [
        { id: 'tech-python' as TechnologyId, name: 'Python 3', category: 'systems', isCore: true },
        { id: 'tech-pytorch' as TechnologyId, name: 'PyTorch', category: 'architecture', isCore: true },
        { id: 'tech-mamba' as TechnologyId, name: 'Mamba State Space Models (SSM)', category: 'systems', isCore: true },
        { id: 'tech-gnn' as TechnologyId, name: 'Graph Convolutional Networks (GCN)', category: 'architecture', isCore: true },
        { id: 'tech-wavelet' as TechnologyId, name: 'Wavelet Packet Transform (db4)', category: 'systems', isCore: true },
        { id: 'tech-mne' as TechnologyId, name: 'MNE-Python (EEG Processing)', category: 'systems', isCore: false },
        { id: 'tech-lda' as TechnologyId, name: 'Linear Discriminant Analysis (LDA)', category: 'systems', isCore: false },
      ],
      architecturalDecisions: [
        {
          decision: 'Hybrid GCN-Mamba over Transformers and Pure CNNs',
          rationale:
            'GCN captures irregular multi-channel electrode topologies without grid distortions, while Mamba eliminates O(N^2) memory bottlenecks during continuous EEG sequence modeling.',
          tradeOff:
            'Required custom discretization pipelines and specialized parameter tuning for SSM latent state updates.',
        },
        {
          decision: 'Daubechies-4 (db4) Wavelet Packet Transform with LDA Dimensionality Reduction',
          rationale:
            'Isolates discriminatory Mu (8-13 Hz) and Beta (14-30 Hz) rhythm variations while LDA reduces feature vectors to 3 principal components before k-NN graph construction.',
          tradeOff:
            'Added preliminary time-frequency decomposition step before training pipeline.',
        },
        {
          decision: 'Inter-Trial k-NN Graph Representation (k=20) with Early Stopping (patience=50)',
          rationale:
            'Represents trial interconnectedness and regularizes training to prevent overfitting across heterogeneous participant datasets.',
          tradeOff:
            'Graph adjacency matrix construction scales with batch sample size.',
        },
      ],
      benchmarks: [
        { metric: 'Classification Accuracy', value: '82.05%', context: 'Average accuracy across 9 subjects on 4-class BCI IV-2a' },
        { metric: 'Balanced F1-Score', value: '84.50%', context: '84.40% Precision, 84.60% Recall across all 4 movement classes' },
        { metric: 'Baseline Outperformance', value: '+1.46% – +5.85%', context: 'Surpassed CNN-Mamba (80.59%), Conformer (78.66%), TBTSCT (77.39%)' },
        { metric: 'Cross-Subject Stability', value: '76.09% – 89.13%', context: 'Narrow variance vs Conformer (52.08% – 93.40%), peak S1: 89.13%' },
      ],
      engineeringHighlight:
        'First author on IEEE peer-reviewed paper achieving 82.05% accuracy on 4-class BCI Motor Imagery EEG using hybrid GNN-Mamba.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-bci-hero',
        src: '/assets/projects/bci/hero.webp',
        alt: 'GNN-Mamba EEG signal processing topology',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 1: Hybrid GNN-Mamba neural network architecture for motor imagery EEG classification.',
      },
    },
    links: [
      {
        type: 'specification',
        label: 'IEEE Xplore (#11309504)',
        url: 'https://ieeexplore.ieee.org/document/11309504',
        isExternal: true,
      },
      {
        type: 'repository',
        label: 'GitHub Source Code',
        url: 'https://github.com/bagja-iskandar/eeg-motor-imagery-gnn-mamba',
        isExternal: true,
      },
    ],
  },
  {
    id: 'proj-mobile-image-editor' as ProjectId,
    slug: 'mobile-image-editing-app',
    title: 'Aplikasi Histogram',
    subtitle: 'Native Android Digital Image Processing, RGB Channel Extraction & Histogram Visualization',
    year: 2024,
    role: 'Android Developer (Digital Image Processing)',
    timeline: '2024',
    status: 'completed',
    displayOrder: 6,
    featured: false,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Developed a native Android application using Kotlin, Android SDK 34, and AppCompat for digital image processing, implementing RGB color channel extraction, real-time histogram visualization, and canvas-level bitmap manipulation.',
      problemStatement:
        'Extracting multi-channel RGB pixel data and computing real-time frequency histograms across high-resolution image arrays demands intensive pixel traversals that can strain mobile memory and block the main UI thread.',
      engineeringSolution:
        'Engineered an algorithmic image processing pipeline in Kotlin and Android Studio; implemented discrete RGB channel extraction (Red, Green, Blue image views), statistical pixel intensity distribution histograms, scale zoom controls, and vector saving.',
      impactMetrics: [
        'Algorithmic RGB channel extraction with real-time component visualization in discrete image views',
        'Pixel intensity histogram computation and graphical rendering across tonal ranges',
        'Applied fundamental image processing algorithms using native Kotlin and Android Studio',
      ],
      architecturePattern: 'Native Android Digital Image Processing with Canvas & Bitmap Manipulation',
      coreSubsystems: [
        {
          name: 'RGB Channel Decomposition Engine',
          responsibility: 'Extracts and isolates discrete red, green, and blue pixel matrices from buffered bitmaps.',
        },
        {
          name: 'Histogram Computation & Renderer',
          responsibility: 'Calculates tonal distribution frequencies and renders visual histogram curves on custom Canvas.',
        },
        {
          name: 'Bitmap Loading & Transform Pipeline',
          responsibility: 'Safely decodes, scales (zoom in/out), and saves vector image resources within safe device heap limits.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Deconstructing Photographic Arrays into Discrete Spectral Channels',
      narrativeStory:
        'Every digital image is fundamentally a structured grid of photon counts across red, green, and blue matrices. Isolating each channel and mapping their statistical distribution transforms abstract color theory into immediate visual feedback.',
      craftReflection:
        'Writing low-level pixel manipulation in Kotlin and Android Studio instills a foundational appreciation for array traversals, memory footprints, and computational efficiency.',
      pullQuote: {
        text: 'To deconstruct an image into its raw color histograms is to understand the mathematical anatomy of light.',
        attribution: 'Digital Image Processing Laboratory Notes',
      },
    },
    technical: {
      stack: [
        { id: 'tech-kotlin' as TechnologyId, name: 'Kotlin (Android SDK 34)', category: 'systems', isCore: true },
        { id: 'tech-android' as TechnologyId, name: 'Android Studio / Jetpack', category: 'frontend', isCore: true },
        { id: 'tech-canvas' as TechnologyId, name: 'Bitmap Matrix Processing & Canvas', category: 'graphics_shader', isCore: true },
      ],
      architecturalDecisions: [
        {
          decision: 'Decoupled Background Threading for Pixel Array Traversals',
          rationale:
            'Separated histogram calculation and channel extraction from the Android UI thread, preventing frame drops during intensive pixel loops.',
          tradeOff:
            'Required thread synchronization handlers to update UI Canvas views upon computation completion.',
        },
        {
          decision: 'Direct Bitmap Pixel Access with Memory Subsampling',
          rationale:
            'Employed inSampleSize pre-decoding to ensure large photo captures fit within safe device heap limits.',
          tradeOff:
            'Trade-off between maximum pixel fidelity and mobile runtime allocation bounds.',
        },
      ],
      benchmarks: [
        { metric: 'Target Platform', value: 'Android SDK 34', context: 'Native Android application in Kotlin (Min SDK 26)' },
        { metric: 'Core Features', value: 'RGB & Histogram', context: 'Channel separation, intensity histogram, zoom scale, and vector save' },
      ],
      engineeringHighlight:
        'Developed a native Android application for digital image processing, implementing RGB channel extraction and histogram visualization in Kotlin.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-image-editor-hero',
        src: '/assets/projects/image-editor/hero.webp',
        alt: 'Native Android Image Editing Application',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 6.1: Native Android image editing interface and bitmap transform pipeline.',
      },
    },
    links: [
      {
        type: 'repository',
        label: 'GitHub Repository',
        url: 'https://github.com/bagja-iskandar/Aplkasi-Histogram',
        isExternal: true,
      },
    ],
  },
] as const;

export const PROJECTS_DATA = SELECTED_PROJECTS;
