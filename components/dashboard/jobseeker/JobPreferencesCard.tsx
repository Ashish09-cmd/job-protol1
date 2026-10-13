import Link from "next/link";
import { Icon } from "@iconify/react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import type { JobPreferences } from "@/lib/types/jobseeker-dashboard";

interface JobPreferencesCardProps {
  preferences: JobPreferences;
  cvUrl?: string;
}

/** Shows "—" instead of an empty value. */
const orDash = (value: string) => value.trim() || "—";

const CV_BUTTON =
  "flex items-center gap-2 rounded-md px-4 py-2 text-vxs font-medium font-inter transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue";

export default function JobPreferencesCard({
  preferences,
  cvUrl,
}: JobPreferencesCardProps) {
  const { locations, jobType, salaryRange, interests, experience, skills } =
    preferences;

  const details = [
    {
      icon: "mdi:map-marker-outline",
      label: "Preferred locations",
      value: orDash(locations.join(", ")),
    },
    {
      icon: "mdi:briefcase-outline",
      label: "Job type",
      value: orDash(jobType),
    },
    { icon: "mdi:cash", label: "Salary range", value: orDash(salaryRange) },
    {
      icon: "mdi:heart-outline",
      label: "Job interests",
      value: interests.length > 0 ? `${interests.length} selected` : "—",
    },
    {
      icon: "mdi:lightbulb-outline",
      label: "Skills",
      value: skills.length > 0 ? `${skills.length} selected` : "—",
    },
    { icon: "mdi:history", label: "Experience", value: orDash(experience) },
  ];

  return (
    <DashboardCard
      eyebrow="Your profile"
      title="Job Preferences"
      action={{ label: "Edit", href: "/jobseeker/me" }}
      titleAside={
        cvUrl ? (
          <a
            href={cvUrl}
            download
            className={`${CV_BUTTON} bg-primary-blue text-white hover:bg-primary-blue/90`}
          >
            <Icon icon="mdi:download" aria-hidden="true" />
            Download CV
          </a>
        ) : (
          <Link
            href="/jobseeker/me"
            className={`${CV_BUTTON} border border-primary-blue text-primary-blue hover:bg-primary-blue/5`}
          >
            <Icon icon="mdi:upload" aria-hidden="true" />
            Upload CV
          </Link>
        )
      }
    >
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {details.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xl text-primary-blue"
            >
              <Icon icon={item.icon} />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <dt className="text-vvxs font-regular font-inter text-subtext-light">
                {item.label}
              </dt>
              <dd className="truncate text-vxs font-semibold font-inter text-text-heading">
                {item.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="border-t border-subtext-gray2/30 pt-6">
        <ul role="list" className="flex flex-wrap items-center gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md bg-blue-50 px-3 py-1.5 text-vvxs font-medium font-inter text-primary-blue"
            >
              {skill}
            </li>
          ))}
          <li>
            <Link
              href="/jobseeker/me#skills"
              className="flex items-center gap-1 rounded-md border border-primary-blue/30 px-3 py-1.5 text-vvxs font-medium font-inter text-primary-blue transition-colors hover:bg-primary-blue/5"
            >
              <Icon icon="mdi:plus" aria-hidden="true" />
              Add
            </Link>
          </li>
        </ul>
      </div>
    </DashboardCard>
  );
}
