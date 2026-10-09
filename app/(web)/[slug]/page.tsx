import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDescription from "@/components/clients-page/job-details/JobDescription";
import JobDetailsHeader from "@/components/clients-page/job-details/JobDetailsHeader";
import JobSection from "@/components/clients-page/job-details/JobSection";
import JobSidebar from "@/components/clients-page/job-details/JobSidebar";
import { getJobBySlug } from "@/lib/data/job-details";
import { buildJobPostingSchema } from "@/lib/utils/job-posting-schema";

/** Your public site URL, e.g. https://broadwayjobs.com (used in structured data). */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

// Next.js 15+: `params` is a Promise. On Next.js 14, use `params.slug` directly.
interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) return { title: "Job not found" };

  const title = `${job.title} at ${job.company.name}`;
  const description = job.description[0].slice(0, 155).trimEnd() + "…";

  return {
    title,
    description,
    alternates: { canonical: `/${job.slug}` },
    openGraph: {
      title,
      description,
      images: job.company.banner ? [job.company.banner] : undefined,
    },
  };
}

export default async function JobDetailsPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  // "<" is escaped so the text can never close the <script> tag early.
  const structuredData = JSON.stringify(
    buildJobPostingSchema(job, `${SITE_URL}/${job.slug}`),
  ).replace(/</g, "\\u003c");

  return (
    <article>
      <JobDetailsHeader job={job} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_398px] lg:gap-16">
        <div className="flex min-w-0 max-w-3xl flex-col gap-10">
          <section
            aria-labelledby="about-the-role"
            className="flex flex-col gap-5"
          >
            <h2
              id="about-the-role"
              className="text-lg-sm font-semibold font-manrope text-text-heading"
            >
              About the Role
            </h2>
            <JobDescription paragraphs={job.description} />
          </section>

          {job.sections.map((section) => (
            <JobSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>

        <JobSidebar job={job} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </article>
  );
}
