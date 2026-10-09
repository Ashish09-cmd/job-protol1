"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import FilterSidebar from "@/components/clients-page/category/FilterSidebar";
import SortDropdown from "@/components/clients-page/category/SortDropdown";
import JobCard from "@/components/ui/JobCard";
import {
  DEFAULT_SORT,
  EMPTY_FILTERS,
  type FilterKey,
  type SelectedFilters,
  type SortOptionId,
} from "@/lib/constants/job-filters";
import {
  countActiveFilters,
  filterJobs,
  sortJobs,
} from "@/lib/utils/filter-and-sort-jobs";
import type { Job } from "@/lib/types/job";

/** 12 fits both layouts: 3 columns (filter open) and 4 columns (closed). */
const PAGE_SIZE = 12;

/** Start with the filter sidebar open? (On mobile it stacks above the list.) */
const FILTER_OPEN_BY_DEFAULT = false;

interface CategoryJobsProps {
  jobs: readonly Job[];
  /** Pre-selected filters, e.g. an industry for /category/[slug]. */
  initialFilters?: Partial<SelectedFilters>;
  /** Page heading for screen readers and search engines. */
  title?: string;
  /** Start with the filter sidebar open (large screens only). */
  filterOpenByDefault?: boolean;
  /** Show the "Sort by" menu. */
  showSort?: boolean;
  /**
   * Content for a full-width strip above the filters.
   * The "Showing X out of Y jobs" count appears on the right of that strip.
   */
  summaryBar?: ReactNode;
}

export default function CategoryJobs({
  jobs,
  initialFilters,
  title = "Browse jobs and internships",
  filterOpenByDefault = FILTER_OPEN_BY_DEFAULT,
  showSort = true,
  summaryBar,
}: CategoryJobsProps) {
  const [selected, setSelected] = useState<SelectedFilters>({
    ...EMPTY_FILTERS,
    ...initialFilters,
  });
  const [sortBy, setSortBy] = useState<SortOptionId>(DEFAULT_SORT);
  const [isFilterOpen, setIsFilterOpen] = useState(filterOpenByDefault);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // An open sidebar would push the list far down on phones, so only keep it
  // open by default on large screens.
  useEffect(() => {
    if (
      filterOpenByDefault &&
      !window.matchMedia("(min-width: 1024px)").matches
    ) {
      setIsFilterOpen(false);
    }
  }, [filterOpenByDefault]);

  const results = useMemo(
    () => sortJobs(filterJobs(jobs, selected), sortBy),
    [jobs, selected, sortBy],
  );
  const visibleJobs = results.slice(0, visibleCount);
  const activeFilterCount = countActiveFilters(selected);

  const handleToggle = (key: FilterKey, optionId: string) => {
    setSelected((prev) => ({
      ...prev,
      [key]: prev[key].includes(optionId)
        ? prev[key].filter((id) => id !== optionId)
        : [...prev[key], optionId],
    }));
    setVisibleCount(PAGE_SIZE);
  };

  const handleClear = () => {
    setSelected(EMPTY_FILTERS);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (value: SortOptionId) => {
    setSortBy(value);
    setVisibleCount(PAGE_SIZE);
  };

  const filterButton = (
    <button
      type="button"
      onClick={() => setIsFilterOpen((open) => !open)}
      aria-expanded={isFilterOpen}
      aria-controls="category-filters"
      className="flex cursor-pointer items-center gap-2 rounded-md border border-text-heading px-4 py-2 text-sm font-regular font-inter text-text-heading transition-colors hover:bg-primary-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
    >
      <Icon icon="ic:round-filter-list" className="text-lg" />
      Filter
      {!isFilterOpen && activeFilterCount > 0 && (
        <span className="flex size-5 items-center justify-center rounded-full bg-primary-blue text-vvxs font-semibold text-white">
          {activeFilterCount}
        </span>
      )}
    </button>
  );

  const clearButton = isFilterOpen ? (
    <button
      type="button"
      onClick={handleClear}
      disabled={activeFilterCount === 0}
      className="cursor-pointer text-vxs font-medium font-inter text-primary-blue hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
    >
      Clear All
    </button>
  ) : null;

  // Without a Sort menu, the Filter button sits at the top of the open sidebar
  // so the list can start at the same height (search page design).
  const isToolbarInSidebar = !showSort && isFilterOpen;

  return (
    <section aria-labelledby="category-heading">
      {summaryBar && (
        <div className="border-b border-subtext-gray2/30">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
            <div className="text-sm font-semibold font-inter text-text-heading">
              {summaryBar}
            </div>
            <p className="text-sm font-regular font-inter text-text-heading">
              Showing {visibleJobs.length} out of {results.length}{" "}
              {results.length === 1 ? "job" : "jobs"}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-8 flex flex-col gap-6">
        <h1 id="category-heading" className="sr-only">
          {title}
        </h1>

        {/* Toolbar: filter button + sort */}
        {!isToolbarInSidebar && (
          <div className="flex items-center justify-between gap-4">
            <div
              className={`flex items-center gap-4 ${
                isFilterOpen
                  ? "flex-1 justify-between lg:w-72 lg:flex-none lg:pr-6"
                  : ""
              }`}
            >
              {filterButton}
              {clearButton}
            </div>

            {showSort && (
              <SortDropdown value={sortBy} onChange={handleSortChange} />
            )}
          </div>
        )}

        {/*
          Sidebar + results. On large screens the first column animates between
          288px (open) and 0px (closed), so the list smoothly takes the space.
        */}
        <div
          className={`grid grid-cols-1 transition-[grid-template-columns,column-gap] duration-300 ease-out motion-reduce:transition-none ${
            isFilterOpen
              ? "lg:grid-cols-[288px_minmax(0,1fr)] lg:gap-x-8"
              : "lg:grid-cols-[0px_minmax(0,1fr)] lg:gap-x-0"
          }`}
        >
          <aside
            id="category-filters"
            aria-label="Job filters"
            className={`min-w-0 overflow-hidden transition-opacity duration-300 ${
              isFilterOpen
                ? "mb-6 opacity-100 lg:mb-0"
                : "hidden opacity-0 lg:block lg:invisible"
            }`}
          >
            <div className="h-full border-b border-subtext-gray2/30 pb-6 lg:w-72 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              {isToolbarInSidebar && (
                <div className="mb-6 flex items-center justify-between gap-4">
                  {filterButton}
                  {clearButton}
                </div>
              )}
              <FilterSidebar selected={selected} onToggle={handleToggle} />
            </div>
          </aside>

          <div className="min-w-0 flex flex-col gap-8">
            {/* Announces the result count to screen readers */}
            <p className="sr-only" role="status" aria-live="polite">
              {results.length} {results.length === 1 ? "vacancy" : "vacancies"}{" "}
              found
            </p>

            {visibleJobs.length > 0 ? (
              <ul
                role="list"
                className={`grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 ${
                  isFilterOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                }`}
              >
                {visibleJobs.map((job) => (
                    <JobCard job={job} />
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <p className="text-sm font-inter text-text-secondary-color">
                  No vacancies match your search or filters.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="cursor-pointer text-sm font-medium font-inter text-primary-blue hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {results.length > visibleCount && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="flex cursor-pointer items-center gap-2 rounded-md bg-primary-blue px-6 py-3 text-sm font-medium font-inter text-white transition-colors hover:bg-primary-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                >
                  Load More
                  <Icon icon="material-symbols:arrow-downward" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
