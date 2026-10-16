import Link from "next/link";
import { Icon } from "@iconify/react";

interface EmptyStateProps {
  /** Iconify icon name, e.g. "mdi:briefcase-outline". */
  icon: string;
  title: string;
  description: string;
  /** Optional outlined button under the text. */
  action?: { label: string; href: string };
}

/** Centered "nothing here yet" block used inside dashboard cards. */
export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center m-auto gap-5 px-2 py-6 text-center">
      <span
        aria-hidden="true"
        className="flex size-13 items-center justify-center p-2  rounded-xl bg-separator2 text-lg-xl text-subtext-light"
      > 
        <Icon icon={icon} />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold  font-manrope text-subtext-primary-color">
          {title}
        </h3>
        <p className="mx-auto max-w-sm text-xs font-regular  font-inter text-subtext-gray1 line-height-sm">
          {description}
        </p>
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1 rounded-md border border-separator4 px-4 py-2 text-xs font-medium font-inter text-text-heading transition-colors hover:border-primary-blue/40 hover:text-primary-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          {action.label}
          <Icon icon="mdi:chevron-right" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
