import { motion } from "framer-motion";
import ClipPathReveal, { ClipPathLines } from "./ui/ClipPathReveal";
import ScrollScrubText from "./ui/ScrollScrubText";
import AiChatInterface from "./ui/AiChatInterface";
import { profile } from "../data/content";

const STATS = [
  { value: "3", label: "Live AI systems in production" },
  { value: "100+", label: "Employees using what I've shipped" },
  { value: "637K+", label: "Client records processed" },
  { value: "IJRASET", label: "Published ML researcher" },
];

export default function Intro() {
  return (
    <section id="intro" className="intro scroll-section scroll-section--animated">
      <div className="container intro__inner">

        {/* ── Left text column ── */}
        <div className="intro__text-column">
          
          <div className="intro__compact-text">
            <span className="intro__text-accent">👋 Pleased to meet ya, I'm an AI & Data Science</span>{" "}
            <span className="intro__text-primary">enthusiast based in</span>
            <div className="intro__location-box-wrapper">
              <div className="intro__location-box">
                NAGPUR, INDIA
              </div>
            </div>
            
            <ScrollScrubText 
              text="enjoy exploring everything across machine learning, data analysis, and coding, but what I'm most passionate about is creating something truly intelligent & impactful" 
              className="intro__scrub-paragraph"
            />
          </div>

          {/* ── Availability card — fills the previously blank left space ── */}
          <motion.div
            className="intro__availability"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -25% 0px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="intro__avail-dot" />
            <div className="intro__avail-content">
              <span className="intro__avail-status">Available for new opportunities</span>
              <span className="intro__avail-sub">Open to full-time · contract · consulting</span>
            </div>
          </motion.div>

          {/* Keyword tags */}
          <motion.div
            className="intro__keyword-tags"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -25% 0px" }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          >
            {["AI Engineering", "Data Science", "ML Systems", "Python"].map((tag) => (
              <span key={tag} className="intro__keyword-tag">{tag}</span>
            ))}
          </motion.div>
        </div>

        {/* ── Right stats column ── */}
        <div className="intro__stats-column-wrapper">
          <div className="intro__stats-column">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="intro__stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="intro__stat-value mono">{stat.value}</span>
                <span className="intro__stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* AI Chat Interface */}
          <motion.div 
            className="intro__chatbot-placeholder"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -25% 0px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '32px' }}
          >
            <AiChatInterface />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
