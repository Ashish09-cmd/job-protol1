"use client";

import { useState } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { formatShortDate } from "@/lib/utils/format-date";
import type { TrackedApplication } from "@/lib/types/jobseeker-dashboard";
import { APPLICATION_FILTERS, ApplicationFilter } from "@/lib/constants/application-filters";
import { filterApplications } from "@/lib/utils/filter-applications";
import FilterPills from "@/components/ui/FilterPills";
import { STATUS_STYLES, WITHDRAWABLE_STATUSES } from "@/lib/constants/application-status";

const ID_PREFIX = "applications";

interface ApplicationsListProps {
  applications: readonly TrackedApplication[];
}

export default function ApplicationsList({
  applications,
}: ApplicationsListProps) {
  const [items, setItems] = useState(applications);
  const [filter, setFilter] = useState<ApplicationFilter>("all");
  // Read out by screen readers after an action, because the row may disappear from the tab.
  const [announcement, setAnnouncement] = useState("");

  const options = APPLICATION_FILTERS.map((item) => ({
    id: item.id,
    label: item.id === "all" ? `All (${items.length})` : item.label,
  }));

  const visible = filterApplications(items, filter);

  const handleWithdraw = (application: TrackedApplication) => {
    // TODO: call your API here and restore the old status if the request fails.
    setItems((current) =>
      current.map((item) =>
        item.id === application.id ? { ...item, status: "withdrawn" } : item,
      ),
    );
    setAnnouncement(`Application for ${application.jobTitle} withdrawn.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <FilterPills
        options={options}
        value={filter}
        onChange={setFilter}
        label="Filter applications by status"
        idPrefix={ID_PREFIX}
      />

      <p role="status" className="sr-only">
        {announcement}
      </p>

      <div
        role="tabpanel"
        id={`${ID_PREFIX}-panel`}
        aria-labelledby={`${ID_PREFIX}-tab-${filter}`}
        className="rounded-xl border border-subtext-gray2/30 bg-white p-6"
      >
        {visible.length > 0 ? (
          <ul role="list" className="flex flex-col">
            {visible.map((application) => {
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
                      className="h-10 w-11"
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
                    className={`min-w-24 shrink-0 rounded-full px-3 py-1 text-center text-vvxs font-medium font-inter ${status.className}`}
                  >
                    {status.label}
                  </span>

                  <div className="w-16 shrink-0 text-right">
                    {canWithdraw && (
                      <button
                        type="button"
                        onClick={() => handleWithdraw(application)}
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
        ) : items.length === 0 ? (
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
        ) : (
          <p className="py-8 text-center text-sm font-regular font-inter text-text-secondary-color">
            No applications in this stage yet.
          </p>
        )}
      </div>
    </div>
  );
}
