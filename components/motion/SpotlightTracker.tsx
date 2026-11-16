"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Mouse: feeds the cursor position to the [data-spotlight] element under it.
 * Touch: there is no hover, so the card crossing the middle of the screen lights up instead.
 */
export function SpotlightTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-spotlight]");
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.dataset.lit = "";
          else delete el.dataset.lit;
        }
      },
      { rootMargin: "-38% 0px -38% 0px" },
    );
    document.querySelectorAll("[data-spotlight]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
