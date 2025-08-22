import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const BoxesCore = ({
  className,
  ...rest
}) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#a5b4fc",
    "#c4b5fd",
    "#fbbf24",
    "#fb7185"
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomDelay = () => {
    return Math.random() * 4; // Random delay between 0-4 seconds
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className
      )}
      {...rest}>
      {rows.map((_, i) => (
        <motion.div key={`row` + i} className="relative h-8 w-16 border-l border-slate-700/30">
          {cols.map((_, j) => {
            const boxIndex = i * cols.length + j;
            const shouldAnimate = Math.random() > 0.7; // 30% chance for each box to animate
            
            return (
              <motion.div
                key={`col` + j}
                initial={{
                  backgroundColor: "rgba(148, 163, 184, 0.05)",
                }}
                animate={shouldAnimate ? {
                  backgroundColor: [
                    "rgba(148, 163, 184, 0.05)",
                    getRandomColor() + "80", // Add transparency
                    "rgba(148, 163, 184, 0.05)"
                  ],
                  scale: [1, 1.02, 1],
                  transition: {
                    duration: 3,
                    delay: getRandomDelay(),
                    repeat: Infinity,
                    repeatDelay: Math.random() * 6 + 2, // Random delay between 2-8 seconds
                    ease: "easeInOut"
                  }
                } : {
                  backgroundColor: "rgba(148, 163, 184, 0.05)",
                }}
                className="relative h-8 w-16 border-t border-r border-slate-700/30">
                {j % 2 === 0 && i % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700/20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
