import Link from "next/link";

interface StatCardProps {
  value: number;
  label: string;
  /** Makes the whole card a link to the related page. */
  href?: string;
}

const CARD_CLASSES =
  "flex flex-col gap-1 rounded-lg border border-subtext-gray2/30 bg-white px-4 py-4";

export default function StatCard({ value, label, href }: StatCardProps) {
  const content = (
    <>
      <span className="text-lg-xl font-semibold font-manrope text-primary-blue">
        {value.toLocaleString("en-US")}
      </span>
      <span className="text-sm font-regular font-inter text-text-secondary-color">
        {label}
      </span>
    </>
  );

  if (!href) return <div className={CARD_CLASSES}>{content}</div>;

  return (
    <Link
      href={href}
      className={`${CARD_CLASSES} transition-colors hover:border-primary-blue/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue`}
    >
      {content}
    </Link>
  );
}
