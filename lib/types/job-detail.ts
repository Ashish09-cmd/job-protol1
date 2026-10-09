export interface JobDetailCompany {
  name: string;
  /** Used for the company page link: /companies/<slug> */
  slug: string;
  logo?: string;
  /** When present, the page shows the banner with the logo overlapping it. */
  banner?: string;
  website?: string;
  industry: string;
  foundedYear: number;
  pastJobs: number;
  organizationSize: string;
}

/** A titled checklist, e.g. "Key Responsibilities" or "Requirements". */
export interface JobDetailSection {
  title: string;
  items: string[];
}

export interface SimilarRole {
  slug: string;
  title: string;
  companyName: string;
}

export interface JobDetail {
  id: string;
  slug: string;
  title: string;
  company: JobDetailCompany;
  location: string;

  /** ISO dates, e.g. "2026-09-01" */
  publishedOn: string;
  applyBefore: string;

  /* Tags shown under the header */
  category: string;
  employmentType: string;
  level: string;
  salary: string;

  /** "About the Role": one string per paragraph. */
  description: string[];
  sections: JobDetailSection[];
  skills: string[];
  similarRoles: SimilarRole[];
}
