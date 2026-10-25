import { z } from "zod";
import { INDUSTRY_TYPES, ORGANIZATION_SIZES } from "@/lib/constants/employer";

const PERSON_NAME = /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u;

/** Removes spaces, dashes, dots and brackets so "+977 98-1234-5678" becomes "+9779812345678". */
export function normalizePhone(value: string): string {
  return value.replace(/[\s\-().]/g, "");
}

const mustBeTicked = (message: string) =>
  z.boolean().refine((value) => value === true, message);

/** Step 1 of company registration. */
export const companyAccountSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name can be at most 100 characters")
    .refine(
      (value) => /[\p{L}\p{N}]/u.test(value),
      "Enter a valid company name",
    ),
  ownerName: z
    .string()
    .trim()
    .min(1, "Company owner name is required")
    .min(2, "Owner name must be at least 2 letters")
    .max(80, "Owner name can be at most 80 characters")
    .regex(
      PERSON_NAME,
      "Use letters only. Numbers and symbols are not allowed",
    ),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email address is required")
    .max(254, "That email address is too long")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password can be at most 128 characters")
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/\d/, "Password must contain a number"),
  agree: mustBeTicked("Please tick this box to continue"),
});

/** Step 2 of company registration. */
export const companyDetailsSchema = z.object({
  organizationSize: z
    .string()
    .min(1, "Select your organization size")
    .refine(
      (value) => (ORGANIZATION_SIZES as readonly string[]).includes(value),
      "Select your organization size",
    ),
  industry: z
    .string()
    .min(1, "Select your industry type")
    .refine(
      (value) => (INDUSTRY_TYPES as readonly string[]).includes(value),
      "Select your industry type",
    ),
  contactNo: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .refine(
      // Generic international format. Tighten it for one country if you like,
      // e.g. Nepal mobile: /^(\+977)?9[78]\d{8}$/
      (value) => /^\+?\d{7,15}$/.test(normalizePhone(value)),
      "Enter a valid contact number",
    ),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters")
    .max(120, "Location can be at most 120 characters"),
  agree: mustBeTicked("Please tick this box to create your company profile"),
});

export type CompanyAccountValues = z.infer<typeof companyAccountSchema>;
export type CompanyDetailsValues = z.infer<typeof companyDetailsSchema>;

/** What the API receives. The tick boxes are not sent. */
export type CompanyRegistration = Omit<CompanyAccountValues, "agree"> &
  Omit<CompanyDetailsValues, "agree">;
