import { motion } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import { journey } from "../data/content";

export default function Journey() {
  return (
    <section id="journey" className="scroll-section scroll-section--animated">
      <div className="container">
        <SectionHeader overline="JOURNEY" heading="How this happened, year by year." />
        <div className="journey-track-wrap">
        <div className="journey-track">
          {journey.map((entry, i) => (
            <motion.div
              className="journey-item"
              key={entry.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -25% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="journey-item__year mono">{entry.year}</span>
              <p>{entry.text}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
