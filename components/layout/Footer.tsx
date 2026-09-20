import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

/**
 * STATIC SAMPLE DATA
 * Replace these with your real content. This mirrors the shape that
 * previously came from useGlobal() (general, contact_information,
 * footer_section) and siteConfig, so the JSX below needs no changes
 * beyond swapping these values.
 */
const STATIC_GENERAL = {
  detail:
    "Broadway Kids helps children build real-world tech skills through coding, robotics, and math enrichment programs taught by experienced instructors.",
  address: "Shree Ganesh Marg, Subidhanagar, Tinkune, Kathmandu 44600, Nepal",
};

const STATIC_CONTACT = {
  footer_phone_list_one: ["4102000"],
  footer_phone_list_two: ["9801234567"],
  whatsapp_viber: ["9801234567"],
  footer_email: ["info@broadwaykids.com"],
  facebook: "https://facebook.com/broadwaykids",
  instagram: "https://instagram.com/broadwaykids",
  youtube: "https://youtube.com/@broadwaykids",
  linkedin: "https://linkedin.com/company/broadwaykids",
  tiktok: "",
  whatsapp_link: "https://wa.me/9779801234567",
  viber_link: "",
  x: "",
};

const STATIC_FOOTER_SECTIONS = [
  {
    sections: [
      {
        title: "Company",
        menus: [
          { title: "About Us", url: "/about-us", target: "_self" },
          { title: "Our Team", url: "/our-team", target: "_self" },
          { title: "Our Courses", url: "/courses", target: "_self" },
          { title: "Enroll Now", url: "/enroll-now", target: "_self" },
          { title: "Contact Us", url: "/contact-us", target: "_self" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "Resources",
        menus: [
          { title: "Blog", url: "/blog", target: "_self" },
          { title: "Privacy Policy", url: "/privacy-policy", target: "_self" },
          {
            title: "Terms and Conditions",
            url: "/terms-conditions",
            target: "_self",
          },
        ],
      },
      {
        title: "Support",
        menus: [
          { title: "Help Center", url: "/help-center", target: "_self" },
          { title: "FAQs", url: "/faq", target: "_self" },
        ],
      },
    ],
  },
];

const STATIC_SITE_CONFIG = {
  footer_logo: "assets/images/logo-white.png",
  footer_logo_alt: "Broadway Kids",
};

const Footer = () => {
  const general = { content: STATIC_GENERAL };
  const contact_information = { content: STATIC_CONTACT };
  const footer_section = STATIC_FOOTER_SECTIONS;
  const siteConfig = STATIC_SITE_CONFIG;

  const footer_phone_list_one = STATIC_CONTACT.footer_phone_list_one;
  const footer_phone_list_two = STATIC_CONTACT.footer_phone_list_two;
  const whatsapp_viber = STATIC_CONTACT.whatsapp_viber;
  const footer_email = STATIC_CONTACT.footer_email;

  return (
    <>
      <footer className="footer-section">
        <div className="bg-[#212529] ">
          <div className="container section-padding ">
            <nav>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                <div className="md:col-span-4 ">
                  <div className="flex flex-col gap-6">
                    <Link href="/">
                      <img
                        src={"/footerlogo.png"}
                        alt={`${siteConfig.footer_logo_alt}`}
                        className="h-13.5"
                        loading="eager"
                      />
                    </Link>
                    <div>
                      {general.content.detail && (
                        <p className="text-sm font-regular mb-4 text-gray-300 line-height-sm">
                          {general.content.detail}
                        </p>
                      )}

                      <ul className="flex flex-col gap-5">
                        <li>
                          <Link
                            href=""
                            className="flex items-center gap-3 text-gray-300"
                          >
                            <div className="social-icon text-lg">
                              <Icon icon="typcn:location"></Icon>
                            </div>
                            <span>{general.content.address}</span>
                          </Link>
                        </li>

                        <li className="flex items-center gap-3">
                          {footer_phone_list_one.length > 0 && (
                            <div>
                              <Icon
                                icon="entypo:old-phone"
                                className="text-gray-300 text-lg "
                              />
                            </div>
                          )}

                          <div className="text-sm font-regular text-gray-300 ">
                            <div>
                              {footer_phone_list_one.map((phone, index) => {
                                const telHref = `+977-1-${phone.replace(/^\+977-1-/, "")}`;
                                return (
                                  <span key={phone}>
                                    <Link
                                      href={`tel:${telHref}`}
                                      className="text-sm font-regular text-gray-300"
                                    >
                                      {phone}
                                    </Link>
                                    {index !==
                                      footer_phone_list_one.length - 1 && (
                                      <span> / </span>
                                    )}
                                  </span>
                                );
                              })}
                            </div>

                            <div>
                              {footer_phone_list_two.map((phone, index) => {
                                const mobileHref = `+977-${phone.replace(/^\+977-/, "")}`;
                                return (
                                  <span key={phone}>
                                    <Link
                                      href={`tel:${mobileHref}`}
                                      className="text-sm font-regular text-gray-300"
                                    >
                                      {phone}
                                    </Link>
                                    {index !==
                                      footer_phone_list_two.length - 1 && (
                                      <span> / </span>
                                    )}
                                  </span>
                                );
                              })}
                            </div>

                            <div>
                              {whatsapp_viber.map((phone, index) => (
                                <span key={phone}>
                                  <Link
                                    href={`tel:${phone}`}
                                    className="text-sm font-regular text-gray-300"
                                  >
                                    {phone}
                                  </Link>
                                  {index !== whatsapp_viber.length - 1 && (
                                    <span> / </span>
                                  )}
                                  (WhatsApp/Viber)
                                </span>
                              ))}
                            </div>
                          </div>
                        </li>
                        <li className="flex items-center gap-3">
                          {footer_email.length > 0 && (
                            <div>
                              <Icon
                                icon="ic:round-email"
                                className="text-gray-300 text-lg"
                              />
                            </div>
                          )}

                          <div>
                            {footer_email.map((email, index) => (
                              <span key={email}>
                                <Link
                                  href={`mailto:${email}`}
                                  className="text-sm text-gray-300 font-regular"
                                >
                                  {email}
                                </Link>
                                {index !== footer_email.length - 1 && (
                                  <span className="text-gray-300"> / </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                    <div className="flex flex-col col-span-4 gap-2">
                      {footer_section[0]?.sections?.map((section, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <h3 className="text-lg text-white font-bold font-baloo2 line-height-lg">
                            {section.title}
                          </h3>

                          <ul className="flex flex-col gap-2">
                            {section.menus?.map((menu, menuIndex) => (
                              <li key={menuIndex}>
                                <Link
                                  href={menu.url}
                                  target={menu.target}
                                  className="text-white font-regular text-sm"
                                >
                                  {menu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col col-span-3 gap-6">
                      {footer_section[1]?.sections?.map((section, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <h3 className="text-lg text-white font-bold font-baloo2 line-height-lg">
                            {section.title}
                          </h3>

                          <ul className="flex flex-col gap-2">
                            {section.menus?.map((menu, menuIndex) => (
                              <li key={menuIndex}>
                                <Link
                                  href={menu.url}
                                  target={menu.target}
                                  className="text-white font-regular text-sm"
                                >
                                  {menu.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                 
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="sub-footer bg-[#191C1F80]">
            <div className="container py-8">
              <p className="text-xs font-medium line-height-xs text-white text-center">
                A product of Broadway Infosys. © 2026 Broadway Kids. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
