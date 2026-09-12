'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

interface StructureHeaderProps {
  onBackToThreshold?: () => void;
}

export default function StructureHeader({ onBackToThreshold }: StructureHeaderProps) {
  return (
    <header className="relative w-full border-b border-cream/10 pb-12 pt-8 md:pt-12">
      {/* ================= 1. TOP TELEMETRY & NAV SWITCHER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 text-xs font-mono text-[#8A847C]">
        {/* Top telemetry breadcrumbs */}
        <div className="flex items-center gap-2 tracking-[0.18em] uppercase text-cream/70">
          <span className="text-ochre font-semibold">STRUCTURE://</span>
          <span className="text-cream">THE SHORT READ</span>
          <span className="text-cream/30">//</span>
          <span className="text-cream/50">HIGH-SIGNAL RECRUITER DIGEST</span>
        </div>

        {/* Switcher Controls */}
        <div className="flex items-center gap-3 text-[11px] tracking-wider uppercase">
          {onBackToThreshold ? (
            <button
              onClick={onBackToThreshold}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-cream/15 bg-cream/[0.03] text-cream/70 hover:text-cream hover:border-cream/40 transition-colors"
              title="Return to Threshold Gateway (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
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
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
              <span>Threshold</span>
            </Link>
          )}

          <Link
            href="/?lens=expression"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-ochre/30 bg-ochre/[0.08] text-ochre hover:text-cream hover:bg-ochre/20 hover:border-ochre/60 transition-all"
          >
            <span>Expression</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>

      {/* ================= 2. CANDIDATE IDENTITY & FULL-WIDTH NAME ================= */}
      <div className="w-full space-y-3">
        {/* Architectural Kicker */}
        <div className="font-mono text-xs sm:text-sm tracking-[0.22em] text-ochre uppercase flex items-center gap-2">
          <span className="text-ochre font-semibold">SYS://</span>
          <span className="text-cream/90 font-medium">INFORMATICS &amp; SOFTWARE ENGINEERING</span>
          <span className="text-cream/30">//</span>
          <span className="text-cream/50">RESEARCH &amp; PRODUCTION SYSTEMS</span>
        </div>

        {/* Full-width Horizontal Name (Guaranteed Single-Line on Desktop) */}
        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[0.03em] sm:tracking-[0.04em] text-cream uppercase leading-tight sm:whitespace-nowrap">
          BAGJA ISKANDAR JAMIL
        </h1>
      </div>

      {/* ================= 3. REPOSITIONED BALANCED BIO & TELEMETRY SECTION ================= */}
      <div className="mt-8 pt-8 border-t border-cream/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Dominant Column (Col span 8): Status Beacon + Bio + Telemetry Chips */}
          <div className="lg:col-span-8 flex flex-col space-y-5">
            {/* Availability Status Beacon */}
            <div className="self-start inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-ochre/10 border border-ochre/30 text-ochre font-mono text-[11px] tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ochre opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ochre" />
              </span>
              <span>SYSTEM STATUS: AVAILABLE FOR HIRE [WEST JAVA / REMOTE READY]</span>
            </div>

            {/* Executive Bio Narrative */}
            <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#A8A29A] leading-relaxed font-normal">
              Fresh Graduate in Computer Science (<span className="text-cream font-medium">Informatika</span>) from Universitas Jenderal Achmad Yani (GPA 3.37) with proven engineering execution across cross-border fintech frontend (<span className="text-ochre font-medium">Swap-On ID-JP</span>), enterprise CMS refactoring (<span className="text-cream font-medium">Diskominfo Kota Cimahi</span>), and peer-reviewed Brain–Computer Interface research published at <span className="text-ochre font-medium">IEEE ICIC 2025</span>.
            </p>

            {/* Quick Telemetry Chips */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-cream/70">
              <span className="px-2.5 py-1 rounded bg-[#181614] border border-cream/10 flex items-center gap-1.5">
                <span className="text-ochre font-semibold">ACAD:</span> UNJANI CS &apos;25 // GPA 3.37
              </span>
              <span className="px-2.5 py-1 rounded bg-[#181614] border border-cream/10 flex items-center gap-1.5">
                <span className="text-ochre font-semibold">STACK:</span> Next.js 15 &bull; TypeScript &bull; Vue &bull; KMP
              </span>
              <span className="px-2.5 py-1 rounded bg-[#181614] border border-ochre/30 text-ochre bg-ochre/[0.04] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre shrink-0" />
                IEEE ICIC 2025 First Author
              </span>
              <span className="px-2.5 py-1 rounded bg-[#181614] border border-cream/10 flex items-center gap-1.5">
                <span className="text-ochre font-semibold">LOC:</span> Bandung Barat // Remote Ready
              </span>
            </div>
          </div>

          {/* Right Column (Col span 4): High-Signal Fast-Scan Dossier Telemetry Card */}
          <div className="lg:col-span-4 p-5 rounded-lg bg-[#141210] border border-cream/10 flex flex-col justify-between space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-cream/10 pb-3">
              <div className="flex items-center gap-2 text-cream/60 uppercase tracking-wider text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-ochre" />
                <span>CANDIDATE DOSSIER</span>
              </div>
              <div className="flex items-center gap-1.5 text-ochre text-[10px] uppercase tracking-widest font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AUTHENTIC</span>
              </div>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-cream/50 uppercase">Primary Focus:</span>
                <span className="text-cream font-medium">Software Engineering</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream/50 uppercase">Systems Depth:</span>
                <span className="text-cream font-medium">Full-Stack &amp; Research</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream/50 uppercase">Timezone:</span>
                <span className="text-cream font-medium">WIB (UTC+7) // Global Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream/50 uppercase">Data Integrity:</span>
                <span className="text-ochre font-medium">100% Resume Conforming</span>
              </div>
            </div>

            <div className="pt-2 border-t border-cream/5 flex items-center justify-between text-[10px] text-cream/40 uppercase tracking-wider">
              <span>SECURITY PROTOCOL</span>
              <span className="text-cream/60">§39 CANONICAL</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
