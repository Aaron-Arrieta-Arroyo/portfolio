"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], [data-spotlight], input, [role='option']";

/** Amber ring that trails the cursor and grows over interactive elements. Desktop mouse only. */
export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ref.current;
    if (!ring) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      ring.dataset.visible = "";
      const target = e.target as Element | null;
      if (target?.closest?.(INTERACTIVE)) ring.dataset.active = "";
      else delete ring.dataset.active;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => delete ring.dataset.visible;

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} aria-hidden className="cursor-ring" />;
}
