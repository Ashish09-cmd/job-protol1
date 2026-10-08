import {
  HOW_IT_WORKS_TABS,
  type HowItWorksTab,
} from "@/lib/constants/how-it-works";
import HowWorksTabs from "./partials/HowWorksTabs";

/** schema.org HowTo data, built from the same content shown on the page. */
function buildHowToSchema(tab: HowItWorksTab) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tab.schemaName,
    step: tab.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export default function HowWorks() {
  const structuredData = JSON.stringify(
    HOW_IT_WORKS_TABS.map(buildHowToSchema),
  ).replace(/</g, "\\u003c"); // prevents "</script>" from breaking out of the tag

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-blue-50/40"
    >
      <div className="max-w-7xl py-8 mx-auto flex flex-col gap-6">
        <div className="flex flex-col max-w-3xl text-center mx-auto gap-4">
          <h2
            id="how-it-works-heading"
            className="font-bold text-lg-xl line-height-2xl font-manrope"
          >
            How it <span className="text-primary-blue">works</span>
          </h2>
          <p className="text-sm font-regular font-inter text-text-secondary-color line-height-sm">
            Whether you&apos;re looking for your next opportunity or your next
            great hire, Broadway keeps the whole journey in one place.
          </p>
        </div>

        <HowWorksTabs tabs={HOW_IT_WORKS_TABS} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </section>
  );
}
