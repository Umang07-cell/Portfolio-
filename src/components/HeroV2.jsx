import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowDown, Github, Linkedin } from "lucide-react";
import { ClipPathReveal, StaggeredClipPathText } from "./ui/ClipPathReveal";
import AnimatedSVGIcon from "./ui/AnimatedSVGIcon";
import { profile, heroCopy } from "../data/content";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";

// SVG Icons for the floating tech stack
const JSIcon = () => (
  <svg viewBox="0 0 667.17 686.54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M101.84,84.18l43.54,489.57,196.58,54.51,196.82-54.51,43.3-489.57H101.84ZM326.39,515.24l-149.65-29.64c-1.77-1.4-.81-5.44-1.02-7.66-2.62-28.27-5.22-56.56-8-84.81-.23-.76.55-2.5,1.12-2.5h58.67l.93,1.25,4.51,47.29,32.59,4.35v-203.58h-68.09l-5.79-60.13h134.73v335.43ZM511.82,239.94h-89.82v61.58h84.02l-16.6,183.54-130.44,30.18v-61.94l74.53-14.21,7.32-77.44h-80.76l-1.09-1.08v-180.76h157.91l-5.07,60.13Z" fill="#F7DF1E" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 667.17 686.54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M635.44,280.55c-9.62-44.48-32.21-73.97-63.35-82.65l-5.79-1.62h-59.85l-.32,41.53c-.38,44.67-.28,43.28-3.68,56-4.51,16.93-14.62,32.7-26.85,41.91-10.26,7.72-21.16,11.99-37.79,14.88-2.84.49-27.51.77-87.03,1.05l-83.06.36-6.69,1.52c-30.2,6.86-49.52,22.61-57.69,47.06-4.47,13.38-4.55,15.09-4.34,99.17l.19,73.48,1.33,4.36c11.39,37.49,56.15,58.93,128.48,61.56,14,.51,32.53.26,45.59-.62,38.88-2.61,68.37-10.43,87.72-23.28,6.37-4.23,15.75-13.64,18.85-18.89,2.99-5.11,5.09-10.96,5.69-15.92.24-2.03.32-19.66.15-39.14l-.3-35.44-72.01-.3-72.03-.28v-19.75l108.62-.32c120.57-.34,110.31,0,122.56-4.15,21.46-7.29,38.41-22.96,49.93-46.08,5.71-11.46,9.51-22.61,12.44-36.29,2.95-13.94,2.97-14.3,2.97-56.77s-.04-44.29-3.74-61.39ZM428.73,542.06c11.16,1.86,19.83,10.54,21.72,21.76,2.29,13.59-7.65,27.19-21.54,29.43-2.07.34-4.17.58-4.64.56-12.91-.94-22.81-9.64-25.01-21.97-3.04-16.95,12.46-32.59,29.47-29.77Z" fill="#3776AB" />
    <path d="M485.37,107.98c-1.73-6.09-6.31-15.3-9.96-20.11-1.6-2.12-5.15-5.96-7.87-8.53-24.52-23.21-71.17-34.84-134.76-33.6-9.6.19-20.84.62-24.99.96-57.43,4.68-93.27,20.56-105.46,46.66-3.51,7.52-3.46,7.05-3.31,48.05l.15,37.45,72.03.28c39.63.17,72.09.36,72.18.45.06.06.15,4.55.15,9.94,0,8.57-.13,9.87-.96,10.2-.53.19-48.84.34-107.38.32-106.12-.04-106.42-.04-112.45,1.18-27.51,5.6-47.9,22.4-61.53,50.72-10.58,21.97-15.77,47.79-16.63,82.59-1.37,55.83,9.51,100.29,31.03,126.96,11.37,14.09,27.47,23.98,43.79,26.95,3.23.6,11.09.77,32.15.68l27.87-.09.34-41.83c.36-44.95.3-43.82,3.63-56.06,7.44-27.23,25.73-46.64,50.63-53.67,12.82-3.61,7.29-3.4,98.75-3.8,92.08-.41,85.77-.15,99.67-4.06,21.44-6.01,37.6-18.55,46.36-35.93,2.54-5.04,5.58-14.38,6.84-21.01.98-5.15,1.05-10.67,1.05-82.78v-77.27l-1.33-4.64ZM271.66,140.96c-3.46,1.62-4.62,1.86-9.75,2.01-4.68.15-6.45-.04-9.19-1.03-12.27-4.32-19.51-16.52-17.27-29.05,2.76-15.41,18.34-24.92,33.26-20.33,9.34,2.89,16.22,10.88,17.98,20.9,1.92,10.88-4.45,22.51-15.03,27.49Z" fill="#FFD43B" />
  </svg>
);

