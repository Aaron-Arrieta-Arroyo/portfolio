"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/** Shared easing: cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE = [0.22, 1, 0.36, 1] as const;

let lenis: Lenis | null = null;
let popNavigation = false;

/** Pause / resume smooth scroll (used by the mobile menu). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Back/forward: let the browser restore the old position instead of jumping to the top.
  useEffect(() => {
    const onPop = () => (popNavigation = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // New page: cancel any smooth scroll still running from the previous page, so it starts at the top without a jolt.
  useEffect(() => {
    if (popNavigation) {
      popNavigation = false;
      lenis?.resize();
      return;
    }
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.resize();
  }, [pathname]);

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
