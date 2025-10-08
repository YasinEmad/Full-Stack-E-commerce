import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full">
      <img
        src="https://i.pinimg.com/1200x/d2/f6/b1/d2f6b1b524e74589f153c0a8cd1db694.jpg"
        alt="fashion"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
        >
          Redefine Your Everyday Look
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-gray-200 text-lg md:text-xl mt-4 max-w-2xl"
        >
          Step into the season with confidence. Explore premium designs made for comfort and style.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/categories')}
          className="mt-10 bg-[#e48d0c] text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-[#c97900] transition-all duration-300"
        >
          Explore Collections
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
