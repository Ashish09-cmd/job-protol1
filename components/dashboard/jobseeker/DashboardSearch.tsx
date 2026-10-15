"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import type { SearchSuggestion } from "@/lib/types/search-suggestions";

const SEARCH_URL = "/jobseeker/search";
const DEBOUNCE_MS = 180;

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const needle = query.trim().toLowerCase();
  const start = needle ? text.toLowerCase().indexOf(needle) : -1;
  if (start === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, start)}
      <strong className="font-semibold text-primary-blue">
        {text.slice(start, start + needle.length)}
      </strong>
      {text.slice(start + needle.length)}
    </>
  );
}

/**
 * Search box for the dashboard top bar. Suggests job titles and company names
 * while the user types. The suggestion list is only shown when something
 * matches. Choosing a suggestion, or pressing Enter, opens the search page.
 */
export default function DashboardSearch() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // Fetch suggestions shortly after the user stops typing.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Request failed");
        const data = (await response.json()) as {
          suggestions: SearchSuggestion[];
        };
        setItems(data.suggestions);
        setActive(-1);
      } catch {
        if (!controller.signal.aborted) setItems([]);
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  // Close when the user clicks somewhere else.
  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const visible = useMemo(() => (query.trim() ? items : []), [items, query]);
  const jobs = visible.filter((item) => item.type === "job");
  const companies = visible.filter((item) => item.type === "company");
  const ordered = [...jobs, ...companies];
  const expanded = open && ordered.length > 0;

  const optionId = (index: number) => `${listId}-option-${index}`;

  // Keep the highlighted option in view while using the arrow keys.
  useEffect(() => {
    if (active >= 0) {
      document
        .getElementById(`${listId}-option-${active}`)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [active, listId]);

  const go = (text: string) => {
    const value = text.trim();
    setOpen(false);
    setActive(-1);
    setQuery(value);
    router.push(
      value ? `${SEARCH_URL}?q=${encodeURIComponent(value)}` : SEARCH_URL,
    );
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (expanded && active >= 0) go(ordered[active].label);
    else go(query);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (ordered.length === 0) return;
      event.preventDefault();
      setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive(
        (current) => (current + step + ordered.length) % ordered.length,
      );
    } else if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const groups = [
    {
      key: "jobs",
      label: "Jobs",
      icon: "mdi:briefcase-outline",
      entries: jobs,
      offset: 0,
    },
    {
      key: "companies",
      label: "Companies",
      icon: "mdi:office-building-outline",
      entries: companies,
      offset: jobs.length,
    },
  ];

  return (
    <div ref={rootRef} className="relative w-full max-w-md">
      {/* Works without JavaScript too: a plain GET to /search?q=... */}
      <form role="search" action={SEARCH_URL} method="get" onSubmit={onSubmit}>
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search jobs or companies
        </label>
        <div className="relative">
          <Icon
            icon="mdi:magnify"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-subtext-light"
            aria-hidden="true"
          />
          <input
            id={`${listId}-input`}
            name="q"
            type="text"
            role="combobox"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              expanded && active >= 0 ? optionId(active) : undefined
            }
            autoComplete="off"
            spellCheck={false}
            maxLength={60}
            value={query}
            placeholder="Search jobs or companies"
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="w-full rounded-md border border-subtext-gray2/30 bg-white py-2.5 pl-10 pr-10 text-sm font-inter text-text-heading outline-none transition-colors placeholder:text-subtext-light focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
                (
                  document.getElementById(
                    `${listId}-input`,
                  ) as HTMLInputElement | null
                )?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-2.5 cursor-pointer top-1/2 -translate-y-1/2 rounded p-1 text-subtext-light hover:text-text-heading focus-visible:outline-2 focus-visible:outline-primary-blue"
            >
              <Icon icon="mdi:close" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      <p role="status" className="sr-only">
        {expanded
          ? `${ordered.length} ${ordered.length === 1 ? "suggestion" : "suggestions"} available. Use the up and down arrow keys to review.`
          : ""}
      </p>

      {/* Hidden unless something matches. */}
      {expanded && (
        <div
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute w-150  -right-20 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-subtext-gray2/30 bg-white py-2 shadow-xl"
        >
          {groups.map(
            (group) =>
              group.entries.length > 0 && (
                <div
                  key={group.key}
                  role="group"
                  aria-labelledby={`${listId}-${group.key}`}
                >
                  <p
                    id={`${listId}-${group.key}`}
                    className="px-4 pb-1 pt-3 text-vvxs font-medium uppercase tracking-widest font-inter text-subtext-light first:pt-1"
                  >
                    {group.label}
                  </p>
                  {group.entries.map((entry, i) => {
                    const index = group.offset + i;
                    const selected = index === active;

                    return (
                      <div
                        key={entry.id}
                        id={optionId(index)}
                        role="option"
                        aria-selected={selected}
                        onMouseEnter={() => setActive(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => go(entry.label)}
                        className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 ${
                          selected ? "bg-blue-50" : "hover:bg-blue-50/60"
                        }`}
                      >
                        <Icon
                          icon={group.icon}
                          className="shrink-0 text-sm text-subtext-light"
                          aria-hidden="true"
                        />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-vxs font-inter text-title-primary-color">
                            <HighlightMatch text={entry.label} query={query} />
                          </span>
                          {entry.detail && (
                            <span className="truncate text-vvxs font-inter line-height-sm text-subtext-light">
                              {entry.detail}
                            </span>
                          )}
                        </span>
                        {/* Mouse shortcut: copy the suggestion into the box without searching. */}
                        <button
                          type="button"
                          tabIndex={-1}
                          aria-hidden="true"
                          title="Use this suggestion"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={(event) => {
                            event.stopPropagation();
                            setQuery(entry.label);
                          }}
                          className={`shrink-0 rounded p-1 hover:bg-white hover:text-primary-blue ${selected ? "text-primary-blue" : "text-subtext-light"}`}
                        >
                          <Icon icon="mdi:arrow-top-left" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}
