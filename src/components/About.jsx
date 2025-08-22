import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion' 
import { SectionWrapper } from '../hoc'

const ServiceCard = ({ index, title, icon })=> {
  return (
    <Tilt className="xs:w-[250px] w-full">
        <motion.div 
          variants={fadeIn("right", "spring", 0.5*index , 0.75)}
          className='w-full bg-gradient-to-br from-violet-500 via-purple-600 to-violet-700 p-[2px] rounded-[24px] shadow-2xl hover:shadow-violet-500/25 transition-shadow duration-300 group'
        >
          <div 
            options={{
              max: 45,
              scale: 1,
              speed: 450
            }} 
            className='bg-gradient-to-br from-white via-gray-50 to-violet-50 rounded-[22px] py-8 px-8 min-h-[300px] flex justify-center items-center flex-col relative overflow-hidden'
          >
            {/* Background decoration */}
            <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full -translate-y-10 translate-x-10'></div>
            <div className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-200/20 to-violet-200/20 rounded-full translate-y-8 -translate-x-8'></div>
            
            {/* Icon container */}
            <div className='relative mb-6 p-6 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl shadow-lg'>
              <img 
                src={icon} 
                alt={title} 
                className='w-20 h-20 object-contain' 
                loading='lazy' 
              />
            </div>
            
            {/* Title */}
            <h3 className='text-theme text-[20px] font-semibold text-center leading-relaxed relative z-10'>
              {title}
            </h3>
          </div>
        </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secgray text-[17px] max-w-3xl leading-[30px]'>
      Welcome to the world of web development! I am a skilled and passionate web developer proficient in a wide range of technologies and programming languages. From HTML, CSS, and JavaScript to popular frameworks like React, Angular, and Vue.js, I have the expertise to create innovative and user-friendly online experiences. Let's collaborate to bring your digital vision to life using cutting-edge technologies.
      </motion.p>
      <div className='mt-10 flex flex-wrap gap-10'>
        {services.map((service, index)=>(
          <ServiceCard key={service.title} index={index} {...service}/>
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about");