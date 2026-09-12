'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface StructureAtmosphereProps {
  /** Optional custom class names to append to the root container */
  className?: string;
  /** Optional override for grid opacity (default: 0.035, range: 0.03 - 0.055) */
  gridOpacity?: number;
  /** Whether to show technical telemetry annotations and coordinates (default: true) */
  showTelemetry?: boolean;
  /** Whether to enable dynamic interactive magnetic grid field (default: true) */
  enableTraces?: boolean;
}

interface MagneticGridState {
  targetX: number;
  targetY: number;
  smoothX: number;
  smoothY: number;
  intensity: number;
  targetIntensity: number;
}

/**
 * StructureAtmosphere
 *
 * Atmospheric background layer specifically crafted for the Structure View (The Short Read).
 *
 * Architectural & Performance Specifications:
 * - Source of Truth: PROJECT_BIBLE.md (§2, §29, §38, §40–§45)
 * - Canvas Token: Deep Ink (#0E0D0C)
 * - Grid: Pure CSS repeating linear gradients in Ochre Gold (#C98A4B) at 3.5% opacity
 * - Module Sizing: 48px on mobile, 64px on desktop (md: breakpoint)
 * - Dynamic Motion: Animated Gold Grid Traces (Canvas 2D) flowing along grid lines
 * - Telemetry Pulses: Expanding micro-coordinate pulses at key grid intersections
 * - Static Telemetry: Precision SVG crosshairs and monospaced coordinate markers:
 *     [SYS-01], [COORD: 6.87S 107.54E] (Bandung Barat/Cimahi), [DATUM: WGS84]
 * - CPU/GPU Budget: Ultra-lean (<2% CPU), DPR capped at 2, automatic pause on tab inactivity,
 *   full prefers-reduced-motion gating, hardware-accelerated GPU compositing.
 */
