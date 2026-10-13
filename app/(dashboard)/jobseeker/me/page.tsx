import type { Metadata } from "next";
import { getMasterProfile } from "@/lib/data/jobseeker-profile";
import ProfileView from "@/components/dashboard/jobseeker/ProfileView";

export const metadata: Metadata = { title: "My Profile" };
export const dynamic = "force-dynamic";

export default async function MyProfilePage() {
  const profile = await getMasterProfile();

  return (
    <div className="px-4 py-8 sm:px-6">
      <ProfileView profile={profile} />
    </div>
  );
}
