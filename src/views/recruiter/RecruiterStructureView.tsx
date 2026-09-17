'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll, SmoothScrollProvider } from '@/motion';
import StructureAtmosphere from '@/atmosphere/StructureAtmosphere';
import StructureHeader from './StructureHeader';
import EngineeringHighlights from './EngineeringHighlights';
import WorkExperienceSection from './WorkExperienceSection';
import TechnicalProjectsTable from './TechnicalProjectsTable';
import SystemsCapabilities from './SystemsCapabilities';
import DirectActionFooter from './DirectActionFooter';
import type { StructureViewData } from '@/types/duality';
import { STRUCTURE_VIEW_DATA } from '@/data';
import { setDynamicFavicon } from '@/lib/favicon';
import DualTerritoryCursor from '@/components/cursor/DualTerritoryCursor';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RecruiterStructureViewProps {
  initialData?: StructureViewData;
  onBackToThreshold?: () => void;
}

export default function RecruiterStructureView({
  initialData = STRUCTURE_VIEW_DATA,
  onBackToThreshold,
}: RecruiterStructureViewProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const isExitingRef = useRef(false);

  // Lenis Smooth Scroll Engine (§40-§45 Master RAF loop, 1.1s duration, exponential easing)
  const smoothScroll = useSmoothScroll({
    wrapperRef: containerRef,
    contentRef: mainRef,
    enabled: true,
  });

  // Ensure browser tab favicon matches the Structure Obsidian/Ochre palette
  useEffect(() => {
    setDynamicFavicon('structure');
  }, []);

  const handleReturn = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    smoothScroll.stop(); // Lock smooth scroll during exit transition

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      if (onBackToThreshold) onBackToThreshold();
      else router.push('/');
      return;
    }

    // GSAP Reverse Exit Animation
    if (mainRef.current) {
      gsap.to(mainRef.current, {
        opacity: 0,
        y: -24,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          if (onBackToThreshold) {
            onBackToThreshold();
          } else {
            router.push('/');
          }
        },
      });
    } else {
      if (onBackToThreshold) onBackToThreshold();
      else router.push('/');
    }
  }, [onBackToThreshold, router]);

  // Keyboard shortcut: ESC to return to Threshold
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleReturn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReturn]);

  // GSAP Entrance & Multi-Layer Parallax Choreography (§45 lifecycle wrapped in gsap.context)
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const scrollerEl = containerRef.current;
      const mainEl = mainRef.current;

      // 1. Entrance Stagger Sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.gsap-header',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.65 }
      );

      tl.fromTo(
        '.gsap-highlights',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.35'
      );

      tl.fromTo(
        '.gsap-experience',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.35'
      );

      tl.fromTo(
        '.gsap-projects',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.35'
      );

      tl.fromTo(
        '.gsap-capabilities',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.35'
      );

      tl.fromTo(
        '.gsap-footer',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.35'
      );

      // 2. Multi-Layer Architectural Parallax (Scroller-bound to containerRef)
      if (scrollerEl && mainEl) {
        // Layer 0: Deep Blueprint Grid Floor (yPercent: 12, scrub: 0.5)
        gsap.to('.parallax-grid-floor', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: mainEl,
            scroller: scrollerEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });

        // 2. Hairline Drafting Border Reveals (scaleX: 0 -> 1)
        const dividers = gsap.utils.toArray<HTMLElement>('.hairline-divider');
        dividers.forEach((divider) => {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.85,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: divider,
                scroller: scrollerEl,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider value={smoothScroll}>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-y-auto overflow-x-hidden overscroll-y-contain select-text bg-[#0E0D0C] text-[#EDE8DF] selection:bg-ochre selection:text-charcoal z-20"
      >
        {/* Bespoke Circular Duality Cursor Engine */}
        <DualTerritoryCursor mode="structure" />

        {/* Background Architectural Atmosphere Canvas with Animated Gold Traces */}
        <StructureAtmosphere />

        {/* Main Structural Layout Content */}
        <main
          ref={mainRef}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col will-change-[transform,opacity]"
        >
          {/* Technical Header & Telemetry */}
          <div className="gsap-header">
            <StructureHeader onBackToThreshold={handleReturn} />
          </div>

          {/* 01 // Engineering Highlights & 6 Benchmark Cards */}
          <div className="gsap-highlights">
            <EngineeringHighlights highlights={initialData.engineeringHighlights} />
          </div>

          {/* 02 // Professional Work Experience & Track Record */}
          <div className="gsap-experience">
            <WorkExperienceSection experience={initialData.workExperience} />
          </div>

          {/* 03 // Technical Projects Matrix (High-Density Accordion) */}
          <div className="gsap-projects">
            <TechnicalProjectsTable projects={initialData.projects} />
          </div>

          {/* 04 // Systems Capabilities Taxonomy & Decision Matrix */}
          <div className="gsap-capabilities">
            <SystemsCapabilities
              capabilities={initialData.capabilities}
              systemsMatrix={initialData.systemsMatrix}
            />
          </div>

          {/* 05 // Direct Action Footer & Resume PDF Download */}
          <div className="gsap-footer">
            <DirectActionFooter contact={initialData.directContact} />
          </div>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
