import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  GoToTopButton,
  Works2,
} from "./components";
import MediaIcons from "./components/MediaIcons";
import ToasterProvider from "./utils/ToasterProvider";

const App = () => {
  return (
    <BrowserRouter>
      <ToasterProvider />
      <div className="relative z-0 bg-gradient-to-r from-[#ffffff] to-[#D7B6FF]">
        <GoToTopButton />
        <MediaIcons />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <div className="hidden sm:flex">
          <Works />
        </div>
        <div className="flex sm:hidden">
          <Works2 />
        </div>
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
