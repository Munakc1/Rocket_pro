// app/payment/page.tsx
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Check,
  ChevronDown,
  GraduationCap,
  Loader2,
  Lock,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";

import { ESEWA_CONFIG, buildEsewaForm } from "@/lib/esewa";

/* =========================================================
   TYPES
========================================================= */

type Country = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
};

type Registration = {
  id: string;
  registrationId?: string;
  trainingId: string;
  trainingTitle: string;
  fullName: string;
  email: string;
  phone: string;
};

type PaymentMethod = "esewa" | "fonepay";

type TrainingInfo = {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  features: string[];
};

/* =========================================================
   DATA
   (display only: the backend price is the one charged)
========================================================= */

const TRAININGS: TrainingInfo[] = [
  {
    id: "technical-analysis-live",
    title: "Technical Analysis Live Training",
    price: 3000,
    oldPrice: 3500,
    features: [
      "Live technical analysis sessions",
      "RSI, MACD & EMA",
      "Support and resistance",
      "Candlestick analysis",
      "Risk management",
    ],
  },
  {
    id: "fundamental-analysis-live",
    title: "Fundamental Analysis Live Training",
    price: 2500,
    oldPrice: 3000,
    features: [
      "Company fundamental analysis",
      "Financial statement analysis",
      "EPS & P/E analysis",
      "Company valuation",
      "NEPSE-focused examples",
    ],
  },
];

