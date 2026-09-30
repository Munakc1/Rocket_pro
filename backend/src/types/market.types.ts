export interface MarketTickerItem {
  name: string;
  value: number;
  changePercent: number;
  timestamp: string;
}

export interface MarketTickerResponse {
  success: boolean;
  data: MarketTickerItem[];
  source: string;
  updatedAt: string;
}