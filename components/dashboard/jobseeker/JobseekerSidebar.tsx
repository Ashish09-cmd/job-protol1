"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { JOBSEEKER_NAV, isActivePath } from "@/lib/config/jobseeker-nav";
import { siteConfig } from "@/lib/config/site";

export default function JobseekerSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Jobseeker dashboard"
      className="flex h-full flex-col gap-8 overflow-y-auto px-3 py-5"
    >
      <Link href="/" aria-label="Broadway Jobs home" className="px-2">
        {/* Replace with the path of your logo file in /public */}
        <Image
          src={`/${siteConfig.header_logo}`}
          alt={`/${siteConfig.header_logo_alt}`}
          width={150}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </Link>

      {JOBSEEKER_NAV.map((group) => (
        <div key={group.label} className="flex flex-col gap-3">
          <p className="px-3 text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light">
            {group.label}
          </p>

          <ul role="list" className="flex flex-col gap-1">
            {group.items.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-inter transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
                      isActive
                        ? "bg-blue-50 font-medium text-primary-blue"
                        : "font-regular text-text-secondary-color hover:bg-blue-50/60 hover:text-text-heading"
                    }`}
                  >
                    <Icon
                      icon={item.icon}
                      className="text-xl"
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
