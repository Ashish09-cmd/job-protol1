import type { JobDetail } from "@/lib/types/job-detail";

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
  traineeship: "INTERN",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildDescriptionHtml(job: JobDetail): string {
  const paragraphs = job.description.map((p) => `<p>${escapeHtml(p)}</p>`);
  const sections = job.sections.map(
    (section) =>
      `<p><strong>${escapeHtml(section.title)}</strong></p><ul>${section.items
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul>`,
  );

  return [...paragraphs, ...sections].join("");
}

/**
 * schema.org JobPosting data. This is what lets Google show the vacancy in
 * "Google for Jobs". Rendered as JSON-LD on the job details page.
 */
export function buildJobPostingSchema(job: JobDetail, pageUrl: string) {
  const { company } = job;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: buildDescriptionHtml(job),
    datePosted: job.publishedOn,
    validThrough: job.applyBefore,
    employmentType:
      EMPLOYMENT_TYPE_MAP[job.employmentType.toLowerCase()] ?? "OTHER",
    industry: company.industry,
    skills: job.skills.join(", "),
    directApply: true,
    url: pageUrl,
    identifier: {
      "@type": "PropertyValue",
      name: company.name,
      value: job.id,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: company.name,
      ...(company.website && { sameAs: company.website }),
      ...(company.logo && { logo: company.logo }),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "NP",
      },
    },
  };
}
