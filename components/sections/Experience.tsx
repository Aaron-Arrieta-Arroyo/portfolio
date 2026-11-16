"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { experience } from "@/content/experience";
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
        <motion.span
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
    </Section>
  );
}
