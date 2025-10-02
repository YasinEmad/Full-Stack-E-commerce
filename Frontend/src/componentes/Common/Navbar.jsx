import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Shirt, 
  Crown, 
  Users, 
  Sparkles,
  User
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { openCart } from '../../redux/cartSlice';
import CartDrawer from '../Cart/CartDrawer';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { title: 'Collections', icon: Sparkles, href: '/categories' },
    { title: 'Men', icon: Shirt, href: '/men' },
    { title: 'Women', icon: Crown, href: '/women' },
    { title: 'About', icon: Users, href: '/about' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 lg:h-14">

            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="group flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                      <path d="m10.7 13.7 1.6 1.6 3.9-3.9c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-4.6 4.6c-.4.4-1 .4-1.4 0l-2.3-2.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0z"/>
                    </svg>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Luxe
                  </span>
                  <span className="text-sm text-gray-500 block -mt-1">Fashion</span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200">
                <User className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => dispatch(openCart())}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 group"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium group-hover:scale-110 transition-transform">
                  {cartItems.length}
                </span>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              >
                {!isMobileMenuOpen ? (
                  <Menu className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-12 lg:h-14"></div>
      <CartDrawer />
    </>
  );
};

export default Navbar;
