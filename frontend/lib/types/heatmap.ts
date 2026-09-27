export type StockHeatmapItem = {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  changePercent: number;
  turnover: number;
};

export type SectorHeatmap = {
  name: string;
  changePercent: number;
  stocks: StockHeatmapItem[];
};