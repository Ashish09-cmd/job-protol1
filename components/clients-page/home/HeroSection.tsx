import Link from "next/link";
import TypingText from "@/components/ui/Typingtext";
import { buildSearchUrl } from "@/lib/constants/search";
import JobSearchBar from "./partials/JobSearchBar";

const HERO_WORDS = [
  "Dream Career",
  "Next Opportunity",
  "Perfect Role",
  "Tech Future",
] as const;

const POPULAR_SEARCHES = [
  "Engineering",
  "Project Management",
  "Graphics Designer",
  "Frontend Developer",
] as const;

export default function HeroSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom_right,#FFFFFF_12%,rgba(217,222,253,0.53)_33%,rgba(240,242,254,0.71)_71%,#FFFFFF_90%)]">
      <div className="max-w-5xl section-padding mx-auto flex items-center text-center justify-center flex-col gap-5">
        <div className="flex w-full flex-col items-center gap-6 lg:gap-8">
          <div className="flex flex-col gap-2 lg:gap-5">
            <h1 className="text-2xl font-black font-manrope line-height-2xl text-text-heading">
              Find Your{" "}
              <TypingText className="text-primary-blue" words={HERO_WORDS} />
              <br /> in Tech &amp; Beyond
            </h1>
            <p className="text-xs max-w-2xl font-regular font-inter line-height-sm text-text-secondary-color">
              Connecting skilled people with companies worth joining. Verified
              employers, easy in-platform applications, and a straightforward
              job search experience.
            </p>
          </div>

          <JobSearchBar className="max-w-2xl" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-vxs font-medium font-manrope text-black">
          <span>Popular Searches:</span>
          {POPULAR_SEARCHES.map((term, index) => (
            <span key={term}>
              <Link
                href={buildSearchUrl(term)}
                className="text-primary-blue underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                {term}
              </Link>
              {index < POPULAR_SEARCHES.length - 1 && ","}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
