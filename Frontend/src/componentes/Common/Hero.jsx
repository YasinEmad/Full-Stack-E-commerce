import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full">
      <img
        src="/full-shot-cool-people-wearing-chain-necklace.jpg"
        alt="fashion"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0  bg-opacity-50" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight">
          Discover Your New Style
        </h1>
        <p className="text-lg md:text-xl text-center mb-8 max-w-2xl">
          Shop the latest trends in fashion. Find everything you need in one place with unbeatable prices.
        </p>
        <button 
          onClick={() => navigate('/categories')}
          className="bg-white text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;