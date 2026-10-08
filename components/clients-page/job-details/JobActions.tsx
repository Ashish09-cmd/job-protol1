"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface JobActionsProps {
  title: string;
  applyHref: string;
  isSaved: boolean;
  onToggleSave: () => void;
  /** "compact" shows icon-only Save, used in the sticky bar. */
  variant?: "full" | "compact";
}

const OUTLINE_BUTTON =
  "flex h-10 items-center justify-center rounded-md border border-text-heading/70 text-text-heading transition-colors hover:bg-primary-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue cursor-pointer";

export default function JobActions({
  title,
  applyHref,
  isSaved,
  onToggleSave,
  variant = "full",
}: JobActionsProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Uses the native share sheet when available, otherwise copies the link.
  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // The person cancelled sharing, or the clipboard is blocked: nothing to do.
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-4">
      <Link
        href={applyHref}
        className="flex h-10 items-center rounded-md bg-primary-blue px-5 text-sm font-medium font-inter text-white transition-colors hover:bg-primary-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        Apply Now
      </Link>

      <button
        type="button"
        onClick={onToggleSave}
        aria-pressed={isSaved}
        aria-label={variant === "compact" ? "Save for later" : undefined}
        className={`${OUTLINE_BUTTON} ${
          variant === "compact"
            ? "w-10"
            : "gap-2 px-5 text-sm font-regular font-inter"
        }`}
      >
        <Icon
          icon={isSaved ? "mdi:bookmark" : "mdi:bookmark-outline"}
          className={isSaved ? "text-primary-blue" : ""}
        />
        {variant === "full" && (isSaved ? "Saved" : "Save For Later")}
      </button>

      <button
        type="button"
        onClick={handleShare}
        aria-label="Share this job"
        title={isCopied ? "Link copied" : "Share"}
        className={`${OUTLINE_BUTTON} w-10`}
      >
        <Icon icon={isCopied ? "mdi:check" : "mdi:share-variant-outline"} />
      </button>

      <span className="sr-only" role="status">
        {isCopied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
