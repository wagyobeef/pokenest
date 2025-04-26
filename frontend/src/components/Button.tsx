import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "font-medium transition-all duration-200 rounded-lg";

  const sizeStyles = {
    small: "px-4 py-1.5 text-sm",
    medium: "px-6 py-2 text-base",
    large: "px-8 py-3 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-[#F28B82] text-white shadow-[0_2px_8px_-1px_rgba(242,139,130,0.3)] hover:transform hover:-translate-y-1",
    secondary:
      "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1)]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
