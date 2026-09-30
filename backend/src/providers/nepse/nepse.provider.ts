import { MarketTickerItem } from "../../types/market.types.js";

const NEPSE_API_URL =
  process.env.NEPSE_API_URL ||
  "https://shubhamnpk.github.io/yonepse/data/nepse_data.json";

interface NepseIndexPayload {
  name?: string;
  index?: string;
  indexName?: string;
  value?: number | string;
  currentValue?: number | string;
  indexValue?: number | string;
  changePercent?: number | string;
  perChange?: number | string;
  percentageChange?: number | string;
}

function toNumber(value: number | string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function fetchNepseIndices(): Promise<MarketTickerItem[]> {
  const response = await fetch(NEPSE_API_URL);

  if (!response.ok) {
    throw new Error(`NEPSE API request failed: ${response.status}`);
  }

  const result: unknown = await response.json();

  console.log("YONEPSE response:", result);

  const rows: NepseIndexPayload[] = Array.isArray(result)
    ? (result as NepseIndexPayload[])
    : ((result as { data?: NepseIndexPayload[] } | null)?.data ?? []);

  return rows.map((item) => ({
    name: item.name ?? item.index ?? item.indexName ?? "UNKNOWN",

    value: toNumber(
      item.value ??
        item.currentValue ??
        item.indexValue
    ),

    changePercent: toNumber(
      item.changePercent ??
        item.perChange ??
        item.percentageChange
    ),

    timestamp: new Date().toISOString(),
  }));
}