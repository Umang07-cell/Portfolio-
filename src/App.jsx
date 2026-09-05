import Navbar from "./components/Navbar";
import HeroV2 from "./components/HeroV2";
import Intro from "./components/Intro";
import Work from "./components/Work";
import ProjectsSlider from "./components/ProjectsSlider";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import TimelineV2 from "./components/TimelineV2";
import FooterV2 from "./components/FooterV2";
import SmoothScroll from "./components/SmoothScroll";
import Chatbot from "./components/ui/Chatbot";

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroV2 />
        <Intro />
        <Work />
        <ProjectsSlider />
        <TechStack />
        <Experience />
        <TimelineV2 />
      </main>
      <FooterV2 />
      <Chatbot />
    </SmoothScroll>
  );
}

export default App;
