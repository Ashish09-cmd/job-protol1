/** Shown while the overview data loads. Same shape as the real page. */
export default function JobseekerOverviewLoading() {
  const block = "animate-pulse rounded-xl bg-blue-50";

  return (
    <div
      className="flex flex-col gap-8 px-4 py-8 sm:px-6"
      role="status"
      aria-label="Loading your overview"
    >
      <div className="flex flex-col gap-3">
        <div className={`${block} h-4 w-40`} />
        <div className={`${block} h-9 w-72`} />
        <div className={`${block} h-4 w-64`} />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className={`${block} h-24`} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className={`${block} h-72`} />
        ))}
      </div>
    </div>
  );
}


