import { motion } from "framer-motion";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import TechTag from "./ui/TechTag";
import { useStaggerInView, defaultTransition } from "../hooks/useScrollReveal";
import { techGroups } from "../data/content";

export default function TechStack() {
  const { ref, inView, containerVariants, itemVariants } = useStaggerInView(0.08);

  return (
    <section id="stack" className="scroll-section scroll-section--animated">
      <div className="container">
        <span className="overline">TECHNICAL ARSENAL</span>
        <ScrollScaleTitle lines={["What I", "reach for."]} align="left" />
        <motion.div
          ref={ref}
          className="tech-stack-v2"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {techGroups.map((group, groupIndex) => (
            <motion.div
              className="tech-stack-v2__row"
              key={group.label}
              variants={itemVariants}
              transition={defaultTransition}
            >
              <div className="tech-stack-v2__label-col">
                <span className="tech-stack-v2__index mono">0{groupIndex + 1}</span>
                <span className="tech-stack-v2__label mono">{group.label}</span>
              </div>
              <div className="tech-stack-v2__tags-col">
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
