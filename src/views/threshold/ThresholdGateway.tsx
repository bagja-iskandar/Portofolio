'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { VariableFontCursorProximity } from '@/components/ui/variable-font-cursor-proximity';
import { setDynamicFavicon } from '@/lib/favicon';

export interface ThresholdGatewayProps {
  onSelectLens?: (lens: 'structure' | 'expression') => void;
}

/**
 * Generates the CSS clip-path polygon for the Ink canvas at split parameter k.
 * Pure straight diagonal line split.
 */
function getInkClipPolygon(k: number): string {
  if (k >= 1.0) {
    const p = ((k - 1) * 100).toFixed(2);
    return `polygon(0% 0%, 100% 0%, 100% ${p}%, ${p}% 100%, 0% 100%)`;
  } else {
    const p = (k * 100).toFixed(2);
    return `polygon(0% 0%, ${p}% 0%, 0% ${p}%)`;
  }
}

/**
 * Generates a Path2D polygon for the Ink region at split parameter kVal for Canvas 2D clipping.
 */
function createInkPolygonPath(kVal: number, w: number, h: number): Path2D {
  const path = new Path2D();
  path.moveTo(0, 0);
  if (kVal >= 2.0) {
    path.lineTo(w, 0);
    path.lineTo(w, h);
    path.lineTo(0, h);
  } else if (kVal >= 1.0) {
    const pX = Math.min(w, (kVal - 1) * w);
    const pY = Math.min(h, (kVal - 1) * h);
    path.lineTo(w, 0);
    path.lineTo(w, pY);
    path.lineTo(pX, h);
    path.lineTo(0, h);
  } else if (kVal > 0) {
    const pX = Math.min(w, kVal * w);
    const pY = Math.min(h, kVal * h);
    path.lineTo(pX, 0);
    path.lineTo(0, pY);
  }
  path.closePath();
  return path;
}

interface CachedRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * Fast Euclidean distance from point (x, y) to cached bounding box (zero layout reflow).
 */
function getDistanceToRect(x: number, y: number, rect: CachedRect | null): number {
  if (!rect) return 9999;
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.hypot(dx, dy);
}

interface MagneticGridState {
  targetX: number;
  targetY: number;
  smoothX: number;
  smoothY: number;
  intensity: number;
  targetIntensity: number;
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  swayAmp: number;
  swayFreq: number;
  swayOffset: number;
  tier: 0 | 1 | 2; // 0 = Far (soft brown), 1 = Mid (rich dark brown), 2 = Near (deep espresso)
  dispX: number; // Dynamic displacement offset from cursor wake (X)
  dispY: number; // Dynamic displacement offset from cursor wake (Y)
}

