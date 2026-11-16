import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { now } from "@/content/now";
import type { Dictionary, Locale } from "@/content/i18n";

export function Now({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="now" label={dict.sections.now}>
      <Reveal className="mt-10">
        <figure className="overflow-hidden rounded-card border border-border bg-surface">
          <figcaption className="flex items-center gap-2 border-b border-border px-5 py-3.5">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-surface-2 ring-1 ring-border" />
              <span className="size-2.5 rounded-full bg-surface-2 ring-1 ring-border" />
              <span className="size-2.5 rounded-full bg-accent/80" />
            </span>
            <span className="label-mono ml-3 text-muted">
              aaron@costa-rica: {dict.now.title}
            </span>
          </figcaption>
          <div className="p-5 font-mono text-sm leading-relaxed md:p-8 md:text-base">
            <dl className="space-y-3">
              {now.map((line, i) => (
                <Reveal
                  key={line.key}
                  delay={0.15 + i * 0.12}
                  className="flex flex-wrap gap-x-4"
                >
                  <dt className="w-32 shrink-0 whitespace-nowrap text-muted">
                    <span aria-hidden className="text-accent">
                      &gt;{" "}
                    </span>
                    {line.key}
                  </dt>
                  <dd className="text-text">{line.value[locale]}</dd>
                </Reveal>
              ))}
            </dl>
            <div aria-hidden className="pt-4 text-muted">
              <span className="text-accent">&gt; </span>
              <span className="blink inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-text" />
            </div>
          </div>
        </figure>
      </Reveal>
    </Section>
  );
}
