import { motion } from "framer-motion";
import { useScrollReveal, revealVariants, defaultTransition, staggerDelay } from "../../hooks/useScrollReveal";

/**
 * Single-element scroll reveal with configurable variant and delay.
 */
export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration,
  className,
  as = "div",
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  ...props
}) {
  const [ref, inView] = useScrollReveal(threshold, rootMargin);
  const Component = motion[as] || motion.div;
  const variants = revealVariants[variant] || revealVariants.fadeUp;

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        ...defaultTransition,
        duration: duration ?? defaultTransition.duration,
        delay,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Stagger children as they scroll into view.
 * Each direct child gets an incremental delay.
 */
export function StaggerReveal({
  children,
  variant = "fadeUp",
  stagger = 0.08,
  className,
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
  ...props
}) {
  const [ref, inView] = useScrollReveal(threshold, rootMargin);
  const variants = revealVariants[variant] || revealVariants.fadeUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.05,
          },
        },
      }}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, i) =>
            child ? (
              <motion.div
                key={child.key ?? i}
                variants={variants}
                transition={{
                  ...defaultTransition,
                  delay: staggerDelay(i, stagger),
                }}
              >
                {child}
              </motion.div>
            ) : null
          )
        : children}
    </motion.div>
  );
}
