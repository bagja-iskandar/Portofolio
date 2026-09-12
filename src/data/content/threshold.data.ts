/**
 * @file threshold.data.ts
 * @description Threshold Diagonal Split-Screen Data Model conforming to THRESHOLD_CONCEPT.md
 */

import type { ThresholdConfig } from '../../types/duality';

export const THRESHOLD_DATA: ThresholdConfig = {
  enabled: true,
  crossoverWordmark: {
    word: 'DUALITY',
    splitIndex: 4, // "DUAL" on Structure (Ink) side, "ITY" on Expression (Ivory) side
  },
  organicDividerWave: {
    amplitude: 14,
    frequency: 0.008,
    inkColor: '#0E0D0C',
  },
  lenses: {
    structure: {
      id: 'structure',
      title: 'STRUCTURE',
      tagline: 'the short read.',
      canvas: 'ink',
      geometry: 'diagonal-top-left',
      description: 'A disciplined, dense technical digest. Architecture decisions, system benchmarks, and instant contact.',
      accent: 'ochre',
    },
    expression: {
      id: 'expression',
      title: 'EXPRESSION',
      tagline: 'the full story.',
      canvas: 'ivory',
      geometry: 'diagonal-bottom-right',
      description: 'The complete 8-chapter scrollytelling exhibition. Craftsmanship reflections, tactile gestures, and narrative pacing.',
      accent: 'terracotta',
    },
  },
  persistenceStrategy: 'session',
} as const;
