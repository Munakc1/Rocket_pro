import en from "@/locales/en.json";
import ne from "@/locales/ne.json";

// how this works: a tiny, dependency-free translator. Locale files live in locales/,
// keys are flat strings, and {vars} are interpolated. A missing key falls back to
// English, then to the key itself. Lint the files with `npm run i18n:check`.
export const locales = ["en", "ne"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dicts: Record<Locale, Record<string, string>> = {
  en: en as Record<string, string>,
  ne: ne as Record<string, string>,
};

export function translate(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const table = dicts[locale] ?? dicts[defaultLocale];
  let str = table[key] ?? dicts[defaultLocale][key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) str = str.split("{" + k + "}").join(String(v));
  return str;
}
