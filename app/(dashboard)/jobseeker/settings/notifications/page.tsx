import type { Metadata } from "next";
import { getNotificationSettings } from "@/lib/data/jobseeker-settings";
import NotificationsForm from "@/components/dashboard/jobseeker/settings/NotificationsForm";

export const metadata: Metadata = { title: "Notification settings" };
export const dynamic = "force-dynamic";

export default async function NotificationSettingsPage() {
  const settings = await getNotificationSettings();
  return <NotificationsForm initial={settings} />;
}
