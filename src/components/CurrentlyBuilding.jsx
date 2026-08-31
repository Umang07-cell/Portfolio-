import { motion } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import Badge from "./ui/Badge";
import { useStaggerInView, defaultTransition } from "../hooks/useScrollReveal";
import { currentlyBuilding } from "../data/content";

const VARIANT_BY_STATUS = {
  BUILDING: "success",
  EXPLORING: "accent",
  LEARNING: "warning",
};

export default function CurrentlyBuilding() {
  const { ref, inView, containerVariants, itemVariants } = useStaggerInView(0.08);

  return (
    <section id="building" className="scroll-section scroll-section--animated">
      <div className="container">
        <SectionHeader overline="CURRENTLY" heading="What I'm building next." />
        <motion.div
          ref={ref}
          className="building-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {currentlyBuilding.map((item) => (
            <motion.div
              className="building-card"
              key={item.title}
              variants={itemVariants}
              transition={defaultTransition}
            >
              <Badge variant={VARIANT_BY_STATUS[item.status]}>{item.status}</Badge>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
