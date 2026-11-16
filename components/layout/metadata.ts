import type { Metadata, Viewport } from "next";
import { profile } from "@/content/profile";
import { getDictionary, type Locale } from "@/content/i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const viewport: Viewport = { themeColor: "#0A0A0A", colorScheme: "dark" };

export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s — ${profile.name}` },
    description: dict.meta.description,
    authors: [{ name: profile.fullName, url: profile.links.github }],
    alternates: { languages: { es: "/", en: "/en" } },
  };
}
