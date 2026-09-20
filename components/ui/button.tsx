import { ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md cursor-pointer font-regular transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue disabled:opacity-60 disabled:cursor-not-allowed";

// To add a variant, add one line here. The Variant type updates automatically.
const variants = {
  primary: "bg-primary-blue text-white hover:opacity-90",
  secondary: "bg-[#F2F6FC] text-primary-blue hover:bg-[#E4ECF9]",
  outline:
    "border border-primary-blue text-primary-blue bg-transparent hover:bg-[#F2F6FC]",
  ghost: "bg-transparent text-primary-blue hover:bg-[#F2F6FC]",
  white: "bg-white text-primary-blue hover:bg-white/90", // for use on the blue panel
  danger: "bg-red-600 text-white hover:bg-red-700",
  neutral: "border border-[#DADADC] bg-white text-black/60 hover:bg-[#F2F6FC]",
  link: "bg-transparent text-primary-blue underline underline-offset-4 hover:opacity-80 !px-0 !py-0",
} satisfies Record<string, string>;

const sizes = {
  sm: "py-2 px-4 text-xs",
  md: "py-3 px-4 text-sm",
  lg: "py-4 px-6 text-base",
} satisfies Record<string, string>;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}

/** Use this on <Link> too, so links styled as buttons match exactly. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: StyleOptions = {}) {
  return [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, StyleOptions {
  loading?: boolean;
}

export default function Button({
  variant,
  size,
  fullWidth,
  className,
  loading = false,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
