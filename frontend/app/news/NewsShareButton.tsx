"use client";

import { Share2 } from "lucide-react";

export default function NewsShareButton() {
  async function shareArticle() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url,
        });

        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        window.alert("Article link copied.");
        return;
      }

      window.prompt("Copy this article link:", url);
    } catch {
      // User cancelled native share dialog.
    }
  }

  return (
    <button
      type="button"
      onClick={shareArticle}
      className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-border)] focus:ring-offset-2"
    >
      <Share2 size={15} />
      Share / Copy Link
    </button>
  );
}
