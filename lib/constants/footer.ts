export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: readonly FooterLink[];
}

/** TODO: check every href below against your final route names. */
export const FOOTER_LINK_GROUPS: readonly FooterLinkGroup[] = [
  {
    title: "For Job Seekers",
    links: [
      { label: "Find Jobs", href: "/search" },
      { label: "Create your Profile", href: "/register/job-seeker" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Post a Job", href: "/employer-zone" },
      { label: "Register your company", href: "/register/company" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Help Center", href: "/help-center" },
      { label: "FAQs", href: "/faq" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
];

export const FOOTER_ABOUT =
  "Connecting skilled people with companies worth joining. Verified employers, and a straightforward job search experience.";

export const FOOTER_CONTACT = {
  address: "Shree Ganesh Marg, Subidhanagar, Tinkune, Kathmandu 44600, Nepal",
  /** Shown as "+977-1-4111849 / 4117578 / ...". Only the first number shows the prefix. */
  phonePrefix: "+977-1-",
  phones: ["4111849", "4117578", "4111583", "5912405"],
  email: "info@broadwayjobs.com",
} as const;
