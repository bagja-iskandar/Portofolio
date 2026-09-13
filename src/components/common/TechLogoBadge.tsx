'use client';

import React from 'react';
import {
  SiKotlin,
  SiAndroid,
  SiSwift,
  SiStripe,
  SiGradle,
  SiNuxt,
  SiVuedotjs,
  SiVite,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiNestjs,
  SiSupabase,
  SiPostgresql,
  SiPrisma,
  SiPytorch,
  SiPython,
  SiDocker,
  SiPinia,
  SiBootstrap,
  SiZod,
  SiGit,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiPhp,
  SiMysql,
  SiLaravel,
  SiCodeigniter,
  SiJupyter,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiScipy,
  SiOpenjdk,
  SiJetpackcompose,
  SiWebgl,
  SiReactquery,
  SiMinio,
  SiCanvas,
  SiAndroidstudio,
  SiRedis,
  SiGooglechrome,
} from 'react-icons/si';
import { Code2, Cpu, Layers, Network, Activity, GitBranch } from 'lucide-react';

export interface TechItem {
  id?: string;
  name: string;
  category?: string;
  isCore?: boolean;
}

export interface TechLogoBadgeProps {
  tech: string | TechItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  tooltipSide?: 'top' | 'bottom';
  showTooltip?: boolean;
  isCore?: boolean;
}

// Custom SVG Icons for AI-Assisted Engineering Platforms matching official visual identities
const CodexIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.2C13.8 2.2 15.3 3.3 16 4.8C17.6 4.4 19.3 5.1 20.2 6.6C21.1 8.1 20.8 10 19.7 11.2C21 12.3 21.4 14.2 20.7 15.8C20 17.4 18.3 18.4 16.6 18.2C15.7 19.8 13.9 20.8 12 20.8C10.1 20.8 8.3 19.8 7.4 18.2C5.7 18.4 4 17.4 3.3 15.8C2.6 14.2 3 12.3 4.3 11.2C3.2 10 2.9 8.1 3.8 6.6C4.7 5.1 6.4 4.4 8 4.8C8.7 3.3 10.2 2.2 12 2.2ZM6.6 9.4L9 12L6.6 14.6C6.2 15 6.2 15.6 6.6 16C7 16.4 7.6 16.4 8 16L11 12.7C11.4 12.3 11.4 11.7 11 11.3L8 8C7.6 7.6 7 7.6 6.6 8C6.2 8.4 6.2 9 6.6 9.4ZM12.6 14.2H16.8C17.2 14.2 17.6 14.5 17.6 15C17.6 15.5 17.2 15.8 16.8 15.8H12.6C12.2 15.8 11.8 15.5 11.8 15C11.8 14.5 12.2 14.2 12.6 14.2Z"
    />
  </svg>
);

const AntigravityIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C9.6 2 7.8 3.8 6.6 6.8C5.5 9.6 4.9 13 4.2 16C3.5 18.8 2.5 20.8 1.4 21.6C1 21.9 1.1 22.3 1.5 22.4C2.2 22.6 3.4 22.4 4.5 21.6C5.8 20.6 6.7 18.8 7.6 16.4C8.5 14.2 9.8 13 12 13C14.2 13 15.5 14.2 16.4 16.4C17.3 18.8 18.2 20.6 19.5 21.6C20.6 22.4 21.8 22.6 22.5 22.4C22.9 22.3 23 21.9 22.6 21.6C21.5 20.8 20.5 18.8 19.8 16C19.1 13 18.5 9.6 17.4 6.8C16.2 3.8 14.4 2 12 2Z" />
  </svg>
);

type TechVisual =
  | { type: 'icon'; Icon: React.ComponentType<{ className?: string }> }
  | { type: 'text'; text: string };

