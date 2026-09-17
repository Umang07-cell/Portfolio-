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
      className="challenges-section"
    >
      <div className="challenges-sticky-container">
        {/* Background Ambient Glow */}
        <div className="challenges-ambient-glow" />

        <motion.div 
          className="challenges-track"
          style={{ 
            "--scroll-p": progress,
            transform: "translateX(calc(var(--scroll-p) * (100vw - 100%)))"
          }}
        >
          {/* Header Area that scrolls along with the cards */}
          <div className="challenges-header-area">
            <span className="overline" style={{ color: "var(--accent-primary)" }}>CHALLENGES</span>
            <h2 className="section-heading challenges-heading">
              What keeps me<br/>up at night.
            </h2>
            <p className="section-subheading challenges-subheading">
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
      className="challenge-card-container"
      style={{
        transform: `translateY(${yOffsets[index % yOffsets.length]}px)`
      }}
    >
      {/* Top Blue Box */}
      <div 
        className="challenge-card-blue"
        style={{ transform: `rotate(${box1Rot}deg)` }}
      >
        <h3 className="challenge-card-title">
          Challenge #{index + 1}: {challenge.title}
        </h3>
      </div>

      {/* Bottom Cream Box */}
      <div 
        className="challenge-card-cream"
        style={{ transform: `rotate(${box2Rot}deg)` }}
      >
        <p className="challenge-card-text">
          <span style={{ fontWeight: "700" }}>Approach:</span> {challenge.detail}
        </p>
      </div>
    </div>
  );
}
