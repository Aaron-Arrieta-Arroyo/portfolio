"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const spring = { stiffness: 180, damping: 20 };

/** 2–3° tilt toward the cursor. Mouse only; off with reduced motion. */
export function Tilt({ children, className, max = 2.5 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, spring);
  const rotateY = useSpring(ry, spring);

  return (
    <m.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
