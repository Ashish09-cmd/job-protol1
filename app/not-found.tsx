import { buttonStyles } from "@/components/ui/button/Button.contract";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};


const QUICK_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Job Categories", href: "/categories" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <section className="w-full flex p-5 lg:p-20">
        <div className="w-7xl mx-auto ">
          <div className="text-center w-200 mx-auto flex flex-col gap-8 bg-blue-50 p-8 rounded-md">
            <div className="relative flex items-center justify-center h-50 w-50 rounded-full mx-auto bg-blue-100">
              <p className="relative text-5xl font-black leading-none font-manrope text-primary-blue">
                404
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold font-manrope line-height-sm text-black">
                Page not found
              </h1>
              <p className="text-sm font-regular font-inter line-height-sm text-subtext-gray3">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
                It may have been moved, renamed, or no longer exists.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className={buttonStyles({ size: "md" })}>
                Back to Home
              </Link>
              <Link
                href="/jobs"
                className={buttonStyles({ variant: "outline", size: "md" })}
              >
                Browse Jobs
              </Link>
            </div>

            <div className="flex w-full flex-col items-center gap-3 border-t border-[#DADADC] pt-6">
              <p className="text-xs font-regular font-inter text-black/50">
                Or try one of these
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-inter text-primary-blue underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}
