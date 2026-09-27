import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";

export default function NewsHeader() {
  return (
    <header className="border-b border-[var(--border-light)] bg-surface">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-sm"
        >
          <Link
            href="/"
            className="text-muted transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)]"
          >
            Home
          </Link>

          <ChevronRight
            size={15}
            className="text-muted"
            aria-hidden="true"
          />

          <span className="font-medium text-heading" aria-current="page">
            News
          </span>
        </nav>

        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-badge text-primary"
              aria-hidden="true"
            >
              <Newspaper size={20} strokeWidth={1.8} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Rocket Pro News
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            Latest Market News
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Stay informed with market, company, IPO, policy, economic and
            educational updates relevant to Nepal&apos;s financial landscape.
          </p>
        </div>
      </div>
    </header>
  );
}