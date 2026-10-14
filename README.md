# 💼 Broadway Jobs (BI-Jobs)
---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Public & Job Seeker Experience](#1-public--job-seeker-experience)
  - [Job Seeker Workspace & Dashboard](#2-job-seeker-workspace--dashboard)
  - [Authentication & Access Portals](#3-authentication--access-portals)
  - [SEO & Structured Data](#4-seo--structured-data)
- [Technology Stack](#-technology-stack)
- [Project Architecture & Folder Structure](#-project-architecture--folder-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Environment Variables](#-environment-variables)
- [NPM Scripts Reference](#-npm-scripts-reference)
- [Design System & UI Components](#-design-system--ui-components)
- [Roadmap & Future Enhancements](#-roadmap--future-enhancements)
- [Author & Credits](#-author--credits)

---

## 🌟 Overview

Broadway Jobs provides an intuitive platform where:
- **Job Seekers** can search, filter, and apply for verified tech and non-tech opportunities, manage their multi-faceted professional profiles, track application statuses in real-time, bookmark roles, and configure career settings.
- **Employers & Companies** can establish recruitment presence, browse candidate talent pools, and manage vacancies.

---

## ✨ Key Features

### 1. Public & Job Seeker Experience
- **Interactive Hero Section**: Features an accessible dynamic typewriter animation (`useTypewriter`) highlighting high-demand roles, instant keyword search, and popular category tags.
- **Featured Vacancy Browser**: Instant tab switching between **All Jobs**, **Full-time Roles**, and **Internships** with smooth transition animations and urgent deadline countdown indicators (`< 10 days left`).
- **Placement Partners Showcase**: Dual-row infinite scrolling logo marquee (`LogoMarquee`) featuring partner companies and institutions.
- **Interactive "How It Works" Guide**: Tabbed, step-by-step onboarding walkthrough for job seekers and hiring employers.
- **Advanced Category & Search Filtering**: Multi-facet filter sidebar supporting:
  - **Job Level**: Internship, Entry-Level, Mid-Level, Senior-Level, Lead, Executive.
  - **Employment Type**: Full-time, Part-time, Contract, Traineeship.
  - **Education Level**: Freshers, Bachelor's Graduate, Diploma, Master's/Ph.D.
  - **Job Industry**: IT & Telecom, Design, Finance, Marketing, Healthcare, etc.
  - **Sorting**: Latest, Closing Soon, Title (A–Z).
- **Dynamic Job Details (`/[slug]`)**:
  - Comprehensive role overview, company branding, and key metrics.
  - Structured responsibilities and qualification requirements.
  - Technical skill pills and similar job suggestions.
  - Integrated Schema.org `JobPosting` structured data for search engine rich snippets.

### 2. Job Seeker Workspace & Dashboard
- **Overview Analytics**:
  - Live metric cards: *Applications Sent*, *Profile Views*, *Saved Jobs*, and *Companies Followed*.
  - Profile completion progress ring (`ProgressRing`) and "Open to Work" status indicator.
  - Real-time application stage tracker with visual status pills.
  - Recent profile viewers breakdown by company and industry.
  - Job preference overview and quick CV preview link.
- **Master Profile Management (`/jobseeker/me`)**:
  - **About / Summary**: Professional introduction editor.
  - **Work Experience**: Chronological interactive work history timeline.
  - **Education**: Institutional qualification cards with automatic initials badge generation.
  - **Skills Management**: Skill tags with configurable limit constraints.
  - **Certifications**: Accreditation records and issuing bodies.
  - **Contact Details**: Multiple phone numbers, primary email, and address.
  - **Profile Visibility & Employer Interest**: Live visibility toggles and profile view trend analytics.
  - **Tailored Job Profiles**: Capability to create multiple focused sub-profiles (e.g., UI/UX Designer vs. Frontend Developer) with primary designations.
- **Application Tracker (`/jobseeker/applications`)**:
  - Filter applications across stages: `All`, `Applied`, `Under Review`, `Interview`, `Hired`, `Rejected`, and `Withdrawn`.
  - Application withdrawal capability with accessible screen-reader live announcements.
- **Saved Jobs Grid (`/jobseeker/save-jobs`)**: Bookmarked opportunities with deadline trackers and quick apply actions.
- **Followed Companies (`/jobseeker/company-follow`)**: Directory of bookmarked organizations showing active vacancy counts.
- **Account & Privacy Settings (`/jobseeker/settings`)**:
  - Modular sub-pages: Account credentials, Profile & CV documents, Notifications, and Privacy/Visibility controls.
  - Custom form hook (`useSettingsForm`) with dirty-state tracking, save status indications, and discard options.

### 3. Authentication & Access Portals
- **Dual-Audience Portals**: Dedicated authentication flows for Job Seekers (`/jobseeker/login`, `/jobseeker/register`) and Employers (`/employer/login`, `/employer/register`).
- **Validation**: Schema-driven validation using **Zod** and **React Hook Form**.
- **Social Sign-In UI**: Integrated Google OAuth action buttons.
- **Animated Social Proof**: Metric counters (`CountUp`) displaying platform milestones (active listings, verified companies, candidates hired).

### 4. SEO & Structured Data
- **Search Engine Optimization**: Dynamic metadata titles, descriptions, and canonical URLs via Next.js `generateMetadata`.
- **JSON-LD Structured Data**:
  - `JobPosting` schema for automatic indexing in Google for Jobs.
  - `HowTo` schema for interactive guide indexing.
- **Bot Optimization**: Dedicated `robots` directives for search queries to prevent duplicate/thin content indexing.

---

## 🛠 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling Engine** | [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` design tokens |
| **Typography** | `Inter` and `Manrope` via `next/font/google` |
| **Icons** | [Iconify](https://iconify.design/) (`@iconify/react`) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) |
| **Authentication** | [NextAuth.js v5 Beta](https://authjs.dev/) |
| **CSS Utilities** | `clsx`, `tailwind-merge` |

---

## 📂 Project Architecture & Folder Structure

```text
bi-jobs/
├── app/                                    # Next.js App Router (Page & Layout routes)
│   ├── (auth)/                             # Authentication route group
│   │   ├── layout.tsx                      # Auth shared layout (SiteLayout wrapper)
│   │   ├── employer/                       # Employer auth routes
│   │   │   ├── login/page.tsx              # Employer login portal
│   │   │   └── register/page.tsx           # Employer company registration
│   │   ├── jobseeker/                      # Job seeker auth routes
│   │   │   ├── login/page.tsx              # Job seeker login with stats counter
│   │   │   └── register/page.tsx           # Job seeker signup form
│   │   └── register/page.tsx               # General account type chooser
│   ├── (dashboard)/                        # Authenticated dashboards
│   │   └── jobseeker/                      # Job seeker workspace
│   │       ├── layout.tsx                  # Dashboard layout with sidebar & topbar
│   │       ├── loading.tsx                 # Dashboard skeleton loading state
│   │       ├── page.tsx                    # Job seeker overview & metrics dashboard
│   │       ├── me/page.tsx                 # Master Profile & Job Profiles tabbed view
│   │       ├── applications/page.tsx       # Applications tracking & status filter
│   │       ├── save-jobs/page.tsx          # Saved & bookmarked jobs grid
│   │       ├── company-follow/page.tsx     # Followed companies & openings
│   │       └── settings/                   # Multi-tab user settings
│   │           ├── layout.tsx              # Settings layout with navigation sidebar
│   │           ├── page.tsx                # Redirect to /account
│   │           ├── account/page.tsx        # Password & account details
│   │           ├── profile/page.tsx        # Profile & CV settings
│   │           ├── notifications/page.tsx  # Notification preferences
│   │           └── privacy-visibility/     # Profile privacy & visibility options
│   ├── (web)/                              # Public-facing web pages
│   │   ├── layout.tsx                      # Public layout with Header & Footer
│   │   ├── page.tsx                        # Main landing page
│   │   ├── [slug]/page.tsx                 # Dynamic Job Details page (with JSON-LD)
│   │   ├── category/page.tsx               # Browse jobs by category & filters
│   │   ├── search/page.tsx                 # Live search results page
│   │   └── employer-zone/page.tsx          # Employer landing / info section
│   ├── globals.css                         # Tailwind v4 theme, font variables & global styles
│   ├── layout.tsx                          # Root HTML layout with Google Fonts
│   └── not-found.tsx                       # Custom 404 page
│
├── components/                             # Reusable React components
│   ├── auth/                               # Auth form components (LoginForm, RegisterForm)
│   ├── clients-page/                       # Page-specific public views
│   │   ├── home/                           # Landing page sections (Hero, Vacancy, Partners, etc.)
│   │   ├── category/                       # Category listing, filters, and sorting
│   │   └── job-details/                    # Job specifications, meta, and sidebar
│   ├── dashboard/                          # Dashboard shell components
│   │   ├── DashboardShell.tsx              # Dashboard layout wrapper
│   │   ├── DashboardCard.tsx               # Standard dashboard surface card
│   │   ├── StatCard.tsx                    # Metric and KPI counter card
│   │   └── jobseeker/                      # Job seeker specific dashboard components
│   │       ├── OverviewHeader.tsx          # Header with completion ring & work status
│   │       ├── ApplicationTracker.tsx      # Active application stage timeline
│   │       ├── ProfileViewers.tsx          # Company viewer breakdown card
│   │       ├── JobPreferencesCard.tsx      # Preferred role, salary, location summary
│   │       ├── FollowingSavedCard.tsx      # Quick links to saved jobs & companies
│   │       ├── Masterprofiletab.tsx        # Experience, education, skills, contact tabs
│   │       ├── Jobprofilestab.tsx          # Role-tailored job profiles
│   │       ├── ApplicationsList.tsx        # Filterable application data table
│   │       ├── SavedJobsGrid.tsx           # Bookmarked jobs card grid
│   │       ├── FollowingList.tsx           # Followed companies listing
│   │       ├── profile/                    # Profile status & interest widgets
│   │       ├── profile/edit/               # Modal edit forms for all profile sections
│   │       └── settings/                   # Form cards & toggles for account settings
│   ├── layout/                             # Site chrome (Header, Footer, SiteLayout)
│   └── ui/                                 # Design system UI primitives
│       ├── Avatar.tsx                      # Avatar with image & fallback initials
│       ├── button/                         # Button component & contract style variants
│       ├── Checkbox.tsx                    # Styled accessible checkbox
│       ├── Countup.tsx                     # Number counting animation
│       ├── FilterPills.tsx                 # Tab and filter pill buttons
│       ├── FormFields.tsx                  # Standard form input containers
│       ├── InitialsBadge.tsx               # Letter badge for company/institution logos
│       ├── Input.tsx                       # Text input field
│       ├── JobCard.tsx                     # Job vacancy preview card
│       ├── JobTabs.tsx                     # Tab switcher for job types
│       ├── LogoMarquee.tsx                 # Infinite animated partner marquee
│       ├── Modal.tsx                       # Accessible dialog overlay
│       ├── ProgressRing.tsx                # SVG circular completion indicator
│       ├── SegmentedControl.tsx            # Multi-segment toggle button
│       ├── Switch.tsx                      # Toggle switch
│       └── Typingtext.tsx                  # Accessible typewriter text effect
│
├── hooks/                                  # Custom React hooks
│   ├── useSettingsForm.ts                  # Form state with dirty-checking & save status
│   └── useTypewriter.ts                    # Typewriter animation with reduced motion support
│
├── lib/                                    # Utility libraries, types, config & static data
│   ├── config/                             # App configuration (site metadata, nav links)
│   ├── constants/                          # Constant data (filters, statuses, mock listings)
│   ├── data/                               # Data access layer & mock API providers
│   ├── types/                              # TypeScript type definitions & interfaces
│   ├── utils/                              # Filtering, formatting & schema builders
│   └── validation/                         # Zod validation schemas for authentication
│
├── public/                                 # Static assets (images, logos, partner icons, SVGs)
├── next.config.ts                          # Next.js configuration
├── tsconfig.json                           # TypeScript configuration
└── package.json                            # Dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.18.0` or higher (Node.js 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ashish09-cmd/job-protol1.git
   cd job-protol1
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the production server locally after building:

```bash
npm run start
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory to configure environment variables:

```env
# Public site URL (used for canonical URLs and Schema.org JSON-LD structured data)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# NextAuth Configuration (Optional / For authentication setup)
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your-secure-random-secret-key"

# External APIs & Databases (When integrating backend services)
# DATABASE_URL="postgresql://user:password@localhost:5432/broadway_jobs"
```

---

## 📜 NPM Scripts Reference

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Starts the Next.js development server with hot-reload |
| `npm run build` | `next build` | Compiles and builds the production application |
| `npm run start` | `next start` | Starts the production server |
| `npm run lint` | `eslint` | Runs ESLint to verify code quality and style adherence |

---

## 🎨 Design System & UI Components

The project incorporates a centralized design system built on **Tailwind CSS v4** `@theme` tokens in `app/globals.css`:

- **Colors**:
  - Primary Brand Blue: `#2563EB` (with complete palette shades 50–950)
  - Success Green: `#16A34A`
  - Warning Amber: `#F59E0B`
  - Danger Red: `#DC2626`
  - Neutral & Background: Custom separator tokens (`separator1` through `separator5`)
- **Typography**:
  - Headings & Titles: `Manrope` (weights 400 to 800)
  - Body & Form Controls: `Inter` (weights 400 to 700)
- **Accessibility & Motion**:
  - Respects `prefers-reduced-motion` for animations.
  - Keyboard accessible modals, checkboxes, segmented controls, and dropdowns.
  - High-contrast focus rings (`focus-visible:outline-primary-blue`).

---

## 🔮 Roadmap & Future Enhancements

- [ ] Complete database & ORM integration (e.g., Prisma / Drizzle with PostgreSQL).
- [ ] Connect NextAuth providers (Google, GitHub, LinkedIn).
- [ ] Employer Dashboard: Vacancy creation, applicant management, and interview scheduling.
- [ ] Resume / CV upload parser and automatic profile auto-fill.
- [ ] Real-time notifications via WebSockets or email alerts (SendGrid / Resend).
- [ ] In-app direct messaging between recruiters and candidates.

---

## 👤 Author & Credits

Developed with ❤️ as part of the **Broadway Infosys** initiative.

- **Repository**: [job-protol1](https://github.com/Ashish09-cmd/job-protol1.git)
- **Organization**: [Broadway Infosys](https://broadwayinfosys.com/)

---

*© 2026 Broadway Jobs. All rights reserved.*
