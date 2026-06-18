import { useState } from "react";
import { ShoppingCart, Eye, Layers, Heart } from "lucide-react";
import Badge from "./Badge";
import StarRating from "./StarRating";
import Button from "./Button";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import QuickViewModal from "./QuickViewModal";

function formatPrice(price) {
  return `KSh ${price.toLocaleString()}`;
}

export default function ProductCard({ product }) {
  const {
    id,
    name,
    brand,
    sku,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    badge,
    inStock,
    volume,
    compatibility,
    subCategory,
  } = product;

  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(id);
  const [showQuickView, setShowQuickView] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <>
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {badge && <Badge label={badge} />}
          {discount && (
            <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-black text-white uppercase tracking-wide">
              -{discount}%
            </span>
          )}
        </div>

        {/* Sub-category chip top-right */}
        {subCategory && (
          <div className="absolute top-3 right-3">
            <span className="inline-block bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {subCategory}
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist + Quick view buttons */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
          <button
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => { e.preventDefault(); toggle(id); }}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
              wishlisted
                ? "bg-red-500 opacity-100"
                : "bg-white opacity-0 group-hover:opacity-100 hover:bg-red-50"
            }`}
          >
            <Heart
              size={14}
              className={wishlisted ? "text-white fill-white" : "text-gray-700"}
            />
          </button>
          <button
            aria-label="Quick view"
            onClick={(e) => { e.preventDefault(); setShowQuickView(true); }}
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
          >
            <Eye size={14} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand + SKU row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
            {brand}
          </span>
          <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
            {sku}
          </span>
        </div>

        {/* Product name */}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-2">
          {name}
        </h3>

        {/* Volume / Size spec */}
        {volume && (
          <div className="flex items-center gap-1 mb-1.5">
            <Layers size={11} className="text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-500 font-medium">{volume}</span>
          </div>
        )}

        {/* Compatibility */}
        {compatibility && (
          <p className="text-xs text-gray-500 italic mb-2 line-clamp-2">
            Fits: {compatibility}
          </p>
        )}

        {/* Star rating */}
        <StarRating rating={rating} reviews={reviews} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price row */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* CTA */}
        <Button
          variant="primary"
          size="sm"
          fullWidth
          className="mt-3"
          disabled={!inStock}
          icon={<ShoppingCart size={14} />}
          onClick={handleAddToCart}
        >
          {!inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </div>

    {showQuickView && (
      <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
    )}
    </>
  );
}
