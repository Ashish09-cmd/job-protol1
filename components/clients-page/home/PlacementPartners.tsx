import LogoMarquee from "@/components/ui/LogoMarquee";
import {
  PARTNERS_ROW_ONE,
  PARTNERS_ROW_TWO,
} from "@/lib/constants/placement-partners";

export default function PlacementPartners() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-8 flex flex-col gap-8.5 text-center">
        <div className="flex flex-col max-w-4xl mx-auto gap-4">
          <h3 className="font-bold text-md line-height-2xl font-manrope">
            TRUSTED BY{" "}
            <span className="text-primary-blue">INDUSTRY LEADERS</span>
          </h3>
          <p className="text-sm font-regular font-inter text-text-secondary-color line-height-sm">
            Businesses across Nepal and International brands trust Theme Nepal
            for professional web development, SEO, digital marketing, branding,
            and software solutions designed to increase visibility, and business
            growth.
          </p>
        </div>

        <div className="flex flex-col gap-10.5">
          {/* First row: 9 visible (7 clear), right to left */}
          <LogoMarquee
            label="Placement partners, first row"
            logos={PARTNERS_ROW_ONE}
            visibleCount={9}
            direction="left"
          />

          {/* Second row: 8 visible (6 clear), left to right */}
          <LogoMarquee
            label="Placement partners, second row"
            logos={PARTNERS_ROW_TWO}
            visibleCount={8}
            direction="right"
          />
        </div>
      </div>
    </section>
  );
}
