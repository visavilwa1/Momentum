import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";
import SectionHeader from "../ui/SectionHeader";

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <SectionHeader
            eyebrow="Browse by Category"
            title="Find the Right Part Fast"
            description="Thousands of parts organised by category for every make and model."
          />
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                />
              </div>

              {/* Red bottom bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-sm leading-tight drop-shadow">
                  {cat.name}
                </h3>
                <p className="text-white/70 text-xs mt-0.5 drop-shadow">
                  {cat.count} parts
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
