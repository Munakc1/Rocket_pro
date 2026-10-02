"use client"; // Runs in the browser (hooks, forms, router, sessionStorage)

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

// Shape of a training item
type Training = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number; // Optional: shown as a strikethrough price
};

// Available trainings, keyed by the URL param (trainingId).
// Keep these prices in sync with the payment page.
const trainings: Record<string, Training> = {
  "technical-analysis-live": {
    id: "technical-analysis-live",
    title: "Technical Analysis Training for Beginners",
    price: 3000,
    oldPrice: 3500,
  },
  "fundamental-analysis-live": {
    id: "fundamental-analysis-live",
    title: "Basics of Stock Market and Fundamental Analysis",
    price: 2500,
    oldPrice: 3000,
  },
};

export default function TrainingRegisterPage() {
  const params = useParams(); // Reads /training/register/[trainingId]
  const router = useRouter(); // Used to go to the payment page

  // A route param can be a string or an array, so normalize it
  const trainingId = Array.isArray(params.trainingId)
    ? params.trainingId[0]
    : params.trainingId;

  // Selected training (undefined if the ID is invalid)
  const training = trainingId ? trainings[trainingId] : undefined;

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Nepal mobile: starts with 97 or 98, then 8 digits (10 total)
  const phoneValid = useMemo(() => /^(97|98)\d{8}$/.test(phone), [phone]);

  // Unknown training ID -> "not found" screen
  if (!training) {
    return (
      <main className="min-h-screen bg-app px-4 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#d5d5d5] bg-panel p-8 text-center">
          <h1 className="text-2xl font-bold">Training not found</h1>

          <Link
            href="/training"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Training
          </Link>
        </div>
      </main>
    );
  }

  // Runs when the form is submitted
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // ---------- Client-side validation ----------
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phoneValid) {
      setError("Please enter a valid Nepal mobile number.");
      return;
    }

    try {
      setLoading(true);

      // Backend base URL from .env.local (falls back to localhost)
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // POST http://localhost:5000/api/training/registrations
      const response = await fetch(`${apiUrl}/api/training/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Sends cookies (backend CORS must allow this)
        body: JSON.stringify({
          trainingId: training.id,
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone,
        }),
      });

      const result = await response.json();

      // HTTP errors and { success: false } both count as failures
      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Failed to create training registration."
        );
      }

      // The backend may return the ID under different keys
      const registrationId =
        result?.data?.registrationId ||
        result?.data?._id ||
        result?.registrationId;

      if (!registrationId) {
        throw new Error(
          "Registration was created but no registration ID was returned."
        );
      }

      // Save the registration so the payment page can read it.
      // The payment page looks up the real price by trainingId.
      sessionStorage.setItem(
        "trainingRegistration",
        JSON.stringify({
          registrationId,
          trainingId: training.id,
          trainingTitle: training.title,
          amount: training.price,
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone,
        })
      );

      // Go to the payment page
      router.push(
        `/payment?registrationId=${encodeURIComponent(registrationId)}`
      );
    } catch (err) {
      console.error("Training registration error:", err);

      // fetch throws a TypeError when the server is off or CORS blocks it
      setError(
        err instanceof TypeError
          ? "Cannot reach the server. Please check that the backend is running."
          : err instanceof Error
          ? err.message
          : "Unable to continue to payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-app text-black">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={`/training/live/${training.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#656565] hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Training
        </Link>

        {/* Two columns: form (left) + summary (right) */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.55fr]">
          {/* ---------- Registration form ---------- */}
          <section className="rounded-3xl border border-[#d5d5d5] bg-panel p-7 sm:p-9">
            <div className="inline-flex items-center gap-2 rounded-full bg-badge px-3 py-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Training Registration
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight">
              Register for Training
            </h1>

            <p className="mt-3 leading-7 text-[#656565]">
              Enter your information below to continue with the payment for
              this training.
            </p>

            {/* Error banner */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full name */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-xl border border-[#d5d5d5] bg-white pl-10 pr-4 text-sm outline-none focus:border-primary"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#d5d5d5] bg-white pl-10 pr-4 text-sm outline-none focus:border-primary"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Mobile Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

                  <input
                    type="tel"
                    value={phone}
                    // Digits only, max 10 characters
                    onChange={(event) =>
                      setPhone(
                        event.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    className={`h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm outline-none ${
                      phone.length > 0 && !phoneValid
                        ? "border-red-300 focus:border-red-400"
                        : "border-[#d5d5d5] focus:border-primary"
                    }`}
                    disabled={loading}
                  />
                </div>

                <p className="mt-2 text-xs text-[#656565]">
                  Enter a valid Nepal mobile number.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Registration...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </section>

          {/* ---------- Summary sidebar ---------- */}
          <aside className="h-fit rounded-3xl border border-[#d5d5d5] bg-panel p-6 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Selected Training
            </p>

            <h2 className="mt-3 text-xl font-bold">{training.title}</h2>

            <div className="mt-6 rounded-2xl bg-[#edf8f0] p-5">
              <p className="text-sm text-[#656565]">Training Fee</p>

              <p className="mt-1 text-3xl font-bold">
                NPR {training.price.toLocaleString()}
              </p>

              {training.oldPrice && (
                <p className="mt-1 text-sm text-[#656565] line-through">
                  NPR {training.oldPrice.toLocaleString()}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <SummaryRow label="Training" value={training.title} />
              <SummaryRow label="Registration" value="Included" />

              <div className="border-t border-[#ececec] pt-3">
                <SummaryRow
                  label="Total"
                  value={`NPR ${training.price.toLocaleString()}`}
                  strong
                />
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#ececec] bg-white p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <p className="text-xs leading-5 text-[#656565]">
                Your information will be used to process your training
                registration and payment.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// "label ... value" row used in the summary
function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className={strong ? "font-semibold" : "text-sm text-[#656565]"}>
        {label}
      </span>

      <span
        className={`max-w-[65%] text-right ${
          strong ? "text-lg font-bold" : "text-sm font-semibold"
        }`}
      >
        {value}
      </span>
    </div>
  );
}