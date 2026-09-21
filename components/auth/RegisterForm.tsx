"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, type RegisterValues } from "@/lib/validation/auth";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/button/Button";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: RegisterValues) => {
    try {
      // TODO: replace with your real register request.
      // Send only what your API needs (usually not confirmPassword or terms).
      // If the API says the email is taken:
      //   setError("email", { message: "This email is already registered." });
      console.log(values);
    } catch {
      setError("root", { message: "Something went wrong. Please try again." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your Email Address"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="tel"
          placeholder="Enter your mobile number"
          autoComplete="tel"
          error={errors.mobile?.message}
          {...register("mobile")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your Password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your Password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Checkbox
          error={errors.terms?.message}
          label={
            <>
              I agree to the{" "}
              <Link href="/terms-conditions" className=" text-primary-blue">
                terms and conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className=" text-primary-blue">
                privacy policy
              </Link>{" "}
              of Broadway Jobs.
            </>
          }
          {...register("terms")}
        />
      </div>

      <div className="flex flex-col gap-3">
        {errors.root?.message && (
          <p role="alert" className="text-sm text-red-600 text-center">
            {errors.root.message}
          </p>
        )}
        <Button type="submit" fullWidth loading={isSubmitting}>
          Register
        </Button>
      </div>
    </form>
  );
}
