import React, { useState, useEffect } from 'react';
import { Star, Shield, Truck, Headphones, Mail, Phone, Clock, ChevronRight } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Quality Products",
      description: "We partner with trusted brands and suppliers to ensure high-quality products that exceed expectations.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick and reliable delivery with real-time tracking to get your fashion items to you as soon as possible.",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Headphones,
      title: "24/7 Customer Service",
      description: "Dedicated support team ready to assist you with personalized recommendations and exceptional service.",
      color: "from-orange-500 to-pink-600"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Fashion Items" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where premium fashion meets exceptional experience in the digital age
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                ))}
                <span className="ml-2 text-purple-200">Rated 4.9/5 by our customers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z" className="fill-slate-50 animate-pulse"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{transitionDelay: `${index * 0.1}s`}}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story & Mission Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                  alt="Our Story" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Since 2023</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2023, we've revolutionized the fashion industry by combining cutting-edge technology 
                with timeless style. Our carefully curated collection features premium clothing and accessories 
                for both men and women, ensuring that everyone can express their unique personality through fashion.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                What started as a passion project has grown into a trusted destination for fashion-forward 
                individuals who demand both quality and innovation in their wardrobe choices.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`order-2 lg:order-1 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We strive to create an extraordinary shopping experience that goes beyond traditional retail. 
                Our commitment to sustainability, ethical sourcing, and customer satisfaction drives every 
                decision we make.
              </p>
              <div className="space-y-4">
                {['Premium Quality Guaranteed', 'Sustainable Fashion Focus', 'Customer-First Philosophy'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{animationDelay: `${index * 0.2}s`}}></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`order-1 lg:order-2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                  alt="Our Mission" 
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gradient-to-r from-slate-50 to-white rounded-3xl my-16 shadow-xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why Choose Us?</h2>
          
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                const isActive = activeFeature === index;
                
                return (
                  <div 
                    key={index}
                    className={`group relative p-8 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                      isActive ? 'bg-white shadow-2xl' : 'bg-white/50 hover:bg-white shadow-lg hover:shadow-xl'
                    }`}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 transform transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    
                    <div className={`flex items-center text-transparent bg-gradient-to-r ${feature.color} bg-clip-text font-medium transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      Learn more <ChevronRight className="w-4 h-4 ml-1 text-purple-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-20">
          <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">Let's Connect</h2>
                <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
                  Ready to transform your style? We're here to help you every step of the way.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <Mail className="w-8 h-8 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Email Us</h3>
                    <p className="text-purple-200">support@yourstore.com</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <Phone className="w-8 h-8 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Call Us</h3>
                    <p className="text-purple-200">+1 (123) 456-7890</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <Clock className="w-8 h-8 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Business Hours</h3>
                    <p className="text-purple-200">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;