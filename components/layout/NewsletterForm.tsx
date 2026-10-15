"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, NewsletterValues } from "@/lib/validation/newsletter";
import { subscribeToNewsletter } from "@/lib/data/newsletter";

type Status = "idle" | "success" | "error";

const INPUT_BASE =
  "h-10 w-full rounded-md border bg-white/10 px-4 text-vxs font-regular font-inter text-white outline-none transition-colors placeholder:text-white/60 focus:border-primary-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue";

export default function NewsletterForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { fullName: "", email: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: NewsletterValues) => {
    setStatus("idle");
    try {
      await subscribeToNewsletter(values);
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const nameErrorId = `${id}-name-error`;
  const emailErrorId = `${id}-email-error`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Subscribe to job updates"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2 5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-name`} className="sr-only">
            Full name
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            placeholder="Your Full Name..."
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? nameErrorId : undefined}
            className={`${INPUT_BASE} ${
              errors.fullName ? "border-red-400" : "border-transparent"
            }`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p
              id={nameErrorId}
              role="alert"
              className="text-vvxs font-regular font-inter text-red-300"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="Your Email Address..."
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? emailErrorId : undefined}
            className={`${INPUT_BASE} ${
              errors.email ? "border-red-400" : "border-transparent"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p
              id={emailErrorId}
              role="alert"
              className="text-vvxs font-regular font-inter text-red-300"
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 cursor-pointer rounded-md bg-primary-blue px-5 py-2.5 text-xs font-medium font-inter text-white transition-colors hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Subscribing…" : "Subscribe Now"}
        </button>

        {/* Always in the page so screen readers announce the result. */}
        <p
          role="status"
          aria-live="polite"
          className={`text-vxs font-regular font-inter ${
            status === "error" ? "text-red-300" : "text-green-300"
          }`}
        >
          {status === "success" &&
            "Thanks for subscribing! Watch your inbox for new jobs."}
          {status === "error" && "Something went wrong. Please try again."}
        </p>
      </div>
    </form>
  );
}
