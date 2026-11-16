import { TechIcon } from "@/components/ui/TechIcon";
import { marquee } from "@/content/stack";

/** Slow, monochrome stack strip under the hero. Pauses on hover; static with reduced motion. */
export function Marquee({ label }: { label: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
      {marquee.map((tech) => (
        <li key={tech.name} className="flex items-center gap-3 whitespace-nowrap text-muted transition-colors duration-[180ms] hover:text-text">
          <TechIcon tech={tech} className="size-[18px]" />
          <span className="label-mono">{tech.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      className="relative overflow-hidden border-t border-border py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
