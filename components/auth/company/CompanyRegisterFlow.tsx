"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CompanyAccountStep from "./CompanyAccountStep";
import CompanyDetailsStep from "./CompanyDetailsStep";
import OtpVerifyStep from "./OtpVerifyStep";
import { CompanyAccountValues, CompanyDetailsValues, normalizePhone } from "@/lib/validation/employer-auth";
import { registerCompany } from "@/lib/api/employer-auth";
import { EMPLOYER_LOGIN } from "@/lib/constants/auth-routes";

type Step = "account" | "details" | "verify";

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Company registration in three steps on one page:
 * 1. account  2. company details  3. email OTP, then the employer dashboard.
 * The data lives in memory only. A page refresh starts again.
 */
export default function CompanyRegisterFlow() {
  const [step, setStep] = useState<Step>("account");
  const [account, setAccount] = useState<CompanyAccountValues | null>(null);
  const [detailsDraft, setDetailsDraft] = useState<
    Partial<CompanyDetailsValues>
  >({});
  const [emailError, setEmailError] = useState<string | undefined>();

  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Move focus to the heading when the step changes, so keyboard and screen reader users
  // land at the top of the new step. The OTP step focuses its first digit box instead.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (step !== "verify") headingRef.current?.focus();
  }, [step]);

  const handleAccountNext = (values: CompanyAccountValues) => {
    setAccount(values);
    setEmailError(undefined);
    setStep("details");
  };

  const handleDetailsBack = (draft: Partial<CompanyDetailsValues>) => {
    setDetailsDraft(draft);
    setStep("account");
  };

  const handleDetailsSubmit = async (
    details: CompanyDetailsValues,
  ): Promise<string | null> => {
    if (!account) {
      setStep("account");
      return null;
    }
    setDetailsDraft(details);

    try {
      const result = await registerCompany({
        companyName: account.companyName,
        ownerName: account.ownerName,
        email: account.email,
        password: account.password,
        organizationSize: details.organizationSize,
        industry: details.industry,
        contactNo: normalizePhone(details.contactNo),
        location: details.location,
      });

      if (!result.ok) {
        if (result.field === "email") {
          // The email is the problem, so send the user back to where it is.
          setEmailError(result.message);
          setStep("account");
          return null;
        }
        return result.message;
      }

      setStep("verify");
      return null;
    } catch {
      return GENERIC_ERROR;
    }
  };

  const isVerify = step === "verify";

  return (
    <>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-xl font-bold font-manrope line-height-sm text-primary-blue focus:outline-none"
        >
          {isVerify ? "OTP Verification" : "Create your account"}
        </h1>
        <p className="text-xs font-regular line-height-sm text-subtext-gray3">
          {isVerify && account ? (
            <>
              We have sent a code to{" "}
              <strong className="font-semibold break-all text-text-heading">
                {account.email}
              </strong>
              . Check your email inbox and enter the six-digit code.
            </>
          ) : (
            "Create your account to connect with real talents."
          )}
        </p>
      </div>

      {/* Read out by screen readers when the OTP step opens. */}
      <p role="status" className="sr-only">
        {isVerify && account
          ? `Verification step. We sent a six-digit code to ${account.email}.`
          : ""}
      </p>

      {step === "account" && (
        <CompanyAccountStep
          defaultValues={account}
          emailError={emailError}
          onNext={handleAccountNext}
        />
      )}

      {step === "details" && (
        <CompanyDetailsStep
          defaultValues={detailsDraft}
          onBack={handleDetailsBack}
          onSubmit={handleDetailsSubmit}
        />
      )}

      {step === "verify" && account && (
        <OtpVerifyStep
          email={account.email}
          onChangeEmail={() => setStep("account")}
        />
      )}

      {!isVerify && (
        <div className="flex items-center justify-center gap-1">
          <p className="text-xs font-medium font-inter text-subtext-gray1 line-height-sm">
            Already registered in Broadway Jobs?
          </p>
          <Link
            href={EMPLOYER_LOGIN}
            className="underline text-primary-blue text-xs line-height-sm font-manrope"
          >
            Log in
          </Link>
        </div>
      )}
    </>
  );
}
