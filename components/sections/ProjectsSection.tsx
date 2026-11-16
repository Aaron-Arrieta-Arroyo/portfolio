import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import type { Dictionary, Locale } from "@/content/i18n";
import { ProjectsGrid } from "./Projects";

export function ProjectsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="projects" label={dict.sections.projects}>
      <Reveal>
        <p className="mt-8 max-w-[48ch] text-xl tracking-[-0.02em] text-muted md:text-[1.75rem] md:leading-[1.35]">
          {dict.projects.intro}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <ProjectsGrid locale={locale} dict={dict} />
      </Reveal>
    </Section>
  );
}
