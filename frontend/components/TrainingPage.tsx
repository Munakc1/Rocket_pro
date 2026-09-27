// "use client";

// import {
// ArrowRight,
// BookOpen,
// CheckCircle2,
// Clock3,
// GraduationCap,
// PlayCircle,
// Search,
// TrendingUp,
// X,
// } from "lucide-react";
// import { useMemo, useState } from "react";
// import type { TrainingCourse } from "@/lib/api/training";

// type Props = {
// initialCourses: TrainingCourse[];
// };

// type LevelFilter = "All" | TrainingCourse["level"];

// function formatProgress(progress: number) {
// return Math.min(100, Math.max(0, progress));
// }

// function CourseCard({
// course,
// onOpen,
// }: {
// course: TrainingCourse;
// onOpen: (course: TrainingCourse) => void;
// }) {
// const progress = formatProgress(course.progress);
// const completed = progress === 100;

// return ( <article className="group flex h-full flex-col rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#01c45a]"> <div className="mb-5 flex items-start justify-between gap-3"> <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dcffec] text-[#0aa852]"> <BookOpen className="h-5 w-5" /> </div>

// ```
//     {course.featured && (
//       <span className="rounded-full bg-[#dcffec] px-3 py-1 text-xs font-semibold text-[#0aa852]">
//         Featured
//       </span>
//     )}
//   </div>

//   <div className="mb-3">
//     <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#656565]">
//       {course.category}
//     </p>

//     <h3 className="text-lg font-bold text-[#000]">{course.title}</h3>
//   </div>

//   <p className="min-h-[72px] text-sm leading-6 text-[#656565]">
//     {course.description}
//   </p>

//   <div className="mt-5 flex flex-wrap gap-2">
//     <span className="rounded-full border border-[#d5d5d5] bg-[#e8f3e8] px-2.5 py-1 text-xs font-medium text-[#000]">
//       {course.level}
//     </span>

//     <span className="inline-flex items-center gap-1 rounded-full border border-[#d5d5d5] bg-[#e8f3e8] px-2.5 py-1 text-xs text-[#656565]">
//       <BookOpen className="h-3.5 w-3.5" />
//       {course.lessons} lessons
//     </span>

//     <span className="inline-flex items-center gap-1 rounded-full border border-[#d5d5d5] bg-[#e8f3e8] px-2.5 py-1 text-xs text-[#656565]">
//       <Clock3 className="h-3.5 w-3.5" />
//       {course.duration}
//     </span>
//   </div>

//   <div className="mt-auto pt-6">
//     <div className="mb-2 flex items-center justify-between text-xs">
//       <span className="font-medium text-[#656565]">Progress</span>

//       <span className="font-semibold text-[#000]">
//         {progress}%
//       </span>
//     </div>

//     <div className="h-2 overflow-hidden rounded-full bg-[#e8f3e8]">
//       <div
//         className="h-full rounded-full bg-[#0aa852] transition-all"
//         style={{ width: `${progress}%` }}
//       />
//     </div>

//     <button
//       type="button"
//       onClick={() => onOpen(course)}
//       className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#01c45a] bg-[#0aa852] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01c45a]"
//     >
//       {completed ? "Review Course" : progress > 0 ? "Continue Learning" : "Start Learning"}
//       <ArrowRight className="h-4 w-4" />
//     </button>
//   </div>
// </article>
// ```

// );
// }

// function CourseModal({
// course,
// onClose,
// }: {
// course: TrainingCourse;
// onClose: () => void;
// }) {
// return ( <div
//    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4"
//    onMouseDown={onClose}
//  >
// <div
// className="w-full max-w-2xl rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] shadow-xl"
// onMouseDown={(event) => event.stopPropagation()}
// > <div className="flex items-start justify-between border-b border-[#d5d5d5] p-6"> <div> <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0aa852]">
// {course.category} </p>

// ```
//         <h2 className="text-2xl font-bold text-[#000]">
//           {course.title}
//         </h2>
//       </div>

//       <button
//         type="button"
//         onClick={onClose}
//         aria-label="Close"
//         className="rounded-lg p-2 text-[#656565] transition hover:bg-[#e8f3e8] hover:text-[#000]"
//       >
//         <X className="h-5 w-5" />
//       </button>
//     </div>

