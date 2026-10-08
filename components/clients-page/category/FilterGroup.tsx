"use client";

import { FilterOption } from "@/lib/constants/job-filters";
import { useState } from "react";

interface FilterGroupProps {
  title: string;
  options: readonly FilterOption[];
  columns: 1 | 2;
  /** Show only this many options until "show more" is clicked. */
  initialVisible?: number;
  selectedIds: readonly string[];
  onToggle: (optionId: string) => void;
}

export default function FilterGroup({
  title,
  options,
  columns,
  initialVisible,
  selectedIds,
  onToggle,
}: FilterGroupProps) {
  const [showAll, setShowAll] = useState(false);

  const isCollapsible =
    initialVisible !== undefined && options.length > initialVisible;
  const visibleOptions =
    isCollapsible && !showAll ? options.slice(0, initialVisible) : options;

  return (
    <fieldset className="min-w-0 py-6 first:pt-0 last:pb-0">
      <legend className="mb-4 p-0 text-sm font-semibold font-manrope text-text-heading">
        {title}
      </legend>

      <div
        className={`grid gap-x-4 gap-y-3.5 ${
          columns === 2 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {visibleOptions.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-2 text-vxs font-regular font-inter text-text-secondary-color"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(option.id)}
              onChange={() => onToggle(option.id)}
              className="size-4 shrink-0 cursor-pointer rounded accent-primary-blue"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {isCollapsible && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          className="mt-4 cursor-pointer text-vxs font-medium font-inter text-primary-blue hover:underline"
        >
          {showAll ? "show less" : "show more"}
        </button>
      )}
    </fieldset>
  );
}
