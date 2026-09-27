import { getCompanies } from "@/lib/api/companies";

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium text-[#0aa852]">
          Listed companies
        </p>

        <h1 className="mt-1 text-2xl font-bold text-black">
          Companies
        </h1>

        <p className="mt-2 text-sm text-[#656565]">
          Explore listed companies and their market information.
        </p>
      </div>

      <div className="mt-7 overflow-x-auto rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb]">
        <table className="w-full min-w-[720px] text-left">
          <thead className="border-b border-[#ececec]">
            <tr className="text-xs uppercase tracking-wide text-[#656565]">
              <th className="px-5 py-4">Symbol</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Sector</th>
              <th className="px-5 py-4">LTP</th>
              <th className="px-5 py-4">Change</th>
              <th className="px-5 py-4">Volume</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company.symbol}
                className="border-b border-[#ececec] last:border-0 hover:bg-[#f1f9f4]"
              >
                <td className="px-5 py-4">
                  <a
                    href={`/company/${company.symbol}`}
                    className="font-semibold text-[#0aa852] hover:underline"
                  >
                    {company.symbol}
                  </a>
                </td>

                <td className="px-5 py-4 text-sm font-medium">
                  {company.name}
                </td>

                <td className="px-5 py-4 text-sm text-[#656565]">
                  {company.sector}
                </td>

                <td className="px-5 py-4 text-sm font-semibold">
                  NPR {company.ltp.toFixed(2)}
                </td>

                <td
                  className={[
                    "px-5 py-4 text-sm font-semibold",
                    company.changePercent >= 0
                      ? "text-[#0aa852]"
                      : "text-[#e31b1b]",
                  ].join(" ")}
                >
                  {company.changePercent >= 0 ? "+" : ""}
                  {company.changePercent.toFixed(2)}%
                </td>

                <td className="px-5 py-4 text-sm text-[#656565]">
                  {company.volume.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}