import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipPathReveal } from "./ui/ClipPathReveal";
import { journey, horizontalTimeline, profile } from "../data/content";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * TimelineV2 — Vertical SVG timeline with positioned images and text cards
 * Recreates the "Let's take it back" timeline from the target site
 */
export default function TimelineV2() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Combine journey and horizontalTimeline data
  const milestones = [
    { year: "2022", text: journey[0].text, image: "editing", type: "personal" },
    { year: "2022", text: journey[1].text, image: "physics", type: "personal" },
    { year: "2023", text: journey[2].text, image: "11th", type: "achievement" },
    { year: "2023", text: journey[3].text, image: "race", type: "struggle" },
    { year: "2023", text: journey[4].text, image: "drop", type: "struggle" },
    { year: "2023", text: journey[5]?.text || "Got into IIT Jodhpur", image: "iit", type: "achievement" },
    { year: "2024", text: journey[6]?.text || "Started coding journey with chai and patience", image: "code", type: "learning" },
    { year: "2024", text: journey[7]?.text || "Explored creative sides - design, video, web, UGC", image: "creative", type: "learning" },
    { year: "2025", text: journey[8]?.text || "Built and launched EduVoyage - AI course platform", image: "eduvoyage", type: "launch" },
    { year: "2025", text: "Freelance projects and client work", image: "freelance", type: "work" },
    { year: "2026", text: journey[9]?.text || "FinSight live on Railway. AI Engineer at LanceSoft.", image: "finsight", type: "launch" },
    { year: "2026", text: "Two production systems in use by real people", image: "lancesoft", type: "work" },
  ];

  // Calculate positions along the path
  const pathPoints = [
    { x: 50, y: 100 },      // 2022 start
    { x: 278, y: 201 },     // 2022 mid
    { x: 327, y: 401 },     // 2023 start
    { x: 130, y: 799 },     // 2023 mid
    { x: 303, y: 1000 },    // 2023 late
    { x: 384, y: 1192 },    // 2023 end
    { x: 333, y: 1392 },    // 2024 start
    { x: 468, y: 1792 },    // 2024 mid
    { x: 282, y: 1992 },    // 2025 start
    { x: 430, y: 2191 },    // 2025 end
    { x: 500, y: 2400 },    // 2026 start
    { x: 350, y: 2550 },    // 2026 end
  ];

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      const container = timelineRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  // Animate SVG path drawing
  const pathLength = 3000; // Approximate path length
  const pathDraw = useTransform(scrollYProgress, [0, 1], [0, pathLength]);

  // Scroll-triggered animations for images and text
  const imageAnimations = milestones.map((_, i) => {
    const start = i / milestones.length;
    const end = start + 0.15;
    return useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  });

  const textAnimations = milestones.map((_, i) => {
    const start = i / milestones.length + 0.05;
    const end = start + 0.15;
    return useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  });

  return (
    <section id="timeline" className="timeline-v2 scroll-section" ref={timelineRef}>
      <div className="timeline-v2__bg-gradient" aria-hidden="true" />

      {/* Title */}
      <div className="timeline-v2__intro">
        <ClipPathReveal
          direction="left-to-right"
          className="timeline-v2__title"
          as="h2"
          delay={0.1}
          duration={0.8}
        >
          Let's take it back.
        </ClipPathReveal>
      </div>

      {/* SVG Timeline Path */}
      <div className="timeline-v2__svg-wrap">
        <svg
          ref={svgRef}
          viewBox="0 0 600 2700"
          className="timeline-v2__svg"
          aria-hidden="true"
        >
          {/* The wavy path */}
          <motion.path
            className="timeline-v2__path"
            d="M-5,0c303.3,153.3,405,303.3,305,450s-156.7,246.7-170,300c-20,66.7,36.7,150,170,250,133.3,100,117.4,455-115.9,488.4-88.3,15.5,121,58.8,158.6,80.1s-116.1,19.6-143.8,52.3,90.2,8.2,114.6,32.7-104.8,31.1-77,63.8c27.8,32.7,196.2-1.6,241.9,93.2s-336.7,14-294.2,94.8c45.8,87,287.7,148.8,243.6,299.1S-12.1,2650-12.1,2650"
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="3"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength}
            animate={{ strokeDashoffset: reduceMotion ? 0 : pathDraw }}
            transition={{ duration: reduceMotion ? 0 : 2, ease: "linear" }}
          />

          {/* Circles at milestones */}
          {pathPoints.map((point, i) => (
            <motion.circle
              key={i}
              className="timeline-v2__ball"
              cx={point.x}
              cy={point.y}
              r={10}
              fill="var(--accent-primary)"
              initial={{ scale: 0 }}
              animate={{ scale: imageAnimations[i] }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Year labels */}
          {pathPoints.map((point, i) => (
            <motion.text
              key={`year-${i}`}
              className="timeline-v2__year-label mono"
              x={point.x - 20}
              y={point.y - 25}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: textAnimations[i], x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
            >
              {milestones[i].year}
            </motion.text>
          ))}
        </svg>

        {/* Timeline Images - positioned absolutely over SVG */}
        <div className="timeline-v2__images" style={{ width: dimensions.width, height: dimensions.height }}>
          {milestones.map((milestone, i) => {
            const point = pathPoints[i];
            if (!point) return null;

            // Convert SVG coordinates to percentage for responsive positioning
            const xPercent = (point.x / 600) * 100;
            const yPercent = (point.y / 2700) * 100;

            const rotations = [6, -3, 3, -5, 5, -6, 6, -3, 5, -5, 6, -6];

            return (
              <motion.div
                key={milestone.image}
                className="timeline-v2__image-wrapper"
                style={{
                  left: `calc(${xPercent}% - 75px)`,
                  top: `calc(${yPercent}% - 75px)`,
                }}
                initial={{ opacity: 0, rotate: rotations[i] }}
                animate={{
                  opacity: reduceMotion ? 1 : imageAnimations[i],
                  rotate: reduceMotion ? 0 : rotations[i],
                }}
                transition={{ duration: 0.6, delay: i * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="timeline-v2__image-placeholder">
                  <span className="timeline-v2__image-icon">{getImageIcon(milestone.image)}</span>
                  <span className="timeline-v2__image-label">{milestone.image}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Text Cards */}
        <div className="timeline-v2__text-cards" style={{ width: dimensions.width, height: dimensions.height }}>
          {milestones.map((milestone, i) => {
            const point = pathPoints[i];
            if (!point) return null;

            const xPercent = (point.x / 600) * 100;
            const yPercent = (point.y / 2700) * 100;

            // Alternate left/right positioning
            const isLeft = i % 2 === 0;
            const leftOffset = isLeft ? -320 : 20;

            return (
              <motion.div
                key={`text-${i}`}
                className={`timeline-v2__text-card ${isLeft ? "left" : "right"}`}
                style={{
                  left: `calc(${xPercent}% + ${leftOffset}px)`,
                  top: `calc(${yPercent}% - 60px)`,
                  maxWidth: "280px",
                }}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{
                  opacity: reduceMotion ? 1 : textAnimations[i],
                  x: 0,
                }}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="timeline-v2__text-year mono">{milestone.year}</span>
                <p className="timeline-v2__text-content">{milestone.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Helper to get icon for each image type
function getImageIcon(imageType) {
  const icons = {
    editing: "🎬",
    physics: "⚛️",
    "11th": "📚",
    race: "🏃",
    drop: "☕",
    iit: "🎓",
    code: "💻",
    creative: "🎨",
    eduvoyage: "🚀",
    freelance: "💼",
    finsight: "📈",
    lancesoft: "🏢",
  };
  return icons[imageType] || "📌";
}