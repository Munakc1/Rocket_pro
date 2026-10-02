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
    label: "Market Ticker",
    href: "/market/ticker",
    icon: LineChart,
  },
  {
    label: "Today's Share Price",
    href: "/market/today-share-price",
    icon: DollarSign,
  },
  {
    label: "Live Market",
    href: "/market/live",
    icon: Activity,
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

const SIDEBAR_STORAGE_KEY =
  "rocket-pro-dashboard-sidebar";

const MARKET_STORAGE_KEY =
  "rocket-pro-market-navigation";

/* ============================================================
   COMPONENT
============================================================ */

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  /* ==========================================================
     STATE
  ========================================================== */

  const [collapsed, setCollapsed] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ==========================================================
     INITIALIZE LOCAL STORAGE
  ========================================================== */

  useEffect(() => {
    setMounted(true);

    const savedSidebarState =
      window.localStorage.getItem(
        SIDEBAR_STORAGE_KEY
      );

    if (savedSidebarState === "collapsed") {
      setCollapsed(true);
    }

    const savedMarketState =
      window.localStorage.getItem(
        MARKET_STORAGE_KEY
      );

    if (savedMarketState === "closed") {
      setMarketOpen(false);
    } else if (savedMarketState === "open") {
      setMarketOpen(true);
    }
  }, []);

  /* ==========================================================
     AUTO OPEN MARKET NAVIGATION
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
     SIDEBAR TOGGLE
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
     MARKET TOGGLE
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

  const marketActive =
    pathname.startsWith("/market");

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
    function handleKeyboard(
      event: KeyboardEvent
    ) {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "b"
      ) {
        event.preventDefault();
        toggleSidebar();
      }

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
      <aside
        className="
          hidden
          h-screen
          w-[252px]
          shrink-0
          border-r-[0.5px]
          border-card
          bg-panel
          lg:sticky
          lg:top-0
          lg:flex
          lg:flex-col
        "
      />
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
          "border-r-[0.5px] border-card",
          "bg-panel",
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
            "relative flex h-[82px] shrink-0",
            "items-center",
            "border-b-[0.5px] border-card",
            "bg-panel",
            collapsed
              ? "justify-center px-3"
              : "px-5",
          ].join(" ")}
        >
          {/* =================================================
              LOGO
              Keeps user on the current page.
          ================================================= */}

          <Link
            href={pathname}
            aria-label="Rocket Pro dashboard"
            className={[
              "group flex min-w-0 items-center",
              "rounded-xl",
              "outline-none",
              "transition-all duration-200",
              "focus-visible:ring-2",
              "focus-visible:ring-primary",
              "focus-visible:ring-offset-2",
              collapsed
                ? "justify-center"
                : "w-full",
            ].join(" ")}
          >
            <div
              className={[
                "flex items-center",
                "transition-all duration-300",
                collapsed
                  ? "justify-center"
                  : "w-full",
              ].join(" ")}
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
                  "group-hover:scale-[1.02]",
                  collapsed
                    ? "h-9 max-w-[54px]"
                    : "h-10 sm:h-11",
                ].join(" ")}
              />
            </div>
          </Link>

          {/* ==================================================
              SIDEBAR COLLAPSE BUTTON
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
              border-[0.5px]
              border-card
              bg-surface
              text-muted
              shadow-[0_2px_8px_rgba(0,0,0,0.08)]
              transition-all
              duration-200
              hover:border-primary-border
              hover:bg-news
              hover:text-primary
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
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

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-3
            py-6
          "
        >
          {/* =================================================
              DASHBOARD
          ================================================= */}

          <section>
            {!collapsed && (
              <p
                className="
                  mb-2
                  px-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-faint
                "
              >
                Dashboard
              </p>
            )}

            <nav
              aria-label="Dashboard navigation"
              className="space-y-1"
            >
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active =
                  isActive(item.href);

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
              MARKET
          ================================================= */}

          <section className="mt-7">
            {!collapsed && (
              <p
                className="
                  mb-2
                  px-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-faint
                "
              >
                Market
              </p>
            )}

            {/* ===============================================
                COLLAPSED MARKET
            =============================================== */}

            {collapsed ? (
              <div className="group relative">
                <button
                  type="button"
                  onClick={() =>
                    setMarketOpen(
                      !marketOpen
                    )
                  }
                  title="NEPSE Data"
                  aria-label="Open NEPSE Data"
                  aria-expanded={marketOpen}
                  className={[
                    "flex h-11 w-full",
                    "items-center justify-center",
                    "rounded-xl",
                    "transition-all duration-200",
                    marketActive
                      ? "bg-badge text-primary"
                      : "text-body hover:bg-news hover:text-fg",
                  ].join(" ")}
                >
                  <Building2
                    size={18}
                    strokeWidth={
                      marketActive
                        ? 2.1
                        : 1.8
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
                    MARKET BUTTON
                ========================================= */}

                <button
                  type="button"
                  onClick={
                    toggleMarketNavigation
                  }
                  aria-expanded={marketOpen}
                  className={[
                    "flex h-11 w-full",
                    "items-center justify-between",
                    "rounded-xl px-3",
                    "text-[13px] font-medium",
                    "transition-all duration-200",
                    marketActive
                      ? "bg-badge text-primary"
                      : "text-body hover:bg-news hover:text-fg",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    <Building2
                      size={18}
                      strokeWidth={
                        marketActive
                          ? 2.1
                          : 1.8
                      }
                    />

                    <span>NEPSE Data</span>
                  </span>

                  <ChevronDown
                    size={15}
                    className={[
                      "text-muted",
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
                    "grid transition-[grid-template-rows]",
                    "duration-200",
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
                        border-l-[0.5px]
                        border-card
                        pl-2
                      "
                      aria-label="NEPSE navigation"
                    >
                      {marketNavigation.map(
                        (item) => {
                          const Icon =
                            item.icon;

                          const active =
                            isActive(
                              item.href
                            );

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
                                "flex h-10 items-center",
                                "gap-2.5 rounded-lg px-3",
                                "text-[12px] font-medium",
                                "transition-all duration-200",
                                active
                                  ? "bg-badge text-primary"
                                  : "text-muted hover:bg-news hover:text-fg",
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
              <p
                className="
                  mb-2
                  px-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-faint
                "
              >
                Account
              </p>
            )}

            <nav
              aria-label="Account navigation"
              className="space-y-1"
            >
              {accountNavigation.map((item) => {
                const Icon = item.icon;
                const active =
                  isActive(item.href);

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

        <div
          className="
            shrink-0
            border-t-[0.5px]
            border-card
            p-3
          "
        >
          {/* USER */}

          <div
            className={[
              "mb-2 flex items-center",
              "rounded-xl",
              "bg-news",
              "py-3",
              "transition-colors duration-200",
              collapsed
                ? "justify-center px-2"
                : "gap-3 px-3",
            ].join(" ")}
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-badge
                text-xs
                font-bold
                text-primary
              "
            >
              MK
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-xs
                    font-semibold
                    text-heading
                  "
                >
                  Muna K.C.
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    text-muted
                  "
                >
                  Free account
                </p>
              </div>
            )}
          </div>

          {/* SIGN OUT */}

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
                "flex h-10 w-full",
                "items-center rounded-xl",
                "text-[13px] font-medium",
                "text-muted",
                "transition-all duration-200",
                "hover:bg-[#fff1f1]",
                "hover:text-danger",
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
          SIGN OUT MODAL
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
              border-[0.5px]
              border-card
              bg-surface
              p-5
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#fff1f1]
                text-danger
              "
            >
              <LogOut size={19} />
            </div>

            <h2
              id="signout-title"
              className="
                mt-4
                text-sm
                font-semibold
                text-heading
              "
            >
              Sign out of Rocket Pro?
            </h2>

            <p
              className="
                mt-2
                text-xs
                leading-5
                text-muted
              "
            >
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
                  border-[0.5px]
                  border-card
                  bg-surface
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-body
                  transition-all
                  duration-200
                  hover:bg-news
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
                  bg-danger
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:brightness-95
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
          "relative flex h-11 items-center",
          "rounded-xl",
          "text-[13px] font-medium",
          "transition-all duration-200",
          collapsed
            ? "justify-center px-3"
            : "gap-3 px-3",
          active
            ? "bg-badge text-primary"
            : "text-body hover:bg-news hover:text-fg",
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
              bg-primary
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