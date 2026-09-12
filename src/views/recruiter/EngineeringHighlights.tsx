'use client';

import React from 'react';
import type { EngineeringHighlightsRollup } from '@/types/duality';
import { ENGINEERING_HIGHLIGHTS } from '@/data';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

interface EngineeringHighlightsProps {
  highlights?: EngineeringHighlightsRollup;
}

export default function EngineeringHighlights({
  highlights = ENGINEERING_HIGHLIGHTS,
}: EngineeringHighlightsProps) {
  const { benchmarkCards, corePrinciples, title, subtitle } = highlights;

  return (
    <section
      aria-labelledby="engineering-highlights-heading"
      className="w-full pt-12 pb-6 md:pt-16 md:pb-8"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-1">
            01 // SYSTEM METRICS & BENCHMARKS
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
        {benchmarkCards.map((card, idx) => (
          <div
            key={card.id}
            className="group relative flex flex-col justify-between p-6 rounded-lg bg-[#141210] border border-cream/10 hover:border-ochre/50 hover:bg-[#181512] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/70 cursor-default will-change-transform h-full"
          >
            {/* Card Header: Index & Standard */}
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-cream/5 text-[11px] font-mono min-h-[38px]">
              <span className="text-cream/40">0{idx + 1}</span>
              <span className="px-2 py-0.5 rounded bg-cream/[0.04] text-ochre/90 border border-ochre/20 text-[10px] tracking-wider uppercase">
                {card.verifiedStandard}
              </span>
            </div>

            {/* Metric Value & Unit */}
            <div className="py-5 flex-1 flex flex-col justify-start">
              <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1 font-mono min-h-[44px]">
                <span className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-cream group-hover:text-ochre transition-colors duration-300">
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
              <p className="font-sans text-xs text-[#8A847C] mt-2.5 leading-relaxed line-clamp-3">
                {card.description}
              </p>
            </div>

            {/* Metric Context */}
            <div className="pt-3.5 border-t border-cream/5 flex items-center justify-between gap-2 text-[11px] font-mono text-cream/50 min-h-[44px]">
              <div className="flex items-start gap-2 min-w-0">
                <span className="text-ochre/60 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0 pt-0.5">&gt;</span>
                <span className="line-clamp-2">{card.context}</span>
              </div>
              {card.linkUrl && (
                <a
                  href={card.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ochre hover:text-cream transition-colors shrink-0 ml-1 py-1 px-2 rounded bg-ochre/10 border border-ochre/25 text-[10px] tracking-wider uppercase font-medium"
                >
                  <span>{card.linkText || 'Verify'}</span>
                  <ArrowUpRight className="w-3 h-3 text-ochre" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= CORE ARCHITECTURAL PRINCIPLES ================= */}
      <div className="mt-8 p-6 sm:p-7 rounded-lg bg-[#181614]/70 border border-cream/10">
        <div className="flex items-center gap-2 mb-6 font-mono text-xs tracking-wider uppercase text-ochre">
          <ShieldCheck className="w-4 h-4" />
          <span>Non-Negotiable Engineering Invariants</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {corePrinciples.map((principle, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-lg bg-[#141210] border border-cream/10 hover:border-ochre/40 hover:bg-[#181512] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:shadow-black/60 flex flex-col justify-between h-full will-change-transform"
            >
              <div>
                <h4 className="font-mono text-xs font-semibold text-cream uppercase group-hover:text-ochre transition-colors duration-200">
                  {idx + 1}. {principle.title}
                </h4>
                <p className="font-sans text-xs text-[#8A847C] leading-relaxed mt-2.5">
                  {principle.premise}
                </p>
              </div>
              <div className="font-mono text-[10px] text-ochre/90 mt-5 bg-ink/60 p-2.5 rounded border border-cream/5">
                <span className="text-cream/50">Rule: </span>
                {principle.enforcement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hairline Drafting Divider for ScrollTrigger reveal */}
      <div className="hairline-divider w-full h-[1px] bg-cream/10 origin-left will-change-transform mt-12 md:mt-16" />
    </section>
  );
}
