'use client';

import React from 'react';
import type { WorkExperienceItem } from '@/types/structure';
import { WORK_EXPERIENCE_DATA } from '@/data';
import {
  Briefcase,
  Calendar,
  MapPin,
  Layers,
  ArrowUpRight,
  Cpu,
  Target,
} from 'lucide-react';
import { TechLogoBadge } from '@/components/common/TechLogoBadge';

interface WorkExperienceSectionProps {
  experience?: ReadonlyArray<WorkExperienceItem>;
}

export default function WorkExperienceSection({
  experience = WORK_EXPERIENCE_DATA,
}: WorkExperienceSectionProps) {
  if (!experience || experience.length === 0) return null;

  return (
    <section
      aria-labelledby="work-experience-heading"
      className="w-full pt-12 pb-6 md:pt-16 md:pb-8"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-1">
            02 // PROFESSIONAL WORK EXPERIENCE & TRACK RECORD
          </div>
          <h2
            id="work-experience-heading"
            className="font-mono text-2xl sm:text-3xl text-cream font-medium tracking-[0.06em] uppercase"
          >
            Engineering Career
          </h2>
        </div>
        <div className="font-mono text-xs text-[#8A847C] flex items-center gap-3">
          <span>VERIFIED INDUSTRY ENGAGEMENTS</span>
          <span className="text-cream/20">|</span>
          <span className="text-ochre">{experience.length} ROLES</span>
        </div>
      </div>

      {/* ================= DOSSIER CARDS GRID ================= */}
      <div className="flex flex-col gap-8">
        {experience.map((exp, idx) => (
          <article
            key={exp.id}
            id={`experience-card-${exp.id}`}
            className="group relative rounded-xl border border-cream/10 bg-[#12100E] p-6 sm:p-8 transition-all duration-300 hover:border-ochre/40 hover:bg-[#151311] hover:shadow-xl hover:shadow-black/50"
          >
            {/* Architectural Grid Corner Accents */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-xl">
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-ochre/40 group-hover:border-ochre transition-colors" />
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none overflow-hidden rounded-bl-xl">
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cream/10 group-hover:border-ochre/40 transition-colors" />
            </div>

            {/* CARD TOP META BAR */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-cream/10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-ochre/10 border border-ochre/30 text-ochre font-mono text-[11px] tracking-wider uppercase font-medium">
                    <Briefcase className="w-3 h-3 text-ochre" />
                    {exp.employmentType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cream/5 border border-cream/10 text-cream/70 font-mono text-[11px] tracking-wider">
                    <Calendar className="w-3 h-3 text-cream/50" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cream/5 border border-cream/10 text-cream/70 font-mono text-[11px] tracking-wider">
                    <MapPin className="w-3 h-3 text-cream/50" />
                    {exp.location}
                  </span>
                </div>

                <div className="pt-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-mono text-xl sm:text-2xl font-bold text-cream tracking-tight group-hover:text-ochre transition-colors">
                      {exp.role}
                    </h3>
                    {exp.projectName && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-ochre/10 border border-ochre/25 text-ochre font-mono text-xs tracking-wider">
                        {exp.projectName}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-sm sm:text-base text-cream/60 tracking-wide mt-1">
                    @ <span className="text-cream/90 font-semibold">{exp.company}</span>
                  </div>
                </div>
              </div>

              {/* External Credential / Website Link */}
              {exp.credentialUrl && (
                <div className="lg:self-start pt-1">
                  <a
                    href={exp.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cream/5 hover:bg-ochre/20 border border-cream/10 hover:border-ochre/50 text-cream/80 hover:text-ochre font-mono text-xs tracking-wider uppercase transition-all duration-200"
                  >
                    <span>{exp.credentialLabel || 'View Credentials'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </div>

            {/* EXECUTIVE SUMMARY */}
            <p className="mt-5 text-sm sm:text-base text-cream/80 leading-relaxed max-w-4xl font-sans text-justify">
              {exp.executiveSummary}
            </p>

            {/* CHALLENGE VS ARCHITECTURAL SOLUTION GRID */}
            {(exp.problemStatement || exp.engineeringSolution) && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.problemStatement && (
                  <div className="p-4 rounded-lg bg-black/40 border border-cream/5 space-y-1.5">
                    <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-amber-400/80 uppercase">
                      <Target className="w-3.5 h-3.5 text-amber-400" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans text-justify">
                      {exp.problemStatement}
                    </p>
                  </div>
                )}
                {exp.engineeringSolution && (
                  <div className="p-4 rounded-lg bg-ochre/[0.03] border border-ochre/15 space-y-1.5">
                    <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-ochre uppercase">
                      <Cpu className="w-3.5 h-3.5 text-ochre" />
                      <span>Architectural Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-sans text-justify">
                      {exp.engineeringSolution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CORE SUBSYSTEMS ARCHITECTURE */}
            {exp.coreSubsystems && exp.coreSubsystems.length > 0 && (
              <div className="mt-6">
                <div className="font-mono text-xs uppercase tracking-wider text-cream/50 mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-ochre" />
                  <span>Subsystems & Modules Delivered</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {exp.coreSubsystems.map((sub, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-black/30 border border-cream/5 flex flex-col justify-between"
                    >
                      <div className="font-mono text-xs font-semibold text-cream/90 tracking-wide mb-1">
                        {sub.name}
                      </div>
                      <p className="text-[12px] text-cream/60 leading-normal font-sans text-justify">
                        {sub.responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KEY DELIVERABLES */}
            {exp.keyDeliverables && exp.keyDeliverables.length > 0 && (
              <div className="mt-6">
                <div className="font-mono text-xs uppercase tracking-wider text-cream/50 mb-2.5">
                  Key Technical Deliverables
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-cream/70">
                  {exp.keyDeliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-ochre font-mono font-bold mt-0.5 select-none">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TECHNOLOGIES USED - MONOCHROME LOGO BADGES (§9 & User Directive) */}
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="mt-6 pt-5 border-t border-cream/5 flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs text-cream/40 uppercase tracking-wider mr-1 select-none">
                  Stack:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {exp.technologies.map((tech, tIdx) => (
                    <TechLogoBadge
                      key={tIdx}
                      tech={tech}
                      size="md"
                      tooltipSide="top"
                    />
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
