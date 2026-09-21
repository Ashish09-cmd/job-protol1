"use client";
import { forwardRef, InputHTMLAttributes, useId, useState } from "react";
import { Icon } from "@iconify/react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    type = "text",
    id,
    className = "",
    containerClassName = "",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const message = error ?? hint;

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-regular font-manrope line-height-sm text-subtext-primary-color"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          aria-invalid={!!error}
          aria-describedby={message ? messageId : undefined}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-xs font-inter text-black placeholder:text-black/30 focus:outline-0  disabled:opacity-60 disabled:cursor-not-allowed ${
            error ? "border-red-600" : "border-[#DADADC]"
          } ${isPassword ? "pr-11" : ""} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
          >
            <Icon
              icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"}
              className="text-lg"
            />
          </button>
        )}
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

export default Input;
