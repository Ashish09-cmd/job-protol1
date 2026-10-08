export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface HowItWorksTab {
  id: "job-seekers" | "company";
  /** Text shown on the tab button. */
  label: string;
  /** Name used in the HowTo structured data (SEO). */
  schemaName: string;
  steps: readonly HowItWorksStep[];
}

/**
 * Content for the "How it works" section.
 * Edit the copy here: the UI and the SEO structured data both read from it.
 */
export const HOW_IT_WORKS_TABS: readonly HowItWorksTab[] = [
  {
    id: "job-seekers",
    label: "For Job Seekers",
    schemaName: "How to find and apply for a job on Broadway",
    steps: [
      {
        title: "Build your profile",
        description:
          "Add your skills, experience, and resume so verified employers can discover you.",
      },
      {
        title: "Search & Filter",
        description:
          "Browse jobs and internships by category, location, and type to find roles that fit you.",
      },
      {
        title: "Apply in-platform",
        description:
          "Apply in a few clicks without leaving the platform, using the profile you already built.",
      },
      {
        title: "Track every status",
        description:
          "Follow each application from submitted to shortlisted so you always know where you stand.",
      },
    ],
  },
  {
    id: "company",
    label: "For Company",
    schemaName: "How to hire talent on Broadway",
    steps: [
      {
        title: "Create company profile",
        description:
          "Set up a verified employer profile that shows job seekers who you are and what you offer.",
      },
      {
        title: "Post a vacancy",
        description:
          "Publish jobs or internships with clear requirements, deadlines, and benefits.",
      },
      {
        title: "Review applicants",
        description:
          "Receive every application in one place and shortlist the right candidates with ease.",
      },
      {
        title: "Hire with confidence",
        description:
          "Manage interviews and updates, then make your offer and welcome the new team member.",
      },
    ],
  },
];
