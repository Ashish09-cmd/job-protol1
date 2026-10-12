import type { ApplicationStatus } from "@/lib/types/jobseeker-dashboard";

/** Label and colours of each status. The label is always shown, so colour is never the only signal. */
export const STATUS_STYLES: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  applied: { label: "Applied", className: "bg-gray-100 text-gray-700" },
  "under-review": {
    label: "Under Review",
    className: "bg-indigo-50 text-indigo-700",
  },
  interview: { label: "Interview", className: "bg-orange-100 text-orange-700" },
  hired: { label: "Hired", className: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-600" },
  withdrawn: { label: "Withdrawn", className: "bg-gray-100 text-gray-500" },
};

/** Only applications that are still open can be withdrawn. */
export const WITHDRAWABLE_STATUSES: readonly ApplicationStatus[] = [
  "applied",
  "under-review",
  "interview",
];
