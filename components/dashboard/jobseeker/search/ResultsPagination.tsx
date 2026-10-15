import Link from "next/link";
import { Icon } from "@iconify/react";

interface ResultsPaginationProps {
  query: string;
  page: number;
  totalPages: number;
}

const linkClass =
  "inline-flex items-center gap-1 rounded-md border border-subtext-gray2/30 bg-white px-4 py-2 text-sm font-inter text-text-heading transition-colors hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue";
const disabledClass =
  "inline-flex items-center gap-1 rounded-md border border-subtext-gray2/30 px-4 py-2 text-sm font-inter text-subtext-light opacity-60";

export default function ResultsPagination({
  query,
  page,
  totalPages,
}: ResultsPaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (target: number) =>
    `/jobseeker/search?q=${encodeURIComponent(query)}${target > 1 ? `&page=${target}` : ""}`;

  return (
    <nav
      aria-label="Search results pages"
      className="flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={linkClass}>
          <Icon icon="mdi:arrow-left" aria-hidden="true" />
          Previous
        </Link>
      ) : (
        <span aria-hidden="true" className={disabledClass}>
          <Icon icon="mdi:arrow-left" />
          Previous
        </span>
      )}

      <p className="text-sm font-inter text-text-secondary-color">
        Page {page} of {totalPages}
      </p>

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={linkClass}>
          Next
          <Icon icon="mdi:arrow-right" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className={disabledClass}>
          Next
          <Icon icon="mdi:arrow-right" />
        </span>
      )}
    </nav>
  );
}
