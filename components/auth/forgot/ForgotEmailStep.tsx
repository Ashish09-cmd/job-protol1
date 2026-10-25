"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SUPPORT_EMAIL } from "@/lib/constants/employer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/button/Button";
import { forgotEmailSchema, ForgotEmailValues } from "@/lib/validation/password-reset";

interface ForgotEmailStepProps {
  defaultEmail?: string;
  loginHref: string;
  /** Resolves to an error message to show, or null when the code was sent. */
  onSubmit: (email: string) => Promise<string | null>;
}

export default function ForgotEmailStep({
  defaultEmail = "",
  loginHref,
  onSubmit,
}: ForgotEmailStepProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotEmailValues>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: { email: defaultEmail },
    mode: "onTouched",
  });

  const submit = async (values: ForgotEmailValues) => {
    const message = await onSubmit(values.email);
    if (message) setError("root", { message });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="flex flex-col gap-6"
    >
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your Email Address"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Link
        href={loginHref}
        className="w-fit text-xs font-medium font-manrope text-primary-blue underline"
      >
        Wait, I remember my password
      </Link>

      <div className="flex flex-col items-start gap-3">
        {errors.root?.message && (
          <p role="alert" className="text-sm text-red-600">
            {errors.root.message}
          </p>
        )}
        <Button type="submit" loading={isSubmitting}>
          Send OTP
        </Button>
        {SUPPORT_EMAIL && (
          <p className="text-xs font-inter text-subtext-gray1">
            Having trouble? Contact{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-primary-blue underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            for support.
          </p>
        )}
      </div>
    </form>
  );
}
