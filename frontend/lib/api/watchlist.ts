
export type WatchlistStock = {
  symbol: string;
  companyName: string;
  sector: string;
  ltp: number;
  change: number;
  changePercent: number;
  volume: number;
  turnover: number;
};

const watchlistStocks: WatchlistStock[] = [
  {
    symbol: "NABIL",
    companyName: "Nabil Bank Limited",
    sector: "Commercial Banks",
    ltp: 548,
    change: 8,
    changePercent: 1.48,
    volume: 125400,
    turnover: 68200000,
  },
  {
    symbol: "NICA",
    companyName: "NIC Asia Bank Limited",
    sector: "Commercial Banks",
    ltp: 412,
    change: -4,
    changePercent: -0.96,
    volume: 98400,
    turnover: 40500000,
  },
  {
    symbol: "HBL",
    companyName: "Himalayan Bank Limited",
    sector: "Commercial Banks",
    ltp: 615.5,
    change: 6.5,
    changePercent: 1.07,
    volume: 76200,
    turnover: 46900000,
  },
  {
    symbol: "NLIC",
    companyName: "Nepal Life Insurance Company",
    sector: "Life Insurance",
    ltp: 735,
    change: -7,
    changePercent: -0.94,
    volume: 45100,
    turnover: 33100000,
  },
  {
    symbol: "SHIVM",
    companyName: "Shivam Cements Limited",
    sector: "Manufacturing & Processing",
    ltp: 548,
    change: 12,
    changePercent: 2.24,
    volume: 163500,
    turnover: 89600000,
  },
  {
    symbol: "UPPER",
    companyName: "Upper Tamakoshi Hydropower Limited",
    sector: "Hydropower",
    ltp: 218,
    change: 3,
    changePercent: 1.4,
    volume: 245600,
    turnover: 53400000,
  },
  {
    symbol: "NHPC",
    companyName: "National Hydro Power Company",
    sector: "Hydropower",
    ltp: 286,
    change: -5,
    changePercent: -1.72,
    volume: 118700,
    turnover: 33900000,
  },
  {
    symbol: "HDHPC",
    companyName: "Himal Dolakha Hydropower Company",
    sector: "Hydropower",
    ltp: 214,
    change: 2,
    changePercent: 0.94,
    volume: 84200,
    turnover: 18000000,
  },
];

export async function getWatchlist(): Promise<WatchlistStock[]> {
  return watchlistStocks;
}

export async function getWatchlistStocks(): Promise<WatchlistStock[]> {
  return watchlistStocks;
}

