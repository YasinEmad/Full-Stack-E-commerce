import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    // 1. Add `group` for the hover effect and `overflow-hidden` to contain the zoom
    <section className="relative h-screen w-full group overflow-hidden">
      {/* Background Image */}
      <img
        src="https://i.pinimg.com/1200x/d2/f6/b1/d2f6b1b524e74589f153c0a8cd1db694.jpg"
        alt="fashion"
        className="w-full h-full object-cover
                   transition-transform duration-500 ease-in-out
                   group-hover:scale-105" // 2. Image zooms on section hover
      />

      {/* 3. Dark Overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-black/30"></div>

      {/* Text Content (z-10 ensures it's above the overlay) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <h1
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight 
                     animate-fade-in-down delay-200"
        >
          Redefine Your Everyday Look
        </h1>

        <p
          className="text-gray-200 text-lg md:text-xl mt-4 max-w-2xl 
                     animate-fade-in-up delay-500"
        >
          Step into the season with confidence. Explore premium designs made for comfort and style.
        </p>

        <button
          onClick={() => navigate('/categories')}
          className="mt-10 bg-[#fc9e11] text-black font-semibold py-3 px-10 rounded-full shadow-md 
                     hover:bg-[#c97900] transition-all duration-300 hover:scale-105 active:scale-95 
                     animate-fade-in-up delay-700 
                     animate-pulse [animation-delay:1200ms] [animation-duration:2s]" // 4. Added a delayed, slower pulse
        >
          Explore Collections
        </button>
      </div>
    </section>
  );
};

export default HeroSection;