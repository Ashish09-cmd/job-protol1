import type {
  EmployerInterestStats,
  ProfileVisibilityStatus,
} from "@/lib/types/profile-extras";
import { getPrivacySettings } from "@/lib/data/jobseeker-settings";

// TODO: replace both functions with real API calls. Keep the return types.

export async function getProfileVisibility(): Promise<ProfileVisibilityStatus> {
  const privacy = await getPrivacySettings();
  return {
    openForWork: privacy.openForWork,
    openUntil: privacy.openForWork ? "2026-10-31" : undefined,
  };
}

export async function getEmployerInterest(): Promise<EmployerInterestStats> {
  return { viewsThisMonth: 208, viewsLastMonth: 192 };
}
