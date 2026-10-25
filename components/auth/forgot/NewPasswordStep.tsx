"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/button/Button";
import { resetPasswordSchema, ResetPasswordValues } from "@/lib/validation/password-reset";

interface NewPasswordStepProps {
  /** Resolves to an error message to show, or null when the password was changed. */
  onSubmit: (password: string) => Promise<string | null>;
}

export default function NewPasswordStep({ onSubmit }: NewPasswordStepProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  const submit = async (values: ResetPasswordValues) => {
    const message = await onSubmit(values.password);
    if (message) setError("root", { message });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <Input
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          hint="At least 8 characters, with a letter and a number."
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your new password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        {errors.root?.message && (
          <p role="alert" className="text-sm text-red-600">
            {errors.root.message}
          </p>
        )}
        <Button type="submit" loading={isSubmitting}>
          Reset Password
        </Button>
      </div>
    </form>
  );
}
