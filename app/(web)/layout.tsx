import SiteLayout from "@/components/layout/SiteLayout";
import type { ReactNode } from "react";

export default function WebLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
