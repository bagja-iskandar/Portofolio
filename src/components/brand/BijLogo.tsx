'use client';

import React from 'react';

export type BijLogoVariant = 'structure' | 'expression' | 'threshold';
export type BijLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

interface BijLogoProps {
  variant?: BijLogoVariant;
  size?: BijLogoSize;
  className?: string;
  withContainer?: boolean;
  priority?: boolean;
}

const SIZE_MAP: Record<string, number> = {
  xs: 20,
  sm: 28,
  md: 40,
  lg: 56,
  xl: 72,
};

export default function BijLogo({
  variant = 'structure',
  size = 'md',
  className = '',
  withContainer = false,
}: BijLogoProps) {
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 40;

  // Theme styling rules based on Duality Project Bible
  const colors = {
    structure: {
      primary: '#C4975A', // Canonical Ochre Gold
      dot: '#EDE8DF',     // Warm Cream
      bg: '#12100E',      // Dark Obsidian Container
      border: 'rgba(196, 151, 90, 0.25)',
      glow: 'rgba(196, 151, 90, 0.15)',
    },
    expression: {
      primary: '#141210', // Deep Charcoal
      dot: '#B85A3A',     // Terracotta Accent
      bg: '#EDE8DF',      // Warm Ivory Container
      border: 'rgba(20, 18, 16, 0.15)',
      glow: 'rgba(184, 90, 58, 0.12)',
    },
    threshold: {
      primary: '#D4A366', // Structure Ochre Gold
      dot: '#EDE8DF',     // Warm Cream
      bg: '#0E0D0C',      // Dark Obsidian Container
      border: 'rgba(212, 163, 102, 0.35)',
      glow: 'rgba(212, 163, 102, 0.15)',
    },
  }[variant];

  const svgContent = (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Bagja Iskandar Jamil (BIJ) Monogram Logo"
    >
      {/* Letter 'b': Ascender & Rounded Bowl */}
      <path
        d="M 28 20 L 28 68"
        stroke={colors.primary}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M 28 44 C 36 44, 48 48, 48 56 C 48 64, 36 68, 28 68"
        stroke={colors.primary}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Letter 'i': Central Stem & Floating Tittle Dot */}
      <path
        d="M 52 44 L 52 68"
        stroke={colors.primary}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <circle
        cx="52"
        cy="30"
        r="4.5"
        fill={colors.dot}
      />

      {/* Letter 'j': Shoulder and Continuous Upward Joy/Smile Arc */}
      <path
        d="M 60 50 C 62 44, 72 42, 74 48 L 74 64 C 74 78, 58 86, 42 78"
        stroke={colors.primary}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (withContainer) {
    return (
      <div
        className={`group relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${className}`}
        style={{
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 4px 16px ${colors.glow}`,
        }}
      >
        {svgContent}
      </div>
    );
  }

  return <div className={`inline-flex items-center justify-center ${className}`}>{svgContent}</div>;
}
