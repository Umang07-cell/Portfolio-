import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element enters the viewport.
 * Entrance-only — never re-triggers once revealed.
 */
export function useScrollReveal(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reducedMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reducedMotion]);

  return [ref, inView || reducedMotion];
}

/** Stagger delay helper — index × baseDelay with optional cap */
export function staggerDelay(index, baseDelay = 0.08, maxDelay = 0.6) {
  return Math.min(index * baseDelay, maxDelay);
}

/** Variant presets for scroll-reveal animations */
export const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export const defaultTransition = {
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
};

/** Container + item variants for staggered grid/list reveals */
export function useStaggerInView(stagger = 0.08, threshold = 0.12, rootMargin = "0px 0px -60px 0px") {
  const [ref, inView] = useScrollReveal(threshold, rootMargin);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.05,
      },
    },
  };

  return { ref, inView, containerVariants, itemVariants: revealVariants.fadeUp };
}
