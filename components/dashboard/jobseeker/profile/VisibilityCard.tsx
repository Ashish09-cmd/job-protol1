import Link from "next/link";
import { Icon } from "@iconify/react";
import type { ProfileVisibilityStatus } from "@/lib/types/profile-extras";

function formatUntil(iso: string): string | null {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function VisibilityCard({
  visibility,
}: {
  visibility: ProfileVisibilityStatus;
}) {
  const until = visibility.openUntil ? formatUntil(visibility.openUntil) : null;
  const text = visibility.openForWork
    ? until
      ? `Open for work until ${until}`
      : "Open for work"
    : "Not open for work";

  return (
    <section
      aria-label="Profile visibility"
      className="flex flex-col gap-2 rounded-2xl border border-subtext-gray2/30 bg-white p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg-sm font-semibold font-manrope text-text-heading">
          Profile visibility
        </h2>
        <Link
          href="/jobseeker/settings/privacy-visibility"
          className="shrink-0 rounded px-2 py-1 text-vxs font-medium font-inter text-primary-blue hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          Manage
        </Link>
      </div>
      <p className="inline-flex items-center gap-2 text-sm font-inter text-text-secondary-color">
        <Icon
          icon={
            visibility.openForWork
              ? "mdi:check-circle-outline"
              : "mdi:minus-circle-outline"
          }
          className={
            visibility.openForWork ? "text-primary-blue" : "text-subtext-light"
          }
          aria-hidden="true"
        />
        {text}
      </p>
    </section>
  );
}
