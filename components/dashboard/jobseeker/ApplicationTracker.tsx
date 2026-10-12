"use client";

import { useState } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { formatShortDate } from "@/lib/utils/format-date";
import type {
  ApplicationStatus,
  TrackedApplication,
} from "@/lib/types/jobseeker-dashboard";

/** Label and colours of each status. The label is always shown, so colour is never the only signal. */
const STATUS_STYLES: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  applied: { label: "Applied", className: "bg-gray-100 text-gray-700" },
  "under-review": {
    label: "Under Review",
    className: "bg-indigo-50 text-indigo-700",
  },
  interview: { label: "Interview", className: "bg-orange-100 text-orange-700" },
  hired: { label: "Hired", className: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-600" },
  withdrawn: { label: "Withdrawn", className: "bg-gray-100 text-gray-500" },
};

/** Only applications that are still open can be withdrawn. */
const WITHDRAWABLE_STATUSES: readonly ApplicationStatus[] = [
  "applied",
  "under-review",
  "interview",
];

interface ApplicationTrackerProps {
  applications: readonly TrackedApplication[];
}

export default function ApplicationTracker({
  applications,
}: ApplicationTrackerProps) {
  const [items, setItems] = useState(applications);

  const handleWithdraw = (id: string) => {
    // TODO: call your API here and restore the old status if the request fails.
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "withdrawn" } : item,
      ),
    );
  };

  return (
    <DashboardCard
      eyebrow="Keep moving"
      title="Application tracker"
      action={{ label: "View All", href: "/jobseeker/applications" }}
    >
      {items.length > 0 ? (
        <ul role="list" className="flex flex-col">
          {items.map((application) => {
            const status = STATUS_STYLES[application.status];
            const canWithdraw = WITHDRAWABLE_STATUSES.includes(
              application.status,
            );

            return (
              <li
                key={application.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-subtext-gray2/30 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-nowrap"
              >
                <div className="flex min-w-0 basis-full items-center gap-3 sm:flex-1 sm:basis-auto">
                  <Avatar
                    name={application.companyName}
                    src={application.companyLogo}
                    shape="square"
                    className="h-8 w-11"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <Link
                      href={`/${application.jobSlug}`}
                      className="truncate text-vxs font-semibold font-inter text-text-heading hover:text-primary-blue"
                    >
                      {application.jobTitle}
                    </Link>
                    <Link
                      href={`/companies/${application.companySlug}`}
                      className="truncate text-vvxs font-semibold uppercase text-primary-blue hover:underline"
                    >
                      {application.companyName}
                    </Link>
                  </div>
                </div>

                <time
                  dateTime={application.appliedOn}
                  className="w-14 shrink-0 text-vxs font-regular font-inter text-text-secondary-color"
                >
                  {formatShortDate(application.appliedOn)}
                </time>

                <span
                  className={`min-w-24 shrink-0 rounded-full px-3 py-1 text-center text-vvxs font-semibold font-inter ${status.className}`}
                >
                  {status.label}
                </span>

                <div className="w-16 shrink-0 text-right">
                  {canWithdraw && (
                    <button
                      type="button"
                      onClick={() => handleWithdraw(application.id)}
                      aria-label={`Withdraw application for ${application.jobTitle}`}
                      className="cursor-pointer text-vxs font-regular font-inter text-text-secondary-color underline hover:text-primary-blue"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-sm font-regular font-inter text-text-secondary-color">
            You haven’t applied to any jobs yet.
          </p>
          <Link
            href="/search"
            className="text-sm font-medium font-inter text-primary-blue hover:underline"
          >
            Browse jobs
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}
