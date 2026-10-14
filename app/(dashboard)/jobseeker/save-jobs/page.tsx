import type { Metadata } from "next";
import { getSavedJobs } from "@/lib/data/jobseeker-profile";
import SavedJobsGrid from "@/components/dashboard/jobseeker/SavedJobsGrid";

export const metadata: Metadata = { title: "Saved Jobs" };
export const dynamic = "force-dynamic";

export default async function SavedJobsPage() {
  const jobs = await getSavedJobs();

  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-2">
        <p className="text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light">
          For you
        </p>
        <h1 className="text-xl font-semibold font-manrope text-text-heading">
          Saved Jobs
        </h1>
        <p className="text-sm line-height-sm font-inter text-text-secondary-color">
          Jobs you&apos;ve bookmarked for later. Apply before they close.
        </p>
      </header>

      <SavedJobsGrid initialJobs={jobs} />
    </div>
  );
}
