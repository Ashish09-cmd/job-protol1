interface StepCardProps {
  /** 1-based step number, displayed as "01", "02", ... */
  stepNumber: number;
  title: string;
  description: string;
}

/**
 * A single numbered step. Render it inside an <li> of an <ol>
 * so the order of the steps is available to search engines and screen readers.
 */
export default function StepCard({
  stepNumber,
  title,
  description,
}: StepCardProps) {
  return (
    <li className="py-6 px-4 bg-white rounded-md border border-separator4">
      <article className="flex flex-col gap-3.5 items-center text-center">
        {/* Decorative: the surrounding <ol> already conveys the order. */}
        <span
          aria-hidden="true"
          className="text-lg-sm font-bold line-height-2xl text-primary-blue font-manrope"
        >
          {String(stepNumber).padStart(2, "0")}
        </span>
        <h3 className="text-md font-semibold font-inter text-subtext-primary-color line-height-2xl">
          {title}
        </h3>
        <p className="text-xs font-regular line-height-sm text-subtext-light font-inter">
          {description}
        </p>
      </article>
    </li>
  );
}
