import { MOCK_JOBS } from "@/lib/constants/mock-jobs";
import type { JobDetail } from "@/lib/types/job-detail";

/**
 * Temporary static data so the page can be built and tested.
 * Replace the body of `getJobBySlug` with your API / database call.
 * The page only depends on the `JobDetail` type.
 */
const MOCK_JOB_DETAIL: JobDetail = {
  id: "job-1",
  slug: "lead-lighting-designer",
  title: "Lead Lighting Designer",
  company: {
    name: "Real Story Time",
    slug: "real-story-time",
    // logo: "/images/companies/real-story-time.png",
    // Set a banner to see the banner layout (file goes in /public):
    banner: "/assets/job-banner.webp",
    industry: "Media & Entertainment",
    foundedYear: 2015,
    pastJobs: 12,
    organizationSize: "11-50 employees",
  },
  location: "Subhidanagar, Tinkune",
  publishedOn: "2026-09-01",
  applyBefore: "2026-09-15",

  category: "Design & Production",
  employmentType: "Full-time",
  level: "Mid-level",
  salary: "Negotiable",

  description: [
    "Aurora Stage Works is seeking a Lead Lighting Designer to head the visual identity of our 2026–27 Broadway season — three new productions, one revival, and a touring transfer. You will own the lighting concept from first rehearsal room sketch to final focus call, working shoulder-to-shoulder with directors, set designers, and our in-house electrics crew of fourteen.",
    "This is not a desk job. You will be in the theatre six days a week during tech, plotting cues at 2 a.m., and standing in the back of the house on opening night watching an audience of 1,400 respond to light you designed.",
    "You will also help shape how the department works: choosing fixtures, setting standards for documentation, and building a calm, well-organised crew culture that the whole company can rely on.",
  ],

  sections: [
    {
      title: "Key Responsibilities",
      items: [
        "Develop original lighting concepts for 3–4 mainstage productions per season, from script analysis through opening night",
        "Draft light plots, magic sheets, and cue structures using Vectorworks and Lightwright",
        "Lead the electrics team through hang, focus, and tech rehearsals across two Broadway houses",
        "Collaborate with scenic, costume, and projection designers to build a unified visual language",
        "Manage an annual department budget of $1.2M, including rentals, and new fixture acquisition",
        "Mentor two associate lighting designers and oversee the season internship programme",
      ],
    },
    {
      title: "Requirements",
      items: [
        "5+ years of professional experience designing lighting for theatre or live events",
        "Advanced knowledge of ETC Eos family consoles and moving-light programming",
        "Strong drafting skills in Vectorworks, plus experience with previsualisation tools",
        "Comfortable leading a crew and working long, irregular tech hours",
        "A portfolio that shows range across drama, musical, and dance productions",
      ],
    },
  ],

  skills: [
    "Etc eos family",
    "Vector Spotlight",
    "Previz",
    "Rigs",
    "Capture Protocols",
    "LED & Moving Rigs",
    "LED Workshops",
    "Visual Communication",
    "Script Analysis",
  ],

  similarRoles: [
    {
      slug: "associate-lighting-designer",
      title: "Associate Lighting Designer",
      companyName: "Aurora Stage Works",
    },
    {
      slug: "stage-electrician",
      title: "Stage Electrician",
      companyName: "Himalayan Theatre Co.",
    },
    {
      slug: "production-manager",
      title: "Production Manager",
      companyName: "Real Story Time",
    },
  ],
};

export async function getJobBySlug(slug: string): Promise<JobDetail | null> {
  // TODO: fetch the real job here and return null when it does not exist.
  //
  // Because the job lives at the site root (/lead-lighting-designer), this
  // page also receives every unknown URL. Returning null is what turns a typo
  // like /abcd into a proper 404, so never return a job for an unknown slug.

  // Demo only: the demo job, the home page cards and the "Similar Roles"
  // links all open the same demo page.
  const demoCard = MOCK_JOBS.find((job) => job.slug === slug);
  const isSimilarRole = MOCK_JOB_DETAIL.similarRoles.some(
    (role) => role.slug === slug,
  );

  if (slug !== MOCK_JOB_DETAIL.slug && !demoCard && !isSimilarRole) {
    return null;
  }

  return {
    ...MOCK_JOB_DETAIL,
    slug,
    ...(demoCard && {
      title: demoCard.title,
      company: {
        ...MOCK_JOB_DETAIL.company,
        name: demoCard.company.name,
        slug: demoCard.company.slug,
        logo: demoCard.company.logo,
      },
    }),
  };
}
