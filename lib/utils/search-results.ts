import type {
  CompanyResult,
  SearchIndexEntry,
} from "@/lib/types/search-suggestions";
import { matchesWordStart } from "./search-suggestions";

export const RESULTS_PAGE_SIZE = 10;
export const MAX_COMPANY_RESULTS = 4;

/**
 * Jobs whose title or company matches. Best matches first:
 * title starts with the text, then a title word starts with it, then company-only.
 */
export function searchJobEntries(
  query: string,
  index: SearchIndexEntry[],
): SearchIndexEntry[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const lower = trimmed.toLowerCase();

  const rank = (entry: SearchIndexEntry): number | null => {
    if (entry.title.toLowerCase().startsWith(lower)) return 0;
    if (matchesWordStart(entry.title, trimmed)) return 1;
    if (matchesWordStart(entry.company, trimmed)) return 2;
    return null;
  };

  return index
    .map((entry, position) => ({ entry, position, score: rank(entry) }))
    .filter(
      (
        item,
      ): item is { entry: SearchIndexEntry; position: number; score: number } =>
        item.score !== null,
    )
    .sort((a, b) => a.score - b.score || a.position - b.position)
    .map((item) => item.entry);
}

/** Companies whose name matches, with their number of open jobs. */
export function searchCompanies(
  query: string,
  index: SearchIndexEntry[],
): CompanyResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const companies = new Map<string, CompanyResult>();
  for (const entry of index) {
    if (!matchesWordStart(entry.company, trimmed)) continue;
    const key = entry.company.toLowerCase();
    const existing = companies.get(key);
    if (existing) {
      existing.jobCount += 1;
      existing.logoUrl ??= entry.logoUrl;
    } else {
      companies.set(key, {
        name: entry.company,
        logoUrl: entry.logoUrl,
        jobCount: 1,
      });
    }
  }

  const lower = trimmed.toLowerCase();
  return [...companies.values()]
    .sort(
      (a, b) =>
        Number(!a.name.toLowerCase().startsWith(lower)) -
          Number(!b.name.toLowerCase().startsWith(lower)) ||
        a.name.localeCompare(b.name),
    )
    .slice(0, MAX_COMPANY_RESULTS);
}

export function paginate<T>(
  items: T[],
  page: number,
  size = RESULTS_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((current - 1) * size, current * size),
    page: current,
    totalPages,
  };
}
