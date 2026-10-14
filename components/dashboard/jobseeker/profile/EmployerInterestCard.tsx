import { Icon } from "@iconify/react";
import type { EmployerInterestStats } from "@/lib/types/profile-extras";
import ProfileCard from "../Profilecard";

export default function EmployerInterestCard({
  stats,
}: {
  stats: EmployerInterestStats;
}) {
  const { viewsThisMonth, viewsLastMonth } = stats;
  const change = viewsThisMonth - viewsLastMonth;
  const total = viewsThisMonth + viewsLastMonth;
  // Share of the last two months' views that happened this month.
  const fill = total === 0 ? 0 : Math.round((viewsThisMonth / total) * 100);

  const changeText =
    change > 0
      ? `+${change} ${change === 1 ? "view" : "views"}`
      : change < 0
        ? `−${Math.abs(change)} ${Math.abs(change) === 1 ? "view" : "views"}`
        : "No change";
  const changeIcon =
    change > 0
      ? "mdi:trending-up"
      : change < 0
        ? "mdi:trending-down"
        : "mdi:minus";

  return (
    <ProfileCard eyebrow="Employer interest" title="Profile views">
      {total === 0 ? (
        <p className="text-sm font-inter text-subtext-light">
          No profile views yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl font-bold font-manrope text-text-heading">
              {viewsThisMonth}
            </span>
            <span className="text-sm font-inter text-text-secondary-color">
              this month
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium font-inter text-primary-blue">
              <Icon icon={changeIcon} aria-hidden="true" />
              {changeText}
              <span className="sr-only"> compared with last month</span>
            </span>
          </p>
          <div
            role="progressbar"
            aria-label="Views this month compared with last month"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={fill}
            className="h-2 overflow-hidden rounded-full bg-gray-200"
          >
            <div
              className="h-full rounded-full bg-primary-blue"
              style={{ width: `${fill}%` }}
            />
          </div>
        </div>
      )}
    </ProfileCard>
  );
}
