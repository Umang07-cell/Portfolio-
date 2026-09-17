import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ScrambleText from "./ui/ScrambleText";

export default function HeroV2() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero-v2 scroll-section scroll-section--full"
    >
      {/* Background Image/Gradient Layer with Parallax */}
      <motion.div 
        className="hero-v2__bg-layer" 
        style={reduceMotion ? {} : { y: bgY }}
        aria-hidden="true"
      >
        <div className="hero-v2__bg-image" style={{ backgroundImage: "url('/hero-image.png')" }} />
        <div className="hero-v2__bg-gradient" />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="container hero-v2__inner"
        style={reduceMotion ? {} : { y: textY }}
      >
        <div className="hero-v2__split-content">
          
          {/* Left Text */}
          <div className="hero-v2__left">
            <motion.h1 
              className="hero-v2__headline hero-v2__headline--left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              I engineer <br className="desktop-br"/>
              <span className="text-accent">
                <ScrambleText text="AI systems" delay={300} speed={45} scrambleTicks={90} />
              </span> <br className="desktop-br"/>
              that actually <br className="desktop-br"/>
              <span className="text-accent">
                <ScrambleText text="ship." delay={800} speed={45} scrambleTicks={95} />
              </span>
            </motion.h1>
          </div>

          {/* Right Text */}
          <div className="hero-v2__right">
            <motion.h1 
              className="hero-v2__headline hero-v2__headline--right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              I'm Catalyst
              <span className="text-accent">
                <br className="desktop-br"/><ScrambleText text="Umang" delay={500} speed={45} scrambleTicks={95} />
                <br className="desktop-br"/><ScrambleText text="Pawar" delay={1000} speed={45} scrambleTicks={95} />
              </span>
            </motion.h1>
          </div>
          
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#intro"
        className="hero-v2__scroll-cue mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
        onClick={(e) => { e.preventDefault(); scrollToSection("#intro"); }}
      >
        <ArrowDown size={14} style={{ transform: "rotate(180deg)" }} />
        <span>SCROLL</span>
      </motion.a>
    </section>
  );
}
