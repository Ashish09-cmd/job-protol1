"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import StepCard from "@/components/ui/StepCard";
import type { HowItWorksTab } from "@/lib/constants/how-it-works";

interface HowWorksTabsProps {
  tabs: readonly HowItWorksTab[];
}

export default function HowWorksTabs({ tabs }: HowWorksTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys / Home / End move between tabs (standard tabs keyboard pattern).
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveId(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {/* Tab buttons */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Choose your journey"
          className="inline-flex rounded-full border border-[#E2E8EA] bg-white"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeId;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`how-it-works-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`how-it-works-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`rounded-3xl px-6 py-2 text-sm font-semibold font-inter line-height-sm cursor-pointer transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue ${
                  isActive
                    ? "bg-primary-blue text-white"
                    : "text-primary-blue hover:bg-primary-blue/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`how-it-works-panel-${tab.id}`}
              aria-labelledby={`how-it-works-tab-${tab.id}`}
              className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${
                isActive ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <ol
                role="list"
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
              >
                {tab.steps.map((step, index) => (
                  <li key={step.title}>
                    <StepCard
                      stepNumber={index + 1}
                      title={step.title}
                      description={step.description}
                    />
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
