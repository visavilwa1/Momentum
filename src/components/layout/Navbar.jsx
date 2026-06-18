import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, ShoppingCart, Search, Phone, Wrench,
  Heart, User, ChevronDown, Tag, Flame, Star,
  Headphones, MessageSquare,
} from "lucide-react";
import { categories } from "../../data/categories";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { label: "Hot Deals",    to: "/products?sort=sale",          icon: Flame },
  { label: "Best Selling", to: "/products?sort=rating",        icon: Star },
  { label: "Brands",       to: "/products?view=brands",        icon: Tag },
  { label: "Make Inquiry", to: "/contact",                     icon: MessageSquare },
];

export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [catOpen, setCatOpen]         = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const catRef   = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { ids: wishlistIds } = useWishlist();
  const { count: cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => { setIsOpen(false); setCatOpen(false); }, [location]);

  // Close category dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchQuery("");
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <div className={`sticky top-0 z-50 ${scrolled ? "shadow-lg" : ""}`}>

      {/* ── Tier 1: Utility bar ── */}
      <div className="bg-gray-800 text-gray-300 text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Phone size={11} className="text-red-400" />
            <a href="tel:+254712345678" className="hover:text-white transition-colors">
              +254 712 345 678
            </a>
            <span className="mx-2 text-gray-600">|</span>
            <span>Mon–Sat: 8am – 6pm</span>
            <span className="mx-2 text-gray-600">|</span>
            <span>Free delivery within Nairobi on orders over KSh 5,000</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about"   className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* ── Tier 2: Logo + Search + Cart ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow">
              <Wrench size={18} className="text-white" />
            </div>
            <div className="leading-tight hidden sm:block">
              <span className="block text-gray-900 font-extrabold text-base tracking-tight">
                MOMENTUM
              </span>
              <span className="block text-red-600 text-[10px] font-bold tracking-widest uppercase -mt-0.5">
                Auto Spares
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by part name, SKU, or vehicle model..."
              className="flex-1 border-2 border-red-500 rounded-l-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-red-600"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-r-lg transition-colors flex items-center gap-1.5 text-sm font-semibold"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-5 flex-shrink-0">
            <Link to="/wishlist" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-red-600 transition-colors relative">
              <Heart size={20} className={wishlistIds.length > 0 ? "text-red-500 fill-red-500" : ""} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
              <span className="text-[10px] font-medium">Wish list</span>
            </Link>
            <Link to="/contact" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-red-600 transition-colors">
              <User size={20} />
              <span className="text-[10px] font-medium">Login</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-red-600 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="text-[10px] font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Tier 3: Category nav bar ── */}
      <div className="bg-gray-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-stretch">

            {/* CATEGORIES dropdown trigger */}
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatOpen((p) => !p)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-3 h-full transition-colors min-w-[170px]"
              >
                <Menu size={16} />
                CATEGORIES
                <ChevronDown
                  size={14}
                  className={`ml-auto transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              {catOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-2xl z-50 rounded-b-lg overflow-hidden">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 border-b border-gray-50 transition-colors group"
                    >
                      <span>{cat.name}</span>
                      <ChevronDown size={13} className="-rotate-90 text-gray-400 group-hover:text-red-400" />
                    </Link>
                  ))}
                  <div className="bg-gray-50 px-4 py-2 mt-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Quick Links
                    </p>
                    {["Brake Pads","Spark Plugs","CV Joints","Engine Oils","Wiper Blades","Bulbs"].map((q) => (
                      <Link
                        key={q}
                        to={`/products?q=${encodeURIComponent(q)}`}
                        className="block text-xs text-gray-600 hover:text-red-600 py-1 transition-colors"
                      >
                        › {q}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Nav links */}
            {navLinks.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "text-white border-red-500"
                      : "text-gray-300 border-transparent hover:text-white hover:border-red-400"
                  }`
                }
              >
                {Icon && <Icon size={13} />}
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        {/* Mobile search */}
        <form onSubmit={handleSearch} className="flex p-3 gap-2 border-b border-gray-100">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search parts or vehicle..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500"
          />
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg">
            <Search size={16} />
          </button>
        </form>

        <div className="px-4 py-3 space-y-1">
          {[
            { label: "Home", to: "/" },
            { label: "All Products", to: "/products" },
            { label: "About", to: "/about" },
            { label: "Wishlist", to: "/wishlist" },
            { label: "Cart", to: "/cart" },
            { label: "Contact", to: "/contact" },
          ].map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 pt-2">Categories</p>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              › {cat.name}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
