"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@iconify/react";
import InitialsBadge from "@/components/ui/InitialsBadge";
import type { MasterProfile } from "@/lib/types/jobseeker-profile";
import MasterProfileTab from "./Masterprofiletab";
import JobProfilesTab from "./Jobprofilestab";
import { EmployerInterestStats, ProfileEditTarget, ProfileVisibilityStatus } from "@/lib/types/profile-extras";
import ProfileEditModals from "./profile/edit/ProfileEditModals";

type TabId = "master" | "jobs" | "cv";

interface ProfileViewProps {
  profile: MasterProfile;
  visibility: ProfileVisibilityStatus;
  interest: EmployerInterestStats;
}

async function persistProfile(next: MasterProfile): Promise<void> {
  // TODO: send `next` to your API (for example PATCH /api/jobseeker/profile).
  // Throw when the request fails so the modal shows its error message.
  void next;
}

export default function ProfileView({
  profile: initialProfile,
  visibility,
  interest,
}: ProfileViewProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState<ProfileEditTarget | null>(null);
  const [notice, setNotice] = useState("");
  const [active, setActive] = useState<TabId>("master");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    master: null,
    jobs: null,
    cv: null,
  });

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  /** Saves a change, updates the page, then closes the modal. Throws on failure. */
  const saveProfile = useCallback(
    async (patch: Partial<MasterProfile>) => {
      const next = { ...profile, ...patch };
      await persistProfile(next);
      setProfile(next);
      setEditing(null);
      setNotice("Profile updated.");
    },
    [profile],
  );

  const setDefaultJobProfile = async (id: string) => {
    try {
      await saveProfile({
        jobProfiles: profile.jobProfiles.map((item) => ({
          ...item,
          isPrimary: item.id === id,
        })),
      });
    } catch {
      setNotice("Could not change your default job profile. Try again.");
    }
  };

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "master", label: "Master Profile" },
    { id: "jobs", label: "Job Profile", count: profile.jobProfiles.length },
    { id: "cv", label: "Generated CV" },
  ];

 
  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;

    event.preventDefault();
    setActive(tabs[next].id);
    tabRefs.current[tabs[next].id]?.focus();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header card */}
      <section
        aria-label="Profile overview"
        className="flex flex-col gap-5 rounded-2xl border border-subtext-gray2/30 bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex items-center gap-4">
          <InitialsBadge
            name={profile.fullName}
            shape="circle"
            className="size-16"
          />
          <div className="flex flex-col gap-1">
            <p className="text-vvxs font-medium uppercase tracking-widest font-inter text-subtext-light">
              Your master profile
            </p>
            <h1 className="text-lg font-bold line-height-2xl font-manrope text-text-heading ">
              {profile.fullName}
            </h1>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs tracking-wide font-manrope font-semibold  text-primary-blue">
                {profile.headline}
              </p>
              <ul
                role="list"
                className="flex flex-wrap items-center gap-x-4 gap-y-1 text-vxs font-inter text-subtext-light"
              >
                <li className="inline-flex items-center gap-1">
                  <Icon
                    icon="mdi:map-marker-outline"
                    aria-hidden="true"
                    className="text-xs"
                  />
                  {profile.location}
                </li>
                <li className="inline-flex items-center gap-1">
                  <Icon icon={"fluent-mdl2:education"} className="text-xs" />
                  {profile.education.length} education
                </li>
                <li className="inline-flex items-center gap-1">
                  <Icon icon={"fluent-mdl2:reopen-pages"} />
                  {profile.jobProfiles.length} job{" "}
                  {profile.jobProfiles.length === 1 ? "profile" : "profiles"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setEditing({ kind: "intro" })}
            className="inline-flex items-center gap-2 rounded-md bg-primary-blue px-4 py-1.5 text-xs font-regular cursor-pointer font-inter text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            <Icon icon="mdi:pencil-outline" aria-hidden="true" />
            Edit Profile
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-subtext-gray2/30 px-4 py-1.5 text-xs cursor-pointer font-regular font-inter text-text-heading hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            <Icon icon="mdi:share-variant-outline" aria-hidden="true" />
            Share
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Profile sections"
        className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-subtext-gray2/30 bg-white p-1"
      >
        {tabs.map((tab, index) => {
          const selected = active === tab.id;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              type="button"
              role="tab"
              id={`profile-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`profile-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`inline-flex shrink-0 items-center gap-2 cursor-pointer rounded-full px-4 py-2 text-vxs font-medium font-inter transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
                selected
                  ? "bg-primary-blue text-white"
                  : "text-text-secondary-color hover:bg-blue-50/60"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-vvxs ${
                    selected
                      ? "bg-white/20 text-white"
                      : "bg-blue-50 text-primary-blue"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div
        role="tabpanel"
        id={`profile-panel-${active}`}
        aria-labelledby={`profile-tab-${active}`}
        tabIndex={0}
        className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue"
      >
        {active === "master" && (
          <MasterProfileTab
            profile={profile}
            visibility={visibility}
            interest={interest}
            onEdit={setEditing}
          />
        )}
        {active === "jobs" && (
          <JobProfilesTab
            profiles={profile.jobProfiles}
            onEdit={(id) => setEditing({ kind: "jobProfile", id })}
            onCreate={() => setEditing({ kind: "jobProfile", id: null })}
            onSetDefault={setDefaultJobProfile}
          />
        )}
        {active === "cv" && (
          // TODO: replace with the Generated CV design and the real CV file.
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-subtext-gray2/30 px-6 py-16 text-center">
            <Icon
              icon="mdi:file-document-outline"
              className="text-4xl text-subtext-light"
              aria-hidden="true"
            />
            <p className="text-lg-sm font-semibold font-manrope text-text-heading">
              No CV generated yet
            </p>
            <p className="max-w-sm text-sm font-inter text-text-secondary-color">
              Your CV will be built from your master profile once this section
              is set up.
            </p>
          </div>
        )}
      </div>

      <ProfileEditModals
        editing={editing}
        profile={profile}
        onClose={() => setEditing(null)}
        onSave={saveProfile}
      />

      {/* Confirmation toast, also read out by screen readers. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end"
      >
        {notice && (
          <p className="pointer-events-auto inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-inter text-white shadow-lg">
            <Icon icon="mdi:check-circle-outline" aria-hidden="true" />
            {notice}
          </p>
        )}
      </div>
    </div>
  );
}
