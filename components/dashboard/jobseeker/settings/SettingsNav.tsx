"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

export const SETTINGS_BASE = "/jobseeker/settings";

const SETTINGS_TABS = [
  {
    label: "Profile & CV",
    href: `${SETTINGS_BASE}/profile`,
    icon: "mdi:file-document-outline",
  },
  {
    label: "Notifications",
    href: `${SETTINGS_BASE}/notifications`,
    icon: "mdi:bell-outline",
  },
  {
    label: "Privacy & Visibility",
    href: `${SETTINGS_BASE}/privacy-visibility`,
    icon: "mdi:shield-outline",
  },
  {
    label: "Account",
    href: `${SETTINGS_BASE}/account`,
    icon: "mdi:account-outline",
  },
] as const;

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <aside className="flex h-fit flex-col gap-4 rounded-2xl border sticky top-22 border-subtext-gray2/30 bg-white p-4 shadow-sm">
      <nav aria-label="Settings sections" className="flex flex-col gap-2">
        <p className="px-3 pt-1 text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light">
          Settings
        </p>
        <ul role="list" className="flex flex-col gap-1">
          {SETTINGS_TABS.map((tab) => {
            const active =
              pathname === tab.href || pathname.startsWith(`${tab.href}/`);

            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-inter transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
                    active
                      ? "bg-separator3/45 font-medium text-text-heading"
                      : "text-text-secondary-color hover:bg-separator3/30"
                  }`}
                >
                  <Icon
                    icon={tab.icon}
                    className="text-xl"
                    aria-hidden="true"
                  />
                  <span className="flex-1">{tab.label}</span>
                  {active && (
                    <Icon
                      icon="mdi:chevron-right"
                      className="text-lg text-subtext-light"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-1 border-t border-subtext-gray2/30 px-3 pt-4">
        <p className="text-vxs font-semibold font-inter text-primary-blue">
          Your data is yours
        </p>
        <p className="text-vxs font-inter text-text-secondary-color">
          We only share your live profile when you choose to apply.
        </p>
      </div>
    </aside>
  );
}
