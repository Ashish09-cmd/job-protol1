export interface JobseekerUser {
  id: string;
  fullName: string;
  firstName: string;
  avatar?: string;
}

export type ApplicationStatus =
  | "applied"
  | "under-review"
  | "interview"
  | "hired"
  | "rejected"
  | "withdrawn";

export interface TrackedApplication {
  id: string;
  jobTitle: string;
  /** Job details page: /<jobSlug> */
  jobSlug: string;
  companyName: string;
  /** Company page: /companies/<companySlug> */
  companySlug: string;
  companyLogo?: string;
  /** ISO date, e.g. "2026-09-26" */
  appliedOn: string;
  status: ApplicationStatus;
}

export interface ProfileViewer {
  id: string;
  name: string;
  slug: string;
  industry: string;
  avatar?: string;
  /** ISO date-time */
  viewedAt: string;
}

export interface JobPreferences {
  locations: string[];
  jobType: string;
  salaryRange: string;
  interests: string[];
  experience: string;
  skills: string[];
}

export interface SavedJobPreview {
  id: string;
  title: string;
  slug: string;
  companyName: string;
  companyLogo?: string;
}

export interface FollowedCompanyPreview {
  id: string;
  name: string;
  slug: string;
  industry: string;
  openRoles: number;
  logo?: string;
}

export interface JobseekerOverview {
  /** 0-100 */
  profileCompletion: number;
  openToWork: { enabled: boolean; renewsInDays: number };
  stats: {
    applicationsSent: number;
    profileViews: number;
    savedJobs: number;
    companiesFollowed: number;
  };
  /** The latest applications (a short preview, not the full list). */
  applications: TrackedApplication[];
  viewers: { totalThisMonth: number; recent: ProfileViewer[] };
  preferences: JobPreferences;
  /** Link to the uploaded CV file. Missing when no CV has been uploaded. */
  cvUrl?: string;
  savedJobs: SavedJobPreview[];
  followedCompanies: FollowedCompanyPreview[];
}
