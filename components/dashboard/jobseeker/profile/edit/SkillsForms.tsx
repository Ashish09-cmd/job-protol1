"use client";

import { useState } from "react";
import { ModalForm } from "@/components/ui/Modal";
import {
  ChipInput,
  TextAreaField,
  TextField,
} from "@/components/ui/FormFields";
import { newId } from "@/lib/utils/new-id";
import type { JobProfile, MasterProfile } from "@/lib/types/jobseeker-profile";
import type { ProfilePatchHandler } from "@/lib/types/profile-extras";

interface SkillsFormProps {
  profile: MasterProfile;
  onSave: ProfilePatchHandler;
  onCancel: () => void;
}

export function SkillsForm({ profile, onSave, onCancel }: SkillsFormProps) {
  const [skills, setSkills] = useState(profile.skills);

  return (
    <ModalForm onCancel={onCancel} onSubmit={() => onSave({ skills })}>
      <ChipInput
        label="Skills"
        values={skills}
        onChange={setSkills}
        limit={profile.skillLimit}
        placeholder="e.g. Figma"
      />
    </ModalForm>
  );
}

const JOB_PROFILE_SKILL_LIMIT = 10;

interface JobProfileFormProps {
  /** `null` creates a new job profile. */
  profile: JobProfile | null;
  /** True when no job profile exists yet; the new one becomes the primary one. */
  isFirst: boolean;
  onSave: (profile: JobProfile) => Promise<void>;
  onCancel: () => void;
}

export function JobProfileForm({
  profile,
  isFirst,
  onSave,
  onCancel,
}: JobProfileFormProps) {
  const [title, setTitle] = useState(profile?.title ?? "");
  const [summary, setSummary] = useState(profile?.summary ?? "");
  const [skills, setSkills] = useState<string[]>(profile?.skills ?? []);
  const [attempted, setAttempted] = useState(false);

  const submit = async () => {
    setAttempted(true);
    if (!title.trim()) return;
    await onSave({
      id: profile?.id ?? newId(),
      isPrimary: profile?.isPrimary ?? isFirst,
      title: title.trim(),
      summary: summary.trim(),
      skills,
    });
  };

  return (
    <ModalForm
      onSubmit={submit}
      onCancel={onCancel}
      submitLabel={profile ? "Save changes" : "Create profile"}
    >
      <TextField
        label="Job title"
        required
        value={title}
        onChange={setTitle}
        placeholder="e.g. UI/UX Designer"
        maxLength={60}
        error={attempted && !title.trim() ? "Enter a job title." : undefined}
      />
      <TextAreaField
        label="Summary"
        value={summary}
        onChange={setSummary}
        rows={4}
        maxLength={300}
        placeholder="What you offer for this kind of role."
      />
      <ChipInput
        label="Skills for this profile"
        values={skills}
        onChange={setSkills}
        limit={JOB_PROFILE_SKILL_LIMIT}
        placeholder="e.g. Prototyping"
      />
    </ModalForm>
  );
}
