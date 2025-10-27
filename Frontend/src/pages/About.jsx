import React from 'react';
import { Smartphone, Cpu, Palette, Globe, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Where Tech Meets Tradition</h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Bridging the digital world with timeless Arab elegance
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#FFF9F5"/>
          </svg>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Values Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-orange-500">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation First</h3>
              <p className="text-gray-700 leading-relaxed">
                We bring you the latest in technology, from flagship smartphones to smart accessories that enhance your digital lifestyle.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-orange-500">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cultural Pride</h3>
              <p className="text-gray-700 leading-relaxed">
                Authentic Arab fashion that honors tradition while embracing contemporary design and premium craftsmanship.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-orange-500">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-700 leading-relaxed">
                Every product meets our rigorous standards for excellence, ensuring you receive only the finest selections.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border-l-8 border-orange-500">
          <div className="flex items-start gap-6">
            <div className="bg-orange-100 p-4 rounded-xl flex-shrink-0">
              <Cpu className="w-10 h-10 text-orange-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To create a seamless shopping experience where technology enthusiasts and fashion connoisseurs alike can discover products that resonate with their lifestyle and values.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe in the power of diversity, the beauty of cultural expression, and the endless possibilities that emerge when innovation meets heritage. Join us in celebrating this unique fusion.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <Users className="w-16 h-16 text-orange-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Built by Passionate People</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our diverse team brings together tech experts, fashion specialists, and customer experience professionals dedicated to serving you with excellence every day.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Discover our curated collection of tech and fashion
          </p>
          <button 
            onClick={() => navigate('/categories')}
          className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-xl">
            
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}