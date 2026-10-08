"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { SORT_OPTIONS, SortOptionId } from "@/lib/constants/job-filters";

interface SortDropdownProps {
  value: SortOptionId;
  onChange: (value: SortOptionId) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Close on outside click or Escape while the menu is open.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className="flex cursor-pointer items-center gap-1.5 py-2 text-sm font-regular font-inter text-text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
      >
        Sort by
        <Icon
          icon="mdi:chevron-down"
          className={`text-base transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label="Sort vacancies"
          className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-subtext-gray2/30 bg-white py-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.id === value;

            return (
              <button
                key={option.id}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                  buttonRef.current?.focus();
                }}
                className={`flex w-full cursor-pointer items-center justify-between px-4 py-2 text-left text-vxs font-inter transition-colors hover:bg-primary-blue/5 ${
                  isSelected
                    ? "font-semibold text-primary-blue"
                    : "font-regular text-text-heading"
                }`}
              >
                {option.label}
                {isSelected && <Icon icon="mdi:check" className="text-base" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
