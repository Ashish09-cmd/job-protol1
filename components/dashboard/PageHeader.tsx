interface PageHeaderProps {
  /** Small uppercase label above the title, e.g. "FOR YOU". */
  eyebrow?: string;
  title: string;
  description: string;
}

/** Title block at the top of every dashboard page (Applications, Saved Jobs, ...). */
export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      {eyebrow && (
        <p className="text-vxs font-medium uppercase tracking-widest font-inter text-subtext-light">
          {eyebrow}
        </p>
      )}
      <h1 className="text-xl font-semibold font-manrope text-text-heading">
        {title}
      </h1>
      <p className="text-sm font-regular font-inter text-text-secondary-color">
        {description}
      </p>
    </div>
  );
}
