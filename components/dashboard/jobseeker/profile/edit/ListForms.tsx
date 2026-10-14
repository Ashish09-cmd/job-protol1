"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { ModalForm } from "@/components/ui/Modal";
import { TextAreaField, TextField } from "@/components/ui/FormFields";
import { newId } from "@/lib/utils/new-id";
import type {
  Certification,
  EducationItem,
  ExperienceItem,
  MasterProfile,
} from "@/lib/types/jobseeker-profile";
import type { ProfilePatchHandler } from "@/lib/types/profile-extras";

/* ---------- generic list editor ---------- */

interface FieldConfig<T> {
  key: Exclude<keyof T, "id">;
  label: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  /** Spans both columns on wide screens. */
  wide?: boolean;
}

function valueOf<T>(item: T, key: keyof T): string {
  const value = item[key];
  return typeof value === "string" ? value : "";
}

function isBlank<T>(item: T, fields: FieldConfig<T>[]): boolean {
  return fields.every((field) => !valueOf(item, field.key).trim());
}

function hasMissing<T>(items: T[], fields: FieldConfig<T>[]): boolean {
  return items.some((item) =>
    fields.some((field) => field.required && !valueOf(item, field.key).trim()),
  );
}

function trimItem<T extends { id: string }>(
  item: T,
  fields: FieldConfig<T>[],
): T {
  const trimmed = { ...item };
  for (const field of fields) {
    const value = valueOf(item, field.key);
    (trimmed as Record<string, unknown>)[field.key as string] = value.trim();
  }
  return trimmed;
}

interface ListEditorProps<T extends { id: string }> {
  items: T[];
  onChange: (items: T[]) => void;
  fields: FieldConfig<T>[];
  makeEmpty: () => T;
  entryLabel: string;
  addLabel: string;
  emptyText: string;
  attempted: boolean;
}

