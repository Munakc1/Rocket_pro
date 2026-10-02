"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

type Course = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  lessons: number;
  level: CourseLevel;
  category: string;
  duration: string;
  icon: string;
  topics: string[];
};

type LiveTraining = {
  id: string;
  title: string;
  date: string;
  mode: string;
  status: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  instructor: string;
  description: string;
};

const courseIcons: Record<string, typeof BookOpen> = {
  "book-open": BookOpen,
  "line-chart": LineChart,
  "bar-chart-3": BarChart3,
  "shield-check": ShieldCheck,
  "trending-up": TrendingUp,
};

const liveTrainings: LiveTraining[] = [
  {
    id: "technical-analysis-live",
    title: "Technical Analysis Training for Beginners",
    date: "Schedule announced soon",
    mode: "Online",
    status: "Upcoming",
    price: 3000,
    oldPrice: 3500,
    discount: "14.29% off",
    instructor: "Rocket Pro",
    description:
      "Learn the fundamentals of technical analysis, chart reading, indicators, support and resistance, and practical market analysis.",
  },
  {
    id: "fundamental-analysis-live",
    title: "Basics of Stock Market and Fundamental Analysis",
    date: "Schedule announced soon",
    mode: "Online",
    status: "Upcoming",
    price: 2500,
    oldPrice: 3000,
    discount: "16.67% off",
    instructor: "Rocket Pro",
    description:
      "Understand company fundamentals, financial statements, valuation ratios, business analysis, and long-term investment concepts.",
  },
];

const popularTopics = [
  "Technical Analysis",
  "Fundamental Analysis",
  "NEPSE Basics",
  "Risk Management",
  "Market Analysis",
  "Trading Psychology",
  "Portfolio Management",
  "Stock Valuation",
];

const levelFilters = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const typeFilters = ["All", "Free", "Live"];

