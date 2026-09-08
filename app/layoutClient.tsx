"use client"
import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
     const pathname = usePathname();
     const isAuthPage = pathname === "/signup" || pathname === "/login";
  return (
    <>
      {!isAuthPage && <Header />}
      <main>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}