import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { getProject, projects } from "@/content/projects";
import { localeBase, type Locale } from "@/content/i18n";

type Params = Promise<{ slug: string }>;

/** Shared route helpers for /projects/[slug] and /en/projects/[slug]. */
export function projectRoute(locale: Locale) {
  return {
    generateStaticParams: () => projects.map((p) => ({ slug: p.slug })),

    async generateMetadata({ params }: { params: Params }): Promise<Metadata> {
      const project = getProject((await params).slug);
      if (!project) return {};
      return {
        title: project.title,
        description: project.summary[locale],
        openGraph: {
          type: "article",
          title: `${project.title} — Aarón Arrieta`,
          description: project.summary[locale],
          url: `${localeBase(locale)}/projects/${project.slug}`,
        },
        twitter: { card: "summary_large_image", title: `${project.title} — Aarón Arrieta`, description: project.summary[locale] },
        alternates: {
          canonical: `${localeBase(locale)}/projects/${project.slug}`,
          languages: { es: `/projects/${project.slug}`, en: `/en/projects/${project.slug}` },
        },
      };
    },

    async Page({ params }: { params: Params }) {
      const project = getProject((await params).slug);
      if (!project) notFound();
      return <CaseStudy project={project} locale={locale} />;
    },
  };
}
