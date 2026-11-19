"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string; className?: string };

/**
 * Case-study video that stops when you leave the page.
 * Next keeps visited routes alive in a hidden <Activity> (cacheComponents), so a playing
 * <video> would keep sounding after navigating away. Effects are cleaned up when the route is
 * hidden or unmounted, so pausing in the cleanup covers both; pagehide covers closing the tab.
 */
export function DemoVideo({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const stop = () => v.pause();
    window.addEventListener("pagehide", stop);
    return () => {
      window.removeEventListener("pagehide", stop);
      stop();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      controls
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
