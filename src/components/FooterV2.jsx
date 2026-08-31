import { ArrowUpRight, Mail, Send } from "lucide-react";
import { profile } from "../data/content";
import CanvasParticles from "./ui/CanvasParticles";
import { GithubIcon } from "./ui/BrandIcons";

export default function FooterV2() {
  return (
    <footer className="footer-v2" id="contact">
      <CanvasParticles />
      <div className="container footer-v2__inner">
        <span className="overline">04 — MAKE CONTACT</span>
        <h2>Looks like you<br />overflowed my<br /><em>tech stack.</em></h2>
        <p>Have a hard, interesting AI problem? I’d like to hear about it.</p>
        <div className="footer-v2__actions">
          <a className="footer-v2__primary" href={`mailto:${profile.email}`}>Message me <Send size={17} /></a>
          <a className="footer-v2__secondary" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon size={18} /> GitHub <ArrowUpRight size={15} /></a>
        </div>
        <div className="footer-v2__bottom"><span>© {new Date().getFullYear()} {profile.name}</span><a href={`mailto:${profile.email}`}><Mail size={14} /> {profile.email}</a><a href="#top">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
