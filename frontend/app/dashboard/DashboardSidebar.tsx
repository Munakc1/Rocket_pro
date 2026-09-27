"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  DollarSign,
  LayoutDashboard,
  LineChart,
  LogOut,
  Newspaper,
  PanelLeftClose,
  Settings,
  Star,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type NavigationItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type MarketItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

/* ============================================================
   MAIN NAVIGATION
============================================================ */

const mainNavigation: NavigationItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Watchlist",
    href: "/dashboard/watchlist",
    icon: Star,
  },
  {
    label: "Companies",
    href: "/dashboard/companies",
    icon: Building2,
  },
  {
    label: "Market Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
  },
  {
    label: "Saved News",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    label: "Training",
    href: "/dashboard/training",
    icon: BookOpen,
  },
];

/* ============================================================
   NEPSE DATA NAVIGATION
============================================================ */

const marketNavigation: MarketItem[] = [
  {
    label: "Indices",
    href: "/market/indices",
    icon: BarChart3,
  },
  {
    label: "Market Summary",
    href: "/market/summary",
    icon: Activity,
  },
  {
    label: "Today's Share Price",
    href: "/market/today-share-price",
    icon: DollarSign,
  },
  {
    label: "Live Market",
    href: "/market/live",
    icon: LineChart,
  },
  {
    label: "Market Calendar",
    href: "/market/calendar",
    icon: CalendarDays,
  },
];

/* ============================================================
   ACCOUNT NAVIGATION
============================================================ */

