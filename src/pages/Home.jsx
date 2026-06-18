import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/sections/Hero";
import CategorySidebar from "../components/sections/CategorySidebar";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Testimonials from "../components/sections/Testimonials";
import Newsletter from "../components/sections/Newsletter";

// Small promo cards beside/below the hero
const promoCards = [
  {
    label: "Hot deals",
    text: "Up to 30% off brake systems",
    to: "/products?sort=sale",
  },
  {
    label: "New arrivals",
    text: "Wipers, bulbs & accessories",
    to: "/products?category=electrical",
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Momentum Auto Spares — Quality Car Parts in Nairobi</title>
        <meta
          name="description"
          content="Momentum Auto Spares offers genuine and aftermarket car spare parts and accessories at competitive prices. Fast delivery across Nairobi and Kenya."
        />
        <link rel="canonical" href="https://momentumauto.co.ke/" />
      </Helmet>

      {/* ── Hero section: Sidebar + Banner ── */}
      <section className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 items-stretch">

            {/* Left: Category Sidebar */}
            <CategorySidebar />

            {/* Right: Hero banner + promo cards */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {/* Main banner */}
              <Hero />

              {/* Two promo cards below the banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {promoCards.map(({ label, text, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="group relative overflow-hidden rounded-lg bg-gray-900 px-5 py-4 transition-all hover:shadow-lg hover:ring-1 hover:ring-red-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-white mt-0.5">{text}</p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:text-red-400 flex-shrink-0"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs text-gray-600">
          {[
            { icon: "🚚", text: "Free Delivery over KSh 5,000" },
            { icon: "✅", text: "Genuine Parts Guaranteed" },
            { icon: "🔄", text: "Easy 14-Day Returns" },
            { icon: "📞", text: "Expert Support Mon–Sat" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 font-medium">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Products ── */}
      <FeaturedProducts />

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Newsletter ── */}
      <Newsletter />
    </>
  );
}
