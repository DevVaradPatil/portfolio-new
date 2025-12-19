import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  GoToTopButton,
} from "./components";
import MediaIcons from "./components/MediaIcons";
import ToasterProvider from "./utils/ToasterProvider";

const StarsCanvas = React.lazy(() => import("./components/canvas/Stars"));

const App = () => {
  return (
    <BrowserRouter>
      <ToasterProvider />
      <div className="relative z-0 bg-gradient-to-r from-[#ffffff] to-[#D7B6FF]">
        <GoToTopButton />
        <MediaIcons />
        <div className="">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
