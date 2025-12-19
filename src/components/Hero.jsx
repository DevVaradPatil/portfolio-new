import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Scene from "./Scene";
import { HeroBackground } from "./canvas";
import { hero } from "../assets";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative w-full overflow-hidden max-w-[1600px] mx-auto">
      {!isMobile && <HeroBackground />}

      {/* Main container */}
      <div
        className={`${styles.paddingX} max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — Text */}
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              {/* Vertical accent */}
              <div className="hidden sm:flex flex-col items-center mt-2">
                <div className="w-4 h-4 rounded-full bg-violet-500 animate-pulse" />
                <div className="w-1 h-32 sm:h-64 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full" />
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-100/50 to-purple-100/50 blur-xl rounded-2xl" />

                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`${styles.heroHeadText} relative z-10 text-gray-800`}
                >
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
                    Varad
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`${styles.heroSubText} mt-4 text-gray-700 relative z-10`}
                >
                  <span className="font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Code. Design. Create.
                  </span>
                  <br />
                  Transforming the Web,
                  <br />
                  One Project at a Time.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 mt-8 relative z-10"
                >
                  <a
                    href="#projects"
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
                  >
                    View My Work
                  </a>

                  <a
                    href="#contact"
                    className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-violet-500 text-violet-600 font-semibold rounded-full hover:bg-violet-500 hover:text-white transition"
                  >
                    Let&apos;s Connect
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          {/* RIGHT — Visual */}
          <div className="flex justify-center items-center">
            {isMobile ? (
              <img
                src={hero}
                alt="hero"
                className="w-full max-w-sm mx-auto"
                loading="lazy"
              />
            ) : (
              <Scene />
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <a href="#about">
          <div className="w-[32px] h-[56px] rounded-3xl border-2 border-violet-500 flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-violet-500"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