const JavaIcon = () => (
  <svg viewBox="0 0 667.17 686.54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M242.87,358.98h.23v-.12s-.12,0-.23.12ZM504.16,548.8h-.23c.23.12.35.23.59.23-.23-.12-.35-.23-.35-.23Z" fill="#ED8B00" />
    <path d="M144.05,381.91c51.81-24.91,95.2-23.16,98.83-22.92-5.03,1.17-111.69,27.37-40.47,36.49,31.23,4.09,92.86,3.04,150.17-1.05,45.03-4.09,90.06-11.81,93.68-12.4-1.87.82-17.19,7.6-27.95,14.5-115.79,30.29-338,16.72-274.26-14.62Z" fill="#ED8B00" />
    <path d="M113.75,595.7c-90.76-14.62,44.91-65.73,68.89-49,0,0-7.37,0-20.93,3.16-13.33,2.11-55.09,15.67-33.22,25.03,62.69,27.13,285.84,20.82,355.78,0,34.74-10.64,22.22-23.86,20.23-25.85,62.81,29.24-142.22,87.25-390.75,46.67Z" fill="#ED8B00" />
    <path d="M453.86,143.08c-135.32,78.13-110.29,101.05-77.89,148.07,34.27,47.48-36.96,86.08-41.52,88.42,3.04-2.57,36.96-32.63,8.07-65.5-99.65-114.97,101.05-168.42,111.34-170.99Z" fill="#ED8B00" />
    <path d="M248.49,516.41c49,6.32,75.09,5.26,129.35-5.15,10.88,6.67,22.46,12.28,34.39,16.72-121.99,52.16-276.49-3.16-180.46-30.29,0,0-23.98,14.62,16.72,18.71Z" fill="#ED8B00" />
    <path d="M241.24,213.96c42.69-64.68,160.58-95.79,134.5-199.29,0,0,64.68,65.73-61.52,164.79-101.17,80.35-22.92,126.31,0,178.48-59.41-53.22-102.22-100.23-72.98-143.97Z" fill="#ED8B00" />
    <path d="M422.75,461.2c-147.13,43.74-311.92,4.21-206.54-31.34,0,0-26.08,19.88,14.62,23.98,53.1,5.26,94.85,6.32,166.9-8.3,7.02,7.13,15.55,12.51,25.03,15.67Z" fill="#ED8B00" />
    <path d="M471.52,360.97c-9.36,2.11-13.57,4.21-13.57,4.21,0,0,3.16-6.2,10.41-8.3,74.15-26.08,132.51,78.24-23.98,118.83,0,0,1.05-.94,2.11-3.04,116.84-60.58,62.57-118.94,25.03-111.69Z" fill="#ED8B00" />
    <path d="M543.57,580.03c-4.21,53.22-176.37,64.68-289,57.43-74.03-4.21-88.65-16.72-88.65-16.72,69.94,11.46,188.77,13.57,284.79-4.21,84.56-15.56,92.86-36.49,92.86-36.49Z" fill="#ED8B00" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 667.17 686.54" fill="#2E54D1" xmlns="http://www.w3.org/2000/svg">
    <path d="M487.15,376.76c15.51,18.63,23.26,41.4,23.26,68.32,0,24.54-6.35,46.35-19.06,65.41-12.7,19.05-29.77,34.61-51.19,46.67-21.43,12.06-45.17,19.71-71.23,22.94v65.89h-53.94v-65.89c-21.75-2.59-42.21-8.08-61.37-16.48-19.17-8.4-35.81-19.38-49.91-32.95-14.11-13.56-24.5-29.39-31.17-47.48l73.97-27.13c3.01,8.61,9.15,16.47,18.41,23.58,9.26,7.1,20.56,12.81,33.92,17.12,13.35,4.31,27.67,6.46,42.96,6.46s30.41-2.42,44.09-7.27c13.67-4.84,24.71-11.63,33.11-20.35,8.4-8.72,12.6-18.9,12.6-30.52s-4.42-21.59-13.25-29.24c-8.83-7.64-20.13-13.73-33.91-18.25-13.79-4.52-28-7.96-42.64-10.33-32.09-4.96-60.84-12.6-86.25-22.94-25.41-10.33-45.49-24.65-60.24-42.96-14.75-18.3-22.12-41.99-22.12-71.06,0-24.55,6.4-46.41,19.21-65.57,12.81-19.17,29.93-34.73,51.36-46.68,21.43-11.95,45.17-19.54,71.23-22.77V49.06h53.94v66.22c21.32,2.58,41.56,8.07,60.73,16.47,19.16,8.4,35.9,19.44,50.23,33.11,14.32,13.68,24.81,29.67,31.49,47.97l-74.29,26.81c-3.02-8.61-9.16-16.48-18.41-23.58-9.26-7.11-20.57-12.76-33.92-16.96-13.36-4.2-27.67-6.3-42.96-6.3-15.29-.21-29.77,2.21-43.45,7.27-13.67,5.06-24.82,11.9-33.43,20.51-8.61,8.62-12.92,18.52-12.92,29.72,0,14.43,4.04,25.3,12.11,32.62,8.08,7.33,18.9,12.65,32.47,15.99,13.56,3.34,28.63,6.41,45.22,9.21,30.15,4.74,58.03,12.71,83.66,23.9,25.62,11.2,46.19,26.11,61.69,44.74Z" />
  </svg>
);

