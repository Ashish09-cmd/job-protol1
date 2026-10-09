import {
  FILTER_GROUPS,
  type FilterKey,
  type SelectedFilters,
  type SortOptionId,
} from "@/lib/constants/job-filters";
import type { Job } from "@/lib/types/job";

const FILTER_KEYS: readonly FilterKey[] = [
  "level",
  "employmentType",
  "education",
  "industry",
];

/** industry id -> readable label, e.g. "it-telecom-services" -> "IT & Telecom Services" */
const INDUSTRY_LABELS = new Map<string, string>(
  (FILTER_GROUPS.find((group) => group.key === "industry")?.options ?? []).map(
    (option): [string, string] => [option.id, option.label],
  ),
);

/** "UI/UX Designer" -> ["ui", "ux", "designer"] (works for any language). */
function toWords(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

/**
 * Text search over the job title, company name and category (industry).
 * Every word typed must start one of those words, so "ui ux designer" finds
 * "UI/UX Designer" and "creative" finds the Creative/Designing/Graphics category.
 * An empty query returns all jobs.
 */
export function searchJobs(jobs: readonly Job[], query: string): Job[] {
  const queryWords = toWords(query);
  if (queryWords.length === 0) return [...jobs];

  return jobs.filter((job) => {
    const jobWords = toWords(
      `${job.title} ${job.company.name} ${INDUSTRY_LABELS.get(job.industry) ?? ""}`,
    );

    return queryWords.every((queryWord) =>
      jobWords.some((jobWord) => jobWord.startsWith(queryWord)),
    );
  });
}

/**
 * A job must match EVERY group that has a selection (AND between groups),
 * but only ONE of the selected options inside a group (OR within a group).
 * Example: Mid-Level OR Senior-level, AND Full-time.
 */
export function filterJobs(
  jobs: readonly Job[],
  selected: SelectedFilters,
): Job[] {
  return jobs.filter((job) =>
    FILTER_KEYS.every(
      (key) => selected[key].length === 0 || selected[key].includes(job[key]),
    ),
  );
}

export function sortJobs(jobs: readonly Job[], sortBy: SortOptionId): Job[] {
  const sorted = [...jobs];
  const newestFirst = (a: Job, b: Job) =>
    Date.parse(b.postedAt) - Date.parse(a.postedAt);

  switch (sortBy) {
    case "latest":
      return sorted.sort(newestFirst);
    case "closing-soon":
      return sorted.sort(
        (a, b) => a.daysLeft - b.daysLeft || newestFirst(a, b),
      );
    case "title-asc":
      return sorted.sort(
        (a, b) => a.title.localeCompare(b.title) || a.id.localeCompare(b.id),
      );
  }
}

export function countActiveFilters(selected: SelectedFilters): number {
  return FILTER_KEYS.reduce((total, key) => total + selected[key].length, 0);
}
