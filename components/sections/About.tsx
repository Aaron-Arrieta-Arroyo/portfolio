import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { WordsReveal } from "@/components/motion/WordsReveal";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/content/i18n";

export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;

  return (
    <Section id="about" label={dict.sections.about}>
      <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">
          <Reveal>
            <WordsReveal runs={about.lead} className="text-xl leading-[1.35] tracking-[-0.02em] text-muted md:text-[1.75rem]" />
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-8 max-w-[60ch] leading-relaxed text-muted">{about.body}</p>
          </Reveal>
        </div>

        <dl className="grid grid-cols-1 gap-px self-start overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
          {about.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.06 * i} className="flex flex-col-reverse gap-2 bg-surface p-6" data-spotlight>
              <dt className="label-mono leading-snug text-muted">{stat.label}</dt>
              <dd className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em]">
                {stat.value !== undefined ? <Counter to={stat.value} suffix={stat.suffix} /> : stat.text}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
