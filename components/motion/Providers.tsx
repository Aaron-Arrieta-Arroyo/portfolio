"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/** Shared easing: cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE = [0.22, 1, 0.36, 1] as const;

let lenis: Lenis | null = null;

/** Pause / resume smooth scroll (used by the mobile menu). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.11 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: EASE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
