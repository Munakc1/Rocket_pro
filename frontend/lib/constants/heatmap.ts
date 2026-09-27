import type { SectorHeatmap } from "@/lib/types/heatmap";

/**
 * Temporary development data for MarketHeatmap.tsx.
 * Replace with real sector/stock data from the NEPSE market-data source
 * (see lib/api/market.ts) once the endpoint is available — the component
 * consumes `SectorHeatmap[]` via props, so nothing in the UI needs to
 * change when this is swapped out.
 */
export const DEFAULT_MARKET_HEATMAP: SectorHeatmap[] = [
  {
    name: "Banking",
    changePercent: 1.42,
    stocks: [
      { symbol: "NABIL", name: "Nabil Bank Limited", sector: "Banking", price: 1245.0, changePercent: 2.14, turnover: 85_400_000 },
      { symbol: "NICA", name: "NIC Asia Bank Limited", sector: "Banking", price: 612.5, changePercent: 1.52, turnover: 41_200_000 },
      { symbol: "EBL", name: "Everest Bank Limited", sector: "Banking", price: 788.0, changePercent: -0.84, turnover: 22_600_000 },
      { symbol: "SCB", name: "Standard Chartered Bank Nepal", sector: "Banking", price: 545.0, changePercent: 0.67, turnover: 12_900_000 },
      { symbol: "HBL", name: "Himalayan Bank Limited", sector: "Banking", price: 498.2, changePercent: 1.1, turnover: 18_300_000 },
      { symbol: "SBL", name: "Siddhartha Bank Limited", sector: "Banking", price: 372.0, changePercent: -0.32, turnover: 9_800_000 },
      { symbol: "NMB", name: "NMB Bank Limited", sector: "Banking", price: 410.5, changePercent: 0.45, turnover: 7_500_000 },
      { symbol: "KBL", name: "Kumari Bank Limited", sector: "Banking", price: 289.0, changePercent: 1.87, turnover: 6_100_000 },
    ],
  },
  {
    name: "Hydropower",
    changePercent: 2.1,
    stocks: [
      { symbol: "UPPER", name: "Upper Tamakoshi Hydropower", sector: "Hydropower", price: 512.0, changePercent: 3.42, turnover: 63_700_000 },
      { symbol: "NHPC", name: "National Hydro Power Company", sector: "Hydropower", price: 245.8, changePercent: 2.91, turnover: 38_100_000 },
      { symbol: "CHCL", name: "Chilime Hydropower Company", sector: "Hydropower", price: 398.0, changePercent: -1.2, turnover: 11_400_000 },
      { symbol: "AKPL", name: "Arun Kabeli Power Limited", sector: "Hydropower", price: 276.5, changePercent: 0.88, turnover: 8_900_000 },
      { symbol: "RURU", name: "Ruru Hydropower", sector: "Hydropower", price: 331.0, changePercent: 4.15, turnover: 15_200_000 },
      { symbol: "UNHPL", name: "United Nepal Hydropower", sector: "Hydropower", price: 198.4, changePercent: -0.55, turnover: 4_300_000 },
    ],
  },
  {
    name: "Finance",
    changePercent: 0.58,
    stocks: [
      { symbol: "GFCL", name: "Goodwill Finance Limited", sector: "Finance", price: 187.0, changePercent: 1.8, turnover: 5_600_000 },
      { symbol: "NFS", name: "Nepal Finance Limited", sector: "Finance", price: 154.2, changePercent: -0.42, turnover: 3_100_000 },
      { symbol: "GUFL", name: "Guheshwori Merchant Banking", sector: "Finance", price: 176.5, changePercent: 0.95, turnover: 2_800_000 },
      { symbol: "MFIL", name: "Manjushree Finance Limited", sector: "Finance", price: 203.0, changePercent: 2.3, turnover: 4_700_000 },
      { symbol: "CFCL", name: "Central Finance Limited", sector: "Finance", price: 145.8, changePercent: -1.15, turnover: 1_900_000 },
    ],
  },
  {
    name: "Microfinance",
    changePercent: 1.34,
    stocks: [
      { symbol: "SKBBL", name: "Swabalamban Laghubitta", sector: "Microfinance", price: 892.0, changePercent: 5.2, turnover: 22_400_000 },
      { symbol: "ANLB", name: "Ananyarupa Laghubitta", sector: "Microfinance", price: 611.5, changePercent: -2.1, turnover: 9_600_000 },
      { symbol: "SMFDB", name: "Summit Microfinance", sector: "Microfinance", price: 455.0, changePercent: 1.05, turnover: 6_200_000 },
      { symbol: "SWBBL", name: "Swarojgar Laghubitta", sector: "Microfinance", price: 388.2, changePercent: -0.75, turnover: 3_400_000 },
      { symbol: "JBLB", name: "Janautthan Laghubitta", sector: "Microfinance", price: 522.0, changePercent: 3.3, turnover: 11_800_000 },
    ],
  },
  {
    name: "Insurance",
    changePercent: -0.15,
    stocks: [
      { symbol: "NLIC", name: "Nepal Life Insurance", sector: "Insurance", price: 945.0, changePercent: -0.6, turnover: 14_500_000 },
      { symbol: "NLICL", name: "National Life Insurance", sector: "Insurance", price: 612.0, changePercent: 0.4, turnover: 6_800_000 },
      { symbol: "PRIN", name: "Prime Life Insurance", sector: "Insurance", price: 478.5, changePercent: 1.25, turnover: 5_200_000 },
      { symbol: "SICL", name: "Sagarmatha Insurance", sector: "Insurance", price: 356.0, changePercent: -1.8, turnover: 4_100_000 },
      { symbol: "LICN", name: "Life Insurance Corporation Nepal", sector: "Insurance", price: 289.4, changePercent: 0.95, turnover: 2_600_000 },
      { symbol: "RBCL", name: "Reliable Nepal Life Insurance", sector: "Insurance", price: 234.0, changePercent: -0.2, turnover: 1_800_000 },
    ],
  },
  {
    name: "Development Bank",
    changePercent: 0.15,
    stocks: [
      { symbol: "MDB", name: "Miteri Development Bank", sector: "Development Bank", price: 298.0, changePercent: 0.75, turnover: 3_900_000 },
      { symbol: "GBBL", name: "Garima Bikas Bank", sector: "Development Bank", price: 245.5, changePercent: -0.3, turnover: 2_200_000 },
      { symbol: "SADBL", name: "Shine Resunga Development Bank", sector: "Development Bank", price: 267.0, changePercent: 1.6, turnover: 4_600_000 },
      { symbol: "EDBL", name: "Excel Development Bank", sector: "Development Bank", price: 189.2, changePercent: -0.9, turnover: 1_500_000 },
    ],
  },
];