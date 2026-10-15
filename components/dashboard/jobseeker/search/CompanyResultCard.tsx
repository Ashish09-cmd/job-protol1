import Link from "next/link";
import HighlightMatch from "@/components/ui/HighlightMatch";
import InitialsBadge from "@/components/ui/InitialsBadge";
import type { CompanyResult } from "@/lib/types/search-suggestions";

interface CompanyResultCardProps {
  company: CompanyResult;
  query: string;
}

/** Narrows the search to this company's jobs. */
export default function CompanyResultCard({
  company,
  query,
}: CompanyResultCardProps) {
  return (
    <li>
      <Link
        href={`/jobseeker/search?q=${encodeURIComponent(company.name)}`}
        className="group flex items-center gap-3 rounded-xl border border-subtext-gray2/30 bg-white p-4 transition-[border-color,box-shadow] duration-150 hover:border-primary-blue/40 hover:shadow-sm motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        <InitialsBadge
          name={company.name}
          logoUrl={company.logoUrl}
          className="size-12"
        />
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold font-manrope text-text-secondary-color group-hover:text-primary-blue">
            <HighlightMatch text={company.name} query={query} />
          </span>
          <span className="text-vxs font-inter text-primary-blue">
            {company.jobCount} open {company.jobCount === 1 ? "job" : "jobs"}
          </span>
        </span>
      </Link>
    </li>
  );
}
