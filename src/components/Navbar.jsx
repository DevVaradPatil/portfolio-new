import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

import useSound from 'use-sound';
import song from '../assets/song.mp3'
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2'

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)

  const [play, {stop}] = useSound(song);

  return (
    <nav
      className={`
      ${styles.paddingX} w-full items-center py-3 fixed top-0 z-20 bg-transparent backdrop-blur-[2px]
    `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <img src={logo} alt="logo" className="w-[50px] object-contain" /> */}
          <h2 className="text-black font-semibold text-[30px]">[V]</h2>
          <p className="text-black text-[18px] font-bold cursor-pointer flex">
            Varad &nbsp; <span className="sm:block hidden"><span className="text-theme">|</span> Web Devloper</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-theme" : " text-gray-500"
              } hover:text-black text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <li onClick={()=> {
            if(isPlaying){
              stop();
              setIsPlaying(false);
            }
            else{
              setIsPlaying(true);
              play();
            }
          }} className="cursor-pointer">
            {!isPlaying? 
              <HiMiniSpeakerWave fontSize={25} color="gray"/> :
              <HiMiniSpeakerXMark fontSize={25} color="gray"/>
            }
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 green-pink-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-black" : "text-white"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle) 
                    setActive(link.title)
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li> 
                
              ))}
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
