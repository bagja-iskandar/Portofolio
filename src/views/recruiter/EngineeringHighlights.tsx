'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { EngineeringHighlightsRollup } from '@/types/duality';
import { ENGINEERING_HIGHLIGHTS } from '@/data';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useSmoothScrollContext } from '@/motion';

interface EngineeringHighlightsProps {
  highlights?: EngineeringHighlightsRollup;
}

export default function EngineeringHighlights({
  highlights = ENGINEERING_HIGHLIGHTS,
}: EngineeringHighlightsProps) {
  const { benchmarkCards, corePrinciples, title, subtitle } = highlights;
  const { lenis, scrollTo } = useSmoothScrollContext();

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleCardClick = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      const cardEl = cardRefs.current.get(id);
      if (!cardEl) return;

      const isReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (lenis && !isReduced) {
        scrollTo(cardEl, {
          offset: -28, // Clear top nicely with comfortable framing clearance
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        cardEl.scrollIntoView({
          behavior: isReduced ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    }, 40);
  };

  return (
    <section
      aria-labelledby="engineering-highlights-heading"
      className="w-full pt-12 pb-6 md:pt-16 md:pb-8"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-1">
            01 // SYSTEM METRICS &amp; BENCHMARKS
          </div>
          <h2
            id="engineering-highlights-heading"
            className="font-mono text-2xl sm:text-3xl text-cream font-medium tracking-[0.06em] uppercase"
          >
            {title}
          </h2>
        </div>
        <p className="font-mono text-xs text-[#8A847C] max-w-md text-left sm:text-right">
          {subtitle}
        </p>
      </div>

      {/* ================= 6 BENCHMARK CARDS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {benchmarkCards.map((card, idx) => {
          const isActive = activeCardId === card.id;
          return (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardRefs.current.set(card.id, el);
                else cardRefs.current.delete(card.id);
              }}
              onClick={() => handleCardClick(card.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(card.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              className={`group relative flex flex-col justify-between p-6 rounded-lg transition-all duration-300 ease-out cursor-pointer will-change-transform h-full scroll-mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre/80 ${
                isActive
                  ? 'bg-[#181512] border-ochre shadow-xl shadow-ochre/10 ring-1 ring-ochre/40 -translate-y-1'
                  : 'bg-[#141210] border-cream/10 hover:border-ochre/50 hover:bg-[#181512] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/70'
              } border`}
            >
              {/* Card Header: Index & Standard */}
              <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-cream/5 text-[11px] font-mono min-h-[38px]">
                <span className={isActive ? 'text-ochre font-semibold' : 'text-cream/40'}>
                  0{idx + 1}
                </span>
                <span
                  className={`px-2 py-0.5 rounded border text-[10px] tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-ochre/20 text-ochre border-ochre/40 font-medium'
                      : 'bg-cream/[0.04] text-ochre/90 border border-ochre/20'
                  }`}
                >
                  {card.verifiedStandard}
                </span>
              </div>

              {/* Metric Value & Unit */}
              <div className="py-5 flex-1 flex flex-col justify-start">
                <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1 font-mono min-h-[44px]">
                  <span
                    className={`text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-ochre' : 'text-cream group-hover:text-ochre'
                    }`}
                  >
                    {card.value}
                  </span>
                  {card.unit && (
                    <span className="text-xs sm:text-sm font-semibold tracking-wider text-ochre uppercase">
                      {card.unit}
                    </span>
                  )}
                </div>
                <h3 className="font-mono text-xs font-semibold tracking-wider text-cream/90 uppercase mt-2">
                  {card.label}
                </h3>
                <p className="font-sans text-xs text-[#8A847C] mt-2.5 leading-relaxed text-justify">
                  {card.description}
                </p>
              </div>

              {/* Metric Context */}
              <div className="pt-3.5 border-t border-cream/5 flex items-center justify-between gap-2 text-[11px] font-mono text-cream/50 min-h-[44px]">
                <div className="flex items-start gap-2 min-w-0">
                  <span
                    className={`text-ochre transition-transform duration-200 ${
                      isActive ? 'translate-x-1 font-bold' : 'text-ochre/60 group-hover:translate-x-0.5'
                    } shrink-0 pt-0.5`}
                  >
                    &gt;
                  </span>
                  <span className={`leading-snug ${isActive ? 'text-cream/80' : ''}`}>
                    {card.context}
                  </span>
                </div>
                {card.linkUrl && (
                  <a
                    href={card.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-ochre hover:text-cream transition-colors shrink-0 ml-1 py-1 px-2 rounded bg-ochre/10 border border-ochre/25 text-[10px] tracking-wider uppercase font-medium"
                  >
                    <span>{card.linkText || 'Verify'}</span>
                    <ArrowUpRight className="w-3 h-3 text-ochre" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= CORE ARCHITECTURAL PRINCIPLES ================= */}
      <div className="mt-8 p-6 sm:p-7 rounded-lg bg-[#181614]/70 border border-cream/10">
        <div className="flex items-center gap-2 mb-6 font-mono text-xs tracking-wider uppercase text-ochre">
          <ShieldCheck className="w-4 h-4" />
          <span>Non-Negotiable Engineering Invariants</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {corePrinciples.map((principle, idx) => {
            const principleId = `principle-${idx}`;
            const isActive = activeCardId === principleId;
            return (
              <div
                key={principleId}
                ref={(el) => {
                  if (el) cardRefs.current.set(principleId, el);
                  else cardRefs.current.delete(principleId);
                }}
                onClick={() => handleCardClick(principleId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(principleId);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                className={`group p-5 rounded-lg transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between h-full will-change-transform scroll-mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre/80 ${
                  isActive
                    ? 'bg-[#181512] border-ochre shadow-lg shadow-ochre/10 ring-1 ring-ochre/40 -translate-y-1'
                    : 'bg-[#141210] border-cream/10 hover:border-ochre/40 hover:bg-[#181512] hover:-translate-y-1.5 hover:shadow-lg hover:shadow-black/60'
                } border`}
              >
                <div>
                  <h4
                    className={`font-mono text-xs font-semibold uppercase transition-colors duration-200 ${
                      isActive ? 'text-ochre' : 'text-cream group-hover:text-ochre'
                    }`}
                  >
                    {idx + 1}. {principle.title}
                  </h4>
                  <p className="font-sans text-xs text-[#8A847C] leading-relaxed mt-2.5 text-justify">
                    {principle.premise}
                  </p>
                </div>
                <div
                  className={`font-mono text-[10px] mt-5 p-2.5 rounded border text-justify transition-colors ${
                    isActive
                      ? 'text-ochre bg-ink/90 border-ochre/30'
                      : 'text-ochre/90 bg-ink/60 border-cream/5'
                  }`}
                >
                  <span className="text-cream/50">Rule: </span>
                  {principle.enforcement}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hairline Drafting Divider for ScrollTrigger reveal */}
      <div className="hairline-divider w-full h-[1px] bg-cream/10 origin-left will-change-transform mt-12 md:mt-16" />
    </section>
  );
}
