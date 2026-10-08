import type {
  FilterKey,
  SelectedFilters,
  SortOptionId,
} from "@/lib/constants/job-filters";
import type { Job } from "@/lib/types/job";

const FILTER_KEYS: readonly FilterKey[] = [
  "level",
  "employmentType",
  "education",
  "industry",
];

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
