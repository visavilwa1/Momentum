import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export default function PromoBar() {
  return (
    <section className="bg-[#111] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Promo 1 */}
          <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <Zap size={28} className="text-white mb-3" />
            <h3 className="text-white font-bold text-lg mb-1">Weekend Flash Sale</h3>
            <p className="text-red-100 text-sm mb-4">Up to 30% off brake parts this weekend only</p>
            <Link
              to="/products?category=brake-systems"
              className="inline-flex items-center gap-1 text-white text-xs font-semibold hover:gap-2 transition-all"
            >
              Shop Now <ArrowRight size={13} />
            </Link>
          </div>

          {/* Promo 2 */}
          <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
            <div>
              <span className="text-xs text-red-500 font-bold uppercase tracking-widest">New Arrivals</span>
              <h3 className="text-white font-bold text-lg mt-1 mb-1">LED Lighting Range</h3>
              <p className="text-gray-400 text-sm">Premium LED headlights, DRLs & interior lighting</p>
            </div>
            <Link
              to="/products?category=electrical"
              className="mt-4 inline-flex items-center gap-1 text-red-500 text-xs font-semibold hover:gap-2 transition-all"
            >
              Explore <ArrowRight size={13} />
            </Link>
          </div>

          {/* Promo 3 */}
          <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Bundle Deal</span>
              <h3 className="text-white font-bold text-lg mt-1 mb-1">Service Kit Combo</h3>
              <p className="text-gray-400 text-sm">Oil filter + air filter + spark plugs — save 15%</p>
            </div>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center gap-1 text-red-500 text-xs font-semibold hover:gap-2 transition-all"
            >
              Get Bundle <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
