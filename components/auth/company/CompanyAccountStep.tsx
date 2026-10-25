"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/button/Button";
import { companyAccountSchema, CompanyAccountValues } from "@/lib/validation/employer-auth";

interface CompanyAccountStepProps {
  /** Values to show again when the user comes back from step 2. */
  defaultValues?: CompanyAccountValues | null;
  /** An error for the email field that came from the server (for example "already registered"). */
  emailError?: string;
  onNext: (values: CompanyAccountValues) => void;
}

export default function CompanyAccountStep({
  defaultValues,
  emailError,
  onNext,
}: CompanyAccountStepProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CompanyAccountValues>({
    resolver: zodResolver(companyAccountSchema),
    defaultValues: {
      companyName: defaultValues?.companyName ?? "",
      ownerName: defaultValues?.ownerName ?? "",
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
      agree: defaultValues?.agree ?? false,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (emailError) {
      setError("email", { message: emailError }, { shouldFocus: true });
    }
  }, [emailError, setError]);

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      noValidate
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Company Name*"
          placeholder="Enter your Company Name"
          autoComplete="organization"
          error={errors.companyName?.message}
          {...register("companyName")}
        />
        <Input
          label="Company Owner*"
          placeholder="Enter Company Owner Name"
          autoComplete="name"
          error={errors.ownerName?.message}
          {...register("ownerName")}
        />
        <Input
          label="Email Address*"
          type="email"
          placeholder="Enter your Email Address"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password*"
          type="password"
          placeholder="Enter your Password"
          autoComplete="new-password"
          hint="At least 8 characters, with a letter and a number."
          error={errors.password?.message}
          {...register("password")}
        />
        <Checkbox
          error={errors.agree?.message}
          label="By clicking 'Continue,' you will begin creating your Company profile to connect with top talent on Broadway Jobs."
          {...register("agree")}
        />
      </div>

      <Button type="submit" fullWidth loading={isSubmitting}>
        Continue
        <Icon icon="mdi:arrow-right" aria-hidden="true" />
      </Button>
    </form>
  );
}