function ListEditor<T extends { id: string }>({
  items,
  onChange,
  fields,
  makeEmpty,
  entryLabel,
  addLabel,
  emptyText,
  attempted,
}: ListEditorProps<T>) {
  const setField = (index: number, key: keyof T, value: string) =>
    onChange(
      items.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );

  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-subtext-gray2/30 px-4 py-6 text-center text-sm font-inter text-subtext-light">
          {emptyText}
        </p>
      )}

      <ol role="list" className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 rounded-xl border border-subtext-gray2/30 bg-separator3/20 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-vvxs font-semibold uppercase tracking-widest font-inter text-subtext-light">
                {entryLabel} {index + 1}
              </p>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                aria-label={`Remove ${entryLabel.toLowerCase()} ${index + 1}`}
                className="inline-flex items-center gap-1 rounded text-vxs font-inter text-red-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <Icon icon="mdi:trash-can-outline" aria-hidden="true" />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const value = valueOf(item, field.key);
                const error =
                  attempted &&
                  field.required &&
                  !value.trim() &&
                  !isBlank(item, fields)
                    ? "This field is required."
                    : undefined;

                return (
                  <div
                    key={String(field.key)}
                    className={
                      field.wide || field.multiline ? "sm:col-span-2" : ""
                    }
                  >
                    {field.multiline ? (
                      <TextAreaField
                        label={field.label}
                        value={value}
                        rows={3}
                        placeholder={field.placeholder}
                        onChange={(v) => setField(index, field.key, v)}
                      />
                    ) : (
                      <TextField
                        label={field.label}
                        value={value}
                        required={field.required}
                        placeholder={field.placeholder}
                        error={error}
                        onChange={(v) => setField(index, field.key, v)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => onChange([...items, makeEmpty()])}
        className="inline-flex w-fit items-center gap-1.5 rounded-md border border-dashed border-primary-blue px-4 py-2 text-sm font-medium font-inter text-primary-blue transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        <Icon icon="mdi:plus" aria-hidden="true" />
        {addLabel}
      </button>
    </div>
  );
}

/* ---------- the three forms ---------- */

interface FormProps {
  profile: MasterProfile;
  onSave: ProfilePatchHandler;
  onCancel: () => void;
}

const EXPERIENCE_FIELDS: FieldConfig<ExperienceItem>[] = [
  {
    key: "role",
    label: "Job title",
    required: true,
    placeholder: "e.g. Web Developer",
  },
  {
    key: "company",
    label: "Company",
    required: true,
    placeholder: "e.g. Broadway Infosys",
  },
  { key: "location", label: "Location", placeholder: "City" },
  { key: "period", label: "Period", placeholder: "2023 – Present" },
  {
    key: "description",
    label: "What you did",
    multiline: true,
    placeholder: "Short description of your work.",
  },
];

export function ExperienceForm({ profile, onSave, onCancel }: FormProps) {
  const [items, setItems] = useState<ExperienceItem[]>(profile.experience);
  const [attempted, setAttempted] = useState(false);

  const submit = async () => {
    setAttempted(true);
    const cleaned = items.filter((item) => !isBlank(item, EXPERIENCE_FIELDS));
    if (hasMissing(cleaned, EXPERIENCE_FIELDS)) return;
    await onSave({
      experience: cleaned.map((item) => trimItem(item, EXPERIENCE_FIELDS)),
    });
  };

  return (
    <ModalForm onSubmit={submit} onCancel={onCancel}>
      <ListEditor
        items={items}
        onChange={setItems}
        fields={EXPERIENCE_FIELDS}
        makeEmpty={() => ({
          id: newId(),
          role: "",
          company: "",
          period: "",
          location: "",
          description: "",
        })}
        entryLabel="Experience"
        addLabel="Add experience"
        emptyText="No experience added yet."
        attempted={attempted}
      />
    </ModalForm>
  );
}

const EDUCATION_FIELDS: FieldConfig<EducationItem>[] = [
  {
    key: "degree",
    label: "Degree",
    required: true,
    wide: true,
    placeholder: "e.g. Bachelor in Information Technology",
  },
  {
    key: "institution",
    label: "Institution",
    required: true,
    placeholder: "e.g. Herald College",
  },
  { key: "period", label: "Period", placeholder: "2017 – 2021" },
];

export function EducationForm({ profile, onSave, onCancel }: FormProps) {
  const [items, setItems] = useState<EducationItem[]>(profile.education);
  const [attempted, setAttempted] = useState(false);

  const submit = async () => {
    setAttempted(true);
    const cleaned = items.filter((item) => !isBlank(item, EDUCATION_FIELDS));
    if (hasMissing(cleaned, EDUCATION_FIELDS)) return;
    await onSave({
      education: cleaned.map((item) => trimItem(item, EDUCATION_FIELDS)),
    });
  };

  return (
    <ModalForm onSubmit={submit} onCancel={onCancel}>
      <ListEditor
        items={items}
        onChange={setItems}
        fields={EDUCATION_FIELDS}
        makeEmpty={() => ({
          id: newId(),
          degree: "",
          institution: "",
          period: "",
        })}
        entryLabel="Education"
        addLabel="Add education"
        emptyText="No education added yet."
        attempted={attempted}
      />
    </ModalForm>
  );
}

const CERTIFICATION_FIELDS: FieldConfig<Certification>[] = [
  { key: "name", label: "Certification name", required: true, wide: true },
  { key: "issuer", label: "Issued by", required: true },
  { key: "year", label: "Year", placeholder: "2025" },
];

export function CertificationForm({ profile, onSave, onCancel }: FormProps) {
  const [items, setItems] = useState<Certification[]>(profile.certifications);
  const [attempted, setAttempted] = useState(false);

  const submit = async () => {
    setAttempted(true);
    const cleaned = items.filter(
      (item) => !isBlank(item, CERTIFICATION_FIELDS),
    );
    if (hasMissing(cleaned, CERTIFICATION_FIELDS)) return;
    await onSave({
      certifications: cleaned.map((item) =>
        trimItem(item, CERTIFICATION_FIELDS),
      ),
    });
  };

  return (
    <ModalForm onSubmit={submit} onCancel={onCancel}>
      <ListEditor
        items={items}
        onChange={setItems}
        fields={CERTIFICATION_FIELDS}
        makeEmpty={() => ({ id: newId(), name: "", issuer: "", year: "" })}
        entryLabel="Certification"
        addLabel="Add certification"
        emptyText="No certifications added yet."
        attempted={attempted}
      />
    </ModalForm>
  );
}
