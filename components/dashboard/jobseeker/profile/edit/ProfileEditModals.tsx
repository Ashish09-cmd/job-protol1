"use client";

import Modal from "@/components/ui/Modal";
import type { MasterProfile } from "@/lib/types/jobseeker-profile";
import type {
  ProfileEditTarget,
  ProfilePatchHandler,
} from "@/lib/types/profile-extras";
import { ContactForm, IntroForm, SummaryForm } from "./BasicForms";
import { CertificationForm, EducationForm, ExperienceForm } from "./ListForms";
import { JobProfileForm, SkillsForm } from "./SkillsForms";

interface ProfileEditModalsProps {
  editing: ProfileEditTarget | null;
  profile: MasterProfile;
  onClose: () => void;
  onSave: ProfilePatchHandler;
}

function getCopy(target: ProfileEditTarget): {
  title: string;
  description?: string;
  size: "md" | "lg";
} {
  switch (target.kind) {
    case "intro":
      return {
        title: "Edit profile",
        description:
          "Your name and headline appear at the top of your profile.",
        size: "md",
      };
    case "summary":
      return {
        title: "Edit summary",
        description: "A short introduction employers read first.",
        size: "md",
      };
    case "experience":
      return {
        title: "Edit experience",
        description: "Add, change or remove roles from your work history.",
        size: "lg",
      };
    case "education":
      return {
        title: "Edit education",
        description: "Add, change or remove your education.",
        size: "lg",
      };
    case "skills":
      return {
        title: "Edit skills",
        description: "Skills employers can see on your profile.",
        size: "md",
      };
    case "certifications":
      return {
        title: "Certifications",
        description: "Add, change or remove your certifications.",
        size: "lg",
      };
    case "contact":
      return {
        title: "Edit contact details",
        description: "How employers can reach you.",
        size: "md",
      };
    case "jobProfile":
      return {
        title: target.id ? "Edit job profile" : "Create a job profile",
        description: "A focused version of your profile for one kind of role.",
        size: "md",
      };
  }
}

/** Renders the one modal that matches what the user clicked Edit on. */
export default function ProfileEditModals({
  editing,
  profile,
  onClose,
  onSave,
}: ProfileEditModalsProps) {
  const copy = editing
    ? getCopy(editing)
    : { title: "", description: undefined, size: "md" as const };

  const formProps = { profile, onSave, onCancel: onClose };

  return (
    <Modal
      open={editing !== null}
      onClose={onClose}
      title={copy.title}
      description={copy.description}
      size={copy.size}
    >
      {editing?.kind === "intro" && <IntroForm {...formProps} />}
      {editing?.kind === "summary" && <SummaryForm {...formProps} />}
      {editing?.kind === "experience" && <ExperienceForm {...formProps} />}
      {editing?.kind === "education" && <EducationForm {...formProps} />}
      {editing?.kind === "skills" && <SkillsForm {...formProps} />}
      {editing?.kind === "certifications" && (
        <CertificationForm {...formProps} />
      )}
      {editing?.kind === "contact" && <ContactForm {...formProps} />}
      {editing?.kind === "jobProfile" && (
        <JobProfileForm
          profile={
            editing.id
              ? (profile.jobProfiles.find((p) => p.id === editing.id) ?? null)
              : null
          }
          isFirst={profile.jobProfiles.length === 0}
          onCancel={onClose}
          onSave={async (saved) => {
            const exists = profile.jobProfiles.some((p) => p.id === saved.id);
            await onSave({
              jobProfiles: exists
                ? profile.jobProfiles.map((p) =>
                    p.id === saved.id ? saved : p,
                  )
                : [...profile.jobProfiles, saved],
            });
          }}
        />
      )}
    </Modal>
  );
}
