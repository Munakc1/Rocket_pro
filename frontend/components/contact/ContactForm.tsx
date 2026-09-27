"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<
  Record<keyof ContactFormData, string>
>;

type SubmissionState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type ContactResponse = {
  message?: string;
};

const initialForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(
  form: ContactFormData,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (form.phone.trim()) {
    const phoneValue = form.phone.trim();

    if (!/^[0-9+\-\s()]{7,20}$/.test(phoneValue)) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  if (!form.subject.trim()) {
    errors.subject = "Please enter a subject.";
  }

  if (!form.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message must contain at least 10 characters.";
  }

  return errors;
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-start gap-1.5 text-xs text-danger"
    >
      <AlertCircle
        aria-hidden="true"
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
      />
      <span>{message}</span>
    </p>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name as keyof ContactFormData]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }

    if (submissionState !== "idle") {
      setSubmissionState("idle");
      setServerMessage("");
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionState("idle");
      return;
    }

    setErrors({});
    setSubmissionState("submitting");
    setServerMessage("");

    const endpoint =
      process.env.NEXT_PUBLIC_CONTACT_API_URL;

    if (!endpoint) {
      setSubmissionState("error");
      setServerMessage(
        "The contact service is not configured yet. Please connect the form to the existing backend API.",
      );
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      let responseData: ContactResponse = {};

      try {
        responseData =
          (await response.json()) as ContactResponse;
      } catch {
        responseData = {};
      }

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            "Unable to submit the contact form.",
        );
      }

      setSubmissionState("success");
      setServerMessage(
        responseData.message ||
          "Your message has been submitted successfully.",
      );
      setForm(initialForm);
    } catch {
      setSubmissionState("error");
      setServerMessage(
        "We couldn't send your message. Please try again.",
      );
    }
  };

  const inputClass = (
    field: keyof ContactFormData,
  ) => `
    mt-2 w-full rounded-lg
    border bg-surface
    px-3.5 py-3
    text-sm text-heading
    outline-none
    transition-colors duration-200
    placeholder:text-muted
    focus:border-brand
    focus:ring-2
    focus:ring-primary/10
    ${
      errors[field]
        ? "border-danger"
        : "border-card"
    }
    motion-reduce:transition-none
  `;

  return (
    <div className="card border-card bg-surface rounded-2xl p-6 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          SEND A MESSAGE
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading">
          How can we help?
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          Send your inquiry using the form below. Required fields are marked
          with an asterisk.
        </p>
      </div>

      {submissionState === "success" && (
        <div
          role="status"
          className="
            mt-6 flex items-start gap-3
            rounded-lg border border-brand
            bg-badge p-4
          "
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          />

          <div>
            <p className="text-sm font-semibold text-heading">
              Message sent
            </p>

            <p className="mt-1 text-sm leading-5 text-muted">
              {serverMessage}
            </p>
          </div>
        </div>
      )}

      {submissionState === "error" && (
        <div
          role="alert"
          className="
            mt-6 flex items-start gap-3
            rounded-lg border border-card
            bg-panel p-4
          "
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-danger"
          />

          <div>
            <p className="text-sm font-semibold text-heading">
              Unable to send message
            </p>

            <p className="mt-1 text-sm leading-5 text-muted">
              {serverMessage}
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-7 space-y-5"
      >
        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="flex items-center gap-1.5 text-sm font-medium text-heading"
            >
              <User
                aria-hidden="true"
                className="h-4 w-4 text-primary"
              />
              Name
              <span aria-hidden="true" className="text-danger">
                *
              </span>
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={updateField}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? "contact-name-error" : undefined
              }
              className={inputClass("name")}
              placeholder="Your name"
            />

            <FieldError
              id="contact-name-error"
              message={errors.name}
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="flex items-center gap-1.5 text-sm font-medium text-heading"
            >
              <Mail
                aria-hidden="true"
                className="h-4 w-4 text-primary"
              />
              Email
              <span aria-hidden="true" className="text-danger">
                *
              </span>
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={updateField}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
              className={inputClass("email")}
              placeholder="you@example.com"
            />

            <FieldError
              id="contact-email-error"
              message={errors.email}
            />
          </div>
        </div>

        {/* Phone + Subject */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-phone"
              className="flex items-center gap-1.5 text-sm font-medium text-heading"
            >
              <Phone
                aria-hidden="true"
                className="h-4 w-4 text-primary"
              />
              Phone
              <span className="ml-1 text-xs font-normal text-muted">
                Optional
              </span>
            </label>

            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={form.phone}
              onChange={updateField}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "contact-phone-error" : undefined
              }
              className={inputClass("phone")}
              placeholder="Your phone number"
            />

            <FieldError
              id="contact-phone-error"
              message={errors.phone}
            />
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="flex items-center gap-1.5 text-sm font-medium text-heading"
            >
              <MessageSquare
                aria-hidden="true"
                className="h-4 w-4 text-primary"
              />
              Subject
              <span aria-hidden="true" className="text-danger">
                *
              </span>
            </label>

            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={updateField}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={
                errors.subject
                  ? "contact-subject-error"
                  : undefined
              }
              className={inputClass("subject")}
              placeholder="How can we help?"
            />

            <FieldError
              id="contact-subject-error"
              message={errors.subject}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="flex items-center gap-1.5 text-sm font-medium text-heading"
          >
            <MessageSquare
              aria-hidden="true"
              className="h-4 w-4 text-primary"
            />
            Message
            <span aria-hidden="true" className="text-danger">
              *
            </span>
          </label>

          <textarea
            id="contact-message"
            name="message"
            rows={7}
            value={form.message}
            onChange={updateField}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message
                ? "contact-message-error"
                : undefined
            }
            className={`${inputClass("message")} resize-y`}
            placeholder="Tell us how we can help..."
          />

          <div className="mt-1.5 flex items-center justify-between gap-3">
            <FieldError
              id="contact-message-error"
              message={errors.message}
            />

            <span className="ml-auto text-xs text-muted">
              {form.message.length}/2000
            </span>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="text-xs leading-5 text-muted">
          By submitting this form, you agree that the information provided
          may be used to respond to your inquiry. Do not submit sensitive
          financial credentials or confidential account information.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={submissionState === "submitting"}
          className="
            inline-flex min-h-11 w-full
            items-center justify-center gap-2
            rounded-lg
            border border-brand
            bg-primary
            px-5 py-3
            text-sm font-semibold text-white
            transition-opacity duration-200
            hover:opacity-90
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-60
            motion-reduce:transition-none
            sm:w-auto
          "
        >
          {submissionState === "submitting" ? (
            <>
              <Loader2
                aria-hidden="true"
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
              />
              Sending...
            </>
          ) : (
            <>
              <Send
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.9}
              />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}