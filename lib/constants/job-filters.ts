/* ---------- Filters ---------- */

export type FilterKey = "level" | "employmentType" | "education" | "industry";

/** Selected option ids for every filter group. */
export type SelectedFilters = Record<FilterKey, string[]>;

export const EMPTY_FILTERS: SelectedFilters = {
  level: [],
  employmentType: [],
  education: [],
  industry: [],
};

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterGroupConfig {
  key: FilterKey;
  title: string;
  options: readonly FilterOption[];
  /** Number of checkbox columns inside the group. */
  columns: 1 | 2;
  /** Show only this many options until "show more" is clicked. */
  initialVisible?: number;
}

/** The groups appear in the sidebar in this order. */
export const FILTER_GROUPS: readonly FilterGroupConfig[] = [
  {
    key: "level",
    title: "Job Level",
    columns: 2,
    options: [
      { id: "internship", label: "Internships" },
      { id: "entry-level", label: "Entry-level" },
      { id: "mid-level", label: "Mid-Level" },
      { id: "senior-level", label: "Senior-level" },
      { id: "lead-level", label: "Lead-Level" },
      { id: "executive", label: "Executive" },
    ],
  },
  {
    key: "employmentType",
    title: "Employment Type",
    columns: 2,
    options: [
      { id: "full-time", label: "Full-time" },
      { id: "part-time", label: "Part Time" },
      { id: "contract", label: "Contract" },
      { id: "traineeship", label: "Traineeship" },
    ],
  },
  {
    key: "education",
    title: "Education",
    columns: 1,
    options: [
      { id: "undergraduate-freshers", label: "Undergraduate/Freshers" },
      { id: "bachelors-graduate", label: "Bachelor’s Graduate" },
      { id: "diploma-certificate", label: "Diploma Certificate" },
      { id: "masters-phd", label: "Master’s/P.H.D" },
    ],
  },
  {
    key: "industry",
    title: "Job Industries",
    columns: 1,
    initialVisible: 12,
    options: [
      { id: "accounting-finance", label: "Accounting/Finance" },
      { id: "administration-development", label: "Administration/Development" },
      { id: "banking-insurance", label: "Banking/Insurance" },
      { id: "commercial-calculus", label: "Commercial/Calculus" },
      {
        id: "creative-designing-graphics",
        label: "Creative/Designing/Graphics",
      },
      { id: "counselor-advisor", label: "Counselor/Advisor" },
      { id: "fashion-designing", label: "Fashion Designing" },
      { id: "healthcare-medical-pharma", label: "Health Care/Medical/Pharma" },
      { id: "hospitality-management", label: "Hospitality Management" },
      {
        id: "human-resource-organization",
        label: "Human Resource/Organization",
      },
      { id: "it-telecom-services", label: "IT & Telecom Services" },
      { id: "marketing-customer-service", label: "Marketing/Customer Service" },
      // Shown after "show more"
      { id: "education-teaching", label: "Education/Teaching" },
      { id: "engineering-construction", label: "Engineering/Construction" },
      { id: "legal-compliance", label: "Legal/Compliance" },
      { id: "media-journalism", label: "Media/Journalism" },
      { id: "sales-business-development", label: "Sales/Business Development" },
      { id: "transportation-logistics", label: "Transportation/Logistics" },
    ],
  },
];

/* ---------- Sorting ---------- */

export type SortOptionId = "latest" | "closing-soon" | "title-asc";

export const DEFAULT_SORT: SortOptionId = "latest";

export const SORT_OPTIONS: readonly { id: SortOptionId; label: string }[] = [
  { id: "latest", label: "Latest" },
  { id: "closing-soon", label: "Closing soon" },
  { id: "title-asc", label: "Title (A–Z)" },
];
