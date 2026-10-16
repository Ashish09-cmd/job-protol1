import type {
  JobseekerOverview,
  JobseekerUser,
} from "@/lib/types/jobseeker-dashboard";

/**
 * Temporary static data so the dashboard can be built and tested.
 * Replace the bodies of these functions with your API / database calls:
 * the components only depend on the types in jobseeker-dashboard.ts.
 *
 * Job slugs below exist in the demo data, so the links open the demo job page.
 */

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export async function getCurrentJobseeker(): Promise<JobseekerUser> {
  // TODO: read the logged-in user from your session / auth.
  return { id: "js-1", fullName: "Ashish Chaudhary", firstName: "Ashish" };
}

export async function getJobseekerOverview(): Promise<JobseekerOverview> {
  // TODO: fetch the real overview for the logged-in user.
  return {
    profileCompletion: 72,
    openToWork: { enabled: true, renewsInDays: 7 },
    stats: {
      applicationsSent: 12,
      profileViews: 34,
      savedJobs: 8,
      companiesFollowed: 5,
    },
    applications: [
      {
        id: "app-1",
        jobTitle: "Graphics Designer & Video Editor Lead",
        jobSlug: "helvetas-nepal-2",
        companyName: "Helvetas Nepal",
        companySlug: "helvetas-nepal",
        appliedOn: "2026-09-26",
        status: "under-review",
      },
      {
        id: "app-2",
        jobTitle: "Content Writing Internship",
        jobSlug: "helvetas-nepal-2",
        companyName: "Helvetas Nepal",
        companySlug: "helvetas-nepal",
        appliedOn: "2026-09-16",
        status: "interview",
      },
      {
        id: "app-3",
        jobTitle: "UI/UX Designer",
        jobSlug: "code-himalaya-3",
        companyName: "Helvetas Nepal",
        companySlug: "helvetas-nepal",
        appliedOn: "2026-09-14",
        status: "hired",
      },
      {
        id: "app-4",
        jobTitle: "Computer Assistant Lecturer",
        jobSlug: "helvetas-nepal-2",
        companyName: "Helvetas Nepal",
        companySlug: "helvetas-nepal",
        appliedOn: "2026-09-03",
        status: "rejected",
      },
      {
        id: "app-5",
        jobTitle: "Mid-Level Full stack Developer",
        jobSlug: "peakora-tech-workforce-solutions-4",
        companyName: "Helvetas Nepal",
        companySlug: "helvetas-nepal",
        appliedOn: "2026-09-01",
        status: "applied",
      },
    ],
    viewers: {
      totalThisMonth: 0,
      recent: [
        {
          id: "v-1",
          name: "Ncell Telecommunication Pvt. Ltd",
          slug: "ncell",
          industry: "Telecommunication",
          viewedAt: hoursAgo(2),
        },
        {
          id: "v-2",
          name: "Cod avatar Pvt. Ltd",
          slug: "cod-avatar",
          industry: "IT Company",
          viewedAt: hoursAgo(30),
        },
        {
          id: "v-3",
          name: "NMB Private Limited",
          slug: "nmb",
          industry: "Banking Services",
          viewedAt: hoursAgo(5),
        },
        {
          id: "v-4",
          name: "Tree leaf Technologies",
          slug: "tree-leaf-technologies",
          industry: "IT Company",
          viewedAt: "2026-09-24T09:00:00.000Z",
        },
        {
          id: "v-5",
          name: "World link Communication Pvt. Ltd",
          slug: "worldlink",
          industry: "Telecommunication",
          viewedAt: "2026-07-20T09:00:00.000Z",
        },
      ],
    },
    preferences: {
      locations: ["New York, NY"],
      jobType: "Full-time",
      salaryRange: "20K-50K",
      interests: ["UI/UX", "Product Design", "Graphic Design"],
      experience: "2+ years",
      skills: ["UI/UX", "Product Design", "Design Systems", "Color theory"],
    },
    cvUrl: "/files/cv-demo.pdf",
    savedJobs: [
      {
        id: "s-1",
        title: "Senior Product Designer",
        slug: "broadway-infosys-1",
        companyName: "Broadway Infosys",
      },
      {
        id: "s-2",
        title: "Product Growth & UX Specialist",
        slug: "code-himalaya-3",
        companyName: "Ncell",
      },
      {
        id: "s-3",
        title: "Product & Graphics Designer",
        slug: "broadway-infosys-1",
        companyName: "Broadway Infosys",
      },
    ],
    followedCompanies: [
      {
        id: "c-1",
        name: "Ncell",
        slug: "ncell",
        industry: "Telecommunication",
        openRoles: 4,
      },
      {
        id: "c-2",
        name: "Broadway Infosys",
        slug: "broadway-infosys",
        industry: "IT Company",
        openRoles: 7,
      },
      {
        id: "c-3",
        name: "Helvetas Nepal",
        slug: "helvetas-nepal",
        industry: "Development",
        openRoles: 2,
      },
    ],
  };
}
