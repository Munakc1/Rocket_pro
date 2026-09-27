"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type NewsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function NewsPagination({
  page,
  totalPages,
}: NewsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ).slice(
    Math.max(0, page - 2),
    Math.min(totalPages, page + 1),
  );

  return (
    <nav
      aria-label="News pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        className="inline-flex h-10 items-center gap-1 rounded-lg border border-card bg-surface px-3 text-sm font-medium text-muted transition-colors hover:border-brand hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)]"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {visiblePages.map((item) => {
        const active = item === page;

        return (
          <button
            key={item}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => goToPage(item)}
            className={[
              "h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold",
              "focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)]",
              active
                ? "border-brand bg-badge text-primary"
                : "border-card bg-surface text-muted hover:border-brand hover:text-primary",
            ].join(" ")}
          >
            {item}
          </button>
        );
      })}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
        className="inline-flex h-10 items-center gap-1 rounded-lg border border-card bg-surface px-3 text-sm font-medium text-muted transition-colors hover:border-brand hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)]"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}