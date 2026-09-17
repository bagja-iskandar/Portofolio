'use client';

import React, { useEffect, useRef } from 'react';

export interface DualTerritoryCursorProps {
  /**
   * 'dynamic': Computes territory on the fly based on diagonal seam k in ThresholdGateway
   * 'structure': Locked to Structure territory (Ochre Gold, CAD precision, luminous blinking beacon)
   * 'expression': Locked to Expression territory (Charcoal Ink, organic wavy/undulating contour)
   */
  mode: 'dynamic' | 'structure' | 'expression';
  /**
   * Ref to dynamic split k in ThresholdGateway (defaults to 1.0)
   */
  kRef?: React.RefObject<{ current: number; target: number }>;
}

export default function DualTerritoryCursor({ mode, kRef }: DualTerritoryCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility & Touch Device Guard (§43)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Hide native OS cursor via body class while custom cursor is active
    document.body.classList.add('has-custom-cursor');

    // 2. Pre-allocated mutable state buffer (Zero Heap Allocation in RAF Loop)
    const mouse = { x: -9999, y: -9999 };

    let isVisible = false;
    let isHovered = false;
    let isClicked = false;
    let isTextInput = false;

    let scale = 1.0;
    let targetScale = 1.0;

    let rafId: number | null = null;

    // 3. Pointer event listeners
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) {
        isVisible = true;
      }
    };

    const onPointerDown = () => {
      isClicked = true;
    };

    const onPointerUp = () => {
      isClicked = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    // Interactive element detection via event delegation
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input[type="button"], input[type="submit"], .cursor-pointer, [data-cursor-interactive]'
      ) as HTMLElement | null;

      const textEl = target.closest('input[type="text"], input[type="email"], input[type="search"], textarea') as HTMLElement | null;

      if (textEl) {
        isTextInput = true;
        isHovered = false;
        return;
      } else {
        isTextInput = false;
      }

      isHovered = !!interactive;
    };

    const onPointerOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('a, button, [role="button"], input[type="button"], input[type="submit"], .cursor-pointer, [data-cursor-interactive]')) {
        isHovered = false;
      }
      if (!related || !related.closest('input[type="text"], input[type="email"], input[type="search"], textarea')) {
        isTextInput = false;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // 4. Pre-calculated geometry points buffer (N = 32 points)
    const N = 32;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < N; i++) {
      pts.push({ x: 0, y: 0 });
    }

    // 5. Master 120 FPS Tick Loop
    const tick = (now: number) => {
      if (svgRef.current && pathRef.current && dotRef.current) {
        if (!isVisible || mouse.x < -100 || isTextInput) {
          svgRef.current.style.opacity = '0';
          dotRef.current.style.opacity = '0';
        } else {
          // Determine Territory Parameter tau in [0, 1]
          // tau = 0: 100% Structure (Dark Ink Obsidian)
          // tau = 1: 100% Expression (Paper Ivory)
          let tau = 0;
          if (mode === 'structure') {
            tau = 0;
          } else if (mode === 'expression') {
            tau = 1;
          } else {
            // Dynamic diagonal seam in Threshold Gateway
            const W = window.innerWidth;
            const H = window.innerHeight;
            const kVal = kRef?.current?.current ?? 1.0;
            const sum = mouse.x / W + mouse.y / H;
            const invHypot = (W * H) / Math.hypot(W, H);
            const dSigned = (sum - kVal) * invHypot;
            const DELTA = 48; // Smooth transition zone width in px
            const xi = Math.max(0, Math.min(1, dSigned / (2 * DELTA) + 0.5));
            tau = xi * xi * (3 - 2 * xi); // Hermite smoothstep
          }

          const structWeight = 1 - tau;

          // A. Scale state (Hover expansion & Click implosion)
          if (isClicked) {
            targetScale = 0.72; // Tactile click implosion
          } else if (isHovered) {
            // Expansion: 1.35x in Structure, 1.45x bloom in Expression
            targetScale = 1.35 * structWeight + 1.45 * tau;
          } else {
            targetScale = 1.0;
          }

          const scaleLerp = isClicked ? 0.35 : 0.18;
          scale += (targetScale - scale) * scaleLerp;

          // B. Base Outer Radius: 19px in Structure (38px dia), 21px in Expression (42px dia)
          const baseRadius = (19 * structWeight + 21 * tau) * scale;

          // C. Sisi Expression: Subtle Organic Liquid Meniscus (Gelombang Halus & Tenang)
          // Gentle micro-undulation (max ~1.5px) with low harmonic frequencies for an elegant liquid surface
          for (let i = 0; i < N; i++) {
            const phi = (i * 2 * Math.PI) / N;
            let wave = 0;
            if (tau > 0.01 && !isReducedMotion) {
              wave = (
                Math.sin(3 * phi + now * 0.0014) * 0.95 +
                Math.cos(2 * phi - now * 0.0010) * 0.65
              ) * tau;
            }
            const r = Math.max(4, baseRadius + wave);
            pts[i].x = r * Math.cos(phi);
            pts[i].y = r * Math.sin(phi);
          }

          // Generate closed C1 continuous smooth bezier path string
          let d = '';
          const mid0x = (pts[0].x + pts[1].x) / 2;
          const mid0y = (pts[0].y + pts[1].y) / 2;
          d += `M ${mid0x.toFixed(1)} ${mid0y.toFixed(1)}`;

          for (let i = 1; i <= N; i++) {
            const cur = pts[i % N];
            const next = pts[(i + 1) % N];
            const midX = (cur.x + next.x) / 2;
            const midY = (cur.y + next.y) / 2;
            d += ` Q ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)}`;
          }
          d += ' Z';
          pathRef.current.setAttribute('d', d);

          // D. Sisi Structure: Luminous Blinking Beacon ("Berkedip Bercahaya")
          // Periodic telemetry pulse (T = 1600ms): double-flash golden optical beacon
          const p = (now % 1600) / 1600;
          const pulse1 = Math.exp(-Math.pow((p - 0.22) / 0.08, 2));
          const pulse2 = Math.exp(-Math.pow((p - 0.38) / 0.06, 2)) * 0.6;
          const pulseVal = Math.max(pulse1, pulse2);
          const flash = isHovered ? 0.95 : (0.18 + 0.82 * pulseVal);
          const flashIntensity = flash * structWeight;

          // E. Dynamic Color Interpolation
          // Structure: Ochre Gold (#C98A4B) to Radiant Golden Light (#FFEEBB) during blink
          // Expression: Dark Charcoal Ink (#241C16)
          const rBase = 201 * (1 - flashIntensity) + 255 * flashIntensity;
          const gBase = 138 * (1 - flashIntensity) + 236 * flashIntensity;
          const bBase = 75 * (1 - flashIntensity) + 185 * flashIntensity;

          const r = Math.round(rBase * structWeight + 36 * tau);
          const g = Math.round(gBase * structWeight + 28 * tau);
          const b = Math.round(bBase * structWeight + 22 * tau);

          const strokeWidth = (1.1 + 0.5 * flashIntensity) * structWeight + 1.25 * tau;
          const strokeAlpha = (0.75 + 0.25 * flashIntensity) * structWeight + 0.85 * tau;
          const fillAlpha = isHovered
            ? (0.04 * structWeight + 0.16 * tau).toFixed(3)
            : (0.01 * structWeight + 0.065 * tau).toFixed(3);

          pathRef.current.setAttribute('stroke', `rgba(${r}, ${g}, ${b}, ${strokeAlpha.toFixed(2)})`);
          pathRef.current.setAttribute('stroke-width', strokeWidth.toFixed(2));
          pathRef.current.setAttribute('fill', `rgba(${r}, ${g}, ${b}, ${fillAlpha})`);

          // Luminous glow filter on Structure side ("bercahaya")
          if (flashIntensity > 0.15 && !isReducedMotion) {
            const glowPx = (6 * flashIntensity).toFixed(1);
            const glowAlpha = (0.85 * flashIntensity).toFixed(2);
            pathRef.current.style.filter = `drop-shadow(0 0 ${glowPx}px rgba(245, 206, 150, ${glowAlpha}))`;
          } else {
            pathRef.current.style.filter = 'none';
          }

          // Position SVG outer ring exactly at mouse coordinate (0ms lag, no mengekor)
          svgRef.current.style.transform = `translate3d(${(mouse.x - 60).toFixed(1)}px, ${(mouse.y - 60).toFixed(1)}px, 0)`;
          svgRef.current.style.opacity = '1';

          // F. Enlarge Center Part: Distinct 10px Diameter Focal Dot
          const baseDotRadius = 5.0; // 10px diameter
          const dotRadius = isHovered
            ? (4.0 * structWeight + 6.0 * tau)
            : baseDotRadius;

          dotRef.current.style.transform = `translate3d(${(mouse.x - dotRadius).toFixed(1)}px, ${(mouse.y - dotRadius).toFixed(1)}px, 0)`;
          dotRef.current.style.width = `${(dotRadius * 2).toFixed(1)}px`;
          dotRef.current.style.height = `${(dotRadius * 2).toFixed(1)}px`;
          dotRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.95)`;
          dotRef.current.style.opacity = '1';

          // Center Dot Luminous Glow in Structure
          if (flashIntensity > 0.15 && !isReducedMotion) {
            const dotGlowPx = (9 * flashIntensity).toFixed(1);
            const dotGlowAlpha = (0.95 * flashIntensity).toFixed(2);
            dotRef.current.style.boxShadow = `0 0 ${dotGlowPx}px rgba(245, 206, 150, ${dotGlowAlpha})`;
          } else {
            dotRef.current.style.boxShadow = 'none';
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerout', onPointerOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mode, kRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none"
    >
      {/* Outer Responsive Ring: SVG Wavy (Expression) / Luminous Glowing Beacon (Structure) */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none overflow-visible"
        style={{
          width: '120px',
          height: '120px',
          transform: 'translate3d(-200px, -200px, 0)',
        }}
        viewBox="-60 -60 120 120"
      >
        <path
          ref={pathRef}
          className="pointer-events-none"
        />
      </svg>

      {/* Inner 0ms Focal Core Dot (10px) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform rounded-full pointer-events-none transition-opacity duration-150"
        style={{
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      />
    </div>
  );
}
