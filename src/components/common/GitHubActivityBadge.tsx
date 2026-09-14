'use client';

import React from 'react';
import { useGitHubActivity } from '@/hooks/useGitHubActivity';

interface GitHubActivityBadgeProps {
  projectId: string;
  variant?: 'compact' | 'drawer' | 'telemetry-pill';
  className?: string;
}

export function GitHubActivityBadge({
  projectId,
  variant = 'compact',
  className = '',
}: GitHubActivityBadgeProps) {
  const { activity, isLoading, isMounted } = useGitHubActivity(projectId);

  if (!activity && !isLoading) {
    return null;
  }

  // During SSR / initial client mount or loading, render clean subtle placeholder to prevent layout shift
  if (!isMounted || isLoading || !activity) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded font-mono text-[9px] md:text-[10px] text-cream/30 bg-cream/[0.02] border border-cream/5 animate-pulse select-none ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cream/20 shrink-0" />
        <span className="uppercase tracking-wider">SYNCING...</span>
      </span>
    );
  }

  const tooltipText = `GitHub Telemetry // ${activity.repoName} [${activity.defaultBranch}] • Last updated on ${activity.formattedDate}`;

  if (variant === 'telemetry-pill' || variant === 'drawer') {
    return (
      <span
        title={tooltipText}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-500/20 bg-[#0D1511] font-mono text-[9px] md:text-[10px] tracking-wider uppercase select-none transition-colors hover:border-emerald-500/40 ${className}`}
      >
        <div className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40 motion-reduce:animate-none" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.3)]" />
        </div>
        <span className="text-emerald-500/90 font-medium">REPO TELEMETRY:</span>
        <span className="text-cream/90 font-medium">UPDATED {activity.shortTelemetry}</span>
      </span>
    );
  }

  // Compact badge for table summary rows (harmonic emerald telemetry)
  return (
    <span
      title={tooltipText}
      className={`inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-wider uppercase select-none ${className}`}
    >
      <div className="relative flex h-1.5 w-1.5 shrink-0">
        {activity.isRecent && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40 motion-reduce:animate-none" />
        )}
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.3)]" />
      </div>
      <span className="text-emerald-500/90 font-medium">UPDATED:</span>
      <span className="text-cream/90 font-medium hover:text-cream transition-colors">
        {activity.shortTelemetry}
      </span>
    </span>
  );
}

export default GitHubActivityBadge;
