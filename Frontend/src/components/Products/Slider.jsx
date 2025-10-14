import React, { useState, useEffect } from 'react';

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample images if none provided
  const defaultImages = [
    { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop', alt: 'Fashion 1' },
    { src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop', alt: 'Fashion 2' },
    { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop', alt: 'Fashion 3' }
  ];
  
  const slideImages = images || defaultImages;
  
  // Background words configuration
  const backgroundWords = [
    { text: 'FASHION', size: 'text-6xl', opacity: 'opacity-20' },
    { text: 'QUALITY', size: 'text-5xl', opacity: 'opacity-25' },
    { text: 'BEST PRICE', size: 'text-4xl', opacity: 'opacity-20' },
    { text: 'STYLE', size: 'text-7xl', opacity: 'opacity-15' },
    { text: 'TRENDY', size: 'text-5xl', opacity: 'opacity-20' },
    { text: 'PREMIUM', size: 'text-4xl', opacity: 'opacity-20' },
    { text: 'LUXURY', size: 'text-6xl', opacity: 'opacity-20' },
    { text: 'ELEGANT', size: 'text-5xl', opacity: 'opacity-20' }
  ];

  const [animatedWords, setAnimatedWords] = useState([]);

  useEffect(() => {
    const initWords = backgroundWords.map((word, index) => ({
      ...word,
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360
    }));
    setAnimatedWords(initWords);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedWords(prev => prev.map(word => {
        let newX = word.x + word.vx;
        let newY = word.y + word.vy;
        let newVx = word.vx;
        let newVy = word.vy;

        if (newX <= 0 || newX >= 95) {
          newVx = -word.vx;
          newX = newX <= 0 ? 0 : 95;
        }
        if (newY <= 0 || newY >= 90) {
          newVy = -word.vy;
          newY = newY <= 0 ? 0 : 90;
        }

        return {
          ...word,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          rotation: word.rotation + 0.2
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slideImages.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slideImages.length - 1 : prevSlide - 1));
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background Words */}
      <div className="absolute inset-0 pointer-events-none">
        {animatedWords.map((word) => (
          <div
            key={word.id}
            className={`absolute font-extrabold tracking-widest ${word.size} ${word.opacity} text-gray-300 select-none`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              transform: `rotate(${word.rotation}deg)`,
              textShadow: '0 0 25px rgba(0,0,0,0.1)',
              transition: 'transform 0.1s linear'
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* Main Slider */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative h-96">
            {slideImages.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-70 p-2 rounded-full text-gray-800 hover:bg-opacity-90 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-70 p-2 rounded-full text-gray-800 hover:bg-opacity-90 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slideImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gray-800 shadow-lg scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-6 right-6 bg-gray-800 bg-opacity-70 px-3 py-1 rounded-full text-white text-sm font-medium">
            {currentSlide + 1} / {slideImages.length}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gray-300 border-opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-gray-400 border-opacity-40 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 bg-gray-300 bg-opacity-20 rounded-full blur-sm animate-pulse"></div>
    </div>
  );
};

export default Slider;