export default function ThresholdGateway({ onSelectLens }: ThresholdGatewayProps = {}) {
  const router = useRouter();

  // Root container ref for bounds calculation
  const containerRef = useRef<HTMLElement>(null);

  // DOM node refs for high-performance direct styling without React re-renders
  const inkCanvasRef = useRef<HTMLDivElement>(null);
  const structureContentRef = useRef<HTMLDivElement>(null);
  const expressionContentRef = useRef<HTMLDivElement>(null);

  // Typography proximity refs for CTA links
  const structureLinkTextRef = useRef<HTMLSpanElement>(null);
  const expressionLinkTextRef = useRef<HTMLSpanElement>(null);

  // Cached layout geometry to eliminate forced reflows during requestAnimationFrame
  const containerBoundsRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const elementRectsRef = useRef<{
    structureLink: CachedRect | null;
    expressionLink: CachedRect | null;
  }>({
    structureLink: null,
    expressionLink: null,
  });

  // Canvas layer refs for material motion
  const goldCanvasRef = useRef<HTMLCanvasElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);

  // Animation state stored in refs for 60-120fps inertia loop
  const kRef = useRef({ current: 1.0, target: 1.0 });
  const structureScaleRef = useRef({ current: 0.98, target: 0.98 });
  const structureOpacityRef = useRef({ current: 0.85, target: 0.85 });
  const expressionScaleRef = useRef({ current: 0.98, target: 0.98 });
  const expressionOpacityRef = useRef({ current: 0.85, target: 0.85 });

  // Typography variable weight refs for CTA links
  const structureLinkWeightRef = useRef({ current: 400, target: 400 });
  const expressionLinkWeightRef = useRef({ current: 300, target: 300 });

  // Tracking refs
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const activeLensRef = useRef<'structure' | 'expression' | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isFinePointerRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  // Material motion engine state: STRUCTURE Interactive Grid Magnetic Field
  const magneticGridRef = useRef<MagneticGridState>({
    targetX: -9999,
    targetY: -9999,
    smoothX: -9999,
    smoothY: -9999,
    intensity: 0,
    targetIntensity: 0,
  });
  const dustParticlesRef = useRef<DustParticle[]>([]);
  const dustTimeRef = useRef(0);

  // Navigation transition in-flight state
  const [transitioningLens, setTransitioningLens] = useState<'structure' | 'expression' | null>(null);

  // Update cached bounding geometry safely without reflow in rAF loop
  const updateCachedGeometry = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const cr = container.getBoundingClientRect();
      containerBoundsRef.current = {
        width: cr.width,
        height: cr.height,
        left: cr.left,
        top: cr.top,
      };
    }

    const toRect = (el: HTMLElement | null): CachedRect | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    };

    elementRectsRef.current = {
      structureLink: toRect(structureLinkTextRef.current),
      expressionLink: toRect(expressionLinkTextRef.current),
    };
  }, []);

  // Perform one unified master frame
  const tick = useCallback(() => {
    const isReduced = prefersReducedMotionRef.current;
    const LERP = isReduced ? 1.0 : 0.065;

    const k = kRef.current;
    const sScale = structureScaleRef.current;
    const sOpacity = structureOpacityRef.current;
    const eScale = expressionScaleRef.current;
    const eOpacity = expressionOpacityRef.current;

    // 1. Proportional split interpolation
    k.current += (k.target - k.current) * LERP;
    sScale.current += (sScale.target - sScale.current) * LERP;
    sOpacity.current += (sOpacity.target - sOpacity.current) * LERP;
    eScale.current += (eScale.target - eScale.current) * LERP;
    eOpacity.current += (eOpacity.target - eOpacity.current) * LERP;

    const isSplitSettled =
      Math.abs(k.target - k.current) < 0.0002 &&
      Math.abs(sScale.target - sScale.current) < 0.001 &&
      Math.abs(sOpacity.target - sOpacity.current) < 0.001 &&
      Math.abs(eScale.target - eScale.current) < 0.001 &&
      Math.abs(eOpacity.target - eOpacity.current) < 0.001;

    if (isSplitSettled) {
      k.current = k.target;
      sScale.current = sScale.target;
      sOpacity.current = sOpacity.target;
      eScale.current = eScale.target;
      eOpacity.current = eOpacity.target;
    }

    // Apply Ink canvas clip-path
    if (inkCanvasRef.current) {
      inkCanvasRef.current.style.clipPath = getInkClipPolygon(k.current);
    }

    // Apply content scale & opacity
    if (structureContentRef.current) {
      structureContentRef.current.style.transform = `scale(${sScale.current.toFixed(4)})`;
      structureContentRef.current.style.opacity = sOpacity.current.toFixed(3);
    }
    if (expressionContentRef.current) {
      expressionContentRef.current.style.transform = `scale(${eScale.current.toFixed(4)})`;
      expressionContentRef.current.style.opacity = eOpacity.current.toFixed(3);
    }

    // 2. CTA Links Typography Proximity (Zero layout reflows)
    if (isFinePointerRef.current && !isReduced) {
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      const RADIUS = 130;
      const rects = elementRectsRef.current;

      // Structure Link: 400 base -> up to 540
      const slDist = getDistanceToRect(mx, my, rects.structureLink);
      const slFactor = slDist < RADIUS ? (1 - slDist / RADIUS) : 0;
      const slSmooth = slFactor * slFactor * (3 - 2 * slFactor);
      structureLinkWeightRef.current.target = 400 + slSmooth * 140;

      // Expression Link: 300 base -> up to 460
      const elDist = getDistanceToRect(mx, my, rects.expressionLink);
      const elFactor = elDist < RADIUS ? (1 - elDist / RADIUS) : 0;
      const elSmooth = elFactor * elFactor * (3 - 2 * elFactor);
      expressionLinkWeightRef.current.target = 300 + elSmooth * 160;
    } else {
      structureLinkWeightRef.current.target = 400;
      expressionLinkWeightRef.current.target = 300;
    }

    const slw = structureLinkWeightRef.current;
    slw.current += (slw.target - slw.current) * 0.12;
    if (structureLinkTextRef.current && Math.abs(slw.target - slw.current) > 0.4) {
      const val = Math.round(slw.current);
      structureLinkTextRef.current.style.fontWeight = val.toString();
      structureLinkTextRef.current.style.fontVariationSettings = `'wght' ${val}`;
    }

    const elw = expressionLinkWeightRef.current;
    elw.current += (elw.target - elw.current) * 0.12;
    if (expressionLinkTextRef.current && Math.abs(elw.target - elw.current) > 0.4) {
      const val = Math.round(elw.current);
      expressionLinkTextRef.current.style.fontWeight = val.toString();
      expressionLinkTextRef.current.style.fontVariationSettings = `'wght' ${val}`;
    }

    // 3. Material Motion (Gold Grid & Dark Brown Dust Field) — active when NOT reduced motion
    const bounds = containerBoundsRef.current;
    const width = bounds.width;
    const height = bounds.height;

    if (width > 0) {
      const now = performance.now();

      // --- A. STRUCTURE: Interactive Grid Magnetic Field (Ochre #C98A4B Grid with Proximity Attraction & Brightness) ---
      if (goldCanvasRef.current) {
        const ctx = goldCanvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);

          const mg = magneticGridRef.current;
          const isFine = isFinePointerRef.current;
          const isReducedMotion = prefersReducedMotionRef.current;

          // 1. Smooth cursor position interpolation (0.12 responsiveness factor)
          if (mg.smoothX < -1000) {
            mg.smoothX = mg.targetX;
            mg.smoothY = mg.targetY;
          } else {
            mg.smoothX += (mg.targetX - mg.smoothX) * 0.12;
            mg.smoothY += (mg.targetY - mg.smoothY) * 0.12;
          }

          // 2. Smooth activation / deactivation fade (~250ms on enter, responsive ~150ms on exit)
          if (!isFine || isReducedMotion) {
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

          // Constants strictly conforming to prompt parameters
          const INFLUENCE_RADIUS = 220;
          const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;
          const CORE_RADIUS = 55;
          const CORE_RADIUS_SQ = CORE_RADIUS * CORE_RADIUS;
          const ATTRACTION_STRENGTH = 20;
          const GLOW_STRENGTH = 0.45;
          const BASE_OPACITY = 0.055;
          const gridSize = width >= 768 ? 64 : 48;
          const sampleStep = 5;

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

          // Optional subtle magnetic aura (secondary enhancement per spec §16)
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

          // Dual-pass path geometry:
          // baseGridPath: straight lines / segments outside the magnetic circle
          // interactivePath: displaced curved segments inside the magnetic circle
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

          // Pass 1: STRUCTURE CORE GRID (Ochre Gold #C98A4B strictly clipped to Structure side)
          ctx.save();
          const structureClip = createInkPolygonPath(k.current, width, height);
          ctx.clip(structureClip);

          // 1. Draw Base Grid Lines (Ochre Gold #C98A4B at baseOpacity)
          ctx.strokeStyle = `rgba(201, 138, 75, ${BASE_OPACITY})`;
          ctx.lineWidth = 1;
          ctx.stroke(baseGridPath);

          // 2. Draw Displaced Grid Lines & Glow Field
          if (curIntensity > 0.001) {
            // First stroke: base color along the displaced curves
            ctx.strokeStyle = `rgba(201, 138, 75, ${BASE_OPACITY})`;
            ctx.lineWidth = 1;
            ctx.stroke(interactivePath);

            // Second stroke: radial brightness falloff strictly illuminating the grid lines
            const gridGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, INFLUENCE_RADIUS);
            gridGlow.addColorStop(0, `rgba(245, 206, 150, ${(GLOW_STRENGTH * curIntensity).toFixed(3)})`);
            gridGlow.addColorStop(0.35, `rgba(220, 165, 105, ${(GLOW_STRENGTH * 0.65 * curIntensity).toFixed(3)})`);
            gridGlow.addColorStop(0.70, `rgba(201, 138, 75, ${(GLOW_STRENGTH * 0.25 * curIntensity).toFixed(3)})`);
            gridGlow.addColorStop(0.90, `rgba(201, 138, 75, ${(GLOW_STRENGTH * 0.08 * curIntensity).toFixed(3)})`);
            gridGlow.addColorStop(1.0, 'rgba(201, 138, 75, 0)');

            ctx.strokeStyle = gridGlow;
            ctx.lineWidth = 1.25;
            ctx.stroke(interactivePath);

            // 3. Draw Displaced Grid Intersection Nodes (Refined Architectural Accents)
            for (let i = 0; i < displacedNodes.length; i++) {
              const node = displacedNodes[i];
              const nodeAlpha = Math.min(0.85, 0.12 + node.alpha * 0.65);
              ctx.fillStyle = `rgba(245, 206, 150, ${nodeAlpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();

          // Pass 2: PERMEABLE GRID BLEED INTO EXPRESSION (Raw Charcoal #141210 at 12–18% visible drafting opacity over 220px)
          const diagLen = Math.hypot(width, height);
          const BLEED_DISTANCE = 220; // Extended permeable reach into Expression
          const deltaKBleed = (BLEED_DISTANCE * diagLen) / (width * height);
          const kBleed = k.current + deltaKBleed;

          ctx.save();
          const bleedClip = createInkPolygonPath(kBleed, width, height);
          ctx.clip(bleedClip);

          // Normal vector pointing from Structure into Expression
          const nx = height / diagLen;
          const ny = width / diagLen;
          const invN = (width * height) / diagLen;
          const seamDist = k.current * invN;
          const seamX = seamDist * nx;
          const seamY = seamDist * ny;
          const bleedEndX = seamX + BLEED_DISTANCE * nx;
          const bleedEndY = seamY + BLEED_DISTANCE * ny;

          const bleedGrad = ctx.createLinearGradient(
            seamX - 2 * nx,
            seamY - 2 * ny,
            bleedEndX,
            bleedEndY
          );
          // Before seam (Structure side): transparent
          bleedGrad.addColorStop(0, 'rgba(20, 18, 16, 0)');
          // At seam: distinct, clear raw charcoal architectural drafting stroke (18% opacity)
          bleedGrad.addColorStop(0.04, 'rgba(20, 18, 16, 0.18)');
          bleedGrad.addColorStop(0.35, 'rgba(20, 18, 16, 0.11)');
          bleedGrad.addColorStop(0.65, 'rgba(20, 18, 16, 0.05)');
          bleedGrad.addColorStop(0.88, 'rgba(20, 18, 16, 0.015)');
          // At 220px: completely feathered to 0
          bleedGrad.addColorStop(1.0, 'rgba(20, 18, 16, 0)');

          ctx.strokeStyle = bleedGrad;
          ctx.lineWidth = 1.15;
          ctx.stroke(baseGridPath);
          if (curIntensity > 0.001) {
            ctx.stroke(interactivePath);
          }
          ctx.restore();
        }
      }

      // --- B. EXPRESSION & PERMEABLE SEAM: Organic Dark Brown & Glowing Ochre Gold Dust Field ---
      if (dustCanvasRef.current) {
        const ctx = dustCanvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);

          dustTimeRef.current += 1;
          const time = dustTimeRef.current;
          const particles = dustParticlesRef.current;

          const diagLen = Math.hypot(width, height);
          const invN = (width * height) / diagLen;
          const D_PENETRATION = 220; // 220px gold transmutation bleed into Structure

          // Pointer position for organic aerodynamic wake (fine pointer & normal motion only)
          const isFine = isFinePointerRef.current;
          const isReduced = prefersReducedMotionRef.current;
          const mx = isFine && !isReduced ? mousePosRef.current.x - bounds.left : -9999;
          const my = isFine && !isReduced ? mousePosRef.current.y - bounds.top : -9999;
          const hasPointer = mx >= -20 && mx <= width + 20 && my >= -20 && my <= height + 20;

          const WAKE_RADIUS = 110;
          const WAKE_RADIUS_SQ = WAKE_RADIUS * WAKE_RADIUS;
          const MAX_DISP = 22;

          // Batched buckets for 60-120fps zero-allocation rendering
          const exprTier0: { cx: number; y: number; r: number }[] = [];
          const exprTier1: { cx: number; y: number; r: number }[] = [];
          const exprTier2: { cx: number; y: number; r: number }[] = [];
          const goldBleed: { cx: number; y: number; r: number; alpha: number }[] = [];

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speedY;

            // Fluid aerodynamic damping (viscous decay: 0.94 / frame => ~2.5s recovery)
            p.dispX *= 0.94;
            p.dispY *= 0.94;

            const baseX = p.x + p.swayAmp * Math.sin(time * p.swayFreq + p.swayOffset);
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
                const push = factor * 1.6; // Gentle human hand parting force
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

            const drawX = baseX + p.dispX;
            const drawY = p.y + p.dispY;

            // Signed perpendicular distance to dynamic diagonal seam:
            // dSigned > 0: Expression (Ivory)
            // dSigned <= 0: Structure (Ink)
            const dSigned = (drawX / width + drawY / height - k.current) * invN;

            // Respawn if drifted above top or deep beyond transmutation zone into Structure
            if (p.y < -14 || dSigned < -D_PENETRATION - 80) {
              p.y = height + 14;
              p.x = Math.random() * width;
              p.dispX = 0;
              p.dispY = 0;
            }

            if (dSigned >= 0) {
              // Inside Expression: Native Organic Dark Brown
              if (p.tier === 0) exprTier0.push({ cx: drawX, y: drawY, r: p.radius });
              else if (p.tier === 1) exprTier1.push({ cx: drawX, y: drawY, r: p.radius });
              else exprTier2.push({ cx: drawX, y: drawY, r: p.radius });
            } else {
              // Crossed the seam into Structure! Transmute to Ochre Gold
              const penetration = -dSigned;
              if (penetration <= D_PENETRATION) {
                const t = 1.0 - penetration / D_PENETRATION;
                const smoothFade = t * t * (3 - 2 * t); // Hermite smoothstep
                const baseAlpha = p.tier === 0 ? 0.40 : p.tier === 1 ? 0.70 : 0.92;

                // Subtle luminescence boost (+15%) when parted by cursor wake in Structure
                const isParted = Math.hypot(p.dispX, p.dispY) > 2.0;
                const alphaMultiplier = isParted ? 1.15 : 1.0;
                const alpha = Math.min(1.0, baseAlpha * smoothFade * alphaMultiplier);

                if (alpha > 0.01) {
                  goldBleed.push({ cx: drawX, y: drawY, r: p.radius, alpha });
                }
              }
            }
          }

          // 1. Render Expression Native Particles (3 fast batch calls)
          if (exprTier0.length > 0) {
            ctx.fillStyle = 'rgba(75, 52, 38, 0.28)';
            ctx.beginPath();
            for (let i = 0; i < exprTier0.length; i++) {
              const p = exprTier0[i];
              ctx.moveTo(p.cx + p.r, p.y);
              ctx.arc(p.cx, p.y, p.r, 0, Math.PI * 2);
            }
            ctx.fill();
          }

          if (exprTier1.length > 0) {
            ctx.fillStyle = 'rgba(58, 38, 26, 0.42)';
            ctx.beginPath();
            for (let i = 0; i < exprTier1.length; i++) {
              const p = exprTier1[i];
              ctx.moveTo(p.cx + p.r, p.y);
              ctx.arc(p.cx, p.y, p.r, 0, Math.PI * 2);
            }
            ctx.fill();
          }

          if (exprTier2.length > 0) {
            ctx.fillStyle = 'rgba(42, 26, 16, 0.58)';
            ctx.beginPath();
            for (let i = 0; i < exprTier2.length; i++) {
              const p = exprTier2[i];
              ctx.moveTo(p.cx + p.r, p.y);
              ctx.arc(p.cx, p.y, p.r, 0, Math.PI * 2);
            }
            ctx.fill();
          }

          // 2. Render Permeable Gold Dust in Structure (Ochre Gold #C98A4B with warm halo)
          for (let i = 0; i < goldBleed.length; i++) {
            const p = goldBleed[i];
            // Core luminous ember dot
            ctx.fillStyle = `rgba(201, 138, 75, ${p.alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.cx, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            // Warm halo for near/brighter particles
            if (p.alpha > 0.20) {
              ctx.fillStyle = `rgba(245, 206, 150, ${(p.alpha * 0.30).toFixed(3)})`;
              ctx.beginPath();
              ctx.arc(p.cx, p.y, p.r * 2.4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    }

    // Continue loop unless reduced motion and split is completely settled
    if (!isReduced || !isSplitSettled) {
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      rafIdRef.current = null;
    }
  }, []);

  // Awakens the rAF loop if idle
  const startLoop = useCallback(() => {
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  // Sets target proportions based on active lens state
  const setLensTarget = useCallback(
    (lens: 'structure' | 'expression' | null) => {
      activeLensRef.current = lens;

      if (lens === 'structure') {
        kRef.current.target = 1.34; // Structure expands to ~70%
        structureScaleRef.current.target = 1.0;
        structureOpacityRef.current.target = 1.0;
        expressionScaleRef.current.target = 0.95;
        expressionOpacityRef.current.target = 0.6;
      } else if (lens === 'expression') {
        kRef.current.target = 0.66; // Expression expands to ~70% (Structure shrinks to ~30%)
        structureScaleRef.current.target = 0.95;
        structureOpacityRef.current.target = 0.6;
        expressionScaleRef.current.target = 1.0;
        expressionOpacityRef.current.target = 1.0;
      } else {
        // Return to 50/50 balance on leave
        kRef.current.target = 1.0;
        structureScaleRef.current.target = 0.98;
        structureOpacityRef.current.target = 0.85;
        expressionScaleRef.current.target = 0.98;
        expressionOpacityRef.current.target = 0.85;
      }

      startLoop();
    },
    [startLoop]
  );

  // Pointer move handler using cached bounds (zero layout recalculation)
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (transitioningLens) return;

      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const bounds = containerBoundsRef.current;
      if (bounds.width === 0) return;

      // If pointer hits or crosses the viewport boundary, immediately return grid to straight rest state
      if (
        e.clientX <= 1 ||
        e.clientY <= 1 ||
        e.clientX >= window.innerWidth - 2 ||
        e.clientY >= window.innerHeight - 2
      ) {
        handlePointerLeave();
        return;
      }

      const relX = e.clientX - bounds.left;
      const relY = e.clientY - bounds.top;

      // Update Structure magnetic grid cursor target
      const mg = magneticGridRef.current;
      mg.targetX = relX;
      mg.targetY = relY;

      const nx = relX / bounds.width;
      const ny = relY / bounds.height;
      const sum = nx + ny; // Line equation s = x + y. Boundary is at 1.0

      const isFine = isFinePointerRef.current;
      const isReduced = prefersReducedMotionRef.current;

      // Activate magnetic grid field when hovering inside Structure canvas (with smooth diagonal falloff)
      if (isFine && !isReduced && sum <= 1.04) {
        mg.targetIntensity = 1.0;
      } else {
        mg.targetIntensity = 0.0;
      }

      startLoop();

      const HYSTERESIS = 0.08; // Deadband margin
      const current = activeLensRef.current;
      let nextLens = current;

      if (current === 'structure') {
        if (sum > 1.0 + HYSTERESIS) {
          nextLens = 'expression';
        }
      } else if (current === 'expression') {
        if (sum < 1.0 - HYSTERESIS) {
          nextLens = 'structure';
        }
      } else {
        nextLens = sum <= 1.0 ? 'structure' : 'expression';
      }

      if (nextLens !== current) {
        setLensTarget(nextLens);
      }
    },
    [setLensTarget, startLoop, transitioningLens]
  );

  // Return to balanced 50/50 when pointer leaves canvas
  const handlePointerLeave = useCallback(() => {
    if (transitioningLens) return;
    mousePosRef.current = { x: -9999, y: -9999 };
    magneticGridRef.current.targetIntensity = 0.0;
    setLensTarget(null);
    startLoop();
  }, [setLensTarget, startLoop, transitioningLens]);

  // Accessible keyboard focus triggers proportional expansion
  const handleFocus = useCallback(
    (lens: 'structure' | 'expression') => {
      if (transitioningLens) return;
      setLensTarget(lens);
    },
    [setLensTarget, transitioningLens]
  );

  const handleBlur = useCallback(() => {
    if (transitioningLens) return;
    setLensTarget(null);
  }, [setLensTarget, transitioningLens]);

  // Explicit click navigation handler with GSAP Master Transition
  const handleSelectLens = useCallback(
    (lens: 'structure' | 'expression') => {
      if (transitioningLens) return;
      setTransitioningLens(lens);

      try {
        sessionStorage.setItem('duality_lens', lens);
      } catch {
        // Fallback if sessionStorage is disabled
      }

      const isReduced = prefersReducedMotionRef.current;

      if (lens === 'structure') {
        if (isReduced) {
          if (onSelectLens) onSelectLens('structure');
          else router.push('/?lens=structure');
          return;
        }

        // Cancel pending inertia loop so GSAP takes full deterministic control
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }

        // GSAP Master Forward Timeline
        const tl = gsap.timeline({
          onComplete: () => {
            if (onSelectLens) {
              onSelectLens('structure');
            } else {
              router.push('/?lens=structure');
            }
          },
        });

        // 1. Dissolve Expression side
        if (expressionContentRef.current) {
          tl.to(
            expressionContentRef.current,
            {
              opacity: 0,
              x: 60,
              scale: 0.95,
              duration: 0.35,
              ease: 'power2.in',
            },
            0
          );
        }

        // 2. Monumental Diagonal Shutter Sweep: animate k from current position to 2.0 (full screen)
        const proxy = { k: kRef.current.current };
        tl.to(
          proxy,
          {
            k: 2.0,
            duration: 0.7,
            ease: 'power3.inOut',
            onUpdate: () => {
              kRef.current.current = proxy.k;
              if (inkCanvasRef.current) {
                inkCanvasRef.current.style.clipPath = getInkClipPolygon(proxy.k);
              }
            },
          },
          0
        );

        // 3. Fade out the gateway Structure text smoothly as the black sheet completes
        if (structureContentRef.current) {
          tl.to(
            structureContentRef.current,
            {
              opacity: 0,
              y: -15,
              duration: 0.28,
              ease: 'power2.in',
            },
            0.42
          );
        }
      } else {
        // Expression narrative transition (Phase 3)
        if (isReduced) {
          if (onSelectLens) onSelectLens('expression');
          else router.push('/?lens=expression');
          return;
        }

        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            if (onSelectLens) {
              onSelectLens('expression');
            } else {
              router.push('/?lens=expression');
            }
          },
        });

        if (structureContentRef.current) {
          tl.to(structureContentRef.current, { opacity: 0, x: -60, duration: 0.4, ease: 'power2.in' }, 0);
        }

        const proxy = { k: kRef.current.current };
        tl.to(
          proxy,
          {
            k: 0.0,
            duration: 0.85,
            ease: 'power3.inOut',
            onUpdate: () => {
              kRef.current.current = proxy.k;
              if (inkCanvasRef.current) {
                inkCanvasRef.current.style.clipPath = getInkClipPolygon(proxy.k);
              }
            },
          },
          0
        );
      }
    },
    [transitioningLens, onSelectLens, router]
  );

  // Lifecycle setup: resize, reduced motion, fine pointer, 40 dark brown dust generation (§40 budget)
  useEffect(() => {
    // 1. Device capabilities
    const fineMq = window.matchMedia('(pointer: fine)');
    isFinePointerRef.current = fineMq.matches;
    const handleFinePointerChange = (e: MediaQueryListEvent) => {
      isFinePointerRef.current = e.matches;
    };
    fineMq.addEventListener('change', handleFinePointerChange);

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = motionMq.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    motionMq.addEventListener('change', handleMotionChange);

    // 2. Initialize 76 organic dark brown dust particles (increased count & speed per user request)
    const initialParticles: DustParticle[] = [];
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 76; i++) {
      const tier: 0 | 1 | 2 = i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2;
      const radius = tier === 0 ? 0.65 + Math.random() * 0.35 : tier === 1 ? 1.05 + Math.random() * 0.45 : 1.55 + Math.random() * 0.55;
      const speedY = -(tier === 0 ? 0.38 + Math.random() * 0.32 : tier === 1 ? 0.58 + Math.random() * 0.42 : 0.85 + Math.random() * 0.52);

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
      });
    }
    dustParticlesRef.current = initialParticles;

    // 3. Canvas sizing and DPR scaling (Capped at 2 per §41)
    const handleResize = () => {
      updateCachedGeometry();
      const bounds = containerBoundsRef.current;
      const width = bounds.width;
      const height = bounds.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (goldCanvasRef.current) {
        goldCanvasRef.current.width = width * dpr;
        goldCanvasRef.current.height = height * dpr;
        goldCanvasRef.current.style.width = `${width}px`;
        goldCanvasRef.current.style.height = `${height}px`;
        const ctx = goldCanvasRef.current.getContext('2d');
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      if (dustCanvasRef.current) {
        dustCanvasRef.current.width = width * dpr;
        dustCanvasRef.current.height = height * dpr;
        dustCanvasRef.current.style.width = `${width}px`;
        dustCanvasRef.current.style.height = `${height}px`;
        const ctx = dustCanvasRef.current.getContext('2d');
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 4. Initial clip path setup
    if (inkCanvasRef.current) {
      inkCanvasRef.current.style.clipPath = getInkClipPolygon(1.0);
    }

    // 5. Visibility change handling (Pause loop when tab is backgrounded)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePointerLeave();
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      } else {
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(tick);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleWindowMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && !(e as any).toElement) {
        handlePointerLeave();
      }
    };

    const handleBlur = () => {
      handlePointerLeave();
    };

    window.addEventListener('mouseout', handleWindowMouseOut);
    window.addEventListener('blur', handleBlur);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    // 6. Start master animation loop
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      fineMq.removeEventListener('change', handleFinePointerChange);
      motionMq.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseout', handleWindowMouseOut);
      window.removeEventListener('blur', handleBlur);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handlePointerLeave, tick, updateCachedGeometry]);

  // Ensure browser tab favicon dynamically matches the Threshold Duality seam palette
  useEffect(() => {
    setDynamicFavicon('threshold');
  }, []);

  return (
    <main
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-screen h-screen overflow-hidden select-none cursor-default"
      aria-label="Duality Threshold — Choose your narrative lens: Structure or Expression"
    >
      {/* ================= CANVAS BACKGROUNDS ================= */}

      {/* BASE IVORY CANVAS (Bottom-Right) */}
      <div className="absolute inset-0 bg-ivory overflow-hidden" aria-hidden="true">
        {/* Subtle Contemporary Editorial Paper Feel (Fine Grain) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        {/* Microscopic Tonal Variation / Physical Paper Warmth */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 75% 75%, transparent 50%, rgba(20, 18, 16, 0.4) 100%)',
          }}
        />
      </div>

      {/* TOP-LEFT INK CANVAS (Dynamic Straight Diagonal Clip-Path) */}
      <div
        ref={inkCanvasRef}
        className="absolute inset-0 bg-ink will-change-[clip-path] transform-gpu overflow-hidden"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' }}
        aria-hidden="true"
      />

      {/* PERMEABLE ARCHITECTURAL DRAFTING GRID (Canvas 2D - Fullscreen Permeable Seam) */}
      <canvas
        ref={goldCanvasRef}
        className="absolute inset-0 pointer-events-none z-[2]"
        aria-hidden="true"
      />

      {/* PERMEABLE ORGANIC DUST PARTICLES FIELD (Canvas 2D - Fullscreen Permeable Seam) */}
      <canvas
        ref={dustCanvasRef}
        className="absolute inset-0 pointer-events-none z-[3]"
        aria-hidden="true"
      />

      {/* ================= TOP-LEFT REGION: STRUCTURE (INK CANVAS) ================= */}
      <section
        aria-label="Structure Lens — The short read: technical digest and capabilities"
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
      >
        <div
          ref={structureContentRef}
          style={{ transformOrigin: 'top left' }}
          className="p-10 sm:p-14 md:p-20 lg:p-24 max-w-xl text-cream pointer-events-auto flex flex-col items-start gap-4 will-change-transform"
        >
          {/* Technical Restrained Title with Variable Font Cursor Proximity */}
          <VariableFontCursorProximity
            as="h2"
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 700"
            radius={90}
            falloff="gaussian"
            className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.14em] text-cream uppercase leading-[0.95]"
          >
            STRUCTURE
          </VariableFontCursorProximity>

          {/* Precision Tagline */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-cream/75 uppercase">
            the short read.
          </p>

          {/* Semantic Content from Project Data */}
          <p className="font-sans text-xs sm:text-sm leading-relaxed text-cream/65 max-w-sm">
            A concise view of selected work, experience, systems, and capabilities. Disciplined technical digest.
          </p>

          {/* Pure Typographic Interactive CTA */}
          <Link
            href="?lens=structure"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelectLens('structure');
            }}
            onFocus={() => handleFocus('structure')}
            onBlur={handleBlur}
            className="group relative inline-block mt-4 py-2 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-cream/80 hover:text-cream transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-cream cursor-pointer"
          >
            <span ref={structureLinkTextRef} className="transition-[font-variation-settings,font-weight] duration-75">
              ENTER STRUCTURE
            </span>
            <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-cream transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </section>

      {/* ================= BOTTOM-RIGHT REGION: EXPRESSION (IVORY CANVAS) ================= */}
      <section
        aria-label="Expression Lens — The full story: editorial journey and experiments"
        className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-20 flex items-end justify-end"
      >
        <div
          ref={expressionContentRef}
          style={{ transformOrigin: 'bottom right' }}
          className="p-10 sm:p-14 md:p-20 lg:p-24 max-w-xl text-charcoal pointer-events-auto flex flex-col items-end text-right gap-4 will-change-transform"
        >
          {/* Editorial Monumental Serif Title with Variable Font Cursor Proximity */}
          <VariableFontCursorProximity
            as="h2"
            containerRef={containerRef}
            fromFontVariationSettings="'wght' 300"
            toFontVariationSettings="'wght' 700"
            radius={130}
            falloff="gaussian"
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-charcoal leading-[0.92]"
          >
            EXPRESSION
          </VariableFontCursorProximity>

          {/* Narrative Tagline */}
          <p className="font-serif italic text-2xl sm:text-3xl text-charcoal/85 font-normal tracking-wide">
            the full story.
          </p>

          {/* Semantic Content from Project Data */}
          <p className="font-sans text-xs sm:text-sm leading-relaxed text-charcoal/65 max-w-sm">
            A deeper exploration of the work, process, thinking, and experiments behind it. The complete editorial journey.
          </p>

          {/* Pure Typographic Interactive CTA */}
          <Link
            href="?lens=expression"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelectLens('expression');
            }}
            onFocus={() => handleFocus('expression')}
            onBlur={handleBlur}
            className="group relative inline-block mt-4 py-2 font-serif italic text-base sm:text-lg tracking-widest uppercase text-charcoal/80 hover:text-charcoal transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-charcoal cursor-pointer"
          >
            <span ref={expressionLinkTextRef} className="transition-[font-variation-settings,font-weight] duration-75">
              ENTER EXPRESSION
            </span>
            <span className="absolute bottom-1 right-0 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </section>
    </main>
  );
}
