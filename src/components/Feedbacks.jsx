import React from 'react'

import { motion } from 'framer-motion'
import {styles} from '../styles'
import {SectionWrapper} from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { testimonials } from '../constants'
import { quote } from '../assets'

const FeedbackCard = ({index, testimonial, name, designation, company, image}) => {
  return (
    <motion.div 
      variants={fadeIn("up","spring", index * 0.15, 0.75 )} 
      className='group cursor-pointer h-full'
    >
      <div className='relative bg-white/80 backdrop-blur-sm border border-violet-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col'>
        {/* Quote decoration */}
        <div className='absolute -top-4 left-8'>
          <div className='w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg'>
            <img src={quote} alt="" className='w-6 h-6 filter brightness-0 invert' />
          </div>
        </div>
        
        {/* Testimonial text */}
        <div className='mt-6 mb-8 flex-grow'>
          <p className='text-gray-700 text-lg leading-relaxed font-medium italic'>
            "{testimonial}"
          </p>
        </div>
        
        {/* Author info */}
        <div className='flex items-center gap-4 pt-6 border-t border-violet-100 mt-auto'>
          <div className='relative'>
            <img 
              src={image} 
              alt={`feedback-by-${name}`} 
              className='w-12 h-12 rounded-full object-cover ring-2 ring-violet-300 ring-offset-2'
            />
            {/* Online indicator */}
            <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></div>
          </div>
          
          <div className='flex-1'>
            <h4 className='text-gray-900 font-bold text-base'>{name}</h4>
            <p className='text-violet-600 font-semibold text-sm'>{designation}</p>
            <p className='text-gray-500 text-sm'>{company}</p>
          </div>
        </div>
        
        {/* Hover gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>
    </motion.div>
  )
}

const Feedbacks = () => {
  return (
    <div className='relative'>
      {/* Background with modern gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-white rounded-3xl'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-white/50 to-transparent rounded-3xl'></div>
      
      {/* Floating decorative elements */}
      <div className='absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-full blur-xl'></div>
      <div className='absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-tr from-purple-400/15 to-violet-500/15 rounded-full blur-2xl'></div>
      
      <div className='relative z-10 py-20 px-8'>
        {/* Header section */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Don't just take our word for it. Here's what our amazing clients have to say about their experience working with us.
        </motion.p>
        
        {/* Testimonials grid */}
        <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {testimonials.map((testimonial, index)=>(
            <FeedbackCard key={testimonial.name} index={index} {...testimonial}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionWrapper(Feedbacks,"")