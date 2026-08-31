import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CanvasParticles — Lightweight particle system for footer background
 * Creates floating particles with connecting lines (constellation effect)
 */
export default function CanvasParticles({
  className = "",
  particleCount = 60,
  maxDistance = 140,
  particleColor = "rgba(245, 240, 225, 0.4)", // sand color
  lineColor = "rgba(46, 84, 209, 0.15)", // accent blue
  particleSize = { min: 1, max: 3 },
  speed = 0.3,
  style = {},
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: null, y: null, radius: 180 });

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      setDimensions({ width: rect.width, height: rect.height });
      initParticles(rect.width, rect.height);
    };

    const initParticles = (w, h) => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
        baseRadius: Math.random() * (particleSize.max - particleSize.min) + particleSize.min,
      }));
    };

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    window.addEventListener("resize", resize);
    resize();

    // Animation loop
    const animate = () => {
      if (reduceMotion) {
        // Draw static particles only
        drawStatic(ctx);
        return;
      }

      const { width, height } = dimensions;
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        // Mouse repulsion
        if (mouseRef.current.x !== null) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius && dist > 0) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const drawStatic = (ctx) => {
      const { width, height } = dimensions;
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleCount, maxDistance, particleColor, lineColor, particleSize, speed, reduceMotion]);

  if (reduceMotion) {
    // Return static canvas for reduced motion
    return (
      <canvas
        ref={canvasRef}
        className={`canvas-particles ${className}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`canvas-particles ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Simpler CanvasLines — Just animated lines/grid for lighter weight
 */
export function CanvasLines({
  className = "",
  lineColor = "rgba(46, 84, 209, 0.08)",
  gridSize = 60,
  speed = 0.2,
  style = {},
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      setDimensions({ width: rect.width, height: rect.height });
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      const { width, height } = dimensions;
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (reduceMotion) {
        drawGrid(ctx, width, height, 0, 0);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      offsetRef.current.x = (offsetRef.current.x + speed * 0.5) % gridSize;
      offsetRef.current.y = (offsetRef.current.y + speed * 0.3) % gridSize;

      drawGrid(ctx, width, height, offsetRef.current.x, offsetRef.current.y);

      animationRef.current = requestAnimationFrame(animate);
    };

    const drawGrid = (ctx, w, h, ox, oy) => {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = -ox; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -oy; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Subtle diagonal accents
      ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, "0.04)");
      ctx.lineWidth = 0.3;
      for (let i = -2; i < 4; i++) {
        const startX = i * gridSize * 2 - ox;
        ctx.beginPath();
        ctx.moveTo(startX, 0);
        ctx.lineTo(startX + h, h);
        ctx.stroke();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [lineColor, gridSize, speed, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`canvas-lines ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}