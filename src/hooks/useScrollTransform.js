import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Scroll progress for an element (0 to 1 as it enters/exits viewport)
 * Uses Framer Motion's useScroll for smooth, performant scroll-driven animations
 */
export function useElementScrollProgress(ref, options = {}) {
  const { offset = ["start end", "end start"], target = ref } = options;

  const { scrollYProgress } = useScroll({
    target,
    offset,
  });

  return scrollYProgress;
}

/**
 * Map scroll progress to any value range using useTransform
 * Perfect for clip-path, opacity, scale, translate, etc.
 */
export function useScrollTransform(progress, inputRange, outputRange, options = {}) {
  const { clamp = true, ease } = options;

  return useTransform(progress, inputRange, outputRange, { clamp, ease });
}

/**
 * Clip-path polygon reveal — animates from 0% to 100% reveal
 * direction: "left-to-right" | "right-to-left" | "center-out" | "inward"
 */
export function useClipPathReveal(progress, direction = "left-to-right") {
  const getPolygon = (p) => {
    switch (direction) {
      case "left-to-right":
        // polygon(0 0, X% 0, X% 100%, 0 100%)
        return `polygon(0 0, ${p * 100}% 0, ${p * 100}% 100%, 0 100%)`;
      case "right-to-left":
        // polygon(X% 0, 100% 0, 100% 100%, X% 100%)
        return `polygon(${100 - p * 100}% 0, 100% 0, 100% 100%, ${100 - p * 100}% 100%)`;
      case "center-out":
        // polygon(50%-X/2 0, 50%+X/2 0, 50%+X/2 100%, 50%-X/2 100%)
        const half = p * 50;
        return `polygon(${50 - half}% 0, ${50 + half}% 0, ${50 + half}% 100%, ${50 - half}% 100%)`;
      case "inward":
        // polygon(X% 0, 100%-X% 0, 100%-X% 100%, X% 100%)
        return `polygon(${p * 100}% 0, ${100 - p * 100}% 0, ${100 - p * 100}% 100%, ${p * 100}% 100%)`;
      default:
        return `polygon(0 0, ${p * 100}% 0, ${p * 100}% 100%, 0 100%)`;
    }
  };

  return useTransform(progress, [0, 1], [getPolygon(0), getPolygon(1)]);
}

/**
 * Staggered clip-path reveals for multiple words/lines
 * Each child gets a delayed progress based on index
 */
export function useStaggeredClipPath(progress, index, total, stagger = 0.15) {
  const start = index * stagger;
  const end = start + (1 - (total - 1) * stagger);
  const clampedProgress = useTransform(progress, [start, end], [0, 1], { clamp: true });
  return useClipPathReveal(clampedProgress, "left-to-right");
}

/**
 * Parallax transform — returns y offset based on scroll progress
 */
export function useParallax(progress, speed = 100, direction = "up") {
  const multiplier = direction === "up" ? -1 : 1;
  return useTransform(progress, [0, 1], [0, multiplier * speed]);
}

/**
 * Opacity fade in/out based on scroll progress
 */
export function useScrollOpacity(progress, fadeInStart = 0, fadeInEnd = 0.3, fadeOutStart = 0.7, fadeOutEnd = 1) {
  return useTransform(
    progress,
    [0, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, 1],
    [0, 0, 1, 1, 0, 0],
    { clamp: true }
  );
}

/**
 * Scale transform based on scroll progress
 */
export function useScrollScale(progress, startScale = 1, endScale = 1, start = 0, end = 1) {
  return useTransform(progress, [start, end], [startScale, endScale], { clamp: true });
}

/**
 * Horizontal scroll progress for a container (for horizontal sliders)
 */
export function useHorizontalScrollProgress(ref) {
  const { scrollXProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  return scrollXProgress;
}

/**
 * Lenis smooth scroll integration with Framer Motion
 * Call once at app root to sync Lenis with Framer Motion's scroll
 */
export function useLenisSync(lenis) {
  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      // Framer Motion reads from window.scrollY automatically
      // Lenis updates it, so we just need to keep the RAF loop alive
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);
}

/**
 * Scroll-triggered class toggle for CSS-based animations
 */
export function useScrollClass(ref, className, threshold = 0.1) {
  const [hasClass, setHasClass] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasClass(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return hasClass;
}

/**
 * Get scroll direction (up/down) for hide-on-scroll-down navbars
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        setDirection(currentScrollY > lastScrollY.current ? "down" : "up");
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
}

/**
 * Reduced motion check hook
 */
export function useReducedMotion() {
  return useFramerReducedMotion();
}
