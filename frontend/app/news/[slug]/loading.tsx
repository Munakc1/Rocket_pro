export default function NewsArticleLoading() {
  return (
    <main className="min-h-screen bg-app">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-5 w-28 animate-pulse rounded bg-chart" />

        <div className="mt-8 max-w-4xl space-y-4">
          <div className="h-7 w-20 animate-pulse rounded-full bg-chart" />

          <div className="h-12 w-full animate-pulse rounded bg-chart" />

          <div className="h-12 w-4/5 animate-pulse rounded bg-chart" />

          <div className="h-5 w-2/3 animate-pulse rounded bg-chart" />
        </div>

        <div className="mt-8 aspect-[16/8] animate-pulse rounded-2xl bg-chart" />

        <div className="mt-10 max-w-3xl space-y-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-5 animate-pulse rounded bg-chart"
            />
          ))}
        </div>
      </div>
    </main>
  );
}