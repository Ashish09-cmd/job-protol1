"use client";
import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface OtpInputProps {
  length?: number;
  /** Called on every change with the digits typed so far ("" to `length` digits). */
  onChange: (code: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  /** id of the element that describes the error, for screen readers. */
  describedBy?: string;
  autoFocus?: boolean;
}

/**
 * One box per digit. Numbers only. Supports typing, Backspace, arrow keys,
 * paste, and the one-time-code autofill on phones.
 * To clear it from outside, change its `key`.
 */
export default function OtpInput({
  length = 6,
  onChange,
  disabled = false,
  hasError = false,
  describedBy,
  autoFocus = true,
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length }, () => ""),
  );
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const commit = (next: string[]) => {
    setDigits(next);
    onChange(next.join(""));
  };

  const focusAt = (index: number) => {
    refs.current[Math.max(0, Math.min(length - 1, index))]?.focus();
  };

  /** Fills boxes from `start` with the digits found in `raw` (paste, autofill). */
  const fillFrom = (start: number, raw: string) => {
    const incoming = raw
      .replace(/\D/g, "")
      .slice(0, length - start)
      .split("");
    if (incoming.length === 0) return;

    const next = [...digits];
    incoming.forEach((digit, offset) => {
      next[start + offset] = digit;
    });
    commit(next);
    focusAt(start + incoming.length);
  };

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const typed = event.target.value.replace(/\D/g, "");

    if (event.target.value === "") {
      const next = [...digits];
      next[index] = "";
      commit(next);
      return;
    }
    if (typed === "") return; // a letter or symbol: ignore it

    // Several digits into an empty box: autofill or paste on some browsers.
    if (typed.length > 1 && digits[index] === "") {
      fillFrom(index, typed);
      return;
    }

    // Typing over a filled box: keep the newest digit.
    const next = [...digits];
    next[index] = typed.slice(-1);
    commit(next);
    focusAt(index + 1);
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && digits[index] === "" && index > 0) {
      event.preventDefault();
      const next = [...digits];
      next[index - 1] = "";
      commit(next);
      focusAt(index - 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAt(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    fillFrom(index, event.clipboardData.getData("text"));
  };

  return (
    <div
      role="group"
      aria-label={`${length}-digit verification code`}
      aria-describedby={describedBy}
      className="flex items-center justify-center gap-2 sm:gap-3"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={hasError}
          value={digit}
          disabled={disabled}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          className={`size-11 rounded-lg border bg-white text-center text-lg font-inter text-black focus:border-primary-blue focus:outline-0 focus:ring-2 focus:ring-primary-blue/20 disabled:cursor-not-allowed disabled:opacity-60 sm:size-12 ${
            hasError ? "border-red-600" : "border-[#DADADC]"
          }`}
        />
      ))}
    </div>
  );
}
