"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/button/Button";
import { companyDetailsSchema, CompanyDetailsValues } from "@/lib/validation/employer-auth";
import Select from "@/components/ui/Select";
import { INDUSTRY_TYPES, ORGANIZATION_SIZES } from "@/lib/constants/employer";

interface CompanyDetailsStepProps {
  defaultValues?: Partial<CompanyDetailsValues>;
  /** Go back to step 1. Receives what is typed so far so nothing is lost. */
  onBack: (draft: Partial<CompanyDetailsValues>) => void;
  /** Resolves to an error message to show, or null when it worked. */
  onSubmit: (values: CompanyDetailsValues) => Promise<string | null>;
}

export default function CompanyDetailsStep({
  defaultValues,
  onBack,
  onSubmit,
}: CompanyDetailsStepProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CompanyDetailsValues>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      organizationSize: defaultValues?.organizationSize ?? "",
      industry: defaultValues?.industry ?? "",
      contactNo: defaultValues?.contactNo ?? "",
      location: defaultValues?.location ?? "",
      agree: defaultValues?.agree ?? false,
    },
    mode: "onTouched",
  });

  const submit = async (values: CompanyDetailsValues) => {
    setServerError(null);
    const message = await onSubmit(values);
    if (message) setServerError(message);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col gap-4">
        <Select
          label="Organization Size*"
          emptyLabel="Select organization size"
          options={ORGANIZATION_SIZES}
          error={errors.organizationSize?.message}
          {...register("organizationSize")}
        />
        <Select
          label="Industry Type*"
          emptyLabel="Select industry type"
          options={INDUSTRY_TYPES}
          error={errors.industry?.message}
          {...register("industry")}
        />
        <Input
          label="Contact No*"
          type="tel"
          inputMode="tel"
          placeholder="Enter your contact no"
          autoComplete="tel"
          error={errors.contactNo?.message}
          {...register("contactNo")}
        />
        <Input
          label="Location*"
          placeholder="Enter your location"
          autoComplete="address-level2"
          error={errors.location?.message}
          {...register("location")}
        />
        <Checkbox
          error={errors.agree?.message}
          label="By clicking 'Create Company Profile,' you will begin creating your Company profile to connect with top talent on Broadway Jobs."
          {...register("agree")}
        />
      </div>

      <div className="flex flex-col gap-3">
        {serverError && (
          <p role="alert" className="text-sm text-red-600 text-center">
            {serverError}
          </p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="neutral"
            disabled={isSubmitting}
            onClick={() => onBack(getValues())}
          >
            Back
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Create Company Profile
          </Button>
        </div>
      </div>
    </form>
  );
}
