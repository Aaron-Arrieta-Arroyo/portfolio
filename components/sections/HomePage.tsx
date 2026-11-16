import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { sections } from "@/content/profile";
import { getDictionary, type Locale } from "@/content/i18n";
import { Hero } from "./Hero";

/** Home (one-page). Section bodies land in phases 3–4. */
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />

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
