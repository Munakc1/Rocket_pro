"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Minimize2, Search, X } from "lucide-react";

type HeatmapStock = {
  symbol: string;
  name?: string;
  sector: string;
  price: number;
  changePercent: number;
  volume: number;
  turnover: number;
  marketCap?: number;
};

interface MarketHeatmapProps {
  data?: HeatmapStock[];
  isLoading?: boolean;
  isError?: boolean;
  viewAllHref?: string;
  className?: string;
}

type SizeBy = "turnover" | "marketCap" | "volume";

/* ============================================================
   DEFAULT HEATMAP DATA
============================================================ */

const DEFAULT_HEATMAP_DATA: HeatmapStock[] = [
  {
    symbol: "TAMOR",
    name: "Sanima Middle Tamor Hydropower",
    sector: "Hydropower",
    price: 420,
    changePercent: -0.04,
    volume: 52000,
    turnover: 21840000,
    marketCap: 18500000000,
  },
  {
    symbol: "LEC",
    name: "Liberty Energy Company",
    sector: "Hydropower",
    price: 315,
    changePercent: 0,
    volume: 61000,
    turnover: 19215000,
    marketCap: 15400000000,
  },
  {
    symbol: "AKJCL",
    name: "Ankhu Khola Jalvidhyut",
    sector: "Hydropower",
    price: 390,
    changePercent: 0,
    volume: 73000,
    turnover: 28470000,
    marketCap: 14200000000,
  },
  {
    symbol: "RADHI",
    name: "Radhi Bidyut Company",
    sector: "Hydropower",
    price: 520,
    changePercent: 0.66,
    volume: 69000,
    turnover: 35880000,
    marketCap: 17400000000,
  },
  {
    symbol: "RIDI",
    name: "Ridi Power Company",
    sector: "Hydropower",
    price: 385,
    changePercent: -0.46,
    volume: 58000,
    turnover: 22330000,
    marketCap: 11800000000,
  },
  {
    symbol: "GHL",
    name: "Gurja Hydropower",
    sector: "Hydropower",
    price: 355,
    changePercent: -1.28,
    volume: 73000,
    turnover: 25915000,
    marketCap: 12100000000,
  },
  {
    symbol: "API",
    name: "Api Power Company",
    sector: "Hydropower",
    price: 295,
    changePercent: 0.24,
    volume: 112000,
    turnover: 33040000,
    marketCap: 24800000000,
  },
  {
    symbol: "PHCL",
    name: "Peoples Hydropower Company",
    sector: "Hydropower",
    price: 395,
    changePercent: 2.44,
    volume: 84000,
    turnover: 33180000,
    marketCap: 15600000000,
  },
  {
    symbol: "BHCL",
    name: "Bhugol Energy Development",
    sector: "Hydropower",
    price: 420,
    changePercent: 2.83,
    volume: 47000,
    turnover: 19740000,
    marketCap: 8200000000,
  },
  {
    symbol: "MEN",
    name: "Mountain Energy Nepal",
    sector: "Hydropower",
    price: 470,
    changePercent: 0.28,
    volume: 41000,
    turnover: 19270000,
    marketCap: 10500000000,
  },
  {
    symbol: "NHPC",
    name: "National Hydropower Company",
    sector: "Hydropower",
    price: 278,
    changePercent: 0.12,
    volume: 126000,
    turnover: 35028000,
    marketCap: 27000000000,
  },
  {
    symbol: "SOHL",
    name: "Solududhkund Hydropower",
    sector: "Hydropower",
    price: 350,
    changePercent: 0.4,
    volume: 38000,
    turnover: 13300000,
    marketCap: 7100000000,
  },
  {
    symbol: "HDHPC",
    name: "Himal Dolakha Hydropower",
    sector: "Hydropower",
    price: 315,
    changePercent: 0.14,
    volume: 47000,
    turnover: 14805000,
    marketCap: 7900000000,
  },
  {
    symbol: "SAHAS",
    name: "Sahas Urja Limited",
    sector: "Hydropower",
    price: 560,
    changePercent: -0.39,
    volume: 36000,
    turnover: 20160000,
    marketCap: 13200000000,
  },
  {
    symbol: "KKHC",
    name: "Khanikhola Hydropower",
    sector: "Hydropower",
    price: 285,
    changePercent: 0.2,
    volume: 29000,
    turnover: 8265000,
    marketCap: 6100000000,
  },
  {
    symbol: "MAKAR",
    name: "Makar Jitumaya",
    sector: "Hydropower",
    price: 370,
    changePercent: 0.02,
    volume: 33000,
    turnover: 12210000,
    marketCap: 6800000000,
  },
  {
    symbol: "SHPC",
    name: "Sanima Mai Hydropower",
    sector: "Hydropower",
    price: 480,
    changePercent: 0.52,
    volume: 58000,
    turnover: 27840000,
    marketCap: 19800000000,
  },
  {
    symbol: "HPPL",
    name: "Himalayan Power Partner",
    sector: "Hydropower",
    price: 295,
    changePercent: 0.1,
    volume: 51000,
    turnover: 15045000,
    marketCap: 8700000000,
  },
  {
    symbol: "HURJA",
    name: "Himalaya Urja",
    sector: "Hydropower",
    price: 298,
    changePercent: 1.98,
    volume: 68000,
    turnover: 20264000,
    marketCap: 9600000000,
  },
  {
    symbol: "BHL",
    name: "Balephi Hydropower",
    sector: "Hydropower",
    price: 360,
    changePercent: 1.15,
    volume: 46000,
    turnover: 16560000,
    marketCap: 7300000000,
  },
  {
    symbol: "AHPC",
    name: "Arun Valley Hydropower",
    sector: "Hydropower",
    price: 370,
    changePercent: 0.72,
    volume: 93000,
    turnover: 34410000,
    marketCap: 15500000000,
  },
  {
    symbol: "MEHL",
    name: "Mandakini Hydropower",
    sector: "Hydropower",
    price: 420,
    changePercent: 2.36,
    volume: 91000,
    turnover: 38220000,
    marketCap: 9400000000,
  },
  {
    symbol: "RHPL",
    name: "Rasuwagadhi Hydropower",
    sector: "Hydropower",
    price: 335,
    changePercent: 0.61,
    volume: 72000,
    turnover: 24120000,
    marketCap: 10800000000,
  },
  {
    symbol: "UMHL",
    name: "United Modi Hydropower",
    sector: "Hydropower",
    price: 310,
    changePercent: -0.33,
    volume: 61000,
    turnover: 18910000,
    marketCap: 10100000000,
  },
  {
    symbol: "MKJC",
    name: "Mailung Khola Jalvidhyut",
    sector: "Hydropower",
    price: 330,
    changePercent: 0.42,
    volume: 42000,
    turnover: 13860000,
    marketCap: 6800000000,
  },
  {
    symbol: "SMHL",
    name: "Super Madi Hydropower",
    sector: "Hydropower",
    price: 450,
    changePercent: 0.86,
    volume: 55000,
    turnover: 24750000,
    marketCap: 9300000000,
  },
  {
    symbol: "UPCL",
    name: "United Power",
    sector: "Hydropower",
    price: 290,
    changePercent: -0.42,
    volume: 54000,
    turnover: 15660000,
    marketCap: 9800000000,
  },
  {
    symbol: "MSHL",
    name: "Mid Solu Hydropower",
    sector: "Hydropower",
    price: 580,
    changePercent: -1.38,
    volume: 62000,
    turnover: 35960000,
    marketCap: 8900000000,
  },
  {
    symbol: "SPDL",
    name: "Synergy Power Development",
    sector: "Hydropower",
    price: 430,
    changePercent: -0.3,
    volume: 36000,
    turnover: 15480000,
    marketCap: 7700000000,
  },
  {
    symbol: "MEL",
    name: "Modi Energy",
    sector: "Hydropower",
    price: 345,
    changePercent: 0.52,
    volume: 48000,
    turnover: 16560000,
    marketCap: 9900000000,
  },
  {
    symbol: "SOPL",
    name: "Solukhumbu Power",
    sector: "Hydropower",
    price: 410,
    changePercent: 0.01,
    volume: 46000,
    turnover: 18860000,
    marketCap: 6200000000,
  },

  {
    symbol: "SHIVM",
    name: "Shivam Cements",
    sector: "Manufacturing",
    price: 525,
    changePercent: 2.18,
    volume: 225000,
    turnover: 118125000,
    marketCap: 52000000000,
  },
  {
    symbol: "HDL",
    name: "Himalayan Distillery",
    sector: "Manufacturing",
    price: 1890,
    changePercent: 2.64,
    volume: 61000,
    turnover: 115290000,
    marketCap: 57000000000,
  },
  {
    symbol: "SONA",
    name: "Sonapur Minerals",
    sector: "Manufacturing",
    price: 512,
    changePercent: 7.65,
    volume: 142000,
    turnover: 72704000,
    marketCap: 33000000000,
  },
  {
    symbol: "GCIL",
    name: "Ghorahi Cement",
    sector: "Manufacturing",
    price: 580,
    changePercent: 0.76,
    volume: 59000,
    turnover: 34220000,
    marketCap: 28000000000,
  },
  {
    symbol: "SARBTM",
    name: "Sarvottam Cement",
    sector: "Manufacturing",
    price: 720,
    changePercent: 1.67,
    volume: 53000,
    turnover: 38160000,
    marketCap: 42000000000,
  },
  {
    symbol: "SNORL",
    name: "Sonapur Minerals",
    sector: "Manufacturing",
    price: 412,
    changePercent: 4.65,
    volume: 156000,
    turnover: 64272000,
    marketCap: 25000000000,
  },

  {
    symbol: "SAPIL",
    name: "Siddhartha Premier Insurance",
    sector: "Non-Life Insurance",
    price: 690,
    changePercent: 1.19,
    volume: 43000,
    turnover: 29670000,
    marketCap: 21000000000,
  },
  {
    symbol: "HRL",
    name: "Himalayan Reinsurance",
    sector: "Non-Life Insurance",
    price: 680,
    changePercent: 1.12,
    volume: 71000,
    turnover: 48280000,
    marketCap: 44000000000,
  },

  {
    symbol: "SAIL",
    name: "Shivam Investment",
    sector: "Investment",
    price: 580,
    changePercent: 0.42,
    volume: 42000,
    turnover: 24360000,
    marketCap: 17000000000,
  },
  {
    symbol: "NIFRA",
    name: "Nepal Infrastructure Bank",
    sector: "Investment",
    price: 278,
    changePercent: 0.12,
    volume: 112000,
    turnover: 31136000,
    marketCap: 33000000000,
  },
  {
    symbol: "HATHY",
    name: "Hathway Investment",
    sector: "Investment",
    price: 985,
    changePercent: -3.43,
    volume: 98000,
    turnover: 96530000,
    marketCap: 26000000000,
  },
  {
    symbol: "PCIL",
    name: "Peoples Investment",
    sector: "Investment",
    price: 530,
    changePercent: 0.76,
    volume: 57000,
    turnover: 30210000,
    marketCap: 18000000000,
  },

  {
    symbol: "LSL",
    name: "Laxmi Sunrise Bank",
    sector: "Banks",
    price: 235,
    changePercent: 1.67,
    volume: 145000,
    turnover: 34075000,
    marketCap: 29000000000,
  },
  {
    symbol: "NBL",
    name: "Nepal Bank",
    sector: "Banks",
    price: 280,
    changePercent: 0.17,
    volume: 125000,
    turnover: 35000000,
    marketCap: 36000000000,
  },
  {
    symbol: "KBL",
    name: "Kumari Bank",
    sector: "Banks",
    price: 215,
    changePercent: 0.44,
    volume: 148000,
    turnover: 31820000,
    marketCap: 27000000000,
  },
  {
    symbol: "SBL",
    name: "Siddhartha Bank",
    sector: "Banks",
    price: 420,
    changePercent: -0.04,
    volume: 85000,
    turnover: 35700000,
    marketCap: 48000000000,
  },
  {
    symbol: "GBIME",
    name: "Global IME Bank",
    sector: "Banks",
    price: 248,
    changePercent: 0.33,
    volume: 172000,
    turnover: 42656000,
    marketCap: 69000000000,
  },
  {
    symbol: "MBL",
    name: "Machhapuchchhre Bank",
    sector: "Banks",
    price: 270,
    changePercent: 0.52,
    volume: 118000,
    turnover: 31860000,
    marketCap: 35000000000,
  },
  {
    symbol: "NABIL",
    name: "Nabil Bank",
    sector: "Banks",
    price: 535,
    changePercent: 0.71,
    volume: 190000,
    turnover: 101650000,
    marketCap: 82000000000,
  },
  {
    symbol: "CZBIL",
    name: "Citizens Bank",
    sector: "Banks",
    price: 275,
    changePercent: 0.66,
    volume: 110000,
    turnover: 30250000,
    marketCap: 31000000000,
  },
  {
    symbol: "PCBL",
    name: "Prime Commercial Bank",
    sector: "Banks",
    price: 275,
    changePercent: 1.58,
    volume: 137000,
    turnover: 37675000,
    marketCap: 39000000000,
  },
  {
    symbol: "EBL",
    name: "Everest Bank",
    sector: "Banks",
    price: 720,
    changePercent: 0.45,
    volume: 57000,
    turnover: 41040000,
    marketCap: 67000000000,
  },
  {
    symbol: "NIMB",
    name: "Nepal Investment Mega Bank",
    sector: "Banks",
    price: 240,
    changePercent: 0.22,
    volume: 132000,
    turnover: 31680000,
    marketCap: 57000000000,
  },
  {
    symbol: "NMB",
    name: "NMB Bank",
    sector: "Banks",
    price: 260,
    changePercent: 1.34,
    volume: 165000,
    turnover: 42900000,
    marketCap: 47000000000,
  },
  {
    symbol: "NICA",
    name: "NIC Asia Bank",
    sector: "Banks",
    price: 385,
    changePercent: 0.31,
    volume: 105000,
    turnover: 40425000,
    marketCap: 55000000000,
  },

  {
    symbol: "GBBL",
    name: "Garima Bikas Bank",
    sector: "Development Banks",
    price: 340,
    changePercent: 0.67,
    volume: 69000,
    turnover: 23460000,
    marketCap: 13000000000,
  },

  {
    symbol: "CYCL",
    name: "CYC Nepal Laghubitta",
    sector: "Microfinance",
    price: 780,
    changePercent: 1.61,
    volume: 97000,
    turnover: 75660000,
    marketCap: 15000000000,
  },
  {
    symbol: "ANLB",
    name: "Asha Laghubitta",
    sector: "Microfinance",
    price: 690,
    changePercent: 0.82,
    volume: 49000,
    turnover: 33810000,
    marketCap: 9700000000,
  },
  {
    symbol: "NMFBS",
    name: "National Microfinance",
    sector: "Microfinance",
    price: 930,
    changePercent: 1.61,
    volume: 43000,
    turnover: 39990000,
    marketCap: 11500000000,
  },
  {
    symbol: "CBBL",
    name: "Chhimek Laghubitta",
    sector: "Microfinance",
    price: 1120,
    changePercent: 0.53,
    volume: 36000,
    turnover: 40320000,
    marketCap: 18500000000,
  },

  {
    symbol: "MFIL",
    name: "Manjushree Finance",
    sector: "Finance",
    price: 590,
    changePercent: 0.41,
    volume: 52000,
    turnover: 30680000,
    marketCap: 7800000000,
  },
  {
    symbol: "CFCL",
    name: "Central Finance",
    sector: "Finance",
    price: 560,
    changePercent: 0.18,
    volume: 47000,
    turnover: 26320000,
    marketCap: 6800000000,
  },
  {
    symbol: "BFC",
    name: "Best Finance",
    sector: "Finance",
    price: 450,
    changePercent: -0.42,
    volume: 31000,
    turnover: 13950000,
    marketCap: 5200000000,
  },
  {
    symbol: "KDL",
    name: "Kuber Finance",
    sector: "Finance",
    price: 420,
    changePercent: 0.22,
    volume: 29000,
    turnover: 12180000,
    marketCap: 4900000000,
  },

  {
    symbol: "CITY",
    name: "City Hotel",
    sector: "Hotels",
    price: 405,
    changePercent: 0.38,
    volume: 85000,
    turnover: 34425000,
    marketCap: 9800000000,
  },
  {
    symbol: "SHL",
    name: "Soaltee Hotel",
    sector: "Hotels",
    price: 480,
    changePercent: 0.52,
    volume: 44000,
    turnover: 21120000,
    marketCap: 31000000000,
  },
  {
    symbol: "TRH",
    name: "Taragaon Regency Hotel",
    sector: "Hotels",
    price: 820,
    changePercent: 0.31,
    volume: 29000,
    turnover: 23780000,
    marketCap: 13500000000,
  },

  {
    symbol: "HLI",
    name: "Himalayan Life Insurance",
    sector: "Life Insurance",
    price: 610,
    changePercent: 0.75,
    volume: 54000,
    turnover: 32940000,
    marketCap: 39000000000,
  },
  {
    symbol: "RNLI",
    name: "Reliable Nepal Life",
    sector: "Life Insurance",
    price: 540,
    changePercent: 0.48,
    volume: 42000,
    turnover: 22680000,
    marketCap: 25000000000,
  },
  {
    symbol: "SNLI",
    name: "Sun Nepal Life",
    sector: "Life Insurance",
    price: 580,
    changePercent: 0.62,
    volume: 39000,
    turnover: 22620000,
    marketCap: 22000000000,
  },

  {
    symbol: "NTC",
    name: "Nepal Telecom",
    sector: "Others",
    price: 900,
    changePercent: 0,
    volume: 118000,
    turnover: 106200000,
    marketCap: 135000000000,
  },
  {
    symbol: "STC",
    name: "Salt Trading Corporation",
    sector: "Others",
    price: 5900,
    changePercent: 0.37,
    volume: 18000,
    turnover: 106200000,
    marketCap: 14500000000,
  },
];

