"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import InitialsBadge from "@/components/ui/InitialsBadge";
import type { SavedJob } from "@/lib/types/jobseeker-profile";
import JobCard from "@/components/ui/JobCard";
import EmptyState from "@/components/ui/EmptyState";
import { title } from "process";

interface SavedJobsGridProps {
  initialJobs: SavedJob[];
}

const URGENT_DAYS = 3;

function formatDaysLeft(days: number): string {
  if (days <= 0) return "Closes today";
  return days === 1 ? "1 day left" : `${days} days left`;
}

export default function SavedJobsGrid({ initialJobs }: SavedJobsGridProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [announcement, setAnnouncement] = useState("");

  const unsave = (job: SavedJob) => {
    // TODO: call the API to remove the saved job, restore the list on failure.
    setJobs((current) => current.filter((item) => item.id !== job.id));
    setAnnouncement(`${job.title} removed from saved jobs.`);
  };

  return (
    <>
      <p role="status" className="sr-only">
        {announcement}
      </p>

      {jobs.length === 0 ? (
        <EmptyState
          icon="mdi:bookmark-outline"
          title="No saved jobs yet"
          description="Browse open positions and bookmark the ones that interest you. They'll be waiting here whenever you're ready to apply."
          action={{ label: "Browse recommended jobs", href: "/category" }}
        />
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {jobs.map((job) => {
            const urgent = job.daysLeft <= URGENT_DAYS;

            return (
              <li
                key={job.id}
                className="flex flex-col gap-4 rounded-lg border-subtext-light/10 bg-white px-3.5 py-4 shadow-sm"
              >
                {/* Company logo + title */}
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-sm border border-[#aeaeb243]">
                    {job.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={job.logoUrl}
                        alt={`${job.companyName} logo`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center text-vxs font-bold font-manrope text-primary-blue"
                      >
                        {job.companyName.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col gap-2">
                    <h2 className="text-vxs font-bold font-manrope line-height-2xl text-text-heading">
                      <Link
                        href={`/${job.slug}`}
                        className="hover:text-primary-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                      >
                        {job.title}
                      </Link>
                    </h2>
                    <Link
                      href={`/companies/${job.companySlug}`}
                      className="w-fit max-w-full truncate text-vvxs font-semibold uppercase line-height-3xl text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                    >
                      {job.companyName} aa
                    </Link>
                  </div>
                </div>

                {/* Meta + actions */}
                <div className="flex flex-col gap-4">
                  <ul className="flex items-center gap-5 border-b border-subtext-gray2/30 pb-5">
                    <li className="flex items-center gap-1 py-1 text-vxs font-semibold font-manrope line-height-2xl text-subtext-light">
                      <Icon icon="bx:briefcase" aria-hidden="true" />
                      <p>{job.employmentType}</p>
                    </li>
                    <li
                      className={`flex items-center gap-1 py-1 text-vxs font-semibold font-manrope line-height-2xl ${
                        urgent ? "text-red-600" : "text-subtext-light"
                      }`}
                    >
                      <Icon
                        icon="ant-design:clock-circle-outlined"
                        aria-hidden="true"
                      />
                      <p>{formatDaysLeft(job.daysLeft)}</p>
                    </li>
                  </ul>

                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/${job.slug}/apply`}
                      className="flex items-center gap-1 text-vxs font-medium font-inter line-height-sm text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                    >
                      <span>Apply Now</span>
                      <span className="text-xs">
                        <Icon
                          icon="material-symbols:arrow-right-alt"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => unsave(job)}
                      aria-label={`Remove ${job.title} from saved jobs`}
                      className="cursor-pointer rounded-md p-1 text-md text-primary-blue transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                    >
                      <Icon aria-hidden="true" icon="mdi:bookmark" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
