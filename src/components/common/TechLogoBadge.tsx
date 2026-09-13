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

// Custom SVG Icons for AI-Assisted Engineering Platforms
const CodexIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6644zm-12.618-1.5543l2.02-1.1636a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6669l-5.838-3.3878z" />
  </svg>
);

const AntigravityIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2L4 16h5v6h6v-6h5L12 2zm0 4.5l3.8 6.5H13v5h-2v-5H8.2L12 6.5z" />
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
