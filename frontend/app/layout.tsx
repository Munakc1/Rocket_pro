import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@lacspace/theme";

import { site } from "@/lib/site";
import { CommandMenu } from "@/components/command-menu";
import {
  PublicSiteHeader,
  PublicSiteFooter,
} from "@/components/common/PublicSiteChrome";

import MarketTicker from "@/components/MarketTicker";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = site.meta({
  title: "Rocket Pro",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inter.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider defaultTheme="dark">
          <CommandMenu />

          <div className="flex min-h-screen flex-col">
            {/* Market ticker above navbar */}
            <MarketTicker />

            {/* Public Navbar */}
            <PublicSiteHeader />

            {/* Page Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Public Footer */}
            <PublicSiteFooter />
          </div>
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(site.rootJsonLd()),
          }}
        />
      </body>
    </html>
  );
}