import { Icon } from "@iconify/react";
import type { SaveStatus } from "@/hooks/useSettingsForm";

interface SettingsActionsProps {
  dirty: boolean;
  status: SaveStatus;
  onDiscard: () => void;
}

/** Discard + Save buttons. Save is a submit button, so put it inside a <form>. */
export default function SettingsActions({
  dirty,
  status,
  onDiscard,
}: SettingsActionsProps) {
  const saving = status === "saving";

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <p
        role="status"
        className={`mr-auto text-sm font-inter ${
          status === "error" ? "text-red-600" : "text-text-secondary-color"
        }`}
      >
        {status === "saved" && "Settings saved."}
        {status === "error" && "Could not save your settings. Try again."}
      </p>

      <button
        type="button"
        onClick={onDiscard}
        disabled={!dirty || saving}
        className="rounded-md border border-subtext-gray2/30 bg-white px-5 py-2.5 text-sm font-medium font-inter text-text-heading transition-colors hover:bg-blue-50/60 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        Discard Changes
      </button>
      <button
        type="submit"
        disabled={!dirty || saving}
        className="inline-flex items-center gap-2 rounded-md bg-[#566074] px-5 py-2.5 text-sm font-medium font-inter text-white transition-colors enabled:hover:bg-primary-blue disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        <Icon
          icon={saving ? "mdi:loading" : "mdi:content-save-outline"}
          className={saving ? "animate-spin motion-reduce:animate-none" : ""}
          aria-hidden="true"
        />
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
