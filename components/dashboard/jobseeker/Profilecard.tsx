import type { ReactNode } from "react";

interface ProfileCardProps {
  eyebrow: string;
  title: string;
  /** Right side of the header, usually an Edit or Add button. */
  action?: ReactNode;
  children: ReactNode;
}

/** Bordered card with a small eyebrow, a title and an optional action. */
export default function ProfileCard({
  eyebrow,
  title,
  action,
  children,
}: ProfileCardProps) {
  return (
    <section
      aria-label={title}
      className="p-6 rounded-xl bg-white flex flex-col gap-2.5 border border-[#E2E2E2]"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-vvxs line-height-sm font-semibold font-manrope text-subtext-gray1 uppercase tracking-widest">
            {eyebrow}
          </p>
          <h2 className="text-sm font-bold line-height-2xl text-text-heading font-manrope ">
            {title}
          </h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

interface CardActionProps {
  label: string;
  /** Accessible name, e.g. "Edit summary". */
  ariaLabel: string;
  onClick?: () => void;
}

export function CardAction({ label, ariaLabel, onClick }: CardActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="shrink-0 rounded-md px-2 py-1 text-vxs font-medium font-inter text-primary-blue hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
    >
      {label}
    </button>
  );
}
