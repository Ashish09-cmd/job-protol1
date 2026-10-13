"use client";

import type { FormEvent } from "react";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import SettingsCard from "./SettingsCard";
import SettingsActions from "./SettingsActions";
import ToggleRow from "./ToggleRow";
import { NotificationSettings } from "@/lib/types/Jobseeker settings";

const ITEMS: {
  key: keyof NotificationSettings;
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    key: "applicationUpdates",
    icon: "mdi:briefcase-outline",
    title: "Application updates",
    description:
      "Get notified when an employer changes your application status.",
  },
  {
    key: "newJobAlerts",
    icon: "mdi:tune-variant",
    title: "New job alerts",
    description: "See new roles matching your saved job interests and filters.",
  },
  {
    key: "companyFollows",
    icon: "mdi:web",
    title: "Company follows",
    description: "Know when a company you follow posts a new position.",
  },
  {
    key: "profileViews",
    icon: "mdi:eye",
    title: "Profile views",
    description:
      "See when an employer views your public profile or generated CV.",
  },
  {
    key: "weeklyDigest",
    icon: "mdi:email-outline",
    title: "Weekly digest",
    description: "Receive a calm weekly summary of your job search activity.",
  },
];

export default function NotificationsForm({
  initial,
}: {
  initial: NotificationSettings;
}) {
  const { values, update, dirty, status, discard, save } =
    useSettingsForm(initial);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void save();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <SettingsCard
        eyebrow="Stay in the loop"
        title="Notifications preferences"
        description="Choose the updates that matter to your job search."
      >
        <ul role="list" className="flex flex-col">
          {ITEMS.map((item) => (
            <ToggleRow
              key={item.key}
              icon={item.icon}
              title={item.title}
              description={item.description}
              checked={values[item.key]}
              onChange={(checked) => update(item.key, checked)}
            />
          ))}
        </ul>
      </SettingsCard>

      <SettingsActions dirty={dirty} status={status} onDiscard={discard} />
    </form>
  );
}
