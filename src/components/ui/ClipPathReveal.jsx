import { motion, useReducedMotion } from "framer-motion";

const closedClip = {
  "left-to-right": "polygon(0 0, 0 0, 0 100%, 0 100%)",
  "right-to-left": "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
  "center-out": "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
};

/** A small, accessible, viewport-triggered text reveal. */
export default function ClipPathReveal({
  children,
  direction = "left-to-right",
  delay = 0,
  duration = 0.7,
  className = "",
  as = "div",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;
  const hidden = closedClip[direction] || closedClip["left-to-right"];

  return (
    <motion.span
      style={{ display: as === "span" ? "inline-block" : "block" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -35% 0px" }}
    >
      <Component
        className={`clippath-reveal ${className}`}
        variants={{
          hidden: reduceMotion ? {} : { clipPath: hidden, opacity: 0 },
          visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }
        }}
        transition={{ duration: reduceMotion ? 0 : duration, delay, ease: [0.16, 1, 0.3, 1] }}
        {...props}
      >
        {children}
      </Component>
    </motion.span>
  );
}

export function ClipPathLines({ lines, className = "", lineClassName = "", ...props }) {
  return (
    <div className={`clippath-lines ${className}`} {...props}>
      {lines.map((line, index) => (
        <ClipPathReveal key={`${line}-${index}`} className={`clippath-line ${lineClassName}`} delay={index * 0.12}>
          {line}
        </ClipPathReveal>
      ))}
    </div>
  );
}

export function StaggeredClipPathText({ words, className = "", wordClassName = "", ...props }) {
  return (
    <span className={`clippath-staggered ${className}`} {...props}>
      {words.map((word, index) => (
        <ClipPathReveal key={`${word}-${index}`} as="span" className={`clippath-word ${wordClassName}`} delay={index * 0.09}>
          {word}{index < words.length - 1 ? "\u00a0" : ""}
        </ClipPathReveal>
      ))}
    </span>
  );
}
