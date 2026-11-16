"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "motion/react";
import { Clock } from "@/components/ui/Clock";
import { EASE, setScrollLocked } from "@/components/motion/Providers";
import { navSections, profile, sections, type SectionId } from "@/content/profile";
import { localeBase, locales, type Dictionary, type Locale } from "@/content/i18n";

type NavbarProps = { locale: Locale; dict: Dictionary };

/** Same page in the other locale ("/projects/x" ↔ "/en/projects/x"). */
function pathFor(target: Locale, pathname: string) {
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return target === "es" ? bare : `/en${bare === "/" ? "" : bare}`;
}

/** Tracks which home section is in view to highlight its nav link. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id as SectionId;
          // Sections outside the navbar (top, stack, now) clear the highlight.
          setActive((navSections as readonly string[]).includes(id) ? id : null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const targets = ["top", ...sections].map((id) => document.getElementById(id));
    targets.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <div className="label-mono flex items-center gap-1.5" role="group" aria-label={label}>
      {locales.map((code, i) => (
        <span key={code} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="text-subtle">/</span>}
          {code === locale ? (
            <span aria-current="true" className="text-text">
              {code}
            </span>
          ) : (
            // Plain anchor: each locale has its own root layout, so this is a full navigation.
            <a
              href={pathFor(code, pathname)}
              hrefLang={code}
              lang={code}
              className="text-muted transition-colors duration-[180ms] hover:text-accent"
            >
              {code}
              <span className="sr-only"> — {label}</span>
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const base = localeBase(locale);
  const isHome = pathname === (base || "/");
  const active = useActiveSection(isHome);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open]);

  const items = navSections.map((id) => ({
    id,
    label: dict.sections[id],
    href: `${base}/#${id}`,
  }));

  return (
    <header data-print-hide className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label={dict.nav.menu}
        className="relative z-50 flex h-12 w-full max-w-[860px] items-center justify-between gap-6 rounded-full border border-border bg-surface/90 pl-2 pr-5 backdrop-blur-md md:bg-surface/70 md:backdrop-blur-xl md:w-auto md:justify-start"
      >
        <Link
          href={`${base}/#top`}
          aria-label={`${profile.name} — ${dict.nav.home}`}
          className="relative grid size-8 place-items-center rounded-full border border-border bg-bg font-mono text-xs font-semibold tracking-tight text-text transition-colors duration-[180ms] hover:border-accent"
        >
          {profile.initials}
          <span aria-hidden className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent" />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const current = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={current ? "location" : undefined}
                  className={`relative block rounded-full px-3 py-1.5 text-sm transition-colors duration-[180ms] hover:text-text ${
                    current ? "text-text" : "text-muted"
                  }`}
                >
                  {current && (
                    <m.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-surface-2"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <span aria-hidden className="h-4 w-px bg-border" />
          <Clock label={dict.nav.clockLabel} />
          <span aria-hidden className="h-4 w-px bg-border" />
          <LangSwitch locale={locale} label={dict.nav.switchLang} />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <Clock label={dict.nav.clockLabel} short />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className="label-mono -mr-2 flex h-9 items-center gap-2 rounded-full px-2 text-text"
          >
            <span className="relative block h-2.5 w-4" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-px w-full bg-text transition-transform duration-[350ms] ease-soft ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-text transition-transform duration-[350ms] ease-soft ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </span>
            {open ? dict.nav.close : dict.nav.menu}
          </button>
        </div>
      </nav>

      {/* Mobile curtain */}
      <AnimatePresence>
        {open && (
          <m.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menu}
            className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {items.map((item, i) => (
                <m.li
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border py-5 text-2xl font-semibold tracking-[-0.03em]"
                  >
                    <span className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <m.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.4 }}
            >
              <Clock label={dict.nav.clockLabel} />
              <LangSwitch locale={locale} label={dict.nav.switchLang} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
