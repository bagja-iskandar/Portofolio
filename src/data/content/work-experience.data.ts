/**
 * @file work-experience.data.ts
 * @description Canonical Work Experience Data for Bagja Iskandar Jamil
 * 100% Authentic Data derived strictly from Official Resume (Zero Overclaiming).
 * Single Source of Truth for Professional Career and Academic Instruction.
 */

import type { WorkExperienceItem } from '../../types/structure';

export const WORK_EXPERIENCE_DATA: ReadonlyArray<WorkExperienceItem> = [
  {
    id: 'exp-swap-on',
    company: 'Swap-On',
    projectName: 'Cross-Border Remittance App',
    role: 'Frontend Developer (Freelance)',
    employmentType: 'Freelance / Remote',
    period: '04/2026 – 07/2026',
    location: 'Remote (Indonesia – Japan Remittance)',
    releaseStatus: 'Pre-release / Client NDA',
    executiveSummary:
      'Delivered approximately 20 screens for a cross-border money-transfer application alongside backend and QA engineers using AI-assisted development workflows.',
    problemStatement:
      'International remittance workflows require clear multi-currency feedback, transparent fee breakdowns, and strict validation on recipient account forms to prevent transaction errors.',
    engineeringSolution:
      'Built modular, responsive frontend client views with reusable atomic components (~85% of interface) and integrated backend REST endpoints with AI-assisted acceleration.',
    keyDeliverables: [
      'Delivered ~20 screens (authentication, multi-currency dashboard, send money, top-up, recipient directory, transaction history, admin review) as the frontend developer alongside backend and QA.',
      'Organized the UI into reusable atomic components (~85% of the interface), including CurrencyInputField, RecipientCard, FeeBreakdownSummary, and StatusBadge.',
      'Implemented responsive client-side form validation and real-time exchange rate calculations to eliminate transfer input errors.',
    ],
    coreSubsystems: [
      {
        name: 'Atomic UI Component System',
        responsibility:
          'Constructed reusable input fields, cards, badges, and modal dialogs providing ~85% UI coverage.',
      },
      {
        name: 'Remittance & Transfer Workflows',
        responsibility:
          'Engineered multi-currency balances, rate calculators, and multi-step transfer confirmation screens.',
      },
      {
        name: 'Recipient Directory & History',
        responsibility:
          'Implemented searchable recipient listings, banking code validation, and transaction logs.',
      },
    ],
    technologies: [
      'Vue.js',
      'Nuxt.js',
      'TypeScript',
      'Tailwind CSS',
      'Pinia',
      'REST APIs',
    ],
    assistedTech: ['OpenAI Codex'],
  },
  {
    id: 'exp-diskominfo',
    company: 'Dinas Komunikasi dan Informatika Pemerintahan Kota Cimahi',
    projectName: 'Municipal CMS Refactoring',
    role: 'Frontend Developer Intern – CMS Refactoring Project',
    employmentType: 'Government Internship',
    period: '08/2025 – 09/2025',
    location: 'Cimahi, West Java, Indonesia',
    releaseStatus: 'Government Internship (Completed)',
    executiveSummary:
      'Refactored frontend modules of an internal municipal Content Management System (CMS) in a 3-person team, extracting reusable components and applying clean-code conventions.',
    problemStatement:
      'Legacy municipal CMS modules suffered from template duplication, inconsistent form styling, layout rendering defects, and tight coupling that hindered departmental maintenance.',
    engineeringSolution:
      'Systematically refactored frontend views into modular components, resolved UI bugs across administrative panels, and standardized styling conventions alongside the IT team.',
    keyDeliverables: [
      'Refactored frontend modules of a government CMS in a 3-person team (Nuxt.js, Pinia, TypeScript), extracting reusable components and applying clean-code conventions.',
      'Resolved UI defects in existing features and contributed frontend improvements alongside the team.',
      'Standardized form elements and data table layouts to improve consistency and maintainability across municipal departments.',
    ],
    coreSubsystems: [
      {
        name: 'CMS Component Extraction',
        responsibility:
          'Decomposed monolithic legacy views into focused, reusable component blocks.',
      },
      {
        name: 'UI Defect Remediation',
        responsibility:
          'Audited administrative pages, resolved layout regressions, and improved responsive behavior.',
      },
      {
        name: 'Clean Code Standardization',
        responsibility:
          'Applied consistent naming conventions, TypeScript interfaces, and shared state patterns.',
      },
    ],
    technologies: [
      'Nuxt.js',
      'Pinia',
      'TypeScript',
      'Vue.js',
      'Tailwind CSS',
      'Git',
    ],
    credentialLabel: 'INTERNSHIP RECORD',
    credentialUrl: 'https://linkedin.com/in/bagja-iskandar-jamil',
  },
  {
    id: 'exp-lab-assistant',
    company: 'Universitas Jenderal Achmad Yani',
    projectName: 'Artificial Intelligence Laboratory',
    role: 'Lab Assistant, Artificial Intelligence',
    employmentType: 'Teaching Assistant / Academic',
    period: '03/2025 – 07/2025',
    location: 'Cimahi, West Java, Indonesia',
    releaseStatus: 'Academic Term Completed',
    executiveSummary:
      'Supported approximately 19 weekly practical sessions for undergraduate computer science students in Artificial Intelligence, guiding algorithm troubleshooting and grading student reports.',
    problemStatement:
      'Students required individual guidance to translate theoretical machine learning algorithms and heuristic search models into practical, working Python implementations.',
    engineeringSolution:
      'Conducted interactive weekly lab practicums, demonstrated Python scientific workflows, guided code debugging, and established objective grading criteria for all student lab reports.',
    keyDeliverables: [
      'Supported ~19 weekly practical sessions for one class, guiding students through core AI concepts and troubleshooting their code.',
      'Graded nearly all student lab reports, evaluating algorithmic correctness, code quality, and analytical conclusions.',
      'Provided hands-on debugging support for search algorithms, neural network baselines, and data preprocessing pipelines.',
    ],
    coreSubsystems: [
      {
        name: 'Lab Practicum Instruction',
        responsibility:
          'Guided students through hands-on Python exercises in search, heuristics, and introductory ML.',
      },
      {
        name: 'Code Troubleshooting',
        responsibility:
          'Assisted students with debugging algorithmic edge cases and environment configuration.',
      },
      {
        name: 'Lab Report Assessment',
        responsibility:
          'Evaluated and graded student laboratory assignments with detailed technical feedback.',
      },
    ],
    technologies: [
      'Python',
      'PyTorch / ML Basics',
      'Data Structures',
      'Algorithm Debugging',
      'Technical Mentorship',
    ],
    credentialLabel: 'ACADEMIC APPOINTMENT',
    credentialUrl: 'https://linkedin.com/in/bagja-iskandar-jamil',
  },
] as const;
