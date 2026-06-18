import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, X, ChevronDown, Tag, ArrowRight, Zap, Trophy, Star } from "lucide-react";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { dealProducts, SALE_END } from "../data/deals";
import ProductCard from "../components/ui/ProductCard";
import CountdownTimer from "../components/ui/CountdownTimer";

const sortOptions = [
  { value: "default",    label: "Featured" },
  { value: "newest",     label: "Newest First" },
  { value: "sale",       label: "Hot Deals" },
  { value: "rating",     label: "Top Rated" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc",   label: "Name: A–Z" },
];

// Unique sub-categories per category
function getSubCategories(categorySlug) {
  const scoped =
    categorySlug === "all"
      ? products
      : products.filter((p) => p.category === categorySlug);
  const seen = new Set();
  const result = [];
  scoped.forEach((p) => {
    if (p.subCategory && !seen.has(p.subCategory)) {
      seen.add(p.subCategory);
      result.push(p.subCategory);
    }
  });
  return result;
}

// Top 8 products by rating (then review count as tiebreaker)
const bestSellers = [...products]
  .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
  .slice(0, 8);

// All unique brands with their product counts
const allBrands = (() => {
  const map = {};
  products.forEach((p) => {
    if (!map[p.brand]) map[p.brand] = 0;
    map[p.brand]++;
  });
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
})();

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch]             = useState("");
  const [sort, setSort]                 = useState("default");
  const [activeSubCat, setActiveSubCat] = useState("all");

  const activeCategory = searchParams.get("category") || "all";
  const activeBrand    = searchParams.get("brand")    || "";
  const activeView     = searchParams.get("view")     || "";

  // Read ?sort= and ?q= from URL on first load / param change
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const validSorts = sortOptions.map((o) => o.value);
    if (sortParam && validSorts.includes(sortParam)) {
      setSort(sortParam);
    } else if (!sortParam) {
      setSort("default");
    }

    const q = searchParams.get("q");
    if (q) {
      setSearch(q);
      searchParams.delete("q");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams.toString()]);

  const setCategory = (slug) => {
    setActiveSubCat("all");
    setSearch("");
    const next = new URLSearchParams(searchParams);
    next.delete("brand");
    next.delete("view");
    next.delete("q");
    if (slug === "all") next.delete("category");
    else next.set("category", slug);
    setSearchParams(next);
  };

  const setBrand = (name) => {
    const next = new URLSearchParams();
    next.set("brand", name);
    setSearchParams(next);
  };

  const subCategories = useMemo(
    () => getSubCategories(activeCategory),
    [activeCategory]
  );

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeBrand) {
      result = result.filter((p) => p.brand === activeBrand);
    } else if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeSubCat !== "all") {
      result = result.filter((p) => p.subCategory === activeSubCat);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.compatibility && p.compatibility.toLowerCase().includes(q)) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "sale":
        result = result.filter((p) => p.badge !== null);
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, activeBrand, activeSubCat, search, sort]);

  // Page heading
  const pageTitle = (() => {
    if (activeView === "brands") return "Shop by Brand";
    if (activeBrand)             return `${activeBrand} Parts`;
    if (sort === "sale")         return "Hot Deals";
    if (sort === "newest")       return "New Parts";
    if (sort === "rating")       return "Best Selling";
    if (activeCategory !== "all")
      return categories.find((c) => c.slug === activeCategory)?.name ?? "All Parts";
    return "All Parts";
  })();

  /* ── Hot Deals dedicated page ── */
  if (sort === "sale") {
    return (
      <>
        <Helmet>
          <title>Hot Deals — Momentum Auto Spares</title>
          <meta name="description" content="Weekend flash sale — up to 33% off select auto parts. Limited time only." />
        </Helmet>

        {/* Hero banner with timer */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-red-950 to-gray-900">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 50%), radial-gradient(circle at 80% 20%, #b91c1c 0%, transparent 40%)" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center gap-6">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg animate-pulse">
              <Zap size={12} /> Weekend Flash Sale
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-xl">
              Hot <span className="text-red-500">Deals</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl">
              Huge savings on top-rated parts — brake pads, oils, spark plugs & more.
              Grab yours before the sale ends!
            </p>

            {/* Countdown timer */}
            <CountdownTimer endDate={SALE_END} />

            {/* Deal count pill */}
            <span className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              {dealProducts.length} deals available right now
            </span>
          </div>
        </div>

        {/* Deal products grid */}
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                All Deals{" "}
                <span className="text-sm font-normal text-gray-400">
                  ({dealProducts.length} items)
                </span>
              </h2>
              <Link
                to="/products"
                className="text-sm text-red-600 font-semibold hover:underline flex items-center gap-1"
              >
                Browse all parts <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {dealProducts.map((product) => (
                <div key={product.id} className="relative">
                  {/* Deal label ribbon */}
                  <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wide">
                    {product.dealLabel}
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center bg-white rounded-2xl border border-gray-100 py-10 px-6 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Looking for more parts?</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Browse our full catalogue
              </h3>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Shop All Parts <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ── Best Selling dedicated page ── */
  if (sort === "rating") {
    const rankColors = ["#F59E0B", "#9CA3AF", "#B45309", "#6B7280", "#6B7280", "#6B7280", "#6B7280", "#6B7280"];
    const rankLabels = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8"];

    return (
      <>
        <Helmet>
          <title>Best Selling Parts — Momentum Auto Spares</title>
          <meta name="description" content="Our top 8 best-selling auto parts — rated and trusted by hundreds of customers in Nairobi." />
        </Helmet>

        {/* Hero banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-amber-950 to-gray-900">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 25% 60%, #F59E0B 0%, transparent 50%), radial-gradient(circle at 75% 20%, #D97706 0%, transparent 40%)" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center gap-5">
            <span className="inline-flex items-center gap-2 bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
              <Trophy size={12} /> Customer Favourites
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-xl">
              Best <span className="text-amber-400">Selling</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl">
              Handpicked from hundreds of orders — the parts our customers trust and reorder the most.
            </p>
            {/* Star row */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="flex gap-6 text-center mt-1">
              <div>
                <p className="text-2xl font-black text-white">8</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Top Picks</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white">4.8+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Avg. Rating</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white">500+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Top 8 Parts{" "}
                <span className="text-sm font-normal text-gray-400">ranked by customer rating</span>
              </h2>
              <Link to="/products" className="text-sm text-red-600 font-semibold hover:underline flex items-center gap-1">
                Browse all parts <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {bestSellers.map((product, idx) => (
                <div key={product.id} className="relative">
                  {/* Rank badge */}
                  <div
                    className="absolute -top-3 -left-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg border-2 border-white"
                    style={{ backgroundColor: rankColors[idx] }}
                  >
                    {rankLabels[idx]}
                  </div>
                  {/* Gold glow for top 3 */}
                  {idx < 3 && (
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-amber-400/60 pointer-events-none z-10" />
                  )}
                  <ProductCard product={{ ...product, badge: product.badge ?? "Best Seller" }} />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center bg-white rounded-2xl border border-gray-100 py-10 px-6 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Want to see everything?</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browse our full catalogue</h3>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Shop All Parts <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle} — Momentum Auto Spares</title>
        <meta
          name="description"
          content="Browse genuine auto parts: oils, brake pads, spark plugs, bulbs, CV joints, wipers and more at Momentum Auto Spares."
        />
      </Helmet>

      {/* Page header */}
      <div className="bg-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs text-red-500 font-bold uppercase tracking-widest">
            {activeView === "brands" ? "Browse" : "Our Catalogue"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
            {pageTitle}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            {activeView === "brands"
              ? `${allBrands.length} brands available`
              : `${products.length}+ genuine parts for all makes and models`}
          </p>
        </div>
      </div>

      {/* ── Brands grid view ── */}
      {activeView === "brands" ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allBrands.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setBrand(name)}
                className="group flex flex-col items-center justify-center gap-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-red-200 hover:bg-red-50 transition-all text-center"
              >
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-red-100 rounded-full flex items-center justify-center transition-colors">
                  <Tag size={18} className="text-gray-500 group-hover:text-red-500" />
                </div>
                <span className="font-semibold text-gray-800 text-sm leading-tight">
                  {name}
                </span>
                <span className="text-xs text-gray-400">{count} part{count !== 1 ? "s" : ""}</span>
                <span className="text-xs text-red-500 font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  View <ArrowRight size={11} />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── Products view ── */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Active brand breadcrumb */}
          {activeBrand && (
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setSearchParams({ view: "brands" })}
                className="text-sm text-red-500 hover:underline"
              >
                All Brands
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-sm font-semibold text-gray-700">{activeBrand}</span>
              <button
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  next.delete("brand");
                  setSearchParams(next);
                }}
                className="ml-auto text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
              >
                <X size={12} /> Clear
              </button>
            </div>
          )}

          {/* Top controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, brand, SKU, or vehicle..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  const val = e.target.value;
                  setSort(val);
                  const next = new URLSearchParams(searchParams);
                  if (val === "default") next.delete("sort");
                  else next.set("sort", val);
                  setSearchParams(next);
                }}
                className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="w-56 flex-shrink-0 hidden md:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Category</h3>
                  <ul className="space-y-0.5">
                    <li>
                      <button
                        onClick={() => setCategory("all")}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                          activeCategory === "all" && !activeBrand
                            ? "bg-red-50 text-red-600 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span>All Parts</span>
                        <span className="text-xs text-gray-400">{products.length}</span>
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setCategory(cat.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                            activeCategory === cat.slug && !activeBrand
                              ? "bg-red-50 text-red-600 font-semibold"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-gray-400">{cat.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {subCategories.length > 1 && !activeBrand && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Type</h3>
                    <ul className="space-y-0.5">
                      <li>
                        <button
                          onClick={() => setActiveSubCat("all")}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            activeSubCat === "all"
                              ? "bg-gray-100 text-gray-900 font-semibold"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          All Types
                        </button>
                      </li>
                      {subCategories.map((sc) => (
                        <li key={sc}>
                          <button
                            onClick={() => setActiveSubCat(sc)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                              activeSubCat === sc
                                ? "bg-gray-100 text-gray-900 font-semibold"
                                : "text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {sc}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Browse by brand shortcut */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">Brands</h3>
                  <Link
                    to="/products?view=brands"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
                  >
                    <Tag size={13} /> Browse all brands
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Mobile category chips */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
                <button
                  onClick={() => setCategory("all")}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    activeCategory === "all" ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.slug)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      activeCategory === cat.slug ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {subCategories.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
                  <button
                    onClick={() => setActiveSubCat("all")}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-semibold border transition-colors ${
                      activeSubCat === "all" ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-500 border-gray-200"
                    }`}
                  >
                    All Types
                  </button>
                  {subCategories.map((sc) => (
                    <button
                      key={sc}
                      onClick={() => setActiveSubCat(sc)}
                      className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-semibold border transition-colors ${
                        activeSubCat === sc ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-500 border-gray-200"
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              )}

              {/* Results summary */}
              <p className="text-sm text-gray-500 mb-5">
                Showing{" "}
                <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "part" : "parts"}
                {activeBrand && (
                  <> from <span className="text-red-600 font-semibold">{activeBrand}</span></>
                )}
                {!activeBrand && activeCategory !== "all" && (
                  <> in <span className="text-red-600 font-semibold">
                    {categories.find((c) => c.slug === activeCategory)?.name}
                  </span></>
                )}
                {activeSubCat !== "all" && (
                  <> — <span className="text-gray-700 font-medium">{activeSubCat}</span></>
                )}
                {search && (
                  <> matching <span className="text-gray-700 font-medium">"{search}"</span></>
                )}
              </p>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-3">🔍</p>
                  <h3 className="text-lg font-semibold text-gray-900">No parts found</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Try a different search term, vehicle model, or SKU.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
                      setActiveSubCat("all");
                      setSort("default");
                    }}
                    className="mt-4 text-red-600 text-sm font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
