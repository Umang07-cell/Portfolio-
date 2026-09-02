import { motion } from "framer-motion";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import TechTag from "./ui/TechTag";
import { useStaggerInView, defaultTransition } from "../hooks/useScrollReveal";
import { techGroups } from "../data/content";

export default function TechStack() {
  const { ref, inView, containerVariants, itemVariants } = useStaggerInView(0.1);

  return (
    <section id="stack" className="scroll-section scroll-section--animated">
      <div className="container">
        <span className="overline">TECHNICAL ARSENAL</span>
        <ScrollScaleTitle lines={["What I", "reach for."]} align="left" />
        <motion.div
          ref={ref}
          className="tech-groups"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {techGroups.map((group) => (
            <motion.div
              className="tech-group"
              key={group.label}
              variants={itemVariants}
              transition={defaultTransition}
            >
              <span className="tech-group__label mono">{group.label}</span>
              <div className="tech-group__tags">
                {group.items.map((item) => (
                  <TechTag key={item}>{item}</TechTag>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
