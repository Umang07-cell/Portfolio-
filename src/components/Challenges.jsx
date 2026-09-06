import { motion } from "framer-motion";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import { challenges } from "../data/content";

export default function Challenges() {
  return (
    <section id="challenges" className="scroll-section scroll-section--animated">
      <div className="container">
        <span className="overline">CHALLENGES</span>
        <ScrollScaleTitle lines={["What keeps me", "up at night."]} align="left" />

        <div className="challenges__grid" style={{ display: "grid", gap: "24px", marginTop: "48px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", perspective: "1000px" }}>
          {challenges.map((challenge, i) => (
            <ChallengeCard key={challenge.title} challenge={challenge} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengeCard({ challenge, index }) {
  return (
    <motion.div
      className="challenge-card"
      initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15, 
        ease: [0.21, 1.02, 0.3, 1] // Spring-like ease
      }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      style={{
        padding: "32px",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        transformOrigin: "bottom center"
      }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "16px" }}>⚠️</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "600", color: "var(--text-primary)", marginBottom: "12px" }}>
        {challenge.title}
      </h3>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "1.6" }}>
        {challenge.detail}
      </p>
    </motion.div>
  );
}
