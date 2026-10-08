
export type JobType = "job" | "internship";

export interface JobCompany {
  name: string;
  /** Used to build the company page link: /companies/<slug> */
  slug: string;
  /** Optional logo URL. A letter placeholder is shown when missing. */
  logo?: string;
}

export interface Job {
  id: string;
  /** Used to build the job detail link: /jobs/<slug> */
  slug: string;
  title: string;
  type: JobType;
  daysLeft: number;
  company: JobCompany;

  /* Used by the category page filters.
     Each value is an option `id` from lib/constants/job-filters.ts */
  level: string;
  employmentType: string;
  education: string;
  industry: string;

  /** ISO date string, used by "Latest" sorting. */
  postedAt: string;
}