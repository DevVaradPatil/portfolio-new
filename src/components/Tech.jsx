import React from "react";
import { SectionWrapper } from "../hoc";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { technologies } from "../constants";
import { Tilt } from "react-tilt";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "./Arrows";

const SkillCard = ({ index, name, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full p-[35px]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full sm:w-[250px] bg-gradient-to-br from-violet-500 via-purple-600 to-violet-700 p-[2px] rounded-[24px] shadow-lg hover:shadow-violet-500/30 transition-shadow duration-300 group"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="rounded-[22px] bg-gradient-to-br from-white via-gray-50 to-violet-50 py-8 px-8 min-h-[280px] flex justify-center items-center flex-col relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-400/50 to-purple-500/50 rounded-full -translate-y-10 translate-x-10'></div>
          <div className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/40 to-violet-400/40 rounded-full translate-y-8 -translate-x-8'></div>
          
          {/* Direct image without container */}
          <div className='relative mb-6'>
            <img
              src={icon}
              alt={name}
              className="w-24 h-24 object-contain"
              loading="lazy"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-gray-800 text-[20px] font-semibold text-center leading-relaxed relative z-10">
            {name}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const Tech = () => {
  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0%",
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    easing: "ease-in-out",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    waitForAnimate: false,
    adaptiveHeight: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "0%",
          speed: 600,
        },
      },
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0%",
          arrows: false,
          speed: 500,
        },
      },
    ],
  };

  return (
    <div>
      <motion.div variants={textVariant()} className="mb-5">
        <p className={styles.sectionSubText}>What I Know</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>
      <Slider {...settings}>
        {technologies.map((skill, index) => (
          <SkillCard key={skill.name} index={index} {...skill} />
        ))}
      </Slider>
    </div>
  );
};

export default SectionWrapper(Tech, "");
