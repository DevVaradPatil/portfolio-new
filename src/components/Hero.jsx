import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Scene from "./Scene";

const Hero = () => {

  return (
    <section className="relative w-full h-screen mx-auto max-w-[1300px]">
      <div
        className={`${styles.paddingX} sm:flex-row top-[100px] max-w-7xl mx-auto flex flex-col items-start gap-5 absolute inset-0`}
      >
        <div className="flex flex-row mx-auto items-start gap-3 sm:w-full md:w-[70%]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col justify-center items-center mt-5"
          >
            <div className="w-5 h-5 rounded-full bg-[#8A2BE2]" />
            <div className="w-1 sm:h-80  h-40 violet-gradient" />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${styles.heroHeadText} text-black`}
            >
              Hi, I'm <span className="text-theme"> Varad </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`${styles.heroSubText} text-black-100 mt-2`}
            >
              Code. Design. Create. <span className="block"></span> Transforming
              the Web, <span className="block"></span> One Project at a Time.
            </motion.p>
          </div>
        </div>

        <div className="flex sm:hidden">
          <div className="flex w-full">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/my-3d-portfolio.appspot.com/o/creator.webp?alt=media&token=2a51ff1e-6747-45dd-a597-36d99ef89e3b"
              alt="hero__img"
              className="w-full mix-blend-multiply"
            />
          </div>
        </div>
        <div className="hidden sm:flex w-full justify-center items-center ">
        <Scene />
        </div>

      </div>

      <div className="absolute xs:bottom-10 bottom-10  w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-violet-500 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-violet-500 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
