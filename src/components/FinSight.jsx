import { motion } from "framer-motion";
import { ExternalLink, Bot, FileText, BarChart3, MessageSquare } from "lucide-react";
import { GithubIcon } from "./ui/BrandIcons";
import Badge from "./ui/Badge";
import TechTag from "./ui/TechTag";
import ArchitectureDiagram from "./ui/ArchitectureDiagram";
import { finsight } from "../data/content";

const ICONS = { Bot, FileText, BarChart3, MessageSquare };

export default function FinSight() {
  return (
    <section id="finsight" className="scroll-section scroll-section--animated">
      <div className="container">
        <motion.div
          className="finsight-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="finsight-card__header">
            <div>
              <span className="overline">{finsight.label}</span>
              <div className="finsight-card__title-row">
                <h2 className="finsight-card__title">{finsight.title}</h2>
                <Badge variant="success">{finsight.badge}</Badge>
              </div>
              <p className="finsight-card__subtitle">{finsight.subtitle}</p>
            </div>
            <div className="finsight-card__links">
              <a href={finsight.github} target="_blank" rel="noreferrer" className="card-link">
                <GithubIcon size={15} /> GitHub
              </a>
              <a href={finsight.live} target="_blank" rel="noreferrer" className="card-link">
                <ExternalLink size={15} /> Live Demo
              </a>
            </div>
          </div>

          <div className="finsight-card__strip">
            <div>
              <span className="overline">THE PROBLEM</span>
              <p>{finsight.problem}</p>
            </div>
            <div>
              <span className="overline">THE SOLUTION</span>
              <p>{finsight.solution}</p>
            </div>
          </div>

          <div className="finsight-card__arch">
            <span className="overline">SYSTEM ARCHITECTURE</span>
            <ArchitectureDiagram nodes={finsight.architecture} />
          </div>

          <div className="finsight-card__tags">
            {finsight.stack.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>

          <div className="finsight-card__features">
            {finsight.features.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <motion.div
                  key={f.title}
                  className="feature-tile"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                >
                  <Icon size={18} color="var(--accent-primary)" />
                  <div>
                    <p className="feature-tile__title">{f.title}</p>
                    <p className="feature-tile__detail">{f.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="finsight-card__note">
            <span className="overline">ENGINEERING NOTE</span>
            <p>{finsight.engineeringNote}</p>
          </div>

          <div className="finsight-card__stats">
            {finsight.stats.map((s) => (
              <div key={s.label}>
                <span className="finsight-card__stat-value mono">{s.value}</span>
                <span className="finsight-card__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
