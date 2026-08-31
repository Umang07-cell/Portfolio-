import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Scroll progress indicator — a thin bar at the top of the viewport
 * that fills as the user scrolls down the page.
 * Respects prefers-reduced-motion.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
          setProgress(scrollProgress);
          setVisible(scrollProgress > 0.02);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="scroll-progress"
      style={{ opacity: visible ? 1 : 0 }}
      animate={{ scaleX: progress }}
      transition={{ duration: 0.1, ease: "linear" }}
      initial={{ scaleX: 0 }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}