import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { profile, heroCopy } from "../data/content";

const expo = [0.16, 1, 0.3, 1];

/**
 * Parallax hook - returns a transform value based on scroll position
 * Respects prefers-reduced-motion
 */
function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calculate how far the element is from the center of viewport
          // When element center is at viewport center, progress = 0
          // When element center is at viewport top, progress = -1
          // When element center is at viewport bottom, progress = 1
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;
          const distance = (elementCenter - viewportCenter) / viewportHeight;

          // Clamp to reasonable range
          const clampedDistance = Math.max(-1.5, Math.min(1.5, distance));
          setOffset(clampedDistance * speed * 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return [ref, offset];
}

export default function Hero() {
  const [ambientOneRef, ambientOneOffset] = useParallax(0.15);
  const [ambientTwoRef, ambientTwoOffset] = useParallax(-0.1);
  const [gridRef, gridOffset] = useParallax(0.05);

  return (
    <section id="top" className="hero scroll-section scroll-section--full scroll-driven-hero">
      <div
        ref={ambientOneRef}
        className="hero__ambient hero__ambient--one"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${ambientOneOffset}px, 0) scale(1)` }}
      />
      <div
        ref={ambientTwoRef}
        className="hero__ambient hero__ambient--two"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${ambientTwoOffset}px, 0) scale(1)` }}
      />

      <div className="container hero__inner">
        <div className="hero__content">
          <motion.span
            className="overline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            {heroCopy.overline}
          </motion.span>

          <h1 className="hero__name">
            <span className="hero__name-line-wrap">
              <motion.span
                className="hero__name-line"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: expo }}
              >
                UMANG
              </motion.span>
            </span>
            <span className="hero__name-line-wrap">
              <motion.span
                className="hero__name-line"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: expo }}
              >
                PAWAR
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero__positioning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
          >
            {heroCopy.positioning.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </motion.p>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
          >
            {heroCopy.description}
          </motion.p>

          <div className="hero__ctas">
            <motion.a
              href="#finsight"
              className="btn btn--primary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#finsight")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
            </motion.a>
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.28, ease: "easeOut" }}
            >
              Download Resume
            </motion.a>
          </div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.4, ease: "easeOut" }}
          >
            <a href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon size={16} /> GitHub
            </a>
            {profile.linkedin ? (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            ) : null}
            <a href={`mailto:${profile.email}`}>
              <Mail size={16} /> Email
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div
            ref={gridRef}
            className="hero__grid"
            style={{ transform: `translate3d(0, ${gridOffset}px, 0)` }}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${(i % 8) * 0.15}s` }} />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="hero__scroll-cue mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ArrowUpRight size={14} style={{ transform: "rotate(135deg)" }} />
        SCROLL
      </motion.a>
    </section>
  );
}
