import type { Metadata } from "next";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import ForgotPasswordFlow from "@/components/auth/forgot/ForgotPasswordFlow";

export const metadata: Metadata = {
  title: "Forgot password",
  description:
    "Reset your Broadway Jobs password with a code sent to your email.",
};

export default function JobSeekerForgotPassword() {
  return (
    <AuthSplitLayout
      icon="mdi:shield-lock-outline"
      heading="Secure Your Account"
      description={
        <>
          <p>
            An email containing an OTP will be sent to your email address so you
            can reset your password.
          </p>
          <p>If you don&apos;t receive the email, check your spam folder.</p>
          <p>Never share your login details with anyone.</p>
        </>
      }
    >
      <ForgotPasswordFlow role="jobseeker" />
    </AuthSplitLayout>
  );
}
