import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import NewsletterForm from "@/components/layout/NewsletterForm";
import {
  FOOTER_ABOUT,
  FOOTER_CONTACT,
  FOOTER_LINK_GROUPS,
} from "@/lib/constants/footer";
import { siteConfig } from "@/lib/config/site";

const LINK_CLASSES =
  "text-xs font-regular font-inter text-white/80 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Footer() {
  const { address, phonePrefix, phones, email } = FOOTER_CONTACT;

  return (
    <footer className="bg-[#212529]">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:pt-14">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.85fr))_minmax(0,1.5fr)]">
          {/* Brand, description and contact details */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <Link href={"/"} className="logo cursor-pointer">
                  <img
                    src={`${siteConfig.footer_logo}`}
                    alt={`${siteConfig.footer_logo_alt}`}
                    loading="eager"
                  />
            </Link>

            <div className="flex flex-col gap-5">
              <p className="text-xs font-regular font-manrope text-white/90 line-height-sm">
                {FOOTER_ABOUT} 
              </p>

              <ul
                role="list"
                className="flex flex-col gap-4 text-xs font-regular font-inter text-white/90"
              >
                <li className="flex items-start gap-3">
                  <Icon
                    icon="mdi:map-marker"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-lg"
                  />
                  <address className="not-italic">{address}</address>
                </li>

                <li className="flex items-start gap-3">
                  <Icon
                    icon="entypo:old-phone"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-lg"
                  />
                  <span>
                    {phones.map((phone, index) => (
                      <span key={phone}>
                        {index > 0 && " / "}
                        <a
                          href={`tel:${phonePrefix}${phone}`}
                          className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {index === 0 ? `${phonePrefix}${phone}` : phone}
                        </a>
                      </span>
                    ))}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Icon
                    icon="ic:round-email"
                    aria-hidden="true"
                    className="shrink-0 text-lg"
                  />
                  <a
                    href={`mailto:${email}`}
                    className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINK_GROUPS.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="flex flex-col gap-4 lg:pt-[78px]"
            >
              <h2 className="text-sm font-semibold font-manrope text-white">
                {group.title}
              </h2>
              <ul role="list" className="flex flex-col gap-3.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK_CLASSES}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <section
            aria-labelledby="footer-newsletter"
            className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1 lg:pt-[78px]"
          >
            <h2
              id="footer-newsletter"
              className="text-sm font-semibold font-manrope text-white"
            >
              Stay in the Loop: Subscribe to our new job offers &amp; Updates!
            </h2>
            <NewsletterForm />
          </section>
        </div>

        <div className="mt-10 border-t border-white/10 py-8 lg:mt-12">
          <p className="text-center text-xs font-regular font-inter text-white/60">
            A product of Broadway Infosys. © {new Date().getFullYear()}.
            Broadway Jobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
