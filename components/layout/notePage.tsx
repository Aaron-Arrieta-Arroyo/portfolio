import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotePage } from "@/components/sections/NotePage";
import { getNote, notes } from "@/content/notes";
import { localeBase, type Locale } from "@/content/i18n";

type Params = Promise<{ slug: string }>;

/** Shared route helpers for /notes/[slug] and /en/notes/[slug]. */
export function noteRoute(locale: Locale) {
  return {
    generateStaticParams: () => notes.map((n) => ({ slug: n.slug })),

    async generateMetadata({ params }: { params: Params }): Promise<Metadata> {
      const note = getNote((await params).slug);
      if (!note) return {};
      const url = `${localeBase(locale)}/notes/${note.slug}`;
      return {
        title: note.title[locale],
        description: note.summary[locale],
        openGraph: { type: "article", title: note.title[locale], description: note.summary[locale], url, publishedTime: note.date },
        twitter: { card: "summary_large_image", title: note.title[locale], description: note.summary[locale] },
        alternates: { canonical: url, languages: { es: `/notes/${note.slug}`, en: `/en/notes/${note.slug}` } },
      };
    },

    async Page({ params }: { params: Params }) {
      const note = getNote((await params).slug);
      if (!note) notFound();
      return <NotePage note={note} locale={locale} />;
    },
  };
}
