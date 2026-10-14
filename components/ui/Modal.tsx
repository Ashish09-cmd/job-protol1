"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Icon } from "@iconify/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: "md" | "lg";
  children: ReactNode;
}

/**
 * Accessible modal built on the native <dialog>: focus is trapped, Escape and
 * a click on the backdrop close it. Children are only mounted while open, so
 * forms start fresh every time.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      // Put the cursor in the first field instead of on the close button.
      dialog.querySelector<HTMLElement>("input, textarea")?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={`m-auto w-[calc(100%-2rem)] ${
        size === "lg" ? "max-w-2xl" : "max-w-lg"
      } overflow-hidden rounded-2xl border border-subtext-gray2/30 bg-white p-0 shadow-2xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-[2px]`}
    >
      {open && (
        <div className="flex max-h-[85vh] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-subtext-gray2/30 px-6 py-5">
            <div className="flex flex-col gap-1">
              <h2
                id={titleId}
                className="text-lg font-bold font-manrope text-text-heading"
              >
                {title}
              </h2>
              {description && (
                <p className="text-sm font-inter text-text-secondary-color">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-subtext-light transition-colors hover:bg-blue-50 hover:text-text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
            >
              <Icon icon="mdi:close" className="text-xl" aria-hidden="true" />
            </button>
          </header>
          {children}
        </div>
      )}
    </dialog>
  );
}

interface ModalFormProps {
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
  submitLabel?: string;
  children: ReactNode;
}

/** Scrollable form body plus a fixed Cancel / Save footer. Put it inside <Modal>. */
export function ModalForm({
  onSubmit,
  onCancel,
  submitLabel = "Save changes",
  children,
}: ModalFormProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      await onSubmit();
    } catch {
      setError("Could not save your changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
        {children}
      </div>
      <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-subtext-gray2/30 bg-white px-6 py-4">
        <p role="alert" className="mr-auto text-sm font-inter text-red-600">
          {error}
        </p>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-subtext-gray2/30 px-4 py-2 text-sm font-inter text-text-heading transition-colors hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary-blue px-5 py-2 text-sm font-medium font-inter text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
        >
          {saving && (
            <Icon
              icon="mdi:loading"
              className="animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          )}
          {saving ? "Saving..." : submitLabel}
        </button>
      </footer>
    </form>
  );
}
