'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import BijLogo from '@/components/brand/BijLogo';

export interface ExpressionPreviewCardProps {
  className?: string;
  particleCount?: number;
  tag?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  href?: string;
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
}

/**
 * ExpressionPreviewCard
 *
 * Ambient light-themed cross-modality preview card located in the Structure View footer.
 * Renders an authentic Ivory/Expression aesthetic with subtle paper grain texture
 * and an organic 3-tier ambient dust field (Canvas 2D) floating gently upward.
 *
 * Performance Budget & Architecture (§40–§45):
 * - Strict Particle Budget: 18–24 particles (default: 21)
 * - Batched Draw Calls: exactly 3 ctx.fill() calls per frame (1 per tier)
 * - Viewport Culling: IntersectionObserver pauses requestAnimationFrame when card is off-screen
 * - DPR Capped at 2 per §41
 * - Reduced Motion: prefers-reduced-motion disables animation completely
 * - Tab Inactivity: visibilitychange pauses RAF to preserve 0% CPU in background
 */
export const ExpressionPreviewCard = React.memo(function ExpressionPreviewCard({
  className,
  particleCount = 21,
  tag = 'CROSS-MODALITY NAVIGATION // THE FULL STORY',
  title = 'Prefer the Complete Story?',
  description = 'Switch from this high-density technical digest to the immersive, 8-chapter scrollytelling canvas with editorial typography, kinetic atmosphere, and dialectical synthesis.',
  ctaText = 'Enter Expression Lens',
  href = '/?lens=expression',
}: ExpressionPreviewCardProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const particlesRef = useRef<DustParticle[]>([]);
  const isIntersectingRef = useRef<boolean>(false);
  const isReducedRef = useRef<boolean>(false);
  const dimsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // 1. Accessibility: Check prefers-reduced-motion (§43)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedRef.current = mediaQuery.matches;

    const handleReducedChange = (e: MediaQueryListEvent) => {
      isReducedRef.current = e.matches;
      if (isReducedRef.current) {
        stopAnimation();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (isIntersectingRef.current) {
        startAnimation();
      }
    };
    mediaQuery.addEventListener('change', handleReducedChange);

    // 2. Initialize Particles within 18–24 budget
    const count = Math.max(18, Math.min(24, particleCount));
    const initialParticles: DustParticle[] = [];

    // Helper to configure canvas dimensions
    const setupCanvas = (w: number, h: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dimsRef.current = { width: w, height: h, dpr };

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed particle positions if uninitialized
      if (initialParticles.length === 0) {
        for (let i = 0; i < count; i++) {
          const tier: 0 | 1 | 2 = i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2;
          const radius =
            tier === 0
              ? 0.7 + Math.random() * 0.35
              : tier === 1
              ? 1.1 + Math.random() * 0.45
              : 1.6 + Math.random() * 0.55;
          const speedY = -(
            tier === 0
              ? 0.12 + Math.random() * 0.14
              : tier === 1
              ? 0.18 + Math.random() * 0.16
              : 0.24 + Math.random() * 0.2
          );

          initialParticles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius,
            speedY,
            swayAmp: 4 + Math.random() * 10,
            swayFreq: 0.006 + Math.random() * 0.008,
            swayOffset: Math.random() * Math.PI * 2,
            tier,
          });
        }
        particlesRef.current = initialParticles;
      }
    };

    // 3. Resize Observer on Card container
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setupCanvas(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Initial setup from bounding client rect
    const initialRect = container.getBoundingClientRect();
    if (initialRect.width > 0 && initialRect.height > 0) {
      setupCanvas(initialRect.width, initialRect.height);
    }

    // 4. Batched Render Loop (Single batch per tier = 3 ctx.fill calls per frame)
    const tick = () => {
      const { width, height } = dimsRef.current;
      if (width === 0 || height === 0) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      timeRef.current += 1;
      const time = timeRef.current;
      const particles = particlesRef.current;

      const tier0: DustParticle[] = [];
      const tier1: DustParticle[] = [];
      const tier2: DustParticle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;

        // Wrap around vertically
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        if (p.tier === 0) tier0.push(p);
        else if (p.tier === 1) tier1.push(p);
        else tier2.push(p);
      }

      // Tier 0: Far, soft organic brown
      if (tier0.length > 0) {
        ctx.fillStyle = 'rgba(75, 52, 38, 0.25)';
        ctx.beginPath();
        for (let i = 0; i < tier0.length; i++) {
          const p = tier0[i];
          const cx = p.x + p.swayAmp * Math.sin(time * p.swayFreq + p.swayOffset);
          ctx.moveTo(cx + p.radius, p.y);
          ctx.arc(cx, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Tier 1: Mid, rich espresso brown
      if (tier1.length > 0) {
        ctx.fillStyle = 'rgba(58, 38, 26, 0.38)';
        ctx.beginPath();
        for (let i = 0; i < tier1.length; i++) {
          const p = tier1[i];
          const cx = p.x + p.swayAmp * Math.sin(time * p.swayFreq + p.swayOffset);
          ctx.moveTo(cx + p.radius, p.y);
          ctx.arc(cx, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Tier 2: Near, deep dark espresso
      if (tier2.length > 0) {
        ctx.fillStyle = 'rgba(42, 26, 16, 0.55)';
        ctx.beginPath();
        for (let i = 0; i < tier2.length; i++) {
          const p = tier2[i];
          const cx = p.x + p.swayAmp * Math.sin(time * p.swayFreq + p.swayOffset);
          ctx.moveTo(cx + p.radius, p.y);
          ctx.arc(cx, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (!isReducedRef.current && isIntersectingRef.current && !rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    const stopAnimation = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    // 5. Viewport Culling via IntersectionObserver (§42)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !isReducedRef.current && document.visibilityState === 'visible') {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 6. Tab Visibility Handler (0% CPU when tab hidden)
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === 'visible' &&
        isIntersectingRef.current &&
        !isReducedRef.current
      ) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup Lifecycle (§45)
    return () => {
      stopAnimation();
      mediaQuery.removeEventListener('change', handleReducedChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      resizeObserver.disconnect();
      particlesRef.current = [];
    };
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-xl border border-[#D6CEC2] bg-ivory p-8 sm:p-10 shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-terracotta/60 hover:shadow-2xl hover:shadow-black/50 will-change-transform mb-12',
        className
      )}
    >
      {/* 1. Contemporary Editorial Paper Texture (SVG Fine Grain Noise) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='previewPaperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23previewPaperNoise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* 2. Microscopic Tonal Variation / Warm Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 80% 30%, rgba(184, 90, 58, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* 3. Organic Ambient Dust Particles (Canvas 2D, 18–24 particles) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* 4. High-Contrast Editorial Content Layer */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col max-w-2xl">
          {/* Tag: Terracotta / Ochre accent in editorial Cormorant Garamond */}
          <div className="font-serif italic text-xs sm:text-sm font-medium text-terracotta tracking-wider mb-2 flex items-center gap-2.5">
            <BijLogo variant="expression" size="xs" withContainer />
            <span>{tag}</span>
          </div>

          {/* Headline: Deep Charcoal (#141210) Monumental Cormorant Garamond Serif (Matching Threshold Light / Expression Theme) */}
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-light tracking-wide uppercase leading-tight">
            {title}
          </h3>

          {/* Body: High-legibility warm neutral (#5C554E) */}
          <p className="font-sans text-xs sm:text-sm text-[#5C554E] mt-2 leading-relaxed text-justify">
            {description}
          </p>
        </div>

        {/* CTA: Deep Charcoal Pill Button with Editorial Serif Typography */}
        <Link
          href={href}
          className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#141210] text-[#EDE8DF] font-serif text-sm font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-black/10 shrink-0 self-start md:self-auto"
        >
          <span className="font-serif tracking-widest">{ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-cream/90 group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
});

export default ExpressionPreviewCard;
