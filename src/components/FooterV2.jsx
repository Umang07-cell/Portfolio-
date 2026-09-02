import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileDown, GitBranch, Link2, Send } from "lucide-react";
import CanvasParticles from "./ui/CanvasParticles";
import { profile } from "../data/content";

export default function FooterV2() {
  const reduceMotion = useReducedMotion();
  const footerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Suppress lint warning - mounted is needed for SSR-safe animation
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <section id="contact" className="footer-v2 scroll-section scroll-section--full" ref={footerRef}>
      {/* Canvas Particles Background */}
      <CanvasParticles
        particleCount={50}
        maxDistance={150}
        particleColor="rgba(245, 240, 225, 0.3)"
        lineColor="rgba(46, 84, 209, 0.12)"
        particleSize={{ min: 1, max: 3 }}
        speed={0.2}
      />

      <div className="container footer-v2__content">
        {/* Text Content */}
        <div className="footer-v2__text">
          <motion.h2
            className="footer-v2__text-line"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Looks like you overflowed my tech stack...
          </motion.h2>

          <motion.h2
            className="footer-v2__text-line"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Okay that was lame, but feel free to say hi.
          </motion.h2>
        </div>

        {/* Contact CTAs */}
        <motion.div
          className="footer-v2__ctas"
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Profile Photo */}
          <div className="footer-v2__profile">
            <div className="footer-v2__headshot">
              <img
                src="/profile.jpg"
                alt={profile.name}
                className="footer-v2__avatar"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="footer-v2__avatar-fallback" style={{ display: "none" }}>
                <span className="mono">{profile.name.charAt(0)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="footer-v2__buttons">
            {/* Email Button */}
            <a
              href={`mailto:${profile.email}`}
              className="footer-v2__btn footer-v2__btn--primary"
              aria-label="Send Email"
            >
              <motion.div
                className="footer-v2__btn-icon"
                whileHover={{ rotate: 180, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Send size={20} />
              </motion.div>
              <div className="footer-v2__btn-text">
                <span className="footer-v2__btn-label">Message</span>
                <span className="footer-v2__btn-sub">{profile.email}</span>
              </div>
            </a>

            {/* GitHub Button */}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="footer-v2__btn footer-v2__btn--secondary"
              aria-label="GitHub"
            >
              <motion.div
                className="footer-v2__btn-icon"
                whileHover={{ rotate: 360, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <GitBranch size={20} />
              </motion.div>
              <div className="footer-v2__btn-text">
                <span className="footer-v2__btn-label">GitHub</span>
                <span className="footer-v2__btn-sub">{profile.githubLabel}</span>
              </div>
            </a>

            {/* LinkedIn Button (if available) */}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer-v2__btn footer-v2__btn--secondary"
                aria-label="LinkedIn"
              >
                <motion.div
                  className="footer-v2__btn-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link2 size={20} />
                </motion.div>
                <div className="footer-v2__btn-text">
                  <span className="footer-v2__btn-label">LinkedIn</span>
                  <span className="footer-v2__btn-sub">Connect</span>
                </div>
              </a>
            )}

            {/* Resume Button */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="footer-v2__btn footer-v2__btn--secondary"
              aria-label="Download Resume"
            >
              <motion.div
                className="footer-v2__btn-icon"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <FileDown size={20} />
              </motion.div>
              <div className="footer-v2__btn-text">
                <span className="footer-v2__btn-label">Resume</span>
                <span className="footer-v2__btn-sub">Download PDF</span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Copyright */}
      <motion.div
        className="footer-v2__bottom"
        initial={false}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <p className="mono">UMANG PAWAR — AI ENGINEER</p>
        <p className="mono">Built with React · Deployed on Vercel</p>
      </motion.div>
    </section>
  );
}