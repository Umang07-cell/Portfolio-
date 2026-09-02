import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollScrubText({ 
  text, 
  className = "", 
  wordClassName = "" 
}) {
  const containerRef = useRef(null);
  
  // Track scroll progress of this text block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"] // Starts revealing when top hits 80% of screen, finishes when bottom hits 50%
  });

  const words = text.split(" ");

  return (
    <p 
      ref={containerRef}
      className={`scroll-scrub-text ${className}`}
      style={{ margin: 0, padding: 0 }}
    >
      {words.map((word, i) => {
        // Calculate the range for this specific word
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        // Map the scroll progress to opacity
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        
        return (
          <motion.span 
            key={i} 
            className={`scroll-scrub-word ${wordClassName}`}
            style={{ opacity, display: "inline-block", marginRight: "0.25em", marginTop: "0.1em" }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}
