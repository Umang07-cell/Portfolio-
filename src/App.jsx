import Navbar from "./components/Navbar";
import HeroV2 from "./components/HeroV2";
import Intro from "./components/Intro";
import Work from "./components/Work";
import ProjectsSlider from "./components/ProjectsSlider";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import TimelineV2 from "./components/TimelineV2";
import Challenges from "./components/Challenges";
import FooterV2 from "./components/FooterV2";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroV2 />
        <Intro />
        <Work />
        <ProjectsSlider />
        <Challenges />
        <TechStack />
        <Experience />
        <TimelineV2 />
      </main>
      <FooterV2 />
    </SmoothScroll>
  );
}

export default App;
