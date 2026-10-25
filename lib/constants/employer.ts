// TODO: confirm these option lists with the product team, or load them from your API.
export const ORGANIZATION_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
] as const;

export const INDUSTRY_TYPES = [
  "Information Technology",
  "Banking & Finance",
  "Education & Training",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Hospitality & Tourism",
  "Construction & Real Estate",
  "Media & Advertising",
  "Telecommunications",
  "Logistics & Transport",
  "NGO / INGO",
  "Other",
] as const;

export const OTP_LENGTH = 6;

/** Seconds before the user can ask for a new code. */
export const OTP_RESEND_SECONDS = 60;

/**
 * Support address shown on the OTP step. Set your real address here.
 * While it is null, the "Having trouble?" line is not shown.
 */
export const SUPPORT_EMAIL: string | null = null;
