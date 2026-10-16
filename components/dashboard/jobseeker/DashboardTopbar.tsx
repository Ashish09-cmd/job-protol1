"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Avatar from "@/components/ui/Avatar";
import { useDashboardShell } from "@/components/dashboard/DashboardShell";
import { getPageTitle } from "@/lib/config/jobseeker-nav";
import type { JobseekerUser } from "@/lib/types/jobseeker-dashboard";
import DashboardSearch from "./DashboardSearch";


interface DashboardTopbarProps {
  user: JobseekerUser;
  /** Number of unread notifications. The dot only shows when above 0. */
  unreadNotifications?: number;
}

export default function DashboardTopbar({
  user,
  unreadNotifications = 0,
}: DashboardTopbarProps) {
  const pathname = usePathname();
  const { openSidebar } = useDashboardShell();

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
          <ol className="flex items-center gap-px text-sm font-regular font-inter">
            <li className="text-subtext-gray3 font-medium font-manrope line-height-2xl ">
              Workspace
            </li>
            <li
              aria-hidden="true"
              className="text-subtext-gray3 font-medium font-manrope line-height-2xl"
            >
              /
            </li>
            <li
              aria-current="page"
              className="text-subtext-primary-color font-medium font-manrope line-height-2xl truncate "
            >
              {getPageTitle(pathname)}
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Job and company search with suggestions. Opens /jobseeker/search. */}
        <div className="hidden w-72 sm:block lg:w-110">
          <DashboardSearch />
        </div>

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
          <Icon icon="mdi:bell-outline" className="text-lg " />
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
