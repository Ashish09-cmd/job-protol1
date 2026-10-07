import type { JobType } from "@/lib/types/job";

export type JobTab = "all" | JobType;

const TABS: { id: JobTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "job", label: "Jobs" },
  { id: "internship", label: "Internships" },
];

interface JobTabsProps {
  activeTab: JobTab;
  onChange: (tab: JobTab) => void;
}

export default function JobTabs({ activeTab, onChange }: JobTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter vacancies"
      className="flex items-center gap-4"
    >
      {TABS.map(({ id, label }) => {
        const isActive = id === activeTab;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`py-2 px-5 rounded-[60px] border cursor-pointer text-vxs font-semibold font-inter line-height-sm transition-colors duration-200 ${
              isActive
                ? "bg-primary-blue border-primary-blue text-white"
                : "bg-blue-50 border-[#E2E8EA] text-subtext-light hover:border-primary-blue/40"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
