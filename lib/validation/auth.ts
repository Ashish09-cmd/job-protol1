import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email address is required")
      .email("Enter a valid email address"),
    // Generic international format. Tighten it for one country if you like,
    // e.g. Nepal: /^(\+977)?9[78]\d{8}$/
    mobile: z
      .string()
      .trim()
      .min(1, "Mobile number is required")
      .regex(/^\+?\d{7,15}$/, "Enter a valid mobile number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Password must contain a letter")
      .regex(/\d/, "Password must contain a number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z
      .boolean()
      .refine(
        (v) => v === true,
        "You must accept the terms and privacy policy",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;