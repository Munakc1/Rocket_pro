export default function NewsLoading() {
  return (
    <main
      className="min-h-screen bg-app"
      aria-label="Loading news"
      aria-busy="true"
    >
      <section className="border-b border-[var(--border-light)] bg-surface">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-4 w-24 animate-pulse rounded bg-chart" />

          <div className="mt-8 h-10 w-72 max-w-full animate-pulse rounded-lg bg-chart" />

          <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-chart" />
        </div>
      </section>

      <section className="border-b border-[var(--border-light)] bg-surface">
        <div className="mx-auto flex w-full max-w-[1500px] gap-2 overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-20 shrink-0 animate-pulse rounded-full bg-chart"
            />
          ))}
        </div>
      </section>

      <section className="bg-news">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-7 h-8 w-48 animate-pulse rounded bg-chart" />

          <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
            <div className="aspect-[16/9] animate-pulse rounded-2xl bg-chart" />

            <div className="grid gap-5">
              <div className="min-h-40 animate-pulse rounded-2xl bg-chart" />
              <div className="min-h-40 animate-pulse rounded-2xl bg-chart" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-app">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-7 h-8 w-48 animate-pulse rounded bg-chart" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-card bg-surface"
              >
                <div className="aspect-[16/9] animate-pulse bg-chart" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-chart" />
                  <div className="h-6 w-full animate-pulse rounded bg-chart" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-chart" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}