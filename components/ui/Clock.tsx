"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/content/profile";

const formatter = new Intl.DateTimeFormat("es-CR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => "--:--";

/** Live local time in Costa Rica, e.g. "Costa Rica · 08:25". */
export function Clock({ label, short = false }: { label: string; short?: boolean }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="label-mono whitespace-nowrap text-muted" title={label}>
      <span className="sr-only">{label}: </span>
      <span aria-hidden>{short ? "CR" : profile.location} · </span>
      <time className="tabular-nums text-text">{time}</time>
    </span>
  );
}
