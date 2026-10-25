"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { EMPLOYER_LOGIN, JOBSEEKER_LOGIN } from "@/lib/constants/auth-routes";
import ForgotEmailStep from "./ForgotEmailStep";
import ResetOtpStep from "./ResetOtpStep";
import NewPasswordStep from "./NewPasswordStep";
import { requestPasswordReset, resetPassword, ResetRole } from "@/lib/api/password-reset";

type Step = "email" | "verify" | "reset" | "done";

const GENERIC_ERROR = "Something went wrong. Please try again.";

interface ForgotPasswordFlowProps {
  role: ResetRole;
}

/**
 * Forgot password in four steps on one page:
 * 1. email  2. code from the email  3. new password  4. done, go to login.
 * The same flow serves jobseekers and companies; `role` picks the login page to return to.
 */
export default function ForgotPasswordFlow({ role }: ForgotPasswordFlowProps) {
  const loginHref = role === "employer" ? EMPLOYER_LOGIN : JOBSEEKER_LOGIN;

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Move focus to the heading when the step changes. The code step focuses its first box instead.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (step !== "verify") headingRef.current?.focus();
  }, [step]);

  const handleEmail = async (value: string): Promise<string | null> => {
    try {
      const result = await requestPasswordReset(role, value);
      if (!result.ok) return result.message;
      setEmail(value);
      setStep("verify");
      return null;
    } catch {
      return GENERIC_ERROR;
    }
  };

  const handleNewPassword = async (
    password: string,
  ): Promise<string | null> => {
    if (!resetToken) {
      setStep("email");
      return null;
    }
    try {
      const result = await resetPassword(role, resetToken, password);
      if (!result.ok) return result.message;
      setResetToken(null);
      setStep("done");
      return null;
    } catch {
      return GENERIC_ERROR;
    }
  };

  const content: Record<Step, { title: string; text: ReactNode }> = {
    email: {
      title: "Forgot Password?",
      text: "Enter your email address below, and we'll send you an OTP in the email.",
    },
    verify: {
      title: "Check your email",
      text: (
        <>
          If an account exists for{" "}
          <strong className="font-semibold break-all text-text-heading">
            {email}
          </strong>
          , we have sent a six-digit code to it. Check your spam folder too.
        </>
      ),
    },
    reset: {
      title: "Set a new password",
      text: "Create a new password for your account.",
    },
    done: {
      title: "Password updated",
      text: "Your password has been changed. You can now log in with it.",
    },
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 py-4 lg:py-10">
      <div className="flex flex-col items-start gap-4">
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-separator3/45 text-xl text-subtext-light"
        >
          <Icon icon={step === "done" ? "mdi:check" : "mdi:lock-outline"} />
        </span>
        <div className="flex flex-col gap-1.5">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-lg-sm font-bold font-manrope line-height-sm text-text-heading focus:outline-none"
          >
            {content[step].title}
          </h1>
          <p className="text-xs font-regular font-inter line-height-sm text-subtext-gray3">
            {content[step].text}
          </p>
        </div>
      </div>

      {/* Read out by screen readers when the code step opens. */}
      <p role="status" className="sr-only">
        {step === "verify"
          ? `Verification step. A code was sent to ${email} if an account exists.`
          : ""}
      </p>

      {step === "email" && (
        <ForgotEmailStep
          defaultEmail={email}
          loginHref={loginHref}
          onSubmit={handleEmail}
        />
      )}

      {step === "verify" && (
        <ResetOtpStep
          role={role}
          email={email}
          onVerified={(token) => {
            setResetToken(token);
            setStep("reset");
          }}
          onChangeEmail={() => setStep("email")}
        />
      )}

      {step === "reset" && <NewPasswordStep onSubmit={handleNewPassword} />}

      {step === "done" && (
        <Link
          href={loginHref}
          className="inline-flex w-fit items-center justify-center rounded-lg bg-primary-blue px-6 py-2.5 text-sm font-medium font-manrope text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          Log in
        </Link>
      )}
    </div>
  );
}
