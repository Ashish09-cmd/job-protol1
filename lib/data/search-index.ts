import { MOCK_JOBS } from "@/lib/constants/mock-jobs";
import type { SearchIndexEntry } from "@/lib/types/search-suggestions";

type Loose = Record<string, unknown>;

/** Reads a value as text. Objects such as `{ name: "..." }` or `{ src: "..." }` work too. */
function text(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return String(value);
  if (typeof value === "object" && value !== null) {
    const inner = value as Loose;
    return (
      text(inner.name) ??
      text(inner.title) ??
      text(inner.src) ??
      text(inner.url)
    );
  }
  return undefined;
}

/** First field in `keys` that has a value. */
function pick(job: Loose, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = text(job[key]);
    if (value) return value;
  }
  return undefined;
}

/**
 * Everything the search can match: one entry per open job.
 *
 * TODO: replace with a query against your jobs API or database. Keep the
 * return type and nothing else needs to change.
 *
 * The field names below are tried in order, so this works with the usual
 * spellings of your Job type. If something still comes out empty, add your
 * real property name to the matching list.
 */
export async function getSearchIndex(): Promise<SearchIndexEntry[]> {
  return (MOCK_JOBS as unknown as Loose[]).flatMap((job) => {
    const slug = pick(job, ["slug"]);
    const title = pick(job, ["title", "jobTitle", "name"]);
    const company = pick(job, [
      "company",
      "companyName",
      "employer",
      "organization",
    ]);
    if (!slug || !title || !company) return [];

    return [
      {
        id: pick(job, ["id"]) ?? slug,
        slug,
        title,
        company,
        logoUrl: pick(job, ["logo", "logoUrl", "companyLogo", "image"]),
        employmentType: pick(job, ["employmentType", "type", "jobType"]),
        level: pick(job, ["level", "jobLevel", "experienceLevel"]),
      },
    ];
  });
}
