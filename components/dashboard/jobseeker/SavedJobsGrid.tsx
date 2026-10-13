"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import InitialsBadge from "@/components/ui/InitialsBadge";
import type { SavedJob } from "@/lib/types/jobseeker-profile";

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
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-subtext-gray2/30 px-6 py-16 text-center">
          <Icon
            icon="mdi:bookmark-outline"
            className="text-4xl text-subtext-light"
            aria-hidden="true"
          />
          <p className="text-lg-sm font-semibold font-manrope text-text-heading">
            No saved jobs yet
          </p>
          <p className="max-w-sm text-sm font-inter text-text-secondary-color">
            Tap the bookmark on any job to keep it here for later.
          </p>
          <Link
            href="/category"
            className="rounded-md bg-primary-blue px-5 py-2.5 text-sm font-medium font-inter text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            Browse jobs
          </Link>
        </div>
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
                className="flex flex-col gap-5 rounded-2xl border border-subtext-gray2/30 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <InitialsBadge
                    name={job.companyName}
                    logoUrl={job.logoUrl}
                    className="size-12"
                  />
                  <button
                    type="button"
                    onClick={() => unsave(job)}
                    aria-label={`Remove ${job.title} from saved jobs`}
                    className="rounded-md p-1 text-primary-blue transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                  >
                    <Icon
                      icon="mdi:bookmark"
                      className="text-2xl"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-lg-sm font-semibold font-manrope text-text-heading">
                    <Link
                      href={`/${job.slug}`}
                      className="hover:text-primary-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                    >
                      {job.title}
                    </Link>
                  </h2>
                  <Link
                    href={`/companies/${job.companySlug}`}
                    className="w-fit text-sm font-inter text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                  >
                    {job.companyName}
                  </Link>
                </div>

                <div className="flex items-center justify-between gap-2 text-vxs font-inter">
                  <span className="rounded-full bg-separator3/45 px-3 py-1 text-text-secondary-color">
                    {job.employmentType}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-medium ${
                      urgent ? "text-red-600" : "text-text-secondary-color"
                    }`}
                  >
                    <Icon icon="mdi:clock-outline" aria-hidden="true" />
                    {formatDaysLeft(job.daysLeft)}
                  </span>
                </div>

                <Link
                  href={`/${job.slug}/apply`}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium font-inter text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                >
                  Apply Now
                  <Icon icon="mdi:arrow-right" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
