
export type TrainingCourse = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  duration: string;
  progress: number;
  featured?: boolean;
};

const trainingCourses: TrainingCourse[] = [
  {
    id: "nepse-basics",
    title: "NEPSE Basics",
    description:
      "Learn the fundamentals of Nepal's stock market, listed companies, indices, brokers, and basic market terminology.",
    category: "Stock Market Basics",
    level: "Beginner",
    lessons: 8,
    duration: "2h 15m",
    progress: 75,
    featured: true,
  },
  {
    id: "fundamental-analysis",
    title: "Fundamental Analysis",
    description:
      "Understand financial statements, earnings, EPS, P/E, book value, ROE, dividends, and company valuation.",
    category: "Analysis",
    level: "Intermediate",
    lessons: 10,
    duration: "3h 40m",
    progress: 40,
    featured: true,
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis",
    description:
      "Learn charts, trends, support and resistance, moving averages, RSI, MACD, volume, and price action.",
    category: "Technical Analysis",
    level: "Intermediate",
    lessons: 12,
    duration: "4h 20m",
    progress: 25,
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description:
      "Learn position sizing, stop-loss planning, portfolio diversification, risk-reward ratios, and trading discipline.",
    category: "Trading",
    level: "Intermediate",
    lessons: 7,
    duration: "2h 10m",
    progress: 60,
  },
  {
    id: "candlestick-patterns",
    title: "Candlestick Patterns",
    description:
      "Understand common candlestick structures and how traders use them alongside trend and volume information.",
    category: "Technical Analysis",
    level: "Beginner",
    lessons: 9,
    duration: "2h 35m",
    progress: 0,
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description:
      "Learn how to structure, monitor, rebalance, and evaluate a diversified Nepal stock portfolio.",
    category: "Portfolio",
    level: "Advanced",
    lessons: 8,
    duration: "3h 05m",
    progress: 0,
  },
];

export async function getTrainingCourses(): Promise<TrainingCourse[]> {
  return trainingCourses;
}

