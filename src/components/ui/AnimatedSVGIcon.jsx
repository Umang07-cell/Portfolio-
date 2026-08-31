import { motion, useReducedMotion } from "framer-motion";

/** Floating decorative SVG with a gentle entrance and continuous drift. */
export default function AnimatedSVGIcon({ children, className = "", delay = 0, style, ...props }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`animated-svg-icon ${className}`}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.86 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [0, 2, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ opacity: { duration: 0.45, delay }, scale: { duration: 0.45, delay }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }, rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FloatingSVGIcon(props) {
  return <AnimatedSVGIcon {...props} />;
}
