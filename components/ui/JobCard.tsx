import { Icon } from "@iconify/react";
import Link from "next/link";
import type { Job, JobType } from "@/lib/types/job";

const JOB_TYPE_LABEL: Record<JobType, string> = {
  job: "Job",
  internship: "Internship",
};

/** Deadlines closer than this many days are highlighted in red. */
const URGENT_DAYS_THRESHOLD = 10;

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { title, type, daysLeft, company } = job;
  const isUrgent = daysLeft < URGENT_DAYS_THRESHOLD;

  return (
    <div className="bg-white rounded-lg py-4 px-3.5 shadow-sm border-subtext-light/10 flex flex-col gap-4">
      {/* Company logo + title */}
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-sm border border-[#aeaeb243]">
          {company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-vxs font-bold font-manrope text-primary-blue">
              {company.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="text-vxs font-bold font-manrope line-height-2xl text-text-heading">
            {title}
          </h3>
          <Link
            href={`/companies/${company.slug}`}
            className="truncate uppercase text-primary-blue font-semibold line-height-3xl text-vvxs"
          >
            {company.name}
          </Link>
        </div>
      </div>

      {/* Meta + actions */}
      <div className="flex flex-col gap-4">
        <ul className="pb-5 border-b border-subtext-gray2/30 flex items-center gap-5">
          <li className="py-1 flex items-center gap-1 text-vxs font-semibold line-height-2xl text-subtext-light font-manrope">
            <Icon icon="bx:briefcase" />
            <p>{JOB_TYPE_LABEL[type]}</p>
          </li>
          <li
            className={`py-1 flex items-center gap-1 text-vxs font-semibold line-height-2xl font-manrope ${
              isUrgent ? "text-red-600" : "text-subtext-light"
            }`}
          >
            <Icon icon="ant-design:clock-circle-outlined" />
            <p>{daysLeft} days left</p>
          </li>
        </ul>

        <div className="flex items-center gap-2 justify-between">
          <Link
            href={`/jobs/${job.slug}`}
            className="text-vxs font-medium line-height-sm text-primary-blue font-inter flex items-center gap-1"
          >
            <span>View Role</span>
            <span className="text-xs">
              <Icon icon="material-symbols:arrow-right-alt" />
            </span>
          </Link>
          <button
            type="button"
            aria-label={`Save ${title}`}
            className="text-md text-subtext-light cursor-pointer"
          >
            <Icon icon="mdi:bookmark-outline" />
          </button>
        </div>
      </div>
    </div>
  );
}
