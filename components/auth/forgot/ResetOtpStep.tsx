"use client";
import { FormEvent, useState } from "react";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/button/Button";
import { OTP_LENGTH, OTP_RESEND_SECONDS } from "@/lib/constants/employer";
import { requestPasswordReset, ResetRole, verifyPasswordResetOtp } from "@/lib/api/password-reset";
import { formatTime, useCountdown } from "@/hooks/useCountdown";


interface ResetOtpStepProps {
  role: ResetRole;
  email: string;
  onVerified: (resetToken: string) => void;
  /** Lets the user go back and fix a wrong email address. */
  onChangeEmail: () => void;
}

const GENERIC_ERROR = "Something went wrong. Please try again.";

export default function ResetOtpStep({
  role,
  email,
  onVerified,
  onChangeEmail,
}: ResetOtpStepProps) {
  const { secondsLeft, restart } = useCountdown(OTP_RESEND_SECONDS);
  const [code, setCode] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

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
      const result = await verifyPasswordResetOtp(role, email, code);
      if (!result.ok) {
        setError(result.message);
        clearCode();
        return;
      }
      onVerified(result.resetToken);
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setNotice(null);
    setResending(true);
    try {
      const result = await requestPasswordReset(role, email);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      clearCode();
      restart();
      setNotice("A new code has been sent.");
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <OtpInput
        key={resetKey}
        length={OTP_LENGTH}
        onChange={(value) => {
          setCode(value);
          if (error) setError(null);
        }}
        disabled={verifying}
        hasError={!!error}
        describedBy={error ? "reset-otp-error" : undefined}
      />

      {error && (
        <p
          id="reset-otp-error"
          role="alert"
          className="text-xs text-red-600 font-inter"
        >
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="text-xs text-green-700 font-inter">
          {notice}
        </p>
      )}

      <div className="flex flex-col items-start gap-3">
        <Button
          type="submit"
          loading={verifying}
          disabled={code.length < OTP_LENGTH}
        >
          Verify OTP
        </Button>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-inter text-subtext-gray1">
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

        <button
          type="button"
          onClick={onChangeEmail}
          disabled={verifying}
          className="text-xs font-inter text-primary-blue underline disabled:opacity-50"
        >
          Use a different email
        </button>
      </div>
    </form>
  );
}
