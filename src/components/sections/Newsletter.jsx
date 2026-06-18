import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import Button from "../ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 bg-red-600 relative overflow-hidden">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-bold text-red-200 uppercase tracking-widest mb-3">
          Stay Updated
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Get Deals Before Anyone Else
        </h2>
        <p className="text-red-100 text-base mb-8 max-w-lg mx-auto">
          Subscribe to our newsletter for exclusive discounts, new arrivals, and
          expert maintenance tips delivered straight to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl p-5">
            <CheckCircle size={22} className="text-white" />
            <p className="text-white font-semibold">
              You're in! Watch your inbox for deals.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white"
            />
            <Button
              type="submit"
              variant="ghost"
              size="md"
              className="bg-white/20 hover:bg-white/30 border border-white/30 text-white"
              icon={<Send size={15} />}
              iconPosition="right"
            >
              Subscribe
            </Button>
          </form>
        )}
        <p className="text-red-200/70 text-xs mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
