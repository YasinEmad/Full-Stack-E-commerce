import React, { memo, lazy, Suspense } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { LoadingSpinner, LoadingOverlay } from '../../components/LoadingSpinner';

// Lazy load ProductCard for better initial load performance
const ProductCard = lazy(() => import('./ProductCard'));

// Memoized filter button component
const FilterButton = memo(({ label, selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm ${
      selected
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {children || label}
  </button>
));

const ProductList = ({
  title,
  filters,
  updateFilters,
  products,
  brands,
  totalPages,
  isLoading = false
}) => {
  const {
    priceRange,
    selectedBrands,
    selectedRating,
    sortBy,
    searchQuery,
    page
  } = filters;

  const {
    updatePriceRange,
    updateSelectedBrands,
    updateRating,
    updateSortBy,
    updateSearchQuery,
    updatePage
  } = updateFilters;

  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
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
            onChange={(e) => updateSortBy(e.target.value)}
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
                  onChange={(e) => updatePriceRange([priceRange[0], parseInt(e.target.value)])}
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
                  <FilterButton
                    key={brand}
                    selected={selectedBrands.includes(brand)}
                    onClick={() => {
                      const newBrands = selectedBrands.includes(brand)
                        ? selectedBrands.filter((b) => b !== brand)
                        : [...selectedBrands, brand];
                      updateSelectedBrands(newBrands);
                    }}
                    label={brand}
                  />
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FilterButton
                    key={rating}
                    selected={selectedRating === rating}
                    onClick={() => updateRating(rating)}
                  >
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        fill={selectedRating >= rating ? 'currentColor' : 'none'}
                      />
                      {rating}+
                    </div>
                  </FilterButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <LoadingOverlay isLoading={isLoading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Suspense fallback={<LoadingSpinner size="medium" />}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Suspense>
        </div>
      </LoadingOverlay>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => updatePage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ProductList);
