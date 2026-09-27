import { site } from "@/lib/site";

import MarketPulseSection from "@/components/MarketPulseSection";
import Marketfeatures from "@/components/Marketfeatures";
import MarketBreadth from "@/components/MarketBreadth";
import Marketheatmap from "@/components/Marketheatmap";
import MarketNews from "@/components/MarketNews";
import FinalCTA from "@/components/FinalCTA";

export const metadata = site.meta({
  title: "Rocket Pro",
  path: "/",
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <MarketPulseSection />

      <Marketfeatures />

      <MarketBreadth />

      <Marketheatmap />

      <MarketNews />

      <FinalCTA />
    </main>
  );
}