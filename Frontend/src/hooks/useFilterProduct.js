// Centralized product filtering helpers used by pages to avoid repetition
// These are pure helper functions (no React hooks) that accept products
// and the current filter state and return the filtered list and metadata.

export function ofArab(products = [], opts = {}) {
  const { searchTerm = "", brand = "all", saleOnly = false, maxPrice = 2000 } = opts;

  const items = (products || []).filter(
    (p) => !p.category || String(p.category).toLowerCase() === "arab" || true
  );

  const q = String(searchTerm || "").toLowerCase();

  const filtered = items.filter(
    (p) =>
      String(p.name || "").toLowerCase().includes(q) &&
      Number(p.price || 0) <= Number(maxPrice) &&
      (brand === "all" || p.brand === brand) &&
      (!saleOnly || p.sale)
  );

  const uniqueBrands = [...new Set(items.map((p) => p.brand).filter(Boolean))];

  const activeFilterCount =
    (brand !== "all" ? 1 : 0) + (saleOnly ? 1 : 0) + (maxPrice < 2000 ? 1 : 0) + (searchTerm ? 1 : 0);

  return { filtered, uniqueBrands, activeFilterCount };
}

export function ofTech(products = [], opts = {}) {
  const { searchTerm = "", brand = "all", saleOnly = false, maxPrice = 2000 } = opts;

  const items = (products || []).filter(
    (p) => String(p.category || "").toLowerCase() === "tech"
  );

  const q = String(searchTerm || "").toLowerCase();

  const filtered = items
    .filter((p) => String(p.name || "").toLowerCase().includes(q))
    .filter((p) => (brand === "all" ? true : p.brand === brand))
    .filter((p) => (!saleOnly ? true : p.sale))
    .filter((p) => Number(p.price || 0) <= Number(maxPrice));

  const uniqueBrands = [...new Set(items.map((p) => p.brand).filter(Boolean))];

  const activeFilterCount = (brand !== "all" ? 1 : 0) + (saleOnly ? 1 : 0) + (maxPrice < 2000 ? 1 : 0) + (searchTerm ? 1 : 0);

  return { filtered, uniqueBrands, activeFilterCount };
}

export function ofCategories(products = [], opts = {}) {
  const { searchTerm = "", brand = "all", saleOnly = false, maxPrice = 2000, category = "all" } = opts;

  const items = products || [];

  const uniqueCategories = ["all", ...new Set(items.map((p) => p.category).filter(Boolean))];
  const uniqueBrands = [...new Set(items.map((p) => p.brand).filter(Boolean))];

  const q = String(searchTerm || "").toLowerCase();

  let filtered = [...items];

  if (category !== "all") filtered = filtered.filter((p) => p.category === category);

  if (searchTerm) {
    filtered = filtered.filter(
      (p) =>
        String(p.name || "").toLowerCase().includes(q) ||
        String(p.brand || "").toLowerCase().includes(q)
    );
  }

  if (brand !== "all") filtered = filtered.filter((p) => p.brand === brand);

  if (saleOnly) filtered = filtered.filter((p) => p.sale);

  filtered = filtered.filter((p) => Number(p.price || 0) <= Number(maxPrice));

  const activeFilterCount =
    (brand !== "all" ? 1 : 0) + (category !== "all" ? 1 : 0) + (saleOnly ? 1 : 0) + (maxPrice < 2000 ? 1 : 0) + (searchTerm ? 1 : 0);

  return { filtered, uniqueBrands, uniqueCategories, activeFilterCount };
}

// Default export for convenience
export default {
  ofArab,
  ofTech,
  ofCategories,
};

