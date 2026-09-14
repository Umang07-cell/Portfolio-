import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { journey } from "../data/content";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";

const cinematicCardMilestones = [
  { year: "2022", text: journey[0].text },
  { year: "2022", text: journey[1].text },
  { year: "2025", text: journey[2].text },
  { year: "2025", text: journey[3].text },
  { year: "2025", text: journey[4].text },
  { year: "2025", text: journey[5].text },
  { year: "2026", text: journey[6].text },
  { year: "2026", text: journey[7].text },
  { year: "2026", text: journey[8].text },
  { year: "2026", text: journey[9].text },
  { year: "2026", text: journey[10].text },
  { year: "2026", text: journey[11].text },
  { year: "2026", text: journey[12].text },
];

// ---------------------------------------------------------------------------
// CinematicCard — wraps a single timeline row.
// Each card uses useScroll (per-card target) to drive blur → focus /
// distorted → clean transforms tied directly to scroll position.
// ---------------------------------------------------------------------------
function CinematicCard({ entry, index }) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const isLeft  = index % 2 === 0;

  // Measure scroll progress as this card crosses into the comfortable reading zone.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.92", "start 0.45"],
  });

  // Raw scroll-linked values:
  //   opacity  0.25 → 1     (starts barely visible, resolves fully)
  //   y         30 → 0      (gentle lift — not a big bounce)
  //   blur       6 → 0      (soft-to-sharp GPU filter)
  //   scale   0.96 → 1      (subtle size resolution)
  //   scaleX  0.97 → 1      (very slight horizontal squeeze releasing)
  //   x      ±18 → 0        (direction-aware horizontal entry)
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const rawY       = useTransform(scrollYProgress, [0, 1], [30,   0]);
  const rawBlur    = useTransform(scrollYProgress, [0, 1], [6,    0]);
  const rawScale   = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const rawScaleX  = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const rawX       = useTransform(scrollYProgress, [0, 1], [isLeft ? -18 : 18, 0]);

  // Spring smoothing — organic feel, no jitter on fast scroll.
  const springCfg  = { stiffness: 55, damping: 17, restDelta: 0.001 };
  const opacity    = useSpring(rawOpacity, springCfg);
  const y          = useSpring(rawY,       springCfg);
  const scale      = useSpring(rawScale,   springCfg);
  const scaleX     = useSpring(rawScaleX,  springCfg);
  const x          = useSpring(rawX,       springCfg);
  const blurSpring = useSpring(rawBlur,    springCfg);

  // Compose filter string from sprung number — hoisted to satisfy Rules of Hooks.
  const filter = useTransform(blurSpring, (v) => `blur(${v.toFixed(2)}px)`);

  // Card visual constants (unchanged from original design)
  const flip     = isLeft;
  const box1Rot  = index % 2 === 0 ? -2   : 1.5;
  const box2Rot  = index % 2 === 0 ?  1.5 : -1.5;
  const yOffsets = [20, -10, 30, 0, 15, -5];

  const cardInner = (
    <TimelineCardInner
      entry={entry}
      index={index}
      flip={flip}
      box1Rot={box1Rot}
      box2Rot={box2Rot}
      yOffsets={yOffsets}
    />
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "clamp(1rem, 2vw, 2rem)",
  };

  // Reduced-motion: render static, perfectly clean layout, no transforms.
  if (reduceMotion) {
    return (
      <div ref={cardRef} style={gridStyle}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {isLeft && cardInner}
        </div>
        <CenterDot />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {!isLeft && cardInner}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        ...gridStyle,
        // All transforms are scroll-progress-linked via spring
        opacity,
        y,
        x,
        scale,
        scaleX,
        filter,
        willChange: "transform, opacity, filter",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {isLeft && cardInner}
      </div>
      <CenterDot />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        {!isLeft && cardInner}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CenterDot — the spine dot (design unchanged, extracted for reuse).
// ---------------------------------------------------------------------------
function CenterDot() {
  return (
    <div style={{
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "var(--accent-primary)",
      border: "3px solid var(--bg-primary)",
      boxShadow: "0 0 0 1px var(--accent-primary)",
      flexShrink: 0,
      zIndex: 1,
    }} />
  );
}

// ---------------------------------------------------------------------------
// TimelineCardInner — the visual card (design 100% unchanged from original).
// ---------------------------------------------------------------------------
function TimelineCardInner({ entry, index, flip, box1Rot, box2Rot, yOffsets }) {
  return (
    <div style={{
      maxWidth: "clamp(260px, 40vw, 480px)",
      display: "flex",
      flexDirection: "column",
      gap: 0,
      transform: `translateY(${yOffsets[index % yOffsets.length]}px)`,
    }}>
      {/* Blue year pill */}
      <div style={{
        background: "var(--accent-primary)",
        color: "#fff",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.45rem 1.05rem",
        display: "inline-block",
        alignSelf: flip ? "flex-start" : "flex-end",
        transform: flip ? "rotate(-1.5deg) translateY(4px)" : "rotate(1.5deg) translateY(4px)",
        zIndex: 4,
        position: "relative",
        boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
      }}>
        {entry.year}
      </div>

      {/* Card body */}
      <div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "clamp(1rem, 1.5vw, 1.5rem)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
        position: "relative",
        zIndex: 1,
      }}>
        <span style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--accent-primary)",
          letterSpacing: "0.1em",
          marginBottom: "0.6rem",
          opacity: 0.6,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.875rem, 0.9vw, 0.95rem)",
          color: "var(--text-primary)",
          lineHeight: 1.65,
          margin: 0,
        }}>
          {entry.text}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TimelineV2 — main export.
