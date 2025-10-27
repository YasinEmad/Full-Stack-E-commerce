import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
import { Search, Filter, Star, ShoppingBag, Tag } from "lucide-react";
import { ofCategories } from "../hooks/useFilterProduct";

const AllProducts = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("all");
  const [saleOnly, setSaleOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [category, setCategory] = useState("all");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get products from Redux store
  const { items: allProducts = [], status, error } = useSelector((state) => state.products || {});

  useEffect(() => {
    if (status === "idle" || status === undefined) {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // loading flag
  const loading = status === "loading";

  const { filtered, uniqueBrands, uniqueCategories, activeFilterCount } = ofCategories(allProducts, {
    searchTerm,
    brand,
    saleOnly,
    maxPrice,
    category,
  });

  const clearFilters = () => {
    setSearchTerm("");
    setBrand("all");
    setCategory("all");
    setSaleOnly(false);
    setMaxPrice(2000);
  };

  // activeFilterCount is returned from the helper



  // --- Loading and Error States (Unchanged) ---
 if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
          <div className="absolute inset-3 rounded-full bg-gray-900"></div>
        </div>
        <p className="text-gray-300 text-xl font-medium tracking-wide">
          Loading premium products
        </p>
      </div>
    </div>
  );
}
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // --- Render (Simplified) ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 hover:text-orange-500 transition-colors duration-300">
              All Collections
            </h1>
            <p className="text-gray-600 text-lg">
              Browse men's, women's and accessories
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              Filters
              <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-3">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  {uniqueCategories.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-3">
                  Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-3 border border-orange-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="all">All Brands</option>
                  {uniqueBrands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sale Filter */}
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-3">
                  Special Offers
                </label>
                <label className="flex items-center gap-3 p-3 border border-orange-300 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors duration-200">
                  <input
                    type="checkbox"
                    checked={saleOnly}
                    onChange={() => setSaleOnly(!saleOnly)}
                    className="w-5 h-5 text-blue-600 bg-orange-100 border-orange-300 rounded focus:ring-blue-500"
                  />
                  <Tag className="w-4 h-4 text-red-500" />
                  <span className="text-orange-700">On Sale Only</span>
                </label>
              </div>

              {/* Price Filter --- THIS BLOCK IS CORRECTED --- */}
              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-3">
                  Max Price: {" "}
                  <span className="text-orange-600 font-bold">EGP{maxPrice}</span>
                </label>
                <div className="p-3 border border-orange-300 rounded-xl">
                  <input
                    type="range"
                    min="1" 
                    max="2000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-orange-500 mt-2">
                    <span>EGP 1</span>
                    <span>EGP 2000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-6 pt-6 border-t border-orange-200">
              <button
                onClick={clearFilters} // Use the clearFilters function from the hook
                className="text-orange-500 hover:text-orange-700 font-medium transition-colors duration-200"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {filtered.length}
            </span>{" "}
            products found
          </p>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters} // Use the clearFilters function from the hook
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain bg-white transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.sale && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg tracking-wide">
                        SALE
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg tracking-wide">
                        OUT OF STOCK
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex flex-col">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                      {product.brand}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 ">
                        EGP {product.price}
                      </p>                      {product.sale && (
                        <p className="text-sm text-gray-500 line-through ">
                          {(product.price * 1.2).toFixed(0)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            description: product.description,
                          })
                        )
                      }
                      className={`w-1/2 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        product.inStock
                          ? "bg-orange-500 text-white hover:bg-orange-700 hover:shadow-lg"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="w-1/2 py-3 rounded-xl font-semibold transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AllProducts;