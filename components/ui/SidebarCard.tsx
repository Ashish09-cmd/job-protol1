import type { ReactNode } from "react";

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

/** White card with a heading, used in the job details sidebar. */
export default function SidebarCard({ title, children }: SidebarCardProps) {
  const headingId = `card-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-lg bg-white p-6 shadow-[0_2px_14px_rgba(15,23,42,0.08)]"
    >
      <h2
        id={headingId}
        className="mb-5 text-lg-sm font-semibold font-manrope text-text-heading"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
