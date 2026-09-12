"use client";

import React, { ElementType, forwardRef, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, useAnimationFrame } from "motion/react";

import { cn } from "@/lib/utils";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";

/**
 * Props for the VariableFontCursorProximity component.
 */
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The text content to display and animate.
   * Each letter will respond individually to cursor proximity.
   * Required prop with no default value.
   */
  children: React.ReactNode;

  /**
   * HTML Tag to render the component as.
   * @default "span"
   */
  as?: ElementType;

  /**
   * Default font variation settings applied when cursor is outside the radius.
   * Should be a CSS font-variation-settings string (e.g., "'wght' 400, 'slnt' 0").
   * You should check the font variation settings of the font you are using to see the available axes.
   * Required prop with no default value.
   */
  fromFontVariationSettings: string;

  /**
   * Target font variation settings applied when cursor is at the center of a letter.
   * Should be a CSS font-variation-settings string (e.g., "'wght' 900, 'slnt' 15").
   * Make sure to check the font variation settings of the font you are using to see the available axes.
   * Required prop with no default value.
   */
  toFontVariationSettings: string;

  /**
   * Reference to the container element for mouse tracking.
   * The cursor position will be calculated relative to this container's bounds.
   * Required prop with no default value.
   */
  containerRef: React.RefObject<HTMLElement | null>;

  /**
   * The radius in pixels within which letters respond to cursor proximity.
   * Letters outside this radius will use the default font variation settings.
   * @default 50
   */
  radius?: number;

  /**
   * The falloff function that determines how the effect diminishes with distance.
   * - "linear": Linear interpolation (straight line falloff)
   * - "exponential": Quadratic falloff (more dramatic near cursor)
   * - "gaussian": Bell curve falloff (smooth, natural feeling)
   * @default "linear"
   */
  falloff?: "linear" | "exponential" | "gaussian";
}

