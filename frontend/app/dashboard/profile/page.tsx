
"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CreditCard,
  Info,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  // Frontend-only profile data
  // Replace these values later when backend authentication is connected.
  const user = {
    name: "Muna K.C.",
    email: "muna@example.com",
    memberSince: "Sep 2026",
  };

  const subscriptions = 0;
  const payments = 0;

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-[calc(100vh-82px)] bg-[#d4efde] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#0aa852]">
            Account
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Profile
          </h1>

          <p className="mt-1 text-sm text-[#656565]">
            Manage your Rocket Pro account and subscription information.
          </p>
        </div>

        {/* User Profile */}
        <section className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* User Information */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#dcffec] text-xl font-bold text-[#0aa852] ring-4 ring-[#edf8f0]">
                {firstLetter}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-lg font-bold text-black">
                    {user.name}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#dcffec] px-2 py-1 text-[11px] font-semibold text-[#0aa852]">
                    <ShieldCheck className="h-3 w-3" />
                    Account
                  </span>
                </div>

                <p className="mt-1 truncate text-sm text-[#656565]">
                  {user.email}
                </p>

                <p className="mt-1 text-xs text-[#656565]">
                  Member since {user.memberSince}
                </p>
              </div>
            </div>

            {/* Logged In Status */}
            <div className="flex w-fit items-center gap-2 rounded-xl border border-[#d5d5d5] bg-white px-4 py-3">
              <UserRound className="h-4 w-4 text-[#0aa852]" />

              <span className="text-sm font-medium text-black">
                Logged in
              </span>
            </div>
          </div>
        </section>

        {/* Profile Statistics */}
        <section className="mt-7">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-black">
              Profile Statistics
            </h2>

            <p className="mt-1 text-sm text-[#656565]">
              Your Rocket Pro account activity at a glance.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Subscriptions */}
            <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm transition hover:border-[#01c45a]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#656565]">
                    Subscriptions
                  </p>

                  <p className="mt-2 text-3xl font-bold text-black">
                    {subscriptions}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dcffec]">
                  <CreditCard className="h-5 w-5 text-[#0aa852]" />
                </div>
              </div>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#edf8f0]">
                <div
                  className="h-full rounded-full bg-[#0aa852]"
                  style={{
                    width: subscriptions > 0 ? "100%" : "0%",
                  }}
                />
              </div>
            </div>

            {/* Payments */}
            <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm transition hover:border-[#01c45a]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#656565]">
                    Payments
                  </p>

                  <p className="mt-2 text-3xl font-bold text-black">
                    {payments}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dcffec]">
                  <WalletCards className="h-5 w-5 text-[#0aa852]" />
                </div>
              </div>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#edf8f0]">
                <div
                  className="h-full rounded-full bg-[#0aa852]"
                  style={{
                    width: payments > 0 ? "100%" : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Note */}
        <section className="mt-7 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] shadow-sm">
          <div className="border-b border-[#d5d5d5] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dcffec]">
                <Info className="h-5 w-5 text-[#0aa852]" />
              </div>

              <div>
                <h2 className="font-bold text-black">
                  Quick Note
                </h2>

                <p className="text-xs text-[#656565]">
                  About your Rocket Pro subscription
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6">
            <p className="max-w-3xl text-sm leading-6 text-[#656565]">
              Keep your subscription active to get real-time market
              data and advanced analysis tools. Renew before expiry to
              avoid data interruption.
            </p>
          </div>
        </section>

        {/* No Subscription */}
        {subscriptions === 0 && (
          <section className="mt-6 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] px-5 py-8 text-center shadow-sm sm:px-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dcffec]">
              <CreditCard className="h-6 w-6 text-[#0aa852]" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-black">
              No subscriptions found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#656565]">
              You don't have an active Rocket Pro subscription yet.
              Browse our plans to get started with real-time market
              data and advanced analysis tools.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/dashboard/subscriptions")
              }
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#01a14d]"
            >
              Browse our plans
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        )}

        {/* Payments Empty State */}
        {payments === 0 && (
          <section className="mt-6 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dcffec]">
                <WalletCards className="h-5 w-5 text-[#0aa852]" />
              </div>

              <div>
                <h2 className="font-bold text-black">
                  Payment History
                </h2>

                <p className="mt-1 text-sm text-[#656565]">
                  No payments have been made yet.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
