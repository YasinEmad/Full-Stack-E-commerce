import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionsSection = () => {const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-800">
        Our Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Women's Collection */}
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <img
            src="\young-friends-having-fun-together (1).jpg"
            alt="Women's Collection"
            className="w-full h-96 object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            <div className="text-center text-white">
              <h3 className="text-4xl font-bold mb-2">Women's Collection</h3>
              <p className="text-lg mb-4">Discover the latest trends</p>
              <button 
                onClick={() => navigate('/women')}
                className="border-2 border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-black transition duration-300">
                Shop Women
              </button>
            </div>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <img
            src="\young-friends-having-fun-together.jpg"
            alt="Men's Collection"
            className="w-full h-96 object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            <div className="text-center text-white">
              <h3 className="text-4xl font-bold mb-2">Men's Collection</h3>
              <p className="text-lg mb-4">Step up your style game</p>
              <button 
               onClick={() => navigate('/men')}
               className="border-2 border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-black transition duration-300">
                Shop Men
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CollectionsSection;