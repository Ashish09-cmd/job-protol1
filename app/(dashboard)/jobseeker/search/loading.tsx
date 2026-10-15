export default function JobseekerSearchLoading() {
  const block =
    "animate-pulse motion-reduce:animate-none rounded-2xl bg-blue-50";

  return (
    <div
      className="flex flex-col gap-8 px-4 py-8 sm:px-6"
      role="status"
      aria-label="Searching"
    >
      <div className="flex flex-col gap-3">
        <div className={`${block} h-3 w-16`} />
        <div className={`${block} h-8 w-72`} />
        <div className={`${block} h-4 w-40`} />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`${block} h-24`} />
        ))}
      </div>
    </div>
  );
}