export default function TrainingPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courseError, setCourseError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  const [selectedLiveTraining, setSelectedLiveTraining] =
    useState<LiveTraining | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        setCourseError("");

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${apiUrl}/api/training/courses`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message || "Failed to fetch courses"
          );
        }

        if (!result?.success) {
          throw new Error(
            result?.message || "Failed to fetch courses"
          );
        }

        const backendCourses: Course[] =
          (result.data || []).map((course: any) => ({
            id:
              course.id ||
              course.slug ||
              course._id,
            slug: course.slug,
            title: course.title || "",
            description: course.description || "",
            lessons: Number(course.lessons || 0),
            level: course.level || "Beginner",
            category:
              course.category || "Training",
            duration:
              course.duration || "Self-paced",
            icon: course.icon || "book-open",
            topics: Array.isArray(course.topics)
              ? course.topics
              : [],
          }));

        setCourses(backendCourses);
      } catch (error) {
        console.error(
          "Failed to fetch training courses:",
          error
        );

        setCourseError(
          error instanceof Error
            ? error.message
            : "Failed to fetch courses"
        );
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description
          .toLowerCase()
          .includes(query) ||
        course.category
          .toLowerCase()
          .includes(query) ||
        course.topics.some((topic) =>
          topic.toLowerCase().includes(query)
        );

      const matchesLevel =
        levelFilter === "All Levels" ||
        course.level === levelFilter;

      const matchesType =
        typeFilter === "All" ||
        typeFilter === "Free";

      return (
        matchesSearch &&
        matchesLevel &&
        matchesType
      );
    });
  }, [
    courses,
    searchQuery,
    levelFilter,
    typeFilter,
  ]);

  const filteredLiveTrainings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return liveTrainings.filter((training) => {
      if (!query) return true;

      return (
        training.title
          .toLowerCase()
          .includes(query) ||
        training.description
          .toLowerCase()
          .includes(query) ||
        training.instructor
          .toLowerCase()
          .includes(query)
      );
    });
  }, [searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setLevelFilter("All Levels");
    setTypeFilter("All");
  };

  const scrollToCourses = () => {
    document
      .getElementById("courses")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCourse(null);
        setSelectedLiveTraining(null);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    const modalOpen =
      selectedCourse !== null ||
      selectedLiveTraining !== null;

    document.body.style.overflow = modalOpen
      ? "hidden"
      : "";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [
    selectedCourse,
    selectedLiveTraining,
  ]);

  const featuredCourse = courses[0];

  return (
    <main className="min-h-screen bg-app text-black">
      {/* HEADER */}
      <section className="border-b border-[#d5d5d5] bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-badge px-4 py-2 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              Rocket Pro Training
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Learn the Nepal Stock Market
              <span className="block text-primary">
                with confidence.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#656565] sm:text-lg">
              Build your understanding of NEPSE,
              technical analysis, fundamental analysis,
              risk management, and practical market
              concepts through structured learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToCourses}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Explore Courses
                <ChevronRight className="h-4 w-4" />
              </button>

              <a
                href="#live-training"
                className="inline-flex items-center gap-2 rounded-xl border border-[#d5d5d5] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#f7f7f7]"
              >
                <PlayCircle className="h-4 w-4" />
                Live Training
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSE */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loadingCourses ? (
          <div className="rounded-3xl border border-[#d5d5d5] bg-panel p-8">
            <div className="animate-pulse">
              <div className="h-5 w-32 rounded bg-[#e8e8e8]" />
              <div className="mt-4 h-8 w-2/3 rounded bg-[#e8e8e8]" />
              <div className="mt-3 h-4 w-full rounded bg-[#e8e8e8]" />
              <div className="mt-2 h-4 w-4/5 rounded bg-[#e8e8e8]" />
            </div>
          </div>
        ) : featuredCourse ? (
          <div className="overflow-hidden rounded-3xl border border-[#d5d5d5] bg-panel">
            <div className="grid gap-0 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="p-7 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-badge px-3 py-1.5 text-xs font-semibold text-primary">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Featured Course
                </div>

                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  {featuredCourse.title}
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-[#656565]">
                  {featuredCourse.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <MetaCard
                    icon={BookOpen}
                    label="Lessons"
                    value={`${featuredCourse.lessons}`}
                  />

                  <MetaCard
                    icon={Clock3}
                    label="Duration"
                    value={featuredCourse.duration}
                  />

                  <MetaCard
                    icon={BarChart3}
                    label="Level"
                    value={featuredCourse.level}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCourse(featuredCourse)
                  }
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  View Course
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex min-h-[260px] items-center justify-center bg-[#edf8f0] p-10">
                {(() => {
                  const Icon =
                    courseIcons[
                      featuredCourse.icon
                    ] || BookOpen;

                  return (
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-sm">
                      <Icon className="h-14 w-14 text-primary" />
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-[#d5d5d5] bg-panel p-8">
            <EmptyState
              title="No courses available"
              description="Training courses will appear here once they are added to Rocket Pro."
              onReset={resetFilters}
            />
          </div>
        )}
      </section>

      {/* COURSES */}
      <section
        id="courses"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">
              Training Library
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Courses for every learning stage
            </h2>

            <p className="mt-3 max-w-2xl text-[#656565]">
              Start with the basics and progress toward
              more advanced market concepts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#656565]">
            <Filter className="h-4 w-4" />
            {filteredCourses.length} courses
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#d5d5d5] bg-panel p-4">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search courses..."
                className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary"
              />
            </div>

            <select
              value={levelFilter}
              onChange={(event) =>
                setLevelFilter(event.target.value)
              }
              className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-primary"
            >
              {levelFilters.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="h-11 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm outline-none focus:border-primary"
            >
              {typeFilters.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#d5d5d5] bg-white px-4 text-sm font-semibold transition hover:bg-[#f7f7f7]"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-8">
          {loadingCourses ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-2xl border border-[#d5d5d5] bg-panel p-6"
                  >
                    <div className="h-12 w-12 rounded-xl bg-[#e8e8e8]" />
                    <div className="mt-5 h-5 w-3/4 rounded bg-[#e8e8e8]" />
                    <div className="mt-3 h-4 w-full rounded bg-[#e8e8e8]" />
                    <div className="mt-2 h-4 w-5/6 rounded bg-[#e8e8e8]" />
                  </div>
                )
              )}
            </div>
          ) : courseError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="font-semibold text-red-600">
                Unable to load courses
              </p>

              <p className="mt-2 text-sm text-red-500">
                {courseError}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          ) : filteredCourses.length === 0 ? (
            <EmptyState
              title="No courses found"
              description="Try changing your search or filters."
              onReset={resetFilters}
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => {
                const Icon =
                  courseIcons[course.icon] ||
                  BookOpen;

                return (
                  <article
                    key={course.id}
                    className="group rounded-2xl border border-[#d5d5d5] bg-panel p-6 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf8f0]">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>

                      <span className="rounded-full bg-badge px-3 py-1 text-xs font-semibold text-primary">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold">
                      {course.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#656565]">
                      {course.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#656565]">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" />
                        {course.lessons} Lessons
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    <div className="mt-5 border-t border-[#ececec] pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#656565]">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {course.category}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCourse(course)
                      }
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-3 text-sm font-semibold text-primary transition hover:bg-[#edf8f0]"
                    >
                      View Course
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* LIVE TRAINING */}
      <section
        id="live-training"
        className="border-y border-[#d5d5d5] bg-[#f1f9f4]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">
              Live Training
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Learn with structured live sessions
            </h2>

            <p className="mt-3 text-[#656565]">
              Join instructor-led sessions designed around
              practical market concepts and Nepal&apos;s
              stock market environment.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {filteredLiveTrainings.map(
              (training) => (
                <article
                  key={training.id}
                  className="rounded-2xl border border-[#d5d5d5] bg-panel p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-badge px-3 py-1 text-xs font-semibold text-primary">
                        <PlayCircle className="h-3.5 w-3.5" />
                        {training.status}
                      </span>

                      <h3 className="mt-4 text-xl font-bold">
                        {training.title}
                      </h3>
                    </div>

                    {training.discount && (
                      <span className="rounded-full bg-[#dcffec] px-3 py-1 text-xs font-semibold text-primary">
                        {training.discount}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#656565]">
                    {training.description}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <InfoRow
                      icon={CalendarDays}
                      label="Schedule"
                      value={training.date}
                    />

                    <InfoRow
                      icon={Users}
                      label="Instructor"
                      value={training.instructor}
                    />

                    <InfoRow
                      icon={PlayCircle}
                      label="Mode"
                      value={training.mode}
                    />

                    <InfoRow
                      icon={Clock3}
                      label="Status"
                      value={training.status}
                    />
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#ececec] pt-5">
                    <div>
                      {training.oldPrice && (
                        <p className="text-sm text-[#656565] line-through">
                          NPR{" "}
                          {training.oldPrice.toLocaleString()}
                        </p>
                      )}

                      <p className="text-2xl font-bold">
                        NPR{" "}
                        {training.price.toLocaleString()}
                      </p>
                    </div>

                    <Link
                      href={`/training/live/${training.id}`}
                      className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">
            Popular Topics
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Explore what you want to learn
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {popularTopics.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setSearchQuery(topic);
                scrollToCourses();
              }}
              className="rounded-full border border-[#d5d5d5] bg-panel px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:bg-[#edf8f0] hover:text-primary"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-white sm:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white/80">
              Keep Learning
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Build your market knowledge step by step.
            </h2>

            <p className="mt-4 leading-7 text-white/80">
              Learn the fundamentals first, then develop
              your understanding of technical analysis,
              company analysis, risk management, and
              practical market concepts.
            </p>

            <button
              type="button"
              onClick={scrollToCourses}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-[#f3f3f3]"
            >
              Explore Courses
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="flex gap-3 rounded-2xl border border-[#d5d5d5] bg-panel p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <p className="text-sm leading-6 text-[#656565]">
            Training content is provided for educational
            purposes only. It does not constitute investment
            advice or a guarantee of returns. Always conduct
            your own research and consider your risk tolerance
            before making investment decisions.
          </p>
        </div>
      </section>

      {/* COURSE MODAL */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCourse(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-panel shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-[#ececec] bg-panel px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Course Details
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedCourse.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedCourse(null)
                }
                className="rounded-full p-2 transition hover:bg-[#f3f3f3]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="leading-7 text-[#656565]">
                {selectedCourse.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MetaCard
                  icon={BookOpen}
                  label="Lessons"
                  value={`${selectedCourse.lessons}`}
                />

                <MetaCard
                  icon={Clock3}
                  label="Duration"
                  value={selectedCourse.duration}
                />

                <MetaCard
                  icon={BarChart3}
                  label="Level"
                  value={selectedCourse.level}
                />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold">
                  What you will learn
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {selectedCourse.topics.map(
                    (topic) => (
                      <div
                        key={topic}
                        className="flex items-start gap-2 rounded-xl bg-[#edf8f0] p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <span className="text-sm">
                          {topic}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Link
                href={`/training/${
                  selectedCourse.slug ||
                  selectedCourse.id
                }`}
                onClick={() =>
                  setSelectedCourse(null)
                }
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Start Course
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function EmptyState({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf8f0]">
        <Search className="h-6 w-6 text-primary" />
      </div>

      <h3 className="mt-4 text-lg font-bold">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#656565]">
        {description}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#d5d5d5] bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-[#f7f7f7]"
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filters
      </button>
    </div>
  );
}

function MetaCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#ececec] bg-white p-3">
      <div className="flex items-center gap-2 text-xs text-[#656565]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#ececec] bg-white p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf8f0]">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[#656565]">
          {label}
        </p>

        <p className="truncate text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}