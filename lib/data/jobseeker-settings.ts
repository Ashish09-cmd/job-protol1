
import { getMasterProfile } from "@/lib/data/jobseeker-profile";
import { AccountData, NotificationSettings, PrivacySettings, ProfileSettingsData } from "../types/Jobseeker settings";

// TODO: replace every function below with a real API call. Keep the return types.

export async function getAccountData(): Promise<AccountData> {
  const profile = await getMasterProfile();

  return {
    account: {
      fullName: profile.fullName,
      accountLabel: "Job seeker Account",
      email: profile.contact.email,
      location: profile.location,
      headline: profile.headline,
      phone: profile.contact.phones.join(" / "),
    },
    profileCompletion: 92,
    cvUrl: "/files/cv-demo.pdf",
  };
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  return {
    applicationUpdates: true,
    newJobAlerts: true,
    companyFollows: true,
    profileViews: false,
    weeklyDigest: false,
  };
}

export async function getPrivacySettings(): Promise<PrivacySettings> {
  return {
    openForWork: true,
    publicProfile: true,
    showEmployerInterest: true,
    shareContactDetails: false,
  };
}

const plural = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`;

export async function getProfileSettings(): Promise<ProfileSettingsData> {
  const profile = await getMasterProfile();

  return {
    sections: [
      {
        id: "personal",
        title: "Personal Details",
        summary: `${profile.fullName}, ${profile.location}`,
      },
      {
        id: "experience",
        title: "Work experience",
        summary: plural(profile.experience.length, "entry", "entries"),
      },
      {
        id: "education",
        title: "Education",
        summary: plural(profile.education.length, "entry", "entries"),
      },
      {
        id: "skills",
        title: "Skills",
        summary: plural(profile.skills.length, "skill", "skills"),
      },
      {
        id: "certifications",
        title: "Certifications",
        summary: plural(
          profile.certifications.length,
          "certification",
          "certifications",
        ),
      },
      {
        // TODO: build from the real job preferences.
        id: "preferences",
        title: "Preferences",
        summary: "1 location, Full time",
      },
    ],
    tags: ["Jira", "SDLC", "Manual QA", "Automation QA"],
    tagLimit: 5,
  };
}
