import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNotification } from '../context/NotificationContext';
import Userlayout from '../components/Layout/Userlayout';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);

        const productImages = [data.image, data.image2, data.image3].filter(Boolean);
        setImages(productImages);
        setSelectedImage(productImages[0]);

        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        }));
      }
      showNotification(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart!`, 'success');
      setQuantity(1);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg animate-pulse">Loading product...</div>
      </div>
    );
  }

  const handleColorClick = (color, index) => {
    setSelectedColor(color);
    if (images[index]) {
      setSelectedImage(images[index]);
    }
  };

  return (
    <Userlayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Product Images */}
            <div className="flex flex-col items-center lg:items-start">
              {/* Main Image Container */}
              <div className="w-full bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-hidden">
                <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="w-full">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Product Images</p>
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                          selectedImage === image
                            ? 'border-blue-500 shadow-lg ring-2 ring-blue-300'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Product Info */}
            <div className="flex flex-col justify-start lg:sticky lg:top-20">
              {/* Product Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-green-600 font-semibold text-sm mt-2 flex items-center gap-1">
                  <span>✓</span> Free Shipping Worldwide
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                    Available Colors
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleColorClick(color, index)}
                        className={`w-12 h-12 rounded-full border-3 transition-all duration-300 transform ${
                          selectedColor === color
                            ? 'border-gray-900 shadow-lg scale-110'
                            : 'border-gray-300 hover:border-gray-600 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-semibold"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-0 focus:ring-2 focus:ring-blue-500 outline-none font-semibold"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95 mb-4"
              >
                Add {quantity > 1 ? `${quantity} items` : 'to Cart'}
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">✓</p>
                  <p className="text-xs font-semibold text-gray-700">7-Day Return</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">🔒</p>
                  <p className="text-xs font-semibold text-gray-700">Secure Payment</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">🎧</p>
                  <p className="text-xs font-semibold text-gray-700">24/7 Support</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Product Features */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Why Choose This Product
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="text-green-500 font-bold mt-1">✓</span>
                    <span>Premium quality with guaranteed durability</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="text-green-500 font-bold mt-1">✓</span>
                    <span>Fast and free shipping worldwide</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="text-green-500 font-bold mt-1">✓</span>
                    <span>Hassle-free returns within 7 days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Userlayout>
  );
};

export default ProductDetails;
