import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * TechLogoMarquee — Infinite horizontal scrolling logo strip
 * Used in project slides for tech stack display
 */
export default function TechLogoMarquee({
  logos,
  className = "",
  speed = 50, // pixels per second
  direction = "left",
  pauseOnHover = true,
  logoWidth = 80,
  logoHeight = 50,
  gap = 24,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const [clonedLogos, setClonedLogos] = useState([]);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const positionRef = useRef(0);

  // Clone logos to fill width + buffer for seamless loop
  useEffect(() => {
    if (!logos.length) return;

    const track = trackRef.current;
    if (!track) return;

    // Calculate how many clones needed to fill viewport 2x
    const viewportWidth = track.parentElement?.offsetWidth || window.innerWidth;
    const logoTotalWidth = logoWidth + gap;
    const minClones = Math.ceil((viewportWidth * 2) / (logos.length * logoTotalWidth)) + 1;

    const cloned = [];
    for (let i = 0; i < minClones; i++) {
      cloned.push(...logos);
    }
    setClonedLogos(cloned);
  }, [logos, logoWidth, gap]);

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    if (reduceMotion || !clonedLogos.length) return;

    const track = trackRef.current;
    if (!track) return;

    let isPaused = false;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = (timestamp - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        const distance = speed * delta;
        positionRef.current += direction === "left" ? -distance : distance;

        // Reset position when one full set has scrolled
        const setWidth = logos.length * (logoWidth + gap);
        if (direction === "left") {
          if (Math.abs(positionRef.current) >= setWidth) {
            positionRef.current += setWidth;
          }
        } else {
          if (positionRef.current >= setWidth) {
            positionRef.current -= setWidth;
          }
        }

        track.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    if (pauseOnHover) {
      const container = track.parentElement;
      container?.addEventListener("mouseenter", () => { isPaused = true; });
      container?.addEventListener("mouseleave", () => { isPaused = false; });
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (pauseOnHover) {
        const container = track.parentElement;
        container?.removeEventListener("mouseenter", () => { isPaused = true; });
        container?.removeEventListener("mouseleave", () => { isPaused = false; });
      }
    };
  }, [clonedLogos, logos.length, speed, direction, pauseOnHover, logoWidth, gap, reduceMotion]);

  // Reduced motion: static display
  if (reduceMotion) {
    return (
      <div className={`tech-logo-marquee ${className}`} {...props}>
        <div className="marquee-track" style={{ display: "flex", gap, overflowX: "auto" }}>
          {logos.map((logo, i) => (
            <div key={i} className="marquee-logo" style={{ flexShrink: 0, width: logoWidth, height: logoHeight }}>
              {logo}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`tech-logo-marquee ${className}`} {...props}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: "flex",
          gap,
          willChange: "transform",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        {clonedLogos.map((logo, i) => (
          <div
            key={i}
            className="marquee-logo"
            style={{
              flexShrink: 0,
              width: logoWidth,
              height: logoHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * LogoItem — Wrapper for individual logo with consistent styling
 */
export function LogoItem({ src, alt, width = 60, height = 50, className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`marquee-logo-img ${className}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter: "grayscale(100%) opacity(0.6)",
        transition: "filter 0.3s ease",
        ...props.style,
      }}
      onMouseEnter={(e) => { e.target.style.filter = "grayscale(0%) opacity(1)"; }}
      onMouseLeave={(e) => { e.target.style.filter = "grayscale(100%) opacity(0.6)"; }}
      {...props}
    />
  );
}

/**
 * SVGLogoItem — For inline SVG logos
 */
export function SVGLogoItem({ children, width = 60, height = 50, className = "", ...props }) {
  return (
    <div className={`marquee-logo-svg ${className}`} style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center", ...props.style }} {...props}>
      {children}
    </div>
  );
}