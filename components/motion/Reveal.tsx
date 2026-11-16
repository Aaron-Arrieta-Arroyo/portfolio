"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE } from "./Providers";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds; use index * 0.06 for staggered groups. */
  delay?: number;
  as?: "div" | "li" | "span";
  "data-spotlight"?: boolean;
};

/** Scroll reveal: opacity 0→1, y 16→0, blur 6→0 over 700ms. Fades only with reduced motion. */
export function Reveal({ children, className, delay = 0, as = "div", ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  return (
    <Tag
      className={className}
      {...rest}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