const accountNavigation: NavigationItem[] = [
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

/* ============================================================
   STORAGE KEYS
============================================================ */

const SIDEBAR_STORAGE_KEY = "rocket-pro-dashboard-sidebar";
const MARKET_STORAGE_KEY = "rocket-pro-market-navigation";

/* ============================================================
   COMPONENT
============================================================ */

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  /* ==========================================================
     SIDEBAR STATE
  ========================================================== */

  const [collapsed, setCollapsed] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ==========================================================
     INITIALIZE FROM LOCAL STORAGE
  ========================================================== */

  useEffect(() => {
    setMounted(true);

    const savedSidebarState = window.localStorage.getItem(
      SIDEBAR_STORAGE_KEY
    );

    if (savedSidebarState === "collapsed") {
      setCollapsed(true);
    }

    const savedMarketState = window.localStorage.getItem(
      MARKET_STORAGE_KEY
    );

    if (savedMarketState === "closed") {
      setMarketOpen(false);
    } else if (savedMarketState === "open") {
      setMarketOpen(true);
    }
  }, []);

  /* ==========================================================
     AUTO OPEN NEPSE DATA WHEN INSIDE /market
  ========================================================== */

  useEffect(() => {
    if (pathname.startsWith("/market")) {
      setMarketOpen(true);

      window.localStorage.setItem(
        MARKET_STORAGE_KEY,
        "open"
      );
    }
  }, [pathname]);

  /* ==========================================================
     TOGGLE SIDEBAR
  ========================================================== */

  function toggleSidebar() {
    const nextState = !collapsed;

    setCollapsed(nextState);

    window.localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      nextState ? "collapsed" : "expanded"
    );
  }

  /* ==========================================================
     TOGGLE MARKET NAVIGATION
  ========================================================== */

  function toggleMarketNavigation() {
    const nextState = !marketOpen;

    setMarketOpen(nextState);

    window.localStorage.setItem(
      MARKET_STORAGE_KEY,
      nextState ? "open" : "closed"
    );
  }

  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  /* ==========================================================
     MARKET ACTIVE
  ========================================================== */

  const marketActive = pathname.startsWith("/market");

  /* ==========================================================
     SIGN OUT
  ========================================================== */

  function handleSignOut() {
    setSignOutOpen(false);

    /*
      Replace this with your real authentication
      logout API/session clearing later.
    */

    router.push("/login");
  }

  /* ==========================================================
     KEYBOARD SHORTCUT
  ========================================================== */

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      /*
        Ctrl + B
        Toggle sidebar.
      */

      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "b"
      ) {
        event.preventDefault();
        toggleSidebar();
      }

      /*
        Escape closes sign-out dialog.
      */

      if (event.key === "Escape") {
        setSignOutOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [collapsed]);

  /* ==========================================================
     HYDRATION PLACEHOLDER
  ========================================================== */

  if (!mounted) {
    return (
      <aside className="hidden h-screen w-[252px] shrink-0 border-r border-[#d5d5d5] bg-[#fbfbfb] lg:sticky lg:top-0 lg:flex lg:flex-col" />
    );
  }

  return (
    <>
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={[
          "hidden h-screen shrink-0",
          "border-r border-[#d5d5d5]",
          "bg-[#fbfbfb]",
          "lg:sticky lg:top-0 lg:flex lg:flex-col",
          "transition-[width] duration-300 ease-in-out",
          collapsed
            ? "w-[80px]"
            : "w-[252px]",
        ].join(" ")}
      >
        {/* ==================================================
            BRAND
        ================================================== */}

        <div
          className={[
            "relative flex h-[82px] shrink-0 items-center",
            "border-b border-[#d5d5d5]",
            collapsed
              ? "justify-center px-3"
              : "px-6",
          ].join(" ")}
        >
          <Link
            href="/"
            aria-label="Rocket Pro home"
            className="
              flex
              shrink-0
              items-center
              rounded-md
              outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0aa852]
              focus-visible:ring-offset-2
            "
          >
            <Image
              src="/images/logo.png"
              alt="Rocket Pro"
              width={200}
              height={56}
              priority
              className={[
                "w-auto object-contain",
                "transition-all duration-300",
                collapsed
                  ? "h-9 max-w-[54px]"
                  : "h-10 sm:h-11",
              ].join(" ")}
            />
          </Link>

          {/* ==================================================
              SIDEBAR COLLAPSE / EXPAND
          ================================================== */}

          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            aria-expanded={!collapsed}
            title={
              collapsed
                ? "Expand sidebar (Ctrl+B)"
                : "Collapse sidebar (Ctrl+B)"
            }
            className="
              absolute
              -right-3
              top-1/2
              z-20
              flex
              h-7
              w-7
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#d5d5d5]
              bg-white
              text-[#656565]
              shadow-[0_2px_8px_rgba(0,0,0,0.08)]
              transition-all
              duration-200
              hover:border-[#01c45a]
              hover:bg-[#f1f9f4]
              hover:text-[#0aa852]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0aa852]
              focus-visible:ring-offset-1
            "
          >
            <PanelLeftClose
              size={18}
              strokeWidth={2}
              className={[
                "transition-transform duration-200",
                collapsed
                  ? "rotate-180"
                  : "rotate-0",
              ].join(" ")}
            />
          </button>
        </div>

        {/* ==================================================
            MAIN SCROLLABLE AREA
        ================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-6">

          {/* =================================================
              DASHBOARD
          ================================================= */}

          <section>
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#686868]">
                Dashboard
              </p>
            )}

            <nav
              aria-label="Dashboard navigation"
              className="space-y-1"
            >
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarLink
                    key={item.href}
                    item={item}
                    Icon={Icon}
                    active={active}
                    collapsed={collapsed}
                  />
                );
              })}
            </nav>
          </section>

          {/* =================================================
              NEPSE DATA
          ================================================= */}

          <section className="mt-7">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#686868]">
                Market
              </p>
            )}

            {/* ===============================================
                COLLAPSED MARKET BUTTON
            =============================================== */}

            {collapsed ? (
              <div className="group relative">
                <button
                  type="button"
                  onClick={() =>
                    setMarketOpen(!marketOpen)
                  }
                  title="NEPSE Data"
                  aria-label="Open NEPSE Data"
                  aria-expanded={marketOpen}
                  className={[
                    "flex h-11 w-full items-center justify-center rounded-xl",
                    "transition",
                    marketActive
                      ? "bg-[#dcffec] text-[#0aa852]"
                      : "text-[#474747] hover:bg-[#f1f9f4] hover:text-black",
                  ].join(" ")}
                >
                  <Building2
                    size={18}
                    strokeWidth={
                      marketActive ? 2.1 : 1.8
                    }
                  />
                </button>

                <CollapsedTooltip>
                  NEPSE Data
                </CollapsedTooltip>
              </div>
            ) : (
              <>
                {/* =========================================
                    EXPANDED MARKET BUTTON
                ========================================= */}

                <button
                  type="button"
                  onClick={
                    toggleMarketNavigation
                  }
                  aria-expanded={marketOpen}
                  className={[
                    "flex h-11 w-full items-center justify-between rounded-xl px-3",
                    "text-[13px] font-medium",
                    "transition",
                    marketActive
                      ? "bg-[#dcffec] text-[#0aa852]"
                      : "text-[#474747] hover:bg-[#f1f9f4] hover:text-black",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    <Building2
                      size={18}
                      strokeWidth={
                        marketActive ? 2.1 : 1.8
                      }
                    />

                    <span>NEPSE Data</span>
                  </span>

                  <ChevronDown
                    size={15}
                    className={[
                      "text-[#656565]",
                      "transition-transform duration-200",
                      marketOpen
                        ? "rotate-0"
                        : "-rotate-90",
                    ].join(" ")}
                  />
                </button>

                {/* =========================================
                    MARKET SUBMENU
                ========================================= */}

                <div
                  className={[
                    "grid transition-[grid-template-rows] duration-200",
                    marketOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="min-h-0 overflow-hidden">
                    <nav
                      className="
                        ml-4
                        mt-1
                        space-y-1
                        border-l
                        border-[#d5d5d5]
                        pl-2
                      "
                      aria-label="NEPSE navigation"
                    >
                      {marketNavigation.map(
                        (item) => {
                          const Icon = item.icon;
                          const active =
                            isActive(item.href);

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              aria-current={
                                active
                                  ? "page"
                                  : undefined
                              }
                              className={[
                                "flex h-10 items-center gap-2.5 rounded-lg px-3",
                                "text-[12px] font-medium",
                                "transition",
                                active
                                  ? "bg-[#dcffec] text-[#0aa852]"
                                  : "text-[#656565] hover:bg-[#f1f9f4] hover:text-black",
                              ].join(" ")}
                            >
                              <Icon
                                size={15}
                                strokeWidth={
                                  active
                                    ? 2
                                    : 1.7
                                }
                              />

                              <span className="truncate">
                                {item.label}
                              </span>
                            </Link>
                          );
                        }
                      )}
                    </nav>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* =================================================
              ACCOUNT
          ================================================= */}

          <section className="mt-7">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#686868]">
                Account
              </p>
            )}

            <nav
              aria-label="Account navigation"
              className="space-y-1"
            >
              {accountNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarLink
                    key={item.href}
                    item={item}
                    Icon={Icon}
                    active={active}
                    collapsed={collapsed}
                  />
                );
              })}
            </nav>
          </section>
        </div>

        {/* ==================================================
            BOTTOM ACCOUNT
        ================================================== */}

        <div className="shrink-0 border-t border-[#d5d5d5] p-3">

          {/* ==================================================
              USER
          ================================================== */}

          <div
            className={[
              "mb-2 flex items-center rounded-xl bg-[#f1f9f4] py-3",
              collapsed
                ? "justify-center px-2"
                : "gap-3 px-3",
            ].join(" ")}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dcffec] text-xs font-bold text-[#0aa852]">
              MK
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-black">
                  Muna K.C.
                </p>

                <p className="mt-0.5 truncate text-[10px] text-[#656565]">
                  Free account
                </p>
              </div>
            )}
          </div>

          {/* ==================================================
              SIGN OUT
          ================================================== */}

          <div className="group relative">
            <button
              type="button"
              onClick={() =>
                setSignOutOpen(true)
              }
              title={
                collapsed
                  ? "Sign out"
                  : undefined
              }
              className={[
                "flex h-10 w-full items-center rounded-xl",
                "text-[13px] font-medium",
                "text-[#656565]",
                "transition",
                "hover:bg-[#fff1f1]",
                "hover:text-[#e31b1b]",
                collapsed
                  ? "justify-center px-3"
                  : "gap-3 px-3",
              ].join(" ")}
            >
              <LogOut
                size={17}
                strokeWidth={1.8}
              />

              {!collapsed && (
                <span>Sign out</span>
              )}
            </button>

            {collapsed && (
              <CollapsedTooltip>
                Sign out
              </CollapsedTooltip>
            )}
          </div>
        </div>
      </aside>

      {/* ======================================================
          SIGN OUT CONFIRMATION
      ====================================================== */}

      {signOutOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/30
            p-4
            backdrop-blur-sm
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="signout-title"
        >
          <div
            className="
              w-full
              max-w-[380px]
              rounded-2xl
              border
              border-[#d5d5d5]
              bg-white
              p-5
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            "
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1f1] text-[#e31b1b]">
              <LogOut size={19} />
            </div>

            <h2
              id="signout-title"
              className="mt-4 text-sm font-semibold text-black"
            >
              Sign out of Rocket Pro?
            </h2>

            <p className="mt-2 text-xs leading-5 text-[#656565]">
              You will need to sign in again
              to access your dashboard.
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setSignOutOpen(false)
                }
                className="
                  flex-1
                  rounded-xl
                  border
                  border-[#d5d5d5]
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#474747]
                  transition
                  hover:bg-[#f1f9f4]
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="
                  flex-1
                  rounded-xl
                  bg-[#e31b1b]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#c91919]
                "
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   SIDEBAR LINK
============================================================ */

function SidebarLink({
  item,
  Icon,
  active,
  collapsed,
}: {
  item: NavigationItem;
  Icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <div className="group relative">
      <Link
        href={item.href}
        aria-current={
          active ? "page" : undefined
        }
        title={
          collapsed
            ? item.label
            : undefined
        }
        className={[
          "relative flex h-11 items-center rounded-xl",
          "text-[13px] font-medium",
          "transition-all duration-200",
          collapsed
            ? "justify-center px-3"
            : "gap-3 px-3",
          active
            ? "bg-[#dcffec] text-[#0aa852]"
            : "text-[#474747] hover:bg-[#f1f9f4] hover:text-black",
        ].join(" ")}
      >
        {active && (
          <span
            className="
              absolute
              left-0
              top-1/2
              h-5
              w-[3px]
              -translate-y-1/2
              rounded-r-full
              bg-[#0aa852]
            "
          />
        )}

        <Icon
          size={18}
          strokeWidth={
            active ? 2.1 : 1.8
          }
          className="shrink-0"
        />

        {!collapsed && (
          <span className="truncate">
            {item.label}
          </span>
        )}
      </Link>

      {collapsed && (
        <CollapsedTooltip>
          {item.label}
        </CollapsedTooltip>
      )}
    </div>
  );
}

/* ============================================================
   COLLAPSED TOOLTIP
============================================================ */

function CollapsedTooltip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        left-[calc(100%+12px)]
        top-1/2
        z-[70]
        -translate-y-1/2
        translate-x-1
        whitespace-nowrap
        rounded-lg
        bg-[#0f172a]
        px-3
        py-2
        text-[11px]
        font-medium
        text-white
        opacity-0
        shadow-lg
        transition-all
        duration-150
        group-hover:translate-x-0
        group-hover:opacity-100
      "
    >
      {children}

      <span
        className="
          absolute
          left-0
          top-1/2
          h-2
          w-2
          -translate-x-1
          -translate-y-1/2
          rotate-45
          bg-[#0f172a]
        "
      />
    </div>
  );
}