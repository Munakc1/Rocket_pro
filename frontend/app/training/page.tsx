
"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  LineChart,
  PlayCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

type Course = {
  id: string;
  title: string;
  description: string;
  lessons: number;
  level: CourseLevel;
  category: string;
  duration: string;
  type: "Free" | "Live Training";
  icon: typeof BookOpen;
  topics: string[];
};

/* ============================================================
   FREE COURSES
============================================================ */

const courses: Course[] = [
  {
    id: "nepse-basics",
    title: "NEPSE Basics",
    description:
      "Learn the fundamentals of Nepal's stock market, listed companies, indices, market terminology, and how the share market works.",
    lessons: 8,
    level: "Beginner",
    category: "Market Basics",
    duration: "Self-paced",
    type: "Free",
    icon: BookOpen,
    topics: [
      "Understanding NEPSE",
      "Listed Companies",
      "NEPSE Index",
      "Market Terminology",
      "How Share Trading Works",
      "Primary & Secondary Market",
      "Broker Account Basics",
      "Basic Market Rules",
    ],
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis",
    description:
      "Understand charts, trends, support, resistance, volume, RSI, moving averages, candlestick patterns, and technical indicators.",
    lessons: 12,
    level: "Intermediate",
    category: "Technical Analysis",
    duration: "Self-paced",
    type: "Free",
    icon: LineChart,
    topics: [
      "Candlestick Charts",
      "Trend Analysis",
      "Support & Resistance",
      "Chart Patterns",
      "Price Action",
      "Volume Analysis",
      "RSI",
      "Moving Averages",
      "MACD",
      "Trading Setups",
    ],
  },
  {
    id: "fundamental-analysis",
    title: "Fundamental Analysis",
    description:
      "Learn how to study company financials, earnings, valuation, sectors, business performance, and financial statements.",
    lessons: 10,
    level: "Intermediate",
    category: "Fundamental Analysis",
    duration: "Self-paced",
    type: "Free",
    icon: BarChart3,
    topics: [
      "Company Analysis",
      "Financial Statements",
      "Revenue & Profit",
      "EPS",
      "P/E Ratio",
      "Book Value",
      "ROE",
      "Sector Analysis",
      "Dividend Analysis",
      "Company Valuation",
    ],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description:
      "Understand position sizing, stop-loss planning, diversification, capital protection, and managing trading risk.",
    lessons: 7,
    level: "Beginner",
    category: "Risk Management",
    duration: "Self-paced",
    type: "Free",
    icon: ShieldCheck,
    topics: [
      "Trading Risk",
      "Investment Risk",
      "Position Sizing",
      "Stop Loss",
      "Risk-to-Reward",
      "Portfolio Diversification",
      "Capital Protection",
    ],
  },
  {
    id: "market-analysis",
    title: "Market Analysis",
    description:
      "Learn how to combine market breadth, sector performance, volume, index movement, and company data.",
    lessons: 9,
    level: "Intermediate",
    category: "Market Analysis",
    duration: "Self-paced",
    type: "Free",
    icon: TrendingUp,
    topics: [
      "NEPSE Index Analysis",
      "Market Breadth",
      "Sector Performance",
      "Top Gainers",
      "Top Losers",
      "Market Volume",
      "Turnover",
      "Market Sentiment",
      "Daily Market Review",
    ],
  },
  {
    id: "advanced-trading",
    title: "Advanced Trading Concepts",
    description:
      "Explore advanced trading concepts including multi-timeframe analysis, momentum, breakout setups, and trading systems.",
    lessons: 14,
    level: "Advanced",
    category: "Trading",
    duration: "Self-paced",
    type: "Free",
    icon: TrendingUp,
    topics: [
      "Multi-Timeframe Analysis",
      "Breakout Trading",
      "Momentum Trading",
      "Mean Reversion",
      "Trading Systems",
      "Entry Planning",
      "Exit Planning",
      "Trade Journaling",
      "Trading Psychology",
    ],
  },
];

/* ============================================================
   LIVE TRAININGS
============================================================ */

const liveTrainings = [
  {
    id: "technical-analysis-live",
    title: "Technical Analysis Training for Beginners",
    date: "Sep 11 - Sep 24",
    mode: "Online",
    status: "Upcoming",
    price: "NPR 3,000",
    oldPrice: "NPR 3,500",
    discount: "14.29% off",
    instructor: "Rocket Pro",
    description:
      "A practical beginner-friendly training covering charts, trends, support, resistance, volume, indicators, and basic trading setups.",
  },
  {
    id: "fundamental-analysis-live",
    title: "Basics of Stock Market and Fundamental Analysis",
    date: "Sep 09 - Sep 21",
    mode: "Online",
    status: "Upcoming",
    price: "NPR 2,500",
    oldPrice: "NPR 3,000",
    discount: "16.67% off",
    instructor: "Rocket Pro",
    description:
      "Learn the basics of the Nepal stock market and understand how to evaluate companies using fundamental analysis.",
  },
];

