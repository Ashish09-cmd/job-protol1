import type {
  SearchIndexEntry,
  SearchSuggestion,
} from "@/lib/types/search-suggestions";

export const MAX_JOB_SUGGESTIONS = 5;
export const MAX_COMPANY_SUGGESTIONS = 3;

const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .filter(Boolean);

/** Every typed word must be the start of some word in the text. */
export function matchesWordStart(text: string, query: string): boolean {
  const queryWords = tokenize(query);
  if (queryWords.length === 0) return false;
  const textWords = tokenize(text);
  return queryWords.every((word) =>
    textWords.some((candidate) => candidate.startsWith(word)),
  );
}

/** Jobs first, then companies. Titles that start with the query come first. */
export function buildSuggestions(
  query: string,
  index: SearchIndexEntry[],
): SearchSuggestion[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const lower = trimmed.toLowerCase();

  const jobs = new Map<
    string,
    { title: string; company: string; count: number }
  >();
  const companies = new Map<string, { name: string; jobs: number }>();

  for (const entry of index) {
    if (matchesWordStart(entry.title, trimmed)) {
      const key = entry.title.toLowerCase();
      const group = jobs.get(key);
      if (group) group.count += 1;
      else
        jobs.set(key, { title: entry.title, company: entry.company, count: 1 });
    }
    if (matchesWordStart(entry.company, trimmed)) {
      const key = entry.company.toLowerCase();
      const group = companies.get(key);
      if (group) group.jobs += 1;
      else companies.set(key, { name: entry.company, jobs: 1 });
    }
  }

  const rank = (label: string) =>
    label.toLowerCase().startsWith(lower) ? 0 : 1;
  const byRank = (a: string, b: string) =>
    rank(a) - rank(b) || a.localeCompare(b);

  const jobSuggestions: SearchSuggestion[] = [...jobs.values()]
    .sort((a, b) => byRank(a.title, b.title))
    .slice(0, MAX_JOB_SUGGESTIONS)
    .map((job) => ({
      id: `job:${job.title.toLowerCase()}`,
      type: "job",
      label: job.title,
      detail: job.count === 1 ? job.company : `${job.count} openings`,
    }));

  const companySuggestions: SearchSuggestion[] = [...companies.values()]
    .sort((a, b) => byRank(a.name, b.name))
    .slice(0, MAX_COMPANY_SUGGESTIONS)
    .map((company) => ({
      id: `company:${company.name.toLowerCase()}`,
      type: "company",
      label: company.name,
      detail: `${company.jobs} open ${company.jobs === 1 ? "job" : "jobs"}`,
    }));

  return [...jobSuggestions, ...companySuggestions];
}
