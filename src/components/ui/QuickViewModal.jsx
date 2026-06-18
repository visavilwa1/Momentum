import { useEffect, useState } from "react";
import { X, ShoppingCart, Heart, Layers, Tag, CheckCircle, XCircle } from "lucide-react";
import StarRating from "./StarRating";
import Button from "./Button";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function formatPrice(price) {
  return `KSh ${price.toLocaleString()}`;
}

export default function QuickViewModal({ product, onClose }) {
  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={16} className="text-gray-600" />
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-2/5 bg-gray-50 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 sm:h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="inline-block bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 p-6 flex flex-col gap-3">
            {/* Brand + SKU */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                {product.brand}
              </span>
              <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {product.sku}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-lg font-bold text-gray-900 leading-snug">
              {product.name}
            </h2>

            {/* Rating */}
            <StarRating rating={product.rating} reviews={product.reviews} size={15} />

            {/* Meta rows */}
            <div className="space-y-1.5 text-sm">
              {product.subCategory && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag size={13} className="text-gray-400 flex-shrink-0" />
                  <span>{product.subCategory}</span>
                </div>
              )}
              {product.volume && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Layers size={13} className="text-gray-400 flex-shrink-0" />
                  <span>{product.volume}</span>
                </div>
              )}
              {product.compatibility && (
                <div className="flex items-start gap-2 text-gray-600">
                  <CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="italic">Fits: {product.compatibility}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <CheckCircle size={13} className="text-green-500" />
                    <span className="text-green-600 font-medium text-sm">In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle size={13} className="text-red-400" />
                    <span className="text-red-500 font-medium text-sm">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-1">
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                disabled={!product.inStock}
                icon={<ShoppingCart size={15} />}
                onClick={handleAddToCart}
              >
                {!product.inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
              </Button>
              <button
                onClick={() => toggle(product.id)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                  wishlisted
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-red-400 hover:bg-red-50"
                }`}
              >
                <Heart
                  size={18}
                  className={wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
