import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ 
        background: "#1d1836", 
        color: "#fff",
        boxShadow: "0 25px 50px -12px rgba(139, 69, 255, 0.25)",
        border: "1px solid rgba(139, 69, 255, 0.2)",
        borderRadius: "16px"
      }}
      contentArrowStyle={{ borderRight: "10px solid #1d1836" }}
      date={experience.date}
      dateClassName={"sm:text-black font-semibold"}
      iconStyle={{ 
        background: experience.iconBg,
        boxShadow: "0 10px 25px -5px rgba(139, 69, 255, 0.4)",
        border: "3px solid rgba(255, 255, 255, 0.1)"
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[70%] h-[70%] object-contain filter drop-shadow-sm"
          />
        </div>
      }
    >
      <div className="relative">
        {/* Decorative gradient line */}
        <div className="absolute -top-2 left-0 w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
        
        <h3 className="text-white text-[24px] font-bold leading-tight mt-2">
          {experience.title}
        </h3>

        <p
          className="text-violet-300 text-[16px] font-semibold mt-1 flex items-center gap-2"
          style={{ margin: 0 }}
        >
          <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
          {experience.company_name}
        </p>
      </div>
      
      <ul className="mt-6 space-y-3">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-gray-300 text-[15px] leading-relaxed flex items-start gap-3 relative"
          >
            <div className="flex-shrink-0 w-1.5 h-1.5 bg-violet-400 rounded-full mt-2"></div>
            <span className="flex-1">{point}</span>
          </li>
        ))}
      </ul>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent rounded-b-2xl"></div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor={"black"}>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
