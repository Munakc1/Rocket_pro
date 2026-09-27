function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={[
        "animate-pulse rounded-xl bg-[#e8f3e8]",
        className,
      ].join(" ")}
    />
  );
}

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-3 h-4 w-[420px] max-w-full" />

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[140px]" />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Skeleton className="h-[420px]" />
        <Skeleton className="h-[420px]" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <Skeleton className="h-[360px]" />
        <Skeleton className="h-[360px]" />
      </div>
    </div>
  );
}