import { z } from "zod";

/** Letters (any language), spaces, dots, apostrophes and hyphens. No digits or symbols. */
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;

export const newsletterSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .min(2, "Your name must be at least 2 characters.")
    .max(80, "Your name must be 80 characters or fewer.")
    .regex(
      NAME_PATTERN,
      "Your name can only contain letters, spaces, . ' and -.",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "This email address is too long.")
    .email("Please enter a valid email address.")
    .toLowerCase(),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
