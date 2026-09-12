/**
 * @file structure-view.data.ts
 * @description Consolidated Canonical Data Fixture for Structure View (Recruiter Fast-Track)
 * Single Source of Truth conforming strictly to §29, §38, §39, §46, and §47 of PROJECT_BIBLE.md.
 * 100% Authentic Data for Bagja Iskandar Jamil.
 */

import type { StructureViewData } from '../../types/duality';
import { CAPABILITIES_TAXONOMY } from './capabilities.data';
import { DIRECT_CONTACT_META } from './direct-contact.data';
import { ENGINEERING_HIGHLIGHTS } from './engineering-highlights.data';
import { SELECTED_PROJECTS } from './projects.data';
import { SYSTEMS_ARCHITECTURE_MATRIX } from './systems-matrix.data';
import { WORK_EXPERIENCE_DATA } from './work-experience.data';

export const STRUCTURE_VIEW_DATA: StructureViewData = {
  headerMeta: {
    title: 'STRUCTURE',
    lensTagline: 'the short read.',
    quickSummary:
      'A dense, high-signal technical digest of software engineering architecture, production web applications, and peer-reviewed research by Bagja Iskandar Jamil. Structured for engineering leaders, hiring managers, and technical recruiters.',
    canvas: 'ink',
    accent: 'ochre',
  },
  projects: SELECTED_PROJECTS,
  workExperience: WORK_EXPERIENCE_DATA,
  capabilities: CAPABILITIES_TAXONOMY,
  systemsMatrix: SYSTEMS_ARCHITECTURE_MATRIX,
  engineeringHighlights: ENGINEERING_HIGHLIGHTS,
  directContact: DIRECT_CONTACT_META,
} as const;
