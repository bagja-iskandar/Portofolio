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

  const tooltipText = `GitHub Telemetry // ${activity.repoName} [${activity.defaultBranch}] • Pushed on ${activity.formattedDate}`;

  if (variant === 'telemetry-pill' || variant === 'drawer') {
    return (
      <span
        title={tooltipText}
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border border-cream/10 bg-[#141210] font-mono text-[9px] md:text-[10px] tracking-wider text-[#8A847C] uppercase select-none transition-colors hover:border-ochre/30 hover:text-cream/80 ${className}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            activity.isRecent ? 'bg-ochre animate-pulse' : 'bg-ochre/80'
          }`}
        />
        <span className="text-ochre font-medium">REPO TELEMETRY:</span>
        <span className="text-cream/70">PUSHED {activity.shortTelemetry}</span>
      </span>
    );
  }

  // Compact badge for table summary rows (analytical machine telemetry)
  return (
    <span
      title={tooltipText}
      className={`inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-wider text-[#8A847C] uppercase select-none ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          activity.isRecent ? 'bg-ochre animate-pulse' : 'bg-ochre/80'
        }`}
      />
      <span className="hover:text-cream/70 transition-colors">
        {activity.relativeTelemetry}
      </span>
    </span>
  );
}

export default GitHubActivityBadge;
