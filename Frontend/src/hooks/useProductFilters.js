import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { useCache } from './useCache';

export const useProductFilters = (initialProducts) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Use cache for products
  const [cachedProducts] = useCache('products', initialProducts);
  
  // Get filters from URL or use defaults
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '0'),
    parseInt(searchParams.get('maxPrice') || '1000')
  ]);
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.get('brands')?.split(',').filter(Boolean) || []
  );
  const [selectedRating, setSelectedRating] = useState(
    parseInt(searchParams.get('rating') || '0')
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const productsPerPage = 12;

  // Debounce search query to prevent too many re-renders
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Update URL when filters change
  const updateSearchParams = useCallback((updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.length > 0) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  // Filter products
  // Effect to sync URL params with state
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchQuery) params.set('q', debouncedSearchQuery);
    else params.delete('q');
    setSearchParams(params);
  }, [debouncedSearchQuery, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = cachedProducts;

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Sort products
    const sortedProducts = [...filtered]; // Create a new array to avoid mutating the cached data
    switch (sortBy) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedProducts;
  }, [cachedProducts, debouncedSearchQuery, priceRange, selectedBrands, selectedRating, sortBy]);

  // Get paginated products
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  // Update filters
  const updatePriceRange = useCallback((newRange) => {
    setPriceRange(newRange);
    updateSearchParams({ minPrice: newRange[0], maxPrice: newRange[1] });
  }, [updateSearchParams]);

  const updateSelectedBrands = useCallback((brands) => {
    setSelectedBrands(brands);
    updateSearchParams({ brands: brands.join(',') });
  }, [updateSearchParams]);

  const updateRating = useCallback((rating) => {
    setSelectedRating(rating);
    updateSearchParams({ rating: rating.toString() });
  }, [updateSearchParams]);

  const updateSortBy = useCallback((sort) => {
    setSortBy(sort);
    updateSearchParams({ sort });
  }, [updateSearchParams]);

  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
    updateSearchParams({ q: query });
  }, [updateSearchParams]);

  const updatePage = useCallback((newPage) => {
    setPage(newPage);
    updateSearchParams({ page: newPage.toString() });
  }, [updateSearchParams]);

  return {
    filters: {
      priceRange,
      selectedBrands,
      selectedRating,
      sortBy,
      searchQuery,
      page,
      productsPerPage
    },
    updateFilters: {
      updatePriceRange,
      updateSelectedBrands,
      updateRating,
      updateSortBy,
      updateSearchQuery,
      updatePage
    },
    filteredProducts,
    paginatedProducts,
    totalPages: Math.ceil(filteredProducts.length / productsPerPage)
  };
};
