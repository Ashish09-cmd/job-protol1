"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import JobCard from "@/components/ui/JobCard";
import JobTabs, { type JobTab } from "@/components/ui/JobTabs";
import { MOCK_JOBS } from "@/lib/constants/mock-jobs";

/** Page the "Explore Opportunities" button navigates to. */
const JOB_CATEGORIES_PATH = "/category";

/** 4 columns x 4 rows. Keep in sync with the grid's lg:grid-cols-4. */
const MAX_VISIBLE_JOBS = 16;

/** Must match the `duration-200` class on the grid wrapper below. */
const FADE_DURATION_MS = 200;

export default function VacencySection() {
  const [activeTab, setActiveTab] = useState<JobTab>("all");
  const [isVisible, setIsVisible] = useState(true);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending fade timer when the component unmounts.
  useEffect(() => {
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, []);

  const visibleJobs = MOCK_JOBS.filter(
    (job) => activeTab === "all" || job.type === activeTab,
  ).slice(0, MAX_VISIBLE_JOBS);

  // Fade out -> swap the list -> fade back in.
  const handleTabChange = (tab: JobTab) => {
    if (tab === activeTab) return;
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);

    setIsVisible(false);
    fadeTimeout.current = setTimeout(() => {
      setActiveTab(tab);
      setIsVisible(true);
    }, FADE_DURATION_MS);
  };

  return (
    <section className="bg-separator3/45">
      <div className="max-w-7xl py-8 lg:py-10 mx-auto flex flex-col gap-8">
        {/* Heading + tabs */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="flex flex-col gap-2 max-w-3xl">
            <h2 className="font-bold text-lg-xl line-height-2xl font-manrope">
              Roles worth{" "}
              <span className="text-primary-blue">looking twice at</span>
            </h2>
            <p className="text-sm font-regular font-inter text-text-secondary-color line-height-sm">
              Connecting skilled people with companies worth joining. Verified
              employers, easy in-platform applications, and a straightforward
              job search experience.
            </p>
          </div>

          <JobTabs activeTab={activeTab} onChange={handleTabChange} />
        </div>

        {/* Job cards */}
        <div
          role="tabpanel"
          className={`transition-all duration-200 ease-out motion-reduce:transition-none ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {visibleJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm font-inter text-text-secondary-color">
              No vacancies available right now. Please check back soon.
            </p>
          )}
        </div>

        {/* Call to action */}
        <div className="flex justify-center">
          <Link
            href={JOB_CATEGORIES_PATH}
            className="flex items-center gap-2 rounded-[60px] bg-primary-blue px-7 py-3 text-vxs font-semibold font-inter line-height-sm text-white transition-colors hover:bg-primary-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            <span>Explore Opportunities</span>
            <Icon
              icon="material-symbols:arrow-right-alt"
              className="text-base"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
