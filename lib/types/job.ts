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
}
