import type { Metadata } from "next";
import ApplicationTracker from "@/components/dashboard/jobseeker/ApplicationTracker";
import FollowingSavedCard from "@/components/dashboard/jobseeker/FollowingSavedCard";
import JobPreferencesCard from "@/components/dashboard/jobseeker/JobPreferencesCard";
import OverviewHeader from "@/components/dashboard/jobseeker/OverviewHeader";
import ProfileViewers from "@/components/dashboard/jobseeker/ProfileViewers";
import StatCard from "@/components/dashboard/StatCard";
import {
  getCurrentJobseeker,
  getJobseekerOverview,
} from "@/lib/data/jobseeker-overview";

export const metadata: Metadata = { title: "Overview | Broadway Job" };

// The numbers are different for every logged-in person, so never pre-build this page.
export const dynamic = "force-dynamic";

export default async function JobseekerOverviewPage() {
  const [user, overview] = await Promise.all([
    getCurrentJobseeker(),
    getJobseekerOverview(),
  ]);
  const { stats } = overview;

  const statCards = [
    {
      value: stats.applicationsSent,
      label: "Applications sent",
      href: "/jobseeker/applications",
    },
    { value: stats.profileViews, label: "Profile views" },
    {
      value: stats.savedJobs,
      label: "Saved jobs",
      href: "/jobseeker/save-jobs",
    },
    {
      value: stats.companiesFollowed,
      label: "Companies followed",
      href: "/jobseeker/company-follow",
    },
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6">
      <OverviewHeader
        firstName={user.firstName}
        profileCompletion={overview.profileCompletion}
        openToWork={overview.openToWork}
      />

      <ul role="list" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card) => (
          <li key={card.label} className="flex">
            <div className="flex-1">
              <StatCard
                value={card.value}
                label={card.label}
                href={card.href}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <ApplicationTracker applications={overview.applications} /> 
        <ProfileViewers viewers={overview.viewers} />
        <JobPreferencesCard
          preferences={overview.preferences}
          cvUrl={overview.cvUrl}
        />
        <FollowingSavedCard
          savedJobs={overview.savedJobs}
          savedCount={stats.savedJobs}
          companies={overview.followedCompanies}
          followingCount={stats.companiesFollowed}
        />
      </div>
    </div>
  );
}
