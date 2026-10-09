import type { Metadata } from "next";
import Link from "next/link";
import CategoryJobs from "@/components/clients-page/category/CategoryJobs";
import { MOCK_JOBS } from "@/lib/constants/mock-jobs";
import { SEARCH_PARAM } from "@/lib/constants/search";
import { searchJobs } from "@/lib/utils/filter-and-sort-jobs";
import JobSearchBar from "@/components/clients-page/home/partials/JobSearchBar";

/** Update to your job seeker registration route. */
const JOB_SEEKER_HREF = "/register/job-seeker";

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getQuery(params: Record<string, string | string[] | undefined>) {
  const value = params[SEARCH_PARAM];
  const text = Array.isArray(value) ? value[0] : value;

  return (text ?? "").trim().slice(0, 100);
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = getQuery(await searchParams);

  return {
    title: query
      ? `${query} jobs and internships`
      : "Search Jobs & Internships",
    description: query
      ? `Browse jobs and internships matching “${query}”. Filter by level, employment type, education and industry.`
      : "Search verified jobs and internships by title, keyword or company.",
    // Result pages for every possible query are thin content: keep them out of Google.
    robots: query ? { index: false, follow: true } : undefined,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = getQuery(await searchParams);

  // Replace with your API call, e.g. await getJobs({ query }).
  const results = searchJobs(MOCK_JOBS, query);

  return (
    <>
      <section aria-label="Search jobs" className="bg-blue-50 py-8">
        <div className="max-w-3xl mx-auto">
          {/* key: remounts on a new search so the input always matches the URL */}
          <JobSearchBar
            key={query}
            variant="page"
            buttonLabel="Find Job"
            enableSuggestions={false}
            initialQuery={query}
            autoFocus={!query}
          />
        </div>
      </section>

      {/* key: resets the sidebar filters when the search text changes */}
      <CategoryJobs
        key={query}
        jobs={results}
        title={
          query ? `Search results for ${query}` : "Search jobs and internships"
        }
        filterOpenByDefault
        showSort={false}
        summaryBar={
          <>
            <Link
              href={JOB_SEEKER_HREF}
              className="text-primary-blue hover:underline"
            >
              Create Your Profile-
            </Link>{" "}
            Let Employers Find You
          </>
        }
      />
    </>
  );
}
