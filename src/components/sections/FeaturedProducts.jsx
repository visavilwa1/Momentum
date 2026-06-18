import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredProducts } from "../../data/products";
import ProductCard from "../ui/ProductCard";
import SectionHeader from "../ui/SectionHeader";

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <SectionHeader
            eyebrow="Top Picks"
            title="Featured Products"
            description="Carefully selected parts our customers trust most."
          />
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors whitespace-nowrap"
          >
            See all products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
