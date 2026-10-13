"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import InitialsBadge from "@/components/ui/InitialsBadge";
import type { FollowedCompany } from "@/lib/types/jobseeker-profile";

interface FollowingListProps {
  initialCompanies: FollowedCompany[];
}

export default function FollowingList({
  initialCompanies,
}: FollowingListProps) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [following, setFollowing] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(initialCompanies.map((company) => [company.id, true])),
  );
  const [announcement, setAnnouncement] = useState("");

  const toggle = (company: FollowedCompany) => {
    const next = !following[company.id];
    // TODO: call the follow / unfollow API, revert on failure.
    setFollowing((current) => ({ ...current, [company.id]: next }));
    setAnnouncement(
      next ? `Following ${company.name}.` : `Unfollowed ${company.name}.`,
    );
  };

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-subtext-gray2/30 px-6 py-16 text-center">
        <Icon
          icon="mdi:office-building-outline"
          className="text-4xl text-subtext-light"
          aria-hidden="true"
        />
        <p className="text-lg-sm font-semibold font-manrope text-text-heading">
          You aren&apos;t following any companies
        </p>
        <p className="max-w-sm text-sm font-inter text-text-secondary-color">
          Follow a company to get an alert when it opens a new role.
        </p>
      </div>
    );
  }

  return (
    <>
      <p role="status" className="sr-only">
        {announcement}
      </p>

      <ul
        role="list"
        className="divide-y divide-subtext-gray2/30 rounded-2xl border border-subtext-gray2/30 bg-white"
      >
        {companies.map((company) => {
          const isFollowing = following[company.id];

          return (
            <li
              key={company.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <InitialsBadge
                  name={company.name}
                  logoUrl={company.logoUrl}
                  className="size-12"
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <Link
                    href={`/companies/${company.slug}`}
                    className="truncate text-sm font-semibold font-manrope text-text-heading hover:text-primary-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                  >
                    {company.name}
                  </Link>
                  {company.newOpenings > 0 ? (
                    <Link
                      href={`/companies/${company.slug}#openings`}
                      className="w-fit text-vxs font-medium font-inter text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                    >
                      {company.newOpenings} new{" "}
                      {company.newOpenings === 1 ? "opening" : "openings"}
                    </Link>
                  ) : (
                    <span className="text-vxs font-inter text-subtext-light">
                      No new openings
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                aria-pressed={isFollowing}
                onClick={() => toggle(company)}
                aria-label={`${isFollowing ? "Unfollow" : "Follow"} ${company.name}`}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-vxs font-medium font-inter transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
                  isFollowing
                    ? "border-primary-blue bg-blue-50 text-primary-blue hover:bg-blue-50/60"
                    : "border-subtext-gray2/30 bg-white text-text-heading hover:bg-blue-50/60"
                }`}
              >
                <Icon
                  icon={isFollowing ? "mdi:check" : "mdi:plus"}
                  aria-hidden="true"
                />
                {isFollowing ? "Following" : "Follow"}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
