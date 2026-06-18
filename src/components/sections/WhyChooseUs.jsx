import { ShieldCheck, Truck, BadgeCheck, Headphones, RotateCcw, Tag } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const features = [
  {
    icon: ShieldCheck,
    title: "Genuine Quality",
    description:
      "Every part is sourced from trusted manufacturers. OEM and aftermarket options available for all budgets.",
  },
  {
    icon: Tag,
    title: "Best Prices",
    description:
      "We cut out the middleman to bring you competitive prices without compromising on quality.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Same-day delivery within Nairobi on orders placed before 2pm. Nationwide delivery in 1–3 days.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Compatibility",
    description:
      "Our team verifies part compatibility for your specific make, model, and year before shipping.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "Our knowledgeable team is available 6 days a week to help you find exactly what you need.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Not the right part? We offer hassle-free returns within 14 days on all eligible items.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Momentum"
          title="Built for Performance. Priced for Everyone."
          description="We go beyond just selling parts — we help you maintain and improve your vehicle with confidence."
          centered
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-red-600/40 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-red-600/10 group-hover:bg-red-600/20 border border-red-600/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Icon size={22} className="text-red-500" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
