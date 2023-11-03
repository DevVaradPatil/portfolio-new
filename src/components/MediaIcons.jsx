import React from 'react'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineCodepen } from 'react-icons/ai'

const MediaIcons = () => {
  return (
    <div className='fixed left-0 top-1/2 cursor-pointer bg-violet-500 py-4 flex justify-center items-center flex-col gap-3 px-3 rounded-tr-lg rounded-br-lg z-50'>
       <a href='https://github.com/DevVaradPatil' target='_blank' className='p-1 rounded-sm bg-gray-900 hover:bg-black transition-all hover:-translate-y-1'>
        <AiOutlineGithub fontSize={26}/>
       </a>
       <a href='https://www.linkedin.com/in/varad-patil-web-dev/' target='_blank' className='p-1 rounded-sm bg-indigo-700 hover:bg-indigo-800 transition-all hover:-translate-y-1'>
        <AiOutlineLinkedin fontSize={26}/>
       </a>
       <a href='https://codepen.io/varadPatil' target='_blank' className='p-1 rounded-sm bg-gray-900 hover:bg-black transition-all hover:-translate-y-1'>
        <AiOutlineCodepen fontSize={26}/>
       </a>
    </div>
  )
}

export default MediaIcons