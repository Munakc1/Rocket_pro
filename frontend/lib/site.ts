import { defineSite } from "@lacspace/seo";

/** Your site's SEO configuration — set once, used everywhere. */
export const site = defineSite({
  name: "LSBazaar",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  description: "A modern storefront — cart to checkout, wired end to end.",
  // twitter: "yourhandle",
  ogImage: "/og", // ✨ auto social-share images — see app/og/route.tsx
});
