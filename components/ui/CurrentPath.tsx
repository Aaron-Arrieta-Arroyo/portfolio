"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** The URL path the visitor typed (shown in the 404 terminal). */
export function CurrentPath() {
  return <>{useSyncExternalStore(subscribe, () => decodeURI(window.location.pathname), () => "…")}</>;
}
