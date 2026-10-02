"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    // Frontend validation
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured. Please check frontend/.env.local and restart the frontend server."
        );
      }

      const response = await fetch(
        `${apiUrl}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      /*
       * IMPORTANT:
       * Do not immediately call response.json().
       *
       * If the URL is wrong, Next.js may return an HTML
       * page beginning with <!DOCTYPE html>.
       */

      const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Non-JSON response from backend:",
          text
        );

        throw new Error(
          `Server returned an unexpected response (${response.status}). Check that the backend is running at ${apiUrl}.`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to process your request."
        );
      }

      setEmail(cleanEmail);
      setSubmitted(true);
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d4efde] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-[#08A957]"
          >
            Rocket प्रो
          </Link>

          <p className="mt-2 text-sm text-[#656565]">
            Nepal&apos;s market insights platform
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-7 shadow-sm sm:p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#dcffec]">
                  <Mail
                    className="h-6 w-6 text-[#0aa852]"
                    aria-hidden="true"
                  />
                </div>

                <h1 className="text-2xl font-bold text-[#000000]">
                  Forgot your password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#656565]">
                  Enter the email address associated with
                  your Rocket Pro account and we&apos;ll send
                  you a password reset link.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 flex items-start gap-2 rounded-xl border border-[#e31b1b]/20 bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[#e31b1b]">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#000000]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#656565]"
                      aria-hidden="true"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={isLoading}
                      className="w-full rounded-lg border border-[#d5d5d5] bg-white py-3 pl-11 pr-4 text-sm text-[#000000] outline-none transition placeholder:text-[#94a3b8] focus:border-[#01c45a] focus:ring-2 focus:ring-[#0aa852]/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0aa852] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#078f45] focus:outline-none focus:ring-2 focus:ring-[#0aa852] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0aa852] transition hover:text-[#078f45]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            /* Success */
            <div className="py-4 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#dcffec]">
                <CheckCircle2 className="h-7 w-7 text-[#0aa852]" />
              </div>

              <h1 className="text-2xl font-bold text-[#000000]">
                Check your email
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#656565]">
                If an account exists for{" "}
                <span className="font-medium text-[#000000]">
                  {email}
                </span>
                , we&apos;ve sent a password reset link.
              </p>

              <p className="mt-3 text-xs text-[#656565]">
                Don&apos;t see the email? Check your spam or
                junk folder.
              </p>

              {/* Back to Login */}
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0aa852] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#078f45]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#656565]">
          © {new Date().getFullYear()} Rocket Pro. All rights reserved.
        </p>
      </div>
    </main>
  );
}