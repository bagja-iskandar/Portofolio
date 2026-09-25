/**
 * @file direct-contact.data.ts
 * @description Direct Contact & Availability Metadata for Bagja Iskandar Jamil
 * Direct communication channels and contact information.
 * Adheres strictly to authentic data from the official resume.
 */

import type { DirectContactMeta } from '../../types/duality';

export const DIRECT_CONTACT_META: DirectContactMeta = {
  title: 'Direct Dialogue & Technical Engagement',
  subtitle:
    'Communication channels for engineering leaders, hiring managers, and technical teams.',
  availability: {
    status: 'available',
    statusBadge: 'Open to Work · Frontend Developer & Software Engineer Roles',
    timeline: 'Immediate availability for full-time, contract, and project opportunities',
    targetRoles: [
      'Frontend Developer (Next.js, React, Nuxt 4, Vue.js, TypeScript)',
      'Software Engineer / Web Application Developer',
      'Junior Full-Stack Engineer (Next.js, NestJS, PostgreSQL, Prisma)',
      'System Analyst / Software Engineering Associate',
    ],
    locationDetails: {
      primaryLocation: 'Bandung Barat, Jawa Barat, Indonesia',
      mode: 'Remote Global',
      timezone: 'UTC+7 (WIB)',
      timezoneOverlapNote:
        'Flexible working hours with reliable availability across APAC, European, and US time zones.',
    },
  },
  communicationChannels: {
    directEmail: 'bagjaiskandar@outlook.com',
    phone: '+6281223459461',
    websiteUrl: 'https://bagjaiskandar.vercel.app',
    englishProficiency: 'TOEFL ITP 570',
    defaultSubject: 'Inquiry: Software Engineering & Frontend Opportunities',
    responseSla: 'Within 24 hours',
    responseTime: '< 24 hours',
    profiles: [
      {
        platform: 'email',
        label: 'Direct Email',
        url: 'mailto:bagjaiskandar@outlook.com',
        handle: 'bagjaiskandar@outlook.com',
        isPrimary: true,
      },
      {
        platform: 'phone',
        label: 'WhatsApp / Phone',
        url: 'https://wa.me/6281223459461',
        handle: '+62 812-2345-9461',
        isPrimary: true,
      },
      {
        platform: 'website',
        label: 'Portfolio Website',
        url: 'https://bagjaiskandar.vercel.app',
        handle: 'bagjaiskandar.vercel.app',
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
    'Computer Science graduate from Universitas Jenderal Achmad Yani (GPA 3.37 / 4.00, TOEFL ITP 570) with practical experience in cross-border fintech frontend engineering (~20 screens), municipal CMS component refactoring, full-stack warehouse prototype (56 endpoints, 214 tests), AI laboratory instruction, and peer-reviewed machine learning research published at IEEE ICIC 2025. Focused on delivering reliable, accessible, and maintainable software.',
};
