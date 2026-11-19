import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { notes } from "@/content/notes";
import { fmt, localeBase, type Dictionary, type Locale } from "@/content/i18n";

/** Home section listing the articles. */
export function Notes({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.notes;
  return (
    <Section id="notes" label={dict.sections.notes}>
      <Reveal className="mt-10 max-w-2xl">
        <p className="text-xl leading-snug text-muted md:text-2xl">{t.intro}</p>
      </Reveal>
      <ul className="mt-12 grid gap-3 md:grid-cols-3">
        {notes.map((n, i) => (
          <Reveal key={n.slug} as="li" delay={0.08 * i} className="h-full">
            <Link
              href={`${localeBase(locale)}/notes/${n.slug}`}
              data-spotlight
              className="glass-card group flex h-full flex-col rounded-card p-6"
            >
              <span className="label-mono flex items-center gap-2 text-subtle">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                {fmt(t.minutes, n.minutes)}
              </span>
              <h3 className="mt-5 text-xl leading-snug tracking-[-0.02em] text-text transition-colors duration-[180ms] group-hover:text-accent">
                {n.title[locale]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{n.summary[locale]}</p>
              <span className="label-mono mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 text-subtle">
                {n.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
