import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Userlayout from '../components/Layout/Userlayout';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const dispatch = useDispatch();

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
      dispatch(addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      }));
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
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side - Product Images */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex mt-5 space-x-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 transition-all duration-200 ${
                    selectedImage === image ? 'border-blue-500 scale-105' : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color ? 'border-blue-600 scale-110' : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorClick(color, index)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <div className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">Free Shipping</span>
                <span className="text-green-600 font-semibold">✓</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 w-full md:w-auto"
            >
              Add to Cart
            </button>

            <div className="mt-6 border-t border-gray-200 pt-6 text-sm text-gray-600 leading-relaxed">
              <p>• Secure checkout</p>
              <p>• 7-day easy return policy</p>
              <p>• 24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </Userlayout>
  );
};

export default ProductDetails;
