import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

/**
 * Horizontal scrolling timeline — Life Timeline style.
 * Horizontal scroll with snap, progress bar, wheel hijack, keyboard nav.
 */
export default function HorizontalTimeline({ items, title, subtitle }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTimeoutRef = useRef(null);

  const updateProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    setScrollProgress(maxScroll > 0 ? container.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateProgress();
    container.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress, items.length]);

  const scrollTo = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      containerRef.current?.scrollBy({ left: e.deltaY, behavior: "auto" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") scrollTo("next");
    if (e.key === "ArrowLeft") scrollTo("prev");
  };

  const handleScroll = () => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 150);
  };

  return (
    <section id="timeline-horizontal" className="horizontal-timeline scroll-section">
      <div className="container">
        <div className="horizontal-timeline__header">
          <div>
            <span className="overline">{title?.toUpperCase() || "TIMELINE"}</span>
            <h2 className="section-heading">{title || "Journey"}</h2>
            {subtitle && <p className="section-subheading">{subtitle}</p>}
          </div>
          <div className="horizontal-timeline__progress-wrap">
            <div
              className="horizontal-timeline__progress"
              role="progressbar"
              aria-valuenow={Math.round(scrollProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="horizontal-timeline__progress-fill"
                animate={{ scaleX: scrollProgress }}
                transition={{ duration: 0.1, ease: "linear" }}
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="horizontal-timeline__track"
          tabIndex={0}
          role="region"
          aria-label="Project timeline — scroll horizontally"
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
        >
          {items.map((item, index) => (
            <motion.article
              key={item.id || index}
              className="horizontal-timeline__card"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="horizontal-timeline__card-inner">
                {item.image && (
                  <div className="horizontal-timeline__media">
                    <img
                      src={item.image}
                      alt={item.imageAlt || `${item.year} - ${item.title}`}
                      loading="lazy"
                    />
                    {item.badge && (
                      <span className="horizontal-timeline__badge">{item.badge}</span>
                    )}
                  </div>
                )}
                {!item.image && item.badge && (
                  <div className="horizontal-timeline__card-badge-row">
                    <span className="horizontal-timeline__badge">{item.badge}</span>
                  </div>
                )}
                <div className="horizontal-timeline__content">
                  <span className="horizontal-timeline__year mono">{item.year}</span>
                  <h3 className="horizontal-timeline__title">{item.title}</h3>
                  {item.subtitle && (
                    <p className="horizontal-timeline__subtitle">{item.subtitle}</p>
                  )}
                  <p className="horizontal-timeline__description">{item.description}</p>
                  {item.tags?.length > 0 && (
                    <div className="horizontal-timeline__tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tech-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="card-link"
                    >
                      {item.linkText || "View Project"}
                      <ChevronRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="horizontal-timeline__nav" aria-hidden="true">
          <button
            type="button"
            className="horizontal-timeline__nav-btn"
            onClick={() => scrollTo("prev")}
            aria-label="Scroll timeline left"
            disabled={scrollProgress <= 0.01}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="horizontal-timeline__nav-btn"
            onClick={() => scrollTo("next")}
            aria-label="Scroll timeline right"
            disabled={scrollProgress >= 0.98}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="horizontal-timeline__hint mono">Scroll horizontally →</p>
      </div>
    </section>
  );
}
