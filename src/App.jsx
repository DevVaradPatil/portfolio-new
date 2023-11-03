import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, GoToTopButton} from './components';
import MediaIcons from "./components/MediaIcons";

const App = () => {
  return (
    <BrowserRouter>
    <div className="relative z-0 bg-gradient-to-r from-[#ffffff] to-[#D7B6FF]">
      <GoToTopButton/>
      <MediaIcons/>
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar/>
          <Hero/>
        </div>
        <About/>
        <Experience/>
        <Tech/>
        <Works/>
        <Feedbacks/>
        <div className="relative z-0">
          <Contact/>
          <StarsCanvas/>
        </div>
    </div>
    </BrowserRouter>
  )
}

export default App
