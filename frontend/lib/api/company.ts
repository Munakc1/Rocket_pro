import type {
  Company,
  CompanySummary,
} from "@/lib/types/company";

const companies: Company[] = [
  {
    symbol: "NABIL",
    name: "Nabil Bank Limited",
    sector: "Banking",
    ltp: 512.4,
    change: 8.2,
    changePercent: 1.63,
    volume: 325400,
    turnover: 166400000,
  },
  {
    symbol: "NICA",
    name: "NIC Asia Bank Limited",
    sector: "Banking",
    ltp: 394.8,
    change: -3.4,
    changePercent: -0.85,
    volume: 286100,
    turnover: 112800000,
  },
  {
    symbol: "UPPER",
    name: "Upper Tamakoshi Hydropower",
    sector: "Hydropower",
    ltp: 221.5,
    change: 4.6,
    changePercent: 2.12,
    volume: 541200,
    turnover: 119900000,
  },
  {
    symbol: "NHPC",
    name: "National Hydropower Company",
    sector: "Hydropower",
    ltp: 278.2,
    change: -2.1,
    changePercent: -0.75,
    volume: 194500,
    turnover: 54100000,
  },
  {
    symbol: "SCB",
    name: "Standard Chartered Bank Nepal",
    sector: "Banking",
    ltp: 682,
    change: 6.5,
    changePercent: 0.96,
    volume: 75200,
    turnover: 51300000,
  },
];

export async function getCompanies(): Promise<Company[]> {
  return companies;
}

export async function getCompany(
  symbol: string,
): Promise<CompanySummary | null> {
  const company = companies.find(
    (item) => item.symbol.toUpperCase() === symbol.toUpperCase(),
  );

  if (!company) return null;

  return {
    ...company,
    previousClose: company.ltp - company.change,
    open: company.ltp - company.change * 0.4,
    high: company.ltp + Math.abs(company.change) * 1.4,
    low: company.ltp - Math.abs(company.change) * 0.9,
    fiftyTwoWeekHigh: company.ltp * 1.22,
    fiftyTwoWeekLow: company.ltp * 0.74,
  };
}