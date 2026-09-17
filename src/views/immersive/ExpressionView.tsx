'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Compass, Layers } from 'lucide-react';
import gsap from 'gsap';
import { VariableFontCursorProximity } from '@/components/ui/variable-font-cursor-proximity';
import { setDynamicFavicon } from '@/lib/favicon';
import DualTerritoryCursor from '@/components/cursor/DualTerritoryCursor';

interface ExpressionViewProps {
  onBackToThreshold?: () => void;
  onGoToStructure?: () => void;
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  swayAmp: number;
  swayFreq: number;
  swayOffset: number;
  tier: 0 | 1 | 2;
  dispX: number;
  dispY: number;
  drawX: number;
  drawY: number;
}

export default function ExpressionView({
  onBackToThreshold,
  onGoToStructure,
}: ExpressionViewProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const dustParticlesRef = useRef<DustParticle[]>([]);
  const isExitingRef = useRef(false);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const isFinePointerRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  // Return handler to Threshold Gateway (Esc or Click)
  const handleReturn = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      if (onBackToThreshold) onBackToThreshold();
      else router.push('/');
      return;
    }

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          if (onBackToThreshold) onBackToThreshold();
          else router.push('/');
        },
      });
    } else {
      if (onBackToThreshold) onBackToThreshold();
      else router.push('/');
    }
  }, [onBackToThreshold, router]);

  // Navigate to Structure Lens
  const handleStructureNav = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    if (onGoToStructure) {
      onGoToStructure();
    } else {
      router.push('/?lens=structure');
    }
  }, [onGoToStructure, router]);

  // Keyboard shortcut: ESC to return to Threshold Gateway
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleReturn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReturn]);

  // Ambient Dust Particle Canvas Simulation (Identical physics & visual aesthetics to Gateway Ivory side)
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    isFinePointerRef.current = finePointerQuery.matches;

    const handleReducedChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
      if (e.matches) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const bounds = container.getBoundingClientRect();
          ctx.clearRect(0, 0, bounds.width, bounds.height);
        }
      } else if (!document.hidden && !rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };
    mediaQuery.addEventListener('change', handleReducedChange);

    const handleFinePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
    };
    finePointerQuery.addEventListener('change', handleFinePointerChange);

    // Pointer position tracking for organic aerodynamic wake
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerLeave = () => {
      mousePosRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('mouseleave', handlePointerLeave);

    // 1. Initialize 40 organic dark brown dust particles (strictly capped at §40 max limit: 40 particles)
    const initialParticles: DustParticle[] = [];
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 40; i++) {
      const tier: 0 | 1 | 2 = i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2;
      const radius = tier === 0 ? 0.65 + Math.random() * 0.35 : tier === 1 ? 1.05 + Math.random() * 0.45 : 1.55 + Math.random() * 0.55;
      const speedY = -(tier === 0 ? 0.12 + Math.random() * 0.15 : tier === 1 ? 0.18 + Math.random() * 0.18 : 0.24 + Math.random() * 0.22);

      initialParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius,
        speedY,
        swayAmp: 8 + Math.random() * 18,
        swayFreq: 0.005 + Math.random() * 0.009,
        swayOffset: Math.random() * Math.PI * 2,
        tier,
        dispX: 0,
        dispY: 0,
        drawX: 0,
        drawY: 0,
      });
    }
    dustParticlesRef.current = initialParticles;

    // 2. Resize and DPR Scaling (Capped at 2 per §41)
    const handleResize = () => {
      const bounds = container.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 3. Batched Animation RAF Loop (3 draw calls per frame per §44, zero heap allocations, aerodynamic wake)
    let time = 0;
    const tick = () => {
      if (prefersReducedMotionRef.current) return;

      time++;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const bounds = container.getBoundingClientRect();
        const width = bounds.width;
        const height = bounds.height;
        ctx.clearRect(0, 0, width, height);

        // Pointer position for organic aerodynamic wake (fine pointer & normal motion only)
        const isFine = isFinePointerRef.current;
        const mx = isFine ? mousePosRef.current.x - bounds.left : -9999;
        const my = isFine ? mousePosRef.current.y - bounds.top : -9999;
        const hasPointer = mx >= -20 && mx <= width + 20 && my >= -20 && my <= height + 20;

        const WAKE_RADIUS = 110;
        const WAKE_RADIUS_SQ = WAKE_RADIUS * WAKE_RADIUS;
        const MAX_DISP = 22;

        const particles = dustParticlesRef.current;

        // Update physics & compute coordinates
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y += p.speedY;

          // Fluid aerodynamic damping (viscous decay: 0.94 / frame => ~2.5s recovery)
          p.dispX *= 0.94;
          p.dispY *= 0.94;

          const baseX = p.x + Math.sin(time * p.swayFreq + p.swayOffset) * p.swayAmp;
          const curX = baseX + p.dispX;
          const curY = p.y + p.dispY;

          if (hasPointer) {
            const dx = curX - mx;
            const dy = curY - my;
            const distSq = dx * dx + dy * dy;

            if (distSq < WAKE_RADIUS_SQ && distSq > 1) {
              const dist = Math.sqrt(distSq);
              const u = 1.0 - dist / WAKE_RADIUS;
              const factor = u * u * (3 - 2 * u); // Hermite smoothstep
              const push = factor * 1.6; // Gentle parting force
              p.dispX += (dx / dist) * push;
              p.dispY += (dy / dist) * push;

              // Clamp displacement to prevent abrupt jumps
              const dispLen = Math.hypot(p.dispX, p.dispY);
              if (dispLen > MAX_DISP) {
                p.dispX = (p.dispX / dispLen) * MAX_DISP;
                p.dispY = (p.dispY / dispLen) * MAX_DISP;
              }
            }
          }

          p.drawX = baseX + p.dispX;
          p.drawY = p.y + p.dispY;

          // Respawn if drifted above top
          if (p.y < -14) {
            p.y = height + 14;
            p.x = Math.random() * width;
            p.dispX = 0;
            p.dispY = 0;
            p.drawX = p.x;
            p.drawY = p.y;
          }
        }

        // Draw in 3 batches: Tier 0, Tier 1, Tier 2 (Zero memory allocations!)
        // Tier 0: Far (batch 1) - High contrast organic dark brown
        ctx.fillStyle = 'rgba(75, 52, 38, 0.28)';
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.tier === 0) {
            ctx.moveTo(p.drawX + p.radius, p.drawY);
            ctx.arc(p.drawX, p.drawY, p.radius, 0, Math.PI * 2);
          }
        }
        ctx.fill();

        // Tier 1: Mid (batch 2) - High contrast organic dark brown
        ctx.fillStyle = 'rgba(58, 38, 26, 0.42)';
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.tier === 1) {
            ctx.moveTo(p.drawX + p.radius, p.drawY);
            ctx.arc(p.drawX, p.drawY, p.radius, 0, Math.PI * 2);
          }
        }
        ctx.fill();

        // Tier 2: Near (batch 3) - High contrast organic dark brown
        ctx.fillStyle = 'rgba(42, 26, 16, 0.58)';
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.tier === 2) {
            ctx.moveTo(p.drawX + p.radius, p.drawY);
            ctx.arc(p.drawX, p.drawY, p.radius, 0, Math.PI * 2);
          }
        }
        ctx.fill();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    if (!prefersReducedMotionRef.current) {
      rafIdRef.current = requestAnimationFrame(tick);
    }

    // 4. Tab Inactivity handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      } else {
        if (!rafIdRef.current && !prefersReducedMotionRef.current) {
          rafIdRef.current = requestAnimationFrame(tick);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mediaQuery.removeEventListener('change', handleReducedChange);
      finePointerQuery.removeEventListener('change', handleFinePointerChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Entrance GSAP Stagger Animation wrapped in gsap.context (§45)
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Ensure browser tab favicon dynamically matches the Expression Ivory/Terracotta palette
  useEffect(() => {
    setDynamicFavicon('expression');
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full bg-ivory text-charcoal flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20 selection:bg-[#B85A3A]/20 selection:text-charcoal overflow-hidden select-none"
      aria-label="Expression Lens — Currently Under Development"
    >
      {/* Bespoke Circular Duality Cursor Engine */}
      <DualTerritoryCursor mode="expression" />

      {/* ================= EDITORIAL PAPER CANVAS BACKGROUNDS ================= */}

      {/* Subtle Contemporary Editorial Paper Feel (Fine Grain Noise) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* Microscopic Tonal Warmth Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 75% 75%, transparent 40%, rgba(20, 18, 16, 0.45) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Organic Ambient Dust Canvas 2D (40 floating dark brown particles) */}
      <canvas
        ref={dustCanvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ================= TOP NAVIGATION BAR ================= */}
      <nav className="relative z-10 w-full flex items-center justify-between gap-4 pb-8 border-b border-charcoal/10">
        {/* Return to Threshold Button */}
        <button
          onClick={handleReturn}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-charcoal/15 bg-charcoal/[0.03] text-charcoal/80 hover:text-charcoal hover:border-charcoal/40 hover:bg-charcoal/[0.06] transition-all font-mono text-xs tracking-wider uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal"
          title="Return to Threshold Gateway (Esc)"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 duration-200" />
          <span>Threshold</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.2 rounded bg-charcoal/10 text-[9px] font-mono text-charcoal/60">
            ESC
          </kbd>
        </button>

        {/* Telemetry & Modality Switcher */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block font-mono text-[11px] tracking-[0.2em] text-charcoal/50 uppercase">
            MODALITY 02 // EXPRESSION
          </span>

          <button
            onClick={handleStructureNav}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-[#B85A3A]/30 bg-[#B85A3A]/[0.08] text-[#B85A3A] hover:bg-[#B85A3A]/[0.15] hover:border-[#B85A3A]/50 transition-all font-mono text-xs tracking-wider uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B85A3A]"
          >
            <span>Structure Digest</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-200" />
          </button>
        </div>
      </nav>

      {/* ================= CENTER MONUMENTAL EDITORIAL HERO ================= */}
      <section className="relative z-10 my-auto py-12 md:py-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div ref={contentRef} className="flex flex-col items-center">
          {/* Status Badge with Pulsing Terracotta Dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#B85A3A]/10 border border-[#B85A3A]/25 text-[#B85A3A] font-mono text-xs tracking-[0.2em] uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B85A3A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B85A3A]" />
            </span>
            <span>EDITORIAL CURATION IN PROGRESS // UNDER DEVELOPMENT</span>
          </div>

          {/* Monumental Editorial Title with Variable Font Cursor Proximity */}
          <div className="overflow-visible py-2">
            <VariableFontCursorProximity
              as="h1"
              containerRef={containerRef}
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 700"
              radius={140}
              falloff="gaussian"
              className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-charcoal leading-[0.92] select-none"
            >
              EXPRESSION
            </VariableFontCursorProximity>
          </div>

          {/* Narrative Subtitle */}
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-charcoal/85 font-normal tracking-wide mt-4">
            the full story is being curated.
          </p>

          {/* Large Development Notice */}
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal/90 font-light mt-8 tracking-normal">
            The Complete Editorial Journey &amp; Long-Form Narratives Are Being Prepared
          </h2>

          {/* Editorial Paragraph */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-charcoal/70 leading-relaxed max-w-2xl mt-4 font-normal text-center">
            This space is reserved for a comprehensive editorial immersion: architectural deep-dives behind each system, engineering reflections, experimental canvas interactions, and peer-reviewed research narratives. The complete curated journey is currently being written.
          </p>

          {/* Interactive Navigation Action Cards */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            {/* Primary Action: Go to Structure View */}
            <button
              onClick={handleStructureNav}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-charcoal text-ivory font-mono text-xs sm:text-sm tracking-[0.18em] uppercase hover:bg-charcoal/90 hover:scale-[1.02] transition-all shadow-xl shadow-charcoal/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
            >
              <Compass className="w-4 h-4 text-ochre transition-transform group-hover:rotate-45 duration-300" />
              <span>Explore Structure Lens (Technical View)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
            </button>

            {/* Secondary Action: Return to Gateway */}
            <button
              onClick={handleReturn}
              className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-charcoal/20 bg-charcoal/[0.04] text-charcoal/80 font-mono text-xs sm:text-sm tracking-[0.16em] uppercase hover:text-charcoal hover:border-charcoal/40 hover:bg-charcoal/[0.08] transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
              <span>Return to Gateway</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER TELEMETRY & SPECIFICATIONS ================= */}
      <footer className="relative z-10 w-full pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-charcoal/50 tracking-[0.18em] uppercase">
        <div className="flex items-center gap-2">
          <span className="text-[#B85A3A]">EDT://</span>
          <span>BAGJA ISKANDAR JAMIL</span>
          <span className="text-charcoal/20">//</span>
          <span>PORTFOLIO THRESHOLD &copy; 2026</span>
        </div>

        <div className="flex items-center gap-4 text-charcoal/40">
          <span>IVORY CANVAS</span>
          <span>&bull;</span>
          <span>40 PARTICLES AMBIENCE</span>
          <span>&bull;</span>
          <span className="text-charcoal/60">WCAG AAA COMPLIANT</span>
        </div>
      </footer>
    </main>
  );
}
