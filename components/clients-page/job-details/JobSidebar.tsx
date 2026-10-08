import Link from "next/link";
import { Icon } from "@iconify/react";
import SidebarCard from "@/components/ui/SidebarCard";
import type { JobDetail } from "@/lib/types/job-detail";

interface JobSidebarProps {
  job: JobDetail;
}

export default function JobSidebar({ job }: JobSidebarProps) {
  const { company, skills, similarRoles } = job;

  const companyRows = [
    {
      icon: "mdi:office-building-outline",
      label: "Industry Type",
      value: company.industry,
    },
    {
      icon: "mdi:calendar-blank-outline",
      label: "Founded",
      value: String(company.foundedYear),
    },
    {
      icon: "mdi:briefcase-outline",
      label: "Past jobs",
      value: String(company.pastJobs),
    },
    {
      icon: "mdi:account-multiple-outline",
      label: "Organization size",
      value: company.organizationSize,
    },
  ];

  return (
    <aside
      aria-label="Company and role information"
      className="flex flex-col gap-8"
    >
      <SidebarCard title="About the Company">
        <dl>
          {companyRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-subtext-gray2/30 py-3.5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <dt className="flex items-center gap-2 text-sm font-regular font-inter text-subtext-light">
                <Icon icon={row.icon} className="text-base text-primary-blue" />
                {row.label}
              </dt>
              <dd className="text-right text-sm font-medium font-inter text-text-heading">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </SidebarCard>

      {skills.length > 0 && (
        <SidebarCard title="Skills you need to learn">
          <ul role="list" className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-vvxs font-medium font-inter text-primary-blue"
              >
                {skill}
              </li>
            ))}
          </ul>
        </SidebarCard>
      )}

      {similarRoles.length > 0 && (
        <SidebarCard title="Similar Roles">
          <ul
            role="list"
            className="flex flex-col divide-y divide-subtext-gray2/30"
          >
            {similarRoles.map((role) => (
              <li key={role.slug} className="py-3.5 first:pt-0 last:pb-0">
                <Link
                  href={`/${role.slug}`}
                  className="group flex flex-col gap-1"
                >
                  <span className="text-sm font-semibold font-manrope text-text-heading transition-colors group-hover:text-primary-blue">
                    {role.title}
                  </span>
                  <span className="text-vvxs font-semibold uppercase text-primary-blue">
                    {role.companyName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarCard>
      )}
    </aside>
  );
}
