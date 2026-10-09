"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  JOB_SUGGESTIONS,
  POPULAR_JOB_SUGGESTIONS,
} from "@/lib/constants/job-suggestions";
import {
  SEARCH_PARAM,
  SEARCH_PATH,
  buildSearchUrl,
} from "@/lib/constants/search";

const MAX_SUGGESTIONS = 6;

function getSuggestions(query: string): string[] {
  const q = query.trim().toLowerCase();

  // Nothing typed yet: show the popular roles.
  if (!q) return POPULAR_JOB_SUGGESTIONS.slice(0, MAX_SUGGESTIONS);

  return JOB_SUGGESTIONS.filter((title) => title.toLowerCase().includes(q))
    .sort((a, b) => {
      // Titles that start with the query come first.
      const aStarts = a.toLowerCase().startsWith(q) ? 0 : 1;
      const bStarts = b.toLowerCase().startsWith(q) ? 0 : 1;
      return aStarts - bStarts;
    })
    .slice(0, MAX_SUGGESTIONS);
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  const start = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;

  if (start === -1) return <>{text}</>;

  const end = start + q.length;
  return (
    <>
      {text.slice(0, start)}
      <span className="font-bold text-primary-blue">
        {text.slice(start, end)}
      </span>
      {text.slice(end)}
    </>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </svg>
  );
}

interface JobSearchBarProps {
  className?: string;
  /** Text to start with, e.g. the current search on the results page. */
  initialQuery?: string;
  /**
   * Redirect mode, used on the home hero. The bar is only a doorway: clicking
   * the input, pressing Enter, or clicking the Search button opens the search
   * page. Nothing is typed here, so there are no suggestions.
   * Tabbing into the field alone does not navigate.
   */
  redirectOnClick?: boolean;
  /** Focus the input when it appears. */
  autoFocus?: boolean;
  /** "hero" = home page look, "page" = search results page look. */
  variant?: "hero" | "page";
  buttonLabel?: string;
  /** Show the job-title suggestions dropdown while typing. Defaults to true. */
  enableSuggestions?: boolean;
}

export default function JobSearchBar({
  className = "",
  initialQuery = "",
  redirectOnClick = false,
  autoFocus = false,
  variant = "hero",
  buttonLabel = "Search",
  enableSuggestions = true,
}: JobSearchBarProps) {
  const router = useRouter();
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isPage = variant === "page";
  const suggestions = useMemo(() => getSuggestions(query), [query]);
  // In redirect mode the bar is only a doorway to the search page, so there
  // is nothing to type and no suggestions to show.
  const hasSuggestions = enableSuggestions && !redirectOnClick;
  const showSuggestions = isOpen && hasSuggestions && suggestions.length > 0;

  // Only a bar with a dropdown is announced as a combobox.
  const comboboxProps = !hasSuggestions
    ? {}
    : {
        role: "combobox",
        "aria-expanded": showSuggestions,
        "aria-controls": listboxId,
        "aria-autocomplete": "list" as const,
        "aria-activedescendant":
          showSuggestions && activeIndex >= 0
            ? `${listboxId}-option-${activeIndex}`
            : undefined,
      };

  // Load the search page in the background so the click redirect feels instant.
  useEffect(() => {
    if (redirectOnClick) router.prefetch(SEARCH_PATH);
  }, [redirectOnClick, router]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Close the dropdown when clicking outside the search bar.
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const submitSearch = (value: string) => {
    const term = value.trim();

    setQuery(term);
    setIsOpen(false);
    setActiveIndex(-1);
    // An empty term still opens the search page (it just lists every job).
    router.push(buildSearchUrl(term));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setActiveIndex(-1);
    setIsOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch(query);
  };

  const goToSearchPage = () => router.push(buildSearchUrl(query));

  const handleInputClick = () => {
    if (redirectOnClick) goToSearchPage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Redirect mode: Enter opens the search page, every other key is ignored.
    if (redirectOnClick) {
      if (event.key === "Enter") {
        event.preventDefault();
        goToSearchPage();
      }
      return;
    }

    // No dropdown: arrow keys do nothing and Enter submits the form normally.
    if (!hasSuggestions) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((i) => (i + 1) % suggestions.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        break;
      case "Enter":
        if (showSuggestions && activeIndex >= 0) {
          event.preventDefault();
          submitSearch(suggestions[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form
        onSubmit={handleSubmit}
        role="search"
        className={`flex items-center gap-2 rounded-full border bg-white transition-shadow ${
          isPage
            ? "border-transparent p-2 shadow-[0_6px_24px_rgba(15,23,42,0.10)] focus-within:shadow-[0_8px_30px_rgba(61,90,254,0.20)]"
            : "border-primary-blue/15 p-1.5 shadow-[0_8px_30px_rgba(61,90,254,0.10)] focus-within:border-primary-blue/40 focus-within:shadow-[0_8px_30px_rgba(61,90,254,0.18)]"
        }`}
      >
        <SearchIcon
          className={`ml-3 size-5 shrink-0 ${
            isPage ? "text-primary-blue" : "text-text-secondary-color"
          }`}
        />

        <input
          ref={inputRef}
          type="text"
          name={SEARCH_PARAM}
          value={query}
          onChange={handleChange}
          onClick={handleInputClick}
          onFocus={() => {
            if (hasSuggestions) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          // Read-only in redirect mode: no cursor and no phone keyboard flashing up.
          readOnly={redirectOnClick}
          placeholder="Job titles, keywords or companies"
          autoComplete="off"
          aria-label="Search jobs"
          {...comboboxProps}
          className={`min-w-0 flex-1 bg-transparent py-2 font-medium font-inter text-text-heading outline-none placeholder:text-text-secondary-color ${
            isPage ? "text-sm" : "text-xs"
          } ${redirectOnClick ? "cursor-pointer" : ""}`}
        />

        {query && !redirectOnClick && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="rounded-full p-1.5 text-text-secondary-color transition-colors hover:bg-primary-blue/10 hover:text-primary-blue"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className={`shrink-0 rounded-full bg-primary-blue px-5 py-2.5 font-semibold font-manrope text-white transition-colors hover:bg-primary-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue sm:px-7 ${
            isPage ? "text-vxs uppercase" : "text-xs"
          }`}
        >
          {buttonLabel}
        </button>
      </form>

      {showSuggestions && (
        <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-primary-blue/10 bg-white text-left shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
          <p className="px-4 pb-1 pt-3 text-vxs font-semibold uppercase tracking-wider font-manrope text-text-secondary-color">
            {query.trim() ? "Suggested jobs" : "Popular roles"}
          </p>

          <ul id={listboxId} role="listbox" className="pb-2">
            {suggestions.map((title, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={title}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isActive}
                  // Keep focus on the input so the click isn't swallowed by blur.
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => submitSearch(title)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`mx-2 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium font-inter text-text-heading transition-colors ${
                    isActive ? "bg-primary-blue/10" : ""
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-blue text-white"
                        : "bg-primary-blue/10 text-primary-blue"
                    }`}
                  >
                    <BriefcaseIcon className="size-4" />
                  </span>
                  <span className="truncate">
                    <HighlightedText text={title} query={query} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
