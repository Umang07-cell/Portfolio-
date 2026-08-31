import { motion } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import ProjectCard from "./ui/ProjectCard";
import { useStaggerInView } from "../hooks/useScrollReveal";
import { otherProjects } from "../data/content";

export default function Projects() {
  const { ref, inView, containerVariants, itemVariants } = useStaggerInView(0.1);

  return (
    <section id="projects" className="scroll-section scroll-section--animated">
      <div className="container">
        <SectionHeader
          overline="OTHER WORK"
          heading="More systems, shipped and shipping."
          subheading="Production tools running inside LanceSoft, plus public projects that show the same engineering approach applied elsewhere."
        />
        <motion.div
          ref={ref}
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {otherProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              span={project.size === "large" ? 2 : 1}
              stagger
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
