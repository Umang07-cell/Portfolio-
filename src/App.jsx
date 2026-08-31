import Navbar from "./components/Navbar";
import HeroV2 from "./components/HeroV2";
import Intro from "./components/Intro";
import ProjectsSlider from "./components/ProjectsSlider";
import TimelineV2 from "./components/TimelineV2";
import FooterV2 from "./components/FooterV2";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroV2 />
        <Intro />
        <ProjectsSlider />
        <TimelineV2 />
      </main>
      <FooterV2 />
    </SmoothScroll>
  );
}

export default App;
