'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CapabilitiesTaxonomy, SystemsArchitectureMatrix } from '@/types/duality';
import { CAPABILITIES_DATA, SYSTEMS_DECISION_MATRIX } from '@/data';
import { Scale, Shield } from 'lucide-react';
import { TechLogoBadge } from '@/components/common/TechLogoBadge';

interface SystemsCapabilitiesProps {
  capabilities?: CapabilitiesTaxonomy;
  systemsMatrix?: SystemsArchitectureMatrix;
}

export default function SystemsCapabilities({
  capabilities = CAPABILITIES_DATA,
  systemsMatrix = SYSTEMS_DECISION_MATRIX,
}: SystemsCapabilitiesProps) {
  const [activeTab, setActiveTab] = useState<'capabilities' | 'matrix'>('capabilities');
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTabChange = (tab: 'capabilities' | 'matrix') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Recalibrate ScrollTrigger positions after tab panel transition completes
    timeoutRef.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 360);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="w-full pt-12 pb-6 md:pt-16 md:pb-8"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-1">
            04 // CAPABILITIES & ARCHITECTURAL RIGOR
          </div>
          <h2
            id="capabilities-heading"
            className="font-mono text-2xl sm:text-3xl text-cream font-medium tracking-[0.06em] uppercase"
          >
            Engineering Capabilities &amp; Decision Matrix
          </h2>
        </div>

        {/* View Toggle Tabs */}
        <LayoutGroup id="capabilities-tabs">
          <div
            role="tablist"
            aria-label="Capabilities and Architecture views"
            className="relative inline-flex p-1 rounded-lg bg-[#141210] border border-cream/10 font-mono text-xs select-none"
          >
            <motion.button
              id="tab-capabilities"
              role="tab"
              aria-selected={activeTab === 'capabilities'}
              aria-controls="tabpanel-capabilities"
              whileTap={{ scale: 0.97 }}
              onClick={() => handleTabChange('capabilities')}
              className="relative px-3 py-1.5 rounded text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre/60"
            >
              {activeTab === 'capabilities' && (
                <motion.div
                  layoutId="active-capabilities-tab"
                  className="absolute inset-0 rounded bg-ochre/20 border border-ochre/40 shadow-sm"
                  transition={
                    isReducedMotion
                      ? { duration: 0 }
                      : {
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                          mass: 0.8,
                        }
                  }
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  activeTab === 'capabilities'
                    ? 'text-cream font-semibold'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                Capabilities Taxonomy
              </span>
            </motion.button>
            <motion.button
              id="tab-matrix"
              role="tab"
              aria-selected={activeTab === 'matrix'}
              aria-controls="tabpanel-matrix"
              whileTap={{ scale: 0.97 }}
              onClick={() => handleTabChange('matrix')}
              className="relative px-3 py-1.5 rounded text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre/60"
            >
              {activeTab === 'matrix' && (
                <motion.div
                  layoutId="active-capabilities-tab"
                  className="absolute inset-0 rounded bg-ochre/20 border border-ochre/40 shadow-sm"
                  transition={
                    isReducedMotion
                      ? { duration: 0 }
                      : {
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                          mass: 0.8,
                        }
                  }
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  activeTab === 'matrix'
                    ? 'text-cream font-semibold'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                Systems Decision Matrix
              </span>
            </motion.button>
          </div>
        </LayoutGroup>
      </div>

      {/* Philosophical Note (Strict §22 / §46 Compliance) */}
      <div className="p-4 rounded-lg bg-[#141210]/50 border border-cream/5 mb-8 flex items-start gap-3 text-xs font-mono text-[#8A847C]">
        <Shield className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
        <div>
          <span className="text-cream font-semibold uppercase">Architectural Standard: </span>
          {capabilities.philosophy}
        </div>
      </div>

      {/* ================= TAB PANELS (Animated Crossfade & Micro-Drift) ================= */}
      <AnimatePresence mode="wait">
        {activeTab === 'capabilities' ? (
          <motion.div
            key="tabpanel-capabilities"
            id="tabpanel-capabilities"
            role="tabpanel"
            aria-labelledby="tab-capabilities"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -6,
              transition: {
                duration: isReducedMotion ? 0 : 0.15,
                ease: 'easeOut',
              },
            }}
            transition={{
              duration: isReducedMotion ? 0 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => {
              if (typeof window !== 'undefined') {
                ScrollTrigger.refresh();
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {capabilities.disciplines.map((discipline, dIdx) => (
              <div
                key={dIdx}
                className="p-6 rounded-lg bg-[#141210] border border-cream/10 flex flex-col justify-between hover:border-ochre/40 hover:bg-[#161412] hover:-translate-y-1 transition-all duration-300 ease-out hover:shadow-lg will-change-transform h-full"
              >
                <div>
                  <div className="font-mono text-[10px] text-ochre tracking-widest uppercase mb-1">
                    DOMAIN {dIdx + 1} // {discipline.domain.toUpperCase()}
                  </div>
                  <h3 className="font-mono text-base font-bold text-cream tracking-tight mb-2">
                    {discipline.title}
                  </h3>
                  <p className="font-sans text-xs text-[#8A847C] leading-relaxed mb-5 text-justify">
                    {discipline.description}
                  </p>

                  {/* Capability Items */}
                  <div className="flex flex-col gap-4">
                    {discipline.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded bg-[#181614] border border-cream/5 hover:border-ochre/20 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-xs font-semibold text-cream">
                            {item.name}
                          </span>
                          {item.standardsCompliance && item.standardsCompliance[0] && (
                            <span className="px-1.5 py-0.5 rounded bg-ochre/10 border border-ochre/30 text-ochre font-mono text-[9px]">
                              {item.standardsCompliance[0]}
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs text-[#8A847C] leading-relaxed mb-3 text-justify">
                          {item.scope}
                        </p>
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {item.technologies.map((tech, tIdx) => (
                            <TechLogoBadge
                              key={tIdx}
                              tech={tech}
                              size="sm"
                              tooltipSide="top"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="tabpanel-matrix"
            id="tabpanel-matrix"
            role="tabpanel"
            aria-labelledby="tab-matrix"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -6,
              transition: {
                duration: isReducedMotion ? 0 : 0.15,
                ease: 'easeOut',
              },
            }}
            transition={{
              duration: isReducedMotion ? 0 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => {
              if (typeof window !== 'undefined') {
                ScrollTrigger.refresh();
              }
            }}
            className="flex flex-col gap-4"
          >
            {systemsMatrix.patterns.map((pattern) => (
              <div
                key={pattern.id}
                className="p-6 rounded-lg bg-[#141210] border border-cream/10 flex flex-col gap-4 hover:border-ochre/40 hover:bg-[#161412] hover:-translate-y-1 transition-all duration-300 ease-out hover:shadow-lg will-change-transform"
              >
                {/* Pattern Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cream/5">
                  <div>
                    <span className="font-mono text-[10px] text-ochre uppercase tracking-wider">
                      CATEGORY: {pattern.category.toUpperCase()}
                    </span>
                    <h3 className="font-mono text-base sm:text-lg font-bold text-cream mt-0.5">
                      {pattern.pattern}
                    </h3>
                  </div>
                  {pattern.benchmarks && pattern.benchmarks[0] && (
                    <div className="font-mono text-xs px-2.5 py-1 rounded bg-[#181614] border border-cream/10 text-ochre">
                      <span className="text-cream/50">{pattern.benchmarks[0].metric}: </span>
                      <span className="font-bold">{pattern.benchmarks[0].value}</span>
                    </div>
                  )}
                </div>

                {/* Problem vs Solution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-3.5 rounded bg-[#181614] border border-cream/5">
                    <span className="font-mono text-[11px] font-semibold text-ochre uppercase block mb-1">
                      Problem Context
                    </span>
                    <p className="text-[#8A847C] leading-relaxed text-justify">
                      {pattern.problemAddressed}
                    </p>
                  </div>
                  <div className="p-3.5 rounded bg-[#181614] border border-cream/5">
                    <span className="font-mono text-[11px] font-semibold text-cream uppercase block mb-1">
                      Architectural Solution
                    </span>
                    <p className="text-cream/80 leading-relaxed text-justify">
                      {pattern.architecturalSolution}
                    </p>
                  </div>
                </div>

                {/* Trade-Off Analysis Breakdown */}
                <div className="p-4 rounded bg-[#0E0D0C] border border-cream/5 text-xs font-sans">
                  <div className="font-mono text-[11px] text-cream/70 uppercase font-semibold mb-2 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-ochre" />
                    <span>Engineering Trade-Off Analysis</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
                    <div>
                      <span className="font-mono text-[10px] text-cream/90 uppercase block mb-0.5">
                        + Benefit
                      </span>
                      <p className="text-[#8A847C] text-justify">{pattern.tradeOffs.benefit}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-cream/60 uppercase block mb-0.5">
                        - Liability / Cost
                      </span>
                      <p className="text-[#8A847C] text-justify">{pattern.tradeOffs.liability}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-ochre uppercase block mb-0.5">
                        &bull; Mitigation Strategy
                      </span>
                      <p className="text-cream/80 text-justify">{pattern.tradeOffs.mitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hairline Drafting Divider for ScrollTrigger reveal */}
      <div className="hairline-divider w-full h-[1px] bg-cream/10 origin-left will-change-transform mt-12 md:mt-16" />
    </section>
  );
}
