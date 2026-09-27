"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
  Rocket,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, email, phone, password, confirmPassword } = formData;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccess("Account created successfully!");

    console.log("Register Data:", formData);
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-[#d4efde] bg-[#fbfbfb] pl-11 pr-4 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#01c45a] focus:bg-white focus:ring-4 focus:ring-[#01c45a]/10";

  const iconClass =
    "absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d4efde] px-4 pb-10 pt-28 sm:px-6 sm:pt-32">
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
          <p className="mt-2 text-sm text-[#64748b]">
            Enter your details to get started with Rocket Pro.
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
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
              Full Name
            </label>
            <div className="relative">
              <User size={19} className={iconClass} />
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className={inputClass}
              />
            </div>
          </div>

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
                className={inputClass}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
              Phone Number
            </label>
            <div className="relative">
              <Phone size={19} className={iconClass} />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                autoComplete="tel"
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
                autoComplete="new-password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#0aa852]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-[#94a3b8]">
              Password must be at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <LockKeyhole size={19} className={iconClass} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#0aa852]"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(10,168,82,0.20)] transition duration-200 hover:bg-[#088f46] hover:shadow-[0_10px_30px_rgba(10,168,82,0.28)] active:scale-[0.99]"
          >
            Create Account
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-[#64748b]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0aa852] transition hover:text-[#078b44] hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Terms */}
        <p className="mt-6 text-center text-xs leading-5 text-[#94a3b8]">
          By creating an account, you agree to Rocket Pro&apos;s terms and
          conditions.
        </p>
      </div>
    </main>
  );
}