"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProgressRing from "@/components/ui/ProgressRing";
import Switch from "@/components/ui/Switch";
import type { JobseekerOverview } from "@/lib/types/jobseeker-dashboard";

interface OverviewHeaderProps {
  firstName: string;
  profileCompletion: number;
  openToWork: JobseekerOverview["openToWork"];
}

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function OverviewHeader({
  firstName,
  profileCompletion,
  openToWork,
}: OverviewHeaderProps) {
  // The greeting and date use the visitor's own clock and time zone,
  // so they are filled in after the page loads.
  const [now, setNow] = useState<Date | null>(null);
  const [isOpenToWork, setIsOpenToWork] = useState(openToWork.enabled);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const handleOpenToWorkChange = (enabled: boolean) => {
    setIsOpenToWork(enabled);
    // TODO: save this to your API and revert the switch if the request fails.
  };

  const dateLabel = now
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(now)
    : "";

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-2">
        <p className="min-h-5 text-sm font-medium uppercase tracking-wide font-inter text-primary-blue">
          {now && <time dateTime={now.toISOString()}>{dateLabel}</time>}
        </p>
        <h1 className="text-lg-xl font-semibold font-manrope text-text-heading">
          {now ? getGreeting(now.getHours()) : "Welcome back"}, {firstName}.
        </h1>
        <p className="text-sm font-regular font-inter text-text-secondary-color">
          Your next opportunity is closer than you think.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <ProgressRing value={profileCompletion} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold font-inter text-text-heading">
              Profile complete
            </span>
            {profileCompletion < 100 ? (
              <Link
                href="/jobseeker/me"
                className="text-vxs font-regular font-inter text-primary-blue hover:underline"
              >
                Finish setup
              </Link>
            ) : (
              <span className="text-vxs font-regular font-inter text-text-secondary-color">
                All set
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3">
          <Switch
            checked={isOpenToWork}
            onChange={handleOpenToWorkChange}
            label="Open for job offers"
          />
          <div className="flex flex-col">
            <span className="text-vxs font-medium font-inter text-text-heading">
              Open for Job
            </span>
            <span className="text-vvxs font-regular font-inter text-text-secondary-color">
              {isOpenToWork
                ? `Renews in ${openToWork.renewsInDays} days`
                : "Hidden from employers"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
