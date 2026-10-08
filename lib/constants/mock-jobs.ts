import type { Job, JobType } from "@/lib/types/job";

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
    industry: "creative-designing-graphics",
    altIndustry: "marketing-customer-service",
  },
  {
    title: "Graphics Designer & Video Editor Specialist",
    company: { name: "Helvetas Nepal", slug: "helvetas-nepal" },
    industry: "creative-designing-graphics",
    altIndustry: "human-resource-organization",
  },
  {
    title: "UI/UX Designer",
    company: { name: "Code Himalaya", slug: "code-himalaya" },
    industry: "it-telecom-services",
    altIndustry: "creative-designing-graphics",
  },
  {
    title: "Junior Fullstack Developer",
    company: {
      name: "Peakora Tech & Workforce Solutions",
      slug: "peakora-tech-workforce-solutions",
    },
    industry: "it-telecom-services",
    altIndustry: "administration-development",
  },
];

const JOB_LEVELS = [
  "entry-level",
  "mid-level",
  "senior-level",
  "lead-level",
  "executive",
];
const EMPLOYMENT_TYPES = ["full-time", "part-time", "contract"];
const EDUCATION_LEVELS = [
  "undergraduate-freshers",
  "bachelors-graduate",
  "diploma-certificate",
  "masters-phd",
];

// 32 postings: the first 4 are jobs, the next 4 internships, and so on,
// so every tab and filter has enough items to try out.
export const MOCK_JOBS: Job[] = Array.from({ length: 32 }, (_, index) => {
  const template = TEMPLATES[index % TEMPLATES.length];
  const type: JobType = Math.floor(index / 4) % 2 === 0 ? "job" : "internship";
  const isInternship = type === "internship";

  return {
    id: `job-${index + 1}`,
    slug: `${template.company.slug}-${index + 1}`,
    title: template.title,
    type,
    daysLeft: index === 2 ? 8 : index < 16 ? 10 : 10 + (index % 9),
    company: template.company,

    level: isInternship ? "internship" : JOB_LEVELS[index % JOB_LEVELS.length],
    employmentType: isInternship
      ? "traineeship"
      : EMPLOYMENT_TYPES[index % EMPLOYMENT_TYPES.length],
    education:
      EDUCATION_LEVELS[
        (index + Math.floor(index / 4)) % EDUCATION_LEVELS.length
      ],
    industry: index < 16 ? template.industry : template.altIndustry,

    // One day older for every posting, starting from the demo date.
    postedAt: new Date(Date.UTC(2026, 9, 8 - index)).toISOString(),
  };
});