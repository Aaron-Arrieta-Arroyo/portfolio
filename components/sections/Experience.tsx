"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { experience } from "@/content/experience";
import { courses, coursesIssuer } from "@/content/courses";
import type { Dictionary, Locale } from "@/content/i18n";

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="experience" label={dict.sections.experience}>
      <ol ref={ref} className="relative mt-12">
        {/* Track + line drawn with scroll */}
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-border" />
        <m.span
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent"
          style={{ scaleY: reduce ? 1 : progress }}
        />

        {experience.map((item, i) => (
          <li key={item.role.en} className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-12 md:gap-6">
            <span
              aria-hidden
              className={`absolute left-0 top-1.5 size-[11px] rounded-full border ${
                item.kind === "work" ? "border-accent bg-accent" : "border-accent bg-bg"
              }`}
            />
            <Reveal delay={0.06 * i} className="md:col-span-3">
              <p className="label-mono leading-relaxed text-muted">
                <span className="text-text">{item.period[locale]}</span>
                <br />
                {item.kind === "work" ? dict.experience.work : dict.experience.education}
                {item.mode && <> · {item.mode[locale]}</>}
              </p>
            </Reveal>
            <Reveal delay={0.06 * i + 0.06} className="md:col-span-9">
              <h3 className="text-xl md:text-[1.75rem] md:leading-tight">{item.role[locale]}</h3>
              <p className="mt-1 text-muted">{item.place[locale]}</p>
              <ul className="mt-5 max-w-[70ch] space-y-2.5">
                {item.highlights[locale].map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-subtle" />
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                {item.tags.map((tag) => (
                  <li key={tag} className="label-mono rounded-full border border-border bg-surface px-3 py-2 text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mt-20">
        <Reveal>
          <p className="label-mono flex items-center gap-3 text-muted">
            <span className="text-accent">+</span>
            {dict.experience.courses} · <span className="text-text">{coursesIssuer}</span>
          </p>
        </Reveal>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <Reveal
              key={course.title}
              as="li"
              delay={0.05 * i}
              className="group flex flex-col gap-3 bg-surface p-6 transition-colors duration-[180ms] hover:bg-surface-2"
              data-spotlight
            >
              <span className="label-mono flex items-center gap-2 text-accent">
                <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 fill-none stroke-current" strokeWidth="1.6">
                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {locale === "es" ? "Completado" : "Complete"}
              </span>
              <h3 className="text-lg leading-snug text-text">{course.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{course.detail[locale]}</p>
            </Reveal>
          ))}
          <li aria-hidden className="hidden bg-surface sm:block" />
        </ul>
      </div>
    </Section>
  );
}
