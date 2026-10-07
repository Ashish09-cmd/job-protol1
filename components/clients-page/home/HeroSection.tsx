import TypingText from "@/components/ui/Typingtext";
import Link from "next/link";
import JobSearchBar from "./partials/JobSearchBar";

const HERO_WORDS = [
  "Dream Career",
  "Next Opportunity",
  "Perfect Role",
  "Tech Future",
] as const;


export default function HeroSection() {
  return (
    <>
      <section className="bg-[linear-gradient(to_bottom_right,#FFFFFF_12%,rgba(217,222,253,0.53)_33%,rgba(240,242,254,0.71)_71%,#FFFFFF_90%)]">
        <div className="max-w-5xl section-padding mx-auto flex items-center text-center justify-center flex-col gap-5">
          <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col gap-2 lg:gap-5">
              <h1 className="text-2xl font-black font-manrope line-height-2xl text-text-heading">
                Find Your{" "}
                <TypingText className="text-primary-blue" words={HERO_WORDS} />
                <br /> in Tech & Beyond
              </h1>
              <p className="text-xs max-w-2xl font-regular font-inter line-height-sm text-text-secondary-color">
                Connecting skilled people with companies worth joining. Verified
                employers, easy in-platform applications, and a straightforward
                job search experience.
              </p>
            </div>
            <JobSearchBar className="max-w-2xl" />
          </div>
          <div className="flex items-center gap-1 text-vxs font-medium font-manrope text-black">
            Popular Searches:
            <Link href="" className="text-primary-blue underline">
              Engineering,
            </Link>
            <Link href="" className="text-primary-blue underline">
              Project Management,
            </Link>
            <Link href="" className="text-primary-blue underline">
              Graphics Designer,
            </Link>
            <Link href="" className="text-primary-blue underline">
              Frontend Developer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
