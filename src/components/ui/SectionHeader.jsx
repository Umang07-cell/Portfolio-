import { motion } from "framer-motion";

export default function SectionHeader({ overline, heading, subheading, align = "left" }) {
  return (
    <div style={{ textAlign: align }}>
      <motion.span
        className="overline"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {overline}
      </motion.span>
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {heading}
      </motion.h2>
      {subheading && (
        <motion.p
          className="section-subheading"
          style={align === "center" ? { marginLeft: "auto", marginRight: "auto" } : undefined}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
