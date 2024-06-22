import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { share } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { Link } from "react-router-dom";
import { BsRocketTakeoff } from 'react-icons/bs'

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div onClick={() => window.open(source_code_link, "_blank")} variants={fadeIn("up", "spring", index * 0.5, 0.75)} className="cursor-pointer">
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-secondary transition-colors duration-300 hover:bg-violet-500 p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              className="w-10 bg-zinc-300 h-10 rounded-full flex justify-center items-center cursor-pointer"
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
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Latest Projects.</h2>
      </motion.div>

      <div className="w-full">
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
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
      <motion.div variants={fadeIn("up", "spring",  3, 0.75)}  className="w-full items-center justify-center">
        <Link
          to={"https://varad-dev-showcase.web.app/"}
          target="_blank"
          className="flex justify-center items-center mt-6 gap-3 bg-secondary rounded-xl px-5 py-4 text-lg font-semibold hover:bg-violet-600 transition duration-300"
        >
          View All Projects <BsRocketTakeoff size={22} />
        </Link>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
