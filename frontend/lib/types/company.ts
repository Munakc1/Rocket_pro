export type Company = {
  symbol: string;
  name: string;
  sector: string;
  ltp: number;
  change: number;
  changePercent: number;
  volume: number;
  turnover: number;
};

export type CompanySummary = Company & {
  previousClose: number;
  open: number;
  high: number;
  low: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap?: number;
};