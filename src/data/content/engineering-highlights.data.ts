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
        'First author on peer-reviewed BCI research with Hybrid GNN-Mamba networks (82.05% Acc, 84.50% F1).',
      context: 'IEEE ICIC 2025 Conference',
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
      context: 'Software engineering & applied AI foundations',
      verifiedStandard: 'Academic Transcript',
    },
    {
      id: 'metric-fintech-scope',
      label: 'Fintech Remittance Scope',
      value: '2',
      unit: 'Countries (ID ↔ JP)',
      description:
        'Engineered responsive wallet, FX rate, and recipient transfer flows for ID ↔ JP remittance with AI-assisted Codex acceleration.',
      context: 'Swap-On ID ↔ JP Fintech',
      verifiedStandard: 'AI-Assisted Codex',
      techBadges: ['OpenAI Codex'],
    },
    {
      id: 'metric-monorepo-stack',
      label: 'Enterprise Logistics Platform',
      value: '16 / 16',
      unit: 'SRS Use Cases (100%)',
      description:
        'Transformed college SRS into production cold-chain WMS via Next.js 15, NestJS 10 & live IoT telemetry with Antigravity AI orchestration.',
      context: 'WMS Nusantara Monorepo',
      verifiedStandard: 'AI-Assisted Antigravity',
      linkUrl: 'https://wms-porto.vercel.app',
      linkText: 'Live App',
      techBadges: ['Antigravity'],
    },
    {
      id: 'metric-ai-assisted-software',
      label: 'AI-Assisted Software Development',
      value: '3+',
      unit: 'Software Systems',
      description:
        'Hands-on experience developing production-grade applications with AI-assisted engineering tools—leveraging Google Antigravity and OpenAI Codex across cross-platform mobile apps, cloud logistics, and management platforms.',
      context: 'Antigravity & Codex Ecosystem',
      verifiedStandard: 'AI-Assisted',
      techBadges: ['Antigravity', 'OpenAI Codex'],
    },
    {
      id: 'metric-ta-ai',
      label: 'Academic Instruction',
      value: '1',
      unit: 'Semester (Teaching Asst.)',
      description:
        'Guided university students through AI lab practicums, Python workflows, and algorithm debugging.',
      context: 'UNJANI CS Department (03/2025 – 07/2025)',
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
        'Combine deep theoretical understanding of algorithms (GNN, Mamba) with practical mastery of AI-assisted engineering tools (Antigravity, Codex).',
    },
  ],
};
