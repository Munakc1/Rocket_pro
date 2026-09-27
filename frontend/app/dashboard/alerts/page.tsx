import { Bell, Plus } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#0aa852]">
            Market monitoring
          </p>

          <h1 className="mt-1 text-2xl font-bold text-black">
            Market Alerts
          </h1>

          <p className="mt-2 text-sm text-[#656565]">
            Create alerts to monitor selected market conditions.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#078d45]"
        >
          <Plus size={16} />
          Create Alert
        </button>
      </div>

      <div className="mt-7 rounded-2xl border border-dashed border-[#d5d5d5] bg-[#fbfbfb] px-6 py-14 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#dcffec] text-[#0aa852]">
          <Bell size={21} />
        </div>

        <h2 className="mt-4 font-semibold text-black">
          No alerts yet
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#656565]">
          Price and market alerts can be added here when the alert
          backend is connected.
        </p>
      </div>
    </div>
  );
}