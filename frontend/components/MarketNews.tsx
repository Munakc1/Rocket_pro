
// ============================================================
// MarketNews.tsx
// Rocket Pro — Latest News / Market News Preview Section
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

type NewsItem = {
  category: string;
  headline: string;
  description: string;
  date: string;
  image: string;
  href: string;
};

const newsItems: NewsItem[] = [
  {
    category: "बजार",
    headline: "नेप्सेमा २ वटा कम्पनीको बोनस सेयरमा मूल्य समायोजन",
    description:
      "कारोबार खुल्नु अघि लगानीकर्ताले जान्नुपर्ने मूल्य समायोजन र बजार प्रभाव।",
    date: "Sep 20, 2026",
    image: "/images/a.jpg",
    href: "/news",
  },
  {
    category: "ऊर्जा",
    headline: "जलविद्युत क्षेत्रमा लगानीकर्ताको आकर्षण कायमै",
    description:
      "परियोजना स्वीकृति र उत्पादन वृद्धिले ऊर्जा क्षेत्रको सूचकमा सकारात्मक प्रभाव।",
    date: "Sep 20, 2026",
    image: "/images/b.jpg",
    href: "/news",
  },
  {
    category: "प्रविधि",
    headline: "बजारको चाल अब एकै नजरमा, जहाँ भए पनि",
    description:
      "मूल्य, सूचक र ताजा समाचारलाई स्पष्ट र छोटो बुझ्ने नयाँ अनुभव।",
    date: "Sep 20, 2026",
    image: "/images/c.jpg",
    href: "/news",
  },
  {
    category: "बजार",
    headline: "नेप्से कारोबारमा लगानीकर्ताको सक्रियता बढ्दो",
    description:
      "बजार गतिविधि, कारोबार रकम र प्रमुख कम्पनीको प्रदर्शनबारे पछिल्लो अपडेट।",
    date: "Sep 19, 2026",
    image: "/images/d.jpg",
    href: "/news",
  },
];

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d5d5d5] bg-[#fbfbfb] transition-all duration-300 hover:-translate-y-1 hover:border-[#01c45a] hover:shadow-[0_14px_35px_rgba(10,168,82,0.10)]">
      {/* Image */}
      <Link href={item.href} className="block">
        <div className="relative h-[220px] w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.headline}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Image gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          {/* Category */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-[#dcffec] px-3 py-1.5 font-['Space_Grotesk'] text-xs font-semibold text-[#0aa852] shadow-sm">
              {item.category}
            </span>
          </div>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0aa852] opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={17} strokeWidth={2} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        {/* Date */}
        <div className="mb-3 flex items-center gap-1.5 font-['Space_Grotesk'] text-xs text-[#777]">
          <CalendarDays size={13} strokeWidth={1.8} />
          <span>{item.date}</span>
        </div>

        {/* Headline */}
        <Link href={item.href}>
          <h3 className="line-clamp-2 font-['Space_Grotesk'] text-[19px] font-semibold leading-[1.35] text-black transition-colors duration-200 group-hover:text-[#0aa852]">
            {item.headline}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-3 line-clamp-2 font-['Space_Grotesk'] text-[14px] leading-[1.6] text-[#686868]">
          {item.description}
        </p>

        {/* Bottom */}
        <div className="mt-auto pt-5">
          <Link
            href={item.href}
            className="inline-flex items-center gap-1.5 font-['Space_Grotesk'] text-sm font-semibold text-[#0aa852] transition-all duration-200 hover:gap-2.5"
          >
            Read more
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function MarketNews() {
  return (
    <section className="w-full bg-[#D6F0E0] px-6 py-16 md:px-[104px]">
      {/* ======================================================
          SECTION HEADER
      ====================================================== */}
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-['Space_Grotesk'] text-sm font-bold tracking-[1.5px] text-[#0aa852]">
            LATEST NEWS
          </p>

          <h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-black md:text-3xl">
            Market news
          </h2>

          <p className="mt-2 max-w-xl font-['Space_Grotesk'] text-sm leading-relaxed text-[#686868]">
            Stay updated with the latest market movements, company updates and
            important news from Nepal&apos;s capital market.
          </p>
        </div>

        {/* Desktop See All */}
        <Link
          href="/news"
          className="hidden items-center gap-2 rounded-full border border-[#01c45a] bg-transparent px-5 py-2.5 font-['Space_Grotesk'] text-sm font-semibold text-[#0aa852] transition-all duration-200 hover:bg-[#0aa852] hover:text-white md:inline-flex"
        >
          See all news
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </Link>
      </div>

      {/* ======================================================
          NEWS GRID
      ====================================================== */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {newsItems.map((item) => (
          <NewsCard key={item.headline} item={item} />
        ))}
      </div>

      {/* ======================================================
          MOBILE / BOTTOM CTA
      ====================================================== */}
      <div className="mt-8 flex justify-center md:hidden">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 rounded-full bg-[#0aa852] px-6 py-3 font-['Space_Grotesk'] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#078d45]"
        >
          See all news
          <ArrowUpRight size={17} strokeWidth={2.2} />
        </Link>
      </div>
    </section>
  );
}