//     <div className="space-y-6 p-6">
//       <p className="leading-7 text-[#656565]">
//         {course.description}
//       </p>

//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//         <div className="rounded-xl border border-[#d5d5d5] bg-[#e8f3e8] p-4">
//           <p className="text-xs text-[#656565]">Level</p>
//           <p className="mt-1 font-semibold text-[#000]">
//             {course.level}
//           </p>
//         </div>

//         <div className="rounded-xl border border-[#d5d5d5] bg-[#e8f3e8] p-4">
//           <p className="text-xs text-[#656565]">Lessons</p>
//           <p className="mt-1 font-semibold text-[#000]">
//             {course.lessons}
//           </p>
//         </div>

//         <div className="rounded-xl border border-[#d5d5d5] bg-[#e8f3e8] p-4">
//           <p className="text-xs text-[#656565]">Duration</p>
//           <p className="mt-1 font-semibold text-[#000]">
//             {course.duration}
//           </p>
//         </div>
//       </div>

//       <div className="rounded-xl border border-[#d5d5d5] bg-[#f1f9f4] p-5">
//         <div className="flex items-start gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dcffec] text-[#0aa852]">
//             <PlayCircle className="h-5 w-5" />
//           </div>

//           <div>
//             <h3 className="font-semibold text-[#000]">
//               Training module
//             </h3>

//             <p className="mt-1 text-sm leading-6 text-[#656565]">
//               This course is ready to connect with Rocket Pro's
//               lesson content and training backend.
//             </p>
//           </div>
//         </div>
//       </div>

//       <button
//         type="button"
//         onClick={onClose}
//         className="w-full rounded-xl bg-[#0aa852] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#01c45a]"
//       >
//         Continue
//       </button>
//     </div>
//   </div>
// </div>
// ```

// );
// }

// function SummaryCard({
// icon,
// label,
// value,
// }: {
// icon: React.ReactNode;
// label: string;
// value: string | number;
// }) {
// return ( <div className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-5 shadow-sm"> <div className="flex items-center gap-3"> <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dcffec] text-[#0aa852]">
// {icon} </div>

// ```
//     <div>
//       <p className="text-xs font-medium text-[#656565]">{label}</p>
//       <p className="mt-1 text-2xl font-bold text-[#000]">{value}</p>
//     </div>
//   </div>
// </div>
// ```

// );
// }

// export default function TrainingPage({ initialCourses }: Props) {
// const [courses] = useState(initialCourses);
// const [search, setSearch] = useState("");
// const [level, setLevel] = useState<LevelFilter>("All");
// const [selectedCourse, setSelectedCourse] =
// useState<TrainingCourse | null>(null);

// const levels: LevelFilter[] = [
// "All",
// "Beginner",
// "Intermediate",
// "Advanced",
// ];

// const filteredCourses = useMemo(() => {
// const query = search.trim().toLowerCase();

// ```
// return courses.filter((course) => {
//   const matchesSearch =
//     !query ||
//     course.title.toLowerCase().includes(query) ||
//     course.description.toLowerCase().includes(query) ||
//     course.category.toLowerCase().includes(query);

//   const matchesLevel =
//     level === "All" || course.level === level;

//   return matchesSearch && matchesLevel;
// });
// ```

// }, [courses, search, level]);

// const completedCourses = courses.filter(
// (course) => course.progress === 100,
// ).length;

// const inProgressCourses = courses.filter(
// (course) => course.progress > 0 && course.progress < 100,
// ).length;

// const totalLessons = courses.reduce(
// (total, course) => total + course.lessons,
// 0,
// );

// const averageProgress =
// courses.length > 0
// ? Math.round(
// courses.reduce((total, course) => total + course.progress, 0) /
// courses.length,
// )
// : 0;

// return (
// <> <div className="min-h-full bg-[#d4efde]"> <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
// {/* Page Header */} <section className="mb-6"> <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"> <div> <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0aa852]"> <GraduationCap className="h-4 w-4" /> <span>Rocket Pro Training</span> </div>