export const VariableFontCursorProximity = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      as = "span",
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      ...props
    },
    ref
  ) => {
    // Refs to store references to each individual letter element
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // Cache for interpolated font settings to avoid recalculation
    const interpolatedSettingsRef = useRef<string[]>([]);

    // Cached center coordinates of each letter relative to container (Zero layout reads in rAF)
    const letterCentersRef = useRef<{ x: number; y: number }[]>([]);

    // Device capability & accessibility flags
    const isFinePointerRef = useRef(false);
    const prefersReducedMotionRef = useRef(false);

    // Idle & rest tracking
    const lastMousePosRef = useRef({ x: -99999, y: -99999 });
    const isAllAtRestRef = useRef(false);

    // Hook to track mouse position relative to the specified container
    const mousePositionRef = useMousePositionRef(containerRef);

    // Monitor accessibility & device pointer capability
    useEffect(() => {
      const fineMq = window.matchMedia("(pointer: fine)");
      isFinePointerRef.current = fineMq.matches;
      const handleFine = (e: MediaQueryListEvent) => {
        isFinePointerRef.current = e.matches;
      };
      fineMq.addEventListener("change", handleFine);

      const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = motionMq.matches;
      const handleMotion = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      motionMq.addEventListener("change", handleMotion);

      return () => {
        fineMq.removeEventListener("change", handleFine);
        motionMq.removeEventListener("change", handleMotion);
      };
    }, []);

    // Deterministically update cached letter positions on mount, resize, and font load
    const updateCachedLetterCenters = useCallback(() => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const centers: { x: number; y: number }[] = [];

      for (let i = 0; i < letterRefs.current.length; i++) {
        const letterRef = letterRefs.current[i];
        if (!letterRef) {
          centers.push({ x: 0, y: 0 });
          continue;
        }
        const rect = letterRef.getBoundingClientRect();
        centers.push({
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      }
      letterCentersRef.current = centers;
    }, [containerRef]);

    useEffect(() => {
      // Delay measurement slightly to ensure initial layout / fonts are painted
      const timer = setTimeout(updateCachedLetterCenters, 50);
      window.addEventListener("resize", updateCachedLetterCenters);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", updateCachedLetterCenters);
      };
    }, [updateCachedLetterCenters]);

    /**
     * Parse and prepare font variation settings for interpolation.
     */
    const parsedSettings = useMemo(() => {
      // Parse the 'from' font variation settings string
      const fromSettings = new Map(
        fromFontVariationSettings
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)];
          })
      );

      // Parse the 'to' font variation settings string
      const toSettings = new Map(
        toFontVariationSettings
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)];
          })
      );

      // Create structured data for each axis with from/to values
      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    /**
     * Calculate Euclidean distance between two points.
     */
    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    /**
     * Calculate the falloff value based on distance and selected falloff type.
     */
    const calculateFalloff = (distance: number): number => {
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1);

      switch (falloff) {
        case "exponential":
          return Math.pow(normalizedDistance, 2);
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2);
        case "linear":
        default:
          return normalizedDistance;
      }
    };

    // Use animation frame to smoothly update font variations with ZERO layout reads
    useAnimationFrame(() => {
      // Accessibility & touch device gating: bypass loop if reduced-motion or touch
      if (!isFinePointerRef.current || prefersReducedMotionRef.current) {
        if (!isAllAtRestRef.current) {
          letterRefs.current.forEach((letterRef) => {
            if (letterRef && letterRef.style.fontVariationSettings !== fromFontVariationSettings) {
              letterRef.style.fontVariationSettings = fromFontVariationSettings;
            }
          });
          isAllAtRestRef.current = true;
        }
        return;
      }

      if (!containerRef.current) return;

      const mx = mousePositionRef.current.x;
      const my = mousePositionRef.current.y;

      // Skip calculation if mouse hasn't moved and all letters are at rest (0% idle CPU)
      if (
        mx === lastMousePosRef.current.x &&
        my === lastMousePosRef.current.y &&
        isAllAtRestRef.current
      ) {
        return;
      }
      lastMousePosRef.current.x = mx;
      lastMousePosRef.current.y = my;

      let centers = letterCentersRef.current;
      if (centers.length === 0 || centers.length !== letterRefs.current.length) {
        updateCachedLetterCenters();
        centers = letterCentersRef.current;
      }

      // Phase 1: Pure mathematical distance calculation in RAM (Zero DOM reads)
      const updates: { ref: HTMLSpanElement; settings: string }[] = [];
      let anyActive = false;

      for (let index = 0; index < letterRefs.current.length; index++) {
        const letterRef = letterRefs.current[index];
        if (!letterRef) continue;

        const center = centers[index];
        if (!center) continue;

        const distance = calculateDistance(mx, my, center.x, center.y);

        if (distance >= radius) {
          if (interpolatedSettingsRef.current[index] !== fromFontVariationSettings) {
            interpolatedSettingsRef.current[index] = fromFontVariationSettings;
            updates.push({ ref: letterRef, settings: fromFontVariationSettings });
          }
          continue;
        }

        anyActive = true;
        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue =
              fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${Math.round(interpolatedValue)}`;
          })
          .join(", ");

        if (interpolatedSettingsRef.current[index] !== newSettings) {
          interpolatedSettingsRef.current[index] = newSettings;
          updates.push({ ref: letterRef, settings: newSettings });
        }
      }

      // Phase 2: Batch WRITE with zero layout thrashing
      for (let i = 0; i < updates.length; i++) {
        updates[i].ref.style.fontVariationSettings = updates[i].settings;
      }

      isAllAtRestRef.current = !anyActive && updates.length === 0;
    });

    // Split text into words and track letter indices across all words
    const words = String(children).split(" ");
    let letterIndex = 0;
    const ElementTag = as;

    return (
      <ElementTag
        ref={ref}
        className={cn(className)}
        {...props}
        data-text={children}
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="inline-block whitespace-nowrap"
            aria-hidden
          >
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++;
              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[currentLetterIndex] = el;
                  }}
                  className="inline-block"
                  aria-hidden="true"
                  style={{
                    fontVariationSettings:
                      interpolatedSettingsRef.current[currentLetterIndex],
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{children}</span>
      </ElementTag>
    );
  }
);

VariableFontCursorProximity.displayName = "VariableFontCursorProximity";
export default VariableFontCursorProximity;
