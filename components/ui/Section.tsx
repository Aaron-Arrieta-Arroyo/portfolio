import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { sections, type SectionId } from "@/content/profile";

type SectionProps = {
  id: SectionId;
  label: string;
  children?: React.ReactNode;
};

/** Page section with the numbered mono label: "01 / SOBRE MÍ". */
export function Section({ id, label, children }: SectionProps) {
  const number = String(sections.indexOf(id) + 1).padStart(2, "0");

  return (
    <section id={id} aria-labelledby={`${id}-label`} className="border-t border-border py-24 md:py-32">
      <div className="container-site">
        <Reveal>
          <h2 id={`${id}-label`} className="label-mono flex items-center gap-3 font-normal text-muted">
            <span className="text-accent">{number}</span>
            <span aria-hidden className="text-subtle">/</span>
            <Scramble text={label} />
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
