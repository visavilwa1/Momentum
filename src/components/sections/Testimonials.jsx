import { Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import StarRating from "../ui/StarRating";
import SectionHeader from "../ui/SectionHeader";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Customer Reviews"
          title="Trusted by Thousands of Drivers"
          description="Real feedback from real customers across Kenya who rely on us for their vehicle needs."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote size={24} className="text-red-200 mb-4" />
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{t.text}"
              </p>
              <StarRating rating={t.rating} reviews={null} showCount={false} />
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.vehicle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-10">
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "5,000+", label: "Reviews" },
            { value: "97%", label: "Would Recommend" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
