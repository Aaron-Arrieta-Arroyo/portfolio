import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { profile, sections } from "@/content/profile";
import { getDictionary, type Locale } from "@/content/i18n";

/** Home (one-page). Phase 1: base layout — section bodies land in phases 2–4. */
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <section id="top" className="flex min-h-dvh items-center pt-24">
        <div className="container-site">
          <Reveal>
            <p className="label-mono inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-2.5 text-muted">
              <span aria-hidden className="pulse-dot size-1.5 rounded-full bg-accent" />
              {dict.hero.status}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-8 text-hero leading-[0.95]">
              <span className="mb-3 block text-lg font-normal tracking-normal text-muted">{dict.hero.greeting}</span>
              {profile.name}
              <span className="text-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-xl leading-snug tracking-[-0.02em] text-muted md:text-2xl">
              <span className="text-text">{dict.hero.role}</span>
              <br />
              {dict.hero.roleSub}
            </p>
          </Reveal>
        </div>
      </section>

      {sections.map((id) => (
        <Section key={id} id={id} label={dict.sections[id]}>
          <Reveal delay={0.06}>
            <p className="mt-8 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{dict.sections[id]}</p>
          </Reveal>
        </Section>
      ))}
    </>
  );
}
