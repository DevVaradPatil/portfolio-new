import React from "react";
import { SectionWrapper } from "../hoc";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { technologies } from "../constants";
import { Tilt } from "react-tilt";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow , NextArrow } from "./Arrows"

const SkillCard = ({ index, name, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full p-[35px]">
      <motion.div
        variants={fadeIn("right", "spring", (0.2 * index) % 4, 0.75)}
        className="w-full sm:w-[250px] green-pink-gradient p-[3px] rounded-[22px] shadow-cardlow"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="rounded-[20px] bg-white py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={name} className="w-35 h-35 object-contain" />
          <h3 className="text-black text-[20px] text-center">{name}</h3>
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
    centerPadding: "0%", // Adjust this value to control the space between cards
    slidesToShow: 4,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    easing: "ease-in-out",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint:1024 ,
        settings: {
          slidesToShow: 3,
          centerPadding: "0%", // Adjust this value for the desired card width
        },
      },
      {
        breakpoint:  810,
        settings: {
          slidesToShow: 1,
          centerPadding: "0%",
          arrows: false,
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
