'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScrollContext } from '@/motion';
import type { Project } from '@/types/duality';
import { PROJECTS_DATA } from '@/data';
import {
  ChevronDown,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Target,
} from 'lucide-react';
import { TechLogoBadge } from '@/components/common/TechLogoBadge';

interface TechnicalProjectsTableProps {
  projects?: ReadonlyArray<Project>;
}

// Preferred order matching recruiter review sequence for technical systems & research
const PREFERRED_PROJECT_ORDER = [
  'proj-bci-research',
  'proj-wms',
  'proj-mgmt-dashboard',
  'proj-mobile-image-editor',
];

export default function TechnicalProjectsTable({
  projects = PROJECTS_DATA,
}: TechnicalProjectsTableProps) {
  const { lenis, scrollTo } = useSmoothScrollContext();
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter out work experience items (Swap-On & Diskominfo CMS)
  const technicalProjects = projects.filter(
    (p) => p.id !== 'proj-swap-on' && p.id !== 'proj-diskominfo-cms'
  );

  // Sort projects according to recruiter review priorities
  const sortedProjects = [...technicalProjects].sort((a, b) => {
    const idxA = PREFERRED_PROJECT_ORDER.indexOf(a.id);
    const idxB = PREFERRED_PROJECT_ORDER.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.displayOrder - b.displayOrder;
  });

  // Track expanded rows by project id (default: all collapsed on initial load)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, []);

  const toggleRow = (id: string) => {
    const isOpening = expandedId !== id;
    setExpandedId((prev) => (prev === id ? null : id));

    // Auto-focus smooth scroll to newly opened project card
    if (isOpening) {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const cardEl = cardRefs.current.get(id);
        if (!cardEl) return;

        const isReduced =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (lenis && !isReduced) {
          scrollTo(cardEl, {
            offset: -28, // ~28px framing clearance from top of viewport
            duration: 0.85,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          cardEl.scrollIntoView({
            behavior: isReduced ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      }, 80);
    }

    // Recalibrate ScrollTrigger positions after expansion transition settles
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    refreshTimeoutRef.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 380);
  };

  return (
    <section
      aria-labelledby="technical-projects-heading"
      className="w-full pt-12 pb-6 md:pt-16 md:pb-8"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-1">
            03 // PRODUCTION SYSTEMS & RESEARCH
          </div>
          <h2
            id="technical-projects-heading"
            className="font-mono text-2xl sm:text-3xl text-cream font-medium tracking-[0.06em] uppercase"
          >
            Technical Projects Matrix
          </h2>
        </div>
        <div className="font-mono text-xs text-[#8A847C] flex items-center gap-3">
          <span>HIGH-DENSITY AUDIT VIEW</span>
          <span className="text-cream/20">|</span>
          <span className="text-ochre">{sortedProjects.length} VERIFIED SYSTEMS</span>
        </div>
      </div>

      {/* ================= PROJECT ACCORDION TABLE ================= */}
      <div className="flex flex-col gap-3">
        {sortedProjects.map((project, idx) => {
          const isExpanded = expandedId === project.id;
          const primaryBenchmark = project.technical.benchmarks?.[0];
          const isResearchPaper = project.id === 'proj-bci-research';

          return (
            <div
              key={project.id}
              ref={(el) => {
                if (el) {
                  cardRefs.current.set(project.id, el);
                } else {
                  cardRefs.current.delete(project.id);
                }
              }}
              id={`project-card-${project.id}`}
              className={`project-card will-change-transform rounded-lg border transition-all duration-300 ease-out overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 ${
                isExpanded
                  ? 'bg-[#141210] border-ochre/40 shadow-xl shadow-black/40'
                  : 'bg-[#12100E] border-cream/10 hover:border-cream/30 hover:bg-[#151311]'
              }`}
            >
              {/* ================= SUMMARY ROW (CLICKABLE) ================= */}
              <button
                onClick={() => toggleRow(project.id)}
                aria-expanded={isExpanded}
                aria-controls={`panel-${project.id}`}
                className="w-full text-left p-5 md:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre/50"
              >
                {isResearchPaper ? (
                  /* ================= RESEARCH PAPER SPECIAL 2-TIER WIDE LAYOUT ================= */
                  <div className="flex flex-col gap-3.5">
                    {/* Tier 1: Wide-Span Uninterrupted Title Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <span className="font-mono text-xs text-cream/40 pt-1 select-none">
                          0{idx + 1}
                        </span>
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="font-mono text-base sm:text-lg lg:text-xl font-bold text-cream tracking-tight group-hover:text-ochre transition-colors leading-snug">
                              {project.title}
                            </h3>
                            <span className="px-2 py-0.5 rounded bg-ochre/15 text-ochre border border-ochre/30 font-mono text-[9px] tracking-wider uppercase font-semibold shrink-0">
                              IEEE ICIC 2025
                            </span>
                          </div>
                          <p className="font-sans text-xs sm:text-sm text-cream/75 leading-normal">
                            {project.subtitle}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-cream/50 pt-0.5">
                            <span className="text-ochre/90 font-medium">{project.role}</span>
                            <span>&bull;</span>
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Benchmark & Chevron on the Right */}
                      <div className="flex items-center gap-3 self-end lg:self-start shrink-0 pt-1">
                        {primaryBenchmark && (
                          <div className="inline-flex items-baseline gap-1.5 font-mono px-2.5 py-1 rounded bg-[#181614] border border-ochre/25 text-cream">
                            <span className="text-xs font-bold text-ochre">
                              {primaryBenchmark.value}
                            </span>
                            <span className="text-[10px] text-cream/70">
                              {primaryBenchmark.metric}
                            </span>
                          </div>
                        )}
                        <div
                          className={`p-1.5 rounded-full border transition-transform duration-200 ${
                            isExpanded
                              ? 'bg-ochre/20 border-ochre/40 text-ochre rotate-180'
                              : 'bg-cream/[0.03] border-cream/10 text-cream/40'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Tier 2: Sub-row for Adaptive Approach Preview & Tech Stack Tags */}
                    <div className="border-t border-cream/5 pt-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      {/* Adaptive Architectural Lead */}
                      <div className="flex-1 max-w-2xl">
                        <div className="relative min-h-[40px] flex flex-col justify-center overflow-hidden">
                          {/* State A: Collapsed Teaser */}
                          <div
                            className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                              !isExpanded
                                ? 'opacity-100 translate-y-0 relative'
                                : 'opacity-0 -translate-y-2 absolute inset-0 pointer-events-none'
                            }`}
                          >
                            <div className="font-mono text-[10px] text-cream/40 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                              <Cpu className="w-3 h-3 text-ochre/80" />
                              <span>Algorithmic Architecture // Preview</span>
                            </div>
                            <p className="font-sans text-xs text-cream/80 line-clamp-1 leading-relaxed">
                              {project.structureRead.engineeringSolution}
                            </p>
                          </div>

                          {/* State B: Expanded Active Pattern */}
                          <div
                            className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                              isExpanded
                                ? 'opacity-100 translate-y-0 relative'
                                : 'opacity-0 translate-y-2 absolute inset-0 pointer-events-none'
                            }`}
                          >
                            <div className="font-mono text-[10px] text-ochre uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-pulse" />
                              <span>Deep Learning Topology Active</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-ochre/10 border border-ochre/25 text-ochre font-mono text-[11px] tracking-wider">
                              <Layers className="w-3 h-3 text-ochre shrink-0" />
                              <span className="truncate max-w-[450px]">
                                {project.structureRead.architecturePattern || 'Hybrid GNN-Mamba Deep Learning Architecture'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tech stack logos */}
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {project.technical.stack.map((tech) => (
                          <TechLogoBadge
                            key={tech.id}
                            tech={tech.name}
                            size="sm"
                            tooltipSide="top"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ================= STANDARD 12-COLUMN GRID ROW (OTHER 5 PROJECTS) ================= */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Col 1: Index & Project Identity (Col span 4) */}
                    <div className="lg:col-span-4 flex items-start gap-3">
                      <span className="font-mono text-xs text-cream/40 pt-1">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-mono text-base sm:text-lg font-bold text-cream tracking-tight group-hover:text-ochre">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="px-1.5 py-0.5 rounded bg-ochre/15 text-ochre border border-ochre/30 font-mono text-[9px] tracking-wider uppercase">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs text-[#8A847C] line-clamp-1 mt-0.5">
                          {project.subtitle}
                        </p>
                        <div className="flex items-center gap-2 font-mono text-[11px] text-cream/50 mt-1.5">
                          <span>{project.role}</span>
                          <span>&bull;</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Adaptive Architectural Lead (Morphs from Teaser to Pattern Spec upon Expand) */}
                    <div className="lg:col-span-4 hidden md:block">
                      <div className="relative min-h-[48px] flex flex-col justify-center overflow-hidden">
                        {/* State A: Collapsed Teaser (Fast Scanning) */}
                        <div
                          className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                            !isExpanded
                              ? 'opacity-100 translate-y-0 relative'
                              : 'opacity-0 -translate-y-2 absolute inset-0 pointer-events-none'
                          }`}
                        >
                          <div className="font-mono text-[10px] text-cream/40 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Cpu className="w-3 h-3 text-ochre/80" />
                            <span>Engineering Approach // Preview</span>
                          </div>
                          <p className="font-sans text-xs text-cream/80 line-clamp-2 leading-relaxed">
                            {project.structureRead.engineeringSolution}
                          </p>
                        </div>

                        {/* State B: Expanded Active System Pattern (Eliminates Duplicate Text) */}
                        <div
                          className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                            isExpanded
                              ? 'opacity-100 translate-y-0 relative'
                              : 'opacity-0 translate-y-2 absolute inset-0 pointer-events-none'
                          }`}
                        >
                          <div className="font-mono text-[10px] text-ochre uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-pulse" />
                            <span>Architecture Specification Active</span>
                          </div>
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ochre/10 border border-ochre/25 text-ochre font-mono text-[11px] tracking-wider">
                            <Layers className="w-3 h-3 text-ochre shrink-0" />
                            <span className="truncate max-w-[280px]">
                              {project.structureRead.architecturePattern || 'Distributed Production Architecture'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Col 3: Primary Benchmark & Stack Pills (Col span 3) */}
                    <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center">
                      {primaryBenchmark ? (
                        <div className="inline-flex items-baseline gap-1.5 font-mono px-2.5 py-1 rounded bg-[#181614] border border-cream/10 text-cream">
                          <span className="text-xs font-bold text-ochre">
                            {primaryBenchmark.value}
                          </span>
                          <span className="text-[10px] text-cream/60">
                            {primaryBenchmark.metric}
                          </span>
                        </div>
                      ) : null}

                      {/* Stack summary logos */}
                      <div className="flex flex-wrap gap-1.5 mt-2 justify-start lg:justify-end items-center">
                        {project.technical.stack.slice(0, 4).map((tech) => (
                          <TechLogoBadge
                            key={tech.id}
                            tech={tech.name}
                            size="sm"
                            tooltipSide="top"
                          />
                        ))}
                        {project.technical.stack.length > 4 && (
                          <span
                            title={`${project.technical.stack.length - 4} more technologies`}
                            className="px-1.5 py-0.5 rounded bg-cream/[0.04] border border-cream/10 text-cream/50 font-mono text-[10px] h-7 flex items-center justify-center select-none"
                          >
                            +{project.technical.stack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Col 4: Chevron toggle (Col span 1) */}
                    <div className="lg:col-span-1 flex items-center justify-end">
                      <div
                        className={`p-1.5 rounded-full border transition-transform duration-200 ${
                          isExpanded
                            ? 'bg-ochre/20 border-ochre/40 text-ochre rotate-180'
                            : 'bg-cream/[0.03] border-cream/10 text-cream/40'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}
              </button>

              {/* ================= ACCORDION DRAWER WITH ARCHITECTURAL SMOOTH MOTION ================= */}
              <div
                id={`panel-${project.id}`}
                role="region"
                aria-labelledby={`heading-${project.id}`}
                className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div
                    className={`px-5 pb-6 md:px-8 md:pb-8 pt-2 border-t border-cream/10 bg-[#0E0D0C]/60 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      isExpanded
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
                      {/* Left Column: Problem & Architecture Highlights (Col span 7) */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* CHALLENGE VS ARCHITECTURAL SOLUTION GRID (Harmonized with WorkExperienceSection) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* The Challenge */}
                          <div className="p-4 rounded-lg bg-black/40 border border-cream/5 space-y-1.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-amber-400/90 uppercase mb-1">
                                <Target className="w-3.5 h-3.5 text-amber-400" />
                                <span>The Challenge</span>
                              </div>
                              <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans text-justify">
                                {project.structureRead.problemStatement}
                              </p>
                            </div>
                          </div>

                          {/* Architectural Solution */}
                          <div className="p-4 rounded-lg bg-ochre/[0.04] border border-ochre/20 space-y-1.5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-ochre uppercase mb-1">
                                <Cpu className="w-3.5 h-3.5 text-ochre" />
                                <span>Architectural Solution</span>
                              </div>
                              <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-sans font-normal text-justify">
                                {project.structureRead.engineeringSolution}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Subsystems Breakdown if available */}
                        {project.structureRead.coreSubsystems && (
                          <div>
                            <div className="font-mono text-xs text-cream/60 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-ochre" />
                              <span>Core Subsystems & Responsibilities</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {project.structureRead.coreSubsystems.map((sub, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="p-3 rounded bg-[#141210] border border-cream/5 text-xs"
                                >
                                  <div className="font-mono text-cream font-medium mb-1">
                                    {sub.name}
                                  </div>
                                  <div className="text-[#8A847C] font-sans leading-relaxed text-justify">
                                    {sub.responsibility}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Architectural Decisions & Trade-Offs */}
                        <div>
                          <div className="font-mono text-xs text-cream/60 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5 text-ochre" />
                            <span>Architectural Decisions & Trade-Offs</span>
                          </div>
                          <div className="flex flex-col gap-3">
                            {project.technical.architecturalDecisions.map((decision, dIdx) => (
                              <div
                                key={dIdx}
                                className="p-3.5 rounded bg-[#181614] border border-cream/5 text-xs font-sans"
                              >
                                <div className="font-mono text-xs font-semibold text-cream">
                                  &bull; {decision.decision}
                                </div>
                                <div className="mt-1.5 text-[#8A847C] leading-relaxed text-justify">
                                  <span className="text-cream/70 font-mono text-[11px]">Rationale: </span>
                                  {decision.rationale}
                                </div>
                                <div className="mt-1 text-ochre/80 leading-relaxed text-justify">
                                  <span className="text-ochre font-mono text-[11px]">Trade-off: </span>
                                  {decision.tradeOff}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Key Deliverables, Benchmarks, Links (Col span 5) */}
                      <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Key Deliverables & Impact */}
                        <div className="p-4 rounded bg-[#181614] border border-cream/5">
                          <div className="font-mono text-xs text-cream uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-ochre" />
                            <span>Key Deliverables & Impact</span>
                          </div>
                          <ul className="flex flex-col gap-2">
                            {project.structureRead.impactMetrics.map((metric, mIdx) => (
                              <li
                                key={mIdx}
                                className="flex items-start gap-2 text-xs font-sans text-cream/80"
                              >
                                <span className="text-ochre font-mono text-xs mt-0.5">&gt;</span>
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technical Benchmarks */}
                        {project.technical.benchmarks && project.technical.benchmarks.length > 0 && (
                          <div>
                            <div className="font-mono text-xs text-cream/60 uppercase tracking-wider mb-2.5">
                              Runtime Benchmarks
                            </div>
                            <div className="flex flex-col gap-2">
                              {project.technical.benchmarks.map((bm, bIdx) => (
                                <div
                                  key={bIdx}
                                  className="flex items-center justify-between p-2.5 rounded bg-[#141210] border border-cream/5 font-mono text-xs"
                                >
                                  <span className="text-cream/70">{bm.metric}</span>
                                  <span className="font-bold text-ochre">{bm.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Full Stack Inventory */}
                        <div>
                          <div className="font-mono text-xs text-cream/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-ochre" />
                            <span>Technology Stack</span>
                          </div>
                          <div className="flex flex-wrap gap-2 items-center">
                            {project.technical.stack.map((tech) => (
                              <TechLogoBadge
                                key={tech.id}
                                tech={tech.name}
                                size="md"
                                tooltipSide="top"
                                isCore={tech.isCore}
                              />
                            ))}
                          </div>
                        </div>

                        {/* External Verification Links */}
                        {project.links && project.links.length > 0 && (
                          <div className="pt-2">
                            <div className="font-mono text-xs text-cream/60 uppercase tracking-wider mb-2.5">
                              Verification & Artifacts
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {project.links.map((link, lIdx) => (
                                <a
                                  key={lIdx}
                                  href={link.url}
                                  target={link.isExternal ? '_blank' : undefined}
                                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181614] border border-cream/15 text-cream/90 hover:text-cream hover:border-ochre/50 font-mono text-xs transition-colors"
                                >
                                  <span>{link.label}</span>
                                  {link.isExternal ? (
                                    <ArrowUpRight className="w-3 h-3 text-ochre" />
                                  ) : (
                                    <ExternalLink className="w-3 h-3 text-ochre" />
                                  )}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hairline Drafting Divider for ScrollTrigger reveal */}
      <div className="hairline-divider w-full h-[1px] bg-cream/10 origin-left will-change-transform mt-12 md:mt-16" />
    </section>
  );
}
