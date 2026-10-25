import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import LoginForm from "@/components/auth/LoginForm";
import Button from "@/components/ui/button/Button";
import {
  EMPLOYER_FORGOT_PASSWORD,
  EMPLOYER_HOME,
  EMPLOYER_REGISTER,
} from "@/lib/constants/auth-routes";

export const metadata: Metadata = {
  title: "Employer login",
  description:
    "Log in to your Broadway Jobs company account to post jobs and review candidates.",
};

export default function CompanyLogin() {
  return (
    <AuthSplitLayout
      imageSrc="/assets/employerLogin.png"
      heading="Connect With Candidates Who Fit."
      description="Post jobs, review verified candidates, and hire with confidence. All in one platform built to make recruitment simple, transparent, and fast."
    >
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h1 className="text-xl font-bold font-manrope line-height-sm text-primary-blue">
          Welcome Back
        </h1>
        <p className="text-xs font-regular line-height-sm text-subtext-gray3">
          Login with your registered Email &amp; Password.
        </p>
      </div>

      <div className="flex flex-col gap-7">
        {/* After a successful login the user goes to the employer dashboard. */}
        <LoginForm
          redirectTo={EMPLOYER_HOME}
          forgotPasswordHref={EMPLOYER_FORGOT_PASSWORD}
        />

        <div className="flex items-center justify-around gap-2">
          <div className="h-px w-full bg-[#dee2e6]" />
          <p className="text-xs font-medium line-height-sm text-subtext-primary-color">
            OR
          </p>
          <div className="h-px w-full bg-[#dee2e6]" />
        </div>

        <div className="flex flex-col gap-4">
          {/* TODO: connect Google sign-in. */}
          <Button variant="neutral">
            <Icon icon="material-icon-theme:google" aria-hidden="true" />
            Log In with Google
          </Button>
          <div className="flex items-center justify-center gap-1">
            <p className="text-xs font-medium font-inter text-subtext-gray1 line-height-sm">
              Don&apos;t have an account?
            </p>
            <Link
              href={EMPLOYER_REGISTER}
              className="underline text-primary-blue text-xs line-height-sm font-manrope"
            >
              Register Company
            </Link>
          </div>
        </div>
      </div>
    </AuthSplitLayout>
  );
}
