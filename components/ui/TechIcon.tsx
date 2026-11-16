import type { Tech } from "@/content/stack";

/** Monochrome tech logo (currentColor) or a mono monogram when no logo exists. */
export function TechIcon({ tech, className = "size-5" }: { tech: Tech; className?: string }) {
  if (tech.path) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={`${className} shrink-0 fill-current`}>
        <path d={tech.path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className={`${className} grid shrink-0 place-items-center rounded-[4px] border border-current font-mono text-[9px] font-semibold leading-none`}
    >
      {tech.monogram}
    </span>
  );
}
