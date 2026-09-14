'use client';

import { useState, useEffect } from 'react';
import type { GitHubActivityApiResponse, GitHubRepoActivity } from '@/types/github';

// In-memory module cache to deduplicate API calls across components
let cachedResponse: GitHubActivityApiResponse | null = null;
let pendingFetch: Promise<GitHubActivityApiResponse | null> | null = null;

export function formatRelativeTime(isoString?: string): string {
  if (!isoString) return 'Active';

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Active';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      return diffHours <= 1 ? 'Pushed recently' : `Pushed ${diffHours}h ago`;
    }

    if (diffDays === 1) return 'Pushed 1d ago';
    if (diffDays < 30) return `Pushed ${diffDays}d ago`;

    // Format as "Mon YYYY" (e.g., "Nov 2025")
    return `Push ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  } catch {
    return 'Active';
  }
}

export function useGitHubActivity(projectId?: string) {
  const [data, setData] = useState<Record<string, GitHubRepoActivity> | null>(
    cachedResponse?.data ?? null
  );
  const [isLoading, setIsLoading] = useState<boolean>(!cachedResponse);
  const [isError, setIsError] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    if (cachedResponse) {
      setData(cachedResponse.data);
      setIsLoading(false);
      return;
    }

    if (!pendingFetch) {
      pendingFetch = fetch('/api/github-activity')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json() as Promise<GitHubActivityApiResponse>;
        })
        .then((json) => {
          cachedResponse = json;
          return json;
        })
        .catch((err) => {
          console.warn('[useGitHubActivity] Fetch failed, using fallback:', err);
          return null;
        })
        .finally(() => {
          pendingFetch = null;
        });
    }

    pendingFetch.then((result) => {
      if (result && result.data) {
        setData(result.data);
        setIsError(false);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    });
  }, []);

  const getActivity = (idOrUrl?: string): GitHubRepoActivity | null => {
    if (!data || !idOrUrl) return null;

    // Check direct match (projectId or repoName)
    if (data[idOrUrl]) return data[idOrUrl];

    // Check if it's a full GitHub URL (extract repo slug)
    const match = idOrUrl.match(/github\.com\/[^/]+\/([^/#?]+)/);
    if (match && match[1]) {
      const repoSlug = match[1];
      if (data[repoSlug]) return data[repoSlug];
    }

    return null;
  };

  const projectActivity = projectId ? getActivity(projectId) : null;
  const relativeTime = isMounted && projectActivity ? formatRelativeTime(projectActivity.pushedAt) : '';

  return {
    activity: projectActivity,
    allActivities: data,
    isLoading,
    isError,
    isMounted,
    relativeTime,
    getActivity,
  };
}
