import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Award, MapPin, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";

const milestones = [
  { year: "2016", event: "Founded at Container Plaza, Kirinyaga Road with 500 parts" },
  { year: "2018", event: "Expanded to 3,000+ SKUs and launched online ordering" },
  { year: "2020", event: "Reached 2,000 monthly customers despite industry challenges" },
  { year: "2022", event: "Opened second warehouse with same-day delivery capability" },
  { year: "2024", event: "Crossed 10,000 parts in stock and launched nationwide delivery" },
  { year: "2026", event: "Serving 5,000+ satisfied customers across Kenya" },
];

const team = [
  {
    name: "Samuel Kariuki",
    role: "Founder & CEO",
    bio: "20+ years in automotive retail and sourcing across East Africa.",
    avatar: "SK",
    color: "bg-red-600",
  },
  {
    name: "Faith Njoki",
    role: "Head of Procurement",
    bio: "Ensures every part meets quality standards before hitting the shelf.",
    avatar: "FN",
    color: "bg-gray-700",
  },
  {
    name: "Brian Otieno",
    role: "Technical Advisor",
    bio: "Certified mechanic helping customers find exact-fit parts.",
    avatar: "BO",
    color: "bg-red-800",
  },
  {
    name: "Amina Hassan",
    role: "Customer Experience",
    bio: "Dedicated to making every order smooth from click to delivery.",
    avatar: "AH",
    color: "bg-gray-600",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — Momentum Auto Spares</title>
        <meta
          name="description"
          content="Learn about Momentum Auto Spares — Nairobi's trusted supplier of quality car spare parts since 2016."
        />
      </Helmet>

      {/* Hero */}
      <div className="relative bg-[#0a0a0a] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="text-xs text-red-500 font-bold uppercase tracking-widest">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
            Driven by Quality,<br />Powered by Trust.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Since 2016, Momentum Auto Spares has been keeping Kenyan vehicles on the road with
            quality parts, honest pricing, and expert advice.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { value: "8+", label: "Years in Business" },
              { value: "10,000+", label: "Parts in Stock" },
              { value: "5,000+", label: "Customers Served" },
              { value: "50+", label: "Brands Stocked" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold">{value}</p>
                <p className="text-red-100 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs text-red-600 font-bold uppercase tracking-widest">Our Mission</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                Keeping Every Vehicle Moving
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We started Momentum Auto Spares with one simple belief: every driver deserves
                access to quality car parts without paying inflated prices or compromising on
                reliability.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From a small shop at Container Plaza on Kirinyaga Road to one of Kenya's most trusted
                auto parts suppliers, our growth has been built on genuine relationships with
                customers, quality-first sourcing, and expert advice that keeps people safe on
                the road.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: ShieldCheck, text: "Every part verified for quality before stocking" },
                  { icon: Users, text: "Dedicated team of automotive experts" },
                  { icon: Award, text: "Trusted by workshops and individual drivers alike" },
                  { icon: MapPin, text: "Serving all of Kenya with fast, reliable delivery" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-red-600" />
                    </div>
                    <span className="text-sm text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1625047509252-ab38fb5c7343?w=600&h=450&fit=crop"
                alt="Our workshop"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs text-red-600 font-bold uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {milestones.map(({ year, event }, i) => (
                <div key={year} className="flex gap-5 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-bold ${i === milestones.length - 1 ? "bg-red-600 text-white" : "bg-white border-2 border-gray-200 text-gray-600"}`}>
                    {year.slice(2)}
                  </div>
                  <div className="pt-2.5">
                    <p className="text-xs font-bold text-red-600 mb-0.5">{year}</p>
                    <p className="text-gray-700 text-sm">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs text-red-600 font-bold uppercase tracking-widest">The People</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, avatar, color }) => (
              <div key={name} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}>
                  {avatar}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
                <p className="text-red-600 text-xs font-medium mt-0.5 mb-2">{role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Find Your Part?</h2>
          <p className="text-gray-400 mb-7 text-sm">
            Browse our full catalogue or reach out to our team for personalised assistance.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" onClick={() => window.location.href = "/products"} icon={<ArrowRight size={16} />} iconPosition="right">
              Shop Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = "/contact"}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
