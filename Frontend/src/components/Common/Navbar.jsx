import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X,  
  Users, 
  Sparkles,
  User
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { openCart } from '../../redux/cartSlice';
import CartDrawer from '../Cart/CartDrawer';
import { Cpu, Globe2 } from 'lucide-react';


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
  { title: 'Tech', icon: Cpu, href: '/tech' },
  { title: 'Arab', icon: Globe2, href: '/arab' },
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
        <div className="relative flex items-center gap-2">
  <div className="w-10 h-10 rounded-2xl overflow-hidden flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
    <img 
      src="/ecommerce-svgrepo-com.svg" 
      alt="Logo"
      className="w-full h-full object-contain"
    />
  </div>

  <div className="hidden sm:block leading-tight">
  <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">
    ARAB
  </span>

  <span className="text-lg font-bold text-gray-800 block -mt-1">
    Tech
  </span>
</div>
</div>



            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-400 hover:bg-purple-50 transition-all duration-200 font-medium"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Cart Button */}
              <button
                onClick={() => dispatch(openCart())}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl text-gray-400 hover:text-orange-600 hover:bg-purple-50 transition-all duration-200 group"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full flex items-center justify-center font-medium group-hover:scale-110 transition-transform">
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
