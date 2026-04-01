// src/components/ui/Button.tsx
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

// รวม Props ของ Button และ Link
type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: ButtonProps | AnchorProps) => {
  const baseClass =
    "inline-flex items-center justify-center font-semibold transition-colors duration-200 rounded-full";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline:
      "border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900 bg-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3.5 text-base md:text-lg", // ปรับให้เหมาะกับ Hero Section
  };

  const combinedClasses = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
