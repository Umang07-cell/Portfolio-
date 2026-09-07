import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { challenges } from "../data/content";

export default function Challenges() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // We map scroll progress to a raw decimal 0 to 1
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={targetRef} 
      id="challenges" 
      style={{ 
        height: "400vh", 
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
        {/* Background Ambient Glow */}
        <div 
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            height: "80vh",
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)",
            opacity: 0.6,
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
            gap: "clamp(4rem, 8vw, 10rem)",
            paddingLeft: "clamp(2rem, 5vw, 4rem)",
            // We add padding on the right to ensure the final card doesn't touch the very edge of the screen
            paddingRight: "clamp(2rem, 5vw, 4rem)",
            width: "max-content",
            zIndex: 1
          }}
        >
          {/* Header Area that scrolls along with the cards */}
          <div style={{ 
            width: "clamp(320px, 40vw, 600px)", 
            display: "flex", 
            flexDirection: "column", 
            gap: "var(--space-4)",
            flexShrink: 0
          }}>
            <span className="overline" style={{ color: "var(--accent-primary)" }}>CHALLENGES</span>
            <h2 className="section-heading" style={{ 
              fontSize: "clamp(3.5rem, 7vw, 6rem)", 
              color: "var(--text-primary)",
              lineHeight: 1.05,
              marginTop: "0"
            }}>
              What keeps me<br/>up at night.
            </h2>
            <p className="section-subheading" style={{ marginTop: "1.5rem", maxWidth: "450px", fontSize: "clamp(1.125rem, 1.5vw, 1.25rem)" }}>
              Building AI that works in the real world means confronting these core engineering problems daily. It's not just about the prompt.
            </p>
          </div>

          {/* Challenge Cards */}
          {challenges.map((challenge, i) => (
            <ChallengeCard key={challenge.title} challenge={challenge} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ChallengeCard({ challenge, index }) {
  const yOffsets = [20, -10, 30, 0, 15, -5];

  // Alternating inner rotations for the blue vs cream boxes to make them look deliberately offset
  const box1Rot = index % 2 === 0 ? -2 : 1.5;
  const box2Rot = index % 2 === 0 ? 1.5 : -1.5;

  return (
    <div
      style={{
        width: "clamp(340px, 45vw, 650px)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transform: `translateY(${yOffsets[index % yOffsets.length]}px)`,
        position: "relative",
      }}
    >
      {/* Top Blue Box */}
      <div style={{
        background: "var(--accent-primary)",
        color: "var(--text-primary)",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        transform: `rotate(${box1Rot}deg)`,
        position: "relative",
        zIndex: 2,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>
        <h3 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)", 
          fontWeight: "600", 
          lineHeight: "1.3",
        }}>
          Challenge #{index + 1}: {challenge.title}
        </h3>
      </div>

      {/* Bottom Cream Box */}
      <div style={{
        background: "#e3e0ce", // Warm cream/beige color matching the reference
        color: "#111",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        transform: `rotate(${box2Rot}deg)`,
        marginTop: "-1rem", // Overlap slightly under the blue box
        marginLeft: "1.5rem", // Offset to the right
        marginRight: "-1.5rem", // Compensate width
        position: "relative",
        zIndex: 1,
        border: "2px solid #111",
        boxShadow: "0 15px 40px rgba(0,0,0,0.4)"
      }}>
        <p style={{ 
          fontFamily: "var(--font-body)",
          fontSize: "clamp(1rem, 1.25vw, 1.125rem)", 
          lineHeight: "1.6", 
          fontWeight: "500"
        }}>
          <span style={{ fontWeight: "700" }}>Approach:</span> {challenge.detail}
        </p>
      </div>
    </div>
  );
}
