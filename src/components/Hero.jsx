import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Scene from "./Scene";

const Hero = () => {
  return (
    <section className="relative w-full z-20 overflow-hidden h-screen mx-auto max-w-[1300px]">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-violet-300/8 to-purple-400/8 rounded-full blur-2xl animate-bounce"></div>

      <div
        className={`${styles.paddingX} sm:flex-row top-[100px] max-w-7xl mx-auto flex flex-col items-start gap-5 absolute inset-0`}
      >
        <div className="flex flex-row mx-auto items-start gap-3 sm:w-full md:w-[70%] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col justify-center items-center mt-5"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30 animate-pulse" />
            <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-violet-500 via-purple-500 to-violet-600 rounded-full shadow-sm" />
          </motion.div>
          <div className="relative">
            {/* Decorative background for text */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-100/50 to-purple-100/50 rounded-2xl blur-xl opacity-60"></div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${styles.heroHeadText} text-gray-800 relative z-10`}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 bg-clip-text text-transparent font-extrabold animate-pulse">
                Varad
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4"
            >
              <p
                className={`${styles.heroSubText} text-gray-700 font-medium relative z-10`}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="inline-block"
                >
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold">
                    Code.
                  </span>{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent font-bold">
                    Design.
                  </span>{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold">
                    Create.
                  </span>
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="inline-block mt-2"
                >
                  Transforming the Web,
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="inline-block"
                >
                  One Project at a Time.
                </motion.span>
              </p>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-wrap gap-4 mt-8 relative z-10"
            >
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </a>

              <a
                href="#contact"
                className="group px-8 py-4 border-2 border-violet-500 text-violet-600 font-semibold rounded-full hover:bg-violet-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30"
              >
                Let's Connect
              </a>
            </motion.div>
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
