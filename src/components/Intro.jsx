import { motion } from "framer-motion";
import { ClipPathReveal, ClipPathLines, StaggeredClipPathText } from "./ui/ClipPathReveal";
import { profile, aboutCopy } from "../data/content";

export default function Intro() {
  return (
    <section id="intro" className="intro scroll-section scroll-section--animated">
      <div className="container intro__inner">
        <div className="intro__text-column">
          {/* Line 1: "Pleased to meet ya, I'm an AI & Data Science enthusiast based in" */}
          <ClipPathLines
            lines={[
              `Pleased to meet ya, I'm an AI & Data Science enthusiast based in`,
            ]}
            direction="left-to-right"
            stagger={0.8}
            lineDelay={0.1}
            className="intro__line intro__line--1"
            lineClassName="intro__line-text"
          />

          {/* Location with highlight */}
          <div className="intro__location-wrapper">
            <ClipPathReveal
              direction="left-to-right"
              delay={1.0}
              duration={0.8}
              className="intro__location-highlight"
              as="span"
            >
              {profile.location}
            </ClipPathReveal>
          </div>

          {/* Line 2: "enjoy exploring everything across machine learning, data analysis, and coding, but what I'm most passionate about is creating something truly" */}
          <ClipPathLines
            lines={[
              `enjoy exploring everything across machine learning, data analysis, and coding, but what I'm most passionate about is creating something truly`,
            ]}
            direction="left-to-right"
            stagger={0.8}
            lineDelay={0.1}
            className="intro__line intro__line--2"
            lineClassName="intro__line-text"
            style={{ marginTop: "var(--space-6)" }}
          />

          {/* "intelligent" - center-out reveal */}
          <div className="intro__highlight-wrapper">
            <ClipPathReveal
              direction="center-out"
              delay={1.6}
              duration={1}
              className="intro__highlight-word"
              as="span"
            >
              intelligent
            </ClipPathReveal>
          </div>

          {/* Ampersand */}
          <motion.span
            className="intro__ampersand"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            &
          </motion.span>

          {/* "impactful" - inward reveal */}
          <div className="intro__highlight-wrapper intro__highlight-wrapper--2">
            <ClipPathReveal
              direction="inward"
              delay={2.4}
              duration={1}
              className="intro__highlight-word intro__highlight-word--2"
              as="span"
            >
              impactful
            </ClipPathReveal>
          </div>
        </div>
      </div>
    </section>
  );
}