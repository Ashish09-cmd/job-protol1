"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Avatar from "@/components/ui/Avatar";
import { useDashboardShell } from "@/components/dashboard/DashboardShell";
import { getPageTitle } from "@/lib/config/jobseeker-nav";
import { buildSearchUrl } from "@/lib/constants/search";
import type { JobseekerUser } from "@/lib/types/jobseeker-dashboard";

interface DashboardTopbarProps {
  user: JobseekerUser;
  /** Number of unread notifications. The dot only shows when above 0. */
  unreadNotifications?: number;
}

export default function DashboardTopbar({
  user,
  unreadNotifications = 0,
}: DashboardTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { openSidebar } = useDashboardShell();
  const [query, setQuery] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(buildSearchUrl(query));
  };

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between gap-4 border-b border-subtext-gray2/30 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={openSidebar}
          aria-label="Open menu"
          className="flex size-10 cursor-pointer items-center justify-center rounded-md text-text-heading hover:bg-blue-50 lg:hidden"
        >
          <Icon icon="mdi:menu" className="text-2xl" />
        </button>

        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm font-regular font-inter">
            <li className="text-text-secondary-color">Workspace</li>
            <li aria-hidden="true" className="text-text-secondary-color">
              /
            </li>
            <li aria-current="page" className="truncate text-text-heading">
              {getPageTitle(pathname)}
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <form
          role="search"
          onSubmit={handleSearch}
          className="relative hidden w-72 sm:block"
        >
          <Icon
            icon="mdi:magnify"
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-subtext-light"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search jobs"
            placeholder="Search jobs"
            className="h-10 w-full rounded-md border border-[#E2E8EA] bg-white pl-10 pr-3 text-sm font-regular font-inter text-text-heading outline-none transition-colors placeholder:text-subtext-light focus:border-primary-blue/50"
          />
        </form>

        {/* TODO: link this to a notifications page or open a notifications menu. */}
        <button
          type="button"
          aria-label={
            unreadNotifications > 0
              ? `Notifications, ${unreadNotifications} unread`
              : "Notifications"
          }
          className="relative flex size-10 cursor-pointer items-center justify-center rounded-full text-text-secondary-color transition-colors hover:bg-blue-50"
        >
          <Icon icon="mdi:bell-outline" className="text-2xl" />
          {unreadNotifications > 0 && (
            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
          )}
        </button>

        <Link
          href="/jobseeker/me"
          aria-label={`${user.fullName}, open your profile`}
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          <Avatar name={user.fullName} src={user.avatar} className="size-10" />
        </Link>
      </div>
    </header>
  );
}
