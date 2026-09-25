/**
 * @file engineering-highlights.data.ts
 * @description Verifiable Engineering Highlights & Core Principles for Bagja Iskandar Jamil
 * Fast-scan technical accomplishments and academic distinctions for technical recruiters and hiring managers.
 * Conforms strictly to 100% Authentic Data from the official resume.
 */

import type { EngineeringHighlightsRollup } from '../../types/duality';

export const ENGINEERING_HIGHLIGHTS: EngineeringHighlightsRollup = {
  title: 'Engineering Highlights & Verifiable Milestones',
  subtitle: 'Quantifiable achievements, academic distinctions, and foundational engineering principles.',
  executiveSummary:
    'A track record combining academic research excellence, full-stack systems analysis, and hands-on frontend delivery across fintech, logistics prototypes, and municipal software.',
  benchmarkCards: [
    {
      id: 'metric-ieee-publication',
      label: 'IEEE Academic Publication',
      value: '82.05%',
      unit: 'Mean Accuracy',
      description:
        'First author on peer-reviewed EEG BCI research using Hybrid GNN-Mamba networks (+1.5 pts over baseline, 84.50% F1, 9 subjects).',
      context: 'IEEE ICIC 2025 Conference',
      verifiedStandard: 'IEEE Xplore (#11309504)',
      linkUrl: 'https://ieeexplore.ieee.org/document/11309504',
      linkText: 'IEEE Xplore Paper',
    },
    {
      id: 'metric-wms-scope',
      label: 'Cold-Chain WMS Prototype',
      value: '56 Endpoints',
      unit: '& 214 Automated Tests',
      description:
        'Full-stack warehouse management prototype with 10 modules, 100% automated test pass rate, Swagger docs, and volume billing.',
      context: 'WMS Nusantara Prototype',
      verifiedStandard: 'Independent Prototype / Coursework SRS',
      linkUrl: 'https://wms-porto.vercel.app',
      linkText: 'Live Interactive App',
      techBadges: ['Next.js 15', 'NestJS 10', 'Prisma', 'PostgreSQL'],
    },
    {
      id: 'metric-fintech-scope',
      label: 'Cross-Border Fintech Client',
      value: '~20 Screens',
      unit: 'Delivered (ID ↔ JP)',
      description:
        'Delivered responsive web client for international remittance using Nuxt 4, Vue.js 3, and reusable atomic UI components (~85% of total UI).',
      context: 'Swap-On Remittance Client',
      verifiedStandard: 'Freelance Frontend Developer',
      techBadges: ['Nuxt 4', 'Vue.js 3', 'Tailwind CSS', 'Pinia'],
    },
    {
      id: 'metric-team-diskominfo',
      label: 'Municipal CMS Refactoring',
      value: '3-Person Team',
      unit: 'Engineering Pod',
      description:
        'Audited and refactored legacy CMS frontend components, resolved rendering bugs, and integrated Pinia state stores with Docker workflows.',
      context: 'Diskominfo Kota Cimahi Intern',
      verifiedStandard: 'Frontend Developer Intern (08/2025 – 09/2025)',
      techBadges: ['Nuxt.js', 'Vue.js', 'Bootstrap 5', 'Docker'],
    },
    {
      id: 'metric-academic-credentials',
      label: 'Academic & Language Proficiency',
      value: '3.37 GPA',
      unit: '& 570 TOEFL ITP',
      description:
        'Bachelor of Computer Science from Universitas Jenderal Achmad Yani (08/2022 – 12/2025) with verified English working proficiency.',
      context: 'UNJANI Informatics Graduate',
      verifiedStandard: 'S.Kom Degree & Official TOEFL',
    },
  ],
  corePrinciples: [
    {
      title: 'Systems Analysis Precedes Implementation',
      premise:
        'Writing code without understanding operational workflows creates architectural debt. Thorough UML modeling and user flow mapping ensure software solves the real operational problem.',
      enforcement:
        'Produce use case, sequence, and activity diagrams to formalize system boundaries before constructing schemas and API controllers.',
    },
    {
      title: 'Maintainability & Component Stewardship',
      premise:
        'Software is read far more often than it is written. Clean component boundaries and consistent interfaces turn sprawling codebases into maintainable digital assets.',
      enforcement:
        'Decompose complex views into focused reusable components, enforce strict TypeScript contracts, and eliminate redundant styling.',
    },
    {
      title: 'Scientific Rigor & Continuous Learning',
      premise:
        'Modern software engineering thrives at the intersection of robust web runtimes and applied machine learning tools.',
      enforcement:
        'Combine theoretical understanding of machine learning algorithms (GNN, Mamba) with practical mastery of modern web frameworks and AI-assisted development tools.',
    },
  ],
};