// ```
//             <h1 className="text-3xl font-bold tracking-tight text-[#000] sm:text-4xl">
//               Learn the Market
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-[#656565] sm:text-base">
//               Build your understanding of NEPSE, stock analysis,
//               technical indicators, trading, and portfolio management.
//             </p>
//           </div>

//           <div className="flex items-center gap-2 rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] px-4 py-3">
//             <TrendingUp className="h-5 w-5 text-[#0aa852]" />

//             <div>
//               <p className="text-xs text-[#656565]">
//                 Your average progress
//               </p>
//               <p className="font-bold text-[#000]">
//                 {averageProgress}%
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Summary */}
//       <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <SummaryCard
//           icon={<BookOpen className="h-5 w-5" />}
//           label="Available Courses"
//           value={courses.length}
//         />

//         <SummaryCard
//           icon={<PlayCircle className="h-5 w-5" />}
//           label="In Progress"
//           value={inProgressCourses}
//         />

//         <SummaryCard
//           icon={<CheckCircle2 className="h-5 w-5" />}
//           label="Completed"
//           value={completedCourses}
//         />

//         <SummaryCard
//           icon={<GraduationCap className="h-5 w-5" />}
//           label="Total Lessons"
//           value={totalLessons}
//         />
//       </section>

//       {/* Search / Filters */}
//       <section className="mb-6 rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] p-4 shadow-sm">
//         <div className="flex flex-col gap-3 lg:flex-row">
//           <div className="relative flex-1">
//             <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#656565]" />

//             <input
//               type="search"
//               value={search}
//               onChange={(event) => setSearch(event.target.value)}
//               placeholder="Search training courses..."
//               className="h-11 w-full rounded-xl border border-[#d5d5d5] bg-[#fbfbfb] pl-10 pr-4 text-sm text-[#000] outline-none transition placeholder:text-[#656565] focus:border-[#01c45a]"
//             />
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {levels.map((item) => {
//               const active = level === item;

//               return (
//                 <button
//                   key={item}
//                   type="button"
//                   onClick={() => setLevel(item)}
//                   className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
//                     active
//                       ? "border-[#0aa852] bg-[#0aa852] text-white"
//                       : "border-[#d5d5d5] bg-[#fbfbfb] text-[#656565] hover:border-[#01c45a] hover:text-[#000]"
//                   }`}
//                 >
//                   {item}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Course Grid */}
//       {filteredCourses.length > 0 ? (
//         <section>
//           <div className="mb-4 flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-bold text-[#000]">
//                 Training Courses
//               </h2>

//               <p className="mt-1 text-sm text-[#656565]">
//                 {filteredCourses.length} course
//                 {filteredCourses.length !== 1 ? "s" : ""} available
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//             {filteredCourses.map((course) => (
//               <CourseCard
//                 key={course.id}
//                 course={course}
//                 onOpen={setSelectedCourse}
//               />
//             ))}
//           </div>
//         </section>
//       ) : (
//         <section className="rounded-2xl border border-[#d5d5d5] bg-[#fbfbfb] px-6 py-16 text-center shadow-sm">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dcffec] text-[#0aa852]">
//             <Search className="h-6 w-6" />
//           </div>

//           <h2 className="mt-4 text-xl font-bold text-[#000]">
//             No training courses found
//           </h2>

//           <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#656565]">
//             Try a different search term or change the training level
//             filter.
//           </p>

//           <button
//             type="button"
//             onClick={() => {
//               setSearch("");
//               setLevel("All");
//             }}
//             className="mt-5 rounded-xl bg-[#0aa852] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01c45a]"
//           >
//             Clear Filters
//           </button>
//         </section>
//       )}

//       {/* Disclaimer */}
//       <section className="mt-6 rounded-2xl border border-[#d5d5d5] bg-[#f1f9f4] p-4">
//         <p className="text-xs leading-5 text-[#656565]">
//           <span className="font-semibold text-[#000]">
//             Educational content:
//           </span>{" "}
//           Rocket Pro training is intended to help users understand
//           financial markets and investment concepts. Educational
//           material does not constitute personalized investment advice
//           or a recommendation to buy or sell securities.
//         </p>
//       </section>
//     </div>
//   </div>

//   {selectedCourse && (
//     <CourseModal
//       course={selectedCourse}
//       onClose={() => setSelectedCourse(null)}
//     />
//   )}
// </>
// ```

// );
// }


