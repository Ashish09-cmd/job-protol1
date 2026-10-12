"use client"
import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
     const pathname = usePathname();
     const isDashboard = pathname === "/jobseeker";
  return (
    <>
      {!isDashboard && <Header />}
      <main>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}