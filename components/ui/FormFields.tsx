"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { Icon } from "@iconify/react";

const inputBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-xs font-inter text-text-heading outline-none transition-colors placeholder:text-subtext-light focus:ring-2";
const inputOk =
  "border-subtext-gray2/30 focus:border-primary-blue focus:ring-primary-blue/20";
const inputBad = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

const labelClass = "text-vxs font-medium font-inter text-text-heading";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
}

export function TextField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  required,
  maxLength,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-600">
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} ${error ? inputBad : inputOk}`}
      />
      {error && (
        <p id={errorId} className="text-vvxs font-inter text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

export function TextAreaField({
  label,
  value,
  onChange,
  error,
  placeholder,
  rows = 4,
  maxLength,
}: TextAreaFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${inputBase} resize-y ${error ? inputBad : inputOk}`}
      />
      <div className="flex items-center justify-between gap-3">
        {error ? (
          <p id={errorId} className="text-vvxs font-inter text-red-600">
            {error}
          </p>
        ) : (
          <span />
        )}
        {maxLength && (
          <p className="text-vvxs font-inter text-subtext-light">
            {value.length} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

interface ChipInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  limit?: number;
  placeholder?: string;
}

/** Add short items one at a time (Enter or the Add button) and remove them with the x. */
export function ChipInput({
  label,
  values,
  onChange,
  limit,
  placeholder = "Type and press Enter",
}: ChipInputProps) {
  const id = useId();
  const [draft, setDraft] = useState("");
  const atLimit = limit !== undefined && values.length >= limit;

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    const exists = values.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );
    if (!exists && !atLimit) onChange([...values, value]);
    setDraft("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // do not submit the surrounding form
      add();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      <div className="flex gap-2">
        <input
          id={id}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          disabled={atLimit}
          maxLength={40}
          placeholder={atLimit ? "Limit reached" : placeholder}
          className={`${inputBase} ${inputOk} disabled:cursor-not-allowed disabled:bg-separator3/30`}
        />
        <button
          type="button"
          onClick={add}
          disabled={atLimit || !draft.trim()}
          className="shrink-0 rounded-lg border border-primary-blue px-4 text-sm font-medium font-inter text-primary-blue transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          Add
        </button>
      </div>

      {values.length > 0 && (
        <ul role="list" className="flex flex-wrap gap-2">
          {values.map((value) => (
            <li
              key={value}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 py-1 pl-3 pr-1.5 text-vxs font-medium font-inter text-primary-blue"
            >
              {value}
              <button
                type="button"
                onClick={() =>
                  onChange(values.filter((item) => item !== value))
                }
                aria-label={`Remove ${value}`}
                className="rounded-full p-0.5 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-primary-blue"
              >
                <Icon icon="mdi:close" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-vvxs font-inter text-subtext-light">
        {values.length}
        {limit !== undefined ? ` of ${limit}` : ""} added
        {atLimit ? ". Limit reached." : "."}
      </p>
    </div>
  );
}