export function StructureAtmosphere({
  className,
  gridOpacity = 0.035,
  showTelemetry = true,
  enableTraces = true,
}: StructureAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const magneticGridRef = useRef<MagneticGridState>({
    targetX: -9999,
    targetY: -9999,
    smoothX: -9999,
    smoothY: -9999,
    intensity: 0,
    targetIntensity: 0,
  });

  const isFinePointerRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const sizeRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  // Master frame animation loop
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    if (width === 0 || height === 0) return;

    const mg = magneticGridRef.current;
    const isFine = isFinePointerRef.current;
    const isReduced = prefersReducedMotionRef.current;

    // 1. Smooth cursor position interpolation (0.12 responsiveness factor)
    if (mg.smoothX < -1000) {
      mg.smoothX = mg.targetX;
      mg.smoothY = mg.targetY;
    } else {
      mg.smoothX += (mg.targetX - mg.smoothX) * 0.12;
      mg.smoothY += (mg.targetY - mg.smoothY) * 0.12;
    }

    // 2. Smooth activation / deactivation fade (~250ms on enter, responsive ~150ms on exit)
    if (!isFine || isReduced) {
      mg.targetIntensity = 0;
    }
    const lerpFactor = mg.targetIntensity === 0 ? 0.16 : 0.09;
    mg.intensity += (mg.targetIntensity - mg.intensity) * lerpFactor;
    if (mg.intensity < 0.001) {
      mg.intensity = 0;
      mg.targetX = -9999;
      mg.targetY = -9999;
      mg.smoothX = -9999;
      mg.smoothY = -9999;
    }

    const curIntensity = mg.intensity;
    const cx = mg.smoothX;
    const cy = mg.smoothY;

    // Mathematical parameters: softened core, C1 continuous displacement
    const INFLUENCE_RADIUS = 220;
    const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;
    const CORE_RADIUS = 55;
    const CORE_RADIUS_SQ = CORE_RADIUS * CORE_RADIUS;
    const ATTRACTION_STRENGTH = 20;
    const GLOW_STRENGTH = 0.45;
    const baseOpacity = gridOpacity;
    const gridSize = width >= 768 ? 64 : 48;
    const sampleStep = 5;

    ctx.clearRect(0, 0, width, height);

    // Pure displacement field function: C1 continuous, softened core, zero apex derivative
    const getPointDisplacement = (px: number, py: number) => {
      const dx = cx - px;
      const dy = cy - py;
      const distSq = dx * dx + dy * dy;
      if (distSq >= INFLUENCE_RADIUS_SQ || curIntensity <= 0.001) {
        return { x: px, y: py, alpha: 0 };
      }
      const dist = Math.sqrt(distSq);
      const u = dist / INFLUENCE_RADIUS;
      // (1 - u^2)^2 ensures C1 tangency at the circle boundary (derivative = 0)
      const falloff = (1 - u * u) * (1 - u * u) * curIntensity;
      // Softened distance denominator guarantees derivative = 0 at the peak (eliminates any triangular kink/spike)
      const softDist = Math.sqrt(distSq + CORE_RADIUS_SQ);
      const dispX = (dx / softDist) * ATTRACTION_STRENGTH * falloff;
      const dispY = (dy / softDist) * ATTRACTION_STRENGTH * falloff;
      return { x: px + dispX, y: py + dispY, alpha: falloff };
    };

    // Optional subtle magnetic aura (Ochre Gold #C98A4B)
    if (curIntensity > 0.01) {
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, INFLUENCE_RADIUS);
      aura.addColorStop(0, `rgba(201, 138, 75, ${(0.025 * curIntensity).toFixed(4)})`);
      aura.addColorStop(0.5, `rgba(201, 138, 75, ${(0.01 * curIntensity).toFixed(4)})`);
      aura.addColorStop(1, 'rgba(201, 138, 75, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, INFLUENCE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    const baseGridPath = new Path2D();
    const interactivePath = new Path2D();
    const displacedNodes: { x: number; y: number; alpha: number }[] = [];

    // Process Vertical Lines
    const numCols = Math.ceil(width / gridSize);
    for (let c = 0; c <= numCols; c++) {
      const x0 = c * gridSize;
      const distFromLine = Math.abs(x0 - cx);

      if (curIntensity <= 0.001 || distFromLine >= INFLUENCE_RADIUS) {
        baseGridPath.moveTo(x0, 0);
        baseGridPath.lineTo(x0, height);
      } else {
        const chordHalf = Math.sqrt(INFLUENCE_RADIUS_SQ - distFromLine * distFromLine);
        const yEntry = cy - chordHalf;
        const yExit = cy + chordHalf;

        if (yEntry > 0) {
          baseGridPath.moveTo(x0, 0);
          baseGridPath.lineTo(x0, yEntry);
        }

        const startY = Math.max(0, yEntry);
        const endY = Math.min(height, yExit);
        const pStart = getPointDisplacement(x0, startY);
        interactivePath.moveTo(pStart.x, pStart.y);

        let currY = startY;
        while (currY < endY) {
          currY = Math.min(currY + sampleStep, endY);
          const p = getPointDisplacement(x0, currY);
          interactivePath.lineTo(p.x, p.y);
        }

        if (yExit < height) {
          baseGridPath.moveTo(x0, yExit);
          baseGridPath.lineTo(x0, height);
        }
      }
    }

    // Process Horizontal Lines
    const numRows = Math.ceil(height / gridSize);
    for (let r = 0; r <= numRows; r++) {
      const y0 = r * gridSize;
      const distFromLine = Math.abs(y0 - cy);

      if (curIntensity <= 0.001 || distFromLine >= INFLUENCE_RADIUS) {
        baseGridPath.moveTo(0, y0);
        baseGridPath.lineTo(width, y0);
      } else {
        const chordHalf = Math.sqrt(INFLUENCE_RADIUS_SQ - distFromLine * distFromLine);
        const xEntry = cx - chordHalf;
        const xExit = cx + chordHalf;

        if (xEntry > 0) {
          baseGridPath.moveTo(0, y0);
          baseGridPath.lineTo(xEntry, y0);
        }

        const startX = Math.max(0, xEntry);
        const endX = Math.min(width, xExit);
        const pStart = getPointDisplacement(startX, y0);
        interactivePath.moveTo(pStart.x, pStart.y);

        let currX = startX;
        while (currX < endX) {
          currX = Math.min(currX + sampleStep, endX);
          const p = getPointDisplacement(currX, y0);
          interactivePath.lineTo(p.x, p.y);
        }

        if (xExit < width) {
          baseGridPath.moveTo(xExit, y0);
          baseGridPath.lineTo(width, y0);
        }
      }
    }

    // Compute Displaced Grid Intersections (Magnetic Field Micro-Nodes)
    if (curIntensity > 0.02) {
      const minCol = Math.max(0, Math.floor((cx - INFLUENCE_RADIUS) / gridSize));
      const maxCol = Math.min(numCols, Math.ceil((cx + INFLUENCE_RADIUS) / gridSize));
      const minRow = Math.max(0, Math.floor((cy - INFLUENCE_RADIUS) / gridSize));
      const maxRow = Math.min(numRows, Math.ceil((cy + INFLUENCE_RADIUS) / gridSize));

      for (let c = minCol; c <= maxCol; c++) {
        for (let r = minRow; r <= maxRow; r++) {
          const ix = c * gridSize;
          const iy = r * gridSize;
          const p = getPointDisplacement(ix, iy);
          if (p.alpha > 0.001) {
            displacedNodes.push(p);
          }
        }
      }
    }

    // 1. Draw Base Grid Lines (Ochre Gold #C98A4B at baseOpacity)
    ctx.strokeStyle = `rgba(201, 138, 75, ${baseOpacity})`;
    ctx.lineWidth = 1;
    ctx.stroke(baseGridPath);

    // 2. Draw Displaced Grid Lines & Glow Field
    if (curIntensity > 0.001) {
      ctx.strokeStyle = `rgba(201, 138, 75, ${baseOpacity})`;
      ctx.lineWidth = 1;
      ctx.stroke(interactivePath);

      const gridGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, INFLUENCE_RADIUS);
      gridGlow.addColorStop(0, `rgba(245, 206, 150, ${(GLOW_STRENGTH * curIntensity).toFixed(3)})`);
      gridGlow.addColorStop(0.35, `rgba(220, 165, 105, ${(GLOW_STRENGTH * 0.65 * curIntensity).toFixed(3)})`);
      gridGlow.addColorStop(0.70, `rgba(201, 138, 75, ${(GLOW_STRENGTH * 0.25 * curIntensity).toFixed(3)})`);
      gridGlow.addColorStop(0.90, `rgba(201, 138, 75, ${(GLOW_STRENGTH * 0.08 * curIntensity).toFixed(3)})`);
      gridGlow.addColorStop(1.0, 'rgba(201, 138, 75, 0)');

      ctx.strokeStyle = gridGlow;
      ctx.lineWidth = 1.25;
      ctx.stroke(interactivePath);

      // 3. Displaced Grid Intersection Nodes
      for (let i = 0; i < displacedNodes.length; i++) {
        const node = displacedNodes[i];
        const nodeAlpha = Math.min(0.85, 0.12 + node.alpha * 0.65);
        ctx.fillStyle = `rgba(245, 206, 150, ${nodeAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Continue loop while cursor is active or transitioning, pause on idle for 0% CPU
    const isMotionActive =
      curIntensity > 0.0005 ||
      mg.targetIntensity > 0 ||
      Math.abs(mg.targetX - mg.smoothX) > 0.5 ||
      Math.abs(mg.targetY - mg.smoothY) > 0.5;

    if (!isReduced && isMotionActive) {
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      rafIdRef.current = null;
    }
  }, [gridOpacity]);

  const startAnimation = useCallback(() => {
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    const fineMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    isFinePointerRef.current = fineMq.matches;
    prefersReducedMotionRef.current = motionMq.matches;

    const handleFineChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
      startAnimation();
    };
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
      startAnimation();
    };

    fineMq.addEventListener('change', handleFineChange);
    motionMq.addEventListener('change', handleMotionChange);

    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      sizeRef.current = { width, height, dpr };

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      startAnimation();
    };

    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });

    // Global pointer move tracking over the entire Structure viewport
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // If pointer touches or crosses the viewport boundary, immediately return grid to straight rest state
      if (clientX <= 1 || clientY <= 1 || clientX >= w - 2 || clientY >= h - 2) {
        handlePointerLeave();
        return;
      }

      const mg = magneticGridRef.current;
      mg.targetX = clientX;
      mg.targetY = clientY;

      if (isFinePointerRef.current && !prefersReducedMotionRef.current && enableTraces) {
        mg.targetIntensity = 1.0;
      } else {
        mg.targetIntensity = 0.0;
      }

      startAnimation();
    };

    const handlePointerLeave = () => {
      const mg = magneticGridRef.current;
      mg.targetIntensity = 0.0;
      startAnimation();
    };

    const handleWindowMouseOut = (e: MouseEvent) => {
      // If relatedTarget is null/undefined, pointer has left the browser viewport completely
      if (!e.relatedTarget && !(e as any).toElement) {
        handlePointerLeave();
      }
    };

    const handleBlur = () => {
      handlePointerLeave();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseout', handleWindowMouseOut);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('pointercancel', handlePointerLeave);

    // Tab visibility handling: pause immediately on background to save CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePointerLeave();
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      } else {
        startAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial render pass
    startAnimation();

    return () => {
      fineMq.removeEventListener('change', handleFineChange);
      motionMq.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseout', handleWindowMouseOut);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('pointercancel', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [enableTraces, startAnimation]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none bg-ink',
        className
      )}
    >
      {/* 1. Parallax anchor layer for GSAP scroller compatibility */}
      <div className="parallax-grid-floor absolute inset-0 pointer-events-none" />

      {/* 2. Interactive Grid Magnetic Field (Canvas 2D, Single Source of Truth) */}
      <canvas
        ref={canvasRef}
        className="parallax-canvas-traces absolute inset-0 pointer-events-none will-change-transform"
      />

      {/* 3. Subtle Radial Vignette to preserve depth and focus towards content core */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(14, 13, 12, 0.78) 100%)',
        }}
      />
    </div>
  );
}

export default StructureAtmosphere;
