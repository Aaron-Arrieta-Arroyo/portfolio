"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center rounded-full glass px-5 text-sm font-medium text-text transition-colors duration-[180ms] hover:border-accent"
    >
      {label}
    </button>
  );
}
