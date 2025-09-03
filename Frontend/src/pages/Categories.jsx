import React, { useState, useMemo } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { useProductFilters } from '../hooks/useProductFilters';
import ProductCard from '../componentes/Products/ProductCard';

const CategoriesAndProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', count: 156 },
    { id: 'mens', name: "Men's Fashion", count: 45 },
    { id: 'womens', name: "Women's Fashion", count: 52 },
    { id: 'accessories', name: 'Accessories', count: 28 },
    { id: 'casual', name: 'Casual Wear', count: 31 },
    { id: 'formal', name: 'Formal Wear', count: 22 },
    { id: 'sportswear', name: 'Sportswear', count: 35 },
    { id: 'footwear', name: 'Footwear', count: 43 }
  ];

  const brands = [
    'Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Prada', 'Calvin Klein', 
    'Tommy Hilfiger', 'Ralph Lauren', 'Levi\'s', 'Uniqlo', 'Forever 21'
  ];

  const allProducts = useMemo(() => [
    // Men's Fashion
    { id: 1, name: 'Classic Blue Denim Jacket', category: 'mens', price: 89, brand: 'Levi\'s', rating: 4.5, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300', inStock: true, sale: false },
    { id: 2, name: 'Wool Blend Overcoat', category: 'mens', price: 199, brand: 'Ralph Lauren', rating: 4.8, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300', inStock: true, sale: true },
    { id: 3, name: 'Casual Cotton T-Shirt', category: 'mens', price: 25, brand: 'Uniqlo', rating: 4.2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', inStock: true, sale: false },
    { id: 4, name: 'Slim Fit Chinos', category: 'mens', price: 65, brand: 'Calvin Klein', rating: 4.6, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300', inStock: false, sale: false },
    { id: 5, name: 'Leather Belt Brown', category: 'mens', price: 45, brand: 'Tommy Hilfiger', rating: 4.3, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', inStock: true, sale: false },
    
    // Women's Fashion
    { id: 6, name: 'Elegant Evening Dress', category: 'womens', price: 159, brand: 'Zara', rating: 4.7, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300', inStock: true, sale: false },
    { id: 7, name: 'Floral Summer Blouse', category: 'womens', price: 42, brand: 'H&M', rating: 4.1, image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=300', inStock: true, sale: true },
    { id: 8, name: 'High-Waisted Jeans', category: 'womens', price: 78, brand: 'Levi\'s', rating: 4.5, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300', inStock: true, sale: false },
    { id: 9, name: 'Silk Scarf Collection', category: 'womens', price: 95, brand: 'Gucci', rating: 4.9, image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300', inStock: true, sale: false },
    { id: 10, name: 'Knit Cardigan', category: 'womens', price: 68, brand: 'Uniqlo', rating: 4.4, image: 'https://images.unsplash.com/photo-1566479179817-0ea4be07a59b?w=300', inStock: false, sale: false },

    // Accessories
    { id: 11, name: 'Luxury Watch Gold', category: 'accessories', price: 299, brand: 'Calvin Klein', rating: 4.6, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300', inStock: true, sale: false },
    { id: 12, name: 'Designer Sunglasses', category: 'accessories', price: 145, brand: 'Prada', rating: 4.8, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300', inStock: true, sale: true },
    { id: 13, name: 'Leather Handbag', category: 'accessories', price: 189, brand: 'Gucci', rating: 4.7, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300', inStock: true, sale: false },
    { id: 14, name: 'Statement Necklace', category: 'accessories', price: 55, brand: 'Forever 21', rating: 4.2, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300', inStock: true, sale: false },
    { id: 15, name: 'Baseball Cap', category: 'accessories', price: 28, brand: 'Nike', rating: 4.3, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300', inStock: true, sale: false },

    // Casual Wear
    { id: 16, name: 'Hoodie Sweatshirt', category: 'casual', price: 52, brand: 'Nike', rating: 4.4, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300', inStock: true, sale: false },
    { id: 17, name: 'Jogger Pants', category: 'casual', price: 48, brand: 'Adidas', rating: 4.5, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300', inStock: true, sale: true },
    { id: 18, name: 'Graphic Print Tee', category: 'casual', price: 22, brand: 'H&M', rating: 4.0, image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=300', inStock: true, sale: false },
    { id: 19, name: 'Denim Shorts', category: 'casual', price: 38, brand: 'Zara', rating: 4.2, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300', inStock: false, sale: false },
    { id: 20, name: 'Canvas Sneakers', category: 'casual', price: 65, brand: 'Adidas', rating: 4.6, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300', inStock: true, sale: false },

    // Formal Wear
    { id: 21, name: 'Business Suit Navy', category: 'formal', price: 399, brand: 'Ralph Lauren', rating: 4.9, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', inStock: true, sale: false },
    { id: 22, name: 'Silk Tie Collection', category: 'formal', price: 65, brand: 'Tommy Hilfiger', rating: 4.5, image: 'https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=300', inStock: true, sale: false },
    { id: 23, name: 'Oxford Dress Shirt', category: 'formal', price: 85, brand: 'Calvin Klein', rating: 4.6, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300', inStock: true, sale: true },
    { id: 24, name: 'Pencil Skirt', category: 'formal', price: 72, brand: 'Zara', rating: 4.4, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300', inStock: true, sale: false },

    // Sportswear
    { id: 25, name: 'Running Shoes', category: 'sportswear', price: 120, brand: 'Nike', rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', inStock: true, sale: false },
    { id: 26, name: 'Yoga Leggings', category: 'sportswear', price: 58, brand: 'Adidas', rating: 4.5, image: 'https://images.unsplash.com/photo-1506629905117-b65e6a2b34a1?w=300', inStock: true, sale: true },
    { id: 27, name: 'Athletic Tank Top', category: 'sportswear', price: 35, brand: 'Nike', rating: 4.3, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300', inStock: true, sale: false },
    { id: 28, name: 'Sports Bra', category: 'sportswear', price: 42, brand: 'Adidas', rating: 4.4, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300', inStock: false, sale: false },

    // Footwear
    { id: 29, name: 'Leather Boots', category: 'footwear', price: 159, brand: 'Tommy Hilfiger', rating: 4.6, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300', inStock: true, sale: false },
    { id: 30, name: 'High Heels Black', category: 'footwear', price: 95, brand: 'Zara', rating: 4.3, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300', inStock: true, sale: true },
    { id: 31, name: 'Casual Loafers', category: 'footwear', price: 78, brand: 'Ralph Lauren', rating: 4.5, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300', inStock: true, sale: false },
    { id: 32, name: 'Winter Boots', category: 'footwear', price: 135, brand: 'Levi\'s', rating: 4.7, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300', inStock: true, sale: false }
  ], []);

  // Filter products by category first, then use the custom hook
  const categoryFilteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter(product => product.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  // Use the custom hook for other filters
  const {
    filters,
    updateFilters,
    paginatedProducts,
    totalPages
  } = useProductFilters(categoryFilteredProducts);

  const handleBrandChange = (brand) => {
    const newBrands = filters.selectedBrands.includes(brand) 
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    updateFilters.updateSelectedBrands(newBrands);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    updateFilters.updatePriceRange([0, 1000]);
    updateFilters.updateSelectedBrands([]);
    updateFilters.updateRating(0);
    updateFilters.updateSearchQuery('');
    updateFilters.updatePage(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => updateFilters.updatePage(filters.page - 1)}
          disabled={filters.page === 1}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => updateFilters.updatePage(page)}
            className={`px-3 py-2 text-sm border rounded-md ${
              filters.page === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => updateFilters.updatePage(filters.page + 1)}
          disabled={filters.page === totalPages}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-gray-600 mt-1">Discover the latest trends in fashion</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.searchQuery}
                  onChange={(e) => updateFilters.updateSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Sort */}
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters.updateSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-6`}>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => updateFilters.updatePriceRange([Number(e.target.value), filters.priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => updateFilters.updatePriceRange([filters.priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => updateFilters.updateRating(filters.selectedRating === rating ? 0 : rating)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.selectedRating === rating
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex">
                        {renderStars(rating)}
                      </div>
                      <span>& up</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {paginatedProducts.length} of {categoryFilteredProducts.filter(product => {
                  const query = filters.searchQuery.toLowerCase();
                  return (!filters.searchQuery || 
                    product.name.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query)) &&
                    product.price >= filters.priceRange[0] && 
                    product.price <= filters.priceRange[1] &&
                    (filters.selectedBrands.length === 0 || filters.selectedBrands.includes(product.brand)) &&
                    (filters.selectedRating === 0 || product.rating >= filters.selectedRating);
                }).length} products
                {selectedCategory !== 'all' && (
                  <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {paginatedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndProducts;