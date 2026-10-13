import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface SettingsCardProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Adds a "View All" link in the top right. */
  viewAllHref?: string;
  viewAllLabel?: string;
  children: ReactNode;
}

export default function SettingsCard({
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View all",
  children,
}: SettingsCardProps) {
  return (
    <section
      aria-label={title}
      className="flex flex-col gap-5 rounded-2xl border border-subtext-gray2/30 bg-white p-5 shadow-sm sm:p-6"
    >
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light">
            {eyebrow} 
          </p>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              aria-label={`${viewAllLabel}: ${title}`}
              className="inline-flex items-center gap-1 rounded text-vxs font-medium font-inter text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
            >
              View All
              <Icon icon="mdi:chevron-right" aria-hidden="true" />
            </Link>
          )}
        </div>
        <h2 className="text-xl font-semibold font-manrope text-text-heading">
          {title}
        </h2>
        {description && (
          <p className="text-sm font-inter text-text-secondary-color">
            {description}
          </p>
        )}
      </header>
      <div className="border-t border-subtext-gray2/30 pt-5">{children}</div>
    </section>
  );
}