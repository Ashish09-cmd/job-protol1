import type { Metadata } from "next";
import { getAccountData } from "@/lib/data/jobseeker-settings";
import AccountForm from "@/components/dashboard/jobseeker/settings/AccountForm";

export const metadata: Metadata = { title: "Account settings" };
export const dynamic = "force-dynamic";

export default async function AccountSettingsPage() {
  const data = await getAccountData();
  return <AccountForm data={data} />;
}
