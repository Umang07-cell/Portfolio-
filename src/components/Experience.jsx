import { motion } from "framer-motion";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import Badge from "./ui/Badge";
import TechTag from "./ui/TechTag";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="scroll-section scroll-section--animated">
      <div className="container">
        <span className="overline">EXPERIENCE</span>
        <ScrollScaleTitle lines={["Where I've", "shipped code."]} align="left" />

        <div className="timeline">
          <motion.div
            className="timeline__line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {experience.map((node, i) => (
            <motion.div
              className="timeline__node"
              key={node.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
