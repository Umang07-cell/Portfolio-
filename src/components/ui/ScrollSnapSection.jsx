/**
 * Wraps a section with scroll-snap alignment for immersive vertical scrolling.
 * Adds scroll-driven animation class when CSS scroll-timeline is supported.
 */
export default function ScrollSnapSection({
  id,
  className = "",
  snap = "start",
  fullViewport = false,
  scrollAnim = false,
  children,
}) {
  const classes = [
    "scroll-section",
    `scroll-section--snap-${snap}`,
    fullViewport ? "scroll-section--full" : "",
    scrollAnim ? "scroll-section--animated" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}
