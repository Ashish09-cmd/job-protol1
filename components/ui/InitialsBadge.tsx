interface InitialsBadgeProps {
  name: string;
  logoUrl?: string;
  shape?: "circle" | "square";
  /** Tailwind size classes, e.g. "size-12". */
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Logo when there is one, otherwise the initials of the name. Decorative. */
export default function InitialsBadge({
  name,
  logoUrl,
  shape = "square",
  className = "size-12",
}: InitialsBadgeProps) {
  const radius = shape === "circle" ? "rounded-full" : "rounded-lg";

  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt=""
        className={`${className} ${radius} shrink-0 border border-subtext-gray2/30 bg-white object-contain`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} ${radius} inline-flex shrink-0 items-center justify-center bg-blue-50 text-sm font-semibold font-manrope text-primary-blue`}
    >
      {getInitials(name)}
    </span>
  );
}
