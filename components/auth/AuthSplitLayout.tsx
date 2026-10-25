import type { ReactNode } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface AuthSplitLayoutProps {
  /** Picture for the left panel. Leave out to show `icon` instead. */
  imageSrc?: string;
  /** Iconify icon shown when there is no picture, for example "mdi:shield-lock-outline". */
  icon?: string;
  heading: string;
  /** Text under the heading. Can hold several paragraphs. */
  description: ReactNode;
  /** The right-hand side: headings and the form. It must contain the page's h1. */
  children: ReactNode;
}

/**
 * Blue panel on the left, form on the right.
 * Below `lg` the blue panel is hidden and the form fills the card.
 */
export default function AuthSplitLayout({
  imageSrc,
  icon,
  heading,
  description,
  children,
}: AuthSplitLayoutProps) {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl shadow-lg lg:grid-cols-2">
          <div className="hidden flex-col items-center justify-center gap-10 bg-primary-blue px-8.5 py-10 lg:flex">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                width={320}
                height={297}
                loading="eager"
                className="h-auto w-full max-w-[320px]"
              />
            ) : icon ? (
              <Icon
                icon={icon}
                aria-hidden="true"
                className="text-8xl text-white/90"
              />
            ) : null}
            <div className="flex flex-col gap-1.5 text-center">
              <p className="text-xl font-bold line-height-sm font-manrope text-white">
                {heading}
              </p>
              <div className="flex flex-col gap-3 text-xs font-regular font-inter line-height-sm text-white">
                {description}
              </div>
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
