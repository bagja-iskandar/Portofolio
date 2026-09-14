/**
 * @file github.ts
 * @description Canonical Type Definitions for GitHub Activity Tracker & Telemetry
 * Conforms to §38 & §39 of PROJECT_BIBLE.md and Design Guardian Specifications.
 */

export interface GitHubRepoActivity {
  readonly projectId: string;
  readonly repoName: string;
  readonly repoUrl: string;
  readonly pushedAt: string; // ISO 8601 string
  readonly defaultBranch: string;
  readonly isArchived: boolean;
  readonly relativeTelemetry: string; // e.g. "COMMIT: 12D AGO"
  readonly shortTelemetry: string; // e.g. "12D AGO"
  readonly formattedDate: string; // e.g. "Sep 02, 2026"
  readonly isRecent: boolean; // Pushed within last 48h
}

export interface GitHubActivityApiResponse {
  readonly success: boolean;
  readonly source: 'live' | 'cached' | 'fallback';
  readonly fetchedAt: string;
  readonly data: Record<string, GitHubRepoActivity>;
}
