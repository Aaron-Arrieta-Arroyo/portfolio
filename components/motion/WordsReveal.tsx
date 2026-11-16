"use client";

import { useEffect, useRef } from "react";

type Run = { t: string; k?: boolean };

/** Paragraph whose words light up one after another when it scrolls into view. Text is in the HTML (no-JS safe). */
export function WordsReveal({ runs, className }: { runs: Run[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already visible: no effect
    el.dataset.armed = "";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.dataset.shown = "";
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let n = 0;
  return (
    <p ref={ref} className={className}>
      {runs.map((run, r) =>
        run.t.split(/(\s+)/).map((part, i) =>
          /^\s+$/.test(part) || part === "" ? (
            part
          ) : (
            <span key={`${r}-${i}`} className={`word ${run.k ? "text-text" : ""}`} style={{ transitionDelay: `${n++ * 22}ms` }}>
              {part}
            </span>
          ),
        ),
      )}
    </p>
  );
}
