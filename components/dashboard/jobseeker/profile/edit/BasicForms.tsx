"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { ModalForm } from "@/components/ui/Modal";
import { TextAreaField, TextField } from "@/components/ui/FormFields";
import type { MasterProfile } from "@/lib/types/jobseeker-profile";
import type { ProfilePatchHandler } from "@/lib/types/profile-extras";

interface FormProps {
  profile: MasterProfile;
  onSave: ProfilePatchHandler;
  onCancel: () => void;
}

export function IntroForm({ profile, onSave, onCancel }: FormProps) {
  const [fullName, setFullName] = useState(profile.fullName);
  const [headline, setHeadline] = useState(profile.headline);
  const [location, setLocation] = useState(profile.location);
  const [attempted, setAttempted] = useState(false);

  const submit = async () => {
    setAttempted(true);
    if (!fullName.trim() || !headline.trim()) return;
    await onSave({
      fullName: fullName.trim(),
      headline: headline.trim(),
      location: location.trim(),
    });
  };

  return (
    <ModalForm onSubmit={submit} onCancel={onCancel}>
      <TextField
        label="Full name"
        required
        value={fullName}
        onChange={setFullName}
        autoComplete="name"
        error={
          attempted && !fullName.trim() ? "Enter your full name." : undefined
        }
      />
      <TextField
        label="Headline"
        required
        value={headline}
        onChange={setHeadline}
        placeholder="e.g. Web Developer"
        maxLength={80}
        error={
          attempted && !headline.trim() ? "Enter a short headline." : undefined
        }
      />
      <TextField
        label="Location"
        value={location}
        onChange={setLocation}
        placeholder="City, Country"
        autoComplete="address-level2"
      />
    </ModalForm>
  );
}

const SUMMARY_LIMIT = 600;

export function SummaryForm({ profile, onSave, onCancel }: FormProps) {
  const [summary, setSummary] = useState(profile.summary);

  return (
    <ModalForm
      onCancel={onCancel}
      onSubmit={() => onSave({ summary: summary.trim() })}
    >
      <TextAreaField
        label="Summary"
        value={summary}
        onChange={setSummary}
        rows={7}
        maxLength={SUMMARY_LIMIT}
        placeholder="Tell employers who you are and what you do best."
      />
    </ModalForm>
  );
}

const MAX_PHONES = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ profile, onSave, onCancel }: FormProps) {
  const [email, setEmail] = useState(profile.contact.email);
  const [phones, setPhones] = useState<string[]>(
    profile.contact.phones.length > 0 ? profile.contact.phones : [""],
  );
  const [address, setAddress] = useState(profile.contact.address);
  const [attempted, setAttempted] = useState(false);

  const emailError = !email.trim()
    ? "Enter your email address."
    : !EMAIL_PATTERN.test(email.trim())
      ? "Enter a valid email address."
      : undefined;

  const setPhone = (index: number, value: string) =>
    setPhones((current) => current.map((p, i) => (i === index ? value : p)));

  const submit = async () => {
    setAttempted(true);
    if (emailError) return;
    await onSave({
      contact: {
        email: email.trim(),
        phones: phones.map((p) => p.trim()).filter(Boolean),
        address: address.trim(),
      },
    });
  };

  return (
    <ModalForm onSubmit={submit} onCancel={onCancel}>
      <TextField
        label="Email address"
        type="email"
        required
        value={email}
        onChange={setEmail}
        autoComplete="email"
        error={attempted ? emailError : undefined}
      />

      <div className="flex flex-col gap-3">
        {phones.map((phone, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="flex-1">
              <TextField
                label={
                  phones.length > 1
                    ? `Phone number ${index + 1}`
                    : "Phone number"
                }
                type="tel"
                value={phone}
                onChange={(value) => setPhone(index, value)}
                autoComplete="tel"
                placeholder="+977 98XXXXXXXX"
              />
            </div>
            {phones.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setPhones((c) => c.filter((_, i) => i !== index))
                }
                aria-label={`Remove phone number ${index + 1}`}
                className="mb-1 rounded-md p-2 text-subtext-light hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600"
              >
                <Icon
                  icon="mdi:trash-can-outline"
                  className="text-lg"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        ))}
        {phones.length < MAX_PHONES && (
          <button
            type="button"
            onClick={() => setPhones((c) => [...c, ""])}
            className="inline-flex w-fit items-center gap-1 rounded text-vxs font-medium font-inter text-primary-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            <Icon icon="mdi:plus" aria-hidden="true" />
            Add another number
          </button>
        )}
      </div>

      <TextField
        label="Address"
        value={address}
        onChange={setAddress}
        autoComplete="street-address"
        placeholder="City, Country"
      />
    </ModalForm>
  );
}
