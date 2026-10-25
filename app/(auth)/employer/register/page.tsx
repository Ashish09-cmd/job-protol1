import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import CompanyRegisterFlow from "@/components/auth/company/CompanyRegisterFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register your company",
  description:
    "Create a Broadway Jobs company account to post jobs and hire verified candidates.",
};

export default function CompanyRegister() {
  return (
    <AuthSplitLayout
      imageSrc="/assets/employerLogin.png"
      heading="Connect With Candidates Who Fit."
      description="Post jobs, review verified candidates, and hire with confidence. All in one platform built to make recruitment simple, transparent, and fast."
    >
      <CompanyRegisterFlow />
    </AuthSplitLayout>
  );
}