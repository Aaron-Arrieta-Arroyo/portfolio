"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE } from "@/components/motion/Providers";
import { profile } from "@/content/profile";
import { localeBase, type Dictionary, type Locale } from "@/content/i18n";

const LETTER_START = 0.3;
const LETTER_STEP = 0.04;

/** Greeting that cycles: Hola · Hello · Pura vida. Static with reduced motion. */
function Greeting({ greetings }: { greetings: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % greetings.length), 2800);
    return () => window.clearInterval(id);
  }, [reduce, greetings.length]);

  return (
    <span className="relative block h-7 overflow-hidden text-lg text-muted" aria-hidden>
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          className="absolute inset-0"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Name revealed letter by letter. */
function Name({ text }: { text: string }) {
  const reduce = useReducedMotion();
  let count = 0;

  const letter = (char: string, accent = false) => {
    const delay = LETTER_START + count++ * LETTER_STEP;
    return (
      <motion.span
        key={count}
        className={`inline-block ${accent ? "text-accent" : ""}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.35em", filter: "blur(8px)" }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {char}
      </motion.span>
    );
  };

  const words = text.split(" ");

  return (
    <span aria-hidden>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((char) => letter(char))}
          {w === words.length - 1 ? letter(".", true) : <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reduce = useReducedMotion();
  const base = localeBase(locale);
  const ref = useRef<HTMLElement>(null);

  // Amber halo that follows the cursor (mouse only).
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const gx = useSpring(mx, { stiffness: 120, damping: 24 });
  const gy = useSpring(my, { stiffness: 120, damping: 24 });
  const glowOpacity = useMotionValue(0);
  const glowFade = useSpring(glowOpacity, { stiffness: 80, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(560px circle at ${gx}px ${gy}px, rgba(233,161,91,0.06), transparent 70%)`;

  // Photo drifts up slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -56]);

  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const afterName = LETTER_START + (profile.name.length + 1) * LETTER_STEP;

  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: dict.footer.email, href: `mailto:${profile.email}` },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-dvh flex-col overflow-hidden"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
        glowOpacity.set(1);
      }}
      onPointerLeave={() => glowOpacity.set(0)}
    >
      {/* Warm ambient light behind the portrait + cursor halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_82%_45%,rgba(233,161,91,0.05),transparent_70%)] max-lg:bg-[radial-gradient(420px_circle_at_20%_18%,rgba(233,161,91,0.06),transparent_70%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: glow, opacity: glowFade }}
      />

      <div className="container-site relative flex flex-1 flex-col gap-8 pb-8 pt-24 lg:grid lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:items-center lg:gap-x-6 lg:gap-y-10 lg:pt-28">
        {/* Portrait */}
        <motion.figure
          className="flex items-end gap-4 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:block lg:w-full lg:max-w-[400px] lg:justify-self-end"
          style={{ y: photoY }}
        >
          <motion.div
            className="relative aspect-[4/5] w-[42%] max-w-[190px] shrink-0 overflow-hidden rounded-card border border-border bg-surface lg:w-full lg:max-w-none"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0% round 12px)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 12px)" }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
            >
              <Image
                src={profile.images.portrait}
                alt={dict.hero.photoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 400px, 190px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.figcaption
            className="label-mono flex flex-col gap-2.5 pb-1 text-muted lg:mt-3 lg:flex-row lg:items-center lg:justify-between lg:pb-0"
            {...enter(1)}
          >
            <span>{profile.name}</span>
            <span>{dict.hero.photoCaption}</span>
          </motion.figcaption>
        </motion.figure>

        {/* Copy */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <motion.p
            className="label-mono inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-2.5 text-muted"
            {...enter(0.05)}
          >
            <span aria-hidden className="pulse-dot size-1.5 rounded-full bg-accent" />
            {dict.hero.status}
          </motion.p>

          <h1 className="mt-7 text-hero leading-[0.95] lg:mt-8">
            <span className="sr-only">
              {dict.hero.greetings[0]} {profile.name}.
            </span>
            <motion.span className="mb-2 block font-normal tracking-normal lg:mb-3" {...enter(0.15)}>
              <Greeting greetings={dict.hero.greetings} />
            </motion.span>
            <Name text={profile.name} />
          </h1>

          <motion.p
            className="mt-5 text-xl leading-snug tracking-[-0.02em] text-muted md:text-2xl lg:mt-6"
            {...enter(afterName)}
          >
            <span className="text-text">{dict.hero.role}</span>
            <br />
            {dict.hero.roleSub}
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 lg:mt-10" {...enter(afterName + 0.12)}>
            <Magnetic>
              <Link
                href={`${base}/#projects`}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-text px-5 text-sm sm:px-6 font-medium text-bg transition-colors duration-[180ms] hover:bg-accent"
              >
                {dict.hero.ctaProjects}
                <span aria-hidden className="transition-transform duration-[350ms] ease-soft group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href={`${base}/cv`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm sm:px-6 font-medium text-text transition-colors duration-[180ms] hover:border-accent"
              >
                {dict.hero.ctaCv}
                <span aria-hidden className="text-muted">
                  ↓
                </span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="mt-auto flex items-end justify-between gap-6 pt-4 lg:items-center lg:col-span-12 lg:row-start-2 lg:mt-0"
          {...enter(afterName + 0.24)}
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="label-mono text-muted transition-colors duration-[180ms] hover:text-accent"
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#about"
            className="label-mono flex shrink-0 items-center gap-2 text-muted transition-colors duration-[180ms] hover:text-text"
          >
            <span aria-hidden className="bob inline-block text-accent">
              ↓
            </span>
            {dict.hero.scroll}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
