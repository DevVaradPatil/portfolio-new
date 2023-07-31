import React from "react";
import { SectionWrapper } from "../hoc";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { technologies } from "../constants";
import { Tilt } from "react-tilt";

const SkillCard = ({ index, name, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full p-[35px]">
      <motion.div
        variants={fadeIn("right", "spring", (0.2*index)% 4, 0.75)}
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
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <motion.div variants={textVariant()} className="mb-5">
        <p className={styles.sectionSubText}>What I Know</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {technologies.map((skill, index) => (
          <SkillCard key={skill.name} index={index} {...skill} />
        ))}
      </Carousel>
    </div>
  );
};

export default SectionWrapper(Tech, "");
