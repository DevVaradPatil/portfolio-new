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
        <motion.div variants={fadeIn("right", "spring", 0.5*index , 0.75)} className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
          <div options={{
            max: 45,
            scale: 1,
            speed: 450
          }} className='bg-[#F5F5F5] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
            <img src={icon} alt={title} className='w-35 h-35 object-contain' loading='lazy' />
          </div>
            <h3 className='text-white text-[18px] text-center'>{title}</h3>
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