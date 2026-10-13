export interface SavedJob {
  id: string;
  /** Job page lives at `/${slug}`. */
  slug: string;
  title: string;
  companyName: string;
  companySlug: string;
  logoUrl?: string;
  employmentType: string;
  /** Days until the vacancy closes. */
  daysLeft: number;
}

export interface FollowedCompany {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  newOpenings: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year?: string;
}

export interface ContactDetails {
  email: string;
  phones: string[];
  address: string;
}

export interface JobProfile {
  id: string;
  title: string;
  isPrimary: boolean;
  summary: string;
  skills: string[];
}

export interface MasterProfile {
  fullName: string;
  headline: string;
  location: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  /** Maximum number of skills a jobseeker can add. */
  skillLimit: number;
  certifications: Certification[];
  contact: ContactDetails;
  jobProfiles: JobProfile[];
}
