import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, ShieldCheck, Truck } from "lucide-react";
import { storeAddressShort } from "../../data/business";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1759832217256-244b5bc54882?w=1600&h=720&fit=crop&q=90",
    tag: "10,000+ parts in stock",
    line1: "Reliable aftersales",
    line2: "parts",
    subtitle: "Genuine and aftermarket spares for all major makes — delivered across Nairobi.",
    cta: "Shop all parts",
    ctaLink: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1760317890314-e964ffd7e6a6?w=1600&h=720&fit=crop&q=90",
    tag: "Limited time offer",
    line1: "Up to 30% off",
    line2: "brake systems",
    subtitle: "Asimco brake pads, shoes and linings. Quality parts at unbeatable prices.",
    cta: "Shop brakes",
    ctaLink: "/products?category=brake-systems",
  },
  {
    image: "https://images.unsplash.com/photo-1742729096825-ebbcc50dea65?w=1600&h=720&fit=crop&q=90",
    tag: "From KSh 100",
    line1: "Oils, filters",
    line2: "& fluids",
    subtitle: "ATF, CVT, engine oils and coolant for Toyota, Nissan, Honda and more.",
    cta: "Shop fluids",
    ctaLink: "/products?category=filters-fluids",
  },
];

const AUTOPLAY_MS = 6500;

const trustItems = [
  { icon: ShieldCheck, text: "Genuine parts" },
  { icon: Truck, text: "Fast Nairobi delivery" },
  { icon: MapPin, text: storeAddressShort },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <div
      className="group relative flex-1 overflow-hidden rounded-xl bg-gray-950 shadow-xl ring-1 ring-black/10"
      style={{ minHeight: 400 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={s.image}
            alt=""
            className={`h-full w-full object-cover object-center transition-transform duration-[9000ms] ease-out ${
              i === current ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_50%,rgba(220,38,38,0.18),transparent_60%)]" />
        </div>
      ))}

      {/* Red accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-red-600 to-red-800 z-20" />

      {/* Content */}
      <div
        className="relative z-20 flex h-full flex-col justify-center px-7 py-10 sm:px-10 md:px-12"
        style={{ minHeight: 400 }}
      >
        <div key={current} className="max-w-xl animate-fade-slide-in">
          <span className="mb-5 inline-block rounded-full bg-red-600 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-red-900/40">
            {slide.tag}
          </span>

          <h1 className="mb-4 leading-[1.05] tracking-tight">
            <span className="block text-3xl font-bold text-white sm:text-4xl md:text-[2.75rem]">
              {slide.line1}
            </span>
            <span className="mt-1 block text-3xl font-bold text-red-500 sm:text-4xl md:text-[2.75rem]">
              {slide.line2}
            </span>
          </h1>

          <p className="mb-7 max-w-md text-[15px] leading-relaxed text-gray-300/90">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(slide.ctaLink)}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/35 transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-xl hover:shadow-red-900/45"
            >
              {slide.cta}
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/products?sort=sale")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Hot deals
            </button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5">
            {trustItems.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-1.5 text-xs text-gray-400">
                <Icon size={13} className="text-red-500 flex-shrink-0" />
                <span className="max-w-[200px] sm:max-w-none truncate">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 left-7 right-7 z-30 flex items-center justify-between sm:left-10 sm:right-10">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2 w-8 bg-red-600 shadow shadow-red-600/50"
                  : "h-2 w-2 bg-white/35 hover:bg-white/55"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-all hover:border-red-500/50 hover:bg-red-600/80 sm:opacity-70 sm:group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-all hover:border-red-500/50 hover:bg-red-600/80 sm:opacity-70 sm:group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