function getTechVisual(rawTech: string): TechVisual {
  const t = rawTech.toLowerCase().trim();

  // 1. Explicit Monogram / Letter Badges (Resolves duplicate brand icons & provides crisp monograms for scientific paradigms)
  if (t.includes('kmp') || (t.includes('kotlin') && t.includes('multiplatform'))) {
    if (t.includes('compose')) return { type: 'icon', Icon: SiJetpackcompose };
    return { type: 'text', text: 'KMP' };
  }
  if (t.includes('wpt') || t.includes('wavelet')) return { type: 'text', text: 'WPT' };
  if (t.includes('lda') || t.includes('discriminant')) return { type: 'text', text: 'LDA' };
  if (t.includes('srs') || t.includes('requirements specification')) return { type: 'text', text: 'SRS' };
  if (t.includes('uml')) return { type: 'text', text: 'UML' };
  if (t.includes('rbac')) return { type: 'text', text: 'RBAC' };
  if (t.includes('sdlc') || t.includes('life cycle') || t.includes('lifecycle')) return { type: 'text', text: 'SDLC' };
  if (t.includes('rest')) return { type: 'text', text: 'REST' };
  if (t.includes('antigravity')) return { type: 'icon', Icon: AntigravityIcon };
  if (t.includes('codex') || t.includes('openai')) return { type: 'icon', Icon: CodexIcon };
  if (t.includes('pedagogy') || (t.includes('artificial intelligence') && !t.includes('python'))) return { type: 'text', text: 'AI' };
  if (t.includes('gcn') || (t.includes('graph') && t.includes('convolutional'))) return { type: 'text', text: 'GCN' };
  if (t.includes('ssm') || (t.includes('state space') && t.includes('mamba'))) return { type: 'text', text: 'SSM' };

  // 2. High-Specificity External SDKs, Tools & Frameworks (Checked before generic language / substring matchers)
  if (t.includes('bootstrap')) return { type: 'icon', Icon: SiBootstrap };
  if (t.includes('devtools') || t.includes('chrome')) return { type: 'icon', Icon: SiGooglechrome };
  if (t.includes('stripe')) return { type: 'icon', Icon: SiStripe };
  if (t.includes('gradle')) return { type: 'icon', Icon: SiGradle };
  if (t.includes('android studio')) return { type: 'icon', Icon: SiAndroidstudio };
  if (t.includes('compose')) return { type: 'icon', Icon: SiJetpackcompose };
  if (t.includes('canvas') || t.includes('bitmap')) return { type: 'icon', Icon: SiCanvas };

  // 3. Web & Backend Frameworks (Checked before JavaScript/TypeScript/SQL substring matchers)
  if (t.includes('next')) return { type: 'icon', Icon: SiNextdotjs };
  if (t.includes('nuxt')) return { type: 'icon', Icon: SiNuxt };
  if (t.includes('vue')) return { type: 'icon', Icon: SiVuedotjs };
  if (t.includes('pinia')) return { type: 'icon', Icon: SiPinia };
  if (t.includes('vite')) return { type: 'icon', Icon: SiVite };
  if (t.includes('tanstack') || t.includes('react query') || t.includes('query')) return { type: 'icon', Icon: SiReactquery };
  if (t.includes('react')) return { type: 'icon', Icon: SiReact };
  if (t.includes('nest')) return { type: 'icon', Icon: SiNestjs };
  if (t.includes('tailwind')) return { type: 'icon', Icon: SiTailwindcss };
  if (t.includes('zod')) return { type: 'icon', Icon: SiZod };
  if (t.includes('git')) return { type: 'icon', Icon: SiGit };
  if (t.includes('html')) return { type: 'icon', Icon: SiHtml5 };
  if (t.includes('css')) return { type: 'icon', Icon: SiCss };
  if (t.includes('laravel')) return { type: 'icon', Icon: SiLaravel };
  if (t.includes('codeigniter')) return { type: 'icon', Icon: SiCodeigniter };

  // 4. Databases & Persistence (Checked before generic SQL text monogram)
  if (t.includes('supabase')) return { type: 'icon', Icon: SiSupabase };
  if (t.includes('postgres') || t.includes('psql')) return { type: 'icon', Icon: SiPostgresql };
  if (t.includes('mysql')) return { type: 'icon', Icon: SiMysql };
  if (t.includes('redis')) return { type: 'icon', Icon: SiRedis };
  if (t.includes('docker')) return { type: 'icon', Icon: SiDocker };
  if (t.includes('minio')) return { type: 'icon', Icon: SiMinio };
  if (t.includes('prisma')) return { type: 'icon', Icon: SiPrisma };
  if (t.includes('sql') || t.includes('data modeling')) return { type: 'text', text: 'SQL' };

  // 5. Scientific, Signal Processing & Neural Architectures
  if (t.includes('pytorch')) return { type: 'icon', Icon: SiPytorch };
  if (t.includes('jupyter')) return { type: 'icon', Icon: SiJupyter };
  if (t.includes('scikit') || t.includes('sklearn')) return { type: 'icon', Icon: SiScikitlearn };
  if (t.includes('numpy')) return { type: 'icon', Icon: SiNumpy };
  if (t.includes('pandas')) return { type: 'icon', Icon: SiPandas };
  if (t.includes('scipy')) return { type: 'icon', Icon: SiScipy };
  if (t.includes('mne') || t.includes('eeg') || t.includes('signal')) return { type: 'icon', Icon: Activity };
  if (t.includes('webgl') || t.includes('glsl') || t.includes('shader')) return { type: 'icon', Icon: SiWebgl };

  // 6. Languages (With strict boundary matching for 'ts' / 'js' to prevent greedy substring collisions)
  if (t.includes('kotlin')) return { type: 'icon', Icon: SiKotlin };
  if (t.includes('swift') || t.includes('ios')) return { type: 'icon', Icon: SiSwift };
  if (t.includes('android')) return { type: 'icon', Icon: SiAndroid };
  if (t.includes('typescript') || /\btypescript\b/.test(t) || t === 'ts' || t === 'tech-typescript') return { type: 'icon', Icon: SiTypescript };
  if (t.includes('javascript') || t === 'js' || t === 'tech-js' || t.includes('es6')) return { type: 'icon', Icon: SiJavascript };
  if (t.includes('python')) return { type: 'icon', Icon: SiPython };
  if (t.includes('php')) return { type: 'icon', Icon: SiPhp };
  if (t.includes('java') && !t.includes('javascript')) return { type: 'icon', Icon: SiOpenjdk };

  // 7. Conceptual Systems, Workflows & Architecture
  if (t.includes('flowchart') || t.includes('flow') || t.includes('monorepo') || t.includes('subsystem')) return { type: 'icon', Icon: GitBranch };
  if (t.includes('journey') || t.includes('state machine') || t.includes('nitro') || t.includes('engine')) return { type: 'icon', Icon: Layers };
  if (t.includes('gnn') || t.includes('graph')) return { type: 'icon', Icon: Network };
  if (t.includes('mamba') || t.includes('cpu')) return { type: 'icon', Icon: Cpu };

  // Fallback
  return { type: 'icon', Icon: Code2 };
}

