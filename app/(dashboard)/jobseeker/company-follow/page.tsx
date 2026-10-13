import type { Metadata } from "next";
import { getFollowedCompanies } from "@/lib/data/jobseeker-profile";
import FollowingList from "@/components/dashboard/jobseeker/FollowingList";

export const metadata: Metadata = { title: "Following" };
export const dynamic = "force-dynamic";

export default async function CompanyFollowPage() {
  const companies = await getFollowedCompanies();

  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-lg-xl font-semibold font-manrope text-text-heading">
          Following
        </h1>
        <p className="text-sm font-inter text-text-secondary-color">
          Companies you follow for new opening alerts.
        </p>
      </header>

      <FollowingList initialCompanies={companies} />
    </div>
  );
}
