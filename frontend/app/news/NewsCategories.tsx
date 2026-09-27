"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NewsCategory } from "@/lib/types/news";

const categories: Array<{
  value: "all" | NewsCategory;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "market", label: "बजार" },
  { value: "company", label: "कम्पनी" },
  { value: "ipo", label: "IPO" },
  { value: "policy", label: "नीति" },
  { value: "economy", label: "अर्थतन्त्र" },
  { value: "education", label: "शिक्षा" },
];

export default function NewsCategories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "all";

  function selectCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    params.delete("page");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <nav
      aria-label="News categories"
      className="border-b border-[var(--border-light)] bg-surface"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="marquee-mask overflow-x-auto">
          <div
            role="tablist"
            aria-label="News categories"
            className="flex min-w-max gap-2 py-4"
          >
            {categories.map((category) => {
              const active = currentCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectCategory(category.value)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold",
                    "transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2",
                    active
                      ? "border-brand bg-badge text-primary"
                      : "border-card bg-surface text-muted hover:border-brand hover:text-primary",
                  ].join(" ")}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}