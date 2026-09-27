import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  MapPin,
} from "lucide-react";

import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Rocket Pro — Nepal Market Intelligence & Financial Services",
  description:
    "Contact Rocket Pro for questions about Nepal market information, company insights, education, training and financial services.",
};

type InquiryArea = {
  title: string;
  description: string;
  icon: typeof BarChart3;
};

const inquiryAreas: InquiryArea[] = [
  {
    title: "Market Information",
    description:
      "Questions about NEPSE data, market movements, indices and market information.",
    icon: BarChart3,
  },
  {
    title: "Company Information",
    description:
      "Questions related to listed companies and company information available through Rocket Pro.",
    icon: Building2,
  },
  {
    title: "Training",
    description:
      "Questions about stock market education, technical analysis, fundamental analysis and risk management learning resources.",
    icon: GraduationCap,
  },
  {
    title: "General Services",
    description:
      "General questions about Rocket Pro and its broader financial-services ecosystem.",
    icon: BriefcaseBusiness,
  },
];

const platformAreas = [
  "NEPSE Market Data",
  "Company Insights",
  "Market News",
  "Education & Training",
] as const;

const faqs = [
  {
    question: "What can I contact Rocket Pro about?",
    answer:
      "You can contact Rocket Pro regarding market information, company insights, education and training, or general inquiries.",
  },
  {
    question: "Where is Rocket Pro based?",
    answer:
      "Rocket Pro is associated with a financial-services business operating from Jhapa, Koshi Province, Nepal.",
  },
  {
    question: "Can I get investment advice through the contact form?",
    answer:
      "The contact form is intended for general inquiries and platform-related questions. Market information and technical indicators provided by Rocket Pro are informational and should not be treated as guaranteed investment advice.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-app">
      {/* Hero */}
      <section
        aria-labelledby="contact-page-heading"
        className="hero-bg border-b border-card"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              CONTACT ROCKET PRO
            </p>

            <h1
              id="contact-page-heading"
              className="
                mt-3
                text-4xl font-bold tracking-tight text-heading
                sm:text-5xl
                lg:text-6xl
                lg:leading-[1.08]
              "
            >
              Let&apos;s Connect.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-body sm:text-lg">
              Have a question about Rocket Pro, market information, training,
              or our services? Send us a message and our team can help direct
              your inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Area */}
      <section
        aria-labelledby="contact-area-heading"
        className="bg-app py-14 sm:py-18 lg:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="contact-area-heading" className="sr-only">
            Contact information and contact form
          </h2>

          <div
            className="
              grid items-start gap-6
              lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]
              lg:gap-8
            "
          >
            {/* Contact Information */}
            <aside className="space-y-5">
              <div className="card border-card bg-surface rounded-2xl p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  CONTACT INFORMATION
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading">
                  Contact Rocket Pro
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Reach out with questions about the Rocket Pro platform,
                  market information, company insights, education or general
                  services.
                </p>

                <div className="mt-7 flex items-start gap-3">
                  <div
                    aria-hidden="true"
                    className="
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-lg border border-card
                      bg-badge text-primary
                    "
                  >
                    <MapPin className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-heading">
                      Location
                    </p>
                    <address className="mt-1 not-italic text-sm leading-6 text-muted">
                      Jhapa
                      <br />
                      Koshi Province
                      <br />
                      Nepal
                    </address>
                  </div>
                </div>
              </div>

              {/* Platform Areas */}
              <div className="card border-card bg-surface rounded-2xl p-6 sm:p-7">
                <h2 className="text-lg font-semibold text-heading">
                  Platform Areas
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {platformAreas.map((area) => (
                    <span
                      key={area}
                      className="
                        inline-flex items-center rounded-full
                        border border-card
                        bg-panel
                        px-3 py-1.5
                        text-xs font-medium text-secondary
                        sm:text-sm
                      "
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="border-l-2 border-brand pl-4">
                <p className="text-xs leading-5 text-muted sm:text-sm">
                  Please do not submit sensitive financial credentials,
                  passwords, payment information, or confidential account
                  information through this form.
                </p>

                <Link
                  href="/privacy"
                  className="
                    mt-2 inline-flex
                    text-xs font-medium text-primary
                    underline-offset-4
                    hover:underline
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-2
                    sm:text-sm
                  "
                >
                  Read our Privacy Policy
                </Link>
              </div>
            </aside>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Inquiry Areas */}
      <section
        aria-labelledby="how-can-we-help-heading"
        className="bg-surface border-y border-card py-14 sm:py-18 lg:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              INQUIRY AREAS
            </p>

            <h2
              id="how-can-we-help-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
            >
              How Can We Help?
            </h2>

            <p className="mt-4 text-base leading-7 text-muted">
              Choose the area closest to your question so your inquiry can be
              directed appropriately.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inquiryAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="
                    group card
                    rounded-xl border-card
                    bg-panel p-5
                    transition-colors duration-200
                    hover:border-brand
                    motion-reduce:transition-none
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-lg border border-card
                      bg-badge text-primary
                      transition-transform duration-200
                      group-hover:-translate-y-0.5
                      motion-reduce:transform-none
                    "
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-heading">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="contact-faq-heading"
        className="bg-app py-14 sm:py-18 lg:py-20"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              HELPFUL INFORMATION
            </p>

            <h2
              id="contact-faq-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
            >
              Questions About Rocket Pro?
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="
                  group rounded-xl
                  border border-card
                  bg-surface
                  open:border-brand
                "
              >
                <summary
                  className="
                    cursor-pointer
                    list-none
                    px-5 py-4
                    text-sm font-semibold text-heading
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-primary
                    sm:px-6
                  "
                >
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}

                    <span
                      aria-hidden="true"
                      className="
                        text-xl font-normal leading-none text-muted
                        transition-transform duration-200
                        group-open:rotate-45
                        motion-reduce:transition-none
                      "
                    >
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-card px-5 py-4 sm:px-6">
                  <p className="text-sm leading-6 text-muted">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-14 sm:py-18 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="
              card border-card bg-panel
              rounded-2xl p-7
              sm:p-9
              lg:flex lg:items-center lg:justify-between lg:gap-10
            "
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                EXPLORE ROCKET PRO
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                Explore the market and keep learning.
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                Explore Nepal market information or discover educational
                resources available through Rocket Pro.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
              <Link
                href="/market"
                className="
                  inline-flex min-h-11 items-center justify-center
                  rounded-lg
                  border border-brand
                  bg-primary
                  px-5 py-2.5
                  text-sm font-semibold text-white
                  transition-opacity duration-200
                  hover:opacity-90
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                  motion-reduce:transition-none
                "
              >
                Explore Market
              </Link>

              <Link
                href="/training"
                className="
                  inline-flex min-h-11 items-center justify-center
                  rounded-lg
                  border border-cta
                  bg-surface
                  px-5 py-2.5
                  text-sm font-semibold text-heading
                  transition-colors duration-200
                  hover:border-brand
                  hover:text-primary
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                  motion-reduce:transition-none
                "
              >
                Explore Training
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}