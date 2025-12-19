import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close, logo } from "../assets";

const words = ["Web Developer", "Web Designer", "Coder"];
const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [toggle]);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout;

    if (isTyping) {
      if (currentText.length < word.length) {
        timeout = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length + 1));
        }, 100); // Adjust typing speed as needed
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000); // Delay before erasing
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50); // Adjust erasing speed as needed
      } else {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentWordIndex, currentText, isTyping]);
  return (
    <nav
      className={`${
        styles.paddingX
      } w-full items-center py-4 fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="relative">
            <img
              loading="lazy"
              src={logo}
              alt="logo"
              className="w-[45px] h-[45px] object-contain transition-transform duration-300 group-hover:scale-110 rounded-full ring-2 ring-transparent group-hover:ring-theme/20"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <p className="text-gray-800 text-[18px] font-bold cursor-pointer flex items-center relative">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Varad
            </span>
            &nbsp;
            <span className="sm:flex hidden items-center">
              <span className="text-theme mx-2 text-xl">|</span>
              <span className="text-theme font-medium min-w-[120px]">
                {currentText}
                <span
                  className={`inline-block w-0.5 h-5 bg-theme ml-1 transition-opacity duration-150 relative top-1 ${
                    isTyping ? "animate-pulse" : "opacity-50"
                  }`}
                />
              </span>
            </span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.id} className="group relative">
              <a
                href={`#${link.id}`}
                className={`relative px-4 py-2 text-[16px] font-medium transition-all duration-300 rounded-lg ${
                  active === link.title
                    ? "text-theme bg-theme/10"
                    : "text-gray-600 hover:text-theme hover:bg-theme/5"
                }`}
                onClick={() => setActive(link.title)}
              >
                {link.title}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-theme transition-all duration-300 ${
                    active === link.title ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Varad_Resume_Dec_25.pdf"
              download
              className="relative inline-flex items-center px-6 py-2.5 text-[16px] font-medium text-white bg-gradient-to-r from-theme to-theme/80 rounded-full transition-all duration-300 hover:from-theme/90 hover:to-theme/70 hover:scale-105 hover:shadow-lg hover:shadow-theme/25 group overflow-hidden"
            >
              <span className="relative z-10">Resume</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </li>
        </ul>

        <div
          className="sm:hidden flex flex-1 justify-end items-center"
          ref={mobileMenuRef}
        >
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              toggle
                ? "bg-theme/50 rotate-180"
                : "bg-theme/50 hover:bg-theme/10"
            }`}
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            <img
              loading="lazy"
              src={toggle ? close : menu}
              alt="menu"
              className="w-5 h-5 object-contain transition-transform duration-300"
            />
          </button>

          <div
            className={`${
              !toggle
                ? "opacity-0 invisible translate-y-2 scale-95"
                : "opacity-100 visible translate-y-0 scale-100"
            } absolute top-16 right-4 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 transition-all duration-300 transform origin-top-right overflow-hidden`}
          >
            <div className="p-6">
              <ul className="space-y-4">
                {navLinks.map((link, index) => (
                  <li
                    key={link.id}
                    className={`transform transition-all duration-300 ${
                      toggle
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: toggle ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      className={`block px-4 py-3 rounded-xl text-[16px] font-medium transition-all duration-300 ${
                        active === link.title
                          ? "text-theme bg-theme/10 border-l-4 border-theme"
                          : "text-gray-700 hover:text-theme hover:bg-theme/5 hover:translate-x-2"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
                <li
                  className={`transform transition-all duration-300 ${
                    toggle
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: toggle
                      ? `${navLinks.length * 50}ms`
                      : "0ms",
                  }}
                >
                  <a
                    href="/Varad_Resume_Dec_25.pdf"
                    download
                    className="block w-full px-4 py-3 text-center text-white bg-gradient-to-r from-theme to-theme/80 rounded-xl font-medium transition-all duration-300 hover:from-theme/90 hover:to-theme/70 hover:scale-105 hover:shadow-lg"
                    onClick={() => setToggle(false)}
                  >
                    <span className="flex items-center justify-center">
                      Download Resume
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
