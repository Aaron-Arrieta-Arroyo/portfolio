import es, { type Dictionary } from "./es";
import en from "./en";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** URL prefix for a locale: Spanish lives at "/", English at "/en". */
export function localeBase(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export type { Dictionary };

/** Fill "{n}" in a dictionary string (dictionaries hold only strings so they can reach client components). */
export function fmt(template: string, n: number): string {
  return template.replace("{n}", String(n));
}
