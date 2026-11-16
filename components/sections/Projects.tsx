"use client";

import { useState, ViewTransition } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "motion/react";
import { EASE } from "@/components/motion/Providers";
import { Tilt } from "@/components/motion/Tilt";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { projects, projectTags, type Project, type ProjectTag } from "@/content/projects";
import { fmt, localeBase, type Dictionary, type Locale } from "@/content/i18n";

type Filter = "all" | ProjectTag;

function ProjectCard({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  const big = project.featured;
  return (
    <Tilt className="h-full">
      <Link
        href={`${localeBase(locale)}/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors duration-[350ms] ease-soft hover:border-accent"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg">
          {/* Shared element: morphs into the case-study hero on navigation (View Transitions). */}
          <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
            <div className="absolute inset-0 transition-transform duration-[700ms] ease-soft group-hover:scale-[1.03]">
              <ProjectCover
                project={project}
                locale={locale}
                sizes={big ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
              />
            </div>
          </ViewTransition>
          {big && (
            <span className="label-mono absolute left-4 top-4 rounded-full border border-border bg-bg/80 px-3 py-2 text-text backdrop-blur">
              {dict.projects.featured}
            </span>
          )}
          {project.status && (
            <span className="label-mono absolute right-4 top-4 rounded-full border border-border bg-bg/80 px-3 py-2 text-accent backdrop-blur">
              {project.status[locale]}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <p className="label-mono flex flex-wrap gap-x-3 gap-y-1 text-muted">
            <span className="text-text">{project.year}</span>
            <span aria-hidden className="text-subtle">/</span>
            <span>{project.role[locale]}</span>
          </p>
          <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
            <h3 className={`w-fit ${big ? "text-xl md:text-[1.75rem] md:leading-tight" : "text-xl"}`}>{project.title}</h3>
          </ViewTransition>
          <p className="leading-relaxed text-muted">{project.summary[locale]}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-2">
            <ul className="flex flex-wrap gap-1.5" aria-label={dict.projects.stack}>
              {project.stack.slice(0, big ? 6 : 3).map((s) => (
                <li key={s} className="label-mono rounded-full border border-border px-2.5 py-1.5 text-muted">
                  {s}
                </li>
              ))}
            </ul>
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted transition-all duration-[350ms] ease-soft group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}

export function ProjectsGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects.filter((p) => filter === "all" || p.tags.includes(filter));
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: dict.projects.all },
    ...projectTags.map((t) => ({ id: t, label: t })),
  ];

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={dict.projects.filterLabel} className="flex flex-wrap gap-1.5">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`relative rounded-full border px-4 py-2 text-sm transition-colors duration-[180ms] ${
                  active ? "border-text text-bg" : "border-border text-muted hover:text-text"
                }`}
              >
                {active && (
                  <m.span
                    layoutId="project-filter"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-text"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>
        <p className="label-mono text-muted" aria-live="polite">
          {fmt(visible.length === 1 ? dict.projects.countOne : dict.projects.countMany, visible.length)}
        </p>
      </div>

      <m.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <m.li
              key={project.slug}
              layout
              className={project.featured && filter === "all" ? "sm:col-span-2" : ""}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ProjectCard project={project} locale={locale} dict={dict} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </>
  );
}
