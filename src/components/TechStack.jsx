import { motion, useReducedMotion } from "framer-motion";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import TechTag from "./ui/TechTag";
import { techGroups } from "../data/content";

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.035, delayChildren: 0.08 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.96, filter: "blur(3px)", boxShadow: "0 0 0 rgba(65, 91, 210, 0)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    boxShadow: "0 0 18px rgba(65, 91, 210, 0)",
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
  },
};

const labelVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } },
};

export default function TechStack() {
  const reduceMotion = useReducedMotion();
  const revealProps = reduceMotion
    ? { initial: false, animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once: false, amount: 0.18 } };

  return (
    <section id="stack" className="scroll-section scroll-section--animated">
      <div className="container">
        <span className="overline">TECHNICAL ARSENAL</span>
        <ScrollScaleTitle lines={["What I", "reach for."]} align="left" />
        <motion.div
          className="tech-stack-v2"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: false, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
        >
          {techGroups.map((group, groupIndex) => (
            <motion.div
              className="tech-stack-v2__row"
              key={group.label}
              variants={rowVariants}
              {...revealProps}
            >
              <motion.div className="tech-stack-v2__label-col" variants={labelVariants}>
                <span className="tech-stack-v2__index mono">0{groupIndex + 1}</span>
                <span className="tech-stack-v2__label mono">{group.label}</span>
              </motion.div>
              <motion.div
                className="tech-stack-v2__tags-col"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } } }}
              >
                {group.items.map((item) => (
                  <motion.span key={item} variants={tagVariants} style={{ display: "inline-block" }}>
                    <TechTag>{item}</TechTag>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
