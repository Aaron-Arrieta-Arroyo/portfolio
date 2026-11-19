import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import type { Block, Note } from "@/content/notes";
import { notes } from "@/content/notes";
import { fmt, getDictionary, localeBase, type Locale } from "@/content/i18n";

/** Inline markup: `code` and **bold**. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") ? (
          <code key={i} className="rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.88em] text-[#ffe7cf]">
            {part.slice(1, -1)}
          </code>
        ) : part.startsWith("**") ? (
          <strong key={i} className="font-medium text-text">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  if ("h" in block)
    return <h2 className="mt-14 text-2xl leading-tight tracking-[-0.03em] text-text md:text-3xl">{block.h}</h2>;
  if ("p" in block)
    return (
      <p className="mt-5 text-lg leading-[1.75] text-[#c9c9c9]">
        <Inline text={block.p} />
      </p>
    );
  if ("ul" in block || "ol" in block) {
    const items = "ul" in block ? block.ul : block.ol;
    return (
      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4 text-lg leading-relaxed text-[#c9c9c9]">
            <span aria-hidden className="mt-[0.15em] w-6 shrink-0 font-mono text-sm text-accent">
              {"ol" in block ? String(i + 1).padStart(2, "0") : "↳"}
            </span>
            <span>
              <Inline text={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if ("code" in block)
    return (
      <figure className="glass-card mt-6 overflow-hidden rounded-card">
        {block.lang && (
          <figcaption className="label-mono border-b border-white/10 px-5 py-2.5 text-subtle">{block.lang}</figcaption>
        )}
        <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-[#e6e6e6]">
          <code>{block.code}</code>
        </pre>
      </figure>
    );
  return (
    <blockquote className="mt-6 border-l-2 border-accent pl-5 text-xl leading-relaxed text-text">
      <Inline text={block.quote} />
    </blockquote>
  );
}

export function NotePage({ note, locale }: { note: Note; locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.notes;
  const base = localeBase(locale);
  const others = notes.filter((n) => n.slug !== note.slug);
  const date = new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(note.date));

  return (
    <article className="container-site pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[44rem]">
        <Reveal>
          <Link href={`${base}/#notes`} className="label-mono text-muted transition-colors duration-[180ms] hover:text-accent">
            ← {t.back}
          </Link>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="label-mono mt-10 flex flex-wrap items-center gap-3 text-muted">
            <span className="text-accent">●</span>
            {date}
            <span aria-hidden className="text-subtle">·</span>
            {fmt(t.minutes, note.minutes)}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 text-4xl leading-[1.05] tracking-[-0.045em] text-text md:text-6xl">{note.title[locale]}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-xl leading-snug text-muted md:text-2xl">{note.summary[locale]}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <li key={tag} className="label-mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-muted">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10 border-t border-border pt-4">
          {note.body[locale].map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        <footer className="mt-20 border-t border-border pt-10">
          <p className="label-mono text-muted">{t.more}</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {others.map((n) => (
              <li key={n.slug}>
                <Link href={`${base}/notes/${n.slug}`} data-spotlight className="glass-card group flex h-full flex-col rounded-card p-5">
                  <span className="text-lg leading-snug text-text transition-colors duration-[180ms] group-hover:text-accent">
                    {n.title[locale]}
                  </span>
                  <span className="label-mono mt-4 text-subtle">{fmt(t.minutes, n.minutes)} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </article>
  );
}
