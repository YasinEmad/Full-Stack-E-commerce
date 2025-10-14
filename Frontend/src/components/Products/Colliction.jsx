import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionsSection = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Arab's Collection",
      desc: "Modern designs inspired by Arab culture",
      img: "https://i.pinimg.com/736x/f3/18/0c/f3180c3976ea13d4e416df16c2698329.jpg",
      path: '/arab',
    },
    {
      title: "Tech Collection",
      desc: "Innovative apparel for modern minds",
      img: "https://plus.unsplash.com/premium_photo-1732096682381-b580213f885f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0",
      path: '/tech',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-orange-400 tracking-tight">
        Explore Our Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {collections.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-96 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                {item.title}
              </h3>
              <p className="text-gray-200 text-lg mb-4">{item.desc}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(item.path);
                }}
               className="border-2 border-white text-white font-medium py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white transition duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsSection;
