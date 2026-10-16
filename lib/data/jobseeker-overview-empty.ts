import type { JobseekerOverview } from "@/lib/types/jobseeker-dashboard";

/**
 * A brand-new account with no activity, for testing the empty states.
 * To try it, swap the import in app/(dashboard)/jobseeker/page.tsx:
 *   import { getEmptyJobseekerOverview as getJobseekerOverview } from "@/lib/data/jobseeker-overview-empty";
 * Delete this file when the real API is connected.
 */
export async function getEmptyJobseekerOverview(): Promise<JobseekerOverview> {
  return {
    profileCompletion: 10,
    openToWork: { enabled: false, renewsInDays: 0 },
    stats: {
      applicationsSent: 0,
      profileViews: 0,
      savedJobs: 0,
      companiesFollowed: 0,
    },
    applications: [],
    viewers: { totalThisMonth: 0, recent: [] },
    preferences: {
      locations: [],
      jobType: "",
      salaryRange: "",
      interests: [],
      experience: "",
      skills: [],
    },
    cvUrl: undefined,
    savedJobs: [],
    followedCompanies: [],
  };
}
