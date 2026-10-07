import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./LogoMarquee.module.css";

export interface MarqueeLogo {
  name: string;
  src: string;
}

interface LogoMarqueeProps {
  logos: readonly MarqueeLogo[];
  /** Logos visible at once on large screens. The first and last one are faded. */
  visibleCount: number;
  /** Direction the logos travel. "left" = right to left, "right" = left to right. */
  direction?: "left" | "right";
  /** Lower = faster. Keeps the speed consistent between rows of different sizes. */
  secondsPerLogo?: number;
  /** Accessible name for the row. */
  label: string;
}

export default function LogoMarquee({
  logos,
  visibleCount,
  direction = "left",
  secondsPerLogo = 3,
  label,
}: LogoMarqueeProps) {
  if (logos.length === 0) return null;

  // The loop needs at least `visibleCount` logos per set to avoid gaps,
  // so a short list is repeated until it is long enough.
  const repeats = Math.max(1, Math.ceil(visibleCount / logos.length));
  const logoSet = Array.from({ length: repeats }, () => logos).flat();

  const style = {
    "--visible-lg": visibleCount,
    "--count": logoSet.length,
    "--duration": `${logoSet.length * secondsPerLogo}s`,
  } as CSSProperties;

  // Render the set twice: the animation slides exactly one set, then restarts.
  const renderSet = (isClone: boolean) =>
    logoSet.map((logo, index) => (
      <div
        key={`${isClone ? "clone" : "main"}-${index}`}
        className={styles.item}
        aria-hidden={isClone || undefined}
      >
        <div className="relative h-14 w-full transition-transform duration-300 hover:scale-105">
          <Image
            src={logo.src}
            alt={isClone ? "" : logo.name}
            fill
            sizes="(min-width: 1024px) 12vw, 25vw "
            className="object-contain"
          />
        </div>
      </div>
    ));

  return (
    <div
      role="group"
      aria-label={label}
      className={styles.marquee}
      style={style}
    >
      <div className={styles.mask}>
        <div
          className={`${styles.track} ${
            direction === "right" ? styles.reverse : ""
          }`}
        >
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>

      <div className={`${styles.blur} ${styles.blurLeft}`} />
      <div className={`${styles.blur} ${styles.blurRight}`} />
    </div>
  );
}
