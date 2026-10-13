"use client";

import { useRef, type KeyboardEvent } from "react";

export interface SegmentOption<T extends string> {
  id: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the tab list. */
  label: string;
  /** Prefix for the tab ids, so a tab panel can point back with aria-labelledby. */
  idPrefix: string;
}

/** Full-width two-or-more segment switch that behaves as accessible tabs. */
export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  idPrefix,
}: SegmentedControlProps<T>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number;

    if (event.key === "ArrowRight") next = (index + 1) % options.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else return;

    event.preventDefault();
    onChange(options[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex rounded-md border border-[#E2E8EA] bg-white p-0.5"
    >
      {options.map((option, index) => {
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${option.id}`}
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex-1 cursor-pointer rounded px-3 py-2 text-vxs font-medium font-inter transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
              isActive
                ? "bg-primary-blue text-white"
                : "text-primary-blue hover:bg-primary-blue/5"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
