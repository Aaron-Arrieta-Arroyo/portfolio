import Image from "next/image";
import type { Project } from "@/content/projects";
import type { Locale } from "@/content/i18n";

type ProjectCoverProps = {
  project: Project;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** "SafeZone" → "SZ", "Bitácora de Poder y Liderazgo" → "BPL". */
function monogram(title: string) {
  const caps = title.match(/\p{Lu}/gu) ?? [];
  return (caps.length >= 2 ? caps.slice(0, 3).join("") : title.slice(0, 2)).toUpperCase();
}

/** Project image (16:10). Projects without screenshots get a typographic cover in the site style. */
export function ProjectCover({ project, locale, sizes, priority, className = "" }: ProjectCoverProps) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={project.coverAlt?.[locale] ?? project.title}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`absolute inset-0 flex flex-col justify-between overflow-hidden bg-surface p-6 md:p-8 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px), radial-gradient(520px circle at 85% 110%, rgba(233,161,91,0.10), transparent 70%)",
        backgroundSize: "48px 48px, 48px 48px, 100% 100%",
        backgroundPosition: "-1px -1px, -1px -1px, 0 0",
      }}
    >
      <span className="label-mono flex items-center gap-2 text-muted">
        <span className="size-1.5 rounded-full bg-accent" />
        {project.tags.join(" · ")}
      </span>
      <span className="flex items-end gap-1 text-[4.5rem] font-semibold leading-[0.8] tracking-[-0.06em] text-text md:text-[6rem]">
        {monogram(project.title)}
        <span className="text-accent">.</span>
      </span>
      <span className="label-mono text-subtle">{project.stack.slice(0, 4).join("  /  ")}</span>
    </div>
  );
}
