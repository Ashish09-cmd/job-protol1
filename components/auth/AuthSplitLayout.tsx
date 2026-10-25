import type { ReactNode } from "react";
import Image from "next/image";

interface AuthSplitLayoutProps {
  imageSrc: string;
  heading: string;
  description: string;
  /** The right-hand side: headings and the form. It must contain the page's h1. */
  children: ReactNode;
}

/**
 * Blue picture panel on the left, form on the right.
 * Below `lg` the picture panel is hidden and the form fills the card.
 */
export default function AuthSplitLayout({
  imageSrc,
  heading,
  description,
  children,
}: AuthSplitLayoutProps) {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl shadow-lg lg:grid-cols-2">
          <div className="hidden flex-col items-center justify-center gap-10 bg-primary-blue px-8.5 py-10 lg:flex">
            <Image
              src={imageSrc}
              alt=""
              width={320}
              height={297}
              loading="eager"
              className="h-auto w-full max-w-[320px]"
            />
            <div className="flex flex-col gap-1.5 text-center">
              <p className="text-xl font-bold line-height-sm font-manrope text-white">
                {heading}
              </p>
              <p className="text-xs font-regular font-inter line-height-sm text-white">
                {description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-7 bg-white px-5 py-8 sm:px-8.5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
