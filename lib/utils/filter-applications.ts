import {
  APPLICATION_FILTERS,
  type ApplicationFilter,
} from "@/lib/constants/application-filters";
import type { TrackedApplication } from "@/lib/types/jobseeker-dashboard";

export function filterApplications(
  applications: readonly TrackedApplication[],
  filter: ApplicationFilter,
): TrackedApplication[] {
  const statuses = APPLICATION_FILTERS.find(
    (item) => item.id === filter,
  )?.statuses;
  if (!statuses) return [...applications];

  return applications.filter((application) =>
    statuses.includes(application.status),
  );
}
