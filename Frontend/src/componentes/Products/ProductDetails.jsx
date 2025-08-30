    import React, { useState } from 'react';
    import ProductsGrid from './ProductsGrid'; // Import the component

    // This is the JSON data you would typically fetch from an API
    const productData = {
     "id": "101",
     "name": "Elegance Flow-Knit Sweater",
     "brand": "Urban Threads",
     "description": "A stylish and comfortable sweater crafted from a premium flow-knit fabric. Its relaxed fit and timeless design make it perfect for any occasion, whether you're dressing up or keeping it casual. Features ribbed cuffs and a crewneck collar for a classic finish.",
     "price": 89.99,
     "OriginalPrice": 120.00,
     "currency": "USD",
     "images": [
      "/young-friends-having-fun-together (1).jpg",
      "/young-male-model-reading-side-view.jpg",
      "/young-japanese-woman-portrait-sitting-chair.jpg"
     ],
     "stock": 50,
     "rating": 4.7,
     "reviews": [
      {
       "id": "201",
       "author": "Jane Doe",
       "rating": 5,
       "comment": "Absolutely love this sweater! The material is so soft and it fits perfectly."
      }
     ],
     "availableSizes": ["S", "M", "L", "XL"],
     "availableColors": [
      { "name": "Ivory", "hex": "#F5F5DC" },
      { "name": "Charcoal", "hex": "#36454F" }
     ]
    };
    const relatedProducts = [
      {
        "id": "102",
        "name": "Urban Chic Hoodie",
        "image": "/young-japanese-woman-portrait-sitting-chair.jpg",
        "price": 59.99,
        "isNew": true
      },
      {
        "id": "103",
        "name": "Classic Denim Jacket",
        "image": "/young-male-model-reading-side-view.jpg",
        "price": 79.99,
        "isNew": false
      }
    ]

    const ProductDetails = () => {
     const [selectedImage, setSelectedImage] = useState(productData.images[0]);
     const [selectedSize, setSelectedSize] = useState(null);

     // Check if product data exists before rendering
     if (!productData) {
      return <div>Product not found.</div>;
     }

     return (
      <div> {/* Create a single root element */}
       <div className="flex flex-col lg:flex-row p-4 md:p-8 max-w-7xl mx-auto">
        {/* Product Image Gallery Section */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
         <div className="mb-4">
          <img
           src={selectedImage}
           alt={productData.name}
           className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
         </div>
         <div className="flex space-x-2 overflow-x-auto">
          {productData.images.map((image, index) => (
           <img
            key={index}
            src={image}
            alt={`${productData.name} thumbnail ${index + 1}`}
            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-md cursor-pointer border-2 ${
             selectedImage === image ? 'border-blue-500' : 'border-transparent'
            } hover:border-blue-500 transition-colors duration-200`}
            onClick={() => setSelectedImage(image)}
           />
          ))}
         </div>
        </div>

        {/* Product Information Section */}
        <div className="w-full lg:w-1/2 lg:pl-10 mt-6 lg:mt-0">
         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {productData.name}
         </h1>
         <p className="text-2xl font-semibold text-blue-600 mb-4">
          ${productData.price.toFixed(2)}
           <span className="text-gray-500 line-through ml-2">
             ${productData.OriginalPrice.toFixed(2)}
           </span>
         </p>
         
         {/* Sizes and other options */}
         <div className="mb-6">
          <p className="text-lg font-medium text-gray-700 mb-2">Select Size:</p>
          <div className="flex space-x-2">
           {productData.availableSizes.map((size) => (
            <button
             key={size}
             className={`py-2 px-4 rounded-md border ${
              selectedSize === size
               ? 'bg-blue-600 text-white border-blue-600'
               : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
             } transition-colors duration-200`}
             onClick={() => setSelectedSize(size)}
            >
             {size}
            </button>
           ))}
          </div>
         </div>

         <div className="prose prose-sm max-w-none text-gray-700 mb-6">
          <p>{productData.description}</p>
         </div>

         {/* Action Buttons */}
         <div className="flex flex-col space-y-4">
          <button
           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
           Add to Cart
          </button>
         </div>
        </div>
       </div>
       <h1 className="text-2xl font-bold text-gray-800 mt-8 max-w-7xl mx-auto px-4 md:px-8">Similar Products</h1>
       {/* Product grid */}
       <ProductsGrid products={relatedProducts} />
      </div>
     );
    };

    export default ProductDetails;