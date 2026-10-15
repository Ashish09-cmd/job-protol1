import Link from "next/link";
import { Icon } from "@iconify/react";

interface SearchEmptyStateProps {
  /** The text that found nothing. Leave out when nothing was searched yet. */
  query?: string;
}

export default function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-subtext-gray2/30 bg-white px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="inline-flex size-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-primary-blue"
      >
        <Icon icon="mdi:magnify" />
      </span>

      {query ? (
        <>
          <p className="text-lg-sm font-semibold font-manrope text-text-heading">
            No jobs or companies match &ldquo;{query}&rdquo;
          </p>
          <p className="max-w-sm text-sm font-inter text-text-secondary-color">
            Check the spelling, or try a shorter word like the job title or the
            start of the company name.
          </p>
          <Link
            href="/category"
            className="mt-2 rounded-md bg-primary-blue px-5 py-2.5 text-sm font-medium font-inter text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            Browse all jobs
          </Link>
        </>
      ) : (
        <>
          <p className="text-lg-sm font-semibold font-manrope text-text-heading">
            Search jobs or companies
          </p>
          <p className="max-w-sm text-sm font-inter text-text-secondary-color">
            Type a job title or a company name in the search box at the top of
            the page.
          </p>
        </>
      )}
    </div>
  );
}