/* ============================================================
   FORMATTERS
============================================================ */

function formatChange(value: number) {
  if (value > 0) return `+${value.toFixed(2)}%`;
  return `${value.toFixed(2)}%`;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatMoney(value: number) {
  if (value >= 1_000_000_000) {
    return `NPR ${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (value >= 1_000_000) {
    return `NPR ${(value / 1_000_000).toFixed(2)}M`;
  }

  if (value >= 1_000) {
    return `NPR ${(value / 1_000).toFixed(1)}K`;
  }

  return `NPR ${value.toLocaleString()}`;
}

function getMetricValue(stock: HeatmapStock, sizeBy: SizeBy) {
  if (sizeBy === "turnover") return stock.turnover;
  if (sizeBy === "marketCap") return stock.marketCap ?? 0;
  return stock.volume;
}

function sizeByLabel(sizeBy: SizeBy) {
  if (sizeBy === "turnover") return "turnover";
  if (sizeBy === "marketCap") return "market cap";
  return "volume";
}

/* ============================================================
   SQUARIFIED TREEMAP LAYOUT ENGINE
============================================================ */

interface SquarifyItem<T> {
  id: string;
  value: number;
  data: T;
}

interface SquarifyResult<T> {
  id: string;
  data: T;
  x: number;
  y: number;
  w: number;
  h: number;
}

function worstRatio(rowValues: number[], side: number) {
  const sum = rowValues.reduce((a, b) => a + b, 0);
  const rowMax = Math.max(...rowValues);
  const rowMin = Math.min(...rowValues);

  if (!sum || !rowMin || !side) return Infinity;

  const s2 = sum * sum;
  const l2 = side * side;

  return Math.max(
    (l2 * rowMax) / s2,
    s2 / (l2 * rowMin),
  );
}

function squarify<T>(
  rawItems: SquarifyItem<T>[],
  x: number,
  y: number,
  w: number,
  h: number,
): SquarifyResult<T>[] {
  if (!rawItems.length || w <= 0 || h <= 0) {
    return [];
  }

  const total =
    rawItems.reduce((sum, item) => sum + item.value, 0) || 1;

  const area = w * h;
  const scale = area / total;

  let remaining = rawItems
    .slice()
    .sort((a, b) => b.value - a.value)
    .map((item) => ({
      ...item,
      value: Math.max(
        item.value * scale,
        area * 0.00001,
      ),
    }));

  const results: SquarifyResult<T>[] = [];

  let rx = x;
  let ry = y;
  let rw = w;
  let rh = h;

  while (remaining.length) {
    const side = Math.min(rw, rh);

    let row = [remaining[0]];
    let i = 1;

    while (i < remaining.length) {
      const candidateRow = [...row, remaining[i]];

      const candidateValues = candidateRow.map(
        (item) => item.value,
      );

      const currentValues = row.map(
        (item) => item.value,
      );

      if (
        worstRatio(candidateValues, side) <=
        worstRatio(currentValues, side)
      ) {
        row = candidateRow;
        i++;
      } else {
        break;
      }
    }

    const rowSum = row.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    if (rw >= rh) {
      const stripWidth = rh > 0 ? rowSum / rh : 0;

      let cy = ry;

      row.forEach((item) => {
        const itemHeight =
          (item.value / rowSum) * rh;

        results.push({
          id: item.id,
          data: item.data,
          x: rx,
          y: cy,
          w: stripWidth,
          h: itemHeight,
        });

        cy += itemHeight;
      });

      rx += stripWidth;
      rw -= stripWidth;
    } else {
      const stripHeight =
        rw > 0 ? rowSum / rw : 0;

      let cx = rx;

      row.forEach((item) => {
        const itemWidth =
          (item.value / rowSum) * rw;

        results.push({
          id: item.id,
          data: item.data,
          x: cx,
          y: ry,
          w: itemWidth,
          h: stripHeight,
        });

        cx += itemWidth;
      });

      ry += stripHeight;
      rh -= stripHeight;
    }

    remaining = remaining.slice(row.length);
  }

  return results;
}

/* ============================================================
   TILE TONE
============================================================ */

function getDarkTileTone(changePercent: number) {
  if (changePercent === 0) {
    return {
      background: "rgba(255,255,255,0.06)",
      changeColor: "#9a9a9a",
    };
  }

  const magnitude = Math.abs(changePercent);
  const opacity = Math.min(
    0.92,
    0.1 + magnitude * 0.22,
  );

  if (changePercent > 0) {
    return {
      background: `rgba(10,168,82,${opacity})`,
      changeColor: "#3ddc84",
    };
  }

  return {
    background: `rgba(227,27,27,${opacity})`,
    changeColor: "#ff6b6b",
  };
}

/* ============================================================
   LAYOUT CONSTANTS
============================================================ */

const GAP = 3;
const HEADER_HEIGHT = 18;

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function MarketHeatmap({
  data,
  isLoading = false,
  isError = false,
  viewAllHref = "/dashboard/market/heatmap",
  className = "",
}: MarketHeatmapProps) {
  const stocks = data ?? DEFAULT_HEATMAP_DATA;

  const [sector, setSector] = useState("All");
  const [search, setSearch] = useState("");
  const [sizeBy, setSizeBy] =
    useState<SizeBy>("turnover");
  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const sectors = useMemo(() => {
    const unique = Array.from(
      new Set(stocks.map((stock) => stock.sector)),
    );

    return ["All", ...unique];
  }, [stocks]);

  const filteredStocks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return stocks.filter((stock) => {
      const matchesSector =
        sector === "All" ||
        stock.sector === sector;

      const matchesSearch =
        !query ||
        stock.symbol
          .toLowerCase()
          .includes(query) ||
        stock.name
          ?.toLowerCase()
          .includes(query);

      return matchesSector && matchesSearch;
    });
  }, [stocks, sector, search]);

  const groupedStocks = useMemo(() => {
    const groups = new Map<
      string,
      HeatmapStock[]
    >();

    filteredStocks.forEach((stock) => {
      const current =
        groups.get(stock.sector) ?? [];

      current.push(stock);
      groups.set(stock.sector, current);
    });

    return Array.from(groups.entries());
  }, [filteredStocks]);

  const advancing = stocks.filter(
    (stock) => stock.changePercent > 0,
  ).length;

  const declining = stocks.filter(
    (stock) => stock.changePercent < 0,
  ).length;

  const unchanged = stocks.filter(
    (stock) => stock.changePercent === 0,
  ).length;

  return (
    <>
      {/* ======================================================
          PAGE SECTION
          #D6F0E0 = PAGE BACKGROUND ONLY
      ====================================================== */}

      <section
        aria-labelledby="market-heatmap-heading"
        className={`w-full bg-[#D6F0E0] ${className}`}
      >
        <div className="mx-auto w-full max-w-[1550px] px-3 py-5 sm:px-4 sm:py-6 lg:px-6">
          {/* ==================================================
              MAIN CARD
          ================================================== */}

          <div className="rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] p-4 shadow-sm sm:p-5">
            {/* TITLE */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-px w-5 bg-[#0aa852]" />

                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0aa852]">
                    Heatmap
                  </p>
                </div>

                <h2
                  id="market-heatmap-heading"
                  className="mt-2 text-3xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-4xl"
                >
                  The Entire NEPSE,
                  <br />
                  <span className="text-[#0aa852]">
                    one screen.
                  </span>
                </h2>

                <p className="mt-2 max-w-xl text-xs leading-5 text-[#656565] sm:text-sm sm:leading-6">
                  Every traded company, grouped by
                  sector, sized by{" "}
                  {sizeByLabel(sizeBy)} and coloured
                  by today&apos;s change. Hover for
                  detail, tap to open.
                </p>

                <p className="mt-2 text-[11px] font-medium text-[#656565]">
                  <span className="text-[#0aa852]">
                    {advancing} advancing
                  </span>

                  {" · "}

                  <span className="text-[#e31b1b]">
                    {declining} declining
                  </span>

                  {" · "}

                  <span>{unchanged} unchanged</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsFullscreen(true)
                }
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-black underline decoration-2 underline-offset-4 transition hover:text-[#0aa852]"
              >
                Full-screen heatmap

                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* CONTROLS */}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <SizeButtonGroup
                sizeBy={sizeBy}
                onChange={setSizeBy}
              />

              <ChangeLegend />

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <SearchBox
                  value={search}
                  onChange={setSearch}
                />

                <SectorSelect
                  sectors={sectors}
                  value={sector}
                  onChange={setSector}
                />

                <p className="whitespace-nowrap text-xs font-medium text-[#656565]">
                  {filteredStocks.length} scrips
                </p>
              </div>
            </div>

            {/* TREEMAP */}

            <div className="mt-4">
              <TreemapCanvas
                groupedStocks={groupedStocks}
                sizeBy={sizeBy}
                heightClassName="h-[420px] sm:h-[480px] lg:h-[560px] xl:h-[620px]"
                isLoading={isLoading}
                isError={isError}
              />
            </div>

            {/* FOOTER */}

            {!isLoading && !isError && (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] text-[#656565]">
                  Box size is based on{" "}
                  <span className="font-semibold text-black">
                    {sizeByLabel(sizeBy)}
                  </span>
                  . Mock data — replace with a
                  live NEPSE feed when available.
                </p>

                <Link
                  href={viewAllHref}
                  className="text-[11px] font-semibold text-[#0aa852] hover:underline"
                >
                  View Full Market →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          FULLSCREEN
      ====================================================== */}

      {isFullscreen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="flex flex-col gap-3 border-b border-white/10 p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-px w-5 bg-[#0aa852]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0aa852]">
                    Rocket Pro
                  </span>
                </div>

                <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
                  NEPSE Market Heatmap
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsFullscreen(false)
                }
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                Exit
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SizeButtonGroup
                sizeBy={sizeBy}
                onChange={setSizeBy}
                dark
              />

              <ChangeLegend dark />

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <SearchBox
                  value={search}
                  onChange={setSearch}
                  dark
                />

                <SectorSelect
                  sectors={sectors}
                  value={sector}
                  onChange={setSector}
                  dark
                />

                <p className="whitespace-nowrap text-xs font-medium text-white/50">
                  {filteredStocks.length} scrips
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden p-2 sm:p-3">
            <TreemapCanvas
              groupedStocks={groupedStocks}
              sizeBy={sizeBy}
              heightClassName="h-full"
              isLoading={isLoading}
              isError={isError}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   TREEMAP CANVAS
============================================================ */

function TreemapCanvas({
  groupedStocks,
  sizeBy,
  heightClassName,
  isLoading,
  isError,
}: {
  groupedStocks: [string, HeatmapStock[]][];
  sizeBy: SizeBy;
  heightClassName: string;
  isLoading?: boolean;
  isError?: boolean;
}) {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const [dimensions, setDimensions] =
    useState({
      width: 0,
      height: 0,
    });

  useEffect(() => {
    const node = containerRef.current;

    if (!node) return;

    const observer = new ResizeObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) return;

        const {
          width,
          height,
        } = entry.contentRect;

        setDimensions((prev) =>
          prev.width === width &&
          prev.height === height
            ? prev
            : {
                width,
                height,
              },
        );
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const isEmpty =
    !isLoading &&
    !isError &&
    groupedStocks.length === 0;

  const sectorBlocks = useMemo(() => {
    if (
      isLoading ||
      isError ||
      isEmpty ||
      !dimensions.width ||
      !dimensions.height
    ) {
      return [];
    }

    const sectorItems: SquarifyItem<
      HeatmapStock[]
    >[] = groupedStocks.map(
      ([sectorName, sectorStocks]) => ({
        id: sectorName,
        value: sectorStocks.reduce(
          (sum, stock) =>
            sum + getMetricValue(stock, sizeBy),
          0,
        ),
        data: sectorStocks,
      }),
    );

    const sectorLayout = squarify(
      sectorItems,
      0,
      0,
      dimensions.width,
      dimensions.height,
    );

    return sectorLayout.map((sectorRect) => {
      const showHeader =
        sectorRect.w >= 56 &&
        sectorRect.h >= 46;

      const headerH = showHeader
        ? HEADER_HEIGHT
        : 0;

      const innerX =
        sectorRect.x + GAP;

      const innerY =
        sectorRect.y +
        headerH +
        GAP;

      const innerW = Math.max(
        sectorRect.w - GAP * 2,
        0,
      );

      const innerH = Math.max(
        sectorRect.h -
          headerH -
          GAP * 2,
        0,
      );

      const stockItems: SquarifyItem<
        HeatmapStock
      >[] = sectorRect.data.map(
        (stock) => ({
          id: stock.symbol,
          value: getMetricValue(
            stock,
            sizeBy,
          ),
          data: stock,
        }),
      );

      const tiles = squarify(
        stockItems,
        innerX,
        innerY,
        innerW,
        innerH,
      );

      return {
        sectorRect,
        showHeader,
        tiles,
      };
    });
  }, [
    groupedStocks,
    sizeBy,
    dimensions,
    isLoading,
    isError,
    isEmpty,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-lg bg-black ${heightClassName}`}
    >
      {isLoading ? (
        <HeatmapSkeletonDark />
      ) : isError ? (
        <HeatmapErrorDark />
      ) : isEmpty ? (
        <EmptyStateDark />
      ) : (
        sectorBlocks.map(
          ({
            sectorRect,
            showHeader,
            tiles,
          }) => (
            <div key={sectorRect.id}>
              {showHeader && (
                <div
                  className="pointer-events-none absolute flex items-center overflow-hidden"
                  style={{
                    left:
                      sectorRect.x +
                      GAP,
                    top:
                      sectorRect.y + 2,
                    width: Math.max(
                      sectorRect.w -
                        GAP * 2,
                      0,
                    ),
                    height:
                      HEADER_HEIGHT -
                      4,
                  }}
                >
                  <span className="truncate text-[9px] font-bold uppercase tracking-wider text-white/45">
                    {sectorRect.id}
                  </span>
                </div>
              )}

              {tiles.map((tile) => (
                <StockTile
                  key={tile.id}
                  tile={tile}
                />
              ))}
            </div>
          ),
        )
      )}
    </div>
  );
}

/* ============================================================
   STOCK TILE
============================================================ */

function StockTile({
  tile,
}: {
  tile: SquarifyResult<HeatmapStock>;
}) {
  const stock = tile.data;

  const tone = getDarkTileTone(
    stock.changePercent,
  );

  const canShowDetail =
    tile.w >= 62 && tile.h >= 44;

  const canShowSymbolOnly =
    !canShowDetail &&
    tile.w >= 28 &&
    tile.h >= 18;

  return (
    <Link
      href={`/dashboard/companies/${stock.symbol}`}
      className="group absolute block overflow-hidden transition-[filter] duration-150 hover:z-20 hover:brightness-125 focus-visible:z-20 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/60"
      style={{
        left: tile.x,
        top: tile.y,
        width: tile.w,
        height: tile.h,
        background: tone.background,
        border:
          "1px solid rgba(0,0,0,0.55)",
        boxSizing: "border-box",
      }}
    >
      {canShowDetail && (
        <div className="flex h-full flex-col justify-between p-1.5">
          <p className="truncate text-[11px] font-bold leading-tight text-white">
            {stock.symbol}
          </p>

          <p
            className="text-[10px] font-semibold tabular-nums"
            style={{
              color: tone.changeColor,
            }}
          >
            {formatChange(
              stock.changePercent,
            )}
          </p>
        </div>
      )}

      {canShowSymbolOnly && (
        <div className="flex h-full items-center justify-center px-0.5">
          <p className="truncate text-[8px] font-bold leading-none text-white/90">
            {stock.symbol}
          </p>
        </div>
      )}

      {/* HOVER DETAIL CARD */}

      <div className="pointer-events-none absolute left-0 top-0 z-30 hidden min-w-[150px] rounded-md border border-white/10 bg-[#101010] p-2 shadow-2xl group-hover:block">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-white">
            {stock.symbol}
          </span>

          <span
            className="text-[10px] font-bold"
            style={{
              color: tone.changeColor,
            }}
          >
            {formatChange(
              stock.changePercent,
            )}
          </span>
        </div>

        <p className="mt-0.5 truncate text-[9px] text-white/50">
          {stock.name}
        </p>

        <div className="mt-1.5 space-y-0.5 text-[9px]">
          <DetailRow
            label="Price"
            value={`NPR ${stock.price.toFixed(
              2,
            )}`}
          />

          <DetailRow
            label="Turnover"
            value={formatMoney(
              stock.turnover,
            )}
          />

          <DetailRow
            label="Volume"
            value={formatNumber(
              stock.volume,
            )}
          />

          <DetailRow
            label="Sector"
            value={stock.sector}
          />
        </div>
      </div>
    </Link>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-white/40">
        {label}
      </span>

      <span className="max-w-[100px] truncate font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   SIZE CONTROLS
============================================================ */

function SizeButtonGroup({
  sizeBy,
  onChange,
  dark = false,
}: {
  sizeBy: SizeBy;
  onChange: (value: SizeBy) => void;
  dark?: boolean;
}) {
  const options: {
    value: SizeBy;
    label: string;
  }[] = [
    {
      value: "turnover",
      label: "Turnover",
    },
    {
      value: "marketCap",
      label: "Market cap",
    },
    {
      value: "volume",
      label: "Volume",
    },
  ];

  return (
    <div className="flex items-center gap-0.5">
      {options.map((option) => {
        const active =
          sizeBy === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              onChange(option.value)
            }
            className={[
              "rounded-full px-3 py-1.5 text-xs font-semibold transition",
              active
                ? dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : dark
                  ? "text-white/50 hover:text-white"
                  : "text-[#656565] hover:text-black",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   CHANGE LEGEND
============================================================ */

function ChangeLegend({
  dark = false,
}: {
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-[9px] font-medium ${
          dark
            ? "text-white/40"
            : "text-[#656565]"
        }`}
      >
        -5%
      </span>

      <div
        className="h-2 w-20 rounded-full sm:w-28"
        style={{
          background:
            "linear-gradient(90deg, #e31b1b 0%, rgba(20,20,20,1) 50%, #0aa852 100%)",
        }}
      />

      <span
        className={`text-[9px] font-medium ${
          dark
            ? "text-white/40"
            : "text-[#656565]"
        }`}
      >
        +5%
      </span>
    </div>
  );
}

/* ============================================================
   SEARCH
============================================================ */

function SearchBox({
  value,
  onChange,
  dark = false,
}: {
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
}) {
  return (
    <div className="relative">
      <Search
        className={[
          "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2",
          dark
            ? "text-white/40"
            : "text-[#999]",
        ].join(" ")}
      />

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search symbol..."
        className={[
          "h-8 w-36 rounded-full pl-8 pr-3 text-xs outline-none transition sm:w-44",
          dark
            ? "border border-white/15 bg-white/5 text-white placeholder:text-white/30 focus:border-white/40"
            : "border border-[#d5d5d5] bg-white text-black placeholder:text-[#999] focus:border-[#01c45a] focus:ring-2 focus:ring-[#01c45a]/20",
        ].join(" ")}
      />
    </div>
  );
}

/* ============================================================
   SECTOR SELECT
============================================================ */

function SectorSelect({
  sectors,
  value,
  onChange,
  dark = false,
}: {
  sectors: string[];
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className={[
        "h-8 rounded-full px-3 text-xs font-medium outline-none transition",
        dark
          ? "border border-white/15 bg-white/5 text-white focus:border-white/40"
          : "border border-[#d5d5d5] bg-white text-black focus:border-[#01c45a]",
      ].join(" ")}
    >
      {sectors.map((item) => (
        <option
          key={item}
          value={item}
          className="text-black"
        >
          {item}
        </option>
      ))}
    </select>
  );
}

/* ============================================================
   LOADING STATE
============================================================ */

function HeatmapSkeletonDark() {
  return (
    <div className="grid h-full grid-cols-4 gap-1 p-1.5 sm:grid-cols-6">
      {Array.from({ length: 24 }).map(
        (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-sm bg-white/5"
            style={{
              height:
                index % 5 === 0
                  ? "100%"
                  : `${
                      60 +
                      (index % 3) * 15
                    }%`,
            }}
          />
        ),
      )}
    </div>
  );
}

/* ============================================================
   ERROR STATE
============================================================ */

function HeatmapErrorDark() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
        <X className="h-4 w-4 text-[#ff6b6b]" />
      </div>

      <p className="mt-2 text-xs font-semibold text-white">
        Market heatmap unavailable
      </p>

      <p className="mt-1 max-w-sm text-[10px] leading-4 text-white/50">
        We could not load the latest market
        heatmap. Please try again later.
      </p>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyStateDark() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
        <Search className="h-4 w-4 text-[#3ddc84]" />
      </div>

      <p className="mt-2 text-xs font-semibold text-white">
        No stocks found
      </p>

      <p className="mt-1 text-[10px] text-white/50">
        Try another symbol or select a
        different sector.
      </p>
    </div>
  );
}