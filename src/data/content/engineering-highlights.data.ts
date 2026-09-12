/**
 * @file engineering-highlights.data.ts
 * @description Verifiable Engineering Highlights & Core Principles for Bagja Iskandar Jamil
 * Fast-scan technical accomplishments and academic distinctions for technical recruiters and hiring managers.
 * Conforms strictly to §47 (Zero Fabrication, 100% Authentic Data).
 */

import type { EngineeringHighlightsRollup } from '../../types/duality';

export const ENGINEERING_HIGHLIGHTS: EngineeringHighlightsRollup = {
  title: 'Engineering Highlights & Verifiable Milestones',
  subtitle: 'Quantifiable achievements, academic distinctions, and foundational engineering principles.',
  executiveSummary:
    'A track record combining academic research excellence, full-stack systems analysis, and hands-on frontend delivery across fintech, enterprise dashboards, and municipal software.',
  benchmarkCards: [
    {
      id: 'metric-ieee-publication',
      label: 'IEEE Academic Publication',
      value: 'ICIC 2025',
      unit: 'IEEE',
      description:
        'First author on peer-reviewed research: "Brain-Computer Interface of Motor Imagery EEG Signal Using Hybrid GNN-Mamba Networks" (82.05% Accuracy, 84.50% F1-Score on BCI IV-2a).',
      context: 'International Conference on Informatics and Computing (IEEE ICIC 2025)',
      verifiedStandard: 'IEEE Publication Standards',
      linkUrl: 'https://ieeexplore.ieee.org/document/11309504',
      linkText: 'IEEE Xplore',
    },
    {
      id: 'metric-gpa',
      label: 'Academic Performance',
      value: '3.37',
      unit: '/ 4.00 GPA',
      description:
        'Bachelor of Computer Science (Informatics) degree from Universitas Jenderal Achmad Yani (08/2022 – 12/2025).',
      context: 'Graduated with strong foundations in software engineering and artificial intelligence',
      verifiedStandard: 'Academic Transcript',
    },
    {
      id: 'metric-fintech-scope',
      label: 'Fintech Remittance Scope',
      value: '2',
      unit: 'Countries (ID ↔ JP)',
      description:
        'Engineered responsive wallet, exchange rate, and recipient transfer flows for international remittance between Indonesia and Japan.',
      context: 'Swap-On cross-border financial application',
      verifiedStandard: 'Production Delivery',
    },
    {
      id: 'metric-monorepo-stack',
      label: 'Enterprise Logistics Platform',
      value: '16 / 16',
      unit: 'SRS Use Cases (100%)',
      description:
        'Realized an authentic college Software Requirements Specification (SRS) into a production-grade cold chain WMS platform with Next.js 15, NestJS 10, Supabase Postgres, and live IoT telemetry.',
      context: 'WMS Nusantara live production deployment on Vercel',
      verifiedStandard: 'SRS Traceability & Vercel Live',
      linkUrl: 'https://wms-porto.vercel.app',
      linkText: 'Live App',
    },
    {
      id: 'metric-cms-refactor',
      label: 'Public Sector Refactoring',
      value: '100%',
      unit: 'Resolved (CMS)',
      description:
        'Refactored legacy frontend modules, resolved layout bugs, and modernized code maintainability for municipal internal CMS.',
      context: 'Dinas Komunikasi dan Informatika Pemerintahan Kota Cimahi (08/2025 – 09/2025)',
      verifiedStandard: 'Municipal IT Sign-Off',
    },
    {
      id: 'metric-ta-ai',
      label: 'Academic Instruction',
      value: '1',
      unit: 'Semester (Teaching Asst.)',
      description:
        'Guided students through Artificial Intelligence laboratory practicums, programming workflows, and troubleshooting.',
      context: 'Universitas Jenderal Achmad Yani (03/2025 – 07/2025)',
      verifiedStandard: 'Faculty Appointment',
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
      title: 'Continuous Scientific Curiosity & AI Literacy',
      premise:
        'Modern software engineering thrives at the intersection of robust web runtimes and applied machine learning tools.',
      enforcement:
        'Combine deep theoretical understanding of algorithms (GNN, Mamba) with practical mastery of AI-assisted engineering tools (Antigravity, Copilot, Codex).',
    },
  ],
};
