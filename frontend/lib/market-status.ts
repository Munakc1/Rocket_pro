export type MarketStatus = {
  isOpen: boolean;
  label: "Market Open" | "Market Closed";
};

export function getNepseMarketStatus(): MarketStatus {
  const now = new Date();

  // Convert current time to Nepal time (Asia/Kathmandu)
  const nepalTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const parts = Object.fromEntries(
    nepalTime.map((part) => [part.type, part.value]),
  );

  const weekday = parts.weekday;
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);

  // NEPSE trading days: Sunday–Thursday
  const isTradingDay =
    weekday === "Sun" ||
    weekday === "Mon" ||
    weekday === "Tue" ||
    weekday === "Wed" ||
    weekday === "Thu";

  if (!isTradingDay) {
    return {
      isOpen: false,
      label: "Market Closed",
    };
  }

  const currentMinutes = hour * 60 + minute;

  const marketOpen = 11 * 60;
  const marketClose = 15 * 60;

  const isOpen =
    currentMinutes >= marketOpen && currentMinutes < marketClose;

  return {
    isOpen,
    label: isOpen ? "Market Open" : "Market Closed",
  };
}