// Header restored to original whileInView. Cards use cinematic scroll reveal.
// ---------------------------------------------------------------------------
function TimelineV2CinematicCards() {
  return (
    <section id="timeline" className="scroll-section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">

        {/* Header — ORIGINAL animation, completely unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
        >
          <span className="overline" style={{ color: "var(--accent-primary)" }}>THE LONG VERSION</span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            margin: "0.5rem 0 0",
          }}>
            Let&apos;s take it<br />
            <span style={{ color: "var(--accent-primary)" }}>back.</span>
          </h2>
        </motion.div>

        {/* Timeline Track */}
        <div style={{ position: "relative" }}>
          {/* Vertical spine line */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "var(--border-subtle)",
            transform: "translateX(-50%)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {cinematicCardMilestones.map((m, i) => (
              <CinematicCard key={i} entry={m} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


const milestones = [
  { year: "2022", text: journey[0].text },
  { year: "2022", text: journey[1].text },
  { year: "2025", text: journey[2].text },
  { year: "2025", text: journey[3].text },
  { year: "2025", text: journey[4].text },
  { year: "2025", text: journey[5].text },
  { year: "2026", text: journey[6].text },
  { year: "2026", text: journey[7].text },
  { year: "2026", text: journey[8].text },
  { year: "2026", text: journey[9].text },
  { year: "2026", text: journey[10].text },
  { year: "2026", text: journey[11].text },
  { year: "2026", text: journey[12].text },
];

const CURVED_ROUTE = "M80 0 L80 1000";

function useSvgPathSampler(pathString, numSamples = 1000) {
  const [sampler, setSampler] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let pathNode = document.getElementById("timeline-hidden-path");
    let svg = null;
    if (!pathNode) {
       svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
       svg.style.position = "absolute";
       svg.style.width = "0";
       svg.style.height = "0";
       svg.style.pointerEvents = "none";
       svg.style.opacity = "0";
       
       pathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
       pathNode.id = "timeline-hidden-path";
       pathNode.setAttribute("d", pathString);
       
       svg.appendChild(pathNode);
       document.body.appendChild(svg);
    }
    
    const length = pathNode.getTotalLength();
    const samples = [];
    
    for (let i = 0; i <= numSamples; i++) {
      const point = pathNode.getPointAtLength((i / numSamples) * length);
      samples.push({ x: point.x, y: point.y });
    }
    
    if (svg) {
      document.body.removeChild(svg);
    }
    
    const getXForY = (targetY) => {
      let closest = samples[0];
      let minDiff = Math.abs(samples[0].y - targetY);
      
      for (let i = 1; i < samples.length; i++) {
        const diff = Math.abs(samples[i].y - targetY);
        if (diff < minDiff) {
          minDiff = diff;
          closest = samples[i];
        }
      }
      return closest.x;
    };
    
    setSampler(() => getXForY);
  }, [pathString, numSamples]);

  return sampler;
}

// ---------------------------------------------------------------------------
// CinematicWord — a single word that resolves from distortion as the section
// enters the viewport. All transforms are scroll-progress-driven via Framer
// Motion so the user literally "pulls" the text into focus.
// ---------------------------------------------------------------------------
function CinematicWord({ children, scrollProgress, inputRange, isAccent = false, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  // Each word receives its own slightly offset input range to create stagger
  const start = inputRange[0] + delay;
  const end   = inputRange[1] + delay;

  // Core distortion → resolution transforms
  const rawOpacity      = useTransform(scrollProgress, [start, end], [0.3,  1.0]);
  const rawY            = useTransform(scrollProgress, [start, end], [28,   0]);
  const rawBlur         = useTransform(scrollProgress, [start, end], [6,    0]);
  const rawScale        = useTransform(scrollProgress, [start, end], [0.96, 1]);
  const rawScaleX       = useTransform(scrollProgress, [start, end], [0.97, 1]);
  const rawLetterSpacing= useTransform(scrollProgress, [start, end], [0.04, 0]);

  // Gentle spring smoothing — keeps animation jitter-free even with fast scrolling
  const springConfig = { stiffness: 60, damping: 18, restDelta: 0.001 };
  const opacity       = useSpring(rawOpacity,       springConfig);
  const y             = useSpring(rawY,             springConfig);
  const scale         = useSpring(rawScale,         springConfig);
  const scaleX        = useSpring(rawScaleX,        springConfig);
  const letterSpacing = useSpring(rawLetterSpacing, springConfig);

  // Build blur as a derived string — we can't spring a string directly, so we
  // spring the numeric value and compose the filter string.
  const blurNum = useSpring(rawBlur, springConfig);
  // Hoisted above any early returns to satisfy Rules of Hooks
  const filter = useTransform(blurNum, (v) => `blur(${v.toFixed(2)}px)`);

  // For reduced-motion users — render static, clean, perfectly visible text
  if (reduceMotion) {
    return (
      <span style={{
        display: "inline-block",
        color: isAccent ? "var(--accent-primary)" : "inherit",
        willChange: "auto",
      }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      style={{
        display: "inline-block",
        opacity,
        y,
        scale,
        scaleX,
        letterSpacing,
        filter,
        color: isAccent ? "var(--accent-primary)" : "inherit",
        // Ensure GPU-composited path — avoids layout reflows
        willChange: "transform, opacity, filter",
        transformOrigin: "left center",
      }}
    >
      {children}
    </motion.span>
  );
}

// ---------------------------------------------------------------------------
// CinematicHeading — measures its own scroll entry and drives each word's
// distortion independently with a tiny stagger between word groups.
// ---------------------------------------------------------------------------
function CinematicHeading() {
  const headingRef = useRef(null);

  // We track when the heading enters the viewport.
  // offset: ["0.6 1", "0.95 1"] means: start resolving when heading bottom
  // edge crosses 60% from the top of the viewport, finish when it hits 95%.
  // This places the animation squarely in the "just entering" moment so the
  // user feels their scroll is bringing the text into focus.
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["0.5 1", "1 0.8"],
  });

  // Stagger offsets per word group — small enough to feel unified
  // Group 0 → resolves first, Group 1 → resolves ~60ms later
  const STAGGER_STEP = 0.06; // fractional scroll units (≈60-80ms at normal scroll speed)

  const h2Style = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
    lineHeight: 1.05,
    color: "var(--text-primary)",
    margin: "0.5rem 0 0",
    // Prevent any layout shift from the inline-block children
    overflow: "visible",
  };

  return (
    <h2 ref={headingRef} style={h2Style}>
      {/* Line 1: "Let's take it" — resolves first */}
      <CinematicWord
        scrollProgress={scrollYProgress}
        inputRange={[0, 0.55]}
        delay={0}
      >
        Let&apos;s&nbsp;take&nbsp;it
      </CinematicWord>
      <br />
      {/* Line 2: "back." (accent color) — resolves second with slight stagger */}
      <CinematicWord
        scrollProgress={scrollYProgress}
        inputRange={[0, 0.55]}
        delay={STAGGER_STEP}
        isAccent={true}
      >
        back.
      </CinematicWord>
    </h2>
  );
}

function TimelineMarker({ progress, index, total, isLeft, sampler }) {
  const stop = total > 1 ? index / (total - 1) : 0;
  
  // Keep the subtle arrival glow behind the dot when the car is passing
  const arrival = useTransform(progress, [stop - 0.025, stop, stop + 0.035], [0, 1, 0]);
  const glow = useTransform(arrival, (value) => `0 0 0 1px #e84a50, 0 0 ${8 + value * 20}px rgba(232, 74, 80, ${0.2 + value * 0.55})`);

  const yInViewBox = stop * 1000;
  const roadX = sampler ? sampler(yInViewBox) : 80;
  
  // Increased distance from the road (previously 34, now 64)
  const sideOffset = isLeft ? -64 : 64;
  const markerX = (roadX - 80) + sideOffset;
  const lineWidth = isLeft
    ? `calc(120px + ${markerX}px + clamp(1rem, 2vw, 2rem))`
    : `calc(120px - ${markerX}px + clamp(1rem, 2vw, 2rem))`;

  return (
    <div style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifySelf: "center",
      transform: `translateX(${markerX}px)`,
      zIndex: 2,
    }}>
      {/* Subtle connector line linking to the card */}
      <div style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "right" : "left"]: "50%",
        width: lineWidth,
        height: "1px",
        background: "var(--border-subtle)",
        zIndex: -1,
      }} />
      
      {/* The original red dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "0px 0px -15% 0px" }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#e84a50",
          border: "3px solid var(--bg-primary)",
          boxShadow: glow,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function JourneyCar({ isDriving }) {
  return (
    <div aria-hidden="true" style={{ position: "relative", width: "26px", height: "39px" }}>
      {/* These sit at the vehicle's rear; rotating the car on reverse also
          correctly moves the smoke to the other side. */}
      {[[8, 38, 10], [10, 49, 8], [7, 60, 7], [11, 71, 5]].map(([left, top, size], index) => (
        <motion.span
          key={index}
          animate={{
            opacity: isDriving ? [0.2, 0.68, 0.38] : 0,
            scale: isDriving ? [0.72, 1.35, 1.7] : 0.6,
          }}
          transition={{ duration: 0.48, delay: index * 0.045, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: `${left}px`,
            top: `${top}px`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: "rgba(225, 227, 232, 0.78)",
            filter: "blur(2.5px)",
          }}
        />
      ))}
      <img
        src="/assets/timeline-car.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.45))",
        }}
      />
    </div>
  );
}

