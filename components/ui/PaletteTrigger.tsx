"use client";

import { OPEN_PALETTE } from "./CommandPalette";

/** Footer "⌘K" chip: also opens the palette on click. */
export function PaletteTrigger({ label, hint }: { label: string; hint: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
      aria-label={label}
      className="group hidden items-center gap-2 md:inline-flex"
    >
      <kbd className="rounded-md border border-border bg-surface px-1.5 py-1 font-mono text-text transition-colors duration-[180ms] group-hover:border-accent">
        ⌘K
      </kbd>
      <span className="transition-colors duration-[180ms] group-hover:text-text">{hint}</span>
    </button>
  );
}
