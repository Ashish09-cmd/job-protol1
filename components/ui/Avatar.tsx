interface AvatarProps {
  /** Used for the initials fallback. Put the visible name next to the avatar. */
  name: string;
  src?: string;
  /** "circle" for people (photo), "square" for company logos. */
  shape?: "circle" | "square";
  /** Size and extra classes, e.g. "size-10". */
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export default function Avatar({
  name,
  src,
  shape = "circle",
  className = "size-10",
}: AvatarProps) {
  const isSquare = shape === "square";

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-blue-50 text-vxs font-semibold font-manrope text-primary-blue ${
        isSquare ? "rounded border border-[#aeaeb243] bg-white" : "rounded-full"
      } ${className}`}
    >
      {src ? (
        // The name is always shown next to the avatar, so the image is decorative.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className={`h-full w-full ${isSquare ? "object-contain p-1" : "object-cover"}`}
        />
      ) : (
        <span aria-hidden="true">
          {isSquare ? name.charAt(0) : getInitials(name)}
        </span>
      )}
    </span>
  );
}
