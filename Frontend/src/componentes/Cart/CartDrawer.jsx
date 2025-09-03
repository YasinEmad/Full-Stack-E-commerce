import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart } = useCart();
  // If the drawer is not open, don't render anything
  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    // Cart Drawer Panel
    <div
      className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
        <button
          onClick={closeCart}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
          aria-label="Close cart"
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]"> {/* Adjusted height for scrollable content */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-700 font-semibold">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">Subtotal:</span>
          <span className="text-lg font-bold text-indigo-600">${subtotal.toFixed(2)}</span>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-200">
          Proceed to Checkout
        </button>
        <button
          onClick={closeCart}
          className="w-full mt-2 text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md text-base hover:bg-indigo-50 transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;