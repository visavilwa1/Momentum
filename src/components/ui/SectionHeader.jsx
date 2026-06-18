export default function SectionHeader({ eyebrow, title, description, centered = false, light = false }) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold leading-tight ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
