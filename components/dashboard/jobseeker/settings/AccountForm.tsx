"use client";

import { useRef, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import InitialsBadge from "@/components/ui/InitialsBadge";
import { useSettingsForm } from "@/hooks/useSettingsForm";
import SettingsCard from "./SettingsCard";
import SettingsActions from "./SettingsActions";
import { AccountData } from "@/lib/types/Jobseeker settings";

interface FieldProps {
  icon: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  autoComplete?: string;
  readOnly?: boolean;
}

function Field({
  icon,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  readOnly,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-2 rounded-xl border border-subtext-gray2/30 px-4 py-3 focus-within:border-primary-blue focus-within:ring-2 focus-within:ring-primary-blue/20">
      <span className="inline-flex items-center gap-1.5 text-vvxs font-inter text-subtext-light">
        <Icon
          icon={icon}
          className="text-sm text-primary-blue"
          aria-hidden="true"
        />
        {label}
      </span>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        autoComplete={autoComplete}
        onChange={(event) => onChange?.(event.target.value)}
        className="w-full bg-transparent text-xs font-inter text-text-secondary-color outline-none read-only:cursor-not-allowed"
      />
    </label>
  );
}

export default function AccountForm({ data }: { data: AccountData }) {
  const { values, update, dirty, status, discard, save } = useSettingsForm(
    data.account,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void save();
  };

  const closeAccount = () => {
    // TODO: call the close-account API, sign the user out, then redirect to "/".
    dialogRef.current?.close();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
        <SettingsCard
          eyebrow="Account"
          title="Personal details"
          description="Manage your account, visibility, alerts, and notification preferences."
          viewAllHref="/jobseeker/me"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <InitialsBadge name={values.fullName} className="size-14" />
              <div className="flex flex-col">
                <p className="text-sm font-semibold font-manrope text-text-heading">
                  {values.fullName}
                </p>
                <p className="text-vxs font-inter text-subtext-light">
                  {values.accountLabel}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Email is read-only: changing it should go through verification. */}
              <Field
                icon="mdi:email-outline"
                label="Email address"
                type="email"
                value={values.email}
                readOnly
              />
              <Field
                icon="mdi:map-marker-outline"
                label="Location"
                value={values.location}
                onChange={(v) => update("location", v)}
                autoComplete="address-level2"
              />
              <Field
                icon="mdi:briefcase-outline"
                label="Current headline"
                value={values.headline}
                onChange={(v) => update("headline", v)}
              />
              <Field
                icon="mdi:phone-outline"
                label="Phone Number"
                type="tel"
                value={values.phone}
                onChange={(v) => update("phone", v)}
                autoComplete="tel"
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          eyebrow="Profile completion"
          title="Make your profile stronger"
          description="Manage your account, visibility, alerts, and notification preferences."
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex flex-col">
              <p className="text-xl font-semibold font-manrope text-text-heading">
                {data.profileCompletion}%
              </p>
              <p className="text-vxs font-inter text-text-secondary-color">
                Complete
              </p>
            </div>
            <div
              role="progressbar"
              aria-label="Profile completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={data.profileCompletion}
              className="h-2 min-w-40 flex-1 overflow-hidden rounded-full bg-gray-200"
            >
              <div
                className="h-full rounded-full bg-primary-blue"
                style={{ width: `${data.profileCompletion}%` }}
              />
            </div>
            <Link
              href="/jobseeker/me"
              className="inline-flex items-center gap-1 rounded text-vxs font-medium font-inter text-text-secondary-color hover:text-primary-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
            >
              Finish profile
              <Icon icon="mdi:chevron-right" aria-hidden="true" />
            </Link>
          </div>
        </SettingsCard>

        <SettingsCard
          eyebrow="Your data"
          title="Export your profile"
          description="Download a copy of the profile and CV information you have provided."
        >
          <a
            href={data.cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border border-subtext-gray2/30 px-4 py-2 text-sm font-inter text-text-heading hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            <Icon icon="mdi:download-outline" aria-hidden="true" />
            Download CV
          </a>
        </SettingsCard>

        <SettingsCard
          eyebrow="Account actions"
          title="Close account"
          description="Closing your account removes your visibility and stops all job alerts."
        >
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="rounded-md border border-red-600 px-4 py-2 text-sm font-inter text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Close my account
          </button>
        </SettingsCard>

        <SettingsActions dirty={dirty} status={status} onDiscard={discard} />
      </form>

      <dialog
        ref={dialogRef}
        aria-labelledby="close-account-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-6 backdrop:bg-black/40"
      >
        <h2
          id="close-account-title"
          className="text-lg-sm font-semibold font-manrope text-text-heading"
        >
          Close your account?
        </h2>
        <p className="mt-2 text-sm font-inter text-text-secondary-color">
          Your profile will no longer be visible to employers and all job alerts
          will stop.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-md border border-subtext-gray2/30 px-4 py-2 text-sm font-inter text-text-heading hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={closeAccount}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium font-inter text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Close account
          </button>
        </div>
      </dialog>
    </>
  );
}
