"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface DashboardShellContextValue {
  /** Opens the sidebar drawer on small screens (used by the hamburger button). */
  openSidebar: () => void;
}

const DashboardShellContext = createContext<DashboardShellContextValue>({
  openSidebar: () => {},
});

export const useDashboardShell = () => useContext(DashboardShellContext);

interface DashboardShellProps {
  /** The sidebar content. Fixed on large screens, a drawer on small ones. */
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}

/**
 * Page frame shared by the Jobseeker, Employer and Admin dashboards:
 * sidebar + top bar + content + footer.
 */
export default function DashboardShell({
  sidebar,
  topbar,
  children,
}: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer after navigating to another page.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  const contextValue = useMemo(
    () => ({ openSidebar: () => setIsSidebarOpen(true) }),
    [],
  );

  return (
    <DashboardShellContext.Provider value={contextValue}>
      <div className="min-h-screen bg-white">
        {/* Dark overlay behind the drawer (small screens only) */}
        <div
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 lg:hidden ${
            isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-subtext-gray2/30 bg-white transition-[transform,visibility] duration-300 motion-reduce:transition-none lg:visible lg:translate-x-0 ${
            isSidebarOpen
              ? "visible translate-x-0"
              : "invisible -translate-x-full"
          }`}
        >
          {sidebar}
        </aside>

        <div className="flex min-h-screen flex-col lg:pl-64 bg-[#F5F7F8]/20">
          {topbar}
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <footer className="border-t border-subtext-gray2/30 py-6 text-center text-sm font-regular font-inter text-text-secondary-color">
            © {new Date().getFullYear()} Broadway Jobs. All rights reserved
          </footer>
        </div>
      </div>
    </DashboardShellContext.Provider>
  );
}
