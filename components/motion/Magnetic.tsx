"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

/** Pulls its child slightly toward the cursor. Mouse only; off with reduced motion. */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  return (
    <motion.div
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
