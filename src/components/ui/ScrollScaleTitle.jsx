import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * ScrollScaleTitle — the same "huge text that shrinks into place as you
 * scroll" treatment used in the Projects section ("What crazy I've Been
 * Build"). Reused across Work / Stack / Experience / Timeline so every
 * section intro shares one animation instead of each having its own.
 *
 * `lines` takes 1-2 strings. The second line (if present) is rendered in
 * the accent color, matching the Projects section convention.
 */
export default function ScrollScaleTitle({ lines, align = "center" }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Was ["start end", "start center"] — the title didn't finish revealing
    // until it had scrolled all the way to viewport-center, which reads as
    // "stuck"/delayed, especially right after a section boundary where
    // there's already padding above it. Resolving by 72% down the viewport
    // (instead of the exact center) shortens that runway noticeably.
    offset: ["start end", "start 72%"],
  });

  // Was scale [4,1] — 4x meant the title spent much of the scroll range
  // still oversized/illegible. 2.2x reads as intentional emphasis instead
  // of a stuck animation, while still matching the Projects section's
  // "big text settles into place" feel.
  const scale = useTransform(scrollYProgress, [0, 1], [2.2, 1], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <div
      className="scroll-title-wrap"
      style={{ alignItems: align === "left" ? "flex-start" : "center" }}
      ref={ref}
    >
      {lines.map((line, i) => (
        <motion.h2
          key={line}
          className={`scroll-title${i === 1 ? " scroll-title--accent" : ""}`}
          style={
            reduceMotion
              ? undefined
              : { scale, opacity, transformOrigin: align === "left" ? "left top" : "center top" }
          }
        >
          {line}
        </motion.h2>
      ))}
    </div>
  );
}
