import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NewsArticleNotFound() {
  return (
    <main className="min-h-screen bg-app">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg rounded-2xl border border-card bg-surface p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart text-muted">
            <FileQuestion size={22} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-heading">
            Article not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted">
            The article you&apos;re looking for does not exist or is no
            longer available.
          </p>

          <Link
            href="/news"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
          >
            <ArrowLeft size={16} />
            Return to News
          </Link>
        </div>
      </div>
    </main>
  );
}