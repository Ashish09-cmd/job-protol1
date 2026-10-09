import { JobDetail } from "@/lib/types/job-detail";
import { Icon } from "@iconify/react";

interface JobTagsProps {
  job: Pick<JobDetail, "category" | "employmentType" | "level" | "salary">;
}

export default function JobTags({ job }: JobTagsProps) {
  const tags = [
    { icon: "mdi:tag-outline", label: job.category },
    { icon: "mdi:clock-time-four-outline", label: job.employmentType },
    { icon: "mdi:share-variant-outline", label: job.level },
    { icon: "mdi:cash-multiple", label: job.salary },
  ];

  return (
    <ul className="flex flex-wrap items-center gap-4">
      {tags.map((tag) => (
        <li
          key={tag.icon}
          className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-vvxs font-medium font-inter uppercase text-primary-blue"
        >
          <Icon icon={tag.icon} className="text-sm" />
          {tag.label}
        </li>
      ))}
    </ul>
  );
}
