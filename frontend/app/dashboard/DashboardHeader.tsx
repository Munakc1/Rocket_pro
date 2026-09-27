
"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserRound,
  X,
  LogOut,
  Settings,
  User,
  BarChart3,
  Newspaper,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ============================================================
   SEARCH DATA
============================================================ */

const searchItems = [
  { symbol: "NABIL", name: "Nabil Bank Limited" },
  { symbol: "NICA", name: "NIC Asia Bank Limited" },
  { symbol: "HBL", name: "Himalayan Bank Limited" },
  { symbol: "NLIC", name: "Nepal Life Insurance" },
  { symbol: "SHIVM", name: "Shivam Cements Limited" },
  { symbol: "UPPER", name: "Upper Tamakoshi Hydropower" },
  { symbol: "NHPC", name: "National Hydropower Company" },
  { symbol: "HDHPC", name: "Himalayan Hydropower Limited" },
];

/* ============================================================
   MOBILE NAVIGATION
============================================================ */

const mobileLinks = [
  {
    label: "Market",
    href: "/dashboard/market",
    icon: BarChart3,
  },
  {
    label: "Latest News",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    label: "Market Movers",
    href: "/dashboard/market/movers",
    icon: TrendingUp,
  },
  {
    label: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
  },
];

/* ============================================================
   NEPSE MARKET STATUS
============================================================ */

/**
 * NEPSE regular trading session:
 *
 * Sunday - Thursday
 * 11:00 AM - 3:00 PM
 *
 * Friday - Saturday
 * Closed
 *
 * IMPORTANT:
 * All calculations are performed using Nepal time.
 */

type MarketStatus = {
  isOpen: boolean;
  label: "Market Open" | "Market Closed";
  reason: string;
};

function getNepalDateParts() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(new Date());

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    weekday: get("weekday"),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

function getNepseMarketStatus(): MarketStatus {
  const {
    weekday,
    hour,
    minute,
  } = getNepalDateParts();

  /*
   * Friday and Saturday are closed.
   */

  if (weekday === "Friday" || weekday === "Saturday") {
    return {
      isOpen: false,
      label: "Market Closed",
      reason: "Market holiday",
    };
  }

  /*
   * Convert current time to minutes.
   */

  const currentMinutes =
    hour * 60 + minute;

  const marketOpen = 11 * 60;
  const marketClose = 15 * 60;

  /*
   * Before 11:00 AM
   */

  if (currentMinutes < marketOpen) {
    return {
      isOpen: false,
      label: "Market Closed",
      reason: "Opens at 11:00 AM",
    };
  }

  /*
   * 11:00 AM - 3:00 PM
   */

  if (
    currentMinutes >= marketOpen &&
    currentMinutes < marketClose
  ) {
    return {
      isOpen: true,
      label: "Market Open",
      reason: "Trading session active",
    };
  }

  /*
   * After 3:00 PM
   */

  return {
    isOpen: false,
    label: "Market Closed",
    reason: "Closed at 3:00 PM",
  };
}

/* ============================================================
   MARKET STATUS HOOK
============================================================ */

