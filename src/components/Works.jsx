import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { share } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { BsRocketTakeoff } from "react-icons/bs";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  isMobile,
}) => {
  const CardContent = () => (
    <div className="bg-secondary p-5 rounded-2xl sm:w-[360px] w-full h-full">
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
        />
        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={(e) => {
              e.stopPropagation();
              window.open(source_code_link, "_blank");
            }}
            className="w-10 bg-zinc-300 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-white transition-colors"
          >
            <img
              src={share}
              alt="github"
              className="w-1/2 h-1/2 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-black text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={tag.name} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      {isMobile ? (
        <div
          className="cursor-pointer"
          onClick={() => window.open(source_code_link, "_blank")}
        >
          <CardContent />
        </div>
      ) : (
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="cursor-pointer transition-colors duration-300 hover:bg-violet-500 rounded-2xl"
        >
          <div onClick={() => window.open(source_code_link, "_blank")}>
            <CardContent />
          </div>
        </Tilt>
      )}
    </motion.div>
  );
};

const Works = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)"); // sm breakpoint in tailwind
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) {
        setShowAll(true); // Show all on desktop
      } else {
        setShowAll(false); // Reset to limited view on mobile switch
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Determine projects to show
  // On desktop (not mobile), always show all. On mobile, depend on showAll state.
  const projectsToShow =
    !isMobile || showAll ? projects : projects.slice(0, visibleCount);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Latest Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experiences through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies
          and manage projects efficiently.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projectsToShow.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* {isMobile && !showAll && (
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="bg-secondary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-secondary rounded-xl hover:bg-violet-600 transition-all flex items-center gap-2"
          >
            Show More <BsRocketTakeoff />
          </button>
        </div>
      )} */}
    </>
  );
};

export default SectionWrapper(Works, "projects");
