import { NextResponse } from 'next/server';
import type { GitHubRepoActivity, GitHubActivityApiResponse } from '@/types/github';

export const revalidate = 3600; // Server-side ISR revalidation: 1 hour

interface RepoConfig {
  projectId: string;
  repoName: string;
  defaultBranch: string;
  fallbackPushedAt: string;
}

const TRACKED_REPOS: readonly RepoConfig[] = [
  {
    projectId: 'proj-bci-research',
    repoName: 'eeg-motor-imagery-gnn-mamba',
    defaultBranch: 'main',
    fallbackPushedAt: '2026-01-24T09:53:36Z',
  },
  {
    projectId: 'proj-wms',
    repoName: 'Warehouse-Management-System',
    defaultBranch: 'main',
    fallbackPushedAt: '2026-09-02T15:18:36Z',
  },
  {
    projectId: 'proj-mgmt-dashboard',
    repoName: 'Management',
    defaultBranch: 'main',
    fallbackPushedAt: '2026-08-15T11:14:38Z',
  },
  {
    projectId: 'proj-mobile-image-editor',
    repoName: 'Aplkasi-Histogram',
    defaultBranch: 'master',
    fallbackPushedAt: '2025-01-29T12:51:44Z',
  },
] as const;

function formatTelemetry(isoDate: string): {
  relativeTelemetry: string;
  shortTelemetry: string;
  formattedDate: string;
  isRecent: boolean;
} {
  const parsedTime = new Date(isoDate).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - parsedTime);

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffDays / 365.25);

  let shortUnit = 'RECENT';
  if (diffMinutes < 60) {
    shortUnit = `${Math.max(1, diffMinutes)}M`;
  } else if (diffHours < 24) {
    shortUnit = `${diffHours}H`;
  } else if (diffDays < 30) {
    shortUnit = `${diffDays}D`;
  } else if (diffMonths < 12) {
    shortUnit = `${diffMonths}MO`;
  } else {
    shortUnit = `${diffYears}Y`;
  }

  const shortTelemetry = `${shortUnit} AGO`;
  const relativeTelemetry = `COMMIT: ${shortUnit} AGO`;
  const isRecent = diffDays <= 2;

  const dateObj = new Date(isoDate);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return { relativeTelemetry, shortTelemetry, formattedDate, isRecent };
}

export async function GET() {
  const data: Record<string, GitHubRepoActivity> = {};
  let overallSource: 'live' | 'cached' | 'fallback' = 'live';

  try {
    const fetchPromises = TRACKED_REPOS.map(async (config) => {
      try {
        const res = await fetch(`https://api.github.com/repos/bagja-iskandar/${config.repoName}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Threshold-Telemetry/1.0',
            ...(process.env.GITHUB_TOKEN
              ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
              : {}),
          },
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          throw new Error(`GitHub API HTTP ${res.status} for ${config.repoName}`);
        }

        const json = await res.json();
        const pushedAt = json.pushed_at || json.updated_at || config.fallbackPushedAt;
        const telemetry = formatTelemetry(pushedAt);

        const activity: GitHubRepoActivity = {
          projectId: config.projectId,
          repoName: config.repoName,
          repoUrl: `https://github.com/bagja-iskandar/${config.repoName}`,
          pushedAt,
          defaultBranch: json.default_branch || config.defaultBranch,
          isArchived: Boolean(json.archived),
          ...telemetry,
        };

        return activity;
      } catch {
        overallSource = 'fallback';
        const telemetry = formatTelemetry(config.fallbackPushedAt);
        const activity: GitHubRepoActivity = {
          projectId: config.projectId,
          repoName: config.repoName,
          repoUrl: `https://github.com/bagja-iskandar/${config.repoName}`,
          pushedAt: config.fallbackPushedAt,
          defaultBranch: config.defaultBranch,
          isArchived: false,
          ...telemetry,
        };
        return activity;
      }
    });

    const results = await Promise.all(fetchPromises);

    for (const item of results) {
      // Key by both projectId (primary) and repoName (alias)
      data[item.projectId] = item;
      data[item.repoName] = item;
    }

    const payload: GitHubActivityApiResponse = {
      success: true,
      source: overallSource,
      fetchedAt: new Date().toISOString(),
      data,
    };

    return NextResponse.json(payload);
  } catch {
    // Top-level recovery fallback
    for (const config of TRACKED_REPOS) {
      const telemetry = formatTelemetry(config.fallbackPushedAt);
      const activity: GitHubRepoActivity = {
        projectId: config.projectId,
        repoName: config.repoName,
        repoUrl: `https://github.com/bagja-iskandar/${config.repoName}`,
        pushedAt: config.fallbackPushedAt,
        defaultBranch: config.defaultBranch,
        isArchived: false,
        ...telemetry,
      };
      data[config.projectId] = activity;
      data[config.repoName] = activity;
    }

    const fallbackPayload: GitHubActivityApiResponse = {
      success: true,
      source: 'fallback',
      fetchedAt: new Date().toISOString(),
      data,
    };

    return NextResponse.json(fallbackPayload);
  }
}
