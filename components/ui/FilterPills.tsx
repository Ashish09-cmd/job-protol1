"use client";

import { useRef, type KeyboardEvent } from "react";

export interface PillOption<T extends string> {
  id: T;
  label: string;
}

interface FilterPillsProps<T extends string> {
  options: readonly PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the tab list. */
  label: string;
  /** Prefix for tab ids, so the tab panel can point back with aria-labelledby. */
  idPrefix: string;
}

/** Row of pill-shaped tabs. Scrolls sideways on small screens instead of wrapping. */
export default function FilterPills<T extends string>({
  options,
  value,
  onChange,
  label,
  idPrefix,
}: FilterPillsProps<T>) {
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
      // The small padding keeps the focus outline from being clipped by the scroll area.
      className="-m-1 flex gap-3 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-vxs font-semibold font-inter transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
              isActive
                ? "border-text-heading bg-text-heading text-white"
                : "border-subtext-gray2/50 bg-white text-subtext-primary-color hover:border-primary-blue/40 hover:text-primary-blue"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
