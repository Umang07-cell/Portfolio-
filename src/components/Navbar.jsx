import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "../data/content";
import ScrollProgress from "./ui/ScrollProgress";

const LINKS = [
  { label: "Work", href: "#finsight" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const direction = currentScrollY > lastScrollY.current ? "down" : "up";
          const threshold = 100;

          setScrolled(currentScrollY > 80);

          // Hide navbar when scrolling down past threshold, show when scrolling up
          if (currentScrollY > threshold) {
            setNavVisible(direction === "up");
          } else {
            setNavVisible(true);
          }

          lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ScrollProgress />
      <header
        className={`navbar${scrolled ? " navbar--scrolled" : ""} ${navVisible ? "navbar--visible" : "navbar--hidden"}`}
        style={{
          transform: navVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease",
        }}
      >
        <div className="container navbar__inner">
          <a
            href="#top"
            className="navbar__logo mono"
            onClick={(e) => handleLinkClick(e, "#top")}
            aria-label="Scroll to top"
          >
            UP
          </a>

          <nav className="navbar__links" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__right">
            <a
              className="navbar__resume"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Resume <ArrowUpRight size={14} />
            </a>
            <button
              className="navbar__menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: LINKS.length * 0.06 }}
              >
                Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
