import { useEffect, useRef, useState, useCallback } from "react";

/**
 * useScrollDirectionReveal — tracks:
 *   - whether the element is in the viewport (inView)
 *   - the direction the user was scrolling when visibility changed (direction)
 *
 * Returned `state` is one of:
 *   "hidden-below"  → not in view, below the fold (initial or scrolled past)
 *   "hidden-above"  → not in view, above the fold (scrolled away upward)
 *   "visible"       → in the viewport
 *
 * This drives direction-aware enter/exit variants so the card always enters
 * from the correct side and exits the correct side.
 */
export function useScrollDirectionReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden-below");

  // Track last known scroll position so we know direction when the observer fires.
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const handleScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced-motion: stay visible, skip animation entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("visible");
      return;
    }

    let prevScrollY = lastScrollY.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = lastScrollY.current;
        const scrollingDown = currentScrollY >= prevScrollY;
        prevScrollY = currentScrollY;

        if (entry.isIntersecting) {
          setState("visible");
        } else {
          // Card left viewport — determine which edge it exited from.
          if (scrollingDown) {
            // Scrolled down past the card → it's now above the fold.
            setState("hidden-above");
          } else {
            // Scrolled up past the card → it's now below the fold.
            setState("hidden-below");
          }
        }
      },
      {
        threshold,
        // Shrink the bottom margin slightly so the card exits cleanly
        // before the next card fully enters, giving a nice stagger feel.
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, state };
}
