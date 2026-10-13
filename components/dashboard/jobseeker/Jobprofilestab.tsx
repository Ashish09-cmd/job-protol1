import { Icon } from "@iconify/react";
import type { JobProfile } from "@/lib/types/jobseeker-profile";

interface JobProfilesTabProps {
  profiles: JobProfile[];
}

const MAX_JOB_PROFILES =3; 

const buttonBase =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-vxs font-medium font-inter transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue";

export default function JobProfilesTab({ profiles }: JobProfilesTabProps) {
  const visibleProfile = profiles.slice(0, MAX_JOB_PROFILES);
  const canCreateProfile = profiles.length < MAX_JOB_PROFILES;
  // TODO: wire Edit Profile, Set Default and Create to your API / routes.
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-10.5 md:grid-cols-2 xl:grid-cols-3"
    >
      {visibleProfile.map((profile) => (
        <li
          key={profile.id}
          className="py-4 px-3.5 bg-white shadow-sm flex flex-col gap-4 rounded-lg"
        >
          <div className="flex flex-col gap-4  pb-5 border-b border-b-subtext-gray2/30">
            <div className=" flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xs font-bold font-manrope line-height-2xl text-text-heading">
                  {profile.title}
                </h3>
                {profile.isPrimary && (
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-vvxs font-medium font-inter text-primary-blue">
                    Primary
                  </span>
                )}
              </div>

              <p className="text-vxs font-regular font-inter line-height-sm text-text-secondary-color">
                {profile.summary}
              </p>
            </div>

            <ul role="list" className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li
                  key={skill}
                  className="py-1 px-2.5 rounded-xl bg-separator1 text-vvxs font-medium line-height-sm text-primary-blue font-manrope "
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex gap-2 ">
            <button
              type="button"
              aria-label={`Edit ${profile.title} profile`}
              className={`${buttonBase} w-full bg-primary-blue text-white hover:opacity-90`}
            >
              Edit Profile
            </button>
            {!profile.isPrimary && (
              <button
                type="button"
                aria-label={`Set ${profile.title} as default profile`}
                className={`${buttonBase} border w-full border-subtext-gray2/30 text-text-heading hover:bg-blue-50/60`}
              >
                Set Default
              </button>
            )}
          </div>
        </li>
      ))}

      {canCreateProfile && (
        <li>
          <button
            type="button"
            className="flex h-full min-h-48 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-subtext-gray2/30 p-5 text-sm font-medium font-inter text-primary-blue transition-colors hover:bg-blue-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
          >
            <Icon icon="mdi:plus" className="text-2xl" aria-hidden="true" />
            Create a new job profile
          </button>
        </li>
      )}
    </ul>
  );
}
