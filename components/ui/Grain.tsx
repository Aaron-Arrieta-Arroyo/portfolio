/**
 * Film grain over the whole site (decorative).
 * A small pre-rendered PNG tile, no blend mode: an SVG noise filter blended over the full
 * viewport had to be recomposited on every scroll frame and halved the frame rate.
 */
export function Grain() {
  return (
    <div
      aria-hidden
      data-grain
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] [background-image:url(/images/noise.png)] [background-size:160px_160px]"
    />
  );
}
