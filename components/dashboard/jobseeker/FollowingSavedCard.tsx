"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Avatar from "@/components/ui/Avatar";
import SegmentedControl from "@/components/ui/SegmentedControl";
import DashboardCard from "@/components/dashboard/DashboardCard";
import type {
  FollowedCompanyPreview,
  SavedJobPreview,
} from "@/lib/types/jobseeker-dashboard";

type Tab = "following" | "saved";

interface FollowingSavedCardProps {
  savedJobs: readonly SavedJobPreview[];
  /** Total saved jobs (the list above is only a preview). */
  savedCount: number;
  companies: readonly FollowedCompanyPreview[];
  /** Total followed companies (the list above is only a preview). */
  followingCount: number;
}

const ID_PREFIX = "following-saved";

export default function FollowingSavedCard({
  savedJobs,
  savedCount,
  companies,
  followingCount,
}: FollowingSavedCardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("saved");
  const [visibleSaved, setVisibleSaved] = useState(savedJobs);
  const [removedCount, setRemovedCount] = useState(0);

  const currentSavedCount = Math.max(savedCount - removedCount, 0);

  const handleUnsave = (id: string) => {
    // TODO: call your API here and put the job back if the request fails.
    setVisibleSaved((current) => current.filter((job) => job.id !== id));
    setRemovedCount((count) => count + 1);
  };

  const tabs = [
    { id: "following" as const, label: `Following(${followingCount})` },
    { id: "saved" as const, label: `Saved jobs(${currentSavedCount})` },
  ];

  return (
    <DashboardCard
      eyebrow="For you"
      title="Following & Saved Jobs"
      action={
        activeTab === "saved"
          ? { label: "View All", href: "/jobseeker/save-jobs" }
          : { label: "View All", href: "/jobseeker/company-follow" }
      }
    >
      <SegmentedControl
        options={tabs}
        value={activeTab}
        onChange={setActiveTab}
        label="Following or saved jobs"
        idPrefix={ID_PREFIX}
      />

      <div
        role="tabpanel"
        id={`${ID_PREFIX}-panel`}
        aria-labelledby={`${ID_PREFIX}-tab-${activeTab}`}
        className="border-t border-subtext-gray2/30 pt-6"
      >
        {activeTab === "saved" ? (
          visibleSaved.length > 0 ? (
            <ul role="list" className="flex flex-col gap-4">
              {visibleSaved.map((job) => (
                <li key={job.id} className="flex items-center gap-3">
                  <Avatar
                    name={job.companyName}
                    src={job.companyLogo}
                    shape="square"
                    className="h-8 w-11"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <Link
                      href={`/${job.slug}`}
                      className="truncate text-vxs font-semibold font-inter text-text-heading hover:text-primary-blue"
                    >
                      {job.title}
                    </Link>
                    <span className="truncate text-vvxs font-regular font-inter text-text-secondary-color">
                      {job.companyName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnsave(job.id)}
                    aria-label={`Remove ${job.title} from saved jobs`}
                    className="cursor-pointer text-lg text-primary-blue"
                  >
                    <Icon icon="mdi:bookmark" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm font-regular font-inter text-text-secondary-color">
              You have no saved jobs yet.{" "}
              <Link
                href="/search"
                className="text-primary-blue hover:underline"
              >
                Browse jobs
              </Link>
            </p>
          )
        ) : companies.length > 0 ? (
          <ul role="list" className="flex flex-col gap-4">
            {companies.map((company) => (
              <li key={company.id}>
                <Link
                  href={`/companies/${company.slug}`}
                  className="group flex items-center gap-3"
                >
                  <Avatar
                    name={company.name}
                    src={company.logo}
                    shape="square"
                    className="h-8 w-11"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-vxs font-semibold font-inter text-text-heading group-hover:text-primary-blue">
                      {company.name}
                    </span>
                    <span className="truncate text-vvxs font-regular font-inter text-text-secondary-color">
                      {company.industry} · {company.openRoles} open{" "}
                      {company.openRoles === 1 ? "role" : "roles"}
                    </span>
                  </div>
                  <Icon
                    icon="mdi:chevron-right"
                    aria-hidden="true"
                    className="text-lg text-subtext-light"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm font-regular font-inter text-text-secondary-color">
            You aren’t following any companies yet.
          </p>
        )}
      </div>
    </DashboardCard>
  );
}
