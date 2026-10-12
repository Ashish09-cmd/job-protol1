export interface DashboardNavItem {
  label: string;
  href: string;
  /** Iconify icon name */
  icon: string;
}

export interface DashboardNavGroup {
  label: string;
  items: DashboardNavItem[];
}

export const JOBSEEKER_HOME = "/jobseeker";

export const JOBSEEKER_NAV: readonly DashboardNavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        label: "Overview ",
        href: JOBSEEKER_HOME,
        icon: "mdi:view-dashboard-outline",
      },
      {
        label: "My Profile",
        href: "/jobseeker/me",
        icon: "mdi:account-outline",
      },
      {
        label: "Applications",
        href: "/jobseeker/applications",
        icon: "mdi:briefcase-outline",
      },
      {
        label: "Saved Jobs",
        href: "/jobseeker/save-jobs",
        icon: "mdi:bookmark-outline",
      },
      {
        label: "Company Followed",
        href: "/jobseeker/company-follow",
        icon: "mdi:office-building-outline",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Settings",
        href: "/jobseeker/settings",
        icon: "mdi:cog-outline",
      },
    ],
  },
];

/** "/jobseeker" only matches itself; other items also match their sub-pages. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === JOBSEEKER_HOME) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Name of the current page, used in the breadcrumb. */
export function getPageTitle(pathname: string): string {
  const items = JOBSEEKER_NAV.flatMap((group) => group.items);
  return (
    items.find((item) => isActivePath(pathname, item.href))?.label ?? "Overview"
  );
}
