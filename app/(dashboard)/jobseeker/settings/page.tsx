import { redirect } from "next/navigation";

/** /jobseeker/settings opens the Account tab. */
export default function SettingsIndexPage() {
  redirect("/jobseeker/settings/account");
}