function useNepseMarketStatus() {
  const [status, setStatus] =
    useState<MarketStatus | null>(null);

  useEffect(() => {
    /*
     * Calculate immediately.
     */

    setStatus(getNepseMarketStatus());

    /*
     * Update every 30 seconds.
     *
     * This means the header automatically changes:
     *
     * 10:59 AM -> Closed
     * 11:00 AM -> Open
     * 3:00 PM -> Closed
     */

    const interval = window.setInterval(() => {
      setStatus(getNepseMarketStatus());
    }, 30_000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return status;
}

/* ============================================================
   HEADER
============================================================ */

export default function DashboardHeader() {
  const router = useRouter();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const profileRef =
    useRef<HTMLDivElement>(null);

  const searchRef =
    useRef<HTMLDivElement>(null);

  /*
   * Real NEPSE market status.
   */

  const marketStatus =
    useNepseMarketStatus();

  /* ==========================================================
     OUTSIDE CLICK
  ========================================================== */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ==========================================================
     ESCAPE KEY
  ========================================================== */

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* ==========================================================
     SEARCH FILTER
  ========================================================== */

  const filteredResults =
    searchItems.filter((item) => {
      const query =
        searchQuery.toLowerCase().trim();

      if (!query) return false;

      return (
        item.symbol
          .toLowerCase()
          .includes(query) ||
        item.name
          .toLowerCase()
          .includes(query)
      );
    });

  /* ==========================================================
     SEARCH SUBMIT
  ========================================================== */

  function handleSearchSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const query =
      searchQuery.trim();

    if (!query) return;

    setSearchOpen(false);

    router.push(
      `/dashboard/search?q=${encodeURIComponent(
        query
      )}`
    );
  }

  /* ==========================================================
     COMPANY SELECT
  ========================================================== */

  function handleCompanySelect(
    symbol: string
  ) {
    setSearchQuery("");
    setSearchOpen(false);

    router.push(
      `/dashboard/company/${symbol}`
    );
  }

  /* ==========================================================
     LOGOUT
  ========================================================== */

  function handleLogout() {
    setProfileOpen(false);

    /*
     * Replace this with your actual
     * authentication logout function.
     */

    router.push("/login");
  }

  return (
    <>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 h-[82px] border-b border-[#d5d5d5] bg-[#fbfbfb]/95 backdrop-blur-md">
        <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* ==================================================
              MOBILE BRAND
          ================================================== */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 lg:hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0aa852] text-white">
              <span className="text-sm font-bold">
                R
              </span>
            </div>

            <span className="text-[16px] font-bold tracking-tight text-black">
              Rocket{" "}
              <span className="text-[#0aa852]">
                प्रो
              </span>
            </span>
          </Link>

          {/* ==================================================
              SEARCH
          ================================================== */}

          <div
            ref={searchRef}
            className="hidden min-w-0 flex-1 md:block"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-[500px]"
            >
              <Search
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#656565]"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(
                    event.target.value
                  );
                  setSearchOpen(true);
                }}
                onFocus={() => {
                  if (searchQuery) {
                    setSearchOpen(true);
                  }
                }}
                placeholder="Search companies, symbols..."
                aria-label="Search companies and symbols"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#d5d5d5]
                  bg-white
                  pl-10
                  pr-4
                  text-[13px]
                  text-black
                  outline-none
                  placeholder:text-[#888888]
                  transition
                  focus:border-[#01c45a]
                  focus:ring-2
                  focus:ring-[#0aa852]/10
                "
              />

              {searchOpen &&
                searchQuery && (
                  <div className="absolute left-0 right-0 top-[50px] z-50 overflow-hidden rounded-2xl border border-[#d5d5d5] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.10)]">
                    {filteredResults.length >
                    0 ? (
                      <div className="p-1.5">
                        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#888888]">
                          Companies
                        </p>

                        {filteredResults.map(
                          (item) => (
                            <button
                              key={
                                item.symbol
                              }
                              type="button"
                              onClick={() =>
                                handleCompanySelect(
                                  item.symbol
                                )
                              }
                              className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2.5
                                text-left
                                transition
                                hover:bg-[#f1f9f4]
                              "
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#dcffec] text-[11px] font-bold text-[#0aa852]">
                                {item.symbol.slice(
                                  0,
                                  2
                                )}
                              </span>

                              <span className="min-w-0">
                                <span className="block text-xs font-semibold text-black">
                                  {
                                    item.symbol
                                  }
                                </span>

                                <span className="block truncate text-[11px] text-[#656565]">
                                  {
                                    item.name
                                  }
                                </span>
                              </span>
                            </button>
                          )
                        )}

                        <button
                          type="submit"
                          className="mt-1 flex w-full items-center gap-2 border-t border-[#eeeeee] px-3 py-3 text-xs font-medium text-[#0aa852] hover:bg-[#f1f9f4]"
                        >
                          <Search
                            size={14}
                          />

                          Search for "
                          {searchQuery}"
                        </button>
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <Search
                          size={20}
                          className="mx-auto text-[#999999]"
                        />

                        <p className="mt-2 text-xs font-semibold text-black">
                          No companies
                          found
                        </p>

                        <p className="mt-1 text-[11px] text-[#656565]">
                          Try another
                          company or
                          symbol.
                        </p>
                      </div>
                    )}
                  </div>
                )}
            </form>
          </div>

          {/* ==================================================
              MOBILE MENU
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(true)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[#d5d5d5]
              text-[#474747]
              transition
              hover:bg-[#f1f9f4]
              md:hidden
            "
            aria-label="Open dashboard menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={19} />
          </button>

          {/* ==================================================
              RIGHT CONTROLS
          ================================================== */}

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* ==================================================
                REAL MARKET STATUS
            ================================================== */}

            <Link
              href="/dashboard/market"
              title={
                marketStatus?.reason ??
                "Checking market status..."
              }
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-[#d5d5d5]
                bg-white
                px-3
                py-2
                transition
                hover:border-[#01c45a]
                hover:bg-[#f1f9f4]
                xl:flex
              "
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  marketStatus?.isOpen
                    ? "bg-[#0aa852]"
                    : "bg-[#727272]"
                }`}
              />

              <span
                className={`text-[11px] font-medium ${
                  marketStatus?.isOpen
                    ? "text-[#0aa852]"
                    : "text-[#656565]"
                }`}
              >
                {marketStatus?.label ??
                  "Checking..."}
              </span>
            </Link>

            {/* ==================================================
                NOTIFICATIONS
            ================================================== */}

            <Link
              href="/dashboard/alerts"
              aria-label="Market alerts"
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[#d5d5d5]
                bg-white
                text-[#474747]
                transition
                hover:border-[#01c45a]
                hover:bg-[#f1f9f4]
              "
            >
              <Bell
                size={18}
                strokeWidth={1.8}
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[9px]
                  top-[8px]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#e31b1b]
                "
              />
            </Link>

            {/* ==================================================
                PROFILE
            ================================================== */}

            <div
              ref={profileRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(
                    (value) => !value
                  );

                  setSearchOpen(false);
                }}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-transparent
                  px-1.5
                  transition
                  hover:bg-[#f1f9f4]
                  sm:px-2
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcffec] text-xs font-bold text-[#0aa852]">
                  MK
                </span>

                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold text-black">
                    Muna K.C.
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#656565]">
                    Free account
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className={`hidden text-[#656565] transition-transform sm:block ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  className="
                    absolute
                    right-0
                    top-[52px]
                    z-50
                    w-[220px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#d5d5d5]
                    bg-white
                    p-1.5
                    shadow-[0_12px_35px_rgba(0,0,0,0.10)]
                  "
                >
                  <div className="border-b border-[#ececec] px-3 py-3">
                    <p className="text-xs font-semibold text-black">
                      Muna K.C.
                    </p>

                    <p className="mt-1 text-[11px] text-[#656565]">
                      Free account
                    </p>
                  </div>

                  <Link
                    href="/dashboard/profile"
                    role="menuitem"
                    onClick={() =>
                      setProfileOpen(
                        false
                      )
                    }
                    className="
                      mt-1
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-medium
                      text-[#474747]
                      hover:bg-[#f1f9f4]
                    "
                  >
                    <User size={15} />
                    Profile
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    role="menuitem"
                    onClick={() =>
                      setProfileOpen(
                        false
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-medium
                      text-[#474747]
                      hover:bg-[#f1f9f4]
                    "
                  >
                    <Settings size={15} />
                    Settings
                  </Link>

                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-2
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-medium
                      text-[#e31b1b]
                      hover:bg-[#fff4f4]
                    "
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE DRAWER
      ======================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close dashboard menu"
            onClick={() =>
              setMobileOpen(false)
            }
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />

          <aside
            className="
              absolute
              right-0
              top-0
              flex
              h-full
              w-[300px]
              max-w-[85vw]
              flex-col
              border-l
              border-[#d5d5d5]
              bg-[#fbfbfb]
              shadow-[-15px_0_40px_rgba(0,0,0,0.12)]
            "
          >
            <div className="flex h-[82px] items-center justify-between border-b border-[#d5d5d5] px-5">
              <Link
                href="/"
                onClick={() =>
                  setMobileOpen(
                    false
                  )
                }
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0aa852] text-white">
                  <span className="text-sm font-bold">
                    R
                  </span>
                </div>

                <span className="text-[16px] font-bold text-black">
                  Rocket{" "}
                  <span className="text-[#0aa852]">
                    प्रो
                  </span>
                </span>
              </Link>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(
                    false
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d5d5d5] hover:bg-[#f1f9f4]"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-[#ececec] p-4">
              <form
                onSubmit={(event) => {
                  handleSearchSubmit(
                    event
                  );

                  setMobileOpen(
                    false
                  );
                }}
                className="relative"
              >
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#656565]"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search companies..."
                  className="
                    h-10
                    w-full
                    rounded-xl
                    border
                    border-[#d5d5d5]
                    bg-white
                    pl-9
                    pr-3
                    text-xs
                    outline-none
                    focus:border-[#01c45a]
                  "
                />
              </form>
            </div>

            <nav className="flex-1 space-y-1 p-3">
              <p className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-[#888888]">
                Dashboard
              </p>

              {mobileLinks.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-sm
                        font-medium
                        text-[#474747]
                        transition
                        hover:bg-[#f1f9f4]
                        hover:text-[#0aa852]
                      "
                    >
                      <Icon
                        size={17}
                      />

                      {item.label}
                    </Link>
                  );
                }
              )}
            </nav>

            <div className="border-t border-[#d5d5d5] p-4">
              <div className="rounded-2xl bg-[#f1f9f4] p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcffec] text-xs font-bold text-[#0aa852]">
                    MK
                  </span>

                  <div>
                    <p className="text-xs font-semibold text-black">
                      Muna K.C.
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#656565]">
                      Free account
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/profile"
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#d5d5d5]
                    bg-white
                    py-2.5
                    text-xs
                    font-semibold
                    text-[#474747]
                    hover:border-[#01c45a]
                  "
                >
                  View Profile
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

