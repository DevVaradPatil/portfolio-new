import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const PrevArrow = (props) => (
  <button
    {...props}
    className="absolute z-10 bg-violet-200 text-gray-900 p-3 rounded-full -left-10 top-1/2 transform -translate-y-1/2 shadow-lg "
  >
    <BiLeftArrowAlt size={30} />
  </button>
);

const NextArrow = (props) => (
  <button
    {...props}
    className="absolute z-10 bg-violet-200 text-gray-900 p-3 rounded-full -right-16 top-1/2 transform -translate-y-1/2 shadow-lg"
  >
    <BiRightArrowAlt size={30} />
  </button>
);

export { PrevArrow, NextArrow };