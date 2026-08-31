import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Users, FileText, Star, ExternalLink, Github, Lock } from "lucide-react";
import { ClipPathReveal } from "./ui/ClipPathReveal";
import TechLogoMarquee, { LogoItem } from "./ui/TechLogoMarquee";
import Badge from "./ui/Badge";
import TechTag from "./ui/TechTag";
import { finsight, otherProjects, profile } from "../data/content";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * ProjectsSlider — Horizontal scrolling project showcase
 * Recreates the "bingeable-slider" from the target site
 */
export default function ProjectsSlider() {
  const reduceMotion = useReducedMotion();
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const scrollTimeoutRef = useRef(null);

  // All slides data - combining finsight + otherProjects
  const slides = [
    {
      id: "finsight",
      type: "featured",
      title: finsight.title,
      subtitle: finsight.subtitle,
      badge: finsight.badge,
      badgeVariant: "success",
      image: finsight.live, // Will use as placeholder
      stats: finsight.stats,
      description: finsight.solution,
      stack: finsight.stack,
      features: finsight.features,
      github: finsight.github,
      live: finsight.live,
    },
    ...otherProjects.map((p) => ({
      id: p.title.toLowerCase().replace(/\s+/g, "-"),
      type: "project",
      title: p.title,
      subtitle: p.subtitle,
      badge: p.label,
      badgeVariant: p.labelVariant || "accent",
      stat: p.stat,
      description: p.detail,
      stack: p.stack,
      github: p.links?.github,
      live: p.links?.live,
      note: p.links?.note,
    })),
  ];

  // Update scroll progress
  const updateProgress = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    setScrollProgress(maxScroll > 0 ? slider.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    updateProgress();
    slider.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      slider.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress, slides.length]);

  // Scroll navigation
  const scrollTo = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollAmount = slider.clientWidth * 0.9;
    slider.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  // Wheel horizontal scroll
  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      sliderRef.current?.scrollBy({ left: e.deltaY, behavior: "auto" });
    }
  };

  // Touch drag
  const handleTouchStart = (e) => {
    const slider = sliderRef.current;
    if (!slider) return;
    dragStartRef.current = {
      x: e.touches[0].clientX,
      scrollLeft: slider.scrollLeft,
    };
    setIsDragging(true);
    slider.style.scrollBehavior = "auto";
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    slider.scrollLeft = dragStartRef.current.scrollLeft - dx;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const slider = sliderRef.current;
    if (slider) slider.style.scrollBehavior = "smooth";
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") scrollTo("next");
    if (e.key === "ArrowLeft") scrollTo("prev");
  };

  // Scroll snap for reduced motion
  const handleScroll = () => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 150);
  };

  // Framer Motion scroll progress for title animation
  const { scrollYProgress } = useScroll({
    target: sliderRef,
    offset: ["start end", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.3], [10, 1], { clamp: true });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0.5, 1], { clamp: true });

  return (
    <section id="projects" className="projects-slider scroll-section">
      {/* Section Title - Large Scale Animation */}
      <div className="projects-slider__title-wrap">
        <motion.h2
          className="projects-slider__title projects-slider__title--1"
          style={{
            transform: titleScale,
            opacity: titleOpacity,
            transformOrigin: "center top",
          }}
        >
          What crazy I've
        </motion.h2>
        <motion.h2
          className="projects-slider__title projects-slider__title--2"
          style={{
            transform: titleScale,
            opacity: titleOpacity,
            transformOrigin: "center top",
          }}
        >
          Been Build
        </motion.h2>
      </div>

      {/* Horizontal Slider */}
      <div
        ref={sliderRef}
        className="projects-slider__track"
        tabIndex={0}
        role="region"
        aria-label="Project showcase — scroll horizontally"
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollBehavior: reduceMotion ? "auto" : "smooth" }}
      >
        {slides.map((slide, index) => (
          <motion.article
            key={slide.id}
            className={`projects-slider__card projects-slider__card--${slide.type}`}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {slide.type === "featured" ? (
              <FeaturedProjectSlide slide={slide} />
            ) : (
              <ProjectSlide slide={slide} />
            )}
          </motion.article>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="projects-slider__progress-wrap" role="progressbar" aria-valuenow={Math.round(scrollProgress * 100)} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className="projects-slider__progress-fill"
          animate={{ scaleX: scrollProgress }}
          transition={{ duration: 0.1, ease: "linear" }}
          style={{ transformOrigin: "left center" }}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="projects-slider__nav" aria-hidden="true">
        <button
          type="button"
          className="projects-slider__nav-btn"
          onClick={() => scrollTo("prev")}
          aria-label="Previous project"
          disabled={scrollProgress <= 0.01}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className="projects-slider__nav-btn"
          onClick={() => scrollTo("next")}
          aria-label="Next project"
          disabled={scrollProgress >= 0.98}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <p className="projects-slider__hint mono">Scroll horizontally →</p>
    </section>
  );
}

/**
 * FeaturedProjectSlide — Large featured project (FinSight)
 */
function FeaturedProjectSlide({ slide }) {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="projects-slider__slide projects-slider__slide--featured">
      <div className="projects-slider__slide-visual">
        <div className="projects-slider__slide-image-placeholder">
          <div className="projects-slider__placeholder-content">
            <span className="projects-slider__placeholder-icon">📊</span>
            <span className="projects-slider__placeholder-text">{slide.title}</span>
            <span className="projects-slider__placeholder-sub">AI Financial Intelligence Platform</span>
          </div>
        </div>
        <Badge variant={slide.badgeVariant} className="projects-slider__slide-badge">
          {slide.badge}
        </Badge>
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
                <Github size={15} /> GitHub
              </a>
            )}
            {slide.live && (
              <a href={slide.live} target="_blank" rel="noreferrer" className="card-link">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="projects-slider__slide-stats">
          {slide.stats?.map((stat) => (
            <div key={stat.label} className="projects-slider__stat">
              <span className="projects-slider__stat-value mono">{stat.value}</span>
              <span className="projects-slider__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="projects-slider__slide-description">{slide.description}</p>

        {/* Features */}
        <div className="projects-slider__slide-features">
          {slide.features?.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`projects-slider__feature ${i === activeFeature ? "active" : ""}`}
              onClick={() => setActiveFeature(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            >
              <div className="projects-slider__feature-icon" style={{ color: "var(--accent-primary)" }}>
                {feature.icon === "Bot" && <span>🤖</span>}
                {feature.icon === "FileText" && <span>📄</span>}
                {feature.icon === "BarChart3" && <span>📊</span>}
                {feature.icon === "MessageSquare" && <span>💬</span>}
              </div>
              <div>
                <p className="projects-slider__feature-title">{feature.title}</p>
                <p className="projects-slider__feature-detail">{feature.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="projects-slider__slide-tags">
          {slide.stack?.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ProjectSlide — Standard project cards
 */
function ProjectSlide({ slide }) {
  return (
    <div className="projects-slider__slide projects-slider__slide--project">
      <div className="projects-slider__slide-visual">
        <div className="projects-slider__slide-image-placeholder">
          <div className="projects-slider__placeholder-content">
            <span className="projects-slider__placeholder-icon">🚀</span>
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
            {slide.stat && <p className="projects-slider__slide-stat mono">{slide.stat}</p>}
          </div>
          <div className="projects-slider__slide-links">
            {slide.github && (
              <a href={slide.github} target="_blank" rel="noreferrer" className="card-link">
                <Github size={14} /> GitHub
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
          </div>
        </div>

        <p className="projects-slider__slide-description">{slide.description}</p>

        <div className="projects-slider__slide-tags">
          {slide.stack?.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        {/* Tech Logo Marquee */}
        {slide.stack && slide.stack.length > 0 && (
          <div className="projects-slider__tech-marquee">
            <TechLogoMarquee
              logos={slide.stack.slice(0, 8).map((tech) => (
                <LogoItem key={tech} src={`/tech-logos/${tech.toLowerCase().replace(/[^a-z0-9]/g, "")}.svg`} alt={tech} />
              ))}
              speed={30}
              logoWidth={100}
              logoHeight={40}
              gap={20}
            />
          </div>
        )}
      </div>
    </div>
  );
}