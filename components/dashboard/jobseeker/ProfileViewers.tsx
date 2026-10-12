import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { formatRelativeTime } from "@/lib/utils/format-date";
import type { JobseekerOverview } from "@/lib/types/jobseeker-dashboard";

/** How many avatars are stacked before the "+N" circle. */
const AVATAR_STACK_SIZE = 4;

interface ProfileViewersProps {
  viewers: JobseekerOverview["viewers"];
}

export default function ProfileViewers({ viewers }: ProfileViewersProps) {
  const { totalThisMonth, recent } = viewers;
  const stacked = recent.slice(0, AVATAR_STACK_SIZE);
  const hiddenCount = Math.max(totalThisMonth - stacked.length, 0);

  return (
    <DashboardCard
      eyebrow="Employer interest"
      title="Who viewed your profile"
      action={{ label: "View All", href: "/jobseeker/me" }}
    >
      {totalThisMonth > 0 ? (
        <>
          <div className="flex items-center gap-3 border-b border-subtext-gray2/30 pb-6">
            <div className="flex -space-x-2" aria-hidden="true">
              {stacked.map((viewer) => (
                <Avatar
                  key={viewer.id}
                  name={viewer.name}
                  src={viewer.avatar}
                  className="size-9 ring-2 ring-white"
                />
              ))}
              {hiddenCount > 0 && (
                <span className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-vxs font-semibold font-inter text-primary-blue ring-2 ring-white">
                  +{hiddenCount}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold font-inter text-primary-blue">
                {totalThisMonth} {totalThisMonth === 1 ? "person" : "people"}
              </span>
              <span className="text-vxs font-regular font-inter text-text-secondary-color">
                viewed your profile this month
              </span>
            </div>
          </div>

          <ul role="list" className="flex flex-col gap-4">
            {recent.map((viewer) => (
              <li key={viewer.id} className="flex items-start gap-3">
                <Avatar
                  name={viewer.name}
                  src={viewer.avatar}
                  className="size-10"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <Link
                    href={`/companies/${viewer.slug}`}
                    className="truncate text-vxs font-semibold font-inter text-text-heading hover:text-primary-blue"
                  >
                    {viewer.name}
                  </Link>
                  <span className="text-vvxs font-regular font-inter text-text-secondary-color">
                    {viewer.industry}
                  </span>
                </div>
                <time
                  dateTime={viewer.viewedAt}
                  className="shrink-0 text-vvxs font-regular font-inter text-subtext-light"
                >
                  {formatRelativeTime(viewer.viewedAt)}
                </time>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="py-8 text-center text-sm font-regular font-inter text-text-secondary-color">
          No employers have viewed your profile this month. Completing your
          profile helps you get noticed.
        </p>
      )}
    </DashboardCard>
  );
}
