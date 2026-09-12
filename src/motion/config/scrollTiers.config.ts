/**
 * Motion Engine Scroll Configuration
 * Adheres to §40-§45 of PROJECT_BIBLE.md and Section 4 of TECH_STACK.md
 */

export interface LenisConfigOptions {
  duration: number;
  easing: (t: number) => number;
  wheelMultiplier: number;
  touchMultiplier: number;
  smoothWheel: boolean;
  autoRaf: boolean;
  respectReducedMotion: boolean;
}

export const LENIS_DEFAULT_CONFIG: LenisConfigOptions = {
  // Architectural ease & duration: measured, steady, elegant
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 0.95,
  touchMultiplier: 1.0,
  smoothWheel: true,
  autoRaf: false, // Driven exclusively by GSAP master ticker
  respectReducedMotion: true,
};

export const SCROLL_TIERS = {
  natural: {
    level: 1,
    scrub: false,
    label: 'Level 1: Natural (90%) — Unpinned reader-controlled editorial flow',
  },
  guided: {
    level: 2,
    scrub: 0.8,
    label: 'Level 2: Guided — Soft sticky anchors for technical signposts',
  },
  cinematic: {
    level: 3,
    scrub: 1.2,
    pin: true,
    label: 'Level 3: Cinematic (10%) — Pinned viewport transitions',
  },
} as const;
