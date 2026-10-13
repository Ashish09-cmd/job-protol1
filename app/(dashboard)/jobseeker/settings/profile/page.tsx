import type { Metadata } from "next";
import { getProfileSettings } from "@/lib/data/jobseeker-settings";
import ProfileSettingsForm from "@/components/dashboard/jobseeker/settings/ProfileSettingsForm";

export const metadata: Metadata = { title: "Profile & CV settings" };
export const dynamic = "force-dynamic";

export default async function ProfileSettingsPage() {
  const data = await getProfileSettings();
  return <ProfileSettingsForm data={data} />;
}
