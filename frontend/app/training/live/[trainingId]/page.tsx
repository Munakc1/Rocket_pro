"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  PlayCircle,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

type Training = {
  id: string;
  title: string;
  description: string;
  date: string;
  instructor: string;
  mode: string;
  status: string;
  price: number;
  oldPrice?: number;
  topics: string[];
};

const trainings: Record<string, Training> = {
  "technical-analysis-live": {
    id: "technical-analysis-live",
    title: "Technical Analysis Training for Beginners",
    description:
      "Learn the fundamentals of technical analysis, chart reading, indicators, support and resistance, and practical market analysis.",
    date: "Schedule announced soon",
    instructor: "Rocket Pro",
    mode: "Online",
    status: "Upcoming",
    price: 3000,
    oldPrice: 3500,
    topics: [
      "Introduction to technical analysis",
      "Understanding candlestick charts",
      "Support and resistance",
      "Trend identification",
      "Moving averages",
      "RSI and MACD",
      "Volume analysis",
      "Chart patterns",
      "Practical market analysis",
      "Risk management basics",
    ],
  },

  "fundamental-analysis-live": {
    id: "fundamental-analysis-live",
    title:
      "Basics of Stock Market and Fundamental Analysis",
    description:
      "Understand company fundamentals, financial statements, valuation ratios, business analysis, and long-term investment concepts.",
    date: "Schedule announced soon",
    instructor: "Rocket Pro",
    mode: "Online",
    status: "Upcoming",
    price: 2500,
    oldPrice: 3000,
    topics: [
      "Introduction to fundamental analysis",
      "Understanding financial statements",
      "Revenue and profit analysis",
      "EPS and P/E ratio",
      "Book value",
      "ROE and ROA",
      "Company comparison",
      "Business analysis",
      "Valuation basics",
      "Risk awareness",
    ],
  },
};

export default function LiveTrainingDetailsPage() {
  const params = useParams();

  const trainingId = Array.isArray(params.trainingId)
    ? params.trainingId[0]
    : params.trainingId;

  const training = trainingId ? trainings[trainingId] : undefined;

  if (!training) {
    return (
      <main className="min-h-screen bg-app px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#d5d5d5] bg-panel p-10 text-center">
          <h1 className="text-2xl font-bold">
            Training not found
          </h1>

          <p className="mt-3 text-[#656565]">
            The requested training could not be found.
          </p>

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

  return (
    <main className="min-h-screen bg-app text-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/training"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#656565] transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Training
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* MAIN */}
          <section className="rounded-3xl border border-[#d5d5d5] bg-panel p-7 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-badge px-3 py-1.5 text-xs font-semibold text-primary">
              <PlayCircle className="h-3.5 w-3.5" />
              {training.status}
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              {training.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#656565] sm:text-lg">
              {training.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <DetailCard
                icon={CalendarDays}
                label="Schedule"
                value={training.date}
              />

              <DetailCard
                icon={Users}
                label="Instructor"
                value={training.instructor}
              />

              <DetailCard
                icon={Video}
                label="Mode"
                value={training.mode}
              />

              <DetailCard
                icon={Clock3}
                label="Status"
                value={training.status}
              />
            </div>

            <div className="mt-10 border-t border-[#ececec] pt-8">
              <h2 className="text-2xl font-bold">
                What you will learn
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {training.topics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-start gap-3 rounded-xl bg-[#edf8f0] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <span className="text-sm leading-6">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PAYMENT CARD */}
          <aside className="h-fit rounded-3xl border border-[#d5d5d5] bg-panel p-6 shadow-sm lg:sticky lg:top-24">
            <div className="rounded-2xl bg-[#edf8f0] p-5">
              <p className="text-sm text-[#656565]">
                Training Fee
              </p>

              <div className="mt-2 flex items-end gap-3">
                <p className="text-3xl font-bold">
                  NPR {training.price.toLocaleString()}
                </p>

                {training.oldPrice && (
                  <p className="pb-1 text-sm text-[#656565] line-through">
                    NPR{" "}
                    {training.oldPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <PriceRow
                label="Training Fee"
                value={`NPR ${training.price.toLocaleString()}`}
              />

              <PriceRow
                label="Registration"
                value="Included"
              />

              <div className="border-t border-[#ececec] pt-4">
                <PriceRow
                  label="Total"
                  value={`NPR ${training.price.toLocaleString()}`}
                  strong
                />
              </div>
            </div>

            <Link
              href={`/training/live/${training.id}/register`}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Register for Training
              <ChevronRight className="h-4 w-4" />
            </Link>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#ececec] bg-white p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <p className="text-xs leading-5 text-[#656565]">
                Training is educational in nature and does
                not guarantee investment returns.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#ececec] bg-white p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf8f0]">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[#656565]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={
          strong
            ? "font-semibold"
            : "text-sm text-[#656565]"
        }
      >
        {label}
      </span>

      <span
        className={
          strong
            ? "text-lg font-bold"
            : "text-sm font-semibold"
        }
      >
        {value}
      </span>
    </div>
  );
}