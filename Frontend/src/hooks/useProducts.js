// src/hooks/useProducts.js

import { useEffect, useState } from "react";
import { useCache } from "./useCache"; // استدعاء الهوك بتاع الكاش

const useProducts = (initialCategory = null) => {
  // استخدم الكاش بدلاً من useState للمنتجات
  const cacheKey = initialCategory ? `products_${initialCategory}` : "products_all";
  const [products, setProducts] = useCache(cacheKey, []);

  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(products.length === 0); // لو الكاش فاضي فقط
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("all");
  const [saleOnly, setSaleOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(300);

  const uniqueBrands = [...new Set(products.map((p) => p.brand))];

  // --- Fetch Products ---
 useEffect(() => {
  const fetchProducts = async () => {
    if (products.length > 0) {
      setFiltered(products);
      setLoading(false);
      return;
    }

    setLoading(true);
    let url = "http://localhost:5000/api/products";
    if (initialCategory) {
      url += `?category=${initialCategory}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [initialCategory, products, setProducts]);
 // نعمل fetch أول مرة أو لو تغيرت الفئة

  // --- Apply Filters ---
  useEffect(() => {
    let temp = [...products];

    if (searchTerm) {
      temp = temp.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (brand !== "all") {
      temp = temp.filter((p) => p.brand === brand);
    }

    if (saleOnly) {
      temp = temp.filter((p) => p.sale === true);
    }

    temp = temp.filter((p) => p.price <= maxPrice);

    setFiltered(temp);
  }, [brand, saleOnly, maxPrice, products, searchTerm]);

  const clearFilters = () => {
    setBrand("all");
    setSaleOnly(false);
    setMaxPrice(300);
    setSearchTerm("");
  };

  return {
    filtered,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    brand,
    setBrand,
    saleOnly,
    setSaleOnly,
    maxPrice,
    setMaxPrice,
    uniqueBrands,
    clearFilters,
    activeFilterCount:
      (brand !== "all" ? 1 : 0) +
      (saleOnly ? 1 : 0) +
      (maxPrice < 300 ? 1 : 0),
  };
};

export default useProducts;
