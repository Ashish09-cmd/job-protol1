import type { ApplicationStatus } from "@/lib/types/jobseeker-dashboard";

export type ApplicationFilter =
  | "all"
  | "applied"
  | "under-review"
  | "interview"
  | "hired"
  | "rejected";

interface ApplicationFilterConfig {
  id: ApplicationFilter;
  label: string;
  /** Statuses shown under this tab. `null` means every status (including withdrawn). */
  statuses: readonly ApplicationStatus[] | null;
}

/** Tabs of the Applications page, in display order. */
export const APPLICATION_FILTERS: readonly ApplicationFilterConfig[] = [
  { id: "all", label: "All", statuses: null },
  { id: "applied", label: "Applied", statuses: ["applied"] },
  { id: "under-review", label: "Under Review", statuses: ["under-review"] },
  { id: "interview", label: "Interview", statuses: ["interview"] },
  { id: "hired", label: "Offer/Hired", statuses: ["hired"] },
  { id: "rejected", label: "Rejected", statuses: ["rejected"] },
];
