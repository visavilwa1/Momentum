import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ShoppingCart, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

function formatPrice(price) {
  return `KSh ${price.toLocaleString()}`;
}

export default function Cart() {
  const { items, removeItem, setQuantity, clearCart, count } = useCart();

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

  return (
    <>
      <Helmet>
        <title>Shopping Cart — Momentum Auto Spares</title>
      </Helmet>

      <div className="bg-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <ShoppingCart size={28} className="text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[50vh]">
        {cartLines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5">
              <ShoppingCart size={36} className="text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              Browse our catalogue and add parts to your cart to get started.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <ShoppingBag size={16} /> Browse Parts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{count}</span>{" "}
                  {count === 1 ? "item" : "items"} in cart
                </p>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                >
                  <Trash2 size={13} /> Clear cart
                </button>
              </div>

              {cartLines.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-red-600 uppercase">{product.brand}</p>
                        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-[10px] font-mono text-gray-400 mt-0.5">{product.sku}</p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-gray-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-base font-bold text-gray-900">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({count} items)</span>
                    <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">
                      {subtotal >= 5000 ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-gray-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Proceed to Pay <ArrowRight size={16} />
                </Link>
                <Link
                  to="/products"
                  className="block text-center text-sm text-red-600 font-semibold hover:underline mt-4"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
