"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => String(new Date().getFullYear());
// Build-time year (set in next.config.ts) for the static HTML; the browser then shows the live year.
const getServerSnapshot = () => process.env.NEXT_PUBLIC_BUILD_YEAR ?? "";

/** Current year, always up to date without rebuilding. */
export function Year() {
  return <>{useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)}</>;
}
