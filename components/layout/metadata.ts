import type { Metadata, Viewport } from "next";
import { profile } from "@/content/profile";
import { getDictionary, localeBase, type Locale } from "@/content/i18n";

/** Main public domain (Vercel → Settings → Domains). */
const productionUrl = "https://aaron-arrieta.vercel.app";

/** Public URL: NEXT_PUBLIC_SITE_URL, else the production domain on Vercel, else the preview URL, else localhost. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? productionUrl
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const viewport: Viewport = { themeColor: "#0A0A0A", colorScheme: "dark" };

export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s — ${profile.name}` },
    description: dict.meta.description,
    applicationName: profile.fullName,
    authors: [{ name: profile.fullName, url: profile.links.github }],
    creator: profile.fullName,
    keywords: ["Software Developer", "Backend", "Drupal", ".NET", "Laravel", "Kotlin", "Next.js", "Costa Rica"],
    alternates: {
      canonical: `${localeBase(locale)}/`,
      languages: { es: "/", en: "/en" },
    },
    openGraph: {
      type: "profile",
      firstName: "Aarón",
      lastName: "Arrieta Arroyo",
      siteName: profile.fullName,
      locale: locale === "es" ? "es_CR" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CR"],
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${localeBase(locale)}/`,
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description },
    robots: { index: true, follow: true },
  };
}

/** schema.org Person, rendered as JSON-LD in every page. */
export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: "Software Developer",
    description: getDictionary(locale).meta.description,
    url: `${siteUrl}${localeBase(locale)}/`,
    image: `${siteUrl}${profile.images.avatar}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressCountry: "CR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Costa Rica" },
    knowsAbout: ["Drupal", ".NET", "Laravel", "Kotlin", "Android", "Next.js", "REST APIs", "PostgreSQL"],
    knowsLanguage: ["es", "en"],
    sameAs: [profile.links.github, profile.links.linkedin],
  };
}