/* ============================================================
   POPULAR TOPICS
============================================================ */

const topics = [
  "Understanding NEPSE",
  "How Share Trading Works",
  "Reading Candlestick Charts",
  "Support & Resistance",
  "RSI & Moving Averages",
  "Volume Analysis",
  "Company Fundamentals",
  "Risk Management",
];

/* ============================================================
   FILTER OPTIONS
============================================================ */

const levelFilters = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

const typeFilters = ["All", "Free", "Upcoming"] as const;

/* ============================================================
   COMPONENT
============================================================ */

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] =
    useState<(typeof levelFilters)[number]>("All Levels");

  const [typeFilter, setTypeFilter] =
    useState<(typeof typeFilters)[number]>("All");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [selectedLiveTraining, setSelectedLiveTraining] = useState<
    (typeof liveTrainings)[number] | null
  >(null);

  /* ==========================================================
     FILTER COURSES
  ========================================================== */

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.topics.some((topic) =>
          topic.toLowerCase().includes(query),
        );

      const matchesLevel =
        levelFilter === "All Levels" ||
        course.level === levelFilter;

      const matchesType =
        typeFilter === "All" ||
        (typeFilter === "Free" && course.type === "Free");

      return matchesSearch && matchesLevel && matchesType;
    });
  }, [searchQuery, levelFilter, typeFilter]);

  /* ==========================================================
     RESET FILTERS
  ========================================================== */

  const resetFilters = () => {
    setSearchQuery("");
    setLevelFilter("All Levels");
    setTypeFilter("All");
  };

  /* ==========================================================
     SCROLL
  ========================================================== */

  const scrollToCourses = () => {
    document
      .getElementById("training-courses")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      <main className="min-h-screen bg-[#d4efde] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* ==================================================
              HEADER
          ================================================== */}

          <section className="mb-8">

            <p className="mb-2 text-sm font-semibold text-[#0aa852]">
              ROCKET PRO TRAINING
            </p>

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                  Learn the Nepal Stock Market
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#656565] sm:text-base">
                  Build your knowledge of NEPSE, technical analysis,
                  fundamental analysis, market analysis, and risk management
                  through practical learning resources.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] px-4 py-3">
                <BookOpen
                  size={18}
                  className="text-[#0aa852]"
                />

                <div>
                  <p className="text-xs font-semibold text-black">
                    Public Training
                  </p>

                  <p className="text-[11px] text-[#656565]">
                    No login required
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* ==================================================
              FEATURED COURSE
          ================================================== */}

          <section className="mb-8 overflow-hidden rounded-2xl border border-[#01c45a] bg-[#fbfbfb] shadow-sm">

            <div className="grid lg:grid-cols-[1fr_300px]">

              <div className="p-6 sm:p-8">

                <span className="inline-flex rounded-full bg-[#dcffec] px-3 py-1 text-xs font-semibold text-[#0aa852]">
                  START HERE
                </span>

                <h2 className="mt-4 text-2xl font-bold text-black sm:text-3xl">
                  NEPSE Beginner Guide
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#656565]">
                  Start with the basics of the Nepal stock market before
                  moving into technical analysis, company analysis, market
                  data, and trading concepts.
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#656565]">

                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen
                      size={14}
                      className="text-[#0aa852]"
                    />
                    8 Lessons
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Users
                      size={14}
                      className="text-[#0aa852]"
                    />
                    Beginner
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <PlayCircle
                      size={14}
                      className="text-[#0aa852]"
                    />
                    Free
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCourse(courses[0]);
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#078f46]"
                >
                  Start Learning
                  <ChevronRight size={18} />
                </button>

              </div>

              <div className="flex items-center justify-center bg-[#f1f9f4] p-6">

                <div className="text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#dcffec] text-[#0aa852]">
                    <GraduationIcon />
                  </div>

                  <p className="mt-4 text-sm font-bold text-black">
                    Free Learning
                  </p>

                  <p className="mt-1 text-xs text-[#656565]">
                    Learn at your own pace
                  </p>

                </div>

              </div>

            </div>
          </section>

          {/* ==================================================
              FILTER
          ================================================== */}

          <section className="mb-8 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm">

            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dcffec] text-[#0aa852]">
                  <Filter size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-black">
                    Find Training
                  </h2>

                  <p className="text-xs text-[#656565]">
                    Search and filter available courses
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 self-start rounded-lg border border-[#d5d5d5] px-3 py-2 text-xs font-semibold text-[#656565] transition hover:border-[#01c45a] hover:bg-[#dcffec] hover:text-[#0aa852]"
              >
                <RotateCcw size={14} />
                Reset
              </button>

            </div>

            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">

              {/* SEARCH */}

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#656565]"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search courses or topics..."
                  className="w-full rounded-xl border border-[#d5d5d5] bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-[#999] focus:border-[#01c45a] focus:ring-2 focus:ring-[#dcffec]"
                />

              </div>

              {/* LEVEL */}

              <select
                value={levelFilter}
                onChange={(event) =>
                  setLevelFilter(
                    event.target.value as (typeof levelFilters)[number],
                  )
                }
                className="rounded-xl border border-[#d5d5d5] bg-white px-4 py-3 text-sm text-black outline-none focus:border-[#01c45a]"
              >
                {levelFilters.map((level) => (
                  <option key={level}>
                    {level}
                  </option>
                ))}
              </select>

              {/* TYPE */}

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(
                    event.target.value as (typeof typeFilters)[number],
                  )
                }
                className="rounded-xl border border-[#d5d5d5] bg-white px-4 py-3 text-sm text-black outline-none focus:border-[#01c45a]"
              >
                {typeFilters.map((type) => (
                  <option key={type}>
                    {type}
                  </option>
                ))}
              </select>

            </div>
          </section>

          {/* ==================================================
              LIVE TRAINING
          ================================================== */}

          {typeFilter !== "Free" && (
            <section className="mb-10">

              <div className="mb-5 flex items-end justify-between gap-4">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0aa852]">
                    Live Training
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-black">
                    Upcoming Courses
                  </h2>

                  <p className="mt-1 text-sm text-[#656565]">
                    Join structured live training sessions from Rocket Pro.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {liveTrainings.map((training) => (
                  <article
                    key={training.id}
                    className="overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] shadow-sm transition hover:border-[#01c45a]"
                  >

                    {/* IMAGE PLACEHOLDER */}

                    <div className="relative flex h-44 items-center justify-center bg-[#f1f9f4]">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dcffec] text-[#0aa852]">
                        <LineChart size={30} />
                      </div>

                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#0aa852] shadow-sm">
                        {training.mode}
                      </span>

                      <span className="absolute right-4 top-4 rounded-full bg-[#0aa852] px-3 py-1 text-[11px] font-semibold text-white">
                        {training.status}
                      </span>

                    </div>

                    <div className="p-5">

                      <div className="flex items-center gap-2 text-xs text-[#656565]">

                        <CalendarDays
                          size={14}
                          className="text-[#0aa852]"
                        />

                        {training.date}

                      </div>

                      <h3 className="mt-3 text-lg font-bold text-black">
                        {training.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#656565]">
                        {training.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-[#d5d5d5] pt-4">

                        <div>

                          <span className="text-lg font-bold text-[#0aa852]">
                            {training.price}
                          </span>

                          <span className="ml-2 text-xs text-[#999] line-through">
                            {training.oldPrice}
                          </span>

                          <span className="ml-2 text-[10px] font-semibold text-[#0aa852]">
                            {training.discount}
                          </span>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedLiveTraining(training)
                          }
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#0aa852]"
                        >
                          Details
                          <ChevronRight size={16} />
                        </button>

                      </div>

                    </div>
                  </article>
                ))}

              </div>
            </section>
          )}

          {/* ==================================================
              COURSES
          ================================================== */}

          <section
            id="training-courses"
            className="mb-10 scroll-mt-6"
          >

            <div className="mb-5">

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0aa852]">
                Courses
              </p>

              <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                <div>

                  <h2 className="text-2xl font-bold text-black">
                    Training Courses
                  </h2>

                  <p className="mt-1 text-sm text-[#656565]">
                    Learn important Nepal stock market concepts step by step.
                  </p>

                </div>

                <p className="text-xs text-[#656565]">
                  {filteredCourses.length} course
                  {filteredCourses.length !== 1 ? "s" : ""} available
                </p>

              </div>

            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">

                {filteredCourses.map((course) => {
                  const Icon = course.icon;

                  return (
                    <article
                      key={course.id}
                      className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm transition hover:border-[#01c45a] hover:shadow-md"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dcffec] text-[#0aa852]">
                          <Icon size={22} />
                        </div>

                        <span className="rounded-full bg-[#dcffec] px-3 py-1 text-xs font-medium text-[#0aa852]">
                          {course.level}
                        </span>

                      </div>

                      <h3 className="mt-5 text-lg font-bold text-black">
                        {course.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#656565]">
                        {course.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">

                        {course.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-md bg-[#f1f9f4] px-2.5 py-1 text-[10px] font-medium text-[#656565]"
                          >
                            {topic}
                          </span>
                        ))}

                        {course.topics.length > 3 && (
                          <span className="rounded-md bg-[#f1f9f4] px-2.5 py-1 text-[10px] font-medium text-[#656565]">
                            +{course.topics.length - 3} more
                          </span>
                        )}

                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[#d5d5d5] pt-4">

                        <div className="flex items-center gap-4 text-xs text-[#656565]">

                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen
                              size={14}
                              className="text-[#0aa852]"
                            />
                            {course.lessons} Lessons
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Clock3
                              size={14}
                              className="text-[#0aa852]"
                            />
                            {course.duration}
                          </span>

                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedCourse(course)}
                          className="flex items-center gap-1 text-sm font-semibold text-[#0aa852] transition hover:text-[#078f46]"
                        >
                          View Course
                          <ChevronRight size={16} />
                        </button>

                      </div>

                    </article>
                  );
                })}

              </div>
            ) : (
              <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-10 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f9f4] text-[#656565]">
                  <Search size={22} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-black">
                  No courses found
                </h3>

                <p className="mt-2 text-sm text-[#656565]">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0aa852] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#078f46]"
                >
                  <RotateCcw size={15} />
                  Reset Filters
                </button>

              </div>
            )}

          </section>

          {/* ==================================================
              POPULAR TOPICS
          ================================================== */}

          <section className="mb-8 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-6">

            <div className="mb-5">

              <h2 className="text-xl font-bold text-black">
                Popular Learning Topics
              </h2>

              <p className="mt-1 text-sm text-[#656565]">
                Quick topics to improve your market knowledge.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setSearchQuery(topic);
                    scrollToCourses();
                  }}
                  className="flex items-center gap-3 rounded-xl border border-[#d5d5d5] bg-[#f1f9f4] p-4 text-left transition hover:border-[#01c45a] hover:bg-[#dcffec]"
                >

                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#0aa852]"
                  />

                  <span className="text-sm font-medium text-black">
                    {topic}
                  </span>

                </button>
              ))}

            </div>
          </section>

          {/* ==================================================
              MARKET KNOWLEDGE CTA
          ================================================== */}

          <section className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <TrendingUp
                    size={22}
                    className="text-[#0aa852]"
                  />

                  <h2 className="text-xl font-bold text-black">
                    Build Better Market Knowledge
                  </h2>

                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#656565]">
                  Use Rocket Pro training to understand market data,
                  technical concepts, company fundamentals, and risk
                  management. Training content is educational and does not
                  guarantee investment returns.
                </p>

              </div>

              <button
                type="button"
                onClick={scrollToCourses}
                className="shrink-0 rounded-xl border border-[#01c45a] px-5 py-3 text-sm font-semibold text-[#0aa852] transition hover:bg-[#dcffec]"
              >
                Explore Training
              </button>

            </div>
          </section>

          {/* ==================================================
              DISCLAIMER
          ================================================== */}

          <p className="mt-6 text-center text-xs leading-5 text-[#656565]">
            Rocket Pro training is for educational and informational purposes
            only. It is not investment advice.
          </p>

        </div>
      </main>

      {/* ======================================================
          COURSE DETAILS MODAL
      ====================================================== */}

      {selectedCourse && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCourse(null);
            }
          }}
        >

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] shadow-2xl">

            {/* HEADER */}

            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#d5d5d5] bg-[#fbfbfb] p-5 sm:p-6">

              <div className="pr-4">

                <span className="rounded-full bg-[#dcffec] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0aa852]">
                  {selectedCourse.level}
                </span>

                <h2 className="mt-3 text-xl font-bold text-black sm:text-2xl">
                  {selectedCourse.title}
                </h2>

                <p className="mt-1 text-sm text-[#656565]">
                  {selectedCourse.description}
                </p>

              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d5d5d5] text-[#656565] transition hover:border-[#01c45a] hover:bg-[#dcffec] hover:text-[#0aa852]"
                aria-label="Close course"
              >
                <X size={18} />
              </button>

            </div>

            <div className="p-5 sm:p-6">

              {/* COURSE META */}

              <div className="grid gap-3 sm:grid-cols-3">

                <div className="rounded-xl border border-[#d5d5d5] bg-[#f1f9f4] p-4">

                  <BookOpen
                    size={18}
                    className="text-[#0aa852]"
                  />

                  <p className="mt-3 text-[10px] font-semibold uppercase text-[#656565]">
                    Lessons
                  </p>

                  <p className="mt-1 text-sm font-bold text-black">
                    {selectedCourse.lessons}
                  </p>

                </div>

                <div className="rounded-xl border border-[#d5d5d5] bg-[#f1f9f4] p-4">

                  <Clock3
                    size={18}
                    className="text-[#0aa852]"
                  />

                  <p className="mt-3 text-[10px] font-semibold uppercase text-[#656565]">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-bold text-black">
                    {selectedCourse.duration}
                  </p>

                </div>

                <div className="rounded-xl border border-[#d5d5d5] bg-[#f1f9f4] p-4">

                  <PlayCircle
                    size={18}
                    className="text-[#0aa852]"
                  />

                  <p className="mt-3 text-[10px] font-semibold uppercase text-[#656565]">
                    Access
                  </p>

                  <p className="mt-1 text-sm font-bold text-black">
                    Free
                  </p>

                </div>

              </div>

              {/* TOPICS */}

              <div className="mt-7">

                <h3 className="text-lg font-bold text-black">
                  What You Will Learn
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  {selectedCourse.topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-start gap-2 rounded-lg border border-[#d5d5d5] bg-white p-3"
                    >

                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-[#0aa852]"
                      />

                      <span className="text-xs text-[#656565]">
                        {topic}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* START */}

              <button
                type="button"
                onClick={() => {
                  setSelectedCourse(null);
                  setTimeout(() => {
                    alert(
                      `Starting "${selectedCourse.title}". Connect this button to your lesson route when the course content is ready.`,
                    );
                  }, 100);
                }}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#078f46]"
              >
                Start Learning
                <PlayCircle size={17} />
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          LIVE TRAINING MODAL
      ====================================================== */}

      {selectedLiveTraining && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLiveTraining(null);
            }
          }}
        >

          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] shadow-2xl">

            <div className="flex items-start justify-between border-b border-[#d5d5d5] p-5 sm:p-6">

              <div className="pr-4">

                <span className="rounded-full bg-[#dcffec] px-3 py-1 text-[10px] font-bold uppercase text-[#0aa852]">
                  Upcoming
                </span>

                <h2 className="mt-3 text-xl font-bold text-black">
                  {selectedLiveTraining.title}
                </h2>

              </div>

              <button
                type="button"
                onClick={() => setSelectedLiveTraining(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d5d5d5] text-[#656565] hover:border-[#01c45a] hover:bg-[#dcffec] hover:text-[#0aa852]"
                aria-label="Close training"
              >
                <X size={18} />
              </button>

            </div>

            <div className="p-5 sm:p-6">

              <p className="text-sm leading-6 text-[#656565]">
                {selectedLiveTraining.description}
              </p>

              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between rounded-xl bg-[#f1f9f4] p-4">
                  <span className="text-xs text-[#656565]">
                    Schedule
                  </span>

                  <span className="text-sm font-semibold text-black">
                    {selectedLiveTraining.date}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#f1f9f4] p-4">
                  <span className="text-xs text-[#656565]">
                    Mode
                  </span>

                  <span className="text-sm font-semibold text-black">
                    {selectedLiveTraining.mode}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#f1f9f4] p-4">
                  <span className="text-xs text-[#656565]">
                    Instructor
                  </span>

                  <span className="text-sm font-semibold text-black">
                    {selectedLiveTraining.instructor}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#f1f9f4] p-4">
                  <span className="text-xs text-[#656565]">
                    Training Fee
                  </span>

                  <div>
                    <span className="text-sm font-bold text-[#0aa852]">
                      {selectedLiveTraining.price}
                    </span>

                    <span className="ml-2 text-xs text-[#999] line-through">
                      {selectedLiveTraining.oldPrice}
                    </span>
                  </div>
                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedLiveTraining(null);
                  alert(
                    "Live training enrollment will be connected to the Rocket Pro enrollment/payment flow.",
                  );
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0aa852] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#078f46]"
              >
                Register for Training
                <ChevronRight size={17} />
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-[#656565]">
                Login is not required to view training details.
              </p>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   SMALL ICON
============================================================ */

function GraduationIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 9.5L12 5L21 9.5L12 14L3 9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M6 11.5V16C6 16 8.2 19 12 19C15.8 19 18 16 18 16V11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M21 10V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

