import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import InitialsBadge from "@/components/ui/InitialsBadge";
import type { MasterProfile } from "@/lib/types/jobseeker-profile";
import ProfileCard, { CardAction } from "./Profilecard";

interface MasterProfileTabProps {
  profile: MasterProfile;
}

export default function MasterProfileTab({ profile }: MasterProfileTabProps) {
  const limitReached = profile.skills.length >= profile.skillLimit;

  // TODO: wire the Edit / Add buttons to your edit dialogs or pages.
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-6">
        <ProfileCard
          eyebrow="About"
          title="Summary"
          action={<CardAction label="Edit" ariaLabel="Edit summary" />}
        >
          {profile.summary ? (
            <p className="text-xs font-regular font-inter line-height-sm text-text-secondary-color">
              {profile.summary}
            </p>
          ) : (
            <p className="text-xs font-regular font-inter line-height-sm text-text-secondary-color ">
              No summary added yet.
            </p>
          )}
        </ProfileCard>

        <ProfileCard
          eyebrow="Work history"
          title="Experience"
          action={<CardAction label="Edit" ariaLabel="Edit experience" />}
        >
          {profile.experience.length === 0 ? (
            <p className="text-sm font-inter text-subtext-light">
              No experience added yet.
            </p>
          ) : (
            <ol role="list" className="flex flex-col">
              {profile.experience.map((item, index) => (
                <li
                  key={item.id}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {index < profile.experience.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[5px] top-4 h-full w-px bg-subtext-gray2/30"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-primary-blue bg-white"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold font-manrope text-text-heading">
                      {item.role}
                    </p>
                    <p className="text-sm font-inter text-text-secondary-color">
                      {item.company}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    <p className="text-vxs font-inter text-subtext-light">
                      {item.period}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-sm font-inter text-text-secondary-color">
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </ProfileCard>

        <ProfileCard
          eyebrow="Background"
          title="Education"
          action={<CardAction label="Edit" ariaLabel="Edit education" />}
        >
          {profile.education.length === 0 ? (
            <p className="text-sm font-inter text-subtext-light">
              No education added yet.
            </p>
          ) : (
            <ul role="list" className="flex flex-col gap-4">
              {profile.education.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <InitialsBadge name={item.institution} className="size-12" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold font-manrope text-text-heading">
                      {item.degree}
                    </p>
                    <p className="text-sm font-inter text-text-secondary-color">
                      {item.institution}
                    </p>
                    <p className="text-vxs font-inter text-subtext-light">
                      {item.period}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ProfileCard>
      </div>

      <div className="flex flex-col gap-6">
        <ProfileCard
          eyebrow="Your strengths"
          title="Skills"
          action={<CardAction label="Edit" ariaLabel="Edit skills" />}
        >
          {profile.skills.length === 0 ? (
            <p className="text-sm font-inter text-subtext-light">
              No skills added yet.
            </p>
          ) : (
            <ul role="list" className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-blue-50 px-3 py-1 text-vxs font-medium font-inter text-primary-blue"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
          {limitReached && (
            <p className="text-vxs font-inter text-subtext-light">
              Limit Reached. You can add up to {profile.skillLimit} skills.
            </p>
          )}
        </ProfileCard>

        <ProfileCard
          eyebrow="Credentials"
          title="Certifications"
          action={<CardAction label="Add" ariaLabel="Add a certification" />}
        >
          {profile.certifications.length === 0 ? (
            <p className="text-sm font-inter text-subtext-light">
              No certifications added yet.
            </p>
          ) : (
            <ul role="list" className="flex flex-col gap-3">
              {profile.certifications.map((item) => (
                <li key={item.id} className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold font-manrope text-text-heading">
                    {item.name}
                  </p>
                  <p className="text-vxs font-inter text-text-secondary-color">
                    {item.issuer}
                    {item.year ? ` · ${item.year}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </ProfileCard>

        <ProfileCard
          eyebrow="Contact"
          title="Contact details"
          action={<CardAction label="Edit" ariaLabel="Edit contact details" />}
        >
          <dl className="flex flex-col gap-4 text-sm font-inter">
            <ContactRow icon="mdi:email-outline" label="Email">
              {profile.contact.email || "—"}
            </ContactRow>
            <ContactRow icon="mdi:phone-outline" label="Phone">
              {profile.contact.phones.length > 0
                ? profile.contact.phones.map((phone) => (
                    <span key={phone} className="block">
                      {phone}
                    </span>
                  ))
                : "—"}
            </ContactRow>
            <ContactRow icon="mdi:map-marker-outline" label="Address">
              {profile.contact.address || "—"}
            </ContactRow>
          </dl>
        </ProfileCard>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        icon={icon}
        className="mt-0.5 text-lg text-subtext-light"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-0.5">
        <dt className="text-vvxs uppercase tracking-widest text-subtext-light">
          {label}
        </dt>
        <dd className="break-words text-text-heading">{children}</dd>
      </div>
    </div>
  );
}
