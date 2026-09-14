import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { journey } from "../data/content";

export default function Journey() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Height based on number of cards — more cards = more scroll room
  const totalCards = journey.length;
  const heightVh = Math.max(300, totalCards * 60);

  return (
    <section
      ref={targetRef}
      id="journey"
      style={{
        height: `${heightVh}vh`,
        position: "relative",
        background: "var(--bg-primary)"
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* Subtle ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vh",
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: "none"
          }}
        />

        <motion.div
          style={{
            "--scroll-p": progress,
            transform: "translateX(calc(var(--scroll-p) * (100vw - 100%)))",
            display: "flex",
            alignItems: "center",
            gap: "clamp(3rem, 6vw, 8rem)",
            paddingLeft: "clamp(2rem, 5vw, 4rem)",
            paddingRight: "clamp(2rem, 5vw, 4rem)",
            width: "max-content",
            zIndex: 1
          }}
        >
          {/* Section Header */}
          <div style={{
            width: "clamp(300px, 38vw, 560px)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            flexShrink: 0
          }}>
            <span className="overline" style={{ color: "var(--accent-primary)" }}>THE LONG VERSION</span>
            <h2 className="section-heading" style={{
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              color: "var(--text-primary)",
              lineHeight: 1.05,
              marginTop: "0"
            }}>
              Let's take it<br/>
              <span style={{ color: "var(--accent-primary)" }}>back.</span>
            </h2>
            <p style={{
              fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "420px",
              marginTop: "0.5rem"
            }}>
              Every line of code, every shipped product, every late night — this is how it happened.
            </p>
          </div>

          {/* Journey Cards */}
          {journey.map((entry, i) => (
            <JourneyCard key={`${entry.year}-${i}`} entry={entry} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function JourneyCard({ entry, index }) {
  // Alternate between cards shifting up and down for an editorial staggered feel
  const yOffsets = [15, -20, 25, -10, 20, -15, 10, -25, 15, -10, 20, -5];
  const yOff = yOffsets[index % yOffsets.length];

  // Alternate card orientations — year block on top or bottom
  const flip = index % 2 === 0;

  return (
    <div
      style={{
        width: "clamp(280px, 28vw, 380px)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        transform: `translateY(${yOff}px)`,
        position: "relative",
      }}
    >
      {/* Year tag — accent blue pill */}
      <div style={{
        background: "var(--accent-primary)",
        color: "#fff",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        fontWeight: "700",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.45rem 1rem",
        display: "inline-block",
        alignSelf: flip ? "flex-start" : "flex-end",
        transform: flip ? "rotate(-1.5deg) translateY(4px)" : "rotate(1.5deg) translateY(4px)",
        zIndex: 2,
        position: "relative",
        boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
      }}>
        {entry.year}
      </div>

      {/* Card body — dark with border */}
      <div style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "clamp(1.25rem, 2vw, 1.75rem)",
        position: "relative",
        zIndex: 1,
        boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
        transition: "border-color 0.2s ease"
      }}>
        {/* Subtle index number */}
        <span style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--accent-primary)",
          letterSpacing: "0.08em",
          marginBottom: "0.75rem",
          opacity: 0.7
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.925rem, 1vw, 1rem)",
          color: "var(--text-primary)",
          lineHeight: 1.65,
          fontWeight: "400",
          margin: 0
        }}>
          {entry.text}
        </p>
      </div>
    </div>
  );
}
