import { Star } from "lucide-react";

export default function StarRating({ rating, reviews, size = 14, showCount = true }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < fullStars
                ? "fill-amber-400 text-amber-400"
                : i === fullStars && hasHalf
                ? "fill-amber-400/50 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500 ml-0.5">
          {rating.toFixed(1)} ({reviews})
        </span>
      )}
    </div>
  );
}
