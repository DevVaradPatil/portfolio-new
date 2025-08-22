import React from 'react'
import { AiOutlineGithub, AiOutlineCodepen } from 'react-icons/ai'
import { FaLinkedinIn } from "react-icons/fa6";
const MediaIcons = () => {
  return (
    <div className='fixed left-0 top-1/2 -translate-y-1/2 z-50 group'>
      <div className='bg-gradient-to-b from-violet-500 to-purple-600 backdrop-blur-sm border border-violet-400/30 shadow-2xl py-3 px-2 sm:py-5 sm:px-4 flex justify-center items-center flex-col gap-2 sm:gap-4 rounded-tr-xl sm:rounded-tr-2xl rounded-br-xl sm:rounded-br-2xl transition-all duration-300 hover:shadow-violet-500/25'>
        {/* Decorative line */}
        <div className='w-4 sm:w-8 h-0.5 bg-white/30 rounded-full mb-0.5 sm:mb-1'></div>
        
        <a 
          href='https://github.com/DevVaradPatil' 
          target='_blank' 
          rel='noopener noreferrer'
          className='relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-900/80 hover:bg-gray-800 text-white transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-6 sm:hover:rotate-12 hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-gray-900/50 group/icon'
        >
          <AiOutlineGithub fontSize={18} className='sm:text-2xl relative z-10'/>
          <div className='absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg sm:rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300'></div>
        </a>
        
        <a 
          href='https://www.linkedin.com/in/varad-patil-web-dev/' 
          target='_blank' 
          rel='noopener noreferrer'
          className='relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-600/80 hover:bg-blue-500 text-white transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-6 sm:hover:rotate-12 hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50 group/icon'
        >
          <FaLinkedinIn  fontSize={18} className='sm:text-2xl relative z-10'/>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg sm:rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300'></div>
        </a>
        
        <a 
          href='https://codepen.io/varadPatil' 
          target='_blank' 
          rel='noopener noreferrer'
          className='relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-900/80 hover:bg-gray-800 text-white transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-6 sm:hover:rotate-12 hover:scale-105 sm:hover:scale-110 hover:shadow-lg hover:shadow-gray-900/50 group/icon'
        >
          <AiOutlineCodepen fontSize={18} className='sm:text-2xl relative z-10'/>
          <div className='absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg sm:rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300'></div>
        </a>
        
        {/* Decorative line */}
        <div className='w-4 sm:w-8 h-0.5 bg-white/30 rounded-full mt-0.5 sm:mt-1'></div>
      </div>
    </div>
  )
}

export default MediaIcons