import type {
  MarketBreadthData,
  MarketMover,
  MarketTickerItem,
  NepseIndex,
  SectorIndex,
} from "@/lib/types/market";

const delay = (ms = 150) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const mockNepseIndex: NepseIndex = {
  name: "NEPSE",
  value: 2647,
  previousClose: 2654.28,
  change: -7.28,
  changePercent: -0.27,
  status: "closed",
  updatedAt: "2026-09-25T15:00:00+05:45",
};

const mockTickerStocks: MarketTickerItem[] = [
  {
    symbol: "NABIL",
    name: "Nabil Bank",
    price: 512.4,
    change: 8.2,
    changePercent: 1.63,
    direction: "up",
  },
  {
    symbol: "NICA",
    name: "NIC Asia Bank",
    price: 394.8,
    change: -3.4,
    changePercent: -0.85,
    direction: "down",
  },
  {
    symbol: "UPPER",
    name: "Upper Tamakoshi",
    price: 221.5,
    change: 4.6,
    changePercent: 2.12,
    direction: "up",
  },
  {
    symbol: "NHPC",
    name: "National Hydro",
    price: 278.2,
    change: -2.1,
    changePercent: -0.75,
    direction: "down",
  },
];

const mockMovers: MarketMover[] = [
  {
    symbol: "SNORL",
    company: "Sanima Reliance Life Insurance",
    price: 742,
    change: 89.3,
    changePercent: 13.66,
    volume: 182450,
    turnover: 135420000,
    direction: "up",
  },
  {
    symbol: "ILBS",
    company: "Infinity Laghubitta",
    price: 815,
    change: 72.9,
    changePercent: 9.81,
    volume: 143200,
    turnover: 116500000,
    direction: "up",
  },
  {
    symbol: "IGIPO",
    company: "Ingwa Hydropower",
    price: 620,
    change: 51.4,
    changePercent: 9.05,
    volume: 112400,
    turnover: 69700000,
    direction: "up",
  },
  {
    symbol: "HATHY",
    company: "Hathway Investment",
    price: 680,
    change: -120,
    changePercent: -15,
    volume: 94500,
    turnover: 64260000,
    direction: "down",
  },
];

const mockBreadth: MarketBreadthData = {
  advancing: 138,
  declining: 151,
  unchanged: 56,
  totalTraded: 345,
};

const mockSectors: SectorIndex[] = [
  {
    name: "Banking",
    value: 1511.16,
    change: 12.24,
    changePercent: 0.82,
    direction: "up",
  },
  {
    name: "Hydropower",
    value: 3665.08,
    change: -18.42,
    changePercent: -0.5,
    direction: "down",
  },
  {
    name: "Sensitive",
    value: 471.07,
    change: 1.72,
    changePercent: 0.37,
    direction: "up",
  },
  {
    name: "Float",
    value: 182.46,
    change: -0.42,
    changePercent: -0.23,
    direction: "down",
  },
];

export async function getNepseIndex(): Promise<NepseIndex> {
  await delay();
  return mockNepseIndex;
}

export async function getTickerStocks(): Promise<MarketTickerItem[]> {
  await delay();
  return mockTickerStocks;
}

export async function getTopMovers(): Promise<MarketMover[]> {
  await delay();
  return mockMovers;
}

export async function getMarketBreadth(): Promise<MarketBreadthData> {
  await delay();
  return mockBreadth;
}

export async function getSectorIndices(): Promise<SectorIndex[]> {
  await delay();
  return mockSectors;
}