import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Lock } from "lucide-react";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import ClipPathReveal from "./ui/ClipPathReveal";
import TechLogoMarquee, { SVGLogoItem } from "./ui/TechLogoMarquee";
import Badge from "./ui/Badge";
import TechTag from "./ui/TechTag";
import { finsight, otherProjects } from "../data/content";

const PROJECT_ICONS = {
  finsight: "📊",
  "hr-policyiq": "🤖",
  "lead-generation-engine": "📡",
  "atlas-ai": "🧭",
  "closira-ai": "💬",
  paysettle: "💳",
  thereturnpath: "🔍",
};

/**
 * ProjectsSlider — every project (FinSight included) now renders through
 * the same card: chrome-mockup visual, optional stats row, description,
 * feature grid, tech tags, and the running tech-logo marquee. Previously
 * FinSight had a distinct richer layout while every other project used a
 * plainer one — this unifies them so nothing looks "unfinished" next to
 * FinSight.
 */
export default function ProjectsSlider() {
  const slides = [
    {
      id: "finsight",
      title: finsight.title,
      subtitle: finsight.subtitle,
      badge: finsight.badge,
      badgeVariant: "success",
      stats: finsight.stats,
      description: finsight.solution,
      stack: finsight.stack,
      features: finsight.features,
      github: finsight.github,
      live: finsight.live,
    },
    ...otherProjects.map((p) => ({
      id: p.title.toLowerCase().replace(/\s+/g, "-"),
      title: p.title,
      subtitle: p.subtitle,
      badge: p.label,
      badgeVariant: p.labelVariant || "accent",
      stats: p.stats,
      description: p.detail,
      stack: p.stack,
      features: p.features,
      github: p.links?.github,
      live: p.links?.live,
      note: p.links?.note,
      paper: p.links?.paper,
    })),
  ];

  return (
    <section id="projects" className="projects-slider scroll-section container">
      <div className="projects-slider__title-wrap-outer">
        <span className="overline">PROJECTS</span>
        <ScrollScaleTitle lines={["What crazy I've", "Been Build"]} />
      </div>

      <div className="projects-slider__list">
        {slides.map((slide) => (
          <motion.article
            key={slide.id}
            className="projects-slider__card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProjectSlide slide={slide} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectSlide({ slide }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const icon = PROJECT_ICONS[slide.id] || "🚀";

  return (
    <div className="projects-slider__slide">
      <div className="projects-slider__slide-visual">
        <div className="projects-slider__slide-image-placeholder">
          <div className="projects-slider__chrome">
            <span className="projects-slider__chrome-dot" />
            <span className="projects-slider__chrome-dot" />
            <span className="projects-slider__chrome-dot" />
            <span className="projects-slider__chrome-url mono">
              {slide.live
                ? slide.live.replace(/^https?:\/\//, "")
                : slide.note
                  ? "private build"
                  : "demo link — coming soon"}
            </span>
          </div>
          <div className="projects-slider__placeholder-content">
            <span className="projects-slider__placeholder-icon-ring">{icon}</span>
            <span className="projects-slider__placeholder-text">{slide.title}</span>
            <span className="projects-slider__placeholder-sub">{slide.subtitle}</span>
          </div>
        </div>
        {slide.badge && (
          <Badge variant={slide.badgeVariant} className="projects-slider__slide-badge">
            {slide.badge}
          </Badge>
        )}
      </div>

      <div className="projects-slider__slide-content">
        <div className="projects-slider__slide-header">
          <div>
            <ClipPathReveal direction="left-to-right" delay={0.1} className="projects-slider__slide-label">
              {slide.badge}
            </ClipPathReveal>
            <h3 className="projects-slider__slide-title">{slide.title}</h3>
            <p className="projects-slider__slide-subtitle">{slide.subtitle}</p>
          </div>
          <div className="projects-slider__slide-links">
            {slide.github && (
              <a href={slide.github} target="_blank" rel="noreferrer" className="card-link">
                <GitBranch size={14} /> GitHub
              </a>
            )}
            {slide.live && (
              <a href={slide.live} target="_blank" rel="noreferrer" className="card-link">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {slide.note && (
              <span className="card-link card-link--muted">
                <Lock size={14} /> {slide.note}
              </span>
            )}
            {slide.paper && (
              <a href={slide.paper} target="_blank" rel="noreferrer" className="card-link">
                <ExternalLink size={14} /> Published Paper
              </a>
            )}
          </div>
        </div>

        {slide.stats && slide.stats.length > 0 && (
          <div className="projects-slider__slide-stats">
            {slide.stats.map((stat) => (
              <div key={stat.label} className="projects-slider__stat">
                <span className="projects-slider__stat-value mono">{stat.value}</span>
                <span className="projects-slider__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <p className="projects-slider__slide-description">{slide.description}</p>

        {slide.features && slide.features.length > 0 && (
          <div className="projects-slider__slide-features">
            {slide.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className={`projects-slider__feature ${i === activeFeature ? "active" : ""}`}
                onClick={() => setActiveFeature(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              >
                <div className="projects-slider__feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <div>
                  <p className="projects-slider__feature-title">{feature.title}</p>
                  <p className="projects-slider__feature-detail">{feature.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="projects-slider__slide-tags">
          {slide.stack?.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        {slide.stack && slide.stack.length > 0 && (
          <div className="projects-slider__tech-marquee">
            <TechLogoMarquee
              logos={slide.stack.map((tech) => (
                <SVGLogoItem key={tech} width={150} height={36}>
                  <span className="marquee-tech-pill mono">{tech}</span>
                </SVGLogoItem>
              ))}
              speed={30}
              logoWidth={150}
              logoHeight={36}
              gap={14}
            />
          </div>
        )}
      </div>
    </div>
  );
}
