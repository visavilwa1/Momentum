import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Button from "../components/ui/Button";
import { storeAddress, storeMapsUrl } from "../data/business";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+254 712 345 678",
    link: "tel:+254712345678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@momentumauto.co.ke",
    link: "mailto:info@momentumauto.co.ke",
  },
  {
    icon: MapPin,
    label: "Location",
    value: storeAddress,
    link: storeMapsUrl,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri 8am–6pm · Sat 8am–4pm",
    link: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Momentum Auto Spares</title>
        <meta
          name="description"
          content="Get in touch with Momentum Auto Spares. Call, email, or visit us at Container Plaza, Kirinyaga Road."
        />
      </Helmet>

      {/* Header */}
      <div className="bg-[#0a0a0a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs text-red-500 font-bold uppercase tracking-widest">Get in Touch</span>
          <h1 className="text-4xl font-bold text-white mt-1">Contact Us</h1>
          <p className="text-gray-400 mt-2">We're here to help you find the right part.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Reach Us Directly</h2>
              <p className="text-gray-500 text-sm">
                Our team is ready to assist Mon–Sat during business hours.
              </p>
            </div>

            {contactInfo.map(({ icon: Icon, label, value, link }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  {link ? (
                    <a
                      href={link}
                      className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      target={link.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=200&fit=crop"
                alt="Map location"
                className="w-full object-cover"
              />
              <div className="p-3 bg-gray-50 text-center">
                <a
                  href={storeMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thank you for reaching out. We'll get back to you within 24
                    hours during business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-6 text-red-600 text-sm font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Send a Message</h2>
                  <p className="text-gray-500 text-sm mb-6">
                    Fill out the form and we'll get back to you promptly.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+254 7XX XXX XXX"
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white cursor-pointer"
                        >
                          <option value="">Select a subject</option>
                          <option value="parts-enquiry">Parts Enquiry</option>
                          <option value="order-status">Order Status</option>
                          <option value="returns">Returns & Refunds</option>
                          <option value="wholesale">Wholesale / Trade</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe what you need, include your vehicle make, model, and year if applicable..."
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      disabled={loading}
                      icon={loading ? null : <Send size={16} />}
                      iconPosition="right"
                    >
                      {loading ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
