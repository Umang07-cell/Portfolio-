import SectionHeader from "./ui/SectionHeader";
import { StaggerReveal } from "./ui/ScrollReveal";
import { aboutCopy } from "../data/content";

export default function About() {
  return (
    <section id="about" className="scroll-section scroll-section--animated">
      <div className="container about">
        <SectionHeader overline="ABOUT" heading={aboutCopy.heading} align="left" />
        <StaggerReveal className="about__body" variant="fadeUp" stagger={0.12}>
          {aboutCopy.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
