import type { TrackedApplication } from "@/lib/types/jobseeker-dashboard";

/**
 * Temporary static data. Replace the body with your API call and keep the return type.
 * The first five items match the preview on the Overview page.
 */
export async function getJobseekerApplications(): Promise<
  TrackedApplication[]
> {
  // TODO: fetch the full application list of the logged-in user (newest first).
  const helvetas = {
    companyName: "Helvetas Nepal",
    companySlug: "helvetas-nepal",
  };
  const codeHimalaya = {
    companyName: "Code Himalaya",
    companySlug: "code-himalaya",
  };
  const broadway = {
    companyName: "Broadway Infosys",
    companySlug: "broadway-infosys",
  };

  return [
    {
      id: "app-1",
      jobTitle: "Graphics Designer & Video Editor Lead",
      jobSlug: "helvetas-nepal-2",
      ...helvetas,
      appliedOn: "2026-09-26",
      status: "under-review",
    },
    {
      id: "app-2",
      jobTitle: "Content Writing Internship",
      jobSlug: "helvetas-nepal-2",
      ...helvetas,
      appliedOn: "2026-09-16",
      status: "interview",
    },
    {
      id: "app-3",
      jobTitle: "UI/UX Designer",
      jobSlug: "code-himalaya-3",
      ...helvetas,
      appliedOn: "2026-09-14",
      status: "hired",
    },
    {
      id: "app-4",
      jobTitle: "Computer Assistant Lecturer",
      jobSlug: "helvetas-nepal-2",
      ...helvetas,
      appliedOn: "2026-09-03",
      status: "rejected",
    },
    {
      id: "app-5",
      jobTitle: "Mid-Level Full stack Developer",
      jobSlug: "peakora-tech-workforce-solutions-4",
      ...helvetas,
      appliedOn: "2026-09-01",
      status: "applied",
    },
    {
      id: "app-6",
      jobTitle: "Product Designer",
      jobSlug: "broadway-infosys-1",
      ...broadway,
      appliedOn: "2026-08-28",
      status: "under-review",
    },
    {
      id: "app-7",
      jobTitle: "Frontend Developer Intern",
      jobSlug: "code-himalaya-3",
      ...codeHimalaya,
      appliedOn: "2026-08-25",
      status: "applied",
    },
    {
      id: "app-8",
      jobTitle: "Brand Designer",
      jobSlug: "helvetas-nepal-2",
      ...helvetas,
      appliedOn: "2026-08-20",
      status: "rejected",
    },
    {
      id: "app-9",
      jobTitle: "Motion Graphics Artist",
      jobSlug: "broadway-infosys-1",
      ...broadway,
      appliedOn: "2026-08-14",
      status: "interview",
    },
    {
      id: "app-10",
      jobTitle: "UX Researcher",
      jobSlug: "code-himalaya-3",
      ...codeHimalaya,
      appliedOn: "2026-08-09",
      status: "withdrawn",
    },
    {
      id: "app-11",
      jobTitle: "Social Media Executive",
      jobSlug: "helvetas-nepal-2",
      ...helvetas,
      appliedOn: "2026-08-02",
      status: "applied",
    },
    {
      id: "app-12",
      jobTitle: "Design Systems Engineer",
      jobSlug: "broadway-infosys-1",
      ...broadway,
      appliedOn: "2026-07-27",
      status: "rejected",
    },
  ];
}
