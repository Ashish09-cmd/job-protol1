export interface AccountSettings {
  fullName: string;
  accountLabel: string;
  email: string;
  location: string;
  headline: string;
  phone: string;
}

export interface AccountData {
  account: AccountSettings;
  /** 0 to 100. */
  profileCompletion: number;
  /** File the "Download CV" button points to. */
  cvUrl: string;
}

export interface NotificationSettings {
  applicationUpdates: boolean;
  newJobAlerts: boolean;
  companyFollows: boolean;
  profileViews: boolean;
  weeklyDigest: boolean;
}

export interface PrivacySettings {
  openForWork: boolean;
  publicProfile: boolean;
  showEmployerInterest: boolean;
  shareContactDetails: boolean;
}

export type ProfileSectionId =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "certifications"
  | "preferences";

export interface ProfileSectionSummary {
  id: ProfileSectionId;
  title: string;
  /** Short line under the title, e.g. "2 entries". */
  summary: string;
}

export interface ProfileSettingsData {
  sections: ProfileSectionSummary[];
  tags: string[];
  tagLimit: number;
}
