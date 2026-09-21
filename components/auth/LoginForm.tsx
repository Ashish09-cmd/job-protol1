"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, LoginValues } from "@/lib/validation/auth";
import Input from "../ui/Input";
import Button from "../ui/button/Button";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginValues) => {
    try {
    
      console.log(values);
    } catch {
      setError("root", { message: "Invalid email or password." });
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
          label="Password"
          type="password"
          placeholder="Enter your Password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div>
          <Link
            href="/forgot-password"
            className="text-xs font-regular underline line-height-2xl text-primary-danger font-manrope"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {errors.root?.message && (
          <p role="alert" className="text-sm text-red-600 text-center">
            {errors.root.message}
          </p>
        )}
        <Button type="submit" fullWidth loading={isSubmitting}>
          Log in
        </Button>
      </div>
    </form>
  );
}
