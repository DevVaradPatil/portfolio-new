import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full bg-gradient-to-br from-violet-500 via-purple-600 to-violet-700 p-[2px] rounded-[24px] shadow-2xl hover:shadow-violet-500/25 transition-shadow duration-300 group"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-gradient-to-br from-white via-gray-50 to-violet-50 rounded-[22px] py-8 px-8 min-h-[300px] flex justify-center items-center flex-col relative overflow-hidden"
        >
          {/*Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-300/50 to-purple-400/60 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-300/50 to-violet-400/60 rounded-full translate-y-8 -translate-x-8"></div>

          {/* Icon container */}
          <img
            src={icon}
            alt={title}
            className="w-32 h-32 object-contain"
            loading="lazy"
          />

          {/* Title */}
          <h3 className="text-theme mt-4 text-[20px] font-semibold text-center leading-relaxed relative z-10">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secgray text-justify md:text-left text-[17px] max-w-5xl leading-[30px]"
      >
        Hi, I'm Varad Patil, currently pursuing my M.Tech at IIT Kanpur, where
        I'm deeply passionate about crafting innovative digital experiences. My
        expertise lies in Web Development and Android Development, working with
        modern technologies like React, Next.js, MERN, and React Native to build
        scalable and user-friendly applications. I also explore the field of
        Artificial Intelligence, integrating intelligent features into my
        projects to create smarter, more efficient solutions. With a strong
        foundation in full-stack development and a drive to solve real-world
        problems, I enjoy turning ideas into impactful products that make a
        difference.
      </motion.p>
      <div className="mt-10 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
