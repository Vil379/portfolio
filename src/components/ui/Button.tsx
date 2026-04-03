import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

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
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full";

  const variants = {
    // โหมดสว่างจะเป็นปุ่มดำ/ตัวหนังสือขาว, โหมดมืดจะเป็นปุ่มขาว/ตัวหนังสือดำ สลับกันอัตโนมัติ
    primary:
      "bg-foreground text-background hover:opacity-80 hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-muted text-foreground hover:brightness-95",
    outline:
      "border border-border-card text-text-muted hover:border-foreground hover:text-foreground bg-transparent",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3.5 text-base md:text-lg",
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
