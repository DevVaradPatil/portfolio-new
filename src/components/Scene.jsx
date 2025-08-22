import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex flex-col items-center justify-center fixed inset-0 bg-white z-50">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      className="w-10 h-10 bg-violet-500 rounded-full mb-4"
    />
    <p className="text-lg text-black font-semibold">Preparing Awesomeness...</p>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-screen">
      {loading && <Loader />}
      <Spline
        scene="https://prod.spline.design/yADUxi84L7oyr2Iy/scene.splinecode"
        onLoad={() => setLoading(false)}
        onProgress={(e) => {
          console.log(`Loading: ${e.percent * 100}%`);
        }}
      />
    </div>
  );
}


