import { motion, useReducedMotion } from "framer-motion";
import ScrollScaleTitle from "./ui/ScrollScaleTitle";
import { journey } from "../data/content";

/**
 * TimelineV2 — "Let's take it back" journey timeline.
 *
 * Previously an absolutely-positioned SVG-path layout with hardcoded pixel
 * coordinates for a 600x2700 viewBox. Two independent layers (images,
 * text cards) each converted those coordinates to percentages of the
 * OUTER section's measured width/height — but the SVG itself rendered
 * inside an inner wrapper capped at max-width:800px. On any real screen
 * width those two coordinate spaces didn't match, so cards and icons
 * landed on top of each other and the connecting line didn't track them.
 *
 * Rebuilt as a standard alternating-side timeline: natural document flow
 * (no absolute-position math to keep in sync), a single continuous
 * center line sized to the content's real height, and no risk of overlap
 * since every card just flows to whatever height its own text needs.
 */

const ICONS = {
  hsc: "📚",
  btech: "🎓",
  research: "📄",
  suvidha: "📝",
  syncsas: "💻",
  cicd: "⚙️",
  carrierdomain: "📊",
  dashboard: "📈",
  graduation: "🎓",
  "google-cert": "🏅",
  lancesoft: "🏢",
  leadgen: "📡",
  "atlas-finsight": "🚀",
};

// Real milestones, sourced only from the resume — nothing invented.
const milestones = [
  { year: "2022", text: journey[0].text, image: "hsc" },
  { year: "2022", text: journey[1].text, image: "btech" },
  { year: "2025", text: journey[2].text, image: "research" },
  { year: "2025", text: journey[3].text, image: "suvidha" },
  { year: "2025", text: journey[4].text, image: "syncsas" },
  { year: "2025", text: journey[5].text, image: "cicd" },
  { year: "2026", text: journey[6].text, image: "carrierdomain" },
  { year: "2026", text: journey[7].text, image: "dashboard" },
  { year: "2026", text: journey[8].text, image: "graduation" },
  { year: "2026", text: journey[9].text, image: "google-cert" },
  { year: "2026", text: journey[10].text, image: "lancesoft" },
  { year: "2026", text: journey[11].text, image: "leadgen" },
  { year: "2026", text: journey[12].text, image: "atlas-finsight" },
];

export default function TimelineV2() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="timeline" className="timeline-v2 scroll-section">
      <div className="timeline-v2__bg-gradient" aria-hidden="true" />
      <div className="container">
        <div className="timeline-v2__intro">
          <span className="overline">THE LONG VERSION</span>
          <ScrollScaleTitle lines={["Let's take it", "back."]} />
        </div>

        <div className="timeline-v2__track">
          <div className="timeline-v2__line" aria-hidden="true" />
          <div className="timeline-v2__list">
            {milestones.map((m, i) => (
              <motion.div
                key={m.image}
                className={`timeline-v2__row ${
                  i % 2 === 0 ? "timeline-v2__row--left" : "timeline-v2__row--right"
                }`}
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                transition={{ duration: 0.5, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="timeline-v2__card">
                  <span className="timeline-v2__year mono">{m.year}</span>
                  <p className="timeline-v2__text">{m.text}</p>
                </div>
                <div className="timeline-v2__dot">
                  <span aria-hidden="true">{ICONS[m.image] || "📌"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
