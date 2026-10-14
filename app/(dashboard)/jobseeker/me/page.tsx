import type { Metadata } from "next";
import { getMasterProfile } from "@/lib/data/jobseeker-profile";
import {
  getEmployerInterest,
  getProfileVisibility,
} from "@/lib/data/profile-extras";
import ProfileView from "@/components/dashboard/jobseeker/ProfileView";

export const metadata: Metadata = { title: "My Profile" };
export const dynamic = "force-dynamic";

export default async function MyProfilePage() {
  const [profile, visibility, interest] = await Promise.all([
    getMasterProfile(),
    getProfileVisibility(),
    getEmployerInterest(),
  ]);

  return (
    <div className="px-4 py-8 sm:px-6">
      <ProfileView
        profile={profile}
        visibility={visibility}
        interest={interest}
      />
    </div>
  );
}