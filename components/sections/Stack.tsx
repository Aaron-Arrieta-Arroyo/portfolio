import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { softSkills } from "@/content/softSkills";
import { stack } from "@/content/stack";
import type { Dictionary, Locale } from "@/content/i18n";

export function Stack({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="stack" label={dict.sections.stack}>
      <Reveal>
        <p className="mt-8 max-w-[48ch] text-xl tracking-[-0.02em] text-muted md:text-[1.75rem] md:leading-[1.35]">
          {dict.stack.intro}
        </p>
      </Reveal>
      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, i) => (
          <Reveal key={group.id} delay={0.06 * i} className="bg-surface p-6">
            <h3 className="label-mono font-normal text-muted">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> &nbsp;{group.title[locale]}
            </h3>
            <ul className="mt-6 space-y-1">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 text-muted transition-colors duration-[180ms] hover:bg-surface-2 hover:text-text"
                >
                  <span className="transition-colors duration-[180ms] group-hover:text-accent">
                    <TechIcon tech={tech} className="size-[18px]" />
                  </span>
                  <span className="text-sm">{tech.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="label-mono flex items-center gap-3 font-normal text-muted">
          <span className="text-accent">05</span>
          {dict.stack.softTitle}
        </h3>
      </Reveal>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {softSkills.map((skill, i) => (
          <Reveal as="li" key={skill.label.en} delay={0.06 * i} className="group bg-surface p-6 transition-colors duration-[180ms] hover:bg-surface-2">
            <p className="flex items-center gap-3 font-medium">
              <span aria-hidden className="size-1.5 rounded-full bg-subtle transition-colors duration-[180ms] group-hover:bg-accent" />
              {skill.label[locale]}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{skill.detail[locale]}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
