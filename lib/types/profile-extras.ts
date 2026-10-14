import type { MasterProfile } from "@/lib/types/jobseeker-profile";

/** What the "Profile visibility" card on My Profile shows. */
export interface ProfileVisibilityStatus {
  openForWork: boolean;
  /** ISO date (YYYY-MM-DD) the "open for work" status expires. */
  openUntil?: string;
}

/** What the "Employer interest" card shows. */
export interface EmployerInterestStats {
  viewsThisMonth: number;
  viewsLastMonth: number;
}

/** Which edit modal is open on My Profile. `id: null` means "create". */
export type ProfileEditTarget =
  | { kind: "intro" }
  | { kind: "summary" }
  | { kind: "experience" }
  | { kind: "education" }
  | { kind: "skills" }
  | { kind: "certifications" }
  | { kind: "contact" }
  | { kind: "jobProfile"; id: string | null };

/** Saves part of the master profile. Throw to show the error in the modal. */
export type ProfilePatchHandler = (
  patch: Partial<MasterProfile>,
) => Promise<void>;
