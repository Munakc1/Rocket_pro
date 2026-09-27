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