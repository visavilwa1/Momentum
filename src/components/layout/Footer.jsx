import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Wrench } from "lucide-react";
import { storeAddress } from "../../data/business";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const categories = [
  { label: "Engine Parts", to: "/products?category=engine-parts" },
  { label: "Brake Systems", to: "/products?category=brake-systems" },
  { label: "Suspension", to: "/products?category=suspension" },
  { label: "Electrical", to: "/products?category=electrical" },
  { label: "Filters & Fluids", to: "/products?category=filters-fluids" },
  { label: "Body Parts", to: "/products?category=body-parts" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <Wrench size={16} className="text-white" />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-bold text-sm tracking-wide">
                  MOMENTUM
                </span>
                <span className="block text-red-500 text-xs font-semibold tracking-widest uppercase">
                  Auto Spares
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted source for quality car spare parts and accessories.
              Reliable parts at affordable prices for every vehicle.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="X / Twitter"
                className="w-8 h-8 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm hover:text-red-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm hover:text-red-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>{storeAddress}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-red-500 flex-shrink-0" />
                <a
                  href="tel:+254712345678"
                  className="hover:text-white transition-colors"
                >
                  +254 712 345 678
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-red-500 flex-shrink-0" />
                <a
                  href="mailto:info@momentumauto.co.ke"
                  className="hover:text-white transition-colors"
                >
                  info@momentumauto.co.ke
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-xs font-medium text-white mb-1">Business Hours</p>
              <p className="text-xs">Mon – Fri: 8:00am – 6:00pm</p>
              <p className="text-xs">Saturday: 8:00am – 4:00pm</p>
              <p className="text-xs">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© {new Date().getFullYear()} Momentum Auto Spares. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
