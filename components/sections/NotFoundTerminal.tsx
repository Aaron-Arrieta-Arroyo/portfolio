import Link from "next/link";
import { CurrentPath } from "@/components/ui/CurrentPath";

type Props = {
  title: string;
  body: string;
  links: { label: string; href: string; primary?: boolean }[];
  /** Second language line, shown on the global 404 where the locale is unknown. */
  alt?: string;
};

/** 404 styled as a terminal: "cd: no such page". */
export function NotFoundTerminal({ title, body, links, alt }: Props) {
  return (
    <section className="flex min-h-svh items-center py-28">
      <div className="container-site max-w-[760px]">
        <p className="label-mono flex items-center gap-3 text-muted">
          <span className="text-accent">404</span>
          <span aria-hidden className="text-subtle">/</span>
          {title}
        </p>

        <figure className="anim-page mt-8 overflow-hidden rounded-card border border-border bg-surface">
          <figcaption className="flex items-center gap-2 border-b border-border px-5 py-3.5">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-surface-2 ring-1 ring-border" />
              <span className="size-2.5 rounded-full bg-surface-2 ring-1 ring-border" />
              <span className="size-2.5 rounded-full bg-accent/80" />
            </span>
            <span className="label-mono ml-3 text-muted">aaron@costa-rica: ~</span>
          </figcaption>
          <div className="space-y-2 p-5 font-mono text-sm leading-relaxed md:p-8 md:text-base">
            <p>
              <span aria-hidden className="text-accent">&gt; </span>
              <span className="text-text">
                cd <CurrentPath />
              </span>
            </p>
            <p className="text-muted">
              cd: no such page: <CurrentPath />
            </p>
            <p className="pt-2">
              <span aria-hidden className="text-accent">&gt; </span>
              <span aria-hidden className="blink inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-text" />
            </p>
          </div>
        </figure>

        <h1 className="mt-10 text-[2.5rem] leading-none md:text-[4rem]">
          {title}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-[48ch] leading-relaxed text-muted">{body}</p>
        {alt && <p className="label-mono mt-3 text-subtle">{alt}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                l.primary
                  ? "inline-flex h-12 items-center gap-2 rounded-full bg-text px-6 text-sm font-medium text-bg transition-colors duration-[180ms] hover:bg-accent"
                  : "inline-flex h-12 items-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-text transition-colors duration-[180ms] hover:border-accent"
              }
            >
              {l.label}
              {l.primary && <span aria-hidden>→</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
