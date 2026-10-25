import { z } from "zod";

export const forgotEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email address is required")
    .max(254, "That email address is too long")
    .email("Enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password can be at most 128 characters")
      .regex(/[A-Za-z]/, "Password must contain a letter")
      .regex(/\d/, "Password must contain a number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotEmailValues = z.infer<typeof forgotEmailSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
