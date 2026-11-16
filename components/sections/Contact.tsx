"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE } from "@/components/motion/Providers";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/i18n";

export function Contact({ dict }: { dict: Dictionary }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Clipboard blocked: fall back to opening the mail client.
      window.location.href = `mailto:${profile.email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
  ];

  return (
    <Section id="contact" label={dict.sections.contact}>
      <Reveal>
        <p className="mt-10 max-w-[14ch] text-[2.5rem] font-semibold leading-[1] tracking-[-0.04em] md:text-[4rem]">
          {dict.contact.title}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-muted">{dict.contact.body}</p>
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface p-1.5 pl-5 transition-colors duration-[180ms] focus-within:border-accent hover:border-accent">
          <a href={`mailto:${profile.email}`} className="min-w-0 truncate font-mono text-sm text-text sm:text-base">
            {profile.email}
          </a>
          <Magnetic>
            <button
              type="button"
              onClick={copy}
              aria-label={dict.contact.copyLabel}
              className="btn-shine inline-flex h-10 items-center rounded-full bg-text px-4 text-sm font-medium text-bg transition-colors duration-[180ms] hover:bg-accent sm:px-5"
            >
              {dict.contact.copy}
            </button>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <ul className="mt-10 flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="label-mono text-muted transition-colors duration-[180ms] hover:text-accent"
              >
                {link.label} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Toast */}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center">
        <AnimatePresence>
          {copied && (
            <m.p
              className="label-mono flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-3 text-text"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {dict.contact.copied}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
