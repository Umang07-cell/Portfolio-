import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import Badge from "./Badge";
import TechTag from "./TechTag";
import { defaultTransition } from "../../hooks/useScrollReveal";

export default function ProjectCard({
  project,
  index = 0,
  span = 1,
  animate = true,
  stagger = false,
  itemVariants,
}) {
  const className = `project-card${span === 2 ? " project-card--wide" : ""}`;

  const content = (
    <>
      <div className="project-card__top">
        <Badge variant={project.labelVariant}>{project.label}</Badge>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__subtitle">{project.subtitle}</p>
      {project.stat && <p className="project-card__stat mono">{project.stat}</p>}
      <p className="project-card__detail">{project.detail}</p>
      <div className="project-card__tags">
        {project.stack.map((tech) => (
          <TechTag key={tech}>{tech}</TechTag>
        ))}
      </div>
      <div className="project-card__links">
        {project.links?.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer" className="card-link">
            <GithubIcon size={14} /> GitHub
          </a>
        )}
        {project.links?.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer" className="card-link">
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
        {project.links?.note && (
          <span className="card-link card-link--muted">
            <Lock size={14} /> {project.links.note}
          </span>
        )}
      </div>
    </>
  );

  if (stagger && itemVariants) {
    return (
      <motion.article className={className} variants={itemVariants} transition={defaultTransition}>
        {content}
      </motion.article>
    );
  }

  if (!animate) {
    return <article className={className}>{content}</article>;
  }

  return (
    <motion.article
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {content}
    </motion.article>
  );
}
