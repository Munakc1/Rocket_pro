
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Rocket,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
    setSuccess("");
  };

  // --------------------------------------------------
  // Frontend validation
  // --------------------------------------------------

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const email = formData.email.trim().toLowerCase();

    // Email
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    return newErrors;
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrors({});
    setServerError("");
    setSuccess("");

    // Validate frontend
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      /*
       * -----------------------------------------------
       * REAL BACKEND LOGIN
       * -----------------------------------------------
       *
       * Replace the temporary section below with:
       *
       * const response = await fetch(
       *   `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     credentials: "include",
       *     body: JSON.stringify({
       *       email: formData.email.trim().toLowerCase(),
       *       password: formData.password,
       *     }),
       *   }
       * );
       *
       * const data = await response.json();
       *
       * if (!response.ok) {
       *   throw new Error(
       *     data.message || "Invalid email or password."
       *   );
       * }
       *
       * // Login successful
       * setSuccess("Logged in successfully!");
       *
       * router.push("/dashboard");
       */

      // Temporary frontend testing
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setSuccess("Logged in successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to log in. Please check your credentials."
      );

      setIsLoading(false);
    }
  };

  // --------------------------------------------------
  // Styling
  // --------------------------------------------------

  const inputClass =
    "h-12 w-full rounded-xl border bg-[#fbfbfb] pl-11 pr-4 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:bg-white focus:ring-4";

  const iconClass =
    "absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]";

  const getInputClass = (
    field: keyof FormData,
    extra = ""
  ) => {
    const hasError =
      field === "email"
        ? errors.email
        : field === "password"
        ? errors.password
        : false;

    return `${inputClass} ${
      hasError
        ? "border-[#e31b1b] focus:border-[#e31b1b] focus:ring-[#e31b1b]/10"
        : "border-[#d4efde] focus:border-[#01c45a] focus:ring-[#01c45a]/10"
    } ${extra}`;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d4efde] px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-[#d4efde] bg-white p-6 shadow-[0_20px_70px_rgba(10,168,82,0.10)] sm:p-10">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-[#0aa852]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0aa852] text-white">
              <Rocket size={21} />
            </span>

            Rocket Pro
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0f172a]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[#64748b]">
            Log in to continue to Rocket Pro.
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-5 flex items-start gap-2 rounded-xl border border-[#e31b1b]/20 bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[#e31b1b]">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{serverError}</span>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#01c45a]/20 bg-[#dcffec] px-4 py-3 text-sm font-medium text-[#0aa852]">
            <CheckCircle2 size={18} />

            <span>{success}</span>
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
              className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className={iconClass}
              />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={isLoading}
                className={getInputClass("email")}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs text-[#e31b1b]">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={19}
                className={iconClass}
              />

              <input
                id="password"
                name="password"
                type={
                  showPassword ? "text" : "password"
                }
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLoading}
                className={getInputClass(
                  "password",
                  "pr-12"
                )}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#0aa852] disabled:cursor-not-allowed"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-xs text-[#e31b1b]">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="remember"
              className="flex cursor-pointer items-center gap-2 text-sm text-[#64748b]"
            >
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                disabled={isLoading}
                className="h-4 w-4 rounded border-[#d4efde] accent-[#0aa852]"
              />

              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-[#0aa852] transition hover:text-[#078b44] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(10,168,82,0.20)] transition duration-200 hover:bg-[#088f46] hover:shadow-[0_10px_30px_rgba(10,168,82,0.28)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                Logging in...
              </>
            ) : (
              <>
                Login

                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <p className="mt-7 text-center text-sm text-[#64748b]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#0aa852] transition hover:text-[#078b44] hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}

