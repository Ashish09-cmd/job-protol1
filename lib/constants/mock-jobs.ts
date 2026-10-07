import type { Job } from "@/lib/types/job";

/**
 * Temporary demo data so the UI can be built and tested.
 * Replace MOCK_JOBS with data from your API / database when it is ready;
 * the components only depend on the `Job` type.
 */
const TEMPLATES = [
  {
    title: "Graphics Designer & Video Editor",
    company: {
      name: "Broadway Infosys",
      slug: "broadway-infosys",
      logo: "https://broadwayinfosys.com/uploads/ourclients/1751449542.png",
    },
  },
  {
    title: "Graphics Designer & Video Editor Specialist",
    company: { name: "Helvetas Nepal", slug: "helvetas-nepal" },
  },
  {
    title: "UI/UX Designer",
    company: { name: "Code Himalaya", slug: "code-himalaya" },
  },
  {
    title: "Junior Fullstack Developer",
    company: {
      name: "Peakora Tech & Workforce Solutions",
      slug: "peakora-tech-workforce-solutions",
    },
  },
];

// 32 postings: the first 4 are jobs, the next 4 internships, and so on,
// so every tab (All / Jobs / Internships) has enough items to fill 4 rows.
export const MOCK_JOBS: Job[] = Array.from({ length: 32 }, (_, index) => {
  const template = TEMPLATES[index % TEMPLATES.length];

  return {
    id: `job-${index + 1}`,
    slug: `${template.company.slug}-${index + 1}`,
    title: template.title,
    type: Math.floor(index / 4) % 2 === 0 ? "job" : "internship",
    daysLeft: index === 2 ? 8 : 10,
    company: template.company,
  };
});
