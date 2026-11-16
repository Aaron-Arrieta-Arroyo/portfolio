import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { nextProject, type Project } from "@/content/projects";
import { fmt, getDictionary, localeBase, type Locale } from "@/content/i18n";

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-border py-12 md:grid-cols-12 md:gap-6 md:py-16">
      <Reveal className="md:col-span-4">
        <h2 className="label-mono flex items-center gap-3 font-normal text-muted">
          <span className="text-accent">{String(n).padStart(2, "0")}</span>
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.06} className="md:col-span-8">
        {children}
      </Reveal>
    </section>
  );
}

export function CaseStudy({ project, locale }: { project: Project; locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.projects;
  const base = localeBase(locale);
  const next = nextProject(project.slug);

  const meta = [
    { label: t.role, value: project.role[locale] },
    { label: t.team, value: project.team ? fmt(t.teamOf, project.team) : t.solo },
    { label: t.year, value: project.status ? `${project.year} · ${project.status[locale]}` : project.year },
  ];

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <div className="container-site">
        <Reveal>
          <Link
            href={`${base}/#projects`}
            className="label-mono inline-flex items-center gap-2 text-muted transition-colors duration-[180ms] hover:text-accent"
          >
            <span aria-hidden>←</span> {t.back}
          </Link>
        </Reveal>

        {/* Not wrapped in Reveal: it is a View Transition target and must be visible on arrival. */}
        <h1 className="mt-10 text-[3rem] leading-[0.95] md:text-[4rem] lg:text-[6rem]">
          <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
            <span className="inline-block">{project.title}</span>
          </ViewTransition>
          <span className="text-accent">.</span>
        </h1>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[40ch] text-xl leading-snug tracking-[-0.02em] text-muted md:text-[1.75rem]">
            {project.summary[locale]}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <dl
            className={`mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border ${
              meta.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
            }`}
          >
            {meta.map((m, i) => (
              <div
                key={m.label}
                className={`bg-surface p-5 ${meta.length % 2 === 1 && i === meta.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <dt className="label-mono text-muted">{m.label}</dt>
                <dd className="mt-3 leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.24} className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5" aria-label={t.stack}>
            {project.stack.map((s) => (
              <li key={s} className="label-mono rounded-full border border-border px-3 py-2 text-muted">
                {s}
              </li>
            ))}
          </ul>
          {project.links.length > 0 && (
            <ul className="flex flex-wrap gap-5" aria-label={t.links}>
              {project.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label-mono text-muted transition-colors duration-[180ms] hover:text-accent"
                  >
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* Only real screenshots get the big hero image; typographic covers stay on cards. */}
        {project.cover && (
          <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
            <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-card border border-border bg-surface">
              <ProjectCover project={project} locale={locale} sizes="(min-width: 1200px) 1152px, 100vw" priority />
            </div>
          </ViewTransition>
        )}

        <div className="mt-16">
          <Block n={1} title={t.problem}>
            <p className="max-w-[60ch] text-lg leading-relaxed text-text md:text-xl">{project.problem[locale]}</p>
          </Block>

          <Block n={2} title={t.contribution}>
            <ul className="max-w-[64ch] space-y-3.5">
              {project.contribution[locale].map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  <span className="text-text">{c}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block n={3} title={t.architecture}>
            <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
              {project.architecture.map((layer, i) => (
                <li key={layer.name} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
                  <div className="flex-1 rounded-card border border-border bg-surface p-5">
                    <p className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-3 font-medium">{layer.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{layer.detail[locale]}</p>
                  </div>
                  {i < project.architecture.length - 1 && (
                    <span aria-hidden className="self-center font-mono text-subtle">
                      <span className="md:hidden">↓</span>
                      <span className="hidden md:inline">→</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Block>

          {project.gallery && project.gallery.length > 0 && (
            <div className="grid gap-6 border-t border-border py-12 md:grid-cols-2 md:py-16">
              {project.gallery.map((img) => (
                <Reveal
                  key={img.src}
                  className={`relative overflow-hidden rounded-card border border-border bg-surface ${
                    img.kind === "desktop" ? "aspect-[1503/764] md:col-span-2" : "mx-auto aspect-[460/955] w-full max-w-[340px]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt[locale]}
                    fill
                    sizes={img.kind === "desktop" ? "(min-width: 1200px) 1152px, 100vw" : "340px"}
                    className="object-cover"
                  />
                </Reveal>
              ))}
            </div>
          )}

          <Block n={4} title={t.learnings}>
            <p className="max-w-[60ch] text-lg leading-relaxed text-text md:text-xl">{project.learnings[locale]}</p>
          </Block>
        </div>

        <Reveal>
          <Link
            href={`${base}/projects/${next.slug}`}
            className="group mt-8 grid gap-6 rounded-card border border-border bg-surface p-6 transition-colors duration-[350ms] ease-soft hover:border-accent md:grid-cols-12 md:items-center md:p-8"
          >
            <div className="md:col-span-5">
              <p className="label-mono text-muted">{t.next}</p>
              <p className="mt-4 flex items-center gap-4 text-[2rem] font-semibold leading-none tracking-[-0.04em] md:text-[2.75rem]">
                {next.title}
                <span aria-hidden className="text-accent transition-transform duration-[350ms] ease-soft group-hover:translate-x-2">
                  →
                </span>
              </p>
              <p className="mt-4 leading-relaxed text-muted">{next.summary[locale]}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-border md:col-span-7">
              <div className="absolute inset-0 transition-transform duration-[700ms] ease-soft group-hover:scale-[1.03]">
                <ProjectCover project={next} locale={locale} sizes="(min-width: 1024px) 660px, 100vw" />
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