export default function TimelineV2() {
  const reduceMotion = useReducedMotion();
  const [isReversing, setIsReversing] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const lastScrollProgress = useRef(0);
  const reverseState = useRef(false);
  const driveTimer = useRef(null);
  const timelineRef = useRef(null);
  
  const sampler = useSvgPathSampler(CURVED_ROUTE);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 82%", "end 68%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIsReversing = latest < lastScrollProgress.current;
    if (nextIsReversing !== reverseState.current) {
      reverseState.current = nextIsReversing;
      setIsReversing(nextIsReversing);
    }
    if (Math.abs(latest - lastScrollProgress.current) > 0.0002) {
      setIsDriving(true);
      clearTimeout(driveTimer.current);
      driveTimer.current = setTimeout(() => setIsDriving(false), 180);
    }
    lastScrollProgress.current = latest;
  });
  const storyProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });
  const carY = useTransform(storyProgress, [0, 1], ["0%", "100%"]);
  
  const carX = useTransform(storyProgress, (value) => {
    if (!sampler) return 0;
    return sampler(value * 1000) - 80;
  });
  const carGlowStops = milestones.flatMap((_, index) => {
    const stop = index / (milestones.length - 1);
    return [stop - 0.025, stop, stop + 0.035];
  });
  const carGlowStrength = useTransform(
    storyProgress,
    carGlowStops,
    milestones.flatMap(() => [0.4, 1, 0.4]),
  );
  const carGlow = useTransform(
    carGlowStrength,
    (value) => `0 0 0 2px rgba(232, 74, 80, ${0.2 + value * 0.3}), 0 0 ${12 + value * 22}px rgba(232, 74, 80, ${0.2 + value * 0.45})`,
  );

  return (
    <section id="timeline" className="scroll-section" style={{ background: "var(--bg-primary)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <ScrollScaleTitle lines={["Let's take it", "back."]} />
        </div>

        {/* Timeline Track */}
        <div ref={timelineRef} style={{ position: "relative" }}>
          {/* A gently winding road anchors the story; the car, not a progress line, tracks the scroll. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 160 1000"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "160px",
              height: "100%",
              transform: "translateX(-50%)",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            <path
              d={CURVED_ROUTE}
              fill="none"
              stroke="#e7e7ea"
              strokeWidth="40"
              strokeLinecap="butt"
            />
            <path
              d={CURVED_ROUTE}
              fill="none"
              stroke="#36373d"
              strokeWidth="32"
              strokeLinecap="butt"
            />
            <path
              d={CURVED_ROUTE}
              fill="none"
              stroke="#f3f3f5"
              strokeWidth="2"
              strokeDasharray="14 16"
              strokeLinecap="butt"
            />
          </svg>
          <motion.div
            aria-label="Journey progress"
            animate={{ rotate: isReversing ? 0 : 180 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: reduceMotion ? "100%" : carY,
              marginLeft: "-14px",
              marginTop: "-21px",
              x: reduceMotion ? 0 : carX,
              width: "28px",
              height: "42px",
              display: "grid",
              placeItems: "center",
              borderRadius: "0",
              background: "transparent",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            <JourneyCar isDriving={isDriving} />
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) 240px minmax(0, 1fr)",
                    alignItems: "center",
                    gap: "clamp(1rem, 2vw, 2rem)"
                  }}
                >
                  {/* Left slot */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: -40, y: 18, scale: 0.97, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: false, margin: "0px 0px -15% 0px" }}
                        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <TimelineCard entry={m} index={i} progress={storyProgress} total={milestones.length} />
                      </motion.div>
                    )}
                  </div>

                  {/* Center dot */}
                  <TimelineMarker progress={storyProgress} index={i} total={milestones.length} isLeft={isLeft} sampler={sampler} />

                  {/* Right slot */}
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, x: 40, y: 18, scale: 0.97, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: false, margin: "0px 0px -15% 0px" }}
                        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <TimelineCard entry={m} index={i} progress={storyProgress} total={milestones.length} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function TimelineCard({ entry, index, progress, total }) {
  const flip = index % 2 === 0;
  const stop = total > 1 ? index / (total - 1) : 0;
  const arrival = useTransform(progress, [stop - 0.025, stop, stop + 0.035], [0, 1, 0]);
  const cardGlow = useTransform(arrival, (value) => `0 8px 28px rgba(0, 0, 0, 0.25), 0 0 ${value * 26}px rgba(232, 74, 80, ${value * 0.38})`);

  return (
    <div style={{
      maxWidth: "clamp(250px, 36vw, 440px)",
      display: "flex",
      flexDirection: "column",
      gap: 0
    }}>
      {/* Blue year pill */}
      <div style={{
        background: "var(--accent-primary)",
        color: "#fff",
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.52rem 1.2rem",
        display: "inline-block",
        alignSelf: flip ? "flex-start" : "flex-end",
        transform: flip ? "rotate(-1.5deg) translateY(4px)" : "rotate(1.5deg) translateY(4px)",
        zIndex: 2,
        position: "relative",
        boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
      }}>
        {entry.year}
      </div>

      {/* Card body */}
      <motion.div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "clamp(1rem, 1.5vw, 1.5rem)",
        boxShadow: cardGlow,
        position: "relative",
        zIndex: 1
      }}>
        <span style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--accent-primary)",
          letterSpacing: "0.1em",
          marginBottom: "0.6rem",
          opacity: 0.6
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.875rem, 0.9vw, 0.95rem)",
          color: "var(--text-primary)",
          lineHeight: 1.65,
          margin: 0
        }}>
          {entry.text}
        </p>
      </motion.div>
    </div>
  );
}
