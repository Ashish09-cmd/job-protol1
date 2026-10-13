"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import SettingsCard from "./SettingsCard";
import SettingsActions from "./SettingsActions";
import { ProfileSectionId, ProfileSettingsData } from "@/lib/types/Jobseeker settings";

const SECTION_ICONS: Record<ProfileSectionId, string> = {
  personal: "mdi:account-outline",
  experience: "mdi:briefcase-outline",
  education: "mdi:school-outline",
  skills: "mdi:star-outline",
  certifications: "mdi:certificate-outline",
  preferences: "mdi:tune-variant",
};

export default function ProfileSettingsForm({
  data,
}: {
  data: ProfileSettingsData;
}) {
  const { values, update, dirty, status, discard, save } = useSettingsForm({
    tags: data.tags,
  });
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const atLimit = values.tags.length >= data.tagLimit;

  const startAdding = () => {
    setAdding(true);
    // Wait for the input to mount, then focus it.
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const commitTag = () => {
    const tag = draft.trim();
    const exists = values.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase(),
    );
    if (tag && !exists && !atLimit) update("tags", [...values.tags, tag]);
    setDraft("");
    setAdding(false);
  };

  const onTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // do not submit the settings form
      commitTag();
    } else if (event.key === "Escape") {
      setDraft("");
      setAdding(false);
    }
  };

  const removeTag = (tag: string) =>
    update(
      "tags",
      values.tags.filter((t) => t !== tag),
    );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void save();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <SettingsCard
        eyebrow="Structured profile"
        title="Profile Sections"
        description="Complete the fields employers use to understand your experience."
        viewAllHref="/jobseeker/me"
      >
        <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.sections.map((section) => (
            <li key={section.id}>
              <Link
                href="/jobseeker/me"
                className="flex items-center gap-4 rounded-xl border border-subtext-gray2/30 px-4 py-4 transition-colors hover:bg-blue-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg text-primary-blue"
                >
                  <Icon icon={SECTION_ICONS[section.id]} />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-sm font-medium font-inter text-text-heading">
                    {section.title}
                  </span>
                  <span className="truncate text-sm font-inter text-subtext-light">
                    {section.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </SettingsCard>

      <SettingsCard
        eyebrow="Job profile layer"
        title="Job-interest tags"
        description={`Choose up to ${data.tagLimit} tags for your default dashboard category and rule-based job alerts. They never restrict what you can apply for.`}
      >
        <ul role="list" className="flex flex-wrap items-center gap-2">
          {values.tags.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 py-1 pl-3 pr-1.5 text-vxs font-medium font-inter text-primary-blue"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="rounded-full p-0.5 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-primary-blue"
              >
                <Icon icon="mdi:close" aria-hidden="true" />
              </button>
            </li>
          ))}

          {!atLimit &&
            (adding ? (
              <li>
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onTagKeyDown}
                  onBlur={commitTag}
                  maxLength={30}
                  aria-label="New job-interest tag"
                  placeholder="Type a tag"
                  className="w-32 rounded-full border border-dashed border-primary-blue px-3 py-1 text-vxs font-inter text-text-heading outline-none"
                />
              </li>
            ) : (
              <li>
                <button
                  type="button"
                  onClick={startAdding}
                  className="inline-flex items-center gap-1 rounded-full border border-dashed border-primary-blue px-3 py-1 text-vxs font-inter text-primary-blue hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
                >
                  <Icon icon="mdi:plus" aria-hidden="true" />
                  Add
                </button>
              </li>
            ))}
        </ul>
        <p className="mt-3 text-vvxs font-inter text-subtext-light">
          {values.tags.length} of {data.tagLimit} tags used
          {atLimit ? ". Limit reached." : "."}
        </p>
      </SettingsCard>

      <SettingsActions dirty={dirty} status={status} onDiscard={discard} />
    </form>
  );
}
