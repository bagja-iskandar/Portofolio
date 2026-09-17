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

// ---------------------------------------------------------------------------
// Pre-computed Immutable Trigonometric Lookup Tables (Module-level, 0 heap alloc)
// Eliminates 64 Math.sin / Math.cos evaluations per frame across N = 32 geometry points.
// ---------------------------------------------------------------------------
const N = 32;
const COS_PHI = new Float32Array(N);
const SIN_PHI = new Float32Array(N);
const COS_3PHI = new Float32Array(N);
const SIN_3PHI = new Float32Array(N);
const COS_2PHI = new Float32Array(N);
const SIN_2PHI = new Float32Array(N);

for (let i = 0; i < N; i++) {
  const phi = (i * 2 * Math.PI) / N;
  COS_PHI[i] = Math.cos(phi);
  SIN_PHI[i] = Math.sin(phi);
  COS_3PHI[i] = Math.cos(3 * phi);
  SIN_3PHI[i] = Math.sin(3 * phi);
  COS_2PHI[i] = Math.cos(2 * phi);
  SIN_2PHI[i] = Math.sin(2 * phi);
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
    let isLoopRunning = false;
    let lastActiveTime = performance.now();
    const IDLE_TIMEOUT_MS = 2500; // Suspend RAF loop after 2.5s of total inactivity

    // Fast coordinate cache to prevent redundant DOM style writes
    let prevMouseX = -9999;
    let prevMouseY = -9999;
    let prevDotX = -9999;
    let prevDotY = -9999;
    let prevDotRadius = -1;
    let prevRenderedRadius = -1;

    // String caches to prevent redundant DOM attribute writes & garbage collection churn
    let lastD = '';
    let lastStroke = '';
    let lastStrokeWidth = '';
    let lastFill = '';
    let lastFilter = '';
    let lastDotBg = '';
    let lastDotBoxShadow = '';
    let lastSvgOpacity = '';
    let lastDotOpacity = '';

    // Flat Float32Array coordinate buffers (Zero per-frame object allocation)
    const ptsX = new Float32Array(N);
    const ptsY = new Float32Array(N);

    // 3. Waking / Scheduling Helper
    const wakeLoop = () => {
      lastActiveTime = performance.now();
      if (!isLoopRunning) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // 4. Pointer Event Listeners (Passive & Non-blocking)
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) {
        isVisible = true;
      }
      wakeLoop();
    };

    const onPointerDown = () => {
      isClicked = true;
      wakeLoop();
    };

    const onPointerUp = () => {
      isClicked = false;
      wakeLoop();
    };

    const onMouseLeave = () => {
      isVisible = false;
      wakeLoop();
    };

    const onMouseEnter = () => {
      isVisible = true;
      wakeLoop();
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
      } else {
        isTextInput = false;
        isHovered = !!interactive;
      }
      wakeLoop();
    };

    const onPointerOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('a, button, [role="button"], input[type="button"], input[type="submit"], .cursor-pointer, [data-cursor-interactive]')) {
        isHovered = false;
      }
      if (!related || !related.closest('input[type="text"], input[type="email"], input[type="search"], textarea')) {
        isTextInput = false;
      }
      wakeLoop();
    };

    // Tab visibility handling: pause RAF loop when user switches tab or minimizes browser
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        isLoopRunning = false;
      } else {
        wakeLoop();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.documentElement.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });

    // 5. Master 120 FPS High-Efficiency Tick Loop
    const tick = (now: number) => {
      const svgEl = svgRef.current;
      const pathEl = pathRef.current;
      const dotEl = dotRef.current;

      if (!svgEl || !pathEl || !dotEl) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Hide cursor if outside viewport, initial un-tracked state, or over text inputs
      if (!isVisible || mouse.x < -100 || isTextInput) {
        if (lastSvgOpacity !== '0') {
          svgEl.style.opacity = '0';
          lastSvgOpacity = '0';
        }
        if (lastDotOpacity !== '0') {
          dotEl.style.opacity = '0';
          lastDotOpacity = '0';
        }
        // If hidden and scale settled, suspend loop
        isLoopRunning = false;
        return;
      }

      // Restore opacities if previously hidden
      if (lastSvgOpacity !== '1') {
        svgEl.style.opacity = '1';
        lastSvgOpacity = '1';
      }
      if (lastDotOpacity !== '1') {
        dotEl.style.opacity = '1';
        lastDotOpacity = '1';
      }

      // A. Territory Parameter tau in [0, 1]
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

      // B. Scale state (Hover expansion & Click implosion)
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

      // C. Base Outer Radius: 19px in Structure (38px dia), 21px in Expression (42px dia)
      const baseRadius = (19 * structWeight + 21 * tau) * scale;

      // D. Geometry & Path Construction
      // Structure Optimization: When tau < 0.001, wave is strictly 0.
      // If baseRadius hasn't changed noticeably and path is cached, skip calculation entirely!
      const isStructureStatic = tau < 0.001;
      const isRadiusStatic = Math.abs(baseRadius - prevRenderedRadius) < 0.05;
      const needPathRecalc = !isStructureStatic || !isRadiusStatic || lastD === '';

      let pulseVal = 0; // hoisted for resting state check

      if (needPathRecalc) {
        // Expression Side: Subtle Organic Liquid Meniscus (Gelombang Halus & Tenang)
        // Uses pre-computed trigonometric sum identities to compute only 4 trig calls per frame instead of 128!
        let sinB1 = 0, cosB1 = 1, sinB2 = 0, cosB2 = 1;
        if (tau > 0.01 && !isReducedMotion) {
          const b1 = now * 0.0014;
          const b2 = -now * 0.0010;
          sinB1 = Math.sin(b1);
          cosB1 = Math.cos(b1);
          sinB2 = Math.sin(b2);
          cosB2 = Math.cos(b2);
        }

        for (let i = 0; i < N; i++) {
          let wave = 0;
          if (tau > 0.01 && !isReducedMotion) {
            // sin(3phi + b1) = sin(3phi)cos(b1) + cos(3phi)sin(b1)
            // cos(2phi + b2) = cos(2phi)cos(b2) - sin(2phi)sin(b2)
            const sinPart = SIN_3PHI[i] * cosB1 + COS_3PHI[i] * sinB1;
            const cosPart = COS_2PHI[i] * cosB2 - SIN_2PHI[i] * sinB2;
            wave = (sinPart * 0.95 + cosPart * 0.65) * tau;
          }
          const r = Math.max(4, baseRadius + wave);
          ptsX[i] = r * COS_PHI[i];
          ptsY[i] = r * SIN_PHI[i];
        }

        // Generate closed C1 continuous smooth bezier path string
        const mid0x = (ptsX[0] + ptsX[1]) * 0.5;
        const mid0y = (ptsY[0] + ptsY[1]) * 0.5;
        let d = `M ${mid0x.toFixed(1)} ${mid0y.toFixed(1)}`;

        for (let i = 1; i <= N; i++) {
          const curX = ptsX[i % N];
          const curY = ptsY[i % N];
          const nextX = ptsX[(i + 1) % N];
          const nextY = ptsY[(i + 1) % N];
          const midX = (curX + nextX) * 0.5;
          const midY = (curY + nextY) * 0.5;
          d += ` Q ${curX.toFixed(1)} ${curY.toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)}`;
        }
        d += ' Z';

        if (d !== lastD) {
          pathEl.setAttribute('d', d);
          lastD = d;
        }
        prevRenderedRadius = baseRadius;
      }

      // E. Sisi Structure: Luminous Blinking Beacon ("Berkedip Bercahaya")
      // Periodic telemetry pulse (T = 1600ms): double-flash golden optical beacon
      const p = (now % 1600) / 1600;
      const pulse1 = Math.exp(-Math.pow((p - 0.22) / 0.08, 2));
      const pulse2 = Math.exp(-Math.pow((p - 0.38) / 0.06, 2)) * 0.6;
      pulseVal = Math.max(pulse1, pulse2);
      const flash = isHovered ? 0.95 : (0.18 + 0.82 * pulseVal);
      const flashIntensity = flash * structWeight;

      // F. Dynamic Color Interpolation with Attribute Caching
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

      const strokeStr = `rgba(${r}, ${g}, ${b}, ${strokeAlpha.toFixed(2)})`;
      if (strokeStr !== lastStroke) {
        pathEl.setAttribute('stroke', strokeStr);
        lastStroke = strokeStr;
      }

      const strokeWidthStr = strokeWidth.toFixed(2);
      if (strokeWidthStr !== lastStrokeWidth) {
        pathEl.setAttribute('stroke-width', strokeWidthStr);
        lastStrokeWidth = strokeWidthStr;
      }

      const fillStr = `rgba(${r}, ${g}, ${b}, ${fillAlpha})`;
      if (fillStr !== lastFill) {
        pathEl.setAttribute('fill', fillStr);
        lastFill = fillStr;
      }

      // Luminous glow filter on Structure side ("bercahaya")
      if (flashIntensity > 0.15 && !isReducedMotion) {
        const glowPx = (6 * flashIntensity).toFixed(1);
        const glowAlpha = (0.85 * flashIntensity).toFixed(2);
        const filterStr = `drop-shadow(0 0 ${glowPx}px rgba(245, 206, 150, ${glowAlpha}))`;
        if (filterStr !== lastFilter) {
          pathEl.style.filter = filterStr;
          lastFilter = filterStr;
        }
      } else if (lastFilter !== 'none') {
        pathEl.style.filter = 'none';
        lastFilter = 'none';
      }

      // Position SVG outer ring exactly at mouse coordinate (0ms lag, no mengekor)
      if (mouse.x !== prevMouseX || mouse.y !== prevMouseY) {
        svgEl.style.transform = `translate3d(${(mouse.x - 60).toFixed(1)}px, ${(mouse.y - 60).toFixed(1)}px, 0)`;
        prevMouseX = mouse.x;
        prevMouseY = mouse.y;
      }

      // G. Center Part: Distinct 10px Diameter Focal Dot
      const baseDotRadius = 5.0; // 10px diameter
      const dotRadius = isHovered
        ? (4.0 * structWeight + 6.0 * tau)
        : baseDotRadius;

      if (mouse.x !== prevDotX || mouse.y !== prevDotY || dotRadius !== prevDotRadius) {
        dotEl.style.transform = `translate3d(${(mouse.x - dotRadius).toFixed(1)}px, ${(mouse.y - dotRadius).toFixed(1)}px, 0)`;
        prevDotX = mouse.x;
        prevDotY = mouse.y;
      }

      if (dotRadius !== prevDotRadius) {
        const dotSizeStr = `${(dotRadius * 2).toFixed(1)}px`;
        dotEl.style.width = dotSizeStr;
        dotEl.style.height = dotSizeStr;
        prevDotRadius = dotRadius;
      }

      const dotBgStr = `rgba(${r}, ${g}, ${b}, 0.95)`;
      if (dotBgStr !== lastDotBg) {
        dotEl.style.backgroundColor = dotBgStr;
        lastDotBg = dotBgStr;
      }

      // Center Dot Luminous Glow in Structure
      if (flashIntensity > 0.15 && !isReducedMotion) {
        const dotGlowPx = (9 * flashIntensity).toFixed(1);
        const dotGlowAlpha = (0.95 * flashIntensity).toFixed(2);
        const dotShadowStr = `0 0 ${dotGlowPx}px rgba(245, 206, 150, ${dotGlowAlpha})`;
        if (dotShadowStr !== lastDotBoxShadow) {
          dotEl.style.boxShadow = dotShadowStr;
          lastDotBoxShadow = dotShadowStr;
        }
      } else if (lastDotBoxShadow !== 'none') {
        dotEl.style.boxShadow = 'none';
        lastDotBoxShadow = 'none';
      }

      // H. Idle Sleep Optimization
      // If mouse is idle beyond timeout, scale is settled, and beacon is at resting baseline:
      // Suspend RAF loop to achieve 0.0% CPU usage during reading / inactivity.
      const isIdle = (now - lastActiveTime) > IDLE_TIMEOUT_MS;
      const isScaleSettled = Math.abs(targetScale - scale) < 0.002;
      const isStructureResting = isStructureStatic ? pulseVal < 0.05 : true;

      if (isIdle && isScaleSettled && isStructureResting && !isHovered && !isClicked) {
        scale = targetScale;
        isLoopRunning = false;
        return; // Enter sleep mode! Wake on next pointer event.
      }

      rafId = requestAnimationFrame(tick);
    };

    // Kick off initial RAF cycle
    wakeLoop();

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
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafId !== null) cancelAnimationFrame(rafId);
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
