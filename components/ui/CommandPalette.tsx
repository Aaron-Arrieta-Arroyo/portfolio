"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { EASE, setScrollLocked } from "@/components/motion/Providers";
import { navSections, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { localeBase, type Dictionary, type Locale } from "@/content/i18n";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

/** Event name other components dispatch to open the palette (e.g. the footer ⌘K button). */
export const OPEN_PALETTE = "open-command-palette";

/** Strip accents and lowercase for forgiving search ("proyectos" matches "Proyectos", "acion" matches "acción"). */
const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function CommandPalette({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.palette;
  const router = useRouter();
  const base = localeBase(locale);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const items = useMemo<Item[]>(() => {
    const other = locale === "es" ? "en" : "es";
    return [
      { id: "home", group: t.navigate, label: t.home, run: () => go(`${base}/#top`) },
      ...navSections.map((id) => ({
        id: `nav-${id}`,
        group: t.navigate,
        label: dict.sections[id],
        run: () => go(`${base}/#${id}`),
      })),
      { id: "stack", group: t.navigate, label: dict.sections.stack, run: () => go(`${base}/#stack`) },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: t.projects,
        label: p.title,
        hint: p.tags.join(" · "),
        run: () => go(`${base}/projects/${p.slug}`),
      })),
      {
        id: "copy",
        group: t.actions,
        label: t.copyEmail,
        hint: profile.email,
        run: () => {
          close();
          navigator.clipboard?.writeText(profile.email).then(
            () => {
              setToast(true);
              window.setTimeout(() => setToast(false), 2200);
            },
            () => (window.location.href = `mailto:${profile.email}`),
          );
        },
      },
      {
        id: "cv",
        group: t.actions,
        label: t.downloadCv,
        run: () => {
          close();
          const a = document.createElement("a");
          a.href = dict.cv.file;
          a.download = "";
          a.click();
        },
      },
      { id: "cv-web", group: t.actions, label: t.viewCv, run: () => go(`${base}/cv`) },
      {
        id: "lang",
        group: t.actions,
        label: t.switchLang,
        hint: other.toUpperCase(),
        run: () => {
          close();
          const bare = window.location.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
          window.location.href = other === "es" ? bare : `/en${bare === "/" ? "" : bare}`;
        },
      },
      {
        id: "gh",
        group: t.links,
        label: "GitHub",
        hint: "↗",
        run: () => {
          close();
          window.open(profile.links.github, "_blank", "noopener");
        },
      },
      {
        id: "li",
        group: t.links,
        label: "LinkedIn",
        hint: "↗",
        run: () => {
          close();
          window.open(profile.links.linkedin, "_blank", "noopener");
        },
      },
    ];
  }, [base, close, dict, go, locale, t]);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return items;
    return items.filter((i) => norm(`${i.label} ${i.group} ${i.hint ?? ""}`).includes(q));
  }, [items, query]);

  // Open with ⌘K / Ctrl+K, or from other components via a DOM event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, onOpen);
    };
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  // Keep the active option visible.
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault(); // focus stays in the dialog
    }
  }

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-[150] flex items-start justify-center bg-bg/70 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label={t.label}
              className="w-full max-w-[560px] overflow-hidden rounded-card border border-border bg-surface"
              initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-border px-5">
                <span aria-hidden className="font-mono text-accent">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listId}
                  aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                  aria-autocomplete="list"
                  aria-label={t.placeholder}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder={t.placeholder}
                  className="h-14 flex-1 bg-transparent text-base text-text outline-none placeholder:text-muted focus-visible:outline-none"
                />
                <kbd className="label-mono rounded-md border border-border px-1.5 py-1 text-muted">esc</kbd>
              </div>

              <ul ref={listRef} id={listId} role="listbox" aria-label={t.label} className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">{t.empty}</li>}
                {results.map((item, i) => {
                  const header = item.group !== lastGroup;
                  lastGroup = item.group;
                  const selected = i === active;
                  return (
                    <li key={item.id} role="presentation">
                      {header && (
                        <p role="presentation" className="label-mono px-3 pb-2 pt-3 text-subtle">
                          {item.group}
                        </p>
                      )}
                      <div
                        id={`${listId}-${item.id}`}
                        role="option"
                        aria-selected={selected}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => item.run()}
                        className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm transition-colors duration-[180ms] ${
                          selected ? "bg-surface-2 text-text" : "text-muted"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className={`size-1.5 rounded-full transition-colors duration-[180ms] ${selected ? "bg-accent" : "bg-transparent"}`}
                          />
                          {item.label}
                        </span>
                        {item.hint && <span className="label-mono truncate text-subtle">{item.hint}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="label-mono border-t border-border px-5 py-3 text-subtle">{t.hint}</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[160] flex justify-center">
        <AnimatePresence>
          {toast && (
            <m.p
              className="label-mono flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-3 text-text"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {t.copied}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
