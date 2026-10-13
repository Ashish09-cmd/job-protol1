import type { ReactNode } from "react";
import SettingsNav from "@/components/dashboard/jobseeker/settings/SettingsNav";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-lg-xl font-semibold font-manrope text-text-heading">
          Settings
        </h1>
        <p className="text-sm font-inter text-text-secondary-color">
          Manage your account, visibility, alerts, and notification preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)]">
        <SettingsNav />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
