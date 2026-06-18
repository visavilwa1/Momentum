import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  CreditCard,
  Copy,
  Check,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { mpesaPaybill, mpesaSteps, supportWhatsApp } from "../data/payment";
import Button from "../components/ui/Button";

function formatPrice(price) {
  return `KSh ${price.toLocaleString()}`;
}

function buildWhatsAppMessage(form, cartLines, total) {
  const items = cartLines
    .map(
      ({ product, quantity }) =>
        `• ${product.name} (${product.sku}) x${quantity} — ${formatPrice(product.price * quantity)}`
    )
    .join("\n");

  return encodeURIComponent(
    `Hello Momentum Auto Spares,\n\nI have completed M-Pesa payment for my order.\n\nName: ${form.name}\nPhone: ${form.phone}\nPaybill: ${mpesaPaybill.paybillNumber}\nAccount: ${mpesaPaybill.accountNumber}\n\nOrder:\n${items}\n\nTotal: ${formatPrice(total)}\n\nPlease confirm my order.`
  );
}

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Checkout() {
  const { items, clearCart, count } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", note: "" });

  const cartLines = items
    .map(({ id, quantity }) => {
      const product = products.find((p) => p.id === id);
      return product ? { product, quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartLines.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  if (cartLines.length === 0 && !submitted) {
    return <Navigate to="/cart" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappHref = submitted
    ? `https://wa.me/${supportWhatsApp}?text=${buildWhatsAppMessage(form, cartLines, subtotal)}`
    : "#";

  return (
    <>
      <Helmet>
        <title>Checkout — Momentum Auto Spares</title>
      </Helmet>

      <div className="bg-[#0a0a0a] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back to cart
          </Link>
          <div className="flex items-center gap-3">
            <CreditCard size={26} className="text-red-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">Checkout</h1>
              <p className="text-gray-400 text-sm mt-0.5">Pay securely via M-Pesa Paybill</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submitted ? (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment details noted</h2>
            <p className="text-gray-500 text-sm mb-6">
              Send us your M-Pesa confirmation message on WhatsApp so we can process your order
              for delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <MessageCircle size={18} /> Send on WhatsApp
              </a>
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  navigate("/products");
                }}
              >
                Continue shopping
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone size={18} className="text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">M-Pesa Paybill</h2>
                    <p className="text-xs text-gray-500">Pay via Lipa na M-Pesa → Pay Bill</p>
                  </div>
                </div>

                <div className="bg-green-600 rounded-xl p-5 text-white space-y-4">
                  <p className="text-sm text-green-100">{mpesaPaybill.accountName}</p>

                  <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-100">
                        Paybill Number
                      </p>
                      <p className="text-3xl font-black tracking-widest mt-1">
                        {mpesaPaybill.paybillNumber}
                      </p>
                    </div>
                    <CopyButton value={mpesaPaybill.paybillNumber} label="paybill number" />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-green-100">
                        Account Number
                      </p>
                      <p className="text-3xl font-black tracking-widest mt-1">
                        {mpesaPaybill.accountNumber}
                      </p>
                    </div>
                    <CopyButton value={mpesaPaybill.accountNumber} label="account number" />
                  </div>

                  <p className="text-sm text-green-100 pt-2 border-t border-white/20">
                    Amount to pay:{" "}
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </p>
                </div>

                <ol className="mt-6 space-y-2">
                  {mpesaSteps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="John Kamau"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1">
                      M-Pesa Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="0712 345 678"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="note" className="block text-xs font-semibold text-gray-600 mb-1">
                      Delivery note (optional)
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={2}
                      value={form.note}
                      onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
                      placeholder="Delivery address or pickup instructions"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                <ul className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {cartLines.map(({ product, quantity }) => (
                    <li key={product.id} className="flex justify-between gap-2 text-sm">
                      <span className="text-gray-600 line-clamp-2 flex-1">
                        {product.name}{" "}
                        <span className="text-gray-400">×{quantity}</span>
                      </span>
                      <span className="font-semibold text-gray-900 flex-shrink-0">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({count})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-bold text-gray-900">Total to pay</span>
                    <span className="text-2xl font-black text-green-700">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
                <Button type="submit" fullWidth className="mt-6 bg-green-600 hover:bg-green-700 shadow-green-900/20">
                  I have paid via M-Pesa
                </Button>
                <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed">
                  Pay the exact total to Paybill {mpesaPaybill.paybillNumber}, Account{" "}
                  {mpesaPaybill.accountNumber}, then confirm here.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
