const badgeStyles = {
  "Best Seller": "bg-red-600 text-white",
  "Top Rated": "bg-amber-500 text-white",
  Sale: "bg-green-600 text-white",
  New: "bg-blue-600 text-white",
  default: "bg-gray-700 text-white",
};

export default function Badge({ label, className = "" }) {
  if (!label) return null;
  const style = badgeStyles[label] || badgeStyles.default;
  return (
    <span
      className={`inline-block text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide ${style} ${className}`}
    >
      {label}
    </span>
  );
}
