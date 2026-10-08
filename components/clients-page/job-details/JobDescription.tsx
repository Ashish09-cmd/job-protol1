"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@iconify/react";

/** Height (px) shown before "Read more" is clicked. */
const COLLAPSED_HEIGHT = 160;

interface JobDescriptionProps {
  paragraphs: readonly string[];
}

export default function JobDescription({ paragraphs }: JobDescriptionProps) {
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [fullHeight, setFullHeight] = useState(COLLAPSED_HEIGHT);

  // Measure the full text height so "Read more" only appears when needed
  // and the expand animation ends at the exact height.
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const measure = () => {
      setFullHeight(element.scrollHeight);
      setIsOverflowing(element.scrollHeight > COLLAPSED_HEIGHT + 8);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [paragraphs]);

  return (
    <div className="flex flex-col gap-4">
      {/* The full text is always in the HTML (good for SEO); it is only clipped visually. */}
      <div className="relative">
        <div
          id={contentId}
          ref={contentRef}
          style={{ maxHeight: isExpanded ? fullHeight : COLLAPSED_HEIGHT }}
          className="flex flex-col gap-5 overflow-hidden transition-[max-height] duration-300 ease-in-out motion-reduce:transition-none"
        >
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm font-regular font-inter line-height-sm text-text-secondary-color"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {isOverflowing && !isExpanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,#ffffff,rgba(255,255,255,0))]"
          />
        )}
      </div>

      {isOverflowing && (
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="flex w-fit cursor-pointer items-center gap-1.5 text-sm font-medium font-inter uppercase text-primary-blue hover:underline"
        >
          {isExpanded ? "Read less" : "Read more"}
          <Icon
            icon="mdi:chevron-down"
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
}
