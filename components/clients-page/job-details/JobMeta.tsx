import Link from "next/link";
import { Icon } from "@iconify/react";
import { JobDetail } from "@/lib/types/job-detail";
import { formatDate } from "@/lib/utils/format-date";

interface JobMetaProps {
  job: Pick<JobDetail, "company" | "location" | "publishedOn" | "applyBefore">;
}

/** Company, location and dates line under the job title. */
export default function JobMeta({ job }: JobMetaProps) {
  const { company, location, publishedOn, applyBefore } = job;

  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-regular font-inter text-text-secondary-color">
      <li className="flex items-center gap-2">
        <Icon icon="mdi:office-building-outline" className="text-base" />
        <Link
          href={`/companies/${company.slug}`}
          className="transition-colors hover:text-primary-blue"
        >
          {company.name}
        </Link>
      </li>

      <li className="flex items-center gap-2">
        <Icon icon="mdi:map-marker-outline" className="text-base" />
        <span>{location}</span>
      </li>

      <li className="flex items-center gap-2">
        <Icon icon="mdi:calendar-check-outline" className="text-base" />
        <span>
          Published on:{" "}
          <time dateTime={publishedOn}>{formatDate(publishedOn)}</time>
        </span>
      </li>

      <li className="flex items-center gap-2">
        <Icon icon="mdi:clock-outline" className="text-base" />
        <span>
          Apply Before:{" "}
          <time dateTime={applyBefore}>{formatDate(applyBefore)}</time>
        </span>
      </li>
    </ul>
  );
}
