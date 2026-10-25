"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { OTP_LENGTH, OTP_RESEND_SECONDS, SUPPORT_EMAIL } from "@/lib/constants/employer";
import { resendCompanyOtp, verifyCompanyOtp } from "@/lib/api/employer-auth";
import { EMPLOYER_HOME } from "@/lib/constants/auth-routes";
import OtpInput from "@/components/ui/OtpInput";

interface OtpVerifyStepProps {
  email: string;
  /** Lets the user go back and fix a wrong email address. */
  onChangeEmail: () => void;
}

const GENERIC_ERROR = "Something went wrong. Please try again.";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function OtpVerifyStep({
  email,
  onChangeEmail,
}: OtpVerifyStepProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const clearCode = () => {
    setCode("");
    setResetKey((value) => value + 1); // remounts OtpInput, which empties it
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.length < OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code.`);
      return;
    }

    setError(null);
    setNotice(null);
    setVerifying(true);
    try {
      const result = await verifyCompanyOtp(email, code);
      if (!result.ok) {
        setError(result.message);
        clearCode();
        setVerifying(false);
        return;
      }
      // Stay in the "verifying" state until the page changes, so it cannot be sent twice.
      router.replace(EMPLOYER_HOME);
    } catch {
      setError(GENERIC_ERROR);
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setNotice(null);
    setResending(true);
    try {
      const result = await resendCompanyOtp(email);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      clearCode();
      setSecondsLeft(OTP_RESEND_SECONDS);
      setNotice("A new code has been sent to your email.");
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setResending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col items-center gap-6"
    >
      <OtpInput
        key={resetKey}
        length={OTP_LENGTH}
        onChange={(value) => {
          setCode(value);
          if (error) setError(null);
        }}
        disabled={verifying}
        hasError={!!error}
        describedBy={error ? "otp-error" : undefined}
      />

      {error && (
        <p
          id="otp-error"
          role="alert"
          className="text-center text-xs text-red-600 font-inter"
        >
          {error}
        </p>
      )}
      {notice && (
        <p
          role="status"
          className="text-center text-xs text-green-700 font-inter"
        >
          {notice}
        </p>
      )}

      <Button
        type="submit"
        loading={verifying}
        disabled={code.length < OTP_LENGTH}
      >
        Verify OTP
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-inter text-subtext-gray1">
        <p role="timer" aria-live="off">
          {secondsLeft > 0
            ? `Remaining time: ${formatTime(secondsLeft)}`
            : "The code may have expired."}
        </p>
        <p>
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0 || resending || verifying}
            className="font-medium text-primary-blue underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Click to resend"}
          </button>
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 text-xs font-inter text-subtext-gray1">
        <button
          type="button"
          onClick={onChangeEmail}
          disabled={verifying}
          className="text-primary-blue underline disabled:opacity-50"
        >
          Wrong email? Go back
        </button>
        {SUPPORT_EMAIL && (
          <p>
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
