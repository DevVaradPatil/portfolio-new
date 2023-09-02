import React from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { hero } from '../assets'
import { fadeIn, textVariant } from '../utils/motion' 

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto max-w-[1300px]'>
      <div className={`${styles.paddingX} sm:flex-row top-[100px] max-w-7xl mx-auto flex flex-col items-start gap-5 absolute inset-0`}>
        <div className='flex flex-row mx-auto items-start gap-3'>
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }} className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#8A2BE2]'/>
           <div className='w-1 sm:h-80  h-40 violet-gradient'/>
        </motion.div>
        <div>
          <motion.h1 initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
   className={`${styles.heroHeadText} text-black`}>Hi, I'm <span className='text-theme'> Varad </span></motion.h1>
          <motion.p initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }} className={`${styles.heroSubText} text-black-100 mt-2`}>
          Code. Design. Create. <span className='block'></span> Transforming  the Web, <span className='block'></span> One Project at a Time.
          </motion.p>
        </div>
        </div>
        <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        >
        <img src={hero} alt="hero__img"  className='w-[600px] sm:ml-20'/>
        </motion.div>
      </div>

        <div className='absolute xs:bottom-10 bottom-32  w-full flex justify-center items-center'>
          <a href="#about">
            <div className='w-[35px] h-[64px] rounded-3xl border-4 border-violet-500 flex justify-center items-start p-2'>
              <motion.div
                animate={{
                  y: [0, 24, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
                className="w-3 h-3 rounded-full bg-violet-500 mb-1"
              />
            </div>
          </a>
        </div>
    </section>
  )
}

export default Hero