export function TechLogoBadge({
  tech,
  className = '',
  size = 'md',
  tooltipSide = 'top',
  showTooltip = true,
  isCore,
}: TechLogoBadgeProps) {
  const label = typeof tech === 'string' ? tech : tech.name;
  const isCoreEffective = isCore ?? (typeof tech === 'object' ? Boolean(tech.isCore) : false);
  const visual = getTechVisual(label);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-9 h-9',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  }[size];

  const textSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
  }[size];

  const tooltipPosition =
    tooltipSide === 'top'
      ? '-top-8 left-1/2 -translate-x-1/2'
      : '-bottom-8 left-1/2 -translate-x-1/2';

  const arrowClass =
    tooltipSide === 'top'
      ? 'top-full left-1/2 -translate-x-1/2 -mt-[1px] border-t-[#181614] border-b-transparent'
      : 'bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-b-[#181614] border-t-transparent';

  const badgeThemeClass = isCoreEffective
    ? 'bg-ochre/10 border-ochre/30 text-ochre hover:border-ochre/60 hover:bg-ochre/20'
    : 'bg-cream/[0.04] border-cream/10 text-cream/70 hover:border-ochre/40 hover:bg-ochre/10 hover:text-ochre';

  return (
    <div
      aria-label={label}
      tabIndex={0}
      className={`group/badge relative flex items-center justify-center rounded-lg border transition-all duration-200 select-none cursor-default shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre ${badgeThemeClass} ${sizeClasses} ${className}`}
    >
      {/* Monochromatic SVG Icon or Distinct Letter Monogram (e.g. KMP, WPT, LDA) */}
      {visual.type === 'icon' ? (
        <visual.Icon className={`${iconSizes} transition-transform duration-200 group-hover/badge:scale-110 shrink-0`} />
      ) : (
        <span className={`font-mono font-bold tracking-tight uppercase transition-transform duration-200 group-hover/badge:scale-110 select-none leading-none ${textSizes}`}>
          {visual.text}
        </span>
      )}

      {/* Floating Micro Tooltip - Scoped strictly to group/badge to avoid simultaneous popup on card hover */}
      {showTooltip && (
        <div
          role="tooltip"
          className={`absolute ${tooltipPosition} px-2 py-0.5 rounded bg-[#181614] border border-cream/15 text-cream font-mono text-[10px] tracking-wider uppercase shadow-xl shadow-black/90 pointer-events-none opacity-0 group-hover/badge:opacity-100 group-focus-visible/badge:opacity-100 transition-opacity duration-150 whitespace-nowrap z-40 flex items-center gap-1.5`}
        >
          {isCoreEffective && <span className="w-1.5 h-1.5 rounded-full bg-ochre shrink-0" />}
          <span>{label}</span>
          <div className={`absolute border-4 border-transparent ${arrowClass}`} />
        </div>
      )}
    </div>
  );
}

export default TechLogoBadge;
