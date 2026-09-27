import Link from "next/link";

type Mover = {
  ticker: string;
  price: string;
  change: string;
  positive: boolean;
};

const movers: Mover[] = [
  { ticker: "SNORL", price: "1,057.00", change: "+13.66%", positive: true },
  { ticker: "ILBS", price: "1,065.00", change: "+9.81%", positive: true },
  { ticker: "IGIPO", price: "241.00", change: "+9.05%", positive: true },
  { ticker: "HATHY", price: "499.80", change: "-15.00%", positive: false },
];

function MoverArrow({ positive }: { positive: boolean }) {
  return (
    <svg
      viewBox="0 0 10 10"
      className={`h-2.5 w-2.5 shrink-0 ${positive ? "" : "-scale-y-100"}`}
    >
      <path
        d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7"
        stroke={positive ? "#0aa852" : "#e31b1b"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function IndexChart() {
  return (
    <svg
      viewBox="0 0 426 90"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      {[0, 30, 60, 90].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="426"
          y2={y}
          stroke="#d9e8dd"
          strokeWidth="1"
        />
      ))}

      <polyline
        points="0,80 30,72 55,55 80,62 105,50 130,52 155,44 180,48 205,32 230,38 255,26 280,30 305,18 330,20 355,12 380,15 405,10 426,12"
        fill="none"
        stroke="#0aa852"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NepseIndexCard() {
  return (
    <div className="flex h-full flex-col items-start rounded-[30px] bg-[#fbfbfb] px-6 pb-9 pt-[30px]">
      <div className="flex w-full flex-col gap-[31px]">
        <div className="flex w-full flex-col gap-[17px]">
          <Link
            href="/nepse-data"
            className="flex w-full flex-col gap-[17px]"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-px">
                <p className="font-['Space_Grotesk'] text-[15px] font-normal tracking-[0.75px] text-[#535353]">
                  NEPSE Index
                </p>

                <p className="font-['Space_Grotesk'] text-[32px] font-bold text-black">
                  2,647.22
                </p>
              </div>

              <div className="flex h-[27px] items-center gap-1 rounded-[10px] border-[0.5px] border-[#ececec] bg-[#dcffec] px-2.5">
                <MoverArrow positive />

                <p className="whitespace-nowrap font-['Space_Grotesk'] text-xs font-bold text-[#0aa852]">
                  +22.85
                </p>
              </div>
            </div>

            <div className="h-[154px] w-full rounded-2xl bg-[#edf8f0] px-[18px] py-8">
              <IndexChart />
            </div>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-[11px]">
          {movers.map((m) => (
            <Link
              key={m.ticker}
              href={`/nepse-data?symbol=${encodeURIComponent(m.ticker)}`}
              className="flex h-[31px] w-full items-center justify-between rounded-[10px] bg-[rgba(237,248,240,0.69)] px-[15px]"
            >
              <p className="font-['Space_Grotesk'] text-[15px] font-medium text-black">
                {m.ticker}
              </p>

              <div className="flex items-center gap-[15px]">
                <p className="font-['Space_Grotesk'] text-xs font-light tracking-[0.6px] text-[#393838]">
                  {m.price}
                </p>

                <div className="flex items-center gap-[5px]">
                  <MoverArrow positive={m.positive} />

                  <p
                    className={`font-['Space_Grotesk'] text-xs font-medium ${
                      m.positive ? "text-[#0aa852]" : "text-[#e31b1b]"
                    }`}
                  >
                    {m.change}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}