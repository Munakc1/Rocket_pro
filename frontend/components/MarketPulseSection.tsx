import MarketPulseCard from "./MarketPulseCard";
import NepseIndexCard from "./NepseIndexCard";

export default function MarketPulseSection() {
  return (
    <section className="mx-6 mt-8 flex flex-col gap-8 md:mx-[104px] md:flex-row">
      <div className="md:basis-[58%]">
        <MarketPulseCard />
      </div>
      <div className="md:basis-[42%]">
        <NepseIndexCard />
      </div>
    </section>
  );
}