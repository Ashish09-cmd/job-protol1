"use client";
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: ReactNode; // can include links
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, id, className = "", ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? messageId : undefined}
          className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary-blue ${className}`}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="text-xs font-regular font-inter line-height-sm text-subtext-gray3 cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error && (
        <p
          id={messageId}
          role="alert"
          className="text-xs font-inter text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
