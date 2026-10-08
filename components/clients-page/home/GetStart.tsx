import Image from "next/image";
import Link from "next/link";

// Update these to match your routes.
const JOB_SEEKER_HREF = "/register/job-seeker";
const COMPANY_HREF = "/register/company";

// Figma shows -4.52° (Figma rotates counter-clockwise for positive values),
// which is a +4.52deg clockwise rotation in CSS.
const BACKGROUND_ROTATION = "rotate-[4.52deg]";

export default function GetStart() {
  return (
    <section aria-labelledby="get-started-heading">
      <div className="max-w-7xl mx-auto py-8 flex flex-col items-center justify-between gap-10 lg:flex-row">
        {/* Text + actions */}
        <div className="max-w-2xl flex flex-col gap-8">
          <div className="max-w-2xl flex flex-col gap-4">
            <h2
              id="get-started-heading"
              className="text-lg-xl font-manrope font-bold text-title-primary-color line-height-2xl"
            >
              See it for <span className="text-primary-blue">yourself</span>.
              Start with a profile or a <br className="hidden lg:block" />
              <span className="text-primary-blue">company account.</span>
            </h2>
            <p className="text-sm font-inter font-regular line-height-sm text-text-secondary-color">
              Job seeker profiles are free and always browsable. Company
              verification runs on a 48-hour SLA.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={JOB_SEEKER_HREF}
              className="py-2 px-4 rounded-md hover:bg-primary-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue bg-primary-blue text-sm font-medium font-inter line-height-sm text-white"
            >
              I’m looking for the job
            </Link>
            <Link
              href={COMPANY_HREF}
              className="py-2 px-4 rounded-md border transition-all duration-100 hover:bg-primary-blue hover:text-white border-primary-blue text-sm font-medium font-inter line-height-sm text-primary-blue"
            >
              I’m looking for talent
            </Link>
          </div>
        </div>

        {/*
          Image part. The padding gives the rotated blue background room,
          so its corners are not clipped or cause horizontal scrolling.
        */}
        <div className="w-full max-w-[487px] shrink-0 p-3">
          <div className="relative aspect-[463/287] w-full max-w-[463px]">
            {/* Rotated blue background */}
            <div
              aria-hidden="true"
              className={`absolute inset-0  bg-primary-blue ${BACKGROUND_ROTATION}`}
            />

            {/* Image (not rotated) */}
            <Image
              src="/assets/getstart.jpg"
              alt="Job seekers and employers connecting on the platform"
              fill
              sizes="(min-width: 1024px) 463px, 100vw"
              className=" object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
