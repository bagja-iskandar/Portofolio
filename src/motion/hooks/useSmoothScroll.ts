'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis, { type LenisOptions } from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LENIS_DEFAULT_CONFIG } from '../config/scrollTiers.config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseSmoothScrollProps {
  /** Scroll container element ref (if omitted, falls back to window) */
  wrapperRef?: React.RefObject<HTMLElement | null>;
  /** Content wrapper element ref (if omitted, falls back to document.documentElement) */
  contentRef?: React.RefObject<HTMLElement | null>;
  /** Custom Lenis options to override defaults */
  options?: Partial<LenisOptions>;
  /** Whether smooth scroll is enabled */
  enabled?: boolean;
}

export interface UseSmoothScrollReturn {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: Parameters<Lenis['scrollTo']>[1]) => void;
  resize: () => void;
  stop: () => void;
  start: () => void;
}

export function useSmoothScroll({
  wrapperRef,
  contentRef,
  options,
  enabled = true,
}: UseSmoothScrollProps = {}): UseSmoothScrollReturn {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check accessibility reduced-motion preference (§43)
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const wrapperEl = wrapperRef?.current ?? window;
    const contentEl = contentRef?.current ?? document.documentElement;

    // Instantiate Lenis smooth scrolling engine
    const lenis = new Lenis({
      wrapper: wrapperEl,
      content: contentEl,
      duration: options?.duration ?? LENIS_DEFAULT_CONFIG.duration,
      easing: options?.easing ?? LENIS_DEFAULT_CONFIG.easing,
      wheelMultiplier: options?.wheelMultiplier ?? LENIS_DEFAULT_CONFIG.wheelMultiplier,
      touchMultiplier: options?.touchMultiplier ?? LENIS_DEFAULT_CONFIG.touchMultiplier,
      smoothWheel: options?.smoothWheel ?? LENIS_DEFAULT_CONFIG.smoothWheel,
      autoRaf: false, // Strict Mandate: Master RAF is driven exclusively by GSAP ticker
      respectReducedMotion: true,
      ...options,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 1. Synchronize Lenis scroll updates directly with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Master RAF Loop: GSAP ticker drives Lenis frame progression
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds; Lenis expects milliseconds
    };
    gsap.ticker.add(tickerCallback);

    // 3. Disable GSAP lag smoothing to eliminate visual frame drops / jumps (§40)
    gsap.ticker.lagSmoothing(0);

    // 4. Synchronize dynamic accordion/tab height changes with Lenis
    const handleScrollTriggerRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener('refresh', handleScrollTriggerRefresh);

    // Initial resize to ensure accurate scroll limits
    lenis.resize();

    // 5. Cleanup Lifecycle (§45)
    return () => {
      ScrollTrigger.removeEventListener('refresh', handleScrollTriggerRefresh);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [enabled, wrapperRef, contentRef, options]);

  const scrollTo = useCallback((target: number | string | HTMLElement, opts?: Parameters<Lenis['scrollTo']>[1]) => {
    lenisRef.current?.scrollTo(target, opts);
  }, []);

  const resize = useCallback(() => {
    lenisRef.current?.resize();
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return {
    lenis: lenisInstance,
    scrollTo,
    resize,
    stop,
    start,
  };
}
