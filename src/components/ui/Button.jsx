import { forwardRef } from "react";

const variants = {
  primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20",
  secondary: "bg-white hover:bg-gray-100 text-gray-900 border border-gray-200",
  outline: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
  ghost: "bg-transparent hover:bg-white/10 text-white",
  dark: "bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white border border-white/10",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
  xl: "px-8 py-4 text-lg",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    fullWidth = false,
    icon,
    iconPosition = "left",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 select-none cursor-pointer",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        fullWidth && "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
});

export default Button;
