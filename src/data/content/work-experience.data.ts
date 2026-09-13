/**
 * @file work-experience.data.ts
 * @description Canonical Work Experience Data for Bagja Iskandar Jamil
 * Conforms strictly to §16, §39, & §47 of PROJECT_BIBLE.md.
 * 100% Authentic Data derived from Official Resume (Zero Fabrication).
 */

import type { WorkExperienceItem } from '../../types/structure';

export const WORK_EXPERIENCE_DATA: ReadonlyArray<WorkExperienceItem> = [
  {
    id: 'exp-swap-on',
    company: 'Swap-On',
    projectName: 'Fintech Remittance Platform',
    role: 'Frontend Developer (Freelance)',
    employmentType: 'Freelance / Contract',
    period: '2026',
    location: 'Remote (Indonesia – Japan Fintech Remittance)',
    executiveSummary:
      'Engineered responsive, accessible mobile user interfaces for a cross-platform fintech remittance application facilitating international money transfers between Indonesia and Japan across Android and iOS.',
    problemStatement:
      'International money transfers demand zero-error user journeys, real-time currency exchange feedback, clear fee disclosures, and strict input validation for foreign recipient bank accounts across mobile operating systems.',
    engineeringSolution:
      'Architected a cross-platform mobile client using Kotlin Multiplatform (KMP) and Compose Multiplatform alongside Android Native (XML / Material Components) and iOS (Swift/SwiftUI), accelerated via AI-assisted engineering with OpenAI Codex; developed core application modules including multi-currency wallet management, exchange rate calculators, recipient directories, transfer execution workflows, and Stripe payment integration.',
    keyDeliverables: [
      'End-to-end multi-currency wallet & exchange pipeline with responsive UI feedback on Compose Multiplatform',
      'Cross-platform shared business logic and UI architecture using Kotlin Multiplatform (KMP) across Android and iOS',
      'Dual Android UI implementation integrating modern Compose Multiplatform with Android View System (XML / Material Components)',
      'Secure international payment processing and card checkout flow integration using Stripe Android SDK',
      'Thin iOS host application rendering shared Compose UI via UIViewControllerRepresentable and SwiftUI',
      'Strict Kotlin domain validation models reducing user input errors during international recipient registration',
    ],
    coreSubsystems: [
      {
        name: 'Shared KMP Logic & Currency Core',
        responsibility:
          'Handles live conversion calculations, balance updates, and currency pair selections across platforms.',
      },
      {
        name: 'Recipient Directory & Validation Module',
        responsibility:
          'Manages international recipient accounts with banking code validation on Android and iOS.',
      },
      {
        name: 'Stripe Gateway & Checkout Flow',
        responsibility:
          'Processes secure card remittances, fee disclosures, and payment lifecycle callbacks.',
      },
    ],
    technologies: [
      'Kotlin 2.4 (JVM 11)',
      'Kotlin Multiplatform (KMP)',
      'Compose Multiplatform 1.11',
      'Android (XML / Material 3)',
      'Swift / SwiftUI (iOS)',
      'Stripe Android SDK',
      'Gradle Kotlin DSL (AGP 9.2)',
    ],
    assistedTech: ['OpenAI Codex'],
  },
  {
    id: 'exp-diskominfo',
    company: 'Dinas Komunikasi dan Informatika Kota Cimahi',
    projectName: 'Puscimut CMS',
    role: 'Frontend Developer Intern',
    employmentType: 'Government Internship',
    period: 'Aug 2025 – Sep 2025',
    location: 'Cimahi, West Java, Indonesia',
    executiveSummary:
      'Refactored and modernized frontend modules of Puscimut CMS, an internal municipal Content Management System for Dinas Komunikasi dan Informatika Kota Cimahi, improving maintainability, UI responsiveness, and code readability.',
    problemStatement:
      'Legacy municipal CMS codebase exhibited tightly coupled UI templates, inconsistent design elements, layout rendering glitches, and undocumented frontend logic that slowed down departmental updates.',
    engineeringSolution:
      'Systematically audited and refactored frontend modules; resolved interface bugs; established modular UI structures; collaborated directly with government IT development team to implement code improvements.',
    keyDeliverables: [
      'Modernized core internal CMS modules used by municipal government operators across Diskominfo Kota Cimahi',
      'Improved code readability and structural maintainability for long-term internal maintenance, onboarding, and scaling',
      'Eliminated UI display glitches and layout inconsistencies across administration panels, responsive viewports, and custom theme layouts',
      'Established standardized styling conventions and modular template blocks across departmental forms, inputs, and listings',
      'Architected clean OOP service layer implementing ServiceInterface across all 20+ modules with automatic SSO token injection',
      'Introduced robust schema validation with Zod and TypeScript, providing instant UI feedback and stopping invalid payloads before dispatch',
    ],
    coreSubsystems: [
      {
        name: 'CMS Module Audit & Restructuring',
        responsibility:
          'Decomposing sprawling legacy views into clean component units and server-driven data grids.',
      },
      {
        name: 'UI Optimization & Bug Remediation',
        responsibility:
          'Fixing layout regressions across custom themes, enhancing mobile responsiveness, and optimizing editor pipelines.',
      },
      {
        name: 'Team Code Standardization',
        responsibility:
          'Enforcing TypeScript interfaces, adopting Zod schema validation, and establishing team Git standards.',
      },
    ],
    technologies: [
      'Nuxt 3',
      'Vue 3',
      'TypeScript',
      'Bootstrap 5',
      'Pinia',
      'Zod',
      'Vite',
      'Docker',
      'Git',
    ],
    credentialLabel: 'INTERNSHIP PROFILE',
    credentialUrl: 'https://linkedin.com/in/bagja-iskandar-jamil',
  },
] as const;
