"use client";

import { useEffect, useRef, useState } from "react";
import JobActions from "@/components/clients-page/job-details/JobActions";
import JobMeta from "@/components/clients-page/job-details/JobMeta";
import JobTags from "@/components/clients-page/job-details/JobTags";
import type { JobDetail } from "@/lib/types/job-detail";

/**
 * Height of the site navbar in px. The compact bar sticks right below it.
 * Set to 0 if your navbar scrolls away with the page.
 */
const STICKY_OFFSET_PX = 90;

const SHADOW = "shadow-[0_2px_12px_rgba(15,23,42,0.06)]";

interface JobDetailsHeaderProps {
  job: JobDetail;
}

function CompanyLogo({
  name,
  logo,
  className,
}: {
  name: string;
  logo?: string;
  className: string;
}) {
  return (
    <div className={`overflow-hidden bg-white ${className}`}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={`${name} logo`}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-lg-sm font-bold font-manrope text-primary-blue">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export default function JobDetailsHeader({ job }: JobDetailsHeaderProps) {
  const { company } = job;
  const titleRowRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const applyHref = `/jobs/${job.slug}/apply`;
  const toggleSave = () => setIsSaved((saved) => !saved);

  // Show the compact bar once the title row has scrolled up past the navbar.
  useEffect(() => {
    const element = titleRowRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: `-${STICKY_OFFSET_PX}px 0px 0px 0px` },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={`bg-white ${SHADOW}`}>
        {/* Company banner (only when the company added one) */}
        {company.banner && (
          <div className="h-44 w-full bg-primary-blue/10 sm:h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={company.banner}
              alt={`${company.name} banner`}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {/* Logo: overlaps the banner when there is one */}
          <CompanyLogo
            name={company.name}
            logo={company.logo}
            className={`relative z-10 h-[90px] w-[182px] rounded-lg border border-[#aeaeb243] shadow-sm ${
              company.banner ? "-mt-11" : "mt-8"
            }`}
          />

          <div
            ref={titleRowRef}
            className="flex flex-col gap-6 py-6 lg:flex-row lg:items-start lg:justify-between"
          >
            <div className="flex min-w-0 flex-col gap-4">
              <h1 className="text-lg-xl font-bold font-manrope line-height-2xl text-text-heading">
                {job.title}
              </h1>
              <JobMeta job={job} />
            </div>

            <JobActions
              title={job.title}
              applyHref={applyHref}
              isSaved={isSaved}
              onToggleSave={toggleSave}
            />
          </div>

          <div className="border-t border-subtext-gray2/30 py-6">
            <JobTags job={job} />
          </div>
        </div>
      </header>

      {/* Compact bar: slides in below the navbar while scrolling down */}
      <div
        aria-hidden={!isStuck}
        style={{ top: STICKY_OFFSET_PX }}
        className={`fixed inset-x-0 z-30 bg-white transition-all duration-300 ease-out motion-reduce:transition-none ${SHADOW} ${
          isStuck
            ? "translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-6 py-4">
          <div className="flex min-w-0 items-start gap-4">
            <CompanyLogo
              name={company.name}
              logo={company.logo}
              className="hidden h-10 w-[75px] shrink-0 sm:block"
            />
            <div className="flex min-w-0 flex-col gap-3">
              <p className="text-base font-semibold font-manrope text-text-heading">
                {job.title}
              </p>
              <JobMeta job={job} />
              <JobTags job={job} />
            </div>
          </div>

          <JobActions
            variant="compact"
            title={job.title}
            applyHref={applyHref}
            isSaved={isSaved}
            onToggleSave={toggleSave}
          />
        </div>
      </div>
    </>
  );
}
