"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
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
        <m.span
          key={index}
          className="absolute inset-0"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {greetings[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

/** Name revealed letter by letter. Server-rendered; no JS needed. */
function Name({ text }: { text: string }) {
  let count = 0;

  // CSS animation (not JS): it starts on first paint, before hydration.
  const letter = (char: string, accent = false) => {
    const delay = LETTER_START + count++ * LETTER_STEP;
    return (
      <span
        key={count}
        className={`anim-letter inline-block ${accent ? "text-accent" : ""}`}
        style={{ animationDelay: `${delay}s`, ["--wave" as string]: `${delay + 1.1}s` }}
      >
        <span className="letter-hover">{char}</span>
      </span>
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

  // Photo drifts up slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -56]);

  // Entrance animations are CSS (globals.css) so they run before hydration.
  const at = (seconds: number) => ({ animationDelay: `${seconds}s` });

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
      className="relative flex min-h-svh flex-col overflow-hidden"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
        glowOpacity.set(1);
      }}
      onPointerLeave={() => glowOpacity.set(0)}
    >
      {/* Ambient grid + slow drifting light (CSS only) */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-orb pointer-events-none absolute right-[-10%] top-[5%] size-[70vmin]" />
      {/* Warm ambient light behind the portrait + cursor halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_82%_45%,rgba(233,161,91,0.05),transparent_70%)] max-lg:bg-[radial-gradient(420px_circle_at_20%_18%,rgba(233,161,91,0.06),transparent_70%)]"
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -ml-[560px] -mt-[560px] size-[1120px] rounded-full bg-[radial-gradient(closest-side,rgba(233,161,91,0.06),transparent)]"
        style={{ x: gx, y: gy, opacity: glowFade }}
      />

      <div className="container-site relative flex flex-1 flex-col gap-8 pb-8 pt-24 lg:grid lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:items-center lg:gap-x-6 lg:gap-y-10 lg:pt-28">
        {/* Portrait */}
        <m.figure
          className="flex items-end gap-4 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:block lg:w-full lg:max-w-[400px] lg:justify-self-end"
          style={{ y: photoY }}
        >
          <div
            className="anim-clip-up relative aspect-[4/5] w-[42%] max-w-[190px] shrink-0 overflow-hidden rounded-card glass-card lg:w-full lg:max-w-none"
            style={at(0.15)}
          >
            <div className="anim-zoom-out absolute inset-0" style={at(0.15)}>
              <Image
                src={profile.images.portrait}
                alt={dict.hero.photoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 400px, 190px"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption
            className="anim-enter label-mono flex flex-col gap-2.5 pb-1 text-muted lg:mt-3 lg:flex-row lg:items-center lg:justify-between lg:pb-0"
            style={at(1)}
          >
            <span>{profile.name}</span>
            <span>{dict.hero.photoCaption}</span>
          </figcaption>
        </m.figure>

        {/* Copy */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <p
            className="anim-enter label-mono inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-2.5 text-muted"
            style={at(0.05)}
          >
            <span aria-hidden className="pulse-dot size-1.5 rounded-full bg-accent" />
            {dict.hero.status}
          </p>

          <h1 className="mt-7 text-hero leading-[0.95] lg:mt-8">
            <span className="sr-only">
              {dict.hero.greetings[0]} {profile.name}.
            </span>
            <span className="anim-enter mb-2 block font-normal tracking-normal lg:mb-3" style={at(0.15)}>
              <Greeting greetings={dict.hero.greetings} />
            </span>
            <Name text={profile.name} />
          </h1>

          {/* LCP element: static on purpose so it paints immediately. */}
          <p className="mt-5 text-xl leading-snug tracking-[-0.02em] text-muted md:text-2xl lg:mt-6">
            <span className="text-text">{dict.hero.role}</span>
            <br />
            {dict.hero.roleSub}
          </p>

          <div className="anim-enter mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 lg:mt-10" style={at(afterName + 0.12)}>
            <Magnetic>
              <Link
                href={`${base}/#projects`}
                className="group inline-flex h-12 items-center gap-2 rounded-full glass-accent px-5 text-sm sm:px-6 font-medium"
              >
                {dict.hero.ctaProjects}
                <span aria-hidden className="transition-transform duration-[350ms] ease-soft group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={dict.cv.file}
                download
                className="inline-flex h-12 items-center gap-2 rounded-full glass px-5 text-sm font-medium text-text transition-colors duration-[180ms] hover:border-accent sm:px-6"
              >
                {dict.hero.ctaCv}
                <span aria-hidden className="text-muted">
                  ↓
                </span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="anim-enter mt-auto flex items-end justify-between gap-6 pt-4 lg:items-center lg:col-span-12 lg:row-start-2 lg:mt-0"
          style={at(afterName + 0.24)}
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
        </div>
      </div>
    </section>
  );
}
