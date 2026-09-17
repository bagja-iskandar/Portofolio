'use client';

import React, { useEffect, useRef } from 'react';

export interface DualTerritoryCursorProps {
  /**
   * 'dynamic': Computes territory on the fly based on diagonal seam k in ThresholdGateway
   * 'structure': Locked to Structure territory (Ochre Gold, CAD precision, magnetic snap)
   * 'expression': Locked to Expression territory (Charcoal Ink, fluid squish, organic breathing)
   */
  mode: 'dynamic' | 'structure' | 'expression';
  /**
   * Ref to dynamic split k in ThresholdGateway (defaults to 1.0)
   */
  kRef?: React.RefObject<{ current: number; target: number }>;
}

export default function DualTerritoryCursor({ mode, kRef }: DualTerritoryCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
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
    const ring = { x: -9999, y: -9999 };
    const dot = { x: -9999, y: -9999 };

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
        ring.x = e.clientX;
        ring.y = e.clientY;
        dot.x = e.clientX;
        dot.y = e.clientY;
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

    // 4. Master 120 FPS Tick Loop
    const tick = (now: number) => {
      if (ringRef.current && dotRef.current) {
        if (!isVisible || mouse.x < -100 || isTextInput) {
          ringRef.current.style.opacity = '0';
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

          // A. Direct Synchronous Tracking (0ms Hardware Latency, No Trailing/Mengekor)
          ring.x = mouse.x;
          ring.y = mouse.y;
          dot.x = mouse.x;
          dot.y = mouse.y;

          // B. Organic Respiration Breathing (Expression Territory)
          let breath = 0;
          if (!isReducedMotion && tau > 0.15 && !isHovered) {
            breath = Math.sin(now * 0.0022) * (0.055 * tau);
          }

          // C. Scale State (Hover Expansion & Click Implosion)
          if (isClicked) {
            targetScale = 0.72; // Tactile click implosion
          } else if (isHovered) {
            // Expansion: 1.35x in Structure (48px), 1.45x bloom in Expression (55px)
            targetScale = 1.35 * (1 - tau) + 1.45 * tau;
          } else {
            targetScale = 1.0;
          }

          const scaleLerp = isClicked ? 0.35 : 0.18;
          scale += (targetScale - scale) * scaleLerp;
          const currentScale = scale + breath;

          // D. Color & Style Interpolation
          // Structure: Ochre Gold (#C98A4B -> 201, 138, 75)
          // Expression: Dark Charcoal (#241C16 -> 36, 28, 22)
          const r = Math.round(201 * (1 - tau) + 36 * tau);
          const g = Math.round(138 * (1 - tau) + 28 * tau);
          const b = Math.round(75 * (1 - tau) + 22 * tau);
          const strokeAlpha = (0.92 * (1 - tau) + 0.85 * tau).toFixed(2);
          const fillAlpha = isHovered
            ? (0.08 * (1 - tau) + 0.16 * tau).toFixed(3)
            : (0.0 * (1 - tau) + 0.06 * tau).toFixed(3);

          // Outer Ring: 36px in Structure, 38px in Expression
          const baseDiameter = 36 * (1 - tau) + 38 * tau;
          const ringRadius = (baseDiameter * currentScale) / 2;

          // E. Direct GPU Composited Transforms (Concentric, 0ms Lag, No Mengekor)
          ringRef.current.style.transform = `translate3d(${(ring.x - ringRadius).toFixed(2)}px, ${(ring.y - ringRadius).toFixed(2)}px, 0)`;
          ringRef.current.style.width = `${(baseDiameter * currentScale).toFixed(1)}px`;
          ringRef.current.style.height = `${(baseDiameter * currentScale).toFixed(1)}px`;
          ringRef.current.style.borderColor = `rgba(${r}, ${g}, ${b}, ${strokeAlpha})`;
          ringRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${fillAlpha})`;
          ringRef.current.style.opacity = '1';

          // F. Enlarge Center Part: Distinct 10px Diameter Focal Dot
          const baseDotRadius = 5.0; // 10px diameter default
          const dotRadius = isHovered
            ? (4.0 * (1 - tau) + 6.0 * tau)
            : baseDotRadius;
          const dotOpacity = isHovered
            ? (0.75 * (1 - tau) + 0.65 * tau).toFixed(2)
            : '0.95';

          dotRef.current.style.transform = `translate3d(${(dot.x - dotRadius).toFixed(2)}px, ${(dot.y - dotRadius).toFixed(2)}px, 0)`;
          dotRef.current.style.width = `${(dotRadius * 2).toFixed(1)}px`;
          dotRef.current.style.height = `${(dotRadius * 2).toFixed(1)}px`;
          dotRef.current.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.95)`;
          dotRef.current.style.opacity = dotOpacity;
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
      {/* Outer Responsive Ring / Droplet */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform rounded-full pointer-events-none transition-colors duration-150"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      />
      {/* Inner 0ms Focal Core Dot */}
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
