/** Shown while the applications load. Same shape as the real page. */
export default function JobseekerApplicationsLoading() {
  const block = "animate-pulse rounded-xl bg-blue-50";

  return (
    <div
      className="flex flex-col gap-8 px-4 py-8 sm:px-6"
      role="status"
      aria-label="Loading your applications"
    >
      <div className="flex flex-col gap-3">
        <div className={`${block} h-9 w-56`} />
        <div className={`${block} h-4 w-80 max-w-full`} />
      </div>

      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`${block} h-9 w-24 shrink-0 rounded-full`}
          />
        ))}
      </div>

      <div className={`${block} h-96`} />
    </div>
  );
}
