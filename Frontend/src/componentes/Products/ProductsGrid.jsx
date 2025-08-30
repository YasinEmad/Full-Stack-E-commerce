// ProductsGrid.jsx
import React from 'react';
import ProductCard from './ProductCard'; // We'll create this next

const ProductsGrid = ({ products }) => {
  // We'll use this array of product data to populate the grid
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;