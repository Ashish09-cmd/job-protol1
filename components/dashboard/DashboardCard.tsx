import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@iconify/react";

interface DashboardCardProps {
  /** Small uppercase label above the title, e.g. "KEEP MOVING". */
  eyebrow: string;
  title: string;
  /** Link at the top right, e.g. "View All". */
  action?: { label: string; href: string };
  /** Extra content on the right of the title row, e.g. a button. */
  titleAside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** The bordered card used for every block on the dashboard pages. */
export default function DashboardCard({
  eyebrow,
  title,
  action,
  titleAside,
  children,
  className = "",
}: DashboardCardProps) {
  const headingId = `card-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section
      aria-labelledby={headingId}
      className={`flex flex-col gap-6 rounded-xl border border-subtext-gray2/30 bg-white p-6 ${className}`}
    >
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-vvxs font-medium uppercase tracking-widest font-inter text-subtext-light">
            {eyebrow}
          </p>
          {action && (
            <Link
              href={action.href}
              className="flex items-center gap-1 text-vxs font-medium font-inter text-primary-blue hover:underline"
            >
              {action.label}
              <Icon icon="mdi:chevron-right" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <h2
            id={headingId}
            className="text-lg-sm font-medium font-manrope text-text-heading"
          >
            {title}
          </h2>
          {titleAside}
        </div>
      </header>

      {children}
    </section>
  );
}
