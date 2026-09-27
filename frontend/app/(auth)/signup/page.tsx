
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
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name as keyof FormData]: "",
    }));

    setServerError("");
    setSuccess("");
  };

  // --------------------------------------------------
  // Frontend validation
  // --------------------------------------------------

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();

    // Full name
    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    } else if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(fullName)) {
      newErrors.fullName = "Please enter a valid name.";
    }

    // Email
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Nepal phone number
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(97|98)\d{8}$/.test(phone)) {
      newErrors.phone =
        "Enter a valid Nepal mobile number, e.g. 98XXXXXXXX.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number.";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
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

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * BACKEND CONNECTION WILL GO HERE
       *
       * Example:
       *
       * const response = await fetch(
       *   `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     body: JSON.stringify({
       *       fullName: formData.fullName.trim(),
       *       email: formData.email.trim().toLowerCase(),
       *       phone: formData.phone.trim(),
       *       password: formData.password,
       *     }),
       *   }
       * );
       *
       * const data = await response.json();
       *
       * if (!response.ok) {
       *   throw new Error(data.message || "Registration failed.");
       * }
       */

      // Temporary success for frontend testing.
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setSuccess("Account created successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
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
    return `${inputClass} ${
      errors[field]
        ? "border-[#e31b1b] focus:border-[#e31b1b] focus:ring-[#e31b1b]/10"
        : "border-[#d4efde] focus:border-[#01c45a] focus:ring-[#01c45a]/10"
    } ${extra}`;
  };

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
          <h1 className="text-2xl font-bold text-[#0f172a]">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-[#64748b]">
            Enter your details to get started with Rocket Pro.
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

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
              Full Name
            </label>

            <div className="relative">
              <User
                size={19}
                className={iconClass}
              />

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className={getInputClass("fullName")}
              />
            </div>

            {errors.fullName && (
              <p className="mt-2 text-xs text-[#e31b1b]">
                {errors.fullName}
              </p>
            )}
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
                className={getInputClass("email")}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs text-[#e31b1b]">
                {errors.email}
              </p>
            )}
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
              <Phone
                size={19}
                className={iconClass}
              />

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                autoComplete="tel"
                className={getInputClass("phone")}
              />
            </div>

            {errors.phone && (
              <p className="mt-2 text-xs text-[#e31b1b]">
                {errors.phone}
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
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="new-password"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#0aa852]"
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

            {errors.password ? (
              <p className="mt-2 text-xs text-[#e31b1b]">
                {errors.password}
              </p>
            ) : (
              <p className="mt-2 text-xs text-[#94a3b8]">
                Use at least 8 characters with uppercase,
                lowercase, and a number.
              </p>
            )}
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
              <LockKeyhole
                size={19}
                className={iconClass}
              />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className={getInputClass(
                  "confirmPassword",
                  "pr-12"
                )}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#0aa852]"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-[#e31b1b]">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(10,168,82,0.20)] transition duration-200 hover:bg-[#088f46] hover:shadow-[0_10px_30px_rgba(10,168,82,0.28)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account

                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </>
            )}
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
          By creating an account, you agree to Rocket Pro&apos;s
          terms and conditions.
        </p>
      </div>
    </main>
  );
}

