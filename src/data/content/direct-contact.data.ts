/**
 * @file direct-contact.data.ts
 * @description Direct Contact & Availability Metadata for Bagja Iskandar Jamil
 * Fast-track communication channels and recruiter SLA guidelines.
 * Adheres strictly to §47 (Zero Fabrication, Authentic Data from Official Resume).
 */

import type { DirectContactMeta } from '../../types/duality';

export const DIRECT_CONTACT_META: DirectContactMeta = {
  title: 'Direct Dialogue & Technical Engagement',
  subtitle:
    'Fast-track communication channels for engineering leaders, hiring managers, and technical collaborators.',
  availability: {
    status: 'available',
    statusBadge: 'Open for Frontend Developer, Web Application & Software Engineer Roles',
    timeline: 'Immediate availability for full-time, contract, and project-based opportunities',
    targetRoles: [
      'Frontend Developer (Next.js, React, Nuxt 4, Vue.js, TypeScript)',
      'Software Engineer / Web Application Developer',
      'Full-Stack Developer (Next.js, NestJS, PostgreSQL, Prisma)',
      'System Analyst / Software Engineering Associate',
    ],
    locationDetails: {
      primaryLocation: 'Bandung Barat, Jawa Barat, Indonesia',
      mode: 'Remote Global',
      timezone: 'UTC+7 (Western Indonesia Time / WIB)',
      timezoneOverlapNote:
        'Flexible working hours with reliable availability across APAC, EU CET, and US time zones.',
    },
  },
  communicationChannels: {
    directEmail: 'bagjaiskandar@outlook.com',
    defaultSubject: 'Inquiry: Software Engineering & Frontend Collaboration',
    responseSla: '< 24 hours on business days',
    profiles: [
      {
        platform: 'email',
        label: 'Direct Email',
        url: 'mailto:bagjaiskandar@outlook.com',
        handle: 'bagjaiskandar@outlook.com',
        isPrimary: true,
      },
      {
        platform: 'github',
        label: 'GitHub Profile',
        url: 'https://github.com/bagja-iskandar',
        handle: 'github.com/bagja-iskandar',
        isPrimary: true,
      },
      {
        platform: 'linkedin',
        label: 'LinkedIn Profile',
        url: 'https://linkedin.com/in/bagja-iskandar-jamil',
        handle: 'linkedin.com/in/bagja-iskandar-jamil',
        isPrimary: true,
      },
      {
        platform: 'resume',
        label: 'Official Resume (PDF)',
        url: '/documents/Resume_Bagja_Iskandar_Jamil.pdf',
        handle: 'Resume_Bagja_Iskandar_Jamil.pdf',
        isPrimary: true,
      },
    ],
  },
  noteToHiringTeams:
    'Computer Science graduate from Universitas Jenderal Achmad Yani (GPA 3.37 / 4.00) with hands-on experience spanning cross-border fintech frontend engineering, municipal CMS refactoring, full-stack warehouse architecture, AI laboratory instruction, and peer-reviewed machine learning research published at IEEE ICIC 2025. Driven by delivering structured, clean, and maintainable software.',
};
