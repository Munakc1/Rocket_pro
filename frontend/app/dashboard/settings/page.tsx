"use client";

import { useState } from "react";

import {
  Bell,
  ChevronRight,
  Globe,
  KeyRound,
  LogOut,
  Mail,
  Moon,
  ShieldCheck,
  Trash2,
  UserRound,
  WalletCards,
} from "lucide-react";

export default function SettingsPage() {
  const [marketUpdates, setMarketUpdates] = useState(true);
  const [watchlistAlerts, setWatchlistAlerts] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <main className="min-h-screen bg-[#d4efde] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Settings
          </h1>

          <p className="mt-2 text-sm text-[#656565]">
            Manage your Rocket Pro account, security, notifications, and
            preferences.
          </p>
        </div>

        {/* Profile */}
        <section className="mb-6 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="border-b border-[#d5d5d5] p-5">
            <h2 className="text-lg font-bold text-black">Profile</h2>

            <p className="mt-1 text-sm text-[#656565]">
              Manage your personal account information.
            </p>
          </div>

          <div className="p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dcffec] text-[#0aa852]">
                  <UserRound size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    Rocket Pro User
                  </h3>

                  <p className="text-sm text-[#656565]">
                    user@example.com
                  </p>
                </div>
              </div>

              <button className="rounded-lg border border-[#01c45a] px-4 py-2.5 text-sm font-semibold text-[#0aa852] transition hover:bg-[#dcffec]">
                Edit Profile
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#d5d5d5] bg-[#f1f9f4] p-4">
                <p className="text-xs text-[#656565]">Full Name</p>
                <p className="mt-1 text-sm font-semibold text-black">
                  Rocket Pro User
                </p>
              </div>

              <div className="rounded-lg border border-[#d5d5d5] bg-[#f1f9f4] p-4">
                <p className="text-xs text-[#656565]">Email</p>
                <p className="mt-1 text-sm font-semibold text-black">
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-6 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="border-b border-[#d5d5d5] p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck size={21} className="text-[#0aa852]" />

              <div>
                <h2 className="text-lg font-bold text-black">
                  Security
                </h2>

                <p className="mt-1 text-sm text-[#656565]">
                  Protect your Rocket Pro account.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#d5d5d5]">
            <button className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[#f1f9f4]">
              <div className="flex items-center gap-4">
                <KeyRound size={20} className="text-[#656565]" />

                <div>
                  <p className="text-sm font-semibold text-black">
                    Change Password
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Update your account password.
                  </p>
                </div>
              </div>

              <ChevronRight size={19} className="text-[#656565]" />
            </button>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <ShieldCheck size={20} className="text-[#656565]" />

                <div>
                  <p className="text-sm font-semibold text-black">
                    Two-Factor Authentication
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Add an extra layer of account security.
                  </p>
                </div>
              </div>

              <button className="rounded-lg border border-[#01c45a] px-3 py-2 text-xs font-semibold text-[#0aa852]">
                Enable
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-6 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="border-b border-[#d5d5d5] p-5">
            <div className="flex items-center gap-3">
              <Bell size={21} className="text-[#0aa852]" />

              <div>
                <h2 className="text-lg font-bold text-black">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-[#656565]">
                  Choose which Rocket Pro updates you receive.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#d5d5d5]">
            <ToggleRow
              title="Market Updates"
              description="Receive important market and NEPSE updates."
              enabled={marketUpdates}
              onChange={() => setMarketUpdates(!marketUpdates)}
            />

            <ToggleRow
              title="Watchlist Alerts"
              description="Receive updates about stocks in your watchlist."
              enabled={watchlistAlerts}
              onChange={() => setWatchlistAlerts(!watchlistAlerts)}
            />

            <ToggleRow
              title="News Alerts"
              description="Get notified about important market news."
              enabled={newsAlerts}
              onChange={() => setNewsAlerts(!newsAlerts)}
            />

            <ToggleRow
              title="Email Notifications"
              description="Receive selected Rocket Pro notifications by email."
              enabled={emailNotifications}
              onChange={() =>
                setEmailNotifications(!emailNotifications)
              }
            />
          </div>
        </section>

        {/* Preferences */}
        <section className="mb-6 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="border-b border-[#d5d5d5] p-5">
            <h2 className="text-lg font-bold text-black">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Customize your Rocket Pro experience.
            </p>
          </div>

          <div className="divide-y divide-[#d5d5d5]">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <Moon size={20} className="text-[#656565]" />

                <div>
                  <p className="text-sm font-semibold text-black">
                    Theme
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Choose how Rocket Pro appears.
                  </p>
                </div>
              </div>

              <select className="rounded-lg border border-[#d5d5d5] bg-white px-3 py-2 text-sm text-black outline-none focus:border-[#01c45a]">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <Globe size={20} className="text-[#656565]" />

                <div>
                  <p className="text-sm font-semibold text-black">
                    Language
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Select your preferred language.
                  </p>
                </div>
              </div>

              <select className="rounded-lg border border-[#d5d5d5] bg-white px-3 py-2 text-sm text-black outline-none focus:border-[#01c45a]">
                <option>English</option>
                <option>Nepali</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <BarChartIcon />

                <div>
                  <p className="text-sm font-semibold text-black">
                    Default Market View
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Select the market page you want to open first.
                  </p>
                </div>
              </div>

              <select className="rounded-lg border border-[#d5d5d5] bg-white px-3 py-2 text-sm text-black outline-none focus:border-[#01c45a]">
                <option>Market Overview</option>
                <option>Live Market</option>
                <option>Market Movers</option>
                <option>Watchlist</option>
              </select>
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className="mb-6 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="border-b border-[#d5d5d5] p-5">
            <h2 className="text-lg font-bold text-black">
              Subscription
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Manage your Rocket Pro membership.
            </p>
          </div>

          <div className="p-5">
            <div className="flex flex-col gap-5 rounded-xl bg-[#f1f9f4] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#dcffec] text-[#0aa852]">
                  <WalletCards size={21} />
                </div>

                <div>
                  <p className="text-sm text-[#656565]">
                    Current Plan
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-black">
                    Free Plan
                  </h3>

                  <p className="mt-1 text-xs text-[#656565]">
                    Basic access to Rocket Pro.
                  </p>
                </div>
              </div>

              <button className="rounded-lg bg-[#0aa852] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#078f46]">
                Manage Subscription
              </button>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-6 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb]">
          <div className="border-b border-[#d5d5d5] p-5">
            <h2 className="text-lg font-bold text-black">
              Privacy
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Manage your privacy preferences.
            </p>
          </div>

          <div className="divide-y divide-[#d5d5d5]">
            <button className="flex w-full items-center justify-between p-5 text-left hover:bg-[#f1f9f4]">
              <div>
                <p className="text-sm font-semibold text-black">
                  Privacy Policy
                </p>

                <p className="mt-1 text-xs text-[#656565]">
                  Read how Rocket Pro handles your information.
                </p>
              </div>

              <ChevronRight size={19} className="text-[#656565]" />
            </button>

            <button className="flex w-full items-center justify-between p-5 text-left hover:bg-[#f1f9f4]">
              <div>
                <p className="text-sm font-semibold text-black">
                  Terms of Service
                </p>

                <p className="mt-1 text-xs text-[#656565]">
                  Review Rocket Pro terms and conditions.
                </p>
              </div>

              <ChevronRight size={19} className="text-[#656565]" />
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-xl border border-[#e31b1b] bg-[#fbfbfb]">
          <div className="border-b border-[#e31b1b] p-5">
            <h2 className="text-lg font-bold text-[#e31b1b]">
              Account Actions
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Actions that affect your Rocket Pro account.
            </p>
          </div>

          <div className="divide-y divide-[#d5d5d5]">
            <button className="flex w-full items-center justify-between p-5 text-left hover:bg-[#fff5f5]">
              <div className="flex items-center gap-4">
                <LogOut size={20} className="text-[#e31b1b]" />

                <div>
                  <p className="text-sm font-semibold text-black">
                    Log Out
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Sign out from your Rocket Pro account.
                  </p>
                </div>
              </div>

              <ChevronRight size={19} className="text-[#656565]" />
            </button>

            <button className="flex w-full items-center justify-between p-5 text-left hover:bg-[#fff5f5]">
              <div className="flex items-center gap-4">
                <Trash2 size={20} className="text-[#e31b1b]" />

                <div>
                  <p className="text-sm font-semibold text-[#e31b1b]">
                    Delete Account
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Permanently delete your Rocket Pro account.
                  </p>
                </div>
              </div>

              <ChevronRight size={19} className="text-[#656565]" />
            </button>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-[#656565]">
          Rocket Pro • Nepal Stock Market Intelligence Platform
        </p>
      </div>
    </main>
  );
}

/* ============================================================
   TOGGLE COMPONENT
============================================================ */

function ToggleRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-4">
        <Mail size={20} className="text-[#656565]" />

        <div>
          <p className="text-sm font-semibold text-black">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#656565]">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#0aa852]" : "bg-[#d5d5d5]"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ============================================================
   SMALL ICON
============================================================ */

function BarChartIcon() {
  return (
    <div className="flex h-5 w-5 items-end justify-center gap-0.5 text-[#656565]">
      <span className="h-2 w-1 rounded-sm bg-current" />
      <span className="h-4 w-1 rounded-sm bg-current" />
      <span className="h-3 w-1 rounded-sm bg-current" />
    </div>
  );
}