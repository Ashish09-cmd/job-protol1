import ApplicationsList from "@/components/dashboard/jobseeker/ApplicationsList";
import PageHeader from "@/components/dashboard/PageHeader";
import { getJobseekerApplications } from "@/lib/data/jobseeker-applications";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Applications" };

// The list is different for every logged-in person, so never pre-build this page.
export const dynamic = "force-dynamic";

export default async function JobseekerApplicationsPage() {
  const applications = await getJobseekerApplications();

  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6">
      <PageHeader
        title="Applications"
        description="Track every applications from applied to getting hired."
      />
      <ApplicationsList applications={applications} />
    </div>
  );
}
