// export type MarketMover = {
//   symbol: string;
//   changePercent: number;
// };

// export type MarketSnapshot = {
//   index: {
//     name: string;
//     value: number;
//     changePercent: number;
//   };
//   /** Total turnover in NPR */
//   turnover: number;
//   advancing: number;
//   declining: number;
//   topMovers: MarketMover[];
// };

// // Placeholder data. Replace with the real API response when it is ready.
// const MOCK_SNAPSHOT: MarketSnapshot = {
//   index: { name: "NEPSE", value: 2647.0, changePercent: -0.27 },
//   turnover: 9_100_000_000,
//   advancing: 142,
//   declining: 167,
//   topMovers: [
//     { symbol: "SNORL", changePercent: 13.66 },
//     { symbol: "ILBS", changePercent: 9.81 },
//     { symbol: "HATHY", changePercent: -15.0 },
//   ],
// };

// export async function getMarketSnapshot(): Promise<MarketSnapshot> {
//   // When the backend is live, swap the return below for:
//   //
//   // const res = await fetch(`${process.env.API_BASE_URL}/market/snapshot`, {
//   //   next: { revalidate: 60 },
//   // });
//   // if (!res.ok) throw new Error("Failed to load market snapshot");
//   // return res.json();

//   return MOCK_SNAPSHOT;
// }


export type MarketDirection = "up" | "down" | "unchanged";

export type NepseIndex = {
  name: string;
  value: number;
  previousClose: number;
  change: number;
  changePercent: number;
  status: "open" | "closed" | "pre-open";
  updatedAt: string;
};

export type MarketTickerItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  direction: MarketDirection;
};

export type MarketMover = {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  turnover: number;
  direction: MarketDirection;
};

export type MarketBreadthData = {
  advancing: number;
  declining: number;
  unchanged: number;
  totalTraded: number;
};

export type SectorIndex = {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  direction: MarketDirection;
};
