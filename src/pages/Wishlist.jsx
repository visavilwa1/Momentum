import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import ProductCard from "../components/ui/ProductCard";

export default function Wishlist() {
  const { ids, remove } = useWishlist();

  const wishlisted = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <Helmet>
        <title>My Wishlist — Momentum Auto Spares</title>
      </Helmet>

      {/* Page header */}
      <div className="bg-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Heart size={28} className="text-red-500 fill-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {wishlisted.length} saved {wishlisted.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[50vh]">
        {wishlisted.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5">
              <Heart size={36} className="text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              Save parts you like by clicking the heart icon on any product card.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <ShoppingBag size={16} /> Browse Parts
            </Link>
          </div>
        ) : (
          <>
            {/* Clear all */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{wishlisted.length}</span>{" "}
                saved {wishlisted.length === 1 ? "part" : "parts"}
              </p>
              <button
                onClick={() => ids.forEach((id) => remove(id))}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
              >
                <Trash2 size={13} /> Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {wishlisted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline text-sm"
              >
                Continue browsing <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
