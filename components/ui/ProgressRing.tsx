interface ProgressRingProps {
  /** 0 - 100 */
  value: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressRing({
  value,
  size = 56,
  strokeWidth = 5,
}: ProgressRingProps) {
  const percent = Math.min(Math.max(Math.round(value), 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div
      role="img"
      aria-label={`${percent}% complete`}
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-primary-blue/15"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary-blue transition-[stroke-dashoffset] duration-700 motion-reduce:transition-none"
        />
      </svg>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center text-vvxs font-bold font-inter text-text-heading"
      >
        {percent}%
      </span>
    </div>
  );
}