const COUNTRIES: Country[] = [
  { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
];

/* =========================================================
   HELPERS
========================================================= */

function formatNPR(amount: number) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * eSewa v2 needs a real POST form submission.
 * The user's eSewa number/password/MPIN are entered on eSewa's own
 * page after this submit. We never collect them here.
 */
function submitEsewaForm(
  paymentUrl: string,
  formData: Record<string, string>
) {
  const form = document.createElement("form");

  form.method = "POST";
  form.action = paymentUrl;
  form.style.display = "none";

  Object.entries(formData).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value ?? "");
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

/* =========================================================
   PAYMENT PAGE CONTENT
========================================================= */

function PaymentPageContent() {
  const searchParams = useSearchParams();

  const [registration, setRegistration] = useState<Registration | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES[0]
  );
  const [phone, setPhone] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("esewa");

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");

  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  /* ---------------------------------------------------------
     Reset the Pay button if user returns with the Back button
  --------------------------------------------------------- */
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => {
      if (e.persisted) setPaying(false);
    };

    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  /* ---------------------------------------------------------
     Load registration
  --------------------------------------------------------- */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("trainingRegistration");
      const queryRegistrationId = searchParams.get("registrationId");

      if (!stored) {
        setError("Registration information was not found.");
        return;
      }

      const parsed = JSON.parse(stored) as Registration;
      const storedRegistrationId = parsed.registrationId || parsed.id;

      if (!storedRegistrationId && !queryRegistrationId) {
        setError("Registration ID is missing.");
        return;
      }

      if (
        queryRegistrationId &&
        storedRegistrationId &&
        queryRegistrationId !== storedRegistrationId
      ) {
        setError("Registration information does not match.");
        return;
      }

      const finalRegistrationId = (queryRegistrationId ||
        storedRegistrationId) as string;

      setRegistration({
        ...parsed,
        id: finalRegistrationId,
        registrationId: parsed.registrationId || finalRegistrationId,
      });

      if (parsed.phone) {
        let cleanPhone = parsed.phone.replace(/\s/g, "");
        if (cleanPhone.startsWith("+977")) {
          cleanPhone = cleanPhone.substring(4);
        }
        setPhone(cleanPhone);
      }
    } catch (err) {
      console.error("Registration loading error:", err);
      setError("Unable to load registration information.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  /* ---------------------------------------------------------
     Training + price
  --------------------------------------------------------- */
  const training = useMemo(() => {
    if (!registration) return null;

    return (
      TRAININGS.find((t) => t.id === registration.trainingId) ||
      TRAININGS.find((t) => t.title === registration.trainingTitle) ||
      null
    );
  }, [registration]);

  const currentPrice = training?.price ?? 0;

  const promoDiscount =
    appliedPromo.toUpperCase() === "ROCKET10"
      ? Math.round(currentPrice * 0.1)
      : 0;

  const totalPayable = currentPrice - promoDiscount;

  /* ---------------------------------------------------------
     Phone
  --------------------------------------------------------- */
  const internationalPhone = useMemo(() => {
    const clean = phone.replace(/\D/g, "");
    return `${selectedCountry.dialCode}${clean}`;
  }, [phone, selectedCountry]);

  function validatePhone() {
    const clean = phone.replace(/\D/g, "");

    if (!clean) {
      setError("Please enter your phone number.");
      return false;
    }

    if (selectedCountry.code === "NP" && !/^(97|98)\d{8}$/.test(clean)) {
      setError("Please enter a valid Nepal mobile number.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------------------------------------------------
     Promo
  --------------------------------------------------------- */
  function applyPromo() {
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setError("Please enter a promo code.");
      return;
    }

    if (code !== "ROCKET10") {
      setAppliedPromo("");
      setError("Invalid promo code.");
      return;
    }

    setAppliedPromo(code);
    setError("");
  }

  function removePromo() {
    setAppliedPromo("");
    setPromoCode("");
    setError("");
  }

  /* ---------------------------------------------------------
     Pay (frontend only: no backend call)
  --------------------------------------------------------- */
  async function handlePayment() {
    if (!registration?.id) {
      setError("Registration information is missing.");
      return;
    }

    if (!training) {
      setError("Training information could not be found.");
      return;
    }

    if (selectedMethod !== "esewa") {
      setError("Please select eSewa to continue.");
      return;
    }

    if (!validatePhone()) return;

    if (totalPayable <= 0) {
      setError("Invalid payment amount.");
      return;
    }

    setError("");
    setPaying(true);

    try {
      // Only letters, numbers and hyphens are allowed by eSewa
      const transactionUuid = crypto.randomUUID();

      const formData = await buildEsewaForm({
        amount: totalPayable,
        transactionUuid,
        origin: window.location.origin,
      });

      // Saved so the success page can check the result
      sessionStorage.setItem(
        "rocketProPayment",
        JSON.stringify({
          transactionUuid,
          registrationId: registration.id,
          paymentMethod: selectedMethod,
          amount: totalPayable,
          trainingTitle: registration.trainingTitle,
          fullName: registration.fullName,
          email: registration.email,
          phone: internationalPhone,
        })
      );

      // Goes to eSewa's official login/payment page
      submitEsewaForm(ESEWA_CONFIG.formUrl, formData);
    } catch (err) {
      console.error("PAYMENT ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to proceed with payment."
      );

      setPaying(false);
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#D6F0E0] px-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#0aa852]" />
          <p className="text-sm text-[#535353]">
            Loading payment information...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     NO REGISTRATION
  ========================================================= */

  if (error && !registration) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#D6F0E0] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#d5d5d5] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <TriangleAlert className="h-7 w-7 text-[#e31b1b]" />
          </div>

          <h1 className="text-xl font-semibold text-black">
            Payment information unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#656565]">{error}</p>

          <Link
            href="/training"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0aa852] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#078f46]"
          >
            Back to Training
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#D6F0E0] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/training" className="inline-flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Rocket Pro"
              width={150}
              height={45}
              className="h-auto w-auto"
            />
          </Link>

          <div className="flex items-center gap-2 text-sm text-[#535353]">
            <Lock className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#e31b1b]" />

            <p className="text-sm text-[#a31313]">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
              aria-label="Close error"
            >
              <X className="h-4 w-4 text-[#a31313]" />
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* ================= LEFT ================= */}
          <section className="space-y-6">
            {/* REGISTRATION */}
            <div className="rounded-2xl border border-[#d5d5d5] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dcffec]">
                  <GraduationCap className="h-5 w-5 text-[#0aa852]" />
                </div>

                <div>
                  <h2 className="font-semibold text-black">
                    Registration Details
                  </h2>
                  <p className="text-xs text-[#656565]">
                    Your training registration
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-[#656565]">Full Name</p>
                  <p className="mt-1 font-medium text-black">
                    {registration?.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#656565]">Email</p>
                  <p className="mt-1 break-all font-medium text-black">
                    {registration?.email}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs text-[#656565]">Training</p>
                  <p className="mt-1 font-medium text-black">
                    {registration?.trainingTitle}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs text-[#656565]">Registration ID</p>
                  <p className="mt-1 break-all font-mono text-sm font-medium text-[#0aa852]">
                    {registration?.id}
                  </p>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="rounded-2xl border border-[#d5d5d5] bg-white p-6 shadow-sm">
              <h2 className="mb-2 font-semibold text-black">Contact Number</h2>

              <p className="mb-5 text-sm text-[#656565]">
                We&apos;ll use this number to contact you about your training.
              </p>

              <div className="flex gap-2">
                {/* COUNTRY */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryOpen(!countryOpen)}
                    className="flex h-12 min-w-[110px] items-center justify-between gap-2 rounded-xl border border-[#d5d5d5] bg-white px-3 text-sm"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span>{selectedCountry.dialCode}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {countryOpen && (
                    <div className="absolute left-0 top-14 z-30 w-60 overflow-hidden rounded-xl border border-[#d5d5d5] bg-white shadow-lg">
                      {COUNTRIES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountryOpen(false);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-[#f1f9f4]"
                        >
                          <span>{country.flag}</span>
                          <span className="flex-1">{country.name}</span>
                          <span className="text-[#656565]">
                            {country.dialCode}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* PHONE INPUT */}
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9812345678"
                  className="h-12 flex-1 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm text-black outline-none transition focus:border-[#01c45a] focus:ring-2 focus:ring-[#dcffec]"
                />
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="rounded-2xl border border-[#d5d5d5] bg-white p-6 shadow-sm">
              <h2 className="mb-5 font-semibold text-black">Payment Method</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* ESEWA */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod("esewa")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    selectedMethod === "esewa"
                      ? "border-[#01c45a] bg-[#f1f9f4] ring-2 ring-[#dcffec]"
                      : "border-[#d5d5d5] hover:border-[#01c45a]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-black">eSewa</p>
                      <p className="mt-1 text-xs text-[#656565]">
                        Pay securely with eSewa
                      </p>
                    </div>

                    {selectedMethod === "esewa" && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0aa852]">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>

                {/* FONEPAY (coming soon) */}
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="cursor-not-allowed rounded-2xl border border-[#d5d5d5] p-5 text-left opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-black">Fonepay</p>
                      <p className="mt-1 text-xs text-[#656565]">
                        Pay using Fonepay
                      </p>
                    </div>

                    <span className="rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[11px] font-medium text-[#656565]">
                      Coming soon
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* SECURITY */}
            <div className="flex items-start gap-3 rounded-2xl border border-[#d5d5d5] bg-white p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0aa852]" />

              <div>
                <p className="font-medium text-black">Secure Payment</p>

                <p className="mt-1 text-sm leading-6 text-[#656565]">
                  Your payment is securely processed through eSewa. You log in
                  on eSewa&apos;s official page, and Rocket Pro never sees or
                  stores your eSewa password or MPIN.
                </p>
              </div>
            </div>
          </section>

          {/* ================= RIGHT ================= */}
          <aside className="h-fit rounded-2xl border border-[#d5d5d5] bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-black">Order Summary</h2>

            <div className="mt-5 rounded-xl bg-[#f1f9f4] p-4">
              <p className="text-sm font-medium text-black">
                {registration?.trainingTitle}
              </p>

              {training && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-[#0aa852]">
                    {formatNPR(training.price)}
                  </span>

                  {training.oldPrice > training.price && (
                    <span className="text-sm text-[#656565] line-through">
                      {formatNPR(training.oldPrice)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* FEATURES */}
            {training && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-black">
                  Included in training
                </p>

                <div className="space-y-2">
                  {training.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0aa852]" />
                      <span className="text-sm text-[#535353]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROMO */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-black">
                Promo Code
              </p>

              {appliedPromo ? (
                <div className="flex items-center justify-between rounded-xl border border-[#01c45a] bg-[#f1f9f4] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#0aa852]">
                      {appliedPromo}
                    </p>
                    <p className="text-xs text-[#656565]">
                      10% discount applied
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-[#e31b1b]"
                    aria-label="Remove promo code"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-[#d5d5d5] px-3 text-sm outline-none focus:border-[#01c45a]"
                  />

                  <button
                    type="button"
                    onClick={applyPromo}
                    className="rounded-xl border border-[#01c45a] px-4 text-sm font-semibold text-[#0aa852] hover:bg-[#f1f9f4]"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* PRICE */}
            <div className="mt-6 space-y-3 border-t border-[#ececec] pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#656565]">Training Fee</span>
                <span className="font-medium text-black">
                  {formatNPR(currentPrice)}
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#656565]">Discount</span>
                  <span className="font-medium text-[#0aa852]">
                    -{formatNPR(promoDiscount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-[#ececec] pt-4">
                <span className="font-semibold text-black">Total</span>
                <span className="text-xl font-bold text-[#0aa852]">
                  {formatNPR(totalPayable)}
                </span>
              </div>
            </div>

            {/* PAY */}
            <button
              type="button"
              onClick={handlePayment}
              disabled={paying || !registration || !training}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#078f46] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting to eSewa...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Pay {formatNPR(totalPayable)}
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#656565]">
              You will be redirected to the secure eSewa payment page to log in
              and complete your payment.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#D6F0E0]">
          <Loader2 className="h-8 w-8 animate-spin text-[#0aa852]" />
        </main>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}