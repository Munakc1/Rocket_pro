import { fetchNepseIndices } from "../providers/nepse/nepse.provider.js";
import { MarketTickerResponse } from "../types/market.types.js";

export async function getMarketTicker(): Promise<MarketTickerResponse> {
  const data = await fetchNepseIndices();

  return {
    success: true,
    data,
    source: "NEPSE",
    updatedAt: new Date().toISOString(),
  };
}