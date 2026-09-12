'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StructureHeaderProps {
  onBackToThreshold?: () => void;
}

export default function StructureHeader({ onBackToThreshold }: StructureHeaderProps) {
  return (
    <header className="relative w-full border-b border-cream/10 pb-12 pt-8 md:pt-12">
      {/* ================= TOP TELEMETRY & NAV BAR ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 text-xs font-mono text-[#8A847C]">
        {/* Breadcrumbs telemetry */}
        <div className="flex items-center gap-2 tracking-[0.18em] uppercase text-cream/70">
          <span className="text-ochre">SYS://</span>
          <span>BAGJA ISKANDAR JAMIL</span>
          <span className="text-cream/30">//</span>
          <span className="text-cream/50">INFORMATICS & SOFTWARE ENGINEERING</span>
        </div>

        {/* Switcher Controls */}
        <div className="flex items-center gap-3 text-[11px] tracking-wider uppercase">
          {onBackToThreshold ? (
            <button
              onClick={onBackToThreshold}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-cream/15 bg-cream/[0.03] text-cream/70 hover:text-cream hover:border-cream/40 transition-colors"
              title="Return to Threshold Gateway (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Threshold</span>
              <kbd className="hidden md:inline-block ml-1 px-1 py-0.2 rounded bg-cream/10 text-[9px] text-cream/60">
                ESC
              </kbd>
            </button>
          ) : (
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-cream/15 bg-cream/[0.03] text-cream/70 hover:text-cream hover:border-cream/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Threshold</span>
            </Link>
          )}

          <Link
            href="/?lens=expression"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-ochre/30 bg-ochre/[0.08] text-ochre hover:text-cream hover:bg-ochre/20 hover:border-ochre/60 transition-all"
          >
            <span>Expression</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* ================= AVAILABILITY STATUS BEACON ================= */}
      <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-ochre/10 border border-ochre/30 text-ochre font-mono text-[11px] tracking-wider uppercase mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ochre opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ochre" />
        </span>
        <span>SYSTEM STATUS: AVAILABLE FOR HIRE [WEST JAVA / REMOTE]</span>
      </div>

      {/* ================= HERO EDITORIAL TITLE & TAGLINE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 flex flex-col">
          <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-3 flex items-center gap-2">
            <span>STRUCTURE</span>
            <span className="text-cream/30">//</span>
            <span className="text-cream/70">THE SHORT READ</span>
          </div>
          <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-cream tracking-[0.06em] uppercase leading-[1.05]">
            BAGJA ISKANDAR JAMIL
          </h1>
        </div>

        {/* ================= EXECUTIVE BIO SUMMARY ================= */}
        <div className="lg:col-span-5 flex flex-col justify-end">
          <p className="font-sans text-sm md:text-base text-[#8A847C] leading-relaxed">
            Fresh Graduate in Computer Science (<span className="text-cream">Informatika</span>) from Universitas Jenderal Achmad Yani (GPA 3.37) with proven engineering execution across cross-border fintech frontend (<span className="text-ochre">Swap-On ID-JP</span>), enterprise CMS refactoring (<span className="text-cream">Diskominfo Kota Cimahi</span>), and peer-reviewed Brain–Computer Interface research published at <span className="text-ochre">IEEE ICIC 2025</span>.
          </p>

          {/* Quick Telemetry Chips */}
          <div className="flex flex-wrap gap-2 mt-5 font-mono text-[11px] text-cream/70">
            <span className="px-2.5 py-1 rounded bg-[#181614] border border-cream/10">
              UNJANI CS &apos;25 // GPA 3.37
            </span>
            <span className="px-2.5 py-1 rounded bg-[#181614] border border-cream/10">
              Next.js 15 &bull; TypeScript &bull; Vue
            </span>
            <span className="px-2.5 py-1 rounded bg-[#181614] border border-cream/10 text-ochre">
              IEEE ICIC 2025 Author
            </span>
            <span className="px-2.5 py-1 rounded bg-[#181614] border border-cream/10">
              Bandung Barat // Remote Ready
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
