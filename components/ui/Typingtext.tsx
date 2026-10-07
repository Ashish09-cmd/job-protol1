"use client";

import {
  useTypewriter,
  type UseTypewriterOptions,
} from "@/hooks/useTypewriter";

interface TypingTextProps extends UseTypewriterOptions {
  /** Words to cycle through. Use a stable reference (module-level constant). */
  words: readonly string[];
  className?: string;
}

// Zero-width space keeps the line height when the text is momentarily empty,
// which prevents the heading from jumping vertically.
const ZERO_WIDTH_SPACE = "\u200B";

export default function TypingText({
  words,
  className,
  ...options
}: TypingTextProps) {
  const { text, isIdle } = useTypewriter(words, options);

  return (
    <span className={className}>
      {/* Screen readers get a stable label instead of every keystroke. */}
      <span className="sr-only">{words[0]}</span>

      <span aria-hidden="true">
        {text || ZERO_WIDTH_SPACE}
        <span
          className={`ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] rounded-[1px] bg-current ${
            isIdle ? "motion-safe:animate-pulse" : ""
          }`}
        />
      </span>
    </span>
  );
}
