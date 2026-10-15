import Link from "next/link";
import { Icon } from "@iconify/react";
import HighlightMatch from "@/components/ui/HighlightMatch";
import InitialsBadge from "@/components/ui/InitialsBadge";
import type { SearchIndexEntry } from "@/lib/types/search-suggestions";

interface SearchJobCardProps {
  job: SearchIndexEntry;
  query: string;
}

/** One result. The whole card opens the job details page. */
export default function SearchJobCard({ job, query }: SearchJobCardProps) {
  const meta = [job.company, job.employmentType, job.level].filter(
    (part): part is string => Boolean(part),
  );

  return (
    <li>
      <Link
        href={`/${job.slug}`}
        className="group flex items-center gap-4 border-b border-b-subtext-gray2/30 bg-white pb-4 transition-[border-color,box-shadow] duration-150 "
      >
        <InitialsBadge
          name={job.company}
          logoUrl={job.logoUrl}
          className="size-12"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="truncate text-xs font-semibold font-manrope text-text-secondary-color transition-colors group-hover:text-primary-blue  duration-150 ">
            <HighlightMatch text={job.title} query={query} />
          </h3>
          <ul
            role="list"
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-vxs font-inter text-text-secondary-color"
          >
            {meta.map((part, index) => (
              <li
                key={`${part}-${index}`}
                className="inline-flex items-center gap-2"
              >
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-primary-blue"
                  />
                )}
                {index === 0 ? (
                  <HighlightMatch text={part} query={query} />
                ) : (
                  part
                )}
              </li>
            ))}
          </ul>
        </div>

        <Icon
          icon="mdi:arrow-right"
          className="shrink-0 text-lg text-subtext-light transition-transform group-hover:translate-x-0.5 group-hover:text-primary-blue motion-reduce:transform-none"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
