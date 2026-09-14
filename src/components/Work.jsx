import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import Badge from "./ui/Badge";
import TechTag from "./ui/TechTag";
import { LinkedinIcon } from "./ui/BrandIcons";
import { experience, otherProjects, profile } from "../data/content";

/**
 * Work — spotlights the current role, distinct from the full chronological
 * history in Experience and the personal/side projects in Projects.
 * Pulls straight from `experience`/`otherProjects` so it can't drift out
 * of sync with those sections.
 */
export default function Work() {
  const current = experience.find((e) => e.badge === "RECENT") || experience[0];
  const shipped = otherProjects.filter((p) => p.label?.includes("LANCESOFT"));

  return (
    <section id="work" className="work scroll-section scroll-section--animated">
      <div className="container">
        <div className="work__intro">
          <span className="overline">CURRENTLY</span>
          <ScrollScaleTitle lines={["What I'm", "building now."]} align="left" />
        </div>

        <motion.div
          className="work__card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="work__header">
            <div>
              <div className="work__role-row">
                <h3 className="work__role">{current.role}</h3>
                {current.badge && <Badge variant="success">{current.badge}</Badge>}
              </div>
              <p className="work__company">
                {current.company} <span className="mono work__date">{current.date}</span>
              </p>
            </div>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="card-link">
                <LinkedinIcon size={15} /> Connect on LinkedIn
              </a>
            )}
          </div>

          <ul className="work__points">
            {current.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="work__tags">
            {current.stack.map((s) => (
              <TechTag key={s}>{s}</TechTag>
            ))}
          </div>
        </motion.div>

        {shipped.length > 0 && (
          <div className="work__shipped">
            <span className="overline">SHIPPED THERE</span>
            <div className="work__shipped-grid">
              {shipped.map((p, i) => (
                <motion.div
                  className="work__shipped-card"
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                >
                  <h4>{p.title}</h4>
                  <p>{p.subtitle}</p>
                  {p.stat && <span className="mono work__shipped-stat">{p.stat}</span>}
                  <a href="#projects" className="work__shipped-link">
                    See details <ArrowRight size={13} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
