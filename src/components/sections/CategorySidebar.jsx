import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories } from "../../data/categories";

const quickLinks = [
  { label: "Air Cleaner / Oil Filter",  q: "Oil Filter" },
  { label: "ATF / CVT Fluid",           q: "ATF" },
  { label: "Ball Joints",               q: "Ball Joint" },
  { label: "Brake Pads",                q: "Brake Pads" },
  { label: "Bulbs",                     q: "Bulb" },
  { label: "CV Joints",                 q: "CV Joint" },
  { label: "Spark Plugs",               q: "NGK" },
  { label: "Wiper Blades",              q: "Wiper" },
];

export default function CategorySidebar() {
  return (
    <aside className="w-56 flex-shrink-0 hidden lg:block">
      {/* Categories header */}
      <div className="bg-gray-800 text-white text-xs font-bold uppercase tracking-widest px-4 py-3 flex items-center gap-2">
        <span className="flex-1">Categories</span>
        <div className="flex gap-0.5">
          <span className="w-1 h-3 bg-white/40 rounded" />
          <span className="w-1 h-3 bg-white/40 rounded" />
          <span className="w-1 h-3 bg-white/40 rounded" />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-b-lg overflow-hidden shadow-sm">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className={`flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group ${
              i < categories.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <span>{cat.name}</span>
            <ChevronRight size={13} className="text-gray-300 group-hover:text-red-400 transition-colors" />
          </Link>
        ))}

        {/* Replacement Parts section */}
        <div className="bg-gray-50 border-t border-gray-100">
          <p className="px-4 pt-3 pb-1.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
            Replacement Parts
          </p>
          {quickLinks.map(({ label, q }) => (
            <Link
              key={label}
              to={`/products?q=${encodeURIComponent(q)}`}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs text-gray-600 hover:text-red-600 transition-colors"
            >
              <ChevronRight size={11} className="text-gray-300 flex-shrink-0" />
              {label}
            </Link>
          ))}
          <div className="h-3" />
        </div>
      </div>
    </aside>
  );
}
