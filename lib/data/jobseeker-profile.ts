import type {
  FollowedCompany,
  MasterProfile,
  SavedJob,
} from "@/lib/types/jobseeker-profile";
// TODO: replace every function below with a real API call. Keep the return types.

export async function getSavedJobs(): Promise<SavedJob[]> {
  return [
    {
      id: "sj-1",
      slug: "broadway-infosys-1",
      title: "UI/UX Designer",
      companyName: "Broadway Infosys",
      companySlug: "broadway-infosys",
      employmentType: "Full time",
      daysLeft: 2,
    },
    {
      id: "sj-2",
      slug: "lead-lighting-designer",
      title: "Lead Lighting Designer",
      companyName: "Studio Nepal",
      companySlug: "studio-nepal",
      employmentType: "Full time",
      daysLeft: 9,
    },
    {
      id: "sj-3",
      slug: "frontend-developer-intern",
      title: "Frontend Developer Intern",
      companyName: "Cloud Factory",
      companySlug: "cloud-factory",
      employmentType: "Internship",
      daysLeft: 14,
    },
  ];
}

export async function getFollowedCompanies(): Promise<FollowedCompany[]> {
  return [
    {
      id: "fc-1",
      slug: "broadway-infosys",
      name: "Broadway Infosys",
      newOpenings: 4,
    },
    { id: "fc-2", slug: "studio-nepal", name: "Studio Nepal", newOpenings: 1 },
    {
      id: "fc-3",
      slug: "cloud-factory",
      name: "Cloud Factory",
      newOpenings: 0,
    },
  ];
}

export async function getMasterProfile(): Promise<MasterProfile> {
  return {
    fullName: "Ashish Chaudhary",
    headline: "Web Developer",
    location: "Kathmandu, Nepal",
    summary:
      "Designer with a focus on clean, accessible interfaces for web products. Comfortable moving from research to high-fidelity prototypes and working closely with developers.",
    experience: [
      {
        id: "ex-1",
        role: "Web Developer",
        company: "Broadway Infosys",
        period: "2023 – Present",
        location: "Kathmandu",
        description: "Design systems, product design and usability testing.",
      },
      {
        id: "ex-2",
        role: "Graphic Designer",
        company: "Studio Nepal",
        period: "2021 – 2023",
        location: "Lalitpur",
      },
      {
        id: "ex-3",
        role: "Laravel Developer",
        company: "Leapfrog",
        period: "2021 – 2023",
        location: "Kathmandu",
      },
    ],
    education: [
      {
        id: "ed-1",
        degree: "Bachelor in Information Technology",
        institution: "Herald College",
        period: "2017 – 2021",
      },
    ],
    skills: [
      "Figma",
      "Prototyping",
      "Design Systems",
      "User Research",
      "Wireframing",
      "HTML",
      "CSS",
      "Accessibility",
      "Usability Testing",
      "Typography",
    ],
    skillLimit: 10,
    certifications: [],
    contact: {
      email: "prajana@example.com",
      phones: ["+977 98XXXXXXXX"],
      address: "Kathmandu, Nepal",
    },
    jobProfiles: [
      {
        id: "jp-1",
        title: "UI/UX Designer",
        isPrimary: true,
        summary: "Product and interface design for web and mobile.",
        skills: ["Figma", "Prototyping", "Design Systems"],
      },
      {
        id: "jp-2",
        title: "Graphic Designer",
        isPrimary: false,
        summary: "Brand, print and social media design.",
        skills: ["Typography", "Layout", "Branding"],
      },
      {
        id: "jp-3",
        title: "Frontend Developer",
        isPrimary: false,
        summary: "Accessible front-end builds from design files.",
        skills: ["HTML", "CSS", "Accessibility"],
      },
      {
        id: "jp-4",
        title: "Full-stack Developer",
        isPrimary: false,
        summary: "Accessible front-end builds from design files.",
        skills: ["HTML", "CSS", "Accessibility"],
      },
    ],
  };
}
