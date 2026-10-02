// app/payment/success/page.tsx  (frontend-only, TEST MODE)
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";

import { ESEWA_CONFIG, signFields } from "@/lib/esewa";

type State =
  | { type: "loading" }
  | { type: "paid"; refId?: string; amount?: string }
  | { type: "failed"; message: string };

function SuccessContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<State>({ type: "loading" });

  useEffect(() => {
    async function verify() {
      try {
        const data = searchParams.get("data");

        if (!data) {
          setState({ type: "failed", message: "Missing payment data." });
          return;
        }

        /* 1) decode what eSewa sent back */
        const payload = JSON.parse(atob(data)) as Record<string, string>;

        /* 2) check eSewa's signature */
        const expected = await signFields(payload, payload.signed_field_names);

        if (expected !== payload.signature) {
          setState({ type: "failed", message: "Invalid payment signature." });
          return;
        }

        /* 3) match with the payment we started in this browser */
        const pending = JSON.parse(
          sessionStorage.getItem("rocketProPayment") || "null"
        );

        if (!pending || pending.transactionUuid !== payload.transaction_uuid) {
          setState({
            type: "failed",
            message: "Payment does not match this session.",
          });
          return;
        }

        const paidAmount = Number(String(payload.total_amount).replace(/,/g, ""));

        if (paidAmount !== Number(pending.amount)) {
          setState({ type: "failed", message: "Payment amount mismatch." });
          return;
        }

        if (payload.status !== "COMPLETE") {
          setState({
            type: "failed",
            message: `Payment status: ${payload.status}`,
          });
          return;
        }

        /* 4) extra check with eSewa's status API.
              Browsers may block this (CORS), so a network error is ignored
              and we rely on the signed response above. */
        try {
          const url =
            `${ESEWA_CONFIG.statusUrl}?product_code=${encodeURIComponent(
              ESEWA_CONFIG.productCode
            )}` +
            `&total_amount=${encodeURIComponent(pending.amount)}` +
            `&transaction_uuid=${encodeURIComponent(pending.transactionUuid)}`;

          const res = await fetch(url);
          const status = await res.json();

          if (status.status && status.status !== "COMPLETE") {
            setState({
              type: "failed",
              message: `Payment status: ${status.status}`,
            });
            return;
          }
        } catch {
          /* CORS or network: ignore */
        }

        sessionStorage.removeItem("rocketProPayment");
        sessionStorage.removeItem("trainingRegistration");

        setState({
          type: "paid",
          refId: payload.transaction_code,
          amount: payload.total_amount,
        });
      } catch (err) {
        console.error("Verify error:", err);
        setState({ type: "failed", message: "Unable to read payment result." });
      }
    }

    verify();
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#D6F0E0] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#d5d5d5] bg-white p-8 text-center shadow-sm">
        {state.type === "loading" && (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#0aa852]" />
            <p className="mt-4 text-sm text-[#535353]">
              Checking your payment...
            </p>
          </>
        )}

        {state.type === "paid" && (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#0aa852]" />
            <h1 className="mt-4 text-xl font-semibold">Payment successful</h1>

            {state.refId && (
              <p className="mt-2 text-sm text-[#656565]">
                eSewa reference:{" "}
                <span className="font-mono">{state.refId}</span>
              </p>
            )}

            <Link
              href="/training"
              className="mt-6 inline-flex rounded-xl bg-[#0aa852] px-5 py-3 text-sm font-semibold text-white"
            >
              Done
            </Link>
          </>
        )}

        {state.type === "failed" && (
          <>
            <TriangleAlert className="mx-auto h-14 w-14 text-[#e31b1b]" />
            <h1 className="mt-4 text-xl font-semibold">Payment not confirmed</h1>
            <p className="mt-2 text-sm text-[#656565]">{state.message}</p>

            <Link
              href="/training"
              className="mt-6 inline-flex rounded-xl bg-[#0aa852] px-5 py-3 text-sm font-semibold text-white"
            >
              Back to Training
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}