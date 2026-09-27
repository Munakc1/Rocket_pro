type NewsItem = {
  id: string | number;
  category: string;
  date: string;
  headline: string;
  description: string;
};

const news: NewsItem[] = [];

export default async function DashboardNewsPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium text-[#0aa852]">
          Saved information
        </p>

        <h1 className="mt-1 text-2xl font-bold text-black">
          Saved News
        </h1>

        <p className="mt-2 text-sm text-[#656565]">
          Keep important market stories available for later.
        </p>
      </div>

      <div className="mt-7 grid gap-4">
        {news.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 hover:bg-[#f1f9f4]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#dcffec] px-2.5 py-1 text-[11px] font-semibold text-[#0aa852]">
                {item.category}
              </span>

              <span className="text-xs text-[#656565]">
                {item.date}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-black">
              {item.headline}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#656565]">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}