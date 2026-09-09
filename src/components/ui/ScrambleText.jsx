import { useState, useEffect, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * ScrambleText — each character starts as a random letter and
 * progressively "decodes" into the real text, left-to-right.
 * Includes a shadow-to-clear reveal: starts dim & slightly blurred,
 * then sharpens as the text resolves.
 */
export default function ScrambleText({ 
  text, 
  delay = 0, 
  speed = 35, 
  scrambleTicks = 4,
  className,
  style 
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 → 1 as decode completes
  const cleanupRef = useRef(null);

  // Scramble logic
  const animate = useCallback(() => {
    const len = text.length;
    const totalTicks = len + scrambleTicks;
    let tick = 0;

    const interval = setInterval(() => {
      tick++;
      let result = "";

      for (let i = 0; i < len; i++) {
        if (text[i] === " " || text[i] === "\n") {
          result += text[i];
          continue;
        }

        if (tick >= i + scrambleTicks) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayed(result);
      setProgress(Math.min(tick / totalTicks, 1));

      if (tick >= totalTicks) {
        clearInterval(interval);
        setDisplayed(text);
        setProgress(1);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, scrambleTicks]);

  // Delay before starting
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  // Run animation once started
  useEffect(() => {
    if (!started) {
      // Show fully scrambled text before animation starts
      let initial = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || text[i] === "\n") {
          initial += text[i];
        } else {
          initial += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayed(initial);
      setProgress(0);
      return;
    }
    
    cleanupRef.current = animate();
    return () => { if (cleanupRef.current) cleanupRef.current(); };
  }, [started, animate, text]);

  // Shadow-to-clear: starts at 0.25 opacity + 3px blur, resolves to full
  const opacity = 0.25 + progress * 0.75;
  const blur = (1 - progress) * 3;

  return (
    <span 
      className={className} 
      style={{ 
        ...style,
        opacity,
        filter: `blur(${blur}px)`,
        transition: "opacity 0.15s ease, filter 0.15s ease",
        display: "inline-block",
      }}
    >
      {displayed}
    </span>
  );
}
