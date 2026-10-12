import type { Metadata } from "next";
import type { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardTopbar from "@/components/dashboard/jobseeker/DashboardTopbar";
import JobseekerSidebar from "@/components/dashboard/jobseeker/JobseekerSidebar";
import { getCurrentJobseeker } from "@/lib/data/jobseeker-overview";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Broadway Jobs",
    // Each page sets only its own name, e.g. title: "Overview"
    template: "%s | Broadway Jobs",
  },
  // Private pages: keep them out of search engines.
  robots: { index: false, follow: false },
};

export default async function JobseekerLayout({
  children,
}: {
  children: ReactNode;
}) {
  // TODO: if there is no logged-in jobseeker, redirect("/jobseeker/login").
  const user = await getCurrentJobseeker();

  return (
    <DashboardShell
      sidebar={<JobseekerSidebar />}
      topbar={<DashboardTopbar user={user} />}
    >
      {children}
    </DashboardShell>
  );
}
