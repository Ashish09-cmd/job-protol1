import { ButtonProps, buttonStyles } from "./Button.contract";

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
