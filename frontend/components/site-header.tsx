"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation config                                                   */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; href: string };

export const nepseLinks: NavItem[] = [
  { label: "Indices", href: "/market/indices" },
  { label: "Market Summary", href: "/market/summary" },
  { label: "Today's Share Price", href: "/market/today" },
  { label: "Sector Performance", href: "/market/sectors" },
  { label: "Market Breadth", href: "/market/breadth" },
];

export const mainLinks: NavItem[] = [
  { label: "Latest News", href: "/news" },
  { label: "Live Market", href: "/markets" },
  { label: "Market Movers", href: "/movers" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const authLinks = {
  login: { label: "Login", href: "/login" },
  register: { label: "Sign Up", href: "/signup" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]";

// "/market" (Live Market) must not stay active on "/market/indices".
const isActive = (pathname: string, href: string, exact = false) =>
  exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const mobileId = useId();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [nepseOpen, setNepseOpen] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setNepseOpen(false);
  }, []);

  // Close everything on route change
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Outside click + Escape
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target as Node)
      ) {
        setNepseOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (nepseOpen) dropdownButtonRef.current?.focus();
        closeAll();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [nepseOpen, closeAll]);

  // Arrow-key navigation inside the dropdown
  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(
      e.currentTarget.querySelectorAll<HTMLAnchorElement>("a")
    );
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      e.key === "ArrowDown"
        ? items[(i + 1) % items.length]
        : items[(i - 1 + items.length) % items.length];
    next?.focus();
  };

  const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setNepseOpen(true);
      requestAnimationFrame(() =>
        desktopDropdownRef.current
          ?.querySelector<HTMLAnchorElement>("a")
          ?.focus()
      );
    }
  };

  const nepseActive = nepseLinks.some((l) => isActive(pathname, l.href));

  const desktopLink = (active: boolean) =>
    `relative rounded-md py-2 text-[15px] font-medium transition-colors xl:text-[16px] ${focusRing} ${
      active
        ? "text-primary after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[2px] after:rounded-full after:bg-[var(--primary)]"
        : "text-heading hover:text-primary"
    }`;

  return (
    <header className="nav-bg sticky top-0 z-50 h-[82px] w-full border-b border-[var(--border)]">
      <nav
        aria-label="Main"
        className="mx-auto flex h-full w-full max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Rocket Pro home"
          className={`flex shrink-0 items-center rounded-md ${focusRing}`}
        >
          <Image
            src="/images/logo.png"
            alt="Rocket Pro"
            width={200}
            height={56}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
          <div ref={desktopDropdownRef} className="relative">
            <button
              ref={dropdownButtonRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={nepseOpen}
              aria-controls={menuId}
              onClick={() => setNepseOpen((v) => !v)}
              onKeyDown={onButtonKeyDown}
              className={`flex items-center gap-1 ${desktopLink(nepseActive)}`}
            >
              NEPSE Data
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${
                  nepseOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {nepseOpen && (
              <div
                id={menuId}
                onKeyDown={onMenuKeyDown}
                className="absolute left-0 top-full z-50 mt-3 w-[240px] rounded-2xl border border-card bg-surface p-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                {nepseLinks.map((item) => {
                  const active = isActive(pathname, item.href, true);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-xl px-4 py-2.5 text-[15px] transition-colors ${focusRing} ${
                        active
                          ? "bg-badge text-primary"
                          : "text-heading hover:bg-[var(--badge-bg)] hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {mainLinks.map((item) => {
            const active = isActive(pathname, item.href, item.href === "/market");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={desktopLink(active)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP AUTH */}
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link
            href={authLinks.login.href}
            className={`flex h-11 items-center rounded-full border border-cta bg-surface px-5 text-[15px] font-medium text-primary transition-colors hover:bg-[var(--badge-bg)] ${focusRing}`}
          >
            {authLinks.login.label}
          </Link>
          <Link
            href={authLinks.register.href}
            className={`gradient-bg flex h-11 items-center rounded-full px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90 ${focusRing}`}
          >
            {authLinks.register.label}
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={mobileId}
          onClick={() => setMobileOpen((v) => !v)}
          className={`ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-cta bg-surface text-heading transition-colors hover:bg-[var(--badge-bg)] lg:hidden ${focusRing}`}
        >
          {mobileOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div
          id={mobileId}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-82px)] overflow-y-auto border-b border-[var(--border)] bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.08)] lg:hidden"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-1 p-4 sm:px-6">
            <details
              className="group border-b border-[var(--border-light)] pb-1"
              open={nepseActive}
            >
              <summary
                className={`flex min-h-[48px] cursor-pointer list-none items-center justify-between rounded-xl px-4 text-base font-medium ${focusRing} ${
                  nepseActive ? "text-primary" : "text-heading"
                }`}
              >
                NEPSE Data
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="pb-2 pl-3">
                {nepseLinks.map((item) => {
                  const active = isActive(pathname, item.href, true);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[44px] items-center rounded-lg px-4 text-[15px] ${focusRing} ${
                        active
                          ? "bg-badge text-primary"
                          : "text-secondary hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </details>

            {mainLinks.map((item) => {
              const active = isActive(pathname, item.href, item.href === "/market");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium ${focusRing} ${
                    active
                      ? "bg-badge text-primary"
                      : "text-heading hover:bg-[var(--badge-bg)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[var(--border-light)] pt-4">
              <Link
                href={authLinks.login.href}
                className={`flex h-12 items-center justify-center rounded-full border border-cta bg-surface text-sm font-medium text-primary ${focusRing}`}
              >
                {authLinks.login.label}
              </Link>
              <Link
                href={authLinks.register.href}
                className={`gradient-bg flex h-12 items-center justify-center rounded-full text-sm font-medium text-white ${focusRing}`}
              >
                {authLinks.register.label}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}