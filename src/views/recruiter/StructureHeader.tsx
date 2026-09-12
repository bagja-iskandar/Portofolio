'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import BijLogo from '@/components/brand/BijLogo';

interface StructureHeaderProps {
  onBackToThreshold?: () => void;
}

export default function StructureHeader({ onBackToThreshold }: StructureHeaderProps) {
  return (
    <header className="relative w-full border-b border-cream/10 pb-12 pt-8 md:pt-12">
      {/* ================= 1. TOP TELEMETRY & NAV SWITCHER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 text-xs font-mono text-[#8A847C]">
        {/* Top telemetry breadcrumbs */}
        <div className="flex items-center gap-3 tracking-[0.18em] uppercase text-cream/70">
          <Link href="/" title="Return to Gateway" className="group shrink-0">
            <BijLogo variant="structure" size={24} withContainer />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-ochre font-semibold">STRUCTURE://</span>
            <span className="text-cream">THE SHORT READ</span>
            <span className="text-cream/30">//</span>
            <span className="text-cream/50">HIGH-SIGNAL RECRUITER DIGEST</span>
          </div>
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

      {/* ================= 3. BALANCED 7:5 GRID (BIO & ARCHITECTURAL DOSSIER) ================= */}
      <div className="mt-8 pt-8 border-t border-cream/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (Col span 7): Status Beacon + High-Readability Bio Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Availability Status Beacon */}
            <div className="self-start inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-ochre/10 border border-ochre/30 text-ochre font-mono text-[11px] tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ochre opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ochre" />
              </span>
              <span>SYSTEM STATUS: AVAILABLE FOR HIRE [WEST JAVA / REMOTE READY]</span>
            </div>

            {/* Executive Bio Narrative with Editorial Hierarchy */}
            <p className="font-sans text-sm sm:text-base md:text-[18px] text-[#A8A29A] leading-[1.8] font-normal text-justify">
              Fresh Graduate in Computer Science (<span className="text-cream font-medium">Informatika</span>) from Universitas Jenderal Achmad Yani (GPA 3.37) with proven engineering execution across cross-border fintech frontend (<span className="text-ochre font-medium">Swap-On ID-JP</span>), enterprise CMS refactoring (<span className="text-cream font-medium">Diskominfo Kota Cimahi</span>), and peer-reviewed Brain–Computer Interface research published at <span className="text-ochre font-medium">IEEE ICIC 2025</span>.
            </p>
          </div>

          {/* Right Column (Col span 5): Architectural Engineering Dossier Panel */}
          <div className="lg:col-span-5 relative overflow-hidden group p-6 rounded-lg bg-[#100E0C] border border-cream/15 transition-colors hover:border-cream/25 flex flex-col justify-between">
            {/* Dossier Header */}
            <div className="flex items-center justify-between border-b border-cream/10 pb-3 mb-1">
              <div className="flex items-center gap-2 text-cream/60 font-mono text-[11px] uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-ochre" />
                <span>CANDIDATE DOSSIER</span>
              </div>
              <div className="flex items-center gap-1.5 text-ochre font-mono text-[10px] uppercase tracking-widest font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AUTHENTIC</span>
              </div>
            </div>

            {/* Dossier Data Rows */}
            <div className="divide-y divide-cream/5">
              <div className="flex items-center justify-between py-2.5 border-b border-cream/5 group/row hover:bg-cream/[0.02] hover:px-2 transition-all duration-300">
                <span className="font-mono text-[11px] text-cream/40 uppercase tracking-wider">Primary Focus</span>
                <span className="font-mono text-[11px] text-cream/90 font-medium text-right">Software Engineering</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-cream/5 group/row hover:bg-cream/[0.02] hover:px-2 transition-all duration-300">
                <span className="font-mono text-[11px] text-cream/40 uppercase tracking-wider">Systems Depth</span>
                <span className="font-mono text-[11px] text-cream/90 font-medium text-right">Full-Stack &amp; Research</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-cream/5 group/row hover:bg-cream/[0.02] hover:px-2 transition-all duration-300">
                <span className="font-mono text-[11px] text-cream/40 uppercase tracking-wider">Timezone</span>
                <span className="font-mono text-[11px] text-cream/90 font-medium text-right">WIB (UTC+7) // Global Ready</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-cream/5 group/row hover:bg-cream/[0.02] hover:px-2 transition-all duration-300">
                <span className="font-mono text-[11px] text-cream/40 uppercase tracking-wider">Data Integrity</span>
                <span className="font-mono text-[11px] text-ochre font-medium text-right">100% Resume Conforming</span>
              </div>
            </div>

            {/* Dossier Footer */}
            <div className="pt-3 mt-1 flex items-center justify-between text-[10px] text-cream/40 uppercase tracking-wider font-mono">
              <span>SECURITY PROTOCOL</span>
              <span className="text-cream/70 font-semibold">§39 CANONICAL</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
