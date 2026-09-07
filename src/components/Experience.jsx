import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import Badge from "./ui/Badge";
import TechTag from "./ui/TechTag";
import { experience } from "../data/content";
import { useScrollDirectionReveal } from "../hooks/useScrollDirectionReveal";

export default function Experience() {
  const containerRef = useRef(null);
  
  // Tie the timeline line's height to the scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="scroll-section scroll-section--animated" ref={containerRef}>
      <div className="container">
        <span className="overline">EXPERIENCE</span>
        <ScrollScaleTitle lines={["Where I've", "shipped code."]} align="left" />

        <div className="timeline">
          <motion.div
            className="timeline__line"
            style={{ scaleY, transformOrigin: "top" }}
          />
          {experience.map((node, i) => (
            <ExperienceNode key={node.role} node={node} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceNode({ node, index }) {
  return (
    <motion.div
      className="timeline__node"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -25% 0px" }}
      transition={{ 
        duration: 0.8, 
        delay: Math.min(index * 0.1, 0.4), 
        ease: [0.16, 1, 0.3, 1] // Apple-style fluid ease
      }}
    >
      <span className="timeline__dot" aria-hidden="true" />
      <div className="timeline__date mono">{node.date}</div>
      <div className="timeline__content">
        <div className="timeline__role-row">
          <h3>
            {node.role} — <span>{node.company}</span>
          </h3>
          {node.badge && <Badge variant="success">{node.badge}</Badge>}
        </div>
        <ul>
          {node.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="timeline__stack">
          {node.stack.map((s) => (
            <TechTag key={s}>{s}</TechTag>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