// Icon groups for left and right sides
const LEFT_ICONS = [
  { Icon: JSIcon, x: "125px", bottom: "20px", size: 200, delay: 0 },
  { Icon: PythonIcon, x: "145px", bottom: "20px", size: 200, delay: 0.15 },
  { Icon: DollarIcon, x: "165px", bottom: "20px", size: 200, delay: 0.3 },
];

const RIGHT_ICONS = [
  { Icon: JSIcon, x: "125px", bottom: "20px", size: 200, delay: 0.05 },
  { Icon: PythonIcon, x: "145px", bottom: "20px", size: 200, delay: 0.2 },
  { Icon: DollarIcon, x: "165px", bottom: "20px", size: 200, delay: 0.35 },
];

export default function HeroV2() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const [ambientOneRef, ambientOneOffset] = useParallax(0.15);
  const [ambientTwoRef, ambientTwoOffset] = useParallax(-0.1);
  const [gridRef, gridOffset] = useParallax(0.05);

  // Custom parallax hook (simplified from original)
  function useParallax(speed = 0.3) {
    const [offset, setOffset] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
      if (reduceMotion) return;
      const element = ref.current;
      if (!element) return;

      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const distance = (elementCenter - viewportCenter) / viewportHeight;
            const clampedDistance = Math.max(-1.5, Math.min(1.5, distance));
            setOffset(clampedDistance * speed * 100);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, [speed, reduceMotion]);

    return [ref, offset];
  }

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero-v2 scroll-section scroll-section--full scroll-driven-hero"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image Layer */}
      <div className="hero-v2__bg" aria-hidden="true">
        <div className="hero-v2__bg-gradient" />
        <div className="hero-v2__bg-pattern" />
      </div>

      {/* Floating Ambient Orbs */}
      <div
        ref={ambientOneRef}
        className="hero-v2__ambient hero-v2__ambient--one"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${ambientOneOffset}px, 0) scale(1)` }}
      />
      <div
        ref={ambientTwoRef}
        className="hero-v2__ambient hero-v2__ambient--two"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${ambientTwoOffset}px, 0) scale(1)` }}
      />

      {/* Floating SVG Icons - Left Side */}
      <div className="hero-v2__icons hero-v2__icons--left" aria-hidden="true">
        {LEFT_ICONS.map(({ Icon, x, bottom, size, delay }, i) => (
          <AnimatedSVGIcon
            key={`left-${i}`}
            style={{
              left: x,
              bottom: bottom,
              width: size,
              height: size,
              opacity: 0,
            }}
            delay={delay + 1.2}
          >
            <Icon />
          </AnimatedSVGIcon>
        ))}
      </div>

      {/* Floating SVG Icons - Right Side */}
      <div className="hero-v2__icons hero-v2__icons--right" aria-hidden="true">
        {RIGHT_ICONS.map(({ Icon, x, bottom, size, delay }, i) => (
          <AnimatedSVGIcon
            key={`right-${i}`}
            style={{
              right: x,
              bottom: bottom,
              width: size,
              height: size,
              opacity: 0,
            }}
            delay={delay + 1.2}
          >
            <Icon />
          </AnimatedSVGIcon>
        ))}
      </div>

      {/* Main Content */}
      <div className="container hero-v2__inner">
        <div className="hero-v2__content">
          {/* Overline */}
          <motion.span
            className="overline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            {heroCopy.overline}
          </motion.span>

          {/* Name with ClipPathReveal */}
          <h1 className="hero-v2__name">
            <span className="hero-v2__name-line-wrap">
              <ClipPathReveal
                as="span"
                className="hero-v2__name-line"
                direction="left-to-right"
                delay={0.3}
                duration={0.8}
              >
                UMANG
              </ClipPathReveal>
            </span>
            <span className="hero-v2__name-line-wrap">
              <ClipPathReveal
                as="span"
                className="hero-v2__name-line"
                direction="left-to-right"
                delay={0.5}
                duration={0.8}
              >
                PAWAR
              </ClipPathReveal>
            </span>
          </h1>

          {/* Positioning with ClipPathLines */}
          <ClipPathReveal
            as="p"
            className="hero-v2__positioning"
            delay={0.8}
            duration={0.6}
          >
            {heroCopy.positioning.split("\n").map((line) => (
              <span key={line}>{line}<br /></span>
            ))}
          </ClipPathReveal>

          {/* Description */}
          <motion.p
            className="hero-v2__description"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
          >
            {heroCopy.description}
          </motion.p>

          {/* CTAs */}
          <div className="hero-v2__ctas">
            <motion.a
              href="#finsight"
              className="btn btn--primary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
              onClick={(e) => { e.preventDefault(); scrollToSection("#finsight"); }}
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

          {/* Social Links */}
          <motion.div
            className="hero-v2__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.4, ease: "easeOut" }}
          >
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={16} /> GitHub
            </a>
            {profile.linkedin ? (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} /> LinkedIn
              </a>
            ) : null}
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={16} /> Email
            </a>
          </motion.div>
        </div>

        {/* Visual Grid */}
        <motion.div
          className="hero-v2__visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div
            ref={gridRef}
            className="hero-v2__grid"
            style={{ transform: `translate3d(0, ${gridOffset}px, 0)` }}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${(i % 8) * 0.15}s` }} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#intro"
        className="hero-v2__scroll-cue mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, delay: 1.7, repeat: Infinity, ease: "easeInOut" }}
        onClick={(e) => { e.preventDefault(); scrollToSection("#intro"); }}
      >
        <ArrowDown size={14} style={{ transform: "rotate(180deg)" }} />
        <span>SCROLL</span>
      </motion.a>
    </section>
  );
}