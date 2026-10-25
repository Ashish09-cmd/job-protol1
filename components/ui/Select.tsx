"use client";
import { forwardRef, SelectHTMLAttributes, useId } from "react";
import { Icon } from "@iconify/react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: readonly string[];
  /** Text of the empty first option, for example "Select organization size". */
  emptyLabel: string;
  containerClassName?: string;
}

/** Same look as Input, for a list of choices. Works with react-hook-form's register(). */
const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    hint,
    options,
    emptyLabel,
    id,
    className = "",
    containerClassName = "",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;
  const message = error ?? hint;

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-regular font-manrope line-height-sm text-subtext-primary-color"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* "required" only drives the grey placeholder colour (invalid:). The form uses noValidate. */}
        <select
          ref={ref}
          id={selectId}
          required
          aria-invalid={!!error}
          aria-describedby={message ? messageId : undefined}
          className={`w-full appearance-none rounded-lg border bg-white py-2 pl-3 pr-10 text-xs font-inter text-black invalid:text-black/30 focus:border-primary-blue focus:outline-0 disabled:cursor-not-allowed disabled:opacity-60 ${
            error ? "border-red-600" : "border-[#DADADC]"
          } ${className}`}
          {...props}
        >
          <option value="">{emptyLabel}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
        <Icon
          icon="mdi:chevron-down"
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-black/60"
        />
      </div>

      {message && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={`text-xs font-inter ${
            error ? "text-red-600" : "text-black/50"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
});

export default Select;
