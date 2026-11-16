import type { Locale } from "@/content/i18n";

/** Text in both site languages. */
export type Localized<T = string> = Record<Locale, T>;
