import { Icon } from "@iconify/react";

interface JobSectionProps {
  title: string;
  items: readonly string[];
}

/** A heading with a checklist, e.g. "Key Responsibilities". */
export default function JobSection({ title, items }: JobSectionProps) {
  const headingId = `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-5">
      <h2
        id={headingId}
        className="text-lg-sm font-semibold font-manrope text-text-heading"
      >
        {title}
      </h2>

      <ul role="list" className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm font-regular font-inter line-height-sm text-text-secondary-color"
          >
            <Icon
              icon="mdi:check"
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-lg text-primary-blue"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
