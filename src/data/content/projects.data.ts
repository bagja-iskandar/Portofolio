/**
 * @file projects.data.ts
 * @description Canonical Projects Data Source for Bagja Iskandar Jamil
 * 100% Authentic Data derived strictly from Official Resume (Zero Overclaiming).
 * Single Source of Truth for Technical Projects, Live Sandboxes, and Architectural Case Studies.
 */

import type { Project, ProjectId, TechnologyId } from '../../types/duality';

export const SELECTED_PROJECTS: ReadonlyArray<Project> = [
  {
    id: 'proj-bci-research' as ProjectId,
    slug: 'bci-gnn-mamba-research',
    title: 'Brain–Computer Interface: Hybrid GNN-Mamba',
    subtitle: 'Peer-Reviewed Research on 4-Class Motor Imagery EEG Signal Classification',
    year: 2025,
    role: 'First Author & Lead Researcher',
    timeline: '2024 – 2025',
    status: 'completed',
    releaseStatus: 'Published in IEEE Xplore (#11309504)',
    displayOrder: 1,
    featured: true,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Built and evaluated a wavelet + GNN + Mamba classifier for 4-class motor-imagery EEG on the BCI Competition IV-2a benchmark (9 subjects), achieving 82.05% mean accuracy and 84.50% F1-score under a subject-dependent evaluation protocol.',
      problemStatement:
        'Motor imagery EEG signals exhibit low signal-to-noise ratios and complex non-Euclidean spatial electrode correlations that challenge standard CNNs, while self-attention Transformers impose quadratic O(N²) computational complexity on continuous EEG streams.',
      engineeringSolution:
        'Engineered a hybrid Daubechies-4 (db4) Wavelet Packet Transform and Continuous Wavelet pipeline to isolate Mu and Beta frequency bands, modeled 22-channel spatial scalp topology using a 2-layer Graph Convolutional Network (GCN) with k-NN (k=20), and captured long-range temporal dependencies using selective state space Mamba blocks with linear-time O(N) complexity.',
      impactMetrics: [
        '82.05% mean accuracy and 84.50% balanced F1-score across 9 subjects on BCI Competition IV-2a benchmark',
        '+1.5 pts over the strongest baseline (CNN-Mamba 80.59%), surpassing Conformer (78.66%), TBT-SCT (77.39%), and FBCNet (76.20%)',
        'Stable per-subject performance within a narrow accuracy band of 76.09% to 89.13%',
        'First author on peer-reviewed academic paper published at IEEE ICIC 2025 and indexed in IEEE Xplore (#11309504)',
      ],
      architecturePattern: 'Hybrid Graph Convolutional Network (GCN) & Selective State Space Model (Mamba)',
      coreSubsystems: [
        {
          name: 'Wavelet Time-Frequency Decomposer',
          responsibility:
            'Isolates discriminative Mu (8–13 Hz) and Beta (14–30 Hz) sensorimotor rhythm dynamics via Daubechies-4 (db4) WPT.',
        },
        {
          name: 'Spatial Graph Convolution (GCN)',
          responsibility:
            'Aggregates non-Euclidean electrode correlations across 22 scalp channels via dynamic k-NN graph construction.',
        },
        {
          name: 'Mamba State Space Model (SSM)',
          responsibility:
            'Models continuous temporal EEG sequences with linear O(N) memory complexity, SiLU gating, and dropout regularization.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Decoding Neural Intention: Computational Graphs & State Space Sequences',
      narrativeStory:
        'When an individual imagines limb movement, distinct microvolt rhythms emerge across the sensorimotor cortex. By uniting non-Euclidean graph message passing with the linear temporal dynamics of selective state space models, motor intentions are decoded with high individual stability.',
      craftReflection:
        'Rigorous mathematical modeling directly informs resilient systems engineering: mastering non-Euclidean topologies and linear-time sequence scaling builds the foundational intuition required to build performant distributed software.',
      pullQuote: {
        text: 'Combining spatial graph convolution with linear-time selective state space models decodes motor imagery EEG signals with an average accuracy of 82.05%.',
        attribution: 'IEEE ICIC 2025 Conference Paper, Bagja Iskandar Jamil et al.',
      },
    },
    technical: {
      stack: [
        { id: 'tech-python' as TechnologyId, name: 'Python 3', category: 'systems', isCore: true },
        { id: 'tech-pytorch' as TechnologyId, name: 'PyTorch', category: 'architecture', isCore: true },
        { id: 'tech-mamba' as TechnologyId, name: 'Mamba SSM', category: 'systems', isCore: true },
        { id: 'tech-gnn' as TechnologyId, name: 'Graph Convolution (GCN)', category: 'architecture', isCore: true },
        { id: 'tech-wavelet' as TechnologyId, name: 'Wavelet Packet Transform', category: 'systems', isCore: true },
        { id: 'tech-mne' as TechnologyId, name: 'MNE-Python', category: 'systems', isCore: false },
      ],
      architecturalDecisions: [
        {
          decision: 'Hybrid GCN-Mamba over Transformers and Pure CNNs',
          rationale:
            'GCN handles irregular scalp electrode geometries without grid warping, while Mamba eliminates O(N²) memory bottlenecks during continuous EEG sequence classification.',
          tradeOff:
            'Required custom discretization routines and precise hyperparameter tuning for SSM latent state transitions.',
        },
        {
          decision: 'Subject-Dependent Evaluation Protocol on 9 BCI IV-2a Subjects',
          rationale:
            'Ensures rigorous benchmark compliance and fair head-to-head comparison with published literature baselines.',
          tradeOff:
            'Requires per-subject model weight optimization rather than a single universal zero-shot model.',
        },
      ],
      benchmarks: [
        { metric: 'Mean Accuracy', value: '82.05%', context: 'Subject-dependent evaluation on 9 BCI IV-2a subjects' },
        { metric: 'Balanced F1-Score', value: '84.50%', context: 'Calculated across all 4 motor imagery classes' },
        { metric: 'Baseline Outperformance', value: '+1.46% to +5.85%', context: 'Surpassed CNN-Mamba, Conformer, TBT-SCT, and FBCNet' },
        { metric: 'Per-Subject Range', value: '76.09% – 89.13%', context: 'Consistent performance stability across all individual participants' },
      ],
      engineeringHighlight:
        'First author on peer-reviewed IEEE paper achieving 82.05% accuracy on 4-class motor imagery EEG using hybrid GNN-Mamba networks.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-bci-hero',
        src: '/assets/projects/bci/hero.webp',
        alt: 'Hybrid GNN-Mamba neural architecture for EEG signal decoding',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 1: Hybrid Wavelet-GNN-Mamba pipeline for 4-class motor imagery EEG signal decoding.',
      },
    },
    links: [
      {
        type: 'case_study',
        label: 'IEEE Xplore Paper (#11309504)',
        url: 'https://ieeexplore.ieee.org/document/11309504',
        isExternal: true,
      },
      {
        type: 'repository',
        label: 'Research Repository (GitHub)',
        url: 'https://github.com/bagja-iskandar',
        isExternal: true,
      },
    ],
    caseStudy: {
      challenge:
        'Motor-imagery brain-computer interfaces suffer from extreme inter-trial variability and scalp geometry non-linearities. Conventional convolutional architectures fail to exploit spatial electrode graphs, whereas Transformer models suffer from prohibitive O(N²) quadratic attention memory growth.',
      approach:
        'Engineered a Daubechies-4 wavelet preprocessing step to isolate Mu (8–13 Hz) and Beta (14–30 Hz) frequency bands, constructed a 22-channel dynamic k-NN graph with a 2-layer Graph Convolutional Network, and modeled long-term temporal dependencies using linear-time selective state space Mamba blocks.',
      result:
        'Achieved 82.05% mean accuracy and 84.50% F1-score across 9 subjects on the BCI Competition IV-2a dataset (+1.5 pts over CNN-Mamba 80.59%, above Conformer 78.66% and FBCNet 76.20%), with a narrow per-subject accuracy range of 76.09%–89.13%. Published at IEEE ICIC 2025.',
      tradeOffs:
        'Graph adjacency matrix formulation requires additional preprocessing time per trial, and state space models require careful parameter discretization to maintain continuous numerical stability.',
    },
  },
  {
    id: 'proj-wms' as ProjectId,
    slug: 'warehouse-management-system',
    title: 'WMS Nusantara',
    subtitle: 'Cold Storage & Warehouse Logistics Management Platform (16/16 SRS Use Cases, 10 Modules, 56 Endpoints)',
    year: 2026,
    role: 'Full-Stack Developer (Coursework SRS Prototype)',
    timeline: '2025 – 2026',
    status: 'completed',
    releaseStatus: 'Coursework SRS Prototype / Live Demo',
    displayOrder: 2,
    featured: true,
    canvasEnvironment: 'ink',
    liveSandboxUrl: 'https://wms-porto.vercel.app',
    structureRead: {
      executiveSummary:
        'Co-authored the Software Requirements Specification (SRS) with classmates as coursework, then implemented it as an independent personal project: a full-stack monorepo featuring 10 backend modules, 56 REST endpoints (Swagger), 18 Prisma tables, 3 RBAC roles, simulated IoT telemetry, and 214 automated tests (100% passing).',
      problemStatement:
        'Cold-chain warehouse logistics require strict sub-zero temperature compliance (min. -18°C), dynamic rack volume allocation (m³), automated penalty enforcement for delayed rental payments (5%/week), and role-based operational coordination across administrators, warehouse drivers, and corporate tenants.',
      engineeringSolution:
        'Constructed a full-stack monorepo pairing Next.js 15 App Router with a 10-module NestJS Clean Architecture backend, Supabase PostgreSQL, Prisma ORM, and Swagger API documentation; implemented 3 distinct RBAC personas, simulated IoT temperature sensor streams with threshold alerting, dynamic rack m³ allocation, cold chain truck matching (-18°C), and validated all system business rules with 214 automated test suites.',
      impactMetrics: [
        '16/16 SRS use cases fully implemented and validated end-to-end',
        '10 backend NestJS modules exposing 56 REST endpoints with Swagger OpenAPI documentation',
        '18 relational database tables managed via Prisma ORM on Supabase PostgreSQL',
        '3 RBAC personas (Warehouse Admin, Fleet Driver, Corporate Tenant) with dedicated access boundaries',
        '214 automated tests (100% passing) covering boundary conditions, business rules, and fuzzing cases',
      ],
      architecturePattern: 'Modular Clean Architecture (NestJS 10) & Serverless Monorepo (Next.js 15 App Router)',
      coreSubsystems: [
        {
          name: 'Storage & Rack Allocation Engine',
          responsibility:
            'Calculates volume-based (m³) rack occupancy, zone segregation, and simulated sub-zero IoT telemetry (-18°C).',
        },
        {
          name: 'Rental Contract & Automated Billing',
          responsibility:
            'Calculates dynamic monthly storage rentals (m³ volume), late-payment penalties (5%/week), and invoice statuses.',
        },
        {
          name: 'Fleet Logistics & Dispatch Matching',
          responsibility:
            'Matches reefer vehicles with cold-chain cargo specifications (min. -18°C) and verifies digital Proof of Delivery.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Bridging Systems Analysis with Full-Stack Monorepo Engineering',
      narrativeStory:
        'Originating as a collaborative university Software Requirements Specification (SRS) during computer science coursework, WMS Nusantara was built into an independent, fully functioning full-stack prototype. From sub-zero telemetry simulation to dynamic rack allocation, the project demonstrates how thorough systems analysis directly enables clean software architecture.',
      craftReflection:
        'Systems analysis is not an academic formality; it is the definitive blueprint that guarantees physical domain constraints—cold storage racks, reefer trucks, and financial penalty calculations—operate with zero ambiguity.',
      pullQuote: {
        text: 'Transforming a university SRS into a functioning monorepo with 56 REST endpoints and 214 automated tests proves that disciplined systems analysis withstands technical reality.',
        attribution: 'Engineering Log, WMS Nusantara',
      },
    },
    technical: {
      stack: [
        { id: 'tech-nextjs' as TechnologyId, name: 'Next.js 15', category: 'frontend', isCore: true },
        { id: 'tech-nestjs' as TechnologyId, name: 'NestJS 10', category: 'architecture', isCore: true },
        { id: 'tech-typescript' as TechnologyId, name: 'TypeScript', category: 'architecture', isCore: true },
        { id: 'tech-postgresql' as TechnologyId, name: 'PostgreSQL (Supabase)', category: 'systems', isCore: true },
        { id: 'tech-prisma' as TechnologyId, name: 'Prisma ORM', category: 'systems', isCore: true },
        { id: 'tech-swagger' as TechnologyId, name: 'Swagger / OpenAPI', category: 'systems', isCore: true },
        { id: 'tech-tailwind' as TechnologyId, name: 'Tailwind CSS', category: 'frontend', isCore: true },
      ],
      assisted: ['Google Antigravity'],
      architecturalDecisions: [
        {
          decision: 'Decoupled NestJS REST Backend with Next.js 15 App Router Frontend',
          rationale:
            'Maintained clear architectural separation between backend transactional business rules and responsive client presentation views.',
          tradeOff:
            'Required maintaining Swagger API contracts and CORS configuration between client and API gateway.',
        },
        {
          decision: 'Strict Schema Constraints with Prisma ORM and Atomic Database Transactions',
          rationale:
            'Prevents inventory double-booking and guarantees that volume allocation and payment records commit atomically.',
          tradeOff:
            'Schema migrations require careful ordering during local prototype updates.',
        },
      ],
      benchmarks: [
        { metric: 'Automated Test Coverage', value: '214 Tests', context: '100% passing across unit, service, and boundary scenarios' },
        { metric: 'API Breadth', value: '56 Endpoints', context: 'Organized into 10 cohesive NestJS domain modules' },
        { metric: 'Relational Schema', value: '18 Tables', context: 'Prisma relational data models with foreign key constraints' },
        { metric: 'SRS Compliance', value: '16/16 Use Cases', context: 'Complete functional implementation of original academic specification' },
      ],
      engineeringHighlight:
        'Engineered university SRS coursework into a fully functioning cold-chain WMS prototype with 56 REST endpoints, 18 tables, and 214 automated tests.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-wms-hero',
        src: '/assets/projects/wms/hero.webp',
        alt: 'WMS Nusantara cold-chain management dashboard and telemetry',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 2: WMS Nusantara dashboard featuring warehouse rack allocation and simulated temperature telemetry.',
      },
    },
    links: [
      {
        type: 'live_demo',
        label: 'Live Application Demo (Vercel)',
        url: 'https://wms-porto.vercel.app',
        isExternal: true,
      },
      {
        type: 'repository',
        label: 'Full-Stack Monorepo (GitHub)',
        url: 'https://github.com/bagja-iskandar/wms-nusantara',
        isExternal: true,
      },
    ],
    caseStudy: {
      challenge:
        'Translating a 16-use-case university Software Requirements Specification (SRS) into working code required modeling multi-tier cold-chain constraints: dynamic volume-based rack capacity (m³), sub-zero cold chain truck matching (-18°C), and automated billing rules with late-payment penalties (5%/week).',
      approach:
        'Constructed a full-stack monorepo pairing Next.js 15 App Router with a modular 10-module NestJS Clean Architecture backend. Designed 18 relational Prisma models on Supabase PostgreSQL with PgBouncer pooling, exposed 56 REST endpoints with Swagger OpenAPI, and enforced 3 distinct RBAC personas (Admin, Driver, Tenant).',
      result:
        'Delivered 100% of the 16 SRS use cases, verified behavior through 214 automated test suites (100% passing) including boundary and fuzzing cases, and deployed an active cloud prototype with simulated real-time IoT sensor telemetry.',
      tradeOffs:
        'Chose simulated IoT streaming over physical microcontrollers to keep the prototype reproducible and accessible on cloud infrastructure without requiring on-premise hardware sensors.',
    },
  },
  {
    id: 'proj-swap-on' as ProjectId,
    slug: 'swap-on-remittance',
    title: 'Swap-On',
    subtitle: 'Cross-Border Money-Transfer Application (~20 Screens Delivered)',
    year: 2026,
    role: 'Frontend Developer (Freelance)',
    timeline: '04/2026 – 07/2026',
    status: 'completed',
    releaseStatus: 'Pre-release / Client NDA',
    displayOrder: 3,
    featured: true,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Delivered approximately 20 screens (authentication, multi-currency dashboard, send money, top-up, recipient directory, transaction history, admin review) as the frontend developer alongside backend and QA engineers, using AI-assisted development workflows.',
      problemStatement:
        'Cross-border financial remittances between Indonesia and Japan require clear multi-currency feedback, transparent fee disclosures, and strict input validation on foreign recipient bank accounts to eliminate transfer errors.',
      engineeringSolution:
        'Organized the UI into reusable atomic components (~85% of the interface)—such as CurrencyInputField, RecipientCard, FeeBreakdownSummary, and StatusBadge—using Vue.js, Nuxt, and Tailwind CSS; integrated backend REST APIs with AI-assisted acceleration.',
      impactMetrics: [
        'Delivered ~20 complete application screens covering full user transfer journeys and administrator reviews',
        'Structured ~85% of the interface into reusable atomic components for maintainability and consistency',
        'Built real-time FX rate calculation views and multi-currency wallet management screens',
        'Collaborated closely with backend and QA engineers to ensure validation alignment and responsive design',
      ],
      architecturePattern: 'Atomic Component Architecture with Reusable State Modules (Nuxt / Vue.js)',
      coreSubsystems: [
        {
          name: 'Atomic Input & Card Components',
          responsibility:
            'Reusable CurrencyInputField, RecipientCard, FeeBreakdownSummary, and StatusBadge components (~85% UI coverage).',
        },
        {
          name: 'Wallet & Exchange Calculations',
          responsibility:
            'Handles multi-currency balance displays, exchange rate lookups, and fee transparency breakdowns.',
        },
        {
          name: 'Recipient Directory & Validation',
          responsibility:
            'Manages international beneficiary accounts with strict client-side validation to prevent failed transfers.',
        },
      ],
    },
    expressionRead: {
      editorialHeadline: 'Clarity & Trust in Cross-Border Remittance Interfaces',
      narrativeStory:
        'Cross-border financial transactions demand complete user certainty. By organizing the Swap-On interface into disciplined atomic components, every input, fee disclosure, and confirmation state communicates clarity and operational trust across sovereign currencies.',
      craftReflection:
        'In financial frontend development, component consistency is not merely aesthetic—it is the direct foundation of transactional security and user confidence.',
      pullQuote: {
        text: 'Financial software must be unambiguous; every number, status badge, and validation state must communicate total certainty.',
        attribution: 'Frontend Engineering Journal, Swap-On',
      },
    },
    technical: {
      stack: [
        { id: 'tech-vue' as TechnologyId, name: 'Vue.js', category: 'frontend', isCore: true },
        { id: 'tech-nuxt' as TechnologyId, name: 'Nuxt.js', category: 'frontend', isCore: true },
        { id: 'tech-typescript' as TechnologyId, name: 'TypeScript', category: 'architecture', isCore: true },
        { id: 'tech-tailwind' as TechnologyId, name: 'Tailwind CSS', category: 'frontend', isCore: true },
        { id: 'tech-pinia' as TechnologyId, name: 'Pinia', category: 'systems', isCore: true },
        { id: 'tech-rest' as TechnologyId, name: 'REST APIs', category: 'systems', isCore: true },
      ],
      assisted: ['OpenAI Codex'],
      architecturalDecisions: [
        {
          decision: 'Atomic Component Decomposition (~85% UI Coverage)',
          rationale:
            'Extracted repeated input fields, recipient cards, and status badges into standalone components to accelerate feature delivery and ensure visual consistency across all 20 screens.',
          tradeOff:
            'Required strict prop contract definitions and synchronized event handling across complex modal workflows.',
        },
        {
          decision: 'Client-Side Real-Time Currency and Fee Calculation',
          rationale:
            'Provided instant tactile user feedback during money-transfer amount entry before submitting payload to backend payment endpoints.',
          tradeOff:
            'Required client-side exchange rate caching with explicit expiration timestamps.',
        },
      ],
      benchmarks: [
        { metric: 'Screen Scope', value: '~20 Screens', context: 'Full remittance user journeys from auth to admin review' },
        { metric: 'Component Reusability', value: '~85% UI', context: 'Atomic component coverage across entire application interface' },
        { metric: 'Currency Pair', value: 'IDR ↔ JPY', context: 'International remittance between Indonesia and Japan' },
      ],
      engineeringHighlight:
        'Delivered ~20 screens of a cross-border money-transfer application using reusable atomic components and AI-assisted engineering workflows.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-swap-on-hero',
        src: '/assets/projects/swap-on/hero.webp',
        alt: 'Swap-On cross-border remittance interface and wallet flow',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 3: Swap-On remittance dashboard featuring multi-currency wallet and recipient transfer workflows.',
      },
    },
    links: [
      {
        type: 'case_study',
        label: 'Client Project Documentation (NDA)',
        url: '#',
        isExternal: false,
      },
    ],
    caseStudy: {
      challenge:
        'Designing and implementing 20 screens for cross-border financial remittance between Indonesia and Japan required preventing user errors in foreign bank account entry, providing real-time FX rate conversions, and ensuring transparent fee breakdowns.',
      approach:
        'Decomposed the interface into reusable atomic components (~85% UI coverage)—including CurrencyInputField, RecipientCard, FeeBreakdownSummary, and StatusBadge—using Vue.js, Nuxt, and Tailwind CSS. Integrated client state with backend REST APIs alongside backend and QA engineers, accelerated by OpenAI Codex.',
      result:
        'Successfully delivered ~20 screens covering authentication, multi-currency dashboard, send money, top-up, recipient directory, transaction history, and admin review, establishing a consistent and maintainable design token system.',
      tradeOffs:
        'Operated under client non-disclosure agreement (NDA), precluding open-source code publication; code craft is demonstrated through component architecture specifications and UI verification.',
    },
  },
  {
    id: 'proj-mgmt-dashboard' as ProjectId,
    slug: 'engineering-management-dashboard',
    title: 'Engineering Management Dashboard',
    subtitle: 'Personal Tool Consolidating GitHub Pipelines & Security Alerts',
    year: 2025,
    role: 'Developer (Personal Tool)',
    timeline: '2025',
    status: 'completed',
    releaseStatus: 'Personal Tool / Open Source',
    displayOrder: 4,
    featured: false,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Designed a single-pane dashboard that consolidates 4 live pipelines across GitHub repositories: CI/CD workflows, security alerts, and package releases, with an estimated saving of ~3–5 hours per week of manual context switching.',
      problemStatement:
        'Monitoring continuous integration status, vulnerability alerts, and release tags across multiple software repositories requires frequent context switching and manual browser navigation.',
      engineeringSolution:
        'Engineered a centralized dashboard integrating GitHub REST APIs, automated pipeline aggregation, and real-time status indicators using Nuxt 4 and Vue.js.',
      impactMetrics: [
        'Consolidates 4 live pipelines across multiple GitHub repositories into a single pane of glass',
        'Estimated saving of ~3–5 hours per week of manual context switching for developer workflows',
        'Real-time status indicators for CI/CD builds, dependabot security alerts, and version releases',
      ],
    },
    expressionRead: {
      editorialHeadline: 'Efficiency & Clarity in Multi-Repository Pipeline Monitoring',
      narrativeStory:
        'Developer tooling should eliminate friction. By uniting repository workflows into a single dashboard, operational status is monitored with effortless clarity.',
      craftReflection:
        'The best developer tools are born from solving one’s own workflow frictions with disciplined software engineering.',
    },
    technical: {
      stack: [
        { id: 'tech-nuxt' as TechnologyId, name: 'Nuxt 4', category: 'frontend', isCore: true },
        { id: 'tech-vue' as TechnologyId, name: 'Vue.js', category: 'frontend', isCore: true },
        { id: 'tech-typescript' as TechnologyId, name: 'TypeScript', category: 'architecture', isCore: true },
        { id: 'tech-tailwind' as TechnologyId, name: 'Tailwind CSS', category: 'frontend', isCore: true },
        { id: 'tech-github' as TechnologyId, name: 'GitHub REST API', category: 'systems', isCore: true },
      ],
      architecturalDecisions: [
        {
          decision: 'Single-Pane API Aggregation with Client-Side Polling Intervals',
          rationale: 'Allows real-time monitoring of multiple GitHub repositories without maintaining a heavy persistent backend server.',
          tradeOff: 'Subject to GitHub API rate limits without authenticated personal access tokens.',
        },
      ],
      benchmarks: [
        { metric: 'Context Switching Saved', value: '~3–5 hrs/wk', context: 'Consolidates 4 separate GitHub pipeline views' },
        { metric: 'Pipeline Aggregation', value: '4 Pipelines', context: 'CI/CD, Security Alerts, Releases, and Workflow Runs' },
      ],
      engineeringHighlight:
        'Designed a single-pane dashboard consolidating 4 live GitHub pipelines, saving ~3–5 hours per week of manual context switching.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-mgmt-hero',
        src: '/assets/projects/dashboard/hero.webp',
        alt: 'Engineering management dashboard consolidating GitHub pipelines',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 4: Single-pane dashboard consolidating repository CI/CD pipelines and security alerts.',
      },
    },
    links: [
      {
        type: 'repository',
        label: 'GitHub Repository',
        url: 'https://github.com/bagja-iskandar',
        isExternal: true,
      },
    ],
  },
  {
    id: 'proj-mobile-image-editor' as ProjectId,
    slug: 'image-processing-histogram',
    title: 'Aplikasi Histogram & Pengolahan Citra Digital',
    subtitle: 'Discrete RGB Matrix Manipulation & Frequency Histogram Tool',
    year: 2024,
    role: 'Android Developer (Academic Project)',
    timeline: '2024',
    status: 'completed',
    releaseStatus: 'Academic Project',
    displayOrder: 5,
    featured: false,
    canvasEnvironment: 'ink',
    structureRead: {
      executiveSummary:
        'Built an Android digital image processing tool implementing discrete RGB bitmap matrix operations, channel decomposition, and real-time pixel frequency histogram calculations.',
      problemStatement:
        'Understanding spatial domain image filtering and discrete color distribution requires low-level pixel manipulation without relying on high-level pre-baked filter libraries.',
      engineeringSolution:
        'Engineered direct Android Bitmap matrix processing algorithms calculating discrete RGB histograms, brightness equalization, and grayscale contrast adjustments directly in Kotlin.',
      impactMetrics: [
        'Direct pixel-level RGB matrix transformations on Android Canvas',
        'Real-time frequency histogram generation across discrete color channels',
        'Practical implementation of foundational digital image processing algorithms',
      ],
    },
    expressionRead: {
      editorialHeadline: 'Pixel Matrices & Mathematical Image Transformation',
      narrativeStory:
        'Images are two-dimensional matrices of discrete numerical values. Implementing fundamental pixel frequency calculations and color channel manipulations in native code builds deep respect for low-level memory and algorithmic efficiency.',
      craftReflection:
        'Understanding pixels at the matrix level demystifies modern computer vision and graphics programming.',
    },
    technical: {
      stack: [
        { id: 'tech-kotlin' as TechnologyId, name: 'Kotlin', category: 'systems', isCore: true },
        { id: 'tech-android' as TechnologyId, name: 'Android SDK', category: 'systems', isCore: true },
        { id: 'tech-canvas' as TechnologyId, name: 'Canvas & Bitmap Matrix', category: 'systems', isCore: true },
      ],
      architecturalDecisions: [
        {
          decision: 'In-Memory Bitmap Matrix Processing with Coroutines',
          rationale: 'Offloaded heavy nested pixel loops to background dispatchers to keep the Android UI thread running at 60 FPS.',
          tradeOff: 'Requires careful memory allocation to avoid OutOfMemory errors on high-resolution camera images.',
        },
      ],
      engineeringHighlight:
        'Implemented discrete RGB bitmap matrix manipulation and real-time histogram calculation algorithms on Android.',
    },
    exhibit: {
      heroAsset: {
        id: 'asset-image-hero',
        src: '/assets/projects/image-editor/hero.webp',
        alt: 'Android digital image processing histogram application',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        mediaType: 'image',
        caption: 'Figure 5: Android application demonstrating discrete RGB channel matrix decomposition and frequency histogram generation.',
      },
    },
    links: [
      {
        type: 'repository',
        label: 'GitHub Repository',
        url: 'https://github.com/bagja-iskandar',
        isExternal: true,
      },
    ],
  },
] as const;

export const PROJECTS_DATA = SELECTED_PROJECTS;
