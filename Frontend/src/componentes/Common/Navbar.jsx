import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

// Local Components
import CartDrawer from '../Cart/CartDrawer'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false); // State for cart drawer visibility

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to toggle the cart drawer
  const toggleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  // Common Tailwind classes for navigation links
  const navLinkClasses = "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
  const mobileNavLinkClasses = "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo - uses Link for internal navigation to home */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                FashionStore
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/categories" className={navLinkClasses}>All Categories</Link>
              <Link to="/men" className={navLinkClasses}>Men</Link>
              <Link to="/women" className={navLinkClasses}>Women</Link>
              <Link to="/about" className={navLinkClasses}>About Us</Link>
              <Link to="/contact" className={navLinkClasses}>Contact</Link>
            </div>
          </div>

          {/* Right section: Cart */}
          <div className="flex items-center">
            {/* Cart Icon - now toggles the CartDrawer */}
            <div className="ml-4 flow-root lg:ml-6">
              <button
                onClick={toggleCartDrawer}
                className="group -m-2 p-2 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                aria-label="Open cart"
              >
                <FaShoppingCart className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  0
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Toggle between hamburger and close icon */}
              {!isMobileMenuOpen ? (
                <FaBars className="block h-6 w-6" />
              ) : (
                <FaTimes className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/categories" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>All Categories</Link>
            <Link to="/men" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Men</Link>
            <Link to="/women" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Women</Link>
            <Link to="/top-wear" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Top Wear</Link>
            <Link to="/bottom-wear" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Bottom Wear</Link>
            <Link to="/about" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>About Us</Link>
            <Link to="/contact" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Contact</Link>
          </div>
        </div>
      )}

      {/* Cart Drawer Component (conditionally rendered) */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={toggleCartDrawer} />
    </nav>
  );
};

export default Navbar;
