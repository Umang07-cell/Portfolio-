import { motion } from "framer-motion";
import { Mail, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="scroll-section scroll-section--full scroll-section--animated scroll-section--snap-center">
      <div className="container contact">
        <motion.span
          className="overline"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          transition={{ duration: 0.4 }}
        >
          CONTACT
        </motion.span>
        <motion.h2
          className="contact__heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Let's build something intelligent.
        </motion.h2>
        <motion.p
          className="contact__sub"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Open to AI Engineer roles in Pune, Bangalore, Hyderabad — and interesting problems
          anywhere.
        </motion.p>

        <motion.div
          className="contact__ctas"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -25% 0px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a href={`mailto:${profile.email}`} className="contact__cta">
            <Mail size={18} />
            <span>
              Send Email
              <small>{profile.email}</small>
            </span>
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact__cta">
              <LinkedinIcon size={18} />
              <span>
                LinkedIn
                <small>Connect</small>
              </span>
            </a>
          ) : null}
          <a href={profile.github} target="_blank" rel="noreferrer" className="contact__cta">
            <GithubIcon size={18} />
            <span>
              GitHub
              <small>{profile.githubLabel}</small>
            </span>
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="contact__cta">
            <FileDown size={18} />
            <span>
              Resume
              <small>Download PDF</small>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
