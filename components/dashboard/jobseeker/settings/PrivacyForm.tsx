"use client";

import type { FormEvent } from "react";
import { Icon } from "@iconify/react";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import SettingsCard from "./SettingsCard";
import SettingsActions from "./SettingsActions";
import ToggleRow from "./ToggleRow";
import { PrivacySettings } from "@/lib/types/Jobseeker settings";

// TODO: legal / product should confirm this copy before launch.
const EMPLOYER_RECEIVES = [
  "Current generated CV",
  "Public profile and verified work history",
  "Answers to this role's screening questions",
];

export default function PrivacyForm({ initial }: { initial: PrivacySettings }) {
  const { values, update, dirty, status, discard, save } =
    useSettingsForm(initial);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void save();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <SettingsCard
        eyebrow="Visibility"
        title="Control who can discover you"
        description="Your profile and CV only appear to employers when you choose to be visible."
      >
        <ul role="list" className="flex flex-col">
          <ToggleRow
            icon="mdi:briefcase-outline"
            title={`Open for work is ${values.openForWork ? "on" : "off"}`}
            description="Employers can discover your profile until your current status expires."
            checked={values.openForWork}
            onChange={(checked) => update("openForWork", checked)}
          />
          <ToggleRow
            icon="mdi:web"
            title="Public profile"
            description="Let employers view your profile when they discover you."
            checked={values.publicProfile}
            onChange={(checked) => update("publicProfile", checked)}
          />
          <ToggleRow
            icon="mdi:eye"
            title="Show employer interest"
            description="Show profile view activity in your workspace."
            checked={values.showEmployerInterest}
            onChange={(checked) => update("showEmployerInterest", checked)}
          />
          <ToggleRow
            icon="mdi:lock"
            title="Share contact details on applications"
            description="Include your email and phone in the generated CV shared with employers."
            checked={values.shareContactDetails}
            onChange={(checked) => update("shareContactDetails", checked)}
          />
        </ul>
      </SettingsCard>

      <SettingsCard
        eyebrow="Application privacy"
        title="What employers receive"
        description="When you apply through Broadway Jobs, employers receive your live profile and generated CV. Screening answers are attached to that application only."
      >
        <ul role="list" className="flex flex-col gap-4">
          {EMPLOYER_RECEIVES.map((text) => (
            <li
              key={text}
              className="flex items-center gap-3 text-sm font-inter text-text-secondary-color"
            >
              <Icon
                icon="mdi:check"
                className="text-primary-blue"
                aria-hidden="true"
              />
              {text}
            </li>
          ))}
        </ul>
      </SettingsCard>

      <SettingsActions dirty={dirty} status={status} onDiscard={discard} />
    </form>
  );
}
