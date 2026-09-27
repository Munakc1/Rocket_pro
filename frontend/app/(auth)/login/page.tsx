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
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      /*
       * TODO:
       * Replace this section with your real backend login API.
       *
       * Example:
       *
       * const response = await axios.post(
       *   "http://localhost:5000/api/auth/login",
       *   {
       *     email,
       *     password,
       *   }
       * );
       */

      // Temporary successful login flow
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess("Logged in successfully!");

      // Redirect user to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 300);
    } catch (err) {
      setError("Unable to log in. Please check your credentials.");
      setIsLoading(false);
    }
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-[#d4efde] bg-[#fbfbfb] pl-11 pr-4 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#01c45a] focus:bg-white focus:ring-4 focus:ring-[#01c45a]/10";

  const iconClass =
    "absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]";

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

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-[#e31b1b]/20 bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[#e31b1b]">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 rounded-xl border border-[#01c45a]/20 bg-[#dcffec] px-4 py-3 text-sm font-medium text-[#0aa852]">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail size={19} className={iconClass} />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={isLoading}
                className={inputClass}
              />
            </div>
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
              <LockKeyhole size={19} className={iconClass} />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isLoading}
                className={`${inputClass} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#0aa852]"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
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
            {isLoading ? "Logging in..." : "Login"}

            {!isLoading && (
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
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