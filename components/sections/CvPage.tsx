import Link from "next/link";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { softSkills } from "@/content/softSkills";
import { stack } from "@/content/stack";
import { getDictionary, localeBase, type Locale } from "@/content/i18n";
import { PrintButton } from "@/components/ui/PrintButton";

const cvProjects = ["leveluplife", "ciclo-finca-4", "safezone", "drupal-headless"];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-neutral-500">
      <span className="h-px w-4 bg-[#c27a35]" aria-hidden />
      {children}
    </h2>
  );
}

/** Resume: a light "sheet" on screen that prints (and exports to PDF) as-is. */
export function CvPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.cv;
  const base = localeBase(locale);
  const selected = cvProjects.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);

  const contact = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: "linkedin.com/in/aaron-arrieta-arroyo", href: profile.links.linkedin },
    { label: "github.com/Aaron-Arrieta-Arroyo", href: profile.links.github },
  ];

  return (
    <div className="anim-page pb-24 pt-28 print:p-0 md:pt-32">
      <div className="container-site max-w-[900px] print:max-w-none print:p-0">
        <div data-print-hide className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`${base}/`}
            className="label-mono inline-flex items-center gap-2 text-muted transition-colors duration-[180ms] hover:text-accent"
          >
            <span aria-hidden>←</span> {t.back}
          </Link>
          <div className="flex flex-wrap gap-2.5">
            <PrintButton label={t.print} />
            <a
              href={t.file}
              download
              className="inline-flex h-11 items-center gap-2 rounded-full bg-text px-5 text-sm font-medium text-bg transition-colors duration-[180ms] hover:bg-accent"
            >
              {t.download} <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <article className="rounded-card bg-white px-6 py-10 text-[13.5px] leading-relaxed text-neutral-800 sm:px-12 sm:py-14 print:rounded-none print:p-0 print:text-[10.5px] print:leading-[1.5]">
          {/* Header */}
          <header className="flex flex-col gap-5 border-b border-neutral-200 pb-7 sm:flex-row sm:items-end sm:justify-between print:flex-row print:items-end print:justify-between print:pb-4">
            <div>
              <h1 className="text-[2.5rem] font-semibold leading-none print:text-[1.9rem] tracking-[-0.04em] text-neutral-950">
                {profile.fullName}
                <span className="text-[#c27a35]">.</span>
              </h1>
              <p className="mt-3 print:mt-1.5 text-lg tracking-[-0.01em] text-neutral-900 print:mt-2 print:text-[13px]">{t.title}</p>
              <p className="mt-1 text-neutral-500">{t.tagline}</p>
            </div>
            <ul className="space-y-1 font-mono text-[11.5px] text-neutral-600 sm:text-right print:space-y-0.5 print:text-right print:text-[9.5px]">
              <li>{t.location}</li>
              {contact.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="hover:text-[#c27a35]">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <section className="mt-7 print:mt-4 break-inside-avoid">
            <Heading>{t.profile}</Heading>
            <p className="mt-3 print:mt-1.5 text-neutral-700">{t.profileText}</p>
          </section>

          <section className="mt-7 print:mt-4">
            <Heading>{t.experience}</Heading>
            {experience
              .filter((e) => e.kind === "work")
              .map((e) => (
                <div key={e.role.en} className="mt-3 print:mt-1.5 break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-semibold text-neutral-950">
                      {e.role[locale]} · <span className="font-normal text-neutral-600">{e.place[locale]}</span>
                    </p>
                    <p className="font-mono text-[11.5px] text-neutral-500 print:text-[9.5px]">
                      {e.period[locale]}
                      {e.mode && ` · ${e.mode[locale]}`}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {e.highlights[locale].map((h) => (
                      <li key={h} className="flex gap-2.5 text-neutral-700">
                        <span aria-hidden className="mt-[0.65em] h-px w-2.5 shrink-0 bg-neutral-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-mono text-[11px] text-neutral-500 print:text-[9px]">{e.tags.join(" · ")}</p>
                </div>
              ))}
          </section>

          <section className="mt-7 print:mt-4">
            <Heading>{t.projects}</Heading>
            <div className="mt-3 print:mt-1.5 space-y-4 print:space-y-2.5">
              {selected.map((p) => (
                <div key={p.slug} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-semibold text-neutral-950">
                      {p.title} · <span className="font-normal text-neutral-600">{p.role[locale]}</span>
                    </p>
                    <p className="font-mono text-[11.5px] text-neutral-500 print:text-[9.5px]">
                      {p.year}
                      {p.status && ` · ${p.status[locale]}`}
                      {p.prs && ` · ${p.prs} PRs`}
                    </p>
                  </div>
                  <p className="mt-1 text-neutral-700">{p.summary[locale]}</p>
                  <p className="mt-1 font-mono text-[11px] text-neutral-500 print:text-[9px]">{p.stack.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-7 print:mt-4 break-inside-avoid">
            <Heading>{t.education}</Heading>
            {experience
              .filter((e) => e.kind === "education")
              .map((e) => (
                <div key={e.role.en} className="mt-3 print:mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-semibold text-neutral-950">
                    {e.role[locale]} · <span className="font-normal text-neutral-600">{e.place[locale]}</span>
                  </p>
                  <p className="font-mono text-[11.5px] text-neutral-500 print:text-[9.5px]">{e.period[locale]}</p>
                </div>
              ))}
          </section>

          <section className="mt-7 print:mt-4 break-inside-avoid">
            <Heading>{t.skills}</Heading>
            <dl className="mt-3 print:mt-1.5 grid gap-x-8 gap-y-1.5 sm:grid-cols-2 print:grid-cols-2">
              {stack.map((g) => (
                <div key={g.id} className="flex gap-3">
                  <dt className="w-28 shrink-0 font-medium text-neutral-950">{g.title[locale]}</dt>
                  <dd className="text-neutral-700">{g.items.map((i) => i.name).join(", ")}</dd>
                </div>
              ))}
              <div className="flex gap-3 sm:col-span-2 print:col-span-2">
                <dt className="w-28 shrink-0 font-medium text-neutral-950">{t.softSkills}</dt>
                <dd className="text-neutral-700">{softSkills.map((s) => s.label[locale]).join(", ")}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-7 print:mt-4 break-inside-avoid">
            <Heading>{t.languages}</Heading>
            <p className="mt-3 print:mt-1.5 text-neutral-700">{t.languagesText}</p>
          </section>
        </article>
      </div>
    </div>
  );
}
