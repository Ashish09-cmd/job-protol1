import type { ReactNode } from "react";
import SettingsNav from "@/components/dashboard/jobseeker/settings/SettingsNav";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-lg-xl font-bold line-height-2xl font-manrope text-text-heading">
          Settings
        </h1>
        <p className="text-xs font-inter text-text-secondary-color font-regular line-height-sm ">
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