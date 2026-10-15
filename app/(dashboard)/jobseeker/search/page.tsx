import type { Metadata } from "next";
import CompanyResultCard from "@/components/dashboard/jobseeker/search/CompanyResultCard";
import ResultsPagination from "@/components/dashboard/jobseeker/search/ResultsPagination";
import SearchEmptyState from "@/components/dashboard/jobseeker/search/SearchEmptyState";
import SearchJobCard from "@/components/dashboard/jobseeker/search/SearchJobCard";
import { getSearchIndex } from "@/lib/data/search-index";
import {
  paginate,
  searchCompanies,
  searchJobEntries,
} from "@/lib/utils/search-results";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
}

const MAX_QUERY_LENGTH = 60;
const first = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

async function readParams(searchParams: PageProps["searchParams"]) {
  const params = await searchParams;
  const query = (first(params.q) ?? "").trim().slice(0, MAX_QUERY_LENGTH);
  const page = Number.parseInt(first(params.page) ?? "1", 10);
  return { query, page: Number.isFinite(page) ? page : 1 };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { query } = await readParams(searchParams);
  return { title: query ? `Search: ${query}` : "Search" };
}

export default async function JobseekerSearchPage({ searchParams }: PageProps) {
  const { query, page } = await readParams(searchParams);

  const index = query ? await getSearchIndex() : [];
  const allJobs = searchJobEntries(query, index);
  const companies = searchCompanies(query, index);
  const results = paginate(allJobs, page);

  const hasResults = allJobs.length > 0 || companies.length > 0;

  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-2">
        <p className="text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light">
          Search
        </p>
        <h1 className="text-lg font-semibold font-manrope text-text-heading">
          {query ? (
            <>
              Results for &ldquo;
              <span className="text-primary-blue"> {query} </span>&rdquo;
            </>
          ) : (
            <span className="text-primary-blue">Search jobs and companies</span>
          )}
        </h1>
        {query && (
          <p
            role="status"
            className="text-sm font-inter text-text-secondary-color"
          >
            {allJobs.length} {allJobs.length === 1 ? "job" : "jobs"}
            {companies.length > 0 &&
              ` and ${companies.length} ${companies.length === 1 ? "company" : "companies"}`}{" "}
            found
          </p>
        )}
      </header>

      {!query || !hasResults ? (
        <SearchEmptyState query={query || undefined} />
      ) : (
        <>
          {companies.length > 0 && (
            <section
              aria-labelledby="search-companies"
              className="flex flex-col gap-4"
            >
              <h2
                id="search-companies"
                className="text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light"
              >
                Companies
              </h2>
              <ul
                role="list"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                {companies.map((company) => (
                  <CompanyResultCard
                    key={company.name}
                    company={company}
                    query={query}
                  />
                ))}
              </ul>
            </section>
          )}

          {allJobs.length > 0 && (
            <section
              aria-labelledby="search-jobs"
              className="flex flex-col gap-4"
            >
              <h2
                id="search-jobs"
                className="text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light"
              >
                Jobs
              </h2>
              <ul
                role="list"
                className="flex border p-4 border-separator4 rounded-xl flex-col gap-6"
              >
                {results.items.map((job) => (
                  <SearchJobCard key={job.id} job={job} query={query} />
                ))}
              </ul>
              <ResultsPagination
                query={query}
                page={results.page}
                totalPages={results.totalPages}
              />
            </section>
          )}
        </>
      )}
    </div>
  );
}
