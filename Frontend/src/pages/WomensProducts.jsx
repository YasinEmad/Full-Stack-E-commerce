import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Star } from 'lucide-react';
import ProductCard from '../componentes/Products/ProductCard';

const WomensProducts = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const brands = [
    'Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Prada', 'Calvin Klein', 
    'Tommy Hilfiger', 'Ralph Lauren', 'Levi\'s', 'Uniqlo'
  ];

  const products = useMemo(() => [
    // Women's Fashion products
    { id: 6, name: 'Elegant Evening Dress', category: 'womens', price: 159, brand: 'Zara', rating: 4.7, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300', inStock: true, sale: false },
    { id: 7, name: 'Floral Summer Blouse', category: 'womens', price: 42, brand: 'H&M', rating: 4.1, image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=300', inStock: true, sale: true },
    { id: 8, name: 'High-Waisted Jeans', category: 'womens', price: 78, brand: 'Levi\'s', rating: 4.5, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300', inStock: true, sale: false },
    { id: 9, name: 'Silk Scarf Collection', category: 'womens', price: 95, brand: 'Gucci', rating: 4.9, image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300', inStock: true, sale: false },
    { id: 10, name: 'Knit Cardigan', category: 'womens', price: 68, brand: 'Uniqlo', rating: 4.4, image: 'https://images.unsplash.com/photo-1566479179817-0ea4be07a59b?w=300', inStock: false, sale: false },
    // Add more women's products as needed
  ], []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, searchQuery, priceRange, selectedBrands, selectedRating, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Women's Collection</h1>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="font-semibold mb-3">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      if (selectedBrands.includes(brand)) {
                        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                      } else {
                        setSelectedBrands([...selectedBrands, brand]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedBrands.includes(brand)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                      selectedRating === rating
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Star
                      size={16}
                      fill={selectedRating >= rating ? 'currentColor' : 'none'}
                    />
                    {rating}+
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WomensProducts;
