import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon

const CartDrawer = ({ isOpen, onClose }) => {
  // If the drawer is not open, don't render anything
  if (!isOpen) return null;

  return (
    // Removed the overlay div that caused the background to turn black
    // <>
    //   {/* Overlay for background dimming */}
    //   <div
    //     className="fixed inset-0 bg-black bg-opacity-50 z-40"
    //     onClick={onClose} // Close drawer when clicking outside
    //   ></div>
    // </>

    // Cart Drawer Panel
    <div
      className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300"
      // Apply transform based on isOpen state (handled by parent)
      // For simplicity, we'll assume the parent controls its visibility
      // and transition, but here's the base style for the drawer.
      // The actual slide-in/out is managed by the `isOpen` prop and
      // the conditional rendering.
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
          aria-label="Close cart"
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]"> {/* Adjusted height for scrollable content */}
        {/* Placeholder Cart Items */}
        <ul className="space-y-4">
          {/* Example Cart Item 1 */}
          <li className="flex items-center space-x-4 border-b pb-4">
            <img
              src="https://placehold.co/80x80/E0E7FF/333333?text=Item+1"
              alt="Product Image"
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">Stylish T-Shirt</h3>
              <p className="text-gray-600">Size: M, Color: Blue</p>
              <p className="text-gray-700 font-semibold">$29.99 x 1</p>
            </div>
            <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
          </li>

          {/* Example Cart Item 2 */}
          <li className="flex items-center space-x-4 border-b pb-4">
            <img
              src="https://placehold.co/80x80/F0F4F8/333333?text=Item+2"
              alt="Product Image"
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">Comfortable Jeans</h3>
              <p className="text-gray-600">Size: 32, Color: Black</p>
              <p className="text-gray-700 font-semibold">$59.99 x 1</p>
            </div>
            <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
          </li>

          {/* Add more cart items here */}
          <li className="flex items-center space-x-4 border-b pb-4">
            <img
              src="https://placehold.co/80x80/D1FAE5/333333?text=Item+3"
              alt="Product Image"
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">Sporty Sneakers</h3>
              <p className="text-gray-600">Size: 10, Color: White</p>
              <p className="text-gray-700 font-semibold">$89.99 x 1</p>
            </div>
            <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
          </li>
        </ul>

        {/* Empty cart message (conditionally render this) */}
        {/*
        <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
        */}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">Subtotal:</span>
          <span className="text-lg font-bold text-indigo-600">$179.97</span>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-200">
          Proceed to Checkout
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md text-base hover:bg-indigo-50 transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;