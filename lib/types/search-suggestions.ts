export type SuggestionType = "job" | "company";

export interface SearchSuggestion {
  id: string;
  type: SuggestionType;
  /** Text shown (and searched) when the suggestion is chosen. */
  label: string;
  /** Second line: the company for a job, or how many jobs a company has open. */
  detail?: string;
}

/** One searchable job. Suggestions and the results page are both built from these. */
export interface SearchIndexEntry {
  id: string;
  /** The job page lives at `/${slug}`. */
  slug: string;
  title: string;
  company: string;
  logoUrl?: string;
  employmentType?: string;
  level?: string;
}

/** A company that matched the search, with how many jobs it has open. */
export interface CompanyResult {
  name: string;
  logoUrl?: string;
  jobCount: number;
}
