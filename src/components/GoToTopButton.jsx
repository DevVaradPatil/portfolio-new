import React, { useState, useEffect } from 'react';
import { BiUpArrowAlt } from 'react-icons/bi'

const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowButton(scrollTop > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-4 z-10 bg-purple-600 text-white py-2 px-2 hover:bg-purple-800 transition-all duration-300 rounded-md ${
        showButton ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <BiUpArrowAlt fontSize={30}/>
    </button>
  );
};

export default GoToTopButton;
