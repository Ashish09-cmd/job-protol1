import type { Metadata } from "next";
import { getPrivacySettings } from "@/lib/data/jobseeker-settings";
import PrivacyForm from "@/components/dashboard/jobseeker/settings/PrivacyForm";

export const metadata: Metadata = { title: "Privacy & visibility" };
export const dynamic = "force-dynamic";

export default async function PrivacySettingsPage() {
  const settings = await getPrivacySettings();
  return <PrivacyForm initial={settings} />;
}
